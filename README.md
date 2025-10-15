# Loan Default Prediction System

## Project Overview
The **Loan Default Prediction System** is a full-stack application designed to predict whether a loan applicant is likely to default. The system integrates **Machine Learning**, **Spring Boot**, **FastAPI**, **React**, and **LLM (Large Language Model)** to provide a seamless experience for both users and administrators.

- **Front-end**: React.js for interactive user interfaces.
- **Back-end**: Spring Boot for business logic and API management.
- **ML Service**: FastAPI for serving the Machine Learning model.
- **LLM Service**: Refines ML predictions and generates final output.
- **Database**: Stores user information, loan applications, and prediction history.
- **ML Model**: Predicts loan default risk using algorithms such as KNN and Decision Tree.

---

## Features
- User registration and login
- Submit loan applications
- Real-time loan default risk prediction
- Admin dashboard to view applications and predictions
- REST APIs for seamless communication between front-end, ML service, and LLM
- LLM-based final prediction for enhanced decision-making

---

## Technology Stack
| Layer | Technology |
|-------|------------|
| Front-end | React.js, Tailwind CSS |
| Back-end | Spring Boot (Java) |
| ML API | FastAPI (Python) |
| LLM Service | Python / HuggingFace or OpenAI API |
| Database |  MySQL  |
| ML | scikit-learn, pandas, numpy, seaborn, matplotlib |
| ML Monitoring | MLflow |

---


### **How LLM Integration Works**
1. User submits loan application via frontend.
2. ML service (FastAPI) predicts initial default risk using trained models.
3. ML model output is sent to the **LLM service**.
4. The LLM analyzes the prediction, incorporates additional logic/rules, and generates the **final prediction**.
5. Final prediction is returned to the frontend for display and stored in the database.

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/DilshanMadhusanka/banking-loan-prediction-system.git
cd Loan-Default-Prediction-System
```


2. **Set up the ML service (FastAPI)**
```bash
cd ../ml-service/loan-prediction-api
pip install -r requirements.txt
uvicorn main:app --reload
```

3. **Set up the backend (Spring Boot)**
```bash
cd back-end
./mvnw spring-boot:run
```

4. **Set up the frontend (React)**
```bash
cd front-end
npm install
npm start
```




