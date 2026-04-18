require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'court-marriage-lawyer',
  name: 'Court Marriage Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Court Marriage Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Court Marriage',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Court Marriage',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Court marriage lawyers are required to have a comprehensive understanding of court marriage laws and possess the expertise to gather and analyze the evidence required to build a strong case for their clients.\n\nA court marriage in India is a civil marriage conducted by a court of law. This type of marriage is conducted under the Special Marriage Act, 1954. Under this act, a couple who wishes to get married can apply for a court marriage. The court will then process their application, and if all conditions are met, the court will issue a marriage certificate.\n\nThe couple must be at least 21 years of age and not related to each other. Both must be of sound mind and be able to give their consent to the marriage. The couple must also give a notice of intention to marry to the Marriage Officer of the district, along with supporting documents such as age proof, address proof, and identity proof.\n\nAfter the notice is given, the marriage officer will publish the notice in the prescribed manner and allow 30 days for objections to be raised. If no objection is raised within 30 days, the marriage officer will issue a marriage certificate to the couple. This certificate will be valid for six months and must be registered at the marriage registration office.\n\nCourt marriage in India is considered to be the most secure and legal way to get married. The court marriage procedure is undertaken in the presence of a judge or an authorized marriage officer. The marriage is registered in court, and the couple is provided with a valid marriage certificate.'
      }
    },
    {
      type: 'overview',
      heading: 'Acts and Provisions Related To Court Marriage',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'Court marriage in India is the process of solemnizing a marriage between two individuals in the presence of a court. It is an elaborate procedure that is regulated by the 1954 Special Marriage Act. It is an alternative to traditional religious wedding ceremonies. A court marriage in India is also known as a civil marriage.\n\nCourt marriage in India is open to all religions, castes, and creeds. It is an ideal option for couples who come from different religions, castes, and backgrounds. It is also a popular option among couples who do not want to be restricted by the customs and rituals associated with traditional religious wedding ceremonies.\n\nThe process of court marriage in India is regulated by the Special Marriage Act, 1954. This act defines the types of court marriages and sets out the rules and regulations that need to be followed. It provides for a minimum age of 18 for the bride and 21 for the groom. It also sets out the documents that need to be presented to the court.\n\nThe court marriage process in India involves filing a Notice of Intended Marriage with the Marriage Officer in the district where either of the couple resides. After the notice is filed, it is then published in the office of the marriage officer. The marriage can be solemnized after the 30-day period of publication of the notice.'
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under Court Marriage',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Choose Marriage Without Rituals',
            description: 'One of the rights given to couples getting married through court marriage in India is that they can choose to get married without any religious or traditional rituals. This is one of the main advantages of court marriage, as it does not involve any expensive rituals or ceremonies. The couple can choose to get married in a court of law or in a private ceremony.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to File for Divorce',
            description: 'Another right that is given to couples getting married through court marriage in India is that they can choose to file for divorce. The court of law has the authority to grant a divorce if the marriage has irretrievably broken down. The court will consider all the facts and evidence that are presented by the couples and decide whether or not to grant the divorce.'
          },
          {
            icon: 'CheckCircle',
            title: 'Obligation to Pay Registration Fee',
            description: 'These obligations include the payment of a marriage registration fee, the filing of an affidavit to declare the couple\'s intention to marry, the submission of proof of the couple\'s identity, the registration of the marriage in the prescribed manner, and the signing of a marriage certificate.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Authority on Marriage Matters',
            description: 'In addition to the rights and obligations that are given to couples getting married through court marriage in India, the court also has the authority to make decisions on matters related to the marriage. For instance, the court can decide on matters related to the division of assets, custody of children, alimony, and spousal support.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure of Court Marriage',
      visible: true,
      order: 4,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Obtain Marriage Registration Form',
            description: 'The first step in the process of court marriage in India is to obtain a marriage registration form from the local marriage registrar\'s office. This can be done either in person or online. The form will require the full name, address, contact number, age, and other relevant details of both the bride and groom.'
          },
          {
            stepNumber: 2,
            title: 'Provide Proof Documents',
            description: 'The couple will also need to provide proof of identity and address. This can be done through a valid passport, driving license, or any other government-issued photo identity card.'
          },
          {
            stepNumber: 3,
            title: 'Submit Documents to Registrar',
            description: 'Once the forms are filled out, the couple will need to present the relevant documents to the marriage registrar. These documents include proof of date of birth, proof of address, proof of identity, a divorce decree, or a death certificate (in case either of the partners is widowed).'
          },
          {
            stepNumber: 4,
            title: 'Pay Registration Fee',
            description: 'Once the documents are verified, the marriage registrar will ask the couple to pay a fee. This fee may vary from state to state. After the fee is paid, the marriage registrar will issue a marriage certificate to the couple.'
          },
          {
            stepNumber: 5,
            title: 'Complete Honeymoon Period',
            description: 'Finally, the court marriage in India is not valid until the couple completes their honeymoon. This is a mandatory period of seven days that the couple must spend together in order to make their marriage legally binding. During this time, the couple will be required to remain together and must not engage in any kind of public display of affection.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required For Court Marriage',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Age Proof',
            description: 'The documents required for a court marriage in India are the age proofs of both parties, which can be in the form of a birth certificate or school leaving certificate.'
          },
          {
            icon: 'CheckCircle',
            title: 'Identity Proof',
            description: 'Both parties need to present a valid proof of their identity, such as a passport, driving license, voter ID card, or Aadhaar card.'
          },
          {
            icon: 'CheckCircle',
            title: 'Residence Proof',
            description: 'The other document required for court marriage in India is the residence proof of both parties, which can be in the form of a passport, electricity bill, telephone bill, or ration card.'
          },
          {
            icon: 'CheckCircle',
            title: 'Written Declaration',
            description: 'Both parties need to furnish a written declaration that states that they are not related to each other by blood or marriage and that they are of sound mind.'
          },
          {
            icon: 'CheckCircle',
            title: 'Divorce Decree or Death Certificate',
            description: 'In addition, both parties need to present the divorce decree if either of them is a divorcee. If either of the parties is a widow or widower, then the death certificate of the deceased spouse needs to be presented.'
          },
          {
            icon: 'CheckCircle',
            title: 'Photographs',
            description: 'Lastly, four passport-size photographs of both parties are required.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Lawyer in Court Marriage',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Guidance',
            description: 'The role of lawyers in court marriages in India is essential. The lawyer is required to help the couple understand the legal implications of the marriage. The lawyer will explain the legal requirements of a valid marriage, such as the age of both parties, their capacity to enter into the marriage, and the necessary documents that need to be filed with the court.'
          },
          {
            icon: 'CheckCircle',
            title: 'Document Preparation',
            description: 'The lawyer will also help the couple prepare the legal documents necessary for the court marriage. These documents include an affidavit of marriage, an affidavit of marriage registration, a statement of particulars, and a copy of the marriage certificate.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'During the court marriage, the lawyer will be present to answer any questions that the couple may have. The lawyer will also ensure that the marriage is conducted in accordance with the law, that all the required documents are filed, and that all the necessary steps are taken for a valid court marriage.'
          },
          {
            icon: 'CheckCircle',
            title: 'Document Verification',
            description: 'The lawyer will also ensure that the couple has all the necessary documents, such as a valid passport, birth certificate, and address proof. The lawyer will also help the couple obtain the necessary marriage license.'
          },
          {
            icon: 'CheckCircle',
            title: 'Registration Support',
            description: 'The lawyer will then attend the court marriage to ensure that the marriage is conducted in accordance with the law. After the marriage is solemnized, the lawyer will help the couple register the marriage and obtain a copy of the marriage certificate.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'Grover & Grover Advocates and Solicitors is the leading law firm in India for court marriages. With their team of experienced and qualified lawyers, they provide the necessary legal advice, guidance, and assistance for couples who are looking to get married in a court of law. With their expertise in the law, they can provide the necessary guidance to ensure that the marriage is legally binding and that all documents required for the marriage are in place.\n\nGrover & Grover Advocates and Solicitors provide extensive advice and guidance on all matters related to court marriage in India. This includes advice on the legal requirements that need to be met in order to be able to register a court marriage in India. This includes providing the necessary paperwork and documentation that is required, such as affidavits and notification of intent to marry.\n\nThey also provide guidance on the process for obtaining the necessary court orders for the marriage and any other related matters. Grover & Grover Advocates and Solicitors can also provide advice on the various legal options available for couples who are considering a court marriage in India.\n\nIn addition to providing legal advice and guidance, Grover & Grover also provides assistance in the actual court marriage process. This includes helping the couples prepare the necessary documents, filing the necessary paperwork with the court, and representing the couple in court. This helps ensure that the marriage is legally binding and valid and that all of the necessary steps are taken in order to make the marriage official.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases in Supreme Court and High Court',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Lata Singh v. State of UP (2006)',
            description: 'In the landmark case of Lata Singh v. State of UP in 2006, the Supreme Court of India held that couples have the right to choose their own religion and marry without the consent of their parents and that the state must respect their right to marriage. This case was widely hailed as a victory for modern India and the right to choose one\'s own religion and marry without parental consent.'
          },
          {
            icon: 'CheckCircle',
            title: 'Santhosh Sharma vs. State of Uttarakhand (2014)',
            description: 'In another popular case, Santhosh Sharma vs. State of Uttarakhand (2014), the High Court of Uttarakhand held that the right to choose one\'s own religion and marry without the consent of parents is a fundamental right guaranteed under the Indian Constitution. The court also observed that no government or authority has the power to interfere in the decision of two consenting adults to marry each other.'
          },
          {
            icon: 'CheckCircle',
            title: 'Anuj Garg vs. Hotel Association of India (2017)',
            description: 'In the 2017 case of Anuj Garg vs. Hotel Association of India, the Supreme Court of India held that couples have the right to solemnize their marriage in a public place of their choice, even if it is a hotel. This ruling was seen as a major victory for couples who wish to have a court marriage in India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Anu Kumar vs. State of Rajasthan (2019)',
            description: 'In the recent case of Anu Kumar vs. State of Rajasthan in 2019, the High Court of Rajasthan held that couples have the right to choose their own religion and marry without the consent of their parents. This ruling further cemented the right of couples to solemnize their marriage in a public place, choose their own religion, and marry without parental consent.'
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
            question: 'What is a court marriage?',
            answer: 'A court marriage is a legal procedure where a couple gets married in the presence of a marriage registrar and witnesses, without any religious ceremony or rituals.'
          },
          {
            question: 'What are the legal implications of a court marriage in India?',
            answer: 'A court marriage in India is a legally binding contract between two individuals. It gives them the right to live together as husband and wife, inherit each other\'s property, and claim maintenance in case of separation or divorce.'
          },
          {
            question: 'Who can do court marriage?',
            answer: 'Any two individuals who are eligible to marry and fulfill the legal requirements can do a court marriage in India. The individuals must be of marriageable age, which is 18 years for the bride and 21 years for the groom, and they must not be closely related to each other. They should also have the necessary documents, such as age proof, identity proof, address proof, and photographs, as required by the law.'
          },
          {
            question: 'What is the role of a lawyer in a court marriage?',
            answer: 'The role of a lawyer in a court marriage is to provide legal advice, help with the documentation process, and represent the couple in case of any legal disputes.'
          },
          {
            question: 'How long does it take to complete a court marriage in India?',
            answer: 'The time taken to complete a court marriage in India varies from state to state and depends on the workload of the marriage registrar. Generally, it takes 1-2 hours to complete the process.'
          },
          {
            question: 'What is the difference between a court marriage and a traditional wedding ceremony?',
            answer: 'A court marriage is a legal procedure performed in the presence of a marriage registrar and witnesses, while a traditional wedding ceremony involves religious or cultural rituals and ceremonies.'
          },
          {
            question: 'What is the role of witnesses in a court marriage in India?',
            answer: 'The role of witnesses in a court marriage in India is to attest to the fact that the couple got married in their presence and to sign the marriage certificate as witnesses.'
          },
          {
            question: 'How long is the court marriage registration valid in India?',
            answer: 'The court marriage registration is valid for the lifetime of the couple and serves as proof of their marriage.'
          },
          {
            question: 'What is the validity of a court marriage certificate in India?',
            answer: 'A court marriage certificate is valid for the lifetime of the couple and serves as proof of their marriage.'
          },
          {
            question: 'Can a court marriage be converted into a traditional wedding ceremony?',
            answer: 'Yes, a court marriage can be converted into a traditional wedding ceremony if the couple wishes to do so.'
          },
          {
            question: 'What are the legal rights of a couple after a court marriage in India?',
            answer: 'After a court marriage in India, a couple has the legal right to live together as husband and wife, inherit each other\'s property, and claim maintenance in case of separation or divorce.'
          },
          {
            question: 'Can foreign nationals get married in court in India?',
            answer: 'Yes, foreign nationals can get married in court in India, but they need to follow the guidelines and procedures laid down by the Indian government.'
          },
          {
            question: 'Is it mandatory to get the consent of parents for a court marriage in India?',
            answer: 'No, it is not mandatory to get the consent of parents for a court marriage in India. However, it is advisable to inform them and take their consent if possible.'
          },
          {
            question: 'Who is a court marriage lawyer?',
            answer: 'A court marriage lawyer is a legal professional who specializes in handling court marriage cases and assists couples in completing the legal formalities required for a court marriage.'
          },
          {
            question: 'Is it necessary to have witnesses for a court marriage in India?',
            answer: 'Yes, two witnesses are required for a court marriage in India, who should be present during the marriage registration and sign the marriage certificate.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Court Marriage Legal Services?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional court marriage legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Court Marriage Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Court marriage lawyers are required to have a comprehensive understanding of court marriage laws and possess the expertise to gather and analyze the evidence required to build a strong case for their clients.'
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
