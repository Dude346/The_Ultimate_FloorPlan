from .nerfstudio import preprocess, splat
from .upload import upload_video
from .base import app, VIDEOS_PATH, PREPROCESS_PATH, SPLAT_PATH
from .edit_executor import apply_commands
from .nl_to_edit import parse_prompt
from .preview import write_preview
from .scene_schema import load_scene, save_scene
from .pointcloud_edit import (
    bounds_for_path,
    extract_objects_from_labels,
    format_bounds,
    load_label_bboxes,
    move_labeled_with_prompt,
    move_bbox_with_prompt,
    move_bbox_with_translation,
    parse_bbox,
    parse_vec3,
    set_label_bbox,
)
from .video_tools import extract_frames, read_video_info
from .sam_adapter import sam_runtime_status
from .sam_pipeline import auto_label_from_video_with_sam
from .auto_edit import run_auto_prompt_edit
from .object_auto_edit import run_auto_object_prompt_edit
from .validation import validate_prompt_move


def main():
    """CLI entrypoint for the floorplan package.

    Usage examples:
      python -m floorplan upload tests/x.mp4
      python -m floorplan preprocess abcdef
      python -m floorplan splat abcdef
      python -m floorplan edit --scene examples/scene_example.json --prompt "move the chair to the back"
      python -m floorplan preview --scene examples/scene_example.json
      python -m floorplan pc-info --input "examples/Scaniverse bathroom.ply"
      python -m floorplan video-info --input IMG_7654.mp4
      python -m floorplan sam-status
      python -m floorplan sam-auto-label --video IMG_7654.mp4 --input "examples/Scaniverse bathroom.ply" --labels toilet,door --out-labels examples/bathroom.labels.json
      python -m floorplan pc-extract-objects --input "examples/Scaniverse bathroom.ply" --labels examples/bathroom.labels.json --out-dir examples/objects
      python -m floorplan pc-auto-object-edit --video IMG_7654.mp4 --input "examples/Scaniverse bathroom.ply" --prompt "move the toilet near the door" --out examples/bathroom.auto.object_edit.ply --work-dir examples/auto_object_edit
      python -m floorplan pc-auto-edit --video IMG_7654.mp4 --input "examples/Scaniverse bathroom.ply" --prompt "move the toilet near the door" --out examples/bathroom.auto.ply --work-dir examples/auto_edit
      python -m floorplan video-frames --input IMG_7654.mp4 --out examples/IMG_7654_frames --fps 1
      python -m floorplan pc-label-set --labels examples/bathroom.labels.json --name toilet --bbox x1,y1,z1,x2,y2,z2
      python -m floorplan pc-label-set --labels examples/bathroom.labels.json --name door --bbox a1,b1,c1,a2,b2,c2
      python -m floorplan pc-validate-prompt --input "examples/Scaniverse bathroom.ply" --labels examples/bathroom.labels.json --prompt "move the toilet near the door"
      python -m floorplan pc-move-labeled-prompt --input "examples/Scaniverse bathroom.ply" --labels examples/bathroom.labels.json --prompt "move the toilet near the door" --out examples/bathroom.toilet_near_door.ply
      python -m floorplan pc-move-prompt --input "examples/Scaniverse bathroom.ply" --select-bbox x1,y1,z1,x2,y2,z2 --prompt "move the toilet to the back" --out examples/bathroom.toilet_back.ply
      python -m floorplan pc-move-prompt --input "examples/Scaniverse bathroom.ply" --select-bbox x1,y1,z1,x2,y2,z2 --anchor-bbox a1,b1,c1,a2,b2,c2 --prompt "move the toilet near the door" --out examples/bathroom.toilet_near_door.ply

    Behavior:
      - upload: uploads a local MP4 into the volume at videos/<generated_id>.mp4
      - preprocess: invokes nerfstudio in Modal on file identified by the generated id.
      - splat: runs nerfstudio's splatflow (splatfacto + export) on a preprocessed id.
      - edit: parses language into structured edits and applies them to a scene JSON.
      - preview: writes a text summary of scene state to help validate edits.
      - pc-info: prints point count and XYZ bounds for a binary point-cloud PLY.
      - video-info: prints uploaded video metadata (fps/resolution/length).
      - sam-status: checks local runtime dependencies required for SAM-based grounding.
      - sam-auto-label: uses GroundingDINO + SAM on video frames to propose 3D label bboxes.
      - pc-extract-objects: writes labeled objects as separate PLY assets for persistent object-level edits.
      - pc-auto-object-edit: SAM prompt grounding -> object mesh assets -> prompt move/swap with overlap correction and hole fill.
      - pc-auto-edit: end-to-end auto detect + move + hole-fill + validation from prompt.
      - video-frames: extracts sampled frames for SAM/manual labeling workflows.
      - pc-label-set: stores a named 3D bbox label (toilet, door, sink) in JSON.
      - pc-label-show: prints saved labels and their bboxes.
      - pc-validate-prompt: validates a prompt move (bounds/clashes/support) before editing.
      - pc-move-labeled-prompt: prompt move using labels file (no bbox args each run).
      - pc-move-bbox: moves points inside a selected bbox by an explicit translation.
      - pc-move-prompt: moves points inside a selected bbox using a move prompt destination.
        For prompts like "near the door", provide --anchor-bbox for the door region.
        Use --hole-fill to synthesize a simple plane patch where the object was.
    """
    import sys
    import argparse
    import modal

    if len(sys.argv) < 2:
        print(
            "Usage: python -m floorplan "
            "{upload|preprocess|splat|edit|preview|video-info|sam-status|sam-auto-label|pc-extract-objects|pc-auto-object-edit|pc-auto-edit|video-frames|pc-info|pc-label-set|pc-label-show|pc-validate-prompt|pc-move-labeled-prompt|pc-move-bbox|pc-move-prompt} ..."
        )
        sys.exit(1)

    cmd = sys.argv[1]
    args_list = sys.argv[2:]

    if cmd == "upload":
        parser = argparse.ArgumentParser(prog="floorplan-upload")
        parser.add_argument("mp4_path", help="Local path to MP4")
        parsed = parser.parse_args(args_list)
        video_id = upload_video(parsed.mp4_path)
        print(video_id)
        print(f"Container path: {VIDEOS_PATH}/{video_id}.mp4")
    elif cmd == "preprocess":
        parser = argparse.ArgumentParser(prog="floorplan-preprocess")
        parser.add_argument(
            "video_id", help="Six-letter video id to preprocess (stored in videos/)"
        )
        parsed = parser.parse_args(args_list)
        video_id = parsed.video_id.lstrip("/")
        print(
            f"Triggering nerfstudio for volume path: {VIDEOS_PATH}/{video_id}.mp4 (call passes '{video_id}')"
        )
        modal.enable_output()
        with app.run():
            result = preprocess.remote(video_id)
        print("nerfstudio result:", result)
    elif cmd == "splat":
        parser = argparse.ArgumentParser(prog="floorplan-splat")
        parser.add_argument(
            "video_id",
            help="Six-letter video id to run splat on (same id used for preprocess)",
        )
        parsed = parser.parse_args(args_list)
        video_id = parsed.video_id.lstrip("/")
        print(
            f"Triggering nerfstudio splat for preprocess path: {PREPROCESS_PATH}/{video_id} (splat outputs will go to {SPLAT_PATH}/{video_id})"
        )
        modal.enable_output()
        with app.run():
            result = splat.remote(video_id)
        print("nerfstudio splat result:", result)
    elif cmd == "edit":
        parser = argparse.ArgumentParser(prog="floorplan-edit")
        parser.add_argument("--scene", required=True, help="Path to input scene JSON")
        parser.add_argument("--prompt", required=True, help="Natural language edit prompt")
        parser.add_argument(
            "--out",
            default=None,
            help="Output scene JSON path (defaults to <scene>.edited.json)",
        )
        parsed = parser.parse_args(args_list)
        scene = load_scene(parsed.scene)
        commands = parse_prompt(parsed.prompt)
        applied = apply_commands(scene, commands)

        if parsed.out:
            out_path = parsed.out
        else:
            if parsed.scene.lower().endswith(".json"):
                out_path = parsed.scene[:-5] + ".edited.json"
            else:
                out_path = parsed.scene + ".edited.json"

        out_p = save_scene(scene, out_path)
        print(f"Saved edited scene: {out_p}")
        for item in applied:
            print(f"- {item.description}")
    elif cmd == "preview":
        parser = argparse.ArgumentParser(prog="floorplan-preview")
        parser.add_argument("--scene", required=True, help="Path to scene JSON")
        parser.add_argument(
            "--out",
            default=None,
            help="Output preview text path (defaults to <scene>.preview.txt)",
        )
        parsed = parser.parse_args(args_list)
        scene = load_scene(parsed.scene)
        if parsed.out:
            out_path = parsed.out
        else:
            if parsed.scene.lower().endswith(".json"):
                out_path = parsed.scene[:-5] + ".preview.txt"
            else:
                out_path = parsed.scene + ".preview.txt"
        out_p = write_preview(scene, out_path)
        print(f"Saved scene preview: {out_p}")
    elif cmd == "pc-info":
        parser = argparse.ArgumentParser(prog="floorplan-pc-info")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parsed = parser.parse_args(args_list)
        count, bounds = bounds_for_path(parsed.input)
        print(f"Input: {parsed.input}")
        print(f"Points: {count}")
        print(f"Bounds: {format_bounds(bounds)}")
    elif cmd == "video-info":
        parser = argparse.ArgumentParser(prog="floorplan-video-info")
        parser.add_argument("--input", required=True, help="Path to input video")
        parsed = parser.parse_args(args_list)
        info = read_video_info(parsed.input)
        print(f"Input: {info.path}")
        print(f"Resolution: {info.width}x{info.height}")
        print(f"FPS: {info.fps:.3f}")
        print(f"Frames: {info.frame_count}")
        print(f"Duration (s): {info.duration_seconds:.2f}")
    elif cmd == "video-frames":
        parser = argparse.ArgumentParser(prog="floorplan-video-frames")
        parser.add_argument("--input", required=True, help="Path to input video")
        parser.add_argument("--out", required=True, help="Output directory for frames")
        parser.add_argument("--fps", type=float, default=1.0, help="Sampling FPS")
        parser.add_argument(
            "--max-frames", type=int, default=120, help="Maximum number of frames"
        )
        parsed = parser.parse_args(args_list)
        out_p, saved = extract_frames(
            video_path=parsed.input,
            out_dir=parsed.out,
            sample_fps=parsed.fps,
            max_frames=parsed.max_frames,
        )
        print(f"Saved {saved} frame(s) to: {out_p}")
    elif cmd == "sam-status":
        ready, required = sam_runtime_status()
        print(f"SAM runtime ready: {ready}")
        for name, ok in required.items():
            print(f"- {name}: {'ok' if ok else 'missing'}")
    elif cmd == "sam-auto-label":
        parser = argparse.ArgumentParser(prog="floorplan-sam-auto-label")
        parser.add_argument("--video", required=True, help="Path to input video")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parser.add_argument(
            "--labels",
            required=True,
            help='Comma-separated names, e.g. "toilet,door,sink"',
        )
        parser.add_argument("--out-labels", required=True, help="Output labels JSON path")
        parser.add_argument("--fps", type=float, default=0.5, help="Sampling FPS from video")
        parser.add_argument(
            "--max-frames", type=int, default=60, help="Maximum sampled frames"
        )
        parser.add_argument(
            "--box-threshold",
            type=float,
            default=0.30,
            help="GroundingDINO box threshold",
        )
        parser.add_argument(
            "--text-threshold",
            type=float,
            default=0.25,
            help="GroundingDINO text threshold",
        )
        parser.add_argument(
            "--debug-dir",
            default=None,
            help="Optional directory to write per-label overlay images and report.json",
        )
        parser.add_argument(
            "--allow-ambiguous",
            action="store_true",
            help="Write labels even if quality checks flag ambiguity",
        )
        parser.add_argument(
            "--signature-frames",
            type=int,
            default=1,
            help="How many top-scoring SAM frames to use for 3D color signature (1=highest-ranked frame only)",
        )
        parser.add_argument(
            "--min-hits-per-label",
            type=int,
            default=3,
            help="Early-stop after each label reaches this many mask hits (set 0 to scan all sampled frames)",
        )
        parser.add_argument(
            "--sam-model",
            default="facebook/sam-vit-base",
            help="SAM model id (e.g. facebook/sam-vit-base or facebook/sam2-hiera-large)",
        )
        parser.add_argument(
            "--frame-strategy",
            choices=["uniform", "sequential"],
            default="uniform",
            help="Frame sampling strategy. uniform spreads sampled frames across the video; sequential takes earliest frames first.",
        )
        parsed = parser.parse_args(args_list)
        label_list = [v.strip() for v in parsed.labels.split(",") if v.strip()]
        try:
            result = auto_label_from_video_with_sam(
                video_path=parsed.video,
                ply_path=parsed.input,
                labels=label_list,
                out_labels_path=parsed.out_labels,
                sample_fps=parsed.fps,
                max_frames=parsed.max_frames,
                box_threshold=parsed.box_threshold,
                text_threshold=parsed.text_threshold,
                debug_dir=parsed.debug_dir,
                allow_ambiguous=parsed.allow_ambiguous,
                signature_frames=parsed.signature_frames,
                sam_model_id=parsed.sam_model,
                min_hits_per_label=parsed.min_hits_per_label,
                frame_strategy=parsed.frame_strategy,
            )
        except Exception as exc:
            print(f"SAM auto-label failed: {exc}")
            raise SystemExit(1) from exc
        print(f"Sampled frames: {result.sampled_frames}")
        print(f"Saved labels: {parsed.out_labels}")
        for name, hits in sorted(result.label_hits.items()):
            print(f"Hits[{name}]: {hits}")
        for name, best in sorted(result.best_detections.items()):
            print(
                f"Best[{name}]: frame={best['frame_index']} score={float(best['score']):.3f} "
                f"box={best['box_xyxy']}"
            )
        if result.issues:
            print("Issues:")
            for issue in result.issues:
                print(f"- {issue}")
        for name, bbox in sorted(result.label_bboxes.items()):
            (xmin, ymin, zmin), (xmax, ymax, zmax) = bbox
            print(
                f"{name}: "
                f"{xmin:.4f},{ymin:.4f},{zmin:.4f},{xmax:.4f},{ymax:.4f},{zmax:.4f}"
            )
    elif cmd == "pc-extract-objects":
        parser = argparse.ArgumentParser(prog="floorplan-pc-extract-objects")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parser.add_argument("--labels", required=True, help="Path to labels JSON")
        parser.add_argument("--out-dir", required=True, help="Output directory for object assets")
        parser.add_argument(
            "--names",
            default=None,
            help='Optional comma-separated subset, e.g. "trash bin,door"',
        )
        parser.add_argument(
            "--expand",
            type=float,
            default=0.0,
            help="Expand each label bbox by this margin (meters) before extraction",
        )
        parser.add_argument(
            "--min-points",
            type=int,
            default=128,
            help="Skip labels with fewer selected points than this",
        )
        parsed = parser.parse_args(args_list)
        names = None
        if parsed.names:
            names = [v.strip() for v in parsed.names.split(",") if v.strip()]
        try:
            manifest_path, extracted, skipped = extract_objects_from_labels(
                input_path=parsed.input,
                labels_path=parsed.labels,
                out_dir=parsed.out_dir,
                names=names,
                expand=parsed.expand,
                min_points=parsed.min_points,
            )
        except Exception as exc:
            print(f"Object extraction failed: {exc}")
            raise SystemExit(1) from exc
        print(f"Manifest: {manifest_path}")
        if extracted:
            print("Extracted:")
            for obj in extracted:
                print(
                    f"- {obj['label']}: points={obj['point_count']} path={obj['path']}"
                )
        if skipped:
            print("Skipped:")
            for item in skipped:
                print(f"- {item['label']}: {item['reason']}")
    elif cmd == "pc-auto-object-edit":
        parser = argparse.ArgumentParser(prog="floorplan-pc-auto-object-edit")
        parser.add_argument("--video", required=True, help="Path to input video")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parser.add_argument(
            "--prompt",
            required=True,
            help='Prompt, e.g. "move the blue bin near the door", "swap lamp and chair", or "swap the two paintings"',
        )
        parser.add_argument("--out", required=True, help="Path to output edited .ply")
        parser.add_argument(
            "--work-dir",
            required=True,
            help="Directory for labels, mesh assets, and report artifacts",
        )
        parser.add_argument("--fps", type=float, default=0.5, help="Sampling FPS from video")
        parser.add_argument("--max-frames", type=int, default=60, help="Max sampled frames")
        parser.add_argument("--box-threshold", type=float, default=0.45)
        parser.add_argument("--text-threshold", type=float, default=0.35)
        parser.add_argument("--allow-ambiguous", action="store_true")
        parser.add_argument(
            "--signature-frames",
            type=int,
            default=1,
            help="How many top-scoring SAM frames to use for 3D color signature (1=highest-ranked frame only)",
        )
        parser.add_argument(
            "--min-hits-per-label",
            type=int,
            default=3,
            help="Early-stop after each label reaches this many mask hits (set 0 to scan all sampled frames)",
        )
        parser.add_argument(
            "--sam-model",
            default="facebook/sam-vit-base",
            help="SAM model id (e.g. facebook/sam-vit-base or facebook/sam2-hiera-large)",
        )
        parser.add_argument(
            "--frame-strategy",
            choices=["uniform", "sequential"],
            default="uniform",
            help="Frame sampling strategy. uniform spreads sampled frames across the video; sequential takes earliest frames first.",
        )
        parser.add_argument(
            "--object-expand",
            type=float,
            default=0.02,
            help="Margin (meters) added around label bbox when extracting object points",
        )
        parser.add_argument(
            "--object-component-voxel",
            type=float,
            default=0.06,
            help="Voxel size (meters) used to keep largest connected point component per object",
        )
        parser.add_argument(
            "--object-min-points",
            type=int,
            default=120,
            help="Minimum extracted points required per object",
        )
        parser.add_argument(
            "--overlap-threshold",
            type=float,
            default=0.08,
            help="Maximum allowed bbox overlap ratio before pushing objects apart",
        )
        parser.add_argument(
            "--overlap-push-step",
            type=float,
            default=0.06,
            help="Meters pushed per overlap-resolution iteration",
        )
        parser.add_argument(
            "--overlap-max-iters",
            type=int,
            default=40,
            help="Max overlap-resolution iterations per moved object",
        )
        parser.add_argument("--no-hole-fill", action="store_true")
        parser.add_argument("--hole-fill-margin", type=float, default=0.2)
        parser.add_argument("--hole-fill-ratio", type=float, default=0.35)
        parsed = parser.parse_args(args_list)
        try:
            result = run_auto_object_prompt_edit(
                video_path=parsed.video,
                ply_path=parsed.input,
                prompt=parsed.prompt,
                out_path=parsed.out,
                work_dir=parsed.work_dir,
                sample_fps=parsed.fps,
                max_frames=parsed.max_frames,
                box_threshold=parsed.box_threshold,
                text_threshold=parsed.text_threshold,
                allow_ambiguous=parsed.allow_ambiguous,
                signature_frames=parsed.signature_frames,
                sam_model_id=parsed.sam_model,
                min_hits_per_label=parsed.min_hits_per_label,
                frame_strategy=parsed.frame_strategy,
                object_expand=parsed.object_expand,
                object_component_voxel=parsed.object_component_voxel,
                object_min_points=parsed.object_min_points,
                overlap_threshold=parsed.overlap_threshold,
                overlap_push_step=parsed.overlap_push_step,
                overlap_max_iters=parsed.overlap_max_iters,
                hole_fill=not parsed.no_hole_fill,
                hole_fill_margin=parsed.hole_fill_margin,
                hole_fill_ratio=parsed.hole_fill_ratio,
            )
        except Exception as exc:
            print(f"Auto object edit failed: {exc}")
            raise SystemExit(1) from exc
        print(f"Output PLY: {result.output_ply}")
        print(f"Output labels: {result.output_labels}")
        print(f"Detected labels: {result.labels_path}")
        print(f"Objects manifest: {result.objects_manifest_path}")
        print(f"Report path: {result.report_path}")
        print(f"Moved labels: {', '.join(result.edit.moved_labels)}")
        print(f"Moved points: {result.edit.moved_points}")
        print(
            "Final clashes: "
            + ", ".join(
                f"{k}=>{v or ['none']}" for k, v in sorted(result.edit.clashes_after.items())
            )
        )
    elif cmd == "pc-auto-edit":
        parser = argparse.ArgumentParser(prog="floorplan-pc-auto-edit")
        parser.add_argument("--video", required=True, help="Path to input video")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parser.add_argument("--prompt", required=True, help='Prompt, e.g. "move the toilet near the door"')
        parser.add_argument("--out", required=True, help="Path to output .ply")
        parser.add_argument(
            "--work-dir",
            required=True,
            help="Directory for auto labels/debug/report artifacts",
        )
        parser.add_argument("--fps", type=float, default=0.5, help="Sampling FPS from video")
        parser.add_argument("--max-frames", type=int, default=60, help="Max sampled frames")
        parser.add_argument("--box-threshold", type=float, default=0.45)
        parser.add_argument("--text-threshold", type=float, default=0.35)
        parser.add_argument("--allow-ambiguous", action="store_true")
        parser.add_argument(
            "--signature-frames",
            type=int,
            default=1,
            help="How many top-scoring SAM frames to use for 3D color signature (1=highest-ranked frame only)",
        )
        parser.add_argument(
            "--min-hits-per-label",
            type=int,
            default=3,
            help="Early-stop after each label reaches this many mask hits (set 0 to scan all sampled frames)",
        )
        parser.add_argument(
            "--sam-model",
            default="facebook/sam-vit-base",
            help="SAM model id (e.g. facebook/sam-vit-base or facebook/sam2-hiera-large)",
        )
        parser.add_argument(
            "--frame-strategy",
            choices=["uniform", "sequential"],
            default="uniform",
            help="Frame sampling strategy. uniform spreads sampled frames across the video; sequential takes earliest frames first.",
        )
        parser.add_argument("--no-hole-fill", action="store_true")
        parser.add_argument("--hole-fill-margin", type=float, default=0.2)
        parser.add_argument("--hole-fill-ratio", type=float, default=0.35)
        parser.add_argument(
            "--allow-invalid-move",
            action="store_true",
            help="Proceed even if validation flags bounds/clashes/support issues",
        )
        parsed = parser.parse_args(args_list)
        try:
            result = run_auto_prompt_edit(
                video_path=parsed.video,
                ply_path=parsed.input,
                prompt=parsed.prompt,
                out_path=parsed.out,
                work_dir=parsed.work_dir,
                sample_fps=parsed.fps,
                max_frames=parsed.max_frames,
                box_threshold=parsed.box_threshold,
                text_threshold=parsed.text_threshold,
                allow_ambiguous=parsed.allow_ambiguous,
                signature_frames=parsed.signature_frames,
                sam_model_id=parsed.sam_model,
                min_hits_per_label=parsed.min_hits_per_label,
                frame_strategy=parsed.frame_strategy,
                hole_fill=not parsed.no_hole_fill,
                hole_fill_margin=parsed.hole_fill_margin,
                hole_fill_ratio=parsed.hole_fill_ratio,
                fail_on_invalid=not parsed.allow_invalid_move,
            )
        except Exception as exc:
            print(f"Auto edit failed: {exc}")
            raise SystemExit(1) from exc
        print(f"Output PLY: {result.output_ply}")
        print(f"Labels path: {result.labels_path}")
        print(f"Report path: {result.report_path}")
        print(f"Moved points: {result.moved_points}")
        print(f"Placement strategy: {result.placement_strategy}")
        print(
            "Precheck: "
            f"in_bounds={result.precheck.in_bounds}, "
            f"orientation_ok={result.precheck.orientation_ok}, "
            f"support_ok={result.precheck.support_ok}, "
            f"clashes={result.precheck.clashes or ['none']}"
        )
        print(
            "Postcheck: "
            f"in_bounds={result.postcheck['in_bounds']}, "
            f"orientation_ok={result.postcheck['orientation_ok']}, "
            f"support_ok={result.postcheck['support_ok']}, "
            f"clashes={result.postcheck['clashes'] or ['none']}"
        )
    elif cmd == "pc-label-set":
        parser = argparse.ArgumentParser(prog="floorplan-pc-label-set")
        parser.add_argument("--labels", required=True, help="Path to labels JSON")
        parser.add_argument("--name", required=True, help="Label name, e.g. toilet")
        parser.add_argument(
            "--bbox",
            required=True,
            help="xmin,ymin,zmin,xmax,ymax,zmax for this label",
        )
        parsed = parser.parse_args(args_list)
        bbox = parse_bbox(parsed.bbox)
        out_p = set_label_bbox(parsed.labels, parsed.name, bbox)
        print(f"Updated labels file: {out_p}")
    elif cmd == "pc-label-show":
        parser = argparse.ArgumentParser(prog="floorplan-pc-label-show")
        parser.add_argument("--labels", required=True, help="Path to labels JSON")
        parsed = parser.parse_args(args_list)
        labels = load_label_bboxes(parsed.labels)
        if not labels:
            print("No labels found.")
        else:
            for name, bbox in sorted(labels.items()):
                (xmin, ymin, zmin), (xmax, ymax, zmax) = bbox
                print(
                    f"{name}: "
                    f"{xmin:.4f},{ymin:.4f},{zmin:.4f},{xmax:.4f},{ymax:.4f},{zmax:.4f}"
                )
    elif cmd == "pc-validate-prompt":
        parser = argparse.ArgumentParser(prog="floorplan-pc-validate-prompt")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parser.add_argument("--labels", required=True, help="Path to labels JSON")
        parser.add_argument(
            "--prompt",
            required=True,
            help='Prompt like "move the toilet near the door"',
        )
        parsed = parser.parse_args(args_list)
        report = validate_prompt_move(
            ply_path=parsed.input, labels_path=parsed.labels, prompt=parsed.prompt
        )
        (x0, y0, z0), (x1, y1, z1) = report.moved_bbox
        print(f"Target: {report.target}")
        print(f"Prompt: {report.prompt}")
        print(
            f"Predicted translation: "
            f"({report.translation[0]:.4f}, {report.translation[1]:.4f}, {report.translation[2]:.4f})"
        )
        print(
            "Predicted moved bbox: "
            f"{x0:.4f},{y0:.4f},{z0:.4f},{x1:.4f},{y1:.4f},{z1:.4f}"
        )
        print(f"In bounds: {report.in_bounds}")
        print(f"Orientation ok: {report.orientation_ok}")
        print(f"Support ok: {report.support_ok}")
        print(f"Clashes: {', '.join(report.clashes) if report.clashes else 'none'}")
    elif cmd == "pc-move-labeled-prompt":
        parser = argparse.ArgumentParser(prog="floorplan-pc-move-labeled-prompt")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parser.add_argument("--labels", required=True, help="Path to labels JSON")
        parser.add_argument(
            "--prompt",
            required=True,
            help='Prompt like "move the toilet near the door" or "move sink to the back"',
        )
        parser.add_argument(
            "--hole-fill",
            action="store_true",
            help="Fill old object region with a local plane patch after move",
        )
        parser.add_argument(
            "--hole-fill-margin",
            type=float,
            default=0.2,
            help="Neighborhood margin (meters) used for hole-fill plane fitting",
        )
        parser.add_argument(
            "--hole-fill-ratio",
            type=float,
            default=0.35,
            help="Fraction of moved-point count to synthesize as fill points",
        )
        parser.add_argument(
            "--validate",
            action="store_true",
            help="Run pre-move validity checks and print the report",
        )
        parser.add_argument("--out", required=True, help="Path to output .ply")
        parsed = parser.parse_args(args_list)
        if parsed.validate:
            report = validate_prompt_move(
                ply_path=parsed.input, labels_path=parsed.labels, prompt=parsed.prompt
            )
            print(
                f"Validation: in_bounds={report.in_bounds}, "
                f"orientation_ok={report.orientation_ok}, "
                f"support_ok={report.support_ok}, "
                f"clashes={report.clashes or ['none']}"
            )
        out_p, moved_count, delta = move_labeled_with_prompt(
            input_path=parsed.input,
            labels_path=parsed.labels,
            prompt=parsed.prompt,
            out_path=parsed.out,
            hole_fill=parsed.hole_fill,
            hole_fill_margin=parsed.hole_fill_margin,
            hole_fill_ratio=parsed.hole_fill_ratio,
        )
        print(f"Saved edited PLY: {out_p}")
        print(f"Moved points: {moved_count}")
        print(f"Computed translation from prompt: {delta}")
    elif cmd == "pc-move-bbox":
        parser = argparse.ArgumentParser(prog="floorplan-pc-move-bbox")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parser.add_argument(
            "--select-bbox",
            required=True,
            help="xmin,ymin,zmin,xmax,ymax,zmax for selected points",
        )
        parser.add_argument(
            "--translate",
            required=True,
            help="dx,dy,dz translation for selected points",
        )
        parser.add_argument(
            "--hole-fill",
            action="store_true",
            help="Fill old object region with a local plane patch after move",
        )
        parser.add_argument(
            "--hole-fill-margin",
            type=float,
            default=0.2,
            help="Neighborhood margin (meters) used for hole-fill plane fitting",
        )
        parser.add_argument(
            "--hole-fill-ratio",
            type=float,
            default=0.35,
            help="Fraction of moved-point count to synthesize as fill points",
        )
        parser.add_argument("--out", required=True, help="Path to output .ply")
        parsed = parser.parse_args(args_list)
        bbox = parse_bbox(parsed.select_bbox)
        delta = parse_vec3(parsed.translate)
        out_p, moved_count = move_bbox_with_translation(
            input_path=parsed.input,
            select_bbox=bbox,
            translate=delta,
            out_path=parsed.out,
            hole_fill=parsed.hole_fill,
            hole_fill_margin=parsed.hole_fill_margin,
            hole_fill_ratio=parsed.hole_fill_ratio,
        )
        print(f"Saved edited PLY: {out_p}")
        print(f"Moved points: {moved_count}")
        print(f"Applied translation: {delta}")
    elif cmd == "pc-move-prompt":
        parser = argparse.ArgumentParser(prog="floorplan-pc-move-prompt")
        parser.add_argument("--input", required=True, help="Path to input .ply")
        parser.add_argument(
            "--select-bbox",
            required=True,
            help="xmin,ymin,zmin,xmax,ymax,zmax for selected points (the object)",
        )
        parser.add_argument(
            "--prompt",
            required=True,
            help='Move prompt, e.g. "move the toilet to the back" or "move the toilet near the door"',
        )
        parser.add_argument(
            "--anchor-bbox",
            default=None,
            help="Optional anchor bbox xmin,ymin,zmin,xmax,ymax,zmax for prompts with 'near ...'",
        )
        parser.add_argument(
            "--hole-fill",
            action="store_true",
            help="Fill old object region with a local plane patch after move",
        )
        parser.add_argument(
            "--hole-fill-margin",
            type=float,
            default=0.2,
            help="Neighborhood margin (meters) used for hole-fill plane fitting",
        )
        parser.add_argument(
            "--hole-fill-ratio",
            type=float,
            default=0.35,
            help="Fraction of moved-point count to synthesize as fill points",
        )
        parser.add_argument("--out", required=True, help="Path to output .ply")
        parsed = parser.parse_args(args_list)
        bbox = parse_bbox(parsed.select_bbox)
        anchor_bbox = parse_bbox(parsed.anchor_bbox) if parsed.anchor_bbox else None
        out_p, moved_count, delta = move_bbox_with_prompt(
            input_path=parsed.input,
            select_bbox=bbox,
            prompt=parsed.prompt,
            anchor_bbox=anchor_bbox,
            out_path=parsed.out,
            hole_fill=parsed.hole_fill,
            hole_fill_margin=parsed.hole_fill_margin,
            hole_fill_ratio=parsed.hole_fill_ratio,
        )
        print(f"Saved edited PLY: {out_p}")
        print(f"Moved points: {moved_count}")
        print(f"Computed translation from prompt: {delta}")
    else:
        print(f"Unknown command: {cmd}")
        print(
            "Usage: python -m floorplan "
            "{upload|preprocess|splat|edit|preview|video-info|sam-status|sam-auto-label|pc-extract-objects|pc-auto-object-edit|pc-auto-edit|video-frames|pc-info|pc-label-set|pc-label-show|pc-validate-prompt|pc-move-labeled-prompt|pc-move-bbox|pc-move-prompt} ..."
        )
        sys.exit(1)
