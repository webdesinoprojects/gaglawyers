require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

/**
 * SEO data update script for 20 service pages.
 * Updates only:
 *   - seo.title
 *   - seo.metaDescription
 *   - seo.keywords
 *
 * Notes:
 * - Keeps all other service fields untouched.
 * - Keeps other seo fields untouched.
 * - Any internal "-2" markers in source keyword lists are stripped.
 */

const SERVICE_SEO_UPDATES = [
  {
    slug: 'bail-lawyer',
    title: 'Bail Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Bail Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Top Criminal Lawyers in India, Best Bail Lawyers in Delhi, Top 10 Bail Lawyers in India, Top Criminal lawyers in Delhi High Court, supreme Court top 10 advocate list, bond lawyers near me, bail lawyers near me, Lawyer for bail in Delhi, anticipatory bail lawyer in Delhi, Top Bail Lawyer in Supreme Court, Top Bail Lawyer in Delhi High Court, Lawyer for Anticipatory bail in Delhi, Advocate for Anticipatory bail in Delhi, Top 10 Lawyer in Delhi High Court, Bail Lawyer Fees in Delhi',
  },
  {
    slug: 'cheque-bounce-lawyer',
    title: 'Cheque Bounce Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Cheque Bounce Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Cheque Bounce Lawyer in Delhi, Section 138 NI Act lawyer Delhi, best cheque bounce lawyer near me, cheque dishonour lawyer Delhi, cheque bounce case lawyer fees Delhi, top cheque bounce advocate Delhi High Court, legal notice for cheque bounce Delhi, cheque bounce complaint lawyer, NI Act 138 advocate Delhi, cheque bounce case Supreme Court lawyer',
  },
  {
    slug: 'civil-lawyer',
    title: 'Civil Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Civil Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Civil Lawyer in Delhi, best civil lawyer near me, top civil advocate Delhi High Court, civil litigation lawyer Delhi, property dispute civil lawyer Delhi, civil suit lawyer Delhi, civil court lawyer fees Delhi, top 10 civil lawyers in India, civil lawyer for property Delhi, experienced civil advocate Delhi',
  },
  {
    slug: 'agreement-to-sell',
    title: 'Agreement to Sell Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Agreement to Sell Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Agreement to Sell Lawyer Delhi, property sale agreement lawyer Delhi, sale deed lawyer near me, agreement to sell drafting Delhi, property agreement lawyer Delhi High Court, best property lawyer Delhi, sale agreement advocate Delhi, immovable property agreement lawyer, agreement to sell registration Delhi, top property lawyer Delhi',
  },
  {
    slug: 'human-rights-lawyer',
    title: 'Human Rights Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Human Rights Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Human Rights Lawyer in Delhi, best human rights advocate Delhi, PIL lawyer Delhi High Court, NHRC complaint lawyer Delhi, human rights violation lawyer near me, top human rights lawyer India, fundamental rights lawyer Delhi, PIL filing lawyer Supreme Court, human rights attorney Delhi, SHRC complaint lawyer Delhi',
  },
  {
    slug: 'landlord-tenant-lawyer',
    title: 'Landlord Tenant Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Landlord Tenant Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Landlord Tenant Lawyer Delhi, eviction lawyer Delhi, rent dispute lawyer near me, tenant eviction advocate Delhi, Delhi Rent Control Act lawyer, best landlord lawyer Delhi, illegal eviction lawyer Delhi, rent recovery lawyer Delhi, tenancy agreement lawyer Delhi, top 10 property dispute lawyers Delhi',
  },
  {
    slug: 'legal-notice-lawyer',
    title: 'Legal Notice Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Legal Notice Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Legal Notice Lawyer Delhi, send legal notice Delhi, legal notice drafting lawyer near me, legal notice advocate Delhi High Court, reply to legal notice lawyer Delhi, best legal notice lawyer India, legal notice for money recovery Delhi, Section 80 CPC notice lawyer, legal notice fees Delhi, top legal notice advocate Delhi',
  },
  {
    slug: 'marriage-registration-lawyer',
    title: 'Marriage Registration Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Marriage Registration Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Marriage Registration Lawyer Delhi, court marriage lawyer Delhi, Special Marriage Act lawyer near me, Hindu marriage registration Delhi, marriage certificate lawyer Delhi, best court marriage advocate Delhi, NRI marriage registration lawyer Delhi, marriage registration fees Delhi, tatkal marriage registration Delhi, court marriage procedure lawyer Delhi',
  },
  {
    slug: 'mediation-and-arbitration-lawyer',
    title: 'Mediation & Arbitration Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Mediation & Arbitration Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Arbitration Lawyer Delhi, mediation lawyer near me, ADR lawyer Delhi High Court, commercial arbitration advocate Delhi, dispute resolution lawyer Delhi, best arbitration lawyer India, Section 11 arbitration lawyer Delhi, arbitral award enforcement lawyer, international arbitration lawyer Delhi, mediation advocate Supreme Court',
  },
  {
    slug: 'motor-accident-lawyer',
    title: 'Motor Accident Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Motor Accident Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Motor Accident Lawyer Delhi, MACT claim lawyer Delhi, accident compensation lawyer near me, hit and run case lawyer Delhi, vehicle accident advocate Delhi High Court, best accident lawyer Delhi, motor accident claim fees Delhi, fatal accident lawyer Delhi, road accident compensation lawyer, top MACT lawyer Delhi',
  },
  {
    slug: 'armed-force-tribunal-lawyer',
    title: 'Armed Forces Tribunal Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Armed Forces Tribunal Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Armed Forces Tribunal Lawyer Delhi, AFT lawyer near me, military lawyer Delhi, court martial lawyer India, army pension dispute lawyer Delhi, best AFT advocate Delhi, armed forces service matter lawyer, AFT principal bench Delhi lawyer, defence lawyer India, top military advocate Supreme Court',
  },
  {
    slug: 'cat-matters-lawyer',
    title: 'CAT Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'CAT Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'CAT Lawyer Delhi, Central Administrative Tribunal lawyer near me, government employee lawyer Delhi, CAT case advocate Delhi, service matter lawyer Delhi High Court, best CAT lawyer India, CAT OA filing lawyer Delhi, disciplinary case lawyer CAT, promotion dispute lawyer CAT Delhi, top CAT advocate Delhi',
  },
  {
    slug: 'consumer-court-lawyer',
    title: 'Consumer Court Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Consumer Court Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Consumer Court Lawyer Delhi, consumer forum advocate near me, NCDRC lawyer Delhi, consumer complaint lawyer Delhi High Court, deficiency of service lawyer Delhi, best consumer court lawyer India, consumer protection lawyer Delhi, product liability lawyer Delhi, builder complaint consumer court Delhi, consumer court fees lawyer Delhi',
  },
  {
    slug: 'dowry-lawyer',
    title: 'Dowry Case Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Dowry Case Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Dowry Lawyer Delhi, Section 498A lawyer near me, dowry harassment advocate Delhi, dowry death lawyer Delhi High Court, domestic violence lawyer Delhi, best dowry case lawyer India, 498A anticipatory bail lawyer Delhi, dowry case defense lawyer Delhi, cruelty case lawyer Delhi, top criminal lawyer dowry Delhi',
  },
  {
    slug: 'food-and-drug-lawyer',
    title: 'Food & Drug Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Food & Drug Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Food Drug Lawyer Delhi, FSSAI lawyer near me, food adulteration advocate Delhi, Drugs Cosmetics Act lawyer Delhi High Court, food safety lawyer India, best FSSAI compliance lawyer Delhi, drug license lawyer Delhi, food contamination case lawyer, pharmaceutical lawyer Delhi, top food law advocate India',
  },
  {
    slug: 'labour-lawyer',
    title: 'Labour Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Labour Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Labour Lawyer Delhi, employment lawyer near me, wrongful termination lawyer Delhi, industrial dispute advocate Delhi High Court, PF dispute lawyer Delhi, best labour lawyer India, labour court lawyer Delhi, workmen compensation lawyer Delhi, trade union lawyer Delhi, top employment advocate Supreme Court',
  },
  {
    slug: 'media-and-broadcasting-lawyer',
    title: 'Media & Broadcasting Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Media & Broadcasting Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Media Lawyer Delhi, broadcasting lawyer near me, entertainment lawyer Delhi High Court, defamation lawyer Delhi, IP media advocate Delhi, best media law lawyer India, content licensing lawyer Delhi, OTT platform lawyer Delhi, press freedom lawyer India, top broadcasting advocate Supreme Court',
  },
  {
    slug: 'medical-negligence-lawyer',
    title: 'Medical Negligence Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Medical Negligence Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Medical Negligence Lawyer Delhi, hospital negligence advocate near me, doctor negligence case lawyer Delhi High Court, medical malpractice lawyer India, best medical negligence lawyer Delhi, surgery negligence lawyer Delhi, medical compensation lawyer Delhi, consumer court medical case lawyer, top medical negligence advocate Supreme Court, hospital lawsuit lawyer Delhi',
  },
  {
    slug: 'sexual-harassment-lawyer',
    title: 'Sexual Harassment Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Sexual Harassment Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Sexual Harassment Lawyer Delhi, POSH Act lawyer near me, workplace harassment advocate Delhi, ICC complaint lawyer Delhi High Court, best POSH lawyer India, Section 354 IPC lawyer Delhi, sexual harassment at work lawyer Delhi, SHRC complaint lawyer Delhi, top POSH advocate Supreme Court, women harassment lawyer Delhi',
  },
  {
    slug: 'supreme-court-lawyer',
    title: 'Supreme Court Lawyer in Delhi - GAG Lawyers',
    metaDescription:
      'Supreme Court Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
    keywords:
      'Supreme Court Lawyer Delhi, SLP lawyer near me, Supreme Court advocate Delhi, writ petition Supreme Court lawyer, constitutional lawyer India, best Supreme Court lawyer Delhi, top 10 Supreme Court advocates India, Supreme Court lawyer fees Delhi, appeal lawyer Supreme Court India, senior advocate Supreme Court Delhi',
  },
];

const sanitizeKeywords = (keywords) =>
  String(keywords)
    .split(',')
    .map((kw) => kw.replace(/-2\b/g, '').trim())
    .filter(Boolean)
    .join(', ');

const SLUG_FALLBACKS = {
  'legal-notice-lawyer': 'legal-notice',
};

async function run() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Missing MONGO_URI in environment');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const primarySlugs = SERVICE_SEO_UPDATES.map((item) => item.slug);
    const fallbackSlugs = Object.values(SLUG_FALLBACKS);
    const lookupSlugs = [...new Set([...primarySlugs, ...fallbackSlugs])];
    const existingServices = await Service.find({ slug: { $in: lookupSlugs } }).select('slug').lean();
    const existingSlugSet = new Set(existingServices.map((service) => service.slug));

    const missing = primarySlugs.filter((slug) => !existingSlugSet.has(slug));
    if (missing.length > 0) {
      console.log(`Warning: ${missing.length} slug(s) not found: ${missing.join(', ')}`);
    }

    const fallbackApplied = [];
    const ops = SERVICE_SEO_UPDATES.map((item) => {
      const fallbackSlug = SLUG_FALLBACKS[item.slug];
      const targetSlug =
        existingSlugSet.has(item.slug) ? item.slug : (fallbackSlug && existingSlugSet.has(fallbackSlug) ? fallbackSlug : item.slug);

      if (targetSlug !== item.slug) {
        fallbackApplied.push(`${item.slug} -> ${targetSlug}`);
      }

      return {
      updateOne: {
        filter: { slug: targetSlug },
        update: {
          $set: {
            'seo.title': item.title,
            'seo.metaDescription': item.metaDescription,
            'seo.keywords': sanitizeKeywords(item.keywords),
          },
        },
      },
    };
    });

    const result = await Service.bulkWrite(ops, { ordered: false });

    console.log('--- SEO UPDATE SUMMARY ---');
    console.log(`Requested updates: ${SERVICE_SEO_UPDATES.length}`);
    console.log(`Matched: ${result.matchedCount}`);
    console.log(`Modified: ${result.modifiedCount}`);
    console.log(`Missing slugs: ${missing.length}`);
    if (fallbackApplied.length > 0) {
      console.log(`Fallbacks applied: ${fallbackApplied.join(', ')}`);
    }
    console.log('Completed.');
  } catch (error) {
    console.error(`SEO update failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

run();
