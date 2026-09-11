import gradio as gr
import torch
from diffusers import StableDiffusionImg2ImgPipeline
from rembg import remove
from PIL import Image
import gc

# Inițializare model (se încarcă la prima rulare)
model_id = "runwayml/stable-diffusion-v1-5"
print("Se încarcă modelul AI... (poate dura 1-2 minute la prima rulare)")
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(model_id, torch_dtype=torch.float32, safety_checker=None)

def remove_bg(input_image):
    if input_image is None:
        return None
    return remove(input_image)

def generate_variations(input_image, prompt, strength, steps):
    if input_image is None:
        return None, "Te rog să încarci o imagine."
    
    # Redimensionare la multiplu de 8 (cerință Stable Diffusion)
    width, height = input_image.size
    width = (width // 8) * 8
    height = (height // 8) * 8
    input_image = input_image.resize((width, height))
    
    # Conversie RGBA la RGB (pentru imagini cu fundal transparent)
    if input_image.mode == 'RGBA':
        background = Image.new('RGB', input_image.size, (255, 255, 255))
        background.paste(input_image, mask=input_image.split()[3])
        input_image = background

    try:
        result = pipe(
            prompt=prompt,
            image=input_image,
            strength=float(strength),
            num_inference_steps=int(steps),
            guidance_scale=7.5
        ).images[0]
        gc.collect() # Eliberăm memoria
        return result, "✅ Generare reușită!"
    except Exception as e:
        return None, f"❌ Eroare: {str(e)}"

with gr.Blocks(title="Glowbby Media Studio", theme=gr.themes.Soft(primary_hue="orange")) as demo:
    gr.Markdown("# 🎨 Glowbby Media Studio")
    gr.Markdown("Instrumente AI pentru crearea de conținut profesional dintr-o singură poză. *Notă: Prima generare durează 1-2 minute pentru descărcarea modelului, următoarele vor fi mai rapide.*")
    
    with gr.Tabs():
        with gr.TabItem("✂️ Elimină Fundal"):
            with gr.Row():
                with gr.Column():
                    bg_input = gr.Image(type="pil", label="Imagine Originală")
                    bg_btn = gr.Button("Elimină Fundal", variant="primary")
                with gr.Column():
                    bg_output = gr.Image(type="pil", label="Rezultat (Transparent)")
            bg_btn.click(fn=remove_bg, inputs=bg_input, outputs=bg_output)
            
        with gr.TabItem("✨ Generează Variații (Img2Img)"):
            with gr.Row():
                with gr.Column():
                    img_input = gr.Image(type="pil", label="Imagine Sursă")
                    prompt_input = gr.Textbox(label="Descriere (Prompt)", value="professional studio photography, warm lighting, 8k resolution, highly detailed, masterpiece, glowing orange effect")
                    strength_slider = gr.Slider(minimum=0.1, maximum=1.0, value=0.6, step=0.1, label="Puterea Modificării (0.1 = subtil, 0.8 = major)")
                    steps_slider = gr.Slider(minimum=10, maximum=40, value=20, step=1, label="Pași de Generare (recomandat 20-30)")
                    gen_btn = gr.Button("Generează Variație", variant="primary")
                with gr.Column():
                    img_output = gr.Image(type="pil", label="Variație Generată")
                    status_text = gr.Textbox(label="Status", interactive=False)
            gen_btn.click(fn=generate_variations, inputs=[img_input, prompt_input, strength_slider, steps_slider], outputs=[img_output, status_text])

if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7865)
