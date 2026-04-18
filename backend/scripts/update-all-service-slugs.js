require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

// Function to convert service name to slug
function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/&/g, 'and')
    .replace(/--+/g, '-')
    .trim();
}

async function updateSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const services = await Service.find({});
    console.log(`\nFound ${services.length} services in database\n`);

    let updated = 0;

    for (const service of services) {
      const correctSlug = nameToSlug(service.name);
      
      if (service.slug !== correctSlug) {
        const oldSlug = service.slug;
        service.slug = correctSlug;
        await service.save();
        console.log(`✅ Updated: "${service.name}" | ${oldSlug} → ${correctSlug}`);
        updated++;
      } else {
        console.log(`✓ Already correct: "${service.name}" | ${service.slug}`);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Already correct: ${services.length - updated}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateSlugs();
