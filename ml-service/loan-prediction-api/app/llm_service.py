import os
import re
import json
import google.generativeai as genai
from app.config import GEMINI_API_KEY

def ask_llm(ml_result: dict, client_behavior: str) -> dict:
    genai.configure(api_key=GEMINI_API_KEY)
    # model = genai.GenerativeModel("gemini-1.5-flash")
    model = genai.GenerativeModel("models/gemini-flash-latest")

    prompt = f"""
    You are a financial risk analyst. Combine the ML model result and client behavior
    to give a structured JSON response.

    ML result: {ml_result}
    Client behavior: {client_behavior}

    Respond ONLY with JSON in this format:
    {{
      "risk_category": "High | Medium | Low",
      "confidence": 0.0-1.0,
      "recommendation": "Detailed recommendation text (MAX 500 characters)",
      "factors": ["factor1", "factor2", ...]
    }}

    Important: Ensure that the 'recommendation' field does not exceed 500 characters.
    
    """

    response = model.generate_content(prompt)
    text = response.text.strip()

    # Extract JSON
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            pass

    return {
        "risk_category": "Unknown",
        "confidence": ml_result.get("probability_of_default", 0.0),
        "recommendation": text,
        "factors": ["ML result", "Client behavior"]
    }
