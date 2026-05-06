const app = require('../server');
const connectDB = require('../config/db');

let isConnected = false;

module.exports = async (req, res) => {
  const configuredOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    process.env.SITE_URL,
    ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',').map((v) => v.trim()) : []),
  ].filter(Boolean);

  const requestOrigin = req.headers.origin;
  const allowOrigin = configuredOrigins.includes(requestOrigin)
    ? requestOrigin
    : (process.env.SITE_URL || configuredOrigins[0] || '*');

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      return res.status(503).json({
        success: false,
        message: 'Database connection failed',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Service unavailable',
      });
    }
  }

  return app(req, res);
};
