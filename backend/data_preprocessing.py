import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
import joblib

def load_data(file_path):
    df = pd.read_csv(file_path)
    # Clean data: Handle missing values (TotalCharges has spaces as NaN)
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df = df.dropna()
    # Encode categorical variables
    le = LabelEncoder()
    categorical_cols = ['gender', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines',
                        'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection',
                        'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract',
                        'PaperlessBilling', 'PaymentMethod', 'Churn']
    for col in categorical_cols:
        df[col] = le.fit_transform(df[col])
    # Features and target
    X = df.drop(['customerID', 'Churn'], axis=1)
    y = df['Churn']
    return X, y, df

def explore_data(df):
    churn_rate = df['Churn'].value_counts(normalize=True).to_dict()
    summary = {
        'shape': df.shape,
        'churn_rate': churn_rate,
        'missing_values': df.isnull().sum().to_dict(),
        'tenure_mean': df['tenure'].mean(),
        'monthly_charges_mean': df['MonthlyCharges'].mean()
    }
    return summary

def prepare_data(X, y):
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Balance with SMOTE
    smote = SMOTE(random_state=42)
    X_train_bal, y_train_bal = smote.fit_resample(X_train, y_train)
    # Scale
    scaler = StandardScaler()
    X_train_bal = scaler.fit_transform(X_train_bal)
    X_test = scaler.transform(X_test)
    # Save scaler
    joblib.dump(scaler, 'scaler.joblib')
    return X_train_bal, X_test, y_train_bal, y_test