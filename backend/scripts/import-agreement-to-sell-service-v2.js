require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'agreement-to-sell',
  name: 'Agreement to Sell',
  sections: [
    {
      type: 'hero',
      heading: 'Agreement to Sell',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Property Agreements',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Agreement to Sell Property',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'An agreement to sell property is the first and most important document for any real estate transaction. This legally binding document stipulates the terms and conditions under which a property would be transferred from the seller to the buyer. Whether you\'re dealing with an agreement to sell flat, land, or even an agreement to sell vehicle, what\'s placed on that document should accurately represent the transaction duly in order to have a more healthy land deal.\n\nWith this complex world of transactions involved in real estate, it is not only helpful but quite crucial to have a knowledgeable lawyer for agreement to sell property. GAG Lawyers - Grover and Grover Advocates and Solicitors understand the complexities of property law and just how important a good agreement can be in protecting your interests. Our lawyer specializing in agreements to sell property brings years of experience to the fight to protect your rights and interests through the process. From drafting and reviewing agreements to expert legal advice, we guide you through each step of your property transaction.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Agreements We Handle',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Agreement to Sell Flat',
            description: 'Our advocate for agreement to sell flat ensures that all aspects of apartment transactions are agreed on.'
          },
          {
            icon: 'CheckCircle',
            title: 'Agreement to Sell for Resale Flat',
            description: 'This organization deals with specific issues relating to resale properties and provides protection to both the buyer and seller.'
          },
          {
            icon: 'CheckCircle',
            title: 'Agreement to Sell for Under Construction Property',
            description: 'Our experts manage the risks associated with projects under construction, thus securing one\'s investment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Agreement to Sell Immovable Property',
            description: 'We provide legal services for every type of real estate, including land and buildings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Agreement to Sell Vehicle',
            description: 'Our services extend the movable property to facilitate the smooth sale of vehicles.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'The Importance of Legal Expertise',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Compliance with the Law',
            description: 'Ensuring all legal requirements are met and the agreement is legally valid and enforceable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Protection of Financial Interests',
            description: 'Safeguarding your financial investment and ensuring fair terms in the transaction.'
          },
          {
            icon: 'CheckCircle',
            title: 'Avoid Future Disputes',
            description: 'Preventing potential conflicts through clear, comprehensive documentation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Navigating Complex Property Laws',
            description: 'Expert guidance through the intricate legal framework surrounding property transactions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Guaranteeing Smooth Transaction Process',
            description: 'Ensuring the effectiveness and enforceability of your agreement for a seamless transaction.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Agreement Formats and Considerations',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        body: 'A total sales agreement usually contains the following essential elements:\n\n• Parties\' details\n• Accurate description of the property\n• Amount and payment terms\n• Date of possession\n• Responsibilities of both parties\n• Effect of breach\n• Redress mechanism for disputes\n\nOur real estate attorney will make sure that all the requirements are followed in an agreement to sell format that is prepared for you.'
      }
    },
    {
      type: 'overview',
      heading: 'Agreement to Sell Format for Resale Flat',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'Other factors that can be involved in dealing with resale properties are:\n\n• Current status of occupancy\n• Details of earlier transactions\n• Specific provisions about the existing fixtures and fittings\n\nOur advocate for agreement to sell property tailors the format to address the unique aspects of resale transactions.'
      }
    },
    {
      type: 'benefits',
      heading: 'Drafting Specialized Agreements',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Draft Agreement to Sell Property',
            description: 'Our drafting lawyer for agreement to sell flat or other types of properties prepares case-specific documents tailored to your unique situation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Draft Agreement to Sell a Car',
            description: 'We address the particularities of selling a vehicle through a very smooth legal process with proper documentation.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Legal Fees and Consultation',
      visible: true,
      order: 7,
      background: 'dark',
      content: {
        body: 'We make sure that the legal fees involved in property lawyer services are transparent. Property lawyer fee bases include the following:\n\n• Type and value of the property\n• Complexity of the transaction\n• Level of customisation required\n• Degree of legal representation necessary\n\nFor a detailed quote, contact our property lawyer near me service for a personalized consultation.'
      }
    },
    {
      type: 'overview',
      heading: 'Stamp Duty Considerations in Agreements to Sell',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        body: 'Stamp duty is a significant tax aspect when it comes to any sale. Stamp duty is more commonly associated with final sale deeds; however, the agreement to sell may attract the stamp duty charge in many jurisdictions. Our experts can help you with:\n\n• What rate of stamp duty applies to your transaction\n• What varies between states in terms of computation of stamp duty\n• How you can make lesser payments on stamp duty\n• How to comply with the local regulations related to stamp duty\n\nWe also guide you regarding matters like leave and license agreement stamp duty, so that no point of tax and duty concern with regard to your property transaction goes un-noticed.'
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Cases in Property Law',
      visible: true,
      order: 9,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Suraj Lamp & Industries Pvt. Ltd. v. State of Haryana (2012)',
            description: 'This case gave significant importance at the Supreme Court levels to registered sales deeds rather than general power of attorney sales, thus governing the construction of agreements to sell.'
          },
          {
            icon: 'CheckCircle',
            title: 'Narne Construction P. Ltd. v. Union of India (2012)',
            description: 'It deals with the issues of homebuyers in delayed projects, which had a huge impact on agreements related to under-construction properties.'
          },
          {
            icon: 'CheckCircle',
            title: 'K.P. Varghese v. Income Tax Officer, 1981',
            description: 'While primarily a tax case, it set important precedents for interpreting property sale agreements, influencing how our lawyers draft these documents.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Contact Us for Expert Property Transaction Assistance',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Whether you require a lawyer for agreement to sell property or need the deep scrutiny of an already existing agreement, GAG Lawyers - Grover and Grover Advocates and Solicitors are ready for you.\n\nDo not let your property transactions fall into the hands of fate. Consult with one of the best lawyer for property who can work on property matters and book a consultation appointment with our seasoned lawyer team.\n\nAllow our experienced lawyers to walk you through all the intricate details of property law and protect your interest in every deed involving a property sale.'
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
            question: 'What is the difference between an agreement to sell and a sale deed?',
            answer: 'For instance, an agreement to sell property refers to an agreement that makes a promise to transfer property in the future, whereas a sale deed refers to the actual transfer document. Our lawyer for agreement to sell property can counsel you through both of these important stages of the transaction.'
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
            answer: 'In the main, validity periods are usually stipulated in the agreement itself. Our service for property lawyers near me can guide you to get the right length for your case.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Property Agreement Services?',
      visible: true,
      order: 12,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional property agreement services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Agreement to Sell Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert legal services for property agreements. Professional drafting and review of agreements to sell property, flats, and vehicles in Delhi.'
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
