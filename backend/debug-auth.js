require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const debugAuth = async () => {
  try {
    console.log('\n🔍 Debugging Authentication...\n');
    
    await connectDB();
    
    // Find admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gaglawyers.com';
    const adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found!');
      process.exit(1);
    }
    
    console.log('✓ Admin User Found:');
    console.log(`  - ID: ${adminUser._id}`);
    console.log(`  - Name: ${adminUser.name}`);
    console.log(`  - Email: ${adminUser.email}`);
    console.log(`  - Role: ${adminUser.role}`);
    console.log(`  - Active: ${adminUser.isActive}`);
    console.log(`  - Created: ${adminUser.createdAt}`);
    
    // Generate a test token
    const testToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    
    console.log('\n✓ Test Token Generated:');
    console.log(`  ${testToken.substring(0, 50)}...`);
    
    // Verify the token
    try {
      const decoded = jwt.verify(testToken, process.env.JWT_SECRET);
      console.log('\n✓ Token Verification:');
      console.log(`  - User ID: ${decoded.id}`);
      console.log(`  - Expires: ${new Date(decoded.exp * 1000).toLocaleString()}`);
      
      // Try to fetch user with decoded ID
      const userFromToken = await User.findById(decoded.id).select('-password');
      
      if (userFromToken && userFromToken.isActive) {
        console.log('\n✅ Authentication Flow Working!');
        console.log('  - User found from token: ✓');
        console.log('  - User is active: ✓');
        console.log('  - Token is valid: ✓');
      } else if (!userFromToken) {
        console.log('\n❌ User not found from token ID');
      } else if (!userFromToken.isActive) {
        console.log('\n❌ User is not active');
      }
    } catch (err) {
      console.log('\n❌ Token verification failed:', err.message);
    }
    
    console.log('\n📋 Next Steps:');
    console.log('  1. Logout from admin panel');
    console.log('  2. Clear browser localStorage (F12 → Application → Clear Storage)');
    console.log('  3. Login again with: admin@gaglawyers.com / admin123');
    console.log('  4. Try uploading image again\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

debugAuth();
