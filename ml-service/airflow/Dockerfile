# FROM apache/airflow:2.9.1

# Use Airflow 2.9.1 with Python 3.11
FROM apache/airflow:2.9.1-python3.11

# Install system dependencies (for PyCaret + LightGBM)
USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Switch back to airflow user
USER airflow

# Install PyCaret and its dependencies
RUN pip install --no-cache-dir pycaret==3.3.2 openpyxl==3.1.5
