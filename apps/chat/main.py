import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from dotenv import load_dotenv
from database import KnowledgeBase

load_dotenv()
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
kb = KnowledgeBase()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    default_headers={
        'HTTP-Referer': 'https://glowbby.online',
        'X-Title': 'GlowBBY Chat Analyzer',
    }
)

PERSONA_STYLES = {
    "jucaus": {
        "label": "Jucăuș & Teasing",
        "text": """- Stil: Jucăuș, teasing, creează tensiune sexuală subtilă
  * Mesaje scurte (1-2 propoziții max)
  * NU sări la monetizare direct
  * Folosește hook vizual (sugerează poze/video)
  * Reciprocă complimentele specific
  * Creează curiozitate, nu cerere directă"""
    },
    "sarcastic": {
        "label": "Sarcastic & Provocator",
        "text": """- Stil: Sarcastic, ironic, cu umor tăios dar flirtat
  * Tachinează membrul jucăuș, niciodată jignitor
  * Ironie ușoară pentru a crea tensiune
  * Complimente livrate cu un twist sarcastic
  * Sarcasmul nu trebuie să pară vreodată răutăcios"""
    },
    "timid": {
        "label": "Timid & Dulce",
        "text": """- Stil: Timid, dulce, ușor vulnerabil, GFE (Girlfriend Experience)
  * Mesaje care sugerează sfială/roșeață
  * Puncte de suspensie, emoji dulci (🙈 🥺)
  * Creează senzația unei conexiuni intime, nu doar fizice
  * Escaladare treptată, niciodată bruscă"""
    },
    "serios": {
        "label": "Serios & Matur",
        "text": """- Stil: Serios, matur, direct, fără prostii
  * Ton adult, încrezător, emoji minime
  * Comunicare clară, respectuoasă, cu tensiune reținută
  * Potrivit pentru membri care preferă un ton profesional/matur"""
    },
    "funny": {
        "label": "Funny & Glumeț",
        "text": """- Stil: Funny, glumeț, spontan
  * Umor ușor, jocuri de cuvinte, glume flirtate
  * Atmosferă lejeră înainte de a introduce tensiune
  * Emoji expresive (😂 😏) pentru accentuarea glumelor"""
    },
    "happy": {
        "label": "Happy & Energic",
        "text": """- Stil: Happy, energic, entuziast
  * Ton pozitiv, exclamații, energie mare
  * Complimente entuziaste, emoji vesele (✨ 🥰)
  * Vibe de sărbătoare/joacă"""
    },
    "misterios": {
        "label": "Misterios & Intrigant",
        "text": """- Stil: Misterios, intrigant, vorbește în ghicitori ușoare
  * Nu dezvălui totul, lasă loc de interpretare
  * Fraze scurte, cu subînțeles
  * Creează senzația că știi ceva ce el nu știe încă"""
    },
    "dominant": {
        "label": "Dominant & Încrezător",
        "text": """- Stil: Dominant, încrezător, preia controlul conversației
  * Ton ferm, decis, fără ezitări
  * "Instrucțiuni" jucăușe către membru
  * Dinamică de putere subtilă, fără agresivitate"""
    },
}

def build_dynamic_prompt(chat_log, member_context=None, tone='jucaus'):
    """Construiește System Prompt dinamic bazat pe context și tonul ales"""

    language = kb.detect_language(chat_log)
    successful_examples = kb.get_successful_examples(language, limit=3)
    persona = PERSONA_STYLES.get(tone, PERSONA_STYLES['jucaus'])

    prompt = f"""You are an elite OnlyFans Marketing Specialist with 20 years of experience.

## PERSONA MODELULUI ({persona['label']}):
{persona['text']}
  * Adaptare culturală (ex: italian = complimente directe, spaniol = pasiune)

## CONTEXT MEMBRU:
{f'- Tip: {member_context["member_type"]}' if member_context else '- Tip: Necunoscut (primul mesaj)'}
{f'- Limbă: {member_context["preferred_language"]}' if member_context else f'- Limbă: {language}'}
{f'- Strategie care a funcționat: {member_context["successful_strategies"]}' if member_context and member_context["successful_strategies"] else '- Strategie: Testează teasing + curiozitate'}

## EXEMPLE DE SUCCES (mesaje care au generat vânzări):
"""

    if successful_examples:
        for i, ex in enumerate(successful_examples, 1):
            prompt += f"{i}. \"{ex['text']}\" (scor: {ex['effectiveness_score']}/100, conversie: {ex['conversion_result']})\n"
    else:
        prompt += "Nu există exemple încă. Folosește psihologie generală de vânzare.\n"

    prompt += f"""
## CONVERSAȚIA CURENTĂ ({language.upper()}):
{chat_log}

## OBIECTIV:
- Creează tensiune subtilă potrivită tonului ales ({persona['label']})
- Lasă ușa deschisă pentru el să ceară mai mult
- Sugerează conținut premium FĂRĂ a cere direct
- Mesaj scurt, punchy, specific contextului ȘI tonului ales

## FORMAT OUTPUT (în română pentru analiză, engleză/limba membrului pentru mesaje):

🧠 DIAGNOZA:
- Stadiul conversației (flirt/tensiune/cerere)
- Ce a funcționat până acum
- Ce NU a funcționat
- Momentul psihologic actual

🎯 STRATEGIA:
- Trigger psihologic (Ego/FOMO/Curiozitate/GFE)
- De ce va funcționa

💬 MESAJELE (2 variante, în tonul {persona['label']}, în limba membrului):
1. [Variantă teasing + curiozitate]
2. [Variantă reciprocă + hook vizual]

💸 RUTA DE MONETIZARE:
- Când să introduci PPV-ul (după X mesaje)
- Cum să faci upsell natural
- Preț sugerat bazat pe tipul membrului
"""

    return prompt

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("index.html", "r") as f:
        return f.read()

@app.get("/api/tones")
async def get_tones():
    """Listă de tonuri disponibile pentru frontend"""
    return JSONResponse(content={
        "tones": [{"key": k, "label": v["label"]} for k, v in PERSONA_STYLES.items()]
    })

@app.post("/api/generate")
async def generate(request: Request):
    data = await request.json()
    chat_log = data.get("chat_log", "")
    platform = data.get("platform", "Chaturbate")
    fan_type = data.get("fan_type", "Regular")
    tone = data.get("tone", "jucaus")
    member_username = data.get("member_username", "")
    tone = data.get("tone", "jucaus")
    if tone not in PERSONA_STYLES:
        tone = "jucaus"

    if not chat_log:
        return JSONResponse(content={"error": "No chat log provided"}, status_code=400)

    member_id = kb.get_or_create_member(member_username) if member_username else None
    member_context = kb.get_member_context(member_username) if member_username else None

    conv_id = kb.add_conversation(member_id, "onlyfans", chat_log)

    system_prompt = build_dynamic_prompt(chat_log, member_context, tone)

    try:
        response = client.chat.completions.create(
            model="openai/gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Analizează conversația și generează strategia optimă."}
            ],
            temperature=0.7
        )

        result = response.choices[0].message.content

        message_id = kb.add_message(conv_id, "ai", result)

        print(f"✅ Conversație {conv_id} (mesaj {message_id}, ton {tone}) analizată pentru {member_username or 'unknown'}")

        return JSONResponse(content={
            "result": result,
            "conversation_id": conv_id,
            "message_id": message_id,
            "tone": tone
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/api/feedback")
async def feedback(request: Request):
    """Primește feedback după ce vezi rezultatul real"""
    data = await request.json()
    conversation_id = data.get("conversation_id")
    message_id = data.get("message_id")
    score = data.get("score")  # 0-100
    conversion_result = data.get("conversion_result")  # "ppv_20", "custom_100", "tip_5", "no_sale"

    if not message_id:
        return JSONResponse(content={"error": "message_id lipsă — nu se poate lega feedback-ul de un mesaj"}, status_code=400)

    kb.update_member_score(conversation_id, message_id, score, conversion_result)

    return JSONResponse(content={"status": "success"})
