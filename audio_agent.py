import os
import sys
import subprocess
import json

# Self-healing dependency check for gTTS
try:
    from gtts import gTTS
except ImportError:
    print("⚠️ gTTS not found in this Python environment. Installing automatically...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "gTTS"])
    from gtts import gTTS

def generate_scene_audio():
    story_path = "generated_stories/latest_story.json"
    if not os.path.exists(story_path):
        print("❌ Error: latest_story.json not found. Run story_agent.py first!")
        return

    with open(story_path, "r", encoding="utf-8") as f:
        story = json.load(f)

    audio_dir = "my-motion-video/public/audio"
    os.makedirs(audio_dir, exist_ok=True)

    print(f"🔊 Generating Voiceover Audio for: '{story['title']}'...\n")

    for scene in story["scenes"]:
        scene_num = scene["scene_number"]
        dialogue = scene["dialogue"]
        speaker = scene["speaker"]

        print(f"[{speaker}] Scene {scene_num}: \"{dialogue}\"")

        tts = gTTS(text=dialogue, lang='en', tld='com', slow=False)
        
        file_name = f"scene_{scene_num}_audio.mp3"
        file_path = os.path.join(audio_dir, file_name)
        
        tts.save(file_path)
        print(f"   -> Saved: {file_path}")

    print("\n✅ All scene voiceovers successfully generated and stored in Remotion public assets!")

if __name__ == "__main__":
    generate_scene_audio()