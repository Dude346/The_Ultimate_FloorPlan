from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import cv2


@dataclass
class VideoInfo:
    path: Path
    width: int
    height: int
    fps: float
    frame_count: int

    @property
    def duration_seconds(self) -> float:
        if self.fps <= 0:
            return 0.0
        return self.frame_count / self.fps


def read_video_info(path: str | Path) -> VideoInfo:
    p = Path(path).expanduser().resolve()
    if not p.exists():
        raise FileNotFoundError(p)

    cap = cv2.VideoCapture(str(p))
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video: {p}")
    try:
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = float(cap.get(cv2.CAP_PROP_FPS))
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    finally:
        cap.release()

    return VideoInfo(
        path=p, width=width, height=height, fps=fps, frame_count=frame_count
    )


def extract_frames(
    video_path: str | Path,
    out_dir: str | Path,
    sample_fps: float = 1.0,
    max_frames: int = 120,
) -> tuple[Path, int]:
    info = read_video_info(video_path)
    out = Path(out_dir).expanduser().resolve()
    out.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(str(info.path))
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video: {info.path}")

    interval = max(1, int(round(info.fps / max(sample_fps, 0.1))))
    frame_idx = 0
    saved = 0
    try:
        while saved < max_frames:
            ok, frame = cap.read()
            if not ok:
                break
            if frame_idx % interval == 0:
                out_path = out / f"frame_{saved:05d}.jpg"
                cv2.imwrite(str(out_path), frame, [cv2.IMWRITE_JPEG_QUALITY, 92])
                saved += 1
            frame_idx += 1
    finally:
        cap.release()

    return out, saved

