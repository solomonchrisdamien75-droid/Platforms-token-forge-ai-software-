import { Keypair } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate a new keypair for the backend
const keypair = Keypair.generate();

const publicKey = keypair.publicKey.toBase58();
const secretKey = Buffer.from(keypair.secretKey).toString('base64');

// Save the keypair to backend-wallet.json
const walletPath = path.join(__dirname, 'backend-wallet.json');
const walletData = {
  publicKey: publicKey,
  secretKey: secretKey,
  createdAt: new Date().toISOString(),
};

fs.writeFileSync(walletPath, JSON.stringify(walletData, null, 2));

console.log('🔑 Backend Wallet Generated');
console.log('━'.repeat(50));
console.log(`Public Key: ${publicKey}`);
console.log('━'.repeat(50));
console.log('\n✅ Wallet saved to: backend/backend-wallet.json');
console.log('\n✅ Add this to your ROOT .env file:\n');
console.log(`BACKEND_PUBLIC_KEY=${publicKey}`);
console.log('\n⚠️  IMPORTANT:');
console.log('   - backend-wallet.json is in .gitignore (DO NOT COMMIT)');
console.log('   - Never share the secret key');
console.log('   - Fund this wallet with Devnet SOL from https://faucet.solana.com');
console.log('   - For production, use a secure key management system');
