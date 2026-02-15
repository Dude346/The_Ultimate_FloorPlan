from __future__ import annotations

import re
import subprocess
import tempfile
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, Field


def _slugify(text: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "_", text.strip().lower()).strip("_")
    return slug or "asset"


class GenerateRequest(BaseModel):
    prompt: str = Field(min_length=1)
    guidance_scale: float = 18.0
    karras_steps: int = 96


app = FastAPI(title="Floorplan Mesh API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT_PATH = REPO_ROOT / "scripts" / "generate_3d_asset" / "modal_shape_e_generate.py"


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/generate-ply")
def generate_ply(payload: GenerateRequest) -> Response:
    if not SCRIPT_PATH.exists():
        raise HTTPException(status_code=500, detail=f"Script not found: {SCRIPT_PATH}")

    slug = _slugify(payload.prompt)
    with tempfile.TemporaryDirectory(prefix="mesh_gen_") as tmp_dir:
        output_path = Path(tmp_dir) / f"{slug}.ply"
        cmd = [
            "uv",
            "run",
            "modal",
            "run",
            str(SCRIPT_PATH),
            "--prompt",
            payload.prompt,
            "--output-path",
            str(output_path),
            "--guidance-scale",
            str(payload.guidance_scale),
            "--karras-steps",
            str(payload.karras_steps),
        ]
        try:
            subprocess.run(cmd, check=True, cwd=str(REPO_ROOT))
        except subprocess.CalledProcessError as exc:
            raise HTTPException(status_code=500, detail=f"Modal generation failed: {exc}") from exc

        if not output_path.exists():
            raise HTTPException(status_code=500, detail="Modal run completed but no PLY was produced.")

        data = output_path.read_bytes()
        return Response(
            content=data,
            media_type="application/octet-stream",
            headers={"Content-Disposition": f'attachment; filename="{slug}.ply"'},
        )
