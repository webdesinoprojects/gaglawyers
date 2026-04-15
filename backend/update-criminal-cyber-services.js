require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const updateCriminalAndCyberServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // ============================================
    // UPDATE CRIMINAL LAW SERVICE
    // ============================================
    console.log('\n--- Updating Criminal Law Service ---');
    const criminalService = await Service.findOne({ slug: 'criminal-defense-cases' });
    
    if (criminalService) {
      criminalService.heroImage = 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1600&q=80';
      
      criminalService.shortDescription = 'Criminal Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      criminalService.overview = `Criminal law is a body of law that defines and regulates the punishments for criminal offences. It is the body of law that deals with the prevention, investigation, and prosecution of crimes. The major provisions of criminal law in India are contained in the Indian Penal Code (IPC), the Code of Criminal Procedure (CrPC), and the Evidence Act.`;

      criminalService.contentBlocks = [
        {
          heading: 'Major Laws and Provisions Related to Criminal Cases',
          paragraphs: [
            'The main provisions of criminal law in India embody offences against public order, offences against property, offences against the state, offences regarding marriage and divorce, offences regarding religion and caste, offences related to drugs and intoxicants, and so forth.',
            'The Indian Penal Code, 1860, is the statutory law in India governing criminal law. It was enacted on September 23, 1860, by the British Government and came into force in 1862. The Code has been amended commonly, with new sections entering force periodically.',
            'This code consists of ten parts, which include: Introductory provisions, Offences against Public Order, Places of Public Amusement, Offences Against Property, Theft and Housebreaking, Place of a Crime, and Penalty for Offences.'
          ]
        },
        {
          heading: 'Purpose & Significance of Criminal Law',
          paragraphs: [
            'Criminal law is a set of legal rules and guidelines which are designed to protect the public from criminal activity. It is a branch of law that is focused on punishing and deterring those who commit criminal acts.',
            'The purpose and significance of criminal law are to protect the public from harmful behaviour, to maintain order, and to ensure justice and fairness. Criminal law is crucial for society because it helps to maintain the rule of law.',
            'Without criminal law, it would be difficult to enforce any form of civil justice. It helps to create a safe and stable environment for citizens and to protect their rights. It also helps to ensure that people who commit crimes are held accountable.'
          ]
        },
        {
          heading: 'Types of Criminal Cases and their Provisions',
          paragraphs: [
            'Criminal law in India is governed by the Code of Criminal Procedure (CrPC). This code defines various types of criminal cases and their provisions. These criminal cases may be broadly classified into categories: cognizable offences and non-cognizable offences.',
            'Cognizable offences are those which are more severe in nature and require immediate action by the police. Non-cognizable offences are less severe in nature and do not require immediate action by the police.',
            'The Indian Penal Code (IPC) lays down the punishment for various offences committed under Indian law. It also provides for various defences that can be utilized by accused individuals to escape conviction or reduce their sentence.'
          ]
        },
        {
          heading: 'Role of Lawyers in Criminal Law Cases',
          paragraphs: [
            'In India, Criminal Lawyers play a crucial role in criminal law matters. They are the ones who represent the accused in court and provide legal advice to them. Lawyers are also responsible for providing legal advice to victims of crime.',
            'Our lawyers work closely with police, prosecutors and other criminal justice system employees to ensure that justice is served. Lawyers can provide help in all stages of criminal complaints from filing a complaint to the final judgement.',
            'Lawyers are also responsible for researching applicable laws and regulations, preparing legal documents, representing their clients in court hearings, and ensuring that their clients get a fair trial. They also try to reduce the severity of punishment.'
          ]
        },
        {
          heading: 'Documents Required to File a Criminal Case',
          paragraphs: [
            'Filing a criminal case in India can be an intimidating process. It is important to understand the documents required to file a case related to criminal law matters and the various steps involved in filing such a case.',
            'Required documents include: Complaint or First Information Report (F.I.R.), Charge Sheet, Arrest Warrant, Search and Seizure Warrant, Bail Application, Judgment, Appeal, and Evidence.',
            'These documents are essential for establishing the facts of the case and ensuring proper legal proceedings. Each document serves a specific purpose in the criminal justice process.'
          ]
        },
        {
          heading: 'How Grover & Grover, Advocates Help in Criminal Cases',
          paragraphs: [
            'Grover & Grover, Advocates, and Solicitors, can offer a variety of services to individuals facing criminal charges, ranging from advice on the best course of action to representing them in court proceedings.',
            'When a client faces criminal charges, the first step is to consult with a criminal law lawyer to determine the best course of action for their case. We can advise on the potential outcomes and best strategies for defending the client\'s rights.',
            'In addition to providing advice, we can also represent clients in court, including during pre-trial hearings and the actual trial. We can also provide representation in appeals and post-trial matters such as parole hearings.'
          ]
        }
      ];

      criminalService.documentChecklist = [
        'First Information Report (FIR)',
        'Charge sheet',
        'Arrest warrant (if applicable)',
        'Bail application documents',
        'Evidence and witness statements',
        'Medical reports (if applicable)',
        'Identity proof of accused',
        'Previous criminal records (if any)',
        'Legal notices and correspondence'
      ];

      criminalService.popularCases = [
        'State of Karnataka vs. Krishnappa - Criminal procedure and evidence',
        'State of Uttar Pradesh vs. Ram Chandra - Conviction without presence at scene',
        'Shiv Kumar Yadav vs. State of Uttar Pradesh - Right to explain circumstances'
      ];

      criminalService.faqs = [
        {
          question: 'What is criminal law?',
          answer: 'Criminal law is a branch of law that deals with crimes and their punishment. It is the body of law that defines criminal offenses, sets out their punishment, and outlines the procedures for prosecuting those accused of committing a crime.'
        },
        {
          question: 'What is the role of a criminal defense lawyer?',
          answer: 'A criminal defense attorney represents individuals who are accused of committing a crime. They defend their clients in court, provide legal advice, and negotiate plea bargains on their behalf to protect their rights and ensure a fair trial.'
        },
        {
          question: 'What is the difference between a misdemeanor and a felony?',
          answer: 'A misdemeanor is a less serious offense, such as disorderly conduct or minor theft, usually punishable by a fine or short imprisonment. A felony is a more serious offense, such as murder or drug trafficking, carrying a longer prison sentence.'
        },
        {
          question: 'What is a plea bargain?',
          answer: 'A plea bargain is an agreement between the prosecution and the defense in which the accused agrees to plead guilty to a lesser offense or cooperate with prosecution in exchange for a reduced sentence or dismissal of charges.'
        },
        {
          question: 'Can a criminal case be appealed?',
          answer: 'Yes, a criminal case can be appealed if the accused believes that the trial was conducted unfairly or that the sentence is unjust. The appeal is heard by a higher court, which may reverse the decision or order a new trial.'
        }
      ];

      criminalService.seoKeywords = [
        'Top Criminal Lawyer',
        'Top 10 Criminal Lawyers',
        'Best Criminal Lawyers',
        'Top Criminal Lawyer in High Court',
        'Best Criminal Lawyers in Supreme Court',
        'Criminal Lawyers',
        'criminal defense lawyers',
        'defence lawyer',
        'criminal defense law firms near me',
        'best defense lawyers near me',
        'Criminal defense attorney'
      ];

      await criminalService.save();
      console.log('✓ Criminal Law service updated successfully!');
    } else {
      console.log('✗ Criminal Law service not found');
    }

    // ============================================
    // UPDATE CYBER CRIME SERVICE
    // ============================================
    console.log('\n--- Updating Cyber Crime Service ---');
    const cyberService = await Service.findOne({ slug: 'cyber-crime' });
    
    if (cyberService) {
      cyberService.heroImage = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80';
      
      cyberService.shortDescription = 'Cyber Crime Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      cyberService.overview = `Cybercrime is a growing problem in India, and the government has taken steps to address it through the Cybercrime Law. This law outlines the legal framework for prosecuting cybercrimes and provides guidance on how to protect yourself from becoming a victim of cybercrimes. It also provides guidelines for businesses on how to protect their networks and data from potential attackers.`;

      cyberService.contentBlocks = [
        {
          heading: 'Types of Cyber Crime Cases',
          paragraphs: [
            'Cybercrime is a growing threat to businesses, individuals, and governments alike. It affects everyone, from small business owners to large corporations, and can have devastating consequences.',
            'Major Types of Cybercrime: Like any other crime, cybercrime exists in different types. The crimes can be broken down into fraud crimes, computer crimes, theft crimes, and miscellaneous cases.',
            'Consumers should keep an eye out for cybercriminals who use social engineering tactics to steal identities or commit fraud against businesses. There are also cases of cyberstalking, threats to national security, terrorism, and espionage.'
          ]
        },
        {
          heading: 'Legal Remedies Available Under Cyber Crime Law',
          paragraphs: [
            'Cybercrime is a growing concern in today\'s digital world, and it has become increasingly important for countries to have laws in place to address the issue. The arrangements available for cybercrime law vary from country to country.',
            'Most commonly include criminal laws, civil laws, and administrative regulations. Criminal laws provide punishments for those who commit cybercrimes, while civil laws provide remedies for victims of cybercrime.',
            'Administrative regulations are used to regulate the use of technology and protect citizens from cyber threats. By understanding the different arrangements available for cybercrime law, countries can better protect their citizens.'
          ]
        },
        {
          heading: 'Role of Cyber Crime Lawyer',
          paragraphs: [
            'Cybercrime lawyers have an important role to play in helping to protect individuals and businesses from the risks. Cybercrime lawyers are responsible for understanding the legal and technical aspects of cybercrime law.',
            'A cybercrime lawyer must also be familiar with the documents required for cybercrime law, such as court orders, search warrants, subpoenas, etc. By having a thorough understanding of these documents and related laws, lawyers can provide valuable guidance.',
            'Cybercrime lawyers are also responsible for understanding the relationship between cybercrime and data protection laws in order to advise their clients on compliance requirements and risk mitigation strategies.'
          ]
        },
        {
          heading: 'Documents Required to File a Cyber Crime Case',
          paragraphs: [
            'Cybercrime law is a complex area of law that requires a comprehensive understanding of the legal requirements and documents necessary to ensure compliance.',
            'Cybercrime law in India requires the following documents: Passport and voter ID, Compensation Claim Form, Criminal complaint number, Supporting evidence such as emails, logs, screenshots.',
            'These documents help establish identity and support claims in cybercrime cases. Proper documentation is essential for successful prosecution of cybercrime cases.'
          ]
        },
        {
          heading: 'How Grover & Grover, Advocates Help in Cyber Crime Cases',
          paragraphs: [
            'Grover & Grover, Advocates and Solicitors, is committed to providing legal advice and representation in cybercrime law in India. With their deep understanding of the IT Act and related laws, they provide comprehensive legal solutions.',
            'They provide a wide range of services, including providing legal advice on cybercrimes, assisting with investigations, representing clients in court proceedings, and helping clients develop policies to protect against future incidents.',
            'They also help in resolving disputes between parties involved in cybercrime cases with their extensive experience and knowledge of Indian laws.'
          ]
        }
      ];

      cyberService.documentChecklist = [
        'Complaint or FIR copy',
        'Screenshots of cyber crime evidence',
        'Email logs and correspondence',
        'IP address and digital footprints',
        'Bank statements (for financial fraud)',
        'Identity proof of complainant',
        'Witness statements',
        'Technical expert reports',
        'Any other digital evidence'
      ];

      cyberService.popularCases = [
        'State of Tamil Nadu v. Suhas Katti (1999) - Stringent punishment for cybercrime',
        'State of Maharashtra v. Prafful G. Vashi (2007) - Strict enforcement of cybercrime provisions',
        'K.S. Puttaswamy v. Union of India (2012) - Right to privacy and cybercrime regulation'
      ];

      cyberService.faqs = [
        {
          question: 'What is Cyber crime?',
          answer: 'Cybercrime is a type of criminal activity that involves the use of technology or the internet. Cyber-crimes can include hacking, identity theft, cyberbullying, online scams, and other forms of online fraud or deception.'
        },
        {
          question: 'What should I do if I am the victim of cybercrime?',
          answer: 'If you are the victim of cybercrime, you should report the incident to law enforcement and seek the help of a qualified cybercrime lawyer. Your lawyer can help you understand your legal rights and pursue legal action against the perpetrator.'
        },
        {
          question: 'What types of cases do cybercrime lawyers handle?',
          answer: 'Cybercrime lawyers handle cases related to hacking, identity theft, online fraud, cyber stalking, cyberbullying, data breaches, and more. They also help with data privacy and security issues.'
        },
        {
          question: 'What is the process for reporting a cybercrime?',
          answer: 'You can report cybercrime to your local police department or to the Federal Bureau of Investigation (FBI). You may also be able to report to your internet service provider or other online service providers.'
        },
        {
          question: 'What are the penalties for cybercrime convictions?',
          answer: 'The penalties for cybercrime convictions can vary depending on the severity of the crime and the laws of the jurisdiction. Penalties may include fines, imprisonment, and restitution.'
        }
      ];

      cyberService.seoKeywords = [
        'Cyber Crime Lawyer Near me',
        'Cyber Crime Lawyer Online',
        'Best Cyber Crime Lawyers in India',
        'cyber lawyers near me',
        'best lawyer for cyber crime',
        'cyber fraud lawyers',
        'lawyer for internet crimes',
        'Cyber Crime Lawyer Fees',
        'Cybercrime attorney',
        'Digital forensics lawyer',
        'Online fraud lawyer'
      ];

      await cyberService.save();
      console.log('✓ Cyber Crime service updated successfully!');
    } else {
      console.log('✗ Cyber Crime service not found');
    }

    console.log('\n========================================');
    console.log('Criminal and Cyber Crime services updated!');
    console.log('========================================\n');
    
  } catch (error) {
    console.error('Error updating services:', error);
  } finally {
    await mongoose.connection.close();
  }
};

updateCriminalAndCyberServices();
