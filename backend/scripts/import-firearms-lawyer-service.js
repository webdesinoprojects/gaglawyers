require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'firearms-lawyer',
  name: 'Firearms Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Firearms Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Firearms Law',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Firearms Law Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Firearms lawyers must have a comprehensive understanding of the laws and regulations that pertain to firearms law and firearms cases. A firearms lawyer must be knowledgeable about the types of evidence required to support our clients\' positions and have the ability to build compelling cases by gathering facts, interviewing witnesses, and researching relevant legal precedents within the field of firearms law.\n\nThe firearms law in India is designed to regulate the ownership and use of firearms and other related weapons. The Firearms Act of 1959 is the primary statute governing the regulation of firearms in India. The Act is supplemented by the Arms Rules of 1962, which provide further regulations on the possession and use of firearms.'
      }
    },
    {
      type: 'overview',
      heading: 'Firearms Law in India',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'The Arms Act of 1959 is applicable throughout the country and is applicable to all persons in India, unless they are exempted by special order of the Central Government. Under the Arms Act of 1959, the Indian government has classified firearms into three categories: prohibited firearms, restricted firearms, and non-restricted firearms.\n\nProhibited firearms include automatic firearms, semi-automatic firearms, and certain other weapons. These weapons are strictly regulated and are generally prohibited from civilian ownership. Restricted firearms include handguns, rifles, shotguns, and other weapons that require a license for their possession and use. Non-restricted firearms are those that do not require a license and are generally available for purchase by the general public.'
      }
    },
    {
      type: 'overview',
      heading: 'Licensing Requirements',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        body: 'In order to own a firearm in India, an individual must obtain a license from the Indian government. Licenses are generally issued by the state government and are valid for three years. The applicant must also pass a background check, a mental health evaluation, and a medical examination. Additionally, the applicant must demonstrate that he or she has adequate knowledge and experience in the safe use and handling of firearms.\n\nIn addition to the license requirements, the possession and use of firearms in India are subject to numerous restrictions. For example, all firearms must be registered with the local law enforcement agency, and a record of each firearm must be maintained. Furthermore, the possession of firearms in certain areas, such as educational or religious institutions, is prohibited. All firearms must also be stored in a secure location and kept under lock and key at all times.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Disputes Under Firearms Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Unauthorized Possession of a Prohibited Firearm',
            description: 'India has a list of weapons that are prohibited and cannot be legally possessed by individuals. These include automatic weapons, short-barrelled shotguns and rifles, and certain types of handguns. If someone is found to be in possession of a prohibited firearm, they can face a fine and possible imprisonment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Unlawful Use of a Firearm',
            description: 'In India, it is illegal to use a firearm unlawfully. This includes shooting at someone or something without legal justification or provocation. If someone is found to have used a firearm unlawfully, they can face a fine and possible imprisonment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Unlawful Carrying of a Firearm',
            description: 'In India, it is illegal to carry a firearm without a valid license. If someone is found to have carried a firearm without a valid license, they can face a fine and possible imprisonment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Possession of an Unlicensed Firearm',
            description: 'Under Indian law, possession of an unlicensed firearm is illegal unless the owner has a valid license issued by the government. Possession of an unlicensed firearm carries a fine and possible imprisonment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Unauthorized Sale or Transfer of a Firearm',
            description: 'In India, it is illegal to sell or transfer a firearm without a valid license. If someone is found to have sold or transferred a firearm without a license, they can face a fine and possibly imprisonment.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Acts and Provisions in Firearms Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Arms Act of 1959',
            description: 'This Act covers a wide range of firearms, such as rifles, shotguns, handguns, and machine guns. It also covers related items such as ammunition, explosives, and other related items. The Act is designed to regulate the use, manufacture, possession, sale, and transfer of firearms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Firearms (Prohibition of Possession and Carriage) Act, 1976',
            description: 'This act prohibits the possession and carriage of firearms without a valid license. It also provides for punishment for those found in possession of firearms without a license. The punishment can range from a fine to imprisonment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Arms Rules, 1962',
            description: 'This rule contains provisions regarding the manufacture, sale, transfer, and possession of firearms and their accessories. It also provides for the registration of firearms and the maintenance of records regarding the possession and transfer of firearms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Suppression of Unlawful Acts of Violence Act, 2002',
            description: 'This Act lays down the legal framework for the control of firearms and the prevention of their illegal use. It also provides for punishment for those found in possession of firearms without a valid license.'
          },
          {
            icon: 'CheckCircle',
            title: 'Arms (Amendment) Act, 2008',
            description: 'This Act provides for the registration of firearms and the maintenance of records regarding the possession and transfer of firearms. It also provides for punishment for those found in possession of firearms without a valid license.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment in Firearms Law',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'In India, firearms law is governed by the Arms Act of 1959. The Act prohibits the acquisition, possession, and use of firearms without a valid license. Any person found in possession of a firearm without a valid license can be charged with a criminal offense.\n\nThe penalties for violating the firearms law in India can vary depending on the offense committed. For example, a person found in possession of a weapon without a valid license can be fined up to Rs. 10,000, imprisoned for a period of three years, or both. If the person is found to be in possession of a prohibited weapon, they can be fined up to Rs. 50,000, imprisoned for a period of up to seven years, or both.\n\nThe Arms Act also provides for enhanced punishments for certain offenses. For example, a person found to be in possession of a prohibited weapon can be fined up to Rs. 1 lakh, imprisoned for a period of up to 10 years, or both. In addition, if the person is found to have used the weapon to commit a crime, they can be fined up to Rs. 2 lakh and imprisoned for a period of up to 14 years.'
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Case Related to Firearms Law',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Gather Relevant Documents',
            description: 'Collect all necessary documents including the Arms Act of 1959, the Arms Rules of 1962, and any other documents pertaining to the case. Collect any evidence that is relevant to the case including photos, videos, or documents.'
          },
          {
            stepNumber: 2,
            title: 'Identify the Parties',
            description: 'Identify the person or organization responsible for the firearms law violation, as well as any other parties that may be affected by the case. This ensures that all relevant parties are notified of the case.'
          },
          {
            stepNumber: 3,
            title: 'Submit Written Application',
            description: 'Submit a written application to the court that outlines the facts of the case, the evidence collected, and the legal reasons why the accused should be charged. Include all collected documents.'
          },
          {
            stepNumber: 4,
            title: 'Attend Court Hearing',
            description: 'Once the court accepts the case, a hearing will be held, and the accused will be given the opportunity to present their arguments. Witnesses will be called to testify during the trial.'
          },
          {
            stepNumber: 5,
            title: 'Court Decision',
            description: 'At the end of the trial, the court will make a decision, and the accused will be sentenced accordingly. Monitor the progress of the case throughout the process.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Firearms Case',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Valid License and Certificates',
            description: 'A valid license to possess or carry a firearm, a police verification certificate, and a valid gun registration certificate with exact details of the firearm including make, model, and serial number.'
          },
          {
            icon: 'CheckCircle',
            title: 'Relevant Laws and Regulations',
            description: 'A copy of the relevant laws and regulations concerning firearms in India, including a complete list of guidelines and regulations concerning the possession and use of firearms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence Related to the Case',
            description: 'Witness statements, photographs, video footage, or any other documents that may be relevant to the case. All evidence must be accurate and up-to-date.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Documents',
            description: 'A complaint with details of the incident, a petition with reasons why the case should be taken up in court, and an affidavit with facts and evidence that support the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court-Related Documents',
            description: 'The court\'s regulations and rules, as well as any other documents related to the firearms law in India, including the court\'s list of attorneys.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Role of Firearms Lawyer in Firearms Cases',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'The role of a firearms lawyer in firearms law in India is very important. Lawyers provide legal advice and representation to those wanting to purchase, use, or own firearms. A firearms lawyer can also assist with the processing of applications for firearms licenses, obtaining permit exemptions, and representing clients in legal proceedings related to firearms.\n\nFirearms lawyers are also responsible for ensuring that firearms laws are followed in India and providing advice to clients regarding their legal rights and obligations under the applicable laws. A firearms lawyer must stay up-to-date on the latest legal developments related to firearms and their usage. A firearms lawyer must also have a thorough understanding of the various federal, state, local, and international laws that govern the purchase, possession, and use of firearms.\n\nA firearms lawyer must also be familiar with the various forms of firearms available in India, including air guns, shotguns, rifles, and handguns. In addition, a firearms lawyer must be knowledgeable about the various gun laws in India, including those related to registration, storage, transport, and licensing.'
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, is a well-established law firm in India that specializes in firearms law. They focus on providing legal advice and assistance to individuals, companies, and organizations that are in need of legal representation in matters related to firearms and ammunition.\n\nTheir services include providing legal counsel on firearms registration and licensing, assisting in the acquisition and transfer of firearms, providing advice on the legal requirements for owning and using firearms in India, and representing clients in court proceedings related to firearms law.\n\nGrover & Grover, Advocates and Solicitors, are highly experienced in all aspects of firearms law in India. They have extensive knowledge of the various laws and regulations that apply to firearms and ammunition in the country. They are familiar with the procedures and paperwork required for the acquisition and transfer of firearms, as well as the legal requirements for owning and using them.'
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
            title: 'Right to Bear Arms Ruling (2021)',
            description: 'In a landmark ruling in February 2021, the Supreme Court of India declared that citizens have the right to bear arms in India. The ruling came in response to a challenge to the Arms Act of 1959. The Supreme Court held that the right to bear arms was part of the fundamental right to life and personal liberty.'
          },
          {
            icon: 'CheckCircle',
            title: 'Gujarat and Madhya Pradesh Ban (2017)',
            description: 'The Supreme Court struck down the ban on the sale of firearms in the states of Gujarat and Madhya Pradesh. The court noted that the ban was not only unconstitutional but also had the potential to adversely affect the livelihoods of many citizens.'
          },
          {
            icon: 'CheckCircle',
            title: 'Self-Defense License Ruling (2018)',
            description: 'The Supreme Court ruled in favor of granting licenses to citizens to carry firearms in self-defense. The court held that the right to self-defense was an inherent right of citizens and should not be denied on the basis of arbitrary restrictions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Karnataka High Court Ruling (2018)',
            description: 'The High Court of Karnataka declared that the Arms Act of 1959 was unconstitutional and void. The court noted that the Act had been in force for more than 50 years without any modifications and did not conform to the current needs of India\'s citizens.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bombay High Court Ruling (2019)',
            description: 'The High Court of Bombay declared that the Arms Act of 1959 was unconstitutional and void. The court held that the right to bear arms was an inherent right of citizens and should not be denied on the basis of arbitrary restrictions.'
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
            question: 'What is the Arms Act of 1959?',
            answer: 'The Arms Act of 1959 is the primary statute governing the regulation of firearms in India. It regulates the acquisition, possession, manufacture, sale, and use of firearms and ammunition throughout the country.'
          },
          {
            question: 'What are the different categories of firearms in India?',
            answer: 'Under the Arms Act of 1959, firearms are classified into three categories: prohibited firearms (automatic and semi-automatic weapons), restricted firearms (handguns, rifles, shotguns requiring licenses), and non-restricted firearms (those available for general purchase).'
          },
          {
            question: 'How can I obtain a firearms license in India?',
            answer: 'To obtain a firearms license in India, you must apply to your state government, pass a background check, undergo a mental health evaluation and medical examination, and demonstrate adequate knowledge and experience in the safe use and handling of firearms. Licenses are typically valid for three years.'
          },
          {
            question: 'What are the penalties for possessing an unlicensed firearm?',
            answer: 'Possession of an unlicensed firearm can result in a fine of up to Rs. 10,000, imprisonment for up to three years, or both. For prohibited weapons, penalties can be up to Rs. 50,000 fine and seven years imprisonment.'
          },
          {
            question: 'Can I carry a firearm for self-defense in India?',
            answer: 'Yes, you can carry a firearm for self-defense in India, but you must have a valid license issued by the government. The Supreme Court has recognized the right to self-defense as an inherent right of citizens.'
          },
          {
            question: 'What restrictions apply to firearm storage in India?',
            answer: 'All firearms must be registered with local law enforcement, stored in a secure location, and kept under lock and key at all times. Possession of firearms in certain areas such as educational or religious institutions is prohibited.'
          },
          {
            question: 'What is the role of a firearms lawyer?',
            answer: 'A firearms lawyer provides legal advice on firearms licensing, assists with license applications, represents clients in firearms-related legal proceedings, and ensures compliance with firearms laws and regulations in India.'
          },
          {
            question: 'Can I transfer my firearm to another person?',
            answer: 'Yes, but the transfer of firearms requires proper authorization and must comply with the Arms Act and Arms Rules. Both parties must have valid licenses, and the transfer must be registered with the appropriate authorities.'
          },
          {
            question: 'What should I do if I am charged with a firearms offense?',
            answer: 'If charged with a firearms offense, you should immediately consult with a firearms lawyer who can review your case, advise you on your legal rights, gather evidence, and represent you in court proceedings.'
          },
          {
            question: 'How long does a firearms license remain valid?',
            answer: 'A firearms license in India is generally valid for three years from the date of issue. You must apply for renewal before the license expires to continue legally possessing and using your firearm.'
          },
          {
            question: 'What is the Arms Rules of 1962?',
            answer: 'The Arms Rules of 1962 supplement the Arms Act of 1959 and provide detailed regulations on the manufacture, sale, transfer, possession, registration, and record-keeping requirements for firearms and their accessories.'
          },
          {
            question: 'Can a firearms case be appealed?',
            answer: 'Yes, decisions in firearms cases can be appealed to higher courts. A firearms lawyer can assist you in filing an appeal and representing you in appellate proceedings if you believe the lower court\'s decision was incorrect.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Firearms Law Services?',
      visible: true,
      order: 13,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional firearms law services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Firearms Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert firearms law services in Delhi. Professional legal advice for firearms licensing, registration, and compliance with Arms Act regulations.'
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
