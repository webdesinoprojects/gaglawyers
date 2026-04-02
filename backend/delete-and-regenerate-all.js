require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');
const { generateSlug } = require('./utils/slugify');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Import the locations array from seed file
const { locations: locationsRaw } = require('./seed-1702-locations-data');

// All 25 services
const services25 = [
  "Armed Forces Tribunal (AFT) Cases",
  "Bail & Anticipatory Bail Cases",
  "CAT (Central Administrative Tribunal) Matters",
  "Cheque Bounce Cases",
  "Civil Law & Civil Disputes",
  "Contract Dispute Cases",
  "Corporate Law Services",
  "Criminal Defense Cases",
  "Cyber Crime Cases",
  "Divorce & Matrimonial Cases",
  "Debt Recovery (DRT) Cases",
  "Employment & Labour Law Cases",
  "Family Law Disputes",
  "High Court Litigation",
  "Immigration Law Services",
  "Insolvency & Bankruptcy Cases",
  "Insurance Claim & Dispute Cases",
  "Landlord-Tenant Disputes",
  "Motor Accident Claims",
  "NCLT & Company Law Matters",
  "Property & Real Estate Disputes",
  "Supreme Court Litigation",
  "Tax & GST Disputes",
  "Trademark & IP Rights",
  "Wills & Succession Planning"
];

const categorizeLocation = (location) => {
  const internationalLocations = [
    'United States USA', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
    'Canada', 'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon',
    'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City',
    'Mexico', 'United Arab Emirates UAE', 'Dubai', 'Abu Dhabi', 'Saudi Arabia', 'Jeddah', 'Riyadh', 'Qatar', 'Doha', 'Kuwait', 'Oman', 'Melbourne', 'Bahrain', 'Sydney', 'Australia', 'New Zealand', 'England', 'Wales', 'Singapore', 'Moscow', 'Saint Petersburg', 'Berlin', 'Zurich', 'Geneva', 'Tatarstan', 'Krasnodar Krai', 'Scotland', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'New Plymouth', 'Greymouth', 'Invercargill', 'Gisborne', 'Nelson', 'Blenheim', 'Richmond', 'Tauranga', 'Dunedin', 'Napier', 'Palmerston North', 'Whangarei', 'Hastings'
  ];

  return {
    isInternational: internationalLocations.includes(location),
    country: internationalLocations.includes(location) ? (location.includes('USA') ? 'United States' : location) : 'India'
  };
};

const generateLocationContent = (city, serviceName) => {
  const { isInternational } = categorizeLocation(city);
  const locationPrefix = isInternational ? `${city}` : `${city}, India`;
  
  return {
    heading: `${serviceName} in ${city}`,
    intro: `GAG Lawyers - Grover & Grover Advocates provides expert ${serviceName.toLowerCase()} services in ${locationPrefix}. Our experienced team of advocates delivers comprehensive legal solutions tailored to your specific needs.`,
    sections: [
      {
        title: `Why Choose Our ${serviceName} Services in ${city}`,
        content: `When it comes to ${serviceName.toLowerCase()} in ${locationPrefix}, GAG Lawyers stands out for our commitment to excellence, client-focused approach, and proven track record. Our legal team has extensive experience handling complex cases and providing strategic counsel.`
      },
      {
        title: 'Our Approach',
        content: `We understand that every legal matter is unique. Our approach combines deep legal expertise with practical insight, ensuring you receive advice that is not only legally sound but also commercially viable and personally relevant. We work in close partnership with our clients throughout the entire process.`
      },
      {
        title: `Contact Our ${city} Legal Team`,
        content: `If you need ${serviceName.toLowerCase()} assistance in ${locationPrefix}, our team is ready to help. We offer initial consultations to understand your situation and provide clear guidance on the best path forward. Contact us today to discuss your legal needs.`
      }
    ]
  };
};

const generateSEO = (city, serviceName) => {
  const { isInternational } = categorizeLocation(city);
  const locationSuffix = isInternational ? city : `${city}, India`;
  
  return {
    title: `${serviceName} in ${city} | GAG Lawyers - Expert Legal Services`,
    description: `Looking for ${serviceName.toLowerCase()} in ${locationSuffix}? GAG Lawyers offers professional legal services with 25+ years of experience. Contact us for expert consultation.`,
    keywords: `${serviceName.toLowerCase()} ${city}, lawyers in ${city}, advocates in ${city}, legal services ${city}, ${generateSlug(serviceName)} ${city}`,
    h1: `${serviceName} in ${city}`
  };
};

const regenerateAll = async () => {
  try {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔄 DELETE & REGENERATE ALL LOCATION PAGES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await connectDB();

    // Step 1: Delete all existing location pages
    console.log('🗑️  Step 1: Deleting existing location pages...\n');
    const deleteResult = await LocationPage.deleteMany({});
    console.log(`   ✅ Deleted ${deleteResult.deletedCount} existing pages\n`);

    // Step 2: Remove duplicates from locations
    console.log('🧹 Step 2: Cleaning locations array...\n');
    const uniqueLocations = [...new Set(locationsRaw)];
    console.log(`   Original locations: ${locationsRaw.length}`);
    console.log(`   Unique locations: ${uniqueLocations.length}`);
    console.log(`   Duplicates removed: ${locationsRaw.length - uniqueLocations.length}\n`);

    if (uniqueLocations.length !== 1702) {
      console.log(`   ⚠️  WARNING: Expected 1702 locations, got ${uniqueLocations.length}`);
      console.log(`   Missing: ${1702 - uniqueLocations.length} locations\n`);
    }

    // Step 3: Ensure all services exist
    console.log('📝 Step 3: Processing services...\n');
    const serviceMap = new Map();

    for (const serviceName of services25) {
      let service = await Service.findOne({ name: serviceName });
      
      if (!service) {
        service = await Service.create({
          name: serviceName,
          title: serviceName,
          slug: generateSlug(serviceName),
          category: 'litigation',
          shortDescription: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers.`,
          longDescription: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers - Grover & Grover Advocates.`,
          description: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers - Grover & Grover Advocates.`,
          iconName: 'Scale'
        });
        console.log(`   ✅ Created service: ${serviceName}`);
      } else {
        console.log(`   ✓ Found service: ${serviceName}`);
      }
      
      serviceMap.set(serviceName, service._id);
    }

    console.log(`\n✅ ${serviceMap.size} services ready\n`);

    // Step 4: Generate all location pages
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔨 Step 4: Generating location pages...\n');
    console.log(`   Services: ${services25.length}`);
    console.log(`   Locations: ${uniqueLocations.length}`);
    console.log(`   Total pages to generate: ${services25.length * uniqueLocations.length}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let totalCreated = 0;
    const BATCH_SIZE = 100;
    const locationPages = [];

    for (const serviceName of services25) {
      const serviceId = serviceMap.get(serviceName);
      console.log(`   📍 Processing: ${serviceName}`);
      
      for (const city of uniqueLocations) {
        const slug = generateSlug(`${serviceName}-${city}`);
        const content = generateLocationContent(city, serviceName);
        const seo = generateSEO(city, serviceName);

        locationPages.push({
          service: serviceId,
          serviceName: serviceName,
          city: city,
          slug: slug,
          content,
          seo,
          isActive: true,
          views: 0
        });

        // Insert in batches
        if (locationPages.length >= BATCH_SIZE) {
          await LocationPage.insertMany(locationPages, { ordered: false });
          totalCreated += locationPages.length;
          process.stdout.write(`\r   ✅ Progress: ${totalCreated} pages created`);
          locationPages.length = 0;
        }
      }
    }

    // Insert remaining pages
    if (locationPages.length > 0) {
      await LocationPage.insertMany(locationPages, { ordered: false });
      totalCreated += locationPages.length;
    }

    console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ REGENERATION COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📊 SUMMARY:');
    console.log(`   ✅ Created: ${totalCreated} pages`);
    console.log(`   📍 Unique locations: ${uniqueLocations.length}`);
    console.log(`   🔧 Services: ${services25.length}`);
    console.log(`   📈 Total in database: ${await LocationPage.countDocuments()}`);
    console.log(`   🎯 Expected: ${services25.length} × ${uniqueLocations.length} = ${services25.length * uniqueLocations.length}`);
    
    const finalCount = await LocationPage.countDocuments();
    if (finalCount === services25.length * uniqueLocations.length) {
      console.log('\n   ✅ Perfect! All pages generated successfully!\n');
    } else {
      console.log(`\n   ⚠️  Mismatch: Expected ${services25.length * uniqueLocations.length}, got ${finalCount}\n`);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
};

regenerateAll();
