from __future__ import annotations

from dataclasses import dataclass
import json
from pathlib import Path

from .nl_to_edit import parse_prompt
from .object_mesh_edit import (
    ObjectEditResult,
    apply_object_prompt_edit,
    build_object_mesh_assets,
)
from .sam_pipeline import AutoLabelResult, auto_label_from_video_with_sam


@dataclass
class AutoObjectEditResult:
    output_ply: Path
    output_labels: Path
    labels_path: Path
    report_path: Path
    objects_manifest_path: Path
    sam: AutoLabelResult
    edit: ObjectEditResult


def _canon_label(value: str) -> str:
    out = " ".join(value.strip().lower().split())
    if out.startswith("the "):
        out = out[4:].strip()
    if out.endswith("s") and len(out) > 1:
        out = out[:-1]
    return out


def _strip_descriptors(value: str) -> str:
    words = _canon_label(value).split()
    descriptors = {
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
    while words and words[0] in descriptors:
        words = words[1:]
    return " ".join(words)


def _prompt_entities(prompt: str) -> list[str]:
    commands = parse_prompt(prompt)
    if len(commands) != 1:
        raise ValueError("Only single-command prompts are supported.")
    cmd = commands[0]
    if cmd.op == "move":
        out = [cmd.args.get("target", "")]
        if cmd.args.get("relation") == "near":
            out.append(cmd.args.get("anchor", ""))
        vals = [_strip_descriptors(v) or _canon_label(v) for v in out if v.strip()]
        if not vals:
            raise ValueError("Prompt did not contain any detectable objects.")
        return vals
    if cmd.op == "swap":
        a = cmd.args.get("a", "").strip()
        b = cmd.args.get("b", "").strip()
        if not a or not b:
            raise ValueError("Swap prompt requires two object names.")
        return [
            _strip_descriptors(a) or _canon_label(a),
            _strip_descriptors(b) or _canon_label(b),
        ]
    if cmd.op == "swap_two":
        label = cmd.args.get("label", "").strip()
        if not label:
            raise ValueError("swap_two prompt requires an object label.")
        return [_strip_descriptors(label) or _canon_label(label)]
    raise ValueError("Auto object edit currently supports move, swap, and swap_two prompts.")


def run_auto_object_prompt_edit(
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
    object_expand: float = 0.02,
    object_component_voxel: float = 0.06,
    object_min_points: int = 120,
    overlap_threshold: float = 0.08,
    overlap_push_step: float = 0.06,
    overlap_max_iters: int = 40,
    hole_fill: bool = True,
    hole_fill_margin: float = 0.2,
    hole_fill_ratio: float = 0.35,
    sam_model_id: str = "facebook/sam-vit-base",
    min_hits_per_label: int = 3,
    frame_strategy: str = "uniform",
) -> AutoObjectEditResult:
    wd = Path(work_dir).expanduser().resolve()
    wd.mkdir(parents=True, exist_ok=True)

    labels_path = wd / "auto_labels.json"
    sam_debug = wd / "sam_debug"
    objects_dir = wd / "objects"
    out_labels_path = wd / "edited_labels.json"
    object_edit_report = wd / "object_edit_report.json"
    pipeline_report = wd / "auto_object_edit_report.json"

    detection_labels = _prompt_entities(prompt)
    sam_result = auto_label_from_video_with_sam(
        video_path=video_path,
        ply_path=ply_path,
        labels=detection_labels,
        out_labels_path=labels_path,
        sample_fps=sample_fps,
        max_frames=max_frames,
        box_threshold=box_threshold,
        text_threshold=text_threshold,
        debug_dir=sam_debug,
        allow_ambiguous=allow_ambiguous,
        signature_frames=signature_frames,
        sam_model_id=sam_model_id,
        min_hits_per_label=min_hits_per_label,
        frame_strategy=frame_strategy,
    )

    objects_manifest_path, assets, skipped = build_object_mesh_assets(
        input_path=ply_path,
        labels_path=labels_path,
        out_dir=objects_dir,
        names=detection_labels,
        expand=object_expand,
        component_voxel=object_component_voxel,
        min_points=object_min_points,
    )
    if not assets:
        raise RuntimeError(
            "No object assets were extracted from detected labels. "
            f"See {objects_manifest_path}."
        )

    edit = apply_object_prompt_edit(
        input_path=ply_path,
        labels_path=labels_path,
        prompt=prompt,
        out_path=out_path,
        out_labels_path=out_labels_path,
        report_path=object_edit_report,
        select_expand=object_expand,
        component_voxel=object_component_voxel,
        min_points=object_min_points,
        overlap_threshold=overlap_threshold,
        overlap_push_step=overlap_push_step,
        overlap_max_iters=overlap_max_iters,
        hole_fill=hole_fill,
        hole_fill_margin=hole_fill_margin,
        hole_fill_ratio=hole_fill_ratio,
    )

    pipeline = {
        "prompt": prompt,
        "detection_labels": detection_labels,
        "output_ply": str(edit.output_ply),
        "labels_path": str(labels_path),
        "output_labels": str(edit.output_labels),
        "objects_manifest": str(objects_manifest_path),
        "sam": {
            "sampled_frames": sam_result.sampled_frames,
            "label_hits": sam_result.label_hits,
            "best_detections": sam_result.best_detections,
            "issues": sam_result.issues,
            "label_bboxes": {
                k: [*v[0], *v[1]] for k, v in sam_result.label_bboxes.items()
            },
        },
        "object_assets": [
            {
                "label": a.label,
                "point_count": a.point_count,
                "bbox": [*a.bbox[0], *a.bbox[1]],
                "center": list(a.center),
                "points_path": str(a.points_path),
                "proxy_mesh_path": str(a.proxy_mesh_path),
            }
            for a in assets
        ],
        "object_assets_skipped": skipped,
        "edit": {
            "output_ply": str(edit.output_ply),
            "output_labels": str(edit.output_labels),
            "report_path": str(edit.report_path),
            "moved_points": edit.moved_points,
            "moved_labels": edit.moved_labels,
            "translations": {k: list(v) for k, v in edit.translations.items()},
            "clashes_after": edit.clashes_after,
        },
        "config": {
            "sample_fps": sample_fps,
            "max_frames": max_frames,
            "box_threshold": box_threshold,
            "text_threshold": text_threshold,
            "signature_frames": signature_frames,
            "sam_model_id": sam_model_id,
            "min_hits_per_label": min_hits_per_label,
            "frame_strategy": frame_strategy,
            "object_expand": object_expand,
            "object_component_voxel": object_component_voxel,
            "object_min_points": object_min_points,
            "overlap_threshold": overlap_threshold,
            "overlap_push_step": overlap_push_step,
            "overlap_max_iters": overlap_max_iters,
            "hole_fill": hole_fill,
            "hole_fill_margin": hole_fill_margin,
            "hole_fill_ratio": hole_fill_ratio,
        },
    }
    pipeline_report.write_text(json.dumps(pipeline, indent=2) + "\n")

    return AutoObjectEditResult(
        output_ply=edit.output_ply,
        output_labels=edit.output_labels,
        labels_path=labels_path,
        report_path=pipeline_report,
        objects_manifest_path=objects_manifest_path,
        sam=sam_result,
        edit=edit,
    )
