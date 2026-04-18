require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'non-disclosure-agreement',
  name: 'Non-disclosure Agreement',
  sections: [
    {
      type: 'hero',
      heading: 'Non-disclosure Agreement',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Comprehensive NDA Drafting and Protection',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Non-Disclosure Agreements',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A nondisclosure agreement is often referred to simply as an NDA or, indeed, a confidentiality agreement. It\'s a legally binding contract that establishes a confidential relationship between parties. As a lawyer non disclosure agreement specialist, we always guarantee that every one of those contracts is comprehensive, enforceable and at the same time direct with whatever your business objective is.\n\nNondisclosure agreements are quite versatile and can be applied in various situations to protect your company\'s trade secrets, proprietary information, and confidential data across different industries and contexts.'
      }
    },
    {
      type: 'benefits',
      heading: 'The Power of NDAs in Various Contexts',
      visible: true,
      order: 2,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Employees',
            description: 'Protect your company\'s trade secrets and proprietary information from current and former employees, ensuring business confidentiality is maintained throughout and after employment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Potential Investors',
            description: 'Protect the plans and financial data of your business when raising funds, ensuring sensitive business information remains confidential during investment discussions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Product Design',
            description: 'Only disclose your innovative designs at the development and manufacturing stages, protecting intellectual property and competitive advantages.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Software Development',
            description: 'Prevent leakages of your codes, algorithms, and technical specifications in IT projects, safeguarding your technological innovations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Research Sample',
            description: 'Maintain the confidentiality of your research methodologies and findings, protecting academic and scientific intellectual property.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Salesperson',
            description: 'Protect client lists, pricing strategies, and sales techniques from competitors, maintaining your competitive edge in the market.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Musicians',
            description: 'Safeguard unreleased music, lyrics, and creative processes in the entertainment industry, protecting artistic intellectual property.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Medical Office',
            description: 'Ensure patient privacy and comply with healthcare regulations, maintaining HIPAA compliance and medical confidentiality.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement for Visitors',
            description: 'Protect sensitive information when hosting visitors at your facilities, ensuring business confidentiality during tours and meetings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non Disclosure Agreement When Leaving a Job',
            description: 'Maintain confidentiality obligations post-employment, ensuring former employees continue to protect company secrets.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'The Legal Weight of Non-Disclosure Agreements',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        body: 'One of the most frequent questions people ask is, "Are non disclosure agreements legally binding?" The answer is affirmative. These are highly legally binding documents when precisely drafted by an experienced lawyer in non disclosure agreement. They are enforceable in court, which means if your confidentiality was breached you have legal grounds to complain.\n\nCan a Non Disclosure Agreement Be Used in Court? Of course, the carefully composed NDA is a good tool in court. In case of breach, your lawyer could bring the signed document into the courtroom as proof of terms agreed upon regarding confidentiality. It may be very crucial to actually impose damages or stop further unauthorized disclosure.'
      }
    },
    {
      type: 'process',
      heading: 'Crafting Ironclad Non-Disclosure Agreements',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Identifying Confidential Information',
            description: 'We work with you to clearly define what constitutes confidential information in your context, ensuring comprehensive coverage of all sensitive materials.'
          },
          {
            stepNumber: 2,
            title: 'Specifying Permitted Uses',
            description: 'We outline how the recipient can (and cannot) use the confidential information, establishing clear boundaries and limitations.'
          },
          {
            stepNumber: 3,
            title: 'Determining Duration',
            description: 'We establish how long the confidentiality obligations will remain in effect, balancing protection needs with practical considerations.'
          },
          {
            stepNumber: 4,
            title: 'Outlining Consequences',
            description: 'We clearly state the repercussions of breaching the agreement, including legal remedies and damages.'
          },
          {
            stepNumber: 5,
            title: 'Ensuring Compliance',
            description: 'We include clauses that allow you to audit compliance and seek injunctive relief if necessary, providing ongoing protection.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Non Disclosure Agreement Meaning and Implications',
      visible: true,
      order: 5,
      background: 'dark',
      content: {
        body: 'Knowing the meaning of a non-disclosure agreement is crucial for both parties. As your lawyer non disclosure agreement, we ensure that the language is clear and unambiguous, leaving no room for misinterpretation. Clarity, in short, is the tenet on which a validly drafted contract remains enforceable and potent in protecting your interests.\n\nOur team of contract lawyer non disclosure agreement has been developing non disclosure agreement templates for myriad scenarios and industries which lay down an adequately robust foundation for your confidentiality agreements. Every case is unique, but a strong foundation can indeed be helpful.'
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Expertise Across Industries',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Technology and Software',
            description: 'Protecting proprietary algorithms, source codes, and other advanced features in the rapidly evolving tech industry.'
          },
          {
            icon: 'CheckCircle',
            title: 'Healthcare',
            description: 'Patient confidentiality is protected as well as HIPAA compliance, ensuring medical information remains secure.'
          },
          {
            icon: 'CheckCircle',
            title: 'Finance',
            description: 'Safeguarding investment strategies and customer data in the financial services sector.'
          },
          {
            icon: 'CheckCircle',
            title: 'Entertainment',
            description: 'Protecting unreleased content and creative processes in the media and entertainment industry.'
          },
          {
            icon: 'CheckCircle',
            title: 'Manufacturing',
            description: 'Protecting product designs and production techniques in manufacturing and industrial sectors.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Cases Shaping Confidentiality Law',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Tata Consultancy Services Ltd. v. Cyrus Investments Pvt. Ltd. (2020)',
            description: 'This case underscored the importance of maintaining confidentiality in corporate affairs, influencing how we draft NDAs for high-level executives and board members.'
          },
          {
            icon: 'CheckCircle',
            title: 'Zee Entertainment Enterprises Ltd. v. Sony Pictures Networks India Pvt. Ltd. (2021)',
            description: 'This case highlighted the complexities of confidentiality in media mergers, shaping our approach to NDAs in entertainment industry deals.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bilcare Ltd. v. Amartara Pvt. Ltd. (2007)',
            description: 'This judgment set a precedent for protecting trade secrets under Indian law, influencing how we structure NDAs to safeguard proprietary information.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Secure Your Confidential Information',
      visible: true,
      order: 8,
      background: 'dark',
      content: {
        body: 'At GAG Lawyers - Grover and Grover Advocates and Solicitors, we are not just lawyers - we are your partner in protecting your most valuable information assets. Experience ranges from the most straightforward confidentiality agreement to highly complex industry-specific NDAs - all aiming to secure your interests and preserve competitive advantage.\n\nWhether you need a draft non disclosure agreement, an experienced advocate non disclosure agreement, or guidance on the non disclosure agreement meaning in your particular scenario, our team is ready and able to offer expert support. We navigate the complexities of confidentiality law so you can focus on innovation and growth, secure in the knowledge that your sensitive information is protected.\n\nLet our professional team of lawyers non disclosure agreement assist you in creating a protective wall around your confidential information and thus allowing a solid foundation for your organization\'s success and security.'
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
            question: 'What should be included in a basic non-disclosure agreement?',
            answer: 'A basic NDA should include: identification of all parties involved, clear definition of what constitutes confidential information, specific obligations of the recipient party, permitted and prohibited uses of the information, duration of the confidentiality obligation, consequences and remedies for breach, return or destruction of confidential materials clause, exclusions from confidential information (publicly available information, independently developed information), governing law and jurisdiction, and signatures of all parties. Your lawyer non disclosure agreement can advise on additional clauses depending on your specific needs and industry requirements.'
          },
          {
            question: 'How long does a non-disclosure agreement last?',
            answer: 'The duration of an NDA varies based on the nature of the confidential information and business needs. Typically, NDAs last between 2-5 years, but they can be shorter or longer. For trade secrets, the confidentiality obligation may extend indefinitely or until the information becomes publicly available. For time-sensitive information like product launches, a shorter duration may be appropriate. The duration should be reasonable and proportionate to the nature of the information being protected. Your lawyer can help determine the appropriate duration for your specific situation.'
          },
          {
            question: 'Is an NDA terminable?',
            answer: 'Yes, an NDA can be terminated under certain conditions. Termination can occur: by mutual agreement of both parties, upon expiration of the specified duration, if the confidential information becomes publicly available through no fault of the recipient, by court order, or if specific termination conditions outlined in the agreement are met. However, even after termination, certain obligations may continue, particularly regarding the return or destruction of confidential materials and ongoing protection of trade secrets. The termination clause should be clearly defined in the NDA to avoid disputes.'
          },
          {
            question: 'What is, at least, the consequence if a person breaches an NDA?',
            answer: 'Breaching an NDA can result in serious consequences including: monetary damages to compensate for losses caused by the breach, injunctive relief (court order to stop further disclosure), specific performance (court order to fulfill obligations), recovery of profits gained from unauthorized use, legal fees and court costs, reputational damage, termination of business relationships, and in some cases, criminal liability if the breach involves theft of trade secrets. The specific consequences depend on the terms of the NDA and the severity of the breach. A well-drafted NDA by an experienced lawyer will clearly outline these consequences.'
          },
          {
            question: 'Are verbal non-disclosure agreements enforceable?',
            answer: 'While verbal NDAs can theoretically be enforceable under contract law principles, they are extremely difficult to prove and enforce in court. The lack of written documentation makes it challenging to establish: what information was considered confidential, the specific terms and obligations agreed upon, the duration of the confidentiality obligation, and that both parties had a clear understanding and agreement. For these reasons, it is strongly recommended to always have written NDAs. A written NDA drafted by a lawyer provides clear evidence of the agreement, specific terms, and is much easier to enforce in case of breach. Verbal agreements should never be relied upon for protecting confidential information.'
          },
          {
            question: 'What is the difference between a unilateral and mutual NDA?',
            answer: 'A unilateral (one-way) NDA is used when only one party is disclosing confidential information to another party, such as an employer to an employee or a company to a contractor. A mutual (two-way) NDA is used when both parties will be sharing confidential information with each other, common in business partnerships, mergers and acquisitions, or joint ventures. The choice depends on your specific situation. Your lawyer can advise which type is appropriate for your needs.'
          },
          {
            question: 'Can an NDA prevent someone from working in their field?',
            answer: 'An NDA should not prevent someone from working in their field or using their general skills and knowledge. NDAs are designed to protect specific confidential information, not to restrict employment opportunities. However, NDAs are sometimes confused with non-compete agreements, which do restrict employment. Courts generally will not enforce overly broad NDAs that unreasonably restrict someone\'s ability to earn a livelihood. A properly drafted NDA by an experienced lawyer will focus on protecting specific confidential information while allowing the individual to use their general skills and knowledge in their profession.'
          },
          {
            question: 'Do I need an NDA for every business meeting?',
            answer: 'Not every business meeting requires an NDA. NDAs are necessary when you will be sharing sensitive, proprietary, or confidential information that could harm your business if disclosed. Consider an NDA for: discussions involving trade secrets, product development details, financial information, business strategies, customer lists, or proprietary technology. For general business discussions without sensitive information, an NDA may not be necessary. However, it\'s better to err on the side of caution. Consult with your lawyer to determine when an NDA is appropriate for your specific situations.'
          },
          {
            question: 'Can an NDA be enforced internationally?',
            answer: 'Enforcing an NDA internationally can be complex and depends on several factors including: the governing law specified in the agreement, whether the countries involved have treaties or agreements for mutual enforcement, the jurisdiction where the breach occurred, and local laws regarding confidentiality and trade secrets. For international business relationships, it\'s crucial to have an NDA drafted by a lawyer experienced in international law who can include appropriate clauses for cross-border enforcement, specify governing law and jurisdiction, and ensure compliance with laws in all relevant countries.'
          },
          {
            question: 'What information is typically excluded from an NDA?',
            answer: 'Standard exclusions from NDA coverage include: information that is already publicly available, information that becomes public through no fault of the recipient, information the recipient already knew before disclosure, information independently developed by the recipient without using confidential information, information received from a third party without confidentiality obligations, and information required to be disclosed by law or court order (with notice to the disclosing party). These exclusions are important to make the NDA reasonable and enforceable.'
          },
          {
            question: 'How much does it cost to have an NDA drafted by a lawyer?',
            answer: 'The cost of having an NDA drafted by a lawyer varies based on: complexity of the agreement, industry-specific requirements, whether it\'s a standard or customized NDA, the lawyer\'s experience and expertise, and geographic location. At GAG Lawyers, we offer transparent pricing and can provide a quote based on your specific needs. While there are free NDA templates available online, having a lawyer draft or review your NDA ensures it\'s properly tailored to your situation, legally enforceable, and provides maximum protection. The cost of a well-drafted NDA is minimal compared to the potential losses from inadequate protection of confidential information.'
          },
          {
            question: 'Can an NDA be modified after it\'s signed?',
            answer: 'Yes, an NDA can be modified after signing, but it requires: mutual agreement of all parties, a written amendment or addendum to the original agreement, proper execution (signatures) of the modification, and consideration (something of value exchanged) to make the modification legally binding. Verbal modifications are not recommended as they are difficult to prove and enforce. Any changes to an NDA should be documented in writing and reviewed by a lawyer to ensure they are properly executed and enforceable. The original NDA may also include provisions specifying how modifications can be made.'
          },
          {
            question: 'What should I do if someone breaches my NDA?',
            answer: 'If someone breaches your NDA, take these steps immediately: document the breach with evidence, review the NDA to understand the specific obligations breached and available remedies, send a cease and desist letter through your lawyer, attempt to mitigate damages and prevent further disclosure, consult with your lawyer about legal options including seeking injunctive relief and monetary damages, consider mediation or arbitration if specified in the NDA, and if necessary, file a lawsuit for breach of contract. Time is critical in NDA breach cases, especially for obtaining injunctive relief to stop ongoing disclosure. Contact your lawyer immediately upon discovering a breach.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert NDA Drafting Services?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional non-disclosure agreement services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Non-Disclosure Agreement Lawyer in Delhi - NDA Drafting | GAG Lawyers',
    metaDescription: 'Expert NDA drafting and confidentiality agreement services in Delhi. Protect your business secrets with legally binding non-disclosure agreements.'
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
