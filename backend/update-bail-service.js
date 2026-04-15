require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const updateBailService = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const bailService = await Service.findOne({ slug: 'bail-lawyer' });
    
    if (!bailService) {
      console.log('Bail service not found');
      return;
    }

    // Update Bail service with comprehensive content
    bailService.heroImage = 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1600&q=80';
    
    bailService.shortDescription = 'Bail Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
    
    bailService.overview = `Bail Lawyer: Bail is a legal process of temporarily releasing a person from custody. In India, bail is granted by the court to arrested persons who are charged with non-bailable offenses. The person must be released on bail and must appear in court at a later date. The amount of bail that is granted depends on the severity of the crime and the financial status of the accused.`;

    bailService.contentBlocks = [
      {
        heading: 'Bail Cases',
        paragraphs: [
          'Bail is a legal process of temporarily releasing a person from custody, and individuals often search for Best Bail Lawyers in Delhi or bail lawyers near me for immediate assistance. In India, bail is granted by the court to arrested persons who are charged with non-bailable offenses.',
          'The amount of bail that is granted depends on the severity of the crime and the financial status of the accused. In order to secure release from custody, the accused must post bail in cash to the court or if their financial status is not good enough, they can put up collateral in lieu of posting bail.',
          'To obtain a warrant, the police needs to prove there is probable cause to believe that someone has committed a crime. The facilities at which persons accused of crimes can be held before trial are known as jails or prisons.'
        ]
      },
      {
        heading: 'Types of Bails Under Law',
        paragraphs: [
          'Bail is a form of security that is typically used by individuals in order to secure their release from custody pending trial or sentencing. The Indian bail system consists of two types of bail, namely bailable and non-bailable bail.',
          'The first type of bail, bailable bail, is released on the condition that the person will appear before the court at a certain date and time. However, if they fail to do so, they will be considered as fugitives and their properties can be confiscated by law enforcement agencies.',
          'Non-bailable bail is released when it\'s clear to the court that there are no grounds for suspicion against the person holding it. This means that even if they fail to appear before court at a certain date and time, there won\'t be any consequences for them.'
        ]
      },
      {
        heading: 'Acts and Provisions Related to Bail Cases',
        paragraphs: [
          'The Indian legal system is a complex one with many Acts and provisions. There are a number of different types of bail in the Indian legal system. These include: Bail on personal bond, Bail on recognizance, Bail on undertaking, and Bail on production of surety.',
          'The most common type of bail is bail on personal bond, which is used for people who have been charged with a non-bailable offence or those who are accused of an offence punishable with death/imprisonment for life/imprisonment for seven years or more.',
          'Only the Magistrate can grant bail. A warrant is issued when the Magistrate grants bail. Bail is given on a person\'s personal bond, not their property. People who are accused of an offence punishable with death/imprisonment for life/imprisonment for seven years or more cannot be granted bail unless there are special grounds to allow it.'
        ]
      },
      {
        heading: 'Complete Procedure to File a Bail',
        paragraphs: [
          'In India, filing a bail application is a legal process through which an accused person can be released from custody. The accused must first apply for bail in a court of competent jurisdiction. This can be done either by the accused himself or through a lawyer.',
          'The court will then consider the application and decide whether to grant bail or not. The court may conduct a hearing and ask the accused to appear before it to answer questions. If the court grants bail, it will fix a bail amount.',
          'This amount can be paid in cash or through a surety bond. The surety bond is a document signed by a guarantor, who agrees to pay the bail amount if the accused fails to appear in court. If the bail is granted, the accused must comply with the conditions of bail.'
        ]
      },
      {
        heading: 'What is Parole as per Criminal Law',
        paragraphs: [
          'Parole is a conditional release from prison with restrictions on the individual\'s conduct. It may be granted to prisoners who are deemed to have shown good behaviour in prison, or those who have been sentenced for less than a year.',
          'In India, parole is granted to prisoners after they serve one-third of their sentence. However, it cannot be granted if the prisoner has been convicted of a crime that carries death penalty or life imprisonment.',
          'Parole may be used as a threat to extract a confession from a target, or it may be given as an incentive for someone to assist in the investigation of crimes.'
        ]
      },
      {
        heading: 'Role of Bail Lawyer in Bail Cases',
        paragraphs: [
          'The Indian legal system is based on the British legal system. One of the most important concepts in the Indian legal system is bail. Bail is a form of release from custody before trial, and it has been recognized as an essential right in all jurisdictions.',
          'The role of Bail Lawyer in Delhi is vital to ensure that people are not wrongly convicted, or released on bail without being able to show their innocence. The role of lawyers also includes providing support for those who are incarcerated, and assisting them with their cases.',
          'Bail Lawyers are often found to be well respected. They are able to argue their clients\' cases in the court, and use their knowledge of the law to provide legal support.'
        ]
      },
      {
        heading: 'How Grover & Grover, Advocates Help in Bail Cases',
        paragraphs: [
          'The first step in obtaining bail is to file an application for bail with the court. This application must include detailed information about the defendant, including their name, address, and the charges against them.',
          'Grover & Grover, Advocates and Solicitors can help you prepare and file this application, ensuring that all information is accurate and complete. They may also be able to review the facts of your case and advise you on any legal issues that may arise during the bail process.',
          'Once the application for bail has been filed, Grover & Grover can negotiate the conditions of bail with the court. They can also assist you in complying with the conditions of bail and provide representation throughout the trial process.'
        ]
      }
    ];

    bailService.documentChecklist = [
      'Application for Bail with case details',
      'FIR copy and charge sheet',
      'Documents of Surety with financial proof',
      'Identity Proof of accused and surety',
      'Passport-sized photographs',
      'Bail Bond document',
      'Address proof of accused',
      'Character certificate (if applicable)',
      'Medical certificates (if required)'
    ];

    bailService.popularCases = [
      'Shanmugam Manjunath vs. State of Karnataka (2005) 7 SCC 699',
      'Varinder Kumar Bhalla vs. State of Punjab (2009) 12 SCC 559',
      'Navtej Singh Johar vs. Union of India (2018) 10 SCC 1'
    ];

    bailService.faqs = [
      {
        question: 'What is Bail Law in India?',
        answer: 'Bail Law in India is a legal system that allows an accused person to be released from custody while awaiting trial or sentencing. This system is designed to prevent the accused from being punished before they are found guilty of a crime.'
      },
      {
        question: 'Who can get Bail in India?',
        answer: 'Any person who has been arrested and charged with a crime is eligible for bail in India. However, there are certain conditions that must be met in order to be granted bail, such as the severity of the crime, the accused\'s criminal history, and the likelihood of the accused fleeing or tampering with evidence.'
      },
      {
        question: 'What are the different types of Bail in India?',
        answer: 'There are several types of bail in India, including regular bail, interim bail, anticipatory bail, and emergency bail. Regular bail is the most common type and is granted after arrest. Anticipatory bail is granted to a person who fears they may be arrested in the future.'
      },
      {
        question: 'What is the Bail Bond in India?',
        answer: 'A Bail Bond is a type of surety that an accused person provides to the court as a guarantee that they will appear in court on the specified dates. The Bail Bond is usually a sum of money or property that is pledged by the accused or a third party.'
      },
      {
        question: 'Can Bail be cancelled in India?',
        answer: 'Yes, Bail can be cancelled in India if the accused violates the conditions of the Bail or if there is new evidence that suggests that the accused is guilty of the crime. The court may also cancel Bail if the accused is found to be a flight risk.'
      }
    ];

    bailService.seoKeywords = [
      'Top Criminal Lawyers in India',
      'Best Bail Lawyers in Delhi',
      'Top 10 Bail Lawyers in India',
      'Top Criminal lawyers in Delhi High Court',
      'supreme Court top 10 advocate list',
      'bond lawyers near me',
      'bail lawyers near me',
      'Lawyer for bail in Delhi',
      'anticipatory bail lawyer in Delhi',
      'Top Bail Lawyer in Supreme Court',
      'Top Bail Lawyer in Delhi High Court',
      'Lawyer for Anticipatory bail in Delhi',
      'Advocate for Anticipatory bail in Delhi',
      'Top 10 Lawyer in Delhi High Court',
      'Bail Lawyer Fees in Delhi'
    ];

    await bailService.save();
    console.log('Bail service updated successfully!');
    
  } catch (error) {
    console.error('Error updating Bail service:', error);
  } finally {
    await mongoose.connection.close();
  }
};

updateBailService();
