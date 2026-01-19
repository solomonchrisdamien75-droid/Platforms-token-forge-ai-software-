import express from 'express';
import { createToken, getTokenInfo } from '../services/tokenCreator.js';

const router = express.Router();

// Create a new token
router.post('/create-token', async (req, res) => {
  try {
    const { name, symbol, decimals, revokeAuthorities } = req.body;

    if (!name || !symbol) {
      return res.status(400).json({
        success: false,
        error: 'Name and symbol are required',
      });
    }

    const result = await createToken({
      name,
      symbol,
      decimals: decimals || 6,
      revokeAuthorities: revokeAuthorities !== false, // Default to true
    });

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get token info
router.get('/token-info/:mint', async (req, res) => {
  try {
    const { mint } = req.params;

    const result = await getTokenInfo(mint);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
