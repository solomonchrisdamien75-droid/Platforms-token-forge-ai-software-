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

console.log('🔑 Backend Wallet Generated');
console.log('━'.repeat(50));
console.log(`Public Key: ${publicKey}`);
console.log('━'.repeat(50));
console.log('\n✅ Add this to your .env file:\n');
console.log(`BACKEND_PUBLIC_KEY=${publicKey}`);
console.log('\n⚠️  IMPORTANT:');
console.log('   - Save your secret key in a secure location');
console.log('   - Never commit the secret key to version control');
console.log('   - For production, use a secure key management system');
console.log('\n📝 Secret Key (base64):');
console.log(secretKey);
