import React, { useState, useEffect, useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import * as web3 from '@solana/web3.js';
import CreateTokenForm from './components/CreateTokenForm';
import './App.css';
import '@solana/wallet-adapter-react-ui/styles.css';

// Get wallet adapters
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

const WalletContent = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [backendStatus, setBackendStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [network, setNetwork] = useState('devnet');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`http://localhost:3000/health`);
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

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey && connection) {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / web3.LAMPORTS_PER_SOL);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    if (connected) {
      getBalance();
      const interval = setInterval(getBalance, 5000);
      return () => clearInterval(interval);
    }
  }, [publicKey, connection, connected]);

  const handleNetworkSwitch = (newNetwork) => {
    setNetwork(newNetwork);
    window.location.reload();
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <div className="header-title">
            <h1>🪙 Solana Token Forge</h1>
            <p className="subtitle">Create SPL tokens and send them directly to your wallet</p>
          </div>
          <WalletMultiButton className="wallet-button" />
        </div>

        <div className="network-switcher">
          <span className="network-label">Network:</span>
          <button 
            className={`network-btn ${network === 'devnet' ? 'active' : ''}`}
            onClick={() => handleNetworkSwitch('devnet')}
          >
            Devnet
          </button>
          <button 
            className={`network-btn ${network === 'mainnet' ? 'active' : ''}`}
            onClick={() => handleNetworkSwitch('mainnet')}
          >
            Mainnet
          </button>
        </div>
      </header>

      <div className="status-bar">
        <div className="status-item">
          <span className="label">Network:</span>
          <span className="value">{network}</span>
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
        {connected && publicKey && (
          <>
            <div className="status-item">
              <span className="label">Wallet:</span>
              <span className="value wallet-addr">{publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}</span>
            </div>
            <div className="status-item">
              <span className="label">Balance:</span>
              <span className="value balance">{balance ? balance.toFixed(4) : 'Loading...'} SOL</span>
            </div>
          </>
        )}
      </div>

      <main className="container">
        {!connected ? (
          <div className="connect-wallet-prompt">
            <div className="prompt-content">
              <h2>🔗 Connect Your Wallet</h2>
              <p>Connect your Solana wallet to create and receive tokens</p>
              <p className="network-info">Current Network: <strong>{network}</strong></p>
            </div>
          </div>
        ) : backendStatus?.error ? (
          <div className="error-banner">
            <h2>⚠️ Backend Connection Error</h2>
            <p>Could not connect to the backend server. Make sure it's running.</p>
          </div>
        ) : (
          <CreateTokenForm 
            walletAddress={publicKey?.toBase58()} 
            network={network}
            backendStatus={backendStatus}
          />
        )}
      </main>

      <footer className="footer">
        <p>🚀 Solana Token Forge • Devnet/Mainnet Support • Web3 Enabled</p>
      </footer>
    </div>
  );
};

const networks = {
  devnet: 'https://api.devnet.solana.com',
  mainnet: 'https://api.mainnet-beta.solana.com',
};

function App() {
  const network = localStorage.getItem('solana-network') || 'devnet';
  const rpcEndpoint = networks[network] || networks.devnet;

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={rpcEndpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
