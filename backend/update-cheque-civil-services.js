require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const updateChequeAndCivilServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // ============================================
    // UPDATE CHEQUE BOUNCE SERVICE
    // ============================================
    console.log('\n--- Updating Cheque Bounce Service ---');
    const chequeService = await Service.findOne({ slug: 'cheque-bounce-lawyer' });
    
    if (chequeService) {
      chequeService.heroImage = 'https://images.unsplash.com/photo-1554224311-beee4ece8c35?auto=format&fit=crop&w=1600&q=80';
      
      chequeService.shortDescription = 'Cheque Bounce Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      chequeService.overview = `In the realm of financial transactions, a scenario unfolds when the bank tasked with honoring a check returns it due to an insufficiency of monetary resources. This predicament, commonly known as a "cheque bounce," plagues both individuals and enterprises relying on checks for monetary transactions. A bounced check doesn't merely constitute a minor inconvenience; rather, it carries substantial repercussions for both the individual or entity issuing the check and its intended recipient.`;

      chequeService.contentBlocks = [
        {
          heading: 'What to Do When a Cheque gets Bounced',
          paragraphs: [
            'Encountering a bounced check is an exceedingly stressful event, entailing a maze of legal and financial intricacies. Navigating such a situation can be perplexing, but there exist practical steps to rectify the issue and reclaim your funds.',
            'Resolving a Bounced Check: The aftermath of a financial loss demands adherence to the RBI\'s protocol for addressing such concerns. Two avenues present themselves: initiating a dispute through the bank or opting for a cash withdrawal from your account.',
            'Legal Consequences of a Bounced Check: Insufficient funds in your account may elicit charges of fraud from the bank, leading to the transmission of this information to law enforcement agencies. Preventing Future Check Bounces: Vigilance is key in averting declined account scenarios.'
          ]
        },
        {
          heading: 'Charges, Penalties & Punishment',
          paragraphs: [
            'It is a criminal offense to issue a check that is dishonoured due to insufficient funds or any other reason. If a check is bounced, the drawer of the check can face criminal charges and be liable for fines and penalties.',
            'Section 138 of the Indian Penal Code provides that whoever draws or indorses any check or order for the payment of money, knowing that there are not at the time sufficient funds on deposit to meet such check or order, shall be punished with simple imprisonment for a term which may extend to six months and with a fine.',
            'The charges for check bounce cases in India are governed by Section 138 of the Negotiable Instruments Act. The punishment includes imprisonment for a term which may extend to two years, or with fine which may extend to twice the amount of the cheque, or with both.'
          ]
        },
        {
          heading: 'Legal Remedies Available under Law',
          paragraphs: [
            'Cheque bounce cases are a serious matter and can have serious consequences for the issuer, even leading to criminal prosecution in certain cases. It is important to understand the legal remedies available under the law in such cases.',
            'The Negotiable Instruments Act, 1881, provides for various legal remedies available to the payee or holder of a dishonoured check, including filing a civil suit for recovery of money, filing an application before the Debt Recovery Tribunal (DRT), or filing a criminal complaint against the drawer of the check.',
            'Each remedy has its own advantages and disadvantages and should be carefully considered before pursuing any course of action. The purpose of a civil suit for the recovery of money is to recover the value of the money paid by the drawer, in addition to costs.'
          ]
        },
        {
          heading: 'Role of Cheque Bounce Lawyers',
          paragraphs: [
            'Cheque Bounce Lawyers play a critical role in cheque bounce cases. Lawyers can offer legal advice and representation to both the complainant and the accused. Lawyers can assist the complainant to file a complaint with the police and the court, and can also help the accused to prepare a defence.',
            'Lawyers can also help to negotiate a settlement between the parties, if possible. They can also provide advice on the relevant laws and regulations, and can help to ensure that the case is handled according to the law.',
            'In addition, Lawyers can help to ensure that the evidence is properly presented in court, and can provide advice on the best course of action to take. Overall, Lawyers can help to ensure that the rights of both parties are protected throughout the process.'
          ]
        },
        {
          heading: 'Documents Required to file a Cheque Bounce Case',
          paragraphs: [
            'A check bounce is a serious offense in India, and filing a case related to it requires the submission of several documents. These documents are needed to prove the validity of the case and provide evidence that the check was indeed bounced.',
            'Some of these documents include a copy of the bounced check, copies of bank statements, copies of relevant bank correspondence, and any other relevant documents that can help establish the facts.',
            'It is important to ensure that all necessary paperwork is in order before filing a case related to a check bounce in India. Once this information has been gathered and submitted to the court, it will be determined whether prosecution is warranted.'
          ]
        },
        {
          heading: 'How Grover & Grover, Advocates Help in Cheque Bounce Cases',
          paragraphs: [
            'Grover & Grover, Advocates and Solicitors can help in cheque bounce cases by providing legal advice and representation to the complainant. They can help in filing a complaint with the police, drafting a legal notice to the accused, and representing the complainant in court.',
            'They can also help in negotiating a settlement between the parties, if possible. Additionally, they can provide advice on the applicable laws and regulations related to cheque bounce cases.',
            'With their expertise, they can help clients understand the legal implications of a bounced check and take appropriate action against the defaulter. They also provide guidance on filing a criminal complaint against the defaulter in cases of fraud or dishonesty.'
          ]
        }
      ];

      chequeService.documentChecklist = [
        'Copy of the bounced cheque',
        'Bank statement showing insufficient funds',
        'Return memo from the bank',
        'Legal notice sent to the drawer',
        'Proof of delivery of legal notice',
        'Reply to legal notice (if any)',
        'Identity proof of complainant',
        'Address proof of drawer',
        'Any correspondence related to the transaction'
      ];

      chequeService.popularCases = [
        'Mardia Chemicals Ltd. v. Union of India (Supreme Court) - Negotiable instrument status',
        'State Bank of India v. K.K. Narayanan (High Court of Kerala) - Bank issued cheques',
        'State Bank of India v. M.K. Nair (High Court of Kerala) - Customer cheques as negotiable instruments'
      ];

      chequeService.faqs = [
        {
          question: 'What is Cheque Bounce?',
          answer: 'Cheque bounce is a term used to describe a situation in which a cheque that has been issued by one party is returned by the bank due to insufficient funds or other reasons.'
        },
        {
          question: 'What are the consequences of Cheque Bounce?',
          answer: 'Cheque bounce can lead to various consequences, including legal action, penalties, and damage to one\'s credit score. The payee can take legal action against the issuer of the cheque under the Negotiable Instruments Act.'
        },
        {
          question: 'What is the penalty for Cheque Bounce?',
          answer: 'The penalty for Cheque Bounce can vary depending on the circumstances, but it typically includes a fee or fine imposed by the bank, as well as legal fees if the payee decides to take legal action. Under Section 138, punishment can include imprisonment up to two years or fine up to twice the cheque amount.'
        },
        {
          question: 'What is the legal recourse for Cheque Bounce?',
          answer: 'Under the Negotiable Instruments Act, the payee can take legal action against the issuer of the cheque, which can result in imprisonment for up to two years, a fine, or both.'
        },
        {
          question: 'What is the time limit for Cheque Bounce cases?',
          answer: 'The time limit for Cheque Bounce cases is typically three years from the date of the cheque, but this can vary depending on the jurisdiction and circumstances. A legal notice must be sent within 30 days of receiving the return memo.'
        }
      ];

      chequeService.seoKeywords = [
        'Cheque bounce lawyer near me',
        'Best Cheque Bounce Lawyer',
        'Top Cheque Bounce Lawyer',
        'Best lawyer for Cheque Bounce case',
        'Cheque Bounce Lawyer case advocates near me',
        'Advocate for Cheque Bounce',
        'Legal case for Cheque Bounce',
        'Criminal case against Cheque Bounce',
        'Cheque bouncing lawyer',
        'Cheque Bounce legal notice format',
        'Cheque Bounce case lawyer charges',
        'Advocate fees for Cheque Bounce case',
        'Lawyer fees for Cheque Bounce case'
      ];

      await chequeService.save();
      console.log('✓ Cheque Bounce service updated successfully!');
    } else {
      console.log('✗ Cheque Bounce service not found');
    }

    // ============================================
    // UPDATE CIVIL LAW SERVICE
    // ============================================
    console.log('\n--- Updating Civil Law Service ---');
    const civilService = await Service.findOne({ slug: 'civil-lawyer' });
    
    if (civilService) {
      civilService.heroImage = 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1600&q=80';
      
      civilService.shortDescription = 'Civil Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      civilService.overview = `Civil law is the body of laws in India that govern disputes between individuals and organizations. It encompasses a wide range of legal topics, including contracts, torts, property rights, family law, and more. Civil law is based on a set of rules and regulations that are designed to protect the rights of citizens.`;

      civilService.contentBlocks = [
        {
          heading: 'The Purpose & Significance of Civil Law',
          paragraphs: [
            'Civil law is a framework of laws that aims to safeguard the rights of individuals, businesses, and other entities while also offering remedies for any violations of those rights. It is a legal system based on a comprehensive set of rules that facilitates the resolution of disputes between individuals or entities.',
            'The significance of civil law in society cannot be underestimated as it establishes a legal structure for resolving conflicts and protecting individual rights. Moreover, civil law plays a pivotal role in ensuring justice, fairness, and stability within society.',
            'It is instrumental in safeguarding individual rights and ensuring that everyone receives equitable treatment, regardless of their background or social status. Civil law serves as a mechanism for holding individuals accountable for their actions, thereby promoting orderliness in society.'
          ]
        },
        {
          heading: 'Types of Civil Cases and their Provisions',
          paragraphs: [
            'The legal framework governing civil cases in India is outlined in the Civil Procedure Code (CPC), which serves as the primary legislation for civil matters. The CPC encompasses various types of civil cases, including contract disputes, tort claims, property disputes, and family matters.',
            'According to the CPC, a contract refers to an agreement or promise made between two or more parties. Property law governs matters related to the ownership, possession, and transfer of real estate and personal property.',
            'Family law deals with legal matters concerning marriage, divorce proceedings, child custody arrangements, adoption processes, and spousal support. Each type of case has specific provisions and procedures outlined in the CPC.'
          ]
        },
        {
          heading: 'India\'s Major Statutes & Acts Related to Civil Law',
          paragraphs: [
            'India has an extensive and complex civil law system that is based on a variety of statutes and acts. Major statutes include the Indian Contract Act, 1872; The Transfer of Property Act, 1882; The Indian Easements Act, 1882; The Specific Relief Act, 1963; and The Hindu Succession Act, 1956.',
            'The Indian Contract Act, 1872 governs the formation and enforcement of contracts in India. It defines the essential elements of a valid contract, such as offer and acceptance, consideration, capacity of the parties and free consent.',
            'The Transfer of Property Act, 1882 governs matters related to the transfer of property, such as sale, mortgage, lease and gift. The Indian Succession Act, 1925 governs matters related to the devolution of property upon the death of a person.'
          ]
        },
        {
          heading: 'Different Types of Remedies Available',
          paragraphs: [
            'Indian civil law provides a range of remedies for those who have suffered a wrong or injury due to the wrongful act or omission of another person. These remedies include damages, injunctions, specific performance and restitution.',
            'Injunctions are legal orders issued by the court to restrain a person from doing a particular act or to require a person to do a particular act. The types of injunctions are permanent injunction, mandatory injunction, prohibitory injunction, and interim injunction.',
            'Specific Performance is a type of remedy in which the court directs the defendant to fulfil a contractual obligation as specified in the contract. Damages are a civil remedy that allow the court to award monetary compensation to the aggrieved party.'
          ]
        },
        {
          heading: 'Role of Lawyers in Civil Law Matters',
          paragraphs: [
            'The role of Civil Lawyers is crucial in ensuring that civil cases are handled properly. These lawyers are responsible for conducting thorough research and gaining a deep understanding of the relevant laws, regulations, and legal principles applicable to each case.',
            'Civil Lawyers analyze the facts of the case, provide legal advice to their clients, and prepare all necessary legal documents. They also represent their clients in court proceedings, present evidence effectively, and make persuasive arguments on behalf of their clients.',
            'In addition to this, civil lawyers handle negotiations for settlements and may also handle appeals if necessary. Professional legal expertise is essential for effective representation in civil matters.'
          ]
        },
        {
          heading: 'How Grover & Grover, Advocates Help in Civil Law Matters',
          paragraphs: [
            'Grover & Grover, Advocates and Solicitors is a legal firm that specializes in civil law matters. They provide legal advice and representation to individuals, businesses, and organizations regarding civil cases.',
            'Their lawyers have extensive experience in dealing with all kinds of civil matters including property disputes, family law issues, contract disputes, consumer protection cases and more. They can advise their clients on the applicable laws and regulations.',
            'They can also provide representation in court proceedings and negotiations, draft contracts and documents, and provide legal advice on various matters. They offer complete legal solutions for civil litigation matters.'
          ]
        }
      ];

      civilService.documentChecklist = [
        'Plaint or petition',
        'Affidavit in support',
        'Relevant agreements or contracts',
        'Property documents (if applicable)',
        'Correspondence between parties',
        'Evidence and witness statements',
        'Identity and address proof',
        'Court fee payment receipt',
        'Power of attorney (if applicable)'
      ];

      civilService.popularCases = [
        'K.S. Puttaswamy vs Union of India (2017) - Right to privacy as fundamental right',
        'M.C. Mehta vs Union of India (1986) - Environmental pollution and public nuisance',
        'Mohd. Ahmed Khan vs Shah Bano Begum (1985) - Rights of divorced Muslim women'
      ];

      civilService.faqs = [
        {
          question: 'What is civil law?',
          answer: 'Civil law is a legal system that governs the relationships between individuals and organizations, including their rights and obligations. It covers disputes such as contracts, property, torts, and family matters.'
        },
        {
          question: 'What types of disputes are covered by civil law?',
          answer: 'Civil law covers a wide range of disputes, including contract disputes, property disputes, personal injury claims, family law matters, consumer protection cases, and tort claims.'
        },
        {
          question: 'What is the difference between civil law and criminal law?',
          answer: 'Civil law deals with disputes between private individuals and organizations, while criminal law deals with crimes committed against the state. Civil cases seek compensation or specific performance, while criminal cases seek punishment.'
        },
        {
          question: 'What is the process for filing a civil lawsuit?',
          answer: 'To file a civil lawsuit, you need to first hire an attorney, who will help you prepare your case and file the necessary paperwork with the court. The process includes drafting a plaint, filing it with appropriate court fees, and serving notice to the defendant.'
        },
        {
          question: 'What is the burden of proof in a civil case?',
          answer: 'In a civil case, the burden of proof is on the plaintiff to prove their case by a preponderance of the evidence, which means that it is more likely than not that the defendant is liable.'
        }
      ];

      civilService.seoKeywords = [
        'Best Civil Lawyer',
        'Top Civil Lawyer',
        'Top 10 Civil Lawyer in India',
        'Best Civil Lawyers near me',
        'Civil Lawyer for property',
        'Civil Lawyer for property damage',
        'civil suit lawyers near me',
        'lawyers for civil suits near me',
        'civil litigation lawyer near me',
        'civil litigation attorney near me',
        'Civil Lawyer for High Court',
        'Best Civil Lawyer of Supreme Court'
      ];

      await civilService.save();
      console.log('✓ Civil Law service updated successfully!');
    } else {
      console.log('✗ Civil Law service not found');
    }

    console.log('\n========================================');
    console.log('Services updated successfully!');
    console.log('========================================\n');
    
  } catch (error) {
    console.error('Error updating services:', error);
  } finally {
    await mongoose.connection.close();
  }
};

updateChequeAndCivilServices();
