from __future__ import annotations

from dataclasses import dataclass
import json
import math
from pathlib import Path
import re

import numpy as np

from .nl_to_edit import EditCommand, parse_prompt
from .pointcloud_edit import (
    PointCloudPLY,
    _hole_fill_plane_patch,
    format_bbox,
    load_label_bboxes,
    load_pointcloud_ply,
    save_label_bboxes,
    save_pointcloud_ply,
)


BBox = tuple[tuple[float, float, float], tuple[float, float, float]]

_LEADING_DESCRIPTORS: set[str] = {
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


@dataclass
class ObjectAsset:
    label: str
    point_count: int
    bbox: BBox
    center: tuple[float, float, float]
    points_path: Path
    proxy_mesh_path: Path


@dataclass
class ObjectEditResult:
    output_ply: Path
    output_labels: Path
    report_path: Path
    moved_points: int
    moved_labels: list[str]
    translations: dict[str, tuple[float, float, float]]
    clashes_after: dict[str, list[str]]


def _canon_label(value: str) -> str:
    out = " ".join(value.strip().lower().split())
    if out.startswith("the "):
        out = out[4:].strip()
    if out.endswith("s") and len(out) > 1:
        out = out[:-1]
    return out


def _strip_descriptors(value: str) -> str:
    words = value.split()
    while words and words[0] in _LEADING_DESCRIPTORS:
        words = words[1:]
    return " ".join(words)


def _safe_label_filename(label: str) -> str:
    text = _canon_label(label).replace(" ", "_")
    text = re.sub(r"[^a-z0-9_\-]", "", text)
    return text or "object"


def _array_xyz(vertices: np.ndarray) -> np.ndarray:
    return np.column_stack((vertices["x"], vertices["y"], vertices["z"])).astype(np.float32)


def _expand_bbox(
    bbox: BBox,
    margin: float,
) -> BBox:
    (xmin, ymin, zmin), (xmax, ymax, zmax) = bbox
    return (
        (xmin - margin, ymin - margin, zmin - margin),
        (xmax + margin, ymax + margin, zmax + margin),
    )


def _bbox_center(bbox: BBox) -> tuple[float, float, float]:
    (x0, y0, z0), (x1, y1, z1) = bbox
    return ((x0 + x1) / 2.0, (y0 + y1) / 2.0, (z0 + z1) / 2.0)


def _bbox_size(bbox: BBox) -> tuple[float, float, float]:
    (x0, y0, z0), (x1, y1, z1) = bbox
    return (max(0.0, x1 - x0), max(0.0, y1 - y0), max(0.0, z1 - z0))


def _bbox_translate(bbox: BBox, dx: float, dy: float, dz: float) -> BBox:
    (x0, y0, z0), (x1, y1, z1) = bbox
    return ((x0 + dx, y0 + dy, z0 + dz), (x1 + dx, y1 + dy, z1 + dz))


def _bbox_volume(bbox: BBox) -> float:
    sx, sy, sz = _bbox_size(bbox)
    return sx * sy * sz


def _bbox_overlap_ratio(a: BBox, b: BBox) -> float:
    (ax0, ay0, az0), (ax1, ay1, az1) = a
    (bx0, by0, bz0), (bx1, by1, bz1) = b
    ix = max(0.0, min(ax1, bx1) - max(ax0, bx0))
    iy = max(0.0, min(ay1, by1) - max(ay0, by0))
    iz = max(0.0, min(az1, bz1) - max(az0, bz0))
    inter = ix * iy * iz
    if inter <= 0.0:
        return 0.0
    return inter / max(1e-8, min(_bbox_volume(a), _bbox_volume(b)))


def _in_bounds(bbox: BBox, room_bounds: BBox) -> bool:
    (x0, y0, z0), (x1, y1, z1) = bbox
    (rx0, ry0, rz0), (rx1, ry1, rz1) = room_bounds
    return x0 >= rx0 and y0 >= ry0 and z0 >= rz0 and x1 <= rx1 and y1 <= ry1 and z1 <= rz1


def _bbox_from_vertices(vertices: np.ndarray) -> BBox:
    xyz = _array_xyz(vertices)
    low = xyz.min(axis=0)
    high = xyz.max(axis=0)
    return (
        (float(low[0]), float(low[1]), float(low[2])),
        (float(high[0]), float(high[1]), float(high[2])),
    )


def _connected_components_indices(xyz: np.ndarray, voxel_size: float) -> list[np.ndarray]:
    if xyz.shape[0] == 0:
        return []
    if xyz.shape[0] < 128:
        return [np.arange(xyz.shape[0], dtype=np.int64)]

    vs = max(1e-3, float(voxel_size))
    mn = xyz.min(axis=0)
    grid = np.floor((xyz - mn[None, :]) / vs).astype(np.int32)

    voxel_to_points: dict[tuple[int, int, int], list[int]] = {}
    for i, g in enumerate(grid):
        k = (int(g[0]), int(g[1]), int(g[2]))
        voxel_to_points.setdefault(k, []).append(i)

    offsets = (
        (1, 0, 0),
        (-1, 0, 0),
        (0, 1, 0),
        (0, -1, 0),
        (0, 0, 1),
        (0, 0, -1),
    )
    unseen = set(voxel_to_points.keys())
    components: list[np.ndarray] = []
    while unseen:
        start = unseen.pop()
        stack = [start]
        comp_keys = {start}
        while stack:
            x, y, z = stack.pop()
            for dx, dy, dz in offsets:
                nk = (x + dx, y + dy, z + dz)
                if nk in unseen:
                    unseen.remove(nk)
                    comp_keys.add(nk)
                    stack.append(nk)
        keep: list[int] = []
        for key in comp_keys:
            keep.extend(voxel_to_points[key])
        components.append(np.array(sorted(keep), dtype=np.int64))
    components.sort(key=lambda c: int(c.shape[0]), reverse=True)
    return components


def _compute_obb_corners(xyz: np.ndarray) -> np.ndarray:
    center = xyz.mean(axis=0)
    centered = xyz - center[None, :]
    _, _, vh = np.linalg.svd(centered, full_matrices=False)
    axes = vh.T
    proj = centered @ axes
    lo = proj.min(axis=0)
    hi = proj.max(axis=0)
    corners_local = np.array(
        [
            [lo[0], lo[1], lo[2]],
            [hi[0], lo[1], lo[2]],
            [hi[0], hi[1], lo[2]],
            [lo[0], hi[1], lo[2]],
            [lo[0], lo[1], hi[2]],
            [hi[0], lo[1], hi[2]],
            [hi[0], hi[1], hi[2]],
            [lo[0], hi[1], hi[2]],
        ],
        dtype=np.float32,
    )
    return center[None, :] + corners_local @ axes.T


def _write_triangle_mesh_ply(path: Path, vertices: np.ndarray, faces: np.ndarray) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="ascii") as f:
        f.write("ply\n")
        f.write("format ascii 1.0\n")
        f.write(f"element vertex {vertices.shape[0]}\n")
        f.write("property float x\n")
        f.write("property float y\n")
        f.write("property float z\n")
        f.write(f"element face {faces.shape[0]}\n")
        f.write("property list uchar int vertex_indices\n")
        f.write("end_header\n")
        for v in vertices:
            f.write(f"{float(v[0]):.6f} {float(v[1]):.6f} {float(v[2]):.6f}\n")
        for tri in faces:
            f.write(f"3 {int(tri[0])} {int(tri[1])} {int(tri[2])}\n")
    return path


def _bbox_mesh_faces() -> np.ndarray:
    return np.array(
        [
            [0, 1, 2],
            [0, 2, 3],
            [4, 6, 5],
            [4, 7, 6],
            [0, 4, 5],
            [0, 5, 1],
            [1, 5, 6],
            [1, 6, 2],
            [2, 6, 7],
            [2, 7, 3],
            [3, 7, 4],
            [3, 4, 0],
        ],
        dtype=np.int32,
    )


def _destination_to_xy(room_bounds: BBox, destination: str) -> tuple[float, float]:
    (min_x, min_y, _), (max_x, max_y, _) = room_bounds
    cx = (min_x + max_x) / 2.0
    cy = (min_y + max_y) / 2.0
    margin_x = max((max_x - min_x) * 0.12, 0.35)
    margin_y = max((max_y - min_y) * 0.12, 0.35)
    d = destination.lower().strip()
    if d in {"back", "back wall", "rear"}:
        return (cx, max_y - margin_y)
    if d in {"front", "front wall"}:
        return (cx, min_y + margin_y)
    if d in {"left", "left side"}:
        return (min_x + margin_x, cy)
    if d in {"right", "right side"}:
        return (max_x - margin_x, cy)
    if d in {"center", "middle"}:
        return (cx, cy)
    raise ValueError(f"Unsupported destination '{destination}'")


def _resolve_label(requested: str, labels: dict[str, BBox]) -> str:
    keys = set(labels.keys())
    r = _canon_label(requested)
    candidates = [r]
    stripped = _strip_descriptors(r)
    if stripped and stripped != r:
        candidates.append(stripped)
    for c in candidates:
        if c in keys:
            return c

    req_tokens = set(stripped.split()) if stripped else set(r.split())
    best = None
    best_score = 0.0
    for key in keys:
        key_tokens = set(key.split())
        inter = len(req_tokens & key_tokens)
        if inter == 0:
            continue
        union = max(1, len(req_tokens | key_tokens))
        score = inter / union
        if score > best_score:
            best_score = score
            best = key
    if best is not None and best_score >= 0.5:
        return best
    raise ValueError(f"Could not resolve object '{requested}' from labels: {sorted(keys)}")


def _select_object_indices(
    pc: PointCloudPLY,
    bbox: BBox,
    expand: float,
    component_voxel: float,
    min_points: int,
) -> np.ndarray:
    use_bbox = _expand_bbox(bbox, expand) if expand > 0 else bbox
    mask = pc.select_bbox(use_bbox[0], use_bbox[1])
    idx = np.flatnonzero(mask)
    if idx.shape[0] == 0:
        return idx

    xyz = _array_xyz(pc.vertices[idx])
    components = _connected_components_indices(xyz, voxel_size=component_voxel)
    if components and components[0].shape[0] >= max(32, min_points // 2):
        idx = idx[components[0]]
    return idx


def build_object_mesh_assets(
    *,
    input_path: str | Path,
    labels_path: str | Path,
    out_dir: str | Path,
    names: list[str] | None = None,
    expand: float = 0.02,
    component_voxel: float = 0.06,
    min_points: int = 120,
) -> tuple[Path, list[ObjectAsset], list[dict[str, str]]]:
    labels = load_label_bboxes(labels_path)
    if not labels:
        raise ValueError("No labels found.")

    if names:
        wanted = [_canon_label(v) for v in names if _canon_label(v)]
        labels = {k: v for k, v in labels.items() if k in set(wanted)}
        if not labels:
            raise ValueError("No requested labels were found in labels file.")

    pc = load_pointcloud_ply(input_path)
    out_root = Path(out_dir).expanduser().resolve()
    out_root.mkdir(parents=True, exist_ok=True)

    assets: list[ObjectAsset] = []
    skipped: list[dict[str, str]] = []
    faces = _bbox_mesh_faces()
    for label, bbox in sorted(labels.items()):
        idx = _select_object_indices(
            pc=pc,
            bbox=bbox,
            expand=expand,
            component_voxel=component_voxel,
            min_points=min_points,
        )
        if idx.shape[0] < max(1, int(min_points)):
            skipped.append(
                {
                    "label": label,
                    "reason": f"too_few_points ({int(idx.shape[0])} < {int(min_points)})",
                }
            )
            continue
        obj_vertices = pc.vertices[idx].copy()
        obj_pc = PointCloudPLY(header=pc.header, vertices=obj_vertices)
        safe = _safe_label_filename(label)
        points_path = out_root / f"{safe}.points.ply"
        save_pointcloud_ply(obj_pc, points_path)

        xyz = _array_xyz(obj_vertices)
        corners = _compute_obb_corners(xyz)
        proxy_mesh_path = out_root / f"{safe}.proxy_mesh.ply"
        _write_triangle_mesh_ply(proxy_mesh_path, corners, faces)
        bbox_obj = _bbox_from_vertices(obj_vertices)
        center = _bbox_center(bbox_obj)
        assets.append(
            ObjectAsset(
                label=label,
                point_count=int(idx.shape[0]),
                bbox=bbox_obj,
                center=center,
                points_path=points_path,
                proxy_mesh_path=proxy_mesh_path,
            )
        )

    manifest = {
        "input_ply": str(Path(input_path).expanduser().resolve()),
        "labels_path": str(Path(labels_path).expanduser().resolve()),
        "expand": float(expand),
        "component_voxel": float(component_voxel),
        "min_points": int(min_points),
        "objects": [
            {
                "label": a.label,
                "point_count": a.point_count,
                "bbox": format_bbox(a.bbox),
                "center": [a.center[0], a.center[1], a.center[2]],
                "points_path": str(a.points_path),
                "proxy_mesh_path": str(a.proxy_mesh_path),
            }
            for a in assets
        ],
        "skipped": skipped,
    }
    manifest_path = out_root / "objects.manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest_path, assets, skipped


def _compute_initial_translations(
    cmd: EditCommand,
    object_bboxes: dict[str, BBox],
    room_bounds: BBox,
) -> dict[str, tuple[float, float, float]]:
    if cmd.op == "move":
        target = _canon_label(cmd.args.get("target", ""))
        if target not in object_bboxes:
            raise ValueError(f"Missing target object '{target}' in selected objects.")
        tc = _bbox_center(object_bboxes[target])
        if cmd.args.get("relation") == "near":
            anchor = _canon_label(cmd.args.get("anchor", ""))
            if anchor not in object_bboxes:
                raise ValueError(f"Missing anchor object '{anchor}' in selected objects.")
            ac = _bbox_center(object_bboxes[anchor])
            ts = _bbox_size(object_bboxes[target])
            asz = _bbox_size(object_bboxes[anchor])
            radius = 0.5 * max(ts[0], ts[1]) + 0.5 * max(asz[0], asz[1]) + 0.2
            vec = np.array([tc[0] - ac[0], tc[1] - ac[1]], dtype=np.float32)
            n = float(np.linalg.norm(vec))
            if n < 1e-4:
                vec = np.array([1.0, 0.0], dtype=np.float32)
            else:
                vec /= n
            desired_xy = np.array([ac[0], ac[1]], dtype=np.float32) + vec * radius
            dx = float(desired_xy[0] - tc[0])
            dy = float(desired_xy[1] - tc[1])
            return {target: (dx, dy, 0.0)}
        destination = cmd.args.get("destination", "")
        tx, ty = _destination_to_xy(room_bounds, destination)
        return {target: (tx - tc[0], ty - tc[1], 0.0)}

    if cmd.op == "swap":
        a = _canon_label(cmd.args.get("a", ""))
        b = _canon_label(cmd.args.get("b", ""))
        if a not in object_bboxes or b not in object_bboxes:
            raise ValueError("Swap objects were not resolved in selected objects.")
        ca = _bbox_center(object_bboxes[a])
        cb = _bbox_center(object_bboxes[b])
        return {
            a: (cb[0] - ca[0], cb[1] - ca[1], cb[2] - ca[2]),
            b: (ca[0] - cb[0], ca[1] - cb[1], ca[2] - cb[2]),
        }

    raise ValueError(f"Unsupported prompt operation '{cmd.op}' for object edit.")


def _clamp_bbox_to_room(bbox: BBox, room_bounds: BBox) -> BBox:
    (x0, y0, z0), (x1, y1, z1) = bbox
    (rx0, ry0, rz0), (rx1, ry1, rz1) = room_bounds
    sx, sy, sz = x1 - x0, y1 - y0, z1 - z0
    nx0 = min(max(x0, rx0), max(rx0, rx1 - sx))
    ny0 = min(max(y0, ry0), max(ry0, ry1 - sy))
    nz0 = min(max(z0, rz0), max(rz0, rz1 - sz))
    return ((nx0, ny0, nz0), (nx0 + sx, ny0 + sy, nz0 + sz))


def _resolve_clashes(
    *,
    moved_labels: list[str],
    base_bboxes: dict[str, BBox],
    translations: dict[str, tuple[float, float, float]],
    room_bounds: BBox,
    overlap_threshold: float,
    push_step: float,
    max_iters: int,
) -> tuple[dict[str, tuple[float, float, float]], dict[str, list[str]]]:
    adjusted = dict(translations)
    moved_boxes = {
        k: _bbox_translate(base_bboxes[k], *adjusted[k]) for k in moved_labels
    }
    clashes: dict[str, list[str]] = {k: [] for k in moved_labels}

    for label in moved_labels:
        box = moved_boxes[label]
        for _ in range(max_iters):
            local_clashes: list[str] = []
            push = np.zeros(3, dtype=np.float32)
            lc = _bbox_center(box)
            for other, other_base in base_bboxes.items():
                if other == label:
                    continue
                other_box = moved_boxes[other] if other in moved_boxes else other_base
                ov = _bbox_overlap_ratio(box, other_box)
                if ov <= overlap_threshold:
                    continue
                local_clashes.append(other)
                oc = _bbox_center(other_box)
                vec = np.array([lc[0] - oc[0], lc[1] - oc[1], 0.0], dtype=np.float32)
                n = float(np.linalg.norm(vec))
                if n < 1e-4:
                    vec = np.array([1.0, 0.0, 0.0], dtype=np.float32)
                else:
                    vec /= n
                push += vec * float(ov)
            if not local_clashes:
                break
            n_push = float(np.linalg.norm(push[:2]))
            if n_push < 1e-6:
                push = np.array([1.0, 0.0, 0.0], dtype=np.float32)
                n_push = 1.0
            push /= n_push
            dx = float(push[0] * push_step)
            dy = float(push[1] * push_step)
            box = _bbox_translate(box, dx, dy, 0.0)
            box = _clamp_bbox_to_room(box, room_bounds)
        moved_boxes[label] = box
        c = _bbox_center(box)
        b = _bbox_center(base_bboxes[label])
        adjusted[label] = (c[0] - b[0], c[1] - b[1], c[2] - b[2])

    for label in moved_labels:
        box = moved_boxes[label]
        lc: list[str] = []
        for other, other_base in base_bboxes.items():
            if other == label:
                continue
            other_box = moved_boxes[other] if other in moved_boxes else other_base
            if _bbox_overlap_ratio(box, other_box) > overlap_threshold:
                lc.append(other)
        clashes[label] = sorted(lc)
    return adjusted, clashes


def apply_object_prompt_edit(
    *,
    input_path: str | Path,
    labels_path: str | Path,
    prompt: str,
    out_path: str | Path,
    out_labels_path: str | Path,
    report_path: str | Path,
    select_expand: float = 0.02,
    component_voxel: float = 0.06,
    min_points: int = 120,
    overlap_threshold: float = 0.08,
    overlap_push_step: float = 0.06,
    overlap_max_iters: int = 40,
    hole_fill: bool = True,
    hole_fill_margin: float = 0.2,
    hole_fill_ratio: float = 0.35,
) -> ObjectEditResult:
    labels = load_label_bboxes(labels_path)
    if not labels:
        raise ValueError("No labels found.")
    pc = load_pointcloud_ply(input_path)
    room_bounds = pc.bounds()

    commands = parse_prompt(prompt)
    if len(commands) != 1:
        raise ValueError("Only single-command prompts are supported.")
    cmd = commands[0]
    if cmd.op not in {"move", "swap", "swap_two"}:
        raise ValueError("Object edit currently supports move, swap, and swap_two prompts.")

    resolved: dict[str, str] = {}
    if cmd.op == "move":
        resolved_target = _resolve_label(cmd.args.get("target", ""), labels)
        resolved["target"] = resolved_target
        cmd.args["target"] = resolved_target
        if cmd.args.get("relation") == "near":
            resolved_anchor = _resolve_label(cmd.args.get("anchor", ""), labels)
            resolved["anchor"] = resolved_anchor
            cmd.args["anchor"] = resolved_anchor
    elif cmd.op == "swap":
        resolved_a = _resolve_label(cmd.args.get("a", ""), labels)
        resolved_b = _resolve_label(cmd.args.get("b", ""), labels)
        resolved["a"] = resolved_a
        resolved["b"] = resolved_b
        cmd.args["a"] = resolved_a
        cmd.args["b"] = resolved_b
    elif cmd.op == "swap_two":
        resolved_label = _resolve_label(cmd.args.get("label", ""), labels)
        resolved["label"] = resolved_label
        cmd.args["label"] = resolved_label
    moved_labels = (
        [cmd.args["target"]]
        if cmd.op == "move"
        else ([cmd.args["a"], cmd.args["b"]] if cmd.op == "swap" else [])
    )

    object_indices: dict[str, np.ndarray] = {}
    object_bboxes: dict[str, BBox] = dict(labels)
    old_selected_vertices: dict[str, np.ndarray] = {}
    scan_labels = set(
        moved_labels
        + ([cmd.args["anchor"]] if cmd.op == "move" and cmd.args.get("relation") == "near" else [])
    )
    for label in scan_labels:
        idx = _select_object_indices(
            pc=pc,
            bbox=labels[label],
            expand=select_expand,
            component_voxel=component_voxel,
            min_points=min_points,
        )
        if idx.shape[0] < max(1, min_points):
            raise ValueError(
                f"Object '{label}' has too few points ({int(idx.shape[0])}) after extraction."
            )
        object_indices[label] = idx
        v = pc.vertices[idx]
        object_bboxes[label] = _bbox_from_vertices(v)
        old_selected_vertices[label] = v.copy()

    if cmd.op == "swap_two":
        base = cmd.args["label"]
        use_bbox = _expand_bbox(labels[base], select_expand) if select_expand > 0 else labels[base]
        raw_mask = pc.select_bbox(use_bbox[0], use_bbox[1])
        raw_idx = np.flatnonzero(raw_mask)
        if raw_idx.shape[0] < max(2 * min_points, 64):
            raise ValueError(
                f"swap_two '{base}' has too few points ({int(raw_idx.shape[0])}) to split into two instances."
            )
        raw_xyz = _array_xyz(pc.vertices[raw_idx])
        comps = _connected_components_indices(raw_xyz, voxel_size=component_voxel)
        comps = [c for c in comps if int(c.shape[0]) >= max(1, min_points)]
        if len(comps) < 2:
            raise ValueError(
                f"swap_two '{base}' requires at least two connected components; found {len(comps)}."
            )
        c1 = raw_idx[comps[0]]
        c2 = raw_idx[comps[1]]
        l1 = f"{base}#1"
        l2 = f"{base}#2"
        moved_labels = [l1, l2]
        object_indices[l1] = c1
        object_indices[l2] = c2
        old_selected_vertices[l1] = pc.vertices[c1].copy()
        old_selected_vertices[l2] = pc.vertices[c2].copy()
        object_bboxes[l1] = _bbox_from_vertices(pc.vertices[c1])
        object_bboxes[l2] = _bbox_from_vertices(pc.vertices[c2])
        c1c = _bbox_center(object_bboxes[l1])
        c2c = _bbox_center(object_bboxes[l2])
        initial = {
            l1: (c2c[0] - c1c[0], c2c[1] - c1c[1], c2c[2] - c1c[2]),
            l2: (c1c[0] - c2c[0], c1c[1] - c2c[1], c1c[2] - c2c[2]),
        }
    else:
        initial = _compute_initial_translations(cmd, object_bboxes, room_bounds)
    adjusted, clashes_after = _resolve_clashes(
        moved_labels=moved_labels,
        base_bboxes=object_bboxes,
        translations=initial,
        room_bounds=room_bounds,
        overlap_threshold=overlap_threshold,
        push_step=overlap_push_step,
        max_iters=overlap_max_iters,
    )

    point_owner = np.full(pc.vertices.shape[0], -1, dtype=np.int32)
    moved_count = 0
    for owner_id, label in enumerate(moved_labels):
        idx = object_indices[label]
        claim = idx[point_owner[idx] < 0]
        point_owner[claim] = owner_id
        dx, dy, dz = adjusted[label]
        pc.vertices["x"][claim] += np.float32(dx)
        pc.vertices["y"][claim] += np.float32(dy)
        pc.vertices["z"][claim] += np.float32(dz)
        moved_count += int(claim.shape[0])

    if hole_fill:
        stationary = point_owner < 0
        fill_chunks: list[np.ndarray] = []
        for label in moved_labels:
            fill = _hole_fill_plane_patch(
                vertices=pc.vertices,
                stationary_mask=stationary,
                old_object_vertices=old_selected_vertices[label],
                hole_bbox=object_bboxes[label],
                margin=hole_fill_margin,
                sample_ratio=hole_fill_ratio,
            )
            if fill.shape[0] > 0:
                fill_chunks.append(fill)
        if fill_chunks:
            pc.vertices = np.concatenate([pc.vertices] + fill_chunks, axis=0)

    out_p = save_pointcloud_ply(pc, out_path)
    out_labels = dict(labels)
    for label in moved_labels:
        dx, dy, dz = adjusted[label]
        if label in out_labels:
            out_labels[label] = _bbox_translate(object_bboxes[label], dx, dy, dz)
        else:
            out_labels[label] = _bbox_translate(object_bboxes[label], dx, dy, dz)
    out_labels_p = save_label_bboxes(out_labels_path, out_labels)

    report = {
        "prompt": prompt,
        "resolved_labels": resolved,
        "moved_labels": moved_labels,
        "initial_translations": {k: list(v) for k, v in initial.items()},
        "final_translations": {k: list(v) for k, v in adjusted.items()},
        "clashes_after": clashes_after,
        "room_bounds": format_bbox(room_bounds),
        "moved_points": moved_count,
        "output_ply": str(out_p),
        "output_labels": str(out_labels_p),
        "hole_fill": {
            "enabled": hole_fill,
            "margin": hole_fill_margin,
            "ratio": hole_fill_ratio,
        },
    }
    report_p = Path(report_path).expanduser().resolve()
    report_p.parent.mkdir(parents=True, exist_ok=True)
    report_p.write_text(json.dumps(report, indent=2) + "\n")

    return ObjectEditResult(
        output_ply=out_p,
        output_labels=out_labels_p,
        report_path=report_p,
        moved_points=moved_count,
        moved_labels=moved_labels,
        translations=adjusted,
        clashes_after=clashes_after,
    )
