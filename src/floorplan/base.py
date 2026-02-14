import modal
from pathlib import Path

app = modal.App("floorplan")

VOLUME_PATH = Path("/volume")
VIDEOS_PATH = VOLUME_PATH / "videos"
PREPROCESS_PATH = VOLUME_PATH / "preprocess"
SPLAT_PATH = VOLUME_PATH / "splat"

GPU = "any"

ns_image = modal.Image.from_registry("ghcr.io/nerfstudio-project/nerfstudio:latest")

vol = modal.Volume.from_name("floorplan-volume", create_if_missing=True)
