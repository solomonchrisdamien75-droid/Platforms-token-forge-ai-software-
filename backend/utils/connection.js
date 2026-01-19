import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import config from '../config/index.js';

export const getConnection = () => {
  const network = config.network === 'mainnet' ? 'mainnet-beta' : config.network;
  const rpcUrl = config.network === 'mainnet' 
    ? config.rpc.mainnet 
    : config.rpc.devnet;
  
  return new Connection(rpcUrl, 'confirmed');
};

export const getNetworkName = () => {
  return config.network === 'mainnet' ? 'mainnet-beta' : config.network;
};
