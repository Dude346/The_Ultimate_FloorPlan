"""
Nerfstudio-specific Modal functions
for processing MP4 files using the nerfstudio CLI (ns-process-data).

This replaces direct ffmpeg frame extraction with the `ns-process-data` command
so nerfstudio handles the video-to-dataset conversion.
"""

import subprocess
from pathlib import Path

from .base import app, image, vol


@app.function(image=image, timeout=3600, volumes={"/root/volume": vol}, gpu="T4")
def run_nerfstudio(mp4_path: str, output_dir: str = "/root/volume/out") -> dict:
    """Process an MP4 with nerfstudio's `ns-process-data` CLI.

    This will invoke `ns-process-data video --data <mp4> --output-dir <output_dir>/ns_dataset`.

    Args:
        mp4_path: path to the MP4 file inside the container (must be on the mounted volume), or a filename relative to the volume root.
        output_dir: directory inside the container where outputs will be written (defaults to a folder on the volume).

    Returns:
        dict with the processed dataset directory and the chosen output_dir.
    """
    vol_root = Path("/root/volume")
    mp4_p = Path(mp4_path)
    if not mp4_p.is_absolute():
        # If a bare filename is provided (no parent directories), default to videos/<name> inside the volume.
        if len(mp4_p.parts) == 1:
            mp4_p = vol_root / "videos" / mp4_p
        else:
            mp4_p = vol_root / mp4_p

    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    processed_dir = out_dir / "ns_dataset"
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

    return {"processed_dir": str(processed_dir), "output_dir": str(out_dir)}


def main():
    """CLI entrypoint for preprocessing videos with nerfstudio.

    Usage: python -m floorplan.nerfstudio x.mp4

    Assumes the file already exists in the volume under videos/.
    Pass a bare filename (e.g. "x.mp4") and the function will look for videos/x.mp4.
    """
    import argparse
    import modal

    modal.enable_output()

    parser = argparse.ArgumentParser(prog="floorplan-preprocess")
    parser.add_argument(
        "mp4_path",
        help="Bare filename or path to MP4 (bare filename will be looked up in videos/)",
    )

    args = parser.parse_args()

    # Do NOT upload; assume the caller has already uploaded the file into videos/
    remote = args.mp4_path.lstrip("/")
    print(
        f"Triggering nerfstudio for volume path: videos/{remote} (call passes '{remote}')"
    )

    with app.run():
        result = run_nerfstudio.remote(remote)

    print("nerfstudio result:", result)
