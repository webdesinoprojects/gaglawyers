require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'rera-registration',
  name: 'RERA Registration',
  sections: [
    {
      type: 'hero',
      heading: 'RERA Registration',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Real Estate Regulatory Compliance',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Understanding RERA Registration',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'As RERA lawyers, our job would be to guide you through the intricacies of this act to make sure that your projects are entirely compliant and registered under RERA. Be it a builder, an agent, or some individual dealing with real estate: RERA registration is important to your operations.\n\nThe Real Estate (Regulation and Development) Act, 2016, more popularly referred to as RERA, was enacted in order to safeguard the rights of homebuyers and to promote investments in the real estate sector. The landmark legislation has transformed the Indian real estate industry and made the industry clearer and more accountable.'
      }
    },
    {
      type: 'overview',
      heading: 'Navigating Real Estate Regulations',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'The real estate maze is full of legalities and complexities. Amidst all this, comes the role of the RERA lawyer. RERA Registration experts at GAG Lawyers, Grover and Grover Advocates and Solicitors shall ensure that your real estate project stays at par with the regulations.\n\nAs experienced RERA lawyers, we offer comprehensive services to facilitate your RERA registration process and ensure ongoing compliance throughout your project lifecycle.'
      }
    },
    {
      type: 'benefits',
      heading: 'Our RERA Registration Services',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'RERA Registration for Builders',
            description: 'We assist the developer in getting his project registered under RERA, making sure that all the requisite documents are ready and according to the regulatory compliance.'
          },
          {
            icon: 'CheckCircle',
            title: 'RERA Registration for Agents',
            description: 'RERA registration is now a must for all agents and brokers. Our RERA advocates assist you in the process and obtain your RERA registration certificate under RERA.'
          },
          {
            icon: 'CheckCircle',
            title: 'RERA Registration for Commercial Projects',
            description: 'All commercial property development projects fall under the ambit of RERA as well. We ensure that all your commercial developments are registered and compliant in the first place.'
          },
          {
            icon: 'CheckCircle',
            title: 'RERA Registration for Plotted Development',
            description: 'If you are planning to carry out plotted development, our lawyers in the RERA department can help you in every way, meeting specific requirements pertaining to such a project.'
          },
          {
            icon: 'CheckCircle',
            title: 'RERA Registration for Company',
            description: 'We assist real estate companies in getting RERA registration that forms part of corporate compliance to this act.'
          },
          {
            icon: 'CheckCircle',
            title: 'RERA Registration for Individuals',
            description: 'There are numerous individuals who might require registration under RERA. Our RERA lawyers provide specific guidance for your unique situation.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'RERA Registration Requirements',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Project Details and Plans',
            description: 'Comprehensive project information including layout plans, architectural drawings, and development specifications.'
          },
          {
            icon: 'CheckCircle',
            title: 'Land Title Documents',
            description: 'Clear title documents proving ownership or legal rights to develop the property.'
          },
          {
            icon: 'CheckCircle',
            title: 'Approvals from Local Authorities',
            description: 'All necessary approvals and clearances from municipal corporations, development authorities, and other regulatory bodies.'
          },
          {
            icon: 'CheckCircle',
            title: 'Timeline for Project Completion',
            description: 'Detailed project timeline with milestones and expected completion dates.'
          },
          {
            icon: 'CheckCircle',
            title: 'Financial Details of the Project',
            description: 'Project cost estimates, funding sources, and financial projections.'
          },
          {
            icon: 'CheckCircle',
            title: 'Particulars of Real Estate Agents',
            description: 'Details of all real estate agents involved in marketing and selling the project.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'RERA Registration Fees',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'The charges for RERA registration vary with registration type and size of project. As your RERA lawyer, we clearly break down fees so that all applicable fees are available, including:\n\n• RERA registration fees for the project or agent license\n• Legal costs of hiring RERA lawyer\n• Any additional administrative costs\n\nRERA advocate fees or RERA lawyer fees can be significant, but they are well worth the expense for full proper compliance and to avoid those stern penalties that would just bleed your wallet dry. The particular RERA registration requirements would depend upon the type of registration sought (be it a builder, agent, etc.) and the state where you propose to work.'
      }
    },
    {
      type: 'benefits',
      heading: 'The Role of a RERA Law Firm',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice',
            description: 'We offer consultation services on whether RERA complies with the implications to your business, providing strategic guidance for compliance.'
          },
          {
            icon: 'CheckCircle',
            title: 'Document Review',
            description: 'We have our team of RERA lawyers who very carefully review all project documents to ascertain whether or not they conform to the standards set by RERA.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'In case any dispute arises before RERA, we proceed to present your claims before the relevant authorities and represent your interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ongoing Compliance',
            description: 'We can help maintain RERA compliance across the entire project lifecycle, ensuring continuous adherence to regulations.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Case Studies: RERA in the Supreme Court',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Newtech Promoters and Developers Pvt. Ltd. v. State of U.P. and Others (2021)',
            description: 'The Supreme Court further clarified that RERA applies retrospectively and reinforced the order that all ongoing projects have to enroll themselves under RERA. This landmark judgment emphasized the mandatory nature of RERA registration.'
          },
          {
            icon: 'CheckCircle',
            title: 'Forum for People\'s Collective Efforts (FPCE) v. State of West Bengal & Anr. (2021)',
            description: 'Set aside the HIRA Act of West Bengal stating that RERA applies throughout the country and uniform regulation is absolutely necessary over real estate. This case reinforced the supremacy of RERA over state-specific legislation.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Advantages of Working with RERA Lawyers',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Expertise',
            description: 'Experience in complex cases of law and deep understanding of RERA regulations and their practical application.'
          },
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Support',
            description: 'Ability to offer legal support beyond even the process of registration, including ongoing compliance and dispute resolution.'
          },
          {
            icon: 'CheckCircle',
            title: 'Attorney-Client Privilege',
            description: 'Protection of confidential information and communications under attorney-client privilege.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Representation',
            description: 'Representation in case of disputes or legal challenges before RERA authorities and courts.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Expert RERA Legal Services',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Our expert RERA lawyers at GAG Lawyers - Grover and Grover Advocates and Solicitors work dedicatedly to provide quality RERA registration services. We are well aware of the intricacies of the regulations concerning RERA and how these would fit into any typical real estate scenario.\n\nBe it a developer looking for RERA registration for a new project or an agent wanting to seek compliance with RERA requirements or even a common man looking for his way in the intricate labyrinth of real estate transactions, our lawyers under RERA are here to help one step by step throughout the process.\n\nDon\'t let the compliance under RERA be the bad marking in your real estate venture. With our expertise, you could focus on what you do best - great properties and great deals sealed. We would handle the legal trickery of registration and RERA compliance for you.'
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
            question: 'How to apply RERA Registration?',
            answer: 'As an RERA lawyer, our team will take care of the application process for you. The process starts with preparation of all required documents including project details, land title documents, approvals from local authorities, project timeline, and financial details. We then file the application online through the state RERA portal as per the procedure laid down by RERA. The application includes uploading all necessary documents, paying the registration fees, and submitting the form. We ensure all information is accurate and complete to avoid delays or rejections. After submission, the RERA authority reviews the application and may request additional information before granting registration.'
          },
          {
            question: 'What does RERA registration cost?',
            answer: 'RERA registration costs vary depending on several factors: the type of registration (builder/developer or agent), the size and value of the project, the state where the project is located (as fees vary by state), and legal fees for hiring a RERA lawyer. For projects, fees are typically calculated based on the total project area or number of units. For agents, there is usually a fixed registration fee. Additionally, you need to consider legal costs for document preparation, review, and filing. At GAG Lawyers, we provide transparent fee structures and clearly break down all applicable costs upfront. While the fees may seem significant, they are essential for ensuring full compliance and avoiding penalties that could be much more costly.'
          },
          {
            question: 'How can I check my RERA registration status?',
            answer: 'You can check your RERA registration status by visiting the official RERA website of your state. Each state has its own RERA portal where you can: enter your application number or project registration number, view the current status of your application, check if any additional documents are required, download your RERA registration certificate once approved, and view project details and updates. Our RERA lawyers can also help you track your application status and coordinate with RERA authorities if there are any issues or delays. We ensure you stay informed throughout the registration process.'
          },
          {
            question: 'Would all real estate projects be made to do RERA registration?',
            answer: 'Not all real estate projects require RERA registration, but most do. RERA registration is mandatory for: residential and commercial projects with more than 8 units or plot area exceeding 500 square meters, ongoing projects that have not received completion certificate, projects being developed in phases (each phase requires separate registration), and plotted developments meeting the size criteria. Exemptions include: projects that have already received completion certificate before RERA came into force, projects for which occupancy certificate has been issued, and renovation or repair projects that do not involve marketing or new allotment. Our RERA lawyers can assess whether your specific project requires registration.'
          },
          {
            question: 'How long does RERA registration take?',
            answer: 'The RERA registration timeline varies by state and complexity of the project, but typically takes 30-60 days from the date of complete application submission. The process includes: document preparation (1-2 weeks), application filing and initial review by RERA authority (1-2 weeks), clarifications or additional document requests if any (1-2 weeks), final review and approval (1-2 weeks), and issuance of registration certificate. Delays can occur if documents are incomplete, there are discrepancies in information, or if the RERA authority is backlogged. Working with experienced RERA lawyers like us can significantly expedite the process as we ensure all documents are complete and accurate from the start, reducing back-and-forth with authorities.'
          },
          {
            question: 'Is it possible to do RERA registration without a lawyer?',
            answer: 'While it is technically possible to do RERA registration without a lawyer, it is strongly not recommended. RERA registration involves: complex legal documentation and compliance requirements, understanding of state-specific RERA rules and regulations, proper interpretation of land title documents, coordination with multiple authorities, accurate calculation of project timelines and financial details, and potential legal implications of information provided. Mistakes in the application can lead to: rejection of application, delays in registration, penalties and fines, legal disputes with buyers, and reputational damage. The cost of hiring a RERA lawyer is minimal compared to the risks and potential losses from improper registration. Our RERA lawyers ensure your application is complete, accurate, and compliant, saving you time and protecting you from legal issues.'
          },
          {
            question: 'What is the validity period of RERA registration?',
            answer: 'RERA registration is valid until the completion of the project as per the timeline declared in the registration application. If the project is not completed within the declared timeline, the developer must apply for extension of registration before the expiry date. Extension applications must include: reasons for delay, revised project completion timeline, updated financial details, and any other information required by RERA authority. Failure to obtain extension can result in penalties and legal consequences. Our RERA lawyers help you manage registration validity, apply for extensions when needed, and ensure continuous compliance throughout the project lifecycle.'
          },
          {
            question: 'What are the penalties for not registering under RERA?',
            answer: 'Penalties for not registering under RERA are severe and include: imprisonment up to 3 years and/or fine up to 10% of the estimated project cost for developers who fail to register, fine up to Rs. 10,000 per day (up to 5% of estimated project cost) for continuing violations, inability to advertise, market, book, sell or offer for sale the project, legal action by buyers and authorities, project may be deemed illegal, and reputational damage affecting future business. Additionally, unregistered projects cannot access institutional financing, and buyers can seek refund with interest. The penalties far exceed the cost of proper registration, making compliance essential. Our RERA lawyers ensure you avoid these penalties through timely and proper registration.'
          },
          {
            question: 'Can RERA registration be transferred or assigned?',
            answer: 'RERA registration is generally not transferable without proper legal process and RERA authority approval. If there is a change in ownership or developer, you must: inform the RERA authority immediately, submit an application for transfer of registration, provide details of the new developer/owner, submit all required documents proving legal transfer, obtain approval from RERA authority, and update the registration certificate. The new developer must meet all RERA requirements and take on all obligations under the original registration. Unauthorized transfer can result in cancellation of registration and penalties. Our RERA lawyers can guide you through the transfer process and ensure compliance with all legal requirements.'
          },
          {
            question: 'What is the role of RERA in protecting homebuyers?',
            answer: 'RERA plays a crucial role in protecting homebuyers by: mandating registration of all eligible projects ensuring transparency, requiring developers to deposit 70% of funds in escrow account for project completion, making carpet area the basis for sale (not super built-up area), requiring developers to disclose all project details on RERA website, providing fast-track dispute resolution mechanism through RERA authority, imposing strict penalties on developers for delays and violations, ensuring timely completion of projects, protecting buyers from unfair practices, and providing legal recourse for grievances. RERA has significantly improved accountability in the real estate sector and empowered homebuyers with legal rights and remedies.'
          },
          {
            question: 'Do real estate agents need separate RERA registration?',
            answer: 'Yes, real estate agents must obtain separate RERA registration to operate legally. Agent registration requirements include: valid registration with the state RERA authority, payment of prescribed registration fees (typically Rs. 10,000-50,000 depending on state), submission of required documents (identity proof, address proof, educational qualifications), and renewal every 5 years. Agents can only deal with RERA-registered projects. Unregistered agents face penalties including: fine up to Rs. 10,000 per day of violation, inability to legally operate or receive commissions, and legal action by authorities. Our RERA lawyers assist agents in obtaining and maintaining their RERA registration, ensuring compliance with all requirements.'
          },
          {
            question: 'What information must be disclosed on the RERA website?',
            answer: 'Developers must disclose comprehensive project information on the RERA website including: project layout plans and specifications, land title status and approvals, number and types of units, carpet area of each unit, project completion timeline, details of contractors and architects, status of construction with quarterly updates, details of encumbrances on the land, number of units booked and sold, amount received from buyers, details of escrow account, any litigation related to the project, and contact information of developer and RERA registration number. This transparency allows buyers to make informed decisions and verify project details before investing. Failure to update information regularly can result in penalties.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert RERA Registration Services?',
      visible: true,
      order: 11,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional RERA registration and compliance services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'RERA Registration Lawyer in Delhi - Real Estate Compliance | GAG Lawyers',
    metaDescription: 'Expert RERA registration services in Delhi. Professional legal assistance for builders, agents, and real estate projects. Ensure RERA compliance.'
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
