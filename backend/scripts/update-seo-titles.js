require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

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
  'Insolvency bankruptcy': 'Insolvency and Bankruptcy Proceedings',
  'Insurance': 'Insurance Claims and Dispute Resolution',
  'Landlord Tenant': 'Landlord-Tenant Disputes and Rental Law',
  'Legal Notice': 'Legal Notice Drafting and Dispute Resolution',
  'Mediation Arbitration': 'Mediation, Arbitration and Alternative Dispute Resolution',
  'Mediation and Arbitration': 'Mediation, Arbitration and Alternative Dispute Resolution',
  'Motor Accident': 'Motor Accident Claims and Compensation',
  'Sexual Harassment': 'Sexual Harassment Cases and Workplace Rights',
  'CAT': 'Central Administrative Tribunal Cases',
  'CAT Matters': 'Central Administrative Tribunal Cases',
  'DRT': 'Debt Recovery Tribunal Matters',
  'Debt Recovery': 'Debt Recovery Tribunal Matters',
  'Debt Recovery Lawyer (DRT Lawyer)': 'Debt Recovery Tribunal Matters',
  'AFT': 'Armed Forces Tribunal Cases',
  'Armed Force Tribunal': 'Armed Forces Tribunal Cases',
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

async function updateSeoTitles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const services = await Service.find({});
    console.log(`Found ${services.length} services`);

    let updated = 0;
    let errors = 0;

    for (const service of services) {
      try {
        // Normalize service name by removing "Lawyer" suffix for lookup
        const normalizedName = service.name.replace(/ Lawyer$/i, '').trim();
        
        // Get the description for this service
        let description = serviceDescriptions[normalizedName] || serviceDescriptions[service.name];
        
        // If no match found, create a default description
        if (!description) {
          description = `${service.name}`;
        }

        // Create the SEO title
        const seoTitle = `Expert Legal Services for ${description} - GAG Lawyers`;

        // Initialize seo object if it doesn't exist
        if (!service.seo || typeof service.seo !== 'object') {
          service.seo = {};
        }

        // Update the SEO title
        service.seo.title = seoTitle;

        // Keep existing meta description or create a default one
        if (!service.seo.metaDescription) {
          service.seo.metaDescription = `Professional ${description.toLowerCase()} in India. Contact GAG Lawyers for expert legal consultation with 25+ years of experience.`;
        }

        await service.save();

        console.log(`✅ Updated: ${service.name}`);
        console.log(`   Title: ${seoTitle}`);
        updated++;
      } catch (error) {
        console.error(`❌ Error updating ${service.name}:`, error.message);
        errors++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${services.length}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateSeoTitles();
