require('dotenv').config();

const connectDB = require('./config/db');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');
const { generateSlug, generateUniqueSlug } = require('./utils/slugify');

const APPLY = process.argv.includes('--apply');

const AFT_REGEX = /(armed\s*forces?\s*tribunal|\baft\b)/i;
const TARGET_SERVICE_SLUG_BASE = 'armed-force-tribunal';

const toTitleCase = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const buildSlug = (city) => `${TARGET_SERVICE_SLUG_BASE}-lawyer-in-${generateSlug(city)}`;

const buildKeywords = (city) => {
  const list = [
    `Aft lawyer in ${city}`,
    `Advocate for aft matters in ${city}`,
    'Best aft Lawyers near me',
    `aft lawyer fees in ${city}`,
    'Armed Force Tribunal Lawyer near me',
    `Best Armed Force Tribunal Lawyers in ${city}`,
    'Best Armed Force Tribunal Lawyers near me',
    'Top Armed Force Tribunal Lawyer in India',
    `Best Advocates for Armed Force Tribunal Cases in ${city}`,
    `Best Lawyers for Armed Force Tribunal Cases in ${city}`,
    `Lawyer for Armed Force Tribunal Cases in ${city}`,
    `Lawyer for Armed Force Tribunal Matters in ${city}`,
    `Lawyer for Armed Force Tribunal Disputes in ${city}`,
    'Armed Force Tribunal Lawyer in High Court',
    'Top Armed Force Tribunal Lawyer in Supreme Court',
  ];

  return list.join(', ');
};

const buildSeo = (city) => ({
  title: `Armed Force Tribunal Lawyer in ${city} - GAG Lawyers`,
  description: `Armed Force Tribunal Lawyer in ${city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations`,
  keywords: buildKeywords(city),
  h1: `Armed Force Tribunal Lawyer in ${city}`,
});

async function run() {
  try {
    await connectDB();

    const aftServices = await Service.find({
      $or: [
        { slug: AFT_REGEX },
        { name: AFT_REGEX },
        { title: AFT_REGEX },
      ],
    })
      .select('_id slug name title')
      .lean();

    const aftServiceIds = aftServices.map((s) => s._id);

    const aftPages = await LocationPage.find({
      $or: [
        aftServiceIds.length ? { service: { $in: aftServiceIds } } : null,
        { serviceName: AFT_REGEX },
        { slug: AFT_REGEX },
      ].filter(Boolean),
    }).lean();

    if (!aftPages.length) {
      console.log('No AFT location pages found.');
      process.exit(0);
    }

    console.log(`Found ${aftPages.length} AFT location pages.`);
    console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

    let updated = 0;
    let unchanged = 0;

    for (const page of aftPages) {
      const city = toTitleCase(page.city);
      const baseSlug = buildSlug(city);
      const newSlug = APPLY
        ? await generateUniqueSlug(LocationPage, baseSlug, page._id)
        : baseSlug;
      const seo = buildSeo(city);

      const current = {
        slug: page.slug,
        title: page.seo?.title || '',
        description: page.seo?.description || '',
        keywords: page.seo?.keywords || '',
        h1: page.seo?.h1 || '',
      };

      const next = {
        slug: newSlug,
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        h1: seo.h1,
      };

      const isDifferent =
        current.slug !== next.slug ||
        current.title !== next.title ||
        current.description !== next.description ||
        current.keywords !== next.keywords ||
        current.h1 !== next.h1;

      if (!isDifferent) {
        unchanged += 1;
        continue;
      }

      if (APPLY) {
        await LocationPage.updateOne(
          { _id: page._id },
          {
            $set: {
              city,
              serviceName: 'Armed Force Tribunal Lawyer',
              slug: next.slug,
              'seo.title': next.title,
              'seo.description': next.description,
              'seo.keywords': next.keywords,
              'seo.h1': next.h1,
              'content.heading': next.h1,
            },
          }
        );
      }

      updated += 1;
    }

    console.log(`Updated: ${updated}`);
    console.log(`Unchanged: ${unchanged}`);

    const sample = await LocationPage.find({
      $or: [
        { serviceName: /Armed Force Tribunal Lawyer/i },
        { slug: /^armed-force-tribunal-lawyer-in-/i },
      ],
    })
      .select('city slug seo.title seo.keywords')
      .sort({ city: 1 })
      .limit(3)
      .lean();

    if (sample.length) {
      console.log('\nSample pages:');
      sample.forEach((p, i) => {
        console.log(`${i + 1}. ${p.city}`);
        console.log(`   slug: ${p.slug}`);
        console.log(`   title: ${p.seo?.title}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Failed to update AFT location pages:', error);
    process.exit(1);
  }
}

run();
