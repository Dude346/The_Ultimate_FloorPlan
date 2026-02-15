from __future__ import annotations

from dataclasses import dataclass

from .nl_to_edit import EditCommand
from .scene_schema import Scene, SceneObject, find_objects


@dataclass
class AppliedEdit:
    op: str
    description: str


def _center_xy(scene: Scene) -> tuple[float, float]:
    min_x, min_y, _ = scene.room_bounds.min_xyz
    max_x, max_y, _ = scene.room_bounds.max_xyz
    return ((min_x + max_x) / 2.0, (min_y + max_y) / 2.0)


def _destination_to_xy(scene: Scene, destination: str) -> tuple[float, float]:
    min_x, min_y, _ = scene.room_bounds.min_xyz
    max_x, max_y, _ = scene.room_bounds.max_xyz
    cx, cy = _center_xy(scene)
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


def _resolve_single(scene: Scene, ref: str) -> SceneObject:
    matches = find_objects(scene, ref)
    if not matches:
        raise ValueError(f"No object matched '{ref}'")
    if len(matches) > 1:
        matched_ids = ", ".join(obj.object_id for obj in matches)
        raise ValueError(
            f"Reference '{ref}' matched multiple objects: {matched_ids}. Use object id."
        )
    return matches[0]


def _label_variants(label: str) -> set[str]:
    raw = label.lower().strip()
    out = {raw}
    if raw.endswith("s") and len(raw) > 1:
        out.add(raw[:-1])
    else:
        out.add(raw + "s")
    return out


def _ensure_floor(scene: Scene, obj: SceneObject) -> None:
    x, y, _ = obj.position
    obj.position = (x, y, scene.room_bounds.floor_z)


def apply_command(scene: Scene, command: EditCommand) -> AppliedEdit:
    if command.op == "move":
        target = _resolve_single(scene, command.args["target"])
        x, y = _destination_to_xy(scene, command.args["destination"])
        _, _, z = target.position
        target.position = (x, y, z)
        _ensure_floor(scene, target)
        return AppliedEdit(
            op="move",
            description=f"Moved {target.object_id} to {command.args['destination']}.",
        )

    if command.op == "swap_two":
        label = command.args["label"]
        variants = _label_variants(label)
        matches = [obj for obj in scene.objects if obj.label.lower() in variants]
        if len(matches) != 2:
            raise ValueError(
                f"Expected exactly two '{label}' objects, found {len(matches)}. "
                "Use explicit object ids with 'swap A and B'."
            )
        a, b = matches[0], matches[1]
        a.position, b.position = b.position, a.position
        a.rotation_deg, b.rotation_deg = b.rotation_deg, a.rotation_deg
        return AppliedEdit(op="swap_two", description=f"Swapped the two {label} objects.")

    if command.op == "swap":
        a = _resolve_single(scene, command.args["a"])
        b = _resolve_single(scene, command.args["b"])
        a.position, b.position = b.position, a.position
        a.rotation_deg, b.rotation_deg = b.rotation_deg, a.rotation_deg
        return AppliedEdit(op="swap", description=f"Swapped {a.object_id} and {b.object_id}.")

    if command.op == "replace":
        target = _resolve_single(scene, command.args["target"])
        old_label = target.label
        target.label = command.args["new_label"]
        return AppliedEdit(
            op="replace",
            description=f"Replaced {target.object_id} label '{old_label}' with '{target.label}'.",
        )

    if command.op == "remodel":
        return AppliedEdit(
            op="remodel",
            description=(
                "Captured remodel request for planning: "
                f"'{command.args['style_prompt']}'. "
                "MVP does not auto-generate multi-step layouts yet."
            ),
        )

    raise ValueError(f"Unsupported op '{command.op}'")


def apply_commands(scene: Scene, commands: list[EditCommand]) -> list[AppliedEdit]:
    return [apply_command(scene, command) for command in commands]
