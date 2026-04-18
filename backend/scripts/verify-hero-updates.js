require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

async function verifyUpdates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get a few sample services
    const services = await Service.find({}).limit(5).lean();

    for (const service of services) {
      const heroSection = await ServiceSection.findOne({
        serviceId: service._id,
        type: 'hero'
      }).lean();

      if (heroSection) {
        console.log(`📄 ${service.name}`);
        console.log(`   Subheading: ${heroSection.content.subheading}`);
        console.log('');
      }
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyUpdates();
