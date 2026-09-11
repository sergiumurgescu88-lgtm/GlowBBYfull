#!/bin/bash
cd /var/www/media.glowbby.online/rembg
source venv/bin/activate
# Lansăm interfața Gradio pentru Rembg
python -c "import gradio as gr; from rembg import remove; import PIL.Image; \
def process(img): return PIL.Image.fromarray(remove(img)); \
gr.Interface(fn=process, inputs=gr.Image(type='pil'), outputs=gr.Image(type='pil'), title='Eliminare Fundal AI').launch(server_name='0.0.0.0', server_port=7866)"
