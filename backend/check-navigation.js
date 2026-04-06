/**
 * Check current navigation menu in database
 * Run: node check-navigation.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const NavigationMenu = require('./models/NavigationMenu');

async function checkNavigation() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    console.log('📋 Checking navigation menus...');
    const menus = await NavigationMenu.find();
    
    console.log(`Found ${menus.length} navigation menu(s)\n`);

    if (menus.length === 0) {
      console.log('⚠️  No navigation menus found!');
      console.log('   Run: node seed-navigation.js to create default menus');
    } else {
      menus.forEach(menu => {
        console.log(`📍 Menu: ${menu.menuName} (${menu.menuLocation})`);
        console.log(`   Active: ${menu.isActive}`);
        console.log(`   Items: ${menu.items.length}`);
        menu.items.forEach((item, index) => {
          console.log(`   ${index + 1}. ${item.label} → ${item.url} ${item.isVisible ? '✅' : '❌ hidden'}`);
        });
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

checkNavigation();
