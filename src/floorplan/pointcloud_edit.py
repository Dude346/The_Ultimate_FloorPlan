from __future__ import annotations

from dataclasses import dataclass
import json
from pathlib import Path
import re

import numpy as np

from .nl_to_edit import parse_prompt


_PLY_TO_NUMPY = {
    "char": "i1",
    "uchar": "u1",
    "short": "<i2",
    "ushort": "<u2",
    "int": "<i4",
    "uint": "<u4",
    "float": "<f4",
    "double": "<f8",
}


@dataclass
class PointCloudPLY:
    header: bytes
    vertices: np.ndarray

    @property
    def count(self) -> int:
        return int(self.vertices.shape[0])

    def bounds(self) -> tuple[tuple[float, float, float], tuple[float, float, float]]:
        mn = (
            float(self.vertices["x"].min()),
            float(self.vertices["y"].min()),
            float(self.vertices["z"].min()),
        )
        mx = (
            float(self.vertices["x"].max()),
            float(self.vertices["y"].max()),
            float(self.vertices["z"].max()),
        )
        return mn, mx

    def select_bbox(
        self,
        bbox_min: tuple[float, float, float],
        bbox_max: tuple[float, float, float],
    ) -> np.ndarray:
        x, y, z = self.vertices["x"], self.vertices["y"], self.vertices["z"]
        return (
            (x >= bbox_min[0])
            & (x <= bbox_max[0])
            & (y >= bbox_min[1])
            & (y <= bbox_max[1])
            & (z >= bbox_min[2])
            & (z <= bbox_max[2])
        )

    def translate_mask(self, mask: np.ndarray, dx: float, dy: float, dz: float) -> int:
        count = int(mask.sum())
        if count == 0:
            raise ValueError("Selection bbox contains zero points.")
        self.vertices["x"][mask] += np.float32(dx)
        self.vertices["y"][mask] += np.float32(dy)
        self.vertices["z"][mask] += np.float32(dz)
        return count


def _parse_header(path: Path) -> tuple[bytes, np.dtype, int]:
    header_chunks: list[bytes] = []
    vertex_count: int | None = None
    current_element: str | None = None
    vertex_props: list[tuple[str, str]] = []
    fmt: str | None = None

    with path.open("rb") as f:
        while True:
            line = f.readline()
            if not line:
                raise ValueError("Invalid PLY: missing end_header")
            header_chunks.append(line)
            text = line.decode("ascii", errors="strict").strip()
            if text.startswith("format "):
                _, fmt_name, _ = text.split(maxsplit=2)
                fmt = fmt_name
            elif text.startswith("element "):
                _, elem_name, elem_count = text.split(maxsplit=2)
                current_element = elem_name
                if elem_name == "vertex":
                    vertex_count = int(elem_count)
            elif text.startswith("property "):
                parts = text.split()
                if current_element == "vertex":
                    if len(parts) != 3:
                        raise ValueError(
                            "Only scalar vertex properties are supported in this command."
                        )
                    _, typ, name = parts
                    if typ not in _PLY_TO_NUMPY:
                        raise ValueError(f"Unsupported vertex property type '{typ}'")
                    vertex_props.append((name, _PLY_TO_NUMPY[typ]))
            elif text == "end_header":
                break

        if fmt != "binary_little_endian":
            raise ValueError("Only binary_little_endian PLY is supported.")
        if vertex_count is None:
            raise ValueError("Invalid PLY: missing vertex element")
        if not vertex_props:
            raise ValueError("Invalid PLY: no vertex properties found")

        if not any(name == "x" for name, _ in vertex_props):
            raise ValueError("PLY must contain vertex property 'x'")
        if not any(name == "y" for name, _ in vertex_props):
            raise ValueError("PLY must contain vertex property 'y'")
        if not any(name == "z" for name, _ in vertex_props):
            raise ValueError("PLY must contain vertex property 'z'")

    header = b"".join(header_chunks)
    dtype = np.dtype(vertex_props)
    return header, dtype, vertex_count


def load_pointcloud_ply(path: str | Path) -> PointCloudPLY:
    p = Path(path).expanduser().resolve()
    header, dtype, vertex_count = _parse_header(p)
    with p.open("rb") as f:
        f.seek(len(header))
        vertices = np.fromfile(f, dtype=dtype, count=vertex_count)
    if int(vertices.shape[0]) != vertex_count:
        raise ValueError(
            f"Vertex count mismatch. Header says {vertex_count}, found {vertices.shape[0]}"
        )
    return PointCloudPLY(header=header, vertices=vertices)


def _rewrite_vertex_count(header: bytes, vertex_count: int) -> bytes:
    lines = header.splitlines(keepends=True)
    out_lines: list[bytes] = []
    replaced = False
    for line in lines:
        if line.startswith(b"element vertex "):
            out_lines.append(f"element vertex {vertex_count}\n".encode("ascii"))
            replaced = True
        else:
            out_lines.append(line)
    if not replaced:
        raise ValueError("PLY header missing 'element vertex' line.")
    return b"".join(out_lines)


def save_pointcloud_ply(pc: PointCloudPLY, out_path: str | Path) -> Path:
    out = Path(out_path).expanduser().resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    header = _rewrite_vertex_count(pc.header, int(pc.vertices.shape[0]))
    with out.open("wb") as f:
        f.write(header)
        pc.vertices.tofile(f)
    return out


def parse_vec3(raw: str) -> tuple[float, float, float]:
    values = [v.strip() for v in raw.split(",")]
    if len(values) != 3:
        raise ValueError(f"Expected 3 comma-separated values, got '{raw}'")
    return (float(values[0]), float(values[1]), float(values[2]))


def parse_bbox(raw: str) -> tuple[tuple[float, float, float], tuple[float, float, float]]:
    values = [v.strip() for v in raw.split(",")]
    if len(values) != 6:
        raise ValueError(
            "Expected bbox as xmin,ymin,zmin,xmax,ymax,zmax "
            f"but got '{raw}'"
        )
    xmin, ymin, zmin, xmax, ymax, zmax = (float(v) for v in values)
    return (xmin, ymin, zmin), (xmax, ymax, zmax)


def parse_bbox_list(
    values: list[float] | tuple[float, ...],
) -> tuple[tuple[float, float, float], tuple[float, float, float]]:
    if len(values) != 6:
        raise ValueError("BBox list must have 6 numbers")
    xmin, ymin, zmin, xmax, ymax, zmax = (float(v) for v in values)
    return (xmin, ymin, zmin), (xmax, ymax, zmax)


def format_bbox(
    bbox: tuple[tuple[float, float, float], tuple[float, float, float]]
) -> list[float]:
    (xmin, ymin, zmin), (xmax, ymax, zmax) = bbox
    return [xmin, ymin, zmin, xmax, ymax, zmax]


def format_bounds(bounds: tuple[tuple[float, float, float], tuple[float, float, float]]) -> str:
    (min_x, min_y, min_z), (max_x, max_y, max_z) = bounds
    return (
        f"min=({min_x:.4f}, {min_y:.4f}, {min_z:.4f}) "
        f"max=({max_x:.4f}, {max_y:.4f}, {max_z:.4f})"
    )


def _array_xyz(vertices: np.ndarray) -> np.ndarray:
    return np.column_stack((vertices["x"], vertices["y"], vertices["z"])).astype(np.float32)


def _color_fields(vertices: np.ndarray) -> tuple[str, str, str] | None:
    names = set(vertices.dtype.names or [])
    if {"red", "green", "blue"}.issubset(names):
        return ("red", "green", "blue")
    if {"r", "g", "b"}.issubset(names):
        return ("r", "g", "b")
    return None


def _in_bbox_xyz(
    xyz: np.ndarray,
    bbox: tuple[tuple[float, float, float], tuple[float, float, float]],
) -> np.ndarray:
    (xmin, ymin, zmin), (xmax, ymax, zmax) = bbox
    return (
        (xyz[:, 0] >= xmin)
        & (xyz[:, 0] <= xmax)
        & (xyz[:, 1] >= ymin)
        & (xyz[:, 1] <= ymax)
        & (xyz[:, 2] >= zmin)
        & (xyz[:, 2] <= zmax)
    )


def _expand_bbox(
    bbox: tuple[tuple[float, float, float], tuple[float, float, float]], margin: float
) -> tuple[tuple[float, float, float], tuple[float, float, float]]:
    (xmin, ymin, zmin), (xmax, ymax, zmax) = bbox
    return (
        (xmin - margin, ymin - margin, zmin - margin),
        (xmax + margin, ymax + margin, zmax + margin),
    )


def _hole_fill_plane_patch(
    vertices: np.ndarray,
    stationary_mask: np.ndarray,
    old_object_vertices: np.ndarray,
    hole_bbox: tuple[tuple[float, float, float], tuple[float, float, float]],
    margin: float,
    sample_ratio: float,
) -> np.ndarray:
    if old_object_vertices.shape[0] == 0:
        return np.empty(0, dtype=vertices.dtype)

    xyz = _array_xyz(vertices)
    shell_bbox = _expand_bbox(hole_bbox, margin)
    shell_mask = _in_bbox_xyz(xyz, shell_bbox) & (~_in_bbox_xyz(xyz, hole_bbox))
    shell_mask &= stationary_mask
    shell_points = xyz[shell_mask]
    if shell_points.shape[0] < 64:
        return np.empty(0, dtype=vertices.dtype)

    centroid = shell_points.mean(axis=0)
    centered = shell_points - centroid
    _, _, vh = np.linalg.svd(centered, full_matrices=False)
    normal = vh[-1]
    normal /= max(np.linalg.norm(normal), 1e-8)

    n_old = int(old_object_vertices.shape[0])
    n_fill = max(256, int(n_old * max(0.05, min(sample_ratio, 1.0))))
    n_fill = min(n_fill, n_old)
    rng = np.random.default_rng(0)
    pick = rng.choice(n_old, size=n_fill, replace=False)

    old_xyz = _array_xyz(old_object_vertices)
    sample_xyz = old_xyz[pick]
    distances = np.dot(sample_xyz - centroid, normal)
    proj_xyz = sample_xyz - distances[:, None] * normal[None, :]

    fill = np.zeros(n_fill, dtype=vertices.dtype)
    fill["x"] = proj_xyz[:, 0]
    fill["y"] = proj_xyz[:, 1]
    fill["z"] = proj_xyz[:, 2]

    cfields = _color_fields(vertices)
    if cfields is not None:
        cr, cg, cb = cfields
        shell_color = np.stack(
            (
                vertices[cr][shell_mask],
                vertices[cg][shell_mask],
                vertices[cb][shell_mask],
            ),
            axis=1,
        )
        med = np.median(shell_color, axis=0).astype(np.uint8)
        fill[cr] = med[0]
        fill[cg] = med[1]
        fill[cb] = med[2]

    return fill


def _destination_to_xy(
    room_bounds: tuple[tuple[float, float, float], tuple[float, float, float]],
    destination: str,
) -> tuple[float, float]:
    (min_x, min_y, _), (max_x, max_y, _) = room_bounds
    cx = (min_x + max_x) / 2.0
    cy = (min_y + max_y) / 2.0
    margin_x = max((max_x - min_x) * 0.12, 0.4)
    margin_y = max((max_y - min_y) * 0.12, 0.4)
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


def move_bbox_with_prompt(
    input_path: str | Path,
    select_bbox: tuple[tuple[float, float, float], tuple[float, float, float]],
    prompt: str,
    anchor_bbox: tuple[tuple[float, float, float], tuple[float, float, float]] | None,
    out_path: str | Path,
    hole_fill: bool = False,
    hole_fill_margin: float = 0.2,
    hole_fill_ratio: float = 0.35,
) -> tuple[Path, int, tuple[float, float, float]]:
    commands = parse_prompt(prompt)
    if len(commands) != 1 or commands[0].op != "move":
        raise ValueError("This command currently supports move prompts only.")
    cmd_args = commands[0].args

    pc = load_pointcloud_ply(input_path)
    mask = pc.select_bbox(select_bbox[0], select_bbox[1])
    if int(mask.sum()) == 0:
        raise ValueError("Selection bbox contains zero points.")
    old_selected = pc.vertices[mask].copy()

    sx = float(pc.vertices["x"][mask].mean())
    sy = float(pc.vertices["y"][mask].mean())
    if cmd_args.get("relation") == "near":
        if anchor_bbox is None:
            raise ValueError(
                "Prompt uses 'near <anchor>' but no --anchor-bbox was provided."
            )
        anchor_mask = pc.select_bbox(anchor_bbox[0], anchor_bbox[1])
        if int(anchor_mask.sum()) == 0:
            raise ValueError("Anchor bbox contains zero points.")
        ax = float(pc.vertices["x"][anchor_mask].mean())
        ay = float(pc.vertices["y"][anchor_mask].mean())
        room_bounds = pc.bounds()
        (min_x, min_y, _), (max_x, max_y, _) = room_bounds
        span = max(max_x - min_x, max_y - min_y)
        offset = max(span * 0.06, 0.18)
        dx = (ax + offset) - sx
        dy = ay - sy
    else:
        destination = cmd_args["destination"]
        room_bounds = pc.bounds()
        tx, ty = _destination_to_xy(room_bounds, destination)
        dx = tx - sx
        dy = ty - sy

    dz = 0.0
    moved_count = pc.translate_mask(mask, dx=dx, dy=dy, dz=dz)

    if hole_fill:
        stationary_mask = ~mask
        fill = _hole_fill_plane_patch(
            vertices=pc.vertices,
            stationary_mask=stationary_mask,
            old_object_vertices=old_selected,
            hole_bbox=select_bbox,
            margin=hole_fill_margin,
            sample_ratio=hole_fill_ratio,
        )
        if fill.shape[0] > 0:
            pc.vertices = np.concatenate([pc.vertices, fill], axis=0)

    out = save_pointcloud_ply(pc, out_path)
    return out, moved_count, (dx, dy, dz)


def _canon_label(value: str) -> str:
    label = value.strip().lower()
    label = " ".join(label.split())
    if label.startswith("the "):
        label = label[4:].strip()
    if label.endswith("s") and len(label) > 1:
        label = label[:-1]
    return label


def load_label_bboxes(
    path: str | Path,
) -> dict[str, tuple[tuple[float, float, float], tuple[float, float, float]]]:
    p = Path(path).expanduser().resolve()
    if not p.exists():
        return {}
    raw = json.loads(p.read_text())
    labels = raw.get("labels", {})
    out: dict[str, tuple[tuple[float, float, float], tuple[float, float, float]]] = {}
    for key, meta in labels.items():
        if isinstance(meta, dict) and "bbox" in meta:
            out[_canon_label(key)] = parse_bbox_list(meta["bbox"])
    return out


def save_label_bboxes(
    path: str | Path,
    labels: dict[str, tuple[tuple[float, float, float], tuple[float, float, float]]],
) -> Path:
    p = Path(path).expanduser().resolve()
    p.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "labels": {
            name: {"bbox": format_bbox(bbox), "source": "manual_or_sam"}
            for name, bbox in sorted(labels.items())
        }
    }
    p.write_text(json.dumps(payload, indent=2) + "\n")
    return p


def set_label_bbox(
    path: str | Path,
    name: str,
    bbox: tuple[tuple[float, float, float], tuple[float, float, float]],
) -> Path:
    labels = load_label_bboxes(path)
    labels[_canon_label(name)] = bbox
    return save_label_bboxes(path, labels)


def move_labeled_with_prompt(
    input_path: str | Path,
    labels_path: str | Path,
    prompt: str,
    out_path: str | Path,
    hole_fill: bool = False,
    hole_fill_margin: float = 0.2,
    hole_fill_ratio: float = 0.35,
) -> tuple[Path, int, tuple[float, float, float]]:
    labels = load_label_bboxes(labels_path)
    if not labels:
        raise ValueError(
            f"No labels found in {Path(labels_path).expanduser().resolve()}. "
            "Use pc-label-set first."
        )

    commands = parse_prompt(prompt)
    if len(commands) != 1 or commands[0].op != "move":
        raise ValueError("This command currently supports move prompts only.")

    cmd = commands[0]
    target = _canon_label(cmd.args.get("target", ""))
    if not target:
        raise ValueError("Prompt did not contain a target object.")
    if target not in labels:
        raise ValueError(f"Target '{target}' not found in labels file.")

    target_bbox = labels[target]
    anchor_bbox = None
    if cmd.args.get("relation") == "near":
        anchor = _canon_label(cmd.args.get("anchor", ""))
        if not anchor:
            raise ValueError("Prompt relation near requires an anchor object.")
        if anchor not in labels:
            raise ValueError(f"Anchor '{anchor}' not found in labels file.")
        anchor_bbox = labels[anchor]

    return move_bbox_with_prompt(
        input_path=input_path,
        select_bbox=target_bbox,
        prompt=prompt,
        anchor_bbox=anchor_bbox,
        out_path=out_path,
        hole_fill=hole_fill,
        hole_fill_margin=hole_fill_margin,
        hole_fill_ratio=hole_fill_ratio,
    )


def move_bbox_with_translation(
    input_path: str | Path,
    select_bbox: tuple[tuple[float, float, float], tuple[float, float, float]],
    translate: tuple[float, float, float],
    out_path: str | Path,
    hole_fill: bool = False,
    hole_fill_margin: float = 0.2,
    hole_fill_ratio: float = 0.35,
) -> tuple[Path, int]:
    pc = load_pointcloud_ply(input_path)
    mask = pc.select_bbox(select_bbox[0], select_bbox[1])
    old_selected = pc.vertices[mask].copy()
    moved_count = pc.translate_mask(mask, dx=translate[0], dy=translate[1], dz=translate[2])

    if hole_fill:
        stationary_mask = ~mask
        fill = _hole_fill_plane_patch(
            vertices=pc.vertices,
            stationary_mask=stationary_mask,
            old_object_vertices=old_selected,
            hole_bbox=select_bbox,
            margin=hole_fill_margin,
            sample_ratio=hole_fill_ratio,
        )
        if fill.shape[0] > 0:
            pc.vertices = np.concatenate([pc.vertices, fill], axis=0)

    out = save_pointcloud_ply(pc, out_path)
    return out, moved_count


def bounds_for_path(path: str | Path) -> tuple[int, tuple[tuple[float, float, float], tuple[float, float, float]]]:
    pc = load_pointcloud_ply(path)
    return pc.count, pc.bounds()


def _safe_label_filename(label: str) -> str:
    text = _canon_label(label).replace(" ", "_")
    text = re.sub(r"[^a-z0-9_\-]", "", text)
    return text or "object"


def extract_objects_from_labels(
    input_path: str | Path,
    labels_path: str | Path,
    out_dir: str | Path,
    names: list[str] | None = None,
    expand: float = 0.0,
    min_points: int = 128,
) -> tuple[Path, list[dict[str, object]], list[dict[str, object]]]:
    labels = load_label_bboxes(labels_path)
    if not labels:
        raise ValueError(
            f"No labels found in {Path(labels_path).expanduser().resolve()}. "
            "Run sam-auto-label or pc-label-set first."
        )

    if names:
        wanted = {_canon_label(v) for v in names if _canon_label(v)}
        labels = {k: v for k, v in labels.items() if k in wanted}
        if not labels:
            raise ValueError("None of the requested object names were found in labels.")

    pc = load_pointcloud_ply(input_path)
    out_root = Path(out_dir).expanduser().resolve()
    out_root.mkdir(parents=True, exist_ok=True)

    extracted: list[dict[str, object]] = []
    skipped: list[dict[str, object]] = []
    for label, bbox in sorted(labels.items()):
        use_bbox = _expand_bbox(bbox, expand) if expand > 0 else bbox
        mask = pc.select_bbox(use_bbox[0], use_bbox[1])
        count = int(mask.sum())
        if count < max(1, int(min_points)):
            skipped.append(
                {
                    "label": label,
                    "reason": f"too_few_points ({count} < {min_points})",
                }
            )
            continue

        obj_vertices = pc.vertices[mask].copy()
        obj_pc = PointCloudPLY(header=pc.header, vertices=obj_vertices)
        obj_path = out_root / f"{_safe_label_filename(label)}.ply"
        save_pointcloud_ply(obj_pc, obj_path)
        bounds = obj_pc.bounds()
        center = (
            (bounds[0][0] + bounds[1][0]) / 2.0,
            (bounds[0][1] + bounds[1][1]) / 2.0,
            (bounds[0][2] + bounds[1][2]) / 2.0,
        )
        extracted.append(
            {
                "label": label,
                "path": str(obj_path),
                "point_count": count,
                "bbox": format_bbox(bounds),
                "center": [float(center[0]), float(center[1]), float(center[2])],
            }
        )

    manifest = {
        "input_ply": str(Path(input_path).expanduser().resolve()),
        "labels_path": str(Path(labels_path).expanduser().resolve()),
        "objects": extracted,
        "skipped": skipped,
        "expand": float(expand),
        "min_points": int(min_points),
    }
    manifest_path = out_root / "objects.manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest_path, extracted, skipped
