#!/usr/bin/env node

/**
 * Test Token Creation via API Endpoint
 * This script sends a POST request to the backend API to create a token
 */

async function testTokenCreationAPI() {
  const baseURL = 'http://localhost:3000';
  
  console.log('🚀 Testing Token Creation via API\n');
  console.log(`📡 Backend URL: ${baseURL}\n`);

  // First, check health
  console.log('1️⃣  Checking backend health...');
  try {
    const healthResponse = await fetch(`${baseURL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Backend is healthy:', healthData);
    console.log('');
  } catch (error) {
    console.error('❌ Backend is not responding:', error.message);
    console.log('   Make sure the backend is running: cd backend && npm start');
    process.exit(1);
  }

  // Create a token
  console.log('2️⃣  Creating a test token...\n');
  
  const tokenPayload = {
    name: 'API Test Token',
    symbol: 'ATT',
    decimals: 6,
    revokeAuthorities: true,
  };

  console.log('Payload:', JSON.stringify(tokenPayload, null, 2));
  console.log('');

  try {
    const response = await fetch(`${baseURL}/api/tokens/create-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenPayload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Token Created Successfully!\n');
      console.log('Response:', JSON.stringify(data, null, 2));
      
      if (data.tokenMint) {
        console.log(`\n🎉 Your Token Mint Address: ${data.tokenMint}`);
        console.log(`📍 View on Solana Explorer: https://explorer.solana.com/address/${data.tokenMint}?cluster=devnet`);
      }
    } else {
      console.error('❌ Token Creation Failed\n');
      console.error('Response:', JSON.stringify(data, null, 2));
      
      if (data.code === 'WALLET_NOT_CONFIGURED') {
        console.log('\n⚠️  Backend wallet is not configured.');
        console.log('   Run: node backend/generate-backend-wallet.js');
      } else if (data.code === 'INSUFFICIENT_BALANCE') {
        console.log('\n⚠️  Backend wallet has insufficient SOL.');
        console.log('   Request SOL from: https://faucet.solana.com');
      }
    }
  } catch (error) {
    console.error('❌ API Request Error:', error.message);
    process.exit(1);
  }
}

testTokenCreationAPI();
