#!/usr/bin/env python3
"""
Pipeline wrapper: cleaned splat -> mesh.

This wrapper keeps CLI flow consistent while delegating to an existing converter.
Current default hook points to `scripts/splat_ply_to_mesh_ply.py`.

Example:
    uv run python tools/mesh_from_splat.py \
      --input data/scene_clean.ply \
      --output data/scene_mesh.glb
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


DEFAULT_CONVERTER = Path("scripts/splat_ply_to_mesh_ply.py")


def main() -> int:
    parser = argparse.ArgumentParser(description="Wrapper for mesh conversion from cleaned splat PLY.")
    parser.add_argument("--input", required=True, type=Path, help="Cleaned splat .ply")
    parser.add_argument("--output", required=True, type=Path, help="Output mesh file path")
    parser.add_argument(
        "--converter",
        type=Path,
        default=DEFAULT_CONVERTER,
        help="Path to converter script hook (default: scripts/splat_ply_to_mesh_ply.py)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the delegated command without executing it.",
    )
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    converter = (repo_root / args.converter).resolve() if not args.converter.is_absolute() else args.converter

    if not args.input.exists():
        raise FileNotFoundError(f"Input file not found: {args.input}")
    if not converter.exists():
        raise FileNotFoundError(
            f"Converter script not found: {converter}\n"
            "TODO: point --converter at your preferred meshing script."
        )

    cmd = [
        sys.executable,
        str(converter),
        "--input",
        str(args.input),
        "--output",
        str(args.output),
    ]

    print("Delegating mesh conversion command:")
    print(" ".join(cmd))

    if args.dry_run:
        return 0

    subprocess.run(cmd, check=True, cwd=str(repo_root))
    print(f"Mesh conversion complete: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
