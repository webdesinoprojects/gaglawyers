/**
 * Apply canonical office address across MongoDB (Site Settings, Global Settings, CMS contact block).
 *
 * Usage (from backend/):
 *   node set-office-address.js
 *   npm run set-office-address
 *
 * Requires MONGO_URI or MONGODB_URI in .env
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const SiteSettings = require('./models/SiteSettings');
const GlobalSettings = require('./models/GlobalSettings');
const ReusableBlock = require('./models/ReusableBlock');
const {
  OFFICE_ADDRESS_LINE,
  OFFICE_ADDRESS_MULTILINE,
  getGlobalAddressFields,
} = require('./config/officeAddress');

const PREVIOUS_SINGLE = '123 Lawyers Colony, Connaught Place, New Delhi - 110001';
const PREVIOUS_MULTI = '123 Lawyers Colony\nConnaught Place\nNew Delhi - 110001';

async function run() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('✗ MONGO_URI or MONGODB_URI is not set in .env');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('✓ Connected to MongoDB\n');

  // 1. SiteSettings — address key (admin panel + API fallbacks consumers)
  const siteRes = await SiteSettings.findOneAndUpdate(
    { settingKey: 'address' },
    {
      $set: {
        settingValue: OFFICE_ADDRESS_LINE,
        description: 'Office address',
      },
    },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('✓ SiteSettings.address →', siteRes.settingValue);

  // 2. GlobalSettings — footer / DynamicFooter / structured data source
  const gs = await GlobalSettings.getSettings();
  const prevAddr = gs.contact?.address || {};
  gs.contact = gs.contact || {};
  gs.contact.address = getGlobalAddressFields(prevAddr);
  await gs.save();
  console.log('✓ GlobalSettings.contact.address.displayText →', gs.contact.address.displayText);

  // 3. Reusable CMS block used on dynamic contact layout
  const block = await ReusableBlock.findOne({ blockIdentifier: 'contact-info' });
  if (block && block.content && block.content.address) {
    block.content.address.value = OFFICE_ADDRESS_MULTILINE;
    block.content.address.label = block.content.address.label || 'Office Address';
    block.markModified('content');
    await block.save();
    console.log('✓ ReusableBlock contact-info address updated');
  } else {
    console.log('⊘ No contact-info reusable block found (ok if CMS not seeded yet)');
  }

  // 4. Best-effort: any ReusableBlock whose content still mentions old address
  const legacyUpdate = await ReusableBlock.updateMany(
    {
      'content.address.value': { $in: [PREVIOUS_SINGLE, PREVIOUS_MULTI] },
    },
    {
      $set: { 'content.address.value': OFFICE_ADDRESS_MULTILINE },
    }
  );
  if (legacyUpdate.modifiedCount > 0) {
    console.log(`✓ Normalized ${legacyUpdate.modifiedCount} reusable block(s) with legacy address text`);
  }

  console.log('\nDone. Hardcoded UI fallbacks live in frontend/src/constants/officeAddress.js and backend/config/officeAddress.js.');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('✗', err);
  process.exit(1);
});
