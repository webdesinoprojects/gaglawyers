require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'insolvency-bankruptcy-lawyer',
  name: 'Insolvency bankruptcy Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Insolvency Bankruptcy Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for insolvency and bankruptcy matters including corporate insolvency, debt resolution, creditor rights, and NCLT proceedings. Specialized representation under the Insolvency and Bankruptcy Code.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Insolvency and Bankruptcy Law in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Insolvency is a legal term that means someone or a business is unable to pay their debts. When a person or enterprise is insolvent, they are not able to meet their financial obligations, and creditors may seek to recover their losses. When this happens, the debtor may file for bankruptcy protection, which allows them to reorganize their finances and pay off their creditors over time.\n\nBankruptcy is a legal process wherein a debtor can seek protection from their creditors by filing for insolvency. This allows them to reorganize their finances and repay their creditors over a period of time. Bankruptcy is a serious step and should only be taken after careful consideration and a thorough review of all available options.\n\nDebt refers to amounts owed to a creditor and can arise from multiple sources, including loans, credit cards, mortgages, and other forms of credit. When a person or business is unable to pay their debts, relief may be sought through insolvency, bankruptcy, or other debt resolution programs. A creditor is an individual or business that has lent money or goods to another person or business. Creditors have the right to collect the debts owed to them and pursue legal action if necessary.'
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under Insolvency Bankruptcy Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Debtor\'s Right to File for Bankruptcy',
            description: 'Debtors have the right to file for bankruptcy if they are unable to pay their debts. This allows them to discharge certain debts in exchange for some assets.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Challenge Debts',
            description: 'Debtors have the right to challenge the validity of certain debts, including those incurred fraudulently or without their consent.'
          },
          {
            icon: 'CheckCircle',
            title: 'Creditor\'s Right to Collect',
            description: 'Creditors have the right to collect debts owed to them, including filing a claim against the debtor\'s assets or receiving other forms of reimbursement.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Information',
            description: 'Creditors have the right to be informed of any changes in the debtor\'s financial situation, such as a change in income or assets.'
          },
          {
            icon: 'CheckCircle',
            title: 'Debtor\'s Obligation to Provide Information',
            description: 'Debtors must provide accurate and complete information regarding their financial situation, including assets and liabilities, and keep creditors informed of any changes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Creditor\'s Obligation to Evaluate',
            description: 'Creditors must properly evaluate the debtor\'s assets and liabilities, file claims for repayment, and provide the debtor with a fair and reasonable repayment plan.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Insolvency Charges',
            description: 'Charges for insolvency and bankruptcy depend on the type and amount of debt being declared insolvent. Costs are usually divided among creditors, with the debtor paying the largest portion.'
          },
          {
            icon: 'CheckCircle',
            title: 'Penalties',
            description: 'Penalties may include fines, court costs, or other sanctions. Depending on the severity, these can range from warnings to criminal penalties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Debt Management Programs',
            description: 'The court may order debtors to complete a debt management program or credit counseling as part of the resolution process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Asset Liquidation',
            description: 'The court may order liquidation of assets to repay debts, including bank accounts, vehicles, property, and other valuable items.'
          },
          {
            icon: 'CheckCircle',
            title: 'Discharge',
            description: 'Once obligations are met, the debtor may receive a discharge, allowing them to start fresh financially.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File an Insolvency Bankruptcy Case',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        steps: [
          {
            title: 'Identify Legal Cause of Action',
            description: 'Determine the correct legal cause of action, such as a bankruptcy petition, debt relief claim, or creditor rights claim.'
          },
          {
            title: 'Draft and File Complaint',
            description: 'Draft a complaint and file it with the court. Include essential documents such as agreements, contracts, and proof of debts owed.'
          },
          {
            title: 'Serve the Debtor',
            description: 'The debtor must be served with a summons and is required to respond within a specified timeframe.'
          },
          {
            title: 'Court Hearing',
            description: 'A hearing may follow, during which the court determines the validity of the debt and repayment options.'
          },
          {
            title: 'Court Decision',
            description: 'After the decision, either party may appeal if unsatisfied with the outcome.'
          },
          {
            title: 'Implementation',
            description: 'Implement the court\'s decision, including repayment plans or asset liquidation as ordered.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File an Insolvency Case',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Petition',
            description: 'Petition stating the debtor\'s name, address, debt amount, and creditors\' details.'
          },
          {
            icon: 'CheckCircle',
            title: 'Financial Statements',
            description: 'Statement of assets and liabilities, and income and expenditure showing the complete financial picture.'
          },
          {
            icon: 'CheckCircle',
            title: 'List of Creditors',
            description: 'Comprehensive list of creditors with amounts owed to each.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Identity',
            description: 'Valid identification such as passport or driver\'s license.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence of Debts',
            description: 'Bills, contracts, and other documents proving the existence and amount of debts.'
          },
          {
            icon: 'CheckCircle',
            title: 'Income and Expense Proof',
            description: 'Bank statements, tax returns, and other documents showing income and expenses.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Negotiation Attempts',
            description: 'Letters, emails, and payment plans showing attempts to negotiate with creditors.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Insolvency Bankruptcy Lawyers',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Financial Status Verification',
            description: 'Assist in verifying financial status and determining bankruptcy eligibility.'
          },
          {
            icon: 'CheckCircle',
            title: 'Settlement Negotiation',
            description: 'Negotiate settlements with creditors to reach favorable terms for debt resolution.'
          },
          {
            icon: 'CheckCircle',
            title: 'Repayment Plan Creation',
            description: 'Create comprehensive repayment plans that are acceptable to both debtors and creditors.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Guidance',
            description: 'Provide legal guidance throughout the insolvency and bankruptcy process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Document Review and Filing',
            description: 'Review all documents, file petitions, and ensure all paperwork is complete and accurate.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings before NCLT and other tribunals.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compliance Monitoring',
            description: 'Ensure compliance with repayment plans and court orders.'
          },
          {
            icon: 'CheckCircle',
            title: 'Mediation',
            description: 'Mediate between debtors and creditors when disputes arise, helping both parties reach an agreement.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Insolvency Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Legal Services',
            description: 'Specialize in insolvency, bankruptcy, and debt collection, providing comprehensive legal services for all aspects of the process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bankruptcy Petition Filing',
            description: 'Assist with filing bankruptcy petitions and ensuring all legal requirements are met.'
          },
          {
            icon: 'CheckCircle',
            title: 'Creditor Negotiation',
            description: 'Negotiate with creditors on behalf of clients to reach favorable debt resolution terms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in NCLT proceedings, High Court, and Supreme Court matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Repayment Plan Assistance',
            description: 'Help clients develop and implement repayment plans that are sustainable and acceptable to creditors.'
          },
          {
            icon: 'CheckCircle',
            title: 'Debt Settlement',
            description: 'Assist with debt settlements and negotiations to reduce overall debt burden.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Order Enforcement',
            description: 'Ensure enforcement of court orders and compliance with legal requirements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights and Obligations Guidance',
            description: 'Provide legal advice to help clients understand their rights and obligations under the Insolvency and Bankruptcy Code.'
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
            title: 'NCLT Liquidation Power',
            description: 'Supreme Court case establishing that NCLT has the power to order the liquidation of a corporation. This was a major victory for creditors, allowing them to pursue recovery of dues from distressed organizations through the legal process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Maharashtra Seamless Ltd. vs. Standard Chartered Bank',
            description: 'Delhi High Court held that NCLT had the power to order liquidation of a company even if the company had not defaulted on its debt. This gave creditors the power to pursue recovery through the legal process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Binani Cement vs. UltraTech Cement',
            description: 'Supreme Court held that NCLT had the power to order liquidation of a company even if the company had not defaulted on its debt. This was a major victory for lenders in pursuing recovery of dues.'
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
            question: 'What is insolvency in India?',
            answer: 'Insolvency in India refers to a situation where a person or business is unable to pay their debts as they become due. This can lead to bankruptcy or other debt relief options.'
          },
          {
            question: 'What is bankruptcy in India?',
            answer: 'Bankruptcy in India refers to a legal process in which a person or business declares their inability to pay their debts and seeks protection from creditors. It is intended to provide a fresh start to individuals or businesses struggling with debt.'
          },
          {
            question: 'What is a bankruptcy lawyer in India?',
            answer: 'A bankruptcy lawyer in India is a legal professional who specializes in helping individuals and businesses navigate the bankruptcy process. They can provide advice and representation throughout the process.'
          },
          {
            question: 'What is the role of the National Company Law Tribunal (NCLT)?',
            answer: 'The NCLT in India is a quasi-judicial body that adjudicates insolvency and bankruptcy cases. It has the power to approve or reject resolution plans, appoint interim resolution professionals, and oversee the liquidation of assets.'
          },
          {
            question: 'What is a creditor in India?',
            answer: 'A creditor in India is a person or business that is owed money by another person or business. In the context of insolvency or bankruptcy, creditors may seek to collect their debts through legal means.'
          },
          {
            question: 'What is a debt recovery tribunal in India?',
            answer: 'A debt recovery tribunal in India is a specialized court that handles cases related to the recovery of debt. It has the power to enforce security interests and order the sale of assets to recover debt.'
          },
          {
            question: 'What is a corporate debtor in India?',
            answer: 'A corporate debtor in India is a company that owes debts to its creditors. It is the entity that is subject to insolvency and bankruptcy proceedings under the IBC.'
          },
          {
            question: 'What is the difference between liquidation and resolution under the IBC?',
            answer: 'Liquidation under the IBC refers to the process of selling off the assets of a company to pay its creditors. Resolution refers to the process of finding a buyer for the company or restructuring its debt so that it can continue to operate.'
          },
          {
            question: 'What is the role of the Insolvency and Bankruptcy Board of India (IBBI)?',
            answer: 'The IBBI is a regulatory body that oversees the implementation of the IBC. It sets rules and regulations for the resolution process, maintains a database of insolvency professionals, and monitors the functioning of the NCLT.'
          },
          {
            question: 'What is the time frame for resolving an insolvency case under the IBC?',
            answer: 'The IBC provides for a time frame of 330 days for resolving an insolvency case. This includes the time taken for the insolvency resolution process and any litigation that may arise.'
          },
          {
            question: 'Can individuals file for insolvency under the IBC?',
            answer: 'Yes, individuals can file for insolvency under the IBC if they are unable to repay their debts. The process is similar to that for companies, with an insolvency professional appointed to manage the affairs of the individual.'
          },
          {
            question: 'What is the role of insolvency professionals in the resolution process?',
            answer: 'Insolvency professionals are licensed professionals who are responsible for managing the affairs of a company undergoing insolvency proceedings under the IBC. They prepare and submit resolution plans to the Committee of Creditors (CoC).'
          },
          {
            question: 'Can a company that has undergone insolvency proceedings be revived?',
            answer: 'Yes, a company can be revived if a viable resolution plan is approved by the CoC and the NCLT. The resolution plan may involve the sale of the company to a new owner or the restructuring of its debt.'
          },
          {
            question: 'What is the difference between a financial creditor and an operational creditor?',
            answer: 'A financial creditor under the IBC is a person or entity that has lent money to the debtor, while an operational creditor is someone who has supplied goods or services to the debtor. Financial creditors have a greater say in the resolution process.'
          },
          {
            question: 'What happens to the employees of a company undergoing insolvency proceedings?',
            answer: 'The IBC provides for the protection of the interests of employees. They are entitled to receive their unpaid wages and other dues from the resolution plan, and their interests must be taken into account while formulating the plan.'
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
        body: 'Contact our expert insolvency and bankruptcy lawyers today for professional assistance with debt resolution, NCLT proceedings, and creditor rights',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Insolvency Bankruptcy Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Insolvency Bankruptcy Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
