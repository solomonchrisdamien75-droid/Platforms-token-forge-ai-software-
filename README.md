# 🪙 Solana Token Forge

A complete, production-ready Solana token creation platform with backend and frontend support for devnet/mainnet switching, wallet integration, and ALL three authority revocations.

## Features

✅ **Complete Token Creation**
- Create SPL tokens with custom name, symbol, and decimals
- Full support for Devnet and Mainnet-Beta networks

✅ **Authority Management**
- Revoke mint authority (prevent additional token minting)
- Revoke freeze authority (allow token transfers)
- Revoke update authority (immutable token metadata)

✅ **Backend (Express.js)**
- RESTful API for token creation
- Health check endpoint with network status
- CORS enabled for frontend communication
- ES Modules (import/export only)
- Environment-based configuration

✅ **Frontend (React + Vite)**
- Modern, responsive UI with Tailwind-inspired design
- Real-time backend connectivity status
- Network switching (devnet/mainnet)
- Token creation form with instant feedback
- Transaction signature and mint address display

✅ **Security**
- Backend wallet support with environment variables
- No private keys in code
- Secure wallet generation script

## Project Structure

```
.
├── backend/                      # Express server
│   ├── config/index.js          # Configuration management
│   ├── routes/token.routes.js   # API endpoints
│   ├── services/
│   │   ├── tokenCreator.js      # Token creation logic
│   │   └── authorityManager.js  # Authority revocation
│   ├── utils/connection.js      # Solana connection setup
│   ├── index.js                 # Server entry point
│   ├── generate-backend-wallet.js # Wallet generation tool
│   ├── package.json
│   └── .env.example
│
├── frontend/                     # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   └── CreateTokenForm.jsx
│   │   ├── utils/solana.js      # Solana utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── package.json                  # Root scripts
├── .env.example                  # Root env template
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Solana CLI (optional)
- A Solana wallet (Phantom recommended)

### Installation

```bash
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
npm run generate-wallet
```

Then create `.env` file in root with:
```
BACKEND_PUBLIC_KEY=<from generate-wallet output>
```

## Running the Application

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

## API Endpoints

### Health Check
```
GET /health
```

### Create Token
```
POST /api/create-token
{
  "name": "My Token",
  "symbol": "MTK",
  "decimals": 6,
  "revokeAuthorities": true
}
```

### Get Token Info
```
GET /api/token-info/:mintAddress
```

## Environment Variables

**Root `.env`**
```
BACKEND_PUBLIC_KEY=YourPublicKeyHere
```

**Backend `.env`**
```
PORT=3000
SOLANA_NETWORK=devnet
DEVNET_RPC=https://api.devnet.solana.com
MAINNET_RPC=https://api.mainnet-beta.solana.com
```

**Frontend `.env`**
```
VITE_BACKEND_URL=http://localhost:3000
VITE_SOLANA_NETWORK=devnet
```

## Network Switching

Update both backend and frontend `.env` files:
- Backend: `SOLANA_NETWORK=mainnet`
- Frontend: `VITE_SOLANA_NETWORK=mainnet`

Then restart both servers.

## Authority Revocation Details

1. **Mint Authority** - Prevents minting new tokens. Supply becomes immutable.
2. **Freeze Authority** - Revokes ability to freeze accounts. Tokens freely transferable.
3. **Update Authority** - Makes token metadata immutable.

## Technologies

- **Backend**: Express.js, @solana/web3.js, @solana/spl-token
- **Frontend**: React 18, Vite
- **Network**: Solana Devnet & Mainnet-Beta

## Security Notes

⚠️ **IMPORTANT**
- Never commit `.env` files with real private keys
- Use hardware wallets for mainnet operations
- Always test on devnet first
- Keep your backend wallet seed phrase secure

## License

MIT

---

**Built with ❤️ using Solana Web3.js** 
