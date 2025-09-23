import os
from dotenv import load_dotenv

load_dotenv()

# Absolute ML model path
MODEL_PATH = os.getenv("MODEL_PATH")

# Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
