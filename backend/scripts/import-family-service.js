require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'family-lawyer',
  name: 'Family Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Family Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for family law matters including divorce, child custody, adoption, guardianship, property division, and domestic disputes. Compassionate representation for your family matters.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Family Law Disputes in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Family law disputes are disagreements between family members that arise from various matters. These may include marriage, divorce, child custody, adoption, guardianship, property division, and other related issues. Family law disputes can be emotionally and financially taxing for all parties involved. It is essential to understand the legal process to resolve these disputes effectively.\n\nDivorce can result in a family law dispute when one party seeks custody of children while the other party makes it financially or legally difficult to obtain. Family disputes are significant in India as they involve issues like marriage, divorce, adoption, and inheritance. Resolving these matters requires expert guidance from experienced family lawyers.\n\nFamily law disputes in India are governed by the Hindu Marriage Act, 1955 and the Special Marriage Act, 1954. These laws cover multiple aspects of family life, including marriage, divorce, adoption, and inheritance. Family lawyers provide remedies to settle disputes among family members or spouses and guide clients through the legal process to protect their rights.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Family Dispute Cases',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Marriage and Divorce',
            description: 'Marriage is the legal union between two individuals under any form or ceremony in India. Disputes can arise from the division of assets, child custody, guardianship, adoption, maintenance, and other related issues.'
          },
          {
            icon: 'CheckCircle',
            title: 'Child Custody',
            description: 'Determining which parent the child will live with, establishing a parenting plan, determining child support amounts, and addressing issues related to visitation or relocation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Adoption',
            description: 'Legal proceedings for adopting a child, including compliance with adoption laws and regulations in India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Guardianship',
            description: 'Legal appointment of a guardian for minors or individuals who cannot care for themselves.'
          },
          {
            icon: 'CheckCircle',
            title: 'Maintenance and Alimony',
            description: 'Financial support provided by one spouse to another after separation or divorce, including child support obligations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Property Division',
            description: 'Equitable distribution of marital property and assets during divorce proceedings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Domestic Violence',
            description: 'Protection orders and legal remedies for victims of domestic violence, abuse, or harassment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Inheritance and Succession',
            description: 'Matters related to wills, trusts, and distribution of property after death.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Court System',
            description: 'Family disputes are generally filed with the local Judicial Magistrate or District Court. In certain cases, disputes may also be filed with the High Court.'
          },
          {
            icon: 'CheckCircle',
            title: 'Complex Cases',
            description: 'Cases involving significant property or complex custody matters may require hearings before a Circuit Court of Sessions (CAS).'
          },
          {
            icon: 'CheckCircle',
            title: 'Appeals Process',
            description: 'Appeals can be made from lower courts to higher courts, including district courts and High Courts, depending on jurisdiction. Civil cases can be appealed to the Court of Appeals, while criminal cases may be retried under sufficient grounds.'
          },
          {
            icon: 'CheckCircle',
            title: 'Penalties for Non-Compliance',
            description: 'Failure to comply with court orders regarding maintenance, child support, or custody arrangements can result in penalties including fines and imprisonment.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Family Dispute Case',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        steps: [
          {
            title: 'File Petition or Complaint',
            description: 'File a signed petition or complaint with details of the petitioner and children involved.'
          },
          {
            title: 'Submit Affidavit',
            description: 'Submit an affidavit stating no criminal involvement and eligibility to file the case.'
          },
          {
            title: 'Provide Witnesses',
            description: 'Provide two witnesses who are independent and not related to the parties.'
          },
          {
            title: 'Attach Supporting Documents',
            description: 'Attach supporting documents like marriage certificates, adoption papers, or property records.'
          },
          {
            title: 'Court Proceedings',
            description: 'Attend court hearings where both parties present their case and evidence.'
          },
          {
            title: 'Judgment and Enforcement',
            description: 'Receive court judgment and ensure compliance with court orders.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Family Lawyers',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice',
            description: 'Advise clients on rights and obligations under family law, helping them understand the legal implications of their decisions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings and advocate for their interests before judges and magistrates.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation and Settlement',
            description: 'Negotiate settlements between parties to reach mutually acceptable agreements without lengthy litigation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Document Drafting',
            description: 'Draft legal documents such as petitions, wills, trusts, and agreements to ensure they are legally enforceable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'Help clients resolve disputes efficiently while protecting their interests through mediation, arbitration, or collaborative law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compliance Guidance',
            description: 'Ensure compliance with applicable family laws and procedures throughout the legal process.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Family Dispute Case',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Proof of Identity and Address',
            description: 'Aadhaar card, passport, voter ID, or PAN card for identification purposes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Relationship',
            description: 'Marriage certificate, children\'s birth certificates, adoption papers, joint property documents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Residence and Financials',
            description: 'Bank statements, utility bills, lease agreements, income proof, and property documents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence Related to Dispute',
            description: 'Emails, text messages, photographs, communication records, and any other evidence supporting the claim.'
          },
          {
            icon: 'CheckCircle',
            title: 'Other Relevant Documentation',
            description: 'Any other documents that support the claim, including medical records, police reports, or witness statements.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Family Disputes',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Legal Advice',
            description: 'Provide legal advice on applicable laws and regulations governing family disputes in India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings and hearings, presenting strong arguments and evidence.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation and Mediation',
            description: 'Assist in negotiation, mediation, and settlement agreements to resolve disputes amicably.'
          },
          {
            icon: 'CheckCircle',
            title: 'Child Custody Matters',
            description: 'Provide guidance on child custody, visitation rights, and child support arrangements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Adoption and Guardianship',
            description: 'Assist with adoption proceedings and guardianship matters, ensuring compliance with legal requirements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Divorce and Alimony',
            description: 'Guide clients through divorce proceedings, including alimony and asset division matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Domestic Violence Protection',
            description: 'Help victims of domestic violence obtain protection orders and legal remedies.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legally Enforceable Agreements',
            description: 'Ensure all agreements are legally enforceable and protect clients\' rights and interests.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Supreme Court & High Court Cases',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Golak Nath vs. State of Punjab (1967)',
            description: 'Established that the Constitution of India cannot be amended by Parliament to eliminate the fundamental rights given to citizens by the Constitution.'
          },
          {
            icon: 'CheckCircle',
            title: 'Kesavananda Bharati vs. State of Kerala (1973)',
            description: 'Established the doctrine of the fundamental structure of the Constitution of India and held that Parliament cannot amend the Constitution in such a manner that its basic structure is altered.'
          },
          {
            icon: 'CheckCircle',
            title: 'Mohd. Ahmed Khan vs. Shah Bano Begum (1985)',
            description: 'Established that if a Muslim man divorces his wife, he is liable to pay her alimony regardless of whether or not she is self-supporting.'
          },
          {
            icon: 'CheckCircle',
            title: 'Githa Hariharan vs. Reserve Bank of India (1999)',
            description: 'Established that the Hindu Adoption and Maintenance Act, 1956, applies equally to all Hindus, regardless of their caste.'
          },
          {
            icon: 'CheckCircle',
            title: 'Vimla Devi vs. Ram Sarup (2004)',
            description: 'Established that a Hindu wife can claim maintenance from her husband even though she is not able to prove that she has been abandoned by him.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 9,
      background: 'light',
      content: {
        items: [
          {
            question: 'What are family dispute matters?',
            answer: 'Family dispute law, also known as family law, is the branch of law that deals with legal issues related to family relationships. This can include divorce, child custody and support, adoption, and domestic violence, among other issues.'
          },
          {
            question: 'What types of disputes can be addressed by family law?',
            answer: 'Family law can address a wide range of disputes including divorce or separation, child custody and support, division of property, spousal support, adoption, paternity disputes, domestic violence, child abuse or neglect, and restraining orders.'
          },
          {
            question: 'How do I know if I need a family dispute lawyer?',
            answer: 'If you are facing a legal issue related to family, it is often a good idea to consult with a family law attorney. An attorney can help you understand your rights and options, and can advocate for your interests in court if necessary.'
          },
          {
            question: 'What are the benefits of hiring a family dispute lawyer?',
            answer: 'Benefits include legal expertise and guidance, representation in court, advocacy for your interests, help navigating complex legal procedures, negotiation with the other party, and protection of your rights throughout the process.'
          },
          {
            question: 'What should I look for in a family dispute lawyer?',
            answer: 'Look for someone with experience and expertise in the specific area of law you need help with. Consider the attorney\'s reputation, communication style, and fee structure. Schedule a consultation to discuss your case and assess their approach and qualifications.'
          },
          {
            question: 'How long does a family dispute case take to resolve?',
            answer: 'The length of time varies widely depending on the specific issues involved and the approach taken by the parties. Some cases can be resolved through negotiation or mediation in weeks or months, while others may take years through trial or appeal.'
          },
          {
            question: 'What are some alternatives to going to court in a family dispute case?',
            answer: 'Alternative dispute resolution methods include negotiation, mediation, or collaborative law. These can be less costly and time-consuming than going to court, and can help preserve important relationships.'
          },
          {
            question: 'How can I prepare for a family dispute case?',
            answer: 'Work with your attorney to gather and organize all relevant information and documentation, including financial records, communications between parties, and relevant legal agreements or court orders. Be prepared to negotiate and compromise.'
          },
          {
            question: 'What are some common issues that arise in child custody disputes?',
            answer: 'Common issues include determining which parent the child will live with, establishing a parenting plan, determining child support amounts, and addressing visitation or relocation issues. Disputes can be particularly challenging when there are allegations of abuse, neglect, or substance abuse.'
          },
          {
            question: 'What is the process for getting a restraining order?',
            answer: 'The process typically involves filing a petition with the court and appearing before a judge to present evidence of abuse or harassment. If granted, the restraining order will prohibit the abuser from having contact with you and may require them to stay a certain distance away.'
          },
          {
            question: 'How are property and assets divided in a divorce case?',
            answer: 'Property division can be based on equitable distribution (considering factors like length of marriage, contributions of each spouse, and needs) or community property laws (all property acquired during marriage is equally owned by both spouses).'
          },
          {
            question: 'How can I protect my assets in a divorce case?',
            answer: 'Consider getting a prenuptial or postnuptial agreement, document your assets, keep detailed records of financial transactions, and work with an experienced family law attorney.'
          },
          {
            question: 'Can grandparents seek visitation rights?',
            answer: 'In some cases, grandparents may seek visitation rights if they are being prevented from seeing their grandchildren. They must demonstrate an established relationship with the child and that it is in the child\'s best interest to maintain that relationship.'
          },
          {
            question: 'What is the role of a lawyer in a family dispute case?',
            answer: 'A family law attorney provides legal advice and representation, helps navigate the complex legal process, negotiates with the other side, and advocates for clients\' interests in court. They assist with divorce, child custody, child support, spousal support, property division, and domestic violence matters.'
          },
          {
            question: 'What are some alternative dispute resolution methods?',
            answer: 'Methods include mediation (neutral third party facilitates communication), collaborative law (both parties work with attorneys to reach agreement), and arbitration (neutral third party renders a binding decision). These can be less costly and time-consuming than litigation.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact our expert family lawyers today for compassionate and professional legal assistance with your family law matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Family Lawyer in Delhi – GAG Lawyers',
    metaDescription: 'Family Lawyer in Delhi – GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
