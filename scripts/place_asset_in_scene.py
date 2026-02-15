#!/usr/bin/env python3
"""
Place an asset mesh PLY inside a scene mesh PLY and export a merged mesh.

The script:
1) Loads scene and asset meshes from PLY.
2) Auto-scales the asset to a footprint ratio of the scene (unless --scale is given).
3) Places the asset on the scene floor (scene min Y), centered in X/Z by default.
4) Merges vertices + faces and writes one output PLY mesh.

Usage:
    uv run python scripts/place_asset_in_scene.py \
      examples/Bathroom_Mesh.ply \
      generated_assets/wolf_shap_e_high_quality.ply

    uv run python scripts/place_asset_in_scene.py \
      examples/Bathroom_Mesh.ply \
      generated_assets/wolf_shap_e_high_quality.ply \
      --output examples/Bathroom_With_Wolf.ply \
      --offset-x 0.3 --offset-z -0.2
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from plyfile import PlyData, PlyElement
from sklearn.neighbors import NearestNeighbors


FACE_FIELD_CANDIDATES = ("vertex_indices", "vertex_index")
RGB_CANDIDATES = (
    ("red", "green", "blue"),
    ("r", "g", "b"),
)
SH_DC_CANDIDATES = ("f_dc_0", "f_dc_1", "f_dc_2")


def _reconstruct_faces_from_points(points: np.ndarray, neighbors: int = 10) -> list[np.ndarray]:
    if points.shape[0] < 4:
        raise ValueError("Need at least 4 points to reconstruct a mesh.")
    if neighbors < 4:
        neighbors = 4
    if points.shape[0] <= neighbors:
        neighbors = max(3, points.shape[0] - 1)

    nn = NearestNeighbors(n_neighbors=neighbors + 1, algorithm="auto")
    nn.fit(points)
    _, idx = nn.kneighbors(points, return_distance=True)

    faces: set[tuple[int, int, int]] = set()
    for i in range(points.shape[0]):
        ring = idx[i, 1:]  # skip self
        if ring.size < 3:
            continue
        for k in range(ring.size - 1):
            a = int(ring[k])
            b = int(ring[k + 1])
            if a == b or a == i or b == i:
                continue
            tri = tuple(sorted((i, a, b)))
            if tri[0] != tri[1] and tri[1] != tri[2]:
                faces.add(tri)
    return [np.asarray(t, dtype=np.int64) for t in faces]


def _extract_vertex_colors(vertex_data: np.ndarray, names: tuple[str, ...]) -> np.ndarray | None:
    by_lower = {n.lower(): n for n in names}

    # Direct RGB colors
    for r_name, g_name, b_name in RGB_CANDIDATES:
        if r_name in by_lower and g_name in by_lower and b_name in by_lower:
            r = np.asarray(vertex_data[by_lower[r_name]], dtype=np.float64)
            g = np.asarray(vertex_data[by_lower[g_name]], dtype=np.float64)
            b = np.asarray(vertex_data[by_lower[b_name]], dtype=np.float64)
            rgb = np.column_stack([r, g, b])

            # If color is likely normalized float, convert to 0..255.
            if np.nanmax(rgb) <= 1.0 + 1e-6:
                rgb = rgb * 255.0
            rgb = np.clip(rgb, 0.0, 255.0).astype(np.uint8)
            return rgb

    # Nerfstudio/Gaussian SH DC coefficients to approximate RGB.
    if all(name in by_lower for name in SH_DC_CANDIDATES):
        c0 = 0.28209479177387814
        f0 = np.asarray(vertex_data[by_lower["f_dc_0"]], dtype=np.float64)
        f1 = np.asarray(vertex_data[by_lower["f_dc_1"]], dtype=np.float64)
        f2 = np.asarray(vertex_data[by_lower["f_dc_2"]], dtype=np.float64)
        rgb = np.column_stack([f0, f1, f2]) * c0 + 0.5
        rgb = np.clip(rgb, 0.0, 1.0) * 255.0
        return rgb.astype(np.uint8)

    return None


def _load_mesh_ply(path: Path, allow_reconstruct: bool = True) -> tuple[np.ndarray, list[np.ndarray], np.ndarray | None]:
    ply = PlyData.read(str(path))
    if "vertex" not in ply:
        raise ValueError(f"{path} has no 'vertex' element.")

    vertex = ply["vertex"]
    names = vertex.data.dtype.names or ()
    for req in ("x", "y", "z"):
        if req not in names:
            raise ValueError(f"{path} missing vertex field '{req}'.")

    vertices = np.column_stack(
        [
            np.asarray(vertex.data["x"], dtype=np.float64),
            np.asarray(vertex.data["y"], dtype=np.float64),
            np.asarray(vertex.data["z"], dtype=np.float64),
        ]
    )
    colors = _extract_vertex_colors(vertex.data, names)
    if colors is None:
        print(f"[warning] {path}: no recognizable RGB/SH color fields; fallback color will be used.")

    faces: list[np.ndarray] = []
    if "face" in ply:
        face = ply["face"]
        face_names = face.data.dtype.names or ()
        face_field = next((n for n in FACE_FIELD_CANDIDATES if n in face_names), None)
        if face_field is None and face_names:
            # Fallback: first field if it looks like list indices.
            face_field = face_names[0]

        if face_field is not None:
            for raw in face.data[face_field]:
                idx = np.asarray(raw, dtype=np.int64).reshape(-1)
                if idx.size >= 3:
                    faces.append(idx)

    if len(faces) == 0:
        if not allow_reconstruct:
            raise ValueError(f"{path} has no valid faces. Expected a mesh PLY, not just points.")
        faces = _reconstruct_faces_from_points(vertices)
        print(f"[info] {path}: no faces found, reconstructed {len(faces):,} faces from points.")

    return vertices, faces, colors


def _default_output_path(scene_path: Path, asset_path: Path) -> Path:
    name = f"{scene_path.stem}_with_{asset_path.stem}.ply"
    return scene_path.with_name(name)


def _compute_auto_scale(scene_v: np.ndarray, asset_v: np.ndarray, target_ratio: float) -> float:
    scene_size = scene_v.max(axis=0) - scene_v.min(axis=0)
    asset_size = asset_v.max(axis=0) - asset_v.min(axis=0)

    # Use smaller scene footprint axis so placed assets do not intersect narrow walls.
    scene_footprint = max(min(float(scene_size[0]), float(scene_size[2])), 1e-8)
    asset_footprint = max(float(asset_size[0]), float(asset_size[2]), 1e-8)
    return max((scene_footprint * target_ratio) / asset_footprint, 1e-8)


def _compute_floor_region(scene_v: np.ndarray) -> tuple[float, float, float, float, float, float, float]:
    scene_min = scene_v.min(axis=0)
    scene_max = scene_v.max(axis=0)
    y_span = float(scene_max[1] - scene_min[1])

    # Use low percentile for floor estimate to avoid a single outlier vertex.
    floor_y = float(np.percentile(scene_v[:, 1], 1.0))
    floor_tol = max(0.03, y_span * 0.02)
    floor_mask = scene_v[:, 1] <= (floor_y + floor_tol)
    floor_pts = scene_v[floor_mask]
    if floor_pts.shape[0] < 200:
        floor_y = float(scene_min[1])
        floor_mask = scene_v[:, 1] <= (floor_y + floor_tol)
        floor_pts = scene_v[floor_mask]
    if floor_pts.shape[0] < 50:
        floor_pts = scene_v

    # Robust room/floor footprint bounds, trimming outliers.
    x_lo, x_hi = np.percentile(floor_pts[:, 0], [2.0, 98.0])
    z_lo, z_hi = np.percentile(floor_pts[:, 2], [2.0, 98.0])
    if not np.isfinite([x_lo, x_hi, z_lo, z_hi]).all() or x_lo >= x_hi or z_lo >= z_hi:
        x_lo, x_hi = float(scene_min[0]), float(scene_max[0])
        z_lo, z_hi = float(scene_min[2]), float(scene_max[2])

    center_x = (float(x_lo) + float(x_hi)) * 0.5
    center_z = (float(z_lo) + float(z_hi)) * 0.5
    return center_x, center_z, floor_y, float(x_lo), float(x_hi), float(z_lo), float(z_hi)


def _place_asset(
    scene_v: np.ndarray,
    asset_v: np.ndarray,
    scale: float,
    offset_x: float,
    offset_z: float,
    y_lift: float,
) -> np.ndarray:
    center_x, center_z, floor_y, x_lo, x_hi, z_lo, z_hi = _compute_floor_region(scene_v)
    scene_center_xz = np.array([center_x, center_z], dtype=np.float64)

    asset_min = asset_v.min(axis=0)
    asset_max = asset_v.max(axis=0)
    asset_center_xz = np.array(
        [(asset_min[0] + asset_max[0]) * 0.5, (asset_min[2] + asset_max[2]) * 0.5],
        dtype=np.float64,
    )
    asset_half_x = max(float(asset_max[0] - asset_min[0]) * 0.5 * scale, 1e-6)
    asset_half_z = max(float(asset_max[2] - asset_min[2]) * 0.5 * scale, 1e-6)

    # Keep centered by default, but clamp so the asset remains inside floor footprint.
    margin = 0.05 * max(x_hi - x_lo, z_hi - z_lo)
    target_x = scene_center_xz[0] + offset_x
    target_z = scene_center_xz[1] + offset_z
    min_x_allowed = x_lo + asset_half_x + margin
    max_x_allowed = x_hi - asset_half_x - margin
    min_z_allowed = z_lo + asset_half_z + margin
    max_z_allowed = z_hi - asset_half_z - margin

    if min_x_allowed <= max_x_allowed:
        target_x = float(np.clip(target_x, min_x_allowed, max_x_allowed))
    if min_z_allowed <= max_z_allowed:
        target_z = float(np.clip(target_z, min_z_allowed, max_z_allowed))

    out = asset_v.copy()
    out[:, 0] = (out[:, 0] - asset_center_xz[0]) * scale + target_x
    out[:, 2] = (out[:, 2] - asset_center_xz[1]) * scale + target_z
    out[:, 1] = (out[:, 1] - asset_min[1]) * scale + floor_y + y_lift
    return out


def _write_mesh_ply(
    path: Path,
    vertices: np.ndarray,
    faces: list[np.ndarray],
    colors: np.ndarray | None = None,
    comments: list[str] | None = None,
) -> None:
    if colors is not None and colors.shape[0] != vertices.shape[0]:
        raise ValueError("colors row count must match vertices row count.")

    if colors is None:
        v_dtype = np.dtype([("x", "f4"), ("y", "f4"), ("z", "f4")])
    else:
        v_dtype = np.dtype(
            [("x", "f4"), ("y", "f4"), ("z", "f4"), ("red", "u1"), ("green", "u1"), ("blue", "u1")]
        )
    v_data = np.empty(vertices.shape[0], dtype=v_dtype)
    v_data["x"] = vertices[:, 0].astype(np.float32)
    v_data["y"] = vertices[:, 1].astype(np.float32)
    v_data["z"] = vertices[:, 2].astype(np.float32)
    if colors is not None:
        v_data["red"] = colors[:, 0].astype(np.uint8)
        v_data["green"] = colors[:, 1].astype(np.uint8)
        v_data["blue"] = colors[:, 2].astype(np.uint8)

    f_dtype = np.dtype([("vertex_indices", object)])
    f_data = np.empty(len(faces), dtype=f_dtype)
    f_data["vertex_indices"] = [f.astype(np.int32) for f in faces]

    path.parent.mkdir(parents=True, exist_ok=True)
    PlyData(
        [PlyElement.describe(v_data, "vertex"), PlyElement.describe(f_data, "face")],
        text=False,
        comments=comments or [],
    ).write(str(path))


def main() -> int:
    parser = argparse.ArgumentParser(description="Place one mesh PLY into another and export a merged PLY.")
    parser.add_argument("scene_mesh", type=Path, help="Path to scene mesh PLY (e.g., Bathroom_Mesh.ply)")
    parser.add_argument("asset_mesh", type=Path, help="Path to asset mesh PLY (e.g., wolf_shap_e_high_quality.ply)")
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Output merged mesh path (default: <scene>_with_<asset>.ply)",
    )
    parser.add_argument(
        "--scale",
        type=float,
        default=None,
        help="Manual asset scale. If omitted, uses --target-footprint-ratio auto-scale.",
    )
    parser.add_argument(
        "--target-footprint-ratio",
        type=float,
        default=0.12,
        help="Auto-scale asset footprint as a ratio of scene footprint (default: 0.12).",
    )
    parser.add_argument("--offset-x", type=float, default=0.0, help="X offset after placement.")
    parser.add_argument("--offset-z", type=float, default=0.0, help="Z offset after placement.")
    parser.add_argument("--y-lift", type=float, default=0.0, help="Vertical lift above floor after placement.")
    args = parser.parse_args()

    if not args.scene_mesh.exists():
        raise FileNotFoundError(f"Scene mesh not found: {args.scene_mesh}")
    if not args.asset_mesh.exists():
        raise FileNotFoundError(f"Asset mesh not found: {args.asset_mesh}")
    if args.target_footprint_ratio <= 0:
        raise ValueError("--target-footprint-ratio must be > 0.")

    scene_v, scene_f, scene_c = _load_mesh_ply(args.scene_mesh)
    asset_v, asset_f, asset_c = _load_mesh_ply(args.asset_mesh)

    scale = args.scale if args.scale is not None else _compute_auto_scale(scene_v, asset_v, args.target_footprint_ratio)
    if scale <= 0:
        raise ValueError("Computed/selected scale must be > 0.")

    placed_asset_v = _place_asset(
        scene_v=scene_v,
        asset_v=asset_v,
        scale=scale,
        offset_x=args.offset_x,
        offset_z=args.offset_z,
        y_lift=args.y_lift,
    )

    out_path = args.output if args.output is not None else _default_output_path(args.scene_mesh, args.asset_mesh)

    merged_vertices = np.vstack([scene_v, placed_asset_v])
    v_offset = scene_v.shape[0]
    merged_faces = list(scene_f)
    merged_faces.extend([f + v_offset for f in asset_f])

    if scene_c is None:
        scene_c = np.full((scene_v.shape[0], 3), 180, dtype=np.uint8)
    if asset_c is None:
        asset_c = np.full((asset_v.shape[0], 3), 220, dtype=np.uint8)
    merged_colors = np.vstack([scene_c, asset_c])

    output_comments = [
        "floorplan_merged_scene_asset true",
        f"floorplan_scene_vertex_count {scene_v.shape[0]}",
        f"floorplan_scene_face_count {len(scene_f)}",
        f"floorplan_asset_vertex_count {asset_v.shape[0]}",
        f"floorplan_asset_face_count {len(asset_f)}",
        f"floorplan_asset_name {args.asset_mesh.stem}",
    ]
    _write_mesh_ply(out_path, merged_vertices, merged_faces, merged_colors, comments=output_comments)

    print(f"Scene vertices/faces: {scene_v.shape[0]:,} / {len(scene_f):,}")
    print(f"Asset vertices/faces: {asset_v.shape[0]:,} / {len(asset_f):,}")
    print(f"Placement scale: {scale:.6f}")
    print(f"Wrote merged mesh: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
