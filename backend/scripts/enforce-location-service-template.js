const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const LocationPage = require('../models/LocationPage');

const shouldApply = process.argv.includes('--apply');

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const customCount = await LocationPage.countDocuments({ 'content.templateMode': 'custom' });
  const missingCount = await LocationPage.countDocuments({ 'content.templateMode': { $exists: false } });

  console.log(`Location pages in custom mode: ${customCount}`);
  console.log(`Location pages missing templateMode: ${missingCount}`);

  if (!shouldApply) {
    console.log('Dry run complete. Re-run with --apply to enforce centralized service template mode.');
    return;
  }

  const customResult = await LocationPage.updateMany(
    { 'content.templateMode': 'custom' },
    { $set: { 'content.templateMode': 'service' } }
  );

  const missingResult = await LocationPage.updateMany(
    { 'content.templateMode': { $exists: false } },
    { $set: { 'content.templateMode': 'service' } }
  );

  console.log(`Updated from custom -> service: ${customResult.modifiedCount || 0}`);
  console.log(`Updated missing -> service: ${missingResult.modifiedCount || 0}`);
  console.log('Enforcement completed.');
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
