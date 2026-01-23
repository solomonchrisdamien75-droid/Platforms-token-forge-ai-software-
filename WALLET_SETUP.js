#!/usr/bin/env node

/**
 * SETUP GUIDE
 * 
 * This file guides you through setting up the backend wallet.
 * 
 * STEP 1: Generate Backend Wallet
 * --------------------------------
 * Run this command ONCE (from backend directory):
 *   node generate-backend-wallet.js
 * 
 * This will:
 * ✅ Create backend/backend-wallet.json
 * ✅ Print your PUBLIC_KEY to console
 * ✅ Automatically save secret key in the JSON file
 * 
 * STEP 2: Copy Public Key to ROOT .env
 * -------------------------------------
 * Look for output: "Public Key: your_key_here"
 * 
 * Open ROOT .env file (not backend/.env) and add:
 *   BACKEND_PUBLIC_KEY=your_key_here
 * 
 * STEP 3: Fund Wallet with Devnet SOL
 * ------------------------------------
 * Option A (Recommended):
 *   - Go to: https://faucet.solana.com
 *   - Paste your BACKEND_PUBLIC_KEY
 *   - Request SOL
 * 
 * Option B:
 *   - Use Phantom Wallet on Devnet
 *   - Send 1-2 SOL to your BACKEND_PUBLIC_KEY
 * 
 * STEP 4: Verify Setup
 * --------------------
 * Check that backend/backend-wallet.json exists and contains:
 * {
 *   "publicKey": "your_key",
 *   "secretKey": "base64_encoded_secret",
 *   "createdAt": "timestamp"
 * }
 * 
 * DONE! ✅
 * 
 * The backend can now:
 * - Sign token creation transactions
 * - Pay for network fees and rent
 * - Revoke token authorities
 */

console.log(`
╔════════════════════════════════════════════════════════════╗
║         SOLANA TOKEN FORGE - BACKEND WALLET SETUP          ║
╚════════════════════════════════════════════════════════════╝

📋 SETUP CHECKLIST:

  1. Run: node generate-backend-wallet.js
     ↓
  2. Copy PUBLIC_KEY output
     ↓
  3. Paste into ROOT .env as BACKEND_PUBLIC_KEY=
     ↓
  4. Fund wallet at faucet.solana.com
     ↓
  5. Backend is ready! ✅

═══════════════════════════════════════════════════════════════

⚠️  IMPORTANT REMINDERS:

  ❌ Don't share your secret key
  ❌ Don't commit backend-wallet.json
  ❌ Don't put secret in frontend code
  ✅ Keep backend-wallet.json secure
  ✅ Use .gitignore (already configured)

═══════════════════════════════════════════════════════════════
`);
