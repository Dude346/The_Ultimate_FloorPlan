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

### Add Generated Assets Into Existing Scene Meshes

```bash
cd <repo-root>
```

Default (high quality):

```bash
uv run python scripts/generate_and_place_shap_e_asset.py \
  examples/Bathroom_Mesh.ply \
  "Green Office Chair" \
  --output examples/Bathroom_With_Green_Office_Chair.ply
```

Optional stronger quality:

```bash
uv run python scripts/generate_and_place_shap_e_asset.py \
  examples/Bathroom_Mesh.ply \
  "Green Office Chair" \
  --guidance-scale 20 \
  --karras-steps 128 \
  --output examples/Bathroom_With_Green_Office_Chair_strong.ply
```

Optional placement tuning:

```bash
uv run python scripts/generate_and_place_shap_e_asset.py \
  examples/Bathroom_Mesh.ply \
  "Green Office Chair" \
  --target-footprint-ratio 0.08 \
  --offset-x 0.1 \
  --offset-z -0.1 \
  --output examples/Bathroom_With_Green_Office_Chair_tuned.ply
```

### Interactive World Viewer (Auto-Detect)

```bash
cd viewer
npm install
npm run dev:world -- --file ../examples/Bathroom_With_Green_Office_Chair.ply
```

Use the same command for point-cloud PLY, mesh PLY, or GLB:

```bash
cd viewer
npm run dev:world -- --file ../examples/Bathroom_Mesh.ply
```

```bash
cd viewer
npm run dev:world -- --file ../examples/Living_Room_Mesh.glb
```

What it does:
- `.ply` input: auto-detects point cloud vs mesh from PLY header and opens the PLY FPS viewer (`/`).
- `.glb` input: opens the GLB FPS viewer (`/index_glb.html`).

# Quotes

> Ashwin is the alpha wolf.
> *Kian Alizadeh*
