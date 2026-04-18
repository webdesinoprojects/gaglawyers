require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'cyber-crime-lawyer',
  name: 'Cyber Crime Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Cyber Crime Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for cybercrime cases including hacking, identity theft, online fraud, cyberstalking, and data breaches. Protect your digital rights with experienced cyber law attorneys.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Cybercrime Law in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Cybercrime is a growing problem in India, and the government has taken steps to address it through the Cybercrime Law. This law outlines the legal framework for prosecuting cybercrimes and provides guidance on how to protect yourself from becoming a victim of cybercrimes. It also provides guidelines for businesses on how to protect their networks and data from potential attackers.\n\nThe cybercrime law in India is the first online cybercrime law in Asia. It passed on December 27th, 2013 and was implemented on January 4th, 2014. The Cyber Crime Law, which has been ratified by President Pranav Mukherjee, aims to protect the right to privacy of Indian citizens by creating a strict regulatory framework for investigations and prosecutions of cybercrime.\n\nCybercrime is a growing issue in India, with estimates that there were 9 million cases across all sectors before this new law came into effect, according to data from the Ministry of Home Affairs (MHA). The Cyber Crime Law in India covers a wide range of activities, including hacking, identity theft, fraud, phishing, and other malicious activities. It also covers the use of computer networks for illegal activities such as child pornography, cyberbullying, and cyberstalking.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Cyber Crime Cases',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Fraud Crimes',
            description: 'Online fraud, phishing scams, financial fraud, and deceptive practices conducted through digital means.'
          },
          {
            icon: 'CheckCircle',
            title: 'Computer Crimes',
            description: 'Hacking, unauthorized access to computer systems, malware attacks, and computer intrusion offenses.'
          },
          {
            icon: 'CheckCircle',
            title: 'Theft Crimes',
            description: 'Identity theft, online theft, data theft, and stealing of digital assets or personal information.'
          },
          {
            icon: 'CheckCircle',
            title: 'Cyberstalking & Harassment',
            description: 'Cases where cyber offenders use various tactics to stalk or harass their victims online or in person, including cyberbullying and online harassment.'
          },
          {
            icon: 'CheckCircle',
            title: 'National Security Threats',
            description: 'Miscellaneous cybercrime categories including threats to national security, terrorism, and espionage conducted through digital channels.'
          },
          {
            icon: 'CheckCircle',
            title: 'Data Breaches',
            description: 'Unauthorized access to and theft of sensitive data, including personal information, financial records, and corporate data.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available Under Cyber Crime Law',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Criminal Laws',
            description: 'Provide punishments for those who commit cybercrimes. Cybercrimes such as identity theft and computer intrusion fit squarely within criminal law and include restitution for losses suffered from cybercrimes and monetary damages.'
          },
          {
            icon: 'CheckCircle',
            title: 'Civil Laws',
            description: 'Provide remedies for victims of cybercrime. Typically seen as pro-social laws with the goal of reforming or protecting society\'s interests. Allow individuals and companies to seek damages or compensation for losses resulting from cyber-attacks.'
          },
          {
            icon: 'CheckCircle',
            title: 'Administrative Regulations',
            description: 'Used to regulate the use of technology and protect citizens from cyber threats. Ensure compliance with data protection laws and cybersecurity standards.'
          },
          {
            icon: 'CheckCircle',
            title: 'IT Act Provisions',
            description: 'Comprehensive legal framework under the Information Technology Act that addresses various aspects of cybercrime and provides legal recourse for victims.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Role of Cyber Crime Lawyers',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        steps: [
          {
            title: 'Legal & Technical Understanding',
            description: 'Understand both the legal and technical aspects of cybercrime law. Stay updated with evolving cyber threats and legal frameworks.'
          },
          {
            title: 'Client Advisory Services',
            description: 'Advise clients on how to best protect themselves from potential cyber threats. Provide guidance on cybersecurity issues and risk mitigation strategies.'
          },
          {
            title: 'Document Management',
            description: 'Handle court orders, search warrants, subpoenas, wiretaps, and seizures. Ensure all legal documentation is properly prepared and filed.'
          },
          {
            title: 'Compliance & Data Protection',
            description: 'Understand the relationship between cybercrime and data protection laws. Advise clients on compliance requirements and help develop policies to protect against future incidents.'
          },
          {
            title: 'Investigation Assistance',
            description: 'Assist with cybercrime investigations, work with law enforcement, and help gather digital evidence through digital forensics.'
          },
          {
            title: 'Court Representation',
            description: 'Represent clients in court proceedings, negotiate plea bargains, argue for reduced charges or sentencing, and present defense at trial.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Cyber Crime Case',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Identity Documents',
            description: 'Passport and voter ID to establish identity of the complainant.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compensation Claim Form',
            description: 'Formal document outlining the damages and compensation sought for losses suffered due to cybercrime.'
          },
          {
            icon: 'CheckCircle',
            title: 'Criminal Complaint Number',
            description: 'FIR or complaint number obtained from law enforcement after reporting the cybercrime incident.'
          },
          {
            icon: 'CheckCircle',
            title: 'Supporting Evidence',
            description: 'Emails, logs, screenshots, digital forensics reports, and any other evidence that supports the cybercrime claim.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Orders & Warrants',
            description: 'Search warrants, subpoenas, and other legal documents required for investigation and prosecution.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Cyber Crime Cases',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice on Cybercrimes',
            description: 'Provide comprehensive legal advice on various types of cybercrimes and help clients understand their legal rights and options.'
          },
          {
            icon: 'CheckCircle',
            title: 'Investigation Assistance',
            description: 'Assist with cybercrime investigations, work with law enforcement agencies, and help gather and preserve digital evidence.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings, including criminal trials and civil lawsuits related to cybercrime.'
          },
          {
            icon: 'CheckCircle',
            title: 'Policy Development',
            description: 'Help clients develop policies and procedures to protect against future incidents of cybercrime and ensure compliance with data protection laws.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'Resolve disputes between parties involved in cybercrime cases through negotiation, mediation, or litigation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Data Breach Response',
            description: 'Help clients who have experienced data breaches understand their legal obligations, investigate the breach, identify the source, and pursue legal action against those responsible.'
          },
          {
            icon: 'CheckCircle',
            title: 'IT Act Expertise',
            description: 'Deep understanding of the IT Act and related laws to provide comprehensive legal solutions to protect clients against cyber threats.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Supreme Court & High Court Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'State of Tamil Nadu v. Suhas Katti',
            description: 'Criminal Appeal No. 1450 of 1999 - The Supreme Court held that the punishment for cybercrime should be made more stringent.'
          },
          {
            icon: 'CheckCircle',
            title: 'State of Maharashtra v. Prafful G. Vashi',
            description: 'Criminal Appeal No. 756 of 2007 - The Supreme Court held that the cybercrime provisions should be strictly enforced.'
          },
          {
            icon: 'CheckCircle',
            title: 'K.S. Puttaswamy v. Union of India',
            description: 'Writ Petition (Civil) No. 494 of 2012 - The Supreme Court held that the right to privacy is a fundamental right and that cybercrime should be regulated to protect this right.'
          },
          {
            icon: 'CheckCircle',
            title: 'State of Uttar Pradesh v. Rajesh Kumar Mishra',
            description: 'Criminal Appeal No. 531 of 2014 - The Supreme Court held that cybercrime laws should be applied even when the accused is not physically present in the country.'
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
            question: 'What is Cyber crime?',
            answer: 'Cybercrime is a type of criminal activity that involves the use of technology or the internet. Cyber-crimes can include hacking, identity theft, cyberbullying, online scams, and other forms of online fraud or deception.'
          },
          {
            question: 'What should I do if I am the victim of cybercrime?',
            answer: 'If you are the victim of cybercrime, you should report the incident to law enforcement and seek the help of a qualified cybercrime lawyer. Your lawyer can help you understand your legal rights and options, and can work with you to pursue legal action against the perpetrator.'
          },
          {
            question: 'What are some common types of cybercrimes?',
            answer: 'Some common types of cybercrimes include hacking, identity theft, phishing scams, malware attacks, cyberstalking, cyberbullying, and online harassment.'
          },
          {
            question: 'What types of cases do cybercrime lawyers handle?',
            answer: 'Cybercrime lawyers handle a wide range of cases related to cybercrime, including hacking, identity theft, online fraud, cyber stalking, cyberbullying, and more. They may also help clients with data privacy and security issues, as well as other legal issues related to technology and the internet.'
          },
          {
            question: 'How do I find a good cybercrime lawyer?',
            answer: 'To find a good cybercrime lawyer, you can search online for lawyers who specialize in cybercrime cases, or ask for recommendations from friends, family, or other professionals in the legal industry.'
          },
          {
            question: 'What is the statute of limitations for cybercrime cases?',
            answer: 'The statute of limitations for cybercrime cases can vary depending on the jurisdiction and the specific type of crime involved. In some cases, there may be no statute of limitations at all. It is important to consult with a lawyer to determine the applicable statute of limitations in your case.'
          },
          {
            question: 'What is the process for reporting a cybercrime?',
            answer: 'The process for reporting a cybercrime can vary depending on the jurisdiction and the type of crime involved. In general, you can report cybercrime to your local police department or to the Federal Bureau of Investigation (FBI). You may also be able to report cybercrime to your internet service provider or other online service providers.'
          },
          {
            question: 'Can cybercrime cases be settled out of court?',
            answer: 'Yes, cybercrime cases can be settled out of court through negotiation or mediation. However, it is important to consult with a lawyer to ensure that any settlement agreement is fair and reasonable.'
          },
          {
            question: 'Can cybercrime lawyers help with data breaches?',
            answer: 'Yes, cybercrime lawyers can help clients who have experienced data breaches. They can help clients understand their legal obligations under data protection laws, and can work with them to investigate the breach, identify the source of the breach, and pursue legal action against those responsible.'
          },
          {
            question: 'Can cybercrime lawyers represent clients in international cybercrime cases?',
            answer: 'Yes, cybercrime lawyers can represent clients in international cybercrime cases. However, these cases can be complex and require a lawyer who is familiar with the laws and regulations of multiple jurisdictions.'
          },
          {
            question: 'What is the role of a cybercrime lawyer in a criminal case?',
            answer: 'In a criminal case involving cybercrime, a cybercrime lawyer can provide legal representation to the accused, and defend their rights throughout the legal process. This may involve negotiating plea bargains, arguing for reduced charges or sentencing, or presenting a defence at trial. The lawyer can also advise their client on how to interact with law enforcement during an investigation.'
          },
          {
            question: 'How long do cybercrime cases typically take to resolve?',
            answer: 'Cybercrime cases can vary in length depending on their complexity and the legal process involved. Some cases can be resolved relatively quickly, while others may take months or even years to complete.'
          },
          {
            question: 'What are the penalties for cybercrime convictions?',
            answer: 'The penalties for cybercrime convictions can vary depending on the severity of the crime and the laws of the jurisdiction. Penalties may include fines, imprisonment, and restitution.'
          },
          {
            question: 'What is the difference between civil and criminal cybercrime cases?',
            answer: 'Civil cybercrime cases are typically brought by individuals or companies seeking damages or compensation for losses resulting from cyber-attacks. Criminal cybercrime cases are brought by law enforcement agencies and involve charges of violating criminal laws related to cybercrime.'
          },
          {
            question: 'Can I sue someone for cyberbullying or online harassment?',
            answer: 'Yes, you can sue someone for cyberbullying or online harassment, and a cybercrime lawyer can help you file a lawsuit and represent you in court.'
          },
          {
            question: 'What should I do if I suspect I have been a victim of cybercrime?',
            answer: 'If you suspect you have been a victim of cybercrime, you should report it to law enforcement and seek the advice of a cybercrime lawyer.'
          },
          {
            question: 'Can I be prosecuted for unintentional cybercrime?',
            answer: 'It is possible to be prosecuted for unintentional cybercrime, depending on the circumstances. A cybercrime lawyer can help you understand your legal options in this situation.'
          },
          {
            question: 'How can I keep my personal information safe online?',
            answer: 'To keep your personal information safe online, you should use strong passwords, avoid sharing personal information with unknown sources, and use two-factor authentication whenever possible.'
          },
          {
            question: 'What are some common defences used in cybercrime cases?',
            answer: 'Common defences in cybercrime cases include arguing that the defendant did not have the intent to commit a crime, that the evidence was obtained illegally, or that the defendant was acting in self-defence.'
          },
          {
            question: 'What is digital forensics, and how does it relate to cybercrime cases?',
            answer: 'Digital forensics is the practice of collecting, analysing, and preserving digital evidence, such as computer logs, email messages, and social media posts. Digital forensics is often used in cybercrime cases to gather evidence and build a case against the defendant.'
          },
          {
            question: 'What is the role of law enforcement in investigating cybercrime?',
            answer: 'Law enforcement agencies play a crucial role in investigating cybercrime, gathering evidence, and bringing charges against perpetrators. They work with other agencies and organizations to share information and resources to combat cybercrime.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Contact our expert cyber crime legal team today for professional assistance with cybercrime cases, data breaches, and digital security matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Cyber Crime Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Cyber Crime Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
