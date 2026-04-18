require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importDowryService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Dowry/i });
    
    if (!service) {
      console.error('❌ Dowry service not found in database');
      process.exit(1);
    }

    console.log(`Found service: ${service.name} (slug: ${service.slug})`);

    // Delete existing sections
    await ServiceSection.deleteMany({ serviceId: service._id });

    // Prepare sections
    const sections = [
      {
        serviceId: service._id,
        type: 'hero',
        visible: true,
        order: 1,
        heading: 'Dowry Lawyer',
        background: 'dark',
        content: {
          subtitle: 'Expert Legal Services for Dowry Cases',
          description: 'A dowry lawyer is a legal professional who specializes in handling cases related to dowry disputes. They can provide legal advice and representation to both the bride\'s and groom\'s families in cases where disputes arise over dowry.',
          image: '/images/dowry-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'Dowry Cases',
        background: 'light',
        content: {
          text: 'Dowry is an ancient custom that has been present in many cultures throughout history. It is the practice of a bride\'s family giving gifts and money to the groom\'s family upon the marriage of their daughter. Dowries are typically seen as a way to strengthen the bond between the two families and to ensure the bride will be taken care of in her new home.\n\nWhile dowry has been a part of many cultures for centuries, it is now illegal in many countries due to the potential for abuse. In India, where dowry was once a common practice, it is now outlawed, and those found guilty of demanding or accepting a dowry can face fines or imprisonment.\n\nDespite the legal action taken against the practice, dowry is still common in some parts of the world. While dowries can have positive implications, they can also lead to abuse and exploitation. It is important to be aware of the legal consequences of demanding or accepting a dowry, as it is illegal in many countries.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 3,
        heading: 'Acts and Provisions Attracted in Dowry Law',
        background: 'accent',
        content: {
          text: 'The Dowry Prohibition Act, 1961, is a major act that is aimed at preventing the giving and taking of dowry in India. The Act prohibits the giving, taking, or abetting of dowries. It also provides for the punishment of those who are involved in any of the prohibited activities.\n\nThe Act provides for the imposition of criminal liability on any person who gives, takes, or abets the giving or taking of any dowry. The penalty for such an offense is imprisonment for a term not exceeding five years and a fine not exceeding Rs. 15,000. In addition, the Act also provides for the confiscation of any dowry that is given or taken in contravention of the Act.\n\nThe Act also provides for the protection of women against the practice of dowry. Under the Act, the bride\'s father or mother can make a complaint to the police if they are subjected to any kind of physical or mental abuse or harassment in connection with the giving or taking of dowry.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 4,
        heading: 'Charges, Penalties & Punishment in Dowry Law',
        background: 'light',
        content: {
          text: 'The Dowry Prohibition Act lays out specific charges and penalties against those who are involved in the practice of dowry. As per the law, anyone who takes or gives a dowry will face imprisonment of up to five years and/or a fine of up to INR 15,000. Additionally, any person who helps in the giving or taking of a dowry can be punished with imprisonment of up to six months and/or a fine of up to INR 5,000.\n\nThe Criminal Law Amendment Act makes it a criminal offense to demand, give, take, or help in the giving or taking of dowry. Under the law, anyone found guilty of the practice of dowry can be sentenced to imprisonment for up to five years and/or a fine of up to INR 15,000.\n\nAccording to the Indian Penal Code, anyone found guilty of the practice of dowry can be sentenced to imprisonment for up to two years and/or a fine of up to INR 5,000.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 5,
        heading: 'Documents Required To File a Case Related To Dowry',
        background: 'light',
        content: {
          items: [
            {
              title: 'FIR (First Information Report)',
              description: 'Initial report filed with the police station that contains details of the alleged offense and the persons involved.'
            },
            {
              title: 'Affidavit from Victim',
              description: 'Document containing details of the offense, the persons involved, any witnesses, and the date and time of the occurrence.'
            },
            {
              title: 'Medical Certificate',
              description: 'Document proving the physical or mental harm caused to the victim due to the alleged offense, taken from a medical professional.'
            },
            {
              title: 'Police Investigation Report',
              description: 'Document containing details of the investigation conducted by the police, including evidence collected and witnesses interviewed.'
            },
            {
              title: 'Court Order',
              description: 'Document containing details of the court\'s decision on the case, issued after hearing both parties.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 6,
        heading: 'Role of Dowry Lawyer in Dowry Cases',
        background: 'accent',
        content: {
          items: [
            {
              title: 'Legal Guidance and Advice',
              description: 'Provides legal guidance and advice to the parties involved in the dispute and helps them resolve the issue in a timely manner.'
            },
            {
              title: 'Court Representation',
              description: 'Represents the parties in court and helps them come to a mutual agreement.'
            },
            {
              title: 'Drafting Agreements',
              description: 'Helps to draft the dowry agreement and ensure that all parties involved are legally protected.'
            },
            {
              title: 'Legal Documentation',
              description: 'Provides the necessary legal documents and paperwork required to properly resolve the dispute.'
            },
            {
              title: 'Filing Court Documents',
              description: 'Responsible for filing the necessary court documents and arguing the case before the court.'
            },
            {
              title: 'Settlement Negotiation',
              description: 'May be called upon to negotiate a settlement between the parties involved.'
            },
            {
              title: 'Rights Protection',
              description: 'Ensures that the rights of the parties are protected and any violations of the law are addressed.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 7,
        heading: 'How Grover & Grover, Advocates Help',
        background: 'light',
        content: {
          text: 'Grover & Grover, Advocates and Solicitors, is a leading law firm in India that specializes in providing legal services related to dowry cases. The firm provides comprehensive advice and services to those affected by dowry-related abuse or harassment.\n\nThe firm\'s lawyers are experienced in handling dowry cases and use their knowledge and expertise to help their clients navigate the legal process. Services include:\n\n• Legal advice and representation to those affected by dowry-related abuse or harassment\n• Assistance in filing cases, gathering evidence, and seeking justice\n• Representation in court proceedings related to dowry cases\n• Assistance in negotiating settlements and providing legal advice regarding compensation\n• Legal advice and representation to those accused of dowry-related offenses\n• Assistance in filing appeals and seeking a fair trial\n\nThe firm is dedicated to providing legal assistance to those affected by dowry-related abuse and harassment and to seeking justice for all.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 8,
        heading: 'Popular Cases in Supreme Court and High Court',
        background: 'light',
        content: {
          items: [
            {
              title: 'Krishna Kumar Singh vs. State of Bihar',
              description: 'The Supreme Court held that bride burning is a heinous offense punishable with life imprisonment. The court reiterated strict implementation of anti-dowry laws and held that the burden of proof would be on the accused to prove that dowry was not demanded.'
            },
            {
              title: 'Arumugam Servai vs. State of Tamil Nadu',
              description: 'The Supreme Court held that it was the duty of the courts to ensure that the provisions of anti-dowry laws were followed strictly and that no innocent person was unnecessarily harassed.'
            },
            {
              title: 'K. Prema Sastri vs. K. R. Venkataraman',
              description: 'The Supreme Court held that Section 498A cannot be interpreted in a manner that would lead to its misuse and that the accused are entitled to protection against such misuse.'
            },
            {
              title: 'M.C. Mehta vs. Union of India',
              description: 'The Supreme Court held that it was the duty of the government to ensure that anti-dowry laws were implemented strictly and that any person found guilty would face stringent punishment.'
            },
            {
              title: 'Monappa vs. State of Karnataka',
              description: 'The High Court of Karnataka held that the accused were entitled to protection against misuse of Section 498A and that the burden of proof would be on the accused to prove that dowry was not demanded.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'faq',
        visible: true,
        order: 9,
        heading: 'Frequently Asked Questions',
        background: 'light',
        content: {
          faqs: [
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
              answer: 'Yes, a dowry case can be filed after divorce, as long as the alleged offense occurred during the marriage. However, it is recommended to seek the assistance of a dowry lawyer to evaluate the case.'
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
              answer: 'Yes, a dowry harassment case can be settled out of court through mediation or through a mutual agreement between the parties involved. However, it is recommended to seek the assistance of a dowry lawyer.'
            },
            {
              question: 'What is the time limit to file a dowry harassment case in India?',
              answer: 'The time limit for filing a dowry harassment case in India is within three years from the date of the alleged offense. However, it is recommended to file the case as soon as possible.'
            },
            {
              question: 'What are the common defenses in dowry harassment cases?',
              answer: 'Common defenses in dowry harassment cases include lack of evidence, false allegations, and claims of consensual dowry.'
            },
            {
              question: 'Can a person be falsely accused of dowry harassment in India?',
              answer: 'Yes, a person can be falsely accused of dowry harassment in India. It is important for individuals to seek legal representation and defend themselves against false accusations.'
            },
            {
              question: 'What steps can a person take to protect themselves from false dowry harassment accusations?',
              answer: 'To protect themselves from false accusations, individuals should avoid accepting or demanding dowry, maintain communication records, and seek legal advice and representation.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 10,
        heading: 'Need Expert Dowry Legal Services?',
        background: 'dark',
        content: {
          description: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional dowry legal services in Delhi.',
          buttonText: 'Schedule Consultation',
          buttonLink: '/contact'
        }
      }
    ];

    // Insert sections
    await ServiceSection.insertMany(sections);

    // Update SEO
    await Service.findByIdAndUpdate(service._id, {
      seo: {
        title: 'Dowry Lawyer in Delhi - GAG Lawyers',
        description: 'A dowry lawyer is a legal professional who specializes in handling cases related to dowry disputes. Expert legal advice and representation for dowry cases in Delhi.',
        keywords: 'dowry lawyer, dowry cases, dowry harassment, Dowry Prohibition Act, dowry disputes, dowry law, dowry legal services'
      }
    });

    console.log(`✅ Dowry Lawyer imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importDowryService();
