import 'dotenv/config';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

const pubkey = new PublicKey(process.env.BACKEND_PUBLIC_KEY);

const balance = await connection.getBalance(pubkey);

console.log('✅ Backend wallet public key:', pubkey.toBase58());
console.log('💰 Balance:', balance / 1e9, 'SOL');
