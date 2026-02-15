from __future__ import annotations

import modal

image = (
    modal.Image.debian_slim(python_version="3.12").pip_install_from_requirements(
        "requirements.txt"
    )
)

app = modal.App("floorplan-mesh-api", image=image)


@app.function(timeout=60 * 20)
@modal.asgi_app()
def fastapi_app():
    from app import app as web_app

    return web_app
