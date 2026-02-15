from __future__ import annotations

from pathlib import Path

from .scene_schema import Scene


def render_scene_summary(scene: Scene) -> str:
    lines = []
    min_x, min_y, min_z = scene.room_bounds.min_xyz
    max_x, max_y, max_z = scene.room_bounds.max_xyz
    lines.append("Room bounds:")
    lines.append(f"- min=({min_x:.2f}, {min_y:.2f}, {min_z:.2f})")
    lines.append(f"- max=({max_x:.2f}, {max_y:.2f}, {max_z:.2f})")
    lines.append("")
    lines.append("Objects:")
    for obj in scene.objects:
        x, y, z = obj.position
        rx, ry, rz = obj.rotation_deg
        lines.append(
            f"- {obj.object_id} [{obj.label}] pos=({x:.2f}, {y:.2f}, {z:.2f}) "
            f"rot=({rx:.1f}, {ry:.1f}, {rz:.1f}) asset={obj.asset_path or 'n/a'}"
        )
    return "\n".join(lines) + "\n"


def write_preview(scene: Scene, output_path: str | Path) -> Path:
    out = Path(output_path).expanduser().resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(render_scene_summary(scene))
    return out

