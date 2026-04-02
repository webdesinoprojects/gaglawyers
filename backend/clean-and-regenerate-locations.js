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

// Import locations from seed file
const locationsRaw = [
