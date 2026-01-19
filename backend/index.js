import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import tokenRoutes from './routes/token.routes.js';
import { getNetworkName } from './utils/connection.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    network: getNetworkName(),
    port: config.port,
  });
});

// Token routes
app.use('/api', tokenRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📡 Network: ${getNetworkName()}`);
});
