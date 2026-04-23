require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const TARGET_SERVICE_SLUGS = [
  'bail-lawyer',
  'cheque-bounce-lawyer',
  'civil-lawyer',
  'agreement-to-sell',
  'human-rights-lawyer',
  'landlord-tenant-lawyer',
  'legal-notice-lawyer',
  'marriage-registration-lawyer',
  'mediation-and-arbitration-lawyer',
  'motor-accident-lawyer',
  'armed-force-tribunal-lawyer',
  'cat-matters-lawyer',
  'consumer-court-lawyer',
  'dowry-lawyer',
  'food-and-drug-lawyer',
  'labour-lawyer',
  'media-and-broadcasting-lawyer',
  'medical-negligence-lawyer',
  'sexual-harassment-lawyer',
  'supreme-court-lawyer',
];

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const normalizeItems = (items) =>
  items.map((item) => ({
    title: item.title,
    description: item.description,
  }));

const normalizeSteps = (steps) =>
  steps.map((step, idx) => ({
    stepNumber: idx + 1,
    title: step.title,
    description: step.description,
  }));

const normalizeFaq = (items) =>
  items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

async function getServiceSections(serviceId) {
  return ServiceSection.find({ serviceId }).sort({ order: 1 }).lean();
}

async function upsertSection(serviceId, cache, payload) {
  const { heading, type = 'overview', background = 'light', content, matchers = [] } = payload;
  const defaultMatcher = new RegExp(`^${escapeRegExp(heading)}$`, 'i');
  const allMatchers = [defaultMatcher, ...matchers];
  const existing = cache.find((section) =>
    allMatchers.some((matcher) => matcher.test(section.heading || ''))
  );

  if (existing) {
    await ServiceSection.updateOne(
      { _id: existing._id },
      {
        $set: {
          heading,
          type,
          background,
          content,
        },
      }
    );
    existing.heading = heading;
    existing.type = type;
    existing.background = background;
    existing.content = content;
    return { action: 'updated', id: existing._id };
  }

  const nextOrder =
    cache.length > 0 ? Math.max(...cache.map((section) => Number(section.order) || 0)) + 1 : 0;
  const created = await ServiceSection.create({
    serviceId,
    heading,
    type,
    background,
    content,
    order: nextOrder,
    visible: true,
  });

  cache.push({
    _id: created._id,
    heading,
    type,
    background,
    content,
    order: nextOrder,
    visible: true,
  });

  return { action: 'created', id: created._id };
}

async function ensureServiceSlugCanonical() {
  const canonical = await Service.findOne({ slug: 'legal-notice-lawyer' });
  if (canonical) return canonical;

  const legacy = await Service.findOne({ slug: 'legal-notice' });
  if (!legacy) return null;

  legacy.slug = 'legal-notice-lawyer';
  await legacy.save();
  return legacy;
}

async function patchHowGroverHeadings() {
  const affected = [
    'human-rights-lawyer',
    'landlord-tenant-lawyer',
    'marriage-registration-lawyer',
    'consumer-court-lawyer',
    'dowry-lawyer',
    'food-and-drug-lawyer',
    'labour-lawyer',
    'media-and-broadcasting-lawyer',
    'medical-negligence-lawyer',
  ];

  for (const slug of affected) {
    const service = await Service.findOne({ slug }).select('_id').lean();
    if (!service) continue;

    await ServiceSection.updateMany(
      {
        serviceId: service._id,
        heading: { $regex: /(How Grover|Grover\s*&\s*Grover)/i },
      },
      {
        $set: {
          heading: 'How Grover & Grover Advocates Help You',
        },
      }
    );
  }

  const consumer = await Service.findOne({ slug: 'consumer-court-lawyer' }).select('_id').lean();
  if (consumer) {
    await ServiceSection.updateMany(
      {
        serviceId: consumer._id,
        heading: { $regex: /^Documents Required/i },
      },
      {
        $set: {
          heading: 'Documents Required to File Your Case',
        },
      }
    );
  }
}

async function patchLegalNotice(service) {
  const cache = await getServiceSections(service._id);

  await upsertSection(service._id, cache, {
    heading: 'What is a Legal Notice?',
    type: 'overview',
    content: {
      body: 'A legal notice is a formal written communication sent to a person, business, or institution to notify them of a legal grievance and seek resolution before litigation. It clearly states the facts, legal basis, and expected remedy within a defined response period.',
    },
    matchers: [/Lawyer for Legal Notice Expertise/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Types of Legal Notices',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Demand Notice', description: 'Sent for unpaid dues, contractual defaults, and monetary recovery claims.' },
        { title: 'Eviction Notice', description: 'Issued in tenancy disputes for breach, unauthorized occupation, or non-payment of rent.' },
        { title: 'Employment Notice', description: 'Used for wrongful termination, breach of employment terms, and service disputes.' },
        { title: 'Defamation Notice', description: 'Served to seek retraction and damages for false or harmful statements.' },
        { title: 'Consumer Notice', description: 'Sent for deficiency in services, defective products, or unfair trade practices.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Process of Sending a Legal Notice',
    type: 'process',
    content: {
      steps: normalizeSteps([
        { title: 'Drafting', description: 'Prepare a precise notice with facts, legal grounds, and relief sought.' },
        { title: 'Review', description: 'Validate evidence, chronology, and legal references before dispatch.' },
        { title: 'Dispatch', description: 'Send via traceable mode such as speed post, courier, or verified electronic method.' },
        { title: 'Acknowledgement', description: 'Preserve proof of delivery/attempted delivery and communication records.' },
        { title: 'Response Period', description: 'Allow reasonable time for response before initiating formal proceedings.' },
      ]),
    },
    matchers: [/Importance of Professional Legal Notices/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Documents Required',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Dispute Details', description: 'Clear chronology of events, claims, and legal issues.' },
        { title: 'Identity Proof', description: 'Basic identification documents of the sender/authorized representative.' },
        { title: 'Supporting Contracts/Agreements', description: 'Copies of contracts, terms, invoices, or transaction records.' },
        { title: 'Correspondence History', description: 'Emails, messages, letters, and prior reminders relevant to the dispute.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'What Happens After a Legal Notice',
    type: 'overview',
    content: {
      body: 'After receipt, the opposite party may accept, deny, negotiate, or ignore the notice. Non-response can strengthen the sender’s position and may be followed by civil/criminal proceedings, depending on the nature of the claim.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'How Grover & Grover Advocates Help with Legal Notices',
    type: 'overview',
    content: {
      body: 'Our team assists with strategic drafting, evidence-backed claim structuring, response management, and follow-through litigation planning. We ensure notices are legally strong, procedurally valid, and aligned with your long-term case strategy.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Frequently Asked Questions',
    type: 'faq',
    content: {
      items: normalizeFaq([
        { question: 'What is the cost of sending a legal notice?', answer: 'Costs vary by complexity, urgency, and documentation volume. A transparent fee estimate is shared before drafting.' },
        { question: 'How long does it take to send a legal notice?', answer: 'Most notices are prepared and dispatched within a few working days after document review.' },
        { question: 'What if the other party ignores the legal notice?', answer: 'Ignoring a notice can be used as adverse conduct and may lead to court action based on the dispute type.' },
        { question: 'Is replying to a legal notice mandatory?', answer: 'Not always mandatory, but a prompt, legally sound reply is strongly advisable to protect legal rights.' },
        { question: 'Is there a fixed format for legal notices in India?', answer: 'There is no universal template, but notices must contain correct facts, legal basis, and clear relief sought.' },
      ]),
    },
    matchers: [/Frequently Asked Questions/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Popular Cases in Supreme Court and High Court Related to Legal Notices',
    type: 'benefits',
    content: {
      items: normalizeItems([
        {
          title: 'Central Bank of India v. Saxons Farms (1999) (SC)',
          description: 'Clarified legal notice and demand requirements in debt recovery context before legal proceedings.',
        },
        {
          title: 'Kusum Ingots & Alloys Ltd. v. Union of India (2004) (SC)',
          description: 'Discussed cause of action components and significance of legal communications for jurisdictional purposes.',
        },
        {
          title: 'Nopany Investments Pvt. Ltd. v. Santokh Singh (2008) (SC)',
          description: 'Addressed notice requirements in tenancy-related disputes and procedural compliance.',
        },
      ]),
    },
    matchers: [/Case Studies|Popular Cases/i],
  });
}

async function patchBail(service) {
  const cache = await getServiceSections(service._id);
  await upsertSection(service._id, cache, {
    heading: 'Documents Required to File a Bail Application',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'FIR Copy', description: 'Primary criminal record required to frame the bail application facts.' },
        { title: 'Arrest Memo', description: 'Custody and arrest detail document relevant for judicial review.' },
        { title: 'Identity Proof of Accused', description: 'Government-issued ID to establish identity and personal details.' },
        { title: 'Bail Application Draft', description: 'Structured legal pleading with grounds for regular/anticipatory bail.' },
        { title: 'Surety Documents', description: 'Surety affidavits, financial details, and undertaking documents.' },
        { title: 'Address Proof of Surety', description: 'Residential proof for surety verification by court.' },
        { title: 'Character Certificate (if applicable)', description: 'Used in suitable matters to support conduct-based arguments.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Role of Bail Lawyer in Bail Cases | Role of Parole Lawyer in Parole Cases',
    type: 'overview',
    content: {
      body: 'Bail Representation: preparing accurate applications, presenting facts before Magistrate/Sessions/High Court/Supreme Court, and handling anticipatory bail strategy.\n\nParole Representation: assessing eligibility, preparing parole submissions, coordinating with prison/parole authorities, and representing applicants before the parole board for lawful temporary release.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Popular Cases of Supreme Court and High Court Related to Bail Cases',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Satender Kumar Antil v. CBI (2022) (SC)', description: 'Laid down structured guidelines for grant of bail and liberty-oriented criminal process.' },
        { title: 'Arnesh Kumar v. State of Bihar (2014) (SC)', description: 'Set arrest safeguards and emphasized procedural restraint in routine arrests.' },
        { title: 'Sushila Aggarwal v. State (NCT of Delhi) (2020) (SC)', description: 'Clarified anticipatory bail scope and duration principles.' },
      ]),
    },
  });
}

async function patchChequeBounce(service) {
  const cache = await getServiceSections(service._id);
  await upsertSection(service._id, cache, {
    heading: 'Popular Cases in Supreme Court and High Court',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Meters and Instruments Pvt. Ltd. v. Kanchan Mehta (2017) (SC)', description: 'Recognized pragmatic compounding approach in Section 138 NI Act cases.' },
        { title: 'Rangappa v. Sri Mohan (2010) (SC)', description: 'Strengthened statutory presumption under Section 139 NI Act.' },
        { title: 'MSR Leathers v. S. Palaniappan (2013) (SC)', description: 'Allowed prosecution on subsequent dishonour events within legal limits.' },
      ]),
    },
  });
}

async function patchCivil(service) {
  const cache = await getServiceSections(service._id);
  await upsertSection(service._id, cache, {
    heading: 'Popular Cases in Supreme Court and High Court Related to Civil Law Matters',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Donoghue v. Stevenson Principle (Applied in Indian Tort Jurisprudence)', description: 'Foundational negligence principles continue to influence civil liability reasoning in Indian courts.' },
        { title: 'Paras Nath Singh v. State of Jharkhand', description: 'Discussed civil possession and related rights in contested property context.' },
        { title: 'Bachhaj Nahar v. Nilima Mandal (2008) (SC)', description: 'Reiterated that civil relief must align with pleadings and proven case.' },
        { title: 'Ramrameshwari Devi v. Nirmala Devi (2011) (SC)', description: 'Addressed delay tactics and costs in frivolous civil litigation.' },
      ]),
    },
  });
}

async function patchAft(service) {
  const cache = await getServiceSections(service._id);
  await upsertSection(service._id, cache, {
    heading: 'Popular Cases in Supreme Court and High Court',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Union of India v. N.R. Parmar (2011) (SC)', description: 'Examined service jurisprudence issues relevant to tribunal-driven disputes.' },
        { title: 'Secretary, Ministry of Defence v. Babita Puniya (2020) (SC)', description: 'Advanced permanent commission rights for women officers in armed forces.' },
        { title: 'Major General Shri Kant Sharma v. Union of India (SC)', description: 'Clarified contours of AFT-linked service matter adjudication and remedies.' },
      ]),
    },
  });
}

async function patchCat(service) {
  const cache = await getServiceSections(service._id);
  await upsertSection(service._id, cache, {
    heading: 'Popular Cases in Supreme Court and High Court',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'L. Chandra Kumar v. Union of India (1997) (SC)', description: 'Upheld tribunal framework while preserving High Court judicial review powers.' },
        { title: 'Union of India v. Kirloskar Pneumatic Co.', description: 'Addressed service tribunal authority and adjudicatory scope in administrative matters.' },
        { title: 'All India Judges Association v. Union of India', description: 'Service-condition jurisprudence with implications for institutional pay and service structures.' },
      ]),
    },
  });
}

async function patchMediation(service) {
  const cache = await getServiceSections(service._id);

  await upsertSection(service._id, cache, {
    heading: 'Types of ADR Mechanisms',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Mediation', description: 'Neutral facilitation focused on consensual settlement.' },
        { title: 'Arbitration', description: 'Private adjudication resulting in a binding arbitral award.' },
        { title: 'Conciliation', description: 'Assisted settlement process with conciliator-led proposal flexibility.' },
        { title: 'Lok Adalat', description: 'Statutory settlement forum for speedy dispute disposal in suitable matters.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Arbitration Process',
    type: 'process',
    content: {
      steps: normalizeSteps([
        { title: 'Agreement', description: 'Existence of arbitration clause/agreement activates arbitration route.' },
        { title: 'Appointment of Arbitrator', description: 'Arbitrator(s) appointed per contract or statutory mechanism.' },
        { title: 'Statement of Claim', description: 'Claim and defence pleadings filed with documentary evidence.' },
        { title: 'Hearing', description: 'Procedural conferences, evidence exchange, and final arguments.' },
        { title: 'Award', description: 'Reasoned arbitral decision issued and enforceable under law.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Mediation Process',
    type: 'process',
    content: {
      steps: normalizeSteps([
        { title: 'Referral', description: 'Dispute referred contractually, by consent, or by court direction.' },
        { title: 'Mediator Selection', description: 'Parties appoint a neutral mediator accepted by both sides.' },
        { title: 'Joint Session', description: 'Initial session to define issues, interests, and settlement scope.' },
        { title: 'Private Caucus', description: 'Confidential discussions to narrow gaps and test options.' },
        { title: 'Settlement Agreement', description: 'Final negotiated terms documented for enforceability.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Enforceability of Awards and Settlements',
    type: 'overview',
    content: {
      body: 'Arbitral awards are enforceable under the Arbitration and Conciliation Act, 1996. Mediated settlements and conciliation settlements are enforceable as per applicable statutory framework, including Section 74 in conciliation context.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Documents Required',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Arbitration Clause/Agreement', description: 'Primary jurisdictional basis for arbitration proceedings.' },
        { title: 'Dispute Correspondence', description: 'Emails, notices, and communications showing dispute crystallization.' },
        { title: 'Contracts', description: 'Executed agreements, annexures, and amendment records.' },
        { title: 'Invoices/Financial Records', description: 'Commercial documents supporting claims and quantification.' },
        { title: 'Prior Orders/Judgments', description: 'Any relevant prior court/tribunal directions in connected disputes.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'How Grover & Grover Advocates Help You',
    type: 'overview',
    content: {
      body: 'We assist with ADR strategy design, clause drafting, representation in mediation/arbitration proceedings, challenge/enforcement actions, and business-focused settlement execution.',
    },
    matchers: [/How Grover|Role of Lawyer/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Popular Cases in Supreme Court and High Court',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'BALCO v. Kaiser Aluminium (2012) (SC)', description: 'Defined seat-centric arbitration framework and jurisdictional principles.' },
        { title: 'Bharat Aluminium Co. v. Kaiser Aluminium (2012) (SC)', description: 'Landmark ruling shaping modern arbitration law interpretation in India.' },
        { title: 'Ssangyong Engineering v. NHAI (2019) (SC)', description: 'Clarified patent illegality scope in domestic award challenges.' },
      ]),
    },
  });
}

async function patchMotor(service) {
  const cache = await getServiceSections(service._id);

  await upsertSection(service._id, cache, {
    heading: 'Types of Motor Accident Claims',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Third-Party Claims', description: 'Claims against insured vehicle owner/insurer for victim injuries or loss.' },
        { title: 'Own Damage Claims', description: 'Policyholder claims for insured vehicle damage subject to policy terms.' },
        { title: 'Hit-and-Run Claims', description: 'Compensation route where offending vehicle/driver is untraced.' },
        { title: 'Drunk Driving Cases', description: 'Enhanced liability complexity involving criminal and compensation dimensions.' },
        { title: 'Death Claims', description: 'Dependency-based compensation claims by legal heirs of deceased victim.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Process of Filing a Motor Accident Claim',
    type: 'process',
    content: {
      steps: normalizeSteps([
        { title: 'FIR', description: 'Register accident details promptly with police authorities.' },
        { title: 'Medical Treatment', description: 'Secure treatment records and medico-legal documentation.' },
        { title: 'Claim Petition before MACT', description: 'File compensation petition before Motor Accident Claims Tribunal.' },
        { title: 'Evidence', description: 'Present documents, witness statements, disability/income proof, and liability details.' },
        { title: 'Award', description: 'Tribunal determines compensation and liability allocation.' },
        { title: 'Enforcement', description: 'Execute award and pursue insurer/liable party compliance.' },
      ]),
    },
    matchers: [/Steps to Claim Compensation/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Documents Required',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'FIR Copy', description: 'Police record establishing accident occurrence details.' },
        { title: 'Medical Records', description: 'Treatment, diagnosis, bills, and discharge summaries.' },
        { title: 'Disability Certificate (if applicable)', description: 'Certified disability assessment for compensation quantification.' },
        { title: 'Death Certificate (fatal cases)', description: 'Mandatory legal proof in fatal accident claims.' },
        { title: 'Insurance Policy', description: 'Policy details to establish insurer obligations.' },
        { title: 'RC and Driving Licence', description: 'Vehicle and driver records for liability assessment.' },
        { title: 'Income Proof', description: 'Salary, tax, or occupation documents for loss-of-income calculation.' },
      ]),
    },
    matchers: [/Documents Required/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Compensation Calculation Under Motor Vehicles Act 1988',
    type: 'overview',
    content: {
      body: 'Compensation commonly includes medical expenses, loss of income, pain and suffering, disability impact, and dependency loss in fatal claims. Courts apply structured principles including multiplier-based methodology and case-law guided heads of compensation.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'How Grover & Grover Advocates Help You',
    type: 'overview',
    content: {
      body: 'We manage claim drafting, evidence strategy, insurer negotiations, MACT representation, and appeal support before High Courts where enhanced compensation or liability correction is required.',
    },
    matchers: [/How Grover|Role of Motor Accident Lawyer/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Popular Cases in Supreme Court and High Court',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'National Insurance Co. v. Pranay Sethi (2017) (SC)', description: 'Set definitive compensation heads and future prospects framework.' },
        { title: 'Sarla Verma v. Delhi Transport Corporation (2009) (SC)', description: 'Standardized multiplier method for dependency compensation.' },
        { title: 'Rajesh v. Rajbir Singh (2013) (SC)', description: 'Discussed non-earning victim and non-pecuniary compensation considerations.' },
      ]),
    },
    matchers: [/Popular Cases/i],
  });
}

async function patchSexualHarassment(service) {
  const cache = await getServiceSections(service._id);

  await upsertSection(service._id, cache, {
    heading: 'What Constitutes Sexual Harassment at Workplace (POSH Act)',
    type: 'overview',
    content: {
      body: 'Under Section 2(n) of the POSH Act, 2013, sexual harassment includes unwelcome physical, verbal, and non-verbal conduct of sexual nature, including implicit or explicit requests, remarks, gestures, and hostile work environment behavior.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Internal Complaints Committee (ICC)',
    type: 'overview',
    content: {
      body: 'Every eligible workplace must constitute an ICC to receive complaints, conduct inquiry, maintain confidentiality, and recommend action. ICC has inquiry powers and procedural responsibility under the POSH framework.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Process of Filing a Complaint',
    type: 'process',
    content: {
      steps: normalizeSteps([
        { title: 'Written Complaint', description: 'Submit complaint with incident details and timeline.' },
        { title: 'ICC Inquiry Initiation', description: 'Committee acknowledges and frames inquiry process.' },
        { title: 'Response from Respondent', description: 'Respondent files written response and supporting material.' },
        { title: 'Conciliation (Optional)', description: 'Available only if complainant opts, without monetary settlement coercion.' },
        { title: 'Report', description: 'ICC issues reasoned findings and recommendations.' },
        { title: 'Employer Action', description: 'Employer implements recommendations within statutory timelines.' },
      ]),
    },
    matchers: [/Procedure to File a Case/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'External Complaints Committee',
    type: 'overview',
    content: {
      body: 'Where ICC is absent or respondent is employer-level authority, complaint can proceed before Local/External Committee under district administration as per statutory mechanism.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Documents Required',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Written Complaint', description: 'Formal complaint statement with dates and incident specifics.' },
        { title: 'Evidence', description: 'Emails, messages, recordings, screenshots, and witness details where available.' },
        { title: 'Employment Details', description: 'Appointment/HR records proving workplace and reporting relationship.' },
      ]),
    },
    matchers: [/Documents Required/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Consequences for the Employer',
    type: 'overview',
    content: {
      body: 'Employer non-compliance with POSH obligations can invite statutory penalties, reputational risk, repeat-default consequences, and adverse legal action under applicable workplace law.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'How Grover & Grover Advocates Help You',
    type: 'overview',
    content: {
      body: 'We support complainants and respondents with complaint drafting, inquiry representation, compliance strategy for employers, policy strengthening, and appellate remedies.',
    },
    matchers: [/How Grover|Role of Lawyer/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Popular Cases in Supreme Court and High Court',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Vishaka v. State of Rajasthan (1997) (SC)', description: 'Established foundational workplace sexual harassment guidelines prior to POSH enactment.' },
        { title: 'Apparel Export Promotion Council v. A.K. Chopra (1999) (SC)', description: 'Expanded accountability and strict approach to workplace misconduct.' },
        { title: 'Medha Kotwal Lele v. Union of India (2012) (SC)', description: 'Strengthened implementation expectations of anti-harassment framework.' },
      ]),
    },
    matchers: [/Popular Cases/i],
  });
}

async function patchSupremeCourt(service) {
  const cache = await getServiceSections(service._id);

  await upsertSection(service._id, cache, {
    heading: 'Jurisdiction of the Supreme Court of India',
    type: 'overview',
    content: {
      body: 'The Supreme Court exercises original, appellate, and advisory jurisdiction under Articles 131, 132, 133, 134, 136, and 143 of the Constitution, including constitutional, civil, and criminal matters.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Special Leave Petition (SLP)',
    type: 'overview',
    content: {
      body: 'An SLP under Article 136 allows challenge to judgments/orders from courts or tribunals in suitable cases. Timely drafting, record preparation, and grounds articulation are critical for admission.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Writ Petitions before Supreme Court',
    type: 'overview',
    content: {
      body: 'Constitutional writs include habeas corpus, mandamus, certiorari, prohibition, and quo warranto, typically pursued for enforcement of fundamental and public law rights.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Public Interest Litigation (PIL)',
    type: 'overview',
    content: {
      body: 'PIL enables public-spirited access to constitutional remedies in matters affecting larger public rights. Courts evaluate locus, maintainability, urgency, and evidentiary basis.',
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Process of Filing a Case in Supreme Court',
    type: 'process',
    content: {
      steps: normalizeSteps([
        { title: 'Briefing Counsel', description: 'Collect complete facts, prior orders, and legal objective.' },
        { title: 'Drafting Petition', description: 'Prepare petition, synopsis, list of dates, and legal grounds.' },
        { title: 'Filing in SC Registry', description: 'Submit filing set with court fee and procedural compliance.' },
        { title: 'Listing', description: 'Matter listed subject to scrutiny and urgency classification.' },
        { title: 'Hearing', description: 'Admission/interim/final hearing progression as per court orders.' },
        { title: 'Judgment', description: 'Court delivers final order with consequential directions.' },
      ]),
    },
    matchers: [/Procedure to File a Case/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Documents Required',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Impugned Order/Judgment', description: 'Primary order being challenged before the Supreme Court.' },
        { title: 'Certified Copy', description: 'Certified judicial records required for procedural compliance.' },
        { title: 'Vakalatnama', description: 'Client authorization in favor of advocates-on-record/counsel.' },
        { title: 'Synopsis and List of Dates', description: 'Concise case narrative and procedural timeline.' },
        { title: 'Court Fee', description: 'Prescribed fee and filing compliances as per Supreme Court Rules.' },
      ]),
    },
    matchers: [/Documents Required/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'How Grover & Grover Advocates Help You',
    type: 'overview',
    content: {
      body: 'We provide SLP drafting, writ/PIL strategy, constitutional challenge support, urgent mentioning coordination, and structured representation in complex Supreme Court matters.',
    },
    matchers: [/How Grover|Role of Supreme Court Lawyer/i],
  });

  await upsertSection(service._id, cache, {
    heading: 'Popular Cases Handled (Illustrative)',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Constitutional Challenges under Article 32', description: 'Strategic rights-based litigation in public and private impact contexts.' },
        { title: 'Service Matters via SLP from AFT/CAT/HC', description: 'Appellate representation in administrative and service law disputes.' },
        { title: 'Criminal Appeals from High Courts', description: 'Challenge and defense strategy in conviction/sentence related matters.' },
      ]),
    },
    matchers: [/Popular Cases/i],
  });
}

async function patchAgreementToSell(service) {
  const cache = await getServiceSections(service._id);
  const base = cache.find((section) => /Agreement Formats and Considerations/i.test(section.heading || ''));

  if (base) {
    await ServiceSection.updateOne(
      { _id: base._id },
      {
        $set: {
          heading: 'Standard Agreement Format',
          type: 'benefits',
          content: {
            items: normalizeItems([
              { title: 'Parties', description: 'Clearly identify seller and purchaser with complete legal details.' },
              { title: 'Property Description', description: 'Accurate description including location, area, and title particulars.' },
              { title: 'Consideration Amount', description: 'Total sale consideration and payment-linked obligations.' },
              { title: 'Payment Schedule', description: 'Time-bound schedule for token, interim, and final payments.' },
            ]),
          },
        },
      }
    );
    base.heading = 'Standard Agreement Format';
    base.type = 'benefits';
    base.content = {
      items: normalizeItems([
        { title: 'Parties', description: 'Clearly identify seller and purchaser with complete legal details.' },
        { title: 'Property Description', description: 'Accurate description including location, area, and title particulars.' },
        { title: 'Consideration Amount', description: 'Total sale consideration and payment-linked obligations.' },
        { title: 'Payment Schedule', description: 'Time-bound schedule for token, interim, and final payments.' },
      ]),
    };
  } else {
    await upsertSection(service._id, cache, {
      heading: 'Standard Agreement Format',
      type: 'benefits',
      content: {
        items: normalizeItems([
          { title: 'Parties', description: 'Clearly identify seller and purchaser with complete legal details.' },
          { title: 'Property Description', description: 'Accurate description including location, area, and title particulars.' },
          { title: 'Consideration Amount', description: 'Total sale consideration and payment-linked obligations.' },
          { title: 'Payment Schedule', description: 'Time-bound schedule for token, interim, and final payments.' },
        ]),
      },
    });
  }

  await upsertSection(service._id, cache, {
    heading: 'Key Clauses to Include',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Possession Date', description: 'Specific delivery timeline for vacant and lawful possession.' },
        { title: 'Title Warranty', description: 'Seller declaration on marketable title and legal ownership.' },
        { title: 'Encumbrance Certificate', description: 'Disclosure and verification of liabilities/charges on property.' },
        { title: 'Penalty for Default', description: 'Consequences and compensation mechanism for breach by either party.' },
        { title: 'Registration Timeline', description: 'Defined deadline for execution and registration formalities.' },
      ]),
    },
  });

  await upsertSection(service._id, cache, {
    heading: 'Legal Considerations',
    type: 'benefits',
    content: {
      items: normalizeItems([
        { title: 'Stamp Duty Implications', description: 'Applicable stamp obligations vary by transaction type and state law.' },
        { title: 'Section 54, Transfer of Property Act', description: 'Agreement to sell does not itself transfer ownership without valid conveyance.' },
        { title: 'Enforceability', description: 'Draft quality and evidence trail determine enforceability in specific performance disputes.' },
        { title: 'Suraj Lamp & Industries Position', description: 'Supreme Court clarified limits of GPA/SA/WILL transactions as title transfer instruments.' },
      ]),
    },
  });
}

async function patchMediationAndMotorAndOthers(servicesBySlug) {
  if (servicesBySlug['mediation-and-arbitration-lawyer']) {
    await patchMediation(servicesBySlug['mediation-and-arbitration-lawyer']);
  }
  if (servicesBySlug['motor-accident-lawyer']) {
    await patchMotor(servicesBySlug['motor-accident-lawyer']);
  }
  if (servicesBySlug['sexual-harassment-lawyer']) {
    await patchSexualHarassment(servicesBySlug['sexual-harassment-lawyer']);
  }
  if (servicesBySlug['supreme-court-lawyer']) {
    await patchSupremeCourt(servicesBySlug['supreme-court-lawyer']);
  }
}

async function auditServiceSlugs() {
  const rows = await Service.find({ slug: { $in: TARGET_SERVICE_SLUGS } }).select('slug').lean();
  const found = new Set(rows.map((row) => row.slug));
  const missing = TARGET_SERVICE_SLUGS.filter((slug) => !found.has(slug));
  return { found: rows.length, missing };
}

async function main() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Missing MONGO_URI');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const legalNoticeService = await ensureServiceSlugCanonical();
    if (legalNoticeService) {
      console.log(`Canonical legal notice slug ready: ${legalNoticeService.slug}`);
    } else {
      console.log('Warning: Legal notice service not found');
    }

    await patchHowGroverHeadings();
    console.log('Patched heading fixes for How Grover and Consumer documents title');

    const services = await Service.find({ slug: { $in: TARGET_SERVICE_SLUGS } }).select('_id slug name').lean();
    const bySlug = Object.fromEntries(services.map((service) => [service.slug, service]));

    if (bySlug['legal-notice-lawyer']) await patchLegalNotice(bySlug['legal-notice-lawyer']);
    if (bySlug['bail-lawyer']) await patchBail(bySlug['bail-lawyer']);
    if (bySlug['cheque-bounce-lawyer']) await patchChequeBounce(bySlug['cheque-bounce-lawyer']);
    if (bySlug['civil-lawyer']) await patchCivil(bySlug['civil-lawyer']);
    if (bySlug['armed-force-tribunal-lawyer']) await patchAft(bySlug['armed-force-tribunal-lawyer']);
    if (bySlug['cat-matters-lawyer']) await patchCat(bySlug['cat-matters-lawyer']);
    if (bySlug['agreement-to-sell']) await patchAgreementToSell(bySlug['agreement-to-sell']);

    await patchMediationAndMotorAndOthers(bySlug);

    const audit = await auditServiceSlugs();
    console.log(`Slug audit: found ${audit.found}/${TARGET_SERVICE_SLUGS.length}`);
    if (audit.missing.length > 0) {
      console.log(`Missing slugs: ${audit.missing.join(', ')}`);
    } else {
      console.log('All target slugs are canonical and present.');
    }

    console.log('patch-service-content-apr-2026 completed.');
  } catch (error) {
    console.error(`Patch failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

main();
