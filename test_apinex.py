import os
import requests
from dotenv import load_dotenv

# Load variables from the .env file into the environment
load_dotenv()

# Retrieve the API key securely
API_KEY = os.getenv("APINEX_API_KEY")
BASE_URL = "https://apinex.bond/v1/chat/completions"

if not API_KEY:
  raise ValueError("APINEX_API_KEY not found in environment or .env file!")

# Headers and Payload
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}",
}

payload = {
    "model": "free/gemini-3.8-flash",  # Using the full prefixed free model ID
    "messages": [
        {
            "role": "user",
            "content": "Hello! Testing APInex using the free prefixed model.",
        }
    ],
}

# Request Execution
try:
  response = requests.post(BASE_URL, headers=headers, json=payload)
  print(f"Status Code: {response.status_code}\n")

  if response.status_code == 200:
    data = response.json()
    print("Response from APInex:")
    print(data["choices"][0]["message"]["content"])
  else:
    print("Error Response:")
    print(response.text)

except Exception as e:
  print(f"Execution failed: {e}")