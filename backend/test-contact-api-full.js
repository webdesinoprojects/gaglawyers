/**
 * Test Contact API with proper authentication
 */
require('dotenv').config();
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

(async () => {
  try {
    console.log('🔍 Testing Contact API...\n');
    
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI, { ssl: true });
    console.log('✅ Connected to MongoDB\n');
    
    // 1. Check admin user exists
    console.log('📋 Step 1: Checking admin user...');
    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!admin) {
      console.log('❌ Admin user not found! Creating one...');
      const newAdmin = await User.create({
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'super-admin',
        isActive: true,
      });
      console.log('✅ Admin user created:', newAdmin._id);
    } else {
      console.log('✅ Admin user found:', admin._id);
      console.log('   Email:', admin.email);
      console.log('   Role:', admin.role);
      console.log('   Active:', admin.isActive);
    }
    
    // 2. Generate a valid token
    console.log('\n📝 Step 2: Generating JWT token...');
    const adminId = admin?._id || (await User.findOne({ email: process.env.ADMIN_EMAIL }))._id;
    const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ Token generated:', token.substring(0, 30) + '...');
    
    // 3. Check contact inquiries in DB
    console.log('\n📧 Step 3: Checking contact inquiries in database...');
    const ContactInquiry = require('./models/ContactInquiry');
    const inquiries = await ContactInquiry.find({}).sort({ createdAt: -1 });
    console.log(`✅ Found ${inquiries.length} inquiries:`);
    inquiries.forEach((i, idx) => {
      console.log(`   ${idx + 1}. ${i.name} (${i.email}) - Status: ${i.status}`);
    });
    
    // 4. Test the API endpoint
    console.log('\n🌐 Step 4: Testing API endpoint...');
    const axios = require('axios');
    try {
      const response = await axios.get('http://localhost:5000/api/contact', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('✅ API Response:');
      console.log('   Status:', response.status);
      console.log('   Success:', response.data.success);
      console.log('   Count:', response.data.count);
      console.log('   Data items:', response.data.data.length);
      if (response.data.data.length > 0) {
        console.log('   Sample:', response.data.data[0].name);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('⚠️  Backend server is not running on localhost:5000');
        console.log('   Please start the server: npm run dev');
      } else {
        console.log('❌ API Error:', error.response?.data || error.message);
      }
    }
    
    console.log('\n✅ Test complete!');
    mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    mongoose.disconnect();
    process.exit(1);
  }
})();
