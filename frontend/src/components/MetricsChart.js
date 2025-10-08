import React from 'react';

const MetricsChart = ({ metrics }) => {
  if (!metrics || Object.keys(metrics).length === 0) {
    return (
      <div className="metrics-chart">
        <h3>Model Metrics Comparison</h3>
        <p>No metrics available yet. Try refreshing or ensure the full dataset is loaded in the backend.</p>
      </div>
    );
  }

  // Prepare data with safeguards (handle undefined/NaN)
  const labels = Object.keys(metrics);
  const safeValue = (val) => (val != null && !isNaN(val) ? val : 0);

  const accuracies = labels.map(label => safeValue(metrics[label].accuracy));
  const precisions = labels.map(label => safeValue(metrics[label].precision));
  const recalls = labels.map(label => safeValue(metrics[label].recall));
  const f1s = labels.map(label => safeValue(metrics[label].f1));
  const rocs = labels.map(label => safeValue(metrics[label].roc_auc));

  const maxAccuracy = Math.max(...accuracies) || 1; // Avoid div by zero

  // Simulate bar chart with CSS (for Accuracy)
  const accuracyBars = labels.map((label, idx) => (
    <div key={idx} className="bar-container">
      <span className="bar-label">{label.replace(/([A-Z])/g, ' $1').trim()}</span> {/* Pretty print model names */}
      <div className="bar-wrapper">
        <div
          className="bar"
          style={{ 
            width: `${(accuracies[idx] / maxAccuracy) * 100}%`, 
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'][idx % 3] 
          }}
        ></div>
      </div>
      <span className="bar-value">{(accuracies[idx] * 100).toFixed(1)}%</span>
    </div>
  ));

  // Format function for table
  const formatMetric = (val) => {
    if (val == null || isNaN(val)) return 'N/A';
    return val.toFixed(3);
  };

  return (
    <div className="metrics-chart">
      <h3>Model Metrics Comparison</h3>
      
      {/* Simulated Accuracy Bar Chart */}
      <div className="chart-section">
        <h4>Accuracy Comparison</h4>
        {maxAccuracy > 0 ? (
          <div className="bars">{accuracyBars}</div>
        ) : (
          <p>No valid accuracy data for chart.</p>
        )}
      </div>

      {/* Full Metrics Table */}
      <div className="table-section">
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1</th>
              <th>ROC-AUC</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((label, idx) => (
              <tr key={idx}>
                <td>{label.replace(/([A-Z])/g, ' $1').trim()}</td> {/* Pretty print */}
                <td>{formatMetric(accuracies[idx])}</td>
                <td>{formatMetric(precisions[idx])}</td>
                <td>{formatMetric(recalls[idx])}</td>
                <td>{formatMetric(f1s[idx])}</td>
                <td>{formatMetric(rocs[idx])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricsChart;