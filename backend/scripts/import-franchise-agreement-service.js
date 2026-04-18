require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'franchise-agreement',
  name: 'Franchise Agreement',
  sections: [
    {
      type: 'hero',
      heading: 'Franchise Agreement',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Franchise Agreements',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Franchise Agreement Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A franchise agreement is the core foundation of any franchising relationship. It points out the very rights and obligations of either party within the relationship. As your lawyer for franchise agreement for work with a franchise agreement, we take these contracts and draft them with care in order to ensure your interests are protected while yet always keeping your eye on business success.\n\nWith decades of experience in franchising law, GAG Lawyers - Grover and Grover Advocates and Solicitors as your lawyer for franchise agreement presents prudent legal advice for safely navigating franchise relationships in the fast-paced dynamics of today\'s business world to protect the interest of your business while developing sustainable growth.'
      }
    },
    {
      type: 'overview',
      heading: 'Empowering Franchisors and Franchisees',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'Whenever there is a need to consult with a lawyer for franchise agreement, our abilities will be more than mere documentation. We give strategic legal advice that takes cognizance of your business objectives, industry standards, and regulatory requirements on such matters. Your franchise agreement advocate ensures that all aspects of your franchising relationship are properly structured and legally protected.\n\nWe assist both the expanding franchisor and the savvy franchisee investing in an already proven business model through our navigation of the often complex world of franchise law.'
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
            description: 'Our experience encompasses standardization of curriculums and quality controls, requirements regarding teacher training and certification, infrastructure and facilities, assessment methodologies for students, managing brand reputation, and intellectual property protection.'
          },
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement for Restaurant in India',
            description: 'We consider food safety and hygiene problems, brand consistency requirements, supply chain management, quality control measures, staff training protocol, and customer care standards.'
          },
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement for Hotels',
            description: 'We address property maintenance standards, service quality benchmarks, brand compliance requirements, operational procedures, staff training programs, and guest satisfaction metrics.'
          },
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement for Food Outlet',
            description: 'We consider health and safety rules, standards for food preparation, equipment specifications, supplier relationships, quality assurance measures, and brand protection protocols.'
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
            description: 'Using clear and non-redundant language, terms and conditions that cover everything, protection of intellectual property, guidelines on operations, ways of enforcing quality control, and provision of performance standards.'
          },
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement Template',
            description: 'Industry-standard structures, customizable frameworks, regulatory compliance, clear operational guidelines, protection mechanisms, and enforcement provisions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Franchise Agreement Format',
            description: 'Comprehensive format services including industry-standard structures, customizable frameworks, regulatory compliance, clear operational guidelines, protection mechanisms, and enforcement provisions.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Precedents and Case Studies',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Modern Bread Industries v. Maharashtra Distributors (2022)',
            description: 'This landmark Supreme Court judgment addressed rights of territorial protection, computation of royalties methods, standards of quality control, territorial protection methods, operational autonomy, and methods for resolving disputes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Domino\'s India v. Gujarat Franchisee Association (2021)',
            description: 'This case made significant judgments about limitations on operational control, standards of brand protection, conditions for ending, quality maintenance, territorial rights, and royalty methods.'
          },
          {
            icon: 'CheckCircle',
            title: 'McDonald\'s India v. Bakshi (2020)',
            description: 'The most relevant determinations were made about intellectual property rights, nature of master franchise relationships, method of resolving disputes, operational standards, brand protection, and exclusivity of territories.'
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
        body: 'Our lawyer for franchise agreement services follow a transparent fee structure considering agreement complexity, industry requirements, service scope, support needs, documentation extent, and consultation requirements.\n\nThe franchise lawyer cost typically includes:\n• Initial consultation\n• Document preparation\n• Legal research\n• Compliance verification\n• Negotiation support\n• Implementation guidance\n\nUnderstanding franchise agreement India regulations is important for compliance with local laws, protection of rights, dispute prevention, operational clarity, risk mitigation, and business success.'
      }
    },
    {
      type: 'overview',
      heading: 'Regulatory Compliance and Protection',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'The franchise agreement stamp duty varies state-wise and value of the agreement as well. In this case, one requires proper calculation, timely payment, proper documentation, legal compliance, valid registration, and regular updates.\n\nAs your lawyer for franchise agreement, we ensure comprehensive regulatory compliance including proper documentation, timely filing, legal verification, and ongoing support to maintain compliance with all applicable laws and regulations.'
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
        body: 'A proper legal foundation is the starting point on your way to success in franchising. Contact us today, and we will ensure that your franchise agreements protect your interests while stimulating successful business relationships.\n\nAs a devoted lawyer for franchise agreement matters, we help you attain your goals through comprehensive legal guidance and documentation services for franchising. Let our experience manage all the legalities while you work to build your franchise venture.\n\nSchedule a consultation today for questions or issues you may have pertaining to your franchise agreement and see how our expertise can assist you with your venture.'
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
            answer: 'A franchise lawyer specializes in drafting and reviewing agreements, ensuring compliance with franchise laws, protecting the client\'s interests, solving disputes between franchisors and franchisees, negotiating terms, and providing ongoing legal services throughout the franchise relationship.'
          },
          {
            question: 'How can I look for the best franchise attorney near me?',
            answer: 'Look for a franchise attorney with specific experience in franchise law, check their track record with similar businesses in your industry, verify their credentials and client reviews, ensure they understand local regulations, and schedule consultations to assess their expertise and communication style.'
          },
          {
            question: 'What is the franchise agreement meaning in legal terms?',
            answer: 'In legal terms, a franchise agreement is a binding contract between a franchisor and franchisee that grants the franchisee the right to operate a business using the franchisor\'s trademark, business model, and systems in exchange for fees and royalties, while outlining the rights, obligations, and responsibilities of both parties.'
          },
          {
            question: 'What are the basic elements of a franchise agreement India?',
            answer: 'Basic elements include grant of franchise rights, territory definition, term and renewal provisions, fees and royalties structure, intellectual property rights, operational standards and quality control, training and support obligations, termination conditions, dispute resolution mechanisms, and compliance with Indian laws.'
          },
          {
            question: 'Does a franchise agreement have an accepted standard format?',
            answer: 'While there is no single mandatory format, franchise agreements typically follow industry-standard structures that include key sections such as definitions, grant of rights, fees, operational requirements, intellectual property, termination, and dispute resolution. However, each agreement should be customized to the specific business and industry requirements.'
          },
          {
            question: 'What is the typical duration of a franchise agreement?',
            answer: 'Franchise agreements in India typically range from 5 to 10 years, with provisions for renewal. The duration depends on factors such as the industry, investment required, brand establishment time, and mutual agreement between franchisor and franchisee.'
          },
          {
            question: 'What fees are involved in a franchise agreement?',
            answer: 'Common fees include initial franchise fee (one-time payment for franchise rights), ongoing royalty fees (percentage of revenue), marketing or advertising fees, training fees, and renewal fees. The structure varies based on the franchise system and industry.'
          },
          {
            question: 'Can a franchise agreement be terminated early?',
            answer: 'Yes, franchise agreements can be terminated early under specific conditions outlined in the agreement, such as breach of contract, failure to meet performance standards, violation of operational guidelines, or mutual agreement. Early termination provisions should be clearly defined in the agreement.'
          },
          {
            question: 'What is stamp duty on franchise agreements in India?',
            answer: 'Stamp duty on franchise agreements varies by state in India and is calculated based on the agreement value. It typically ranges from 0.1% to 1% of the agreement value. Proper payment and registration are essential for the agreement to be legally enforceable.'
          },
          {
            question: 'How is intellectual property protected in a franchise agreement?',
            answer: 'Intellectual property is protected through clauses that define trademark usage rights, copyright protection for materials and systems, trade secret confidentiality, quality control standards, brand guidelines enforcement, and restrictions on use after termination.'
          },
          {
            question: 'What happens to the franchise agreement if the franchisor sells the business?',
            answer: 'The franchise agreement typically includes provisions for assignment and transfer. Generally, the agreement remains valid and transfers to the new owner, but specific terms regarding notification, approval rights, and any changes to terms should be clearly outlined in the agreement.'
          },
          {
            question: 'Can a franchisee operate multiple locations under one agreement?',
            answer: 'This depends on the franchise agreement terms. Some agreements grant rights for a single location, while others may include multi-unit development rights or area development agreements that allow the franchisee to operate multiple locations within a defined territory.'
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
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional franchise agreement services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Franchise Agreement Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert franchise agreement services in Delhi. Professional legal advice for franchise contracts, documentation, compliance, and protection for franchisors and franchisees.'
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
