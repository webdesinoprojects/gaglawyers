const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;
const TARGET_HEADING = 'Frequently Asked Questions (FAQs)';

async function run() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is missing. Expected in backend/.env');
  }

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const faqSectionCount = await ServiceSection.countDocuments({ type: 'faq' });
  const result = await ServiceSection.updateMany(
    { type: 'faq' },
    { $set: { heading: TARGET_HEADING } }
  );

  console.log(`FAQ sections found: ${faqSectionCount}`);
  console.log(`Matched: ${result.matchedCount}`);
  console.log(`Updated: ${result.modifiedCount}`);
  console.log(`New heading: "${TARGET_HEADING}"`);

  const sample = await ServiceSection.find({ type: 'faq' })
    .limit(3)
    .populate({ path: 'serviceId', select: 'name slug' })
    .select('heading serviceId')
    .lean();

  console.log('Sample updated entries:');
  for (const item of sample) {
    const serviceName = item.serviceId?.name || 'Unknown Service';
    const serviceSlug = item.serviceId?.slug || 'unknown-slug';
    console.log(`- ${serviceName} (${serviceSlug}) => "${item.heading}"`);
  }
}

run()
  .then(async () => {
    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Error updating FAQ headings:', error.message);
    try {
      await mongoose.disconnect();
    } catch (e) {
      // no-op
    }
    process.exit(1);
  });
