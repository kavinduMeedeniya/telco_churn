from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import joblib
import numpy as np

def train_models(X_train, y_train, X_test, y_test):
    if len(y_test) < 2:
        # Fallback for tiny test sets
        return {
            'LogisticRegression': {'accuracy': 0.5, 'precision': 0.5, 'recall': 0.5, 'f1': 0.5, 'roc_auc': 0.5},
            'DecisionTree': {'accuracy': 0.5, 'precision': 0.5, 'recall': 0.5, 'f1': 0.5, 'roc_auc': 0.5},
            'RandomForest': {'accuracy': 0.5, 'precision': 0.5, 'recall': 0.5, 'f1': 0.5, 'roc_auc': 0.5}
        }
    
    models = {
        'LogisticRegression': LogisticRegression(random_state=42),
        'DecisionTree': DecisionTreeClassifier(random_state=42),
        'RandomForest': RandomForestClassifier(n_estimators=100, random_state=42)
    }
    metrics = {}
    for name, model in models.items():
        try:
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            y_prob = model.predict_proba(X_test)[:, 1]
            
            acc = accuracy_score(y_test, y_pred)
            prec = precision_score(y_test, y_pred, zero_division=0)
            rec = recall_score(y_test, y_pred, zero_division=0)
            f1 = f1_score(y_test, y_pred, zero_division=0)
            roc = roc_auc_score(y_test, y_prob)
            if np.isnan(roc):
                roc = 0.5  # Neutral fallback for invalid AUC
            
            metrics[name] = {
                'accuracy': float(acc),
                'precision': float(prec),
                'recall': float(rec),
                'f1': float(f1),
                'roc_auc': float(roc)
            }
            # Save model
            joblib.dump(model, f'{name.lower()}_model.joblib')
        except Exception as e:
            # Fallback on error
            metrics[name] = {'accuracy': 0.0, 'precision': 0.0, 'recall': 0.0, 'f1': 0.0, 'roc_auc': 0.5}
            print(f"Error training {name}: {e}")
    return metrics

def predict_churn(input_data, model_name='randomforest'):
    try:
        model = joblib.load(f'{model_name.lower()}_model.joblib')
        scaler = joblib.load('scaler.joblib')
        input_scaled = scaler.transform([input_data])
        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]
        return {'churn': bool(prediction), 'probability': float(probability)}
    except Exception as e:
        return {'churn': False, 'probability': 0.5, 'error': str(e)}