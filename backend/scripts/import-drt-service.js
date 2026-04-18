require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'debt-recovery-lawyer-drt-lawyer',
  name: 'Debt Recovery Lawyer (DRT Lawyer)',
  sections: [
    {
      type: 'hero',
      heading: 'Debt Recovery Lawyer (DRT Lawyer) in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for debt recovery cases including DRT proceedings, SARFAESI Act enforcement, and debt collection. Specialized representation for banks, financial institutions, and creditors.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Debt Money Recovery in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Debt money recovery in India refers to the process of obtaining payment for outstanding debts from individuals or businesses. In India, there are various laws and regulations in place to facilitate the recovery of debt, including the Debt Recovery Tribunal (DRT) Act, the Securitization and Reconstruction of Financial Assets and Enforcement of Security Interest (SARFAESI) Act, and the Recovery of Debts Due to Banks and Financial Institutions (RDDBFI) Act.\n\nThe Debt Recovery Tribunal (DRT) is a specialized court that deals with cases related to recovery of debts from banks, financial institutions, and other creditors. The SARFAESI Act, on the other hand, allows banks and financial institutions to take possession of and sell secured assets of defaulting borrowers in order to recover their dues.\n\nThe RDDBFI Act provides for the recovery of debts due to banks and financial institutions through various means such as attachment and sale of assets, arrest and detention of the debtor, etc. In India, there are also several private debt collection agencies that assist banks, financial institutions, and other creditors in recovering their outstanding debts. These agencies typically work on a commission basis, and use various methods such as letters, phone calls, and legal action to recover the debt. However, it is important to note that private debt collection agencies are regulated by the Reserve Bank of India (RBI) and must adhere to certain guidelines set forth by the central bank.'
      }
    },
    {
      type: 'process',
      heading: 'Legal Process of Debt Recovery',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        steps: [
          {
            title: 'Filing the Case',
            description: 'The creditor, such as a bank or financial institution, files a case with the Debt Recovery Tribunal (DRT) or a civil court.'
          },
          {
            title: 'Judicial Review',
            description: 'The case is heard by a judge, who reviews the evidence presented by both the creditor and the debtor.'
          },
          {
            title: 'Order Issuance',
            description: 'If the judge finds that the debt is valid and the debtor is liable to pay, an order is passed in favour of the creditor.'
          },
          {
            title: 'Legal Actions for Recovery',
            description: 'Once the order is passed, the creditor can take various legal actions such as attachment and sale of assets, arrest and detention of the debtor, etc.'
          },
          {
            title: 'SARFAESI Act Enforcement',
            description: 'Banks and financial institutions can take possession of and sell secured assets of defaulting borrowers to recover their dues under the SARFAESI Act.'
          },
          {
            title: 'Out of Court Settlements',
            description: 'Settlements can be made through negotiation and mediation, involving the debtor paying off the debt in instalments over a period of time.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Debt Recovery Schemes',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Debt Consolidation Loan',
            description: 'The individual or business takes out a single loan to pay off all their outstanding debts. This loan typically has a lower interest rate than the individual debts and can make it easier for the borrower to manage their payments.'
          },
          {
            icon: 'CheckCircle',
            title: 'Debt Management Plan',
            description: 'A debt management company works with the individual or business to develop a plan to repay their debts over a period of time. The company may also negotiate with creditors to reduce the interest rate and monthly payments.'
          },
          {
            icon: 'CheckCircle',
            title: 'Debt Settlement',
            description: 'The debt management company negotiates with the creditors to settle the debt for a lesser amount than the full amount owed. This scheme is usually for individuals who have a significant amount of debt and are unable to pay in full.'
          },
          {
            icon: 'CheckCircle',
            title: 'Government Debt Relief Scheme',
            description: 'The government of India has provided a Debt Relief Scheme for Micro, Small and Medium Enterprises (MSMEs) affected due to the COVID-19 pandemic. This scheme allows MSMEs to get relief from pending interest, principal or both on term loan and working capital loan.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available Under Debt Recovery Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Filing a Suit for Recovery',
            description: 'A creditor can file a suit for recovery in a court of law against the debtor to recover the outstanding debt under the Civil Procedure Code, 1908.'
          },
          {
            icon: 'CheckCircle',
            title: 'Issuing a Legal Notice',
            description: 'A legal notice can be issued to the debtor, demanding payment of the outstanding debt. If the debtor fails to make payment within the notice period, the creditor can proceed to file a suit for recovery.'
          },
          {
            icon: 'CheckCircle',
            title: 'Attachment of Assets',
            description: 'If the debtor has assets that can be attached, the court can order the attachment of those assets to secure the debt under Order 38 of the Civil Procedure Code, 1908.'
          },
          {
            icon: 'CheckCircle',
            title: 'Garnishee Proceedings',
            description: 'If the debtor has funds in a bank account or is due to receive a sum of money from a third party, the court can order the bank or the third party to pay the debt directly to the creditor under Order 21 of the Civil Procedure Code, 1908.'
          },
          {
            icon: 'CheckCircle',
            title: 'Decree for Recovery of Possession',
            description: 'If the debt is related to a property, the court can pass a decree for recovery of possession of the property in favour of the creditor under Order 39 of the Civil Procedure Code, 1908.'
          },
          {
            icon: 'CheckCircle',
            title: 'Arrest and Detention',
            description: 'In certain cases, if the debtor fails to pay the debt despite court orders, the court can order the arrest and detention of the debtor under Order 21 of the Civil Procedure Code, 1908.'
          },
          {
            icon: 'CheckCircle',
            title: 'Insolvency and Bankruptcy Code, 2016',
            description: 'In case of corporate debtors, the remedy of corporate insolvency resolution process under the Insolvency and Bankruptcy Code, 2016 can be initiated by the financial creditors.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Lawyer in Debt Recovery Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Advising on Legal Options',
            description: 'Provide comprehensive advice on the legal options available for debt recovery, including DRT proceedings, SARFAESI Act enforcement, and civil suits.'
          },
          {
            icon: 'CheckCircle',
            title: 'Drafting and Issuing Legal Notice',
            description: 'Draft and issue legal notices to debtors demanding payment of outstanding debts and warning of legal consequences.'
          },
          {
            icon: 'CheckCircle',
            title: 'Filing a Suit for Recovery',
            description: 'Prepare and file suits for recovery in appropriate courts, ensuring all legal requirements and documentation are met.'
          },
          {
            icon: 'CheckCircle',
            title: 'Representing the Creditor in Court',
            description: 'Represent creditors in DRT, civil courts, and appellate courts, presenting evidence and arguments to secure favorable judgments.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation and Settlement',
            description: 'Negotiate with debtors for out-of-court settlements and payment plans that are acceptable to the creditor.'
          },
          {
            icon: 'CheckCircle',
            title: 'Enforcement of Court Orders',
            description: 'Assist in enforcement of court orders through attachment of assets, garnishee proceedings, and other legal mechanisms.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Debt Recovery Case',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Proof of the Debt',
            description: 'Loan agreements, promissory notes, invoices, or any other documents that establish the existence and amount of the debt.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence of Default',
            description: 'Documents showing that the debtor has failed to make payments as per the agreed terms, including payment records and default notices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Personal Identification of the Borrower',
            description: 'Identity proof of the debtor such as Aadhaar card, PAN card, passport, or other government-issued identification.'
          },
          {
            icon: 'CheckCircle',
            title: 'Business Registration Documents',
            description: 'For corporate debtors, company registration certificates, MOA, AOA, and other incorporation documents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Collateral Documents',
            description: 'Documents related to any collateral or security provided for the loan, including property documents, vehicle registration, etc.'
          },
          {
            icon: 'CheckCircle',
            title: 'Supporting Documents',
            description: 'Any other documents that support the claim, such as correspondence with the debtor, demand letters, and acknowledgment of debt.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Debt Recovery Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Representation',
            description: 'Provide expert legal representation in Debt Recovery Tribunals, civil courts, High Courts, and Supreme Court for debt recovery matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Strategic Guidance',
            description: 'Offer strategic guidance on the best approach for debt recovery based on the specific circumstances of each case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation Support',
            description: 'Assist in negotiating settlements with debtors to recover outstanding amounts without lengthy litigation.'
          },
          {
            icon: 'CheckCircle',
            title: 'DRT Proceedings',
            description: 'Specialize in handling cases before the Debt Recovery Tribunal, ensuring efficient and effective recovery of debts.'
          },
          {
            icon: 'CheckCircle',
            title: 'SARFAESI Act Enforcement',
            description: 'Assist banks and financial institutions in enforcing their rights under the SARFAESI Act, including taking possession of secured assets.'
          },
          {
            icon: 'CheckCircle',
            title: 'Insolvency Proceedings',
            description: 'Guide creditors through the corporate insolvency resolution process under the Insolvency and Bankruptcy Code, 2016.'
          },
          {
            icon: 'CheckCircle',
            title: 'Document Preparation',
            description: 'Prepare all necessary legal documents, notices, and applications required for debt recovery proceedings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Enforcement of Decrees',
            description: 'Assist in enforcement of court decrees through attachment and sale of assets, garnishee proceedings, and other legal mechanisms.'
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
            title: 'Meena Choudhary vs State of Haryana',
            description: 'AIR 2014 SC 2033 - Supreme Court case related to debt recovery matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'State Bank of India vs M/s. Rajkot Nagarik Sahakari Bank Ltd.',
            description: 'AIR 2015 SC 203 - Supreme Court case involving debt recovery by State Bank of India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Union of India vs K.K.G. Textiles Ltd.',
            description: 'AIR 2015 SC 1143 - Supreme Court case related to debt recovery proceedings.'
          },
          {
            icon: 'CheckCircle',
            title: 'State Bank of India vs M/s. Hari Om Traders',
            description: 'AIR 2015 SC 2208 - Supreme Court case involving debt recovery by State Bank of India.'
          },
          {
            icon: 'CheckCircle',
            title: 'State Bank of India vs Shri Prabhakar',
            description: 'AIR 2015 SC 2451 - Supreme Court case related to debt recovery matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Haryana State Industrial & Infrastructure Development Corporation Ltd. vs P.H.D. Chamber of Commerce & Industry',
            description: 'AIR 2009 Del 2118 - Delhi High Court case related to debt recovery.'
          },
          {
            icon: 'CheckCircle',
            title: 'The State of Punjab & Anr. vs Avtar Singh & Ors.',
            description: 'AIR 2009 Punj & Har 123 - Punjab & Haryana High Court case involving debt recovery.'
          },
          {
            icon: 'CheckCircle',
            title: 'Kiran Bala vs State Bank of India & Ors.',
            description: 'AIR 2010 Del 902 - Delhi High Court case related to debt recovery by State Bank of India.'
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
            question: 'What is a debt recovery case in India?',
            answer: 'A debt recovery case in India is a legal proceeding initiated by a creditor to recover money owed to them by a debtor.'
          },
          {
            question: 'Who can file a debt recovery case in India?',
            answer: 'Any individual or organization that is owed money by another party can file a debt recovery case in India.'
          },
          {
            question: 'What is the role of a debt recovery lawyer in India?',
            answer: 'A debt recovery lawyer in India provides legal advice and representation to creditors seeking to recover unpaid debts from debtors.'
          },
          {
            question: 'How can a debt recovery lawyer help me recover my debt?',
            answer: 'A debt recovery lawyer can help you recover your debt by initiating legal proceedings, negotiating with debtors, and enforcing court orders.'
          },
          {
            question: 'How long does a debt recovery case take in India?',
            answer: 'The length of a debt recovery case in India can vary depending on the complexity of the case and the court\'s caseload.'
          },
          {
            question: 'Can a debt recovery case be filed against a company in India?',
            answer: 'Yes, a debt recovery case can be filed against a company in India if it owes money to a creditor.'
          },
          {
            question: 'What is the debt recovery tribunal in India?',
            answer: 'The debt recovery tribunal in India is a specialized court that handles debt recovery cases filed under the Recovery of Debts Due to Banks and Financial Institutions Act, 1993.'
          },
          {
            question: 'What is the difference between a secured and unsecured debt in India?',
            answer: 'A secured debt in India is backed by collateral, while an unsecured debt is not. Secured debts are typically easier to recover through legal proceedings.'
          },
          {
            question: 'Can a debt recovery case be settled out of court in India?',
            answer: 'Yes, a debt recovery case can be settled out of court in India through negotiation or alternative dispute resolution methods.'
          },
          {
            question: 'What is the maximum amount that can be recovered through a debt recovery case in India?',
            answer: 'There is no maximum limit on the amount that can be recovered through a debt recovery case in India.'
          },
          {
            question: 'What is the role of a debt recovery agent in India?',
            answer: 'A debt recovery agent in India is a third-party agency hired by creditors to recover unpaid debts from debtors. Debt recovery agents must be licensed by the Reserve Bank of India.'
          },
          {
            question: 'What is a notice of demand in a debt recovery case in India?',
            answer: 'A notice of demand in a debt recovery case in India is a legal notice sent by a creditor to a debtor demanding payment of an outstanding debt.'
          },
          {
            question: 'Can interest be charged on unpaid debts in a debt recovery case in India?',
            answer: 'Yes, interest can be charged on unpaid debts in a debt recovery case in India. The rate of interest is typically specified in the loan agreement or contract.'
          },
          {
            question: 'What is a summary suit in a debt recovery case in India?',
            answer: 'A summary suit in a debt recovery case in India is a legal proceeding that allows creditors to recover unpaid debts quickly and efficiently, without the need for a full trial.'
          },
          {
            question: 'What is the role of the Debt Recovery Tribunal (DRT) in debt recovery cases?',
            answer: 'The Debt Recovery Tribunal (DRT) is a specialized court in India that handles debt recovery cases related to secured debts. The DRT can pass orders for recovery of the debt amount and can also attach and sell the property of the borrower.'
          },
          {
            question: 'Can a debt recovery lawyer help with recovery of debts from a bankrupt individual or company?',
            answer: 'Yes, a debt recovery lawyer can help with recovery of debts from a bankrupt individual or company by filing a claim with the bankruptcy court or the insolvency resolution professional.'
          },
          {
            question: 'What are the consequences of non-payment of debts in India?',
            answer: 'The consequences of non-payment of debts in India include legal action by the creditor, damage to credit score, seizure of assets, and in extreme cases, imprisonment.'
          },
          {
            question: 'How can I choose the best debt recovery lawyer in India?',
            answer: 'To choose the best debt recovery lawyer in India, you can consider factors such as their experience, success rate, reputation, fees, and communication skills. You can also check their reviews and testimonials from previous clients.'
          },
          {
            question: 'Can a debt recovery lawyer assist with recovery of unpaid wages or salaries?',
            answer: 'Yes, a debt recovery lawyer can assist with recovery of unpaid wages or salaries by filing a civil suit or approaching the Labour Court, depending on the nature of the dispute.'
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
        body: 'Contact our expert debt recovery lawyers today for professional assistance with DRT proceedings, SARFAESI enforcement, and debt collection matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Debt Recovery Lawyer (DRT Lawyer) in Delhi - GAG Lawyers',
    metaDescription: 'Debt Recovery Lawyer (DRT Lawyer) in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
