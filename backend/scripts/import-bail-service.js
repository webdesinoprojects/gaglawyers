require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'bail-lawyer',
  name: 'Bail Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Expert Bail Lawyers in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Get immediate legal assistance for bail applications. Our experienced lawyers ensure swift action and maximum chances of bail approval in Delhi courts.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Bail Cases - Professional Legal Representation',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Bail is a legal process of temporarily releasing a person from custody. In India, bail is granted by the court to arrested persons who are charged with non-bailable offenses. The person must be released on bail and must appear in court at a later date.\n\nThe amount of bail that is granted depends on the severity of the crime and the financial status of the accused. In order to secure release from custody, the accused must post bail in cash to the court or if their financial status is not good enough, they can put up collateral in lieu of posting bail.\n\nTo obtain a warrant, the police needs to prove there is probable cause to believe that someone has committed a crime. The facilities at which persons accused of crimes can be held before trial are known as jails or prisons. These institutions house persons awaiting trial and those convicted of criminal offenses who have been sentenced to a term of incarceration.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Bails Under Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Bailable Bail',
            description: 'Released on the condition that the person will appear before the court at a certain date and time. If they fail to do so, they will be considered as fugitives and their properties can be confiscated by law enforcement agencies.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non-Bailable Bail',
            description: 'Released when it\'s clear to the court that there are no grounds for suspicion against the person holding it. Even if they fail to appear before court, there won\'t be any consequences for them.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bail on Personal Bond',
            description: 'The most common type of bail used for people who have been charged with a non-bailable offence or those accused of an offence punishable with death/imprisonment for life/imprisonment for seven years or more.'
          },
          {
            icon: 'CheckCircle',
            title: 'Anticipatory Bail',
            description: 'Granted to an accused person who fears that they may be arrested in the future. This provides protection before arrest occurs.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Complete Procedure to File a Bail',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Apply for Bail',
            description: 'The accused must first apply for bail in a court of competent jurisdiction. This can be done either by the accused himself or through a lawyer.'
          },
          {
            stepNumber: 2,
            title: 'Court Consideration',
            description: 'The court will consider the application and decide whether to grant bail or not. The court may conduct a hearing and ask the accused to appear before it to answer questions.'
          },
          {
            stepNumber: 3,
            title: 'Bail Amount Fixed',
            description: 'If the court grants bail, it will fix a bail amount. This amount can be paid in cash or through a surety bond signed by a guarantor who agrees to pay if the accused fails to appear.'
          },
          {
            stepNumber: 4,
            title: 'Comply with Conditions',
            description: 'The accused must comply with bail conditions including appearing for all court hearings, not leaving the jurisdiction, and not committing any offence during the bail period.'
          },
          {
            stepNumber: 5,
            title: 'Submit Required Documents',
            description: 'Submit all required documents including bail application, case documents, surety documents, identity proof, photographs, and signed bail bond.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'What is Parole as per Criminal Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Conditional Release',
            description: 'Parole is a conditional release from prison with restrictions on the individual\'s conduct. It may be granted to prisoners who have shown good behaviour in prison.'
          },
          {
            icon: 'CheckCircle',
            title: 'Eligibility Criteria',
            description: 'In India, parole is granted to prisoners after they serve one-third of their sentence. However, it cannot be granted if convicted of a crime that carries death penalty or life imprisonment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Purpose of Parole',
            description: 'The purpose is to enable the prisoner to become an active member of society, serve the remainder of the sentence in the community, and rehabilitate the prisoner.'
          },
          {
            icon: 'CheckCircle',
            title: 'Application Process',
            description: 'Parole application must be submitted to the District Magistrate or Superintendent of jail, including details of offence, family background, and duration of sentence.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Bail Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Bail Application Preparation',
            description: 'We help prepare and file bail applications, ensuring all information is accurate and complete. We review the facts of your case and advise on any legal issues during the bail process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiate Bail Conditions',
            description: 'We negotiate the conditions of bail with the court, including discussing the amount of bail, length of bail, and any other conditions the court may impose.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compliance Assistance',
            description: 'We assist in complying with bail conditions, ensuring you report to the police station as required, attend all court dates, and remain within the court\'s jurisdiction.'
          },
          {
            icon: 'CheckCircle',
            title: 'Trial Representation',
            description: 'If your case goes to trial, we provide representation and legal advice throughout the trial process, help you understand charges, and present your case in the best possible light.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            question: 'What is Bail Law in India?',
            answer: 'Bail Law in India is a legal system that allows an accused person to be released from custody while awaiting trial or sentencing. This system is designed to prevent the accused from being punished before they are found guilty of a crime.'
          },
          {
            question: 'Who can get Bail in India?',
            answer: 'Any person who has been arrested and charged with a crime is eligible for bail in India. However, certain conditions must be met such as the severity of the crime, the accused\'s criminal history, and the likelihood of the accused fleeing or tampering with evidence.'
          },
          {
            question: 'What are the different types of Bail in India?',
            answer: 'There are several types of bail in India: Regular bail (most common, granted after arrest), Interim bail (granted before charges are filed), Anticipatory bail (granted to those who fear arrest), and Emergency bail (granted in medical emergencies or urgent circumstances).'
          },
          {
            question: 'What is the Bail Bond in India?',
            answer: 'A Bail Bond is a type of surety that an accused person provides to the court as a guarantee that they will appear in court on the specified dates. The Bail Bond is usually a sum of money or property that is pledged by the accused or a third party.'
          },
          {
            question: 'Can Bail be cancelled in India?',
            answer: 'Yes, Bail can be cancelled in India if the accused violates the conditions of the Bail or if there is new evidence suggesting guilt. The court may also cancel Bail if the accused is found to be a flight risk or may interfere with the judicial process.'
          },
          {
            question: 'What is the duration of Bail in India?',
            answer: 'The duration of Bail in India varies depending on the case and severity of the crime. Generally, Bail is granted until the accused\'s trial is complete or until they are sentenced. However, the court may revoke Bail if conditions are violated.'
          },
          {
            question: 'What factors do courts consider when granting Bail in India?',
            answer: 'Courts consider several factors including the severity of the crime, the accused\'s criminal history, likelihood of fleeing or tampering with evidence, strength of evidence, ties to the community, employment status, and family situation.'
          },
          {
            question: 'Are there any limitations on Bail in India?',
            answer: 'Yes, Bail may not be granted for certain serious offenses such as murder, terrorism, or offenses under the Narcotic Drugs and Psychotropic Substances Act, 1985. Bail may also be denied if the accused poses a threat to society.'
          },
          {
            question: 'Can Bail be granted after conviction in India?',
            answer: 'Yes, Bail can be granted after conviction in India. However, the accused must first file an appeal with the higher court and demonstrate strong grounds for appeal. The court may then grant Bail while the appeal is pending.'
          },
          {
            question: 'What are the consequences of violating Bail in India?',
            answer: 'Violating Bail conditions can result in serious consequences including revocation of Bail, forfeiture of the Bail bond, additional criminal charges, and requirement to remain in custody until trial. It can also damage the accused\'s credibility in court.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 7,
      background: 'dark',
      content: {
        body: 'Contact our expert legal team today for immediate assistance with bail applications and legal representation',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Bail Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Bail Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations'
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
