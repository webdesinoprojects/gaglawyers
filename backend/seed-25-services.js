const mongoose = require('mongoose');
require('dotenv').config();
const Service = require('./models/Service');
const connectDB = require('./config/db');

const services25 = [
  {
    name: "Armed Forces Tribunal (AFT) Cases",
    slug: "armed-forces-tribunal",
    category: "military",
    shortDescription: "Expert representation before the Armed Forces Tribunal for military personnel disputes.",
    longDescription: "Our firm provides comprehensive legal representation in Armed Forces Tribunal matters, including service disputes, pension claims, and grievances of military personnel. We have extensive experience in handling complex AFT cases with specialized knowledge of military law.",
    overview: "The Armed Forces Tribunal is a quasi-judicial body that handles disputes related to military personnel. Our experienced advocates provide specialized counsel for service-related grievances, pension matters, and employment disputes affecting armed forces personnel.",
    typesOfCases: [
      "Service Disputes & Grievances",
      "Pension & Retirement Benefits",
      "Promotion & Seniority Issues",
      "Disciplinary Proceedings",
      "Wrongful Termination Claims"
    ],
    process: [
      { step: 1, title: "Case Assessment", description: "Thorough evaluation of military law issues and viability" },
      { step: 2, title: "Documentation Review", description: "Examination of service records, notices, and related documents" },
      { step: 3, title: "Strategy Development", description: "Crafting specialized legal strategy for AFT proceedings" },
      { step: 4, title: "Filing & Representation", description: "Professional representation before the tribunal" },
      { step: 5, title: "Appeal Management", description: "Handling appeals and follow-up proceedings if necessary" }
    ],
    keyPoints: [
      "Specialized in armed forces law",
      "Experience with military service disputes",
      "Knowledge of pension & benefits law",
      "Proven track record in AFT cases"
    ]
  },
  {
    name: "Bail & Anticipatory Bail Cases",
    slug: "bail-anticipatory-bail",
    category: "criminal",
    shortDescription: "Urgent bail assistance and anticipatory bail petitions in criminal matters.",
    longDescription: "We provide immediate legal assistance for bail and anticipatory bail applications. Our criminal law experts prepare compelling petitions to secure bail for clients facing criminal charges, ensuring their rights are protected throughout the judicial process.",
    overview: "Bail and anticipatory bail are critical safeguards in criminal proceedings. Our firm provides immediate, expert assistance in preparing and presenting bail applications, with a focus on protecting your personal liberty and ensuring fair judicial process.",
    typesOfCases: [
      "Regular Bail Applications",
      "Anticipatory Bail Petitions",
      "Bail Modification & Cancellation",
      "Bail in NDPS Cases",
      "Bail in Serious Crimes"
    ],
    process: [
      { step: 1, title: "Urgent Consultation", description: "Immediate assessment of charges and circumstances" },
      { step: 2, title: "Petition Drafting", description: "Compelling anticipatory bail or bail application preparation" },
      { step: 3, title: "Documentation", description: "Gathering supporting documents and character certificates" },
      { step: 4, title: "Court Representation", description: "Arguing bail petition before the presiding judge" },
      { step: 5, title: "Conditions Management", description: "Handling bail conditions and compliance matters" }
    ],
    keyPoints: [
      "24/7 emergency assistance available",
      "Expert criminal defense advocates",
      "High success rate in bail applications",
      "Immediate response to urgent matters"
    ]
  },
  {
    name: "CAT (Central Administrative Tribunal) Matters",
    slug: "cat-central-administrative-tribunal",
    category: "administrative",
    shortDescription: "Representation in Central Administrative Tribunal cases for administrative law disputes.",
    longDescription: "Our firm specializes in CAT matters involving disputes between citizens and government departments. We handle complex administrative law cases including service matters, pension disputes, and statutory body proceedings with expert advocacy.",
    overview: "The Central Administrative Tribunal addresses disputes between individuals and administrative bodies. We provide specialized representation in CAT proceedings, protecting your rights against administrative actions and ensuring access to justice.",
    typesOfCases: [
      "Service-Related Disputes",
      "Pension & Retirement Claims",
      "Government Employee Grievances",
      "Statutory Authority Disputes",
      "Administrative Action Challenges"
    ],
    process: [
      { step: 1, title: "Administrative Review", description: "Analysis of administrative action and legal grounds for challenge" },
      { step: 2, title: "Application Preparation", description: "Drafting original application with supporting evidence" },
      { step: 3, title: "Evidence Compilation", description: "Gathering documents and expert statements" },
      { step: 4, title: "CAT Representation", description: "Appearing and arguing before the tribunal" },
      { step: 5, title: "Appellate Proceedings", description: "Managing appeals if required" }
    ],
    keyPoints: [
      "Expertise in administrative law",
      "Experience with CAT procedures",
      "Knowledge of service law",
      "Successful CAT representations"
    ]
  },
  {
    name: "Cheque Bounce Cases",
    slug: "cheque-bounce",
    category: "criminal",
    shortDescription: "Defense and prosecution support in cheque dishonor and bounce cases.",
    longDescription: "We provide comprehensive legal assistance in cheque bounce cases under Section 138 of the Negotiable Instruments Act. Whether defending against accusations or recovering dishonored cheques, our experts navigate the complexities of cheque-related disputes.",
    overview: "Cheque bounce cases are criminal matters with serious financial implications. We defend clients accused of issuing dishonored cheques and represent creditors seeking recovery, with in-depth knowledge of NI Act provisions.",
    typesOfCases: [
      "Defense Against Cheque Bounce Charges",
      "Cheque Dishonor Recovery",
      "Repeated Cheque Bounces",
      "Cross-Cheque Issues",
      "Settlement & Compromise Arrangements"
    ],
    process: [
      { step: 1, title: "Case Evaluation", description: "Assessment of cheque details, facts, and legal position" },
      { step: 2, title: "Documentation Collection", description: "Gathering bank statements, negotiation records, and evidence" },
      { step: 3, title: "Court Filing", description: "Filing defense or complaint as applicable" },
      { step: 4, title: "Negotiation", description: "Facilitating settlement discussions between parties" },
      { step: 5, title: "Trial Representation", description: "Appearing before criminal court and presenting defense/case" }
    ],
    keyPoints: [
      "Expertise in Negotiable Instruments Act",
      "Settlement negotiation specialists",
      "Criminal defense experience",
      "Knowledge of banking law"
    ]
  },
  {
    name: "Civil Law & Civil Disputes",
    slug: "civil-law-disputes",
    category: "civil",
    shortDescription: "Comprehensive civil litigation and dispute resolution services.",
    longDescription: "Our civil law division handles diverse civil disputes including contract breaches, property matters, torts, and general civil litigation. We provide strategic counsel and aggressive representation in civil courts at all levels.",
    overview: "Civil law encompasses a broad range of disputes between individuals and organizations. We provide comprehensive representation in civil matters, from minor disputes to complex commercial litigation.",
    typesOfCases: [
      "Contract Disputes & Breach Claims",
      "Property & Boundary Disputes",
      "Tort & Civil Negligence",
      "Debt & Money Claims",
      "Specific Performance Cases"
    ],
    process: [
      { step: 1, title: "Legal Analysis", description: "Detailed examination of facts, contracts, and applicable law" },
      { step: 2, title: "Strategy Planning", description: "Development of comprehensive litigation strategy" },
      { step: 3, title: "Pleadings Drafting", description: "Filing well-researched plaint or written statement" },
      { step: 4, title: "Discovery & Evidence", description: "Managing documentary evidence and witness examination" },
      { step: 5, title: "Trial & Judgment", description: "Active court representation and argument before judge" }
    ],
    keyPoints: [
      "Multi-level civil court experience",
      "Contract law expertise",
      "Property dispute specialists",
      "Proven litigation success rate"
    ]
  },
  {
    name: "Contract Dispute Cases",
    slug: "contract-disputes",
    category: "civil",
    shortDescription: "Expert handling of contract interpretation and breach disputes.",
    longDescription: "We specialize in contract disputes involving breach of contract, non-performance, and contractual interpretation. Our advocates analyze complex agreements, identify breaches, and pursue effective remedies for our clients.",
    overview: "Contract disputes arise when parties fail to meet contractual obligations. We provide specialized representation in interpreting contracts, proving breaches, and securing damages or specific performance.",
    typesOfCases: [
      "Breach of Contract Claims",
      "Contract Interpretation Disputes",
      "Non-Performance Issues",
      "Damages Recovery",
      "Specific Performance & Injunctions"
    ],
    process: [
      { step: 1, title: "Contract Analysis", description: "Thorough examination of contract terms and conditions" },
      { step: 2, title: "Breach Assessment", description: "Determination of breach, liability, and damages" },
      { step: 3, title: "Evidence Preparation", description: "Documentation of non-performance and impact" },
      { step: 4, title: "Negotiation", description: "Attempting resolution through settlement discussions" },
      { step: 5, title: "Litigation", description: "Filing suit and pursuing remedies in court" }
    ],
    keyPoints: [
      "Contract law specialists",
      "Business transaction expertise",
      "Complex agreement interpretation",
      "Damages calculation expertise"
    ]
  },
  {
    name: "Corporate Law Services",
    slug: "corporate-law",
    category: "corporate",
    shortDescription: "Comprehensive corporate legal services for businesses of all sizes.",
    longDescription: "We provide full-spectrum corporate law services including company formation, governance, compliance, mergers & acquisitions, and corporate restructuring. Our corporate team ensures legal compliance while supporting business growth.",
    overview: "Corporate law is essential for business success. We provide strategic counsel on corporate governance, regulatory compliance, transactions, and dispute resolution to support business objectives.",
    typesOfCases: [
      "Company Formation & Registration",
      "Corporate Governance & Compliance",
      "Mergers & Acquisitions",
      "Contract Negotiation & Drafting",
      "Corporate Restructuring"
    ],
    process: [
      { step: 1, title: "Business Consultation", description: "Understanding business objectives and legal requirements" },
      { step: 2, title: "Strategic Planning", description: "Developing corporate strategy aligned with legal framework" },
      { step: 3, title: "Documentation", description: "Preparing corporate documents and agreements" },
      { step: 4, title: "Regulatory Compliance", description: "Ensuring adherence to corporate laws and regulations" },
      { step: 5, title: "Ongoing Counsel", description: "Providing advisory support for business decisions" }
    ],
    keyPoints: [
      "Extensive corporate experience",
      "M&A transaction expertise",
      "Regulatory compliance knowledge",
      "Business-focused legal strategy"
    ]
  },
  {
    name: "Criminal Defense Cases",
    slug: "criminal-defense",
    category: "criminal",
    shortDescription: "Aggressive defense representation in criminal matters.",
    longDescription: "Our criminal defense team provides comprehensive representation in all criminal matters, from investigation stage through trial and appeals. We protect client rights and mount vigorous defense strategies against criminal charges.",
    overview: "Criminal charges are serious matters requiring expert defense. We provide immediate, aggressive representation protecting your constitutional rights and building strong defense strategies.",
    typesOfCases: [
      "Robbery & Theft Cases",
      "Assault & Violence Charges",
      "Drug-Related Offenses",
      "White-Collar Crimes",
      "Sexual Offense Defense"
    ],
    process: [
      { step: 1, title: "Immediate Assessment", description: "Urgent review of charges and evidence against client" },
      { step: 2, title: "Investigation", description: "Conducting independent investigation and evidence collection" },
      { step: 3, title: "Defense Strategy", description: "Developing comprehensive defense strategy" },
      { step: 4, title: "Pre-Trial Proceedings", description: "Managing bail, preliminary hearings, and motions" },
      { step: 5, title: "Trial & Appeal", description: "Aggressive representation at trial and appellate level" }
    ],
    keyPoints: [
      "Aggressive criminal advocates",
      "Investigation and research expertise",
      "Constitutional rights protection",
      "Trial and appellate experience"
    ]
  },
  {
    name: "Cyber Crime Cases",
    slug: "cyber-crime",
    category: "criminal",
    shortDescription: "Specialized representation in cyber crime and digital offense matters.",
    longDescription: "We provide expert representation in cyber crime cases including data theft, hacking, online fraud, and digital harassment. Our team combines legal expertise with technical knowledge to defend clients in cyber-related offenses.",
    overview: "Cyber crimes are complex offenses requiring specialized knowledge. We defend clients accused of cyber crimes and pursue perpetrators of digital offenses with expertise in both law and technology.",
    typesOfCases: [
      "Data Theft & Hacking",
      "Online Fraud & Phishing",
      "Cyberstalking & Harassment",
      "Copyright Infringement",
      "Digital Impersonation"
    ],
    process: [
      { step: 1, title: "Technical Analysis", description: "Understanding technical aspects of cyber offense" },
      { step: 2, title: "Digital Evidence Review", description: "Examining digital evidence and expert reports" },
      { step: 3, title: "Defense Preparation", description: "Building technical and legal defense" },
      { step: 4, title: "Expert Consultation", description: "Engaging technical experts for court proceedings" },
      { step: 5, title: "Court Representation", description: "Presenting defense in cyber crime matters" }
    ],
    keyPoints: [
      "Cyber crime law specialists",
      "Technical knowledge combined with legal expertise",
      "Digital evidence handling",
      "Prevention and prosecution advocacy"
    ]
  },
  {
    name: "Divorce & Matrimonial Cases",
    slug: "divorce-matrimonial",
    category: "family",
    shortDescription: "Compassionate and effective representation in divorce and matrimonial disputes.",
    longDescription: "We handle all aspects of divorce proceedings, including contested and uncontested divorces, custody disputes, alimony, and property division. Our approach balances assertiveness with sensitivity to family matters.",
    overview: "Divorce and matrimonial disputes require both legal acumen and emotional sensitivity. We provide comprehensive representation protecting your interests and those of your children throughout the process.",
    typesOfCases: [
      "Contested & Uncontested Divorce",
      "Spousal Maintenance Claims",
      "Child Custody & Guardianship",
      "Property Division & Alimony",
      "Domestic Violence Cases"
    ],
    process: [
      { step: 1, title: "Confidential Consultation", description: "Safe discussion of marital situation and concerns" },
      { step: 2, title: "Legal Strategy", description: "Development of strategy protecting your interests" },
      { step: 3, title: "Negotiation", description: "Attempting settlement on favorable terms" },
      { step: 4, title: "Petition Filing", description: "Preparing and filing divorce petition" },
      { step: 5, title: "Trial & Resolution", description: "Court representation and finalization of divorce" }
    ],
    keyPoints: [
      "Family law expertise",
      "Sensitive handling of personal matters",
      "Child custody specialization",
      "Fair property division advocacy"
    ]
  },
  {
    name: "Debt Recovery (DRT) Cases",
    slug: "debt-recovery",
    category: "civil",
    shortDescription: "Efficient debt recovery proceedings in Debt Recovery Tribunals.",
    longDescription: "We specialize in debt recovery cases before DRTs, handling loan defaults, unpaid dues, and financial disputes between creditors and borrowers. Our expertise ensures swift and effective debt recovery proceedings.",
    overview: "Debt Recovery Tribunals provide expedited procedures for debt collection. We represent both creditors and debtors, ensuring fair and efficient resolution of financial disputes.",
    typesOfCases: [
      "Bank Loan Default Cases",
      "Business Debt Recovery",
      "Mortgage & Security Interest",
      "Debtor Protection Cases",
      "Execution Proceedings"
    ],
    process: [
      { step: 1, title: "DRT Eligibility Assessment", description: "Determining if case qualifies for DRT jurisdiction" },
      { step: 2, title: "Application Preparation", description: "Drafting comprehensive debt recovery application" },
      { step: 3, title: "Evidence Compilation", description: "Gathering loan documents, payment records, and proof" },
      { step: 4, title: "DRT Proceedings", description: "Appearing before tribunal and presenting case" },
      { step: 5, title: "Execution & Recovery", description: "Managing execution of judgment and collection" }
    ],
    keyPoints: [
      "DRT procedure expertise",
      "Fast-track debt resolution",
      "Financial document analysis",
      "Effective execution strategy"
    ]
  },
  {
    name: "Employment & Labour Law Cases",
    slug: "employment-labour-law",
    category: "labour",
    shortDescription: "Comprehensive employment and labour law representation.",
    longDescription: "We handle employment disputes, labour law violations, wrongful termination, and industrial relations matters. Our team protects employee rights while also representing employers in workplace disputes.",
    overview: "Employment law governs workplace relationships and rights. We represent both employees and employers in disputes, ensuring compliance with labour laws and fair resolution of workplace issues.",
    typesOfCases: [
      "Wrongful Termination Claims",
      "Unpaid Wages & Benefits",
      "Workplace Discrimination",
      "Unfair Labor Practices",
      "Industrial Dispute Resolution"
    ],
    process: [
      { step: 1, title: "Employment Law Review", description: "Analyzing employment contract and relevant labour laws" },
      { step: 2, title: "Case Assessment", description: "Evaluating viability of claims or defenses" },
      { step: 3, title: "Documentation Preparation", description: "Gathering employment records and evidence" },
      { step: 4, title: "Negotiation/Filing", description: "Attempting settlement or filing appropriate proceeding" },
      { step: 5, title: "Representation", description: "Appearing before labour authorities and courts" }
    ],
    keyPoints: [
      "Labour law excellence",
      "Worker rights advocacy",
      "Employer compliance guidance",
      "Dispute resolution expertise"
    ]
  },
  {
    name: "Family Law Disputes",
    slug: "family-law-disputes",
    category: "family",
    shortDescription: "Expert handling of all family law matters.",
    longDescription: "Our family law team handles various family disputes including succession issues, guardianship, adoption, and inheritance disputes. We provide compassionate yet effective representation in sensitive family matters.",
    overview: "Family law addresses relationships and succession. We provide comprehensive representation in all family matters, protecting your rights and family interests with care and expertise.",
    typesOfCases: [
      "Succession & Inheritance Disputes",
      "Guardianship & Adoption",
      "Maintenance & Support Claims",
      "Will & Testament Disputes",
      "Family Property Division"
    ],
    process: [
      { step: 1, title: "Family Situation Assessment", description: "Understanding family dynamics and legal concerns" },
      { step: 2, title: "Legal Guidance", description: "Explaining family law rights and options" },
      { step: 3, title: "Documentation", description: "Preparing necessary legal documents" },
      { step: 4, title: "Negotiation", description: "Facilitating family resolution and agreement" },
      { step: 5, title: "Court Proceedings", description: "Filing and managing family court matters" }
    ],
    keyPoints: [
      "Comprehensive family law knowledge",
      "Sensitive matter handling",
      "Succession law expertise",
      "Family-focused solutions"
    ]
  },
  {
    name: "High Court Litigation",
    slug: "high-court-litigation",
    category: "litigation",
    shortDescription: "Complex litigation at the High Court level.",
    longDescription: "We provide specialized representation in High Court matters including appeals, writ petitions, and complex procedural issues. Our team has extensive High Court experience and handles sophisticated legal arguments.",
    overview: "High Court litigation involves complex legal issues and procedural requirements. We provide expert representation in appeals, writ petitions, and other High Court proceedings.",
    typesOfCases: [
      "Appeals from Lower Courts",
      "Writ Petitions (HC Jurisdiction)",
      "Constitutional Questions",
      "Complex Civil Litigation",
      "Public Interest Matters"
    ],
    process: [
      { step: 1, title: "Case Analysis", description: "Detailed review of lower court judgment and errors" },
      { step: 2, title: "Legal Research", description: "Comprehensive research on applicable law and precedents" },
      { step: 3, title: "Petition Drafting", description: "Preparation of persuasive High Court petition" },
      { step: 4, title: "Filing & Hearings", description: "Filing and appearing before High Court benches" },
      { step: 5, title: "Judgment Execution", description: "Implementation of High Court orders" }
    ],
    keyPoints: [
      "High Court expertise",
      "Appellate advocacy excellence",
      "Complex legal argument",
      "Constitutional law knowledge"
    ]
  },
  {
    name: "Immigration Law Services",
    slug: "immigration-law",
    category: "immigration",
    shortDescription: "Professional immigration law services for visa and travel matters.",
    longDescription: "We provide immigration law services including visa applications, travel documentation, immigration appeals, and matters related to international mobility. Our team navigates complex immigration procedures and regulations.",
    overview: "Immigration law facilitates international travel and relocation. We guide clients through visa processes, immigration requirements, and related legal matters with expertise in immigration procedures.",
    typesOfCases: [
      "Visa Application & Processing",
      "Work Permit & Residency",
      "Immigration Appeals",
      "Deportation Defense",
      "Travel Documentation"
    ],
    process: [
      { step: 1, title: "Immigration Assessment", description: "Evaluation of immigration needs and options" },
      { step: 2, title: "Document Preparation", description: "Preparation of required immigration documents" },
      { step: 3, title: "Application Filing", description: "Submission of visa and immigration applications" },
      { step: 4, title: "Ministry Liaison", description: "Communication with immigration authorities" },
      { step: 5, title: "Approval & Support", description: "Follow-up and assistance post-approval" }
    ],
    keyPoints: [
      "Immigration law expertise",
      "Visa procedure knowledge",
      "Government liaison experience",
      "International mobility assistance"
    ]
  },
  {
    name: "Insolvency & Bankruptcy Cases",
    slug: "insolvency-bankruptcy",
    category: "corporate",
    shortDescription: "Expert representation in insolvency and bankruptcy proceedings.",
    longDescription: "We handle complex insolvency and bankruptcy matters under IBC and Bankruptcy Code, representing creditors, debtors, and stakeholders in insolvency proceedings, resolution plans, and liquidation processes.",
    overview: "Insolvency law provides mechanisms for debt resolution. We represent all stakeholders in insolvency proceedings, ensuring fair treatment and optimal recovery in bankruptcy matters.",
    typesOfCases: [
      "Corporate Insolvency Resolution",
      "Individual Bankruptcy",
      "Creditor Rights Protection",
      "Resolution Plan Preparation",
      "Liquidation Proceedings"
    ],
    process: [
      { step: 1, title: "Insolvency Assessment", description: "Analysis of financial situation and bankruptcy options" },
      { step: 2, title: "Filing & Registration", description: "Filing insolvency petition under IBC" },
      { step: 3, title: "Proceedings Management", description: "Navigating insolvency resolution process" },
      { step: 4, title: "Plan Development", description: "Preparing resolution plan or alternative strategy" },
      { step: 5, title: "Implementation", description: "Overseeing plan implementation or liquidation" }
    ],
    keyPoints: [
      "IBC expertise",
      "Insolvency resolution knowledge",
      "Creditor & debtor representation",
      "Financial restructuring guidance"
    ]
  },
  {
    name: "Insurance Claim & Dispute Cases",
    slug: "insurance-claims",
    category: "civil",
    shortDescription: "Representation in insurance claim disputes and policy matters.",
    longDescription: "We assist clients in insurance claim disputes, policy interpretation, claim denials, and regulatory matters. Our expertise covers life insurance, property insurance, liability claims, and related disputes.",
    overview: "Insurance claims require expert navigation of policy terms and regulations. We represent policyholders and insurers in claim disputes, ensuring fair assessment and appropriate compensation.",
    typesOfCases: [
      "Claim Denial Appeals",
      "Policy Interpretation Disputes",
      "Settlement Negotiation",
      "Insurance Fraud Defense",
      "Regulatory Complaints"
    ],
    process: [
      { step: 1, title: "Policy Review", description: "Detailed examination of insurance policy terms" },
      { step: 2, title: "Claim Analysis", description: "Assessment of claim denial or dispute" },
      { step: 3, title: "Documentation Compilation", description: "Gathering supporting evidence and documentation" },
      { step: 4, title: "Negotiation", description: "Pursuing claim settlement with insurers" },
      { step: 5, title: "Dispute Resolution", description: "Escalation to ombudsman or litigation if needed" }
    ],
    keyPoints: [
      "Insurance law expertise",
      "Policy interpretation skills",
      "Claim maximization strategy",
      "Regulatory knowledge"
    ]
  },
  {
    name: "Landlord-Tenant Disputes",
    slug: "landlord-tenant-disputes",
    category: "property",
    shortDescription: "Expert resolution of landlord and tenant conflicts.",
    longDescription: "We handle landlord-tenant disputes including eviction proceedings, rent disputes, deposit claims, and maintenance liabilities. Our expertise covers both residential and commercial property matters.",
    overview: "Landlord-tenant law governs rental relationships. We represent both landlords and tenants in disputes, ensuring compliance with property laws and fair resolution of rental conflicts.",
    typesOfCases: [
      "Eviction & Possession Proceedings",
      "Rent & Arrears Disputes",
      "Security Deposit Claims",
      "Maintenance & Repairs Issues",
      "Lease Termination Matters"
    ],
    process: [
      { step: 1, title: "Lease Agreement Review", description: "Examination of lease terms and conditions" },
      { step: 2, title: "Dispute Assessment", description: "Analysis of parties' rights and obligations" },
      { step: 3, title: "Notice Preparation", description: "Preparing legal notice if needed" },
      { step: 4, title: "Negotiation", description: "Attempting resolution through discussion" },
      { step: 5, title: "Legal Proceeding", description: "Filing and pursuing property court action" }
    ],
    keyPoints: [
      "Property law expertise",
      "Tenant & landlord representation",
      "Eviction proceeding knowledge",
      "Fair rental practice advocacy"
    ]
  },
  {
    name: "Legal Notice & Documentation",
    slug: "legal-notice-documentation",
    category: "civil",
    shortDescription: "Professional legal notice and documentation services.",
    longDescription: "We prepare and serve legal notices for various purposes including debt recovery, property disputes, breach of contract, and other civil matters. We also provide comprehensive documentation services for personal and business needs.",
    overview: "Legal notices communicate formal legal positions and initiate proceedings. We prepare effective legal notices and comprehensive documentation that protect your interests and establish clear legal records.",
    typesOfCases: [
      "Demand Notices",
      "Defamation Notices",
      "Termination Notices",
      "Contract Violation Notices",
      "General Legal Documentation"
    ],
    process: [
      { step: 1, title: "Situation Assessment", description: "Understanding the legal issue requiring notice" },
      { step: 2, title: "Notice Drafting", description: "Preparation of legally effective notice" },
      { step: 3, title: "Service Arrangement", description: "Arrangement for proper legal service of notice" },
      { step: 4, title: "Response Management", description: "Documenting responses and subsequent actions" },
      { step: 5, title: "Follow-up Action", description: "Proceeding with litigation if notice is unheeded" }
    ],
    keyPoints: [
      "Legal documentation expertise",
      "Notice drafting proficiency",
      "Service arrangement knowledge",
      "Procedural compliance awareness"
    ]
  },
  {
    name: "Mediation & Arbitration (ADR)",
    slug: "mediation-arbitration",
    category: "adr",
    shortDescription: "Alternative dispute resolution through mediation and arbitration.",
    longDescription: "We provide mediation and arbitration services as cost-effective alternatives to litigation. Our experienced mediators and arbitrators facilitate quick resolution of disputes across all legal domains.",
    overview: "Alternative Dispute Resolution provides faster, confidential resolution of disputes. We facilitate mediation and arbitration processes that preserve relationships and achieve efficient case resolution.",
    typesOfCases: [
      "Commercial Arbitration",
      "Mediation of Civil Disputes",
      "Family Matter Mediation",
      "Contract Interpretation Arbitration",
      "Business Dispute Resolution"
    ],
    process: [
      { step: 1, title: "ADR Suitability Assessment", description: "Evaluation whether mediation/arbitration is appropriate" },
      { step: 2, title: "Forum Selection", description: "Choosing appropriate arbitration body or mediator" },
      { step: 3, title: "Agreement Formulation", description: "Preparation of arbitration/mediation agreement" },
      { step: 4, title: "Process Facilitation", description: "Participation in mediation or arbitration sessions" },
      { step: 5, title: "Award/Settlement", description: "Enforcement of award or settlement agreement" }
    ],
    keyPoints: [
      "ADR expertise",
      "Mediation facilitation skills",
      "Arbitration advocacy",
      "Confidential dispute resolution"
    ]
  },
  {
    name: "Motor Accident & MACT Cases",
    slug: "motor-accident-mact",
    category: "civil",
    shortDescription: "Representation in motor accident claims and Motor Accidents Claims Tribunal.",
    longDescription: "We handle motor accident injury claims, disability assessments, and MACT proceedings. Our expertise includes calculating fair compensation, negotiating with insurers, and representing claimants before tribunals.",
    overview: "Motor accident claims provide compensation for injuries and damages. We maximize compensation through expert evidence, proper valuation, and effective tribunal representation.",
    typesOfCases: [
      "Personal Injury Claims",
      "Death & Disability Compensation",
      "MACT Claims Filing",
      "Insurance Settlement Negotiation",
      "Rehabilitation & Support Claims"
    ],
    process: [
      { step: 1, title: "Accident Assessment", description: "Detailed review of accident circumstances and injuries" },
      { step: 2, title: "Medical Evidence", description: "Obtaining medical reports and disability assessment" },
      { step: 3, title: "Compensation Calculation", description: "Computing fair compensation including lost wages" },
      { step: 4, title: "Claim Filing", description: "Filing claim application before MACT" },
      { step: 5, title: "MACT Representation", description: "Presenting claim and securing maximum compensation" }
    ],
    keyPoints: [
      "Motor accident law expertise",
      "MACT procedure knowledge",
      "Compensation calculation expertise",
      "Insurance negotiation skills"
    ]
  },
  {
    name: "Property Law & Real Estate Disputes",
    slug: "property-real-estate",
    category: "property",
    shortDescription: "Expert handling of property disputes and real estate legal matters.",
    longDescription: "We provide comprehensive property law services including real estate disputes, title issues, registration matters, and possession disputes. Our team handles residential, commercial, and agricultural property matters.",
    overview: "Property law protects real estate interests. We resolve property disputes, ensure clear title, and provide guidance on real estate transactions and conveyancing matters.",
    typesOfCases: [
      "Title & Ownership Disputes",
      "Possession & Eviction Cases",
      "Boundary & Encroachment Issues",
      "Registration & Conveyancing",
      "Property Inheritance Disputes"
    ],
    process: [
      { step: 1, title: "Property Title Investigation", description: "Examining property records and title documents" },
      { step: 2, title: "Dispute Analysis", description: "Assessing competing claims and legal positions" },
      { step: 3, title: "Documentation Preparation", description: "Preparing necessary property law documents" },
      { step: 4, title: "Negotiation/Litigation", description: "Attempting settlement or filing property suit" },
      { step: 5, title: "Execution", description: "Executing judgment and protecting property rights" }
    ],
    keyPoints: [
      "Property law expertise",
      "Title insurance knowledge",
      "Real estate transaction experience",
      "Land acquisition advocacy"
    ]
  },
  {
    name: "Sexual Harassment & 498A Cases",
    slug: "sexual-harassment-498a",
    category: "criminal",
    shortDescription: "Defense and prosecution support in sexual harassment and dowry-related cases.",
    longDescription: "We provide sensitive representation in sexual harassment cases and Section 498A dowry cases. Our team handles these sensitive matters with care while ensuring vigorous defense or prosecution as appropriate.",
    overview: "Sexual harassment and dowry cases are serious criminal matters. We provide sensitive, effective representation protecting both accusers' rights and ensuring fair defense for the accused.",
    typesOfCases: [
      "Sexual Harassment Defense",
      "498A Dowry Charge Defense",
      "Workplace Sexual Misconduct",
      "Harassment Prosecution",
      "False Accusation Defense"
    ],
    process: [
      { step: 1, title: "Sensitive Case Assessment", description: "Confidential evaluation of circumstances" },
      { step: 2, title: "Evidence Review", description: "Thorough analysis of available evidence" },
      { step: 3, title: "Strategy Development", description: "Formulating appropriate case strategy" },
      { step: 4, title: "Court Proceedings", description: "Representing client in criminal court" },
      { step: 5, title: "Support Services", description: "Providing ongoing support throughout proceedings" }
    ],
    keyPoints: [
      "Sensitive matter expertise",
      "Criminal law proficiency",
      "Victim advocacy experience",
      "Defense rights protection"
    ]
  },
  {
    name: "Supreme Court Litigation",
    slug: "supreme-court-litigation",
    category: "litigation",
    shortDescription: "Specialized representation before the Supreme Court of India.",
    longDescription: "We handle Supreme Court matters including constitutional issues, appeals from High Courts, and cases of public importance. Our senior advocates have extensive Supreme Court experience and specialized constitutional expertise.",
    overview: "Supreme Court litigation addresses constitutional issues and matters of national importance. We provide specialized representation in complex constitutional matters and appeals to the apex court.",
    typesOfCases: [
      "Constitutional Petitions",
      "Appeals from High Courts",
      "Public Interest Litigation",
      "Constitutional Interpretation",
      "Landmark Cases"
    ],
    process: [
      { step: 1, title: "Constitutional Analysis", description: "Detailed review of constitutional dimensions" },
      { step: 2, title: "Case Assessment", description: "Evaluation of Supreme Court jurisdiction and admissibility" },
      { step: 3, title: "Petition Drafting", description: "Preparation of comprehensive Supreme Court petition" },
      { step: 4, title: "Filing & Arguments", description: "Filing and presenting arguments before benches" },
      { step: 5, title: "Implementation", description: "Implementation of Supreme Court judgment" }
    ],
    keyPoints: [
      "Supreme Court expertise",
      "Constitutional law knowledge",
      "Appellate advocacy excellence",
      "Public interest advocacy"
    ]
  },
  {
    name: "Writ Petition & Public Interest Litigation (PIL)",
    slug: "writ-pil",
    category: "litigation",
    shortDescription: "Strategic writ petitions and public interest litigation advocacy.",
    longDescription: "We file and manage writ petitions and public interest litigations addressing systemic issues, constitutional violations, and matters affecting public welfare. Our team advocates for constitutional rights and social justice.",
    overview: "Writ petitions and PIL protect constitutional rights and public interests. We pursue strategic litigation addressing systemic issues and advocating for social justice and constitutional compliance.",
    typesOfCases: [
      "Habeas Corpus Petitions",
      "Public Interest Litigation",
      "Mandamus & Administrative Review",
      "Constitutional Violation Challenges",
      "Social Justice Advocacy"
    ],
    process: [
      { step: 1, title: "Issue Identification", description: "Identifying systemic issue or constitutional violation" },
      { step: 2, title: "Feasibility Assessment", description: "Determining writ/PIL appropriateness" },
      { step: 3, title: "Petition Preparation", description: "Drafting comprehensive writ or PIL petition" },
      { step: 4, title: "Filing & Advocacy", description: "Filing petition and presenting arguments" },
      { step: 5, title: "Implementation & Monitoring", description: "Following up on relief orders and compliance" }
    ],
    keyPoints: [
      "Constitutional litigation expertise",
      "Social justice advocacy",
      "PIL experience",
      "Systemic change advocacy"
    ]
  }
];

const seedServices = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Remove existing services
    console.log('Removing existing services...');
    const deletion = await Service.deleteMany({});
    console.log(`Deleted ${deletion.deletedCount} existing services`);

    // Add new services
    console.log('Adding 25 new services...');
    const result = await Service.insertMany(services25);
    console.log(`Successfully added ${result.length} services`);

    // Display summary
    console.log('\n✅ Services seeded successfully!');
    console.log(`\nTotal services in database: ${await Service.countDocuments()}`);
    
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedServices();
