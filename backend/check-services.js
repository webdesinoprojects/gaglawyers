require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const checkServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    const services = await Service.find({}).sort({ order: 1 });
    
    console.log(`📊 Found ${services.length} services:\n`);
    
    services.forEach((service, index) => {
      console.log(`${index + 1}. Service:`);
      console.log(`   ID: ${service._id}`);
      console.log(`   Name: ${service.name || 'N/A'}`);
      console.log(`   Title: ${service.title || 'N/A'}`);
      console.log(`   Slug: ${service.slug || 'N/A'}`);
      console.log(`   Category: ${service.category || 'N/A'}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkServices();
