"""Helper utilities for uploading local MP4 files and invoking the Modal function.

This helper suggests using nerfstudio's `ns-process-data` CLI to convert an MP4 into a nerfstudio
dataset (so it can be trained with `ns-train`). It also shows how to run the same steps inside
Modal by ensuring the runtime image has nerfstudio installed.
"""

from pathlib import Path
import secrets
import string

from .base import vol, VIDEOS_PATH, VOLUME_PATH


def upload_video(local_mp4_path: str) -> str:
    """Upload a local MP4 file into the shared Modal Volume.

    The file will be uploaded to <remote_dir>/<6-letter-id>.mp4 inside the volume and will be
    available to other Modal functions (for example the nerfstudio processor) at
    /volume/<remote_dir>/<6-letter-id>.mp4 when the volume is mounted there.

    Returns the generated six-letter id for the uploaded video.
    """
    path = Path(local_mp4_path).expanduser().resolve()
    if not path.exists():
        raise FileNotFoundError(path)

    video_id = "".join(secrets.choice(string.ascii_lowercase) for _ in range(6))
    remote_path = VIDEOS_PATH / f"{video_id}.mp4"

    with vol.batch_upload() as batch:
        batch.put_file(path, remote_path.relative_to(VOLUME_PATH))

    return video_id
