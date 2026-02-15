from __future__ import annotations

from dataclasses import dataclass
import inspect
import json
import os
from pathlib import Path

import cv2
import numpy as np

from .pointcloud_edit import load_label_bboxes, load_pointcloud_ply, save_label_bboxes
from .sam_adapter import ensure_sam_runtime


def _canon_label(label: str) -> str:
    out = " ".join(label.strip().lower().split())
    if out.startswith("the "):
        out = out[4:].strip()
    if out.endswith("s") and len(out) > 1:
        out = out[:-1]
    return out


def _color_fields(vertices: np.ndarray) -> tuple[str, str, str]:
    names = set(vertices.dtype.names or [])
    if {"red", "green", "blue"}.issubset(names):
        return ("red", "green", "blue")
    if {"r", "g", "b"}.issubset(names):
        return ("r", "g", "b")
    raise ValueError("PLY is missing RGB color fields.")


def _iter_sampled_frames(
    video_path: Path, sample_fps: float, max_frames: int, frame_strategy: str = "uniform"
) -> list[np.ndarray]:
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video: {video_path}")

    fps = float(cap.get(cv2.CAP_PROP_FPS))
    interval = max(1, int(round(fps / max(sample_fps, 0.1))))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)

    strategy = frame_strategy.strip().lower()
    if strategy not in {"uniform", "sequential"}:
        raise ValueError(f"Unsupported frame_strategy '{frame_strategy}'. Use 'uniform' or 'sequential'.")

    if total_frames > 0:
        candidate_idx = list(range(0, total_frames, interval))
        if strategy == "uniform" and len(candidate_idx) > max_frames:
            pos = np.linspace(0, len(candidate_idx) - 1, num=max_frames, dtype=np.int32)
            target_idx = [candidate_idx[int(i)] for i in pos]
        else:
            target_idx = candidate_idx[:max_frames]
        target_set = set(target_idx)
    else:
        target_set = set()

    frames: list[np.ndarray] = []
    frame_idx = 0
    try:
        while len(frames) < max_frames:
            ok, frame_bgr = cap.read()
            if not ok:
                break
            if target_set:
                if frame_idx in target_set:
                    frames.append(cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB))
            elif frame_idx % interval == 0:
                frames.append(cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB))
            frame_idx += 1
    finally:
        cap.release()
    return frames


def _bbox_from_rgb_signature(
    vertices: np.ndarray,
    target_rgb: np.ndarray,
    label: str | None = None,
) -> tuple[tuple[float, float, float], tuple[float, float, float]]:
    cr, cg, cb = _color_fields(vertices)
    rgb = np.stack((vertices[cr], vertices[cg], vertices[cb]), axis=1).astype(np.float32)
    xyz = np.stack((vertices["x"], vertices["y"], vertices["z"]), axis=1).astype(np.float32)

    dist = np.linalg.norm(rgb - target_rgb[None, :], axis=1)
    n = dist.shape[0]
    keep_n = max(1500, min(25000, n // 40))
    keep_n = max(1, min(keep_n, n))
    kth = max(0, keep_n - 1)
    idx = np.argpartition(dist, kth)[:keep_n]
    pts = xyz[idx]

    # Keep the dominant connected component in voxelized space.
    # This avoids selecting multiple distant objects sharing a similar color.
    if pts.shape[0] >= 256:
        mn = pts.min(axis=0)
        span = np.maximum(pts.max(axis=0) - mn, 1e-3)
        voxel = float(max(0.03, min(0.12, 0.08 * np.max(span))))
        grid = np.floor((pts - mn[None, :]) / voxel).astype(np.int32)
        voxel_to_idx: dict[tuple[int, int, int], list[int]] = {}
        for i, g in enumerate(grid):
            key = (int(g[0]), int(g[1]), int(g[2]))
            voxel_to_idx.setdefault(key, []).append(i)
        offsets = (
            (1, 0, 0),
            (-1, 0, 0),
            (0, 1, 0),
            (0, -1, 0),
            (0, 0, 1),
            (0, 0, -1),
        )
        unseen = set(voxel_to_idx.keys())
        best_keys: set[tuple[int, int, int]] = set()
        best_count = 0
        while unseen:
            start = unseen.pop()
            stack = [start]
            comp = {start}
            count = len(voxel_to_idx[start])
            while stack:
                x, y, z = stack.pop()
                for dx, dy, dz in offsets:
                    nk = (x + dx, y + dy, z + dz)
                    if nk in unseen:
                        unseen.remove(nk)
                        comp.add(nk)
                        count += len(voxel_to_idx[nk])
                        stack.append(nk)
            if count > best_count:
                best_count = count
                best_keys = comp
        if best_count >= 96:
            keep_idx: list[int] = []
            for key in best_keys:
                keep_idx.extend(voxel_to_idx[key])
            pts = pts[np.array(sorted(keep_idx), dtype=np.int64)]

    center = np.median(pts, axis=0)
    r = np.linalg.norm(pts - center[None, :], axis=1)
    pts = pts[r <= np.quantile(r, 0.85)]
    if pts.shape[0] < 64:
        raise ValueError("Not enough points after color clustering.")

    low = np.quantile(pts, 0.05, axis=0)
    high = np.quantile(pts, 0.95, axis=0)
    return (
        (float(low[0]), float(low[1]), float(low[2])),
        (float(high[0]), float(high[1]), float(high[2])),
    )


@dataclass
class AutoLabelResult:
    label_bboxes: dict[str, tuple[tuple[float, float, float], tuple[float, float, float]]]
    sampled_frames: int
    label_hits: dict[str, int]
    best_detections: dict[str, dict[str, float | int | list[float]]]
    issues: list[str]


def _post_process_grounding(
    dino_processor,
    det_outputs,
    input_ids,
    target_size: tuple[int, int],
    box_threshold: float,
    text_threshold: float,
) -> dict:
    fn = dino_processor.post_process_grounded_object_detection
    sig = inspect.signature(fn)

    kwargs: dict = {
        "text_threshold": text_threshold,
        "target_sizes": [target_size],
    }
    if "box_threshold" in sig.parameters:
        kwargs["box_threshold"] = box_threshold
    elif "threshold" in sig.parameters:
        kwargs["threshold"] = box_threshold

    try:
        return fn(det_outputs, input_ids, **kwargs)[0]
    except TypeError:
        # Fallback for API variants where one arg name is not accepted.
        kwargs.pop("box_threshold", None)
        kwargs.pop("threshold", None)
        kwargs["threshold"] = box_threshold
        try:
            return fn(det_outputs, input_ids, **kwargs)[0]
        except TypeError:
            kwargs.pop("threshold", None)
            kwargs["box_threshold"] = box_threshold
            return fn(det_outputs, input_ids, **kwargs)[0]


def _extract_detection_triples(det_results: dict) -> list[tuple[np.ndarray, float, str]]:
    boxes = det_results.get("boxes", [])
    scores = det_results.get("scores", [])
    labels_out = det_results.get("labels")
    if labels_out is None:
        labels_out = det_results.get("text_labels")
    if labels_out is None:
        labels_out = det_results.get("phrases", [])

    triples: list[tuple[np.ndarray, float, str]] = []
    for box, score, label in zip(boxes, scores, labels_out):
        score_f = float(score.item() if hasattr(score, "item") else score)
        box_np = np.asarray(box.detach().cpu().numpy() if hasattr(box, "detach") else box)
        triples.append((box_np, score_f, str(label)))
    return triples


def _best_box_single_label(
    dino_processor,
    dino_model,
    image,
    label: str,
    device,
    torch_mod,
    box_threshold: float,
    text_threshold: float,
) -> tuple[np.ndarray, float] | None:
    text_prompt = f"{label}."
    threshold_schedule = [
        (box_threshold, text_threshold),
        (max(0.20, box_threshold * 0.75), max(0.15, text_threshold * 0.75)),
        (0.15, 0.10),
    ]
    best_overall: tuple[np.ndarray, float] | None = None
    for box_t, text_t in threshold_schedule:
        det_inputs = dino_processor(images=image, text=text_prompt, return_tensors="pt")
        det_inputs = {
            k: v.to(device) if hasattr(v, "to") else v for k, v in det_inputs.items()
        }
        with torch_mod.no_grad():
            det_outputs = dino_model(**det_inputs)
        det_results = _post_process_grounding(
            dino_processor,
            det_outputs,
            det_inputs["input_ids"],
            target_size=image.size[::-1],
            box_threshold=box_t,
            text_threshold=text_t,
        )
        triples = _extract_detection_triples(det_results)
        if not triples:
            continue
        best = max(triples, key=lambda t: t[1])
        if best_overall is None or best[1] > best_overall[1]:
            best_overall = (best[0], best[1])
        if best_overall is not None and best_overall[1] >= 0.35:
            break
    return best_overall


def _mask_from_sam_output(masks: list, iou_scores) -> np.ndarray:
    # Expected common shapes:
    # - masks[0]: [1, 3, H, W] (1 prompt box, 3 mask candidates)
    # - iou_scores: [1, 1, 3]
    best_idx = int(np.argmax(iou_scores))
    mask_t = masks[0]

    if hasattr(mask_t, "detach"):
        mask_t = mask_t.detach().cpu().numpy()
    else:
        mask_t = np.asarray(mask_t)

    if mask_t.ndim == 4:
        mask_t = mask_t[0]
    if mask_t.ndim == 3:
        pick = min(best_idx, max(0, mask_t.shape[0] - 1))
        mask_t = mask_t[pick]
    if mask_t.ndim != 2:
        raise RuntimeError(f"Unexpected SAM mask shape: {mask_t.shape}")

    return mask_t > 0


def _post_process_sam_masks(sam_processor, pred_masks, sam_inputs):
    original_sizes = sam_inputs.get("original_sizes")
    if original_sizes is None:
        raise RuntimeError("SAM inputs missing 'original_sizes'.")
    if hasattr(original_sizes, "cpu"):
        original_sizes = original_sizes.cpu()

    reshaped_input_sizes = sam_inputs.get("reshaped_input_sizes")
    if reshaped_input_sizes is not None and hasattr(reshaped_input_sizes, "cpu"):
        reshaped_input_sizes = reshaped_input_sizes.cpu()

    # SAM v1 expects (pred_masks, original_sizes, reshaped_input_sizes)
    # SAM2 expects (pred_masks, original_sizes)
    if reshaped_input_sizes is not None:
        try:
            return sam_processor.post_process_masks(pred_masks, original_sizes, reshaped_input_sizes)
        except TypeError:
            pass
    return sam_processor.post_process_masks(pred_masks, original_sizes)


def _from_pretrained_with_local_fallback(loader, model_id: str):
    try:
        # Prefer local cache first to avoid unnecessary network calls.
        prev_offline = os.environ.get("HF_HUB_OFFLINE")
        os.environ["HF_HUB_OFFLINE"] = "1"
        try:
            return loader(model_id, local_files_only=True)
        finally:
            if prev_offline is None:
                os.environ.pop("HF_HUB_OFFLINE", None)
            else:
                os.environ["HF_HUB_OFFLINE"] = prev_offline
    except Exception:
        return loader(model_id)


def _bbox_volume(b: tuple[tuple[float, float, float], tuple[float, float, float]]) -> float:
    (x0, y0, z0), (x1, y1, z1) = b
    return max(0.0, x1 - x0) * max(0.0, y1 - y0) * max(0.0, z1 - z0)


def _bbox_overlap_ratio(
    a: tuple[tuple[float, float, float], tuple[float, float, float]],
    b: tuple[tuple[float, float, float], tuple[float, float, float]],
) -> float:
    (ax0, ay0, az0), (ax1, ay1, az1) = a
    (bx0, by0, bz0), (bx1, by1, bz1) = b
    ix = max(0.0, min(ax1, bx1) - max(ax0, bx0))
    iy = max(0.0, min(ay1, by1) - max(ay0, by0))
    iz = max(0.0, min(az1, bz1) - max(az0, bz0))
    inter = ix * iy * iz
    if inter <= 0.0:
        return 0.0
    return inter / max(1e-8, min(_bbox_volume(a), _bbox_volume(b)))


def _save_debug_overlay(
    frame_rgb: np.ndarray,
    mask: np.ndarray,
    xyxy: np.ndarray,
    score: float,
    label: str,
    out_path: Path,
) -> None:
    vis = frame_rgb.copy()
    vis[mask] = (0.65 * vis[mask] + 0.35 * np.array([255, 80, 80], dtype=np.float32)).astype(
        np.uint8
    )
    x0, y0, x1, y1 = [int(v) for v in xyxy]
    cv2.rectangle(vis, (x0, y0), (x1, y1), (60, 255, 60), 2)
    cv2.putText(
        vis,
        f"{label} {score:.2f}",
        (x0, max(20, y0 - 8)),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (255, 255, 0),
        2,
        cv2.LINE_AA,
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(str(out_path), cv2.cvtColor(vis, cv2.COLOR_RGB2BGR))


def auto_label_from_video_with_sam(
    video_path: str | Path,
    ply_path: str | Path,
    labels: list[str],
    out_labels_path: str | Path,
    sample_fps: float = 0.5,
    max_frames: int = 60,
    box_threshold: float = 0.30,
    text_threshold: float = 0.25,
    debug_dir: str | Path | None = None,
    allow_ambiguous: bool = False,
    min_hits_per_label: int = 3,
    signature_frames: int = 1,
    sam_model_id: str = "facebook/sam-vit-base",
    frame_strategy: str = "uniform",
) -> AutoLabelResult:
    ensure_sam_runtime()

    import torch
    from PIL import Image
    from transformers import AutoModelForZeroShotObjectDetection, AutoProcessor

    video_p = Path(video_path).expanduser().resolve()
    frames = _iter_sampled_frames(
        video_p,
        sample_fps=sample_fps,
        max_frames=max_frames,
        frame_strategy=frame_strategy,
    )
    if not frames:
        raise ValueError("No sampled frames extracted from video.")

    labels_norm = [_canon_label(v) for v in labels if _canon_label(v)]
    if not labels_norm:
        raise ValueError("No valid labels provided.")

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    dino_processor = _from_pretrained_with_local_fallback(
        AutoProcessor.from_pretrained, "IDEA-Research/grounding-dino-base"
    )
    dino_model = _from_pretrained_with_local_fallback(
        AutoModelForZeroShotObjectDetection.from_pretrained, "IDEA-Research/grounding-dino-base"
    ).to(device)
    sam_model_id_norm = sam_model_id.strip()
    if not sam_model_id_norm:
        raise ValueError("sam_model_id must be a non-empty model id.")
    if "sam2" in sam_model_id_norm.lower():
        from transformers import Sam2Model, Sam2Processor

        sam_processor = _from_pretrained_with_local_fallback(
            Sam2Processor.from_pretrained, sam_model_id_norm
        )
        sam_model = _from_pretrained_with_local_fallback(
            Sam2Model.from_pretrained, sam_model_id_norm
        ).to(device)
    else:
        from transformers import SamModel, SamProcessor

        sam_processor = _from_pretrained_with_local_fallback(
            SamProcessor.from_pretrained, sam_model_id_norm
        )
        sam_model = _from_pretrained_with_local_fallback(
            SamModel.from_pretrained, sam_model_id_norm
        ).to(device)

    per_label_colors: dict[str, list[tuple[float, np.ndarray]]] = {
        k: [] for k in labels_norm
    }
    label_hits: dict[str, int] = {k: 0 for k in labels_norm}
    label_scores: dict[str, list[float]] = {k: [] for k in labels_norm}
    best_detections: dict[str, dict[str, float | int | list[float]]] = {}
    debug_counts: dict[str, int] = {k: 0 for k in labels_norm}
    debug_root = Path(debug_dir).expanduser().resolve() if debug_dir else None

    for frame_idx, frame_rgb in enumerate(frames):
        if min_hits_per_label > 0 and all(
            label_hits.get(k, 0) >= min_hits_per_label for k in labels_norm
        ):
            break
        image = Image.fromarray(frame_rgb)
        for key in labels_norm:
            best = _best_box_single_label(
                dino_processor=dino_processor,
                dino_model=dino_model,
                image=image,
                label=key,
                device=device,
                torch_mod=torch,
                box_threshold=box_threshold,
                text_threshold=text_threshold,
            )
            if best is None:
                continue
            xyxy, score = best
            prev = best_detections.get(key)
            if prev is None or float(score) > float(prev["score"]):
                best_detections[key] = {
                    "frame_index": int(frame_idx),
                    "score": float(score),
                    "box_xyxy": [
                        float(xyxy[0]),
                        float(xyxy[1]),
                        float(xyxy[2]),
                        float(xyxy[3]),
                    ],
                }
            sam_inputs = sam_processor(
                image,
                input_boxes=[[[float(xyxy[0]), float(xyxy[1]), float(xyxy[2]), float(xyxy[3])]]],
                return_tensors="pt",
            )
            sam_inputs = {k: v.to(device) if hasattr(v, "to") else v for k, v in sam_inputs.items()}
            with torch.no_grad():
                sam_outputs = sam_model(**sam_inputs)

            masks = _post_process_sam_masks(
                sam_processor,
                sam_outputs.pred_masks.cpu(),
                sam_inputs,
            )
            iou_scores = sam_outputs.iou_scores[0, 0].detach().cpu().numpy()
            mask = _mask_from_sam_output(masks, iou_scores)
            pixels = frame_rgb[mask]
            if pixels.shape[0] > 0:
                label_hits[key] += 1
                label_scores[key].append(float(score))
                if pixels.shape[0] > 4000:
                    pick = np.random.default_rng(0).choice(
                        pixels.shape[0], size=4000, replace=False
                    )
                    pixels = pixels[pick]
                per_label_colors[key].append((float(score), pixels.astype(np.float32)))
                if debug_root and debug_counts[key] < 6:
                    out_path = debug_root / f"{key}_frame{frame_idx:03d}_{debug_counts[key]:02d}.jpg"
                    _save_debug_overlay(
                        frame_rgb=frame_rgb,
                        mask=mask,
                        xyxy=xyxy,
                        score=float(score),
                        label=key,
                        out_path=out_path,
                    )
                    debug_counts[key] += 1

    sampled_color: dict[str, np.ndarray] = {}
    keep_frames = max(1, int(signature_frames))
    for key, samples in per_label_colors.items():
        if not samples:
            continue
        # Build RGB signature from only the highest-confidence masks to reduce bleed.
        samples_sorted = sorted(samples, key=lambda s: s[0], reverse=True)[:keep_frames]
        cat = np.concatenate([pix for _, pix in samples_sorted], axis=0)
        sampled_color[key] = np.median(cat, axis=0)

    if not sampled_color:
        raise RuntimeError(
            "SAM/Grounding did not find any requested labels in sampled frames."
        )

    pc = load_pointcloud_ply(ply_path)
    labels_existing = load_label_bboxes(out_labels_path)

    for key, rgb in sampled_color.items():
        labels_existing[key] = _bbox_from_rgb_signature(pc.vertices, rgb, label=key)
    issues: list[str] = []
    room_min, room_max = pc.bounds()
    room_vol = _bbox_volume((room_min, room_max))
    for key in labels_norm:
        if key not in labels_existing:
            issues.append(f"{key}: not detected")
            continue
        if label_hits.get(key, 0) < 2:
            issues.append(f"{key}: low frame support ({label_hits.get(key, 0)} hits)")
        b = labels_existing[key]
        vol_ratio = _bbox_volume(b) / max(1e-8, room_vol)
        if vol_ratio > 0.22:
            issues.append(f"{key}: bbox too large (ratio={vol_ratio:.3f})")

    for i, a in enumerate(labels_norm):
        for b in labels_norm[i + 1 :]:
            if a not in labels_existing or b not in labels_existing:
                continue
            overlap = _bbox_overlap_ratio(labels_existing[a], labels_existing[b])
            if overlap > 0.55:
                issues.append(f"{a}<->{b}: heavy overlap ({overlap:.3f})")

    if debug_root:
        debug_report = {
            "sampled_frames": len(frames),
            "frame_strategy": frame_strategy,
            "signature_frames": keep_frames,
            "sam_model_id": sam_model_id_norm,
            "label_hits": label_hits,
            "best_detections": best_detections,
            "avg_scores": {
                k: (sum(v) / len(v) if v else 0.0) for k, v in label_scores.items()
            },
            "bboxes": {
                k: [*labels_existing[k][0], *labels_existing[k][1]]
                for k in labels_existing
            },
            "issues": issues,
        }
        debug_root.mkdir(parents=True, exist_ok=True)
        (debug_root / "report.json").write_text(json.dumps(debug_report, indent=2) + "\n")

    if issues and not allow_ambiguous:
        raise RuntimeError(
            "Auto-label ambiguous. " + " | ".join(issues) +
            ". Re-run with --debug-dir to inspect overlays, then refine labels manually or pass --allow-ambiguous."
        )

    save_label_bboxes(out_labels_path, labels_existing)
    return AutoLabelResult(
        label_bboxes=labels_existing,
        sampled_frames=len(frames),
        label_hits=label_hits,
        best_detections=best_detections,
        issues=issues,
    )
