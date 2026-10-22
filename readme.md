# AI Motion Studio (End-to-End AI Video Storytelling Pipeline)

An automated, end-to-end Python and Remotion pipeline that transforms text prompts into cinematic, production-ready 9:16 vertical video stories complete with scriptwriting, AI text-to-speech voiceovers, dynamic motion graphics components, and automated rendering.

---

## 🚀 Features

* **Automated Story Scripting (`story_agent.py`)**: Generates structured multi-scene scripts featuring rich narratives, character details, visual descriptions, and audio cues using custom LLM gateway endpoints.
* **Text-to-Speech Synthesis (`audio_agent.py`)**: Automatically converts dialogue into professional mp3 voiceover files using `gTTS` and stores them directly into your Remotion assets directory.
* **Dynamic Motion Component Generation (`scene_generator.py`)**: Programmatically creates isolated React/TypeScript components (`SceneX.tsx`) styled for high-end cinematic vertical (9:16) short-form videos with mood-driven lighting and synchronized captions.
* **Master Orchestrator (`run_pipeline.py`)**: Ties the entire pipeline together into a single command, verifying dependencies, orchestrating agents, updating `Root.tsx`, and rendering the final `.mp4` file.

---

## 🛠️ Project Structure

```text
E:\Claude Code\
│
├── run_pipeline.py          # Master orchestrator script
├── story_agent.py           # Generates story JSON scripts
├── audio_agent.py           # Synthesizes text-to-speech voiceovers
├── scene_generator.py       # Generates Remotion TSX scene components
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variable configuration template
├── .gitignore               # Git exclusion rules
└── my-motion-video/         # Remotion video project directory
    ├── src/
    │   ├── Root.tsx         # Automatically sequenced video composition
    │   └── scenes/          # Individual generated scene components
    └── public/
        └── audio/           # Generated scene mp3 voiceovers
```

---

## 📋 Prerequisites

* **Python 3.10+** installed on your system.
* **Node.js & npm** (Required for Remotion rendering).

---

## ⚙️ Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/abhitspro/ai-motion-studio.git
   cd ai-motion-studio
   ```

2. **Set up Python Virtual Environment:**
   ```bash
   python -m venv venv
   # Activate virtual environment:
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   # source venv/bin/activate
   ```

3. **Install Python Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**
   * Duplicate the `.env.example` file and rename it to `.env`.
   * Add your API credentials into `.env`:
     ```env
     OPENAI_API_KEY=your_openai_api_key_here
     OPENAI_BASE_URL=https://apinex.bond/v1
     APINEX_API_KEY=your_apinx_api_key_here
     ```

5. **Install Remotion Dependencies:**
   Navigate into the motion folder and install dependencies:
   ```bash
   cd my-motion-video
   npm install
   cd ..
   ```

---

## 🎬 How to Run the Pipeline

To execute the entire end-to-end workflow—from script generation and audio synthesis to motion graphics compilation and final MP4 rendering—run:

```bash
python run_pipeline.py
```

Your final rendered video will be available at:
📁 `my-motion-video/out/output_video.mp4`

---

## 🔑 How to Get an APInex API Key
1. Visit the APInex dashboard at [https://apinex.bond](https://apinex.bond).
2. Log in or create your account.
3. Navigate to the **API Keys** section in your profile or settings.
4. Generate a new key and copy it.
5. Paste your key into your local `.env` file under `APINEX_API_KEY`.

---

## 📜 License
This project is open-source and available under the MIT License.