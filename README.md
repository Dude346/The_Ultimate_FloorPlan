# The Ultimate Floor Plan

## Setup

```bash
uv venv
source .venv/bin/activate
uv sync
```

Connect Modal and create the shared volume once:

```bash
modal token new
modal volume create floorplan-volume
```

## Generate 3D assets

Shap-E:

```bash
uv run modal run scripts/generate_3d_asset/modal_shape_e_generate.py \
  --prompt "Green Office Chair" \
  --guidance-scale 18 \
  --karras-steps 96 \
  --output-path "generated_assets/green_office_chair.ply"
```

Point-E:

```bash
uv run modal run scripts/generate_3d_asset/modal_point_e_generate.py \
  --prompt "Green Office Chair" \
  --karras-steps 96 \
  --grid-size 96 \
  --output-path "generated_assets/green_office_chair_point_e.ply"
```

## Generate and place asset into a scene

One command (generate with Shap-E + place in scene):

```bash
uv run python scripts/generate_and_place_shap_e_asset.py \
  examples/Bathroom_Mesh.ply \
  "Green Office Chair" \
  --output examples/Bathroom_With_Green_Office_Chair.ply
```

Higher quality generation:

```bash
uv run python scripts/generate_and_place_shap_e_asset.py \
  examples/Bathroom_Mesh.ply \
  "Green Office Chair" \
  --guidance-scale 20 \
  --karras-steps 128 \
  --output examples/Bathroom_With_Green_Office_Chair_hq.ply
```

Optional placement tuning:

```bash
uv run python scripts/generate_and_place_shap_e_asset.py \
  examples/Bathroom_Mesh.ply \
  "Green Office Chair" \
  --target-footprint-ratio 0.08 \
  --offset-x 0.1 \
  --offset-z -0.1 \
  --y-lift 0.0 \
  --output examples/Bathroom_With_Green_Office_Chair_tuned.ply
```

If you already have an asset PLY and only want placement:

```bash
uv run python scripts/place_asset_in_scene.py \
  examples/Bathroom_Mesh.ply \
  generated_assets/green_office_chair.ply \
  --output examples/Bathroom_With_Green_Office_Chair.ply
```

## Render and interact with the world

Start the viewer:

```bash
cd viewer
npm install
npm run dev:world -- --file ../examples/Bathroom_With_Green_Office_Chair.ply
```

Render other files the same way:

```bash
npm run dev:world -- --file ../examples/Bathroom_Mesh.ply
npm run dev:world -- --file ../examples/Living_Room_Mesh.glb
```

Viewer controls:
- Click `Click to enter`: pointer lock + FPS mode.
- `W/A/S/D`: move
- `E` / `C`: up / down
- `Shift`: sprint
- `F`: pick up asset at screen center
- `G`: place held asset in free 3D space (in front of camera)
- `+`: open scale dialog for held asset
- Scale dialog: enter a positive integer multiplier (`2` = 2x), then `Enter`/`Apply`
- Scale dialog: `Esc`/`Cancel` closes without changing scale
- `Esc`: unlock cursor
- Top-right gizmo: world `X/Y/Z` + plane orientation (`XY/XZ/YZ`)
