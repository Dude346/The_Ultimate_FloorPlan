#!/usr/bin/env python3
"""
Print bbox stats for a Gaussian splat PLY.

Example:
    uv run python tools/print_bbox.py --input data/scene_clean.ply --percentile 1.0
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from plyfile import PlyData


def _fmt(v: np.ndarray) -> str:
    return f"({v[0]:.6f}, {v[1]:.6f}, {v[2]:.6f})"


def main() -> int:
    parser = argparse.ArgumentParser(description="Print x/y/z min/max and percentile bbox.")
    parser.add_argument("--input", required=True, type=Path, help="Input .ply")
    parser.add_argument(
        "--percentile",
        type=float,
        default=1.0,
        help="Percentile p for [p, 100-p] bounds (default: 1.0)",
    )
    args = parser.parse_args()

    if args.percentile < 0.0 or args.percentile >= 50.0:
        raise ValueError("--percentile must be in [0, 50).")
    if not args.input.exists():
        raise FileNotFoundError(f"Input file not found: {args.input}")

    ply = PlyData.read(str(args.input))
    if "vertex" not in ply:
        raise ValueError("Input PLY has no 'vertex' element.")

    vertex = ply["vertex"]
    names = vertex.data.dtype.names
    if names is None or any(field not in names for field in ("x", "y", "z")):
        raise ValueError("Input vertex element must contain x, y, z fields.")

    xyz = np.column_stack(
        [
            np.asarray(vertex.data["x"], dtype=np.float64),
            np.asarray(vertex.data["y"], dtype=np.float64),
            np.asarray(vertex.data["z"], dtype=np.float64),
        ]
    )
    if xyz.shape[0] == 0:
        raise ValueError("Input has zero vertices.")

    bmin = xyz.min(axis=0)
    bmax = xyz.max(axis=0)
    p = args.percentile
    pmin = np.percentile(xyz, p, axis=0)
    pmax = np.percentile(xyz, 100.0 - p, axis=0)

    print(f"Input: {args.input}")
    print(f"Count: {xyz.shape[0]:,}")
    print(f"BBox min: {_fmt(bmin)}")
    print(f"BBox max: {_fmt(bmax)}")
    print(f"Percentile bbox ({p:.3f}..{100.0 - p:.3f}) min: {_fmt(pmin)}")
    print(f"Percentile bbox ({p:.3f}..{100.0 - p:.3f}) max: {_fmt(pmax)}")
    print(
        "ROI suggestion: "
        f"--roi {pmin[0]:.6f} {pmax[0]:.6f} {pmin[1]:.6f} {pmax[1]:.6f} {pmin[2]:.6f} {pmax[2]:.6f}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
