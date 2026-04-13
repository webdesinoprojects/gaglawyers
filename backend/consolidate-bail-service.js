require('dotenv').config();

const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const { generateSlug } = require('./utils/slugify');

const APPLY = process.argv.includes('--apply');

const KEYWORDS_TEMPLATE = [
  'Top Criminal Lawyers in India',
  'Best Bail Lawyers in Delhi',
  'Top 10 Bail Lawyers in India',
  'Top Criminal lawyers in Delhi High Court',
  'supreme Court top 10 advocate list',
  'bond lawyers near me',
  'bail lawyers near me',
  'Lawyer for bail in Delhi',
  'anticipatory bail lawyer in Delhi',
  'Top Bail Lawyer in Supreme Court',
  'Top Bail Lawyer in Delhi High Court',
  'Lawyer for Anticipatory bail in Delhi',
  'Advocate for Anticipatory bail in Delhi',
  'Top 10 Lawyer in Delhi High Court',
  'Bail Lawyer Fees in Delhi',
];

const toTitleCase = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const replaceCity = (text, city) =>
  String(text || '')
    .replace(/D¬elhi/gi, city)
    .replace(/\bDelhi\b/gi, city)
    .replace(/\bin delhi\b/gi, `in ${city}`)
    .replace(/\bDelhi High Court\b/gi, `${city} High Court`)
    .replace(/\s+/g, ' ')
    .trim();

const genericize = (text) =>
  String(text || '')
    .replace(/D¬elhi/gi, 'India')
    .replace(/\bDelhi\b/gi, 'India')
    .replace(/\bin delhi\b/gi, 'in India')
    .replace(/\bDelhi High Court\b/gi, 'High Court')
    .replace(/\s+/g, ' ')
    .trim();

const BAIL_SERVICE_CONTENT = {
  shortDescription:
    'Bail Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  overview:
    'Bail is a legal process of temporarily releasing a person from custody. In India, bail is granted by the court to arrested persons charged with non-bailable offenses. The accused is released on conditions and must appear before court as directed.',
  longDescription:
    'Bail is a legal process of temporarily releasing a person from custody, and individuals often search for immediate legal assistance for urgent relief. The amount of bail depends on the severity of the alleged offense and the financial status of the accused. To secure release from custody, an accused may post cash bail or furnish surety/collateral as permitted by the court. A structured legal strategy helps protect rights, ensure compliance with conditions, and reduce procedural delays.',
  typesOfCases: [
    'Regular Bail Applications',
    'Anticipatory Bail Applications',
    'Interim Bail Matters',
    'Cancellation/Opposition to Bail Proceedings',
    'Parole and Related Custody Relief Matters',
  ],
  process: [
    { step: 1, title: 'Case Review', description: 'Review FIR, charges, custody status, and legal grounds for bail.' },
    { step: 2, title: 'Application Drafting', description: 'Prepare bail application with supporting facts, records, and legal submissions.' },
    { step: 3, title: 'Court Filing & Hearing', description: 'File before competent court and argue urgency, merits, and applicable law.' },
    { step: 4, title: 'Surety & Compliance', description: 'Assist with surety/bond documents and compliance with imposed conditions.' },
    { step: 5, title: 'Post-Order Support', description: 'Guide on condition compliance, modification requests, and follow-up remedies.' },
  ],
  keyPoints: [
    'Focused criminal defense and bail strategy',
    'Quick drafting and urgent listing support',
    'Experience in High Court and trial court bail matters',
    'Support on surety, documentation, and compliance',
    'Clear advice on parole and custody-related remedies',
  ],
};

const LOCATION_SECTIONS_TEMPLATE = [
  {
    title: 'Bail Cases',
    content:
      'Bail is a legal process of temporarily releasing a person from custody, and individuals often search for Best Bail Lawyers in Delhi or bail lawyers near me for immediate assistance. In India, bail is granted by the court to arrested persons who are charged with non-bailable offenses. The person must be released on bail and must appear in court at a later date.',
  },
  {
    title: 'Types of Bails Under Law',
    content:
      'The Indian bail system consists primarily of bailable and non-bailable bail. The first type is granted subject to court appearance conditions. The second depends on judicial satisfaction of legal grounds and facts. The amount and terms vary according to case severity and risk factors.',
  },
  {
    title: 'Acts and provisions Related to Bail Cases',
    content:
      'Common forms include bail on personal bond, bail on recognizance, bail on undertaking, and bail on production of surety. Magistrates and higher courts grant relief based on legal provisions and facts. Proper representation helps present grounds effectively.',
  },
  {
    title: 'Complete Procedure to file a bail | Fees to file a bail',
    content:
      'The accused applies before a competent court directly or through a lawyer. The court hears the matter and may set surety/bond conditions. Professional legal fees vary with complexity and urgency; court processing fees are generally nominal.',
  },
  {
    title: 'Documents Required to file a Bail',
    content:
      'Typical documents include bail application, FIR/charge sheet/case records, surety papers, identity proofs, passport-sized photographs, and bail bond documentation as directed by the court.',
  },
  {
    title: 'What is Parole as per Criminal Law',
    content:
      'Parole is conditional release from prison with restrictions on conduct. Eligibility, grounds, and duration are governed by applicable prison laws and state rules. Legal guidance helps ensure proper filing and compliance.',
  },
  {
    title: 'Complete Procedure to apply Parole and fees to apply for Parole',
    content:
      'Parole requests are filed before competent authorities with offense details, sentence records, and supporting documents. Authorities review conduct, eligibility, and compliance risk before issuing an order.',
  },
  {
    title: 'Role of Bail Lawyer in Bail Cases | Role of Parole Lawyer in Parole Cases',
    content:
      'A lawyer handles drafting, filing, legal arguments, surety structuring, compliance advice, and strategic representation in bail/parole proceedings to protect the client’s rights and liberty interests.',
  },
  {
    title: 'How Grover & Grover, Advocates Help in Bail Cases',
    content:
      'Grover & Grover, Advocates and Solicitors, provides end-to-end support in bail matters: case assessment, filing, hearing advocacy, condition compliance, and trial-stage representation when required.',
  },
];

async function run() {
  try {
    await connectDB();
    console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

    const canonical = await Service.findOne({ slug: 'bail-lawyer' });
    const duplicate = await Service.findOne({
      slug: { $ne: 'bail-lawyer', $regex: /bail/i },
    });

    if (!canonical) {
      throw new Error('Canonical service with slug "bail-lawyer" not found.');
    }

    if (APPLY) {
      canonical.name = 'Bail Lawyer';
      canonical.title = 'Bail Lawyer';
      canonical.shortDescription = BAIL_SERVICE_CONTENT.shortDescription;
      canonical.longDescription = BAIL_SERVICE_CONTENT.longDescription;
      canonical.overview = BAIL_SERVICE_CONTENT.overview;
      canonical.typesOfCases = BAIL_SERVICE_CONTENT.typesOfCases;
      canonical.process = BAIL_SERVICE_CONTENT.process;
      canonical.keyPoints = BAIL_SERVICE_CONTENT.keyPoints;
      await canonical.save();
    }

    const bailPagesFilter = {
      $or: [
        { service: canonical._id },
        duplicate ? { service: duplicate._id } : null,
        { serviceName: /Bail/i },
        { slug: /^bail-lawyer-in-/i },
        { slug: /^bail.*anticipatory/i },
      ].filter(Boolean),
    };

    const bailPages = await LocationPage.find(bailPagesFilter);

    for (const page of bailPages) {
      const city = toTitleCase(page.city);
      const citySlug = generateSlug(city);

      const localizedKeywords = KEYWORDS_TEMPLATE.map((k) => replaceCity(k, city));
      const seoTitle = `Bail Lawyer in ${city} - GAG Lawyers`;
      const seoDescription = `Bail Lawyer in ${city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations`;
      const localizedSections = LOCATION_SECTIONS_TEMPLATE.map((s) => ({
        title: replaceCity(s.title, city),
        content: replaceCity(s.content, city),
      }));

      if (APPLY) {
        page.service = canonical._id;
        page.serviceName = 'Bail Lawyer';
        page.city = city;
        page.slug = `bail-lawyer-in-${citySlug}`;
        page.seo = {
          ...(page.seo || {}),
          title: seoTitle,
          description: seoDescription,
          keywords: localizedKeywords.join(', '),
          h1: `Bail Lawyer in ${city}`,
        };
        page.content = {
          ...(page.content || {}),
          heading: `Bail Lawyer in ${city}`,
          intro: replaceCity(LOCATION_SECTIONS_TEMPLATE[0].content, city),
          sections: localizedSections,
        };
        await page.save();
      }
    }

    if (APPLY && duplicate) {
      await Service.deleteOne({ _id: duplicate._id });
    }

    const remainingBailServices = await Service.find({ slug: /bail/i }).select('name slug').lean();
    console.log('Bail services now:', remainingBailServices);
    console.log('Location pages touched:', bailPages.length);

    process.exit(0);
  } catch (error) {
    console.error('Failed to consolidate bail services:', error);
    process.exit(1);
  }
}

run();

