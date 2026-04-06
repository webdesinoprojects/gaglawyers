require('dotenv').config();
const axios = require('axios');

const API_BASE = 'http://localhost:5000';

(async () => {
  try {
    console.log('🔍 Testing Contact API Endpoints...\n');
    
    // Test 1: Create a test inquiry (no auth needed)
    console.log('1️⃣  Testing POST /api/contact (create inquiry)');
    const createRes = await axios.post(`${API_BASE}/api/contact`, {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9996263370',
      serviceOfInterest: 'Corporate Law',
      message: 'Test message'
    });
    console.log('✅ Created inquiry:', createRes.data.data._id);
    
    // Test 2: Get all inquiries (needs auth)
    console.log('\n2️⃣  Testing GET /api/contact (requires auth)');
    const noAuthRes = await axios.get(`${API_BASE}/api/contact`).catch(e => {
      console.log('❌ Without auth:', e.response?.status, e.response?.data?.message || e.message);
      return null;
    });
    
    // Test 3: Login first to get token
    console.log('\n3️⃣  Testing Login to get auth token');
    const loginRes = await axios.post(`${API_BASE}/api/auth/login`, {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });
    const token = loginRes.data.token;
    console.log('✅ Got token:', token.substring(0, 20) + '...');
    
    // Test 4: Get inquiries with auth
    console.log('\n4️⃣  Testing GET /api/contact (with auth)');
    const authRes = await axios.get(`${API_BASE}/api/contact`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Retrieved inquiries:', authRes.data.count);
    console.log('📋 Data:', JSON.stringify(authRes.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
})();
