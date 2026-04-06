require('dotenv').config();
const mongoose = require('mongoose');
const SiteSettings = require('./models/SiteSettings');
const { OFFICE_ADDRESS_LINE } = require('./config/officeAddress');

const addPhoneSetting = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');

    // Check if phoneNumber setting exists
    const existingSetting = await SiteSettings.findOne({ settingKey: 'phoneNumber' });
    
    if (existingSetting) {
      console.log('⊘ phoneNumber setting already exists');
      console.log('Current value:', existingSetting.settingValue);
    } else {
      // Add phoneNumber setting
      await SiteSettings.create({
        settingKey: 'phoneNumber',
        settingValue: '+919996263370',
        description: 'Phone contact number'
      });
      console.log('✓ phoneNumber setting added successfully');
    }

    // Check if email setting exists
    const emailSetting = await SiteSettings.findOne({ settingKey: 'email' });
    
    if (!emailSetting) {
      await SiteSettings.create({
        settingKey: 'email',
        settingValue: 'contact@gaglawyers.com',
        description: 'Contact email address'
      });
      console.log('✓ email setting added successfully');
    }

    // Check if address setting exists
    const addressSetting = await SiteSettings.findOne({ settingKey: 'address' });
    
    if (!addressSetting) {
      await SiteSettings.create({
        settingKey: 'address',
        settingValue: OFFICE_ADDRESS_LINE,
        description: 'Office address'
      });
      console.log('✓ address setting added successfully');
    }

    // Display all settings
    console.log('\n📋 All Settings:');
    const allSettings = await SiteSettings.find();
    allSettings.forEach(setting => {
      console.log(`   • ${setting.settingKey}: ${setting.settingValue}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  }
};

addPhoneSetting();
