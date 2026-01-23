import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root directory
const rootEnvPath = path.resolve(__dirname, '..', '..', '.env');
dotenv.config({ path: rootEnvPath });

// Load backend .env if it exists
const backendEnvPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: backendEnvPath });

// Load backend wallet from file
let backendWallet = null;
let walletError = null;
const walletPath = path.resolve(__dirname, '..', 'backend-wallet.json');

if (fs.existsSync(walletPath)) {
  try {
    const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
    backendWallet = walletData;
  } catch (error) {
    walletError = `Invalid wallet file: ${error.message}`;
  }
} else {
  walletError = 'backend-wallet.json not found. Run: node backend/generate-backend-wallet.js';
}

export default {
  port: process.env.PORT || 3000,
  network: process.env.SOLANA_NETWORK || 'devnet',
  rpc: {
    devnet: process.env.DEVNET_RPC || 'https://api.devnet.solana.com',
    mainnet: process.env.MAINNET_RPC || 'https://api.mainnet-beta.solana.com',
  },
  backendPublicKey: process.env.BACKEND_PUBLIC_KEY,
  backendWallet: backendWallet,
  walletError: walletError,
};
