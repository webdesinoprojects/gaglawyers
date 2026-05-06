const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function run() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is missing. Expected in backend/.env');
  }

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const faqSections = await ServiceSection.find({ type: 'faq' })
    .select('_id content')
    .lean();

  let updatedCount = 0;
  let alreadyOkCount = 0;
  let skippedCount = 0;

  for (const section of faqSections) {
    const content = section.content && typeof section.content === 'object' ? section.content : {};
    const items = Array.isArray(content.items) ? content.items : [];
    const faqs = Array.isArray(content.faqs) ? content.faqs : [];

    if (items.length > 0) {
      alreadyOkCount += 1;
      continue;
    }

    if (faqs.length === 0) {
      skippedCount += 1;
      continue;
    }

    await ServiceSection.updateOne(
      { _id: section._id },
      {
        $set: {
          content: {
            ...content,
            items: faqs,
          },
        },
      }
    );
    updatedCount += 1;
  }

  const withItems = await ServiceSection.countDocuments({
    type: 'faq',
    'content.items.0': { $exists: true },
  });
  const withFaqs = await ServiceSection.countDocuments({
    type: 'faq',
    'content.faqs.0': { $exists: true },
  });
  const totalFaqSections = await ServiceSection.countDocuments({ type: 'faq' });

  console.log(`Total FAQ sections: ${totalFaqSections}`);
  console.log(`Updated (faqs -> items): ${updatedCount}`);
  console.log(`Already had items: ${alreadyOkCount}`);
  console.log(`Skipped (no items/no faqs): ${skippedCount}`);
  console.log(`Now with content.items: ${withItems}`);
  console.log(`Still with content.faqs: ${withFaqs}`);
}

run()
  .then(async () => {
    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Migration failed:', error.message);
    try {
      await mongoose.disconnect();
    } catch (e) {
      // ignore
    }
    process.exit(1);
  });
