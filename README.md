# 🌟 GlowBBY Full Ecosystem (Monorepo)

Acest repository conține întregul ecosistem **GlowBBY**, centralizat într-o structură de tip **monorepo**. Scopul acestui proiect este de a oferi unelte avansate de management, optimizare și automatizare pentru studiouri și modele, folosind inteligență artificială și analize de date.

---

## 📂 Structura Proiectului

Toate aplicațiile sunt organizate în folderul `apps/`. Fiecare folder reprezintă un subdomeniu sau un serviciu distinct:

### 1. 🖥️ `main-hub` (glowbby.online / app.glowbby.online)
- **Ce face:** Panoul central de control (Dashboard) și generatorul de extensii Chrome.
- **Conține:** Interfața principală de administrare și folderul `glowbot-extension` (Extensia Chrome pentru asistarea modelelor în timp real).
- **Tehnologii:** React, Vite, TypeScript, Tailwind CSS.

### 2. 💬 `chat` (chat.glowbby.online)
- **Ce face:** Motor de analiză și strategie pentru chat-uri (AI). Ajută la generarea de răspunsuri optimizate pentru platforme precum Chaturbate, StripChat, etc.
- **Tehnologii:** Python, HTML, CSS.

### 3. 🎨 `media` (media.glowbby.online)
- **Ce face:** Hub-ul de procesare media bazat pe AI.
- **Conține:** Scripturi pentru generarea de imagini (Fooocus) și eliminarea fundalului (rembg), plus un backend Python pentru gestionarea cererilor.
- **Tehnologii:** Python, Bash scripts (`start_fooocus.sh`, `start_rembg.sh`).

### 4. 👤 `profile` (profile.glowbby.online)
- **Ce face:** Platformă de optimizare a profilului pentru modele.
- **Conține:** Unelte pentru generare de descrieri SEO, quiz-uri de siguranță, generatoare de documente DMCA și scanere de leak-uri.
- **Tehnologii:** React, Vite, TypeScript, Tailwind CSS.

### 5. 🏢 `studio` (studio.glowbby.online)
- **Ce face:** Platforma B2B pentru ownerii de studiouri.
- **Conține:** Panou de administrare, dashboard pentru clienți, verificator de rank, analitică de trafic și gestionarea abonamentelor.
- **Tehnologii:** React, Vite, TypeScript, Tailwind CSS.

### 6. 💼 `jobs` (jobs.glowbby.online)
- **Ce face:** Portalul de recrutare și lead generation.
- **Conține:** Pagină de prezentare a oportunităților și formular de contact pentru candidați.
- **Tehnologii:** Node.js (Express), HTML, Tailwind CSS.

### 7. ⚙️ `api` (glowbby.online/analiza & Backend Central)
- **Ce face:** "Creierul" backend care deservește datele pentru celelalte aplicații.
- **Conține:** Server Node.js, baza de date SQLite (`glowbby.db`), și scripturi pentru analiza fișierelor Excel și agregarea datelor.
- **Tehnologii:** Node.js, Express, SQLite, JavaScript.

---

## 🛠️ Tech Stack General
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Bun/npm
- **Backend:** Node.js (Express), Python (FastAPI/Uvicorn)
- **Procese:** PM2 (Node.js & Python process manager)
- **Web Server:** Nginx (configurațiile sunt în folderul `nginx/`)
- **Bază de date:** SQLite (pentru API)

---

## 🚀 Ghid de Instalare și Rulare (Pentru Developeri)

### 1. Clonarea Repository-ului
```bash
cd /var/www
git clone https://github.com/sergiumurgescu88-lgtm/GlowBBYfull.git glowproject
cd glowproject
