const app = require('../server');
const connectDB = require('../config/db');

let isConnected = false;

module.exports = async (req, res) => {
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
