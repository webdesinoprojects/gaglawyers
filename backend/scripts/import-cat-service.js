require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'cat-matters-lawyer',
  name: 'CAT Matters Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Central Administrative Tribunal (CAT) Matters',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal representation for Central Administrative Tribunal cases in Delhi. Specialized guidance for government employees on recruitment, promotion, and disciplinary matters.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'CAT Matters Lawyer in Delhi',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'The Central Administrative Tribunal (CAT) is an independent judicial body in India that was established under the Administrative Tribunals Act, 1985. It is responsible for adjudicating disputes regarding the recruitment, promotion, and disciplinary actions of various government personnel and officials. The CAT resolves disputes among the government and its personnel and between the government and the public.\n\nThe CAT is empowered to hear appeals from lower administrative tribunals and to issue orders, writs, and instructions to enforce its decisions. The CAT has jurisdiction over all central government employees, officers, and personnel. This includes civil servants, military employees, and those employed by public sector undertakings.\n\nThe CAT has the power to determine the legality of administrative actions taken by the government, including appointments, promotions, transfers, disciplinary actions, and other matters. The CAT\'s primary function is to provide a platform for the resolution of disputes between the government and its personnel.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Disputes Handled by CAT',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Recruitment & Service Terms',
            description: 'Disputes pertaining to recruitment and terms of service for employees in the Central Government, Public Sector Undertakings, and Union Territories.'
          },
          {
            icon: 'CheckCircle',
            title: 'Disciplinary Actions & Appeals',
            description: 'Appeals against disciplinary actions, conflicts regarding pay, allowances, pensions, and other benefits, as well as disputes arising from termination of employment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Promotions & Transfers',
            description: 'Disputes surrounding employee promotions, transfers, re-employment within the Central Government system, Public Sector Undertakings, and Union Territories.'
          },
          {
            icon: 'CheckCircle',
            title: 'Awards & Seniority Issues',
            description: 'Conflicts involving awards, honors, medals allocation among personnel along with seniority issues and compassionate appointments.'
          },
          {
            icon: 'CheckCircle',
            title: 'Work Allocation & Leave',
            description: 'Disputes concerning work allocation, assignment of duties, leave provisions, penalties imposition, and determining terms of service for government servants.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Acts and Provisions in CAT Matters',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Central Administrative Tribunal Act, 1985',
            description: 'Established to resolve disputes and complaints related to recruitment and conditions of service for individuals appointed to public services associated with Central Government affairs.'
          },
          {
            icon: 'CheckCircle',
            title: 'Jurisdiction Coverage',
            description: 'Applies to all Central government employees, including prestigious positions such as Indian Administrative Service, Indian Police Service, and Indian Foreign Service.'
          },
          {
            icon: 'CheckCircle',
            title: 'Regional Benches',
            description: 'Regional benches can be set up in any state or union territory with equal powers as the central administrative tribunal for swift resolution of cases.'
          },
          {
            icon: 'CheckCircle',
            title: 'Case Disposal Timeline',
            description: 'Cases must be resolved within three months from filing. Clear reasons must be provided for each decision with transparent understanding of grounds.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under CAT',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Appeal',
            description: 'Government employees have the right to appeal adverse actions taken against them and approach the CAT seeking justice and resolution for their grievances.'
          },
          {
            icon: 'CheckCircle',
            title: 'Obligation to Comply',
            description: 'Government employees must comply with CAT rulings and furnish all essential documents and information required for proper adjudication of cases.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Present Arguments',
            description: 'Employees have the right to present their arguments before any decision is made against them, ensuring fair hearing and due process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Access to Orders',
            description: 'Government employees are guaranteed access to obtain a copy of any orders issued in relation to their case for transparency.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Lawyers in CAT Matters',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Professional Representation',
            description: 'Lawyers professionally and competently represent clients, offering legal advice and assisting in navigating the intricate processes of the CAT.'
          },
          {
            icon: 'CheckCircle',
            title: 'Case Evaluation & Strategy',
            description: 'Guide clients on the strengths of their case, evaluate evidence required, and review relevant documentation to offer advice on effective case presentation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights Protection',
            description: 'Assess procedural fairness, safeguard client rights by cross-examining witnesses, and ensure all relevant evidence is presented during hearings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Appeals Process',
            description: 'Provide legal representation during appeals by reviewing tribunal decisions, evaluating grounds for appeal, and presenting persuasive arguments in court.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in CAT Matters',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Legal Guidance',
            description: 'Our skilled lawyers assist clients in navigating the intricate legal landscape associated with CAT matters, providing expert guidance and representation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'Through skilled negotiation and litigation strategies, we successfully assist clients in resolving disputes arising from CAT proceedings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compliance & Enforcement',
            description: 'We guide government employees on implementing and enforcing CAT decisions appropriately while ensuring compliance with all provisions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Tailored Legal Solutions',
            description: 'Our lawyers possess in-depth understanding of CAT legislation, allowing us to provide tailored advice and representation specific to each client\'s needs.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            question: 'What is the Central Administrative Tribunal (CAT)?',
            answer: 'The Central Administrative Tribunal (CAT) is an independent judicial body established under the Administrative Tribunals Act, 1985, to adjudicate disputes regarding recruitment, promotion, and disciplinary actions of government personnel and officials.'
          },
          {
            question: 'What is the role of the Central Administrative Tribunal (CAT)?',
            answer: 'The CAT provides a platform for resolution of disputes between the government and its personnel. It hears appeals from lower administrative tribunals and issues orders, writs, and instructions to enforce its decisions.'
          },
          {
            question: 'Who can approach the Central Administrative Tribunal (CAT)?',
            answer: 'All central government employees, officers, and personnel can approach the CAT. This includes civil servants, military employees, and those employed by public sector undertakings.'
          },
          {
            question: 'What types of cases are heard by the Central Administrative Tribunal (CAT)?',
            answer: 'The CAT hears cases related to recruitment, promotion, service conditions, disciplinary matters, pay and allowances, pensions, termination of employment, transfers, and other service-related disputes of government employees.'
          },
          {
            question: 'What is the jurisdiction of the Central Administrative Tribunal (CAT)?',
            answer: 'The CAT has jurisdiction over disputes and grievances of government employees related to recruitment, promotion, service conditions, and disciplinary matters. It covers all central government employees and public sector undertakings.'
          },
          {
            question: 'Can a lawyer represent me in a case before the Central Administrative Tribunal (CAT)?',
            answer: 'Yes, a lawyer can represent you in a case before the Central Administrative Tribunal (CAT). Legal representation is advisable given the complexity of CAT proceedings.'
          },
          {
            question: 'What is the role of a Central Administrative Tribunal (CAT) lawyer?',
            answer: 'A CAT lawyer provides professional representation, offers legal advice, assists in navigating CAT processes, prepares documents, presents arguments, cross-examines witnesses, and handles appeals on behalf of clients.'
          },
          {
            question: 'Can I appeal a decision of the Central Administrative Tribunal (CAT)?',
            answer: 'Yes, you can appeal a decision of the CAT to the High Court or Supreme Court. The appeal must be filed within the prescribed time limit with proper grounds for appeal.'
          },
          {
            question: 'What is the time limit for filing an appeal against a decision of the Central Administrative Tribunal (CAT)?',
            answer: 'The time limit for filing an appeal against a CAT decision varies but is typically within a specified period from the date of the order. It is advisable to consult a lawyer for specific timelines.'
          },
          {
            question: 'What is the difference between the Central Administrative Tribunal (CAT) and the High Court?',
            answer: 'The CAT is a specialized tribunal dealing exclusively with service matters of government employees, while the High Court is a general court with broader jurisdiction covering all types of civil and criminal matters.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 8,
      background: 'dark',
      content: {
        body: 'Contact our expert legal team today for professional assistance with Central Administrative Tribunal matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'CAT Matters Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'CAT Matters Lawyer in Delhi - GAG Lawyers We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations'
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
