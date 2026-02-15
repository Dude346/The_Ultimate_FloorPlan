from __future__ import annotations

from dataclasses import dataclass, field
import json
from pathlib import Path
from typing import Any


def _vec3(value: Any, default: tuple[float, float, float]) -> tuple[float, float, float]:
    if not isinstance(value, list) or len(value) != 3:
        return default
    return (float(value[0]), float(value[1]), float(value[2]))


@dataclass
class SceneObject:
    object_id: str
    label: str
    asset_path: str | None = None
    position: tuple[float, float, float] = (0.0, 0.0, 0.0)
    rotation_deg: tuple[float, float, float] = (0.0, 0.0, 0.0)
    scale: tuple[float, float, float] = (1.0, 1.0, 1.0)
    bbox_size: tuple[float, float, float] | None = None
    tags: list[str] = field(default_factory=list)

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "SceneObject":
        return cls(
            object_id=str(raw["id"]),
            label=str(raw["label"]),
            asset_path=raw.get("asset_path"),
            position=_vec3(raw.get("position"), (0.0, 0.0, 0.0)),
            rotation_deg=_vec3(raw.get("rotation_deg"), (0.0, 0.0, 0.0)),
            scale=_vec3(raw.get("scale"), (1.0, 1.0, 1.0)),
            bbox_size=_vec3(raw["bbox_size"], (1.0, 1.0, 1.0))
            if "bbox_size" in raw
            else None,
            tags=[str(v) for v in raw.get("tags", [])],
        )

    def to_dict(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "id": self.object_id,
            "label": self.label,
            "position": list(self.position),
            "rotation_deg": list(self.rotation_deg),
            "scale": list(self.scale),
        }
        if self.asset_path is not None:
            out["asset_path"] = self.asset_path
        if self.bbox_size is not None:
            out["bbox_size"] = list(self.bbox_size)
        if self.tags:
            out["tags"] = self.tags
        return out


@dataclass
class RoomBounds:
    min_xyz: tuple[float, float, float] = (-4.0, -4.0, 0.0)
    max_xyz: tuple[float, float, float] = (4.0, 4.0, 3.0)
    floor_z: float = 0.0

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "RoomBounds":
        return cls(
            min_xyz=_vec3(raw.get("min_xyz"), (-4.0, -4.0, 0.0)),
            max_xyz=_vec3(raw.get("max_xyz"), (4.0, 4.0, 3.0)),
            floor_z=float(raw.get("floor_z", 0.0)),
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "min_xyz": list(self.min_xyz),
            "max_xyz": list(self.max_xyz),
            "floor_z": self.floor_z,
        }


@dataclass
class Scene:
    room_bounds: RoomBounds = field(default_factory=RoomBounds)
    objects: list[SceneObject] = field(default_factory=list)

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "Scene":
        room_bounds = RoomBounds.from_dict(raw.get("room_bounds", {}))
        objects = [SceneObject.from_dict(v) for v in raw.get("objects", [])]
        return cls(room_bounds=room_bounds, objects=objects)

    def to_dict(self) -> dict[str, Any]:
        return {
            "room_bounds": self.room_bounds.to_dict(),
            "objects": [obj.to_dict() for obj in self.objects],
        }


def load_scene(path: str | Path) -> Scene:
    p = Path(path).expanduser().resolve()
    data = json.loads(p.read_text())
    return Scene.from_dict(data)


def save_scene(scene: Scene, path: str | Path) -> Path:
    p = Path(path).expanduser().resolve()
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(scene.to_dict(), indent=2) + "\n")
    return p


def find_objects(scene: Scene, ref: str) -> list[SceneObject]:
    ref_l = ref.strip().lower()
    out: list[SceneObject] = []
    for obj in scene.objects:
        if obj.object_id.lower() == ref_l or obj.label.lower() == ref_l:
            out.append(obj)
    return out

