import { PublicKey, Connection } from '@solana/web3.js';

const NETWORK = import.meta.env.VITE_SOLANA_NETWORK || 'devnet';
const RPC_ENDPOINT = {
  devnet: 'https://api.devnet.solana.com',
  mainnet: 'https://api.mainnet-beta.solana.com',
};

export const connection = new Connection(
  RPC_ENDPOINT[NETWORK],
  'confirmed'
);

export const getCurrentNetwork = () => {
  return NETWORK;
};

export const switchNetwork = (network) => {
  // In a real app, this would reload or redirect with new network
  console.log(`Switching to ${network}`);
};

export const getBackendUrl = () => {
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
};

export const isValidPublicKey = (key) => {
  try {
    new PublicKey(key);
    return true;
  } catch {
    return false;
  }
};
