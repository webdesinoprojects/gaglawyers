const connectDB = require('../config/db');
const User = require('../models/User');

module.exports = async (req, res) => {
  try {
    await connectDB();
    
    const userCount = await User.countDocuments();
    const adminUser = await User.findOne({ email: 'admin@gaglawyers.com' });
    
    res.json({
      success: true,
      database: {
        connected: true,
        name: 'gaglawyers',
      },
      users: {
        total: userCount,
        adminExists: !!adminUser,
        adminEmail: adminUser ? adminUser.email : null,
      },
      message: userCount === 0 ? 'Database is empty - run seed script' : 'Database has data',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Database connection failed',
    });
  }
};
