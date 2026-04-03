/**
 * COMPREHENSIVE API & DATABASE DIAGNOSTIC SCRIPT
 * This script only reads data - NO MODIFICATIONS
 */

require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');

// Models
const Service = require('./models/Service');
const Award = require('./models/Award');
const BlogPost = require('./models/BlogPost');
const Review = require('./models/Review');
const LocationPage = require('./models/LocationPage');
const TeamMember = require('./models/TeamMember');
const GalleryImage = require('./models/GalleryImage');
const ContactInquiry = require('./models/ContactInquiry');
const User = require('./models/User');

const API_BASE = 'http://localhost:5000';

const tests = {
  passed: [],
  failed: [],
  warnings: []
};

const log = {
  success: (msg) => console.log('✅', msg),
  error: (msg) => console.log('❌', msg),
  warning: (msg) => console.log('⚠️ ', msg),
  info: (msg) => console.log('ℹ️ ', msg),
  header: (msg) => console.log(`\n${'━'.repeat(60)}\n${msg}\n${'━'.repeat(60)}`)
};

(async () => {
  try {
    log.header('🔍 COMPREHENSIVE SYSTEM DIAGNOSTIC');

    // ═══════════════════════════════════════════════════════════
    // 1. DATABASE CONNECTION
    // ═══════════════════════════════════════════════════════════
    log.header('1️⃣ DATABASE CONNECTION');
    try {
      await mongoose.connect(process.env.MONGO_URI, { ssl: true });
      log.success('MongoDB connected');
      tests.passed.push('Database connection');
    } catch (error) {
      log.error('Database connection failed: ' + error.message);
      tests.failed.push('Database connection');
      process.exit(1);
    }

    // ═══════════════════════════════════════════════════════════
    // 2. DATABASE COLLECTIONS CHECK
    // ═══════════════════════════════════════════════════════════
    log.header('2️⃣ DATABASE COLLECTIONS');
    
    const collections = {
      'Services': { model: Service, name: 'Service' },
      'Awards': { model: Award, name: 'Award' },
      'Blog Posts': { model: BlogPost, name: 'BlogPost' },
      'Reviews': { model: Review, name: 'Review' },
      'Location Pages': { model: LocationPage, name: 'LocationPage' },
      'Team Members': { model: TeamMember, name: 'TeamMember' },
      'Gallery Images': { model: GalleryImage, name: 'GalleryImage' },
      'Contact Inquiries': { model: ContactInquiry, name: 'ContactInquiry' },
      'Users': { model: User, name: 'User' }
    };

    for (const [label, { model }] of Object.entries(collections)) {
      try {
        const count = await model.countDocuments();
        log.success(`${label}: ${count} documents`);
        tests.passed.push(`${label} collection`);
      } catch (error) {
        log.error(`${label}: Failed to count - ${error.message}`);
        tests.failed.push(`${label} collection`);
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 3. AWARDS DATA CHECK (SPECIFIC)
    // ═══════════════════════════════════════════════════════════
    log.header('3️⃣ AWARDS DATA CHECK (SPECIFIC)');
    try {
      const awards = await Award.find({}).limit(3);
      const awardCount = await Award.countDocuments();
      
      log.success(`Total awards in DB: ${awardCount}`);
      
      if (awards.length > 0) {
        log.info('Sample awards:');
        awards.forEach((award, idx) => {
          console.log(`  ${idx + 1}. Title: ${award.title || 'N/A'}`);
          console.log(`     Created: ${award.createdAt}`);
          console.log(`     Updated: ${award.updatedAt}`);
        });
        tests.passed.push('Awards data readable');
      } else {
        log.warning('No awards found in database');
        tests.warnings.push('Awards collection is empty');
      }
    } catch (error) {
      log.error('Error reading awards: ' + error.message);
      tests.failed.push('Awards data check');
    }

    // ═══════════════════════════════════════════════════════════
    // 4. BACKEND SERVER CHECK
    // ═══════════════════════════════════════════════════════════
    log.header('4️⃣ BACKEND SERVER CHECK');
    try {
      const response = await axios.get(`${API_BASE}`, { timeout: 5000 });
      log.success(`Backend server is running on port 5000`);
      log.info(`Response: ${response.data.message || 'OK'}`);
      tests.passed.push('Backend server connectivity');
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        log.error('Backend server is NOT running on localhost:5000');
        log.warning('Please start: npm run dev');
        tests.failed.push('Backend server');
      } else {
        log.error('Backend check failed: ' + error.message);
        tests.failed.push('Backend server check');
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 5. API ENDPOINTS CHECK (if server running)
    // ═══════════════════════════════════════════════════════════
    log.header('5️⃣ API ENDPOINTS CHECK');

    // Get or create auth token
    let token = null;
    try {
      const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
      if (!admin) {
        log.warning('Admin user not found in database');
      } else {
        log.success('Admin user found: ' + admin.email + ' (role: ' + admin.role + ')');
      }
      
      // Try to login
      const loginRes = await axios.post(`${API_BASE}/api/auth/login`, {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      }, { timeout: 5000 }).catch(e => null);

      if (loginRes?.data?.data?.token) {
        token = loginRes.data.data.token;
        log.success('Authentication token obtained');
        tests.passed.push('Admin authentication');
      } else {
        log.warning('Could not obtain auth token - some endpoints may fail');
      }
    } catch (error) {
      log.warning('Authentication test skipped: ' + error.message);
    }

    // Test public endpoints
    const publicEndpoints = [
      { name: 'Services', path: '/api/services' },
      { name: 'Awards', path: '/api/awards' },
      { name: 'Blog Posts', path: '/api/blog' },
      { name: 'Reviews', path: '/api/reviews' },
      { name: 'Gallery', path: '/api/gallery' },
      { name: 'Team', path: '/api/team' },
      { name: 'Settings', path: '/api/settings' }
    ];

    for (const endpoint of publicEndpoints) {
      try {
        const response = await axios.get(`${API_BASE}${endpoint.path}`, { timeout: 5000 });
        const dataCount = Array.isArray(response.data?.data) ? response.data.data.length : '?';
        log.success(`${endpoint.name}: ${dataCount} items`);
        tests.passed.push(`${endpoint.name} API`);
      } catch (error) {
        if (error.code === 'ECONNREFUSED') {
          log.warning(`${endpoint.name}: Server not running`);
        } else {
          log.error(`${endpoint.name}: ${error.response?.status || error.message}`);
          tests.failed.push(`${endpoint.name} API`);
        }
      }
    }

    // Test protected endpoints (if we have token)
    if (token) {
      log.info('Testing protected endpoints with auth...');
      const protectedEndpoints = [
        { name: 'Contact Inquiries', path: '/api/contact' }
      ];

      for (const endpoint of protectedEndpoints) {
        try {
          const response = await axios.get(`${API_BASE}${endpoint.path}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000
          });
          const dataCount = Array.isArray(response.data?.data) ? response.data.data.length : '?';
          log.success(`${endpoint.name}: ${dataCount} items`);
          tests.passed.push(`${endpoint.name} API`);
        } catch (error) {
          log.error(`${endpoint.name}: ${error.response?.status || error.message}`);
          tests.failed.push(`${endpoint.name} API`);
        }
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 6. DATA FLOW CHECK (DB → API → Frontend)
    // ═══════════════════════════════════════════════════════════
    log.header('6️⃣ DATA FLOW CHECK');

    // Check if API data matches DB data
    try {
      const dbAwards = await Award.countDocuments();
      const apiRes = await axios.get(`${API_BASE}/api/awards`, { timeout: 5000 }).catch(() => null);
      const apiAwards = apiRes?.data?.data?.length || 0;

      if (dbAwards > 0 && apiAwards > 0) {
        if (dbAwards === apiAwards) {
          log.success(`Awards data flow: DB (${dbAwards}) → API (${apiAwards}) ✓ MATCH`);
          tests.passed.push('Awards data flow');
        } else {
          log.warning(`Awards data mismatch: DB has ${dbAwards}, API shows ${apiAwards}`);
          tests.warnings.push('Awards data mismatch');
        }
      }
    } catch (error) {
      log.warning('Data flow check skipped: ' + error.message);
    }

    // ═══════════════════════════════════════════════════════════
    // 7. SUMMARY
    // ═══════════════════════════════════════════════════════════
    log.header('📊 DIAGNOSTIC SUMMARY');

    console.log(`\n✅ Passed: ${tests.passed.length}`);
    tests.passed.forEach(t => console.log(`   • ${t}`));

    if (tests.warnings.length > 0) {
      console.log(`\n⚠️  Warnings: ${tests.warnings.length}`);
      tests.warnings.forEach(t => console.log(`   • ${t}`));
    }

    if (tests.failed.length > 0) {
      console.log(`\n❌ Failed: ${tests.failed.length}`);
      tests.failed.forEach(t => console.log(`   • ${t}`));
    }

    // ═══════════════════════════════════════════════════════════
    // 8. TROUBLESHOOTING TIPS FOR AWARDS
    // ═══════════════════════════════════════════════════════════
    log.header('🔧 TROUBLESHOOTING TIPS FOR AWARDS');
    console.log(`
1. If awards not showing in admin panel:
   ✓ Check: Are awards in database? (should show above)
   ✓ Check: Is backend server running? (npm run dev)
   ✓ Check: Is API responding? (check endpoint above)
   ✓ Check: Are you logged in? (check browser console)

2. Awards data created but not visible:
   ✓ Try refreshing browser (Ctrl+Shift+R - hard refresh)
   ✓ Clear localStorage: localStorage.clear()
   ✓ Check browser console for errors (F12)
   ✓ Check if data is recent (check timestamps above)

3. Database has awards but API doesn't return them:
   ✓ Restart backend server
   ✓ Check MongoDB connection
   ✓ Verify award documents have required fields

4. Awards in API but not in admin UI:
   ✓ Check React state management
   ✓ Verify component is fetching on mount
   ✓ Check Network tab in DevTools (F12)
   ✓ Look for JavaScript errors in console
    `);

    mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    log.error('Diagnostic error: ' + error.message);
    mongoose.disconnect();
    process.exit(1);
  }
})();
