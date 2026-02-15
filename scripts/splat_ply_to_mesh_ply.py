#!/usr/bin/env python3
"""
Convert a Gaussian splat PLY (point cloud) into a triangle mesh GLB.

This script builds a lightweight local surface mesh from splat centers:
1) load x/y/z points from the input PLY,
2) optional opacity filtering + downsampling,
3) estimate local normals from kNN neighborhoods,
4) triangulate locally in each point's tangent plane,
5) write vertices + faces as a mesh GLB.

This is an approximate reconstruction, not Poisson-level watertight meshing.
It is designed to be dependency-light and runnable with this repo's existing stack.

Example:
    uv run python scripts/splat_ply_to_mesh_ply.py \
      --input examples/splat.ply \
      --output examples/splat_mesh.glb
"""

from __future__ import annotations

import argparse
import json
import struct
from pathlib import Path

import numpy as np
from plyfile import PlyData
from sklearn.neighbors import NearestNeighbors


OPACITY_FIELDS = ("opacity", "alpha", "a")


def _find_field(names: tuple[str, ...], candidates: tuple[str, ...]) -> str | None:
    lower_to_original = {n.lower(): n for n in names}
    for candidate in candidates:
        if candidate in lower_to_original:
            return lower_to_original[candidate]
    return None


def _load_points_and_opacity(input_path: Path) -> tuple[np.ndarray, np.ndarray | None]:
    ply = PlyData.read(str(input_path))
    if "vertex" not in ply:
        raise ValueError("Input PLY has no 'vertex' element.")

    vertex = ply["vertex"]
    names = vertex.data.dtype.names
    if names is None:
        raise ValueError("Vertex element has no fields.")

    required = ("x", "y", "z")
    missing = [field for field in required if field not in names]
    if missing:
        raise ValueError(f"Input PLY missing required fields: {', '.join(missing)}")

    points = np.column_stack(
        [
            np.asarray(vertex.data["x"], dtype=np.float64),
            np.asarray(vertex.data["y"], dtype=np.float64),
            np.asarray(vertex.data["z"], dtype=np.float64),
        ]
    )
    if points.shape[0] == 0:
        raise ValueError("Input PLY has zero points.")

    opacity_name = _find_field(names, OPACITY_FIELDS)
    opacity = None
    if opacity_name is not None:
        opacity = np.asarray(vertex.data[opacity_name], dtype=np.float64)

    return points, opacity


def _voxel_downsample(points: np.ndarray, voxel_size: float) -> np.ndarray:
    if voxel_size <= 0:
        return points
    min_corner = points.min(axis=0, keepdims=True)
    keys = np.floor((points - min_corner) / voxel_size).astype(np.int64)
    _, unique_idx = np.unique(keys, axis=0, return_index=True)
    unique_idx.sort()
    return points[unique_idx]


def _estimate_normals(points: np.ndarray, nn_index: np.ndarray) -> np.ndarray:
    n_points = points.shape[0]
    normals = np.zeros((n_points, 3), dtype=np.float64)

    for i in range(n_points):
        nbr_ids = nn_index[i, 1:]  # skip self
        nbrs = points[nbr_ids]
        centered = nbrs - nbrs.mean(axis=0, keepdims=True)
        cov = centered.T @ centered
        eigvals, eigvecs = np.linalg.eigh(cov)
        n = eigvecs[:, np.argmin(eigvals)]
        norm = np.linalg.norm(n)
        if norm > 0:
            n = n / norm
        normals[i] = n

    return normals


def _local_basis(normal: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    ref = np.array([1.0, 0.0, 0.0], dtype=np.float64)
    if abs(np.dot(normal, ref)) > 0.9:
        ref = np.array([0.0, 1.0, 0.0], dtype=np.float64)
    tangent = np.cross(normal, ref)
    tangent_norm = np.linalg.norm(tangent)
    if tangent_norm == 0:
        tangent = np.array([0.0, 0.0, 1.0], dtype=np.float64)
        tangent_norm = 1.0
    tangent /= tangent_norm
    bitangent = np.cross(normal, tangent)
    bitangent_norm = np.linalg.norm(bitangent)
    if bitangent_norm > 0:
        bitangent /= bitangent_norm
    return tangent, bitangent


def _triangle_area(a: np.ndarray, b: np.ndarray, c: np.ndarray) -> float:
    return 0.5 * np.linalg.norm(np.cross(b - a, c - a))


def _build_mesh_faces(
    points: np.ndarray,
    normals: np.ndarray,
    nn_dist: np.ndarray,
    nn_index: np.ndarray,
    max_edge_factor: float,
    min_cos_angle: float,
) -> np.ndarray:
    faces: set[tuple[int, int, int]] = set()
    n_points = points.shape[0]

    for i in range(n_points):
        nbr_ids = nn_index[i, 1:]
        if nbr_ids.size < 3:
            continue

        p0 = points[i]
        n0 = normals[i]
        t, b = _local_basis(n0)

        vecs = points[nbr_ids] - p0
        u = vecs @ t
        v = vecs @ b
        angles = np.arctan2(v, u)
        order = np.argsort(angles)
        ring = nbr_ids[order]

        local_thresh = max(1e-8, max_edge_factor * float(np.median(nn_dist[i, 1:])))

        for k in range(ring.size):
            a = int(ring[k])
            c = int(ring[(k + 1) % ring.size])
            if a == c or a == i or c == i:
                continue

            pa, pc = points[a], points[c]
            if np.linalg.norm(pa - p0) > local_thresh:
                continue
            if np.linalg.norm(pc - p0) > local_thresh:
                continue
            if np.linalg.norm(pa - pc) > local_thresh * 1.5:
                continue

            # Keep neighborhoods with similar normal directions.
            if abs(np.dot(normals[a], n0)) < min_cos_angle:
                continue
            if abs(np.dot(normals[c], n0)) < min_cos_angle:
                continue

            if _triangle_area(p0, pa, pc) < 1e-12:
                continue

            tri = tuple(sorted((i, a, c)))
            faces.add(tri)

    if not faces:
        raise ValueError(
            "Failed to build faces. Try increasing --neighbors or --max-edge-factor.",
        )

    face_array = np.array(list(faces), dtype=np.int32)
    return face_array


def _write_mesh_glb(output_path: Path, vertices: np.ndarray, faces: np.ndarray) -> None:
    verts = np.asarray(vertices, dtype=np.float32)
    tris = np.asarray(faces, dtype=np.uint32).reshape(-1, 3)

    pos_bytes = verts.tobytes(order="C")
    idx = tris.reshape(-1)
    idx_bytes = idx.tobytes(order="C")

    pos_offset = 0
    idx_offset = len(pos_bytes)
    bin_blob = pos_bytes + idx_bytes

    v_min = verts.min(axis=0).astype(float).tolist()
    v_max = verts.max(axis=0).astype(float).tolist()
    i_max = int(idx.max(initial=0))

    gltf = {
        "asset": {"version": "2.0", "generator": "splat_ply_to_mesh_ply.py"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0}],
        "meshes": [
            {
                "primitives": [
                    {
                        "attributes": {"POSITION": 0},
                        "indices": 1,
                        "mode": 4,  # TRIANGLES
                    }
                ]
            }
        ],
        "buffers": [{"byteLength": len(bin_blob)}],
        "bufferViews": [
            {
                "buffer": 0,
                "byteOffset": pos_offset,
                "byteLength": len(pos_bytes),
                "target": 34962,  # ARRAY_BUFFER
            },
            {
                "buffer": 0,
                "byteOffset": idx_offset,
                "byteLength": len(idx_bytes),
                "target": 34963,  # ELEMENT_ARRAY_BUFFER
            },
        ],
        "accessors": [
            {
                "bufferView": 0,
                "componentType": 5126,  # FLOAT
                "count": int(verts.shape[0]),
                "type": "VEC3",
                "min": v_min,
                "max": v_max,
            },
            {
                "bufferView": 1,
                "componentType": 5125,  # UNSIGNED_INT
                "count": int(idx.shape[0]),
                "type": "SCALAR",
                "min": [0],
                "max": [i_max],
            },
        ],
    }

    json_chunk = json.dumps(gltf, separators=(",", ":")).encode("utf-8")
    json_pad = (4 - (len(json_chunk) % 4)) % 4
    json_chunk += b" " * json_pad

    bin_pad = (4 - (len(bin_blob) % 4)) % 4
    bin_chunk = bin_blob + (b"\x00" * bin_pad)

    total_len = 12 + 8 + len(json_chunk) + 8 + len(bin_chunk)
    header = struct.pack("<III", 0x46546C67, 2, total_len)  # glTF, v2
    json_header = struct.pack("<II", len(json_chunk), 0x4E4F534A)  # JSON
    bin_header = struct.pack("<II", len(bin_chunk), 0x004E4942)  # BIN\0

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(header + json_header + json_chunk + bin_header + bin_chunk)


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Convert Gaussian splat PLY into an approximate triangle mesh GLB.",
    )
    parser.add_argument("--input", required=True, type=Path, help="Input Gaussian splat .ply")
    parser.add_argument("--output", required=True, type=Path, help="Output mesh .glb")
    parser.add_argument(
        "--min-opacity",
        type=float,
        default=None,
        help="Optional opacity threshold. Ignored if opacity field is absent.",
    )
    parser.add_argument(
        "--voxel-size",
        type=float,
        default=0.0,
        help="Optional voxel downsample size before meshing (default: 0 = disabled).",
    )
    parser.add_argument(
        "--max-points",
        type=int,
        default=30000,
        help="Maximum points used for meshing after filters (default: 30000).",
    )
    parser.add_argument(
        "--neighbors",
        type=int,
        default=12,
        help="kNN count used for normals + local triangulation (default: 12).",
    )
    parser.add_argument(
        "--max-edge-factor",
        type=float,
        default=2.5,
        help="Local edge length multiplier from median neighbor distance (default: 2.5).",
    )
    parser.add_argument(
        "--normal-angle-deg",
        type=float,
        default=55.0,
        help="Max normal difference allowed for local triangles (default: 55 deg).",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=0,
        help="Random seed used when subsampling to --max-points.",
    )
    return parser


def main() -> int:
    args = _build_parser().parse_args()
    if args.max_points < 100:
        raise ValueError("--max-points must be >= 100")
    if args.neighbors < 4:
        raise ValueError("--neighbors must be >= 4")
    if args.max_edge_factor <= 0:
        raise ValueError("--max-edge-factor must be > 0")
    if not (0 < args.normal_angle_deg < 180):
        raise ValueError("--normal-angle-deg must be in (0, 180)")
    if args.output.suffix.lower() != ".glb":
        args.output = args.output.with_suffix(".glb")

    points, opacity = _load_points_and_opacity(args.input)
    original_count = points.shape[0]

    if args.min_opacity is not None:
        if opacity is None:
            print("Warning: --min-opacity was set but no opacity field was found; skipping opacity filter.")
        else:
            keep = opacity >= args.min_opacity
            points = points[keep]
            print(f"Opacity filter kept {points.shape[0]:,} / {original_count:,} points.")
            if points.shape[0] < 4:
                raise ValueError("Too few points after opacity filter.")

    if args.voxel_size > 0:
        before = points.shape[0]
        points = _voxel_downsample(points, args.voxel_size)
        print(f"Voxel downsample kept {points.shape[0]:,} / {before:,} points.")
        if points.shape[0] < 4:
            raise ValueError("Too few points after voxel downsampling.")

    if points.shape[0] > args.max_points:
        rng = np.random.default_rng(args.seed)
        idx = rng.choice(points.shape[0], size=args.max_points, replace=False)
        points = points[idx]
        print(f"Random subsample kept {points.shape[0]:,} points (--max-points).")

    n_points = points.shape[0]
    if n_points < args.neighbors + 1:
        raise ValueError(
            f"Not enough points ({n_points}) for neighbors={args.neighbors}.",
        )

    nn = NearestNeighbors(n_neighbors=args.neighbors + 1, algorithm="auto")
    nn.fit(points)
    nn_dist, nn_index = nn.kneighbors(points, return_distance=True)

    normals = _estimate_normals(points, nn_index)
    min_cos_angle = float(np.cos(np.deg2rad(args.normal_angle_deg)))

    faces = _build_mesh_faces(
        points=points,
        normals=normals,
        nn_dist=nn_dist,
        nn_index=nn_index,
        max_edge_factor=args.max_edge_factor,
        min_cos_angle=min_cos_angle,
    )

    _write_mesh_glb(args.output, points, faces)
    print(f"Input points: {original_count:,}")
    print(f"Mesh vertices: {points.shape[0]:,}")
    print(f"Mesh faces: {faces.shape[0]:,}")
    print(f"Wrote mesh GLB: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
