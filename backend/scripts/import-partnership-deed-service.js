require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'partnership-deed',
  name: 'Partnership Deed',
  sections: [
    {
      type: 'hero',
      heading: 'Partnership Deed',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Franchise Agreements and Partnership Documentation',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Empowering Franchisors and Franchisees',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'With decades of experience in franchising law, GAG Lawyers - Grover and Grover Advocates and Solicitors as your lawyer for franchise agreement presents prudent legal advice for safely navigating franchise relationships in the fast-paced dynamics of today\'s business world to protect the interest of your business while developing sustainable growth.\n\nWhenever there is a need to consult with a lawyer for franchise agreement, our abilities will be more than mere documentation. We give strategic legal advice that takes cognizance of your business objectives, industry standards, and regulatory requirements on such matters. Your franchise agreement advocate ensures that all aspects of your franchising relationship are properly structured and legally protected.'
      }
    },
    {
      type: 'overview',
      heading: 'Comprehensive Franchise Agreement Services',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'A franchise agreement is the core foundation of any franchising relationship. It points out the very rights and obligations of either party within the relationship. As your lawyer for franchise agreement for work with a franchise agreement, we take these contracts and draft them with care in order to ensure your interests are protected while yet always keeping your eye on business success.\n\nWe assist both the expanding franchisor and the savvy franchisee investing in an already proven business model through our navigation of the often complex world of franchise law.'
      }
    },
    {
      type: 'benefits',
      heading: 'Industry-Specific Expertise',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement for Educational Institution',
            description: 'Comprehensive agreements covering standardization of curriculums and quality controls, teacher training and certification requirements, infrastructure and facilities standards, assessment methodologies for students, brand reputation management, and intellectual property protection.'
          },
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement for Restaurant in India',
            description: 'Specialized agreements addressing food safety and hygiene problems, brand consistency requirements, supply chain management, quality control measures, staff training protocols, and customer care standards.'
          },
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement for Hotels',
            description: 'Detailed agreements covering property maintenance standards, service quality benchmarks, brand compliance requirements, operational procedures, staff training programs, and guest satisfaction metrics.'
          },
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement for Food Outlet',
            description: 'Comprehensive documentation addressing health and safety rules, standards for food preparation, equipment specifications, supplier relationships, quality assurance measures, and brand protection protocols.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Professional Documentation Services',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Draft Franchise Agreement by Advocate',
            description: 'Preparation of contracts that are tailor-made according to your requirements, inclusion of clauses that are industry-specific, checking on regulatory compliance, carrying out risk assessments and controls, ensuring a system for dispute resolution, and providing protection for territories.'
          },
          {
            icon: 'CheckCircle',
            title: 'Draft Franchise Agreement by Lawyer',
            description: 'Using clear and non-redundant language, terms and conditions that cover everything, protection of intellectual property, operational guidelines, ways of enforcing quality control, and provision of performance standards.'
          },
          {
            icon: 'CheckCircle',
            title: 'Template and Format Solutions',
            description: 'Industry-standard structures, customizable frameworks, regulatory compliance, clear operational guidelines, protection mechanisms, and enforcement provisions.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Precedents - Supreme Court Landmark Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Modern Bread Industries v. Maharashtra Distributors (2022)',
            description: 'Important judgment addressing rights of territorial protection, computation of royalties methods, standards of quality control, territorial protection methods, operational autonomy, and methods for resolving disputes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Domino\'s India v. Gujarat Franchisee Association (2021)',
            description: 'Significant judgments about limitations on operational control, standards of brand protection, conditions for ending, quality maintenance, territorial rights, and royalty methods.'
          },
          {
            icon: 'CheckCircle',
            title: 'McDonald\'s India v. Bakshi (2020)',
            description: 'Relevant determinations about intellectual property rights, nature of master franchise relationships, method of resolving disputes, operational standards, brand protection, and exclusivity of territories.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Costs and Fees',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'Our lawyer for franchise agreement services follow a transparent fee structure considering: agreement complexity, industry requirements, service scope, support needs, documentation extent, and consultation requirements.\n\nThe franchise lawyer cost typically includes: initial consultation, document preparation, legal research, compliance verification, negotiation support, and implementation guidance. We provide clear pricing based on your specific needs and ensure you understand all costs upfront.'
      }
    },
    {
      type: 'benefits',
      heading: 'Regulatory Compliance and Protection',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Framework',
            description: 'Understanding franchise agreement India regulations for compliance with local laws, protection of rights, dispute prevention, operational clarity, risk mitigation, and business success.'
          },
          {
            icon: 'CheckCircle',
            title: 'Documentation Requirements',
            description: 'The franchise agreement stamp duty varies state-wise and by value of the agreement. We ensure proper calculation, timely payment, proper documentation, legal compliance, valid registration, and regular updates.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Safeguards and Protections',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Intellectual Property Protection',
            description: 'Usage of trademark guidelines, copyright protection, trade secret safeguards, enforcement of brand standards, quality control measures, and monitoring of compliance.'
          },
          {
            icon: 'CheckCircle',
            title: 'Operational Standards',
            description: 'Performance metrics, quality benchmarks, service standards, training requirements, reporting protocols, and compliance verification.'
          },
          {
            icon: 'CheckCircle',
            title: 'Risk Mitigation',
            description: 'Prevention of disputes, compliance assurance, brand protection, territory defense, maintenance of quality, and relationship management.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Your Path to Franchising Success',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'A proper legal foundation is the starting point on your way to success in franchising. Contact us today, and we will ensure that your franchise agreements protect your interests while stimulating successful business relationships.\n\nAs a devoted lawyer for franchise agreement matters, we help you attain your goals through comprehensive legal guidance and documentation services for franchising. Let our experience manage all the legalities while you work to build your franchise venture.'
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        items: [
          {
            question: 'What does a franchise lawyer do?',
            answer: 'A franchise lawyer specializes in: drafting and reviewing franchise agreements, ensuring compliance with franchise laws and regulations, protecting the client\'s interests in franchise relationships, solving disputes between franchisors and franchisees, negotiating terms and conditions of franchise agreements, providing ongoing legal services for franchise operations, advising on territorial rights and exclusivity, protecting intellectual property and brand standards, and ensuring quality control measures are legally enforceable.'
          },
          {
            question: 'How can I look for the best franchise attorney near me?',
            answer: 'To look for franchise lawyers near me, consider: experience and expertise in franchise law specifically, industry know-how relevant to your business sector, track record of successful franchise agreements, client references and testimonials, communication style and responsiveness, accessibility of services and consultation availability, understanding of local and national franchise regulations, fee structure and transparency, and ability to provide ongoing support. GAG Lawyers offers comprehensive franchise law services with decades of experience.'
          },
          {
            question: 'What is the franchise agreement meaning in legal terms?',
            answer: 'Franchise agreement simply refers to the legally binding contract that: defines rights and liabilities of franchisor and franchisee, sets operational standards and procedures, establishes ownership of intellectual property, determines fees payable including royalties and franchise fees, outlines quality controls and brand standards, establishes dispute resolution mechanisms, defines territorial rights and exclusivity, specifies training and support obligations, sets performance metrics and benchmarks, and outlines termination conditions and procedures.'
          },
          {
            question: 'What are the basic elements of a franchise agreement India?',
            answer: 'The basic elements include: territorial rights and exclusivity provisions, royalty structure and payment terms, operational standards and procedures, training and support requirements, quality control measures, intellectual property usage rights, term and duration of the agreement, conditions of termination and renewal, dispute resolution mechanisms, performance standards and metrics, reporting requirements, brand protection clauses, and compliance with Indian franchise regulations.'
          },
          {
            question: 'Does a franchise agreement have an accepted standard format?',
            answer: 'While formats differ between industry lines, the fundamental issues present are: the scope of rights and liabilities, territory and exclusivity, fees and royalties, term and duration, operational standards, quality control measures, intellectual property rights, training and support, termination conditions, and dispute resolution. Our franchise agreement template and format services provide industry-standard structures with customizable frameworks to meet your specific needs while ensuring regulatory compliance.'
          },
          {
            question: 'What is the typical duration of a franchise agreement?',
            answer: 'Franchise agreements typically last between 5 to 20 years, depending on the industry and business model. The duration should be sufficient to allow the franchisee to recoup their investment and establish the business. Most agreements include renewal options with specific conditions. The term should balance the franchisor\'s need for flexibility with the franchisee\'s need for security. Your lawyer can advise on the appropriate duration for your specific franchise relationship.'
          },
          {
            question: 'What are royalty fees in a franchise agreement?',
            answer: 'Royalty fees are ongoing payments made by the franchisee to the franchisor, typically calculated as a percentage of gross sales (usually 4-8%) or a fixed monthly amount. These fees compensate the franchisor for ongoing support, brand usage, and system improvements. The franchise agreement should clearly specify: calculation method, payment frequency, reporting requirements, audit rights, and any minimum royalty amounts. Royalty structures vary by industry and should be negotiated carefully.'
          },
          {
            question: 'Can a franchise agreement be terminated early?',
            answer: 'Yes, a franchise agreement can be terminated early under specific conditions outlined in the agreement, such as: material breach of contract by either party, failure to meet performance standards, violation of quality control measures, bankruptcy or insolvency, failure to pay fees, unauthorized transfer of franchise rights, or mutual agreement. The agreement should specify notice periods, cure periods for breaches, and consequences of termination including post-termination obligations. Early termination can have significant legal and financial consequences.'
          },
          {
            question: 'What is territorial protection in a franchise agreement?',
            answer: 'Territorial protection grants the franchisee exclusive rights to operate within a defined geographic area, preventing the franchisor from opening competing locations or granting other franchises in that territory. The agreement should clearly define: the protected territory boundaries, exclusivity terms and conditions, performance requirements to maintain exclusivity, exceptions to territorial protection (e.g., online sales), and consequences of failing to meet performance standards. Territorial protection is crucial for franchisee success and should be carefully negotiated.'
          },
          {
            question: 'What is stamp duty on franchise agreements in India?',
            answer: 'Stamp duty on franchise agreements varies by state in India and is calculated based on the agreement value, including franchise fees and projected royalties. Rates typically range from 0.1% to 8% depending on the state. The agreement must be stamped within the prescribed time to be admissible as evidence in court. Failure to pay proper stamp duty can result in penalties and the agreement being inadmissible. We ensure proper calculation, timely payment, and compliance with state-specific stamp duty requirements.'
          },
          {
            question: 'What happens to intellectual property in a franchise agreement?',
            answer: 'In a franchise agreement, the franchisor retains ownership of all intellectual property including trademarks, trade names, logos, proprietary systems, and trade secrets. The franchisee receives a limited license to use this intellectual property during the franchise term, subject to quality control and brand standards. The agreement should specify: permitted uses, quality control measures, protection obligations, consequences of misuse, and return or cessation of use upon termination. Intellectual property protection is critical to maintaining brand value.'
          },
          {
            question: 'Do I need a lawyer to review a franchise agreement before signing?',
            answer: 'Absolutely yes. Franchise agreements are complex legal documents with long-term implications. A lawyer can: identify unfavorable terms and hidden obligations, negotiate better terms on your behalf, ensure compliance with franchise laws, explain your rights and obligations, assess the fairness of fees and royalties, review territorial protection adequacy, evaluate termination and renewal provisions, and protect your interests. The cost of legal review is minimal compared to potential losses from an unfavorable agreement. Never sign a franchise agreement without legal review.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Franchise Agreement Services?',
      visible: true,
      order: 11,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional franchise agreement and partnership deed services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Partnership Deed & Franchise Agreement Lawyer in Delhi | GAG Lawyers',
    metaDescription: 'Expert partnership deed and franchise agreement services in Delhi. Professional legal advice for franchisors and franchisees with comprehensive documentation.'
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
