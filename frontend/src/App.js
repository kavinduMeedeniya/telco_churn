import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Dashboard from './components/Dashboard';  // Uncomment if using
import Predictor from './components/Predictor';
import './styles/App.css';
import ChurnPredict from './components/ChurnPredict';
import ChurnPredictCaseStudy from './components/ChurnPredictCaseStudy';

function App() {
  const [exploreData, setExploreData] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded backend URL (your Render backend)
  const API_BASE = 'https://telco-churn-0q8x.onrender.com';

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
      setMetrics(response.data.metrics);
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
        {/* Dashboard for exploreData & metrics viz—uncomment if ready */}
        {/* <Dashboard exploreData={exploreData} metrics={metrics} /> */}

        <ChurnPredict exploreData={exploreData} />  {/* Pass if component uses it */}
        
        <Predictor metrics={metrics} />  {/* Pass if component uses it */}

        <ChurnPredictCaseStudy />
      </main>
    </div>
  );
}

export default App;