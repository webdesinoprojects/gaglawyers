require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'civil-lawyer',
  name: 'Civil Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Expert Civil Lawyers in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Professional legal representation for all civil law matters. Specialized expertise in property disputes, contract cases, family law, and civil litigation in Delhi courts.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Civil Law - Comprehensive Legal Framework',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Civil law is the body of laws in India that govern disputes between individuals and organizations. It encompasses a wide range of legal topics, including contracts, torts, property rights, family law, and more. Civil law is based on a set of rules and regulations that are designed to protect the rights of citizens.\n\nThe major provisions under civil law in India include contract laws, tort laws, property laws, family laws, succession laws, inheritance laws and consumer protection laws. These provide citizens with legal remedies for disputes arising out of contractual agreements or wrongful acts committed by another individual or organization.\n\nCivil law serves as a crucial instrument in maintaining societal order by providing remedies for wrongs committed against individuals or organizations. It establishes a legal structure for resolving conflicts and protecting individual rights, ensuring justice, fairness, and stability within society.'
      }
    },
    {
      type: 'benefits',
      heading: 'Purpose & Significance of Civil Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Protection of Individual Rights',
            description: 'Civil law safeguards the rights of individuals, businesses, and other entities while offering remedies for any violations of those rights.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution Framework',
            description: 'Provides a comprehensive legal structure for resolving conflicts between individuals or entities in a fair and systematic manner.'
          },
          {
            icon: 'CheckCircle',
            title: 'Justice & Accountability',
            description: 'Ensures justice, fairness, and stability within society by holding individuals accountable for their actions and promoting orderliness.'
          },
          {
            icon: 'CheckCircle',
            title: 'Economic Development Support',
            description: 'Creates an environment conducive to investment and growth by establishing legal frameworks to resolve disputes and protect rights.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Civil Cases & Matters',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Contract Disputes',
            description: 'Disputes arising from agreements or promises made between two or more parties, including breach of contract, misrepresentation, and unconscionability.'
          },
          {
            icon: 'CheckCircle',
            title: 'Property Disputes',
            description: 'Matters related to ownership, possession, and transfer of real estate and personal property, including property damage claims.'
          },
          {
            icon: 'CheckCircle',
            title: 'Tort Claims',
            description: 'Civil wrongs that cause harm to an individual or their property, resulting in lawsuits seeking compensation for damages.'
          },
          {
            icon: 'CheckCircle',
            title: 'Family Law Matters',
            description: 'Legal matters concerning marriage, divorce proceedings, child custody arrangements, adoption processes, and spousal support.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Major Statutes & Acts in Civil Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Indian Contract Act, 1872',
            description: 'Governs the formation and enforcement of contracts, defining essential elements like offer, acceptance, consideration, and free consent.'
          },
          {
            icon: 'CheckCircle',
            title: 'Transfer of Property Act, 1882',
            description: 'Governs matters related to transfer of property including sale, mortgage, lease, and gift transactions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Specific Relief Act, 1963',
            description: 'Provides legal remedies for specific performance of contracts, rescission of contracts, and declarations of title.'
          },
          {
            icon: 'CheckCircle',
            title: 'Indian Limitation Act, 1963',
            description: 'Sets out the time period within which a civil suit must be filed in order to be valid and enforceable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Indian Succession Act, 1925',
            description: 'Governs devolution of property upon death, including making of wills, intestate succession, and related matters.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Remedies Available Under Civil Law',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Damages',
            description: 'Monetary compensation awarded to the aggrieved party to make up for any losses caused by the defendant.'
          },
          {
            icon: 'CheckCircle',
            title: 'Injunctions',
            description: 'Legal orders issued by court to restrain a person from doing a particular act or require them to do a specific act.'
          },
          {
            icon: 'CheckCircle',
            title: 'Specific Performance',
            description: 'Court directs the defendant to fulfill a contractual obligation as specified in the contract.'
          },
          {
            icon: 'CheckCircle',
            title: 'Restitution',
            description: 'Requires a party who has wrongfully obtained a benefit from another to return that benefit to the other person.'
          },
          {
            icon: 'CheckCircle',
            title: 'Declaratory Judgment',
            description: 'Allows the court to determine the legal rights and obligations of the parties in a dispute.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Lawyers in Civil Law Matters',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Research & Analysis',
            description: 'Conduct thorough research and gain deep understanding of relevant laws, regulations, and legal principles applicable to each case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Case Preparation',
            description: 'Analyze facts of the case, provide legal advice to clients, and prepare all necessary legal documents and pleadings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings, present evidence effectively, and make persuasive arguments on behalf of clients.'
          },
          {
            icon: 'CheckCircle',
            title: 'Settlement Negotiations',
            description: 'Handle negotiations for settlements and may also handle appeals if necessary to protect client interests.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Civil Law Matters',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Legal Advice',
            description: 'We advise clients on applicable laws and regulations, helping them understand the implications of their options in civil matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Expert Court Representation',
            description: 'Our experienced lawyers provide representation in court proceedings and negotiations, ensuring effective presentation of your case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Document Drafting',
            description: 'We draft contracts, legal documents, pleadings, and affidavits with precision to support your civil case effectively.'
          },
          {
            icon: 'CheckCircle',
            title: 'Complete Legal Solutions',
            description: 'From property disputes to family law issues, contract disputes to consumer protection cases, we handle all civil law matters with expertise.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            question: 'What is civil law?',
            answer: 'Civil law is a legal system that governs the relationships between individuals and organizations, including their rights and obligations. It covers disputes such as contracts, property, torts, and family matters.'
          },
          {
            question: 'What types of disputes are covered by civil law?',
            answer: 'Civil law covers a wide range of disputes including contract disputes, property disputes, personal injury claims, family law matters, succession issues, and consumer protection cases.'
          },
          {
            question: 'What is the difference between civil law and criminal law?',
            answer: 'Civil law deals with disputes between private individuals and organizations, while criminal law deals with crimes committed against the state. Civil cases seek compensation, while criminal cases seek punishment.'
          },
          {
            question: 'What is the process for filing a civil lawsuit?',
            answer: 'To file a civil lawsuit, you need to hire an attorney who will help you prepare your case and file the necessary paperwork with the court, including pleadings, affidavits, and supporting evidence.'
          },
          {
            question: 'What is the statute of limitations for filing a civil lawsuit?',
            answer: 'The statute of limitations for filing a civil lawsuit varies depending on the type of case and is governed by the Indian Limitation Act, 1963. Different types of cases have different time limits.'
          },
          {
            question: 'What is the role of a judge in a civil lawsuit?',
            answer: 'The judge presides over the trial and makes rulings on issues such as admissibility of evidence, objections raised by parties, and ultimately determines the outcome of the case.'
          },
          {
            question: 'What is the difference between a settlement and a judgment in a civil lawsuit?',
            answer: 'A settlement is an agreement between the parties to resolve the case outside of court, while a judgment is a ruling by the court that determines the outcome of the case after trial.'
          },
          {
            question: 'What is the burden of proof in a civil case?',
            answer: 'In a civil case, the burden of proof is on the plaintiff to prove their case by a preponderance of the evidence, meaning it is more likely than not that the defendant is liable.'
          },
          {
            question: 'What are the most common types of civil cases?',
            answer: 'The most common types of civil cases include contract disputes, personal injury claims, property disputes, and family law matters such as divorce and child custody.'
          },
          {
            question: 'What is a tort?',
            answer: 'A tort is a civil wrong that causes harm to an individual or their property, and can result in a lawsuit seeking compensation for damages. Examples include negligence, defamation, and trespass.'
          },
          {
            question: 'What is a class action lawsuit?',
            answer: 'A class action lawsuit is a type of civil lawsuit in which a large group of people collectively sue a defendant for similar harm or damages, allowing efficient resolution of multiple similar claims.'
          },
          {
            question: 'What is the appeals process for a civil lawsuit?',
            answer: 'If you are not satisfied with the results of a civil lawsuit, you can file an appeal to a higher court within the prescribed time limit, challenging the lower court\'s decision.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Contact our expert legal team today for professional assistance with all civil law matters and litigation',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Civil Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Civil Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
