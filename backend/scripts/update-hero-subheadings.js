require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

// Mapping of service names to their specific legal service descriptions
const serviceDescriptions = {
  'Bail': 'Bail Applications and Criminal Defense',
  'Divorce': 'Divorce and Family Law Matters',
  'Property': 'Property Disputes and Real Estate Law',
  'Criminal': 'Criminal Defense and Litigation',
  'Civil': 'Civil Litigation and Dispute Resolution',
  'Supreme Court': 'Supreme Court Litigation and Appeals',
  'High Court': 'High Court Litigation and Legal Representation',
  'Writ Petition': 'Writ Petitions and Constitutional Remedies',
  'Cheque Bounce': 'Cheque Bounce Cases and Negotiable Instruments',
  'Cyber Crime': 'Cyber Crime and Digital Fraud Cases',
  'Family': 'Family Law and Matrimonial Disputes',
  'Corporate': 'Corporate Law and Business Legal Services',
  'Contract': 'Contract Drafting and Dispute Resolution',
  'Employment': 'Employment Law and Labor Disputes',
  'Immigration': 'Immigration and Visa Legal Services',
  'Insolvency': 'Insolvency and Bankruptcy Proceedings',
  'Insurance': 'Insurance Claims and Dispute Resolution',
  'Landlord Tenant': 'Landlord-Tenant Disputes and Rental Law',
  'Legal Notice': 'Legal Notice Drafting and Dispute Resolution',
  'Mediation Arbitration': 'Mediation, Arbitration and Alternative Dispute Resolution',
  'Motor Accident': 'Motor Accident Claims and Compensation',
  'Sexual Harassment': 'Sexual Harassment Cases and Workplace Rights',
  'CAT': 'Central Administrative Tribunal Cases',
  'DRT': 'Debt Recovery Tribunal Matters',
  'AFT': 'Armed Forces Tribunal Cases',
  'Agreement to Sell': 'Agreement to Sell and Property Transactions',
  'Child Custody': 'Child Custody and Guardianship Matters',
  'Consumer Court': 'Consumer Court Cases and Consumer Rights',
  'Court Marriage': 'Court Marriage and Marriage Registration',
  'Dowry': 'Dowry Harassment and Matrimonial Disputes',
  'Employment Agreement': 'Employment Agreement Drafting and Review',
  'Environment Lawyer': 'Environmental Law and Compliance',
  'Firearms Lawyer': 'Firearms Licensing and Legal Matters',
  'Food & Drug Lawyer': 'Food and Drug Regulatory Compliance',
  'Franchise Agreement': 'Franchise Agreement Drafting and Negotiation',
  'Human Rights Lawyer': 'Human Rights Violations and Legal Protection',
  'IP License Agreement': 'Intellectual Property License Agreements',
  'Labour Lawyer': 'Labour Law and Industrial Disputes',
  'Leave and License Agreement': 'Leave and License Agreement Drafting',
  'Loan Agreement': 'Loan Agreement Drafting and Review',
  'Marriage Registration Lawyer': 'Marriage Registration and Legal Documentation',
  'Media and Broadcasting Lawyer': 'Media, Broadcasting and Entertainment Law',
  'Medical Negligence Lawyer': 'Medical Negligence and Malpractice Cases',
  'Memorandum of Understanding MOU': 'MOU Drafting and Business Agreements',
  'Military Lawyer': 'Military Law and Court Martial Defense',
  'Muslim Lawyer': 'Muslim Personal Law and Sharia Matters',
  'Non-disclosure Agreement': 'Non-Disclosure Agreement Drafting and Protection',
  'Partnership Deed': 'Partnership Deed and Franchise Agreements',
  'RERA Registration': 'RERA Registration and Real Estate Compliance',
  'Rent Agreement': 'Rent Agreement Drafting and Tenancy Law',
  'Right To Information Lawyer': 'Right to Information Applications and Appeals',
  'SMC Certificate': 'Surviving Member Certificate Applications',
  'Sale Deed': 'Sale Deed Registration and Property Transfer',
  'Sports Lawyer': 'Sports Law and Athletic Disputes',
  'Succession Certificate': 'Succession Certificate and Inheritance Matters',
  'Will Lawyer': 'Will Drafting and Estate Planning'
};

async function updateHeroSubheadings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const services = await Service.find({}).lean();
    console.log(`Found ${services.length} services`);

    let updated = 0;
    let notFound = 0;

    for (const service of services) {
      // Find hero section for this service
      const heroSection = await ServiceSection.findOne({
        serviceId: service._id,
        type: 'hero'
      });

      if (!heroSection) {
        console.log(`⚠️  No hero section found for: ${service.name}`);
        notFound++;
        continue;
      }

      // Get the description for this service
      const description = serviceDescriptions[service.name] || `${service.name} Legal Services`;

      // Update the subheading
      const newSubheading = `Expert Legal Services for ${description} - GAG Lawyers`;

      heroSection.content.subheading = newSubheading;
      await heroSection.save();

      console.log(`✅ Updated: ${service.name}`);
      updated++;
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Not Found: ${notFound}`);
    console.log(`   Total: ${services.length}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateHeroSubheadings();
