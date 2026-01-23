# Website Crash Root Cause Analysis

## Critical Issues Found (No Commands Run)

### 🔴 **ISSUE 1: Missing Backend Wallet**
**Location:** `backend/config/index.js` & `backend/backend-wallet.json`

**Problem:**
- The backend requires `backend-wallet.json` to exist
- If missing, the config loads with `walletError` set
- When token creation is attempted, it will crash with: `Backend wallet not found. Please run: npm run generate-wallet`

**Impact:** Website crashes when trying to create tokens

**Solution:** Generate the wallet using:
```bash
node backend/generate-backend-wallet.js
```

---

### 🔴 **ISSUE 2: Missing Environment Variables**
**Location:** `.env` file (not found in workspace)

**Problem:**
- `.env.example` only has: `BACKEND_PUBLIC_KEY=` (empty)
- No `SOLANA_NETWORK`, `DEVNET_RPC`, or `MAINNET_RPC` defined
- Falls back to defaults, but unreliable

**Solution:** Create `.env` file with:
```env
SOLANA_NETWORK=devnet
DEVNET_RPC=https://api.devnet.solana.com
MAINNET_RPC=https://api.mainnet-beta.solana.com
PORT=3000
BACKEND_PUBLIC_KEY=your-public-key-here
```

---

### 🟡 **ISSUE 3: Port Conflicts**
**Problem:**
- Backend runs on port 3000 (default)
- Frontend runs on port 5173 (default)
- If either port is in use, the dev server won't start

**Solution:** Set PORT env variable to different port if needed:
```env
PORT=3001
```

---

### 🟡 **ISSUE 4: Missing Wallet File Check**
**Location:** `backend/index.js` & `backend/services/tokenCreator.js`

**Problem:**
- No error handling for when wallet doesn't exist
- Token creation endpoint will crash without proper error response

**Recommendation:** Add try-catch in token routes

---

### 🟡 **ISSUE 5: No CORS Origin Validation**
**Location:** `backend/index.js` (line 9)

**Problem:**
```javascript
app.use(cors()); // Allows ALL origins - security risk
```

**Solution:** Configure CORS properly:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

---

## Files That Need Attention

| File | Status | Issue |
|------|--------|-------|
| `.env` | ❌ Missing | Environment variables not configured |
| `backend/backend-wallet.json` | ❌ Missing | Wallet not generated |
| `backend/index.js` | ⚠️ Warning | No error handling for missing wallet |
| `frontend/src/App.jsx` | ⚠️ Check | May have API endpoint issues |
| `backend/routes/token.routes.js` | ⚠️ Check | Likely crashes on token creation |

---

## Why Website Crashes When Running Terminal Commands

1. **Resource Contention:** Terminal commands consume CPU/memory needed by dev server
2. **Port Conflicts:** Commands may occupy ports 3000 or 5173
3. **File System Locking:** Node modules or wallet files get locked by multiple processes
4. **Missing Wallet:** Token API endpoints have no error handling

---

## Quick Fix Checklist (Without Running Commands)

- [ ] Copy `.env.example` to `.env` and fill in values
- [ ] Check if `backend-wallet.json` exists
- [ ] Review `backend/routes/token.routes.js` for error handling
- [ ] Check `frontend/src/App.jsx` for API endpoint configuration
- [ ] Verify both ports (3000, 5173) are free before starting dev

