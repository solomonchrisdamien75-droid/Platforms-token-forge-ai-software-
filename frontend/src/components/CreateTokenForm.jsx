import React, { useState } from 'react';
import { getBackendUrl, getCurrentNetwork } from '../utils/solana';

export default function CreateTokenForm() {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimals: 6,
    revokeAuthorities: true,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/create-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          symbol: formData.symbol,
          decimals: parseInt(formData.decimals),
          revokeAuthorities: formData.revokeAuthorities,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to create token');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Solana Token</h2>
      <p className="network-info">Network: {getCurrentNetwork()}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Token Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., My Token"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="symbol">Token Symbol *</label>
          <input
            id="symbol"
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            placeholder="e.g., MTK"
            maxLength="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="decimals">Decimals</label>
          <input
            id="decimals"
            type="number"
            name="decimals"
            value={formData.decimals}
            onChange={handleChange}
            min="0"
            max="18"
          />
        </div>

        <div className="form-group checkbox">
          <label htmlFor="revokeAuthorities">
            <input
              id="revokeAuthorities"
              type="checkbox"
              name="revokeAuthorities"
              checked={formData.revokeAuthorities}
              onChange={handleChange}
            />
            Revoke All Authorities (mint, freeze, update)
          </label>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Token'}
        </button>
      </form>

      {error && (
        <div className="error">
          <h3>❌ Error</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="success">
          <h3>✅ Token Created!</h3>
          <p>{result.message}</p>
          <div className="result-details">
            <div className="detail">
              <label>Mint Address:</label>
              <code>{result.mintAddress}</code>
            </div>
            <div className="detail">
              <label>Authorities Revoked:</label>
              <p>{result.authoritiesRevoked ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
