import React, { useState } from 'react';

function App() {
  const [healthStatus, setHealthStatus] = useState(null);

  // REST GET call to database endpoint
  const checkHealth = () => {
    fetch('http://localhost:8000/health-check')
      .then(response => response.json())
      .then(data => setHealthStatus(data.status))
      .catch(error => console.error('Health check failed:', error));
  };

  return (
    <div>
      <button onClick={checkHealth}>Check Health</button>
      {healthStatus && <p>Health status: {healthStatus}</p>}
    </div>
  );
}

export default App;
