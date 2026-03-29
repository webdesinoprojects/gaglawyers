const mongoose = require('mongoose');

module.exports = async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: {
      connected: mongoose.connection.readyState === 1,
      state: mongoose.connection.readyState,
    },
    env_check: {
      mongo_uri: !!process.env.MONGO_URI,
      jwt_secret: !!process.env.JWT_SECRET,
      site_url: process.env.SITE_URL || 'not set',
      cloudinary_configured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY),
    },
  };

  const statusCode = health.mongodb.connected ? 200 : 503;
  
  res.status(statusCode).json(health);
};
