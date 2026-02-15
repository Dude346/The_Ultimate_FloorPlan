from __future__ import annotations

from dataclasses import dataclass
import re


@dataclass
class EditCommand:
    op: str
    args: dict[str, str]


def _clean(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def parse_prompt(prompt: str) -> list[EditCommand]:
    text = _clean(prompt)
    if not text:
        raise ValueError("Prompt is empty")

    if text.startswith("remodel"):
        return [EditCommand(op="remodel", args={"style_prompt": prompt.strip()})]

    move_near_m = re.search(
        r"\bmove\s+(?:the\s+)?(?P<target>[a-z0-9_\- ]+?)\s+near\s+(?:the\s+)?(?P<anchor>[a-z0-9_\- ]+)\b",
        text,
    )
    if move_near_m:
        target = move_near_m.group("target").strip()
        anchor = move_near_m.group("anchor").strip()
        return [
            EditCommand(
                op="move",
                args={"target": target, "relation": "near", "anchor": anchor},
            )
        ]

    move_closer_m = re.search(
        r"\bmove\s+(?:the\s+)?(?P<target>[a-z0-9_\- ]+?)\s+closer\s+to\s+(?:the\s+)?(?P<anchor>[a-z0-9_\- ]+)\b",
        text,
    )
    if move_closer_m:
        target = move_closer_m.group("target").strip()
        anchor = move_closer_m.group("anchor").strip()
        return [
            EditCommand(
                op="move",
                args={"target": target, "relation": "near", "anchor": anchor},
            )
        ]

    move_m = re.search(
        r"\bmove\s+(?:the\s+)?(?P<target>[a-z0-9_\- ]+?)\s+to\s+(?:the\s+)?(?P<dest>[a-z0-9_\- ]+)\b",
        text,
    )
    if move_m:
        target = move_m.group("target").strip()
        destination = move_m.group("dest").strip()
        return [EditCommand(op="move", args={"target": target, "destination": destination})]

    swap_two_m = re.search(r"\bswap\s+(?:the\s+)?two\s+(?P<label>[a-z0-9_\- ]+)\b", text)
    if swap_two_m:
        label = swap_two_m.group("label").strip()
        return [EditCommand(op="swap_two", args={"label": label})]

    swap_named_m = re.search(
        r"\bswap\s+(?:the\s+)?(?P<a>[a-z0-9_\- ]+?)\s+(?:and|with)\s+(?:the\s+)?(?P<b>[a-z0-9_\- ]+)\b",
        text,
    )
    if swap_named_m:
        return [
            EditCommand(
                op="swap",
                args={"a": swap_named_m.group("a").strip(), "b": swap_named_m.group("b").strip()},
            )
        ]

    replace_m = re.search(
        r"\b(?:replace|swap out)\s+(?:the\s+)?(?P<target>[a-z0-9_\- ]+?)\s+with\s+(?:a\s+|an\s+|the\s+)?(?P<new_label>[a-z0-9_\- ]+)\b",
        text,
    )
    if replace_m:
        return [
            EditCommand(
                op="replace",
                args={
                    "target": replace_m.group("target").strip(),
                    "new_label": replace_m.group("new_label").strip(),
                },
            )
        ]

    raise ValueError(
        "Could not parse prompt. Supported patterns include: "
        "'move the chair to the back', 'move the toilet near the door', 'swap the two paintings', "
        "'replace the chair with a couch', 'remodel my room'."
    )
