import React from 'react';
import MetricsChart from './MetricsChart';

const Dashboard = ({ exploreData, metrics }) => {
  if (!exploreData || !metrics) return null;

  const { summary, insights } = exploreData;

  return (
    <div className="dashboard">
      <section className="explore-section">
        <h2>Data Exploration</h2>
        <p>Dataset Shape: {summary.shape[0]} rows, {summary.shape[1]} columns</p>
        <p>Churn Rate: {Math.round(summary.churn_rate[1] * 100)}% churn</p>
        <p>Avg Tenure: {summary.tenure_mean.toFixed(2)} months</p>
        <p>Avg Monthly Charges: ${summary.monthly_charges_mean.toFixed(2)}</p>
        <ul>
          {insights.map((insight, idx) => <li key={idx}>{insight}</li>)}
        </ul>
      </section>
      <section className="metrics-section">
        <h2>Model Comparison</h2>
        <MetricsChart metrics={metrics} />
      </section>
    </div>
  );
};

export default Dashboard;