require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');

const RULES = [
  {
    oldName: 'Employment & Labour Law Cases',
    canonicalSlug: 'employment-lawyer',
    canonicalName: 'Employment Lawyer',
    slugPrefix: 'employment-lawyer-in-',
  },
  {
    oldName: 'Insolvency & Bankruptcy Cases',
    canonicalSlug: 'insolvency-bankruptcy-lawyer',
    canonicalName: 'Insolvency bankruptcy Lawyer',
    slugPrefix: 'insolvency-bankruptcy-lawyer-in-',
  },
  {
    oldName: 'Insurance Claim & Dispute Cases',
    canonicalSlug: 'insurance-lawyer',
    canonicalName: 'Insurance Lawyer',
    slugPrefix: 'insurance-lawyer-in-',
  },
];

function cityFromSlug(slug, prefix) {
  if (!slug || !slug.startsWith(prefix)) return '';
  return slug.slice(prefix.length).replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected. Starting migration for 3 services...');

    for (const rule of RULES) {
      const canonical = await Service.findOne({ slug: rule.canonicalSlug });
      if (!canonical) {
        console.log(`[SKIP] Canonical service missing: ${rule.canonicalSlug}`);
        continue;
      }

      const pages = await LocationPage.find({ slug: new RegExp(`^${rule.slugPrefix}`) }).select('_id slug city serviceName seo content heading');
      console.log(`\n${rule.canonicalSlug}: found ${pages.length} location pages`);

      let updated = 0;
      for (const page of pages) {
        const city = page.city || cityFromSlug(page.slug, rule.slugPrefix);
        page.service = canonical._id;
        page.serviceName = rule.canonicalName;

        if (!page.content || typeof page.content !== 'object') page.content = {};
        page.content.heading = `${rule.canonicalName} in ${city}`;

        if (!page.seo || typeof page.seo !== 'object') page.seo = {};
        page.seo.title = `${rule.canonicalName} in ${city} | GAG Lawyers`;
        page.seo.h1 = `${rule.canonicalName} in ${city}`;

        await page.save();
        updated += 1;
      }
      console.log(`${rule.canonicalSlug}: updated ${updated} location pages`);

      const duplicate = await Service.findOne({ name: rule.oldName });
      if (duplicate) {
        await Service.deleteOne({ _id: duplicate._id });
        console.log(`${rule.canonicalSlug}: deleted duplicate service '${rule.oldName}'`);
      } else {
        console.log(`${rule.canonicalSlug}: duplicate service not found (already removed)`);
      }

      const oldNameCount = await LocationPage.countDocuments({ serviceName: rule.oldName });
      console.log(`${rule.canonicalSlug}: remaining pages with old serviceName = ${oldNameCount}`);
    }

    console.log('\nVerification summary:');
    for (const rule of RULES) {
      const canonicalExists = await Service.exists({ slug: rule.canonicalSlug });
      const duplicateExists = await Service.exists({ name: rule.oldName });
      const count = await LocationPage.countDocuments({ slug: new RegExp(`^${rule.slugPrefix}`) });
      console.log(`- ${rule.canonicalSlug}: pages=${count}, canonical=${!!canonicalExists}, duplicateRemoved=${!duplicateExists}`);
    }

    await mongoose.connection.close();
    console.log('\nDone.');
  } catch (e) {
    console.error('Migration failed:', e);
    process.exitCode = 1;
    try { await mongoose.connection.close(); } catch (_) {}
  }
})();