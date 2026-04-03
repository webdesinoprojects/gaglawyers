const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔑 Token received (first 20 chars):', token.substring(0, 20));
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token verified, user ID:', decoded.id);
      
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        console.log('❌ User not found in database');
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found',
        });
      }
      
      if (!req.user.isActive) {
        console.log('❌ User is inactive');
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user is inactive',
        });
      }
      
      console.log('✅ User authenticated:', req.user.email);
      next();
    } catch (error) {
      console.log('❌ Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed - ' + error.message,
      });
    }
  } else {
    console.log('❌ No Bearer token found in authorization header');
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'super-admin' || req.user.role === 'sub-admin')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized as admin',
    });
  }
};

const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'super-admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized as super admin',
    });
  }
};

module.exports = { protect, adminOnly, superAdminOnly };
