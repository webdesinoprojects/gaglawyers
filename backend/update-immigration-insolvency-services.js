require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== IMMIGRATION LAWYER SERVICE ====================
    console.log('--- Updating Immigration Lawyer Service ---');
    const immigrationService = await Service.findOne({ slug: 'immigration-law' });
    
    if (immigrationService) {
      immigrationService.shortDescription = 'Immigration Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      immigrationService.description = 'Immigration Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      immigrationService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/immigration-lawyer-hero.jpg';
      
      immigrationService.contentBlocks = [
        {
          heading: 'Understanding Immigration Law in India',
          content: `Immigration law is a branch of law that deals with the rights, duties, and obligations of people who are not citizens of a particular country. It covers a wide range of topics, from the rights of immigrants to enter a country and remain in it, to citizenship and naturalisation, to the deportation and removal of immigrants.

Immigration law also regulates the employment of foreign workers and the ability of immigrants to access social services. Immigration law is an important tool for ensuring that immigrants are treated fairly and that they have access to the same rights and opportunities as citizens.

Immigration law is a complex and ever-changing area of law that governs the legal process of individuals entering, living in, and leaving a country. It is the branch of law that deals with the rights, duties, and obligations of immigrants to a country, as well as their ability to gain citizenship or other legal status in that country.

Immigration law also covers issues related to refugees and asylum seekers. Understanding immigration law is essential for anyone who is considering living or working abroad. Immigration law is the body of law that governs the movement of people across international borders.

It deals with issues such as citizenship, visas, refugee status, and other matters related to individuals entering or leaving a country. Immigration law also covers matters related to the rights and responsibilities of immigrants living in a certain country. With the global population on the rise, immigration law plays an important role in regulating migration and protecting people's rights.`
        },
        {
          heading: 'Charges, Penalties & Punishment in Immigration Law',
          content: `Immigration law in India is an important part of the country's legal system. It governs the entry, stay, and exit of foreign nationals into and from India. As such, any violation of these laws can lead to charges and punishments.

There are three primary kinds of immigration laws in India: entry, stay, and exit. These categories regulate the rights of foreign nationals entering and exiting the country for a variety of purposes. The entry category governs the right to enter India and stay within it, while the stay category handles any time that an individual spends within Indian territory.

The following are some charges that can result from violating these categories:

Admission of an Unlawful Immigrant: This charge applies to any individual who enters India without permission. This can also apply to individuals who enter the country for illicit purposes.

Detention of an Unlawful Immigrant: When a person is taken into custody and held within a detention facility, they are subjected to this charge. The person in custody may be released on bail or be ordered deported from the country.

Failing to Depart India on Time: This occurs when an individual is ordered by a court or government authority to leave the country and they do not.

Failing to Pay the Restitution: This occurs when a person who has been ordered to pay restitution for crimes committed against another fails or refuses to do so.

Violation of a term or condition of visa: A violation is conduct that violates the terms or conditions established by the immigration authorities in granting the visa.`
        },
        {
          heading: 'Procedure to File Immigration Law Case',
          content: `Immigration law is complex and often confusing. To ensure that your legal rights are protected, it is important to understand the procedure for filing a case related to immigration law. Filing a case related to immigration law in India can be a daunting task. It is important to understand the procedures and legalities involved before beginning the process.

Filing Documents: Documents to be filed in Indian courts include affidavits, complaints, and testimonies. For a complaint or testimony to be considered by the court, it must contain specific details that acknowledge the allegations made by the plaintiff and should have been signed under oath.

The affidavit is a written declaration of facts that is usually offered as evidence in cases related to immigration law. If an individual wishes to file an affidavit, they must first file a notice with the appropriate court stating their intention to do so and pay a fee if required.

Selecting a lawyer: It is crucial to select an experienced immigration lawyer who understands the complexities of immigration law and can provide proper guidance throughout the process.

Obtaining legal advice: Consulting with a lawyer helps individuals understand their rights, obligations, and the best course of action for their specific situation.

Understanding court proceedings: Immigration cases may involve hearings before immigration tribunals or courts. Understanding the procedures and requirements is essential for a successful outcome.

By following these steps, individuals can ensure that their case is handled properly and efficiently.`
        },
        {
          heading: 'Role of Immigration Lawyer',
          content: `Immigration law is a complex and ever-changing area of law requiring the expertise of an experienced lawyer. Immigration lawyers who specialize in immigration law are well-versed in the rules and regulations that govern immigration, as well as how to navigate the legal system to help their clients achieve their immigration goals.

Immigration lawyers provide invaluable advice to those seeking to enter or remain in a foreign country, helping them understand their rights and responsibilities under the law. Lawyers also provide assistance with visa applications, family reunification cases, deportation hearings, asylum cases, and more.

By understanding the nuances of immigration law and staying up-to-date on relevant changes in policy and procedure, immigration lawyers can ensure their clients have access to justice.

Immigration lawyers also provide assistance with visa applications, family reunification cases, deportation hearings, asylum cases, and more. By understanding the nuances of immigration law and staying up-to-date on changes, these professionals can provide valuable guidance when navigating the complexities of immigration.

Key responsibilities include:
- Advising clients on visa requirements and eligibility
- Preparing and filing immigration applications
- Representing clients in immigration hearings and appeals
- Assisting with citizenship and naturalization applications
- Providing guidance on employment-based immigration
- Helping families with reunification matters
- Defending against deportation proceedings`
        },
        {
          heading: 'Documents Required for Immigration Cases',
          content: `Filing a case related to immigration law in India requires the submission of several documents. These documents are necessary for the court to evaluate the case and make a decision.

The documents required for a case related to immigration law in India include proof of identity, proof of residence, evidence related to the immigration law violation, and any other supporting documents that can be used as evidence.

It is important for individuals filing a case related to immigration law in India to provide all relevant documents in order to ensure that their case is properly evaluated and decided upon.

The documents needed include:

A completed application form
Passport-sized photographs
Proof of identity, such as a birth certificate, driver's licence, or passport
Current address and contact information
Proof of legal status, such as a green card, work visa, or permanent residence card
Financial documents, such as bank statements, pay stubs, and proof of income
Documents related to the immigration issue, such as proof of marriage for a spouse petition, employment contracts, or evidence of criminal charges
Affidavits from witnesses or other supporting documents
Any applicable filing fees

By submitting these documents, applicants can ensure that their case is properly assessed by the court and that they receive a fair judgement.`
        },
        {
          heading: 'How GAG Lawyers Help in Immigration Cases',
          content: `GAG Lawyers is a law firm specialising in immigration law. We provide professional legal advice and representation to individuals and businesses looking to move abroad or resolve immigration issues.

Our experienced attorneys are well-versed in the complexities of immigration law and can help clients navigate the process with confidence. Through our expertise, we provide assistance with visa applications, appeals, deportation orders, family-based immigration cases, naturalisation applications, asylum claims, and more.

With our comprehensive knowledge of immigration laws, we can help ensure that clients are able to make a successful application. Our services cover all aspects of immigration law, including visas, permanent residency, citizenship applications, and more.

We assist with:
- Employment-based visas and work permits
- Family reunification and spouse visas
- Student visas and educational immigration
- Investor and business immigration
- Citizenship and naturalization applications
- Deportation defense and appeals
- Asylum and refugee applications
- Immigration compliance for businesses

With our help, we will ensure that your application process goes smoothly while ensuring your rights are protected at all times. We are committed to providing exceptional legal services and achieving the best possible outcomes for our clients in all immigration matters.`
        }
      ];
      
      immigrationService.documentChecklist = [
        'Completed application form',
        'Passport-sized photographs',
        'Proof of identity (birth certificate, passport, driver\'s licence)',
        'Current address and contact information',
        'Proof of legal status (visa, green card, residence permit)',
        'Financial documents (bank statements, pay stubs, income proof)',
        'Employment contracts or offer letters (if applicable)',
        'Marriage certificate (for spouse petitions)',
        'Affidavits from witnesses or supporting documents'
      ];
      
      immigrationService.popularCases = [
        'M.P. Sharma vs. Satish Chandra (1954) - Rights of non-citizens to move freely',
        'Indra Sawhney v. Union of India (1992) - Constitutional validity of reservation policy',
        'Sherry Khan v. Union of India (2006) - Deportation of illegal migrants'
      ];
      
      immigrationService.faqs = [
        {
          question: 'What is immigration law in India?',
          answer: 'Immigration law in India governs the entry, stay, and exit of foreign nationals. The main laws include the Foreigners Act, the Passports Act, and the Registration of Foreigners Act.'
        },
        {
          question: 'What do immigration lawyers do?',
          answer: 'Immigration lawyers assist individuals and businesses with navigating legal requirements for entering and staying in India, addressing visa issues, citizenship applications, and deportation defense.'
        },
        {
          question: 'What is the process for obtaining a visa to enter India?',
          answer: 'The process depends on the visa type but typically involves submitting an application and supporting documents to the appropriate Indian embassy or consulate.'
        },
        {
          question: 'Can foreign nationals work in India?',
          answer: 'Yes, foreign nationals can work in India if they obtain the appropriate visa and work authorization from Indian immigration authorities.'
        },
        {
          question: 'What are the consequences of overstaying a visa?',
          answer: 'Consequences can include fines, deportation, and being barred from entering India in the future. It is important to comply with visa conditions and departure dates.'
        }
      ];
      
      immigrationService.seoKeywords = [
        'immigration lawyer',
        'visa application',
        'work permit',
        'citizenship',
        'naturalization',
        'deportation defense',
        'asylum',
        'refugee status',
        'family reunification',
        'employment visa',
        'student visa',
        'immigration law',
        'foreign nationals'
      ];
      
      await immigrationService.save();
      console.log('✓ Immigration Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Immigration Lawyer service not found\n');
    }

    // ==================== INSOLVENCY BANKRUPTCY LAWYER SERVICE ====================
    console.log('--- Updating Insolvency Bankruptcy Lawyer Service ---');
    const insolvencyService = await Service.findOne({ slug: 'insolvency-bankruptcy-lawyer' });
    
    if (insolvencyService) {
      insolvencyService.shortDescription = 'Insolvency Bankruptcy Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      insolvencyService.description = 'Insolvency Bankruptcy Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      insolvencyService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/insolvency-bankruptcy-lawyer-hero.jpg';
      
      insolvencyService.contentBlocks = [
        {
          heading: 'Understanding Insolvency and Bankruptcy',
          content: `Insolvency is a legal term that means someone or a business is unable to pay their debts. When a person or enterprise is insolvent, they are not able to meet their financial obligations, and creditors may seek to recover their losses. When this happens, the debtor may file for bankruptcy protection, which allows them to reorganize their finances and pay off their creditors over time.

Bankruptcy is a legal process wherein a debtor can seek protection from their lenders by filing for insolvency. This allows them to reorganize their finances and repay their lenders over a period of time. Bankruptcy is a serious step and should only be taken after careful consideration and a thorough review of all available options.

Debt refers to amounts owed to a creditor and can arise from multiple sources, including loans, credit cards, mortgages, and other forms of credit. When a person or business is unable to pay their debts, relief may be sought through insolvency, bankruptcy, or other debt resolution programs.

A creditor is an individual or business that has lent money or goods to another person or business. Creditors have the right to collect the debts owed to them and pursue legal action if necessary. When a debtor is bankrupt, it is the creditors' responsibility to recover their losses.

Insolvency, bankruptcy, debt, and creditors are closely related terms and can significantly impact a person's or business's financial situation. Understanding the effects of each term and exploring all available options before filing for insolvency ensures proper financial management and the ability to pay off creditors over time.`
        },
        {
          heading: 'Rights and Obligations Under Insolvency Law',
          content: `The rights and obligations under insolvency and bankruptcy for debtors and creditors are a crucial part of the debt resolution process. These rights and duties are defined in the Bankruptcy Code, which governs the process of insolvency and bankruptcy.

Debtors have the right to file for bankruptcy if they are unable to pay their debts. This allows them to discharge certain debts in exchange for some assets. Debtors also have the right to challenge the validity of certain debts, including those incurred fraudulently or without their consent.

Creditors, on the other hand, have the right to collect debts owed to them. This includes filing a claim against the debtor's assets or receiving other forms of reimbursement. Creditors also have the right to be informed of any changes in the debtor's financial situation, such as a change in income or assets.

The responsibilities of debtors and creditors are also outlined in the Bankruptcy Code. Debtors must provide accurate and complete information regarding their financial situation, including assets and liabilities. They must also keep creditors informed of any changes in their financial circumstances.

Creditors must properly evaluate the debtor's assets and liabilities and file claims for repayment of the debt. They must also provide the debtor with a fair and reasonable repayment plan. Furthermore, creditors should adhere to the terms of any repayment plan agreed upon between debtor and creditor.`
        },
        {
          heading: 'Charges, Penalties & Punishment',
          content: `Charges for insolvency and bankruptcy depend on the type and amount of debt being declared insolvent. Costs are usually divided among creditors, with the debtor paying the largest portion. In some cases, creditors may waive charges if the debtor can repay the debt in full.

Penalties may include fines, court costs, or other sanctions. Depending on the severity, these can range from warnings to criminal penalties. The court may also order debtors to complete a debt management program or credit counseling.

Punishment depends on the case's severity. The court may order liquidation of assets to repay debts, including bank accounts, vehicles, property, and other valuable items. Once obligations are met, the debtor may receive a discharge, allowing them to start fresh.

Specific penalties include:

Fraud or misrepresentation: Imprisonment and fines for providing false information during bankruptcy proceedings.

Non-compliance with court orders: Contempt of court charges and additional penalties.

Preferential transfers: Recovery of assets transferred to certain creditors before bankruptcy filing.

Fraudulent conveyances: Reversal of asset transfers made to defraud creditors.

The severity of penalties depends on the nature and extent of the violation. Courts aim to balance the interests of debtors seeking relief with the rights of creditors to recover their dues.`
        },
        {
          heading: 'Procedure to File Insolvency Case',
          content: `Filing a case involving insolvency, bankruptcy, debt, or creditor issues is complex. It is essential to understand the relevant laws and processes before proceeding. Consulting an experienced insolvency lawyer ensures proper filing and compliance with legal requirements.

The first step is identifying the correct legal cause of action, such as a bankruptcy petition, debt relief claim, or creditor rights claim. Once determined, a complaint is drafted and filed with the National Company Law Tribunal (NCLT) or appropriate court.

Essential documents include agreements, contracts, and proof of debts owed. The debtor must be served with a summons, and they are required to respond within a specified timeframe.

The process typically involves:

Filing a petition: The creditor or debtor files a petition with the NCLT or court, stating the grounds for insolvency.

Appointment of resolution professional: An interim resolution professional is appointed to manage the debtor's affairs.

Moratorium period: A moratorium is declared, preventing creditors from taking legal action against the debtor.

Committee of creditors: A committee of creditors is formed to decide on the resolution plan.

Resolution or liquidation: The committee approves a resolution plan to revive the business, or the assets are liquidated to pay creditors.

A hearing may follow, during which the court determines the validity of the debt and repayment options. After the decision, either party may appeal if unsatisfied.`
        },
        {
          heading: 'Role of Lawyer in Insolvency Cases',
          content: `Bankruptcy lawyers are crucial in navigating insolvency, bankruptcy, and debt issues. They assist in verifying financial status, determining bankruptcy eligibility, negotiating settlements, creating repayment plans, and providing legal guidance.

An insolvency lawyer can review all documents, file petitions, represent clients in NCLT proceedings, and ensure compliance with repayment plans. Lawyers also mediate between debtors and creditors when disputes arise, helping both parties reach an agreement.

Key responsibilities include:

Advising on insolvency options: Helping clients understand whether to file for bankruptcy, seek debt restructuring, or pursue other alternatives.

Preparing and filing petitions: Drafting and filing all necessary documents with the NCLT or court.

Representing in proceedings: Appearing before the NCLT, creditors' committee, and courts on behalf of clients.

Negotiating with creditors: Facilitating negotiations to reach favorable settlement terms.

Ensuring compliance: Monitoring compliance with court orders and resolution plans.

Protecting client interests: Safeguarding the rights of debtors or creditors throughout the process.

Appealing decisions: Filing appeals if the client is dissatisfied with the tribunal's decision.

Insolvency lawyers play a vital role in ensuring that the insolvency process is conducted fairly and in accordance with the law.`
        },
        {
          heading: 'How GAG Lawyers Help in Insolvency Cases',
          content: `GAG Lawyers specialize in insolvency, bankruptcy, and debt collection. We provide comprehensive legal services, including filing bankruptcy petitions, negotiating with creditors, and representing clients in NCLT proceedings.

We assist clients with repayment plans, debt settlements, and enforcement of court orders. Our team also provides legal advice to help clients understand their rights and obligations under the Insolvency and Bankruptcy Code.

Our services include:

Corporate insolvency resolution: Assisting companies in financial distress with resolution plans.

Liquidation proceedings: Managing the liquidation of assets to satisfy creditor claims.

Personal insolvency: Helping individuals navigate personal bankruptcy proceedings.

Creditor representation: Representing creditors in recovery proceedings.

Debtor defense: Protecting the rights of debtors and negotiating favorable terms.

NCLT representation: Appearing before the National Company Law Tribunal on behalf of clients.

Appeals: Filing and arguing appeals before the National Company Law Appellate Tribunal (NCLAT) and higher courts.

We help ensure optimal outcomes for debtors and creditors alike, providing expert guidance throughout the insolvency process. Our goal is to protect our clients' interests while facilitating fair and efficient resolution of financial distress.`
        }
      ];
      
      insolvencyService.documentChecklist = [
        'Petition stating debtor\'s name, address, and debt details',
        'Statement of assets and liabilities',
        'Income and expenditure statement',
        'List of creditors with amounts owed',
        'Proof of identity (passport, driver\'s licence)',
        'Evidence of debts (bills, contracts, loan agreements)',
        'Proof of income and expenses (bank statements, tax returns)',
        'Proof of attempts to negotiate with creditors',
        'Financial statements and audit reports (for companies)'
      ];
      
      insolvencyService.popularCases = [
        'Innoventive Industries Ltd. v. ICICI Bank - Landmark case on IBC implementation',
        'Maharashtra Seamless Ltd. vs. Standard Chartered Bank - NCLT liquidation powers',
        'Binani Cement vs. UltraTech Cement - Resolution plan approval'
      ];
      
      insolvencyService.faqs = [
        {
          question: 'What is insolvency in India?',
          answer: 'Insolvency refers to a situation where a person or business is unable to pay their debts as they become due. This can lead to bankruptcy or other debt relief options under the Insolvency and Bankruptcy Code.'
        },
        {
          question: 'What is the role of NCLT in insolvency cases?',
          answer: 'The National Company Law Tribunal (NCLT) is a quasi-judicial body that adjudicates insolvency and bankruptcy cases. It has the power to approve resolution plans, appoint resolution professionals, and oversee liquidation.'
        },
        {
          question: 'What is the difference between liquidation and resolution?',
          answer: 'Liquidation involves selling off company assets to pay creditors. Resolution involves finding a buyer or restructuring debt so the company can continue operating.'
        },
        {
          question: 'Can individuals file for insolvency?',
          answer: 'Yes, individuals can file for insolvency under the Insolvency and Bankruptcy Code if they are unable to repay their debts. The process is similar to corporate insolvency.'
        },
        {
          question: 'What is the time frame for resolving an insolvency case?',
          answer: 'The IBC provides for a time frame of 330 days for resolving an insolvency case, including the resolution process and any litigation that may arise.'
        }
      ];
      
      insolvencyService.seoKeywords = [
        'insolvency lawyer',
        'bankruptcy lawyer',
        'debt recovery',
        'NCLT',
        'corporate insolvency',
        'liquidation',
        'resolution plan',
        'creditor rights',
        'debtor protection',
        'IBC',
        'financial distress',
        'debt restructuring',
        'insolvency proceedings'
      ];
      
      await insolvencyService.save();
      console.log('✓ Insolvency Bankruptcy Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Insolvency Bankruptcy Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Immigration and Insolvency services updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServices();
