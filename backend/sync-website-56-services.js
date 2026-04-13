require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const websiteServices = [
  { id: 100, name: 'IP License Agreement' },
  { id: 99, name: 'Partnership Deed' },
  { id: 98, name: 'Franchise Agreement' },
  { id: 97, name: 'RERA Registration' },
  { id: 96, name: 'Loan Agreement' },
  { id: 95, name: 'Non-disclosure Agreement' },
  { id: 94, name: 'Employment Agreement' },
  { id: 93, name: 'Rent Agreement' },
  { id: 92, name: 'Sale Deed' },
  { id: 91, name: 'Agreement to Sell' },
  { id: 90, name: 'Leave and License Agreement' },
  { id: 89, name: 'Memorandum of Understanding MOU' },
  { id: 88, name: 'Succession Certificate' },
  { id: 87, name: 'Legal Notice' },
  { id: 86, name: 'SMC Certificate' },
  { id: 83, name: 'Debt Recovery Lawyer (DRT Lawyer)' },
  { id: 82, name: 'Writ Petition Lawyer' },
  { id: 81, name: 'Firearms Lawyer' },
  { id: 80, name: 'Right To Information Lawyer' },
  { id: 79, name: 'Armed Force Tribunal Lawyer' },
  { id: 78, name: 'Cyber Crime Lawyer' },
  { id: 77, name: 'Insurance Lawyer' },
  { id: 76, name: 'Landlord Tenant Lawyer' },
  { id: 75, name: 'Will Lawyer' },
  { id: 74, name: 'Marriage Registration Lawyer' },
  { id: 73, name: 'Medical Negligence Lawyer' },
  { id: 72, name: 'Motor Accident Lawyer' },
  { id: 71, name: 'Muslim Lawyer' },
  { id: 70, name: 'Property Lawyer' },
  { id: 69, name: 'Supreme Court Lawyer' },
  { id: 68, name: 'High Court Lawyer' },
  { id: 67, name: 'Consumer Court Lawyer' },
  { id: 66, name: 'Divorce Lawyer' },
  { id: 65, name: 'Insolvency bankruptcy Lawyer' },
  { id: 64, name: 'Sexual Harassment Lawyer' },
  { id: 63, name: 'Military Lawyer' },
  { id: 62, name: 'Environment Lawyer' },
  { id: 61, name: 'Media and Broadcasting Lawyer' },
  { id: 60, name: 'Dowry Lawyer' },
  { id: 59, name: 'CAT Matters Lawyer' },
  { id: 58, name: 'Food & Drug Lawyer' },
  { id: 57, name: 'Sports Lawyer' },
  { id: 56, name: 'Contract Lawyer' },
  { id: 55, name: 'Human Rights Lawyer' },
  { id: 54, name: 'Labour Lawyer' },
  { id: 53, name: 'Court Marriage Lawyer' },
  { id: 52, name: 'Employment Lawyer' },
  { id: 51, name: 'Immigration Lawyer' },
  { id: 50, name: 'Bail Lawyer' },
  { id: 49, name: 'Child Custody Lawyer' },
  { id: 48, name: 'Corporate Lawyer' },
  { id: 47, name: 'Mediation and Arbitration Lawyer' },
  { id: 46, name: 'Civil Lawyer' },
  { id: 40, name: 'Family Lawyer' },
  { id: 27, name: 'Cheque Bounce Lawyer' },
  { id: 26, name: 'Criminal Lawyer' },
];

const existingNameToWebsiteId = {
  'armed forces tribunal (aft) cases': 79,
  'bail & anticipatory bail cases': 50,
  'cat (central administrative tribunal) matters': 59,
  'contract dispute cases': 56,
  'civil law & civil disputes': 46,
  'cheque bounce cases': 27,
  'insurance claim & dispute cases': 77,
  'high court litigation': 68,
  'cyber crime cases': 78,
  'employment & labour law cases': 54,
  'insolvency & bankruptcy cases': 65,
  'corporate law services': 48,
  'immigration law services': 51,
  'debt recovery (drt) cases': 83,
  'landlord-tenant disputes': 76,
  'criminal defense cases': 26,
  'divorce & matrimonial cases': 66,
  'family law disputes': 40,
  'writ petition & public interest litigation (pil)': 82,
  'property law & real estate disputes': 70,
  'sexual harassment & 498a cases': 64,
  'legal notice & documentation': 87,
  'motor accident & mact cases': 72,
  'supreme court litigation': 69,
  'mediation & arbitration (adr)': 47,
};

const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const chooseCategory = (name) => {
  const n = name.toLowerCase();

  if (n.includes('bail') || n.includes('criminal') || n.includes('cyber') || n.includes('dowry') || n.includes('sexual harassment') || n.includes('firearms')) {
    return 'criminal';
  }
  if (n.includes('supreme court') || n.includes('high court') || n.includes('writ') || n.includes('consumer court')) {
    return 'litigation';
  }
  if (n.includes('marriage') || n.includes('divorce') || n.includes('child custody') || n.includes('family') || n.includes('muslim') || n.includes('will')) {
    return 'family';
  }
  if (n.includes('employment') || n.includes('labour')) {
    return 'labour';
  }
  if (n.includes('property') || n.includes('rent') || n.includes('sale deed') || n.includes('agreement to sell') || n.includes('landlord') || n.includes('rera')) {
    return 'property';
  }
  if (n.includes('corporate') || n.includes('franchise') || n.includes('partnership') || n.includes('ip')) {
    return 'corporate';
  }
  if (n.includes('immigration')) {
    return 'immigration';
  }
  if (n.includes('mediation') || n.includes('arbitration')) {
    return 'adr';
  }
  if (n.includes('cat') || n.includes('right to information')) {
    return 'administrative';
  }
  if (n.includes('armed force') || n.includes('military')) {
    return 'military';
  }

  return 'civil';
};

const ensureUniqueSlug = async (baseSlug) => {
  let slug = baseSlug;
  let i = 1;
  while (await Service.exists({ slug })) {
    i += 1;
    slug = `${baseSlug}-${i}`;
  }
  return slug;
};

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const existing = await Service.find({});
    const matchedWebsiteIds = new Set();
    const updated = [];

    for (const svc of existing) {
      const key = normalize(svc.name || '');
      const websiteId = existingNameToWebsiteId[key];
      if (!websiteId) continue;

      const canonical = websiteServices.find((w) => w.id === websiteId);
      if (!canonical) continue;

      matchedWebsiteIds.add(canonical.id);

      if (svc.name !== canonical.name || svc.order !== canonical.id) {
        svc.name = canonical.name;
        svc.order = canonical.id;
        if (!svc.shortDescription) {
          svc.shortDescription = `${canonical.name} legal representation and advisory services.`;
        }
        if (!svc.longDescription) {
          svc.longDescription = `Comprehensive ${canonical.name.toLowerCase()} support with experienced legal guidance.`;
        }
        await svc.save();
        updated.push(canonical.name);
      }
    }

    const existingNamesNormalized = new Set(
      (await Service.find({}, 'name')).map((s) => normalize(s.name || ''))
    );

    const inserted = [];

    for (const ws of websiteServices) {
      if (matchedWebsiteIds.has(ws.id)) continue;
      if (existingNamesNormalized.has(normalize(ws.name))) continue;

      const baseSlug = slugify(ws.name);
      const slug = await ensureUniqueSlug(baseSlug);

      await Service.create({
        name: ws.name,
        slug,
        category: chooseCategory(ws.name),
        shortDescription: `${ws.name} legal services with trusted representation.`,
        longDescription: `Our team provides end-to-end legal assistance for ${ws.name.toLowerCase()} matters, including advice, documentation, and representation.`,
        overview: `${ws.name} support tailored to your legal needs.`,
        typesOfCases: [ws.name],
        process: [
          { step: 1, title: 'Consultation', description: `Initial assessment for ${ws.name.toLowerCase()} requirements.` },
          { step: 2, title: 'Documentation', description: 'Preparation and verification of required legal documents.' },
          { step: 3, title: 'Representation', description: 'Filing, follow-up, and representation before relevant authorities or courts.' },
        ],
        keyPoints: [
          'Experienced legal team',
          'Timely documentation support',
          'Transparent case guidance',
        ],
        iconName: 'Briefcase',
        order: ws.id,
      });

      inserted.push(ws.name);
      existingNamesNormalized.add(normalize(ws.name));
    }

    const finalServices = await Service.find({}, 'name').lean();
    const finalNames = new Set(finalServices.map((s) => normalize(s.name || '')));
    const stillMissing = websiteServices
      .filter((ws) => !finalNames.has(normalize(ws.name)))
      .map((ws) => ws.name);

    console.log(`Updated: ${updated.length}`);
    console.log(`Inserted: ${inserted.length}`);
    console.log(`Total services now: ${finalServices.length}`);

    if (stillMissing.length > 0) {
      console.log('Still missing from website-56 list:');
      stillMissing.forEach((name) => console.log(`- ${name}`));
    } else {
      console.log('All 56 website services are now present.');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Sync failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

main();
