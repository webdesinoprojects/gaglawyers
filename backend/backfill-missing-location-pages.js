const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const { buildLocationPageSlug } = require('./utils/slugify');

dotenv.config();

const APPLY = process.argv.includes('--apply');
const BATCH_SIZE = 1000;

const buildPagePayload = (service, city) => {
  const serviceName = service.name;
  const slug = buildLocationPageSlug(service.slug, city);
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
      intro: `GAG Lawyers provides expert ${serviceNameLower} support in ${city}. Our legal team offers practical strategy, clear communication, and reliable representation.`,
      sections: [
        {
          title: `Why Choose Our ${serviceName} Team in ${city}`,
          content: `We provide focused legal support for ${serviceNameLower} matters in ${city}, with clear planning and responsive client communication.`,
        },
        {
          title: `How We Work`,
          content: `Every matter is handled with a structured approach: case assessment, documentation review, strategy planning, and timely legal action.`,
        },
        {
          title: `Consultation in ${city}`,
          content: `Speak with our team for guidance on your ${serviceNameLower} matter in ${city}. We will help you understand options and next legal steps.`,
        },
      ],
    },
    images: [],
    seo: {
      title: `${serviceName} in ${city} | GAG Lawyers`,
      description: `Looking for ${serviceNameLower} in ${city}? GAG Lawyers offers experienced legal support with a practical and client-focused approach.`,
      keywords: `${serviceNameLower}, ${cityLower}, lawyers, advocates, legal services`,
      h1: `${serviceName} in ${city}`,
    },
    isActive: true,
    views: 0,
  };
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to MongoDB. Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

  const services = await Service.find({}).select('_id name slug').sort({ name: 1 }).lean();
  if (services.length === 0) {
    console.log('No services found. Nothing to do.');
    await mongoose.disconnect();
    return;
  }

  const validServiceIds = services.map((service) => service._id);
  const rawCities = await LocationPage.distinct('city', {
    service: { $in: validServiceIds },
    city: { $exists: true, $ne: '' },
  });

  const masterCities = [...new Set(rawCities.map((city) => String(city).trim()).filter(Boolean))];
  const totalCities = masterCities.length;

  console.log(`Services found: ${services.length}`);
  console.log(`Master locations found: ${totalCities}`);

  if (totalCities === 0) {
    console.log('No master locations found from current location pages. Aborting.');
    await mongoose.disconnect();
    return;
  }

  const coverageRows = await LocationPage.aggregate([
    {
      $match: {
        service: { $in: validServiceIds },
        city: { $exists: true, $ne: '' },
      },
    },
    {
      $group: {
        _id: '$service',
        cities: { $addToSet: '$city' },
      },
    },
  ]);

  const citySetByServiceId = new Map();
  coverageRows.forEach((row) => {
    citySetByServiceId.set(
      String(row._id),
      new Set((row.cities || []).map((city) => String(city).trim()).filter(Boolean))
    );
  });

  let totalMissing = 0;
  const inserts = [];
  const perServiceSummary = [];

  for (const service of services) {
    const currentCitySet = citySetByServiceId.get(String(service._id)) || new Set();
    const missingCities = masterCities.filter((city) => !currentCitySet.has(city));
    totalMissing += missingCities.length;

    perServiceSummary.push({
      serviceName: service.name,
      existing: currentCitySet.size,
      missing: missingCities.length,
      target: totalCities,
    });

    if (APPLY && missingCities.length > 0) {
      for (const city of missingCities) {
        inserts.push(buildPagePayload(service, city));
      }
    }
  }

  console.log(`Total missing pages across all services: ${totalMissing}`);
  console.log('Top services by missing count:');
  perServiceSummary
    .sort((a, b) => b.missing - a.missing || a.serviceName.localeCompare(b.serviceName))
    .slice(0, 15)
    .forEach((row, idx) => {
      console.log(
        `${idx + 1}. ${row.serviceName}: existing=${row.existing}, missing=${row.missing}, target=${row.target}`
      );
    });

  if (!APPLY) {
    console.log('\nDry run only. Re-run with --apply to create missing pages.');
    await mongoose.disconnect();
    return;
  }

  if (inserts.length === 0) {
    console.log('No missing pages to create.');
    await mongoose.disconnect();
    return;
  }

  let insertedTotal = 0;
  for (let i = 0; i < inserts.length; i += BATCH_SIZE) {
    const batch = inserts.slice(i, i + BATCH_SIZE);
    try {
      const result = await LocationPage.insertMany(batch, { ordered: false });
      insertedTotal += result.length;
    } catch (error) {
      if (error?.writeErrors?.length) {
        const successCount = batch.length - error.writeErrors.length;
        insertedTotal += successCount;
      } else {
        throw error;
      }
    }
    console.log(`Inserted progress: ${Math.min(i + BATCH_SIZE, inserts.length)}/${inserts.length}`);
  }

  console.log(`Inserted pages: ${insertedTotal}`);

  const [finalTotal, finalInvalid] = await Promise.all([
    LocationPage.countDocuments({ service: { $in: validServiceIds } }),
    LocationPage.countDocuments({ service: { $nin: validServiceIds } }),
  ]);
  console.log(`Final valid location pages: ${finalTotal}`);
  console.log(`Invalid service-linked location pages: ${finalInvalid}`);

  await mongoose.disconnect();
  console.log('Done.');
};

run().catch(async (error) => {
  console.error('Backfill failed:', error);
  try {
    await mongoose.disconnect();
  } catch (disconnectError) {
    console.error('Disconnect failed:', disconnectError);
  }
  process.exit(1);
});
