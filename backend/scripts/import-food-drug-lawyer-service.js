require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'food-and-drug-lawyer',
  name: 'Food & Drug Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Food & Drug Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Food and Drug Law',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Food & Drug Law Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Food and drug lawyers are required to have a comprehensive understanding of food and drug cases and possess the expertise to gather and analyse the evidence required to build a strong case for their clients.\n\nThe Food and Drug Law in India is a set of regulations formulated by the Government of India in order to protect and promote public health. This law ensures that all food and drugs sold in India are safe and meet the prescribed standards of quality. The law also regulates the manufacture, sale, distribution, and use of food and drugs in the country. The Food and Drug Administration (FDA) is the government body responsible for ensuring that the law is complied with.'
      }
    },
    {
      type: 'overview',
      heading: 'Food and Drug Law in India',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'The Food and Drug Law in India sets out the standards and requirements for food and drug products in the country. It defines the requirements for the packaging, labelling, and storage of food and drug products. It also covers the safety of food and drug products, their ingredients, and the process of their manufacture. This law also provides guidelines for the advertising and promotion of food and drug products.\n\nThe Food Drug Law in India is designed to ensure that food and drug products are safe, of good quality, and meet the prescribed standards. The law also ensures that food and drug products are properly labelled and that their ingredients are accurately listed on the labels. The law also prohibits the adulteration of food and drugs and provides for stringent penalties for those who violate it.'
      }
    },
    {
      type: 'overview',
      heading: 'Enforcement and Compliance',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        body: 'The Food Drug Law in India is applicable to all food and drug products that are manufactured, imported, sold, and distributed in India. All food and drug products must comply with the provisions of the law. The law is enforced by the FDA, which is responsible for monitoring and inspecting food and drugs for compliance. The FDA also has the power to seize and destroy food and drugs that do not comply with the law.\n\nThe Food Drug Law in India is an important tool for protecting and promoting public health in the country. It ensures that food and drugs are safe and of good quality and that they meet the prescribed standards. The law also provides stringent penalties for those who violate it, which serves as a deterrent to those who wish to adulterate food and drugs.'
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under Food & Drug Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Consumer Rights',
            description: 'Consumers have the right to be informed about the safety, quality, and efficacy of food and drugs, as well as the right to be protected from any false or misleading claims. Consumers also have the right to access accurate information about the ingredients and side effects of food and drugs.'
          },
          {
            icon: 'CheckCircle',
            title: 'Manufacturer Obligations',
            description: 'Manufacturers, sellers, and distributors of food and drugs must comply with the regulations laid out in the law. They must ensure that their products meet the safety and quality standards set by the law and must label their products accurately and truthfully.'
          },
          {
            icon: 'CheckCircle',
            title: 'Adverse Event Reporting',
            description: 'The Food and Drug Law in India requires manufacturers, sellers, and distributors to report any adverse events or reactions to the drugs or food that they produce or sell. This is to ensure that any potential risks are reported to the authorities in a timely manner.'
          },
          {
            icon: 'CheckCircle',
            title: 'Enforcement and Penalties',
            description: 'The law provides for the enforcement of penalties for any violations of the regulations. This helps to protect the health and safety of the citizens of India by ensuring that food and drugs are safe and of the highest quality.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Case Related to Food & Drug Law',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Gather Evidence and Documents',
            description: 'Collect all relevant evidence and documents related to the case, including documents related to the product in question such as labels, packaging, or advertisements, and any medical records that may be relevant to the case.'
          },
          {
            stepNumber: 2,
            title: 'Research Relevant Laws',
            description: 'Research the relevant laws and regulations that may be applicable to the case. This involves familiarising oneself with the Food Safety and Standards Act of 2006 and other related pieces of legislation, including any notifications or regulations that may be relevant.'
          },
          {
            stepNumber: 3,
            title: 'Draft a Complaint',
            description: 'Draft a complaint that includes all the relevant details about the case, including the facts, materials, and evidence. It should also include the legal points that the complainant wishes to make.'
          },
          {
            stepNumber: 4,
            title: 'File the Complaint',
            description: 'File the complaint with the relevant authorities. This can be done in person or through an online portal. Ensure that all the necessary documents and evidence are included in the complaint.'
          },
          {
            stepNumber: 5,
            title: 'Attend Hearings',
            description: 'Attend the hearings and respond to the questions asked by the court. Be prepared for the hearings and be able to answer any questions that may be posed. The outcome of the case will depend on the quality of the evidence presented and the arguments made in court.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'The Food Safety and Standards Act 2006, along with its subsequent amendments, sets out the charges, penalties, and punishments for food and drug law violations in India. These violations can range from misbranding, adulteration, and the sale of unsafe or contaminated food to the manufacture, distribution, and sale of drugs without proper authorization.\n\nUnder the Food Safety and Standards Act 2006, any person found guilty of violating the food or drug law will be subject to fines and/or imprisonment. The fine for a first offence can range from Rs 10,000 to Rs 5 lakh, depending on the severity of the offence. In the case of a second or subsequent offence, the fine can range from Rs 50,000 to Rs 10 lakh. A fine of up to Rs 20 lakh can be imposed in the case of a third or subsequent offence.\n\nIn addition, any person found guilty of violating the food or drug laws in India may be subject to imprisonment. The sentence can range from 6 months to 7 years, depending on the severity of the offence. If a person is found guilty of a repeat offence, the sentence can range from 1 year to 10 years.'
      }
    },
    {
      type: 'benefits',
      heading: 'Additional Penalties and Enforcement',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Confiscation of Goods',
            description: 'The Food Safety and Standards Act of 2006 provides for confiscation of the goods or articles involved in the offence, and seizure of any equipment or materials used for the manufacture, storage, or distribution of the adulterated or contaminated food or drugs.'
          },
          {
            icon: 'CheckCircle',
            title: 'License Cancellation',
            description: 'The Act provides for cancellation of any licence or authorization related to the offence, as well as suspension or cancellation of registrations or licences issued by the Food Safety and Standards Authority of India or any other authorised body.'
          },
          {
            icon: 'CheckCircle',
            title: 'Premises Suspension',
            description: 'The Act also provides for the suspension or cancellation of any premises or establishments involved in the offence. The suspension or cancellation will be effective until the violation is rectified or until the period has expired.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Role of Lawyers in Food & Drug Cases',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        body: 'The role of a food and drug lawyer in food and drug law in India is an important one. A food and drug lawyer helps to ensure that the laws and regulations governing food and drug safety in India are properly interpreted and applied. Food and drug lawyers provide legal advice and representation on a wide range of issues related to food and drug safety.\n\nA food and drug lawyer also helps draft and review the legal documents that are necessary for the regulation of food and drug safety in India, including laws, regulations, policies, and guidelines. Food and drug lawyers play an essential role in advocating for the safety of food and drugs in India. Food and drug lawyers work closely with public health authorities and other stakeholders to ensure that the food and drug laws are properly enforced and that the public is adequately protected.\n\nFood and drug lawyers also provide legal advice to food and drug companies, helping them understand their legal obligations and rights. Food and drug lawyers also help to ensure that food and drug companies understand the implications of their actions. For example, a food and drug lawyer may assist companies in obtaining the necessary licences and permits to manufacture and distribute food and drugs in India.'
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Food & Drug Case',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Medical Records',
            description: 'Medical records provide evidence about the effects of a particular drug or food item on a person\'s health. These records must include the patient\'s diagnosis, treatment, and any other relevant information.'
          },
          {
            icon: 'CheckCircle',
            title: 'Test Results',
            description: 'Test results from an authorized laboratory provide evidence of the composition of the food item or drug and its effects on the body. These results must be accurate and up-to-date.'
          },
          {
            icon: 'CheckCircle',
            title: 'Food Labels',
            description: 'Food labels provide information about the ingredients used in the food item, the manufacturing process, and any other relevant information. Food labels must be accurate and up-to-date.'
          },
          {
            icon: 'CheckCircle',
            title: 'Expert Reports and Witness Declarations',
            description: 'Other documents that may be required include the reports of experts, declarations made by witnesses, and any other relevant evidence. All these documents should be properly collected and organized for the court.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, is one of the leading law firms in India and is highly experienced in handling cases related to food and drug law. With a team of qualified and experienced legal professionals, they are capable of providing legal guidance and representing clients in various areas of food and drug law. The team is well-versed in the nuances of Indian food and drug law and can advise and represent clients in any legal matter related to it.\n\nGrover & Grover Advocates and Solicitors also assist clients in obtaining permission from the government for the manufacture, sale, and distribution of food and drugs. They provide advice on how to comply with the various laws and regulations related to food and drug safety, and they can recommend strategies to minimize liability in the event of a violation. In addition, they provide legal representation for food and drug safety issues in the courts of India.\n\nGrover & Grover, Advocates and Solicitors, offer a comprehensive range of services related to food and drug law. They help clients draft and negotiate agreements with food and drug manufacturers, distributors, and retailers. They also provide advice on food and drug labelling requirements, as well as review, analyze, and advise on food and drug advertising.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases in Supreme Court and High Court',
      visible: true,
      order: 11,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Dr. Manoj Kumar v. Union of India',
            description: 'The Supreme Court held that people have the right to know what is in their food and drugs. The Court held that food and drugs are essential for life and that people have the right to know what is in them. This established the right to information about food and drug contents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Cipla Ltd. v. National Pharmaceutical Pricing Authority',
            description: 'The Supreme Court upheld the National Pharmaceutical Pricing Authority\'s (NPPA) power to regulate the prices of drugs sold in India. This case established the authority of the NPPA to regulate drug prices in India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ranbaxy Laboratories Ltd. v. Union of India',
            description: 'The Supreme Court held that the government has the power to regulate the sale and distribution of drugs in India. This established the government\'s right to regulate the sale and distribution of drugs in India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Union of India v. GlaxoSmithKline Pharmaceuticals Ltd.',
            description: 'The Supreme Court held that drug manufacturers have to provide information regarding the side effects and contraindications of their drugs to the public. This established the right of the public to have access to adequate information about drug side effects.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ranbaxy Laboratories Ltd. v. Union of India (High Court)',
            description: 'The High Court of Delhi held that drug manufacturers have to provide adequate information regarding the composition and effects of their drugs to the public. This established the right to information about drug composition and effects.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 12,
      background: 'light',
      content: {
        items: [
          {
            question: 'What are the roles and responsibilities of food and drug lawyers in India?',
            answer: 'Food and drug lawyers in India are responsible for ensuring that food and drug products comply with the relevant laws and regulations. They advise clients on the legal requirements for the manufacture, distribution, and sale of food and drug products. They also represent clients in legal disputes related to food and drug products.'
          },
          {
            question: 'What are the common types of food and drug cases in India?',
            answer: 'Common types of food and drug cases in India include adulteration cases, misbranding cases, sale of unsafe or contaminated food, manufacture or distribution of drugs without proper authorization, violation of labeling requirements, and cases involving adverse drug reactions or food poisoning.'
          },
          {
            question: 'What documents are required to file a food and drug case in India?',
            answer: 'Documents required include medical records, test results from authorized laboratories, food labels, product packaging, expert reports, witness declarations, and any other relevant evidence that demonstrates the violation of food and drug laws.'
          },
          {
            question: 'What is the penalty for violating food and drug laws in India?',
            answer: 'Penalties vary depending on the severity of the offense. Fines can range from Rs 10,000 to Rs 20 lakh, and imprisonment can range from 6 months to 10 years. Additional penalties include confiscation of goods, license cancellation, and suspension of premises.'
          },
          {
            question: 'What is the process for filing a food and drug case in India?',
            answer: 'The process involves gathering evidence and documents, researching relevant laws, drafting a complaint with all relevant details, filing the complaint with the relevant authorities (in person or online), and attending hearings to present your case.'
          },
          {
            question: 'What are the legal requirements for labeling food and drug products in India?',
            answer: 'Food and drug products must be properly labeled with accurate information about ingredients, composition, manufacturing process, expiry dates, side effects, contraindications, and any other information required by the Food Safety and Standards Act and related regulations.'
          },
          {
            question: 'Can consumers file a class action lawsuit against food and drug manufacturers or distributors in India?',
            answer: 'Yes, consumers can file class action lawsuits under the Consumer Protection Act when multiple consumers are affected by the same food or drug safety issue. A food and drug lawyer can help coordinate and represent such cases.'
          },
          {
            question: 'What is the role of the Food Safety and Standards Authority of India (FSSAI) in regulating food and drug products?',
            answer: 'The FSSAI is responsible for setting standards for food safety, regulating the manufacture, storage, distribution, and sale of food products, conducting inspections, issuing licenses, and enforcing compliance with food safety laws in India.'
          },
          {
            question: 'Can consumers file a complaint with the FSSAI regarding food and drug products?',
            answer: 'Yes, consumers can file complaints with the FSSAI regarding food safety issues, adulteration, misbranding, or any violations of food safety standards. Complaints can be filed online through the FSSAI portal or at local FSSAI offices.'
          },
          {
            question: 'What is the process for obtaining a license to manufacture or distribute food and drug products in India?',
            answer: 'The process involves submitting an application to the relevant authority (FSSAI for food, DCGI for drugs), providing details about the manufacturing facility, meeting safety and quality standards, undergoing inspections, and obtaining the necessary approvals and licenses.'
          },
          {
            question: 'Can food and drug lawyers in India help clients with product recalls?',
            answer: 'Yes, food and drug lawyers can assist clients with product recalls by advising on legal obligations, coordinating with regulatory authorities, managing communication with consumers, and minimizing legal liability during the recall process.'
          },
          {
            question: 'What are some common food and drug-related legal issues in India?',
            answer: 'Common issues include adulteration and contamination cases, misbranding and false advertising, license violations, non-compliance with safety standards, adverse drug reactions, product liability claims, and disputes with regulatory authorities.'
          },
          {
            question: 'What is the role of the Drug Controller General of India (DCGI) in regulating drug products?',
            answer: 'The DCGI is responsible for approving new drugs, regulating clinical trials, monitoring drug safety, issuing licenses for drug manufacture and import, setting drug standards, and ensuring compliance with the Drugs and Cosmetics Act.'
          },
          {
            question: 'What is the process for obtaining approval for a new drug product in India?',
            answer: 'The process involves submitting a new drug application to the DCGI with detailed information about the drug, conducting clinical trials as required, demonstrating safety and efficacy, meeting quality standards, and obtaining regulatory approval before marketing.'
          },
          {
            question: 'Can food and drug lawyers in India help clients with intellectual property issues related to food and drug products?',
            answer: 'Yes, food and drug lawyers can assist with intellectual property issues including patent applications for new drugs, trademark protection for brand names, trade secret protection for formulations, and defending against infringement claims.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Food & Drug Law Services?',
      visible: true,
      order: 13,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional food and drug law services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Food & Drug Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert food and drug law services in Delhi. Professional legal advice for food safety, drug regulations, FSSAI compliance, and pharmaceutical law matters.'
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
