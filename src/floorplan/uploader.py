"""Helper utilities for uploading local MP4 files and invoking the Modal function.

This helper suggests using nerfstudio's `ns-process-data` CLI to convert an MP4 into a nerfstudio
dataset (so it can be trained with `ns-train`). It also shows how to run the same steps inside
Modal by ensuring the runtime image has nerfstudio installed.
"""

from pathlib import Path

try:
    import modal
except Exception:
    modal = None  # Optional: only required when interacting with Modal programmatically


def upload_video(local_mp4_path: str, remote_dir: str = "videos") -> str:
    """Upload a local MP4 file into the shared Modal Volume.

    The file will be uploaded to <remote_dir>/<filename> inside the volume and will be
    available to other Modal functions (for example the nerfstudio processor) at
    /root/volume/<remote_dir>/<filename> when the volume is mounted there.

    Returns the remote path inside the volume (relative to the volume root).
    """
    p = Path(local_mp4_path).expanduser().resolve()
    if not p.exists():
        raise FileNotFoundError(p)

    try:
        import modal
    except Exception as exc:
        raise RuntimeError(
            "Modal SDK is required to upload videos. Please `pip install modal`."
        ) from exc

    # Import the shared volume from base (base imports modal, so do this after modal is available)
    from .base import vol

    remote_path = f"{remote_dir.rstrip('/')}/{p.name}"

    # Use the batch upload context manager which will efficiently upload the file to the volume
    with vol.batch_upload() as batch:
        batch.put_file(p, remote_path)

    return remote_path


def main():
    """CLI entrypoint for uploading videos.

    Usage: python -m floorplan.uploader tests/x.mp4
    """
    import argparse

    parser = argparse.ArgumentParser(prog="floorplan-upload")
    parser.add_argument("mp4_path", help="Local path to MP4")

    args = parser.parse_args()

    remote = upload_video(args.mp4_path)
    print(remote)
    print(f"Container path: /root/volume/{remote}")
