require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'criminal-lawyer',
  name: 'Criminal Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Criminal Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance and personalized attention for criminal cases. Our dedicated team of experienced attorneys is committed to delivering exceptional defense services.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Criminal Law - Comprehensive Legal Framework',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Criminal law is a body of regulation that defines and regulates the punishments for criminal offences. It is the body of law that deals with the prevention, studies, and prosecution of crimes. The major provisions of criminal law in India are contained in the Indian Penal Code (IPC), the Code of Criminal Procedure (CrPC), and the Evidence Act.\n\nThe IPC is the primary source of criminal law in India and provides a comprehensive list of criminal offences. The CrPC outlines the procedures for the investigation and trial of criminal cases, while the Evidence Act sets out the rules of proof that are applied in criminal trials.\n\nIt is important to understand how criminal law works so that you can protect yourself from potential legal issues. Criminal law is a branch of law that deals with crimes and their punishments. In India, it is governed by the Indian Penal Code (IPC), which was enacted in 1860. The IPC defines various types of crimes and prescribes punishments for them. It also lays down the process for investigating, trying and punishing criminals.'
      }
    },
    {
      type: 'benefits',
      heading: 'Major Laws and Provisions',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Indian Penal Code, 1860',
            description: 'The statutory law in India governing criminal law. Enacted on September 23, 1860, by the British Government and came into force in 1862. The Code has been amended commonly, with the last major change in 2013 when the Sexual Harassment of Women at Workplace (Prevention, Prohibition, and Redressal) Act 2013 came into force.'
          },
          {
            icon: 'CheckCircle',
            title: 'Code of Criminal Procedure (CrPC)',
            description: 'Defines various types of criminal cases and their provisions. Criminal cases are broadly classified into cognizable offences (more severe, requiring immediate police action) and non-cognizable offences (less severe, not requiring immediate action).'
          },
          {
            icon: 'CheckCircle',
            title: 'Indian Evidence Act, 1872',
            description: 'Provides rules of evidence that must be followed during a criminal trial, ensuring fair proceedings and proper presentation of facts.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ten Parts of IPC',
            description: 'Part I: Introductory; Part II: Offences against Public Order; Part III: Places of Public Amusement; Part IV: Combination of Places; Part V: Persons who incite offences; Part VI: Persons who incite violence; Part VII: Violent assemblies; Part VIII: Offences Against Property, Theft, and Housebreaking; Part IX: Place of Crime and Circumstances; Part X: Penalty for Offences.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Purpose & Significance of Criminal Law',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Public Protection',
            description: 'Criminal law is designed to protect the public from criminal activity and harmful behaviour. It creates a safe and orderly environment for citizens and protects their rights.'
          },
          {
            icon: 'CheckCircle',
            title: 'Maintain Order & Rule of Law',
            description: 'Criminal law helps to maintain the rule of law, which is essential for the functioning of any society. Without criminal law, it would be difficult to enforce any form of civil justice.'
          },
          {
            icon: 'CheckCircle',
            title: 'Accountability & Deterrence',
            description: 'Ensures that people who commit crimes are held accountable for their actions. Provides a system of punishment proportional to the severity of the crime, deterring potential criminals from committing future crimes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Fair & Equal Enforcement',
            description: 'Criminal law is vital for ensuring that laws are enforced fairly and equally, providing justice and equity for all members of society.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Criminal Cases',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Cognizable Offences',
            description: 'More severe in nature and require immediate action by the police. These include serious crimes like murder, rape, assault, and robbery.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non-Cognizable Offences',
            description: 'Less severe in nature and do not require immediate action by the police. These include minor offences and misdemeanors.'
          },
          {
            icon: 'CheckCircle',
            title: 'Offences Against Public Order',
            description: 'Crimes that disturb public peace and order, including rioting, unlawful assembly, and public nuisance.'
          },
          {
            icon: 'CheckCircle',
            title: 'Offences Against Property',
            description: 'Crimes involving theft, housebreaking, robbery, and other property-related offences.'
          },
          {
            icon: 'CheckCircle',
            title: 'Offences Against the State',
            description: 'Crimes against the government and state, including sedition and treason.'
          },
          {
            icon: 'CheckCircle',
            title: 'Offences Related to Marriage, Religion & Caste',
            description: 'Crimes involving marriage disputes, religious offences, and caste-based discrimination.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Role of Lawyers in Criminal Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        steps: [
          {
            title: 'Legal Representation',
            description: 'Represent the accused in court and provide legal advice to them. Also provide legal advice to victims of crime and work closely with police, prosecutors and other criminal justice system employees.'
          },
          {
            title: 'Case Investigation & Preparation',
            description: 'Research relevant laws and regulations, prepare legal documents, and investigate all aspects of the case to build a strong defense.'
          },
          {
            title: 'Court Proceedings',
            description: 'Represent clients in court hearings, from filing a complaint to the final judgement. Ensure that clients get a fair trial and their rights are protected throughout.'
          },
          {
            title: 'Reduce Severity & Prevent False Accusations',
            description: 'Work to reduce the severity of punishment and ensure that the accused isn\'t falsely accused. Provide legal advice to both prosecution and defense teams.'
          },
          {
            title: 'Legal Guidance & Strategy',
            description: 'Help the court understand the legal issues involved in the case and ensure that justice is served. Advise on the best course of action and potential outcomes.'
          },
          {
            title: 'Appeals & Post-Trial Matters',
            description: 'Provide representation in appeals, parole hearings, and probation hearings. Negotiate plea deals to help reduce sentencing and other penalties.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Criminal Case',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Complaint or First Information Report (F.I.R.)',
            description: 'The initial document filed with police to report a criminal offense. Contains details of the incident, parties involved, and nature of the crime.'
          },
          {
            icon: 'CheckCircle',
            title: 'Charge Sheet',
            description: 'Document prepared by police after investigation, containing charges against the accused and evidence collected.'
          },
          {
            icon: 'CheckCircle',
            title: 'Arrest Warrant',
            description: 'Legal document issued by a court authorizing the arrest of an individual suspected of committing a crime.'
          },
          {
            icon: 'CheckCircle',
            title: 'Search and Seizure Warrant',
            description: 'Court order authorizing law enforcement to search premises and seize evidence related to a criminal investigation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bail Application',
            description: 'Document filed to request release of the accused from custody pending trial, with conditions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence',
            description: 'All physical evidence, witness testimony, documents, and other materials that support the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Judgment & Appeal',
            description: 'Final court decision and any subsequent appeal documents if the decision is challenged.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Criminal Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Consultation & Strategy',
            description: 'Advise on the potential outcomes of a criminal case and best strategies for defending the client\'s rights in court. Help clients make informed decisions throughout the legal process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court during pre-trial hearings and the actual trial. Provide advice and guidance while ensuring rights are protected throughout court proceedings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Appeals & Post-Trial Matters',
            description: 'Provide representation in appeals and post-trial matters such as parole hearings and probation hearings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Plea Bargain Negotiation',
            description: 'Assist in negotiating plea deals, which can help reduce sentencing and other penalties associated with a criminal conviction.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights Protection',
            description: 'Ensure that all legal procedures are followed correctly and that the client\'s constitutional rights are protected at every stage of the criminal justice process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Defense Services',
            description: 'Provide a range of services to individuals facing criminal charges, from initial consultation to final verdict and beyond.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Supreme Court & High Court Cases',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'State of Karnataka vs. Krishnappa',
            description: 'Supreme Court held that an accused who fails to provide an alibi in a criminal case can be convicted even if the prosecution evidence isn\'t conclusive.'
          },
          {
            icon: 'CheckCircle',
            title: 'State of Uttar Pradesh vs. Ram Chandra',
            description: 'Supreme Court held that a person can be convicted of an offence even if he was not present at the scene of the crime.'
          },
          {
            icon: 'CheckCircle',
            title: 'Shiv Kumar Yadav vs. State of Uttar Pradesh',
            description: 'High Court held that the accused must be given the opportunity to explain the events leading to his arrest as well as other matters related to the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'State of Maharashtra vs. Dattatraya',
            description: 'Supreme Court held that the accused must be given a reasonable opportunity to explain the events leading to his arrest as well as other matters related to the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ram Narayan vs. State of Rajasthan',
            description: 'High Court held that an accused must be given a reasonable opportunity to explain the circumstances leading to his arrest as well as other matters associated with the case.'
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
            question: 'What is criminal law?',
            answer: 'Criminal law is a branch of law that deals with crimes and their punishment. It is the body of law that defines criminal offenses, sets out their punishment, and outlines the procedures for prosecuting those who are accused of committing a crime.'
          },
          {
            question: 'What are some examples of criminal offenses?',
            answer: 'Criminal offenses include murder, rape, assault, robbery, theft, drug trafficking, fraud, and other crimes defined under the Indian Penal Code.'
          },
          {
            question: 'What is the role of a criminal defense lawyer?',
            answer: 'A criminal defense attorney represents individuals who are accused of committing a crime. They defend their clients in court, provide legal advice, and negotiate plea bargains on their behalf. Their goal is to protect their clients\' rights and ensure they receive a fair trial.'
          },
          {
            question: 'What is the difference between a misdemeanor and a felony?',
            answer: 'A misdemeanor is a less serious offense, such as disorderly conduct or minor theft, and is usually punishable by a fine or a short period of imprisonment. A felony is a more serious offense, such as murder or drug trafficking, and carries a longer prison sentence.'
          },
          {
            question: 'What is the process for prosecuting a criminal offense?',
            answer: 'The process typically involves the arrest of the accused, followed by an arraignment where charges are formally read and the accused enters a plea. The case then proceeds to trial, where a judge or jury determines guilt or innocence. If found guilty, the accused is sentenced to a punishment determined by law.'
          },
          {
            question: 'Can a person be charged with a crime without evidence?',
            answer: 'No, a person cannot be charged with a crime without evidence. The prosecution must have sufficient evidence to prove that the accused committed the crime beyond a reasonable doubt. This evidence may include physical evidence, witness testimony, and other information obtained during an investigation.'
          },
          {
            question: 'What is the statute of limitations for a criminal offense?',
            answer: 'The statute of limitations is the period of time within which criminal charges must be filed. The length varies depending on the offense and jurisdiction, but typically ranges from one to ten years.'
          },
          {
            question: 'What is a plea bargain?',
            answer: 'A plea bargain is an agreement between the prosecution and the defense in which the accused agrees to plead guilty to a lesser offense or to cooperate with the prosecution in exchange for a reduced sentence or a dismissal of charges.'
          },
          {
            question: 'What is the burden of proof in a criminal case?',
            answer: 'The burden of proof in a criminal case is on the prosecution, who must prove beyond a reasonable doubt that the accused committed the crime. This means that the evidence presented in court must be strong enough to convince the judge or jury that the accused is guilty.'
          },
          {
            question: 'What is the role of a judge in a criminal case?',
            answer: 'The role of a judge is to ensure that the trial is conducted fairly and that the law is followed. The judge makes rulings on evidence, instructs the jury on the law, and ultimately decides the sentence if the accused is found guilty.'
          },
          {
            question: 'What is the difference between a jail and a prison?',
            answer: 'Jails are typically run by local authorities and house people who have been arrested or are serving short sentences, while prisons are run by the state or federal government and house people who have been convicted of more serious crimes and are serving longer sentences.'
          },
          {
            question: 'Can a criminal case be appealed?',
            answer: 'Yes, a criminal case can be appealed if the accused believes that the trial was conducted unfairly or that the sentence is unjust. The appeal is heard by a higher court, which may reverse the decision of the lower court or order a new trial.'
          },
          {
            question: 'What is probation?',
            answer: 'Probation is a sentence that allows a convicted person to remain in the community under the supervision of a probation officer, rather than being sent to jail or prison. The conditions may include reporting to the probation officer, abstaining from drugs and alcohol, and attending counseling or other programs.'
          },
          {
            question: 'What is parole?',
            answer: 'Parole is a release from prison before the end of a sentence, under certain conditions. The conditions may include reporting to a parole officer, abstaining from drugs and alcohol, and finding employment.'
          },
          {
            question: 'What is the difference between a criminal and a civil case?',
            answer: 'A criminal case involves the prosecution of a person for a crime committed against society, while a civil case involves a dispute between two parties, such as a lawsuit for damages. The burden of proof is higher in a criminal case, and the punishment is usually more severe.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact our expert criminal defense team today for professional legal representation and guidance',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Criminal Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Criminal Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
