import pandas as pd
from app.model_loader import model
from app.schemas import LoanInput

def predict_loan(data: LoanInput) -> dict:
    df = pd.DataFrame([data.dict()])

    # One-hot encode categorical variables
    df = pd.get_dummies(df, columns=["DUE_FREQUENCY", "MARITAL_STATUS"], drop_first=True)

    # Align with model features
    df = df.reindex(columns=model.feature_names_in_, fill_value=0)

    # Predict
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[:, 1][0]

    return {
        "prediction": int(prediction),
        "probability_of_default": float(probability)
    }
