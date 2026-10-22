import os
import re
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("APINEX_API_KEY")
base_url = "https://apinex.bond/v1"

client = OpenAI(
    api_key=api_key,
    base_url=base_url
)

def sanitize_interpolate_calls(code: str) -> str:
    """
    Automatically fixes interpolate calls where inputRange and outputRange lengths do not match.
    """
    def replace_match(match):
        in_range_str = match.group(1)  # e.g., "0, 180"
        out_vals = [v.strip() for v in match.group(2).split(',')]  # e.g., ['0', '0.8', '0']
        
        in_vals = [v.strip() for v in in_range_str.split(',')]
        
        # If lengths don't match, map inputRange to match the length of outputRange evenly
        if len(in_vals) != len(out_vals) and len(in_vals) == 2:
            start, end = float(in_vals[0]), float(in_vals[1])
            step = (end - start) / (len(out_vals) - 1) if len(out_vals) > 1 else 0
            new_in_vals = [int(start + i * step) for i in range(len(out_vals))]
            return f"interpolate(frame, [{', '.join(map(str, new_in_vals))}], [{', '.join(out_vals)}]"
            
        return match.group(0)

    # Regex to match interpolate(frame, [in...], [out...])
    pattern = r'interpolate\(\s*frame\s*,\s*\[(.*?)\]\s*,\s*\[(.*?)\]'
    return re.sub(pattern, replace_match, code, flags=re.DOTALL)

def generate_remotion_scene(scene_data: dict, total_scenes: int):
    scene_num = scene_data["scene_number"]
    dialogue = scene_data["dialogue"]
    visual_desc = scene_data["visual_description"]

    system_instruction = """
You are an expert Remotion / React developer. Generate a complete, valid React TypeScript component named `Scene{scene_num}` for Scene {scene_num} of {total_scenes}.

CRITICAL CODE STRUCTURE TEMPLATE (YOU MUST FOLLOW THIS):
export const Scene{scene_num}: React.FC = () => {{
  const frame = useCurrentFrame();
  const {{ fps, durationInFrames }} = useVideoConfig();

  // Your animations and styles here...

  return (
    <AbsoluteFill style={{{{ backgroundColor: "#0b0b0b", justifyContent: "center", alignItems: "center" }}}}>
      <Audio src={{staticFile("audio/scene_{scene_num}_audio.mp3")}} />
      <h1 style={{{{ color: "white" }}}}>{dialogue}</h1>
    </AbsoluteFill>
  );
}};

RULES:
1. Output ONLY valid, clean TSX/JSX code. No conversational text or markdown code blocks.
2. YOU MUST INCLUDE `const frame = useCurrentFrame();` inside every component function.
3. `inputRange` and `outputRange` in `interpolate()` MUST have the exact same number of elements! (e.g. if outputRange has 3 values, inputRange must also have 3 values).
4. Use ONLY standard HTML elements (`div`, `h1`, `p`, `span`, `img`) and official Remotion components (`AbsoluteFill`, `Audio`, `staticFile`).
5. Visual Description to match: {visual_desc}
""".format(
        scene_num=scene_num,
        total_scenes=total_scenes,
        dialogue=dialogue,
        visual_desc=visual_desc
    )

    user_prompt = f"Write the complete TSX code for Scene {scene_num} following the structure rules strictly."

    print(f"🎬 Generating Code for Scene {scene_num} via Gemini...")

    response = client.chat.completions.create(
        model="free/gemini-3.8-flash",
        messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7
    )

    code = response.choices[0].message.content.strip()

    # Clean markdown code block wrappers if present
    if code.startswith("```tsx"):
        code = code[6:]
    elif code.startswith("```typescript"):
        code = code[13:]
    elif code.startswith("```"):
        code = code[3:]
        
    if code.endswith("```"):
        code = code[:-3]
        
    code = code.strip()

    # Strip any accidental import statements
    code = re.sub(r'import\s+[\s\S]*?from\s+["\'].*?["\'];?', '', code)

    # Sanitize LLM hallucinations or rogue global hooks
    code = code.replace("useInterpolation", "interpolate")
    code = code.replace("useSharedValue", "useCurrentFrame")
    code = re.sub(r'const\s+\w+\s*=\s*useSharedValue\([^)]*\);?', '', code)
    code = re.sub(r'const\s+\w+\s*=\s*useCurrentFrame\([^)]*\);?', '', code)
    code = code.replace("const Audio = useExternalAudio;", "")
    code = code.replace("useExternalAudio", "")

    # SELF-HEALING FIX: Automatically inject `const frame = useCurrentFrame();` if the LLM forgot it
    if "const frame =" not in code:
        code = re.sub(
            r'(export\s+const\s+Scene\d+:\s*React\.FC\s*=\s*\(\s*\)\s*=>\s*\{)',
            r'\1\n  const frame = useCurrentFrame();',
            code
        )

    # SELF-HEALING FIX: Balance interpolate ranges automatically
    code = sanitize_interpolate_calls(code)

    # Standardized import block for every scene file
    import_block = """import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile, Easing } from "remotion";
"""

    final_code = import_block + "\n" + code.strip()
    return final_code

def update_root_tsx(total_scenes: int):
    root_tsx_content = """import { Composition } from "remotion";
import { Series } from "remotion";
"""

    for i in range(1, total_scenes + 1):
        root_tsx_content += f'import {{ Scene{i} }} from "./scenes/Scene{i}";\n'

    root_tsx_content += """
const MasterStoryVideo: React.FC = () => {
  return (
    <Series>
"""

    for i in range(1, total_scenes + 1):
        # 150 frames per scene (5 seconds at 30fps)
        root_tsx_content += f"""      <Series.Sequence durationInFrames={{150}}>
        <Scene{i} />
      </Series.Sequence>
"""

    total_duration = total_scenes * 150
    root_tsx_content += f"""    </Series>
  );
}};

export const RemotionRoot: React.FC = () => {{
  return (
    <>
      <Composition
        id="MasterStory"
        component={{MasterStoryVideo}}
        durationInFrames={{{total_duration}}}
        fps={{30}}
        width={{1920}}
        height={{1080}}
      />
    </>
  );
}};
"""

    root_path = "my-motion-video/src/Root.tsx"
    with open(root_path, "w", encoding="utf-8") as f:
        f.write(root_tsx_content)

    print(f"✅ Automatically updated Root.tsx with {total_scenes} scenes!")

def main():
    story_path = "generated_stories/latest_story.json"
    if not os.path.exists(story_path):
        print("❌ Error: latest_story.json not found. Run story_agent.py first!")
        return

    with open(story_path, "r", encoding="utf-8") as f:
        story = json.load(f)

    scenes_dir = "my-motion-video/src/scenes"
    os.makedirs(scenes_dir, exist_ok=True)

    total_scenes = len(story["scenes"])

    for scene in story["scenes"]:
        scene_num = scene["scene_number"]
        code = generate_remotion_scene(scene, total_scenes)
        
        file_path = os.path.join(scenes_dir, f"Scene{scene_num}.tsx")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(code)
            
        print(f"   -> Saved: {file_path}")

    print("\n✅ All individual scene components successfully generated!")
    update_root_tsx(total_scenes)

if __name__ == "__main__":
    main()