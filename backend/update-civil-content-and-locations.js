require('dotenv').config();

const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const { generateSlug, generateUniqueSlug } = require('./utils/slugify');

const APPLY = process.argv.includes('--apply');
const CANONICAL_SLUG = 'civil-lawyer';
const LEGACY_SLUGS = ['civil-lawyer', 'civil-law-disputes'];

const KEYWORDS_TEMPLATE = [
  'Best Civil Lawyer in Delhi',
  'Top Civil Lawyer in Delhi',
  'Top 10 Civil Lawyer in India',
  'Best Civil Lawyers near me Delhi',
  'Civil Lawyer for Hight Court Delhi',
  'Best Civil Lawyer of Supreme Court Delhi',
  'Civil Lawyer for property in Delhi',
  'Civil Lawyer for property damage in Delhi',
  'civil suit lawyers near me Delhi',
  'civil litigation attorney near me Delhi',
  'civil litigation lawyer near me Delhi',
  'Civil Matter Lawyer in Delhi',
  'lawyers for civil suits near me Delhi',
];

const localize = (text, city) =>
  String(text || '')
    .replace(/\bDelhi\b/gi, city)
    .replace(/\s+/g, ' ')
    .trim();

const toTitleCase = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const SERVICE_CONTENT = {
  shortDescription:
    'Civil Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  longDescription:
    'Civil law governs disputes between individuals and entities across contracts, property, tort claims, family and succession matters, and related private rights. Our team provides structured legal strategy, drafting, evidence management, and court representation in civil litigation matters.',
  overview:
    'Civil litigation requires statutory grounding, procedural discipline under CPC, and remedy-focused advocacy for effective dispute resolution.',
  typesOfCases: [
    'Contract and Recovery Disputes',
    'Property and Possession Matters',
    'Family and Succession Civil Claims',
    'Tort and Compensation Matters',
    'Injunction and Declaratory Relief Cases',
  ],
  process: [
    { step: 1, title: 'Legal Assessment', description: 'Review facts, documents, limitation, and remedy options.' },
    { step: 2, title: 'Pleadings & Evidence', description: 'Prepare plaint/written statement and documentary evidence structure.' },
    { step: 3, title: 'Court Filing', description: 'Institute proceedings before competent civil forum.' },
    { step: 4, title: 'Hearing Strategy', description: 'Handle interim applications, evidence, and oral arguments.' },
    { step: 5, title: 'Decree & Execution', description: 'Secure and enforce decree, including appeal strategy if required.' },
  ],
  keyPoints: [
    'Strong CPC-based litigation strategy',
    'Comprehensive documentation support',
    'Interim and final relief advocacy',
    'Execution and appeal guidance',
    'Practical, rights-focused legal advice',
  ],
};

const LOCATION_SECTIONS_TEMPLATE = [
  { title: 'Civil Law', content: 'Civil law governs disputes between individuals and organizations in contracts, property, tort, family, succession, and related private rights matters.' },
  { title: 'Purpose and Significance of Civil Law', content: 'Civil law provides a framework for justice, fairness, and legal remedy while protecting rights and maintaining social and commercial order.' },
  { title: 'Types of Civil Cases and CPC Framework', content: 'Common civil disputes include contracts, property, personal claims, and family disputes. The Civil Procedure Code governs filing, hearing, and decree execution.' },
  { title: 'Major Statutes Related to Civil Law', content: 'Civil matters often involve the Contract Act, Transfer of Property Act, Specific Relief Act, Evidence Act, and related subject statutes.' },
  { title: 'Remedies Available under Civil Law', content: 'Available remedies may include damages, injunction, specific performance, restitution, declaration, and equitable relief as per case facts.' },
  { title: 'Role of Lawyers in Civil Matters', content: 'Civil lawyers prepare pleadings, build evidence strategy, represent in court, negotiate settlements, and advise on appeals/execution.' },
  { title: 'How Grover & Grover, Advocates Help in Civil Cases', content: 'Grover & Grover, Advocates and Solicitors, provides end-to-end support in civil litigation from case assessment to final execution strategy.' },
];

async function run() {
  try {
    await connectDB();
    console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

    const services = await Service.find({ slug: { $in: LEGACY_SLUGS } });
    if (!services.length) {
      console.log('No Civil service found.');
      process.exit(0);
    }

    const canonical =
      services.find((s) => s.slug === CANONICAL_SLUG) ||
      services.find((s) => s.slug === 'civil-lawyer') ||
      services[0];

    if (APPLY) {
      canonical.slug = CANONICAL_SLUG;
      canonical.name = 'Civil Lawyer';
      canonical.title = 'Civil Lawyer';
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
        { serviceName: /Civil/i },
        { slug: /^civil-/i },
      ].filter(Boolean),
    });

    for (const page of pages) {
      const city = toTitleCase(page.city);
      const baseSlug = `civil-lawyer-in-${generateSlug(city)}`;
      const nextSlug = APPLY ? await generateUniqueSlug(LocationPage, baseSlug, page._id) : baseSlug;
      const seoTitle = `Civil Lawyer in ${city} - GAG Lawyers`;
      const seoDescription = `Civil Lawyer in ${city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.`;
      const seoKeywords = KEYWORDS_TEMPLATE.map((k) => localize(k, city)).join(', ');
      const sections = LOCATION_SECTIONS_TEMPLATE.map((s) => ({ title: localize(s.title, city), content: localize(s.content, city) }));

      if (APPLY) {
        page.service = canonical._id;
        page.serviceName = 'Civil Lawyer';
        page.city = city;
        page.slug = nextSlug;
        page.seo = { ...(page.seo || {}), title: seoTitle, description: seoDescription, keywords: seoKeywords, h1: `Civil Lawyer in ${city}` };
        page.content = { ...(page.content || {}), heading: `Civil Lawyer in ${city}`, intro: localize(LOCATION_SECTIONS_TEMPLATE[0].content, city), sections };
        await page.save();
      }
    }

    if (APPLY && duplicates.length) {
      await Service.deleteMany({ _id: { $in: duplicates.map((d) => d._id) } });
    }

    console.log(`Services updated: 1`);
    console.log(`Location pages updated: ${pages.length}`);
    process.exit(0);
  } catch (error) {
    console.error('Failed:', error);
    process.exit(1);
  }
}

run();

