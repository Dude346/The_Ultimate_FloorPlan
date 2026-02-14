from .nerfstudio import run_nerfstudio, main as preprocess_main
from .uploader import upload_video, main as upload_main
from .base import app

__all__ = ["run_nerfstudio", "upload_video"]


def main():
    """CLI entrypoint for the floorplan package.

    Usage examples:
      python -m floorplan upload tests/x.mp4
      python -m floorplan preprocess x.mp4

    Behavior:
      - upload: uploads a local MP4 into the volume at videos/<basename>
      - preprocess: invokes nerfstudio in Modal on a file already present in the volume under videos/.
        Pass a bare filename (e.g. "x.mp4") and the function will look for videos/x.mp4 inside the volume.
    """
    import sys

    if len(sys.argv) < 2:
        print("Usage: python -m floorplan {upload|preprocess} ...")
        sys.exit(1)

    cmd = sys.argv[1]
    # Remove the subcommand from sys.argv so submodule parsers work correctly
    sys.argv = [sys.argv[0]] + sys.argv[2:]

    if cmd == "upload":
        upload_main()
    elif cmd == "preprocess":
        preprocess_main()
    else:
        print(f"Unknown command: {cmd}")
        print("Usage: python -m floorplan {upload|preprocess} ...")
        sys.exit(1)
