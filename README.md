# FloorPlan

## Develop

### Environment

- `uv venv` to create a virtual environment
    - Run `.venv/Scripts/activate` on Windows
    or `.venv/bin/activate` on macOS and Windows
- `uv add PACKAGE` where `PACKAGE` might be `modal` or `torch`
    - `uv sync` to sync installed packages

### Modal.com Storage

- `modal token new`
to connect your local environment to your Modal account.
- With your virtual environment activated,
run `modal volume create floorplan-volume`.
