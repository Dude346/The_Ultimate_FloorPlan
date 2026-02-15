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

## Scene Editing MVP

This repo now includes a local scene-editing pipeline that turns natural language
prompts into structured scene edits on top of a JSON scene graph.

### Scene file format

Use `examples/scene_example.json` as a template.

### Supported prompt patterns

- `move the chair to the back`
- `swap the two paintings`
- `swap chair_1 and chair_2`
- `replace the chair with a couch`
- `remodel my room` (captured for planner stage; no multi-step auto-layout yet)

### Commands

- `python -m floorplan edit --scene examples/scene_example.json --prompt "move the chair to the back"`
- `python -m floorplan edit --scene examples/scene_example.json --prompt "swap the two paintings"`
- `python -m floorplan edit --scene examples/scene_example.json --prompt "replace the chair with a couch"`
- `python -m floorplan preview --scene examples/scene_example.edited.json`

## Point-Cloud Prompt Edit (MeshLab workflow)

For raw Scaniverse-style point-cloud `.ply` files (binary little-endian vertices only):

- Inspect bounds:
  - `python -m floorplan pc-info --input "examples/Scaniverse bathroom.ply"`
- Move points in a selected bbox with explicit translation:
  - `python -m floorplan pc-move-bbox --input "examples/Scaniverse bathroom.ply" --select-bbox xmin,ymin,zmin,xmax,ymax,zmax --translate dx,dy,dz --out "examples/bathroom.toilet_shifted.ply"`
- Move points in a selected bbox using a prompt destination:
  - `python -m floorplan pc-move-prompt --input "examples/Scaniverse bathroom.ply" --select-bbox xmin,ymin,zmin,xmax,ymax,zmax --prompt "move the toilet to the back" --out "examples/bathroom.toilet_back.ply"`
- Move points near an anchor object (for example, toilet near door):
  - `python -m floorplan pc-move-prompt --input "examples/Scaniverse bathroom.ply" --select-bbox xmin,ymin,zmin,xmax,ymax,zmax --anchor-bbox axmin,aymin,azmin,axmax,aymax,azmax --prompt "move the toilet near the door" --out "examples/bathroom.toilet_near_door.ply"`

Then open original and output PLY files in MeshLab to compare.

## Video + Prompt Label Workflow (SAM-ready)

This workflow uses your uploaded room video to prepare frames and keeps named 3D labels
(`toilet`, `door`, etc.) in a JSON file. Today you can set labels manually; later SAM can
fill the same label file automatically.
`sam-auto-label` requires `torch`, `transformers`, and `Pillow` plus model downloads.

Install SAM dependencies in your virtualenv:

- `source .venv/bin/activate`
- `python -m pip install --upgrade pip`
- `python -m pip install torch torchvision transformers pillow`

- Check video metadata:
  - `python -m floorplan video-info --input IMG_7654.mp4`
- Check SAM runtime dependencies:
  - `python -m floorplan sam-status`
- Run SAM + GroundingDINO auto-label proposal (writes 3D label bboxes):
  - `python -m floorplan sam-auto-label --video IMG_7654.mp4 --input "examples/Scaniverse bathroom.ply" --labels toilet,door --out-labels examples/bathroom.labels.json --fps 0.5 --max-frames 60 --debug-dir examples/sam_debug`
  - To try SAM2, add `--sam-model facebook/sam2-hiera-large` (or another installed SAM2 checkpoint).
  - If the run reports ambiguity, inspect `examples/sam_debug/report.json` and overlay images before proceeding.
- End-to-end auto prompt edit (no prelabel command needed):
  - `python -m floorplan pc-auto-edit --video IMG_7654.mp4 --input "examples/Scaniverse bathroom.ply" --prompt "move the toilet near the door" --out "examples/bathroom.auto.toilet_near_door.ply" --work-dir examples/auto_edit`
  - This runs auto-detect -> validation -> move -> hole-fill and writes `examples/auto_edit/auto_edit_report.json`.
  - If direct prompt placement is invalid, it now attempts an automatic nearby placement search around the anchor before failing.
- End-to-end object-mesh edit stage (recommended for stability):
  - `python -m floorplan pc-auto-object-edit --video IMG_7654.mp4 --input "examples/Scaniverse bathroom.ply" --prompt "move the toilet near the door" --out "examples/bathroom.auto.object_edit.ply" --work-dir examples/auto_object_edit --signature-frames 1`
  - `python -m floorplan pc-auto-object-edit --video IMG_7654.mp4 --input "examples/Scaniverse bathroom.ply" --prompt "swap lamp and chair" --out "examples/bathroom.auto.object_swap.ply" --work-dir examples/auto_object_edit_swap --signature-frames 1`
  - `python -m floorplan pc-auto-object-edit --video IMG_7654.mp4 --input "examples/Scaniverse bathroom.ply" --prompt "swap the two paintings" --out "examples/bathroom.auto.object_swap_two.ply" --work-dir examples/auto_object_edit_swap_two --signature-frames 1`
  - This runs:
    - SAM/Grounding prompt detection
    - object extraction as per-object point assets and proxy mesh assets
    - prompt edit (`move ... near ...`, `swap A and B`, `swap the two <label>`)
    - overlap correction (pushes colliding moved objects apart)
    - hole-fill patching at old object locations
  - Artifacts:
    - object manifest: `examples/auto_object_edit/objects/objects.manifest.json`
    - object assets: `*.points.ply` and `*.proxy_mesh.ply`
    - full report: `examples/auto_object_edit/auto_object_edit_report.json`
- Extract sampled frames for manual/SAM inspection:
  - `python -m floorplan video-frames --input IMG_7654.mp4 --out examples/IMG_7654_frames --fps 1 --max-frames 120`
- Save a toilet bbox label in 3D:
  - `python -m floorplan pc-label-set --labels examples/bathroom.labels.json --name toilet --bbox xmin,ymin,zmin,xmax,ymax,zmax`
- Save a door bbox label in 3D:
  - `python -m floorplan pc-label-set --labels examples/bathroom.labels.json --name door --bbox xmin,ymin,zmin,xmax,ymax,zmax`
- Inspect saved labels:
  - `python -m floorplan pc-label-show --labels examples/bathroom.labels.json`
- Validate a move prompt before applying it:
  - `python -m floorplan pc-validate-prompt --input "examples/Scaniverse bathroom.ply" --labels examples/bathroom.labels.json --prompt "move the toilet near the door"`
- Move by prompt using labels only:
  - `python -m floorplan pc-move-labeled-prompt --input "examples/Scaniverse bathroom.ply" --labels examples/bathroom.labels.json --prompt "move the toilet near the door" --out "examples/bathroom.toilet_near_door.ply"`
- Move + hole-fill where object used to be:
  - `python -m floorplan pc-move-labeled-prompt --input "examples/Scaniverse bathroom.ply" --labels examples/bathroom.labels.json --prompt "move the toilet near the door" --validate --hole-fill --out "examples/bathroom.toilet_near_door.holefill.ply"`

# Quotes

> Ashwin is the alpha wolf.
> *Kian Alizadeh*
