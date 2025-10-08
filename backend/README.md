# Backend Setup
1. Install dependencies: `pip install -r requirements.txt`
2. Place the full CSV file in `data/WA_Fn-UseC_-Telco-Customer-Churn.csv`.
3. Run the server: `python app.py`
4. API Endpoints:
   - GET /explore: Data exploration summary (e.g., churn rate, distributions).
   - POST /train: Train models and return metrics comparison.
   - POST /predict: Predict churn for input data.