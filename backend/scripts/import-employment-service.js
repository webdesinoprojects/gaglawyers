require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'employment-lawyer',
  name: 'Employment Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Employment Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for employment law matters including wrongful termination, workplace discrimination, wage disputes, and labor law compliance. Protecting the rights of both employers and employees.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Employment Laws in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Employment laws in India regulate the relationship between employers and employees. These laws cover the rights of workers, their wages, working conditions, and other aspects of employment. These laws are designed to ensure that employers and employees work in a fair and equitable environment. The primary purpose of these laws is to protect the rights of workers and promote economic growth.\n\nThe employment laws in India are broadly divided into three categories: labor laws, social security laws, and occupational health and safety laws. The labor laws in India include the Minimum Wages Act, 1948; the Industrial Disputes Act, 1947; the Factories Act, 1948; the Contract Labour (Regulation and Abolition) Act, 1970; and the Payment of Bonus Act, 1965. These laws regulate the wages, working hours, and other conditions of employment for workers.\n\nThe social security laws in India provide protection to workers in the event of sickness, unemployment, or old age. The Employees State Insurance Act, 1948; the Employees Provident Fund Act, 1952; and the Employees\' Pension Scheme, 1995 are some of the important social security laws in India. The occupational health and safety laws in India are designed to protect workers from hazardous working conditions. The Factories Act, 1948; the Mines Act, 1952; and the Building and Other Construction Workers Act, 1996 are some of the important occupational health and safety laws in India.'
      }
    },
    {
      type: 'benefits',
      heading: 'Acts and Provisions Related to Employment Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Industrial Disputes Act, 1947',
            description: 'Provides for the investigation and settlement of industrial disputes. Applicable to any industry carried on by the state, railway company, corporation, local authority, or industrial establishment employing ten or more persons. Provides for formation of industrial tribunals and settlement of disputes by conciliation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Payment of Wages Act, 1936',
            description: 'Regulates the payment of wages to certain classes of persons employed in industry. Applies to those employed in any factory, mine, oilfield, or other industrial establishment. Provides for timely payment of wages and protection against unauthorized deductions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Trade Unions Act, 1926',
            description: 'Provides for the registration of trade unions and their recognition by employers. Regulates matters relating to the functioning of trade unions, including their financial and organizational matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Contract Labour (Regulation and Abolition) Act, 1970',
            description: 'Provides for the regulation of contract labor and the abolition of contract labor in certain cases. Applies to establishments employing twenty or more contract laborers. Regulates terms and conditions of service and prohibits employment in certain hazardous occupations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Minimum Wages Act, 1948',
            description: 'Provides for the fixation and enforcement of minimum wages in certain scheduled employments. Applies to all persons employed in scheduled employment and provides for enforcement of minimum wages at prescribed rates.'
          },
          {
            icon: 'CheckCircle',
            title: 'Employees State Insurance Act, 1948',
            description: 'Provides social security protection to workers in the event of sickness, unemployment, or old age. Offers benefits in the form of medical care and health insurance.'
          },
          {
            icon: 'CheckCircle',
            title: 'Employees Provident Fund Act, 1952',
            description: 'Provides for provident fund benefits to employees, ensuring financial security after retirement.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under Employment Laws',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Fair Wage and Equal Pay',
            description: 'According to the Minimum Wages Act of 1948, all employers are required to pay their employees a minimum wage determined by the government based on the cost of living in a particular area.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Privacy and Safety',
            description: 'Includes the right to be free from harassment and discrimination, as well as the right to be protected from any kind of physical or mental harm in the workplace.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Collective Bargaining',
            description: 'Employees have the right to form unions and negotiate with employers for better wages and working conditions, ensuring they have a say in employment decisions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Obligation to Provide Safe Work Environment',
            description: 'Employers must provide a safe and healthy work environment, ensure all safety measures are in place, maintain safety equipment in proper working order, and properly train employees.'
          },
          {
            icon: 'CheckCircle',
            title: 'Protection from Wrongful Termination',
            description: 'Employers cannot terminate employees without following proper procedures as laid down by the Industrial Disputes Act, 1947.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Violation of Minimum Wages Act',
            description: 'Employers who fail to pay minimum wages can face penalties including fines and imprisonment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Wrongful Termination',
            description: 'Employers who terminate employees without following proper procedures can be ordered to reinstate the employee and pay compensation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Workplace Harassment',
            description: 'Employers who fail to address workplace harassment can face legal action and penalties as per the Vishaka guidelines and Sexual Harassment of Women at Workplace Act, 2013.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non-Payment of Wages',
            description: 'Employers who fail to pay wages on time or make unauthorized deductions can face penalties under the Payment of Wages Act, 1936.'
          },
          {
            icon: 'CheckCircle',
            title: 'Safety Violations',
            description: 'Employers who fail to maintain safe working conditions can face penalties under the Factories Act, 1948, and other occupational health and safety laws.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File an Employment Case',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Employment Contract',
            description: 'Copy of the employment contract containing details of the job, employer\'s expectations, employee\'s rights, and terms of agreement.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Salary',
            description: 'Documents providing a clear picture of the employee\'s salary, bonuses, benefits, and any deductions made from the salary.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Benefits',
            description: 'Documents proving the employee\'s entitlement to benefits such as health insurance, paid time off, or any other benefits provided by the employer.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Expenses',
            description: 'Documents showing expenses incurred while working for the employer, including travel, medical, and other job-related expenses.'
          },
          {
            icon: 'CheckCircle',
            title: 'Correspondence',
            description: 'Any correspondence between the employee and employer, including emails, letters, and other communications related to the dispute.'
          },
          {
            icon: 'CheckCircle',
            title: 'Termination Letter',
            description: 'If applicable, the termination letter or notice provided by the employer.'
          },
          {
            icon: 'CheckCircle',
            title: 'Supporting Evidence',
            description: 'Any other documents related to the dispute, such as witness statements, performance reviews, or disciplinary records.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Employment Lawyers',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice and Guidance',
            description: 'Help employers and employees understand their rights and obligations under various employment laws in India. Provide advice on compliance with labor laws.'
          },
          {
            icon: 'CheckCircle',
            title: 'Contract Drafting',
            description: 'Help employers and employees draft employment contracts, set up arbitration procedures, and draft employee policies and procedures in accordance with labor laws.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent employers and employees in labor courts, industrial tribunals, High Courts, and Supreme Court when disputes arise.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'Advise on rights and obligations under labor laws and help resolve disputes through negotiation, mediation, or litigation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Protection of Employee Rights',
            description: 'Help employees protect their rights under various labor laws, provide advice about legal rights and obligations, and represent them in legal proceedings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Policy Development',
            description: 'Provide legal advice to the government on various labor laws and help draft new labor laws in line with international labor standards.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Employment Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Legal Services',
            description: 'Provide advice and strategies to employers on a wide range of issues related to employment laws, including compliance with various labor laws in India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Employment Contract Drafting',
            description: 'Help employers draft employment contracts and other related documentation, and advise on the best way to handle any legal disputes that may arise.'
          },
          {
            icon: 'CheckCircle',
            title: 'Wage and Benefits Matters',
            description: 'Provide advice and assistance on payment of wages, bonus and gratuity, overtime, maternity and paternity leave, and other labor law-related matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Hiring and Dismissal Procedures',
            description: 'Advise on proper procedures to follow when hiring and dismissing employees, ensuring compliance with legal requirements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Labor Dispute Resolution',
            description: 'Assist employers in case of labor disputes such as wrongful dismissal or non-payment of wages, and help with legal proceedings that may follow.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compliance and Violation Rectification',
            description: 'Provide advice on how to rectify labor law violations and assist with appeals or reviews of decisions made in labor law cases.'
          },
          {
            icon: 'CheckCircle',
            title: 'Safety and Health Regulations',
            description: 'Advise on implementation of safety and health regulations, registration of trade unions, and requirements for registration and maintenance of collective agreements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Trade Union Matters',
            description: 'Provide advice on the rights of employees to participate in trade union activities and engage in collective bargaining.'
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
            title: 'Vishaka Case',
            description: 'Leading Supreme Court case that laid down legal requirements for sexual harassment in the workplace in response to the gang rape of Bhanwari Devi in Rajasthan. Established the right of Indian women to a safe and secure workplace and laid down guidelines for employers on addressing sexual harassment.'
          },
          {
            icon: 'CheckCircle',
            title: 'M/s. Bharat Coking Coal Limited v. Kanti Singh',
            description: 'Supreme Court held that the right to form trade unions is a fundamental right of workers under the Indian Constitution. The court also laid down the procedure for formation and registration of trade unions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Indian National Trade Union Congress v. Regional Provident Fund Commissioner',
            description: 'Supreme Court held that the Minimum Wages Act, 1948, applies to all workers who are employed in any scheduled industry in the country.'
          },
          {
            icon: 'CheckCircle',
            title: 'Manoj Kumar v. Bank of India',
            description: 'Delhi High Court held that employees are entitled to receive gratuity in accordance with the provisions of the Payment of Gratuity Act, 1972. The court also held that an employer cannot terminate an employee without following the procedure laid down by the Industrial Disputes Act, 1947.'
          },
          {
            icon: 'CheckCircle',
            title: 'Vijaya Kumar v. Karnataka Electricity Board',
            description: 'Karnataka High Court held that the provisions of the Industrial Employment (Standing Orders) Act, 1946, apply to all industrial establishments in the state. The court also held that the employer must comply with the provisions of the Act while making any changes to the terms and conditions of employment.'
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
            question: 'What is Employment Law in India?',
            answer: 'Employment law in India is a set of rules and regulations that govern the relationship between employers and employees.'
          },
          {
            question: 'What are the main laws that regulate employment in India?',
            answer: 'The main laws include the Industrial Disputes Act, 1947; Payment of Wages Act, 1936; Trade Unions Act, 1926; Contract Labour Act, 1970; Minimum Wages Act, 1948; Employees State Insurance Act, 1948; and Employees Provident Fund Act, 1952.'
          },
          {
            question: 'What is the role of an Employment Lawyer in India?',
            answer: 'An employment lawyer in India helps employees and employers understand and comply with employment laws, resolve workplace disputes, and protect their legal rights.'
          },
          {
            question: 'What are the key responsibilities of an Employment Lawyer?',
            answer: 'Key responsibilities include advising clients on employment law matters, representing clients in court, drafting legal documents, and negotiating settlements.'
          },
          {
            question: 'Can an Employment Lawyer represent both employees and employers in India?',
            answer: 'Yes, an employment lawyer can represent both employees and employers. However, there may be conflicts of interest, and the lawyer must ensure they maintain client confidentiality.'
          },
          {
            question: 'What is the process of filing an Employment Law claim in India?',
            answer: 'The process involves filing a written complaint with the appropriate authorities, such as the labour court, the industrial tribunal, or the central government.'
          },
          {
            question: 'What types of disputes can arise in the workplace in India?',
            answer: 'Disputes can include issues related to wages, benefits, discrimination, harassment, wrongful termination, and breach of contract.'
          },
          {
            question: 'What is the difference between a fixed-term contract and a permanent contract in India?',
            answer: 'A fixed-term contract expires after a specified period of time, whereas a permanent contract is an open-ended contract that continues until it is terminated by either the employer or the employee.'
          },
          {
            question: 'Can employers terminate employees without a valid reason in India?',
            answer: 'No, employers cannot terminate employees without a valid reason in India. Termination must be in accordance with the terms of the employment contract and the provisions of the applicable employment laws.'
          },
          {
            question: 'What is the procedure for terminating an employee in India?',
            answer: 'The procedure involves providing notice of termination, paying all outstanding wages and benefits, and obtaining the necessary approvals from the appropriate authorities.'
          },
          {
            question: 'What is the role of the Labour Court in India?',
            answer: 'The Labour Court in India is responsible for adjudicating disputes related to employment, such as wrongful termination, discrimination, and wage disputes.'
          },
          {
            question: 'Can employees form unions in India?',
            answer: 'Yes, employees in India have the right to form and join unions. Unions play an important role in representing employees and negotiating collective bargaining agreements.'
          },
          {
            question: 'What is the role of the National Human Rights Commission in employment-related matters?',
            answer: 'The National Human Rights Commission in India is responsible for protecting the human rights of all citizens, including those related to employment. The commission can investigate complaints related to human rights violations in the workplace.'
          },
          {
            question: 'What are the penalties for non-compliance with employment laws in India?',
            answer: 'Penalties for non-compliance can include fines, imprisonment, and legal action against the employer.'
          },
          {
            question: 'How can individuals and businesses find a reputable employment lawyer in India?',
            answer: 'Individuals and businesses can find a reputable employment lawyer by researching online, seeking referrals from trusted sources, and consulting with professional organizations such as the Bar Council of India.'
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
        body: 'Contact our expert employment lawyers today for professional assistance with workplace disputes, labor law compliance, and employment matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Employment Lawyer in Delhi – GAG Lawyers',
    metaDescription: 'Employment Lawyer in Delhi – GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
