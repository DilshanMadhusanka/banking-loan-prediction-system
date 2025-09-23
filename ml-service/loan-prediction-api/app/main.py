import asyncio
from fastapi import FastAPI
from app.schemas import FinalInput
from app.ml_service import predict_loan
from app.llm_service import ask_llm

app = FastAPI(title="Loan Prediction + LLM API")

@app.get("/")
def home():
    return {"message": "Loan Prediction API is running"}

@app.post("/final-predict")
async def final_predict(data: FinalInput):
    # Run ML prediction in background thread
    ml_result = await asyncio.to_thread(predict_loan, data.loan_data)

    # Run LLM reasoning in background thread
    llm_result = await asyncio.to_thread(ask_llm, ml_result, data.customer_behavior)

    return {
        "ml_result": ml_result,
        "llm_result": llm_result
    }
