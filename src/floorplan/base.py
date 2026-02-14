import modal

app = modal.App("floorplan")
image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install(
        "pkg-config",
        "ffmpeg",
        "colmap",
        "xvfb",
        "libavformat-dev",
        "libavcodec-dev",
        "libavdevice-dev",
        "libavutil-dev",
        "libavfilter-dev",
        "libswscale-dev",
        "libswresample-dev",
    )
    # Use offscreen rendering for Qt apps like COLMAP in headless environment
    .env({"QT_QPA_PLATFORM": "offscreen"})
    .pip_install("nerfstudio")
)
# Shared, persisted Modal Volume for mp4s and processed outputs
vol = modal.Volume.from_name("floorplan-volume", create_if_missing=True)
