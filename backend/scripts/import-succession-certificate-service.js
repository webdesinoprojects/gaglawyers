require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'succession-certificate',
  name: 'Succession Certificate',
  sections: [
    {
      type: 'hero',
      heading: 'Succession Certificate',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Succession Certificate Applications',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Succession Certificate',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'An inheritance certificate is a legal instrument that empowers the person to represent the property of a deceased person. It is a certificate of succession issued by a civil court to prove that it confirms a grant of the rights of the legal heirs of the deceased person over the deceased\'s property and securities.\n\nAt GAG Lawyers - Grover and Grover Advocates and Solicitors, we understand the intricacies of inheritance and succession law in India. We offer you a whole team of expert lawyer for succession certificates who will guide you at each step.'
      }
    },
    {
      type: 'benefits',
      heading: 'When is a Succession Certificate Required?',
      visible: true,
      order: 2,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Claims on Bank Deposits',
            description: 'To claim deposits or savings in the bank accounts of the deceased person, ensuring rightful access to financial assets.'
          },
          {
            icon: 'CheckCircle',
            title: 'Transfer of Shares',
            description: 'To transfer shares or unit trusts held by the deceased to legal heirs, facilitating proper succession of securities.'
          },
          {
            icon: 'CheckCircle',
            title: 'Requesting Debts',
            description: 'To request and recover debts owed to the deceased from various parties, protecting the estate\'s interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Access to Safe Deposits',
            description: 'To gain access to safe deposit boxes and lockers held by the deceased in banks and financial institutions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Prevent Claims of Damages',
            description: 'To prevent unauthorized claims and protect the estate from fraudulent or improper claims by third parties.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'The Process of Obtaining a Succession Certificate',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Filing a Petition',
            description: 'File a petition in the appropriate civil court with jurisdiction over the matter, providing all necessary details about the deceased and the estate.'
          },
          {
            stepNumber: 2,
            title: 'Providing Documents and Evidence',
            description: 'Submit all necessary documents and evidence including death certificate, proof of relationship, list of legal heirs, and details of assets and liabilities.'
          },
          {
            stepNumber: 3,
            title: 'Attending Court Hearings',
            description: 'Attend court hearings as scheduled, where the judge will review the petition and hear any objections or disputes from other parties.'
          },
          {
            stepNumber: 4,
            title: 'Addressing Objections',
            description: 'Address any objections or disputes raised by other legal heirs or interested parties, providing additional evidence if required.'
          },
          {
            stepNumber: 5,
            title: 'Obtaining Final Certificate',
            description: 'Once the court is satisfied, obtain the final succession certificate which grants you the legal authority to represent the deceased\'s estate.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required for Succession Certificate',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Death Certificate',
            description: 'Original death certificate of the deceased person issued by the municipal authority or relevant government body.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Relationship',
            description: 'Documents proving your relationship with the deceased such as birth certificate, marriage certificate, or family records.'
          },
          {
            icon: 'CheckCircle',
            title: 'List of Legal Heirs',
            description: 'Complete list of all legal heirs of the deceased person with their details and relationship to the deceased.'
          },
          {
            icon: 'CheckCircle',
            title: 'Assets and Liabilities Statement',
            description: 'Detailed statement of all assets and liabilities of the deceased including bank accounts, shares, debts, and other properties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Affidavits and Indemnity Bonds',
            description: 'Sworn affidavits and indemnity bonds as required by the court to protect against false claims and ensure proper succession.'
          },
          {
            icon: 'CheckCircle',
            title: 'Will or Testament (if any)',
            description: 'The will or testamentary document if any exists, which may affect the succession process and distribution of assets.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Court Fees and Costs',
      visible: true,
      order: 5,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Court Fees',
            description: 'Court fees calculated based on the value of the estate left by the deceased, varying by jurisdiction and court processing the application.'
          },
          {
            icon: 'CheckCircle',
            title: 'Stamp Duty',
            description: 'Applicable stamp duty charges as per state regulations for the succession certificate document.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Fees',
            description: 'Our transparent and competitive legal fees for professional representation and guidance throughout the succession certificate process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Documentation Expenses',
            description: 'Expenses incurred in obtaining, preparing, and notarizing various documents required for the succession certificate application.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Lawyer Fees for Succession Certificate',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        body: 'Here at GAG Lawyers, we believe in and offer transparent pricing and value to clients. For lawyer fees for succession certificates, our rates are some of the best, given the complexity of your case, the value of the property, and even the time it takes to execute the process.\n\nWe have flexible fee structures catering to your needs while ensuring quality legal representation without breaking the bank. Our experienced team will provide you with a detailed estimate of all costs involved, ensuring complete transparency throughout the process.'
      }
    },
    {
      type: 'overview',
      heading: 'Online Applications: Simplifying the Process',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'In the current digital age, many courts have adopted online systems to streamline the application process. Our technology-savvy lawyers for Succession Certificates are well-versed in managing the succession certificate online application. This makes the process more convenient and efficient for our customers.\n\nWe will guide you through the online application process, ensuring that all information is entered correctly and supporting documents are uploaded properly. This digital approach reduces processing time and makes it easier to track the status of your application.'
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Judgments on Succession Certificates',
      visible: true,
      order: 8,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Chakraborty vs. Patnaik (2007)',
            description: 'This judgment made clear the scope of a succession certificate, stating that it deals only with the debts and securities of the deceased and not immovable property. This clarification is crucial for understanding when a succession certificate is required.'
          },
          {
            icon: 'CheckCircle',
            title: 'Harsha Rani v. Sunita Rani (2019)',
            description: 'The Supreme Court held that a succession certificate was not essential for the transfer of shares if a valid will existed and probate had been obtained. This judgment shows the importance of proper estate planning and the role of wills in succession matters.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Choose GAG Lawyers for Your Succession Certificate Needs',
      visible: true,
      order: 9,
      background: 'light',
      content: {
        body: 'At GAG Lawyers - Grover and Grover Advocates and Solicitors, we pride ourselves on being attorneys for inheritance certificate matters. Our experienced team of attorneys combines legal expertise with a compassionate approach to understand the emotional challenges that often accompany inheritance issues.\n\nDon\'t let legalities of technicality stand in the way of what belongs to you legally. Call GAG Lawyers today for a consultation with your expert lawyer for succession certificate. Let us guide you through the process in such a manner that your rights and the legacy of your dear one are respected under the law.'
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        items: [
          {
            question: 'When succession certificate is not required?',
            answer: 'Succession certificate is not required in the following cases: when it deals with immovable property (land, buildings) as succession certificate only covers movable assets, if there is a valid will and probate has been granted by the court, in the case of joint bank accounts with a survivorship clause where the surviving account holder automatically inherits, when the deceased has nominated beneficiaries on specific assets like insurance policies, provident fund, or bank accounts (nomination supersedes succession), for government securities and bonds where nomination facility exists, and when the value of the estate is very small and banks/institutions waive the requirement. In these situations, other legal documents like probate, letters of administration, or nomination forms are sufficient to claim the assets.'
          },
          {
            question: 'When succession certificate is required?',
            answer: 'A succession certificate is required in the following situations: to claim bank deposits and savings accounts of the deceased when there is no nomination or joint account holder, to transfer shares, debentures, and securities held by the deceased to legal heirs, to recover debts owed to the deceased by third parties, to access safe deposit lockers and safe custody articles, to claim dividends and interest on securities, when there is no will (intestate succession) and the estate includes movable property, to establish legal heirship and prevent fraudulent claims on the estate, and when multiple legal heirs need to establish their rights to the deceased\'s movable assets. The succession certificate provides legal authority to the holder to represent the deceased in all matters related to debts and securities. Our lawyers help you determine if you need a succession certificate based on your specific circumstances.'
          },
          {
            question: 'What is the difference between succession certificate and probate?',
            answer: 'Succession certificate and probate are different legal documents with distinct purposes: Succession Certificate is issued for movable assets (bank deposits, shares, securities, debts) when there is no will, granted by civil courts, covers only debts and securities of the deceased, and can be obtained by any legal heir. Probate is issued for both movable and immovable property when there is a valid will, granted by civil courts, validates the will and appoints the executor, and can only be obtained by the executor named in the will. Key differences: succession certificate is for intestate succession (no will), probate is for testamentary succession (with will); succession certificate does not cover immovable property, probate covers all property; and succession certificate establishes legal heirship, probate validates the will. In some cases, both may be required depending on the nature of assets. Our lawyers can advise which document you need.'
          },
          {
            question: 'How long does it take to get a succession certificate?',
            answer: 'The time to obtain a succession certificate varies depending on several factors: court jurisdiction and workload (typically 6-12 months in most courts), complexity of the case and number of legal heirs, whether there are objections or disputes from other parties, completeness and accuracy of documents submitted, and whether the application is filed online or offline. The process includes: filing the petition (1-2 weeks), court issuing notice to legal heirs and creditors (30-45 days), objection period (30-60 days), court hearings (2-6 months depending on disputes), and final order and certificate issuance (2-4 weeks). Delays can occur if: documents are incomplete, there are disputes among legal heirs, creditors raise objections, or the court has a backlog. Our lawyers expedite the process by ensuring all documents are in order and handling any objections efficiently. In urgent cases, we can request expedited hearing.'
          },
          {
            question: 'Who can apply for a succession certificate?',
            answer: 'The following persons can apply for a succession certificate: any legal heir of the deceased (spouse, children, parents, siblings), creditors of the deceased who need to recover debts, and any person interested in the estate of the deceased. Legal heirs are determined based on: personal laws applicable to the deceased (Hindu Succession Act, Muslim Personal Law, Indian Succession Act, etc.), relationship to the deceased, and order of succession as per law. Typically, the closest legal heir applies for the succession certificate. If there are multiple legal heirs, they can apply jointly or any one of them can apply on behalf of all. The applicant must have a legitimate interest in the estate and must disclose all other legal heirs in the application. Our lawyers help you determine your eligibility to apply and prepare a strong application.'
          },
          {
            question: 'What is the court fee for succession certificate?',
            answer: 'Court fees for succession certificate are calculated based on the value of the estate and vary by state. Generally, court fees are: a percentage of the estate value (typically 2-3% in most states), subject to minimum and maximum limits as per state rules, and calculated on the gross value of movable assets (bank deposits, shares, securities, debts). For example, in Delhi, court fees are approximately 3% of the estate value subject to a maximum limit. In Maharashtra, it is 2% of the estate value. Additional costs include: stamp duty on the succession certificate, legal fees for lawyer services, documentation and notarization charges, and publication charges for notices. The total cost can range from a few thousand rupees for small estates to lakhs for large estates. Our lawyers provide accurate calculation of all fees based on your specific case and ensure you are prepared for all costs involved.'
          },
          {
            question: 'Can a succession certificate be challenged?',
            answer: 'Yes, a succession certificate can be challenged by: other legal heirs who were not included or informed, creditors of the deceased who have claims on the estate, any person who has an interest in the estate, or parties who believe the certificate was obtained fraudulently. Grounds for challenging a succession certificate include: suppression of facts about other legal heirs, fraudulent or false information in the application, incorrect valuation of the estate, failure to disclose all assets and liabilities, and procedural irregularities in obtaining the certificate. The challenge must be filed within the limitation period (typically 3 years from the date of knowledge of the certificate). The court will hear both parties and may: uphold the certificate, modify the certificate, or cancel the certificate and order fresh proceedings. Our lawyers can defend your succession certificate against challenges or help you challenge an improperly obtained certificate, ensuring your rights are protected.'
          },
          {
            question: 'Is succession certificate valid throughout India?',
            answer: 'Yes, a succession certificate issued by a competent civil court in India is valid throughout India. Once granted, the certificate can be used to: claim assets in any state or union territory, deal with banks and financial institutions anywhere in India, transfer securities held in any stock exchange, and recover debts from debtors located anywhere in the country. However, practical considerations include: some institutions may require additional verification, local language translations may be needed in some states, and registration or authentication may be required in some cases. The succession certificate is a decree of a civil court and is enforceable across India under the principle of comity of courts. If you need to use the certificate in multiple states, our lawyers can help with any additional formalities required by local institutions or authorities.'
          },
          {
            question: 'What happens if there are disputes among legal heirs?',
            answer: 'If there are disputes among legal heirs regarding succession certificate: the court will hear all parties before granting the certificate, objections must be filed within the notice period (typically 30-60 days), the court may order mediation or settlement discussions, if disputes cannot be resolved, the court will decide based on evidence and law, and the court may appoint a guardian ad litem for minor heirs. Common disputes include: disagreement over who are the legal heirs, disputes over the value of the estate, claims by illegitimate or adopted children, disputes over the validity of marriage or relationship, and disagreements over distribution of assets. The court will examine: proof of relationship, applicable personal laws, evidence of assets and liabilities, and claims of all parties. Our lawyers represent clients in succession disputes, protecting their rights and interests. We also help in negotiating settlements among legal heirs to avoid prolonged litigation.'
          },
          {
            question: 'Can a succession certificate be cancelled or revoked?',
            answer: 'Yes, a succession certificate can be cancelled or revoked by the court in certain circumstances: if it was obtained by fraud, misrepresentation, or suppression of facts, if material facts were concealed from the court, if it is discovered that the deceased left a valid will (making the certificate unnecessary), if there are legal heirs who were not included or informed, or if there are errors or irregularities in the certificate. The cancellation can be sought by: any legal heir who was excluded, creditors of the deceased, any person with interest in the estate, or the court suo moto (on its own). The process involves: filing an application for cancellation with the court that issued the certificate, providing evidence of grounds for cancellation, court hearing all parties, and court order cancelling or modifying the certificate. Once cancelled, a fresh application may need to be filed. Our lawyers can help you seek cancellation of an improperly obtained certificate or defend against cancellation attempts.'
          },
          {
            question: 'What is the validity period of a succession certificate?',
            answer: 'A succession certificate, once granted by the court, does not have an expiry date and remains valid indefinitely. However, practical considerations include: banks and financial institutions may have their own time limits for accepting succession certificates (typically 6 months to 1 year from date of issue), if not used within a reasonable time, institutions may require updated documentation, the certificate can be challenged within the limitation period (3 years), and if circumstances change (new heirs discovered, will found), the certificate may need to be modified. The certificate continues to be valid for: claiming assets that were listed in the application, recovering debts owed to the deceased, and transferring securities to legal heirs. If you have an old succession certificate, our lawyers can help you determine if it is still acceptable to institutions or if any updates are needed. We can also help obtain fresh certificates if required.'
          },
          {
            question: 'Do I need a lawyer to apply for succession certificate?',
            answer: 'While it is not legally mandatory to hire a lawyer to apply for a succession certificate, it is highly advisable because: the process involves complex legal procedures and documentation, mistakes in the application can lead to rejection or delays, legal knowledge is required to determine if succession certificate is the right document, disputes among legal heirs require legal representation, court hearings and arguments need legal expertise, and proper valuation of estate and calculation of court fees requires expertise. Benefits of hiring a lawyer: ensures all documents are correctly prepared, helps avoid common pitfalls and errors, represents you in court hearings, handles objections from other parties, expedites the process through proper follow-up, and protects your legal rights throughout. At GAG Lawyers, we provide comprehensive succession certificate services at competitive rates, saving you time, reducing stress, and increasing the likelihood of a successful application. The cost of hiring a lawyer is minimal compared to the value of the estate and potential losses from errors.'
          },
          {
            question: 'Can NRIs apply for succession certificate in India?',
            answer: 'Yes, Non-Resident Indians (NRIs) can apply for succession certificate in India for assets of a deceased person located in India. Requirements for NRIs include: the deceased must have left movable assets in India (bank accounts, shares, securities), the NRI must be a legal heir of the deceased, application must be filed in the court having jurisdiction over the assets, and all documents must be properly attested. Special considerations for NRIs: documents from abroad must be notarized and apostilled, power of attorney can be executed to authorize someone in India to file and pursue the application, NRI may need to appear in court (or authorize representative), and FEMA regulations must be complied with for repatriation of funds. Our lawyers specialize in NRI succession matters and can: help you file the application from abroad, arrange for power of attorney execution, represent you in court proceedings, and ensure compliance with all regulations. We make the process smooth for NRIs who cannot be physically present in India.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Succession Certificate Services?',
      visible: true,
      order: 11,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional succession certificate legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Succession Certificate Lawyer in Delhi - Inheritance Certificate | GAG Lawyers',
    metaDescription: 'Expert succession certificate and inheritance certificate services in Delhi. Professional legal assistance for estate succession and legal heir matters.'
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
