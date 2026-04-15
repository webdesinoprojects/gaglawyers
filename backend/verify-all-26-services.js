require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const UPDATED_SERVICES = [
  'armed-force-tribunal-lawyer',
  'bail-lawyer',
  'cat-matters-lawyer',
  'cheque-bounce-lawyer',
  'civil-lawyer',
  'contract-lawyer',
  'corporate-law',
  'criminal-defense-cases',
  'cyber-crime',
  'debt-recovery-lawyer',
  'child-custody-lawyer',
  'divorce-lawyer',
  'employment-lawyer',
  'family-law-disputes',
  'high-court-litigation',
  'immigration-law',
  'insolvency-bankruptcy-lawyer',
  'insurance-lawyer',
  'landlord-tenant-lawyer',
  'legal-notice',
  'mediation-and-arbitration-lawyer',
  'motor-accident-lawyer',
  'property-lawyer',
  'sexual-harassment-lawyer',
  'supreme-court-litigation',
  'writ-petition-lawyer'
];

async function verifyAllServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB\n');

    console.log('='.repeat(80));
    console.log('VERIFYING ALL 26 UPDATED SERVICES');
    console.log('='.repeat(80));
    console.log();

    let allValid = true;
    const results = [];

    for (const slug of UPDATED_SERVICES) {
      const service = await Service.findOne({ slug });
      
      if (!service) {
        console.log(`✗ ${slug}: NOT FOUND`);
        allValid = false;
        results.push({ slug, status: 'NOT FOUND' });
        continue;
      }

      const checks = {
        heroImage: !!service.heroImage,
        contentBlocks: service.contentBlocks && service.contentBlocks.length >= 5,
        documentChecklist: service.documentChecklist && service.documentChecklist.length >= 8,
        popularCases: service.popularCases && service.popularCases.length >= 3,
        faqs: service.faqs && service.faqs.length >= 5,
        seoKeywords: service.seoKeywords && service.seoKeywords.length >= 10
      };

      const allChecksPass = Object.values(checks).every(v => v);
      
      if (allChecksPass) {
        console.log(`✓ ${slug}: COMPLETE`);
        results.push({ slug, status: 'COMPLETE', ...checks });
      } else {
        console.log(`⚠ ${slug}: INCOMPLETE`);
        console.log(`  - Hero Image: ${checks.heroImage ? '✓' : '✗'}`);
        console.log(`  - Content Blocks: ${checks.contentBlocks ? '✓' : '✗'} (${service.contentBlocks?.length || 0})`);
        console.log(`  - Document Checklist: ${checks.documentChecklist ? '✓' : '✗'} (${service.documentChecklist?.length || 0})`);
        console.log(`  - Popular Cases: ${checks.popularCases ? '✓' : '✗'} (${service.popularCases?.length || 0})`);
        console.log(`  - FAQs: ${checks.faqs ? '✓' : '✗'} (${service.faqs?.length || 0})`);
        console.log(`  - SEO Keywords: ${checks.seoKeywords ? '✓' : '✗'} (${service.seoKeywords?.length || 0})`);
        allValid = false;
        results.push({ slug, status: 'INCOMPLETE', ...checks });
      }
    }

    console.log();
    console.log('='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    
    const complete = results.filter(r => r.status === 'COMPLETE').length;
    const incomplete = results.filter(r => r.status === 'INCOMPLETE').length;
    const notFound = results.filter(r => r.status === 'NOT FOUND').length;

    console.log(`Total Services: ${UPDATED_SERVICES.length}`);
    console.log(`✓ Complete: ${complete}`);
    console.log(`⚠ Incomplete: ${incomplete}`);
    console.log(`✗ Not Found: ${notFound}`);
    console.log();

    if (allValid) {
      console.log('🎉 ALL 26 SERVICES ARE FULLY UPDATED!');
    } else {
      console.log('⚠ Some services need attention. See details above.');
    }

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    
    process.exit(allValid ? 0 : 1);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

verifyAllServices();
