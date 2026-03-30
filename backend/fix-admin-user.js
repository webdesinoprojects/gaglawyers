require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const fixAdminUser = async () => {
  try {
    console.log('\n🔧 Fixing Admin User...\n');
    
    await connectDB();
    
    // Find the admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gaglawyers.com';
    const adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found!');
      console.log(`   Looking for: ${adminEmail}`);
      console.log('\n💡 Run "npm run seed" to create the admin user first.\n');
      process.exit(1);
    }
    
    console.log('✓ Found admin user:', adminUser.email);
    console.log('  Current status:');
    console.log(`    - Name: ${adminUser.name}`);
    console.log(`    - Role: ${adminUser.role}`);
    console.log(`    - Active: ${adminUser.isActive}`);
    console.log(`    - Created: ${adminUser.createdAt}`);
    
    // Update the user to ensure isActive is true
    adminUser.isActive = true;
    await adminUser.save();
    
    console.log('\n✅ Admin user fixed successfully!');
    console.log('  Updated status:');
    console.log(`    - Active: ${adminUser.isActive}`);
    console.log(`    - Role: ${adminUser.role}`);
    
    console.log('\n✅ You can now upload images from the admin panel.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing admin user:', error);
    process.exit(1);
  }
};

fixAdminUser();
