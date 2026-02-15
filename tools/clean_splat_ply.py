#!/usr/bin/env python3
"""
Clean a Nerfstudio Gaussian splat PLY by removing likely floaters/noise.

The script preserves the original vertex row schema and only filters rows.

Filters (each optional):
1) Opacity threshold
2) Position percentile crop
3) ROI box crop
4) Keep only largest DBSCAN cluster
5) Scale norm percentile pruning

Examples:
    # Typical cleaning pass
    uv run python tools/clean_splat_ply.py \
      --input data/scene_raw.ply \
      --output data/scene_clean.ply

    # Add ROI and largest-cluster filtering
    uv run python tools/clean_splat_ply.py \
      --input data/scene_raw.ply \
      --output data/scene_clean.ply \
      --roi -2.0 2.0 -1.0 2.5 -2.0 2.0 \
      --keep-largest-cluster --dbscan-eps 0.12 --dbscan-min-samples 20

    # Disable percentile crop and apply scale pruning
    uv run python tools/clean_splat_ply.py \
      --input data/scene_raw.ply \
      --output data/scene_clean.ply \
      --no-percentile-crop \
      --scale-percentile 1.0
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from plyfile import PlyData, PlyElement
from sklearn.cluster import DBSCAN


OPACITY_CANDIDATES = ("opacity", "alpha", "opacities", "a")
SCALE_TRIPLE_CANDIDATES = (
    ("scale_0", "scale_1", "scale_2"),
    ("sx", "sy", "sz"),
)


def _warn(message: str) -> None:
    print(f"[warning] {message}")


def _find_field_case_insensitive(dtype_names: tuple[str, ...], candidates: tuple[str, ...]) -> str | None:
    by_lower = {name.lower(): name for name in dtype_names}
    for candidate in candidates:
        found = by_lower.get(candidate.lower())
        if found is not None:
            return found
    return None


def _find_scale_fields(dtype_names: tuple[str, ...]) -> tuple[str, str, str] | None:
    by_lower = {name.lower(): name for name in dtype_names}
    for triple in SCALE_TRIPLE_CANDIDATES:
        resolved: list[str] = []
        for field in triple:
            found = by_lower.get(field.lower())
            if found is None:
                resolved = []
                break
            resolved.append(found)
        if resolved:
            return resolved[0], resolved[1], resolved[2]
    return None


def _bbox(points: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    return points.min(axis=0), points.max(axis=0)


def _percentile_bbox(points: np.ndarray, p: float) -> tuple[np.ndarray, np.ndarray]:
    lo = np.percentile(points, p, axis=0)
    hi = np.percentile(points, 100.0 - p, axis=0)
    return lo, hi


def _fmt_xyz(xyz: np.ndarray) -> str:
    return f"({xyz[0]:.6f}, {xyz[1]:.6f}, {xyz[2]:.6f})"


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Clean Nerfstudio Gaussian splat PLY files.")
    parser.add_argument("--input", required=True, type=Path, help="Input Gaussian splat .ply")
    parser.add_argument("--output", required=True, type=Path, help="Output cleaned .ply")

    parser.add_argument(
        "--min-opacity",
        type=float,
        default=0.02,
        help="Keep opacity > this value when opacity field is present (default: 0.02)",
    )
    parser.add_argument(
        "--opacity-space",
        choices=("auto", "alpha", "logit"),
        default="auto",
        help=(
            "Interpretation of opacity field for thresholding: "
            "'alpha' means values already in [0,1], "
            "'logit' applies sigmoid, 'auto' infers from range (default: auto)."
        ),
    )
    parser.add_argument(
        "--no-opacity-filter",
        action="store_true",
        help="Disable opacity filtering.",
    )

    parser.add_argument(
        "--position-percentile",
        type=float,
        default=1.0,
        help="Per-axis percentile crop p for [p, 100-p] (default: 1.0)",
    )
    parser.add_argument(
        "--no-percentile-crop",
        action="store_true",
        help="Disable percentile cropping on positions.",
    )

    parser.add_argument(
        "--roi",
        nargs=6,
        type=float,
        metavar=("XMIN", "XMAX", "YMIN", "YMAX", "ZMIN", "ZMAX"),
        help="Optional ROI crop box.",
    )

    parser.add_argument(
        "--keep-largest-cluster",
        action="store_true",
        help="Run DBSCAN on current points and keep only the largest non-noise cluster.",
    )
    parser.add_argument(
        "--dbscan-eps",
        type=float,
        default=0.12,
        help="DBSCAN eps (default: 0.12)",
    )
    parser.add_argument(
        "--dbscan-min-samples",
        type=int,
        default=20,
        help="DBSCAN min_samples (default: 20)",
    )

    parser.add_argument(
        "--scale-percentile",
        type=float,
        default=None,
        help="If set, drop points outside [p,100-p] percentile of scale norm.",
    )

    return parser


def _opacity_to_alpha(opacity_raw: np.ndarray, mode: str) -> tuple[np.ndarray, str]:
    if mode == "alpha":
        return opacity_raw, "alpha"
    if mode == "logit":
        clipped = np.clip(opacity_raw, -60.0, 60.0)
        return 1.0 / (1.0 + np.exp(-clipped)), "logit->alpha"

    # auto mode
    if np.nanmin(opacity_raw) >= 0.0 and np.nanmax(opacity_raw) <= 1.0:
        return opacity_raw, "alpha(auto)"
    clipped = np.clip(opacity_raw, -60.0, 60.0)
    return 1.0 / (1.0 + np.exp(-clipped)), "logit->alpha(auto)"


def main() -> int:
    args = _build_parser().parse_args()

    if not args.input.exists():
        raise FileNotFoundError(f"Input file not found: {args.input}")
    if args.position_percentile < 0.0 or args.position_percentile >= 50.0:
        raise ValueError("--position-percentile must be in [0, 50).")
    if args.scale_percentile is not None and (args.scale_percentile < 0.0 or args.scale_percentile >= 50.0):
        raise ValueError("--scale-percentile must be in [0, 50).")
    if args.dbscan_eps <= 0:
        raise ValueError("--dbscan-eps must be > 0")
    if args.dbscan_min_samples < 1:
        raise ValueError("--dbscan-min-samples must be >= 1")

    ply = PlyData.read(str(args.input))
    if "vertex" not in ply:
        raise ValueError("Input PLY has no 'vertex' element.")

    vertex = ply["vertex"]
    if vertex.data.dtype.names is None:
        raise ValueError("Vertex element has no named fields.")
    names = vertex.data.dtype.names

    required = ("x", "y", "z")
    missing_required = [field for field in required if field not in names]
    if missing_required:
        raise ValueError(f"Missing required position fields: {', '.join(missing_required)}")

    points = np.column_stack(
        [
            np.asarray(vertex.data["x"], dtype=np.float64),
            np.asarray(vertex.data["y"], dtype=np.float64),
            np.asarray(vertex.data["z"], dtype=np.float64),
        ]
    )

    n_original = points.shape[0]
    if n_original == 0:
        raise ValueError("Input has zero vertices.")

    bbox_before_min, bbox_before_max = _bbox(points)
    pbox_min, pbox_max = _percentile_bbox(points, args.position_percentile)

    print(f"Input: {args.input}")
    print(f"Original points: {n_original:,}")
    print(f"BBox before min: {_fmt_xyz(bbox_before_min)}")
    print(f"BBox before max: {_fmt_xyz(bbox_before_max)}")
    print(
        f"Percentile bbox ({args.position_percentile:.3f}..{100.0 - args.position_percentile:.3f}) min: {_fmt_xyz(pbox_min)}"
    )
    print(
        f"Percentile bbox ({args.position_percentile:.3f}..{100.0 - args.position_percentile:.3f}) max: {_fmt_xyz(pbox_max)}"
    )
    print(
        "Recommended ROI: "
        f"--roi {pbox_min[0]:.6f} {pbox_max[0]:.6f} {pbox_min[1]:.6f} {pbox_max[1]:.6f} {pbox_min[2]:.6f} {pbox_max[2]:.6f}"
    )

    keep = np.ones(n_original, dtype=bool)

    # Filter a) opacity threshold
    if not args.no_opacity_filter:
        opacity_field = _find_field_case_insensitive(names, OPACITY_CANDIDATES)
        if opacity_field is None:
            _warn("No opacity field found (tried: opacity/alpha/opacities/a). Skipping opacity filter.")
        else:
            opacity_raw = np.asarray(vertex.data[opacity_field], dtype=np.float64)
            opacity_alpha, opacity_mode = _opacity_to_alpha(opacity_raw, args.opacity_space)
            step_keep = opacity_alpha > args.min_opacity
            keep &= step_keep
            print(
                f"Opacity filter ({opacity_field}, mode={opacity_mode}, alpha>{args.min_opacity}): "
                f"kept {np.count_nonzero(keep):,} / {n_original:,}"
            )

    # Filter b) percentile crop
    if not args.no_percentile_crop:
        lo, hi = pbox_min, pbox_max
        step_keep = np.all((points >= lo) & (points <= hi), axis=1)
        keep &= step_keep
        print(
            "Percentile crop "
            f"[{args.position_percentile:.3f}, {100.0 - args.position_percentile:.3f}]: "
            f"kept {np.count_nonzero(keep):,} / {n_original:,}"
        )

    # Filter c) ROI crop
    if args.roi is not None:
        xmin, xmax, ymin, ymax, zmin, zmax = args.roi
        if xmin > xmax or ymin > ymax or zmin > zmax:
            raise ValueError("Invalid --roi: ensure xmin<=xmax, ymin<=ymax, zmin<=zmax")
        step_keep = (
            (points[:, 0] >= xmin)
            & (points[:, 0] <= xmax)
            & (points[:, 1] >= ymin)
            & (points[:, 1] <= ymax)
            & (points[:, 2] >= zmin)
            & (points[:, 2] <= zmax)
        )
        keep &= step_keep
        print(f"ROI crop: kept {np.count_nonzero(keep):,} / {n_original:,}")

    # Filter d) DBSCAN largest cluster
    if args.keep_largest_cluster:
        active_idx = np.flatnonzero(keep)
        if active_idx.size < args.dbscan_min_samples:
            _warn(
                "Too few active points for DBSCAN after previous filters; "
                "skipping largest-cluster filtering."
            )
        else:
            active_points = points[active_idx]
            labels = DBSCAN(eps=args.dbscan_eps, min_samples=args.dbscan_min_samples).fit_predict(active_points)
            valid = labels >= 0
            if not np.any(valid):
                _warn("DBSCAN found only noise labels; skipping largest-cluster filtering.")
            else:
                uniq, counts = np.unique(labels[valid], return_counts=True)
                largest_label = uniq[np.argmax(counts)]
                cluster_keep_local = labels == largest_label
                new_keep = np.zeros_like(keep)
                new_keep[active_idx[cluster_keep_local]] = True
                keep = new_keep
                print(
                    "DBSCAN largest cluster: "
                    f"cluster={largest_label}, size={np.count_nonzero(keep):,}, "
                    f"kept {np.count_nonzero(keep):,} / {n_original:,}"
                )

    # Filter e) scale norm percentile pruning
    if args.scale_percentile is not None:
        scale_fields = _find_scale_fields(names)
        if scale_fields is None:
            _warn("No scale fields found (tried: scale_0/1/2 or sx/sy/sz). Skipping scale pruning.")
        else:
            sx = np.asarray(vertex.data[scale_fields[0]], dtype=np.float64)
            sy = np.asarray(vertex.data[scale_fields[1]], dtype=np.float64)
            sz = np.asarray(vertex.data[scale_fields[2]], dtype=np.float64)
            scale_norm = np.sqrt(sx * sx + sy * sy + sz * sz)

            active = scale_norm[keep]
            if active.size == 0:
                _warn("No active points before scale pruning; skipping scale filter.")
            else:
                p = args.scale_percentile
                lo = np.percentile(active, p)
                hi = np.percentile(active, 100.0 - p)
                step_keep = (scale_norm >= lo) & (scale_norm <= hi)
                keep &= step_keep
                print(
                    "Scale norm percentile pruning "
                    f"[{p:.3f}, {100.0 - p:.3f}] using {scale_fields}: "
                    f"kept {np.count_nonzero(keep):,} / {n_original:,}"
                )

    n_kept = int(np.count_nonzero(keep))
    if n_kept == 0:
        raise ValueError("All points were removed. Relax thresholds/filters and retry.")

    kept_points = points[keep]
    bbox_after_min, bbox_after_max = _bbox(kept_points)

    print(f"Kept points: {n_kept:,} / {n_original:,} ({(100.0 * n_kept / n_original):.2f}%)")
    print(f"BBox after min: {_fmt_xyz(bbox_after_min)}")
    print(f"BBox after max: {_fmt_xyz(bbox_after_max)}")

    cleaned_vertex = vertex.data[keep]

    new_elements: list[PlyElement] = []
    for element in ply.elements:
        if element.name == "vertex":
            new_elements.append(PlyElement.describe(cleaned_vertex, "vertex", comments=element.comments))
        else:
            new_elements.append(element)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    cleaned_ply = PlyData(
        new_elements,
        text=ply.text,
        byte_order=ply.byte_order,
        comments=ply.comments,
        obj_info=ply.obj_info,
    )
    cleaned_ply.write(str(args.output))

    print(f"Wrote cleaned PLY: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
