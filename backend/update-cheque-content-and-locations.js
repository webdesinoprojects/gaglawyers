require('dotenv').config();

const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const { generateSlug, generateUniqueSlug } = require('./utils/slugify');

const APPLY = process.argv.includes('--apply');

const CANONICAL_SLUG = 'cheque-bounce-lawyer';
const LEGACY_SLUGS = ['cheque-bounce', 'cheque-bounce-lawyer'];

const KEYWORDS_TEMPLATE = [
  'Cheque bounce lawyer near me',
  'Best Cheque Bounce Lawyer in Delhi',
  'Top Cheque Bounce Lawyer in Delhi',
  'Lawyer fees for Cheque Bounce case in Delhi',
  'Best lawyer for Cheque Bounce case in Delhi',
  'Cheque Bounce Lawyer case advocates near me',
  'Cheque Bounce case lawyer charges in Delhi',
  'Advocate for Cheque Bounce in Delhi',
  'Advocate fees for Cheque Bounce case in Delhi',
  'Best Cheque Bounce Lawyer services in Delhi',
  'Cheque Bounce legal notice format in Delhi',
  'Criminal case against Cheque Bounce in Delhi',
  'Legal case for Cheque Bounce in Delhi',
  'Cheque bouncing lawyer in Delhi',
];

const localize = (text, city) =>
  String(text || '')
    .replace(/D¬elhi/gi, city)
    .replace(/\bDelhi\b/gi, city)
    .replace(/\bin delhi\b/gi, `in ${city}`)
    .replace(/\s+/g, ' ')
    .trim();

const toTitleCase = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const SERVICE_CONTENT = {
  shortDescription:
    'Cheque Bounce Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations',
  longDescription:
    'Cheque bounce matters under the Negotiable Instruments Act involve strict notice timelines, documentary compliance, and coordinated criminal/civil strategy. We assist in legal notice drafting, Section 138 complaints, defense strategy, settlement advisory, and trial-stage representation in cheque dishonour disputes.',
  overview:
    'Cheque bounce cases require prompt legal action, correct statutory notice, and structured evidence. Our team provides end-to-end legal support for complainant and defense-side strategy.',
  typesOfCases: [
    'Section 138 NI Act Complaint Matters',
    'Cheque Dishonour Legal Notice and Reply',
    'Criminal Defence in Cheque Bounce Proceedings',
    'Civil Recovery with Cheque Bounce Disputes',
    'Settlement and Compounding Strategy',
  ],
  process: [
    { step: 1, title: 'Document Review', description: 'Review cheque, return memo, transaction records, and liability trail.' },
    { step: 2, title: 'Notice Strategy', description: 'Draft and issue statutory legal notice within prescribed timelines.' },
    { step: 3, title: 'Complaint/Defense Filing', description: 'File complaint or defense pleadings under applicable NI Act provisions.' },
    { step: 4, title: 'Hearing Advocacy', description: 'Represent in court with evidence, arguments, and procedural compliance.' },
    { step: 5, title: 'Resolution Path', description: 'Pursue conviction/recovery or negotiated settlement as case-appropriate.' },
  ],
  keyPoints: [
    'Strong Section 138 NI Act litigation support',
    'Time-bound legal notice and filing approach',
    'Complainant and defense-side representation',
    'Structured documentation and evidence strategy',
    'Settlement, compounding, and trial support',
  ],
};

const LOCATION_SECTIONS_TEMPLATE = [
  {
    title: 'Cheque Bounce',
    content:
      'Cheque bounce occurs when a cheque is returned unpaid by the bank due to insufficient funds or other legally relevant reasons. It can trigger serious legal and financial consequences for both drawer and payee.',
  },
  {
    title: 'What to Do When a Cheque gets Bounced',
    content:
      'Collect cheque return memo, preserve transaction records, and issue statutory legal notice within the required timeline. If unpaid after notice period, legal proceedings may be initiated under NI Act.',
  },
  {
    title: 'Charges, Penalties & Punishment',
    content:
      'Dishonour of cheque may attract criminal proceedings under Section 138 of the Negotiable Instruments Act, subject to statutory conditions and limitation requirements.',
  },
  {
    title: 'Legal Remedies Available under Law',
    content:
      'Remedies may include criminal complaint under NI Act and civil recovery actions depending on transaction structure, documentary strength, and litigation objective.',
  },
  {
    title: 'Role of Cheque Bounce Lawyers',
    content:
      'A cheque bounce lawyer assists with notice drafting, complaint filing, defense preparation, settlement negotiation, evidence handling, and court representation.',
  },
  {
    title: 'Documents Required to file a Cheque Bounce Case',
    content:
      'Core documents include original cheque, return memo, legal notice and proof of service, account records, transaction evidence, and supporting correspondence.',
  },
  {
    title: 'How Grover & Grover, Advocates Help in Cheque Bounce Cases',
    content:
      'Grover & Grover, Advocates and Solicitors, provides end-to-end legal support in cheque bounce matters including notice strategy, filing, hearing advocacy, and settlement support.',
  },
];

async function run() {
  try {
    await connectDB();
    console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

    const services = await Service.find({ slug: { $in: LEGACY_SLUGS } });
    if (!services.length) {
      console.log('No Cheque Bounce service found.');
      process.exit(0);
    }

    const canonical =
      services.find((s) => s.slug === CANONICAL_SLUG) ||
      services.find((s) => s.slug === 'cheque-bounce') ||
      services[0];

    if (APPLY) {
      canonical.slug = CANONICAL_SLUG;
      canonical.name = 'Cheque Bounce Lawyer';
      canonical.title = 'Cheque Bounce Lawyer';
      canonical.shortDescription = SERVICE_CONTENT.shortDescription;
      canonical.longDescription = SERVICE_CONTENT.longDescription;
      canonical.overview = SERVICE_CONTENT.overview;
      canonical.typesOfCases = SERVICE_CONTENT.typesOfCases;
      canonical.process = SERVICE_CONTENT.process;
      canonical.keyPoints = SERVICE_CONTENT.keyPoints;
      await canonical.save();
    }

    const duplicates = services.filter((s) => String(s._id) !== String(canonical._id));

    const pages = await LocationPage.find({
      $or: [
        { service: canonical._id },
        duplicates.length ? { service: { $in: duplicates.map((d) => d._id) } } : null,
        { serviceName: /Cheque Bounce/i },
        { slug: /^cheque-bounce/i },
      ].filter(Boolean),
    });

    for (const page of pages) {
      const city = toTitleCase(page.city);
      const baseSlug = `cheque-bounce-lawyer-in-${generateSlug(city)}`;
      const nextSlug = APPLY ? await generateUniqueSlug(LocationPage, baseSlug, page._id) : baseSlug;
      const seoTitle = `Cheque Bounce Lawyer in ${city} - GAG Lawyers`;
      const seoDescription = `Cheque Bounce Lawyer in ${city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations`;
      const seoKeywords = KEYWORDS_TEMPLATE.map((k) => localize(k, city)).join(', ');
      const sections = LOCATION_SECTIONS_TEMPLATE.map((s) => ({
        title: localize(s.title, city),
        content: localize(s.content, city),
      }));

      if (APPLY) {
        page.service = canonical._id;
        page.serviceName = 'Cheque Bounce Lawyer';
        page.city = city;
        page.slug = nextSlug;
        page.seo = {
          ...(page.seo || {}),
          title: seoTitle,
          description: seoDescription,
          keywords: seoKeywords,
          h1: `Cheque Bounce Lawyer in ${city}`,
        };
        page.content = {
          ...(page.content || {}),
          heading: `Cheque Bounce Lawyer in ${city}`,
          intro: localize(LOCATION_SECTIONS_TEMPLATE[0].content, city),
          sections,
        };
        await page.save();
      }
    }

    if (APPLY && duplicates.length) {
      await Service.deleteMany({ _id: { $in: duplicates.map((d) => d._id) } });
    }

    console.log(`Services updated: 1`);
    console.log(`Location pages updated: ${pages.length}`);

    const sampleService = await Service.findOne({ slug: CANONICAL_SLUG }).select('name slug shortDescription').lean();
    const sampleLocation = await LocationPage.findOne({ slug: /^cheque-bounce-lawyer-in-/i, city: { $ne: 'Delhi' } })
      .select('city slug seo.title seo.description seo.keywords content.heading')
      .lean();

    console.log('\nSample service:');
    console.log(JSON.stringify(sampleService, null, 2));
    console.log('\nSample non-Delhi location:');
    console.log(JSON.stringify(sampleLocation, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Failed:', error);
    process.exit(1);
  }
}

run();

