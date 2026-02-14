"""Generate a 3D asset from a text prompt using OpenAI's Shap-E on Modal.

Example:
    modal run generate_3d_asset/modal_shape_e_generate_shap_e.py \
        --prompt "a wolf" \
        --output-path "/Users/ash4thewin/Desktop/generated_assets/wolf_shap_e.ply"
"""

from pathlib import Path

import modal

APP_NAME = "shape-e-asset-generator"
MODEL_CACHE_PATH = "/model-cache"

image = (
    modal.Image.debian_slim(python_version="3.10")
    .apt_install("git")
    .pip_install(
        "torch==2.4.1",
        "numpy<2",
        "Pillow",
        "blobfile",
        "scipy",
        "trimesh",
        "tqdm",
        "PyYAML",
        "ipywidgets",
        "https://github.com/openai/shap-e/archive/refs/heads/main.zip",
    )
)

app = modal.App(APP_NAME, image=image)
model_cache_volume = modal.Volume.from_name(
    "shape-e-model-cache", create_if_missing=True
)


@app.function(
    gpu="A10G",
    timeout=60 * 20,
    volumes={MODEL_CACHE_PATH: model_cache_volume},
)
def generate_shape_e_mesh_bytes(
    prompt: str, guidance_scale: float = 15.0, karras_steps: int = 64
) -> bytes:
    import os
    import tempfile

    import torch
    from shap_e.diffusion.gaussian_diffusion import diffusion_from_config
    from shap_e.diffusion.sample import sample_latents
    from shap_e.models.download import load_config, load_model
    from shap_e.util.notebooks import decode_latent_mesh

    os.environ["TORCH_HOME"] = MODEL_CACHE_PATH
    os.environ["XDG_CACHE_HOME"] = MODEL_CACHE_PATH

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    xm = load_model("transmitter", device=device)
    text_model = load_model("text300M", device=device)
    diffusion = diffusion_from_config(load_config("diffusion"))

    latents = sample_latents(
        batch_size=1,
        model=text_model,
        diffusion=diffusion,
        guidance_scale=guidance_scale,
        model_kwargs={"texts": [prompt]},
        progress=True,
        clip_denoised=True,
        use_fp16=device.type == "cuda",
        use_karras=True,
        karras_steps=karras_steps,
        sigma_min=1e-3,
        sigma_max=160,
        s_churn=0,
    )

    mesh = decode_latent_mesh(xm, latents[0]).tri_mesh()

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
    guidance_scale: float = 15.0,
    karras_steps: int = 64,
):
    output = Path(output_path).expanduser().resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    mesh_bytes = generate_shape_e_mesh_bytes.remote(
        prompt=prompt,
        guidance_scale=guidance_scale,
        karras_steps=karras_steps,
    )
    output.write_bytes(mesh_bytes)
    print(f"Saved generated 3D asset to: {output}")
