import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, Scale, ShieldCheck, FileText, Gavel } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FAQItem from '../components/FAQItem';
import API_BASE_URL from '../config/api';

const FALLBACK_PHONE = '+919996263370';

const CATEGORY_IMAGES = {
  military: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=80',
  criminal: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1600&q=80',
  family: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1600&q=80',
  corporate: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
  civil: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1600&q=80',
  litigation: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1600&q=80',
  property: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
  labour: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
  administrative: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
  immigration: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80',
  adr: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&w=1600&q=80',
};

const AFT_SLUGS = new Set([
  'armed-force-tribunal-lawyer-in-delhi',
  'armed-forces-tribunal',
  'armed-force-tribunal-lawyer-in-delhi'.toLowerCase(),
]);

const AFT_KEYWORDS = [
  'Aft lawyer',
  'Advocate for aft matters',
  'Best aft Lawyers near me',
  'aft lawyer fees',
  'Armed Force Tribunal Lawyer near me',
  'Best Armed Force Tribunal Lawyers',
  'Best Armed Force Tribunal Lawyers near me',
  'Top Armed Force Tribunal Lawyer in India',
  'Best Advocates for Armed Force Tribunal Cases',
  'Best Lawyers for Armed Force Tribunal Cases',
  'Lawyer for Armed Force Tribunal Cases',
  'Lawyer for Armed Force Tribunal Matters',
  'Lawyer for Armed Force Tribunal Disputes',
  'Armed Force Tribunal Lawyer in High Court',
  'Top Armed Force Tribunal Lawyer in Supreme Court',
];

const BAIL_SLUGS = new Set(['bail-lawyer']);

const BAIL_KEYWORDS = [
  'Top Criminal Lawyers in India',
  'Best Bail Lawyers in Delhi',
  'Top 10 Bail Lawyers in India',
  'Top Criminal lawyers in Delhi High Court',
  'supreme Court top 10 advocate list',
  'bond lawyers near me',
  'bail lawyers near me',
  'Lawyer for bail in Delhi',
  'anticipatory bail lawyer in Delhi',
  'Top Bail Lawyer in Supreme Court',
  'Top Bail Lawyer in Delhi High Court',
  'Lawyer for Anticipatory bail in Delhi',
  'Advocate for Anticipatory bail in Delhi',
  'Top 10 Lawyer in Delhi High Court',
  'Bail Lawyer Fees in Delhi',
];

const BAIL_OVERRIDES = {
  title: 'Bail Lawyer - GAG Lawyers',
  description:
    'Bail Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  subtitle:
    'Bail is a legal process of temporarily releasing a person from custody. Our legal team handles regular bail, urgent bail hearings, and related criminal-law custody remedies.',
  contentBlocks: [
    {
      heading: 'Bail Cases',
      paragraphs: [
        'Bail is a legal process of temporarily releasing a person from custody, and many individuals seek immediate legal support for urgent relief. In India, bail is granted by the court to arrested persons charged with non-bailable offences, subject to court conditions and future appearance.',
        'The amount and terms of bail depend on case facts, gravity of allegations, and risk considerations. In many situations, cash bail, surety, or collateral may be used to secure release from custody.',
        'Pre-trial detention facilities and procedures vary, and effective legal representation helps protect rights, challenge weak grounds, and secure lawful release conditions.',
      ],
    },
    {
      heading: 'Types of Bails Under Law',
      paragraphs: [
        'The legal framework broadly distinguishes bailable and non-bailable bail. In bailable matters, relief is available as per statutory right and conditions.',
        'In non-bailable matters, bail is granted on judicial assessment of facts, legal grounds, and risk factors such as absconding or evidence tampering.',
        'Courts may also consider interim and anticipatory protection depending on circumstances and applicable law.',
      ],
    },
    {
      heading: 'Acts and Provisions Related to Bail Cases',
      paragraphs: [
        'Common forms include bail on personal bond, recognizance, undertaking, and production of surety. Courts decide relief based on applicable criminal procedure and facts of the case.',
        'Magisterial and higher-court jurisdiction, offence category, and statutory restrictions significantly influence the bail outcome.',
      ],
    },
    {
      heading: 'Complete Procedure to File a Bail | Fees to File a Bail',
      paragraphs: [
        'The accused (or counsel) files a bail application before the competent court with case records and legal grounds. The court hears arguments and may impose conditions for release.',
        'If granted, the accused must comply with all conditions such as appearance obligations and movement restrictions. Professional fees vary by complexity, urgency, and stage of proceedings.',
      ],
    },
    {
      heading: 'What is Parole as per Criminal Law',
      paragraphs: [
        'Parole is a conditional temporary release from prison, generally subject to behavioral and statutory requirements. It is different from bail and applies post-conviction in eligible cases.',
        'Eligibility, duration, and conditions are governed by prison laws and state-specific rules.',
      ],
    },
    {
      heading: 'Complete Procedure to Apply Parole and Fees',
      paragraphs: [
        'Parole applications are submitted to competent prison and district authorities with conviction details, sentence records, and supporting family/social documentation.',
        'Authorities evaluate eligibility, conduct history, and public-safety considerations before approval. Administrative fees and procedural requirements vary by state.',
      ],
    },
    {
      heading: 'Role of Bail Lawyer in Bail Cases | Role of Parole Lawyer in Parole Cases',
      paragraphs: [
        'A bail lawyer prepares strategy, drafts applications, presents legal arguments, structures surety documentation, and handles compliance support after release.',
        'In parole matters, counsel helps with eligibility review, documentation, representation before authorities, and compliance with release conditions.',
      ],
    },
    {
      heading: 'How Grover & Grover, Advocates Help in Bail Cases',
      paragraphs: [
        'Grover & Grover, Advocates and Solicitors, assists clients through each stage: case assessment, bail drafting, urgent hearing representation, condition negotiation, and follow-up support.',
        'Where required, we also provide trial-stage and appellate strategy support aligned with the facts and legal posture of each case.',
      ],
    },
  ],
  documentChecklist: [
    'Bail application and supporting affidavit',
    'FIR, charge sheet, remand papers, and related case records',
    'Surety documents and financial proof',
    'Identity proof and recent photographs of accused/surety',
    'Bail bond documents as directed by court',
    'Parole application records and prison conduct documents (where applicable)',
  ],
  popularCases: [
    'Shanmugam Manjunath vs. State of Karnataka (2005) 7 SCC 699',
    'Varinder Kumar Bhalla vs. State of Punjab (2009) 12 SCC 559',
    'Navtej Singh Johar vs. Union of India (2018) 10 SCC 1',
    'State of Maharashtra vs. Anil Ramrao Waghmare (2018 MANU HC 2060)',
    'Manjit Singh vs. State of Punjab (2018 MANU HC 2748)',
    'Ravinder Singh vs. State of Haryana (2018 MANU HC 3190)',
  ],
  faqs: [
    {
      question: 'What is Bail Law in India?',
      answer:
        'Bail allows an accused person to be released from custody while awaiting trial or sentencing, subject to court-imposed conditions.',
    },
    {
      question: 'Who can get bail in India?',
      answer:
        'Any arrested person may apply, but grant depends on offence severity, past record, risk of absconding, and potential interference with justice.',
    },
    {
      question: 'How does the bail process work in India?',
      answer:
        'A bail application is filed before the competent court. After hearing, the court may grant bail on bond/surety terms and compliance conditions.',
    },
    {
      question: 'Can bail be cancelled?',
      answer:
        'Yes. Bail can be cancelled if conditions are violated, new incriminating material appears, or the accused is found to be misusing liberty.',
    },
    {
      question: 'Can bail be granted after conviction?',
      answer:
        'In appropriate cases, post-conviction bail may be granted during appeal proceedings subject to judicial discretion and statutory limits.',
    },
    {
      question: 'What are the consequences of violating bail conditions?',
      answer:
        'Violation can lead to cancellation of bail, forfeiture of bond, custody restoration, and possible additional legal consequences.',
    },
  ],
};

const CAT_SLUGS = new Set(['cat-matters-lawyer']);

const CAT_KEYWORDS = [
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
  'Top CAT Lawyer in Supreme Court',
];

const CAT_OVERRIDES = {
  title: 'CAT Matters Lawyer in Delhi - GAG Lawyers',
  description:
    'CAT Matters Lawyer in Delhi - GAG Lawyers We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations',
  subtitle:
    'CAT Matters Lawyer in Delhi. The Central Administrative Tribunal (CAT) is an independent judicial body under the Administrative Tribunals Act, 1985 for service disputes, recruitment matters, promotions, and disciplinary actions.',
  contentBlocks: [
    {
      heading: 'CAT Matters',
      paragraphs: [
        'CAT Matters Lawyer in Delhi The Central Administrative Tribunal (CAT) is an independent judicial frame in India that changed into established under the Administrative Tribunals Act, 1985, and individuals often search for a CAT Lawyer near me or Best CAT Lawyer near me for such matters.',
        'It is chargeable for adjudicating disputes regarding the recruitment, merchandising, and disciplinary actions of severa authorities personnel and officials. The CAT resolves disputes the various government and its personnel and maximum of the government and the public.',
        'The CAT is empowered to concentrate appeals from lower administrative tribunals and to problem orders, writs, and instructions on the manner to enforce its selections. The CAT has jurisdiction over all essential government employees, officers, and personnel.',
        'The CAT is an essential organization for the powerful functioning of the government and the safety of the rights of its employees. It is an impartial judicial frame, and its picks are binding at the government.',
      ],
    },
    {
      heading: 'Types of Disputes Handled by CAT',
      paragraphs: [
        'The Central Administrative Tribunal (CAT) is a specialized body established to resolve disputes and legal cases concerning the recruitment and employment conditions of individuals appointed to public services and positions in India.',
        'CAT handles disputes in recruitment and terms of service, disciplinary actions, pay, allowances, pension, termination, promotions, transfers, re-employment, seniority, compassionate appointments, and service-condition issues in public service.',
        'Many individuals seek guidance from a Lawyer for CAT Matters in Delhi, CAT Lawyer Advocate in Delhi, or CAT Lawyer in High Court for representation in these disputes.',
      ],
    },
    {
      heading: 'Acts and Provisions in Service CAT Matters',
      paragraphs: [
        'The Central Administrative Tribunal (Service CAT) is an independent judicial body established by the Central Government to address civil servants grievances promptly and effectively.',
        'The establishment of the Central Administrative Tribunal Act in 1985 aims to resolve disputes and complaints related to recruitment and conditions of service for individuals appointed to public services and posts associated with the affairs of the Central Government.',
        'Regional benches can be established to ensure accessibility, and the Act prescribes tribunal composition, appointment norms, and procedures for disposal of cases.',
      ],
    },
    {
      heading: 'Rights and Obligations of Government Employees',
      paragraphs: [
        'The Central Administrative Tribunal serves as a quasi-judicial body giving government employees an avenue to challenge adverse administrative actions including disciplinary action, promotion issues, pay adjustments, and related service matters.',
        'Government employees have the right to appeal and present arguments, while also bearing the obligation to comply with CAT rulings and provide complete documents and information for adjudication.',
      ],
    },
    {
      heading: 'Role of Lawyers in CAT Matters',
      paragraphs: [
        'The role of a service CAT Matters Lawyer in Delhi is to represent clients professionally and competently, provide legal advice, prepare documents, and handle hearings before CAT.',
        'Counsel reviews documentation, evaluates strengths and risks, advises on outcomes, presents arguments, safeguards procedural fairness, and supports appeals against tribunal decisions where required.',
      ],
    },
    {
      heading: 'How Grover & Grover, Advocates Help in CAT Matters',
      paragraphs: [
        'Grover & Grover Advocates helps clients navigate CAT matters with strategic guidance, legal representation, drafting, filings, compliance advice, and litigation support.',
        'The firm supports clients in understanding legal complexity, preparing strong submissions, and pursuing effective outcomes in CAT-related proceedings.',
      ],
    },
  ],
  documentChecklist: [
    'Appointment letters, service records, and promotion/seniority documents',
    'Impugned administrative orders, charge sheets, and disciplinary records',
    'Representation copies, departmental replies, and communication trail',
    'Pay/pension records and relevant government circulars',
    'Identity and authorization documents, plus complete chronology',
  ],
  popularCases: [
    'B.K.K. Pillai vs. Union of India',
    'B.K.K. Pillai vs. State of Kerala',
    'P.B. Samant vs. Union of India',
    'Service CAT rulings on review powers in civil service conditions',
  ],
  faqs: [
    {
      question: 'What is the Central Administrative Tribunal (CAT)?',
      answer:
        'Yes, a lawyer can represent you in a case before the Central Administrative Tribunal (CAT).',
    },
    {
      question: 'What is the role of the Central Administrative Tribunal (CAT)?',
      answer:
        'The Central Administrative Tribunal (CAT) has jurisdiction over disputes and grievances of government employees and other litigants related to recruitment, promotion, service conditions, and disciplinary matters.',
    },
    {
      question: 'What matters are heard by CAT?',
      answer:
        'CAT hears disputes concerning recruitment, promotion, service conditions, disciplinary actions, pay, pension, seniority, transfer, and related service-law grievances.',
    },
    {
      question: 'Can a lawyer represent me before CAT?',
      answer:
        'Yes, a lawyer can represent you in a case before the Central Administrative Tribunal (CAT).',
    },
    {
      question: 'Can CAT orders be challenged?',
      answer:
        'Yes. Subject to legal framework and case facts, CAT orders can be challenged through appropriate appellate or constitutional remedies.',
    },
    {
      question: 'What factors affect CAT lawyer fees?',
      answer:
        'CAT lawyer fees usually depend on case complexity, stage of matter, documentation volume, interim applications, and hearing requirements.',
    },
  ],
};

const CHEQUE_SLUGS = new Set(['cheque-bounce-lawyer', 'cheque-bounce']);

const CHEQUE_KEYWORDS = [
  'Cheque bounce lawyer near me',
  'Best Cheque Bounce Lawyer in Delhi',
  'Top Cheque Bounce Lawyer in Delhi',
  'Lawyer fees for Cheque Bounce case in Delhi',
  'Best lawyer for Cheque Bounce case in Delhi',
  'Cheque Bounce Lawyer case advocates near me',
  'Cheque Bounce case lawyer charges in Delhi',
  'Advocate for Cheque Bounce in Delhi',
  'Advocate fees for Cheque Bounce case in Delhi',
  'Best Cheque Bounce Lawyer services in Delhi',
  'Cheque Bounce legal notice format in Delhi',
  'Criminal case against Cheque Bounce in Delhi',
  'Legal case for Cheque Bounce in Delhi',
  'Cheque bouncing lawyer in Delhi',
];

const CHEQUE_OVERRIDES = {
  title: 'Cheque Bounce Lawyer in Delhi - GAG Lawyers',
  description:
    'Cheque Bounce Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations',
  subtitle:
    'Cheque Bounce Lawyer in Delhi. We assist in Section 138 NI Act matters, legal notice strategy, criminal complaints, recovery actions, and defense in cheque dishonour cases.',
  contentBlocks: [
    {
      heading: 'Cheque Bounce',
      paragraphs: [
        'Cheque Bounce Lawyer in Delhi, In financial transactions, a cheque may be returned by the bank due to insufficiency of funds or other legal/technical reasons. This cheque bounce situation can affect both individuals and businesses relying on cheque-based payments.',
        'Common causes include insufficient balance, signature mismatch, stale cheque, account closure, overwriting, or non-compliance with banking rules. Understanding these triggers is essential to prevent repeated cheque dishonour.',
        'A bounced cheque can lead to serious legal and financial consequences. Legal support helps evaluate liability, preserve records, and initiate proper legal remedy under applicable law.',
      ],
    },
    {
      heading: 'What to Do When a Cheque Gets Bounced',
      paragraphs: [
        'When a cheque is returned unpaid, collect the return memo and bank reason immediately. Preserve cheque copy, account records, and communication trail with the drawer.',
        'Issue a legally compliant demand notice within statutory timelines. If payment is not made within the prescribed period, initiate proceedings under Section 138 of the Negotiable Instruments Act, 1881.',
        'Practical handling at the earliest stage can reduce delay, protect recovery rights, and improve litigation position.',
      ],
    },
    {
      heading: 'Charges, Penalties & Punishment',
      paragraphs: [
        'Cheque dishonour due to insufficient funds can trigger criminal liability under Section 138 of the Negotiable Instruments Act, 1881, subject to statutory conditions and limitation.',
        'On conviction, penalties may include imprisonment, fine, or both, along with compensation-related consequences depending on facts and court findings.',
      ],
    },
    {
      heading: 'Legal Remedies Available under Law',
      paragraphs: [
        'A payee may pursue criminal complaint under NI Act, and in suitable cases also pursue civil recovery actions based on underlying liability and documentation.',
        'Legal notice drafting, evidence sequencing, and timeline compliance are critical to maintainability and final relief.',
      ],
    },
    {
      heading: 'Role of Cheque Bounce Lawyers',
      paragraphs: [
        'Cheque bounce lawyers provide legal notice strategy, complaint drafting, court representation, settlement negotiation, and evidence presentation.',
        'They also advise accused persons on defense strategy, procedural compliance, and risk management through trial and appeal stages.',
      ],
    },
    {
      heading: 'Documents Required to File a Cheque Bounce Case',
      paragraphs: [
        'Core documents include original cheque, return memo, legal notice copy, proof of service, transaction documents, bank records, and communication evidence.',
        'Complete documentation significantly strengthens maintainability, liability proof, and enforcement of monetary claims.',
      ],
    },
    {
      heading: 'How Grover & Grover, Advocates Help in Cheque Bounce Cases',
      paragraphs: [
        'Grover & Grover, Advocates and Solicitors provides end-to-end support in cheque bounce matters, including legal notice drafting, complaint filing, hearing representation, and settlement strategy.',
        'Our team also assists in bank-related recovery coordination, legal risk assessment, and trial-stage advocacy for both complainant and defense matters.',
      ],
    },
  ],
  documentChecklist: [
    'Original dishonoured cheque and bank return memo',
    'Account statement and transaction proof',
    'Legal notice and proof of delivery/service',
    'Correspondence between parties',
    'Identity and authorization documents',
    'Any contract/invoice supporting underlying liability',
  ],
  popularCases: [
    'Mardia Chemicals Ltd. v. Union of India (Supreme Court)',
    'State Bank of India v. K.K. Narayanan (High Court of Kerala)',
    'State Bank of India v. M.K. Nair (High Court of Kerala)',
  ],
  faqs: [
    {
      question: 'What is Cheque Bounce?',
      answer:
        'Cheque bounce refers to return of a cheque unpaid by the bank due to insufficient funds or other legally relevant reasons.',
    },
    {
      question: 'What are the consequences of Cheque Bounce?',
      answer:
        'Consequences may include legal notice, criminal complaint under NI Act, monetary penalties, litigation cost, and reputational impact.',
    },
    {
      question: 'What is the legal recourse for Cheque Bounce?',
      answer:
        'The payee can issue statutory demand notice and then file complaint under Section 138 NI Act if payment is not made within prescribed time.',
    },
    {
      question: 'Can a Cheque Bounce case be settled outside court?',
      answer:
        'Yes, settlement is possible at different stages, but terms and legal closure should be documented properly.',
    },
    {
      question: 'What documents are required for a Cheque Bounce case?',
      answer:
        'Original cheque, bank return memo, legal notice and service proof, transaction records, and supporting correspondence are typically required.',
    },
    {
      question: 'How long does a Cheque Bounce case take?',
      answer:
        'Timeline depends on court workload, case complexity, evidence, and settlement prospects; matters may range from months to longer durations.',
    },
  ],
};

const CIVIL_SLUGS = new Set(['civil-lawyer', 'civil-law-disputes']);

const CIVIL_KEYWORDS = [
  'Best Civil Lawyer in Delhi',
  'Top Civil Lawyer in Delhi',
  'Top 10 Civil Lawyer in India',
  'Best Civil Lawyers near me Delhi',
  'Civil Lawyer for Hight Court Delhi',
  'Best Civil Lawyer of Supreme Court Delhi',
  'Civil Lawyer for property in Delhi',
  'Civil Lawyer for property damage in Delhi',
  'civil suit lawyers near me Delhi',
  'civil litigation attorney near me Delhi',
  'civil litigation lawyer near me Delhi',
  'Civil Matter Lawyer in Delhi',
  'lawyers for civil suits near me Delhi',
];

const CIVIL_OVERRIDES = {
  title: 'Civil Lawyer in Delhi - GAG Lawyers',
  description:
    'Civil Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  subtitle:
    'Civil Lawyer in Delhi. We handle civil disputes including contracts, property, tort claims, family and succession matters, and civil remedies under applicable laws.',
  contentBlocks: [
    {
      heading: 'Civil Law',
      paragraphs: [
        'Civil law governs disputes between individuals and organizations, covering contracts, torts, property rights, family law, succession, inheritance, and consumer-related claims.',
        'The framework provides enforceable rights and remedies through courts to protect legal interests and resolve private disputes lawfully.',
      ],
    },
    {
      heading: 'Purpose & Significance of Civil Law',
      paragraphs: [
        'Civil law safeguards rights, supports fairness, and provides legal mechanisms for dispute resolution in society.',
        'It also supports economic stability by creating predictable legal structures for transactions, obligations, and enforcement.',
      ],
    },
    {
      heading: 'Types of Civil Cases and CPC Framework',
      paragraphs: [
        'Civil matters commonly include contract disputes, property disputes, tort claims, family disputes, and civil recovery actions under procedural law.',
        'The Civil Procedure Code (CPC) governs institution, pleadings, evidence process, hearings, and decree execution in civil litigation.',
      ],
    },
    {
      heading: 'Major Statutes Related to Civil Law',
      paragraphs: [
        'Commonly invoked statutes include the Indian Contract Act, Transfer of Property Act, Specific Relief Act, Indian Evidence Act, and other subject-specific civil laws.',
        'Legal strategy depends on fact pattern, documentary record, limitation, and the correct statutory remedy sought.',
      ],
    },
    {
      heading: 'Remedies Available under Civil Law',
      paragraphs: [
        'Civil remedies include damages, injunctions, specific performance, restitution, declaratory relief, rescission, and equitable orders as applicable.',
        'Choice of remedy depends on the nature of breach, urgency, irreparable harm, and enforceability goals.',
      ],
    },
    {
      heading: 'Role of Civil Lawyers',
      paragraphs: [
        'Civil lawyers analyze facts, draft pleadings, strategize legal remedy, represent clients in court, and negotiate settlements where suitable.',
        'They also manage evidence, interim relief applications, execution proceedings, and appeal strategy.',
      ],
    },
    {
      heading: 'How Grover & Grover, Advocates Help in Civil Matters',
      paragraphs: [
        'Grover & Grover, Advocates and Solicitors, provides end-to-end support in civil disputes including case assessment, documentation, filing, hearing advocacy, and post-order execution strategy.',
        'Our approach combines legal rigor, procedural discipline, and practical dispute-resolution outcomes.',
      ],
    },
  ],
  documentChecklist: [
    'Identity and address proof of parties',
    'Contractual/transaction documents and correspondence',
    'Property/ownership documents where relevant',
    'Notices, replies, and evidence of service',
    'Photographs, witness details, and supporting records',
    'Prior orders/proceedings documents (if any)',
  ],
  popularCases: [
    'K.S. Puttaswamy vs Union of India (2017)',
    'M.C. Mehta vs Union of India (1986)',
    'Mohd. Ahmed Khan vs Shah Bano Begum (1985)',
    'Ram Janmabhoomi vs Babri Masjid (2010)',
  ],
  faqs: [
    { question: 'What is civil law?', answer: 'Civil law governs legal relationships and disputes between private parties, including rights, obligations, and remedies.' },
    { question: 'What disputes are covered by civil law?', answer: 'Typical disputes include contracts, property, tort claims, family issues, money recovery, and related private rights.' },
    { question: 'What is the difference between civil and criminal law?', answer: 'Civil law resolves private disputes; criminal law concerns offenses against the state and public order.' },
    { question: 'How do I file a civil case?', answer: 'A case is filed through plaint/petition with supporting documents before the competent court under procedural law.' },
    { question: 'What remedies are available?', answer: 'Remedies may include damages, injunctions, specific performance, declaration, restitution, and other lawful reliefs.' },
    { question: 'Can civil disputes be settled outside court?', answer: 'Yes, many civil disputes can be resolved via negotiation, mediation, or settlement depending on facts and consent.' },
  ],
};

const CONTRACT_SLUGS = new Set(['contract-lawyer', 'contract-disputes']);

const CONTRACT_KEYWORDS = [
  'Contract Lawyer Fees in Delhi',
  'Business Contract Lawyer near me',
  'Contract Lawyer consultation in Delhi',
  'business lawyer near me',
  'corporate lawyer near me',
  'commercial lawyer near me',
  'Best Commercial Lawyers in Delhi',
  'Top Commercial Lawyers in India',
  'Top Business Lawyers in High Court',
  'Top Business Lawyers in Supreme Court',
  'company lawyers near me',
  'Corporate law firms near me',
];

const CONTRACT_OVERRIDES = {
  title: 'Contract Lawyer in Delhi - GAG Lawyers',
  description:
    'Contract Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  subtitle:
    'Contract Lawyer in Delhi. We advise on contract drafting, interpretation, breach disputes, damages, specific performance, and business risk allocation.',
  contentBlocks: [
    {
      heading: 'Contract Dispute Cases',
      paragraphs: [
        'Contract law in India governs enforceable agreements between individuals, businesses, and entities under the Indian Contract Act, 1872 and related commercial statutes.',
        'It regulates formation, consent, consideration, capacity, obligations, performance, breach, and available legal remedies.',
      ],
    },
    {
      heading: 'Types of Disputes in Contract Cases',
      paragraphs: [
        'Common disputes include breach of contract, delayed/non-performance, defective performance, interpretation disputes, warranty disputes, and damages claims.',
        'Many disputes are resolved through negotiation or arbitration, while others proceed through court litigation depending on contract terms.',
      ],
    },
    {
      heading: 'Acts and Provisions in Contract Disputes',
      paragraphs: [
        'Key laws include the Indian Contract Act, Sale of Goods Act, Partnership Act, Evidence Act, and where relevant consumer, arbitration, and penal provisions.',
        'Court analysis often turns on contractual clauses, documentary evidence, and compliance with legal enforceability standards.',
      ],
    },
    {
      heading: 'Rights and Obligations under Contract Law',
      paragraphs: [
        'Parties must act with free consent, lawful object, and perform obligations in good faith within agreed timelines and terms.',
        'In case of breach, the aggrieved party may seek damages, specific performance, injunctions, rescission, or other suitable relief.',
      ],
    },
    {
      heading: 'Documents Required for Contract Cases',
      paragraphs: [
        'Essential records include executed contract drafts, amendments, invoices, communication trail, notices, payment records, and documentary proof of breach/loss.',
        'Well-structured documentation is critical for maintainability, claim quantification, and successful enforcement.',
      ],
    },
    {
      heading: 'Role of Contract Lawyer',
      paragraphs: [
        'A contract lawyer drafts and reviews agreements, identifies risk clauses, advises on compliance, and represents parties in dispute resolution and litigation.',
        'Counsel also handles negotiation strategy, settlement structuring, and evidence-driven courtroom advocacy.',
      ],
    },
    {
      heading: 'How Grover & Grover, Advocates Help in Contract Disputes',
      paragraphs: [
        'Grover & Grover, Advocates and Solicitors, assists with contract drafting, breach analysis, demand notices, arbitration/court strategy, and end-to-end representation.',
        'Our team focuses on enforceability, risk control, and commercially practical outcomes for each dispute.',
      ],
    },
  ],
  documentChecklist: [
    'Signed contract and all amendments/addenda',
    'Purchase/work orders, invoices, and payment proofs',
    'Emails, notices, meeting records, and correspondence',
    'Delivery/completion records and performance evidence',
    'Loss computation documents and supporting statements',
    'Any arbitration/DR clauses and prior legal notices',
  ],
  popularCases: [
    'Keshavlal Laxmidas & Co. Vs. Union of India',
    'State of Gujarat vs. Vadilal Sarabhai',
    'P.G. Narayana & Co. Vs. State of Kerala',
    'Indian Oil Corp. Ltd. Vs. State of Rajasthan',
  ],
  faqs: [
    { question: 'What is contract law in India?', answer: 'It governs formation, validity, performance, and enforcement of agreements between parties.' },
    { question: 'What are essential elements of a valid contract?', answer: 'Offer and acceptance, lawful consideration, capacity, free consent, lawful object, and certainty of terms.' },
    { question: 'What remedies are available for breach?', answer: 'Damages, specific performance, injunction, restitution, and related legal remedies depending on the case.' },
    { question: 'What is limitation for breach of contract suit?', answer: 'Generally three years from breach, subject to facts and applicable limitation provisions.' },
    { question: 'Can oral contracts be enforced?', answer: 'Yes in many cases, but enforceability depends on proof, statutory requirements, and subject matter.' },
    { question: 'Can contract disputes be settled outside court?', answer: 'Yes, parties may resolve through negotiation, mediation, or arbitration depending on contract terms.' },
  ],
};

const AFT_OVERRIDES = {
  title: 'Armed Force Tribunal Lawyer - GAG Lawyers',
  description:
    'Armed Force Tribunal Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
  subtitle:
    'Specialized representation for Armed Forces Tribunal matters including service disputes, pension claims, court martial appeals, and disciplinary proceedings.',
  image:
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=80',
  contentBlocks: [
    {
      heading: 'Armed Forces Tribunal Matters (AFT Matters)',
      paragraphs: [
        'The Armed Forces Tribunal (AFT) is a specialised judicial body established under the Armed Forces Tribunal Act, 2007 for adjudicating disputes and complaints related to members of the armed forces. Individuals commonly search for an Aft lawyer or an Armed Force Tribunal Lawyer near me for service-related matters.',
        'AFT jurisdiction includes service law disputes involving recruitment, promotion, pay and allowances, seniority, pension, wrongful discharge or termination, and appeals arising from court martial proceedings. The tribunal can grant effective relief, including reinstatement and compensation in appropriate cases.',
      ],
    },
    {
      heading: 'Functions of Armed Forces Tribunal',
      paragraphs: [
        'The tribunal provides a dedicated judicial forum to ensure fair and impartial adjudication of armed forces matters. It hears service disputes, disciplinary challenges, and other legal issues connected with military administration.',
        'AFT proceedings often involve complex service law and procedural requirements. Engaging a Lawyer for Armed Force Tribunal Disputes or a Top Armed Force Tribunal Lawyer in India can significantly improve case strategy and outcome.',
      ],
    },
    {
      heading: 'Rights & Remedies Available Under AFT Act',
      paragraphs: [
        'Relief before the tribunal may include correction of service records, setting aside adverse orders, restoration of rank/benefits, compensation claims, and related declaratory relief depending on the facts of the case.',
        'Case preparation generally requires robust documentation, legal drafting, and precise presentation of factual chronology. Many clients seek guidance on aft lawyer fees before initiating proceedings.',
      ],
    },
    {
      heading: 'File Appeal With the Armed Forces Tribunal',
      paragraphs: [
        'Appeals and applications before AFT require a structured filing approach: complete pleadings, supporting records, proper sequencing of annexures, and timely compliance with procedural directions.',
        'A well-prepared petition with affidavits and evidence is essential. If relief is denied, clients may pursue further legal remedies based on the case posture and applicable appellate forum.',
      ],
    },
    {
      heading: 'Role of Lawyer in Armed Forces Tribunal',
      paragraphs: [
        'An experienced AFT lawyer drafts and files applications, presents evidence, cross-examines witnesses where required, and argues service law issues effectively before the tribunal.',
        'Legal counsel also assists in compensation claims, pension disputes, wrongful discharge challenges, and strategic appellate advice before the High Court/Supreme Court where maintainable.',
      ],
    },
    {
      heading: 'How Grover & Grover, Advocates Help in AFT Cases',
      paragraphs: [
        'Grover & Grover, Advocates and Solicitors, assists clients at each stage of AFT litigation: case assessment, documentation review, pleadings, tribunal appearance, and follow-up appellate strategy.',
        'Clients often engage us for comprehensive representation when searching for Best Armed Force Tribunal Lawyers, Best Advocates for Armed Force Tribunal Cases, or Lawyer for Armed Force Tribunal Matters.',
      ],
    },
  ],
  documentChecklist: [
    'Service records, appointment/commission letters, and promotion history',
    'Impugned orders, show-cause notices, court martial records, and departmental communication',
    'Pension and pay-related statements (where applicable)',
    'Identity proof, address proof, and authority documents',
    'Detailed chronology and relevant supporting correspondence',
  ],
  faqs: [
    {
      question: 'What is the Armed Forces Tribunal (AFT)?',
      answer:
        'The AFT is a quasi-judicial body established under the Armed Forces Tribunal Act, 2007 to hear service matters and related disputes of armed forces personnel, including retired personnel.',
    },
    {
      question: 'Who can approach the Armed Forces Tribunal?',
      answer:
        'Serving and retired armed forces personnel, including officers, JCOs, and other ranks, can approach AFT for service-related grievances.',
    },
    {
      question: 'What matters are heard by AFT?',
      answer:
        'AFT hears disputes related to promotions, postings, transfers, pay, pension, retirement benefits, disciplinary action, court martial matters, and connected service law issues.',
    },
    {
      question: 'What is the limitation period for filing before AFT?',
      answer:
        'Typically, cases are filed within 3 months from the cause of action. Delay condonation may be sought with sufficient reasons.',
    },
    {
      question: 'Can a lawyer represent me before AFT?',
      answer:
        'Yes. A qualified lawyer can represent you before AFT and help with pleadings, evidence, arguments, and appellate strategy.',
    },
    {
      question: 'Can AFT orders be challenged?',
      answer:
        'Yes, subject to law and case facts, parties may pursue appellate or constitutional remedies before higher courts.',
    },
  ],
};

const SafeImage = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`${className} flex items-center justify-center bg-slate-200`}>
        <span className="font-serif text-xl text-slate-600">GAG</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
};

const ServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`);
        const data = await response.json();
        
        if (data.success && data.data) {
          const foundService = data.data.find(s => s.slug === slug);
          
          if (foundService) {
            setService(foundService);
            
            // Get related services from same category
            const related = data.data
              .filter(s => s.category === foundService.category && s.slug !== slug)
              .slice(0, 3);
            setRelatedServices(related);
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug, navigate]);

  if (loading || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const normalizedSlug = String(slug || '').toLowerCase();
  const isAftService =
    AFT_SLUGS.has(normalizedSlug) ||
    /armed force|armed forces|aft/i.test(service.name || '') ||
    normalizedSlug.includes('armed-force-tribunal');
  const isBailService =
    BAIL_SLUGS.has(normalizedSlug) ||
    /bail lawyer/i.test(service.name || '') ||
    normalizedSlug.includes('bail-lawyer');
  const isCatService =
    CAT_SLUGS.has(normalizedSlug) ||
    /cat matters lawyer|central administrative tribunal|\bcat\b/i.test(service.name || '') ||
    normalizedSlug.includes('cat-matters-lawyer') ||
    normalizedSlug.includes('cat-central-administrative-tribunal');
  const isChequeService =
    CHEQUE_SLUGS.has(normalizedSlug) ||
    /cheque bounce/i.test(service.name || '') ||
    normalizedSlug.includes('cheque-bounce-lawyer') ||
    normalizedSlug.includes('cheque-bounce');
  const isCivilService =
    CIVIL_SLUGS.has(normalizedSlug) ||
    /civil lawyer|civil law/i.test(service.name || '') ||
    normalizedSlug.includes('civil-lawyer') ||
    normalizedSlug.includes('civil-law-disputes');
  const isContractService =
    CONTRACT_SLUGS.has(normalizedSlug) ||
    /contract lawyer|contract dispute/i.test(service.name || '') ||
    normalizedSlug.includes('contract-lawyer') ||
    normalizedSlug.includes('contract-disputes');
  const hasSpecialService = isAftService || isBailService || isCatService || isChequeService || isCivilService || isContractService;

  const heroImage = isAftService ? AFT_OVERRIDES.image : (CATEGORY_IMAGES[service.category] || CATEGORY_IMAGES.civil);

  const seoTitle = isAftService
    ? AFT_OVERRIDES.title
    : isBailService
    ? BAIL_OVERRIDES.title
    : isCatService
    ? CAT_OVERRIDES.title
    : isChequeService
    ? CHEQUE_OVERRIDES.title
    : isCivilService
    ? CIVIL_OVERRIDES.title
    : isContractService
    ? CONTRACT_OVERRIDES.title
    : `${service.name} - Expert Legal Services | Grover & Grover Advocates`;
  const seoDescription = isAftService
    ? AFT_OVERRIDES.description
    : isBailService
    ? BAIL_OVERRIDES.description
    : isCatService
    ? CAT_OVERRIDES.description
    : isChequeService
    ? CHEQUE_OVERRIDES.description
    : isCivilService
    ? CIVIL_OVERRIDES.description
    : isContractService
    ? CONTRACT_OVERRIDES.description
    : (service.longDescription || service.shortDescription || service.overview);
  const seoKeywords = isAftService
    ? `${AFT_KEYWORDS.join(', ')}, ${AFT_KEYWORDS.join(', ')}`
    : isBailService
    ? `${BAIL_KEYWORDS.join(', ')}, ${BAIL_KEYWORDS.join(', ')}`
    : isCatService
    ? `${CAT_KEYWORDS.join(', ')}, ${CAT_KEYWORDS.join(', ')}`
    : isChequeService
    ? `${CHEQUE_KEYWORDS.join(', ')}, ${CHEQUE_KEYWORDS.join(', ')}`
    : isCivilService
    ? `${CIVIL_KEYWORDS.join(', ')}, ${CIVIL_KEYWORDS.join(', ')}`
    : isContractService
    ? `${CONTRACT_KEYWORDS.join(', ')}, ${CONTRACT_KEYWORDS.join(', ')}`
    : `${service.name}, legal services, ${service.category}, advocates, lawyers`;

  // FAQ data for the service
  const faqs = [
    {
      question: `How can I schedule a ${service.name.toLowerCase()} consultation?`,
      answer: `You can schedule a consultation by visiting our contact page, calling our office, or clicking the button below. We typically respond within 24 hours. Our experienced ${service.name.toLowerCase()} lawyers will discuss your specific situation and provide expert guidance.`
    },
    {
      question: `What are your consultation fees for ${service.category} cases?`,
      answer: `Our consultation fees vary based on the complexity of your case. Contact us for a formal quote, or enjoy your first consultation free. We believe in transparent pricing and will discuss all costs upfront before proceeding.`
    },
    {
      question: `How experienced is your team in ${service.name.toLowerCase()}?`,
      answer: `Our team has over 20+ years of combined experience in ${service.category} law, with a proven track record of successful cases and satisfied clients. We stay updated with the latest legal developments to ensure the best representation.`
    },
    {
      question: `What is your success rate in ${service.name.toLowerCase()} cases?`,
      answer: `We maintain a 98% success rate in our cases. Our commitment to thorough preparation, legal excellence, and understanding client needs drives these exceptional results.`
    },
    {
      question: `How long does a typical ${service.name.toLowerCase()} case take?`,
      answer: `The duration varies depending on case complexity, court schedules, and specific circumstances. During your consultation, our lawyers will provide a realistic timeline and explain the process at each stage.`
    }
  ];
  const displayFaqs = isAftService
    ? AFT_OVERRIDES.faqs
    : isBailService
    ? BAIL_OVERRIDES.faqs
    : isCatService
    ? CAT_OVERRIDES.faqs
    : isChequeService
    ? CHEQUE_OVERRIDES.faqs
    : isCivilService
    ? CIVIL_OVERRIDES.faqs
    : isContractService
    ? CONTRACT_OVERRIDES.faqs
    : faqs;
  const specialContentBlocks = isAftService
    ? AFT_OVERRIDES.contentBlocks
    : isBailService
    ? BAIL_OVERRIDES.contentBlocks
    : isCatService
    ? CAT_OVERRIDES.contentBlocks
    : isChequeService
    ? CHEQUE_OVERRIDES.contentBlocks
    : isCivilService
    ? CIVIL_OVERRIDES.contentBlocks
    : isContractService
    ? CONTRACT_OVERRIDES.contentBlocks
    : [];
  const specialDocChecklist = isAftService
    ? AFT_OVERRIDES.documentChecklist
    : isBailService
    ? BAIL_OVERRIDES.documentChecklist
    : isCatService
    ? CAT_OVERRIDES.documentChecklist
    : isChequeService
    ? CHEQUE_OVERRIDES.documentChecklist
    : isCivilService
    ? CIVIL_OVERRIDES.documentChecklist
    : isContractService
    ? CONTRACT_OVERRIDES.documentChecklist
    : [];
  const specialPopularCases = isBailService
    ? BAIL_OVERRIDES.popularCases
    : isCatService
    ? CAT_OVERRIDES.popularCases
    : isChequeService
    ? CHEQUE_OVERRIDES.popularCases
    : isCivilService
    ? CIVIL_OVERRIDES.popularCases
    : isContractService
    ? CONTRACT_OVERRIDES.popularCases
    : [];

  return (
    <div className="bg-slate-50">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />

      {/* HERO SECTION */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage src={heroImage} alt={`${service.name} legal service`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/60"></div>
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-300">
              <Link to="/" className="hover:text-gold transition">Home</Link>
              <ChevronRight size={16} />
              <Link to="/services" className="hover:text-gold transition">Services</Link>
              <ChevronRight size={16} />
              <span className="text-gold">{service.name}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {isAftService
                ? 'Armed Force Tribunal Lawyer'
                : isBailService
                ? 'Bail Lawyer'
                : isCatService
                ? 'CAT Matters Lawyer'
                : isChequeService
                ? 'Cheque Bounce Lawyer'
                : isCivilService
                ? 'Civil Lawyer'
                : isContractService
                ? 'Contract Lawyer'
                : service.name}
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {isAftService
                ? AFT_OVERRIDES.subtitle
                : isBailService
                ? BAIL_OVERRIDES.subtitle
                : isCatService
                ? CAT_OVERRIDES.subtitle
                : isChequeService
                ? CHEQUE_OVERRIDES.subtitle
                : isCivilService
                ? CIVIL_OVERRIDES.subtitle
                : isContractService
                ? CONTRACT_OVERRIDES.subtitle
                : service.shortDescription}
            </p>

            <a href={`tel:${FALLBACK_PHONE}`}>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-sans font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105">
                Talk to Lawyer
                <ArrowRight size={20} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-y border-slate-200 py-6">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, label: '20+ Years Experience' },
            { icon: Scale, label: 'Service Law Specialists' },
            { icon: Gavel, label: 'High Court & AFT Strategy' },
            { icon: FileText, label: 'Document-Driven Litigation' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center justify-center gap-2 text-slate-700 font-medium text-sm">
                <Icon size={18} className="text-gold" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-8">
              {isAftService
                ? 'Armed Forces Tribunal Matters (AFT Matters)'
                : isBailService
                ? 'Bail Cases'
                : isCatService
                ? 'CAT Matters'
                : isChequeService
                ? 'Cheque Bounce'
                : isCivilService
                ? 'Civil Law'
                : isContractService
                ? 'Contract Dispute Cases'
                : 'Overview'}
            </h2>
            <p className="font-sans text-lg text-gray-700 leading-relaxed mb-8">
              {isAftService
                ? AFT_OVERRIDES.contentBlocks[0].paragraphs[0]
                : isBailService
                ? BAIL_OVERRIDES.contentBlocks[0].paragraphs[0]
                : isCatService
                ? CAT_OVERRIDES.contentBlocks[0].paragraphs[0]
                : isChequeService
                ? CHEQUE_OVERRIDES.contentBlocks[0].paragraphs[0]
                : isCivilService
                ? CIVIL_OVERRIDES.contentBlocks[0].paragraphs[0]
                : isContractService
                ? CONTRACT_OVERRIDES.contentBlocks[0].paragraphs[0]
                : service.overview}
            </p>
            {hasSpecialService && (
              <p className="font-sans text-lg text-gray-700 leading-relaxed">
                {specialContentBlocks[0].paragraphs[1]}
              </p>
            )}
            {isBailService && specialContentBlocks[0].paragraphs[2] && (
              <p className="mt-8 font-sans text-lg text-gray-700 leading-relaxed">
                {specialContentBlocks[0].paragraphs[2]}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Special Detailed Content */}
      {hasSpecialService && (
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {specialContentBlocks.slice(1).map((block, idx) => (
              <article key={block.heading} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h3 className="font-serif text-3xl font-bold text-navy mb-5">{block.heading}</h3>
                <div className="space-y-4">
                  {block.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx} className="font-sans text-gray-700 leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {isAftService && idx === 1 && (
                  <div className="mt-6 rounded-xl overflow-hidden border border-slate-200">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80"
                      alt="Armed Forces Tribunal legal documentation"
                      className="w-full aspect-[21/9] object-cover"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* TYPES OF CASES SECTION */}
      {service.typesOfCases && service.typesOfCases.length > 0 && (
        <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-6 mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy">
                Types of Cases We Handle
              </h2>
              <div className="hidden md:flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-wide text-navy">
                Curated by Senior Counsel
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.typesOfCases.map((caseType, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-gold via-gold/70 to-transparent" />
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-navy text-white font-semibold text-sm">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                        {caseType}
                      </h3>
                      <p className="mt-2 font-sans text-sm text-slate-600">
                        Strategic representation, compliance-focused drafting, and strong tribunal/court advocacy.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DOCUMENTS SECTION */}
      {hasSpecialService && (
        <section className="bg-[#0f172a] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-gold mb-3">
                {isAftService
                  ? 'AFT Filing Toolkit'
                  : isBailService
                  ? 'Bail Filing Toolkit'
                  : isCatService
                  ? 'CAT Filing Toolkit'
                  : isChequeService
                  ? 'Cheque Bounce Filing Toolkit'
                  : isCivilService
                  ? 'Civil Filing Toolkit'
                  : 'Contract Filing Toolkit'}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                {isAftService
                  ? 'Document Required For Armed Forces Tribunal'
                  : isBailService
                  ? 'Documents Required for Bail and Parole Matters'
                  : isCatService
                  ? 'Documents Required for CAT Matters'
                  : isChequeService
                  ? 'Documents Required for Cheque Bounce Cases'
                  : isCivilService
                  ? 'Documents Required for Civil Cases'
                  : 'Documents Required for Contract Disputes'}
              </h2>
              <p className="font-sans text-slate-300 text-lg max-w-3xl">
                Keep these records ready before filing. Complete documentation improves filing quality and reduces procedural delays.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialDocChecklist.map((doc, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                      <p className="font-sans text-slate-100">{doc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <aside className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <SafeImage
                  src={isAftService
                    ? 'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=800&q=80'
                    : isBailService
                    ? 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=80'
                    : isCatService
                    ? 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'
                    : isChequeService
                    ? 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
                    : isCivilService
                    ? 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=800&q=80'
                    : 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'}
                  alt={isAftService
                    ? 'Legal case documents prepared for AFT filing'
                    : isBailService
                    ? 'Legal case documents prepared for bail filing'
                    : isCatService
                    ? 'Legal case documents prepared for CAT filing'
                    : isChequeService
                    ? 'Legal case documents prepared for cheque bounce filing'
                    : isCivilService
                    ? 'Legal case documents prepared for civil filing'
                    : 'Legal case documents prepared for contract dispute filing'}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-serif text-xl text-white mb-2">Professional Document Review</h3>
                  <p className="font-sans text-sm text-slate-300 leading-relaxed">
                    Our team validates document sequence, affidavit support, and annexure consistency before filing.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* BAIL POPULAR CASES */}
      {(isBailService || isCatService || isChequeService || isCivilService || isContractService) && specialPopularCases.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-12">
              {isBailService
                ? 'Popular Cases of Supreme Court and High Court Related To Bail Cases'
                : isCatService
                ? 'Popular Cases of Supreme Court and High Court Related to CAT Matters'
                : isCivilService
                ? 'Popular Cases in Supreme Court and High Court Related To Civil Law Matters'
                : isContractService
                ? 'Popular Cases of Supreme Court and High Court Related To Contract Dispute Cases'
                : 'Popular Cases in Supreme Court and High Court'}
            </h2>
            <div className="space-y-4">
              {specialPopularCases.map((caseName, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <Check className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="font-sans text-slate-700">{caseName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEGAL PROCESS SECTION */}
      {service.process && service.process.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-12">
              Our Legal Process
            </h2>
            
            <div className="space-y-6">
              {service.process.map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gold text-navy font-serif font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-xl font-bold text-navy mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-gray-700">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US SECTION */}
      {service.keyPoints && service.keyPoints.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-12">
              Why Choose Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.keyPoints.map((point, idx) => (
                <div key={idx} className="flex gap-4">
                  <Check className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <p className="font-sans text-lg text-gray-700">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION - Improved Layout */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our {service.name.toLowerCase()} services
            </p>
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            {displayFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="max-w-3xl mx-auto p-8 lg:p-12 bg-gradient-to-r from-navy/10 to-gold/10 rounded-lg border-l-4 border-gold text-center">
            <h3 className="font-serif text-2xl font-bold text-navy mb-4">
              Still Have Questions?
            </h3>
            <p className="font-sans text-gray-700 mb-6">
              Our legal experts are ready to provide personalized guidance for your specific situation.
            </p>
            <Link to="/contact">
              <button className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-all duration-200 hover:shadow-lg">
                Schedule Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-navy to-navy/80 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-sans text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our {service.name} experts today. We're here to help you navigate legal complexities with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="px-8 py-4 bg-gold text-navy font-sans font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105 flex items-center justify-center gap-2">
                Schedule Consultation
                <ArrowRight size={20} />
              </button>
            </Link>
            <a href={`tel:${FALLBACK_PHONE}`}>
              <button className="px-8 py-4 bg-transparent text-white font-sans font-semibold rounded-md border-2 border-white/30 transition-all duration-200 hover:bg-white/10">
                Talk to Lawyer
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES SECTION */}
      {relatedServices.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-12">
              Related Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  to={`/services/${relatedService.slug}`}
                  className="group"
                >
                  <div className="h-full bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gold/50 hover:-translate-y-1">
                    <h3 className="font-serif text-xl font-bold text-navy mb-3 group-hover:text-gold transition">
                      {relatedService.name}
                    </h3>
                    <p className="font-sans text-gray-600 mb-4 text-sm">
                      {relatedService.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-gold font-semibold text-sm">
                  View Service Details
                  <ChevronRight size={16} />
                </div>
              </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServicePage;

