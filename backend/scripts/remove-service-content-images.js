const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const shouldApply = process.argv.includes('--apply');

const IMAGE_KEYS = ['imageUrl', 'imageAlt', 'backgroundImageUrl'];

function stripImageFields(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return { changed: false, next: content };
  }

  let changed = false;
  const next = { ...content };

  for (const key of IMAGE_KEYS) {
    if (Object.prototype.hasOwnProperty.call(next, key)) {
      delete next[key];
      changed = true;
    }
  }

  return { changed, next };
}

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

    const sections = await ServiceSection.find({ serviceId: service._id }).lean();
    if (!sections.length) continue;

    const ops = [];
    for (const section of sections) {
      const { changed, next } = stripImageFields(section.content);
      if (!changed) continue;

      ops.push({
        updateOne: {
          filter: { _id: section._id },
          update: { $set: { content: next } },
        },
      });
    }

    if (!ops.length) continue;

    changedServices += 1;
    changedSections += ops.length;

    console.log(
      `${shouldApply ? 'Will update' : 'Would update'} ${service.slug} (${service.name}) - ${ops.length} section(s)`
    );

    if (shouldApply) {
      await ServiceSection.bulkWrite(ops, { ordered: true });
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
