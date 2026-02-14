# FloorPlan

## Develop

### Environment

- `uv venv` to create a virtual environment
    - Run `.venv/Scripts/activate` on Windows
    or `source .venv/bin/activate` on macOS and Windows
- `uv add PACKAGE` where `PACKAGE` might be `modal` or `torch`
    - `uv sync` to sync installed packages

### Code

- `uv run ruff format .` to format

### Modal.com Storage

- `modal token new`
to connect your local environment to your Modal account.
- With your virtual environment activated,
run `modal volume create floorplan-volume`.

### Generate 3D Assets

- `uv run modal run generate_3d_asset/modal_shape_e_generate.py --prompt "INSERT_PROMPT" --guidance-scale 18 --karras-steps 96 --output-path “"/generated_assets/INSERT_FILE_NAME.ply"` to generate an asset with the Shap-E model
  
- `uv run modal run generate_3d_asset/modal_point_e_generate.py --prompt "INSERT_PROMPT" --karras-steps 96 --grid-size 96 --output-path "/generated_assets/INSERT_FILE_NAME.ply"` to generate an asset with the Point-E model

# Quotes

> Ashwin is the alpha wolf.
> *Kian Alizadeh*
