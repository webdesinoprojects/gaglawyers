require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');

const checkLocationPages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    const totalPages = await LocationPage.countDocuments();
    console.log(`📊 Total location pages: ${totalPages}\n`);

    // Count unique cities
    const uniqueCities = await LocationPage.distinct('city');
    console.log(`📍 Unique cities: ${uniqueCities.length}`);
    
    // Count unique services
    const uniqueServices = await LocationPage.distinct('serviceName');
    console.log(`🔧 Unique services: ${uniqueServices.length}\n`);

    console.log(`📐 Expected pages: ${uniqueCities.length} × ${uniqueServices.length} = ${uniqueCities.length * uniqueServices.length}`);
    console.log(`📈 Actual pages: ${totalPages}`);
    console.log(`📉 Difference: ${(uniqueCities.length * uniqueServices.length) - totalPages}\n`);

    // Show first 10 and last 10 cities
    console.log('First 10 cities:');
    uniqueCities.slice(0, 10).forEach((city, i) => console.log(`  ${i + 1}. ${city}`));
    
    console.log('\nLast 10 cities:');
    uniqueCities.slice(-10).forEach((city, i) => console.log(`  ${uniqueCities.length - 9 + i}. ${city}`));

    console.log('\nAll services:');
    uniqueServices.forEach((service, i) => console.log(`  ${i + 1}. ${service}`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkLocationPages();
