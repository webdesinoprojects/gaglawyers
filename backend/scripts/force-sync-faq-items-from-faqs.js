const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const ServiceSection = require('../models/ServiceSection');

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Expected in backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const sections = await ServiceSection.find({
    type: 'faq',
    'content.faqs.0': { $exists: true },
  })
    .select('_id content.faqs content.items')
    .lean();

  let updated = 0;
  for (const section of sections) {
    const items = Array.isArray(section?.content?.items) ? section.content.items : [];
    const faqs = Array.isArray(section?.content?.faqs) ? section.content.faqs : [];
    if (items.length > 0 || faqs.length === 0) continue;

    await ServiceSection.updateOne(
      { _id: section._id },
      { $set: { 'content.items': faqs } }
    );
    updated += 1;
  }

  const missingItems = await ServiceSection.countDocuments({
    type: 'faq',
    'content.faqs.0': { $exists: true },
    $or: [{ 'content.items': { $exists: false } }, { 'content.items.0': { $exists: false } }],
  });

  console.log(`Updated sections: ${updated}`);
  console.log(`Remaining faq sections with faqs but no items: ${missingItems}`);
}

run()
  .then(async () => {
    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Failed:', error.message);
    try {
      await mongoose.disconnect();
    } catch (e) {
      // ignore
    }
    process.exit(1);
  });
