require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'employment-agreement',
  name: 'Employment Agreement',
  sections: [
    {
      type: 'hero',
      heading: 'Employment Agreement',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Employment Contracts',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Employment Agreement Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A sound employment contract in today\'s business dynamics often serves as the foundation for a harmonious and productive workplace, and at GAG Lawyers - Grover and Grover Advocates and Solicitors, our employment agreement lawyers pride themselves on seasoned experience that will ensure the legal safeguards of an employment agreement are definitely in place but tailored to the particular needs of your organization.\n\nInvolved with the labyrinth of labor laws and regulation of employment, cannot be met by merely filling out a template. We, your lawyer for employment agreement, look deeper into the specifics of your business and corporate culture to make agreements that pass the test while promoting a healthy workplace. Whether it\'s your first employee in a startup or a gigantic corporation revising its employment policies, our expertise as a lawyer for employment agreement ensures perfectly balanced and complete contracts.'
      }
    },
    {
      type: 'overview',
      heading: 'Crafting Tailored Employment Solutions',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'Every company is different, and our philosophy reflects that fact. From standard employment contracts to individual agreements, our lawyer for employment agreement will provide you with everything, from drafting your custom employment contract to consulting, negotiation assistance, and document review, all the way through complete resolution in case of a dispute.'
      }
    },
    {
      type: 'benefits',
      heading: 'Understanding Employment Agreement Types and Clauses',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: '1 Year Employment Contract',
            description: 'For those flexibility-oriented businesses, we draft a 1 year employment contract that balances the needs of an organization and rights of the employees. Our lawyer for employment agreement ensures that such fixed-term agreements strictly meet the regulations laid down by labour but strictly comply with your specific needs.'
          },
          {
            icon: 'CheckCircle',
            title: 'Employee Bond Agreement',
            description: 'An employee bond agreement can protect your interests when investing in the training or development of employees. We draft them very cautiously to ensure they are enforceable and fair. To save you time, we have an employee bond agreement word format PDF, which you may use to review and share with internal folks.'
          },
          {
            icon: 'CheckCircle',
            title: 'Employee Contract Agreement',
            description: 'An employee contract agreement is essentially the backbone of any employment relationship outlining roles, responsibilities, and expectations. Our lawyer for employment agreement takes care in drafting these documents to ensure no future conflict or misunderstanding arises in employment relationships.'
          },
          {
            icon: 'CheckCircle',
            title: 'Employment Agreement India',
            description: 'Legal framework Employment in India needs specific knowledge related to the special procedure. Our employment agreement India service ensures that it complies with local laws, and all the peculiarities of the business environment in India are taken into account.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Key Components of a Robust Employment Agreement',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Job Description and Responsibilities',
            description: 'Clear definition of the employee\'s role, duties, and expectations within the organization.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compensation and Benefits',
            description: 'Detailed breakdown of salary, bonuses, and all employee benefits included in the package.'
          },
          {
            icon: 'CheckCircle',
            title: 'Working Hours and Location',
            description: 'Specification of work schedule, location requirements, and any flexibility arrangements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Confidentiality and Non-Disclosure Agreement',
            description: 'Protection of sensitive business information and trade secrets.'
          },
          {
            icon: 'CheckCircle',
            title: 'Intellectual Property Rights',
            description: 'Clear ownership terms for any work product or inventions created during employment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non-Compete Clauses',
            description: 'Where applicable, restrictions on working for competitors after employment ends.'
          },
          {
            icon: 'CheckCircle',
            title: 'Conditions for Termination',
            description: 'Clear terms outlining how and when the employment relationship can be ended.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution Mechanisms',
            description: 'Procedures for handling conflicts and disagreements that may arise.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'The Process of Creating an Employment Agreement',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Initial Consultation',
            description: 'We begin by determining what your organization looks like and their requirements.'
          },
          {
            stepNumber: 2,
            title: 'Customized Drafting',
            description: 'Our lawyer for employment agreement drafts for your customized case.'
          },
          {
            stepNumber: 3,
            title: 'Collaborative Review',
            description: 'We go through the draft with you, fine-tuning details to ensure it meets your expectations and legal requirements.'
          },
          {
            stepNumber: 4,
            title: 'Final Preparation',
            description: 'Once approved, we prepare the agreement for signing.'
          },
          {
            stepNumber: 5,
            title: 'Implementation Guidance',
            description: 'We provide advice on properly implementing the agreement within your organization.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Expert Services: From Drafting to Resolution',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Draft Employment Agreement by Advocate',
            description: 'The years of experience our skilled advocates for employment agreement bring to the table while drafting the document to ensure that your contract is written with precision and foresight when you opt for our service of draft employment agreement by advocate.'
          },
          {
            icon: 'CheckCircle',
            title: 'Draft Employment Agreement by Lawyer',
            description: 'Our employment contract lawyers also offer specialized drafting services. A draft employment agreement by the lawyer delivers to you a document that is up to law\'s standards but at the same time adjusted towards meeting business goals.'
          },
          {
            icon: 'CheckCircle',
            title: 'Advocate for Employment Contract',
            description: 'Under drafting, our advocacy for employment contracts offers you a full-cycle process with the employment relationship. From clause interpretation to representing you in case of a dispute, we are a committed legally.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Legal Fees and Considerations',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'We recognize that litigation costs could bankrupt a business. Our labour lawyer fees structures are practical and accessible, with charges built around the specificity of your needs and the level of tailoring you require. We are forthright and transparent about our structure in our fee from the very start as your legal practitioner on employment agreements.\n\nEmployment Agreement Stamp Duty: Stamp duty is charged on some employment agreements in India. It varies, depending on the type of agreement and the specific state concerned. Our lawyer for employment agreement will guide you through the process by observing such requirements in the background while being mindful of keeping your cost optimization intact.'
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Cases Shaping Employment Law',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Vishaka and Others v. State of Rajasthan (1997)',
            description: 'This case resulted in the formulation of guidelines for preventing sexual harassment in the workplace, which significantly influenced how we draft related clauses in employment agreements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Randhir Singh v. Union of India (1982)',
            description: 'It is said to have established the principle of "equal pay for equal work" by which compensation provisions in employment contracts are approached.'
          },
          {
            icon: 'CheckCircle',
            title: 'Workmen of Dimakuchi Tea Estate v. Management of Dimakuchi Tea Estate (1958)',
            description: 'In this case, the court defined the term "industry" for and in the Industrial Disputes Act. It thereby shaped the way we classify businesses and draft agreements accordingly.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Employment Agreement Samples and Formats',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Although every agreement is likely to be built around specific needs, knowing common structures can be useful. We provide:\n\n• Employment Agreement Sample: A sample template that mentions all the general clauses and structures followed.\n• Employment Agreement Format: Framework guidelines for various forms of employment contracts.\n\nRemember, these examples are a starting point; you should consult a lawyer specializing in employment contracts so the draft of a legally sound and efficient agreement is made.'
      }
    },
    {
      type: 'overview',
      heading: 'Secure Your Workforce with Expert Legal Guidance',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        body: 'At GAG Lawyers - Grover and Grover Advocates and Solicitors, we are much more than a lawyer for employment agreement; we help you craft a legally sound and harmonious work environment. From simple employment contracts to industry-specific complex ones, all aimed at protecting your interests while creating positive employee relations.\n\nWhether you require a draft employment agreement by advocate, seek a lawyer for employment contract, or require guidance on employment agreement clauses, our team will be able to assist you with expertise. We allow you to focus on both the growth of your business and the nurturing of your workforce as we navigate the intricacies of employment law.\n\nContact us today to schedule a consultation and experience the difference of expert legal stewardship in employment matters. Let our skilled team of lawyers for an employment agreement help you draft agreements that will test times and law, thereby providing a strong foundation for success in your organization.'
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
            question: 'What would a basic employment agreement look like?',
            answer: 'The basic agreement should contain clauses regarding job description, compensation, work hours, leave policy, and termination clauses. According to your lawyer for employment agreements, there can be more clauses added depending on your specific needs.'
          },
          {
            question: 'Is an employment contract legally binding?',
            answer: 'Yes, this is a legal and binding document because it has been well drafted and signed. This is the point that it should be from a lawyer who specializes in employment agreement.'
          },
          {
            question: 'Can an employment contract be changed after having signed the contract?',
            answer: 'Absolutely, but only with the mutual consent of both parties. This is why one should always have a lawyer look over his employment contract before signing it himself.'
          },
          {
            question: 'What\'s the difference between an employment agreement and an offer letter?',
            answer: 'The difference lies in that an offer letter is indeed very brief, basically outlining very basic terms, whereas an employment agreement is a full, comprehensive, and more importantly, legally binding contract. A lawyer for employment agreement can help you decide which of them applies to your case.'
          },
          {
            question: 'How long will an employment agreement last?',
            answer: 'It can be from 1 month to 10 years. It might specifically detail the time length; it can be, for example, a 1 year employment contract or, conversely, have no fixed term whatsoever. Your lawyer for employment agreement can help you frame the terms and conditions of the agreement based on your needs.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Employment Agreement Services?',
      visible: true,
      order: 12,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional employment agreement services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Employment Agreement Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert legal services for employment contracts and agreements. Professional drafting and review of employment agreements, bond agreements, and contracts in Delhi.'
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
