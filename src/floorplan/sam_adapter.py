from __future__ import annotations

import importlib.util


def sam_runtime_status() -> tuple[bool, dict[str, bool]]:
    required = {
        "torch": bool(importlib.util.find_spec("torch")),
        "transformers": bool(importlib.util.find_spec("transformers")),
        "PIL": bool(importlib.util.find_spec("PIL")),
    }
    ready = all(required.values())
    return ready, required


def ensure_sam_runtime() -> None:
    ready, required = sam_runtime_status()
    if ready:
        return
    missing = [name for name, ok in required.items() if not ok]
    raise RuntimeError(
        "SAM runtime dependencies are not installed. Missing: "
        + ", ".join(missing)
        + ". Install these in the runtime where you plan to run object grounding."
    )

