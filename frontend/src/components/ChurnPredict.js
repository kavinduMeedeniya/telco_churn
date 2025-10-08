import React from 'react';
import '../styles/ChurnPredict.css';

const ChurnPredict = () => {
  return (
    <div className="churn-predict">
      <section className="hero">
        <h1 className="hero-title">
          <div className="churn-predict-title">
            <span>Churn Prediction</span>
          </div>
          <div>that <span className="light">helps</span> you retain customers</div>
        </h1>
      </section>

      <section className="content">
        <h2 className="section-title">Your key to customer<br />retention through analytics</h2>
        <p className="section-subtitle">
          Ready for actionable insights to predict and prevent<br />customer churn in real time?
        </p>

        <div className="cards-grid">
          <div className="card">
            <span className="badge">Setup in minutes</span>
            <h3>Identify at-risk customers<br />before they leave</h3>
            <p>
              Our platform uses machine learning algorithms to analyze customer behavior 
              patterns and predict churn probability with high accuracy.
            </p>

            <div className="stats">
              <div className="stat">
                <div className="stat-label">Current Churn Rate</div>
                <div className="stat-value">32.42%</div>
              </div>
            </div>

            <svg className="chart-mini" viewBox="0 0 300 80">
              <polyline 
                className="chart-line" 
                points="0,60 30,55 60,65 90,45 120,50 150,35 180,40 210,25 240,30 270,20 300,15"
              />
            </svg>

            <span className="percentage-badge">76.3% Accuracy</span>
          </div>

          <div className="card dark">
            <span className="label">Reduce churn by up to</span>
            <div className="big-stat">27%</div>
            <p>
              Our predictive models help identify at-risk customers early, allowing for 
              targeted retention strategies that can reduce churn by up to 35%. Proactive 
              intervention saves acquisition costs and boosts customer lifetime value.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChurnPredict;