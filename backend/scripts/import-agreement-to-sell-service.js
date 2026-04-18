require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importAgreementToSellService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Agreement to Sell/i });
    
    if (!service) {
      console.error('❌ Agreement to Sell service not found in database');
      process.exit(1);
    }

    console.log(`Found service: ${service.name} (slug: ${service.slug})`);

    // Delete existing sections
    await ServiceSection.deleteMany({ serviceId: service._id });

    // Prepare sections
    const sections = [
      {
        serviceId: service._id,
        type: 'hero',
        visible: true,
        order: 1,
        heading: 'Agreement to Sell',
        background: 'dark',
        content: {
          subtitle: 'Expert Legal Services for Property Transactions',
          description: 'An agreement to sell property is the first and most important document for any real estate transaction. This legally binding document stipulates the terms and conditions under which a property would be transferred from the seller to the buyer.',
          image: '/images/agreement-to-sell-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'The Importance of Legal Expertise',
        background: 'light',
        content: {
          text: 'With this complex world of transactions involved in real estate, it is not only helpful but quite crucial to have a knowledgeable lawyer for agreement to sell property. GAG Lawyers - Grover and Grover Advocates and Solicitors understand the complexities of property law and just how important a good agreement can be in protecting your interests.\n\nOur lawyer specializing in agreements to sell property brings years of experience to the fight to protect your rights and interests through the process. From drafting and reviewing agreements to expert legal advice, we guide you through each step of your property transaction.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 3,
        heading: 'Types of Agreements We Handle',
        background: 'light',
        content: {
          items: [
            {
              title: 'Agreement to Sell Flat',
              description: 'Our advocate ensures that all aspects of apartment transactions are agreed on.'
            },
            {
              title: 'Agreement to Sell for Resale Flat',
              description: 'This organization deals with specific issues relating to resale properties and provides protection to both the buyer and seller.'
            },
            {
              title: 'Agreement to Sell for Under Construction Property',
              description: 'Our experts manage the risks associated with projects under construction, thus securing one\'s investment.'
            },
            {
              title: 'Agreement to Sell Immovable Property',
              description: 'We provide legal services for every type of real estate, including land and buildings.'
            },
            {
              title: 'Agreement to Sell Vehicle',
              description: 'Our services extend to movable property to facilitate the smooth sale of vehicles.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 4,
        heading: 'Why You Need Legal Expertise',
        background: 'accent',
        content: {
          items: [
            {
              title: 'Compliance with the Law',
              description: 'Ensure all legal requirements are met for a valid agreement.'
            },
            {
              title: 'Protection of Financial Interests',
              description: 'Safeguard your investment and financial commitments.'
            },
            {
              title: 'Avoid Future Disputes',
              description: 'Clear terms prevent misunderstandings and legal conflicts.'
            },
            {
              title: 'Navigate Complex Property Laws',
              description: 'Expert guidance through intricate legal frameworks.'
            },
            {
              title: 'Smooth Transaction Process',
              description: 'Ensure efficient and hassle-free property transfer.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 5,
        heading: 'Agreement to Sell Format',
        background: 'light',
        content: {
          text: 'A comprehensive sales agreement usually contains the following essential elements:\n\n• Parties\' details (buyer and seller information)\n• Accurate description of the property\n• Amount and payment terms\n• Date of possession\n• Responsibilities of both parties\n• Effect of breach\n• Redress mechanism for disputes\n\nOur real estate attorney will make sure that all the requirements are followed in an agreement to sell format that is prepared for you.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 6,
        heading: 'Agreement to Sell Format for Resale Flat',
        background: 'light',
        content: {
          text: 'Other factors that can be involved in dealing with resale properties are:\n\n• Current status of occupancy\n• Details of earlier transactions\n• Specific provisions about the existing fixtures and fittings\n\nOur advocate for agreement to sell property tailors the format to address the unique aspects of resale transactions.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 7,
        heading: 'Drafting Specialized Agreements',
        background: 'accent',
        content: {
          items: [
            {
              title: 'Draft Agreement to Sell Property',
              description: 'Our drafting lawyer prepares case-specific documents for flat or other types of properties.'
            },
            {
              title: 'Draft Agreement to Sell a Car',
              description: 'We address the particularities of selling a vehicle through a very smooth legal process.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 8,
        heading: 'Legal Fees and Consultation',
        background: 'light',
        content: {
          text: 'We make sure that the legal fees involved in property lawyer services are transparent. Property lawyer fee bases include the following:\n\n• Type and value of the property\n• Complexity of the transaction\n• Level of customisation required\n• Degree of legal representation necessary\n\nFor a detailed quote, contact our property lawyer service for a personalized consultation.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 9,
        heading: 'Stamp Duty Considerations',
        background: 'light',
        content: {
          text: 'Stamp duty is a significant tax aspect when it comes to any sale. Stamp duty is more commonly associated with final sale deeds; however, the agreement to sell may attract the stamp duty charge in many jurisdictions. Our experts can help you with:\n\n• What rate of stamp duty applies to your transaction\n• What varies between states in terms of computation of stamp duty\n• How you can make lesser payments on stamp duty\n• How to comply with the local regulations related to stamp duty\n\nWe also guide you regarding matters like leave and license agreement stamp duty, so that no point of tax and duty concern with regard to your property transaction goes unnoticed.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 10,
        heading: 'Landmark Cases in Property Law',
        background: 'accent',
        content: {
          items: [
            {
              title: 'Suraj Lamp & Industries Pvt. Ltd. v. State of Haryana (2012)',
              description: 'This case gave significant importance at the Supreme Court levels to registered sales deeds rather than general power of attorney sales, thus governing the construction of agreements to sell.'
            },
            {
              title: 'Narne Construction P. Ltd. v. Union of India (2012)',
              description: 'It deals with the issues of homebuyers in delayed projects, which had a huge impact on agreements related to under-construction properties.'
            },
            {
              title: 'K.P. Varghese v. Income Tax Officer (1981)',
              description: 'While primarily a tax case, it set important precedents for interpreting property sale agreements, influencing how lawyers draft these documents.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'faq',
        visible: true,
        order: 11,
        heading: 'Frequently Asked Questions',
        background: 'light',
        content: {
          faqs: [
            {
              question: 'What is the difference between an agreement to sell and a sale deed?',
              answer: 'An agreement to sell property refers to an agreement that makes a promise to transfer property in the future, whereas a sale deed refers to the actual transfer document. Our lawyer for agreement to sell property can counsel you through both of these important stages of the transaction.'
            },
            {
              question: 'How is stamp duty calculated for an agreement to sell?',
              answer: 'Stamp duty on properties varies from state to state and generally is some percentage of the value of the property. The best would be getting our real estate lawyer to determine the same based on your location and the details of your transaction.'
            },
            {
              question: 'Can an agreement to sell be cancelled?',
              answer: 'Yes, under certain conditions specified in the agreement. Our advocate for agreement to sell flat can help draft appropriate cancellation clauses to protect your interests.'
            },
            {
              question: 'Is an agreement to sell legally binding?',
              answer: 'It is a contract that is legally binding, but the enforcement might be specific. In this regard, it may require further legal steps that can be provided with our best lawyer in property disputes.'
            },
            {
              question: 'How long is an agreement to sell valid?',
              answer: 'In the main, validity periods are usually stipulated in the agreement itself. Our property lawyer service can guide you to get the right length for your case.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 12,
        heading: 'Contact Us for Expert Property Transaction Assistance',
        background: 'dark',
        content: {
          description: 'Whether you require a lawyer for agreement to sell property or need the deep scrutiny of an already existing agreement, GAG Lawyers - Grover and Grover Advocates and Solicitors are ready for you. Do not let your property transactions fall into the hands of fate.',
          buttonText: 'Book Consultation',
          buttonLink: '/contact'
        }
      }
    ];

    // Insert sections
    await ServiceSection.insertMany(sections);

    // Update SEO
    await Service.findByIdAndUpdate(service._id, {
      seo: {
        title: 'Agreement to Sell - Expert Legal Services | GAG Lawyers',
        description: 'An agreement to sell property is the first and most important document for any real estate transaction. This legally binding document stipulates the terms and conditions under which a property would be transferred from the seller to the buyer.',
        keywords: 'agreement to sell, agreement to sell property, agreement to sell flat, lawyer for agreement to sell, property lawyer, real estate lawyer, agreement to sell format, stamp duty on agreement to sell'
      }
    });

    console.log(`✅ Agreement to Sell imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importAgreementToSellService();
