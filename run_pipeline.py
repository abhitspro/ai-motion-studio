import os
import subprocess
import json

def run_step(script_name, description):
    print(f"\n==============================================")
    print(f"🚀 STEP: {description} ({script_name})")
    print(f"==============================================")
    result = subprocess.run(["python", script_name], capture_output=False)
    if result.returncode != 0:
        print(f"❌ Error occurred while running {script_name}")
        exit(1)

def ensure_node_dependencies():
    print(f"\n==============================================")
    print(f"📦 STEP: Ensuring Remotion Dependencies are Synced")
    print(f"==============================================")
    result = subprocess.run("npm install", cwd="my-motion-video", shell=True)
    if result.returncode != 0:
        print("❌ Failed to install Node dependencies.")
        exit(1)

def render_video():
    print(f"\n==============================================")
    print(f"🎬 STEP: Rendering Final MP4 Video via Remotion")
    print(f"==============================================")
    
    # Automatically verify and install dependencies before render
    ensure_node_dependencies()
    
    render_cmd = "npx remotion render MasterStory out/output_video.mp4"
    result = subprocess.run(render_cmd, cwd="my-motion-video", shell=True)
    
    if result.returncode == 0:
        print("\n🎉 SUCCESS! Your final video has been rendered to:")
        print("   📂 my-motion-video/out/output_video.mp4")
    else:
        print("❌ Video rendering failed.")

if __name__ == "__main__":
    print("🌟 Starting End-to-End AI Video Generation Pipeline...")
    
    # 1. Generate Story JSON
    run_step("story_agent.py", "Generating Story Script & Scenes")
    
    # 2. Generate Audio Voiceovers
    run_step("audio_agent.py", "Synthesizing Audio via TTS")
    
    # 3. Generate Scene Code & Auto-wire Root.tsx
    run_step("scene_generator.py", "Generating Motion Graphics Components")
    
    # 4. Render Final MP4
    render_video()