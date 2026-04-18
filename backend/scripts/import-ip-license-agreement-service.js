require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'ip-license-agreement',
  name: 'IP License Agreement',
  sections: [
    {
      type: 'hero',
      heading: 'IP License Agreement',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Intellectual Property Licensing',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'IP License Agreement Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Proper licensing of intellectual property assets is important for business success as it safeguards and gives monetary value to intellectual property assets through contemporary innovation-driven economies. With your help and on your behalf, GAG Lawyers strives to provide all-inclusive legal expertise designed to protect your intellectual property interests while maximizing their commercial potential with regard to license agreement matters.\n\nIn the context of IP commercialization, an intellectual property license agreement is actually considered to be the cornerstone of such a system. Holders of the rights can create value while retaining control over the respective assets. As your advocate for intellectual property license agreements to ensure the optimal structuring of your licensing, our firm ensures that your commercial interests are protected while fostering growth in business.'
      }
    },
    {
      type: 'benefits',
      heading: 'Our IP License Agreement Expertise',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Technology Licensing',
            description: 'Software and SaaS agreements, patent licensing structures, technology transfer protocols, cross-licensing arrangements, and joint development agreements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Content and Media',
            description: 'Copyright licensing, broadcasting rights, digital content distribution, publishing agreements, and entertainment licensing.'
          },
          {
            icon: 'CheckCircle',
            title: 'Trademark and Branding',
            description: 'Brand licensing programs, merchandising agreements, franchise arrangements, quality control protocols, and territory-specific licensing.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Key Indian Legal Precedents',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Bajaj Auto Ltd. v. TVS Motor Company Ltd. (2009)',
            description: 'This landmark case brought a change in the way the courts approached IP license agreement requirements. The Supreme Court established necessity for clear licensing terms, importance of proper documentation, standards for enforcement, and dispute resolution frameworks.'
          },
          {
            icon: 'CheckCircle',
            title: 'Entertainment Network India Ltd. v. Super Cassette Industries Ltd. (2008)',
            description: 'This case revolutionized intellectual property license agreement fees structures by setting guidelines for reasonable royalty rates, establishing valuation methodologies, defining market-based pricing approaches, and creating industry standards.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bayer Corporation v. Union of India (2014)',
            description: 'This case provided guidance on conditions of compulsory licensing, public interest considerations, determining fair compensation, and regulatory compliance requirements.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Comprehensive Licensing Support',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Strategic Planning',
            description: 'Market analysis, licensing strategy development, risk assessment, opportunity identification, and competitive analysis.'
          },
          {
            icon: 'CheckCircle',
            title: 'Agreement Development',
            description: 'When you need to draft IP license agreement documents, we ensure comprehensive coverage of rights granted, territory definitions, duration terms, payment structures, quality control measures, termination conditions, and dispute resolution mechanisms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation Support',
            description: 'As your lawyer for intellectual property license agreement needs, we represent your interests, structure favorable terms, maintain business relationships, ensure regulatory compliance, and protect core IP assets.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Costs and Fees',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'The IP license agreement cost varies based on agreement complexity, market value of IP, territory coverage, duration of rights, negotiation requirements, and implementation support.\n\nOur transparent IP license agreement lawyer fees consider:\n• Initial consultation\n• Agreement drafting\n• Negotiation services\n• Implementation support\n• Compliance monitoring\n• Dispute resolution\n\nServices by our lawyer for intellectual property license agreement include cross-border licensing, international IP protection, global compliance requirements, and foreign jurisdiction considerations.'
      }
    },
    {
      type: 'benefits',
      heading: 'Essential Agreement Components',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'IP Asset Identification',
            description: 'Identification of IP assets, proof of ownership, pre-existing liens, and rights associated with the intellectual property.'
          },
          {
            icon: 'CheckCircle',
            title: 'Scope of License',
            description: 'Rights and usage definitions, geographic limitations, temporal confines, and terms and conditions of use.'
          },
          {
            icon: 'CheckCircle',
            title: 'Payment Terms',
            description: 'Financial structure, royalty calculations, audit rights, currency exchange provisions, and payment schedules.'
          },
          {
            icon: 'CheckCircle',
            title: 'Quality Control',
            description: 'Maintenance of standards, inspection rights, reporting requirements, accountability measures, and regulatory compliance.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Technical Compliance',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'Our intellectual property license agreement sec requirements expertise ensures all your agreements will be compliant with the standards of this regulatory body. We have an all-inclusive IP license agreement checklist, which includes:\n\n• Compliance of ownership rights\n• Specific usage restrictions\n• Quality control measures\n• Reporting requirements\n• Termination clauses\n• Conflict resolution measures\n\nWe ensure adherence to IP license agreement sec requirements through regular updates, documentation maintenance, reporting compliance, and disclosure requirements.'
      }
    },
    {
      type: 'benefits',
      heading: 'Documentation and Paperwork',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Due Diligence Verification',
            description: 'Comprehensive verification of IP ownership, existing licenses, encumbrances, and validity of intellectual property rights.'
          },
          {
            icon: 'CheckCircle',
            title: 'Definition of Scope',
            description: 'Clear definition of licensed rights, permitted uses, restrictions, territory, and duration of the license agreement.'
          },
          {
            icon: 'CheckCircle',
            title: 'Terms of Payment',
            description: 'Detailed payment structures including upfront fees, royalties, milestones, audit rights, and currency provisions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Quality Control Provisions',
            description: 'Standards maintenance, inspection rights, reporting requirements, and remedies for non-compliance with quality standards.'
          },
          {
            icon: 'CheckCircle',
            title: 'Term and Termination',
            description: 'Duration of agreement, renewal options, termination conditions, post-termination obligations, and transition provisions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution Mechanism',
            description: 'Procedures for resolving disputes including negotiation, mediation, arbitration, and jurisdiction provisions.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Value-Added Services',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Documentation Support',
            description: 'Template development, customization guidance, implementation protocols, and compliance checklists.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ongoing Monitoring',
            description: 'Performance tracking, compliance verification, issue identification, and resolution support.'
          },
          {
            icon: 'CheckCircle',
            title: 'Risk Management',
            description: 'Regular reviews, update recommendations, enforcement support, and dispute prevention.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Expert Legal Guidance',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        body: 'Consult with our team of specialized IP lawyers for licensing expertise on your IP licensing needs. We offer support for IP license agreement services, ranging from initial strategy to implementation and post-implementation management.\n\nAn intellectual property license agreement attorney is experienced in coordinating complex licensing agreements and protecting one of your most valuable intellectual property assets. Let us explain how we can be helpful in the arrangement and implementation of an effective licensing solution for your intellectual property portfolio.\n\nLet our draft IP license agreement expertise help you tap the maximum value from your intellectual property while upholding proper protection and control. Schedule a consultation with your attorney so that we may show you how tailored our services are in order to assist you in succeeding with business expansion.'
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 11,
      background: 'light',
      content: {
        items: [
          {
            question: 'What determines fees for intellectual property license agreements?',
            answer: 'The fees are charged as a valuation in the marketplace, scope of use, territory or geographic coverage, as well as those regarded as standard within the given industry. Additional factors include the complexity of the agreement, negotiation requirements, and ongoing support needs.'
          },
          {
            question: 'How long does it take to draft intellectual property license agreement documents?',
            answer: 'It depends upon complexity, but normally takes two to four weeks for the first drafts. More complex agreements involving multiple jurisdictions or extensive negotiations may require additional time.'
          },
          {
            question: 'What are typical IP license agreement requirements?',
            answer: 'The main requirements generally include identification and naming of the IP, definition of rights, quality control measures, and payment terms. Additional requirements include territory definitions, duration, termination conditions, and dispute resolution mechanisms.'
          },
          {
            question: 'Can you explain the standard IP license agreement format?',
            answer: 'Generally, it will follow a general theme of rights granted, payment terms, quality control provisions, and termination conditions. The format typically includes sections on definitions, scope of license, territory, duration, financial terms, quality standards, reporting, confidentiality, and dispute resolution.'
          },
          {
            question: 'How would you quote the IP license agreement advocate fees?',
            answer: 'Fees are structured based on agreement complexity, negotiation requirements, and ongoing support needs. We provide transparent fee structures that consider initial consultation, agreement drafting, negotiation services, implementation support, compliance monitoring, and dispute resolution.'
          },
          {
            question: 'What is the difference between an exclusive and non-exclusive license?',
            answer: 'An exclusive license grants rights to only one licensee, preventing the licensor from granting the same rights to others. A non-exclusive license allows the licensor to grant the same rights to multiple licensees. Exclusive licenses typically command higher fees but provide greater market control.'
          },
          {
            question: 'Can an IP license agreement be terminated early?',
            answer: 'Yes, IP license agreements can be terminated early under conditions specified in the agreement, such as breach of contract, failure to meet quality standards, non-payment of royalties, or mutual agreement. The agreement should clearly outline termination procedures and post-termination obligations.'
          },
          {
            question: 'What are royalty rates in IP license agreements?',
            answer: 'Royalty rates vary based on the type of IP, industry standards, market value, territory, and exclusivity. They can be structured as percentage of sales, fixed fees per unit, lump sum payments, or milestone-based payments. Our lawyers help negotiate fair and market-appropriate royalty structures.'
          },
          {
            question: 'How is quality control maintained in IP license agreements?',
            answer: 'Quality control is maintained through specific standards outlined in the agreement, regular inspections and audits, reporting requirements, approval processes for products or services, and remedies for non-compliance including termination rights.'
          },
          {
            question: 'What happens to the license if the licensor sells the IP?',
            answer: 'The license agreement typically includes provisions for assignment and transfer. Generally, the license remains valid and transfers with the IP to the new owner, but specific terms regarding notification, approval rights, and any changes should be clearly outlined in the agreement.'
          },
          {
            question: 'Can IP license agreements cover multiple countries?',
            answer: 'Yes, IP license agreements can cover multiple countries or be worldwide. However, each jurisdiction may have different IP laws and registration requirements. Our lawyers ensure compliance with international IP protection requirements and address jurisdiction-specific considerations.'
          },
          {
            question: 'What is a cross-licensing agreement?',
            answer: 'A cross-licensing agreement is where two or more parties grant licenses to each other for their respective intellectual property. This is common in technology industries where companies hold complementary patents and wish to avoid infringement disputes while accessing each other\'s innovations.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert IP License Agreement Services?',
      visible: true,
      order: 12,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional IP license agreement services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'IP License Agreement Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert IP license agreement services in Delhi. Professional legal advice for intellectual property licensing, technology transfer, and brand licensing agreements.'
  }
};

async function importService() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const service = await Service.findOne({ slug: serviceData.slug });
    
    if (!service) {
      console.log(`❌ Service not found: ${serviceData.slug}`);
      process.exit(1);
    }

    await ServiceSection.deleteMany({ serviceId: service._id });

    const sectionDocs = serviceData.sections.map(section => ({
      serviceId: service._id,
      type: section.type,
      visible: section.visible,
      order: section.order,
      heading: section.heading,
      background: section.background,
      content: section.content
    }));

    await ServiceSection.insertMany(sectionDocs);

    service.seo = serviceData.seo;
    await service.save();

    console.log(`✅ ${serviceData.name} imported — ${serviceData.sections.length} sections saved`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importService();
