from pydantic import BaseModel

# input format for ML model
class LoanInput(BaseModel):
    DUE_FREQUENCY: str
    NET_RENTAL: float
    NO_OF_RENTAL: int
    FINANCE_AMOUNT: float
    CUSTOMER_VALUATION: float
    EFFECTIVE_RATE: float
    AGE: int
    INCOME: float
    MARITAL_STATUS: int
    #MARITAL_STATUS_M: int
    #MARITAL_STATUS_Other: int
    #MARITAL_STATUS_S: int
    #MARITAL_STATUS_W: int
