#!/usr/bin/env node

import 'dotenv/config';
import { createToken } from './backend/services/tokenCreator.js';

async function testTokenCreation() {
  console.log('🚀 Starting Token Creation Test\n');
  console.log('📋 Configuration:');
  console.log(`   Network: ${process.env.SOLANA_NETWORK || 'devnet'}`);
  console.log(`   RPC: ${process.env.DEVNET_RPC || 'https://api.devnet.solana.com'}`);
  console.log(`   Backend Public Key: ${process.env.BACKEND_PUBLIC_KEY}\n`);

  try {
    console.log('⏳ Creating token...\n');
    
    const tokenData = {
      name: 'Test Dev Token',
      symbol: 'TDT',
      decimals: 6,
      revokeAuthorities: true,
    };

    console.log('Token Data:', tokenData);
    console.log('');

    const result = await createToken(tokenData);

    console.log('✅ Token Created Successfully!\n');
    console.log('📊 Result:');
    console.log(JSON.stringify(result, null, 2));

    if (result.tokenMint) {
      console.log(`\n🎉 Your Token Mint Address: ${result.tokenMint}`);
      console.log(`📍 View on Solana Explorer: https://explorer.solana.com/address/${result.tokenMint}?cluster=devnet`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nFull Error:');
    console.error(error);
    process.exit(1);
  }
}

testTokenCreation();
