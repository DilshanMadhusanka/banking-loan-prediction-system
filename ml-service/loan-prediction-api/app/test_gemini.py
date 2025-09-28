

#============================================================================================
# code for check the availble model and API_KEY
# to run this cd app then run python test_gemini.py
#============================================================================================

import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load .env if available
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY") or "AIzaSyAv60_-m8KhhM4ZTz3yHbpPittDwN2iDgw"

genai.configure(api_key=API_KEY)

# 1. List available models
print("---- Available Models ----")
for m in genai.list_models():
    print(m.name, "=>", m.supported_generation_methods)

# 2. Quick test prompt
try:
    model = genai.GenerativeModel("models/gemini-1.5-flash-latest")
    response = model.generate_content("Say hello in JSON format")
    print("---- Response ----")
    print(response.text)
except Exception as e:
    print("Error:", e)
