require('dotenv').config();

const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');

const APPLY = process.argv.includes('--apply');

const BAIL_SERVICE_SLUGS = ['bail-lawyer'];

const BAIL_KEYWORDS_TEMPLATE = [
  'Top Criminal Lawyers in India',
  'Best Bail Lawyers in Delhi',
  'Top 10 Bail Lawyers in India',
  'Top Criminal lawyers in Delhi High Court',
  'supreme Court top 10 advocate list',
  'bond lawyers near me',
  'bail lawyers near me',
  'Lawyer for bail in Delhi',
  'Top Bail Lawyer in Supreme Court',
  'Top Bail Lawyer in Delhi High Court',
  'Top 10 Lawyer in Delhi High Court',
  'Bail Lawyer Fees in Delhi',
];

const makeGeneric = (text) =>
  String(text || '')
    .replace(/D¬elhi/gi, 'India')
    .replace(/\bDelhi\b/gi, 'India')
    .replace(/\bin delhi\b/gi, 'in India')
    .replace(/\bDelhi High Court\b/gi, 'High Court')
    .replace(/\s+/g, ' ')
    .trim();

const localize = (text, city) =>
  String(text || '')
    .replace(/D¬elhi/gi, city)
    .replace(/\bDelhi\b/gi, city)
    .replace(/\bin delhi\b/gi, `in ${city}`)
    .replace(/\bDelhi High Court\b/gi, `${city} High Court`)
    .replace(/\s+/g, ' ')
    .trim();

const titleCase = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const SERVICE_CONTENT = {
  title: 'Bail Lawyer - GAG Lawyers',
  description:
    'Bail Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  intro:
    'Bail is a legal process of temporarily releasing a person from custody, and individuals often search for Best Bail Lawyers or bail lawyers near me for immediate assistance. In India, bail is granted by the court to arrested persons who are charged with non-bailable offenses. The person must be released on bail and must appear in court at a later date.',
  overview:
    'The amount of bail that is granted depends on the severity of the crime and the financial status of the accused. In order to secure release from custody, the accused may post bail in cash to the court or, where needed, put up collateral in lieu of posting bail with legal assistance.',
  sections: [
    {
      title: 'Bail Cases',
      content:
        'To obtain a warrant, the police must show probable cause to believe that a person has committed an offense. Persons accused of crimes may be held before trial in jails or prisons. A proper bail strategy helps secure release from custody while ensuring compliance with all court conditions.',
    },
    {
      title: 'Types of Bails Under Law',
      content:
        'The Indian bail system broadly includes bailable and non-bailable bail. Bailable bail is granted subject to appearance conditions. Non-bailable bail depends on judicial satisfaction and case facts. The bail amount and terms differ based on offense gravity and risk factors.',
    },
    {
      title: 'Acts and provisions Related to Bail Cases',
      content:
        'Common forms include bail on personal bond, bail on recognizance, bail on undertaking, and bail on production of surety. Generally, the Magistrate grants bail subject to legal requirements and case-specific conditions.',
    },
    {
      title: 'Complete Procedure to file a bail | Fees to file a bail',
      content:
        'The accused applies before a competent court directly or through counsel. The court hears the application and may set terms including surety conditions. Professional fees vary by complexity and lawyer experience, and court processing fees are generally nominal.',
    },
    {
      title: 'Documents Required to file a Bail',
      content:
        'Typical documents include bail application, FIR/charge-sheet/case papers, surety documents, identity proof, passport-size photos, and bail bond papers as directed by the court.',
    },
    {
      title: 'What is Parole as per Criminal Law',
      content:
        'Parole is a conditional release from prison with restrictions on conduct. In India, parole eligibility and conditions are governed by prison laws and state rules, and depend on sentence details and compliance history.',
    },
    {
      title: 'Complete Procedure to apply Parole and fees to apply for Parole',
      content:
        'Parole applications are submitted to competent authorities with offense details, sentence data, and support documents. After review and verification, authorities decide whether parole may be granted under applicable rules.',
    },
    {
      title: 'Role of Bail Lawyer in Bail Cases | Role of Parole Lawyer in Parole Cases',
      content:
        'A bail/parole lawyer prepares applications, drafts supporting pleadings, presents legal arguments, ensures compliance with conditions, and advises on remedies in case of violation or rejection.',
    },
    {
      title: 'How Grover & Grover, Advocates Help in Bail Cases',
      content:
        'Our team assists with end-to-end strategy: case assessment, filing, hearing advocacy, surety guidance, compliance counselling, and trial-stage representation where required.',
    },
  ],
};

async function run() {
  try {
    await connectDB();
    console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

    const services = await Service.find({ slug: { $in: BAIL_SERVICE_SLUGS } });
    if (!services.length) {
      console.log('No bail services found.');
      process.exit(0);
    }

    for (const service of services) {
      if (APPLY) {
        service.shortDescription = makeGeneric(SERVICE_CONTENT.description);
        service.longDescription = makeGeneric(`${SERVICE_CONTENT.intro} ${SERVICE_CONTENT.overview}`);
        service.overview = makeGeneric(SERVICE_CONTENT.overview);
        await service.save();
      }
    }

    const locationFilter = {
      $or: [
        { serviceName: /Bail/i },
        { slug: /^bail-lawyer-in-/i },
      ],
    };

    const pages = await LocationPage.find(locationFilter);

    for (const page of pages) {
      const city = titleCase(page.city);

      const seoTitle = `Bail Lawyer in ${city} - GAG Lawyers`;
      const seoDescription = `Bail Lawyer in ${city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations`;
      const seoKeywords = BAIL_KEYWORDS_TEMPLATE.map((k) => localize(k, city)).join(', ');

      const sections = SERVICE_CONTENT.sections.map((s) => ({
        title: localize(s.title, city),
        content: localize(s.content, city),
      }));

      if (APPLY) {
        page.city = city;
        page.seo = {
          ...(page.seo || {}),
          title: seoTitle,
          description: seoDescription,
          keywords: seoKeywords,
          h1: `Bail Lawyer in ${city}`,
        };
        page.content = {
          ...(page.content || {}),
          heading: `Bail Lawyer in ${city}`,
          intro: localize(SERVICE_CONTENT.intro, city),
          sections,
        };
        await page.save();
      }
    }

    console.log(`Services updated: ${services.length}`);
    console.log(`Location pages updated: ${pages.length}`);

    const sampleService = await Service.findOne({ slug: 'bail-lawyer' }).select('slug shortDescription longDescription overview').lean();
    const sampleLocation = await LocationPage.findOne({ slug: /^bail-lawyer-in-/i, city: { $ne: 'Delhi' } }).select('city slug seo.title seo.description seo.keywords content.heading').lean();

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


