require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== SUPREME COURT LAWYER SERVICE ====================
    console.log('--- Updating Supreme Court Lawyer Service ---');
    const supremeService = await Service.findOne({ slug: 'supreme-court-litigation' });
    
    if (supremeService) {
      supremeService.shortDescription = 'Supreme Court Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      supremeService.description = 'Supreme Court Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      supremeService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/supreme-court-lawyer-hero.jpg';
      
      supremeService.contentBlocks = [
        {
          heading: 'Understanding Supreme Court Practice',
          content: `Supreme Court Lawyers are the highest level of legal practitioners in India, qualified to appear before the Supreme Court of India, the highest court of appeals. They are highly experienced, knowledgeable, and respected in the legal profession. A Supreme Court Lawyer must possess a valid Advocate on Record (AOR) certificate issued by the Supreme Court. To obtain an AOR certificate, a lawyer must have at least seven years of practice in High Court and pass the All India Bar Examination (AIBE). Supreme Court Lawyers have extensive expertise in Indian law, judicial pronouncements, and procedural rules.`
        },
        {
          heading: 'Types of Disputes Heard by Supreme Court',
          content: `Constitutional Disputes (guardian of Constitution, disputes between states/citizens), Civil Disputes (property, contracts, land, economic matters), Tax Disputes (court of last resort for tax matters), Criminal Disputes (appeals, death penalty cases, bail petitions), Other Disputes (public policy, international law, administrative law, appeals from High Courts and tribunals).`
        },
        {
          heading: 'Role of Supreme Court Lawyer',
          content: `Supreme Court Lawyers conduct research, prepare documents, file petitions, and represent clients. They interpret legal issues, provide strategic advice, prepare briefs/petitions/motions, present evidence persuasively, cross-examine witnesses, negotiate settlements, manage case strategy, communicate legal implications, provide guidance on remedies/appeals, ensure procedural compliance. Their expertise is critical for successful representation.`
        },
        {
          heading: 'Procedure to File Case in Supreme Court',
          content: `Steps include: Drafting Special Leave Petition (SLP) according to Supreme Court Rules 1966, Filing with Registry (with affidavit and notarized documents), Docket Number Assignment, Hearing (court grants or denies relief), Appeal (if relief denied, further appeal possible).`
        },
        {
          heading: 'Documents Required',
          content: `Key documents: Writ petition or SLP, Affidavit in support, Memo of parties and vakalatnama, Index of documents, Copies of contracts/agreements/evidence, Court order granting permission, Cause list, court fees, notice of hearing, summons.`
        },
        {
          heading: 'How GAG Lawyers Help',
          content: `We provide: Filing petitions and preparing legal documents, Representing clients in Supreme Court proceedings, Conducting research and preparing legal briefs, Expertise in Supreme Court rules and procedures. We handle Supreme Court cases for bail, criminal appeals, civil/constitutional/tax disputes. Our team ensures top-level guidance and representation.`
        }
      ];
      
      supremeService.documentChecklist = [
        'Special Leave Petition (SLP) or Writ Petition',
        'Affidavit in support of petition',
        'Memo of parties and vakalatnama',
        'Index of documents',
        'Copies of lower court orders/judgments',
        'Relevant contracts, agreements, evidence',
        'Court fees payment proof',
        'Cause list and notice of hearing',
        'Any other supporting documents'
      ];
      
      supremeService.popularCases = [
        'Keshavananda Bharati v. State of Kerala (1973) - Basic structure doctrine',
        'Maneka Gandhi v. Union of India (1978) - Right to life and personal liberty',
        'Vishakha v. State of Rajasthan (1997) - Sexual harassment guidelines'
      ];
      
      supremeService.faqs = [
        {
          question: 'What is the Supreme Court of India?',
          answer: 'The Supreme Court of India is the highest judicial authority in the country and the final court of appeal.'
        },
        {
          question: 'What kind of cases does Supreme Court hear?',
          answer: 'The Supreme Court hears civil, criminal, constitutional, and administrative matters, as well as appeals from High Courts.'
        },
        {
          question: 'How can I file a case in Supreme Court?',
          answer: 'File a Special Leave Petition (SLP) along with relevant documents and court fees. A Supreme Court lawyer can guide you through the process.'
        },
        {
          question: 'What is the time limit for filing SLP?',
          answer: 'The time limit is 90 days from the date of judgment or order passed by the High Court or subordinate court.'
        },
        {
          question: 'Do I need a lawyer for Supreme Court?',
          answer: 'Yes, Supreme Court practice is highly specialized. An experienced Supreme Court lawyer with AOR certificate is essential.'
        }
      ];
      
      supremeService.seoKeywords = [
        'supreme court lawyer',
        'SLP lawyer',
        'supreme court advocate',
        'AOR lawyer',
        'supreme court appeal',
        'constitutional lawyer',
        'supreme court petition',
        'apex court lawyer',
        'supreme court litigation',
        'special leave petition',
        'supreme court attorney',
        'highest court lawyer',
        'supreme court representation'
      ];
      
      await supremeService.save();
      console.log('✓ Supreme Court Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Supreme Court Lawyer service not found\n');
    }

    // ==================== WRIT PETITION LAWYER SERVICE ====================
    console.log('--- Updating Writ Petition Lawyer Service ---');
    const writService = await Service.findOne({ slug: 'writ-petition-lawyer' });
    
    if (writService) {
      writService.shortDescription = 'Writ Petition Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      writService.description = 'Writ Petition Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      writService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/writ-petition-lawyer-hero.jpg';
      
      writService.contentBlocks = [
        {
          heading: 'Understanding Writ Petitions',
          content: `A writ petition is a legal procedure through which an individual or organization can approach the court for enforcement of a legal right or to prevent an illegal act. It is a remedy provided under the Constitution of India for protecting citizens' fundamental rights. Writ petitions are filed to address violations of fundamental rights, abuse of power by public authorities, or illegal actions affecting citizens. The Supreme Court and High Courts have authority to hear writ petitions.`
        },
        {
          heading: 'Types of Writ Petitions',
          content: `Writ of Mandamus (court order compelling duty performance), Writ of Habeas Corpus (ensures unlawfully detained person brought before court), Writ of Certiorari (directs lower court to send case record for review), Writ of Prohibition (prevents lower court from exceeding jurisdiction), Writ of Quo Warranto (challenges right to hold public office).`
        },
        {
          heading: 'Acts and Provisions',
          content: `Administrative Tribunals Act 1985 (establishment of tribunals), Central Administrative Tribunal (CAT) (adjudicates central government employee disputes), High Courts (entertain writ petitions under Article 226), Supreme Court (issues writs under Article 32 - habeas corpus, mandamus, prohibition, certiorari, quo warranto).`
        },
        {
          heading: 'Rights and Obligations',
          content: `Rights: Petitioners can approach court when fundamental rights violated, Court can grant damages/compensation/remedies, Orders can compel government action. Obligations: Petitioners must prove judicial intervention needed, Facts must be clear and coherent, Petitioners must comply with court orders.`
        },
        {
          heading: 'Procedure to File Writ Petition',
          content: `Steps: Draft petition including facts, evidence, cause of action; Attach relevant documents, laws, regulations; Submit to appropriate court (High Court or Supreme Court); Court may issue notice or grant interim relief; If favorable ruling, relief granted; If not, appeal to higher court possible.`
        },
        {
          heading: 'How GAG Lawyers Help',
          content: `We provide: Legal research and strategy, Drafting and filing petitions with complete documentation, Representation in court proceedings for High Court and Supreme Court, Guidance on legal procedures and remedies. Our experienced team handles all types of writ petitions efficiently and effectively.`
        }
      ];
      
      writService.documentChecklist = [
        'Petition detailing case facts and relief sought',
        'Affidavits supporting the claims',
        'Covering letter explaining urgency',
        'Memorandum of Arguments',
        'Exhibits (documents, photographs, evidence)',
        'Proof of locus standi',
        'Copies of relevant laws and regulations',
        'Court fee payment proof',
        'Vakalatnama (power of attorney)'
      ];
      
      writService.popularCases = [
        'Maneka Gandhi v. Union of India (1978) - Right to travel and personal liberty',
        'Vishaka v. State of Rajasthan (1997) - Sexual harassment guidelines',
        'Olga Tellis v. Bombay Municipal Corporation (1985) - Right to livelihood'
      ];
      
      writService.faqs = [
        {
          question: 'What is a Writ Petition?',
          answer: 'A writ petition is a legal remedy available under the Constitution to enforce fundamental rights or other legal rights against violation by the state or public authorities.'
        },
        {
          question: 'How to file a Writ Petition?',
          answer: 'File in High Court or Supreme Court depending on the case. Consult a lawyer to draft the petition with all facts, evidence, and legal grounds.'
        },
        {
          question: 'What are the types of Writ Petitions?',
          answer: 'Five types: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto, each serving different purposes.'
        },
        {
          question: 'Who can file a Writ Petition?',
          answer: 'Any person aggrieved by violation of fundamental rights or legal rights. Even public-spirited persons can file in public interest.'
        },
        {
          question: 'What is the time limit for filing?',
          answer: 'Time limit varies by case nature and court. Generally, should be filed within reasonable time from violation date.'
        }
      ];
      
      writService.seoKeywords = [
        'writ petition lawyer',
        'writ petition',
        'habeas corpus',
        'mandamus',
        'certiorari',
        'prohibition writ',
        'quo warranto',
        'constitutional lawyer',
        'fundamental rights',
        'high court writ',
        'supreme court writ',
        'public interest litigation',
        'writ petition filing'
      ];
      
      await writService.save();
      console.log('✓ Writ Petition Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Writ Petition Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Supreme Court and Writ Petition services updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServices();
