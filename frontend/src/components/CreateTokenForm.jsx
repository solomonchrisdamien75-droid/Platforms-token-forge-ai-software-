import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import '../styles/CreateTokenForm.css';

export default function CreateTokenForm({ walletAddress, network, backendStatus }) {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimals: 6,
    initialSupply: '1000',
    revokeAuthorities: true,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [txStatus, setTxStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : name === 'decimals' || name === 'initialSupply' ? value : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setTxStatus('');

    // Client-side validation
    if (!formData.name.trim()) {
      setError('Token name is required');
      setLoading(false);
      return;
    }

    if (!formData.symbol.trim()) {
      setError('Token symbol is required');
      setLoading(false);
      return;
    }

    if (formData.name.length > 32) {
      setError('Token name must be 32 characters or less');
      setLoading(false);
      return;
    }

    if (formData.symbol.length > 10) {
      setError('Token symbol must be 10 characters or less');
      setLoading(false);
      return;
    }

    const decimals = parseInt(formData.decimals);
    if (decimals < 0 || decimals > 18) {
      setError('Decimals must be between 0 and 18');
      setLoading(false);
      return;
    }

    if (!publicKey) {
      setError('Please connect your wallet first');
      setLoading(false);
      return;
    }

    try {
      setTxStatus('Creating token on the blockchain...');

      const backendUrl = 'http://localhost:3000';
      const url = `${backendUrl}/api/tokens/create-token`;
      
      console.log('Creating token at:', url);
      console.log('Sending to wallet:', publicKey.toBase58());
      
      const payload = {
        name: formData.name,
        symbol: formData.symbol,
        decimals: decimals,
        initialSupply: parseInt(formData.initialSupply) || 1000,
        revokeAuthorities: formData.revokeAuthorities,
        recipientAddress: publicKey.toBase58(), // Send tokens to connected wallet
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.code === 'WALLET_NOT_CONFIGURED') {
          setError('Backend wallet is not configured. The administrator needs to set up the wallet.');
        } else if (data.code === 'INSUFFICIENT_BALANCE') {
          setError('The backend wallet has insufficient SOL to create the token. Please try again later.');
        } else {
          setError(`Error: ${data.message || data.error || 'Failed to create token'}`);
        }
        setLoading(false);
        return;
      }

      // Simulate transaction confirmation
      setTxStatus('Confirming transaction...');
      
      // Wait a bit for blockchain confirmation
      await new Promise(resolve => setTimeout(resolve, 3000));

      setResult({
        success: true,
        tokenMint: data.tokenMint,
        transaction: data.transaction,
        metadata: data.metadata,
      });

      setTxStatus('✅ Token created successfully!');

      // Reset form
      setTimeout(() => {
        setFormData({
          name: '',
          symbol: '',
          decimals: 6,
          initialSupply: '1000',
          revokeAuthorities: true,
        });
      }, 1500);

    } catch (err) {
      console.error('Error:', err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>🎯 Create Token</h2>
        <p className="form-subtitle">Create a new SPL token and send it directly to your wallet</p>

        {walletAddress && (
          <div className="wallet-info">
            <div className="info-badge">
              <span className="label">Your Wallet:</span>
              <span className="address">{walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}</span>
            </div>
            <div className="info-badge">
              <span className="label">Network:</span>
              <span className="network">{network}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {txStatus && (
          <div className="status-message">
            <span className="status-icon">⏳</span>
            <span>{txStatus}</span>
          </div>
        )}

        {result && (
          <div className="success-message">
            <div className="success-header">
              <span className="success-icon">✅</span>
              <h3>Token Created!</h3>
            </div>
            
            <div className="result-details">
              <div className="result-item">
                <span className="result-label">Token Mint:</span>
                <code className="result-value">{result.tokenMint}</code>
                <button 
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(result.tokenMint);
                    alert('Copied to clipboard!');
                  }}
                >
                  📋 Copy
                </button>
              </div>

              {result.metadata && (
                <>
                  <div className="result-item">
                    <span className="result-label">Name:</span>
                    <span className="result-value">{result.metadata.name}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Symbol:</span>
                    <span className="result-value">{result.metadata.symbol}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Decimals:</span>
                    <span className="result-value">{result.metadata.decimals}</span>
                  </div>
                </>
              )}

              {result.transaction && (
                <div className="result-item">
                  <span className="result-label">Transaction:</span>
                  <code className="result-value">{result.transaction.slice(0, 20)}...</code>
                </div>
              )}

              <div className="explorer-links">
                <a 
                  href={`https://explorer.solana.com/address/${result.tokenMint}?cluster=${network}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explorer-link"
                >
                  📊 View on Explorer
                </a>
              </div>
            </div>

            <button 
              className="create-another-btn"
              onClick={() => setResult(null)}
            >
              Create Another Token
            </button>
          </div>
        )}

        {!result && (
          <form onSubmit={handleSubmit} className="token-form">
            <div className="form-group">
              <label htmlFor="name">Token Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., My Awesome Token"
                maxLength="32"
                disabled={loading}
                required
              />
              <span className="char-count">{formData.name.length}/32</span>
            </div>

            <div className="form-group">
              <label htmlFor="symbol">Token Symbol *</label>
              <input
                type="text"
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                placeholder="e.g., MAT"
                maxLength="10"
                disabled={loading}
                required
              />
              <span className="char-count">{formData.symbol.length}/10</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="decimals">Decimals</label>
                <select
                  id="decimals"
                  name="decimals"
                  value={formData.decimals}
                  onChange={handleChange}
                  disabled={loading}
                >
                  {[...Array(19).keys()].map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="initialSupply">Initial Supply</label>
                <input
                  type="number"
                  id="initialSupply"
                  name="initialSupply"
                  value={formData.initialSupply}
                  onChange={handleChange}
                  placeholder="1000"
                  disabled={loading}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="revokeAuthorities">
                <input
                  type="checkbox"
                  id="revokeAuthorities"
                  name="revokeAuthorities"
                  checked={formData.revokeAuthorities}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Revoke Mint & Freeze Authority</span>
              </label>
              <p className="checkbox-hint">
                Makes the token immutable after creation. Recommended for fair launches.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={loading || !walletAddress}
              className="submit-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : (
                <>
                  🚀 Create Token
                </>
              )}
            </button>

            {!walletAddress && (
              <p className="wallet-required">👆 Connect your wallet to create tokens</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
