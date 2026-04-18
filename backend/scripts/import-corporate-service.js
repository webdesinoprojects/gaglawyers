require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'corporate-lawyer',
  name: 'Corporate Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Corporate Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for corporations, businesses, and commercial entities. Specialized in corporate law, mergers & acquisitions, compliance, and business disputes.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Corporate Law - Comprehensive Legal Framework',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Corporate law is a branch of law that deals with the formation, operation, and dissolution of corporations. It is the set of rules and regulations that govern the activities of corporations, including their rights and liabilities. Corporate law includes areas such as company formation, corporate governance, shareholder rights, mergers and acquisitions, corporate finance, intellectual property protection, bankruptcy laws, and taxation.\n\nCorporate law provides guidance on how to manage the day-to-day operations of a corporation in compliance with applicable laws and regulations. It is, in large part, the body of law and regulation governing corporations in all their forms. Many countries have legislation that directly or indirectly affects corporate entities and activities, such as securities regulations or bankruptcy rules.\n\nMostly, national laws provide a general framework for conducting business within a country; they also often define limits on what forms of legal entity may be used by private entities within the country. Most often, these are limited to companies limited by shares (i.e., corporations), partnerships, and sole proprietorships (i.e., unincorporated businesses).'
      }
    },
    {
      type: 'benefits',
      heading: 'Companies Act 2013',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Regulation',
            description: 'The Companies Act 2013 is a major piece of legislation governing the incorporation, operation, and regulation of companies in India. It provides for the formation and regulation of various types of companies, such as public limited companies, private limited companies, one-person companies (OPCs), small companies, producer companies, foreign companies, and charitable organisations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Corporate Governance & Transparency',
            description: 'The Act seeks to ensure greater transparency in corporate governance by laying down stringent rules for disclosure requirements by listed entities, mandatory auditor rotation, and such disclosures to be made in the company\'s annual report. As per Section 212, every company is required to publish a summary of its financial statements on its website.'
          },
          {
            icon: 'CheckCircle',
            title: 'CSR & Compliance',
            description: 'The Act covers aspects like corporate social responsibility (CSR) compliance, related party transactions (RPTs), mergers and acquisitions (M&As), winding up, and dissolution, among others.'
          },
          {
            icon: 'CheckCircle',
            title: 'Simplified Formation',
            description: 'The Companies (Amendment) Act, 2016, introduced changes in how Indian companies are formed so as to bring in: simplified procedures for the formation of companies; elimination of time restrictions on registration; enhancements to the provisions in the Act relating to holding companies, subsidiaries, and holding company subsidiaries.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Companies & Their Legal Requirements',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Public Limited Companies',
            description: 'Must be classified as a public limited company by Indian law and have at least one share of shares. The company must publish its annual returns on its website and file copies with the Registrar of Companies within 60 days after the end of the fiscal year.'
          },
          {
            icon: 'CheckCircle',
            title: 'Private Limited Companies',
            description: 'May not have more than 50 shareholders, who can be either individuals or companies. It is mandatory to appoint a company secretary and send an annual list of shareholders to the Registrar of Companies. Must have at least one director with shareholding of not less than 1% of the issued share capital.'
          },
          {
            icon: 'CheckCircle',
            title: 'One-Person Companies (OPCs)',
            description: 'A unique form of company that allows a single person to operate a corporate entity with limited liability protection.'
          },
          {
            icon: 'CheckCircle',
            title: 'Foreign Companies',
            description: 'Companies incorporated outside India with a subsidiary in India can be treated as a domestic company under certain provisions of the Act.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Corporate Cases',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Shareholder Disputes',
            description: 'Disputes between shareholders and the company regarding compliance with constitution, by-laws, and maintaining adequate records. Issues include whether the company is complying with general corporate law and financial matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Mergers & Acquisitions',
            description: 'Legal issues including antitrust concerns, regulatory compliance, intellectual property rights, and contract disputes arising from M&A transactions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Corporate Governance Disputes',
            description: 'Disputes involving board of directors, officers, and management regarding fiduciary duties, conflicts of interest, and corporate decision-making.'
          },
          {
            icon: 'CheckCircle',
            title: 'Regulatory Compliance',
            description: 'Issues related to compliance with securities laws, environmental regulations, anti-corruption laws, and other regulatory requirements.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Role of Corporate Lawyers',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        steps: [
          {
            title: 'Legal Advice & Guidance',
            description: 'Provide legal advice and guidance on how to best handle corporate cases, from negotiating contracts to drafting offer letters to assessing termination applications.'
          },
          {
            title: 'Contract Drafting & Negotiation',
            description: 'Draft and negotiate contracts, identify key legal and business issues, and ensure contracts accurately reflect the parties\' intentions and protect their interests.'
          },
          {
            title: 'Compliance & Regulatory Matters',
            description: 'Advise on compliance with corporate laws and regulations, develop policies and procedures to ensure compliance, and provide guidance on best practices for maintaining compliance.'
          },
          {
            title: 'Due Diligence & Research',
            description: 'Research relevant laws, rules, and precedents applicable to particular cases. Conduct due diligence for mergers and acquisitions to identify potential legal issues.'
          },
          {
            title: 'Dispute Resolution & Litigation',
            description: 'Represent clients in court proceedings, negotiations, mediation, or arbitration. Advocate for clients\' interests and provide guidance on strengths and weaknesses of their case.'
          },
          {
            title: 'Corporate Governance',
            description: 'Advise on compliance with corporate laws and regulations, draft and review governance policies, and ensure that the company\'s board of directors and officers act in the best interests of the company and its shareholders.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required for Corporate Cases',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Certificate of Incorporation',
            description: 'Used to show that the company does, in fact, exist and was created on a certain date. It also helps to ensure that all of the rights and privileges granted by law are assigned to the legal entity. Typically filed with the Secretary of State\'s Office.'
          },
          {
            icon: 'CheckCircle',
            title: 'Notice of Corporate Name Change',
            description: 'Must be filed with the Secretary of State within 90 days after the corporation\'s initial filing. Must include: (1) the name under which the corporation will transact business; (2) the name as it appears on its certificate of incorporation; and (3) a statement that the name change is approved by all members.'
          },
          {
            icon: 'CheckCircle',
            title: 'Corporate Bylaws',
            description: 'Internal rules and regulations governing the operation of the corporation, including governance structure, shareholder rights, and officer responsibilities.'
          },
          {
            icon: 'CheckCircle',
            title: 'Shareholder Agreements',
            description: 'Contracts between shareholders outlining their rights, obligations, and procedures for resolving disputes.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Corporate Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Company Formation & Structure',
            description: 'Assist with the formation of companies, advising on the appropriate corporate structure, and ensuring that the company\'s formation documents comply with applicable laws and regulations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Mergers & Acquisitions',
            description: 'Provide comprehensive legal services for M&A transactions, including due diligence, drafting and negotiating acquisition agreements, and providing guidance on regulatory compliance.'
          },
          {
            icon: 'CheckCircle',
            title: 'Contract Drafting & Review',
            description: 'Draft contracts and agreements, review existing contracts, and provide advice on contract interpretation and dispute resolution.'
          },
          {
            icon: 'CheckCircle',
            title: 'Regulatory Compliance',
            description: 'Provide advice on regulatory compliance issues to ensure that the company is operating within the bounds of the law. Establish compliance programs and policies, conduct compliance audits, and provide guidance on responding to regulatory inquiries.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'Represent clients in corporate disputes through negotiations, mediation, or litigation. Provide guidance on the strengths and weaknesses of their case and advocate for their interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Intellectual Property Protection',
            description: 'Advise on trademark, copyright, and patent law, draft and negotiate licensing agreements, and represent clients in disputes related to intellectual property infringement.'
          },
          {
            icon: 'CheckCircle',
            title: 'Employment Law',
            description: 'Advise on employment law, draft employment agreements and policies, conduct investigations into employee complaints, and represent companies in employment disputes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Crisis Management',
            description: 'Advise companies on legal issues that arise in crisis situations, such as data breaches, product recalls, and workplace accidents. Help companies manage legal risk and respond to inquiries from regulatory agencies.'
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
            title: 'Companies (Auditors Report) Law, 1989 vs. Companies Act of 2008',
            description: 'Case involving two companies that applied to both the High Court and Supreme Court for an order that the company\'s auditor must be appointed by another auditing firm out of concern that their auditor was working in collusion with its management to ensure favourable audit reports.'
          },
          {
            icon: 'CheckCircle',
            title: 'Kotak Mahindra Bank Limited vs. Prakash Bakshi',
            description: 'Dispute over a remuneration issue when the Managing Director took up the position of CEO for a subsidiary. The case sought a declaration that the remuneration received was excessive, contrary to the provisions of Indian law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Re Cavendish Square Holding Co. Ltd. v. Sea Containers Ltd.',
            description: 'The Court of Appeal held that a company\'s directors could be prosecuted and punished for offences committed by their company. This extended liability for criminal offences to the company as a whole, not just individual employees.'
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
            question: 'What is corporate law?',
            answer: 'Corporate law is a body of law that governs the formation, management, and operation of corporations and other business entities. It encompasses a wide range of legal issues, including corporate governance, contracts, mergers and acquisitions, securities, and intellectual property.'
          },
          {
            question: 'What types of businesses are covered by corporate law?',
            answer: 'Corporate law covers a variety of businesses, including corporations, limited liability companies (LLCs), partnerships, and sole proprietorships. It also applies to non-profit organizations and other entities that engage in business activities.'
          },
          {
            question: 'What are the primary responsibilities of a corporate lawyer?',
            answer: 'The primary responsibilities include advising businesses on legal matters, drafting and negotiating contracts, conducting due diligence for mergers and acquisitions, advising on compliance with corporate laws and regulations, and representing businesses in disputes.'
          },
          {
            question: 'How can a corporate lawyer help a business with compliance issues?',
            answer: 'A corporate lawyer can help by reviewing the company\'s operations and identifying potential areas of risk, developing policies and procedures to ensure compliance with applicable laws and regulations, and providing guidance on best practices for maintaining compliance.'
          },
          {
            question: 'What is the role of a corporate lawyer in corporate governance?',
            answer: 'Corporate lawyers play a crucial role by advising on compliance with corporate laws and regulations, drafting and reviewing governance policies, and ensuring that the company\'s board of directors and officers act in the best interests of the company and its shareholders.'
          },
          {
            question: 'What is the process of forming a corporation, and how can a corporate lawyer help?',
            answer: 'The process typically involves filing articles of incorporation with the state, drafting corporate bylaws, and issuing stock. A corporate lawyer can assist by ensuring that the company\'s formation documents comply with applicable laws and regulations, advising on the appropriate corporate structure, and helping to establish the company\'s initial governance policies.'
          },
          {
            question: 'What are some common legal issues that arise in mergers and acquisitions?',
            answer: 'Common legal issues include antitrust concerns, regulatory compliance, intellectual property rights, and contract disputes. A corporate lawyer can assist by conducting due diligence to identify potential legal issues, drafting and negotiating acquisition agreements, and providing guidance on regulatory compliance.'
          },
          {
            question: 'How do corporate lawyers assist with contract negotiation and drafting?',
            answer: 'Corporate lawyers assist by identifying key legal and business issues, negotiating favourable terms for their clients, and drafting contracts that accurately reflect the parties\' intentions and protect their interests. They also provide guidance on contract interpretation and dispute resolution.'
          },
          {
            question: 'What are the consequences of noncompliance with corporate laws and regulations?',
            answer: 'Noncompliance can result in significant legal and financial consequences, including fines, penalties, and legal liability. It can also damage a company\'s reputation and lead to lost business opportunities.'
          },
          {
            question: 'How do corporate lawyers assist with intellectual property matters?',
            answer: 'Corporate lawyers assist by advising on trademark, copyright, and patent law, drafting and negotiating licensing agreements, conducting due diligence to identify potential intellectual property issues, and representing clients in disputes related to intellectual property infringement.'
          },
          {
            question: 'How do corporate lawyers help with employment issues?',
            answer: 'Corporate lawyers help by advising on employment law, drafting employment agreements and policies, conducting investigations into employee complaints, and representing companies in employment disputes. They also provide guidance on best practices for creating a positive and compliant workplace culture.'
          },
          {
            question: 'What is the process of resolving a corporate dispute?',
            answer: 'The process typically involves negotiations, mediation, or litigation. A corporate lawyer can assist by representing their clients\' interests in negotiations, providing guidance on the strengths and weaknesses of their case, and advocating for their client in court or alternative dispute resolution proceedings.'
          },
          {
            question: 'What are some ethical issues that may arise in corporate law?',
            answer: 'Ethical issues include conflicts of interest, confidentiality, and attorney-client privilege. Lawyers can navigate these issues by adhering to ethical rules and guidelines, disclosing potential conflicts of interest to their clients, and seeking guidance from bar associations or other professional organizations.'
          },
          {
            question: 'What is the role of a corporate lawyer in regulatory compliance?',
            answer: 'Corporate lawyers play an important role by advising companies on laws and regulations that apply to their operations, such as environmental regulations, securities laws, and anti-corruption laws. They also help companies establish compliance programs and policies, conduct compliance audits, and provide guidance on responding to regulatory inquiries or investigations.'
          },
          {
            question: 'What is the role of a corporate lawyer in crisis management?',
            answer: 'Corporate lawyers play a critical role by advising companies on legal issues that arise in crisis situations, such as data breaches, product recalls, and workplace accidents. They help companies manage legal risk, respond to inquiries from regulatory agencies, and navigate potential litigation.'
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
        body: 'Contact our expert corporate law team today for professional legal guidance on business formation, compliance, M&A, and corporate disputes',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Corporate Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Corporate Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
