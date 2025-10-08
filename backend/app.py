from flask import Flask, jsonify, request
from flask_cors import CORS
from data_preprocessing import load_data, explore_data, prepare_data
from models import train_models, predict_churn

app = Flask(__name__)
CORS(app)

# Load data once
X, y, df = load_data('data/WA_Fn-UseC_-Telco-Customer-Churn.csv')
X_train, X_test, y_train_bal, y_test = prepare_data(X, y)

@app.route('/explore', methods=['GET'])
def explore():
    summary = explore_data(df)
    # Business insights
    insights = [
        "Churn rate is imbalanced (likely ~27% churn).",
        "Higher monthly charges correlate with churn.",
        "Month-to-month contracts increase churn risk."
    ]
    return jsonify({'summary': summary, 'insights': insights})

@app.route('/train', methods=['POST'])
def train():
    metrics = train_models(X_train, y_train_bal, X_test, y_test)
    return jsonify({'metrics': metrics})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']  # Expect list of feature values
    result = predict_churn(data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)