import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './shared/Navbar';
import LandingPage from './components/LandingPage';
import Customers from './components/Customers';
import Films from './components/Films';

function App() {
  // const [healthStatus, setHealthStatus] = useState(null);

  // // REST GET call to database endpoint
  // const checkHealth = () => {
  //   fetch('http://localhost:8000/health-check')
  //     .then(response => response.json())
  //     .then(data => setHealthStatus(data.status))
  //     .catch(error => console.error('Health check failed:', error));
  // };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/films" element={<Films />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </Router>
  );
}


export default App;