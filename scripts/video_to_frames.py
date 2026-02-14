import cv2
import os
from pathlib import Path


def video_to_frames_opencv(
    video_path: str,
    fps: float = 2.0,
    max_width: int = 1280,
    overwrite: bool = False,
):
    video_path = Path(video_path).resolve()

    if not video_path.exists():
        raise FileNotFoundError(f"Video not found: {video_path}")

    output_dir = video_path.parent / video_path.stem
    output_dir.mkdir(parents=True, exist_ok=True)

    if any(output_dir.iterdir()) and not overwrite:
        print(f"Directory {output_dir} already contains files. Skipping extraction.")
        return output_dir

    cap = cv2.VideoCapture(str(video_path))

    if not cap.isOpened():
        raise RuntimeError("Could not open video file")

    original_fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(round(original_fps / fps))

    frame_count = 0
    saved_count = 0

    print(f"Original FPS: {original_fps}")
    print(f"Extracting ~{fps} FPS")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_interval == 0:
            # Resize while keeping aspect ratio
            h, w = frame.shape[:2]
            if w > max_width:
                scale = max_width / w
                frame = cv2.resize(frame, (int(w * scale), int(h * scale)))

            output_path = output_dir / f"frame_{saved_count:06d}.jpg"
            cv2.imwrite(str(output_path), frame, [cv2.IMWRITE_JPEG_QUALITY, 95])
            saved_count += 1

        frame_count += 1

    cap.release()
    print(f"Saved {saved_count} frames to {output_dir}")

    return output_dir

video_to_frames_opencv("IMG_5754.mov", fps=2, max_width=1280)
