import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Predictor.css';

const Predictor = () => {
  // Default encoded values (0/1 for binary, 0-2/3 for multi-categorical)
  const [formData, setFormData] = useState({
    gender: 0, // 0: Female, 1: Male
    SeniorCitizen: 0, // 0: No, 1: Yes
    Partner: 0, // 0: No, 1: Yes
    Dependents: 0, // 0: No, 1: Yes
    tenure: 1, // Months (1-72)
    PhoneService: 1, // 0: No, 1: Yes
    MultipleLines: 0, // 0: No phone service, 1: No, 2: Yes
    InternetService: 0, // 0: DSL, 1: Fiber optic, 2: No
    OnlineSecurity: 0, // 0: No, 1: Yes, 2: No internet service
    OnlineBackup: 0, // 0: No, 1: Yes, 2: No internet service
    DeviceProtection: 0, // 0: No, 1: Yes, 2: No internet service
    TechSupport: 0, // 0: No, 1: Yes, 2: No internet service
    StreamingTV: 0, // 0: No, 1: Yes, 2: No internet service
    StreamingMovies: 0, // 0: No, 1: Yes, 2: No internet service
    Contract: 0, // 0: Month-to-month, 1: One year, 2: Two year
    PaperlessBilling: 0, // 0: No, 1: Yes
    PaymentMethod: 0, // 0: Electronic check, 1: Mailed check, 2: Bank transfer, 3: Credit card
    MonthlyCharges: 50.0, // $ (18.25 - 118.75)
    TotalCharges: 50.0 // $ (cumulative)
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) || 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/predict', { data: Object.values(formData) });
      setPrediction(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction({ churn: false, probability: 0, error: 'Prediction failed. Check backend connection.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render select options
  const renderSelect = (name, options) => (
    <select name={name} value={formData[name]} onChange={handleChange} className="form-select">
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );

  return (
    <section className="predictor">
      <div className="predictor-header">
        <h2 className="predictor-title">Customer Churn Prediction</h2>
        <p className="predictor-subtitle">
          Analyze customer data to predict churn probability
        </p>
      </div>
      
      <div className="predictor-content">
        <div className="form-section">
          <div className="form-header">
            <h3>Customer Information</h3>
            <p className="form-instructions">
              Enter customer details below. Adjust values to test different scenarios.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="predictor-form">
            <div className="form-grid">
              {/* Demographics */}
              <div className="form-group">
                <label className="form-label">Gender</label>
                {renderSelect('gender', [
                  { value: 0, label: 'Female' },
                  { value: 1, label: 'Male' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Senior Citizen</label>
                {renderSelect('SeniorCitizen', [
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Partner</label>
                {renderSelect('Partner', [
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Dependents</label>
                {renderSelect('Dependents', [
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' }
                ])}
              </div>

              {/* Tenure & Charges */}
              <div className="form-group">
                <label className="form-label">Tenure (months)</label>
                <input 
                  type="number" 
                  name="tenure" 
                  value={formData.tenure} 
                  onChange={handleChange} 
                  min="1" 
                  max="72" 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Monthly Charges ($)</label>
                <input 
                  type="number" 
                  name="MonthlyCharges" 
                  value={formData.MonthlyCharges} 
                  onChange={handleChange} 
                  step="0.01" 
                  min="18" 
                  max="119" 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Total Charges ($)</label>
                <input 
                  type="number" 
                  name="TotalCharges" 
                  value={formData.TotalCharges} 
                  onChange={handleChange} 
                  step="0.01" 
                  min="0" 
                  max="8684" 
                  className="form-input"
                />
              </div>

              {/* Services */}
              <div className="form-group">
                <label className="form-label">Phone Service</label>
                {renderSelect('PhoneService', [
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Internet Service</label>
                {renderSelect('InternetService', [
                  { value: 0, label: 'DSL' },
                  { value: 1, label: 'Fiber optic' },
                  { value: 2, label: 'No internet service' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Multiple Lines</label>
                {renderSelect('MultipleLines', [
                  { value: 0, label: 'No phone service' },
                  { value: 1, label: 'No' },
                  { value: 2, label: 'Yes' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Online Security</label>
                {renderSelect('OnlineSecurity', [
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' },
                  { value: 2, label: 'No internet service' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Contract Type</label>
                {renderSelect('Contract', [
                  { value: 0, label: 'Month-to-month' },
                  { value: 1, label: 'One year' },
                  { value: 2, label: 'Two year' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Paperless Billing</label>
                {renderSelect('PaperlessBilling', [
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' }
                ])}
              </div>
              
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                {renderSelect('PaymentMethod', [
                  { value: 0, label: 'Electronic check' },
                  { value: 1, label: 'Mailed check' },
                  { value: 2, label: 'Bank transfer (automatic)' },
                  { value: 3, label: 'Credit card (automatic)' }
                ])}
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Predict Churn Risk'}
            </button>
          </form>
        </div>

        {prediction && (
          <div className={`result-panel ${prediction.churn ? 'high-risk' : 'low-risk'}`}>
            <div className="result-header">
              <h3>Risk Analysis Result</h3>
              <div className={`risk-indicator ${prediction.churn ? 'high' : 'low'}`}>
                {prediction.churn ? 'HIGH RISK' : 'LOW RISK'}
              </div>
            </div>
            
            <div className="result-content">
              <div className="probability-meter">
                <div className="meter-labels">
                  <span>0%</span>
                  <span>Churn Probability</span>
                  <span>100%</span>
                </div>
                <div className="meter-track">
                  <div 
                    className="meter-fill" 
                    style={{ width: `${prediction.probability * 100}%` }}
                  ></div>
                </div>
                <div className="probability-value">
                  {(prediction.probability * 100).toFixed(1)}%
                </div>
              </div>
              
              <div className="recommendation">
                <strong>Recommendation:</strong>{' '}
                {prediction.churn 
                  ? 'Immediate retention actions recommended' 
                  : 'Continue standard customer relationship management'
                }
              </div>
              
              {prediction.error && (
                <div className="error-message">
                  <strong>Error:</strong> {prediction.error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Predictor;