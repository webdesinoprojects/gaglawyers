require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'divorce-lawyer',
  name: 'Divorce Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Divorce Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for divorce cases including mutual divorce, contested divorce, child custody, alimony, and property division. Compassionate representation for your family law matters.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Divorce Law in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Divorce is a process in which one person ends their marriage with another. There are many reasons for divorce, but the most common is that one person feels that they no longer love the other person. While there are many misconceptions about divorce, the legal process can be straightforward in most states, though it may become complex when children are involved or when there are disputes over assets or property.\n\nIndia has a divorce rate of about 30% and is the country with the highest number of divorces in the world. Divorce can be either amicable or difficult, depending on someone\'s reason for divorce and their spouse\'s reaction. If the spouses have young children, there is a greater chance of complications occurring in the future after divorce.\n\nDivorce is the legal termination of a marriage or marital union. It can be amicable with little conflict between the individuals, difficult with a great deal of conflict and disagreement on issues ranging from child custody to alimony, or acrimonious involving one party feeling betrayed by their spouse. In most countries, divorce does not end the legal lives of the couple\'s children. Instead, these children continue to live under their parents\' custody as long as they\'re minors until they come of age.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Divorce Under Family Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Divorce Based on Adultery',
            description: 'Adultery is recognized as a valid ground for divorce under Indian family law. One spouse can file for divorce if the other has committed adultery.'
          },
          {
            icon: 'CheckCircle',
            title: 'Divorce Based on Cruelty',
            description: 'Cruelty, whether physical or mental, is a valid ground for divorce. A spouse can file a complaint of cruelty against the other spouse.'
          },
          {
            icon: 'CheckCircle',
            title: 'Divorce Based on Desertion',
            description: 'Desertion or neglect by one spouse is a valid ground for divorce. The aggrieved party may file a complaint of desertion by the other spouse.'
          },
          {
            icon: 'CheckCircle',
            title: 'Divorce Based on Impotency',
            description: 'Impotency or incapacity to procreate for a period exceeding three years is recognized as a valid ground for divorce under Indian law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Mutual Consent Divorce',
            description: 'Both parties mutually agree to end the marriage. This is typically the fastest and most amicable form of divorce.'
          },
          {
            icon: 'CheckCircle',
            title: 'Contested Divorce',
            description: 'One party files for divorce while the other contests it. This type involves court proceedings and can be lengthy.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Acts and Provisions Related to Divorce',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Indian Divorce Act of 1869',
            description: 'The first legislation in India to address the dissolution of marriage. It has been amended numerous times since then to make the process more equitable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Hindu Marriage Act, 1955',
            description: 'Governs marriages and divorces among Hindus. Provides grounds for divorce and procedures for dissolution of Hindu marriages.'
          },
          {
            icon: 'CheckCircle',
            title: 'Special Marriage Act, 1954',
            description: 'Designed to allow interfaith, equal-community, and interracial marriages. Governs the formalities necessary for divorcing couples who may come from different religious backgrounds.'
          },
          {
            icon: 'CheckCircle',
            title: 'Section 497 of the Indian Penal Code (IPC)',
            description: 'Addresses adultery and its legal implications in divorce proceedings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Hindu Minority and Guardianship Act, 1956',
            description: 'Sections 13(1)(a) and 13(2)(a) address guardianship and custody matters in divorce cases involving Hindu families.'
          },
          {
            icon: 'CheckCircle',
            title: 'Code of Criminal Procedure (CrPC)',
            description: 'Governs the process of divorce in India and outlines the procedures, charges, penalties, and punishments in divorce cases.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Charges, Penalties & Punishments',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'False Charges Penalty',
            description: 'For making a false charge, the perpetrator shall be punished with imprisonment for a term which shall not be less than two years but which may extend to five years and shall also be liable to a fine.'
          },
          {
            icon: 'CheckCircle',
            title: 'Serious False Charges',
            description: 'For making serious false charges, imprisonment may extend from three to seven years, along with liability to a fine.'
          },
          {
            icon: 'CheckCircle',
            title: 'Adultery Complaint',
            description: 'The husband or wife may file a complaint of adultery against the other spouse, which can lead to legal consequences.'
          },
          {
            icon: 'CheckCircle',
            title: 'Cruelty Punishment',
            description: 'If found guilty of cruelty, the perpetrator will be punished with imprisonment for a term which shall not be less than six months but which may extend to three years and shall also be liable to a fine.'
          },
          {
            icon: 'CheckCircle',
            title: 'Restitution Orders',
            description: 'The court may order restitution to be made by the guilty party in favor of the aggrieved party within such time and in such manner as it thinks fit.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File Divorce Case',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        steps: [
          {
            title: 'Separation Period',
            description: 'The husband and wife must have been living separately for at least 365 days before filing for divorce (except in mutual consent cases).'
          },
          {
            title: 'Written Consent',
            description: 'Both parties must sign a written consent before attempting to file for divorce, especially in mutual consent cases.'
          },
          {
            title: 'File Before Competent Court',
            description: 'The divorce case needs to be filed before the court of competent jurisdiction where the couple lives.'
          },
          {
            title: 'Meet Financial Requirements',
            description: 'Both parties need to meet the financial requirements of filing for divorce, including court fees and legal costs.'
          },
          {
            title: 'File Charge Sheet',
            description: 'File a charge sheet to initiate the trial process. This document outlines the grounds for divorce and supporting evidence.'
          },
          {
            title: 'Trial Process',
            description: 'The trial process allows both parties to pinpoint the grounds of their divorce and determine if the divorce is by mutual consent or contested.'
          },
          {
            title: 'Court Proceedings',
            description: 'Attend court hearings where both parties present their case. The court will examine evidence and hear arguments before making a decision.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File Divorce Case',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Marriage Certificate',
            description: 'Proof of marriage is essential to file for divorce. Original marriage certificate or certified copy is required.'
          },
          {
            icon: 'CheckCircle',
            title: 'Identity Documents',
            description: 'Valid identity proof such as Aadhaar card, passport, voter ID, or driving license for both parties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Address Proof',
            description: 'Proof of current residence for both parties, such as utility bills, rental agreement, or property documents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Written Consent (Mutual Divorce)',
            description: 'In case of mutual consent divorce, a written agreement signed by both parties stating their consent to divorce.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence of Grounds',
            description: 'Supporting documents and evidence for the grounds of divorce, such as medical reports for cruelty, witness statements, photographs, or other relevant proof.'
          },
          {
            icon: 'CheckCircle',
            title: 'Financial Documents',
            description: 'Income proof, bank statements, property documents, and other financial records for alimony and property division matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Child-Related Documents',
            description: 'Birth certificates of children, school records, and other documents relevant to child custody and support matters.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Divorce Lawyers',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice & Guidance',
            description: 'Provide legal advice on divorce proceedings, rights, and obligations. Help clients understand the legal aspects of their case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Emotional Support',
            description: 'Offer emotional support to the couple during this difficult time. Help manage stress and provide reassurance throughout the process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Paperwork Management',
            description: 'Handle all legal paperwork, including filing petitions, preparing documents, and ensuring all formalities are completed correctly.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings, present arguments, examine witnesses, and advocate for their best interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation & Settlement',
            description: 'Negotiate terms of divorce including alimony, child custody, property division, and other matters. Work towards fair settlements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights Protection',
            description: 'Ensure that clients\' rights are protected throughout the divorce process and that everything goes according to plan.'
          },
          {
            icon: 'CheckCircle',
            title: 'Child Custody Matters',
            description: 'Advise on child custody arrangements, visitation rights, and child support to ensure the best interests of the children.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Divorce Cases',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Legal Support',
            description: 'Provide legal advice and support throughout the divorce process in India. Help families understand their rights and obligations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Expert Guidance',
            description: 'Provide information on the legal system and guide clients through the divorce proceedings, ensuring they understand each step.'
          },
          {
            icon: 'CheckCircle',
            title: 'Mutual Consent Divorce',
            description: 'Assist with mutual consent divorce cases, ensuring all legal requirements are met and the process is completed smoothly and quickly.'
          },
          {
            icon: 'CheckCircle',
            title: 'Contested Divorce Representation',
            description: 'Represent clients in contested divorce cases, presenting strong arguments and evidence to protect their interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Child Custody & Support',
            description: 'Advise on child custody arrangements and child support matters, always prioritizing the best interests of the children.'
          },
          {
            icon: 'CheckCircle',
            title: 'Property Division',
            description: 'Assist with equitable division of marital property and assets, ensuring fair distribution according to law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Alimony & Maintenance',
            description: 'Advise on spousal support and maintenance matters, helping clients understand their rights and obligations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Domestic Violence Cases',
            description: 'Provide specialized support for victims of domestic violence, helping them obtain protection orders and legal remedies.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Supreme Court & High Court Cases',
      visible: true,
      order: 9,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Sushil Kumar Sharma v. Union of India (2005)',
            description: 'Supreme Court case involving a man\'s petition to have his marriage annulled. The Court held that the Indian Divorce Act did not provide for the annulment of a marriage, and the man could not be granted a divorce on those grounds.'
          },
          {
            icon: 'CheckCircle',
            title: 'Sarla Mudgal v. Union of India (1995)',
            description: 'Supreme Court case involving a woman\'s challenge to the Indian Divorce Act, which prohibited her from divorcing her husband despite having proof of him having a second wife. The court held that the law was unconstitutional and that the woman could divorce her husband.'
          },
          {
            icon: 'CheckCircle',
            title: 'Lata Singh v. State of Uttar Pradesh (2006)',
            description: 'High Court of Allahabad case involving a woman\'s petition for divorce from her husband on the grounds of cruelty. The court held that the husband had subjected the woman to physical and mental abuse and granted her a divorce.'
          }
        ]
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
            question: 'What is a Divorce Lawyer in Delhi?',
            answer: 'A divorce lawyer is a legal professional who specializes in handling divorce cases. They provide legal advice, represent clients in court, and help them navigate the divorce process.'
          },
          {
            question: 'When should I hire a Divorce Lawyer in Delhi?',
            answer: 'It is recommended to hire a divorce lawyer as soon as possible after deciding to file for divorce. This will ensure that you have someone to guide you through the process and protect your rights.'
          },
          {
            question: 'What are the grounds for divorce?',
            answer: 'Grounds for divorce vary by state, but common reasons include adultery, cruelty, desertion, impotency or incapacity to procreate, and irretrievable breakdown of marriage.'
          },
          {
            question: 'How long does a divorce case take?',
            answer: 'The duration of a divorce case depends on numerous factors, including the complexity of the case, whether it is contested or mutual consent, and the court\'s schedule. Mutual consent divorces can be completed in 6-18 months, while contested divorces may take several years.'
          },
          {
            question: 'What is the difference between a contested and uncontested divorce?',
            answer: 'A contested divorce is one in which the parties cannot agree on key issues such as property division, child custody, or alimony. An uncontested or mutual consent divorce is one where both parties agree on all terms and file jointly.'
          },
          {
            question: 'How is property divided in a divorce?',
            answer: 'Property division varies by law, but generally, marital assets are divided equitably, meaning fairly but not necessarily equally. Separate property, such as property acquired before marriage or through inheritance, is typically not subject to division.'
          },
          {
            question: 'What is spousal support?',
            answer: 'Spousal support, also known as alimony or maintenance, is financial support paid by one spouse to the other after divorce. It is intended to help the recipient spouse maintain their standard of living and transition to a new life.'
          },
          {
            question: 'How is child custody determined?',
            answer: 'Child custody is determined based on the best interests of the child, considering factors such as the child\'s age, health, emotional ties with parents, parents\' ability to care for the child, and the child\'s preference if they are old enough.'
          },
          {
            question: 'Can I get a divorce without a lawyer?',
            answer: 'It is possible to get a divorce without a lawyer, but it is not recommended, especially in contested cases or when children and significant assets are involved. A lawyer can protect your rights and ensure fair outcomes.'
          },
          {
            question: 'What is mediation?',
            answer: 'Mediation is a form of alternative dispute resolution wherein a neutral third party helps the parties reach a mutually acceptable agreement. It can be a less expensive and less contentious way to resolve issues in a divorce case.'
          },
          {
            question: 'Can I change my mind about getting a divorce?',
            answer: 'Yes, it is possible to change your mind about getting a divorce. If both parties agree to try to work things out, they can attempt reconciliation. However, once a divorce has been finalized, it cannot be reversed.'
          },
          {
            question: 'What should I do if my spouse is hiding assets?',
            answer: 'If you suspect that your spouse is hiding assets, you should speak with a divorce lawyer immediately. They can help you investigate and uncover any hidden assets and ensure that you receive a fair settlement.'
          },
          {
            question: 'Can I get a divorce if my spouse lives in another country?',
            answer: 'Yes, it is possible to get a divorce if your spouse lives in another country, but the process may be more complex. Consult with a divorce lawyer who has experience with international divorce cases.'
          },
          {
            question: 'What should I do if I am a victim of domestic violence?',
            answer: 'If you are a victim of domestic violence, seek immediate help from law enforcement and contact a divorce lawyer who specializes in domestic violence cases. They can help you obtain protection orders and guide you through the legal process.'
          },
          {
            question: 'What is a fault divorce?',
            answer: 'A fault divorce is a type of divorce wherein one party alleges that the other party is at fault for the breakdown of the marriage. Common grounds for fault divorce include adultery, cruelty, and desertion.'
          },
          {
            question: 'Can I get a divorce if my spouse refuses to sign the papers?',
            answer: 'Yes, you can still get divorced if your spouse refuses to sign the divorce papers. However, the process may be more complex and take longer. A divorce lawyer can advise you on the options available to you in this case.'
          },
          {
            question: 'How is child support determined?',
            answer: 'Child support is determined based on several factors, including the income of both parents, the needs of the child, and the amount of time each parent spends with the child. Child support guidelines vary by state.'
          },
          {
            question: 'What is a deposition?',
            answer: 'A deposition is a legal proceeding wherein a witness provides sworn testimony under oath. It is typically conducted as part of the discovery process in a divorce case.'
          },
          {
            question: 'Can I change my child custody agreement?',
            answer: 'Yes, it is possible to modify a child custody agreement if there has been a significant change in circumstances, such as a move, a change in the child\'s needs, or a change in a parent\'s situation.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 11,
      background: 'dark',
      content: {
        body: 'Contact our expert divorce lawyers today for compassionate and professional legal assistance with your family law matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Divorce Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Divorce Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
