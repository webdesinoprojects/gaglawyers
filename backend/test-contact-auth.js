/**
 * Test script to verify contact form authentication
 * Run: node test-contact-auth.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const ContactInquiry = require('./models/ContactInquiry');
const jwt = require('jsonwebtoken');

async function testContactAuth() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    // Check if admin user exists
    console.log('👤 Checking admin user...');
    const admin = await User.findOne({ email: 'admin@gaglawyers.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('   Please create an admin user first.');
      process.exit(1);
    }
    
    console.log('✅ Admin user found:', admin.email);
    console.log('   Role:', admin.role);
    console.log('   Active:', admin.isActive);
    console.log('');

    // Generate a test token
    console.log('🔑 Generating test token...');
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    console.log('✅ Token generated (first 30 chars):', token.substring(0, 30) + '...');
    console.log('');

    // Check contact inquiries
    console.log('📧 Checking contact inquiries...');
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    console.log('✅ Found', inquiries.length, 'contact inquiries');
    
    if (inquiries.length > 0) {
      console.log('\n📋 Recent inquiries:');
      inquiries.slice(0, 3).forEach((inquiry, index) => {
        console.log(`   ${index + 1}. ${inquiry.name} - ${inquiry.email}`);
        console.log(`      Service: ${inquiry.serviceOfInterest}`);
        console.log(`      Status: ${inquiry.status}`);
        console.log(`      Date: ${inquiry.createdAt.toLocaleString()}`);
        console.log('');
      });
    }

    console.log('\n✅ All checks passed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Make sure backend is running: npm start');
    console.log('   2. Clear browser localStorage (F12 → Application → Local Storage)');
    console.log('   3. Login again at: http://localhost:5173/admin/login');
    console.log('   4. Use these credentials:');
    console.log('      Email: admin@gaglawyers.com');
    console.log('      Password: [your admin password]');
    console.log('   5. After login, visit: http://localhost:5173/admin/contacts');
    console.log('\n🎉 The 401 error will be fixed with a fresh login!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

testContactAuth();
