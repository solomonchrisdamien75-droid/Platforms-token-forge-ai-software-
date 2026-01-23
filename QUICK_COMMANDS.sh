#!/bin/bash

# ============================================
# SOLANA TOKEN FORGE - QUICK COMMAND REFERENCE
# ============================================

# 1. START BACKEND
# ============================================
# From project root:
cd backend && npm start
# Backend runs on: http://localhost:3000

# 2. START FRONTEND  
# ============================================
# From project root (in a new terminal):
cd frontend && npm install && npm run dev
# Frontend runs on: http://localhost:5173

# 3. CHECK BACKEND HEALTH
# ============================================
curl http://localhost:3000/health

# 4. CREATE A TOKEN (API Call)
# ============================================
curl -X POST http://localhost:3000/api/tokens/create-token \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Test Token",
    "symbol": "MTT", 
    "decimals": 6,
    "revokeAuthorities": true
  }'

# 5. GENERATE NEW BACKEND WALLET
# ============================================
node backend/generate-backend-wallet.js

# 6. CHECK BACKEND WALLET BALANCE
# ============================================
cd backend && npm run check-balance

# 7. REQUEST DEVNET SOL (If wallet is empty)
# ============================================
# Use: https://faucet.solana.com
# Or run:
solana airdrop 2 9fjZRF3eYxwjwtt5MxEH9q2Es5fuM3U9W859cf4GBv5P --url devnet

# 8. VERIFY ENVIRONMENT VARIABLES
# ============================================
node -e "import 'dotenv/config'; console.log('BACKEND_PUBLIC_KEY:', process.env.BACKEND_PUBLIC_KEY); console.log('SOLANA_NETWORK:', process.env.SOLANA_NETWORK);"

# 9. KILL PROCESS ON PORT 3000 (If stuck)
# ============================================
lsof -i :3000                    # List process
kill -9 <PID>                    # Kill process (replace <PID>)

# 10. RUN TEST SCRIPTS
# ============================================
# Test API endpoint:
node test-api-endpoint.js

# Test direct token creation:
node test-token-creation.js

# ============================================
# ENVIRONMENT VARIABLES (.env)
# ============================================
# BACKEND_PUBLIC_KEY=9fjZRF3eYxwjwtt5MxEH9q2Es5fuM3U9W859cf4GBv5P
# SOLANA_NETWORK=devnet
# DEVNET_RPC=https://api.devnet.solana.com
# MAINNET_RPC=https://api.mainnet-beta.solana.com
# PORT=3000
# NODE_ENV=development

# ============================================
# IMPORTANT LINKS
# ============================================
# Solana Faucet (for SOL): https://faucet.solana.com
# Solana Explorer Devnet: https://explorer.solana.com/?cluster=devnet
# Your Backend: http://localhost:3000
# Your Frontend: http://localhost:5173
