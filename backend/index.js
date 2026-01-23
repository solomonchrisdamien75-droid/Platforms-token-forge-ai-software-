import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tokenRoutes from "./routes/token.routes.js";

dotenv.config();

const app = express();

// CORS Configuration - Restrict to specific origins
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    network: process.env.SOLANA_NETWORK || "devnet"
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 Solana Token Forge Backend is running");
});

// Token routes
app.use("/api/tokens", tokenRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal server error"
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`📡 Network: ${process.env.SOLANA_NETWORK || 'devnet'}`);
  console.log(`🔐 CORS enabled for localhost origins`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
