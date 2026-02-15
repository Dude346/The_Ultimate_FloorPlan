from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from .nl_to_edit import parse_prompt
from .pointcloud_edit import (
    _canon_label,
    _destination_to_xy,
    bounds_for_path,
    load_label_bboxes,
    load_pointcloud_ply,
)


BBox = tuple[tuple[float, float, float], tuple[float, float, float]]


@dataclass
class ValidationReport:
    target: str
    prompt: str
    translation: tuple[float, float, float]
    moved_bbox: BBox
    in_bounds: bool
    clashes: list[str]
    orientation_ok: bool
    support_ok: bool


def _bbox_center_xy(bbox: BBox) -> tuple[float, float]:
    (xmin, ymin, _), (xmax, ymax, _) = bbox
    return ((xmin + xmax) / 2.0, (ymin + ymax) / 2.0)


def _bbox_translate(bbox: BBox, dx: float, dy: float, dz: float) -> BBox:
    (xmin, ymin, zmin), (xmax, ymax, zmax) = bbox
    return ((xmin + dx, ymin + dy, zmin + dz), (xmax + dx, ymax + dy, zmax + dz))


def _bbox_intersection_volume(a: BBox, b: BBox) -> float:
    (ax0, ay0, az0), (ax1, ay1, az1) = a
    (bx0, by0, bz0), (bx1, by1, bz1) = b
    ix = max(0.0, min(ax1, bx1) - max(ax0, bx0))
    iy = max(0.0, min(ay1, by1) - max(ay0, by0))
    iz = max(0.0, min(az1, bz1) - max(az0, bz0))
    return ix * iy * iz


def _bbox_volume(bbox: BBox) -> float:
    (x0, y0, z0), (x1, y1, z1) = bbox
    return max(0.0, x1 - x0) * max(0.0, y1 - y0) * max(0.0, z1 - z0)


def _compute_translation(
    prompt: str,
    target_bbox: BBox,
    labels: dict[str, BBox],
    room_bounds: BBox,
    ply_path: str | Path,
) -> tuple[float, float, float]:
    commands = parse_prompt(prompt)
    if len(commands) != 1 or commands[0].op != "move":
        raise ValueError("Validation supports move prompts only.")
    cmd = commands[0]

    pc = load_pointcloud_ply(ply_path)
    target_mask = pc.select_bbox(target_bbox[0], target_bbox[1])
    if int(target_mask.sum()) == 0:
        raise ValueError("Target bbox has zero points in input PLY.")
    sx = float(pc.vertices["x"][target_mask].mean())
    sy = float(pc.vertices["y"][target_mask].mean())
    if cmd.args.get("relation") == "near":
        anchor = _canon_label(cmd.args.get("anchor", ""))
        if anchor not in labels:
            raise ValueError(f"Anchor '{anchor}' not found in labels.")
        anchor_bbox = labels[anchor]
        anchor_mask = pc.select_bbox(anchor_bbox[0], anchor_bbox[1])
        if int(anchor_mask.sum()) == 0:
            raise ValueError("Anchor bbox has zero points in input PLY.")
        ax = float(pc.vertices["x"][anchor_mask].mean())
        ay = float(pc.vertices["y"][anchor_mask].mean())
        (min_x, min_y, _), (max_x, max_y, _) = room_bounds
        span = max(max_x - min_x, max_y - min_y)
        offset = max(span * 0.06, 0.18)
        return (ax + offset - sx, ay - sy, 0.0)

    destination = cmd.args.get("destination")
    if not destination:
        raise ValueError("Move prompt missing destination.")
    tx, ty = _destination_to_xy(room_bounds, destination)
    return (tx - sx, ty - sy, 0.0)


def validate_prompt_move(
    ply_path: str | Path,
    labels_path: str | Path,
    prompt: str,
) -> ValidationReport:
    labels = load_label_bboxes(labels_path)
    if not labels:
        raise ValueError(
            f"No labels found in {Path(labels_path).expanduser().resolve()}. "
            "Run sam-auto-label or pc-label-set first."
        )

    commands = parse_prompt(prompt)
    if len(commands) != 1 or commands[0].op != "move":
        raise ValueError("Validation supports move prompts only.")
    target = _canon_label(commands[0].args.get("target", ""))
    if target not in labels:
        raise ValueError(f"Target '{target}' not found in labels.")

    _, room_bounds = bounds_for_path(ply_path)
    target_bbox = labels[target]
    dx, dy, dz = _compute_translation(
        prompt, target_bbox, labels, room_bounds, ply_path=ply_path
    )
    moved_bbox = _bbox_translate(target_bbox, dx, dy, dz)

    (rx0, ry0, rz0), (rx1, ry1, rz1) = room_bounds
    (mx0, my0, mz0), (mx1, my1, mz1) = moved_bbox
    in_bounds = mx0 >= rx0 and my0 >= ry0 and mz0 >= rz0 and mx1 <= rx1 and my1 <= ry1 and mz1 <= rz1

    clashes: list[str] = []
    mv = _bbox_volume(moved_bbox)
    for name, bbox in labels.items():
        if name == target:
            continue
        inter = _bbox_intersection_volume(moved_bbox, bbox)
        if inter <= 0.0:
            continue
        ov = inter / max(1e-8, min(mv, _bbox_volume(bbox)))
        if ov > 0.08:
            clashes.append(name)

    orientation_ok = True
    support_ok = abs(mz0 - labels[target][0][2]) < 0.2

    return ValidationReport(
        target=target,
        prompt=prompt,
        translation=(dx, dy, dz),
        moved_bbox=moved_bbox,
        in_bounds=in_bounds,
        clashes=sorted(clashes),
        orientation_ok=orientation_ok,
        support_ok=support_ok,
    )
