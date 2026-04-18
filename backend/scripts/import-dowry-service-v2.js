require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'dowry-lawyer',
  name: 'Dowry Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Dowry Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Dowry Cases',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Dowry Cases',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A dowry lawyer is a legal professional who specializes in handling cases related to dowry disputes. They can provide legal advice and representation to both the bride\'s and groom\'s families in cases where disputes arise over dowry. In many cases, a dowry lawyer can help resolve the dispute amicably and avoid the need for litigation.\n\nDowry is an ancient custom that has been present in many cultures throughout history. It is the practice of a bride\'s family giving gifts and money to the groom\'s family upon the marriage of their daughter. Dowry has been prevalent in many cultures in South Asia, Africa, Latin America, and parts of the Middle East.\n\nWhile dowry has been a part of many cultures for centuries, it is now illegal in many countries due to the potential for abuse. In some cases, the groom\'s family may threaten to call off the marriage if the dowry is not paid, or the bride may be subjected to physical and emotional abuse for not providing a large enough dowry.\n\nIn India, where dowry was once a common practice, it is now outlawed, and those found guilty of demanding or accepting a dowry can face fines or imprisonment. Despite the legal action taken against the practice, dowry is still common in some parts of the world.'
      }
    },
    {
      type: 'overview',
      heading: 'Acts and Provisions Attracted in Dowry Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'The Dowry Prohibition Act, 1961, is a major act that is aimed at preventing the giving and taking of dowry in India. The Act prohibits the giving, taking, or abetting of dowries. It also provides for the punishment of those who are involved in any of the prohibited activities. The Act also lays down certain provisions that are aimed at protecting women from the evil practice of dowry.\n\nThe Dowry Prohibition Act, 1961, provides for the imposition of criminal liability on any person who gives, takes, or abets the giving or taking of any dowry. The penalty for such an offense is imprisonment for a term not exceeding five years and a fine not exceeding Rs. 15,000. In addition, the Act also provides for the confiscation of any dowry that is given or taken in contravention of the Act.\n\nThe Act also provides for the protection of women against the practice of dowry. Under the Act, the bride\'s father or mother can make a complaint to the police if they are subjected to any kind of physical or mental abuse or harassment in connection with the giving or taking of dowry.\n\nThe Act also provides for the protection of women who are subjected to the practice of dowry. Under the Act, the bride\'s father or mother can make an application to the court for the payment of maintenance to the bride or her family if they are in need of financial assistance.'
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment in Dowry Law',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        body: 'Dowry is the illegal and immoral practice of providing a large amount of money and goods from the bride\'s side to the groom and his family. It is illegal in India and many other countries, and the Indian government has implemented various laws to put an end to this practice.\n\nThe Dowry Prohibition Act lays out specific charges and penalties against those who are involved in the practice of dowry. As per the law, anyone who takes or gives a dowry will face imprisonment of up to five years and/or a fine of up to INR 15,000. Additionally, any person who helps in the giving or taking of a dowry can be punished with imprisonment of up to six months and/or a fine of up to INR 5,000.\n\nThe Criminal Law Amendment Act makes it a criminal offense to demand, give, take, or help in the giving or taking of dowry. Under the law, anyone found guilty of the practice of dowry can be sentenced to imprisonment for up to five years and/or a fine of up to INR 15,000.\n\nIn addition to the charges and penalties outlined in the Dowry Prohibition Act and the Criminal Law Amendment Act, the Indian Penal Code also has provisions for punishing those who are involved in the exchange of money or goods in the form of dowry. According to the Indian Penal Code, anyone found guilty of the practice of dowry can be sentenced to imprisonment for up to two years and/or a fine of up to INR 5,000.'
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required To File a Case',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'FIR (First Information Report)',
            description: 'The first document required to file a case related to dowry is an FIR. The FIR is an initial report filed with the police station that contains details of the alleged offense and the persons involved. This document is necessary as it helps the police investigate the matter and gather more evidence.'
          },
          {
            icon: 'CheckCircle',
            title: 'Affidavit from Victim',
            description: 'Another document required is an affidavit from the victim or the person who is filing the case. This document should contain details of the offense, the persons involved, any witnesses, and the date and time of the occurrence. This document will help the court understand the circumstances under which the offense took place.'
          },
          {
            icon: 'CheckCircle',
            title: 'Medical Certificate',
            description: 'The third document required is a medical certificate. This document will prove the physical or mental harm caused to the victim due to the alleged offense. The medical certificate should be taken from a medical professional and must include the date and time of the examination, the medical professional\'s name and address, and the results of the examination.'
          },
          {
            icon: 'CheckCircle',
            title: 'Police Investigation Report',
            description: 'The fourth document required is the police investigation report. This document will contain the details of the investigation conducted by the police, such as the evidence collected, the witnesses interviewed, and the conclusion of the investigation. This document will help the court understand the circumstances and decide the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Order',
            description: 'The last document required is a court order. This document will contain details of the court\'s decision on the case. This document will be issued by the court after hearing both parties and deciding the case. This document will be the final decision of the court and will be binding on all the parties involved.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Dowry Lawyer in Dowry Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Guidance and Advice',
            description: 'A lawyer plays an important role in dowry disputes in India. The lawyer provides legal guidance and advice to the parties involved in the dispute and helps them resolve the issue in a timely and satisfactory manner. The lawyer is also responsible for ensuring that the dowry laws are strictly followed and any violations of the law are appropriately addressed.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'The lawyer is responsible for representing the parties in court and helping them come to a mutual agreement. The lawyer also helps to draft the dowry agreement and ensure that all parties involved in the dispute are legally protected.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Documentation',
            description: 'The lawyer is also responsible for providing the parties involved in the dispute with the necessary legal documents and paperwork that are required to properly resolve the dispute. The lawyer is also responsible for filing the necessary court documents and arguing the case before the court.'
          },
          {
            icon: 'CheckCircle',
            title: 'Settlement Negotiation',
            description: 'In some cases, the lawyer may also be called upon to negotiate a settlement between the parties. The lawyer also helps to protect the interests of the parties involved in the dispute.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights Protection',
            description: 'The lawyer ensures that the rights of the parties are protected and any violations of the law are addressed. The lawyer is also responsible for ensuring that the parties involved in the dispute are aware of their rights and obligations under the law.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, is a leading law firm in India that specializes in providing legal services related to dowry cases. The firm provides comprehensive advice and services to those affected by dowry-related abuse or harassment. The firm\'s lawyers are experienced in handling dowry cases and use their knowledge and expertise to help their clients navigate the legal process.\n\nGrover & Grover, Advocates and Solicitors, provides legal advice and representation to those affected by dowry-related abuse or harassment. The firm has a team of experienced lawyers who are well-versed in the laws related to dowry and can provide guidance to victims on the best course of action to take. The firm also provides assistance in filing cases, gathering evidence, and seeking justice.\n\nGrover & Grover, advocates and solicitors, also represent clients in court proceedings related to dowry cases. The firm\'s lawyers have extensive experience in the field and can provide the necessary legal advice and representation to ensure that the client gets a fair trial. The firm also assists clients in negotiating settlements and providing legal advice regarding compensation and other remedies available to victims of dowry-related abuse.\n\nGrover & Grover, Advocates and Solicitors also provide legal advice and representation to those accused of dowry-related offenses. The firm\'s lawyers can provide guidance to the accused on the best course of action to take and can also help them prepare their defense. The firm also assists in filing appeals and seeking a fair trial.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases in Supreme Court and High Court',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Krishna Kumar Singh vs. State of Bihar',
            description: 'In this case, the Supreme Court held that bride burning is a heinous offense and can be punishable with life imprisonment. The apex court reiterated the strict implementation of anti-dowry laws. It also held that in cases of dowry-related complaints, the burden of proof would be on the accused to prove that the dowry was not demanded.'
          },
          {
            icon: 'CheckCircle',
            title: 'Arumugam Servai vs. State of Tamil Nadu',
            description: 'This case was related to the imposition of Section 498A of the Indian Penal Code, 1860, on the accused. The Supreme Court held that it was the duty of the courts to ensure that the provisions of the anti-dowry laws were followed strictly and that no innocent person was unnecessarily harassed.'
          },
          {
            icon: 'CheckCircle',
            title: 'K. Prema Sastri vs. K. R. Venkataraman',
            description: 'This case was related to the violation of Section 498A of the Indian Penal Code, 1860. The Supreme Court held that the provision cannot be interpreted in a manner that would lead to its misuse and that the accused are entitled to protection against such misuse.'
          },
          {
            icon: 'CheckCircle',
            title: 'M.C. Mehta vs. Union of India',
            description: 'This case was related to the implementation of the anti-dowry laws. The Supreme Court held that it was the duty of the government to ensure that the anti-dowry laws were implemented strictly and that any person found guilty of violating them would be liable to face stringent punishment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Monappa vs. State of Karnataka',
            description: 'This case was related to the violation of Section 498A of the Indian Penal Code, 1860. The High Court of Karnataka held that the accused were entitled to protection against misuse of the provision. It also held that the burden of proof would be on the accused to prove that the dowry was not demanded.'
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
            question: 'What is dowry?',
            answer: 'Dowry is a traditional practice in some parts of India where the bride\'s family gives gifts, money, or property to the groom\'s family at the time of marriage.'
          },
          {
            question: 'What is the Dowry Prohibition Act?',
            answer: 'The Dowry Prohibition Act is a law in India that prohibits the giving or taking of dowry. It was enacted in 1961 and has been amended several times to strengthen its provisions.'
          },
          {
            question: 'What is the role of a dowry lawyer in India?',
            answer: 'A dowry lawyer in India can assist with legal issues related to dowry, including filing dowry harassment complaints, seeking divorce on the grounds of dowry harassment, and providing legal advice and representation in dowry-related cases.'
          },
          {
            question: 'What is dowry harassment?',
            answer: 'Dowry harassment refers to the act of demanding dowry or harassing a woman and her family for not providing dowry after marriage. It is a criminal offense under the Dowry Prohibition Act.'
          },
          {
            question: 'How can I file a complaint of dowry harassment in India?',
            answer: 'To file a complaint of dowry harassment in India, you can go to the police station and lodge an FIR (First Information Report) or file a complaint at the nearest magistrate.'
          },
          {
            question: 'What is the punishment for dowry harassment in India?',
            answer: 'The punishment for dowry harassment in India can vary depending on the severity of the offense, but can include imprisonment for up to seven years and/or a fine.'
          },
          {
            question: 'Can a dowry case be filed after divorce?',
            answer: 'Yes, a dowry case can be filed after divorce, as long as the alleged offense occurred during the marriage. However, it is recommended to seek the assistance of a dowry lawyer to evaluate the case and provide legal guidance.'
          },
          {
            question: 'What evidence is required to prove dowry harassment?',
            answer: 'To prove dowry harassment, evidence such as receipts, bank statements, photographs, and witness statements can be presented. A dowry lawyer can help gather and present the necessary evidence in court.'
          },
          {
            question: 'Can a woman file a dowry harassment case against her in-laws?',
            answer: 'Yes, a woman can file a dowry harassment case against her in-laws if they were involved in the alleged offense.'
          },
          {
            question: 'Can a dowry harassment case be settled out of court?',
            answer: 'Yes, a dowry harassment case can be settled out of court through mediation or through a mutual agreement between the parties involved. However, it is recommended to seek the assistance of a dowry lawyer to ensure that the settlement is fair and legal.'
          },
          {
            question: 'What is the time limit to file a dowry harassment case in India?',
            answer: 'The time limit for filing a dowry harassment case in India is within three years from the date of the alleged offense. However, it is recommended to file the case as soon as possible to ensure the best chances of success.'
          },
          {
            question: 'What are the common defenses in dowry harassment cases?',
            answer: 'Common defenses in dowry harassment cases include lack of evidence, false allegations, and claims of consensual dowry.'
          },
          {
            question: 'What are the legal remedies available for victims of dowry harassment?',
            answer: 'Legal remedies available for victims of dowry harassment in India include filing a police complaint or FIR, filing a case under the Dowry Prohibition Act, seeking a protection order or restraining order, and seeking compensation for damages. A dowry lawyer can guide victims through the legal process and help them seek justice.'
          },
          {
            question: 'Can a person be falsely accused of dowry harassment in India?',
            answer: 'Yes, a person can be falsely accused of dowry harassment in India. It is important for individuals to seek legal representation and defend themselves against false accusations.'
          },
          {
            question: 'What steps can a person take to protect themselves from false dowry harassment accusations?',
            answer: 'To protect themselves from false dowry harassment accusations, individuals should avoid accepting or demanding dowry, as this is illegal in India. Additionally, they should maintain communication records, such as text messages and emails, to prove their innocence if falsely accused. Seeking legal advice and representation can also be helpful in defending against false accusations.'
          },
          {
            question: 'Can a person be arrested without a warrant in a dowry harassment case in India?',
            answer: 'Yes, a person can be arrested without a warrant in a dowry harassment case if the police have reason to believe that the accused committed the offense. However, the accused must be produced before a magistrate within 24 hours of arrest, and a dowry lawyer can help in securing bail.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Dowry Legal Services?',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional dowry legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Dowry Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'A dowry lawyer is a legal professional who specializes in handling cases related to dowry disputes. Expert legal advice and representation for dowry cases in Delhi.'
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
