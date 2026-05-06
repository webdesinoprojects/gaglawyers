const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Expected in backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);

  const services = await Service.find({
    name: { $regex: 'Mediation|Sexual|Supreme', $options: 'i' },
  })
    .select('name slug')
    .lean();

  console.log('Services found:', services.length);
  for (const service of services) {
    const faqSections = await ServiceSection.find({
      serviceId: service._id,
      type: 'faq',
    })
      .select('heading order')
      .lean();

    console.log(`\n${service.name} (${service.slug})`);
    if (!faqSections.length) {
      console.log('  No FAQ section found');
      continue;
    }
    for (const section of faqSections) {
      console.log(`  order=${section.order} heading="${section.heading}"`);
    }
  }

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error(error);
  try {
    await mongoose.disconnect();
  } catch (e) {
    // ignore
  }
  process.exit(1);
});
