require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'consumer-court-lawyer',
  name: 'Consumer Court Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Consumer Court Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Representation for Consumer Rights',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Consumer Court',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A consumer court lawyer must possess a comprehensive understanding of consumer law and be knowledgeable about the evidence required to prove a consumer court case. They must also be skilled in constructing persuasive consumer court cases for their clients by collecting relevant facts, conducting witness interviews, and researching legal precedents specific to consumer court cases.\n\nA consumer court in India is a legal forum that is established to hear and resolve disputes between consumers and businesses or service providers. These courts were established under the Consumer Protection Act of 1986 and are designed to provide a quick and inexpensive way for consumers to seek redress for grievances.\n\nThey typically hear cases related to issues such as defective goods, poor service, and false or misleading advertising. Consumer courts in India have the authority to award compensation to consumers and can also impose penalties on businesses or service providers that are found to have violated consumer rights.\n\nThe Consumer Protection Act, 1986, provides for the establishment of consumer dispute redressal agencies at the district, state, and national levels to hear consumer complaints. These consumer courts are established by the state governments in India and are intended to provide an efficient and inexpensive way for consumers to resolve disputes.'
      }
    },
    {
      type: 'benefits',
      heading: 'Rights of Consumers Under Consumer Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Safety',
            description: 'Consumers have the right to be protected against goods and services that are hazardous to life and property.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to be Informed',
            description: 'Consumers have the right to be informed about the quality, quantity, potency, purity, standard, and price of goods and services.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Choose',
            description: 'Consumers have the right to choose from a variety of goods and services at competitive prices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to be Heard',
            description: 'Consumers have the right to be heard and to be provided with an opportunity to be heard in any procedure affecting them.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Seek Redressal',
            description: 'Consumers have the right to seek redress against unfair or restrictive trade practices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Consumer Education',
            description: 'Consumers have the right to acquire knowledge and skills to protect their interests.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Major Benefits of Consumer Law',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Protection of Consumer Rights',
            description: 'Consumer law provides a mechanism for consumers to assert their rights and seek redress in the event of any violation. This includes protection against goods and services that are hazardous to life and property, false advertising and deceptive trade practices, and unfair contract terms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Access to Justice',
            description: 'Consumer law provides consumers with access to a fair and efficient legal system for resolving disputes. This includes the ability to file complaints and seek compensation for damages incurred as a result of a violation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Encourages Fair Business Practices',
            description: 'Consumer law promotes fair business practices by holding businesses accountable for their actions and enforcing penalties for violations. This helps to create a level playing field for businesses and protects consumers from being taken advantage of.'
          },
          {
            icon: 'CheckCircle',
            title: 'Improving Product Quality',
            description: 'Consumer law helps to improve product quality by holding manufacturers and sellers accountable for the goods and services they provide. This encourages businesses to produce and sell goods and services of higher quality, which benefits both consumers and businesses.'
          },
          {
            icon: 'CheckCircle',
            title: 'Consumer Education',
            description: 'Consumer law promotes consumer education by providing information and resources to help consumers make informed decisions. This helps to empower consumers and enables them to better protect their own interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Protection of Consumer Privacy',
            description: 'Consumer laws also provide protection against unauthorized collection, use, and sharing of personal information, which helps to safeguard consumer privacy.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 4,
      background: 'dark',
      content: {
        body: 'Consumer courts in India are established to provide a quick and efficient resolution to disputes between consumers and businesses. The charges and penalties for consumer court cases vary depending on the type of case and the severity of the issue.\n\nFor instance, if a consumer files a complaint against a business for a minor issue, such as a defective product, the business may be required to pay a small fine or compensate the consumer for any damages incurred. In cases where the business is found guilty of a more serious violation, such as false advertising or deceptive practices, the court may impose a larger fine or even revoke the business\'s license to operate.\n\nIn cases where a consumer is found guilty of falsely accusing a business of a violation, the consumer may be required to pay a penalty or compensate the business for any damages incurred as a result of the false accusation.\n\nPenalties and punishments in consumer court cases are designed to deter businesses from engaging in fraudulent or illegal practices and to protect the rights of consumers. These penalties and punishments may include fines, revocation of business licenses, and even imprisonment in cases of severe violations. The goal is to ensure that businesses operate in a fair and transparent manner and to provide consumers with a recourse for addressing grievances and seeking compensation for damages.'
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Monetary Compensation',
            description: 'A consumer court can award monetary compensation to a consumer if they have suffered losses or damages as a result of a business\'s or service provider\'s actions. This compensation can include reimbursement for the cost of the product or service as well as any additional costs incurred as a result of the dispute.'
          },
          {
            icon: 'CheckCircle',
            title: 'Replacement or Repair of Goods',
            description: 'A consumer court can order a business or service provider to replace or repair a defective product if it is found to be non-compliant with the terms of the sale or contract.'
          },
          {
            icon: 'CheckCircle',
            title: 'Refund',
            description: 'A consumer court can order a business or service provider to refund a consumer for a product or service if it is found to be defective or not as described.'
          },
          {
            icon: 'CheckCircle',
            title: 'Cease and Desist Order',
            description: 'A consumer court can issue an order requiring a business or service provider to stop an illegal or unfair practice. This can include things like false advertising or the sale of unsafe products.'
          },
          {
            icon: 'CheckCircle',
            title: 'Penalty',
            description: 'A consumer court can impose penalties on a business or service provider if they are found to have violated consumer rights. These penalties can include fines or imprisonment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Injunctions',
            description: 'A consumer court can issue an injunction to prevent a business or service provider from continuing with a particular activity that is deemed harmful or unfair to the consumer.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File Consumer Court Cases',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Gather Evidence and Documents',
            description: 'Before filing a case, it is important to gather all the necessary evidence and documents that will be used to support the consumer\'s claim. This can include proof of purchase, correspondence with the business or service provider, and evidence of the defect or problem.'
          },
          {
            stepNumber: 2,
            title: 'Prepare the Complaint',
            description: 'The consumer should prepare a written complaint that describes the problem, the actions taken to resolve the issue, and the relief sought. The complaint should be clear and concise and provide all the necessary details about the case.'
          },
          {
            stepNumber: 3,
            title: 'File the Complaint',
            description: 'The consumer should file the complaint with the appropriate consumer court. The consumer court will then review the complaint and may ask for additional information or documents. Once the complaint is accepted, the consumer court will issue a notice to the business or service provider, asking them to respond to the complaint.'
          },
          {
            stepNumber: 4,
            title: 'Attend the Hearing',
            description: 'The consumer should attend the hearing, where they will need to present their evidence and arguments. The business or service provider will also be given an opportunity to present their evidence and arguments. The consumer court will then make a decision based on the evidence and arguments presented.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Proof of Purchase',
            description: 'This can include a copy of the bill of sale, receipt, or invoice for the product or service in question. This is important to establish that the consumer has a valid claim against the business or service provider.'
          },
          {
            icon: 'CheckCircle',
            title: 'Correspondence',
            description: 'This can include any emails, letters, or other communications between the consumer and the business or service provider regarding the dispute. This can help to show that the consumer has made a good-faith effort to resolve the issue before filing a case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence of Defect',
            description: 'This can include photographs, videos, or other documentation that shows the defect or problem with the product or service. This can help establish that the consumer has a valid claim.'
          },
          {
            icon: 'CheckCircle',
            title: 'Expert Reports',
            description: 'If the consumer is claiming that the product or service is defective or not as described, they may need to submit expert reports or witness statements from experts who can provide an opinion on the matter.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence of Losses',
            description: 'This can include documentation such as medical bills, repair bills, or any other expenses incurred as a result of the problem with the product or service. This can help establish the amount of compensation that the consumer is seeking.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Notice',
            description: 'If the consumer is filing a complaint under Section 138 of the Negotiable Instruments Act, 1881 (NI Act) for a check bounce case, they should provide a copy of the legal notice served on the drawer of the check within 30 days of the check bouncing.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Lawyer in Consumer Court Cases',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Representation',
            description: 'The role of a consumer court lawyer in consumer court cases is to represent the consumer in legal proceedings and advocate for their rights and interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Advice',
            description: 'A consumer court lawyer can help the consumer understand their rights and obligations under consumer law and advise them on the best course of action to take. This may include negotiating a settlement with the business or representing the consumer in court if a settlement cannot be reached.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence Collection',
            description: 'A consumer court lawyer can also provide guidance on the legal process and the procedures that need to be followed in order to present a case effectively. Help in the collection and presentation of evidence, the drafting of legal documents, and the preparation of witness statements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights Protection',
            description: 'A consumer court lawyer can also help to ensure that the consumer\'s rights are protected throughout the legal process and can advise the consumer on their options if the case is not resolved in their favor. This may include appealing the decision or seeking compensation for damages incurred as a result of the violation.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 9,
      background: 'light',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, is a legal firm that specializes in helping consumers with their disputes and cases in consumer courts. They can provide a variety of services that can help consumers navigate the legal process and achieve a favorable outcome.\n\n1. Legal advice and representation: Grover & Grover, Advocates, and Solicitors can provide legal advice and representation to consumers who are planning to file a case in consumer court. They can help consumers understand their rights and the legal process and provide guidance on the best course of action to take. They can also represent consumers in court and advocate on their behalf, which can increase the chances of a favorable outcome.\n\n2. Document preparation and filing: Grover & Grover, advocates, and solicitors can help consumers prepare the necessary documents and evidence required to file a case in consumer court. They can also assist with the filing process, ensuring that all the required documents are in order and that the complaint is filed within the time limit.\n\n3. Negotiation and mediation: Grover & Grover, advocates, and solicitors can also help consumers negotiate with the business or service provider to resolve disputes outside of court. They can act as mediators, helping to facilitate a resolution that is fair to both parties. This can save time and money and help avoid the need for a court case.\n\n4. Appeal: If the consumer is not satisfied with the decision of the consumer court, Grover & Grover, Advocates, and Solicitors can help them file an appeal in the higher court. They can also provide representation and legal advice during the appeal process.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases of Supreme Court and High Court',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Vodafone India Services v. TRAI',
            description: 'The Supreme Court ruled that the Telecom Regulatory Authority of India (TRAI) did not have the power to impose penalties on mobile service providers for dropped calls. The court held that dropped calls were not a service deficiency and that penalties could not be imposed without a valid complaint from a consumer.'
          },
          {
            icon: 'CheckCircle',
            title: 'Union of India v. Indian Medical Association',
            description: 'The Supreme Court held that private hospitals cannot deny emergency medical treatment to patients on the ground of non-payment of fees. The court held that the right to life, as guaranteed by the Constitution of India, includes the right to access emergency medical treatment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Nestle India Ltd. v. Maggi Consumers',
            description: 'This case was related to Maggi Noodles, which were banned by the FSSAI in 2015. Nestle India was held guilty for not adhering to the labeling and packaging laws and misleading consumers with false information.'
          },
          {
            icon: 'CheckCircle',
            title: 'Union of India v. Union Bank of India',
            description: 'The Supreme Court held that banks cannot charge customers for services that are mandated by law. The court held that customers should not be charged for services such as the issuance of check books, demand drafts, and other similar services.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 11,
      background: 'light',
      content: {
        items: [
          {
            question: 'What is a consumer court in India?',
            answer: 'A consumer court in India is a special court that hears disputes between consumers and sellers or service providers. It is designed to protect the rights of consumers and ensure that they are not taken advantage of by unscrupulous businesses.'
          },
          {
            question: 'What types of cases can be filed in a consumer court?',
            answer: 'A wide range of cases can be filed in a consumer court, including disputes related to faulty products, deficient services, unfair trade practices, and misleading advertisements. Consumers can also file cases seeking compensation for injuries or damages suffered as a result of a defective product or service.'
          },
          {
            question: 'What is the procedure for filing a case in a consumer court?',
            answer: 'To file a case in a consumer court, the consumer must first send a legal notice to the seller or service provider, outlining their grievance and seeking compensation. If the notice is ignored or a satisfactory response is not received, the consumer can file a case in the relevant consumer court.'
          },
          {
            question: 'What is the time frame for resolving a case in a consumer court?',
            answer: 'The time frame for resolving a case in a consumer court varies depending on the complexity of the case and the availability of evidence. However, in general, consumer courts aim to resolve cases within 6-12 months.'
          },
          {
            question: 'What is the role of a consumer court lawyer?',
            answer: 'A consumer court lawyer is a legal professional who specializes in representing clients in consumer court cases. They can help consumers understand their rights, draft legal notices, file cases, and represent them in court proceedings.'
          },
          {
            question: 'What is the appeal process for consumer court cases?',
            answer: 'If a consumer is dissatisfied with the decision of a consumer court, they can appeal the decision to a higher court. Appeals must be filed within a specified time frame and are heard by a higher court with jurisdiction over the case.'
          },
          {
            question: 'What is the Consumer Protection Act, 2019?',
            answer: 'The Consumer Protection Act, 2019 is a law passed by the Indian government to strengthen consumer protection and simplify the consumer dispute resolution process. The law introduces several new provisions, including the establishment of a Central Consumer Protection Authority and the provision of penalties for misleading advertisements.'
          },
          {
            question: 'Can consumers file cases against government agencies in a consumer court?',
            answer: 'Yes, consumers can file cases against government agencies in a consumer court if they feel that their rights as consumers have been violated. However, the procedure for filing cases against government agencies is slightly different from that for filing cases against private sellers or service providers.'
          },
          {
            question: 'Can consumers file cases in consumer courts without a lawyer?',
            answer: 'Yes, consumers can file cases in consumer courts without a lawyer, but it is generally recommended to have legal representation, especially for complex cases. Consumer court lawyers can help consumers understand their rights and obligations, draft legal notices, and prepare and argue their case in court.'
          },
          {
            question: 'What is the fee for filing a case in a consumer court?',
            answer: 'The fee for filing a case in a consumer court varies depending on the value of the dispute. For disputes up to Rs. 1 lakh, the fee is Rs. 200. For disputes between Rs. 1 lakh and Rs. 5 lakhs, the fee is Rs. 400. For disputes between Rs. 5 lakhs and Rs. 10 lakhs, the fee is Rs. 500. For disputes above Rs. 10 lakhs, the fee is Rs. 2,000.'
          },
          {
            question: 'Can consumers file cases in consumer courts online?',
            answer: 'Yes, some consumer courts in India allow consumers to file cases online. The online filing process is designed to make it easier for consumers to file cases without having to visit the court in person. However, the online filing process may not be available in all consumer courts and for all types of cases.'
          },
          {
            question: 'What is the time limit for filing a case in a consumer court?',
            answer: 'Consumers must file their cases in the consumer court within two years from the date of the cause of action. The cause of action is the event that led to the dispute between the consumer and the service provider or seller.'
          },
          {
            question: 'What are the benefits of filing a case in a consumer court?',
            answer: 'Filing a case in a consumer court provides consumers with a fair and accessible forum to resolve disputes. It is an affordable and efficient way to seek justice and compensation for damages caused by faulty goods or services. It also acts as a deterrent for service providers and sellers who engage in unfair trade practices.'
          },
          {
            question: 'What documents are required to file a case in a consumer court?',
            answer: 'To file a case in a consumer court, consumers need to provide relevant documents, such as bills, invoices, warranty cards, and correspondence with the service provider or seller. They also need to provide details about the nature of the dispute and the relief sought.'
          },
          {
            question: 'How can consumers prepare for a consumer court case?',
            answer: 'Consumers can prepare for a consumer court case by gathering all relevant documents and evidence, such as bills, invoices, warranty cards, and correspondence with the service provider or seller. They can also research the relevant laws and regulations and prepare a list of witnesses if necessary. It is recommended to consult with a consumer court lawyer to understand the legal procedures and requirements.'
          },
          {
            question: 'Can consumers get compensation for mental agony and harassment?',
            answer: 'Yes, consumers can get compensation for mental agony and harassment in a consumer court case. The consumer court can award compensation for physical and mental suffering caused by the deficient service or unfair trade practice. However, the compensation amount varies depending on the severity of the mental agony and harassment caused.'
          },
          {
            question: 'Is there a fee for filing a case in a consumer court?',
            answer: 'Yes, there is a fee for filing a case in a consumer court. The fee varies depending on the value of the goods or services involved in the dispute. However, the fee is relatively low compared to other courts, making it accessible to consumers with limited financial resources.'
          },
          {
            question: 'Can consumers file a case if they have already complained to the company?',
            answer: 'Yes, consumers can file a case in a consumer court if they have already complained to the company and the issue remains unresolved. Filing a case in a consumer court can help consumers seek redress and compensation for damages caused by the faulty goods or services.'
          },
          {
            question: 'How long does it take to receive compensation after winning?',
            answer: 'The time taken to receive compensation after winning a consumer court case varies depending on the case and the service provider or seller involved. However, consumer courts generally order the service provider or seller to pay compensation within a specified time, usually within 30 days of the order. If the service provider or seller fails to pay the compensation, consumers can take legal action to enforce the order.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Consumer Court Legal Services?',
      visible: true,
      order: 12,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional consumer court legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Consumer Court Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'A consumer court lawyer must possess a comprehensive understanding of consumer law and be knowledgeable about the evidence required to prove a consumer court case. Expert legal representation for consumer rights.'
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
