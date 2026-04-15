require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== PROPERTY LAWYER SERVICE ====================
    console.log('--- Updating Property Lawyer Service ---');
    const propertyService = await Service.findOne({ slug: 'property-lawyer' });
    
    if (propertyService) {
      propertyService.shortDescription = 'Property Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      propertyService.description = 'Property Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      propertyService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/property-lawyer-hero.jpg';
      
      propertyService.contentBlocks = [
        {
          heading: 'Understanding Property Disputes',
          content: `Property disputes are legal conflicts that arise between individuals or entities over ownership, possession, use, or rights associated with real property. These disputes can involve residential, commercial, or agricultural properties and may arise due to multiple reasons, including conflicting ownership claims, boundary disputes, breach of contracts, easement issues, inheritance conflicts, and landlord-tenant disputes. Resolving property disputes generally involves legal processes and may require the intervention of courts or alternative dispute resolution methods.`
        },
        {
          heading: 'Types of Property Disputes',
          content: `Common types include: Ownership Disputes (conflicting deeds, doubtful boundaries), Boundary Disputes (encroachments, fence lines), Landlord-Tenant Disputes (rent, eviction, maintenance), Easement Disputes (right to use property), Nuisance Claims (noise, pollution), Adverse Possession Claims (unauthorized occupation), and Inheritance Disputes (will challenges, property distribution).`
        },
        {
          heading: 'Buy and Sell Property According to Law',
          content: `Buying property involves: Research, Property Inspection, Due Diligence, Offer and Negotiation, Sale Agreement, Financing and Conveyancing, Property Transfer and Settlement. Selling property involves: Valuation, Marketing, Buyer Negotiation, Sales Contract, Property Settlement and Transfer. Both processes require proper legal documentation and registration.`
        },
        {
          heading: 'Charges, Penalties & Punishment',
          content: `Property law offenses include: Trespassing (fines, imprisonment), Theft or Burglary (penalties based on value), Fraud or Embezzlement (fines, restitution, imprisonment), Property Damage (fines, restitution), Landlord-Tenant Offenses (illegal eviction penalties), Real Estate Fraud (misrepresentation penalties).`
        },
        {
          heading: 'Acts and Provisions Under Property Law',
          content: `Key acts include: Transfer of Property Act, Registration Act, Land Acquisition Act, Real Estate (Regulation and Development) Act (RERA), Rent Control Acts, Succession Laws, Co-ownership and Partition Laws, Environmental Protection Laws, Intellectual Property Laws.`
        },
        {
          heading: 'How GAG Lawyers Help in Property Cases',
          content: `We provide: Legal advice and assessment, Case strategy and planning, Document review and preparation, Representation in negotiations and litigation, Evidence gathering, legal research, ADR support, Client advocacy. Our experienced team handles all types of property disputes efficiently.`
        }
      ];
      
      propertyService.documentChecklist = [
        'Title deeds and ownership documents',
        'Sale deed or purchase agreement',
        'Property tax receipts',
        'Encumbrance certificate',
        'Survey and boundary documents',
        'Building plans and approvals',
        'Possession certificate',
        'Identity and address proof',
        'Any relevant court orders or legal notices'
      ];
      
      propertyService.popularCases = [
        'Kelo v. City of New London (2005) - Eminent domain',
        'Olga Tellis v. Bombay Municipal Corporation (1985) - Right to livelihood',
        'Maneka Gandhi v. Union of India (1978) - Right to personal liberty'
      ];
      
      propertyService.faqs = [
        {
          question: 'What is a property dispute case?',
          answer: 'A property dispute is a legal disagreement between parties over ownership, possession, or use of real property.'
        },
        {
          question: 'How long does it take to resolve property disputes?',
          answer: 'Duration varies based on complexity, but can range from months to years depending on the case and court workload.'
        },
        {
          question: 'Can property disputes be settled out of court?',
          answer: 'Yes, through mediation, arbitration, or negotiation. Alternative dispute resolution is often faster and less expensive.'
        },
        {
          question: 'What documents are needed for property cases?',
          answer: 'Title deeds, sale agreements, tax receipts, encumbrance certificates, and other ownership and transaction documents.'
        },
        {
          question: 'Do I need a lawyer for property disputes?',
          answer: 'Yes, property law is complex. A lawyer ensures proper documentation, protects your rights, and represents you effectively.'
        }
      ];
      
      propertyService.seoKeywords = [
        'property lawyer',
        'property dispute',
        'real estate lawyer',
        'property ownership',
        'title dispute',
        'boundary dispute',
        'property litigation',
        'RERA lawyer',
        'land dispute',
        'property transfer',
        'real estate attorney',
        'property rights',
        'property law'
      ];
      
      await propertyService.save();
      console.log('✓ Property Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Property Lawyer service not found\n');
    }

    // ==================== SEXUAL HARASSMENT LAWYER SERVICE ====================
    console.log('--- Updating Sexual Harassment Lawyer Service ---');
    const sexualService = await Service.findOne({ slug: 'sexual-harassment-lawyer' });
    
    if (sexualService) {
      sexualService.shortDescription = 'Sexual Harassment Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      sexualService.description = 'Sexual Harassment Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      sexualService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/sexual-harassment-lawyer-hero.jpg';
      
      sexualService.contentBlocks = [
        {
          heading: 'Understanding Section 498A and Sexual Harassment',
          content: `Section 498A of the Indian Penal Code deals with cruelty and harassment towards married women. It criminalizes acts of cruelty and harassment by a husband or his relatives against a married woman, including causing her physical or mental harm, insulting or threatening her, or subjecting her to cruelty or harassment for dowry or other demands. The law is a strong tool to protect the rights of married women in India. Cruelty includes any wilful conduct that causes injury, danger to life, limb, or health (physical or mental) of the woman, or harassment including verbal, emotional, or financial abuse.`
        },
        {
          heading: 'Types of Acts and Provisions',
          content: `Several laws address sexual harassment: IPC Section 498A (cruelty by husband/relatives), Protection of Women from Domestic Violence Act (PWDVA), Sexual Harassment of Women at Workplace Act 2013, Criminal Law (Amendment) Act 2013 (expanded rape definition), Indian Evidence Act (electronic evidence), Code of Criminal Procedure (investigation and trial procedures).`
        },
        {
          heading: 'Rights and Obligations Under Section 498A',
          content: `Rights include: Right to File Complaint (against husband/relatives), Right to Protection (police investigation), Right to Relief (maintenance, residence, custody). Obligations include: Police must investigate, Accused must appear in court, Court must hear case and grant relief if proven. Section 498A is non-bailable and non-compoundable.`
        },
        {
          heading: 'Charges, Penalties & Punishment',
          content: `Charge of Cruelty filed for harassment. Penalty: Conviction may result in imprisonment up to three years plus fine. Punishment includes imprisonment, fines, or both. Relief may include maintenance, residence, custody. Bail requires court approval. Police can arrest without warrant. Investigation must be prompt.`
        },
        {
          heading: 'Procedure to File a Case',
          content: `Steps include: Filing Complaint with police, Investigation (evidence collection, interrogation, arrest), Recording Statements, Filing Chargesheet, Summoning Accused, Trial (evidence presentation), Judgment (verdict and punishment), Appeal (to higher court if needed).`
        },
        {
          heading: 'How GAG Lawyers Help',
          content: `We provide: Evidence collection (medical reports, witness statements), Drafting complaints, Court representation in hearings & appeals, Negotiating settlements, Protecting rights throughout the process. Our experienced team specializes in Section 498A cases and ensures professional handling of sensitive matters.`
        }
      ];
      
      sexualService.documentChecklist = [
        'Marriage certificate',
        'Medical records of injuries',
        'Evidence of harassment (emails, messages, recordings)',
        'Evidence of cruelty (photos, financial records)',
        'Statement of complainant',
        'Witness details and statements',
        'Proof of residence',
        'Proof of dowry demand (if applicable)',
        'Any previous complaints or legal notices'
      ];
      
      sexualService.popularCases = [
        'Sushil Kumar Sharma v. Union of India (2005) - Misuse of Section 498A',
        'Rajesh Sharma v. State of UP (2017) - Guidelines to prevent misuse',
        'Vishaka v. State of Rajasthan (1997) - Workplace sexual harassment guidelines'
      ];
      
      sexualService.faqs = [
        {
          question: 'What is Section 498A?',
          answer: 'Section 498A of IPC criminalizes cruelty and harassment by husband or relatives against married women, including physical, mental, and emotional abuse.'
        },
        {
          question: 'Is Section 498A bailable?',
          answer: 'No, Section 498A is a non-bailable offense, meaning the accused cannot get bail easily and must apply to the court.'
        },
        {
          question: 'Can Section 498A be withdrawn?',
          answer: 'Section 498A is non-compoundable, meaning the case cannot be withdrawn or settled between parties without court permission.'
        },
        {
          question: 'What is the punishment under Section 498A?',
          answer: 'Conviction can result in imprisonment up to three years and/or fine. The court may also order maintenance and other relief.'
        },
        {
          question: 'How can I file a complaint under Section 498A?',
          answer: 'File a complaint with the police providing details of the accused and evidence of cruelty. A lawyer can help draft and file the complaint properly.'
        }
      ];
      
      sexualService.seoKeywords = [
        'sexual harassment lawyer',
        'section 498A lawyer',
        'domestic violence lawyer',
        'cruelty against women',
        'dowry harassment',
        'women rights lawyer',
        'PWDVA lawyer',
        'workplace harassment',
        'matrimonial cruelty',
        'women protection',
        'harassment case',
        'domestic abuse lawyer',
        'women legal rights'
      ];
      
      await sexualService.save();
      console.log('✓ Sexual Harassment Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Sexual Harassment Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Property and Sexual Harassment services updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServices();
