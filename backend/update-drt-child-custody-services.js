require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== DRT LAWYER SERVICE ====================
    console.log('--- Updating DRT Lawyer Service ---');
    const drtService = await Service.findOne({ slug: 'debt-recovery-lawyer' });
    
    if (drtService) {
      drtService.shortDescription = 'Debt Recovery Lawyer (DRT Lawyer) - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      drtService.description = 'Debt Recovery Lawyer (DRT Lawyer) - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      drtService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/drt-lawyer-hero.jpg';
      
      drtService.contentBlocks = [
        {
          heading: 'Understanding Debt Money Recovery in India',
          content: `Debt money recovery in India refers to the process of obtaining payment for outstanding debts from individuals or businesses. In India, there are various laws and regulations in place to facilitate the recovery of debt, including the Debt Recovery Tribunal (DRT) Act, the Securitization and Reconstruction of Financial Assets and Enforcement of Security Interest (SARFAESI) Act, and the Recovery of Debts Due to Banks and Financial Institutions (RDDBFI) Act.

The Debt Recovery Tribunal (DRT) is a specialized court that deals with cases related to recovery of debts from banks, financial institutions, and other creditors. The SARFAESI Act allows banks and financial institutions to take possession of and sell secured assets of defaulting borrowers in order to recover their dues.

The RDDBFI Act provides for the recovery of debts due to banks and financial institutions through various means such as attachment and sale of assets, arrest and detention of the debtor, etc. In India, there are also several private debt collection agencies that assist banks, financial institutions, and other creditors in recovering their outstanding debts.`
        },
        {
          heading: 'Legal Process of Debt Recovery',
          content: `The legal process of debt money recovery in India begins with the creditor, such as a bank or financial institution, filing a case with the Debt Recovery Tribunal (DRT) or a civil court. The case is then heard by a judge, who will review the evidence presented by both the creditor and the debtor. If the judge finds that the debt is valid and the debtor is indeed liable to pay the amount, an order is passed in favour of the creditor.

Once the order is passed, the creditor can take various legal actions to recover the debt, such as attachment and sale of assets, arrest and detention of the debtor, etc. The SARFAESI Act also allows banks and financial institutions to take possession of and sell secured assets of defaulting borrowers in order to recover their dues.

In addition to the legal process, there are also various out of court settlements that can be made between the creditor and the debtor. These settlements are typically made through negotiation and mediation and involve the debtor paying off the debt in instalments over a period of time.`
        },
        {
          heading: 'Types of Debt Recovery Schemes Available',
          content: `There are several types of debt recovery schemes available in India to assist individuals and businesses in repaying their outstanding debts:

Debt Consolidation Loan: Under this scheme, the individual or business takes out a single loan to pay off all their outstanding debts. This loan typically has a lower interest rate than the individual debts and can make it easier for the borrower to manage their payments.

Debt Management Plan: A debt management company works with the individual or business to develop a plan to repay their debts over a period of time. The debt management company may also negotiate with the creditors on behalf of the borrower to reduce the interest rate and monthly payments.

Debt Settlement: The debt management company negotiates with the creditors to settle the debt for a lesser amount than the full amount owed. This type of scheme is usually for individuals who have a significant amount of debt and are unable to pay in full.

Government Relief Schemes: The government of India has provided Debt Relief Schemes for Micro, Small and Medium Enterprises (MSMEs) affected due to various economic challenges.`
        },
        {
          heading: 'Legal Remedies Available Under Debt Recovery Law',
          content: `In India, there are several legal remedies available under law for debt recovery cases:

Filing a suit for recovery: A creditor can file a suit for recovery in a court of law against the debtor to recover the outstanding debt under the Civil Procedure Code, 1908.

Issuing a legal notice: A legal notice can be issued to the debtor, demanding payment of the outstanding debt. If the debtor fails to make payment within the notice period, the creditor can proceed to file a suit for recovery.

Attachment of assets: If the debtor has assets that can be attached, the court can order the attachment of those assets to secure the debt under Order 38 of the Civil Procedure Code, 1908.

Garnishee proceedings: If the debtor has funds in a bank account or is due to receive a sum of money from a third party, the court can order the bank or the third party to pay the debt directly to the creditor under Order 21 of the Civil Procedure Code, 1908.

Decree for recovery of possession: If the debt is related to a property, the court can pass a decree for recovery of possession of the property in favour of the creditor under Order 39 of the Civil Procedure Code, 1908.

Insolvency and Bankruptcy Code, 2016: In case of corporate debtors, the remedy of corporate insolvency resolution process can be initiated by the financial creditors.`
        },
        {
          heading: 'Role of Lawyer in Debt Recovery Cases',
          content: `The role of a lawyer in debt recovery cases is crucial in ensuring that the creditor's rights are protected and that the debt is recovered in an efficient and effective manner. A lawyer can assist in several ways:

Advising on the legal options available: A lawyer can provide guidance on the various legal remedies available for debt recovery and recommend the most appropriate course of action based on the specific circumstances of the case.

Drafting and issuing legal notice: A lawyer can draft and issue a legal notice to the debtor on behalf of the creditor, demanding payment of the outstanding debt.

Filing a suit for recovery: If the debtor fails to respond to the legal notice or refuses to pay, a lawyer can file a suit for recovery in the appropriate court.

Representing the creditor in court: A lawyer can represent the creditor in court proceedings, present evidence, cross-examine witnesses, and argue the case before the judge.

Negotiating settlements: A lawyer can negotiate with the debtor or their legal representative to reach an out-of-court settlement that is acceptable to both parties.`
        },
        {
          heading: 'How GAG Lawyers Help in Debt Recovery Cases',
          content: `GAG Lawyers specialize in helping clients with debt recovery cases. Our experienced team provides comprehensive legal representation, guidance, and negotiation support to ensure the best possible outcome for our clients.

We assist in collecting and preparing all necessary documents, filing cases with the Debt Recovery Tribunal, representing clients in court proceedings, and negotiating settlements. Our lawyers have extensive experience in handling complex debt recovery matters and are well-versed in the applicable laws and regulations.

Whether you are a bank, financial institution, or individual creditor seeking to recover outstanding debts, our team is committed to providing exceptional legal services tailored to your specific needs. We work diligently to protect your rights and ensure efficient debt recovery through legal channels.`
        }
      ];
      
      drtService.documentChecklist = [
        'Proof of the debt (loan agreement, promissory note, etc.)',
        'Evidence of default (bank statements, payment records)',
        'Personal identification of the borrower (Aadhaar, PAN card)',
        'Business registration documents (if applicable)',
        'Collateral documents (property papers, security agreements)',
        'Correspondence with the debtor (legal notices, emails)',
        'Court orders or decrees (if any previous litigation)',
        'Financial statements of the debtor',
        'Any other documents that support the claim'
      ];
      
      drtService.popularCases = [
        'State Bank of India vs M/s. Rajkot Nagarik Sahakari Bank Ltd. AIR 2015 SC 203',
        'Union of India vs K.K.G. Textiles Ltd. AIR 2015 SC 1143',
        'Haryana State Industrial & Infrastructure Development Corporation Ltd. vs P.H.D. Chamber of Commerce & Industry AIR 2009 Del 2118'
      ];
      
      drtService.faqs = [
        {
          question: 'What is a debt recovery case in India?',
          answer: 'A debt recovery case in India is a legal proceeding initiated by a creditor to recover money owed to them by a debtor through the Debt Recovery Tribunal or civil courts.'
        },
        {
          question: 'What is the role of a debt recovery lawyer?',
          answer: 'A debt recovery lawyer provides legal advice and representation to creditors seeking to recover unpaid debts from debtors. They help initiate legal proceedings, negotiate with debtors, and enforce court orders.'
        },
        {
          question: 'What is the Debt Recovery Tribunal (DRT)?',
          answer: 'The Debt Recovery Tribunal in India is a specialized court that handles debt recovery cases filed under the Recovery of Debts Due to Banks and Financial Institutions Act, 1993.'
        },
        {
          question: 'What is the difference between secured and unsecured debt?',
          answer: 'A secured debt in India is backed by collateral, while an unsecured debt is not. Secured debts are typically easier to recover through legal proceedings as the creditor can take possession of the collateral.'
        },
        {
          question: 'Can a debt recovery case be settled out of court?',
          answer: 'Yes, a debt recovery case can be settled out of court in India through negotiation or alternative dispute resolution methods, which can save time and legal costs for both parties.'
        }
      ];
      
      drtService.seoKeywords = [
        'debt recovery lawyer',
        'DRT lawyer',
        'debt recovery tribunal',
        'SARFAESI act',
        'debt collection',
        'loan recovery',
        'financial debt recovery',
        'bank debt recovery',
        'debt recovery legal services',
        'debt settlement',
        'creditor rights',
        'debtor liability',
        'debt recovery process'
      ];
      
      await drtService.save();
      console.log('✓ DRT Lawyer service updated successfully!\n');
    } else {
      console.log('✗ DRT Lawyer service not found\n');
    }

    // ==================== CHILD CUSTODY LAWYER SERVICE ====================
    console.log('--- Updating Child Custody Lawyer Service ---');
    const childCustodyService = await Service.findOne({ slug: 'child-custody-lawyer' });
    
    if (childCustodyService) {
      childCustodyService.shortDescription = 'Child Custody Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      childCustodyService.description = 'Child Custody Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      childCustodyService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/child-custody-lawyer-hero.jpg';
      
      childCustodyService.contentBlocks = [
        {
          heading: 'Understanding Child Custody in India',
          content: `Child custody in India is a legal term that refers to the rights and responsibilities of parents or guardians over a minor child. It is an important concept as it establishes the relationship between the parent or guardian and the child and determines who will be responsible for providing for the child's physical, emotional, educational, and financial needs.

The laws governing child custody in India are based on Hindu law, Muslim law, and other personal laws. Child custody is the legal right of a parent or guardian to care for and make decisions about a child's upbringing, including where they live, what school they attend, and other important aspects of their life.

Child custody can be awarded to one or both parents in a divorce or separation case. It is important for parents and guardians to understand their rights and responsibilities when it comes to child custody. The decision of where to place a child should be made jointly by parents, and if separated or divorced parents are unable to agree, they should go through mediation with the assistance of a mediator.`
        },
        {
          heading: 'Types of Child Custody Cases',
          content: `Child custody is a legal term that describes the rights and responsibilities of parents in the care of their children. In India, there are several types of child custody available to parents:

Sole Custody: This type involves only one parent having legal responsibility for the child. The parent has complete control over the care, guidance, and upbringing of the child. There are many advantages to this type of custody, including a strong bond between parent and child. However, sole custody can be difficult to obtain and may lead to strained relationships between parents.

Joint Custody: Legal joint custody means that both parents have equal legal rights to make decisions about the care, custody, and control of their children. This arrangement enables both parents to have equal rights and responsibilities over their children.

Guardianship: Guardianship is granted for the period of time when the parents are not married or are unable to fulfil their responsibilities. In this case, the state or appointed guardian makes decisions for a minor child.

Physical Custody: Physical custody refers to the right of a parent to have the child live with them.

Legal Custody: Legal custody refers to the right of a parent to make important decisions about the child's upbringing, such as education, healthcare, and religion.`
        },
        {
          heading: 'Legal Remedies Available for Child Custody',
          content: `Child custody is an important issue that needs to be addressed in any family law case. In India, there are various arrangements available for child custody, depending on the situation and circumstances of the family.

When parents cannot agree on the terms of child custody, the court will intervene and make a decision that is in the best interest of the child. The court considers several factors, such as the child's age, health, education, emotional and mental well-being, and the financial and social status of the parents before making a decision.

The Indian legal system offers different types of custody arrangements, including joint custody, sole custody, guardianship, and access rights. Each arrangement has its own advantages and disadvantages that should be taken into consideration when deciding what is best for the child's future.

Legal provisions related to child custody in India are governed by the Hindu Minority and Guardianship Act, 1956, the Guardians and Wards Act, 1890, and the Juvenile Justice (Care and Protection of Children) Act, 2015.`
        },
        {
          heading: 'Procedure to File for Child Custody',
          content: `Applying for child custody in India can be a challenging process. It involves understanding the various laws and regulations that govern the process, collecting all the relevant documentation, and navigating the court system.

The process typically involves:

Filing a petition: A parent who wishes to obtain child custody must file a petition in the family court with jurisdiction over the matter.

Providing documentation: Various documents must be provided to prove eligibility, such as proof of identity, residence proof, income proof, marriage certificate, and documents related to the child's welfare.

Court proceedings: The court will typically order mediation to try and resolve the dispute amicably. If mediation is unsuccessful, the court will hear arguments from both parties.

Best interest of the child: The court makes its decision based on what is in the best interest of the child, considering factors such as the child's wishes (if old enough), the ability of each parent to provide care, and the child's relationship with each parent.

Final order: Once the court makes a decision, a custody order is issued that outlines the rights and responsibilities of each parent.`
        },
        {
          heading: 'Role of Lawyers in Child Custody Cases',
          content: `Child custody lawyers play an important role in child custody cases in India. They provide legal advice and representation to parents and other family members who are involved in a dispute over the custody of a child.

A child custody lawyer can help to ensure that the best interests of the child are respected throughout the process while also helping to ensure that all parties involved are treated fairly and with respect. They can help make sure that all applicable laws and regulations are followed while also protecting the rights of both parents and children.

Key roles include:

Advising and representing parents, other family members, and children involved in custody disputes
Providing evidence, including reports and recommendations, in court proceedings
Consulting with family members and preparing parenting plans
Making sure that all applicable laws and regulations are followed
Protecting the rights of both parents and children throughout the process
Ensuring that all parties involved are treated fairly and with respect
Negotiating settlements and visitation arrangements

A child custody lawyer's expertise can be invaluable in ensuring that the child's welfare remains the top priority throughout the legal process.`
        },
        {
          heading: 'How GAG Lawyers Help in Child Custody Cases',
          content: `GAG Lawyers are experienced in helping families in child custody cases. We understand the complexities involved in such cases and provide legal assistance to ensure that the best interests of the child are taken into account.

We provide advice on all aspects of the case, such as determining which parent should have primary custody, developing a parenting plan, and negotiating visitation rights. Furthermore, we can also help with filing motions for temporary orders or filing for modifications to existing orders.

Our expertise extends to matters like adoption and guardianship. We provide comprehensive legal advice on all aspects of the case, including parental rights and responsibilities, visitation rights, and financial arrangements. We also provide representation during court proceedings and can negotiate settlements outside of court if necessary.

With our expertise in family law, we can help you understand your rights and ensure that the best interests of your child are met. Our team is committed to providing exceptional client service and helping families navigate the emotional and legal challenges of child custody disputes.`
        }
      ];
      
      childCustodyService.documentChecklist = [
        'Proof of identity (Aadhaar card, passport, voter ID)',
        'Residence proof (utility bills, rental agreement)',
        'Income proof (salary slips, income tax returns, bank statements)',
        'Marriage certificate',
        'Birth certificate of the child',
        'School records and medical records of the child',
        'Evidence of parenting capability (character certificates, employment records)',
        'Divorce decree or separation agreement (if applicable)',
        'Any evidence of domestic violence or abuse (if applicable)'
      ];
      
      childCustodyService.popularCases = [
        'Saiful Islam v. State of Jharkhand - Supreme Court ruling on desertion and cruelty',
        'Chandrachud J. Hegde v. Aishwarya B. (2014) - Landmark case on parental responsibility',
        'Best interests of the child doctrine - Applied in numerous custody cases across Indian courts'
      ];
      
      childCustodyService.faqs = [
        {
          question: 'What is child custody in India?',
          answer: 'Child custody refers to the legal right and responsibility of a parent to take care of their child\'s physical, emotional, and mental well-being after a divorce or separation.'
        },
        {
          question: 'How is child custody decided in India?',
          answer: 'Child custody is decided based on the best interests of the child. The court considers factors such as the child\'s age, health, education, emotional well-being, and the financial and social status of the parents.'
        },
        {
          question: 'Can a child choose which parent to live with?',
          answer: 'The court takes the child\'s wishes and preferences into consideration, especially if the child is of sufficient age and maturity. However, the final decision is based on the best interests of the child.'
        },
        {
          question: 'Can a father get custody of a child in India?',
          answer: 'Yes, fathers can be granted child custody in India. The court considers the best interests of the child when deciding custody, and gender is not a deciding factor.'
        },
        {
          question: 'What are the rights of a non-custodial parent?',
          answer: 'A non-custodial parent has the right to visit and spend time with the child, make decisions about the child\'s education and healthcare, and access the child\'s medical and academic records.'
        }
      ];
      
      childCustodyService.seoKeywords = [
        'child custody lawyer',
        'child custody cases',
        'family law',
        'divorce and child custody',
        'parental rights',
        'custody dispute',
        'joint custody',
        'sole custody',
        'visitation rights',
        'guardianship',
        'best interest of child',
        'family court',
        'child welfare'
      ];
      
      await childCustodyService.save();
      console.log('✓ Child Custody Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Child Custody Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('DRT and Child Custody services updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServices();
