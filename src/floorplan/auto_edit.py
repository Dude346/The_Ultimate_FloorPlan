from __future__ import annotations

from dataclasses import asdict, dataclass
import json
import math
from pathlib import Path

from .nl_to_edit import parse_prompt
from .pointcloud_edit import (
    bounds_for_path,
    load_label_bboxes,
    move_bbox_with_translation,
    move_labeled_with_prompt,
    save_label_bboxes,
)
from .sam_pipeline import AutoLabelResult, auto_label_from_video_with_sam
from .validation import ValidationReport, validate_prompt_move


@dataclass
class AutoEditResult:
    output_ply: Path
    labels_path: Path
    report_path: Path
    moved_points: int
    translation: tuple[float, float, float]
    sam: AutoLabelResult
    precheck: ValidationReport
    placement_strategy: str
    postcheck: dict[str, object]


BBox = tuple[tuple[float, float, float], tuple[float, float, float]]

_ALIASES: dict[str, list[str]] = {
    "couch": ["sofa", "loveseat"],
    "sofa": ["couch", "loveseat"],
    "table": ["coffee table"],
    "coffee table": ["table"],
    "tv": ["television", "screen", "monitor"],
    "trash bin": ["trash can", "waste bin", "wastebasket", "garbage can", "bin"],
    "trash can": ["trash bin", "waste bin", "wastebasket", "garbage can", "bin"],
    "waste bin": ["trash bin", "trash can", "wastebasket", "garbage can", "bin"],
    "wastebasket": ["trash bin", "trash can", "waste bin", "garbage can", "bin"],
    "garbage can": ["trash bin", "trash can", "waste bin", "wastebasket", "bin"],
}

_LEADING_DESCRIPTORS: set[str] = {
    "a",
    "an",
    "small",
    "large",
    "big",
    "blue",
    "red",
    "green",
    "white",
    "black",
    "gray",
    "grey",
    "brown",
    "yellow",
    "orange",
    "pink",
    "silver",
    "gold",
}


def _prompt_entities(prompt: str) -> list[str]:
    commands = parse_prompt(prompt)
    if len(commands) != 1 or commands[0].op != "move":
        raise ValueError("Auto edit currently supports move prompts only.")
    cmd = commands[0]
    out = [cmd.args.get("target", "").strip()]
    if cmd.args.get("relation") == "near":
        out.append(cmd.args.get("anchor", "").strip())
    values = [v for v in out if v]
    if not values:
        raise ValueError("Prompt did not contain a target object.")
    return values


def _canon_label(value: str) -> str:
    out = " ".join(value.strip().lower().split())
    if out.startswith("the "):
        out = out[4:].strip()
    if out.endswith("s") and len(out) > 1:
        out = out[:-1]
    return out


def _label_aliases(name: str) -> list[str]:
    n = _canon_label(name)
    variants: list[str] = [n]
    words = n.split()
    while words and words[0] in _LEADING_DESCRIPTORS:
        words = words[1:]
    stripped = " ".join(words)
    if stripped and stripped != n:
        variants.append(stripped)

    out: list[str] = []
    for v in variants:
        out.append(v)
        out.extend(_ALIASES.get(v, []))
    # Ensure deterministic unique order.
    seen: set[str] = set()
    uniq: list[str] = []
    for v in out:
        c = _canon_label(v)
        if not c or c in seen:
            continue
        uniq.append(c)
        seen.add(c)
    return uniq


def _detection_label(name: str) -> str:
    n = _canon_label(name)
    words = n.split()
    while words and words[0] in _LEADING_DESCRIPTORS:
        words = words[1:]
    stripped = " ".join(words)
    return stripped or n


def _expand_entities_for_detection(entities: list[str]) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for e in entities:
        # Use one primary detection phrase per entity; alias expansion is used only for resolution.
        # Expanding every synonym causes overlapping detections and unstable 3D labels.
        key = _detection_label(e)
        if key in seen:
            continue
        out.append(key)
        seen.add(key)
    return out


def _resolve_entity_label(
    requested: str,
    labels: dict[str, BBox],
    sam_hits: dict[str, int],
) -> str | None:
    for candidate in _label_aliases(requested):
        if candidate in labels and sam_hits.get(candidate, 0) > 0:
            return candidate
    for candidate in _label_aliases(requested):
        if candidate in labels:
            return candidate
    return None


def _bbox_center(b: BBox) -> tuple[float, float, float]:
    (x0, y0, z0), (x1, y1, z1) = b
    return ((x0 + x1) / 2.0, (y0 + y1) / 2.0, (z0 + z1) / 2.0)


def _bbox_size(b: BBox) -> tuple[float, float, float]:
    (x0, y0, z0), (x1, y1, z1) = b
    return (max(0.0, x1 - x0), max(0.0, y1 - y0), max(0.0, z1 - z0))


def _bbox_translate(b: BBox, dx: float, dy: float, dz: float) -> BBox:
    (x0, y0, z0), (x1, y1, z1) = b
    return ((x0 + dx, y0 + dy, z0 + dz), (x1 + dx, y1 + dy, z1 + dz))


def _bbox_volume(b: BBox) -> float:
    sx, sy, sz = _bbox_size(b)
    return sx * sy * sz


def _overlap_ratio(a: BBox, b: BBox) -> float:
    (ax0, ay0, az0), (ax1, ay1, az1) = a
    (bx0, by0, bz0), (bx1, by1, bz1) = b
    ix = max(0.0, min(ax1, bx1) - max(ax0, bx0))
    iy = max(0.0, min(ay1, by1) - max(ay0, by0))
    iz = max(0.0, min(az1, bz1) - max(az0, bz0))
    inter = ix * iy * iz
    if inter <= 0.0:
        return 0.0
    return inter / max(1e-8, min(_bbox_volume(a), _bbox_volume(b)))


def _in_bounds(b: BBox, room: BBox) -> bool:
    (x0, y0, z0), (x1, y1, z1) = b
    (rx0, ry0, rz0), (rx1, ry1, rz1) = room
    return x0 >= rx0 and y0 >= ry0 and z0 >= rz0 and x1 <= rx1 and y1 <= ry1 and z1 <= rz1


def _find_nearby_valid_translation(
    *,
    target_name: str,
    anchor_name: str,
    labels: dict[str, BBox],
    room_bounds: BBox,
    overlap_threshold: float = 0.08,
) -> tuple[float, float, float] | None:
    if target_name not in labels or anchor_name not in labels:
        return None

    target = labels[target_name]
    anchor = labels[anchor_name]
    tcx, tcy, tcz = _bbox_center(target)
    acx, acy, _ = _bbox_center(anchor)
    tsx, tsy, _ = _bbox_size(target)
    asx, asy, _ = _bbox_size(anchor)
    base_radius = 0.5 * max(tsx, tsy) + 0.5 * max(asx, asy) + 0.2

    candidates: list[tuple[float, float]] = []
    for r_mul in (1.0, 1.4, 1.8, 2.2):
        r = base_radius * r_mul
        for deg in range(0, 360, 30):
            rad = math.radians(deg)
            candidates.append((acx + r * math.cos(rad), acy + r * math.sin(rad)))

    best: tuple[float, float, float] | None = None
    best_cost = float("inf")
    for cx, cy in candidates:
        dx = cx - tcx
        dy = cy - tcy
        moved = _bbox_translate(target, dx, dy, 0.0)
        inb = _in_bounds(moved, room_bounds)
        clash = 0.0
        clash_count = 0
        for name, b in labels.items():
            if name == target_name:
                continue
            ov = _overlap_ratio(moved, b)
            if ov > overlap_threshold:
                clash += ov
                clash_count += 1
        # Prefer in-bounds and non-clashing placements near anchor.
        dist = math.hypot(cx - acx, cy - acy)
        cost = dist + (0.0 if inb else 1000.0) + clash * 500.0 + clash_count * 200.0
        if cost < best_cost:
            best_cost = cost
            best = (dx, dy, 0.0)
            if inb and clash_count == 0:
                break
    return best


def _assess_move(
    *,
    target_name: str,
    labels: dict[str, BBox],
    room_bounds: BBox,
    translation: tuple[float, float, float],
    overlap_threshold: float = 0.08,
) -> dict[str, object]:
    if target_name not in labels:
        return {
            "in_bounds": False,
            "clashes": ["target_missing"],
            "support_ok": False,
            "orientation_ok": True,
        }
    moved = _bbox_translate(labels[target_name], translation[0], translation[1], translation[2])
    in_bounds = _in_bounds(moved, room_bounds)
    clashes: list[str] = []
    for name, b in labels.items():
        if name == target_name:
            continue
        if _overlap_ratio(moved, b) > overlap_threshold:
            clashes.append(name)
    support_ok = abs(moved[0][2] - labels[target_name][0][2]) < 0.2
    return {
        "in_bounds": in_bounds,
        "clashes": sorted(clashes),
        "support_ok": support_ok,
        "orientation_ok": True,
    }


def run_auto_prompt_edit(
    *,
    video_path: str | Path,
    ply_path: str | Path,
    prompt: str,
    out_path: str | Path,
    work_dir: str | Path,
    sample_fps: float = 0.5,
    max_frames: int = 60,
    box_threshold: float = 0.45,
    text_threshold: float = 0.35,
    allow_ambiguous: bool = False,
    signature_frames: int = 1,
    hole_fill: bool = True,
    hole_fill_margin: float = 0.2,
    hole_fill_ratio: float = 0.35,
    fail_on_invalid: bool = True,
    sam_model_id: str = "facebook/sam-vit-base",
    min_hits_per_label: int = 3,
    frame_strategy: str = "uniform",
) -> AutoEditResult:
    wd = Path(work_dir).expanduser().resolve()
    wd.mkdir(parents=True, exist_ok=True)
    labels_path = wd / "auto_labels.json"
    debug_dir = wd / "sam_debug"

    entities = _prompt_entities(prompt)
    detection_labels = _expand_entities_for_detection(entities)
    sam_result = auto_label_from_video_with_sam(
        video_path=video_path,
        ply_path=ply_path,
        labels=detection_labels,
        out_labels_path=labels_path,
        sample_fps=sample_fps,
        max_frames=max_frames,
        box_threshold=box_threshold,
        text_threshold=text_threshold,
        debug_dir=debug_dir,
        allow_ambiguous=allow_ambiguous,
        signature_frames=signature_frames,
        sam_model_id=sam_model_id,
        min_hits_per_label=min_hits_per_label,
        frame_strategy=frame_strategy,
    )

    # Resolve prompt entities against detected aliases and write canonical names expected by prompt parser.
    labels_now = load_label_bboxes(labels_path)
    commands = parse_prompt(prompt)
    cmd = commands[0]
    target_requested = _canon_label(cmd.args.get("target", ""))
    anchor_requested = _canon_label(cmd.args.get("anchor", ""))
    target_resolved = _resolve_entity_label(target_requested, labels_now, sam_result.label_hits)
    if target_resolved is None:
        raise RuntimeError(
            f"Target '{target_requested}' not detected (including aliases {_label_aliases(target_requested)})."
        )
    if target_resolved != target_requested:
        labels_now[target_requested] = labels_now[target_resolved]
    if cmd.args.get("relation") == "near":
        anchor_resolved = _resolve_entity_label(anchor_requested, labels_now, sam_result.label_hits)
        if anchor_resolved is None:
            raise RuntimeError(
                f"Anchor '{anchor_requested}' not detected (including aliases {_label_aliases(anchor_requested)})."
            )
        if anchor_resolved != anchor_requested:
            labels_now[anchor_requested] = labels_now[anchor_resolved]
    save_label_bboxes(labels_path, labels_now)

    precheck = validate_prompt_move(
        ply_path=ply_path,
        labels_path=labels_path,
        prompt=prompt,
    )
    labels = load_label_bboxes(labels_path)
    _, room_bounds = bounds_for_path(ply_path)
    commands = parse_prompt(prompt)
    cmd = commands[0]
    target_name = _canon_label(cmd.args.get("target", ""))
    placement_strategy = "prompt_direct"
    invalid = (not precheck.in_bounds) or (len(precheck.clashes) > 0) or (
        not precheck.support_ok
    )
    out_p: Path
    moved_points: int
    translation: tuple[float, float, float]

    if invalid:
        anchor_name = _canon_label(cmd.args.get("anchor", ""))
        near_plan = None
        if cmd.args.get("relation") == "near" and target_name and anchor_name:
            near_plan = _find_nearby_valid_translation(
                target_name=target_name,
                anchor_name=anchor_name,
                labels=labels,
                room_bounds=room_bounds,
            )
        if near_plan is not None:
            placement_strategy = "auto_near_search"
            target_bbox = labels[target_name]
            out_p, moved_points = move_bbox_with_translation(
                input_path=ply_path,
                select_bbox=target_bbox,
                translate=near_plan,
                out_path=out_path,
                hole_fill=hole_fill,
                hole_fill_margin=hole_fill_margin,
                hole_fill_ratio=hole_fill_ratio,
            )
            translation = near_plan
        else:
            if fail_on_invalid:
                raise RuntimeError(
                    "Auto edit rejected by validation. "
                    f"in_bounds={precheck.in_bounds}, clashes={precheck.clashes}, "
                    f"support_ok={precheck.support_ok}. See {labels_path} and {debug_dir}."
                )
            placement_strategy = "forced_prompt_direct"
            out_p, moved_points, translation = move_labeled_with_prompt(
                input_path=ply_path,
                labels_path=labels_path,
                prompt=prompt,
                out_path=out_path,
                hole_fill=hole_fill,
                hole_fill_margin=hole_fill_margin,
                hole_fill_ratio=hole_fill_ratio,
            )
    else:
        out_p, moved_points, translation = move_labeled_with_prompt(
            input_path=ply_path,
            labels_path=labels_path,
            prompt=prompt,
            out_path=out_path,
            hole_fill=hole_fill,
            hole_fill_margin=hole_fill_margin,
            hole_fill_ratio=hole_fill_ratio,
        )

    report = {
        "prompt": prompt,
        "entities": entities,
        "output_ply": str(out_p),
        "labels_path": str(labels_path),
        "sam": {
            "sampled_frames": sam_result.sampled_frames,
            "sam_model_id": sam_model_id,
            "min_hits_per_label": min_hits_per_label,
            "frame_strategy": frame_strategy,
            "label_hits": sam_result.label_hits,
            "best_detections": sam_result.best_detections,
            "issues": sam_result.issues,
            "label_bboxes": {
                k: [*v[0], *v[1]] for k, v in sam_result.label_bboxes.items()
            },
        },
        "precheck": asdict(precheck),
        "moved_points": moved_points,
        "translation": list(translation),
        "placement_strategy": placement_strategy,
        "postcheck": _assess_move(
            target_name=target_name,
            labels=labels,
            room_bounds=room_bounds,
            translation=translation,
        ),
        "hole_fill": {
            "enabled": hole_fill,
            "margin": hole_fill_margin,
            "ratio": hole_fill_ratio,
        },
    }
    report_path = wd / "auto_edit_report.json"
    report_path.write_text(json.dumps(report, indent=2) + "\n")

    return AutoEditResult(
        output_ply=out_p,
        labels_path=labels_path,
        report_path=report_path,
        moved_points=moved_points,
        translation=translation,
        sam=sam_result,
        precheck=precheck,
        placement_strategy=placement_strategy,
        postcheck=report["postcheck"],
    )
