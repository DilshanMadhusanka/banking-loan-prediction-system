import joblib
from app.config import MODEL_PATH

# Load ML model once at startup
model = joblib.load(MODEL_PATH)
