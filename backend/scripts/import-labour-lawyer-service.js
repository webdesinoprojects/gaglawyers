require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'labour-lawyer',
  name: 'Labour Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Labour Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Labour and Industrial Law',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Labour Law Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Labour lawyers are required to have a comprehensive understanding of labour law cases and possess the expertise to gather and analyse the evidence required to build a strong case for their clients.\n\nLabour and industrial law is a body of law that regulates the relationship between employers, employees, and trade unions. It covers topics such as the minimum wage, hours of work, health and safety, discrimination in the workplace, and collective bargaining. It also covers issues such as trade union recognition, collective agreements, and industrial action.'
      }
    },
    {
      type: 'overview',
      heading: 'Labour Law in India',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'In India, labour and industrial law are regulated by the Industrial Disputes Act, 1947. It covers various aspects of employment, including wages, working hours, safety regulations, and collective bargaining. It also outlines the rights of workers to form unions and other forms of collective action. Labour and Industrial Law is an important part of India\'s legal framework as it provides protection for both employers and employees.\n\nLabour law has two branches: the Industrial Relations Code (IRC) and the Labour Laws. The IRC regulates industrial relations in the private sector, whereas the Labour Laws regulate labour relations in both the public and private sectors. The basic feature of labour law is that it sets out the rights and obligations of an employer-employee relationship.'
      }
    },
    {
      type: 'overview',
      heading: 'Industrial Relations Code',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        body: 'The Industrial Relations Code regulates the conditions of work in the private sector in accordance with Section 2 of the Constitution, which provides that labour relations in the private sector are regulated by law. The Code contains a set of rules, regulations, and directions to be observed by employers and employees. It is designed to ensure fair treatment for employees and enforce compliance with employment-related rights.\n\nThe Code is based on the principle of freedom of association, which means that employees and employers have the right to form and join associations in order to protect their interests. The Code protects all forms of associations, including trade unions, employer\'s organisations, and other interest groups.'
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment Under Labour Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        body: 'Labour law in India is a complex and ever-changing subject. It is important to understand the various charges, penalties, and punishments that can be imposed on employers under Indian labour laws. The charges, penalties, and punishments for labour and industrial law cases can vary depending on the specific circumstances of the case.\n\nGenerally, employers who violate labour laws may be subject to civil penalties, including fines and back wages, and may be required to make restitution to the affected employees. In some cases, employers may be subject to criminal charges. Violations of labour laws may also result in the employer being required to pay civil damages to the employee, such as compensatory and punitive damages.\n\nAdditionally, employers may be subject to investigation and enforcement actions from government agencies, including the Department of Labour, and may be subject to civil and criminal prosecution.'
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available Under Labour Law',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Wages',
            description: 'Under the Payment of Wages Act, 1936, workers are entitled to receive their wages in full, on time, and without any deductions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Overtime',
            description: 'Every employee is entitled to overtime pay if they work beyond the regular hours of work.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Bonus',
            description: 'All employees are entitled to receive a bonus if their employer declares it.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Retrenchment Compensation',
            description: 'If an employer terminates an employee\'s services without any reasonable cause, the employee is entitled to retrenchment compensation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Join Trade Unions',
            description: 'All workers are allowed to form and join trade unions and associations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right Against Unfair Labour Practices',
            description: 'Workers have the right to be protected against any unfair labour practices such as discrimination, exploitation, and harassment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Social Security',
            description: 'All employees are entitled to various forms of social security benefits such as provident fund, gratuity, pension, health insurance, etc.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Work',
            description: 'Every employee has the right to work in a safe and healthy working environment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Reasonable Notice',
            description: 'All employees are entitled to reasonable notice before termination of employment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Fair Wages',
            description: 'Employees are entitled to receive wages that are fair and reasonable.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Role of Labour Lawyer in Industrial Labour Cases',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'Labour and industrial law are integral parts of India\'s legal system. It protects the rights of workers, employers, and other stakeholders in the industry. The role of lawyers in such cases is crucial, as they provide expert advice on how to handle disputes and ensure that all parties involved are treated fairly.\n\nThe role of a lawyer in labour and industrial law cases in India is to provide legal advice and representation to employers and employees in matters involving employment contracts, collective bargaining, dispute resolution, and union representation. The lawyer must be knowledgeable about all aspects of Indian labour laws, including the Indian Labour Code, the Minimum Wages Act, the Factories Act, the Industrial Disputes Act, and the Trade Unions Act.\n\nLawyers play a vital role in labour and industrial law cases in India by providing legal advice and representation to both employers and employees. They use their knowledge of the law to advise clients on their rights and obligations, as well as how to resolve disputes through negotiation or litigation.'
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Labour Law Case',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Details of Parties Involved',
            description: 'Name, address, contact number, and other relevant information of all parties involved in the dispute.'
          },
          {
            icon: 'CheckCircle',
            title: 'Details of Employer-Employee Relationship',
            description: 'Documentation establishing the employment relationship, including appointment letters, job descriptions, and employment terms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence Documents',
            description: 'Employment contracts, pay slips, letters, emails, and any other documents that support the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Details of the Dispute',
            description: 'Including dates and the exact cause of the dispute, with supporting documentation and timeline of events.'
          },
          {
            icon: 'CheckCircle',
            title: 'Applicable Laws and Regulations',
            description: 'A copy of the applicable labour laws, industrial law, rules and regulations, and rule of procedure relevant to the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Other Relevant Documents',
            description: 'Any other documents as suggested by the court or lawyer that may be relevant to the case.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        body: 'Grover & Grover Advocates and Solicitors is a leading law firm in India that specialises in labour and industrial law. With their team of experienced lawyers, they provide comprehensive legal services to employers and employees alike. They offer expertise in various areas of labour and industrial law, such as collective bargaining, dispute resolution, employment contracts, dismissal procedures, and more.\n\nTheir services help to ensure that the rights of both employers and employees are protected under Indian labour laws. Additionally, they also provide guidance on compliance with the various statutory regulations applicable to industrial establishments. With their assistance, employers can be sure that their operations are conducted within the ambit of Indian labour laws.\n\nTheir law firm has been recognised as a leading player in the field of labour law, with expertise in collective bargaining and dispute resolution. They also have a strong presence at the national level and have represented Indian employers in various proceedings before the National Industrial Tribunal.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases in Supreme Court and High Court',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Vineet Kumar Sharma v. State of Haryana and Ors',
            description: 'The Supreme Court held that the right of the workman to carry on union activities and to move the court for the enforcement of his rights is a fundamental right guaranteed under Article 19(1)(c) of the Constitution of India.'
          },
          {
            icon: 'CheckCircle',
            title: 'K. Srinivasan v. All India Bank Employees Association',
            description: 'The Supreme Court held that any worker aggrieved by the action of his employer in denying him his right to form a union or in victimising him for forming or joining a union has the right to move the Industrial Tribunal even if the trade union has not been registered.'
          },
          {
            icon: 'CheckCircle',
            title: 'R.K. Garg v. The Executive Engineer',
            description: 'The High Court held that the provisions of the Industrial Disputes Act, 1947, are applicable to all matters relating to the employment of workmen in an establishment and are not confined to disputes of workmen with their employer.'
          },
          {
            icon: 'CheckCircle',
            title: 'A.P.S.R.T.C. v. D.V. Satyanarayana',
            description: 'The High Court held that the employer is under an obligation to pay wages to the dismissed employee, even if the employee has not worked for the entire period of the dismissal.'
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
            question: 'What is the Labour Law in India?',
            answer: 'The Labour Law in India refers to a set of laws and regulations that govern the relationship between employers and employees, as well as the working conditions, wages, and benefits provided to workers in India. It includes the Industrial Disputes Act, Minimum Wages Act, Factories Act, and various other statutes.'
          },
          {
            question: 'What are the main provisions of the Labour Law in India?',
            answer: 'The main provisions include minimum wage requirements, working hours regulations, health and safety standards, prohibition of child labor, provisions for social security benefits, rights to form trade unions, collective bargaining rights, and protection against unfair labor practices and discrimination.'
          },
          {
            question: 'Who is covered under the Labour Law in India?',
            answer: 'Labour laws in India cover all workers and employees in both organized and unorganized sectors, including factory workers, contract workers, casual workers, and employees in establishments. Specific laws may have different thresholds for applicability based on the number of employees.'
          },
          {
            question: 'What are the laws governing employee compensation and insurance in India?',
            answer: 'The main laws include the Employees\' Compensation Act, 1923 (for workplace injuries), the Employees\' State Insurance Act, 1948 (for health insurance and medical benefits), the Payment of Gratuity Act, 1972, and the Employees\' Provident Funds Act, 1952.'
          },
          {
            question: 'What are the laws governing child labour in India?',
            answer: 'The Child Labour (Prohibition and Regulation) Act, 1986, prohibits employment of children below 14 years in hazardous occupations and regulates working conditions for children in non-hazardous occupations. The Juvenile Justice Act also provides protection for children.'
          },
          {
            question: 'What are the penalties for violating the Labour Law in India?',
            answer: 'Penalties vary depending on the specific violation and can include fines ranging from thousands to lakhs of rupees, imprisonment ranging from months to years, payment of back wages and compensation to affected employees, and closure of establishments in severe cases.'
          },
          {
            question: 'What is the role of a labour lawyer in drafting and reviewing employment contracts and agreements?',
            answer: 'A labour lawyer drafts and reviews employment contracts to ensure compliance with labour laws, protects the interests of their clients, includes necessary clauses for termination, confidentiality, and dispute resolution, and ensures the contract is legally enforceable and fair to both parties.'
          },
          {
            question: 'Can a labour lawyer help in negotiating better compensation and benefits for employees?',
            answer: 'Yes, a labour lawyer can assist employees in negotiating better compensation and benefits by analyzing market standards, reviewing employment terms, advising on legal entitlements, and representing their clients in negotiations or court proceedings to secure fair compensation.'
          },
          {
            question: 'How can a labour lawyer assist employees in cases of discrimination or harassment at the workplace?',
            answer: 'A labour lawyer can help by documenting the discrimination or harassment, filing complaints with appropriate authorities, representing the employee in internal inquiries and legal proceedings, seeking compensation and remedies, and ensuring the employer takes corrective action to prevent future incidents.'
          },
          {
            question: 'What are the remedies available to an employee in a Labour Court case?',
            answer: 'Remedies include reinstatement to the job, payment of back wages for the period of unemployment, compensation for unfair dismissal or discrimination, payment of pending dues and benefits, and in some cases, punitive damages against the employer for violations.'
          },
          {
            question: 'Can a Labour Lawyer represent both an employer and employee in a dispute?',
            answer: 'No, a labour lawyer cannot represent both an employer and employee in the same dispute due to conflict of interest. The lawyer must represent only one party to ensure undivided loyalty and avoid compromising either party\'s interests.'
          },
          {
            question: 'Can a labour lawyer help in obtaining and renewing work permits for foreign employees in India?',
            answer: 'Yes, a labour lawyer can assist with obtaining and renewing employment visas and work permits for foreign employees by preparing necessary documentation, ensuring compliance with immigration laws, liaising with government authorities, and advising on legal requirements for foreign workers.'
          },
          {
            question: 'What are the penalties for non-compliance with labour laws, and how can a labour lawyer help avoid them?',
            answer: 'Penalties include fines, imprisonment, and closure of business. A labour lawyer helps avoid them by conducting compliance audits, advising on legal requirements, implementing proper policies and procedures, training management on labour laws, and ensuring timely filing of returns and maintenance of records.'
          },
          {
            question: 'How can a labour lawyer assist in compliance with labour laws and regulations?',
            answer: 'A labour lawyer assists by conducting regular compliance audits, drafting employment policies and procedures, advising on statutory requirements, ensuring proper maintenance of registers and records, representing in inspections and inquiries, and providing training to management and HR teams.'
          },
          {
            question: 'What are the different types of labour courts in India?',
            answer: 'The different types include Labour Courts (for individual disputes), Industrial Tribunals (for industrial disputes and collective matters), National Industrial Tribunal (for matters of national importance), and Conciliation Officers (for mediation and settlement of disputes before they reach courts).'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Labour Law Services?',
      visible: true,
      order: 11,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional labour law services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Labour Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert labour law services in Delhi. Professional legal advice for employment disputes, industrial relations, workers rights, and labour court representation.'
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
