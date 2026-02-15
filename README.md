# The Ultimate Floor Plan BOOM

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

### FPS Splat Viewer

- Place your Nerfstudio Gaussian splat at `render_and_move/viewer/public/scene.ply` (replace the placeholder file).
- Run locally:
  - `cd render_and_move`
  - `cd viewer && npm install && npm run dev`
- Or run with a specific PLY path directly:
  - `cd render_and_move/viewer`
  - `npm run dev:ply -- --ply "/absolute/path/to/your_scene.ply"`

### Pipeline: Clean splat -> View in FPS

1. Install Python dependencies with `uv`:
   - `uv add numpy plyfile scikit-learn`

2. Clean a raw splat PLY:
   - `uv run python tools/clean_splat_ply.py --input examples/splat.ply --output examples/splat_clean.ply`
   - Optional stronger cleanup:
   - `uv run python tools/clean_splat_ply.py --input examples/splat.ply --output examples/splat_clean.ply --keep-largest-cluster --dbscan-eps 0.12 --dbscan-min-samples 20 --scale-percentile 1.0`

3. (Optional) Convert cleaned splat to mesh:
   - `uv run python tools/mesh_from_splat.py --input examples/splat_clean.ply --output examples/splat_mesh.glb`

4. Copy cleaned splat into the web viewer:
   - `cp examples/splat_clean.ply viewer/public/scene_clean.ply`

5. Run the FPS website viewer:
   - `cd viewer`
   - `npm install`
   - `npm run dev`

6. Inspect bounds quickly:
   - `uv run python tools/print_bbox.py --input examples/splat_clean.ply --percentile 1.0`

# Quotes

> Ashwin is the alpha wolf.
> *Kian Alizadeh*
