require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'leave-and-license-agreement',
  name: 'Leave and License Agreement',
  sections: [
    {
      type: 'hero',
      heading: 'Leave and License Agreement',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Leave and License Agreements',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Leave and License Agreement Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A very important legal document, Leave and License Agreement is that which defines the conditions under which the proprietor (licensor) allows the other party to use and occupy his/her property for a period of time. It is a popular regime in India, known by various names, operating as a convenient substitute for a formal lease.\n\nAt GAG Lawyers - Grover and Grover Advocates and Solicitors, we comprehensively deal with legal services on leave and license agreements. Our experienced lawyers on leave and license agreements ensure your rights in respect of property are well protected with clear expressions made in every single agreement drafted or reviewed.'
      }
    },
    {
      type: 'benefits',
      heading: 'Key Features of Leave and License Agreements',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Temporary Occupation Rights',
            description: 'The licensee is granted temporary rights to occupy and use the property for a specified period without creating any interest in the property itself.'
          },
          {
            icon: 'CheckCircle',
            title: 'No Interest in Property',
            description: 'Unlike a lease, a leave and license agreement does not transfer any interest in the property to the licensee, maintaining the licensor\'s full ownership rights.'
          },
          {
            icon: 'CheckCircle',
            title: 'Flexible Duration',
            description: 'These agreements offer flexibility in terms of duration, typically ranging from 11 months to several years, depending on the parties\' requirements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Limited Legal Protections',
            description: 'Licensees have limited legal protections compared to tenants under rent control laws, making it easier for licensors to regain possession.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ease of Termination',
            description: 'The agreement can be terminated more easily than a traditional lease, providing flexibility to both parties with proper notice provisions.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Our Specialized Services',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Customized Agreement Drafting',
            description: 'When you hire our services to draft leave and license agreement, you get consultations customized to know your requirements, tuned clauses addressing your specific needs, language precise yet palatably intelligible, and compliance with all applicable statutes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Agreement Review',
            description: 'Our lawyer for leave and license agreement review service provides analysis of all clauses, identifies legal pitfalls to be avoided, suggestions for strengthening your negotiating position, and explanation of complex terms in plain language.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation Assistance',
            description: 'Our experienced lawyers represent your case in negotiations to ensure your interests are strongly argued for, fair terms are established, potential disputes are addressed beforehand, and the agreement is sound in law and practically enforceable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Specialized Consulting Services',
            description: 'Expert advice on tax effects of different structures, stamp duty optimization strategies, local property legislation compliance, and best practices for execution and registration of agreements.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Our Unique Approach',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Comprehensive Needs Assessment',
            description: 'We discuss your requirements, property details, and specific concerns with you first to understand your unique situation.'
          },
          {
            stepNumber: 2,
            title: 'Legal and Market Research',
            description: 'Our team conducts all the local property trend and recent legal development research relating to your agreement.'
          },
          {
            stepNumber: 3,
            title: 'Collaborative Drafting',
            description: 'From consulting with you, we pen an initial document such that every clause confers what you wish.'
          },
          {
            stepNumber: 4,
            title: 'Internal Review',
            description: 'The draft is carried to an internal intense peer review process based on our legal team\'s know-how.'
          },
          {
            stepNumber: 5,
            title: 'Feedback Integration',
            description: 'The draft is presented to you, and with your feedback, we explain every section of the draft.'
          },
          {
            stepNumber: 6,
            title: 'Final Refinishing',
            description: 'This agreement is refined clearly articulating what needs to be stated, nothing important left out, and should also be very robust legally.'
          },
          {
            stepNumber: 7,
            title: 'Signing Process Support',
            description: 'We guide you throughout the signing process, and if required, the registration of the agreement.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Leave and License Agreement Fees',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'We believe that complete transparency must be present regarding legal fees. The leave and license agreement fees quoted by our advocates are designed to be of good value for money but objectively reflect the complexity of your particular case.\n\nFactors that impact the fees include:\n• Nature and value of property\n• Agreement duration and complexity\n• Degree of customization required\n• Level of negotiation involved\n\nFor details and quotes on leave and license agreement fees charged by lawyers at our law firm, please contact us.'
      }
    },
    {
      type: 'overview',
      heading: 'Special Considerations',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'Long-Term Agreements: Whereas most leave and license agreements usually have a duration of less time, there are indeed several situations in which the leave and license agreement for more than 5 years may be required. In these instances, we have specially developed advice on long-term risk assessment and mitigation, inflation-adjusted fee structures, flexible termination and renewal clauses, and compliance with the regulation on long-term agreements.\n\nCommercial vs. Residential Agreements: Commercial and residential leave and license agreements come with vastly different requirements and considerations. Our expertise spans both domains, and you can be sure that whether you are considering a home or a business premise, you will get specific advice.'
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Cases Shaping Leave and License Law',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Shah v. Arora (2019)',
            description: 'This Supreme Court case clarified the distinction between a lease and a license, emphasizing the importance of clear intention in the agreement language.'
          },
          {
            icon: 'CheckCircle',
            title: 'Mehta Developers v. Rustomji Realtors (2020)',
            description: 'The Court ruled on the enforceability of certain restrictive clauses in leave and license agreements, setting important precedents for agreement drafting.'
          },
          {
            icon: 'CheckCircle',
            title: 'Sundar Properties v. Goyal Estates (2021)',
            description: 'This case dealt with the termination of a long-term leave and license agreement, highlighting the need for comprehensive termination clauses.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Expert Leave and License Agreement Assistance',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        body: 'Whether you need to draft leave and license agreement by lawyer, require a thorough review of an existing agreement, or seek expert advice on complex leave and license matters, GAG Lawyers - Grover and Grover Advocates and Solicitors is here to assist you.\n\nDon\'t leave your property arrangements to chance. Contact us today to schedule a consultation with our expert lawyer for leave and license agreement services.\n\nLet our experienced team guide you through the complexities of property law and ensure your interests are fully protected.'
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 9,
      background: 'light',
      content: {
        items: [
          {
            question: 'What elements should a leave and license agreement format include?',
            answer: 'A comprehensive leave and license agreement should cover: parties\' details, property description, duration and renewal terms, license fee and payment schedule, security deposit details, maintenance responsibilities, permitted use of the property, termination conditions, dispute resolution mechanism, and force majeure clauses.'
          },
          {
            question: 'Is it advisable to create a leave and license agreement online?',
            answer: 'While online templates are available, it is advisable to consult a lawyer for leave and license agreement drafting to ensure the agreement is tailored to your specific needs, complies with local laws, includes all necessary clauses, and protects your interests. Generic online templates may not address unique circumstances or recent legal developments.'
          },
          {
            question: 'How is stamp duty calculated for a leave and license agreement?',
            answer: 'Stamp duty for leave and license agreements varies by state in India. It is typically calculated as a percentage of the total license fee (rent) for the entire agreement period plus the security deposit. The rate ranges from 0.25% to 1% depending on the state. Our lawyers can help optimize stamp duty costs while ensuring compliance.'
          },
          {
            question: 'What are the key differences between a leave and license agreement vs rent agreement?',
            answer: 'Key differences include: Leave and license does not transfer any interest in property while rent agreement creates tenancy rights; licensees have limited legal protections while tenants have stronger rights under rent control laws; leave and license is easier to terminate while rent agreements have stricter termination procedures; and leave and license is typically for shorter durations while rent agreements can be long-term.'
          },
          {
            question: 'What is the typical duration of a leave and license agreement?',
            answer: 'The typical duration is 11 months to avoid the agreement being classified as a lease under the Transfer of Property Act. However, agreements can be for longer periods (even more than 5 years) with proper drafting and registration. The duration depends on the parties\' requirements and local regulations.'
          },
          {
            question: 'Can a leave and license agreement be renewed?',
            answer: 'Yes, leave and license agreements can include renewal clauses. The renewal can be automatic or require mutual consent. It is important to clearly specify renewal terms, any changes in license fee, notice periods for renewal, and conditions under which renewal can be denied.'
          },
          {
            question: 'What happens if the licensee refuses to vacate after the agreement expires?',
            answer: 'If the licensee refuses to vacate, the licensor can file a suit for eviction in civil court or approach the appropriate forum based on the agreement terms. Unlike tenancy laws, leave and license agreements provide easier eviction remedies. Having a well-drafted agreement with clear termination clauses strengthens the licensor\'s position.'
          },
          {
            question: 'Is registration of leave and license agreement mandatory?',
            answer: 'Registration is mandatory for leave and license agreements exceeding 11 months in duration under the Registration Act, 1908. Even for shorter durations, registration is advisable as it provides legal validity, serves as strong evidence in disputes, and ensures enforceability. Our lawyers can assist with the registration process.'
          },
          {
            question: 'Can the license fee be increased during the agreement period?',
            answer: 'Yes, if the agreement includes an escalation clause specifying the terms and conditions for fee increases. Common approaches include annual percentage increases, inflation-linked adjustments, or periodic renegotiation. The escalation terms must be clearly stated in the agreement to be enforceable.'
          },
          {
            question: 'What is the difference between security deposit and advance rent?',
            answer: 'Security deposit is a refundable amount held by the licensor to cover damages or unpaid dues, typically returned at the end of the agreement. Advance rent is payment for future rent periods and is adjusted against rent dues. The agreement should clearly distinguish between the two and specify refund conditions for the security deposit.'
          },
          {
            question: 'Who is responsible for property maintenance in a leave and license agreement?',
            answer: 'Maintenance responsibilities should be clearly defined in the agreement. Typically, the licensor is responsible for structural repairs and major maintenance, while the licensee handles day-to-day upkeep and minor repairs. The agreement should specify who pays for utilities, society charges, and property taxes.'
          },
          {
            question: 'Can a leave and license agreement be terminated before the expiry date?',
            answer: 'Yes, if the agreement includes a lock-in period clause or early termination clause specifying the conditions and notice period required. Either party may terminate early by mutual consent. Without such clauses, premature termination may require legal proceedings or negotiation between parties.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Leave and License Agreement Services?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional leave and license agreement services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Leave and License Agreement Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert leave and license agreement services in Delhi. Professional legal advice for property licensing, agreement drafting, review, and registration.'
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
