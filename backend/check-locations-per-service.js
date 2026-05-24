require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');

async function checkLocationsPerService() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected\n');

    const counts = await LocationPage.aggregate([
      {
        $group: {
          _id: '$service',
          locationCount: { $sum: 1 },
          fallbackServiceName: { $first: '$serviceName' },
        },
      },
      {
        $lookup: {
          from: Service.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'serviceDoc',
        },
      },
      {
        $addFields: {
          serviceName: {
            $ifNull: [{ $arrayElemAt: ['$serviceDoc.name', 0] }, '$fallbackServiceName'],
          },
          serviceSlug: {
            $ifNull: [{ $arrayElemAt: ['$serviceDoc.slug', 0] }, 'unknown-slug'],
          },
        },
      },
      {
        $project: {
          _id: 0,
          serviceName: 1,
          serviceSlug: 1,
          locationCount: 1,
        },
      },
      { $sort: { locationCount: -1, serviceName: 1 } },
    ]);

    if (!counts.length) {
      console.log('No location pages found.');
      process.exit(0);
    }

    const totalLocations = counts.reduce((sum, row) => sum + row.locationCount, 0);
    console.log(`Services with location pages: ${counts.length}`);
    console.log(`Total location pages: ${totalLocations}\n`);

    counts.forEach((row, idx) => {
      console.log(
        `${String(idx + 1).padStart(2, '0')}. ${row.serviceName} (${row.serviceSlug}) -> ${row.locationCount}`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error('Error checking locations per service:', error.message);
    process.exit(1);
  }
}

checkLocationsPerService();
