import os
from dotenv import load_dotenv
from openai import OpenAI

# Load credentials from .env
load_dotenv()

api_key = os.getenv("APINEX_API_KEY")
base_url = "https://apinex.bond/v1"  # APInex base URL

client = OpenAI(
    api_key=api_key,
    base_url=base_url
)

def generate_remotion_component(user_prompt: str) -> str:
    system_instruction = """
    You are an expert React and Remotion video developer.
    Your task is to write a single React TypeScript file for a Remotion video component.
    
    Guidelines:
    1. Import hooks like `useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring` from 'remotion'.
    2. Use standard layout elements like `<AbsoluteFill>`.
    3. Ensure math calculations for frame timing are clean and accurate.
    4. Output ONLY pure, runnable React TypeScript code without markdown codeblocks or conversational text.
    """

    print("Sending prompt to free/gemini-3.8-flash...")
    
    response = client.chat.completions.create(
        model="free/gemini-3.8-flash",
        messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
    )

    return response.choices[0].message.content

if __name__ == "__main__":
    prompt = (
        "Create a 5-second dynamic tech title scene at 30fps. "
        "Dark theme (#0a0a0c) with glowing cyan (#00f2fe) text that says 'PIPELINE AGENT'. "
        "The text should spring scale up from frame 0 to 30, with a subtle background fade-in."
    )
    
    code = generate_remotion_component(prompt)
    
    # Save directly to your Remotion project
    output_path = os.path.join("my-motion-video", "src", "GeneratedScene.tsx")
    
    # Strip accidental backticks if the LLM wraps code in markdown
    clean_code = code.replace("```tsx", "").replace("```typescript", "").replace("```", "").strip()

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(clean_code)

    print(f"Generated React scene successfully saved to: {output_path}")