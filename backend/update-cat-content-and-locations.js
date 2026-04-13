require('dotenv').config();

const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const { generateSlug, generateUniqueSlug } = require('./utils/slugify');

const APPLY = process.argv.includes('--apply');

const CAT_SERVICE_SLUGS = ['cat-matters-lawyer', 'cat-central-administrative-tribunal'];

const CAT_KEYWORDS_TEMPLATE = [
  'CAT Lawyer near me',
  'CAT Lawyer fees in Delhi',
  'Best CAT Lawyer near me',
  'Top CAT Lawyer in India',
  'CAT Lawyer Advocate in Delhi',
  'Best Advocates for CAT Matters in Delhi',
  'Best Lawyers for CAT Matters in Delhi',
  'Lawyer for CAT Matters in Delhi',
  'Lawyer for Central Administrative Tribunal Matters in Delhi',
  'CAT Lawyer in High Court',
  'Top CAT Lawyer in Supreme Court',
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
    'CAT Matters Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  longDescription:
    'The Central Administrative Tribunal (CAT) is an independent judicial body under the Administrative Tribunals Act, 1985 that adjudicates service disputes related to recruitment, promotions, disciplinary actions, transfers, pay, pensions, and service conditions of eligible government employees. Our team provides focused legal representation in CAT matters from drafting and filing to hearing strategy and post-order remedies.',
  overview:
    'CAT provides a specialized forum for service-law disputes between government entities and employees. Effective representation requires strong pleadings, procedural accuracy, documentary support, and clear legal strategy.',
  typesOfCases: [
    'Recruitment and Appointment Disputes',
    'Promotion and Seniority Matters',
    'Disciplinary Proceedings and Penalties',
    'Transfers and Service Conditions',
    'Pay, Pension, and Allowance Disputes',
  ],
  process: [
    { step: 1, title: 'Case Evaluation', description: 'Assess service records, impugned orders, and jurisdictional fit before CAT.' },
    { step: 2, title: 'Pleading Preparation', description: 'Prepare OA/MA and supporting affidavits with complete documentary records.' },
    { step: 3, title: 'Filing and Admission', description: 'File before the proper bench and pursue listing, notice, and interim relief.' },
    { step: 4, title: 'Hearing Advocacy', description: 'Present legal arguments, records, precedents, and rebuttal strategy.' },
    { step: 5, title: 'Post-Order Strategy', description: 'Advise on compliance, review, or further constitutional/appellate remedies.' },
  ],
  keyPoints: [
    'Focused service-law and CAT litigation strategy',
    'Structured documentation and pleading support',
    'Interim relief and final hearing representation',
    'Practical advice on timelines and procedural compliance',
    'Post-order and challenge strategy where required',
  ],
};

const LOCATION_SECTIONS_TEMPLATE = [
  {
    title: 'CAT Matters',
    content:
      'The Central Administrative Tribunal (CAT) is an independent judicial body established under the Administrative Tribunals Act, 1985 to adjudicate disputes concerning recruitment, promotion, disciplinary action, and service conditions of government personnel.',
  },
  {
    title: 'Types of Disputes Handled by CAT Matters',
    content:
      'CAT handles disputes involving appointments, promotions, transfers, disciplinary proceedings, pay and allowances, pension, seniority, termination, and related service-condition issues for eligible public servants.',
  },
  {
    title: 'Acts and Provisions Attracted in Service CAT Matters',
    content:
      'CAT proceedings are primarily governed by the Administrative Tribunals Act, 1985 along with applicable service rules, constitutional principles, departmental regulations, and judicial precedents.',
  },
  {
    title: 'Rights and Obligations Under CAT Matters to Government Employees',
    content:
      'Government employees have the right to challenge adverse administrative action before CAT. Applicants must provide complete and accurate records while complying with tribunal procedure and orders.',
  },
  {
    title: 'Role of Lawyers in CAT Matters',
    content:
      'A CAT lawyer prepares pleadings, compiles evidence, advises on maintainability, argues interim and final relief, and guides clients on further remedies after tribunal orders.',
  },
  {
    title: 'How Grover & Grover, Advocates Help Related to CAT Matters',
    content:
      'Grover & Grover, Advocates and Solicitors provides end-to-end CAT representation including case assessment, drafting, filing, hearing advocacy, and post-order legal strategy.',
  },
];

async function run() {
  try {
    await connectDB();
    console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

    const services = await Service.find({ slug: { $in: CAT_SERVICE_SLUGS } });
    if (!services.length) {
      console.log('No CAT services found.');
      process.exit(0);
    }

    for (const service of services) {
      if (APPLY) {
        service.name = 'CAT Matters Lawyer';
        service.title = 'CAT Matters Lawyer';
        service.shortDescription = SERVICE_CONTENT.shortDescription;
        service.longDescription = SERVICE_CONTENT.longDescription;
        service.overview = SERVICE_CONTENT.overview;
        service.typesOfCases = SERVICE_CONTENT.typesOfCases;
        service.process = SERVICE_CONTENT.process;
        service.keyPoints = SERVICE_CONTENT.keyPoints;
        await service.save();
      }
    }

    const catPagesFilter = {
      $or: [
        { service: { $in: services.map((s) => s._id) } },
        { serviceName: /CAT|Central Administrative Tribunal/i },
        { slug: /^cat-/i },
      ],
    };

    const pages = await LocationPage.find(catPagesFilter);
    const canonicalServiceId = services[0]._id;

    for (const page of pages) {
      const city = toTitleCase(page.city);
      const baseSlug = `cat-matters-lawyer-in-${generateSlug(city)}`;
      const nextSlug = APPLY ? await generateUniqueSlug(LocationPage, baseSlug, page._id) : baseSlug;

      const seoTitle = `CAT Matters Lawyer in ${city} - GAG Lawyers`;
      const seoDescription = `CAT Matters Lawyer in ${city} - GAG Lawyers We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations`;
      const seoKeywords = CAT_KEYWORDS_TEMPLATE.map((k) => localize(k, city)).join(', ');
      const sections = LOCATION_SECTIONS_TEMPLATE.map((s) => ({
        title: localize(s.title, city),
        content: localize(s.content, city),
      }));

      if (APPLY) {
        page.service = canonicalServiceId;
        page.serviceName = 'CAT Matters Lawyer';
        page.city = city;
        page.slug = nextSlug;
        page.seo = {
          ...(page.seo || {}),
          title: seoTitle,
          description: seoDescription,
          keywords: seoKeywords,
          h1: `CAT Matters Lawyer in ${city}`,
        };
        page.content = {
          ...(page.content || {}),
          heading: `CAT Matters Lawyer in ${city}`,
          intro: localize(LOCATION_SECTIONS_TEMPLATE[0].content, city),
          sections,
        };
        await page.save();
      }
    }

    console.log(`Services updated: ${services.length}`);
    console.log(`Location pages updated: ${pages.length}`);

    const sampleService = await Service.findOne({ slug: 'cat-matters-lawyer' }).select('slug name shortDescription').lean();
    const sampleLocation = await LocationPage.findOne({ slug: /^cat-matters-lawyer-in-/i, city: { $ne: 'Delhi' } })
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

