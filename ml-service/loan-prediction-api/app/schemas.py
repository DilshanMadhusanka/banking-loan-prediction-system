from pydantic import BaseModel

class LoanInput(BaseModel):
    DUE_FREQUENCY: str
    NET_RENTAL: float
    NO_OF_RENTAL: int
    FINANCE_AMOUNT: float
    CUSTOMER_VALUATION: float
    EFFECTIVE_RATE: float
    AGE: int
    INCOME: float
    MARITAL_STATUS: str

class FinalInput(BaseModel):
    loan_data: LoanInput
    customer_behavior: str
