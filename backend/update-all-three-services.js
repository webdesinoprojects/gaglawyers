require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const updateAllServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // ============================================
    // UPDATE AFT SERVICE
    // ============================================
    console.log('\n--- Updating AFT Service ---');
    const aftService = await Service.findOne({ slug: 'armed-force-tribunal-lawyer' });
    
    if (aftService) {
      aftService.heroImage = 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=80';
      
      aftService.shortDescription = 'Armed Force Tribunal Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      aftService.overview = `Armed Forces Tribunal Lawyer (AFT Lawyer): The Armed Forces Tribunal (AFT) is a specialised judicial body established to adjudicate disputes and complaints related to the armed forces. It was set up in 2007 under the Armed Forces Tribunal Act, 2007, and consists of a chairman, vice chairman, and other members who are appointed by the President of India. The AFT has jurisdiction over matters related to service laws applicable to members of the armed forces, including those relating to recruitment, promotion, pay and allowances, termination, or discharge from service.`;

      aftService.contentBlocks = [
        {
          heading: 'Armed Forces Tribunal Matters (AFT Matters)',
          paragraphs: [
            'The Armed Forces Tribunal (AFT) is a specialised judicial body established to adjudicate disputes and complaints related to the armed forces, and individuals often look for an AFT lawyer or Armed Force Tribunal Lawyer near me for such matters. It was set up in 2007 under the Armed Forces Tribunal Act, 2007, and consists of a chairman, vice chairman, and other members who are appointed by the President of India.',
            'The AFT has jurisdiction over matters related to service laws applicable to members of the armed forces, including those relating to recruitment, promotion, pay and allowances, termination, or discharge from service. It also hears appeals against decisions taken in court martial proceedings. The AFT is empowered to pass orders for reinstatement or the grant of compensation in cases of wrongful termination or discharge from service.'
          ]
        },
        {
          heading: 'Functions of Armed Forces Tribunal',
          paragraphs: [
            'Armed tribunals are a type of court that deals with military matters. They are responsible for the administration of justice in the armed forces, and they were established to ensure that members of the military receive fair and impartial trials. Armed tribunals play an important role in protecting the rights of service members and upholding international law.',
            'Their functions include hearing cases related to criminal offences, high-ranking officers, war crimes, and other matters related to military operations. Armed tribunals also have the authority to issue orders pertaining to personnel management, discipline, and other issues within their jurisdiction.',
            'The Armed Tribunal in India is a specialised court that deals with cases related to the Armed Forces of India. It was established in 2020 by the Indian government to provide justice to members of the armed forces and their families.'
          ]
        },
        {
          heading: 'Rights & Remedies Available Under AFT Act',
          paragraphs: [
            'The AFT Act provides a comprehensive set of rights and remedies available to individuals and businesses that have suffered financial losses due to unfair trading practises. The Act sets out the rights and remedies available to those affected, including the right to seek damages, compensation, and injunctive relief.',
            'Under Section 22A (1) of the AFT Act, an individual may bring proceedings in court if they have suffered a financial loss as a result of unfair trading practises that amount to a contravention of Section 21 of the AFT Act. Section 21 of the AFT Act creates a statutory cause of action for an individual against a business operator who has engaged in unfair trading practises.'
          ]
        },
        {
          heading: 'File Appeal With the Armed Forces Tribunal',
          paragraphs: [
            'Filing an appeal with the Armed Forces Tribunal can be a complicated process. It requires a thorough understanding of the legal aspects of the case and the applicable laws. With proper knowledge, you can ensure that your case is heard fairly and efficiently by the tribunal.',
            'Steps in filing an appeal: Prepare a petition for review with all supporting documentation for your case. This includes any legal documents that may help you prove your case, such as affidavits and expert reports. Keep these documents readily available and updated throughout the process.',
            'If the petition is denied without a trial, you may file a motion for an appeal with the decision in your case. The court will not allow more than one motion for an appeal per case during the same case year. You must obtain permission from the presiding judge before moving on to any other appeals outside of this time period.'
          ]
        },
        {
          heading: 'Role of Lawyer in Armed Forces Tribunal',
          paragraphs: [
            'In India, lawyers have an important role to play in the Armed Forces Tribunal. The tribunal is responsible for providing justice to members of the armed forces and their families who have grievances against the government. Lawyers can help in filing cases, representing clients in court, and providing advice on legal matters related to military service.',
            'They can also provide assistance in understanding the rules and regulations of the tribunal and ensuring that their clients receive fair treatment from the tribunal. Furthermore, they can help in drafting petitions for compensation or other relief related to military service.'
          ]
        },
        {
          heading: 'How Grover & Grover, Advocates Help in Armed Forces Tribunal Cases',
          paragraphs: [
            'Grover & Grover, Advocates and Solicitors, provides legal advice and representation to the Armed Forces Tribunal, which is an independent body set up to hear appeals from members of the armed forces. They help by providing guidance on the legal procedures and regulations that govern the tribunal.',
            'They also assist in filing petitions, preparing documents, representing clients in court proceedings, and other related activities. In addition to this, they also provide advice on compensation claims for injuries sustained while serving in the armed forces.',
            'The expertise of Grover & Grover makes them a valuable asset for those seeking justice through the Armed Forces Tribunal. They are well-versed in military law and can help ensure that their clients receive justice from the AFT.'
          ]
        }
      ];

      aftService.documentChecklist = [
        'Service records and documents',
        'Court martial proceedings (if applicable)',
        'Orders of termination or discharge',
        'Pay and allowances statements',
        'Promotion and recruitment documents',
        'Identity proof and service certificates',
        'Affidavits and supporting evidence',
        'Legal notices and correspondence',
        'Medical certificates (if applicable)'
      ];

      aftService.popularCases = [
        'Union of India vs. Major General Shri Kant Sharma (2015) - Landmark case on service conditions',
        'Lt Col Nitisha vs. Union of India (2021) - Permanent Commission for women officers',
        'Ex-Naik Ram Kishan vs. Union of India (2010) - Disability pension rights'
      ];

      aftService.faqs = [
        {
          question: 'What is the Armed Forces Tribunal (AFT)?',
          answer: 'The Armed Forces Tribunal (AFT) is a quasi-judicial body in India that was established under the Armed Forces Tribunal Act, 2007. It provides a platform for armed forces personnel, including retired personnel, to seek redressal of their grievances related to service matters.'
        },
        {
          question: 'Who can approach the Armed Forces Tribunal (AFT)?',
          answer: 'Any serving or retired armed forces personnel, including officers, junior commissioned officers, and other ranks, can approach the Armed Forces Tribunal (AFT) for redressal of their grievances related to service matters.'
        },
        {
          question: 'What types of cases are heard by the Armed Forces Tribunal (AFT)?',
          answer: 'The Armed Forces Tribunal (AFT) hears cases related to service matters of armed forces personnel, including promotions, postings, transfers, pay, pensions, and retirement benefits. It also deals with cases related to disciplinary matters, such as court-martial proceedings.'
        },
        {
          question: 'What is the time limit for filing a case with the Armed Forces Tribunal (AFT)?',
          answer: 'The time limit for filing a case with the Armed Forces Tribunal (AFT) is 3 months from the date of the cause of action or incident. However, the AFT may condone the delay in filing the application if it is satisfied that there was sufficient cause for the delay.'
        },
        {
          question: 'Can I appeal a decision of the Armed Forces Tribunal (AFT)?',
          answer: 'Yes, a person can appeal a decision of the Armed Forces Tribunal (AFT) to the higher courts, specifically the High Court or Supreme Court, depending on the nature of the case.'
        }
      ];

      aftService.seoKeywords = [
        'AFT lawyer',
        'Advocate for AFT matters',
        'Best AFT Lawyers near me',
        'AFT lawyer fees',
        'Armed Force Tribunal Lawyer near me',
        'Best Armed Force Tribunal Lawyers',
        'Top Armed Force Tribunal Lawyer in India',
        'Best Advocates for Armed Force Tribunal Cases',
        'Best Lawyers for Armed Force Tribunal Cases',
        'Lawyer for Armed Force Tribunal Cases',
        'Lawyer for Armed Force Tribunal Matters',
        'Lawyer for Armed Force Tribunal Disputes',
        'Armed Force Tribunal Lawyer in High Court',
        'Top Armed Force Tribunal Lawyer in Supreme Court'
      ];

      await aftService.save();
      console.log('✓ AFT service updated successfully!');
    } else {
      console.log('✗ AFT service not found');
    }

    // ============================================
    // UPDATE BAIL SERVICE
    // ============================================
    console.log('\n--- Updating Bail Service ---');
    const bailService = await Service.findOne({ slug: 'bail-lawyer' });
    
    if (bailService) {
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
      console.log('✓ Bail service updated successfully!');
    } else {
      console.log('✗ Bail service not found');
    }

    // ============================================
    // UPDATE CAT SERVICE
    // ============================================
    console.log('\n--- Updating CAT Service ---');
    const catService = await Service.findOne({ slug: 'cat-matters-lawyer' });
    
    if (catService) {
      catService.heroImage = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80';
      
      catService.shortDescription = 'CAT Matters Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      catService.overview = `The Central Administrative Tribunal (CAT) is an independent judicial framework in India that was established under the Administrative Tribunals Act, 1985. It is responsible for adjudicating disputes regarding the recruitment, promotion, and disciplinary actions of various government personnel and officials. The CAT resolves disputes among the government and its personnel and between the government and the public.`;

      catService.contentBlocks = [
        {
          heading: 'CAT Matters',
          paragraphs: [
            'The Central Administrative Tribunal (CAT) is an independent judicial framework in India that was established under the Administrative Tribunals Act, 1985, and individuals often search for a CAT Lawyer near me or Best CAT Lawyer near me for such matters.',
            'It is responsible for adjudicating disputes regarding the recruitment, promotion, and disciplinary actions of various government personnel and officials. The CAT resolves disputes among the government and its personnel and between the government and the public.',
            'The CAT is empowered to concentrate appeals from lower administrative tribunals and to issue orders, writs, and instructions on how to enforce its decisions. The CAT has jurisdiction over all central government employees, officers, and personnel.'
          ]
        },
        {
          heading: 'Types of Disputes Handled by CAT',
          paragraphs: [
            'The Central Administrative Tribunal (CAT) is a specialized body established to resolve disputes and legal cases concerning the recruitment and employment conditions of individuals appointed to public services and positions in India.',
            'CAT handles a wide range of disputes, including those pertaining to recruitment and terms of service for employees in the Central Government, Public Sector Undertakings, and Union Territories. It also addresses appeals against disciplinary actions, conflicts regarding pay, allowances, pensions, and other benefits.',
            'Furthermore, CAT adjudicates disputes surrounding employee promotions, transfers, re-employment within the Central Government system, and resolves conflicts involving awards, honors, medals allocation among personnel along with seniority issues.'
          ]
        },
        {
          heading: 'Acts and Provisions Attracted in Service CAT Matters',
          paragraphs: [
            'The Central Administrative Tribunal (Service CAT) is an independent judicial body established by the Central Government to address civil servants\' grievances promptly and effectively. It has the authority to hear appeals from civil servants regarding decisions made by the Central Government.',
            'The establishment of the Central Administrative Tribunal Act in 1985 aims to resolve disputes and complaints related to the recruitment and conditions of service for individuals appointed to public services and posts associated with the affairs of the Central Government.',
            'The provisions of this Act apply to all Central government employees, including those in prestigious positions such as the Indian Administrative Service, Indian Police Service, and Indian Foreign Service who are appointed under the Constitution.'
          ]
        },
        {
          heading: 'Rights and Obligations Under CAT Matters to Government Employees',
          paragraphs: [
            'The Central Administrative Tribunal (CAT) serves as a quasi-judicial body in India, providing a platform for government servants to challenge administrative actions levied against them. Its establishment aimed to ensure that government employees have an avenue to contest disciplinary actions, promotions, pay adjustments, and other matters.',
            'Moreover, the CAT possesses the authority to handle cases involving alleged violations of fundamental rights concerning government employees. It grants certain rights and responsibilities to these individuals.',
            'The CAT ensures that government employees have the right to present their arguments before any decision is made against them. It guarantees access for these individuals to obtain a copy of any orders issued in relation to their case.'
          ]
        },
        {
          heading: 'Role of Lawyers in CAT Matters',
          paragraphs: [
            'The role of a CAT Lawyer within the Central Administrative Tribunal is to professionally and competently represent their clients. They offer legal advice and assist in navigating the intricate processes of the CAT.',
            'Moreover, they ensure the protection of their clients\' rights and provide assistance with document preparation and representation during hearings. They thoroughly review relevant documentation to offer advice on effective case presentation.',
            'These lawyers inform clients about applicable laws and regulations while advising them on presenting compelling arguments. Their role includes assessing procedural fairness and safeguarding client rights by cross-examining witnesses.'
          ]
        },
        {
          heading: 'How Grover & Grover, Advocates Help Related To CAT Matters',
          paragraphs: [
            'Grover & Grover Advocates, a law firm based in India, specializes in handling matters pertaining to the Central Administrative Tribunal. With a team of skilled and knowledgeable lawyers, they assist clients in navigating the intricate legal landscape.',
            'Their services encompass a wide range of areas related to CAT matters. This includes providing guidance and representation for appeals, investigations, compliance, and litigation. They also offer advice and representation for enforcement matters.',
            'Through skilled negotiation and litigation strategies, Grover & Grover has successfully assisted clients in resolving disputes arising from CAT matters. Their experienced lawyers possess extensive knowledge that enables them to effectively represent clients.'
          ]
        }
      ];

      catService.documentChecklist = [
        'Application/Petition for CAT',
        'Service records and employment documents',
        'Orders of disciplinary action or termination',
        'Pay slips and allowance statements',
        'Promotion and transfer orders',
        'Identity proof and service certificates',
        'Affidavits and supporting evidence',
        'Correspondence with department',
        'Pension documents (if applicable)'
      ];

      catService.popularCases = [
        'B.K.K. Pillai vs. Union of India - Supreme Court affirmed CAT authority',
        'P.B. Samant vs. Union of India - Delhi High Court on CAT jurisdiction',
        'B.K.K. Pillai vs. State of Kerala - CAT power over state government orders'
      ];

      catService.faqs = [
        {
          question: 'What is the Central Administrative Tribunal (CAT)?',
          answer: 'The Central Administrative Tribunal (CAT) is a quasi-judicial body in India that was established under the Administrative Tribunals Act, 1985. It provides a platform for government employees to seek redressal of their grievances related to service matters.'
        },
        {
          question: 'Who can approach the Central Administrative Tribunal (CAT)?',
          answer: 'Any serving or retired central government employee, including officers and staff from various departments, can approach the CAT for redressal of their grievances related to service matters such as recruitment, promotion, and disciplinary actions.'
        },
        {
          question: 'What types of cases are heard by the Central Administrative Tribunal (CAT)?',
          answer: 'The CAT hears cases related to service matters of government employees, including promotions, postings, transfers, pay, pensions, and retirement benefits. It also deals with cases related to disciplinary matters and violation of fundamental rights.'
        },
        {
          question: 'What is the jurisdiction of the Central Administrative Tribunal (CAT)?',
          answer: 'The jurisdiction of the CAT extends to all service matters of central government employees, including those in the Army, Navy, Air Force, Coast Guard, and various civil services. It has jurisdiction over matters related to recruitment, promotion, and service conditions.'
        },
        {
          question: 'Can I appeal a decision of the Central Administrative Tribunal (CAT)?',
          answer: 'Yes, a person can appeal a decision of the CAT to the higher courts, specifically the High Court or Supreme Court, depending on the nature of the case and jurisdiction.'
        }
      ];

      catService.seoKeywords = [
        'CAT Lawyer near me',
        'CAT Lawyer fees in Delhi',
        'Best CAT Lawyer near me',
        'Top CAT Lawyer in India',
        'CAT Lawyer Advocate in Delhi',
        'Best Advocates for CAT Matters in Delhi',
        'Best Lawyers for CAT Matters in Delhi',
        'Lawyer for CAT Matters in Delhi',
        'Lawyer for Central Administrative Tribunal Matters in Delhi',
        'CAT Lawyer in High Court',
        'Top CAT Lawyer in Supreme Court'
      ];

      await catService.save();
      console.log('✓ CAT service updated successfully!');
    } else {
      console.log('✗ CAT service not found');
    }

    console.log('\n========================================');
    console.log('All services updated successfully!');
    console.log('========================================\n');
    
  } catch (error) {
    console.error('Error updating services:', error);
  } finally {
    await mongoose.connection.close();
  }
};

updateAllServices();
