require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const { imageUrls, generateContentBlocks } = require('./services-content/content-templates');
const { generateFAQs } = require('./services-content/generate-faqs');
const { generateDocumentChecklist } = require('./services-content/generate-documents');

/**
 * MASTER SERVICE SEEDING SCRIPT
 * Seeds all 56 services with rich, comprehensive, admin-controllable content
 */

const seedAllServices = async () => {
  try {
    console.log('🚀 Starting Master Service Content Seeding...\n');
    
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Fetch all services
    const services = await Service.find({}).sort('order');
    console.log(`📊 Found ${services.length} services to update\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const service of services) {
      try {
        console.log(`\n📝 Processing: ${service.name} (${service.slug})`);

        // Generate hero image based on category
        const heroImage = imageUrls[service.category] || imageUrls.civil;

        // Update hero section
        service.heroTitle = service.name;
        service.heroDescription = `Expert ${service.name} services in Delhi. Professional legal representation with proven track record.`;
        service.heroImage = heroImage;

        // Update SEO
        service.seoTitle = `${service.name} in Delhi | Legal Services | Grover & Grover Advocates`;
        service.metaDescription = `Leading ${service.name.toLowerCase()} in Delhi. Expert legal advice, court representation, and comprehensive solutions. Call for consultation.`;

        // Update descriptions
        if (!service.shortDescription || service.shortDescription.length < 100) {
          service.shortDescription = `Professional ${service.name.toLowerCase()} services providing expert legal guidance, documentation, court representation, and strategic solutions for all your legal needs.`;
        }

        if (!service.longDescription || service.longDescription.length < 200) {
          service.longDescription = `Our ${service.name.toLowerCase()} services offer comprehensive legal solutions backed by years of experience and expertise. We understand the complexities of ${service.category} law and provide personalized attention to each case. Whether you need consultation, documentation, or court representation, our dedicated team ensures your rights are protected and your interests are served. With a proven track record of successful cases and satisfied clients, we are committed to delivering excellence in legal services.`;
        }

        if (!service.overview || service.overview.length < 150) {
          service.overview = `${service.name} encompasses a wide range of legal matters requiring professional expertise. Our experienced lawyers specialize in ${service.category} law, providing strategic guidance and effective representation to achieve favorable outcomes for our clients.`;
        }

        // Generate rich content blocks
        const contentBlocks = generateContentBlocks(service.name, service.category);
        
        // Add additional specialized blocks based on category
        if (service.category === 'criminal') {
          contentBlocks.push({
            type: 'rights-remedies',
            heading: 'Your Rights and Legal Remedies',
            subheading: 'Understanding Your Legal Protections',
            paragraphs: [
              'Every individual has fundamental rights guaranteed by the Constitution of India. In criminal matters, these rights include the right to legal representation, right to fair trial, right against self-incrimination, and right to bail in bailable offenses.',
              'Our lawyers ensure that your constitutional and legal rights are protected at every stage of the criminal justice process.'
            ],
            rights: [
              'Right to be informed of charges',
              'Right to legal representation',
              'Right to remain silent',
              'Right to bail (in bailable offenses)',
              'Right to fair and speedy trial',
              'Right to appeal',
              'Right against double jeopardy',
              'Right to cross-examine witnesses'
            ],
            icon: 'Shield',
            backgroundColor: '#f8fafc'
          });
        }

        // Add documents block
        contentBlocks.push({
          type: 'documents',
          heading: 'Required Documents',
          subheading: 'Essential Documentation Checklist',
          paragraphs: [
            'Proper documentation is crucial for the success of your case. Below is a comprehensive checklist of documents typically required. The exact requirements may vary based on your specific case.'
          ],
          documents: generateDocumentChecklist(service.category),
          icon: 'FolderOpen',
          backgroundColor: '#ffffff'
        });

        // Add firm expertise block
        contentBlocks.push({
          type: 'firm-expertise',
          heading: 'Why Choose Grover & Grover Advocates',
          subheading: 'Your Trusted Legal Partners',
          paragraphs: [
            'Grover & Grover, Advocates and Solicitors, is a leading law firm in Delhi with extensive experience in ${service.category} law. Our team of expert lawyers is dedicated to providing exceptional legal services with personalized attention to each client.',
            'We combine legal expertise with strategic thinking to achieve the best possible outcomes. Our client-focused approach ensures that your interests are always our top priority.'
          ],
          whyChooseUs: [
            {
              title: 'Specialized Expertise',
              description: `Deep knowledge and experience in ${service.category} law with proven track record`,
              icon: 'Award'
            },
            {
              title: 'Personalized Attention',
              description: 'Individual attention to each case with dedicated lawyer assignment',
              icon: 'Heart'
            },
            {
              title: 'Transparent Communication',
              description: 'Regular updates and clear communication throughout the legal process',
              icon: 'MessageCircle'
            },
            {
              title: 'Competitive Fees',
              description: 'Transparent and competitive fee structure with no hidden charges',
              icon: 'DollarSign'
            },
            {
              title: 'Proven Results',
              description: 'Strong track record of successful cases and satisfied clients',
              icon: 'TrendingUp'
            },
            {
              title: 'Comprehensive Services',
              description: 'End-to-end legal solutions from consultation to case resolution',
              icon: 'Briefcase'
            }
          ],
          icon: 'Briefcase',
          backgroundColor: '#f8fafc'
        });

        service.contentBlocks = contentBlocks;

        // Generate document checklist
        service.documentChecklist = generateDocumentChecklist(service.category);

        // Generate process steps
        service.process = [
          {
            step: 1,
            title: 'Initial Consultation',
            description: 'Free consultation to understand your case, review documents, and provide initial legal advice'
          },
          {
            step: 2,
            title: 'Case Assessment',
            description: 'Detailed analysis of your case including legal research and strategy development'
          },
          {
            step: 3,
            title: 'Documentation',
            description: 'Preparation of all legal documents, petitions, and supporting evidence'
          },
          {
            step: 4,
            title: 'Filing & Representation',
            description: 'Professional filing and expert representation in court or tribunal'
          },
          {
            step: 5,
            title: 'Resolution & Follow-up',
            description: 'Pursuing case to resolution and ensuring compliance with orders'
          }
        ];

        // Generate key points
        service.keyPoints = [
          `Expert ${service.name.toLowerCase()} with years of experience`,
          'Comprehensive legal solutions tailored to your needs',
          'Professional representation in all courts and tribunals',
          'Transparent fee structure with no hidden costs',
          'Regular case updates and clear communication',
          'Proven track record of successful outcomes',
          'Personalized attention to each case',
          'Strategic approach to achieve best results'
        ];

        // Generate FAQs
        service.faqs = generateFAQs(service.name, service.category);

        // Save the service
        await service.save();
        
        successCount++;
        console.log(`   ✓ Updated successfully`);
        console.log(`   - Content Blocks: ${service.contentBlocks.length}`);
        console.log(`   - FAQs: ${service.faqs.length}`);
        console.log(`   - Documents: ${service.documentChecklist.length}`);

      } catch (error) {
        errorCount++;
        console.error(`   ✗ Error updating ${service.name}:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 SEEDING SUMMARY');
    console.log('='.repeat(60));
    console.log(`✓ Successfully updated: ${successCount} services`);
    console.log(`✗ Errors: ${errorCount} services`);
    console.log(`📦 Total services: ${services.length}`);
    console.log('='.repeat(60));
    console.log('\n✅ All services are now admin-controllable through Service Manager!\n');

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    console.error(error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('✓ Database connection closed\n');
  }
};

// Run the seeding
seedAllServices();
