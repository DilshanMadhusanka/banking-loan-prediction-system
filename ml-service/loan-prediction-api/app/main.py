from fastapi import FastAPI
import pandas as pd
from app.schemas import LoanInput
from app.model_loader import model

app = FastAPI(title="Loan Default Prediction API")

@app.get("/")
def home():
    return {"message": "Loan Prediction API is running!"}

@app.post("/base-predict")
def predict_loan(data: LoanInput):
    # Convert input to DataFrame
    df = pd.DataFrame([data.dict()])

    # One-hot encode BOTH categorical variables
    df = pd.get_dummies(df, columns=["DUE_FREQUENCY", "MARITAL_STATUS"], drop_first=True)

    # Reindex to align with model training features
    df = df.reindex(columns=model.feature_names_in_, fill_value=0)

    # Make prediction
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[:, 1][0]

    return {
        "prediction": int(prediction),
        "probability_of_default": float(probability)
    }
