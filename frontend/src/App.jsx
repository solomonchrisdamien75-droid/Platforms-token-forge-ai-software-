import React, { useState, useEffect } from 'react';
import CreateTokenForm from './components/CreateTokenForm';
import { getCurrentNetwork, getBackendUrl } from './utils/solana';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/health`);
        const data = await response.json();
        setBackendStatus(data);
      } catch (error) {
        console.error('Backend connection error:', error);
        setBackendStatus({ error: 'Cannot connect to backend' });
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>🪙 Solana Token Forge</h1>
        <p className="subtitle">Create and manage SPL tokens with authority revocation</p>
      </header>

      <div className="status-bar">
        <div className="status-item">
          <span className="label">Network:</span>
          <span className="value">{getCurrentNetwork()}</span>
        </div>
        <div className="status-item">
          <span className="label">Backend:</span>
          {loading ? (
            <span className="value loading">Checking...</span>
          ) : backendStatus?.error ? (
            <span className="value error">❌ Offline</span>
          ) : (
            <span className="value success">✅ Online</span>
          )}
        </div>
      </div>

      <main className="container">
        {backendStatus?.error ? (
          <div className="error-banner">
            <h2>⚠️ Backend Connection Error</h2>
            <p>Could not connect to the backend server. Make sure it's running on {getBackendUrl()}</p>
          </div>
        ) : (
          <CreateTokenForm />
        )}
      </main>

      <footer className="footer">
        <p>Built with Solana Web3.js • Devnet/Mainnet Support</p>
      </footer>
    </div>
  );
}

export default App;
