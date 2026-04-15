require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== FAMILY LAWYER SERVICE ====================
    console.log('--- Updating Family Lawyer Service ---');
    const familyService = await Service.findOne({ slug: 'family-law-disputes' });
    
    if (familyService) {
      familyService.shortDescription = 'Family Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      familyService.description = 'Family Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      familyService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/family-lawyer-hero.jpg';
      
      familyService.contentBlocks = [
        {
          heading: 'Understanding Family Law Disputes',
          content: `Family law disputes are disagreements between family members that arise from various matters. These may include marriage, divorce, child custody, adoption, guardianship, property division, and other related issues. Family law disputes can be emotionally and financially taxing for all parties involved. It is essential to understand the legal process to resolve these disputes effectively.

Divorce can result in a family law dispute when one party seeks custody of children while the other party makes it financially or legally difficult to obtain. Family disputes are significant in India as they involve issues like marriage, divorce, adoption, and inheritance.

Resolving these matters requires expert guidance from experienced family lawyers. Family law disputes in India are governed by the Hindu Marriage Act, 1955 and the Special Marriage Act, 1954. These laws cover multiple aspects of family life, including marriage, divorce, adoption, and inheritance.

Family lawyers provide remedies to settle disputes among family members or spouses and guide clients through the legal process to protect their rights. Marriage and divorce lawyers play a key role in such cases.`
        },
        {
          heading: 'Types of Family Dispute Cases Covered',
          content: `Family law in India is a branch of civil law that deals with family-related matters and domestic relationships. It includes cases involving marriage, divorce, adoption, child custody, maintenance, and alimony. It also covers guardianship, inheritance, and succession matters.

Marriage and Divorce: Marriage is the union of one man and one woman to the exclusion of all others. The Indian marriage law defines marriage as the legal union between two individuals under any form or ceremony in India. It includes heterosexual and same-sex marriages.

Disputes can arise from the division of assets, child custody, guardianship, adoption, maintenance, and other related issues. Family lawyers help clients understand their rights and obligations under the law and navigate the complex legal procedures involved.

Child Custody and Guardianship: Determining custody arrangements, visitation rights, and guardianship of minor children.

Adoption: Legal procedures for adopting children and establishing parental rights.

Maintenance and Alimony: Financial support for spouses and children after separation or divorce.

Property Division: Equitable distribution of marital assets and property.

Domestic Violence: Protection orders and legal remedies for victims of domestic abuse.

Inheritance and Succession: Matters related to wills, estates, and distribution of property after death.`
        },
        {
          heading: 'Charges, Penalties & Punishment in Family Disputes',
          content: `Family law disputes in India can be complex, and the charges, penalties, and punishments vary depending on the type of dispute. Family disputes are generally filed with the local Judicial Magistrate or District Court. In certain cases, disputes may also be filed with the High Court.

Cases involving significant property or complex custody matters may require hearings before a Circuit Court of Sessions (CAS). The court system in India includes judges and magistrates who preside over civil or criminal matters depending on the case.

Appeals can be made from lower courts to higher courts, including district courts and High Courts, depending on jurisdiction. Civil cases can be appealed to the Court of Appeals, while criminal cases may be retried under sufficient grounds.

Penalties in family law cases may include:
- Fines for non-compliance with court orders
- Imprisonment for contempt of court
- Compensation to the aggrieved party
- Restraining orders and protection orders
- Attachment of property for non-payment of maintenance

The severity of penalties depends on the nature of the violation and the specific circumstances of each case. Family court lawyers assist in all appeal processes and ensure proper representation.`
        },
        {
          heading: 'Procedure to File Family Dispute Case',
          content: `Filing a family law dispute case in India requires careful preparation and the assistance of an experienced lawyer. The procedure includes:

Filing a signed petition or complaint: The petition must include details of the petitioner, respondent, and children involved (if any). It should clearly state the nature of the dispute and the relief sought.

Submitting an affidavit: An affidavit stating no criminal involvement and eligibility to file the case must be submitted. This sworn statement verifies the facts presented in the petition.

Providing two witnesses: Two witnesses who are independent and not related to the parties must be provided to support the case.

Attaching supporting documents: Documents like marriage certificates, adoption papers, property records, birth certificates, and any evidence supporting the claim must be attached.

Payment of court fees: Appropriate court fees must be paid at the time of filing.

Service of notice: Once the petition is filed, a notice is served to the respondent informing them of the case.

Court hearings: Both parties appear before the court for hearings, where evidence is presented and arguments are made.

Mediation: In many cases, the court may order mediation to help parties reach an amicable settlement.

Final judgment: After considering all evidence and arguments, the court issues a final judgment.

A custody lawyer or family court lawyer can guide clients in completing the procedure properly and ensuring all legal requirements are met.`
        },
        {
          heading: 'Role of Lawyer in Family Disputes',
          content: `Family lawyers play a critical role in guiding clients through family disputes. Their responsibilities include:

Advising clients on rights and obligations: Family lawyers explain the applicable laws and help clients understand their legal position.

Representing clients in court: Lawyers represent clients in family court proceedings, present evidence, cross-examine witnesses, and make legal arguments.

Negotiating settlements: Lawyers help negotiate fair settlements between parties to avoid lengthy court battles.

Drafting legal documents: Lawyers draft petitions, wills, trusts, agreements, and other legal documents required for family law matters.

Helping clients resolve disputes efficiently: Lawyers work to resolve disputes in a timely manner while protecting their clients' interests.

Ensuring compliance with laws: Lawyers ensure that all proceedings comply with applicable family laws and procedures.

Providing emotional support: Family lawyers understand the emotional nature of family disputes and provide compassionate guidance throughout the process.

Mediation and alternative dispute resolution: Lawyers facilitate mediation and help parties reach mutually acceptable solutions.

A top family lawyer or best family court lawyer can provide comprehensive legal services to protect your rights and achieve favorable outcomes in family law matters.`
        },
        {
          heading: 'How GAG Lawyers Help in Family Disputes',
          content: `GAG Lawyers provide comprehensive assistance in family law disputes, including:

Legal advice on applicable laws and regulations: Our experienced team provides clear guidance on family law matters and helps you understand your rights and options.

Representation in court proceedings: We represent clients in family court hearings, trials, and appeals, ensuring strong advocacy for your interests.

Assistance in negotiation and mediation: We help facilitate negotiations and mediation to reach amicable settlements that benefit all parties.

Guidance on child custody and adoption: We provide expert advice on custody arrangements, visitation rights, and adoption procedures.

Support for divorce and alimony matters: We assist with divorce proceedings, property division, and maintenance claims.

Ensuring agreements are legally enforceable: We draft and review legal documents to ensure they are valid and enforceable.

Our services help families navigate complex disputes while safeguarding rights and achieving fair outcomes. We understand the sensitive nature of family law matters and provide compassionate, professional legal support throughout the process.

Whether you need assistance with divorce, child custody, adoption, property division, or any other family law matter, GAG Lawyers are committed to providing exceptional legal services tailored to your specific needs.`
        }
      ];
      
      familyService.documentChecklist = [
        'Proof of identity and address (Aadhaar, passport, voter ID)',
        'Proof of relationship (marriage certificate, birth certificates)',
        'Proof of residence and financials (bank statements, utility bills)',
        'Evidence related to the dispute (emails, messages, photographs)',
        'Property documents (if property division is involved)',
        'Income proof (salary slips, tax returns)',
        'Medical records (if relevant to the case)',
        'Police reports (in cases of domestic violence)',
        'Any other relevant documentation supporting the claim'
      ];
      
      familyService.popularCases = [
        'Golak Nath vs. State of Punjab (1967) - Fundamental rights in family matters',
        'Mohd. Ahmed Khan vs. Shah Bano Begum (1985) - Alimony rights for divorced Muslim women',
        'Githa Hariharan vs. Reserve Bank of India (1999) - Equal application of Hindu Adoption Act'
      ];
      
      familyService.faqs = [
        {
          question: 'What are family dispute matters?',
          answer: 'Family dispute law, also known as family law, deals with legal issues related to family relationships including divorce, child custody, adoption, property division, and domestic violence.'
        },
        {
          question: 'What types of disputes can be addressed by family law?',
          answer: 'Family law addresses divorce, separation, child custody and support, property division, spousal support, adoption, paternity disputes, domestic violence, and restraining orders.'
        },
        {
          question: 'How long does a family dispute case take to resolve?',
          answer: 'The duration varies depending on the complexity and whether parties can reach an agreement. Some cases resolve in weeks through mediation, while contested cases may take years.'
        },
        {
          question: 'What are some alternatives to going to court?',
          answer: 'Alternative dispute resolution methods include negotiation, mediation, and collaborative law. These can be less costly and time-consuming than court proceedings.'
        },
        {
          question: 'Can grandparents seek visitation rights?',
          answer: 'Yes, grandparents may seek visitation rights if they have an established relationship with the child and it is in the child\'s best interest to maintain that relationship.'
        }
      ];
      
      familyService.seoKeywords = [
        'family lawyer',
        'family law disputes',
        'divorce lawyer',
        'child custody',
        'family court',
        'marriage disputes',
        'adoption lawyer',
        'alimony',
        'property division',
        'domestic violence',
        'guardianship',
        'family mediation',
        'inheritance disputes'
      ];
      
      await familyService.save();
      console.log('✓ Family Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Family Lawyer service not found\n');
    }

    // ==================== HIGH COURT LAWYER SERVICE ====================
    console.log('--- Updating High Court Lawyer Service ---');
    const highCourtService = await Service.findOne({ slug: 'high-court-litigation' });
    
    if (highCourtService) {
      highCourtService.shortDescription = 'High Court Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      highCourtService.description = 'High Court Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      highCourtService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/high-court-lawyer-hero.jpg';
      
      highCourtService.contentBlocks = [
        {
          heading: 'Understanding High Court Representation',
          content: `High Court Lawyers are legal professionals who specialize in representing clients in cases tried in the High Court. The High Court is the highest court in a jurisdiction and the final court of appeal for decisions made in lower courts.

Experienced High Court lawyers possess the qualifications, knowledge, and courtroom skills required to handle complex legal matters efficiently. A High Court lawyer must be proficient in interpreting complex legislation, legal precedents, and procedural rules to advocate effectively for their clients.

They prepare and present evidence, cross-examine witnesses, and ensure that every legal document is accurately filed. Whether you need representation in criminal matters, civil disputes, constitutional challenges, or administrative law cases, having an experienced attorney ensures that your rights are protected throughout the judicial process.

High Court lawyers handle appeals from lower courts, original jurisdiction matters, and writ petitions. They must have extensive knowledge of substantive and procedural law, excellent research skills, and the ability to present compelling arguments before High Court judges.`
        },
        {
          heading: 'Types of Disputes Heard by High Court',
          content: `The High Court hears a wide range of cases, including:

Criminal matters: Serious offences such as murder, terrorism, treason, and appeals against lower court convictions. High Courts also hear bail applications and criminal revisions.

Civil disputes: Large-scale civil matters, commercial disputes, property or land conflicts, and professional negligence claims. High Courts handle appeals from district courts in civil matters.

Constitutional matters: Challenges to the legality of laws, government decisions, and inter-governmental disputes. High Courts have the power to declare laws unconstitutional.

Administrative law: Disputes involving citizens and government bodies, including local councils and tribunal decisions. Writ petitions under Article 226 of the Constitution are filed in High Courts.

Human rights issues: Cases ensuring compliance with constitutional and international human rights standards. High Courts protect fundamental rights of citizens.

Company law matters: Disputes related to companies, shareholders, and corporate governance.

Tax matters: Appeals against tax assessments and disputes with tax authorities.

Service matters: Government employee disputes and service-related issues.

Hiring a High Court lawyer ensures professional representation in these critical disputes and provides access to experienced advocates who understand High Court procedures and practices.`
        },
        {
          heading: 'Role of High Court Lawyer',
          content: `High Court lawyers play a vital role in the legal system, providing guidance and representation to clients in high-stakes cases. The responsibilities of a High Court lawyer include:

Advising clients on legal rights and obligations: Providing expert legal advice on complex matters and explaining the legal position to clients.

Representing clients in court proceedings: Appearing before High Court judges, presenting arguments, and advocating for clients' interests.

Drafting legal documents and petitions: Preparing writ petitions, appeals, bail applications, and other legal documents with precision and legal accuracy.

Negotiating settlements: Facilitating negotiations and settlements in cases where out-of-court resolution is possible and beneficial.

Ensuring compliance with ethical standards: Maintaining the highest standards of professional ethics and integrity.

Legal research and case preparation: Conducting thorough legal research, analyzing precedents, and preparing comprehensive case strategies.

Cross-examination and evidence presentation: Examining and cross-examining witnesses, presenting documentary evidence, and making legal submissions.

With strong communication skills, legal research expertise, and courtroom experience, a High Court lawyer ensures that clients have the best possible representation in complex legal matters.`
        },
        {
          heading: 'Procedure to File a Case in High Court',
          content: `Filing a case in the High Court requires careful planning and knowledge of procedural rules. The steps include:

Determining jurisdiction: Consult a High Court lawyer to identify the correct court based on the location of parties, subject matter, and case type.

Preparing pleadings: Draft the statement of claim and written statement with the guidance of an experienced High Court lawyer.

Drafting petition and affidavit: The petition must outline facts, legal arguments, and relief sought. The affidavit is a sworn declaration verified by a notary.

Filing with the High Court registry: Submit documents with the necessary court fees, which vary by case type and jurisdiction.

Service of notice: After filing, notice is served to the respondent informing them of the case.

Preliminary hearings: The court may conduct preliminary hearings to determine if the case should proceed.

Main hearing: Both parties present evidence, examine witnesses, and make legal arguments.

Judgment: After considering all evidence and arguments, the High Court delivers its judgment.

Appeals: If dissatisfied with the judgment, parties may appeal to the Supreme Court.

For any High Court lawyer, this process is managed efficiently to protect the client's rights and interests while ensuring compliance with all procedural requirements.`
        },
        {
          heading: 'Documents Required to File High Court Case',
          content: `To file a case in the High Court, the following documents are generally required:

Petition detailing the case facts: A comprehensive petition outlining the facts of the case, parties involved, legal grounds, and relief sought.

Affidavits supporting claims: Sworn statements verifying the facts stated in the petition.

Complaint forms and summons: For civil cases, complaint forms and summons must be properly drafted.

Written statements: Responses to the petition filed by the respondent.

Indictments and police reports: For criminal cases, indictments, FIRs, and police investigation reports.

Contracts and agreements: In contractual disputes, copies of relevant contracts and agreements.

Property documents: In property disputes, title deeds, sale deeds, and other property documents.

Lower court orders: If filing an appeal, certified copies of lower court judgments and orders.

Proof of payment of court fees: Receipt showing payment of prescribed court fees.

Vakalatnama: Power of attorney authorizing the lawyer to represent the client.

A top High Court lawyer ensures that all documents are complete, accurate, and submitted properly to avoid delays and ensure smooth proceedings.`
        },
        {
          heading: 'How GAG Lawyers Help in High Court Cases',
          content: `GAG Lawyers are experienced legal professionals specializing in High Court cases. Our services include:

Legal representation in all types of High Court cases: We represent clients in criminal, civil, constitutional, administrative, and commercial matters before High Courts.

Drafting petitions and legal documents: Our team prepares accurate and comprehensive petitions, affidavits, and legal documents that meet all procedural requirements.

Negotiating settlements and mediation: We facilitate negotiations and mediation to help clients reach favorable settlements when appropriate.

Bail applications and urgent matters: We provide immediate legal assistance for bail applications and other urgent matters requiring High Court intervention.

Strategic advice and courtroom advocacy: We develop effective legal strategies and provide strong courtroom advocacy to protect our clients' interests.

Appeals and revisions: We handle appeals from lower courts and revision petitions in High Courts.

Writ petitions: We file and argue writ petitions for protection of fundamental rights and enforcement of legal rights.

Our expertise covers civil, criminal, constitutional, and administrative matters, ensuring clients receive thorough and competent legal support. We are committed to providing exceptional legal services and achieving the best possible outcomes for our clients in High Court proceedings.

Whether you need representation for a complex commercial dispute, criminal appeal, constitutional challenge, or any other High Court matter, GAG Lawyers have the experience and expertise to handle your case effectively.`
        }
      ];
      
      highCourtService.documentChecklist = [
        'Petition detailing case facts and relief sought',
        'Affidavits supporting the claims',
        'Lower court orders (for appeals)',
        'Complaint forms and summons (for civil cases)',
        'Police reports and FIRs (for criminal cases)',
        'Contracts and agreements (for contractual disputes)',
        'Property documents (for property disputes)',
        'Proof of payment of court fees',
        'Vakalatnama (power of attorney for lawyer)'
      ];
      
      highCourtService.popularCases = [
        'Brown v. Board of Education (1954) - Landmark case on racial segregation',
        'Miranda v. Arizona (1966) - Established Miranda rights for criminal suspects',
        'United States v. Nixon (1974) - Presidential executive privilege case'
      ];
      
      highCourtService.faqs = [
        {
          question: 'What is a High Court case in India?',
          answer: 'A High Court case is a legal proceeding heard by a High Court, which is a superior court of record with jurisdiction over a specific geographical area or subject matter.'
        },
        {
          question: 'What types of cases can be heard by High Court?',
          answer: 'High Courts hear civil, criminal, constitutional, administrative, and commercial cases. They also hear appeals from lower courts and writ petitions.'
        },
        {
          question: 'Can I appeal a district court decision to High Court?',
          answer: 'Yes, a party dissatisfied with a district court decision can file an appeal to the High Court within the prescribed time limit.'
        },
        {
          question: 'How long does a High Court case take?',
          answer: 'The duration varies depending on case complexity and court workload. It can take several months to several years for a case to be resolved.'
        },
        {
          question: 'Do I need a lawyer for High Court cases?',
          answer: 'While self-representation is possible, it is highly recommended to hire an experienced High Court lawyer due to the complexity of procedures and legal arguments involved.'
        }
      ];
      
      highCourtService.seoKeywords = [
        'high court lawyer',
        'high court cases',
        'high court advocate',
        'writ petition',
        'high court appeal',
        'constitutional law',
        'high court bail',
        'criminal appeal',
        'civil appeal',
        'administrative law',
        'high court litigation',
        'supreme court lawyer',
        'appellate lawyer'
      ];
      
      await highCourtService.save();
      console.log('✓ High Court Lawyer service updated successfully!\n');
    } else {
      console.log('✗ High Court Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Family and High Court services updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServices();
