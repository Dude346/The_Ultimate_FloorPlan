from .nerfstudio import preprocess, splat
from .upload import upload_video
from .base import app, VIDEOS_PATH, PREPROCESS_PATH, SPLAT_PATH


def main():
    """CLI entrypoint for the floorplan package.

    Usage examples:
      python -m floorplan upload tests/x.mp4
      python -m floorplan preprocess abcdef
      python -m floorplan splat abcdef

    Behavior:
      - upload: uploads a local MP4 into the volume at videos/<generated_id>.mp4
      - preprocess: invokes nerfstudio in Modal on file identified by the generated id.
      - splat: runs nerfstudio's splatflow (splatfacto + export) on a preprocessed id.
    """
    import sys
    import argparse
    import modal

    if len(sys.argv) < 2:
        print("Usage: python -m floorplan {upload|preprocess|splat} ...")
        sys.exit(1)

    cmd = sys.argv[1]
    args_list = sys.argv[2:]

    if cmd == "upload":
        parser = argparse.ArgumentParser(prog="floorplan-upload")
        parser.add_argument("mp4_path", help="Local path to MP4")
        parsed = parser.parse_args(args_list)
        video_id = upload_video(parsed.mp4_path)
        print(video_id)
        print(f"Container path: {VIDEOS_PATH}/{video_id}.mp4")
    elif cmd == "preprocess":
        parser = argparse.ArgumentParser(prog="floorplan-preprocess")
        parser.add_argument(
            "video_id", help="Six-letter video id to preprocess (stored in videos/)"
        )
        parsed = parser.parse_args(args_list)
        video_id = parsed.video_id.lstrip("/")
        print(
            f"Triggering nerfstudio for volume path: {VIDEOS_PATH}/{video_id}.mp4 (call passes '{video_id}')"
        )
        modal.enable_output()
        with app.run():
            result = preprocess.remote(video_id)
        print("nerfstudio result:", result)
    elif cmd == "splat":
        parser = argparse.ArgumentParser(prog="floorplan-splat")
        parser.add_argument(
            "video_id",
            help="Six-letter video id to run splat on (same id used for preprocess)",
        )
        parsed = parser.parse_args(args_list)
        video_id = parsed.video_id.lstrip("/")
        print(
            f"Triggering nerfstudio splat for preprocess path: {PREPROCESS_PATH}/{video_id} (splat outputs will go to {SPLAT_PATH}/{video_id})"
        )
        modal.enable_output()
        with app.run():
            result = splat.remote(video_id)
        print("nerfstudio splat result:", result)
    else:
        print(f"Unknown command: {cmd}")
        print("Usage: python -m floorplan {upload|preprocess|splat} ...")
        sys.exit(1)
