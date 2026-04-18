const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const { buildLocationPageSlug, generateUniqueSlug } = require('./utils/slugify');

dotenv.config();

const APPLY = process.argv.includes('--apply');

const makePayload = async (service, city) => {
  const baseSlug = buildLocationPageSlug(service.slug, city);
  const slug = await generateUniqueSlug(LocationPage, baseSlug);
  const serviceName = service.name;
  const serviceNameLower = serviceName.toLowerCase();
  const cityLower = city.toLowerCase();

  return {
    service: service._id,
    serviceName,
    city,
    slug,
    content: {
      templateMode: 'service',
      heading: `${serviceName} in ${city}`,
      intro: `GAG Lawyers provides expert ${serviceNameLower} support in ${city}.`,
      sections: [
        {
          title: `Why Choose Our ${serviceName} Team in ${city}`,
          content: `We provide focused legal support for ${serviceNameLower} matters in ${city}.`,
        },
      ],
    },
    images: [],
    seo: {
      title: `${serviceName} in ${city} | GAG Lawyers`,
      description: `Looking for ${serviceNameLower} in ${city}? GAG Lawyers offers experienced legal support.`,
      keywords: `${serviceNameLower}, ${cityLower}, lawyers, advocates`,
      h1: `${serviceName} in ${city}`,
    },
    isActive: true,
    views: 0,
  };
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to MongoDB. Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

  const services = await Service.find({}).select('_id name slug').lean();
  const serviceIds = services.map((service) => service._id);
  const masterCitiesRaw = await LocationPage.distinct('city', {
    service: { $in: serviceIds },
    city: { $exists: true, $ne: '' },
  });
  const masterCities = [...new Set(masterCitiesRaw.map((city) => String(city).trim()).filter(Boolean))];

  const rows = await LocationPage.aggregate([
    { $match: { service: { $in: serviceIds }, city: { $exists: true, $ne: '' } } },
    { $group: { _id: '$service', cities: { $addToSet: '$city' } } },
  ]);

  const citySetByService = new Map(
    rows.map((row) => [
      String(row._id),
      new Set((row.cities || []).map((city) => String(city).trim()).filter(Boolean)),
    ])
  );

  const toCreate = [];
  for (const service of services) {
    const covered = citySetByService.get(String(service._id)) || new Set();
    for (const city of masterCities) {
      if (!covered.has(city)) {
        toCreate.push({ service, city });
      }
    }
  }

  console.log(`Master locations: ${masterCities.length}`);
  console.log(`Remaining missing pages: ${toCreate.length}`);

  if (!APPLY) {
    console.log('Dry run only. Re-run with --apply to create remaining pages.');
    await mongoose.disconnect();
    return;
  }

  let created = 0;
  for (let i = 0; i < toCreate.length; i++) {
    const item = toCreate[i];
    const payload = await makePayload(item.service, item.city);
    try {
      await LocationPage.create(payload);
      created += 1;
    } catch (error) {
      if (error?.code !== 11000) {
        throw error;
      }
    }
    if ((i + 1) % 100 === 0 || i + 1 === toCreate.length) {
      console.log(`Progress: ${i + 1}/${toCreate.length}`);
    }
  }

  console.log(`Created pages: ${created}`);

  await mongoose.disconnect();
  console.log('Done.');
};

run().catch(async (error) => {
  console.error('Fill gaps failed:', error);
  try {
    await mongoose.disconnect();
  } catch (disconnectError) {
    console.error('Disconnect failed:', disconnectError);
  }
  process.exit(1);
});
