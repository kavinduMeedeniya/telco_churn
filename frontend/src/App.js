import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import './styles/App.css';
import ChurnPredict from './components/ChurnPredict';
import ChurnPredictCaseStudy from './components/ChurnPredictCaseStudy';

const API_BASE = 'https://telco-churn-0q8x.onrender.com';

function App() {
  const [exploreData, setExploreData] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExplore();
    fetchMetrics();
  }, []);

  const fetchExplore = async () => {
    try {
      const response = await axios.get(`${API_BASE}/explore`);
      setExploreData(response.data);
    } catch (error) {
      console.error('Error fetching explore data:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await axios.post(`${API_BASE}/train`);
      setMetrics(response.data.metrics);  // Fixed: Extract 'metrics' from response.data
      setLoading(false);
    } catch (error) {
      console.error('Error training models:', error);
      setMetrics({});  // Empty fallback
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading models and data...</div>;

  return (
    <div className="App">
      <main>

        <ChurnPredict />
        
        <Predictor />

        <ChurnPredictCaseStudy />
      </main>
    </div>
  );
}

export default App;

//<Dashboard exploreData={exploreData} metrics={metrics} />