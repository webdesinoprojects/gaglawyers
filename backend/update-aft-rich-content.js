require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

/**
 * AFT Service - Rich Content Update
 * Adds comprehensive, admin-controllable content blocks
 */

const contentBlocks = [
  // Section 1: Introduction
  {
    type: 'introduction',
    heading: 'Armed Forces Tribunal Matters (AFT Matters)',
    subheading: 'Specialized Legal Representation for Military Personnel',
    paragraphs: [
      'The Armed Forces Tribunal (AFT) is a specialized judicial body established to adjudicate disputes and complaints related to the armed forces. It was set up in 2007 under the Armed Forces Tribunal Act, 2007, and consists of a chairman, vice chairman, and other members who are appointed by the President of India.',
      'The AFT has jurisdiction over matters related to service laws applicable to members of the armed forces, including those relating to recruitment, promotion, pay and allowances, termination, or discharge from service. It also hears appeals against decisions taken in court martial proceedings.',
      'The AFT is empowered to pass orders for reinstatement or the grant of compensation in cases of wrongful termination or discharge from service.'
    ],
    icon: 'Shield',
    backgroundColor: '#f8fafc'
  },

  // Section 2: Legal Framework
  {
    type: 'legal-framework',
    heading: 'Armed Forces Tribunal Act, 2007 - Legal Framework',
    subheading: 'Understanding the Constitutional Provisions',
    paragraphs: [
      'The Armed Forces Tribunal Act, 2007 provides for the formation of tribunals as per Section 3. The tribunals set up under the Act are comprised of a chairman and at least one other member, who shall be appointed by the President from among persons whose independence is not subject to any limitation.',
      'Section 4 provides that all orders passed or intended to be passed by an Armed Forces Tribunal shall require the prior sanction of the Armed Forces Appeal Board.'
    ],
    subsections: [
      {
        title: 'Armed Forces Appeal Board Composition',
        points: [
          'A Chairman appointed by the President',
          'Not less than 10 other members whose independence is not subject to any limitation',
          '2 members who hold office for 3 years from appointment date',
          '5 or more members with 3-year tenure',
          '3 members with 3-year tenure with specific qualification criteria'
        ]
      }
    ],
    icon: 'Scale',
    backgroundColor: '#ffffff'
  },

  // Section 3: Functions
  {
    type: 'functions',
    heading: 'Functions of Armed Forces Tribunal',
    subheading: 'Comprehensive Jurisdiction Over Military Matters',
    paragraphs: [
      'Armed tribunals are responsible for the administration of justice in the armed forces, ensuring that members of the military receive fair and impartial trials. They play an important role in protecting the rights of service members and upholding international law.',
      'Their functions include hearing cases related to criminal offences, high-ranking officers, war crimes, and other matters related to military operations. They also have the authority to issue orders pertaining to personnel management, discipline, and other issues within their jurisdiction.'
    ],
    keyFunctions: [
      {
        title: 'Service Matter Adjudication',
        description: 'Hearing disputes related to recruitment, promotion, transfers, and postings'
      },
      {
        title: 'Court Martial Appeals',
        description: 'Reviewing decisions from court martial proceedings and disciplinary actions'
      },
      {
        title: 'Compensation & Reinstatement',
        description: 'Ordering compensation or reinstatement in cases of wrongful termination'
      },
      {
        title: 'Pension & Benefits',
        description: 'Resolving disputes related to pay, allowances, pension, and retirement benefits'
      },
      {
        title: 'Personnel Management',
        description: 'Issuing orders on personnel management, discipline, and administrative matters'
      }
    ],
    icon: 'Gavel',
    backgroundColor: '#f8fafc'
  },

  // Section 4: Rights & Remedies
  {
    type: 'rights-remedies',
    heading: 'Rights & Remedies Available Under AFT Act',
    subheading: 'Legal Protections for Armed Forces Personnel',
    paragraphs: [
      'The AFT Act provides a comprehensive set of rights and remedies available to individuals who have suffered due to unfair service practices. The Act sets out the rights and remedies available to those affected, including the right to seek damages, compensation, and injunctive relief.'
    ],
    legalProvisions: [
      {
        section: 'Section 22A(1)',
        title: 'Right to Bring Proceedings',
        description: 'An individual may bring proceedings in court if they have suffered a loss as a result of unfair practices that amount to a contravention of Section 21 of the AFT Act.'
      },
      {
        section: 'Section 21',
        title: 'Statutory Cause of Action',
        description: 'Creates a statutory cause of action for an individual against authorities who have engaged in unfair practices.'
      }
    ],
    availableRemedies: [
      'Reinstatement to service with back wages',
      'Monetary compensation for wrongful termination',
      'Correction of service records',
      'Grant of promotion with retrospective effect',
      'Payment of arrears of pay and allowances',
      'Pension and retirement benefit corrections',
      'Injunctive relief against unfair orders'
    ],
    icon: 'FileText',
    backgroundColor: '#ffffff'
  },

  // Section 5: Appeal Process
  {
    type: 'process',
    heading: 'File Appeal With the Armed Forces Tribunal',
    subheading: 'Step-by-Step Guide to Filing Your AFT Appeal',
    paragraphs: [
      'Filing an appeal with the Armed Forces Tribunal requires a thorough understanding of the legal aspects of the case and the applicable laws. With proper knowledge and guidance, you can ensure that your case is heard fairly and efficiently by the tribunal.'
    ],
    steps: [
      {
        step: 1,
        title: 'Prepare Petition for Review',
        description: 'Prepare a comprehensive petition with all supporting documentation including service records, affidavits, expert reports, and correspondence.',
        requirements: [
          'Draft detailed petition stating grounds of appeal',
          'Gather all supporting documents and evidence',
          'Obtain certified copies of impugned orders',
          'Prepare affidavits and witness statements'
        ]
      },
      {
        step: 2,
        title: 'File the Petition',
        description: 'Submit the petition to the appropriate AFT bench along with required court fees and copies.',
        requirements: [
          'File petition within limitation period (3 months)',
          'Pay prescribed court fees',
          'Submit required number of copies',
          'Obtain proper receipts and acknowledgments'
        ]
      },
      {
        step: 3,
        title: 'Court Representation',
        description: 'Expert representation during hearings, presenting arguments and advocating for your rights.',
        requirements: [
          'Attend all scheduled hearings',
          'Present evidence and arguments',
          'Cross-examine witnesses if required',
          'Follow tribunal procedures'
        ]
      },
      {
        step: 4,
        title: 'Follow-up & Compliance',
        description: 'Regular follow-up on case progress and compliance with tribunal orders.',
        requirements: [
          'Monitor case status regularly',
          'Comply with tribunal directions',
          'Pursue execution of favorable judgments',
          'File appeals if necessary'
        ]
      }
    ],
    icon: 'ClipboardList',
    backgroundColor: '#f8fafc'
  },

  // Section 6: Role of Lawyer
  {
    type: 'lawyer-role',
    heading: 'Role of Lawyer in Armed Forces Tribunal',
    subheading: 'Why Expert Legal Representation Matters',
    paragraphs: [
      'Lawyers have an important role to play in the Armed Forces Tribunal. They can help in filing cases, representing clients in court, and providing advice on legal matters related to military service.',
      'They provide assistance in understanding the rules and regulations of the tribunal and ensuring that their clients receive fair treatment. They can also help in drafting petitions for compensation or other relief related to military service.'
    ],
    lawyerServices: [
      {
        service: 'Case Assessment & Strategy',
        description: 'Thorough evaluation of your case merits and developing winning legal strategy'
      },
      {
        service: 'Documentation & Filing',
        description: 'Preparation and filing of all necessary petitions, applications, and supporting documents'
      },
      {
        service: 'Court Representation',
        description: 'Professional representation before AFT benches and appellate forums'
      },
      {
        service: 'Legal Advice & Guidance',
        description: 'Comprehensive guidance on military service laws, regulations, and tribunal procedures'
      }
    ],
    icon: 'Users',
    backgroundColor: '#ffffff'
  },

  // Section 7: Documents Required
  {
    type: 'documents',
    heading: 'Documents Required For Armed Forces Tribunal',
    subheading: 'Essential Documentation Checklist',
    paragraphs: [
      'The Armed Forces Tribunal requires certain documents from its applicants. These documents are necessary for the tribunal to properly evaluate and decide on cases.'
    ],
    documentCategories: [
      {
        category: 'Personal & Service Documents',
        documents: [
          'Identity proof (Aadhaar, PAN, Passport)',
          'Service records and certificates',
          'Appointment and posting orders',
          'Service book and pay slips'
        ]
      },
      {
        category: 'Case-Specific Documents',
        documents: [
          'Copy of impugned order or decision',
          'Court martial proceedings (if applicable)',
          'Disciplinary action records',
          'Show cause notices and replies'
        ]
      },
      {
        category: 'Financial Documents',
        documents: [
          'Pay and allowances statements',
          'Pension payment orders (PPO)',
          'Bank statements showing payments',
          'Arrears calculation sheets'
        ]
      }
    ],
    icon: 'FolderOpen',
    backgroundColor: '#f8fafc'
  },

  // Section 8: Firm Expertise
  {
    type: 'firm-expertise',
    heading: 'How Grover & Grover, Advocates Help in Armed Forces Tribunal Cases',
    subheading: 'Your Trusted Legal Partners for AFT Matters',
    paragraphs: [
      'Grover & Grover, Advocates and Solicitors, provides legal advice and representation to the Armed Forces Tribunal. They help by providing guidance on the legal procedures and regulations that govern the tribunal.',
      'They assist in filing petitions, preparing documents, representing clients in court proceedings, and providing advice on compensation claims for injuries sustained while serving in the armed forces.',
      'The expertise of Grover & Grover makes them a valuable asset for those seeking justice through the Armed Forces Tribunal.'
    ],
    expertise: [
      {
        area: 'Service Matter Disputes',
        description: 'Expert handling of recruitment, promotion, transfer, and posting disputes',
        experience: '15+ years of experience in military service law'
      },
      {
        area: 'Court Martial Appeals',
        description: 'Specialized representation in court martial proceedings and appeals',
        experience: 'Successfully handled 100+ court martial cases'
      },
      {
        area: 'Pension & Benefits',
        description: 'Comprehensive assistance in pension disputes and benefit claims',
        experience: 'Recovered crores in pension arrears for clients'
      }
    ],
    whyChooseUs: [
      {
        title: 'Specialized Expertise',
        description: 'Deep understanding of Armed Forces Tribunal Act, 2007 and military service laws',
        icon: 'Award'
      },
      {
        title: 'Proven Track Record',
        description: 'Successfully represented hundreds of armed forces personnel across all ranks',
        icon: 'TrendingUp'
      },
      {
        title: 'Personalized Attention',
        description: 'Dedicated legal team providing individual attention to each case',
        icon: 'Heart'
      }
    ],
    icon: 'Briefcase',
    backgroundColor: '#ffffff'
  },

  // Section 9: Landmark Cases
  {
    type: 'landmark-cases',
    heading: 'Popular Cases of Supreme Court and High Court Related to Armed Forces Tribunal',
    subheading: 'Landmark Judgments Shaping Military Service Law',
    paragraphs: [
      'The Supreme Court and High Courts of India have been instrumental in deciding cases related to the Armed Forces Tribunal (AFT). These courts have provided justice to members of the armed forces and their families, giving them access to fair and equitable treatment.'
    ],
    landmarkCases: [
      {
        caseName: 'Union of India vs. Major General Shri Kant Sharma',
        year: '2015',
        court: 'Supreme Court of India',
        significance: 'Landmark case establishing principles for service conditions and promotion disputes',
        keyPoints: [
          'Clarified promotion criteria for armed forces officers',
          'Established precedent for seniority disputes',
          'Defined scope of AFT jurisdiction in service matters'
        ]
      },
      {
        caseName: 'Lt Col Nitisha vs. Union of India',
        year: '2021',
        court: 'Supreme Court of India',
        significance: 'Historic judgment granting Permanent Commission to women officers',
        keyPoints: [
          'Granted Permanent Commission to women officers in Army',
          'Struck down gender discrimination in armed forces',
          'Ensured equal opportunities for women in military service'
        ]
      },
      {
        caseName: 'Ex-Naik Ram Kishan vs. Union of India',
        year: '2010',
        court: 'Supreme Court of India',
        significance: 'Established rights for disability pension and compensation',
        keyPoints: [
          'Clarified disability pension eligibility criteria',
          'Established liberal interpretation for service-related injuries',
          'Ensured fair compensation for disabled personnel'
        ]
      }
    ],
    icon: 'BookOpen',
    backgroundColor: '#f8fafc'
  }
];

const updateAFTService = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const aftService = await Service.findOne({ slug: 'armed-force-tribunal-lawyer' });
    
    if (!aftService) {
      console.error('✗ AFT Service not found');
      process.exit(1);
    }

    console.log('📝 Updating AFT Service with rich content...\n');

    // Update hero and meta
    aftService.heroTitle = 'Armed Forces Tribunal Lawyer';
    aftService.heroDescription = 'Expert legal representation for Armed Forces personnel in service matters, court martial appeals, and tribunal proceedings';
    aftService.seoTitle = 'Armed Forces Tribunal Lawyer in Delhi | AFT Legal Services | Grover & Grover';
    aftService.metaDescription = 'Leading Armed Forces Tribunal lawyers in Delhi. Expert representation for service matters, court martial appeals, pension disputes, and AFT cases.';
    
    // Add content blocks
    aftService.contentBlocks = contentBlocks;

    // Add document checklist
    aftService.documentChecklist = [
      'Identity proof (Aadhaar Card, PAN Card, Passport)',
      'Service records and certificates',
      'Copy of impugned order or decision',
      'Court martial proceedings (if applicable)',
      'Pay and allowances statements',
      'Pension payment orders (PPO)',
      'Medical certificates (if applicable)',
      'Affidavits and supporting evidence'
    ];

    // Add popular cases
    aftService.popularCases = [
      {
        title: 'Union of India vs. Major General Shri Kant Sharma (2015)',
        description: 'Landmark Supreme Court case on service conditions and promotion disputes',
        court: 'Supreme Court of India'
      },
      {
        title: 'Lt Col Nitisha vs. Union of India (2021)',
        description: 'Historic judgment granting Permanent Commission to women officers',
        court: 'Supreme Court of India'
      },
      {
        title: 'Ex-Naik Ram Kishan vs. Union of India (2010)',
        description: 'Established disability pension rights and liberal interpretation',
        court: 'Supreme Court of India'
      }
    ];

    // Add process steps
    aftService.process = [
      {
        step: 1,
        title: 'Initial Consultation',
        description: 'Free consultation to understand your case and assess legal merits'
      },
      {
        step: 2,
        title: 'Case Analysis & Strategy',
        description: 'Comprehensive analysis and development of strategic legal approach'
      },
      {
        step: 3,
        title: 'Documentation Preparation',
        description: 'Meticulous preparation of petition, affidavits, and supporting documents'
      },
      {
        step: 4,
        title: 'Filing Before AFT',
        description: 'Professional filing before appropriate AFT bench with all requirements'
      },
      {
        step: 5,
        title: 'Court Representation',
        description: 'Expert representation during hearings and advocacy for your rights'
      },
      {
        step: 6,
        title: 'Follow-up & Compliance',
        description: 'Regular follow-up and compliance with tribunal orders'
      }
    ];

    // Add key points
    aftService.keyPoints = [
      'Specialized tribunal for armed forces service matters',
      'Jurisdiction over recruitment, promotion, pay, pension disputes',
      'Hears appeals against court martial proceedings',
      'Empowered to order reinstatement and compensation',
      '3-month limitation period for filing appeals',
      'Expert legal representation crucial for success',
      'Appeals lie to High Courts and Supreme Court',
      'Covers Army, Navy, Air Force, Coast Guard personnel'
    ];

    // Add types of cases
    aftService.typesOfCases = [
      'Service matter disputes (recruitment, promotion, transfer)',
      'Court martial appeals and disciplinary actions',
      'Wrongful termination and discharge cases',
      'Pension and retirement benefit disputes',
      'Pay and allowances arrears claims',
      'Disability pension matters',
      'Medical categorization disputes',
      'Seniority and rank grievances'
    ];

    // Add FAQs
    aftService.faqs = [
      {
        question: 'What is the Armed Forces Tribunal (AFT)?',
        answer: 'The Armed Forces Tribunal (AFT) is a quasi-judicial body established under the Armed Forces Tribunal Act, 2007. It provides a platform for armed forces personnel to seek redressal of grievances related to service matters.'
      },
      {
        question: 'Who can approach the AFT?',
        answer: 'Any serving or retired armed forces personnel, including officers, junior commissioned officers, and other ranks from Army, Navy, Air Force, Coast Guard, and Territorial Army can approach the AFT.'
      },
      {
        question: 'What types of cases are heard by AFT?',
        answer: 'The AFT hears cases related to promotions, postings, transfers, pay, pensions, retirement benefits, disciplinary matters, court-martial proceedings, and violation of fundamental rights.'
      },
      {
        question: 'What is the time limit for filing a case?',
        answer: 'The time limit is 3 months from the date of cause of action. However, the AFT may condone delay if there was sufficient cause.'
      },
      {
        question: 'Can I appeal an AFT decision?',
        answer: 'Yes, appeals from AFT orders lie to the respective High Court and further to the Supreme Court on substantial questions of law.'
      },
      {
        question: 'Do I need a lawyer for AFT cases?',
        answer: 'While not mandatory, it is highly advisable to hire an experienced AFT lawyer as proceedings involve complex military service laws and specific procedural requirements.'
      },
      {
        question: 'How long does an AFT case take?',
        answer: 'The AFT is required to dispose of cases within six months from filing, though this may extend in complex matters depending on various factors.'
      },
      {
        question: 'What documents are required to file an AFT case?',
        answer: 'Required documents include petition, affidavit, service records, impugned orders, identity proof, and a fee of Rs. 100. Additional documents depend on the case nature.'
      }
    ];

    await aftService.save();

    console.log('✓ AFT Service updated successfully!\n');
    console.log('📊 Content Summary:');
    console.log(`   - Content Blocks: ${aftService.contentBlocks.length} sections`);
    console.log(`   - Document Checklist: ${aftService.documentChecklist.length} items`);
    console.log(`   - Popular Cases: ${aftService.popularCases.length} cases`);
    console.log(`   - Process Steps: ${aftService.process.length} steps`);
    console.log(`   - Key Points: ${aftService.keyPoints.length} points`);
    console.log(`   - Types of Cases: ${aftService.typesOfCases.length} types`);
    console.log(`   - FAQs: ${aftService.faqs.length} questions`);
    console.log('\n✓ All sections are admin-controllable through Service Manager\n');

  } catch (error) {
    console.error('✗ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  }
};

updateAFTService();
