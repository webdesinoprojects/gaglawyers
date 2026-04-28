const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const shouldApply = process.argv.includes('--apply');

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const services = await Service.find({}, 'name slug').lean();
  let scanned = 0;
  let changedServices = 0;
  let changedSections = 0;

  for (const service of services) {
    scanned += 1;

    const sections = await ServiceSection.find({ serviceId: service._id }).sort({ order: 1 }).lean();
    if (!sections.length) continue;

    const nonFaq = sections.filter((section) => section.type !== 'faq');
    const faq = sections.filter((section) => section.type === 'faq');
    if (!faq.length) continue;

    const reordered = [...nonFaq, ...faq];
    const updates = [];

    for (let i = 0; i < reordered.length; i += 1) {
      const current = reordered[i];
      const nextOrder = i;
      if ((current.order ?? 0) !== nextOrder) {
        updates.push({
          updateOne: {
            filter: { _id: current._id },
            update: { $set: { order: nextOrder } },
          },
        });
      }
    }

    if (!updates.length) continue;

    changedServices += 1;
    changedSections += updates.length;

    console.log(
      `${shouldApply ? 'Will update' : 'Would update'} ${service.slug} (${service.name}) - ${updates.length} section(s)`
    );

    if (shouldApply) {
      await ServiceSection.bulkWrite(updates, { ordered: true });
    }
  }

  console.log('');
  console.log(`Scanned services: ${scanned}`);
  console.log(`${shouldApply ? 'Updated' : 'Would update'} services: ${changedServices}`);
  console.log(`${shouldApply ? 'Updated' : 'Would update'} sections: ${changedSections}`);
  console.log(shouldApply ? 'Done.' : 'Dry run complete. Re-run with --apply to save changes.');
}

run()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Error:', error.message);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  });
