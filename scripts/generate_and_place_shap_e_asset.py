#!/usr/bin/env python3
"""
Generate a high-quality Shap-E asset from text, then place it into a scene mesh.

Pipeline:
1) Calls Modal Shap-E generator:
   scripts/generate_3d_asset/modal_shape_e_generate.py
2) Calls placement script:
   scripts/place_asset_in_scene.py

Example:
    uv run python scripts/generate_and_place_shap_e_asset.py \
      examples/Bathroom_Mesh.ply \
      "Green Office Chair" \
      --output examples/Bathroom_With_Green_Office_Chair.ply
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path


def _slugify(text: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "_", text.strip().lower()).strip("_")
    return slug or "asset"


def _run(cmd: list[str], cwd: Path) -> None:
    print("Running:")
    print(" ".join(cmd))
    subprocess.run(cmd, check=True, cwd=str(cwd))


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate Shap-E asset from prompt and place it into a scene mesh.",
    )
    parser.add_argument("scene_mesh", type=Path, help="Scene mesh .ply (e.g., examples/Bathroom_Mesh.ply)")
    parser.add_argument("prompt", type=str, help='Asset prompt (e.g., "Green Office Chair")')
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Final merged mesh output path (default: examples/<scene>_with_<prompt>.ply)",
    )
    parser.add_argument(
        "--generated-asset-output",
        type=Path,
        default=None,
        help="Path for intermediate generated asset .ply (default: generated_assets/<prompt>_shap_e_high_quality.ply)",
    )
    parser.add_argument(
        "--guidance-scale",
        type=float,
        default=18.0,
        help="Shap-E guidance scale (high quality default: 18.0).",
    )
    parser.add_argument(
        "--karras-steps",
        type=int,
        default=96,
        help="Shap-E Karras steps (high quality default: 96).",
    )
    parser.add_argument(
        "--scale",
        type=float,
        default=None,
        help="Manual placement scale passed to place_asset_in_scene.py.",
    )
    parser.add_argument(
        "--target-footprint-ratio",
        type=float,
        default=0.12,
        help="Placement footprint ratio passed to place_asset_in_scene.py (default: 0.12).",
    )
    parser.add_argument("--offset-x", type=float, default=0.0, help="Placement offset X.")
    parser.add_argument("--offset-z", type=float, default=0.0, help="Placement offset Z.")
    parser.add_argument("--y-lift", type=float, default=0.0, help="Placement lift along Y.")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    scene_path = args.scene_mesh if args.scene_mesh.is_absolute() else (repo_root / args.scene_mesh)
    scene_path = scene_path.resolve()
    if not scene_path.exists():
        raise FileNotFoundError(f"Scene mesh not found: {scene_path}")

    prompt_slug = _slugify(args.prompt)

    generated_asset_output = args.generated_asset_output
    if generated_asset_output is None:
        generated_asset_output = repo_root / "generated_assets" / f"{prompt_slug}_shap_e_high_quality.ply"
    elif not generated_asset_output.is_absolute():
        generated_asset_output = (repo_root / generated_asset_output)
    generated_asset_output = generated_asset_output.resolve()
    generated_asset_output.parent.mkdir(parents=True, exist_ok=True)

    final_output = args.output
    if final_output is None:
        final_output = repo_root / "examples" / f"{scene_path.stem}_with_{prompt_slug}.ply"
    elif not final_output.is_absolute():
        final_output = (repo_root / final_output)
    final_output = final_output.resolve()
    final_output.parent.mkdir(parents=True, exist_ok=True)

    shap_e_script = repo_root / "scripts" / "generate_3d_asset" / "modal_shape_e_generate.py"
    place_script = repo_root / "scripts" / "place_asset_in_scene.py"
    if not shap_e_script.exists():
        raise FileNotFoundError(f"Shap-E generator script not found: {shap_e_script}")
    if not place_script.exists():
        raise FileNotFoundError(f"Placement script not found: {place_script}")

    # Step 1: generate high-quality Shap-E mesh asset.
    generate_cmd = [
        "uv",
        "run",
        "modal",
        "run",
        str(shap_e_script),
        "--prompt",
        args.prompt,
        "--output-path",
        str(generated_asset_output),
        "--guidance-scale",
        str(args.guidance_scale),
        "--karras-steps",
        str(args.karras_steps),
    ]
    _run(generate_cmd, cwd=repo_root)

    # Step 2: place generated asset into scene.
    place_cmd = [
        sys.executable,
        str(place_script),
        str(scene_path),
        str(generated_asset_output),
        "--output",
        str(final_output),
        "--target-footprint-ratio",
        str(args.target_footprint_ratio),
        "--offset-x",
        str(args.offset_x),
        "--offset-z",
        str(args.offset_z),
        "--y-lift",
        str(args.y_lift),
    ]
    if args.scale is not None:
        place_cmd.extend(["--scale", str(args.scale)])
    _run(place_cmd, cwd=repo_root)

    print("")
    print("Pipeline complete:")
    print(f"  Scene: {scene_path}")
    print(f"  Prompt: {args.prompt}")
    print(f"  Generated asset: {generated_asset_output}")
    print(f"  Final merged mesh: {final_output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
