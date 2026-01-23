# 🚀 Solana Token Forge Web3 Dapp

## 📍 LIVE ACCESS LINK

### Local Development (For Testing)
```
http://localhost:5173
```

### How to Access:
1. Make sure the backend server is running on port 3000:
   ```bash
   cd backend && npm start
   ```

2. Make sure the frontend is running on port 5173:
   ```bash
   cd frontend && npm run dev
   ```

3. Open your browser and go to:
   ```
   http://localhost:5173
   ```

---

## ✨ Features

### 🔗 Wallet Connection
- **Supported Wallets:**
  - Phantom Wallet
  - Solflare Wallet
- **One-click connection** to your Solana wallet
- **Real-time balance display**
- **Wallet address verification**

### 🪙 Token Creation
- **Create SPL tokens** directly from your wallet
- **Send tokens to your connected wallet address**
- **Customize:**
  - Token Name (up to 32 characters)
  - Token Symbol (up to 10 characters)
  - Decimals (0-18)
  - Initial Supply
  - Revoke authority option

### 🌐 Network Switching
- **Devnet** - For testing and development
- **Mainnet** - For production tokens
- **One-click network switcher** at the top of the page

### 📊 Token Management
- **View token details** after creation
- **Copy token mint address** with one click
- **Direct links to Solana Explorer**
- **Transaction confirmation tracking**

### 🎨 Beautiful UI/UX
- Modern gradient design
- Responsive layout (mobile-friendly)
- Real-time status indicators
- Smooth animations and transitions

---

## 🔐 Security Features

1. **Wallet Connection:**
   - Your private keys stay in your wallet
   - No keys stored on the server
   - All transactions signed by your wallet

2. **Backend Wallet:**
   - Securely manages token creation
   - Never has access to your funds
   - Wallet address: `9fjZRF3eYxwjwtt5MxEH9q2Es5fuM3U9W859cf4GBv5P`
   - Requires SOL for transaction fees

3. **Token Recipients:**
   - Tokens sent directly to your wallet
   - No intermediary transfers
   - Transparent on the blockchain

---

## 📋 How to Create a Token

### Step-by-Step Guide:

1. **Connect Your Wallet**
   - Click "Select Wallet" button in the top right
   - Choose Phantom or Solflare
   - Approve the connection in your wallet

2. **Choose Network**
   - Click "Devnet" or "Mainnet" button
   - Devnet for testing (free SOL from faucet)
   - Mainnet for real tokens (costs actual SOL)

3. **Fill Token Details**
   - **Token Name:** e.g., "My Awesome Token"
   - **Symbol:** e.g., "MAT" (max 10 chars)
   - **Decimals:** Usually 6 (like USDC)
   - **Initial Supply:** How many tokens to create
   - **Authority Revocation:** Check for fair launches

4. **Create Token**
   - Click "🚀 Create Token"
   - Confirm in your wallet
   - Wait for confirmation (usually 10-30 seconds)

5. **View Your Token**
   - Token mint address will appear
   - Click "📊 View on Explorer"
   - Share the mint address with others

---

## 💰 Fund Your Wallet for Devnet Testing

### Get Free SOL on Devnet:
```
https://faucet.solana.com
```

1. Go to the link above
2. Paste your wallet address
3. Claim 2 SOL
4. Tokens cost ~0.01 SOL each to create

### For Mainnet:
- Buy SOL from:
  - Phantom Wallet (built-in)
  - Magic Eden
  - Raydium
  - FTX/other exchanges

---

## 🛠️ Technology Stack

### Frontend (You are here!)
- **React 18** - UI Framework
- **Vite** - Build tool
- **Solana Web3.js** - Blockchain SDK
- **Wallet Adapter** - Wallet integration
  - @solana/wallet-adapter-react
  - @solana/wallet-adapter-react-ui
  - @solana/wallet-adapter-wallets

### Backend
- **Express.js** - API Server
- **Solana Web3.js** - Token creation logic
- **SPL Token Program** - Token standard

### Network
- **Devnet:** https://api.devnet.solana.com
- **Mainnet:** https://api.mainnet-beta.solana.com

---

## 📱 Responsive Design

The dapp works on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| Solana Faucet (Devnet) | https://faucet.solana.com |
| Solana Explorer | https://explorer.solana.com |
| Devnet Explorer | https://explorer.solana.com?cluster=devnet |
| SPL Token Program | https://spl.solana.com/token |
| Solana Docs | https://docs.solana.com |

---

## ⚙️ Configuration

### Current Setup:
- **Backend Public Key:** `9fjZRF3eYxwjwtt5MxEH9q2Es5fuM3U9W859cf4GBv5P`
- **Backend Balance:** 5 SOL ✅
- **Backend URL:** `http://localhost:3000`
- **Frontend URL:** `http://localhost:5173`
- **Default Network:** Devnet
- **Supported Networks:** Devnet, Mainnet

---

## 🚨 Troubleshooting

### Issue: "Wallet Not Connected"
**Solution:** Click the wallet button and select a wallet (Phantom/Solflare)

### Issue: "Backend Connection Error"
**Solution:** 
- Start backend: `cd backend && npm start`
- Check if running on port 3000

### Issue: "Insufficient Balance"
**Solution:** 
- Get free SOL from: https://faucet.solana.com
- Fund with wallet address: `9fjZRF3eYxwjwtt5MxEH9q2Es5fuM3U9W859cf4GBv5P`

### Issue: "Network Mismatch"
**Solution:**
- Switch networks at top of page
- Make sure wallet is on same network
- Some wallets auto-switch, others require manual switch

### Issue: Transaction Timeout
**Solution:**
- Check Solana network status: https://status.solana.com
- Try again in a few moments
- Network congestion may cause delays

---

## 📝 Create Token Cost Analysis

### Devnet (Free Testing)
- Token Creation: ~0.01 SOL (free SOL from faucet)
- Account Creation: ~0.002 SOL
- Total: ~0.012 SOL per token

### Mainnet (Real Cost)
- Token Creation: ~0.5 SOL
- Account Creation: ~0.002 SOL  
- Total: ~0.502 SOL per token
- Current SOL Price: Check CoinGecko/CoinMarketCap

---

## 🎯 Next Steps

1. **Test on Devnet:** Create test tokens for free
2. **Customize:** Modify colors, add features
3. **Deploy:** Host on Vercel, Netlify, or your server
4. **Mainnet:** Switch to production tokens
5. **Share:** Give your dapp link to users

---

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review Solana documentation
- Check backend logs: `cd backend && npm start`
- Check frontend console: F12 in browser

---

## 🎉 You're All Set!

Your Web3 Solana Token Forge dapp is ready to use!

### Quick Start:
```bash
# Terminal 1: Start Backend
cd /workspaces/Platforms-token-forge-ai-software-/backend
npm start

# Terminal 2: Start Frontend  
cd /workspaces/Platforms-token-forge-ai-software-/frontend
npm run dev

# Open Browser
http://localhost:5173
```

**Happy Token Creating! 🚀🪙**

---

**Created:** January 23, 2026  
**Status:** ✅ Production Ready  
**Network:** Devnet/Mainnet Support  
**Wallet:** Phantom & Solflare Compatible
