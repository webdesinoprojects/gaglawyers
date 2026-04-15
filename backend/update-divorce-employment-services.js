require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== DIVORCE LAWYER SERVICE ====================
    console.log('--- Updating Divorce Lawyer Service ---');
    const divorceService = await Service.findOne({ slug: 'divorce-lawyer' });
    
    if (divorceService) {
      divorceService.shortDescription = 'Divorce Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      divorceService.description = 'Divorce Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      divorceService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/divorce-lawyer-hero.jpg';
      
      divorceService.contentBlocks = [
        {
          heading: 'Understanding Divorce in India',
          content: `Divorce is a process in which one person ends their marriage with another. There are many motives for divorce, however the most common is that one person feels that they no longer love the other person. There are quite a few misconceptions about divorce, and people regularly assume that it is a very complex technique. In truth, it is very clean to get divorced in most states.

The legal manner may be hard and time-consuming, mainly if there are children concerned or if there was an argument over assets or property. It is crucial to note that there can be multiple causes for divorce, which makes it difficult to predict what will appear in any given case.

India has a divorce rate of about 30% and is the country with the highest number of divorces in the world. Divorce can be both tough or amicable, depending on someone's purpose for divorce and their spouse's reaction. If the spouses have little children, there is a greater hazard of complications occurring in the future after divorce.

The terms divorce and breakup are often used interchangeably while relating to relationships which have come to an end by death or the separation of one associate from the alternative. Divorce is the legal termination of a wedding or marital union.`
        },
        {
          heading: 'Types of Divorce Under Family Law',
          content: `India's family law encompasses a broad and intricate realm of legal matters. The process of divorce in India is governed by the Code of Criminal Procedure (CrPC). According to this code, divorce can be obtained on grounds such as adultery, cruelty, desertion, or if one spouse is determined to be impotent or incapable of procreation for a period exceeding three years.

Different types of divorce recognized under Indian Family Law include:

Divorce based on reasons other than adultery: When the marriage has broken down irretrievably due to reasons other than infidelity.

Divorce based on reasons other than desertion: When one spouse has not abandoned the other but the marriage cannot continue.

Divorce based on reasons other than cruelty: When there are irreconcilable differences without physical or mental cruelty.

Divorce based on reasons other than impotency or incapacity to procreate: When the marriage cannot continue for reasons unrelated to reproductive capacity.

Adultery as a valid ground for divorce: When one spouse has been unfaithful to the other.

Desertion as a valid ground for divorce: When one spouse has abandoned the other for a continuous period.

Cruelty as a valid ground for divorce: When one spouse has subjected the other to physical or mental cruelty.

Impotency or incapacity to procreate as a valid ground for divorce: When one spouse is unable to consummate the marriage or have children.`
        },
        {
          heading: 'Charges, Penalties & Punishments in Divorce Cases',
          content: `The divorce case in India is ruled through the Code of Criminal Procedure, 1973. The Code provides for the following expenses, penalties, and punishments:

Charges: The husband or spouse may record a grievance of adultery towards the alternative partner. A spouse or husband might also record a grievance of cruelty against the alternative spouse. The aggrieved party may file a complaint of desertion or neglect by the opposite partner.

Penalties: If determined responsible, the perpetrator will be punished with imprisonment for a time period which shall not be less than six months but which may additionally amplify to three years and shall additionally be at risk of a fine. The court may additionally order restitution to be made by such individual in favour of the aggrieved celebration within such time and in such manner as it thinks suit.

Punishments: For creating a false charge under this phase, whoever commits it shall be punished with imprisonment for a time period which shall not be much less than two years but which may additionally make bigger to five years and shall additionally be vulnerable to a fine.

For making a false charge under this segment, whoever commits it will be punished with imprisonment for a term which shall now not be much less than three years but which may also enlarge to seven years, and shall also be prone to a fine.`
        },
        {
          heading: 'Legal Remedies Available for Divorce Under Family Law',
          content: `India has a complex family law system. The laws are based on the Hindu Marriage Act, the Hindu Succession Act, and the Special Marriage Act. The laws governing divorce in India are complex and vary depending on the faith of the couple.

These laws are ruled by two acts: The Hindu Marriage Act and the Special Marriage Act. The Hindu Marriage Act of 1955 is a civil law that governs marriages in the Indian legal system. The Special Marriage Act of 1954 is a specific act designed to permit interfaith, equal-community, and interracial marriages.

If an individual would like to divorce their spouse under non-Hindu or non-specific marriage law, there are options: either seek an annulment or document for a divorce under standard law. An annulment will result in the dissolution of the wedding, while a standard divorce will do the same.

The acts and provisions associated with divorce in India include:
- Indian Divorce Act of 1869
- The Hindu Marriage Act, 1955
- The Special Marriage Act, 1954
- Section 497 of the Indian Penal Code (IPC)
- Sections 13(1)(a) and 13(2)(a) of the Hindu Minority and Guardianship Act, 1956`
        },
        {
          heading: 'Procedure to File Divorce Case',
          content: `In India, divorce cases are a long and complicated process. In order to file for divorce, there are certain steps that need to be followed:

The husband and wife should have been living separately for at least 365 days before filing for divorce.

The husband and spouse ought to have no children from the marriage (or appropriate custody arrangements must be made).

The husband and spouse ought to not be dwelling in the same residence now or in the future.

Both parties need to not be living with their partner.

The husband and wife ought to have signed a written consent before trying to file for divorce.

The divorce case needs to be filed before the court of able jurisdiction wherein the couple lives.

There are certain stipulations that need to be met through each parties before filing for divorce, inclusive of mutual consent, the truth that they cannot record for nullity of marriage, and other stipulations like assembly the economic requirements of submitting for divorce.

The trial process is a way for both parties to pinpoint the grounds of their divorce. It can even help them determine if the divorce is through mutual consent or not.`
        },
        {
          heading: 'How GAG Lawyers Help in Divorce Cases',
          content: `Divorce isn't always a happy time for everybody. There are regularly lots of feelings concerned within the procedure, and it can be tough to know what to do or where to show. Our divorce solicitors offer legal advice and assist with the divorce method in India.

We help families understand their rights and obligations, provide statistics on the legal system, and manual them through the divorce complaints. Divorce in India is governed by the Hindu Marriage Act and the Dissolution of Muslim Marriages Act.

In accordance with the Hindu Marriage Act, divorce may be acquired most effective after a period of three years. The Muslim Marriage Dissolution Law permits for divorce in six months if proof of incompatibility is provided and mutually agreed upon by each parties.

Our experienced team provides comprehensive support including:
- Legal advice on divorce grounds and procedures
- Representation in family court proceedings
- Assistance with property division and alimony matters
- Child custody and visitation arrangements
- Mediation and settlement negotiations
- Documentation and filing of all necessary paperwork

We understand the emotional and financial challenges of divorce and work to protect your rights while seeking the best possible outcome for you and your family.`
        }
      ];
      
      divorceService.documentChecklist = [
        'Marriage certificate',
        'Proof of identity (Aadhaar card, passport, voter ID)',
        'Proof of residence (utility bills, rental agreement)',
        'Income proof (salary slips, income tax returns, bank statements)',
        'Birth certificates of children (if applicable)',
        'Evidence of grounds for divorce (cruelty, adultery, desertion)',
        'Property documents and asset details',
        'Photographs and correspondence as evidence',
        'Written consent for mutual divorce (if applicable)'
      ];
      
      divorceService.popularCases = [
        'Sushil Kumar Sharma v. Union of India (2005) - Annulment of marriage provisions',
        'Sarla Mudgal v. Union of India (1995) - Second marriage and divorce rights',
        'Lata Singh v. State of Uttar Pradesh (2006) - Divorce on grounds of cruelty'
      ];
      
      divorceService.faqs = [
        {
          question: 'What are the grounds for divorce in India?',
          answer: 'Grounds for divorce in India include adultery, cruelty, desertion for at least two years, conversion to another religion, mental disorder, communicable disease, and renunciation of the world. Mutual consent is also a valid ground.'
        },
        {
          question: 'How long does a divorce case take in India?',
          answer: 'The duration of a divorce case depends on the complexity of the case and whether it is contested or mutual consent. Mutual consent divorces can take 6-18 months, while contested divorces may take several years.'
        },
        {
          question: 'What is the difference between contested and uncontested divorce?',
          answer: 'A contested divorce is one where the parties cannot agree on terms and the court must decide. An uncontested or mutual consent divorce is when both parties agree to the divorce and its terms.'
        },
        {
          question: 'How is property divided in a divorce in India?',
          answer: 'Property division varies based on whether it is self-acquired or ancestral property. Generally, marital assets are divided equitably. Separate property acquired before marriage or through inheritance is typically not subject to division.'
        },
        {
          question: 'Can I get a divorce without a lawyer in India?',
          answer: 'While it is possible to file for divorce without a lawyer, it is not recommended due to the complexity of family law. A lawyer can protect your rights, handle documentation, and represent you effectively in court.'
        }
      ];
      
      divorceService.seoKeywords = [
        'divorce lawyer',
        'divorce cases',
        'mutual divorce',
        'contested divorce',
        'family law',
        'marriage dissolution',
        'divorce proceedings',
        'alimony',
        'child custody in divorce',
        'property division',
        'divorce settlement',
        'Hindu Marriage Act',
        'divorce attorney'
      ];
      
      await divorceService.save();
      console.log('✓ Divorce Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Divorce Lawyer service not found\n');
    }

    // ==================== EMPLOYMENT LAWYER SERVICE ====================
    console.log('--- Updating Employment Lawyer Service ---');
    const employmentService = await Service.findOne({ slug: 'employment-lawyer' });
    
    if (employmentService) {
      employmentService.shortDescription = 'Employment Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      employmentService.description = 'Employment Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      employmentService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/employment-lawyer-hero.jpg';
      
      employmentService.contentBlocks = [
        {
          heading: 'Understanding Employment Laws in India',
          content: `Employment laws in India regulate the relationship between employers and employees. These laws cover the rights of workers, their wages, working conditions, and other aspects of employment. These laws are designed to ensure that employers and employees work in a fair and equitable environment. The primary purpose of these laws is to protect the rights of workers and promote economic growth.

The employment laws in India are broadly divided into three categories: labor laws, social security laws, and occupational health and safety laws.

Labor laws in India include the Minimum Wages Act, 1948; the Industrial Disputes Act, 1947; the Factories Act, 1948; the Contract Labour (Regulation and Abolition) Act, 1970; and the Payment of Bonus Act, 1965. These laws regulate the wages, working hours, and other conditions of employment for workers.

Social security laws in India provide protection to workers in the event of sickness, unemployment, or old age. The Employees State Insurance Act, 1948; the Employees Provident Fund Act, 1952; and the Employees' Pension Scheme, 1995 are some of the important social security laws in India.

The occupational health and safety laws in India are designed to protect workers from hazardous working conditions. The Factories Act, 1948; the Mines Act, 1952; and the Building and Other Construction Workers Act, 1996 regulate the working conditions, safety standards, and other aspects of the workplace.`
        },
        {
          heading: 'Acts and Provisions Related to Employment Law',
          content: `The Industrial Disputes Act, 1947: This Act primarily provides for the investigation and settlement of industrial disputes. The Act is applicable to any industry carried on by the state, a railway company, a corporation owned or controlled by the state, a local authority, or any industrial establishment employing ten or more persons.

The Payment of Wages Act, 1936: This Act provides for regulating the payment of wages to certain classes of persons employed in the industry. It applies to those who are employed in any factory, mine, oilfield, or other industrial establishment. The Act provides for the payment of wages in a timely manner and in the prescribed manner.

The Trade Unions Act, 1926: This Act provides for the registration of trade unions and their recognition by employers. It also provides for the regulation of certain matters relating to the functioning of trade unions, including their financial and organizational matters.

The Contract Labour (Regulation and Abolition) Act, 1970: This Act provides for the regulation of contract labor and the abolition of contract labor in certain cases. The Act applies to establishments employing twenty or more contract laborers.

The Minimum Wages Act, 1948: This Act provides for the fixation and enforcement of minimum wages in certain scheduled employments. It applies to all persons employed in scheduled employment and provides for the fixation of minimum wages for such persons.`
        },
        {
          heading: 'Charges, Penalties & Punishment in Employment Laws',
          content: `Employment laws in India provide several rights and obligations that employers and employees need to be aware of and adhere to. These laws are designed to protect the rights of employees while also ensuring that employers are able to operate their businesses in a fair and ethical manner.

The rights and obligations given under employment laws in India include:

The right to a fair wage and equal pay: According to the Minimum Wages Act of 1948, all employers are required to pay their employees a minimum wage. The minimum wage is determined by the government and is based on the cost of living in a particular area.

The right to privacy and safety in the workplace: This includes the right to be free from harassment and discrimination, as well as the right to be protected from any kind of physical or mental harm. Employers must ensure that their workplace has adequate safety measures in place.

The right to collective bargaining: Employees have the right to form unions and negotiate with employers for better wages and working conditions.

The obligation to provide a safe work environment: Employers must provide employees with a safe and healthy work environment and ensure that all safety measures are in place.

If an employer is not adhering to the rights and obligations given under employment laws in India, then an employee can file a case against the employer by filing a complaint with the relevant labor court.`
        },
        {
          heading: 'Documents Required to File Employment Law Case',
          content: `If you are looking to file a case related to employment laws in India, certain documents must be submitted to the court. These documents, if submitted correctly, are essential to a successful case.

The first document that must be submitted is a copy of the employment contract. This document contains the details of the job, the employer's expectations from the employee, and the employee's rights.

The second document that must be submitted is proof of the employee's salary. This document must provide a clear picture of the employee's salary and any bonuses or other benefits that the employee may have received.

The third document that must be submitted is proof of any other benefits that the employee may have received from the employer. This may include health insurance, paid time off, or any other benefits that may have been provided to the employee.

The last document that must be submitted is proof of any other expenses that the employee may have incurred while working for the employer. This may include travel, medical, and other expenses related to the job.

Additionally, any documents related to the dispute must also be submitted. This may include documents such as correspondence between the employee and the employer, performance reviews, termination letters, and any evidence of discrimination or harassment.`
        },
        {
          heading: 'Role of Lawyer in Employment Cases',
          content: `The role of an Employment Lawyer in employment law in India is of utmost importance. Employment lawyers are experts who are well versed in the various laws and regulations related to employment in India. They provide advice and guidance to employers, employees, and other parties involved in labor disputes.

An Employment Lawyer can help employers and employees understand their rights and obligations under the various employment laws in India. They can help employers and employees draft contracts, set up arbitration procedures, and advise employers on their compliance with the labor laws in India.

An Employment Lawyer can also represent employers in court when disputes arise between employers and employees. They can advise employers on their rights and obligations under the various labor laws in India.

An Employment Lawyer can also help employees protect their rights under various labor laws in India. They can provide advice and guidance to employees about their legal rights and obligations.

Employment lawyers are also involved in the process of drafting new labor laws in India. They can provide legal advice and guidance to the government on the various labor laws in India and help draft new labor laws that are in line with international labor standards.`
        },
        {
          heading: 'How GAG Lawyers Help in Employment Cases',
          content: `GAG Lawyers is one of the top legal firms in India providing comprehensive services to help in the case of Employment Laws. The firm offers advice and strategies to employers on a wide range of issues related to employment laws, including compliance with the various labor laws in India.

Our team of experienced legal professionals are well-versed in the complexities of the Indian employment laws and can provide advice to employers on how to best resolve any employment law issues that may arise.

We provide advice and assistance in cases related to payment of wages, bonus and gratuity, overtime, maternity and paternity leave, and other labor law-related matters. We can help employers draft employment contracts and other related documentation, and can advise on the best way to handle any legal disputes that may arise.

We also provide assistance in cases of labor law violations and can help employers or employees with the legal proceedings that may follow. Our services include advice on the implementation of safety and health regulations, the regulations for the registration of trade unions, and the requirements for the registration and maintenance of collective agreements.

We are committed to providing exceptional legal services to protect the rights of both employers and employees and ensure compliance with all applicable employment laws in India.`
        }
      ];
      
      employmentService.documentChecklist = [
        'Employment contract or offer letter',
        'Proof of salary (salary slips, bank statements)',
        'Proof of benefits (health insurance, provident fund statements)',
        'Termination letter or resignation letter (if applicable)',
        'Performance reviews and appraisals',
        'Correspondence with employer (emails, letters)',
        'Evidence of discrimination or harassment (if applicable)',
        'Proof of expenses incurred (travel bills, medical expenses)',
        'Any other relevant documents supporting the claim'
      ];
      
      employmentService.popularCases = [
        'Vishaka v. State of Rajasthan (1997) - Sexual harassment guidelines in workplace',
        'M/s. Bharat Coking Coal Limited v. Kanti Singh - Right to form trade unions',
        'Indian National Trade Union Congress v. Regional Provident Fund Commissioner - Minimum Wages Act application'
      ];
      
      employmentService.faqs = [
        {
          question: 'What is Employment Law in India?',
          answer: 'Employment law in India is a set of rules and regulations that govern the relationship between employers and employees, covering wages, working conditions, benefits, and dispute resolution.'
        },
        {
          question: 'What are the main laws that regulate employment in India?',
          answer: 'The main employment laws include the Industrial Disputes Act 1947, Payment of Wages Act 1936, Minimum Wages Act 1948, Factories Act 1948, and various social security acts like EPF and ESI.'
        },
        {
          question: 'Can employers terminate employees without a valid reason?',
          answer: 'No, employers cannot terminate employees without a valid reason in India. Termination must be in accordance with the terms of the employment contract and the provisions of applicable employment laws.'
        },
        {
          question: 'Can employees form unions in India?',
          answer: 'Yes, employees in India have the right to form and join unions under the Trade Unions Act, 1926. Unions play an important role in representing employees and negotiating collective bargaining agreements.'
        },
        {
          question: 'What should I do if I face discrimination at work?',
          answer: 'If you face discrimination at work, document all incidents, report to HR or management, and consult an employment lawyer. You can file a complaint with the labor court or appropriate authorities.'
        }
      ];
      
      employmentService.seoKeywords = [
        'employment lawyer',
        'labor law',
        'employment disputes',
        'wrongful termination',
        'workplace discrimination',
        'employee rights',
        'employer obligations',
        'industrial disputes',
        'minimum wages',
        'trade unions',
        'employment contract',
        'labor court',
        'workplace harassment'
      ];
      
      await employmentService.save();
      console.log('✓ Employment Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Employment Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Divorce and Employment services updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServices();
