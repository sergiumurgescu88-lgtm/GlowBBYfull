from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import requests
import base64
import io
import time
from PIL import Image
import json
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

KIE_API_KEY = "a599af5330a8d5fdf40430646f74fe1a"
KIE_UPLOAD_URL = "https://kieai.redpandaai.co/api/file-base64-upload"
KIE_API_URL = "https://api.kie.ai/api/v1"

# OpenRouter Client
openrouter_client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    default_headers={
        'HTTP-Referer': 'https://media.glowbby.online',
        'X-Title': 'Glowbby Media Studio',
    }
)

def log_debug(message):
    print(message, flush=True)
    with open("/var/www/media.glowbby.online/app/debug_log.txt", "a", encoding="utf-8") as f:
        f.write(str(message) + "\n")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.post("/api/ai-assistant")
async def ai_assistant(message: str = Form(...), context_type: str = Form("general")):
    """AI Assistant care îmbunătățește prompturi sau oferă sugestii"""
    try:
        log_debug(f"--- START AI ASSISTANT REQUEST ---")
        log_debug(f"Message: {message}, Context: {context_type}")
        
        # Prompt de sistem adaptat contextului
        if context_type == "outfit":
            system_prompt = """Ești un expert în fashion photography și AI image generation. 
Utilizatorul îți va da o idee scurtă despre un outfit, iar tu trebuie să creezi un prompt DETALIAT și PROFESIONAL pentru generare AI.

REGULI:
- Păstrează identitatea modelului (menționează "maintaining exact facial features")
- Include detalii despre: material, culoare, stil, iluminare, fundal, atmosferă
- Adaugă termeni tehnici de fotografie (8k, professional studio lighting, high fashion)
- Promptul final trebuie să fie în ENGLEZĂ
- Răspunde DOAR cu promptul îmbunătățit, fără explicații suplimentare"""

        elif context_type == "background":
            system_prompt = """Ești un expert în location scouting și set design pentru photography.
Utilizatorul îți va da o idee scurtă despre un fundal, iar tu trebuie să creezi un prompt DETALIAT pentru generare AI.

REGULI:
- Include detalii despre: locație, iluminare, atmosferă, timp din zi, sezon
- Menționează "maintaining exact facial features" pentru a păstra identitatea modelului
- Adaugă termeni cinematice și artistice
- Promptul final trebuie să fie în ENGLEZĂ
- Răspunde DOAR cu promptul îmbunătățit, fără explicații suplimentare"""

        elif context_type == "video":
            system_prompt = """Ești un expert în video production și motion design.
Utilizatorul îți va da o idee scurtă despre mișcare, iar tu trebuie să creezi un prompt DETALIAT pentru generare video AI.

REGULI:
- Include tipul de mișcare (subtle, cinematic, dynamic)
- Specifică durata și ritmul
- Menționează "maintaining exact facial features" pentru a păstra identitatea
- Adaugă detalii despre cameră, unghiuri, tranziții
- Promptul final trebuie să fie în ENGLEZĂ
- Răspunde DOAR cu promptul îmbunătățit, fără explicații suplimentare"""

        else:  # general
            system_prompt = """Ești un asistent AI pentru creatori de conținut.
Ajută utilizatorul să creeze prompturi mai bune pentru generare AI (imagini și video).

REGULI:
- Oferă sugestii concrete și acționabile
- Include termeni tehnici și profesioniști
- Fii concis dar informativ
- Dacă utilizatorul cere un prompt, generează unul complet în ENGLEZĂ
- Menționează "maintaining exact facial features" când este relevant"""

        response = openrouter_client.chat.completions.create(
            model="openai/gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ],
            temperature=0.7,
            max_tokens=1000
        )

        result = response.choices[0].message.content
        log_debug(f"✅ AI Assistant Response: {result}")

        return {"response": result, "status": "success"}

    except Exception as e:
        log_debug(f"💥 EROARE AI ASSISTANT: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

async def process_image_generation(image: UploadFile, prompt: str, aspect_ratio: str):
    try:
        open("/var/www/media.glowbby.online/app/debug_log.txt", "w").close()
        log_debug(f"--- START IMAGE REQUEST ---")
        
        safe_prompt = f"{prompt}, fully clothed, professional safe for work studio portrait, maintaining the exact same facial features, hair, and body pose, highly detailed, 8k resolution"
        log_debug(f"Prompt trimis la AI: {safe_prompt}")
        
        contents = await image.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        img.thumbnail((1024, 1024))
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG", quality=85)
        img_base64 = f"data:image/jpeg;base64,{base64.b64encode(buffered.getvalue()).decode('utf-8')}"
        
        headers = {"Authorization": f"Bearer {KIE_API_KEY}", "Content-Type": "application/json"}
        
        upload_payload = {"base64Data": img_base64, "uploadPath": "glowbby-temp", "fileName": "input.jpg"}
        upload_res = requests.post(KIE_UPLOAD_URL, json=upload_payload, headers=headers)
        upload_data = upload_res.json()
        
        if upload_res.status_code != 200 or upload_data.get("code") != 200:
            raise HTTPException(status_code=500, detail=f"Eroare upload: {upload_data}")
        
        data_obj = upload_data.get("data", {})
        image_url = data_obj.get("downloadUrl") or data_obj.get("fileUrl") or data_obj.get("url")
        log_debug(f"✅ Upload OK. URL: {image_url}")
        
        generate_payload = {
            "model": "flux-2/pro-image-to-image",
            "input": {
                "input_urls": [image_url],
                "prompt": safe_prompt,
                "aspect_ratio": aspect_ratio,
                "resolution": "1K",
                "nsfw_checker": False
            }
        }
        
        gen_res = requests.post(f"{KIE_API_URL}/jobs/createTask", json=generate_payload, headers=headers)
        if gen_res.text.strip().startswith("<!DOCTYPE html>"):
            raise HTTPException(status_code=500, detail="KIE.ai a returnat HTML.")
            
        gen_data = gen_res.json()
        if gen_res.status_code != 200 or gen_data.get("code") != 200:
            raise HTTPException(status_code=500, detail=f"Eroare generare: {gen_data.get('msg') or gen_data.get('message')}")
            
        task_id = gen_data["data"]["taskId"]
        log_debug(f"✅ Task ID: {task_id}")
        
        result_url = None
        for i in range(60):
            time.sleep(2)
            status_res = requests.get(f"{KIE_API_URL}/jobs/recordInfo?taskId={task_id}", headers=headers)
            try:
                status_data = status_res.json()
            except:
                continue
            
            if status_data.get("code") == 200:
                task_info = status_data.get("data", {})
                state = str(task_info.get("state", "")).lower()
                
                if state in ["success", "completed", "1", "finished"]:
                    result_json_data = task_info.get("resultJson")
                    parsed_json = json.loads(result_json_data) if isinstance(result_json_data, str) else (result_json_data or {})
                    result_urls = parsed_json.get("resultUrls") or parsed_json.get("urls") or parsed_json.get("image_urls")
                    if result_urls and len(result_urls) > 0:
                        result_url = result_urls[0]
                        break
                    elif "url" in parsed_json:
                        result_url = parsed_json["url"]
                        break
                elif state in ["failed", "error", "2", "3", "rejected", "timeout"]:
                    raise HTTPException(status_code=500, detail=f"Generare eșuată: {task_info.get('failMsg', 'Eroare necunoscută')}")
        
        if not result_url:
            raise HTTPException(status_code=500, detail="Task-ul nu a returnat un URL valid.")
            
        img_res = requests.get(result_url)
        result_img = Image.open(io.BytesIO(img_res.content)).convert("RGB")
        res_buffered = io.BytesIO()
        result_img.save(res_buffered, format="JPEG", quality=95)
        return {"image": f"data:image/jpeg;base64,{base64.b64encode(res_buffered.getvalue()).decode('utf-8')}"}
        
    except Exception as e:
        log_debug(f"💥 EROARE CRITICĂ: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/replace-bg")
async def replace_bg(image: UploadFile = File(...), prompt: str = Form(...), aspect_ratio: str = Form("1:1")):
    return await process_image_generation(image, prompt, aspect_ratio)

@app.post("/api/generate")
async def generate_var(image: UploadFile = File(...), prompt: str = Form(...), aspect_ratio: str = Form("1:1")):
    return await process_image_generation(image, prompt, aspect_ratio)

@app.post("/api/generate-video")
async def generate_video(image: UploadFile = File(...), prompt: str = Form(...), duration: str = Form("5"), aspect_ratio: str = Form("16:9")):
    try:
        open("/var/www/media.glowbby.online/app/debug_log.txt", "w").close()
        log_debug(f"--- START VIDEO REQUEST ---")
        
        safe_prompt = f"{prompt}, subtle natural motion, professional safe for work studio portrait, maintaining the exact same facial features and clothing, highly detailed, smooth cinematic movement, no morphing artifacts, 4k resolution"
        log_debug(f"Video Prompt: {safe_prompt}")
        
        contents = await image.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        img.thumbnail((1024, 1024))
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG", quality=85)
        img_base64 = f"data:image/jpeg;base64,{base64.b64encode(buffered.getvalue()).decode('utf-8')}"
        
        headers = {"Authorization": f"Bearer {KIE_API_KEY}", "Content-Type": "application/json"}
        
        upload_payload = {"base64Data": img_base64, "uploadPath": "glowbby-temp", "fileName": "input.jpg"}
        upload_res = requests.post(KIE_UPLOAD_URL, json=upload_payload, headers=headers)
        upload_data = upload_res.json()
        
        if upload_res.status_code != 200 or upload_data.get("code") != 200:
            raise HTTPException(status_code=500, detail=f"Eroare upload: {upload_data}")
        
        data_obj = upload_data.get("data", {})
        image_url = data_obj.get("downloadUrl") or data_obj.get("fileUrl") or data_obj.get("url")
        log_debug(f"✅ Upload OK. URL: {image_url}")
        
        generate_payload = {
            "model": "kling-2.6/image-to-video",
            "input": {
                "prompt": safe_prompt,
                "image_urls": [image_url],
                "sound": False,
                "duration": duration,
                "aspect_ratio": aspect_ratio
            }
        }
        
        gen_res = requests.post(f"{KIE_API_URL}/jobs/createTask", json=generate_payload, headers=headers)
        if gen_res.text.strip().startswith("<!DOCTYPE html>"):
            raise HTTPException(status_code=500, detail="KIE.ai a returnat HTML.")
            
        gen_data = gen_res.json()
        if gen_res.status_code != 200 or gen_data.get("code") != 200:
            raise HTTPException(status_code=500, detail=f"Eroare generare video: {gen_data.get('msg') or gen_data.get('message')}")
            
        task_id = gen_data["data"]["taskId"]
        log_debug(f"✅ Video Task ID: {task_id}")
        
        result_url = None
        for i in range(120):
            time.sleep(3)
            status_res = requests.get(f"{KIE_API_URL}/jobs/recordInfo?taskId={task_id}", headers=headers)
            try:
                status_data = status_res.json()
            except:
                continue
            
            if status_data.get("code") == 200:
                task_info = status_data.get("data", {})
                state = str(task_info.get("state", "")).lower()
                
                if state in ["success", "completed", "1", "finished"]:
                    result_json_data = task_info.get("resultJson")
                    parsed_json = json.loads(result_json_data) if isinstance(result_json_data, str) else (result_json_data or {})
                    result_urls = parsed_json.get("resultUrls") or parsed_json.get("urls") or parsed_json.get("video_urls")
                    if result_urls and len(result_urls) > 0:
                        result_url = result_urls[0]
                        break
                    elif "url" in parsed_json:
                        result_url = parsed_json["url"]
                        break
                    elif "resultVideoUrl" in task_info:
                        result_url = task_info["resultVideoUrl"]
                        break
                elif state in ["failed", "error", "2", "3", "rejected", "timeout"]:
                    raise HTTPException(status_code=500, detail=f"Generare video eșuată: {task_info.get('failMsg', 'Eroare necunoscută')}")
        
        if not result_url:
            raise HTTPException(status_code=500, detail="Task-ul video nu a returnat un URL valid în timpul alocat.")
            
        log_debug(f"⬇️ Video generat cu succes: {result_url}")
        return {"video_url": result_url}
        
    except Exception as e:
        log_debug(f"💥 EROARE CRITICĂ VIDEO: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7865)
