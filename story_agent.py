import os
import json
import re
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("APINEX_API_KEY")
base_url = "https://apinex.bond/v1"

client = OpenAI(
    api_key=api_key,
    base_url=base_url
)

def parse_json_safely(content: str) -> dict:
    """
    Attempts standard JSON parsing, and if it fails, cleans up common 
    LLM formatting errors (like trailing commas or missing quotes).
    """
    try:
        return json.loads(content)
    except json.JSONDecodeError as e:
        print(f"⚠️ Warning: Initial JSON decode failed ({e}). Attempting auto-repair...")
        
        # Strip markdown code blocks if any remained
        content = re.sub(r'^```(?:json)?\s*', '', content, flags=re.IGNORECASE)
        content = re.sub(r'\s*```$', '', content)
        
        # Try finding the first '{' and last '}'
        start_idx = content.find('{')
        end_idx = content.rfind('}')
        if start_idx != -1 and end_idx != -1:
            json_candidate = content[start_idx:end_idx+1]
            try:
                return json.loads(json_candidate)
            except Exception:
                pass
                
        # Fallback: Raise original error with a helpful message if repair fails
        raise ValueError(f"Could not parse LLM output as JSON. Raw content:\n{content}")

def generate_story_script(topic: str, style: str) -> dict:
    system_instruction = """
You are an expert movie director and video scriptwriter specializing in high-end vertical short-form cinematic storytelling.

Output ONLY valid JSON matching this exact structure (no markdown code blocks, just raw JSON, ensure all commas between keys are present):
{
  "title": "Video Title",
  "style": "Visual Style description",
  "total_duration_sec": 15,
  "scenes": [
    {
      "scene_number": 1,
      "duration_sec": 5,
      "speaker": "Narrator",
      "dialogue": "Line of text to be spoken",
      "visual_description": "Detailed description emphasizing 2D vector art, clean outlines, mood-driven color shifts, and divine radial glows.",
      "sfx_cue": "Type of sound effect",
      "bg_music_mood": "Overall music vibe"
    }
  ]
}
"""

    user_prompt = f"Topic: {topic}\nVisual Style: {style}\nNumber of scenes: 3"

    response = client.chat.completions.create(
        model="free/gemini-3.8-flash",
        messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7
    )

    content = response.choices[0].message.content.strip()
    
    # Clean markdown wrappers if present
    if content.startswith("```json"):
        content = content[7:-3].strip()
    elif content.startswith("```"):
        content = content[3:-3].strip()

    return parse_json_safely(content)


if __name__ == "__main__":
    topic_input = "The Epic Encounter of Mahadev and Yamaraj"
    style_input = "2D Vector Art, Flat Shading with Rich Gradients, Atmospheric Foreground Silhouettes, Cinematic Mood-Driven Lighting (Warm Golds to Fiery Crimson), and Divine Glow Effects"

    print("🎬 Generating Cinematic Story Script...")
    story = generate_story_script(topic_input, style_input)
    
    os.makedirs("generated_stories", exist_ok=True)
    output_path = "generated_stories/latest_story.json"
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(story, f, indent=2)

    print(f"✅ Story script saved to: {output_path}\n")
    print(json.dumps(story, indent=2))