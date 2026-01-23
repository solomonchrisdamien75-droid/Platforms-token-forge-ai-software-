# Deploy to Vercel (Free)

## Quick Setup (2 minutes)

### Step 1: Push to GitHub
```bash
cd /workspaces/Platforms-token-forge-ai-software-
git add .
git commit -m "Add Web3 Solana Token Forge dapp"
git push origin main
```

### Step 2: Deploy Frontend to Vercel
1. Go to: https://vercel.com/new
2. Import your GitHub repository
3. Click "Deploy"
4. Done! You get a live URL

### Step 3: Deploy Backend to Render (Free)
1. Go to: https://render.com
2. Create account
3. Click "New +"
4. Select "Web Service"
5. Connect your GitHub repo
6. Select `backend` folder
7. Deploy

### Step 4: Update Frontend
Change API endpoint in `frontend/src/components/CreateTokenForm.jsx`:
```javascript
// Old:
const backendUrl = 'http://localhost:3000';

// New:
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://your-backend-url.onrender.com';
```

### Step 5: Add Environment Variable in Vercel
1. Go to Vercel Project Settings
2. Add: `REACT_APP_BACKEND_URL` = `https://your-backend-url.onrender.com`
3. Redeploy

---

## Result
✅ Frontend: `https://your-app.vercel.app`  
✅ Backend: `https://your-backend.onrender.com`  
✅ Works globally  
✅ Mobile friendly  
✅ Always online  

---

## Alternative: Deploy Everything at Once

Use this script to deploy both:

```bash
# Build frontend
cd frontend
npm run build

# Deploy to Vercel
vercel --prod

# You'll get a live URL instantly!
```

---

**Cost:** FREE forever  
**Setup Time:** ~5 minutes  
**Result:** Live, production-ready dapp  

Ready? I can help with the exact steps!
