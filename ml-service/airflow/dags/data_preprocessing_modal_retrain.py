from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.dates import days_ago
from pathlib import Path
import os
import pandas as pd
from pycaret.regression import setup, get_config

# Define folders inside container
UPLOAD_FOLDER = "/opt/airflow/shared_data/uploads"
CLEANED_FOLDER = "/opt/airflow/shared_data/cleaned_data"


# --------------------------
# Task 1: Check uploads folder
# --------------------------
def check_upload_folder(**kwargs):
    uploads_path = Path(UPLOAD_FOLDER)
    if uploads_path.exists():
        files = list(uploads_path.glob("*.*"))
        print(f"Uploads folder exists! Found {len(files)} files:")
        for f in files:
            print(f" - {f.name}")
        return len(files)
    else:
        print("Uploads folder does NOT exist!")
        return 0


# --------------------------
# Task 2: Preprocess latest file
# --------------------------
def process_new_file(**kwargs):
    from pycaret.regression import setup, get_config

    uploads_path = Path(UPLOAD_FOLDER)
    files = sorted(uploads_path.glob("*.*"), key=os.path.getmtime, reverse=True)

    if not files:
        print("No files to process.")
        return

    file_path = files[0]
    print(f"Processing latest file: {file_path.name}")

    # Read file
    if file_path.suffix.lower() == ".csv":
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)

    print(f"Dataset loaded successfully with shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")

    # Drop duplicates
    df = df.drop_duplicates()

    # Identify numeric and categorical columns
    numeric_cols = df.select_dtypes(include='number').columns.tolist()
    categorical_cols = df.select_dtypes(include='object').columns.tolist()

    # Fill missing values
    for col in numeric_cols:
        df[col].fillna(df[col].median(), inplace=True)
    for col in categorical_cols:
        df[col].fillna(df[col].mode()[0], inplace=True)
        df[col] = df[col].astype('category')  # Convert string columns to categorical

    print(f"After cleaning: {df.shape}")
    print(f"Numeric columns: {numeric_cols}")
    print(f"Categorical columns: {categorical_cols}")

    # PyCaret preprocessing
    s = setup(
        data=df,
        target="CONTRACT_STATUS",   # your target column
        session_id=123,
        log_experiment=False,
        normalize=True               # optional normalization
    )

    # Get the preprocessed dataframe
    cleaned_df = get_config("X")

    # Save cleaned data
    cleaned_path = Path(CLEANED_FOLDER) / f"cleaned_{file_path.stem}.xlsx"
    cleaned_path.parent.mkdir(parents=True, exist_ok=True)
    cleaned_df.to_excel(cleaned_path, index=False)
    print(f"Saved cleaned file to {cleaned_path}")


# --------------------------
# DAG definition
# --------------------------
default_args = {
    "owner": "airflow",
    "start_date": days_ago(1),
}

dag = DAG(
    "data_preprocessing_v9",
    default_args=default_args,
    schedule_interval=None,
    catchup=False,
)

# --------------------------
# Tasks
# --------------------------
check_task = PythonOperator(
    task_id="check_upload_folder",
    python_callable=check_upload_folder,
    provide_context=True,
    dag=dag,
)

preprocess_task = PythonOperator(
    task_id="preprocess_uploaded_file",
    python_callable=process_new_file,
    provide_context=True,
    dag=dag,
)

# --------------------------
# Dependencies
# --------------------------
check_task >> preprocess_task
