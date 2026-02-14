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
    vol,
    VOLUME_PATH,
    VIDEOS_PATH,
    PREPROCESS_PATH,
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
        "--colmap-cmd",
        "xvfb-run -a -s '-screen 0 1024x768x24 +extension GLX' colmap",
    ]

    # Run ns-process-data which will call COLMAP (and system ffmpeg if needed) to
    # convert the video into a nerfstudio dataset compatible with ns-train.
    subprocess.check_call(cmd)

    # Persist changes to the volume so other functions can see the output
    vol.commit()

    return {"processed_dir": str(processed_dir), "video_id": video_id}


# CLI entrypoint consolidated into floorplan.__init__.main()
