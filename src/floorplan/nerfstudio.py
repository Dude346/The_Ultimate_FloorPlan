"""
Nerfstudio-specific Modal functions
for processing MP4 files using the nerfstudio CLI (ns-process-data).

This replaces direct ffmpeg frame extraction with the `ns-process-data` command
so nerfstudio handles the video-to-dataset conversion.
"""

import subprocess

from .base import (
    app,
    preprocess_image,
    splat_image,
    vol,
    VOLUME_PATH,
    VIDEOS_PATH,
    PREPROCESS_PATH,
    SPLAT_PATH,
    GPU,
)


@app.function(
    image=preprocess_image, timeout=3600, volumes={str(VOLUME_PATH): vol}, gpu=GPU
)
def preprocess(video_id: str) -> dict:
    """Process a video (by generated ID) with nerfstudio's `ns-process-data` CLI.

    The function expects the video to be stored at <VOLUME_PATH>/videos/<video_id>.mp4
    and will write outputs to <VOLUME_PATH>/preprocess/<video_id>.
    """
    mp4_p = VIDEOS_PATH / f"{video_id}.mp4"
    if not mp4_p.exists():
        raise FileNotFoundError(f"Expected video at {mp4_p}")

    processed_dir = PREPROCESS_PATH / video_id
    processed_dir.mkdir(parents=True, exist_ok=True)

    cmd = [
        "ns-process-data",
        "video",
        "--data",
        str(mp4_p),
        "--output-dir",
        str(processed_dir),
    ]
    subprocess.check_call(cmd)
    vol.commit()

    return {"processed_dir": str(processed_dir), "video_id": video_id}


def get_only_subdir(path):
    subdir = next(p for p in path.iterdir() if p.is_dir())
    if subdir is None:
        raise RuntimeError

    return subdir


@app.function(image=splat_image, timeout=3600, volumes={str(VOLUME_PATH): vol}, gpu=GPU)
def splat(video_id: str) -> dict:
    """Run nerfstudio's splatfacto training and export a PLY.

    This runs `ns-train splatfacto` on the processed dataset produced by `preprocess`
    and then runs `ns-export gaussian-splat` to write a .ply into the SPLAT_PATH.
    """
    processed_dir = PREPROCESS_PATH / video_id
    if not processed_dir.exists():
        raise FileNotFoundError(f"Expected preprocessed data at {processed_dir}")

    splat_dir = SPLAT_PATH / video_id
    splat_dir.mkdir(parents=True, exist_ok=True)

    print("Training")
    train_cmd = [
        "ns-train",
        "splatfacto",
        "--data",
        str(processed_dir),
        "--output-dir",
        str(splat_dir),
        "--viewer.quit-on-train-completion",
        "True",
    ]
    subprocess.check_call(train_cmd)
    vol.commit()

    # The output files
    # will be stored in <splat_dir>/splatfacto/<experiment-name>/<timestamp>/.
    config_path = (
        get_only_subdir(get_only_subdir(get_only_subdir(splat_dir))) / "config.yml"
    )
    if not config_path.exists():
        raise FileNotFoundError("Expected config file")

    print("Exporting")
    export_cmd = [
        "ns-export",
        "gaussian-splat",
        "--load-config",
        str(config_path),
        "--output-dir",
        str(splat_dir),
    ]
    subprocess.check_call(export_cmd)
    vol.commit()

    ply_path = splat_dir / "splat.ply"
    return {"splat_dir": str(splat_dir), "ply": str(ply_path), "video_id": video_id}
