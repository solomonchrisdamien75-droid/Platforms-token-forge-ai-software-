import express from 'express';
import { createToken, getTokenInfo } from '../services/tokenCreator.js';
import config from '../config/index.js';

const router = express.Router();

// Middleware to check wallet configuration
const checkWalletConfig = (req, res, next) => {
  if (!config.backendWallet) {
    return res.status(503).json({
      success: false,
      error: 'Backend wallet not configured',
      message: config.walletError || 'Please run: node backend/generate-backend-wallet.js',
      code: 'WALLET_NOT_CONFIGURED'
    });
  }
  next();
};

// Create a new token
router.post('/create-token', checkWalletConfig, async (req, res) => {
  try {
    const { name, symbol, decimals, revokeAuthorities } = req.body;

    // Validation
    if (!name || !symbol) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Name and symbol are required',
        code: 'VALIDATION_ERROR'
      });
    }

    if (name.length > 32 || symbol.length > 10) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Name must be ≤32 chars, symbol must be ≤10 chars',
        code: 'VALIDATION_ERROR'
      });
    }

    const decimalsNum = decimals || 6;
    if (decimalsNum < 0 || decimalsNum > 18) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Decimals must be between 0 and 18',
        code: 'VALIDATION_ERROR'
      });
    }

    const result = await createToken({
      name,
      symbol,
      decimals: decimalsNum,
      revokeAuthorities: revokeAuthorities !== false,
    });

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('Token creation error:', error);
    
    // Handle specific errors
    if (error.message.includes('insufficient lamports')) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient balance',
        message: 'Backend wallet does not have enough SOL to create token',
        code: 'INSUFFICIENT_BALANCE'
      });
    }

    if (error.message.includes('Backend wallet not found')) {
      return res.status(503).json({
        success: false,
        error: 'Wallet configuration error',
        message: error.message,
        code: 'WALLET_ERROR'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Token creation failed',
      message: error.message,
      code: 'CREATION_ERROR'
    });
  }
});

// Get token info
router.get('/token-info/:mint', async (req, res) => {
  try {
    const { mint } = req.params;

    if (!mint) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Mint address is required',
        code: 'VALIDATION_ERROR'
      });
    }

    const result = await getTokenInfo(mint);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('Token info error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve token info',
      message: error.message,
      code: 'INFO_ERROR'
    });
  }
});

// Health check endpoint for token service
router.get('/health', (req, res) => {
  const health = {
    success: true,
    service: 'token-service',
    wallet_configured: !!config.backendWallet,
    network: config.network,
    timestamp: new Date().toISOString()
  };

  if (!config.backendWallet) {
    health.warning = config.walletError;
  }

  res.json(health);
});

export default router;
