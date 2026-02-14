"""Generate a 3D asset from a text prompt using OpenAI's Point-E on Modal.

Example:
    modal run generate_3d_asset/modal_shape_e_generate.py \
        --prompt "a futuristic desk lamp" \
        --output-path "/Users/ash4thewin/Desktop/TreeHacks_2026/output/lamp.ply"
"""

from pathlib import Path

import modal

APP_NAME = "point-e-asset-generator"
MODEL_CACHE_PATH = "/model-cache"

image = (
    modal.Image.debian_slim(python_version="3.10")
    .apt_install("git")
    .pip_install(
        "torch==2.4.1",
        "torchvision==0.19.1",
        "numpy<2",
        "https://github.com/openai/point-e/archive/refs/heads/main.zip",
    )
)

app = modal.App(APP_NAME, image=image)
model_cache_volume = modal.Volume.from_name("point-e-model-cache", create_if_missing=True)


@app.function(
    gpu="A10G",
    timeout=60 * 20,
    volumes={MODEL_CACHE_PATH: model_cache_volume},
)
def generate_point_e_mesh_bytes(
    prompt: str, guidance_scale: float = 3.0, karras_steps: int = 64, grid_size: int = 64
) -> bytes:
    import os
    import tempfile

    import torch
    from point_e.diffusion.configs import DIFFUSION_CONFIGS, diffusion_from_config
    from point_e.diffusion.sampler import PointCloudSampler
    from point_e.models.configs import MODEL_CONFIGS, model_from_config
    from point_e.models.download import load_checkpoint
    from point_e.util.pc_to_mesh import marching_cubes_mesh

    os.environ["TORCH_HOME"] = MODEL_CACHE_PATH
    os.environ["XDG_CACHE_HOME"] = MODEL_CACHE_PATH

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Stage 1: text -> point cloud (base + upsampler).
    base_name = "base40M-textvec"
    base_model = model_from_config(MODEL_CONFIGS[base_name], device)
    base_model.eval()
    base_diffusion = diffusion_from_config(DIFFUSION_CONFIGS[base_name])
    base_model.load_state_dict(load_checkpoint(base_name, device, cache_dir=MODEL_CACHE_PATH))

    upsampler_name = "upsample"
    upsampler_model = model_from_config(MODEL_CONFIGS[upsampler_name], device)
    upsampler_model.eval()
    upsampler_diffusion = diffusion_from_config(DIFFUSION_CONFIGS[upsampler_name])
    upsampler_model.load_state_dict(
        load_checkpoint(upsampler_name, device, cache_dir=MODEL_CACHE_PATH)
    )

    text_sampler = PointCloudSampler(
        device=device,
        models=[base_model, upsampler_model],
        diffusions=[base_diffusion, upsampler_diffusion],
        num_points=[1024, 4096 - 1024],
        aux_channels=["R", "G", "B"],
        guidance_scale=[guidance_scale, 0.0],
        model_kwargs_key_filter=("texts", ""),
        karras_steps=[karras_steps, karras_steps],
    )

    text_samples = None
    for sample in text_sampler.sample_batch_progressive(
        batch_size=1, model_kwargs={"texts": [prompt]}
    ):
        text_samples = sample
    point_cloud = text_sampler.output_to_point_clouds(text_samples)[0]

    # Stage 2: point cloud -> mesh via SDF model + marching cubes.
    sdf_name = "sdf"
    sdf_model = model_from_config(MODEL_CONFIGS[sdf_name], device)
    sdf_model.eval()
    sdf_model.load_state_dict(load_checkpoint(sdf_name, device, cache_dir=MODEL_CACHE_PATH))
    mesh = marching_cubes_mesh(
        pc=point_cloud,
        model=sdf_model,
        batch_size=4096,
        grid_size=grid_size,
        progress=True,
    )

    with tempfile.NamedTemporaryFile(suffix=".ply", delete=False) as temp_file:
        mesh.write_ply(temp_file)
        temp_path = temp_file.name

    try:
        with open(temp_path, "rb") as ply_file:
            return ply_file.read()
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


@app.local_entrypoint()
def main(
    prompt: str,
    output_path: str = "./generated_assets/generated_asset.ply",
    guidance_scale: float = 3.0,
    karras_steps: int = 64,
    grid_size: int = 64,
):
    output = Path(output_path).expanduser().resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    mesh_bytes = generate_point_e_mesh_bytes.remote(
        prompt=prompt,
        guidance_scale=guidance_scale,
        karras_steps=karras_steps,
        grid_size=grid_size,
    )
    output.write_bytes(mesh_bytes)
    print(f"Saved generated 3D asset to: {output}")
