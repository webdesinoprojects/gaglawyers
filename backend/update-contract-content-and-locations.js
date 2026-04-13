require('dotenv').config();

const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const { generateSlug, generateUniqueSlug } = require('./utils/slugify');

const APPLY = process.argv.includes('--apply');
const CANONICAL_SLUG = 'contract-lawyer';
const LEGACY_SLUGS = ['contract-lawyer', 'contract-disputes'];

const KEYWORDS_TEMPLATE = [
  'Contract Lawyer Fees in Delhi',
  'Business Contract Lawyer near me',
  'Contract Lawyer free consultation in Delhi',
  'business lawyer near me',
  'corporate lawyer near me',
  'commercial lawyer near me',
  'Best Commercial Lawyers in Delhi',
  'Top Commercial Lawyers in India',
  'Top Business Lawyers in High Court',
  'Top Business Lawyers in Supreme Court',
  'company lawyers near me',
  'Corporate law firms near me',
];

const localize = (text, city) =>
  String(text || '')
    .replace(/¬/g, '')
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
    'Contract Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  longDescription:
    'Contract disputes involve enforceability, interpretation, performance obligations, and breach consequences under Indian contract law. Our team assists with drafting, risk review, breach analysis, notice strategy, arbitration/court proceedings, and remedies including damages and specific performance.',
  overview:
    'Contract law under the Indian Contract Act, 1872 regulates legally enforceable agreements, obligations, breach consequences, and remedies.',
  typesOfCases: [
    'Breach of Contract Claims',
    'Commercial and Business Contract Disputes',
    'Contract Interpretation and Clause Disputes',
    'Damages and Specific Performance Claims',
    'Arbitration and Settlement-Oriented Contract Matters',
  ],
  process: [
    { step: 1, title: 'Contract Review', description: 'Examine terms, obligations, risk allocation, and breach points.' },
    { step: 2, title: 'Evidence & Notice', description: 'Compile records and issue legal notice where applicable.' },
    { step: 3, title: 'Dispute Strategy', description: 'Choose negotiation, arbitration, or litigation path.' },
    { step: 4, title: 'Proceedings', description: 'Represent before arbitral/court forum with documentary and legal argument.' },
    { step: 5, title: 'Relief & Enforcement', description: 'Pursue damages, specific performance, injunction, or settlement enforcement.' },
  ],
  keyPoints: [
    'Strong contract drafting and dispute strategy',
    'Commercial risk and liability-focused advice',
    'Court and arbitration representation',
    'Damages and specific-performance remedies',
    'Business-practical legal outcomes',
  ],
};

const LOCATION_SECTIONS_TEMPLATE = [
  { title: 'Contract Dispute Cases', content: 'Contract law regulates enforceable agreements, obligations, and remedies in cases of breach or non-performance.' },
  { title: 'Types of Disputes in Contract Cases', content: 'Frequent disputes include breach, delayed delivery/performance, warranty conflicts, interpretation disputes, and damages claims.' },
  { title: 'Acts and Provisions in Contract Disputes', content: 'Key frameworks include Indian Contract Act, Sale of Goods Act, Partnership law, Evidence Act, and related commercial provisions.' },
  { title: 'Rights and Obligations under Contract Law', content: 'Parties must act with free consent and lawful object, and fulfill contractual obligations in good faith and timely manner.' },
  { title: 'Documents Required to File Contract Cases', content: 'Essential records include signed contracts, amendments, notices, invoices, payment proofs, and communication evidence.' },
  { title: 'Role of Contract Lawyer', content: 'Contract lawyers draft and review agreements, advise on risk, represent in disputes, and pursue remedies through negotiation/arbitration/litigation.' },
  { title: 'How Grover & Grover, Advocates Help in Contract Disputes', content: 'Grover & Grover, Advocates and Solicitors, supports end-to-end contract dispute resolution including drafting, notices, hearings, and enforcement strategy.' },
];

async function run() {
  try {
    await connectDB();
    console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

    const services = await Service.find({ slug: { $in: LEGACY_SLUGS } });
    if (!services.length) {
      console.log('No Contract service found.');
      process.exit(0);
    }

    const canonical =
      services.find((s) => s.slug === CANONICAL_SLUG) ||
      services.find((s) => s.slug === 'contract-disputes') ||
      services[0];

    if (APPLY) {
      canonical.slug = CANONICAL_SLUG;
      canonical.name = 'Contract Lawyer';
      canonical.title = 'Contract Lawyer';
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
        { serviceName: /Contract/i },
        { slug: /^contract-/i },
      ].filter(Boolean),
    });

    for (const page of pages) {
      const city = toTitleCase(page.city);
      const baseSlug = `contract-lawyer-in-${generateSlug(city)}`;
      const nextSlug = APPLY ? await generateUniqueSlug(LocationPage, baseSlug, page._id) : baseSlug;
      const seoTitle = `Contract Lawyer in ${city} - GAG Lawyers`;
      const seoDescription = `Contract Lawyer in ${city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.`;
      const seoKeywords = KEYWORDS_TEMPLATE.map((k) => localize(k, city)).join(', ');
      const sections = LOCATION_SECTIONS_TEMPLATE.map((s) => ({ title: localize(s.title, city), content: localize(s.content, city) }));

      if (APPLY) {
        page.service = canonical._id;
        page.serviceName = 'Contract Lawyer';
        page.city = city;
        page.slug = nextSlug;
        page.seo = { ...(page.seo || {}), title: seoTitle, description: seoDescription, keywords: seoKeywords, h1: `Contract Lawyer in ${city}` };
        page.content = { ...(page.content || {}), heading: `Contract Lawyer in ${city}`, intro: localize(LOCATION_SECTIONS_TEMPLATE[0].content, city), sections };
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

