require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const updateFourMoreServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // ============================================
    // UPDATE CONTRACT DISPUTE SERVICE
    // ============================================
    console.log('\n--- Updating Contract Dispute Service ---');
    const contractService = await Service.findOne({ slug: 'contract-lawyer' });
    
    if (contractService) {
      contractService.heroImage = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80';
      
      contractService.shortDescription = 'Contract Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      contractService.overview = `Contract law in India governs the enforceable guarantees and agreements that people, agencies, and other entities may enter into. It is a body of law that regulates and enforces the making and performance of agreements. It is based on the Indian Contract Act of 1872, which is a detailed piece of law that governs how contracts are formed and enforced.`;

      contractService.contentBlocks = [
        {
          heading: 'Types of Disputes in Contract Cases',
          paragraphs: [
            'In India, contract law is governed by the Indian Contract Act of 1872. Contracts are legally binding agreements between two or more parties to do or refrain from doing something. Disputes in contract law arise when one or more parties to the contract fail to fulfil their obligations as stated in the contract.',
            'One common type of dispute is a breach of contract. This occurs when one or more of the parties does not fulfil their obligations as stated in the contract. This could involve a failure to provide goods or services as promised, a failure to pay the agreed-upon price, or a failure to deliver on time.',
            'Another type is a breach of warranty, which occurs when parties fail to fulfil their warranty obligations. A third type involves disputes over the interpretation of the contract, and a fourth type concerns disputes over damages.'
          ]
        },
        {
          heading: 'Types of Acts and Provisions Attracted in Contract Disputes',
          paragraphs: [
            'Contract disputes in India include various acts and provisions that can be applicable to particular occasions. The Indian Contract Act, 1872, is the primary legal source governing contract disputes in India, and it is supplemented by various other acts and provisions.',
            'The Indian Contract Act, 1873, includes numerous provisions that may be used to interpret and remedy settlement disputes in India. The Act provides for many treatments for breach of settlement, including unique performance and/or damages.',
            'In addition to the Indian Contract Act, other statutes such as the Indian Penal Code and the Consumer Protection Act, 1986, may be applicable to contract disputes. The Indian Evidence Act, 1872 is also relevant to agreement disputes.'
          ]
        },
        {
          heading: 'Rights and Obligations Under Contract Law',
          paragraphs: [
            'Contract law in India is an important part of the legal system. It governs the rights and obligations of the parties involved in a contract. It ensures that the parties have a clear understanding of the terms of the contract and that they abide by them.',
            'The Indian Contract Act outlines the rights and responsibilities of parties involved in an agreement. First and foremost, each party needs to conform to the terms and situations of the agreement so as for it to be legally binding. They should also act in good faith.',
            'Additionally, each party has an obligation to fulfil their contractual responsibilities in a timely manner and to refrain from any act that might harm the other party\'s interests. The Act also outlines remedies for any breach of the contract.'
          ]
        },
        {
          heading: 'Role of Contract Lawyer',
          paragraphs: [
            'A Contract Lawyer plays a vital role in contract law. The lawyer ensures that the parties concerned in a contract are provided with legal advice, guidance, and representation. The lawyer is the one who makes certain that the agreement is legally binding and valid.',
            'A Contract Lawyer is responsible for analyzing and understanding the contract in detail. They must make sure that all the clauses of the settlement are consistent with the relevant laws and policies of the country.',
            'A lawyer is also responsible for drafting the contract, negotiating the terms and conditions, and providing legal advice on the enforcement of the contract. They must be capable of identifying any potential breaches and providing advice on how to resolve them.'
          ]
        },
        {
          heading: 'Documents Required to File a Case',
          paragraphs: [
            'Contract law governs the enforceable guarantees and agreements that people, organizations, and other entities may enter into. Filing a case related to contract law requires several important documents.',
            'The Indian Contract Act of 1872 outlines the fundamental requirements of contract law in India. This Act is supplemented by the Indian Sale of Goods Act and the Indian Partnership Act.',
            'Documents typically required include the contract agreement, correspondence between parties, evidence of breach, witness statements, and relevant supporting documents that establish the facts of the case.'
          ]
        },
        {
          heading: 'How Grover & Grover, Advocates Help in Contract Disputes',
          paragraphs: [
            'Grover & Grover, Advocates and Solicitors, is one of the leading law firms in India, providing legal advice and services on a wide variety of issues related to contract law. Our group of experienced specialists is well versed in the intricacies of contract law.',
            'Our firm specializes in ensuring that all parties involved in a contract are aware of their responsibilities and rights, and that any disputes that might arise between them are resolved in a timely and amicable manner.',
            'We provide advice on the drafting and execution of contracts as well as dispute resolution services, including legal cases if necessary. We help clients understand the rights and liabilities arising out of a contract and provide advice on various remedies available.'
          ]
        }
      ];

      contractService.documentChecklist = [
        'Original contract agreement',
        'All amendments and addendums',
        'Correspondence between parties',
        'Evidence of breach',
        'Notice of breach sent to defaulting party',
        'Financial documents and invoices',
        'Witness statements',
        'Expert opinions (if applicable)',
        'Relevant supporting documents'
      ];

      contractService.popularCases = [
        'Keshavlal Laxmidas & Co. Vs. Union of India (1969) - Breach of contract damages',
        'State of Gujarat vs. Vadilal Sarabhai (1973) - Government contract breach',
        'P.G. Narayana & Co. Vs. State of Kerala (1975) - Service contract dispute'
      ];

      contractService.faqs = [
        {
          question: 'What is contract law in India?',
          answer: 'Contract law in India is a set of legal rules and principles that govern the formation, performance, and enforcement of agreements between two or more parties. It is primarily based on the Indian Contract Act of 1872.'
        },
        {
          question: 'What are the essential elements of a valid contract in India?',
          answer: 'The essential elements of a valid contract in India include offer and acceptance, intention to create legal relations, consideration, capacity of parties, free consent, lawful object, and certainty and possibility of performance.'
        },
        {
          question: 'What are the remedies available for breach of contract?',
          answer: 'The remedies available for breach of contract under Indian contract law include specific performance, damages, quantum meruit, and injunction.'
        },
        {
          question: 'What is the limitation period for filing a suit for breach of contract?',
          answer: 'The limitation period for filing a suit for breach of contract in India is three years from the date of the breach.'
        },
        {
          question: 'Can a contract be enforced if it is not in writing?',
          answer: 'Yes, a contract can be enforced even if it is not in writing in India. However, certain types of contracts, such as contracts for the sale of immovable property, must be in writing to be enforceable.'
        }
      ];

      contractService.seoKeywords = [
        'business lawyer near me',
        'corporate lawyer near me',
        'commercial lawyer near me',
        'Best Commercial Lawyers',
        'Top Commercial Lawyers in India',
        'Top Business Lawyers in High Court',
        'Top Business Lawyers in Supreme Court',
        'company lawyers near me',
        'Corporate law firms near me',
        'Contract dispute lawyer',
        'Business contract attorney'
      ];

      await contractService.save();
      console.log('✓ Contract Dispute service updated successfully!');
    } else {
      console.log('✗ Contract Dispute service not found');
    }

    // ============================================
    // UPDATE CORPORATE LAW SERVICE
    // ============================================
    console.log('\n--- Updating Corporate Law Service ---');
    const corporateService = await Service.findOne({ slug: 'corporate-law' });
    
    if (corporateService) {
      corporateService.heroImage = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80';
      
      corporateService.shortDescription = 'Corporate Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      corporateService.overview = `Corporate law is a branch of law that deals with the formation, operation, and dissolution of corporations. It is the set of rules and regulations that govern the activities of corporations, including their rights and liabilities. Corporate law includes areas such as company formation, corporate governance, shareholder rights, mergers and acquisitions, corporate finance, intellectual property protection, bankruptcy laws, and taxation.`;

      corporateService.contentBlocks = [
        {
          heading: 'Companies Act 2013',
          paragraphs: [
            'The Companies Act 2013 is a major piece of legislation governing the incorporation, operation, and regulation of companies in India. It is a comprehensive law that regulates the registration, functioning, and management of companies in India.',
            'The Act provides for the formation and regulation of various types of companies, such as public limited companies, private limited companies, one-person companies (OPCs), small companies, producer companies, foreign companies, and charitable organisations.',
            'It also covers aspects like corporate social responsibility (CSR) compliance, related party transactions (RPTs), mergers and acquisitions (M&As), winding up, and dissolution, among others.'
          ]
        },
        {
          heading: 'Types of Companies & Their Legal Requirements',
          paragraphs: [
            'Companies come in all shapes and sizes, and each one must comply with the legal requirements that are applicable to their particular type. It is important for companies to understand the different types of companies and the legal requirements that apply to them.',
            'In India, there are various types of companies with different legal requirements. Depending on the type of company and its purpose, the legal requirements can vary significantly. For example, private limited companies must adhere to different rules than public limited companies.',
            'The Companies Act, 1956, governs all corporations in India. A private limited company may not have more than 50 shareholders, and it is mandatory to appoint a company secretary and send an annual list of shareholders to the Registrar of Companies.'
          ]
        },
        {
          heading: 'Types of Corporate Cases',
          paragraphs: [
            'Corporate laws in India are a set of legal regulations that govern the formation, operation, and management of corporations. Corporate cases are an important part of corporate law and can be broadly classified into three categories: civil cases, criminal cases, and administrative cases.',
            'Shareholder Disputes revolve around disputes between shareholders and the company. The legal issues that need to be addressed include whether the company is complying with its constitution, complying with its by-laws, and maintaining adequate records.',
            'Corporate cases involve disputes between companies, shareholders, directors, creditors, and other stakeholders. The laws governing corporate cases in India are quite complex and require a thorough understanding of the legal provisions.'
          ]
        },
        {
          heading: 'Role of Lawyer in Corporate Cases',
          paragraphs: [
            'Corporate Lawyers play a vital role in corporate cases, providing legal advice and representation to corporations and individuals involved in business disputes. Corporate Lawyers are also responsible for analyzing the applicable laws, rules, and precedents.',
            'Corporate Lawyers must be well-versed in both civil and criminal law, as well as the specific laws governing their practice area. They must understand how to interpret these laws in order to provide effective legal advice.',
            'Lawyers play an important role in helping corporations stay compliant with regulations, as well as providing strategic advice on how to structure deals and transactions. They are essential for any business dealing with corporate cases.'
          ]
        },
        {
          heading: 'Documents Required For Corporate Cases',
          paragraphs: [
            'Corporate cases often require a lot of paperwork to be completed. In order to make sure that the case is handled properly and legally, it is important for all of the required documents to be present.',
            'The certificate of incorporation can be used to show that the company does, in fact, exist and was created on a certain date. It also helps to ensure that all of the rights and privileges granted by law are assigned to the legal entity.',
            'After filing a certificate of incorporation, an officer may file a notice on behalf of the corporation to change its corporate name, address, or other information. A notice of corporate name change must be filed with the Secretary of State within 90 days.'
          ]
        },
        {
          heading: 'How Grover & Grover, Advocates Help in Corporate Cases',
          paragraphs: [
            'Grover & Grover, Advocates and Solicitors, is a law firm that specializes in providing legal advice and representation for corporate cases. The firm has a team of experienced lawyers who have expertise in corporate law, intellectual property law, contract law, labour law, and more.',
            'The team provides comprehensive legal services to their clients. They can help with the formation of companies, mergers and acquisitions, due diligence, drafting contracts and agreements, dispute resolution, and more.',
            'They also provide advice on regulatory compliance issues to ensure that the company is operating within the bounds of the law. With their expertise and experience in corporate cases, they can help navigate any legal issues.'
          ]
        }
      ];

      corporateService.documentChecklist = [
        'Certificate of Incorporation',
        'Memorandum of Association (MOA)',
        'Articles of Association (AOA)',
        'Board resolutions',
        'Shareholder agreements',
        'Financial statements and audit reports',
        'Compliance certificates',
        'Relevant correspondence',
        'Corporate governance documents'
      ];

      corporateService.popularCases = [
        'Kotak Mahindra Bank Limited vs. Prakash Bakshi - Remuneration dispute',
        'Re Cavendish Square Holding Co. Ltd. v. Sea Containers Ltd. (2008) - Criminal liability of directors',
        'State of Karnataka vs. Krishnappa - Corporate governance matters'
      ];

      corporateService.faqs = [
        {
          question: 'What is corporate law?',
          answer: 'Corporate law is a body of law that governs the formation, management, and operation of corporations and other business entities. It encompasses corporate governance, contracts, mergers and acquisitions, securities, and intellectual property.'
        },
        {
          question: 'What types of businesses are covered by corporate law?',
          answer: 'Corporate law covers corporations, limited liability companies (LLCs), partnerships, sole proprietorships, and non-profit organizations that engage in business activities.'
        },
        {
          question: 'What are the primary responsibilities of a corporate lawyer?',
          answer: 'Primary responsibilities include advising businesses on legal matters, drafting and negotiating contracts, conducting due diligence for M&A, advising on compliance, and representing businesses in disputes.'
        },
        {
          question: 'What is the process of forming a corporation?',
          answer: 'The process typically involves filing articles of incorporation with the state, drafting corporate bylaws, and issuing stock. A corporate lawyer can assist with ensuring compliance with applicable laws.'
        },
        {
          question: 'What is the role of a corporate lawyer in regulatory compliance?',
          answer: 'Corporate lawyers advise companies on laws and regulations that apply to their operations, help establish compliance programs, conduct compliance audits, and provide guidance on responding to regulatory inquiries.'
        }
      ];

      corporateService.seoKeywords = [
        'Business attorney near me',
        'Business lawyer near me',
        'Commercial lawyer near me',
        'Best Corporate Lawyer in India',
        'Top Corporate Lawyer in India',
        'Best Corporate law firms in India',
        'Top Corporate Lawyer firms',
        'Corporate litigation lawyer',
        'Corporate Lawyer consultation',
        'Commercial and business lawyers',
        'Business law firms near me',
        'company lawyers near me'
      ];

      await corporateService.save();
      console.log('✓ Corporate Law service updated successfully!');
    } else {
      console.log('✗ Corporate Law service not found');
    }

    console.log('\n========================================');
    console.log('Contract and Corporate services updated!');
    console.log('========================================\n');
    
  } catch (error) {
    console.error('Error updating services:', error);
  } finally {
    await mongoose.connection.close();
  }
};

updateFourMoreServices();
