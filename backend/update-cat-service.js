require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const updateCATService = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const catService = await Service.findOne({ slug: 'cat-matters-lawyer' });
    
    if (!catService) {
      console.log('CAT service not found');
      return;
    }

    // Update CAT service with comprehensive content
    catService.heroImage = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80';
    
    catService.shortDescription = 'CAT Matters Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
    
    catService.overview = `The Central Administrative Tribunal (CAT) is an independent judicial framework in India that was established under the Administrative Tribunals Act, 1985. It is responsible for adjudicating disputes regarding the recruitment, promotion, and disciplinary actions of various government personnel and officials. The CAT resolves disputes among the government and its personnel and between the government and the public.`;

    catService.contentBlocks = [
      {
        heading: 'CAT Matters',
        paragraphs: [
          'The Central Administrative Tribunal (CAT) is an independent judicial framework in India that was established under the Administrative Tribunals Act, 1985, and individuals often search for a CAT Lawyer near me or Best CAT Lawyer near me for such matters.',
          'It is responsible for adjudicating disputes regarding the recruitment, promotion, and disciplinary actions of various government personnel and officials. The CAT resolves disputes among the government and its personnel and between the government and the public.',
          'The CAT is empowered to concentrate appeals from lower administrative tribunals and to issue orders, writs, and instructions on how to enforce its decisions. The CAT has jurisdiction over all central government employees, officers, and personnel.'
        ]
      },
      {
        heading: 'Types of Disputes Handled by CAT',
        paragraphs: [
          'The Central Administrative Tribunal (CAT) is a specialized body established to resolve disputes and legal cases concerning the recruitment and employment conditions of individuals appointed to public services and positions in India.',
          'CAT handles a wide range of disputes, including those pertaining to recruitment and terms of service for employees in the Central Government, Public Sector Undertakings, and Union Territories. It also addresses appeals against disciplinary actions, conflicts regarding pay, allowances, pensions, and other benefits.',
          'Furthermore, CAT adjudicates disputes surrounding employee promotions, transfers, re-employment within the Central Government system, and resolves conflicts involving awards, honors, medals allocation among personnel along with seniority issues.'
        ]
      },
      {
        heading: 'Acts and Provisions Attracted in Service CAT Matters',
        paragraphs: [
          'The Central Administrative Tribunal (Service CAT) is an independent judicial body established by the Central Government to address civil servants\' grievances promptly and effectively. It has the authority to hear appeals from civil servants regarding decisions made by the Central Government.',
          'The establishment of the Central Administrative Tribunal Act in 1985 aims to resolve disputes and complaints related to the recruitment and conditions of service for individuals appointed to public services and posts associated with the affairs of the Central Government.',
          'The provisions of this Act apply to all Central government employees, including those in prestigious positions such as the Indian Administrative Service, Indian Police Service, and Indian Foreign Service who are appointed under the Constitution.'
        ]
      },
      {
        heading: 'Rights and Obligations Under CAT Matters to Government Employees',
        paragraphs: [
          'The Central Administrative Tribunal (CAT) serves as a quasi-judicial body in India, providing a platform for government servants to challenge administrative actions levied against them. Its establishment aimed to ensure that government employees have an avenue to contest disciplinary actions, promotions, pay adjustments, and other matters.',
          'Moreover, the CAT possesses the authority to handle cases involving alleged violations of fundamental rights concerning government employees. It grants certain rights and responsibilities to these individuals.',
          'The CAT ensures that government employees have the right to present their arguments before any decision is made against them. It guarantees access for these individuals to obtain a copy of any orders issued in relation to their case.'
        ]
      },
      {
        heading: 'Role of Lawyers in CAT Matters',
        paragraphs: [
          'The role of a CAT Lawyer within the Central Administrative Tribunal is to professionally and competently represent their clients. They offer legal advice and assist in navigating the intricate processes of the CAT.',
          'Moreover, they ensure the protection of their clients\' rights and provide assistance with document preparation and representation during hearings. They thoroughly review relevant documentation to offer advice on effective case presentation.',
          'These lawyers inform clients about applicable laws and regulations while advising them on presenting compelling arguments. Their role includes assessing procedural fairness and safeguarding client rights by cross-examining witnesses.'
        ]
      },
      {
        heading: 'How Grover & Grover, Advocates Help Related To CAT Matters',
        paragraphs: [
          'Grover & Grover Advocates, a law firm based in India, specializes in handling matters pertaining to the Central Administrative Tribunal. With a team of skilled and knowledgeable lawyers, they assist clients in navigating the intricate legal landscape.',
          'Their services encompass a wide range of areas related to CAT matters. This includes providing guidance and representation for appeals, investigations, compliance, and litigation. They also offer advice and representation for enforcement matters.',
          'Through skilled negotiation and litigation strategies, Grover & Grover has successfully assisted clients in resolving disputes arising from CAT matters. Their experienced lawyers possess extensive knowledge that enables them to effectively represent clients.'
        ]
      }
    ];

    catService.documentChecklist = [
      'Application/Petition for CAT',
      'Service records and employment documents',
      'Orders of disciplinary action or termination',
      'Pay slips and allowance statements',
      'Promotion and transfer orders',
      'Identity proof and service certificates',
      'Affidavits and supporting evidence',
      'Correspondence with department',
      'Pension documents (if applicable)'
    ];

    catService.popularCases = [
      'B.K.K. Pillai vs. Union of India - Supreme Court affirmed CAT authority',
      'P.B. Samant vs. Union of India - Delhi High Court on CAT jurisdiction',
      'B.K.K. Pillai vs. State of Kerala - CAT power over state government orders'
    ];

    catService.faqs = [
      {
        question: 'What is the Central Administrative Tribunal (CAT)?',
        answer: 'The Central Administrative Tribunal (CAT) is a quasi-judicial body in India that was established under the Administrative Tribunals Act, 1985. It provides a platform for government employees to seek redressal of their grievances related to service matters.'
      },
      {
        question: 'Who can approach the Central Administrative Tribunal (CAT)?',
        answer: 'Any serving or retired central government employee, including officers and staff from various departments, can approach the CAT for redressal of their grievances related to service matters such as recruitment, promotion, and disciplinary actions.'
      },
      {
        question: 'What types of cases are heard by the Central Administrative Tribunal (CAT)?',
        answer: 'The CAT hears cases related to service matters of government employees, including promotions, postings, transfers, pay, pensions, and retirement benefits. It also deals with cases related to disciplinary matters and violation of fundamental rights.'
      },
      {
        question: 'What is the jurisdiction of the Central Administrative Tribunal (CAT)?',
        answer: 'The jurisdiction of the CAT extends to all service matters of central government employees, including those in the Army, Navy, Air Force, Coast Guard, and various civil services. It has jurisdiction over matters related to recruitment, promotion, and service conditions.'
      },
      {
        question: 'Can I appeal a decision of the Central Administrative Tribunal (CAT)?',
        answer: 'Yes, a person can appeal a decision of the CAT to the higher courts, specifically the High Court or Supreme Court, depending on the nature of the case and jurisdiction.'
      }
    ];

    catService.seoKeywords = [
      'CAT Lawyer near me',
      'CAT Lawyer fees in Delhi',
      'Best CAT Lawyer near me',
      'Top CAT Lawyer in India',
      'CAT Lawyer Advocate in Delhi',
      'Best Advocates for CAT Matters in Delhi',
      'Best Lawyers for CAT Matters in Delhi',
      'Lawyer for CAT Matters in Delhi',
      'Lawyer for Central Administrative Tribunal Matters in Delhi',
      'CAT Lawyer in High Court',
      'Top CAT Lawyer in Supreme Court'
    ];

    await catService.save();
    console.log('CAT service updated successfully!');
    
  } catch (error) {
    console.error('Error updating CAT service:', error);
  } finally {
    await mongoose.connection.close();
  }
};

updateCATService();
