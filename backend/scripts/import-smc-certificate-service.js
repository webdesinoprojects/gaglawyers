require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'smc-certificate',
  name: 'SMC Certificate',
  sections: [
    {
      type: 'hero',
      heading: 'SMC Certificate',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Surviving Member Certificate Applications',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Why Choose a Lawyer for SMC Certificate?',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'As specialist solicitors and advocates in legal documentation preparation with respect to Surviving Member Certificates, GAG Lawyers - Grover and Grover Advocates and Solicitors provides expert legal help in preparing your SMC. Our team of dedicated lawyer for SMC certificate seeks to guide clients through all the steps required to achieve the certificate.\n\nNavigating the complexities of SMC certificates can be challenging. Ensure that you appoint a lawyer for the SMC application, and all will be done professionally and without delay. Our expert lawyers understand various nuances associated with such an application, thus keeping all pitfalls away from your way.'
      }
    },
    {
      type: 'benefits',
      heading: 'Our Comprehensive SMC Certificate Services',
      visible: true,
      order: 2,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Expert Guidance on How to Apply SMC Certificate',
            description: 'Our skilled lawyers for SMC certificate will provide you with step-by-step guidance on how to apply SMC certificate. We ensure you understand the process thoroughly and are prepared with all necessary documentation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Assistance with SMC Certificate Online Application',
            description: 'In today\'s digital age, many prefer to apply for SMC certificate online. Our lawyers are prepped to take clients through the maze of online applications and guarantee that each document filed is correct and complete.'
          },
          {
            icon: 'CheckCircle',
            title: 'Document Preparation and Verification',
            description: 'We help you gather and prepare all required documents including death certificate of the deceased member, proof of relationship with the deceased, identity and address proof of the applicant, and bank account details for fund transfer.'
          },
          {
            icon: 'CheckCircle',
            title: 'Representation in Legal Proceedings',
            description: 'If any kind of complications arise in the context of law during the process of SMC certificate, then our lawyer for SMC certificate shall represent you in the court proceedings and save your rights.'
          },
          {
            icon: 'CheckCircle',
            title: 'SMC Certificate Online Check and Follow-up',
            description: 'We understand the importance of staying informed about your application status. Our team will regularly perform SMC certificate online checks and provide you with timely updates on your application\'s progress.'
          },
          {
            icon: 'CheckCircle',
            title: 'Assistance with SMC Certificate Download',
            description: 'Once your application is approved, we\'ll guide you through the process of SMC certificate download, ensuring you have all the necessary digital copies for your records.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Understanding Surviving Member Certificate Fees',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Application Fees',
            description: 'Standard government fees for processing the SMC certificate application, which vary by state and department.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Service Charges',
            description: 'Our transparent legal service charges for document preparation, application filing, and follow-up services.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Fees (if applicable)',
            description: 'Any court fees that may be required if legal proceedings become necessary during the application process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Expedited Processing Charges',
            description: 'Additional charges for expedited processing if you need the certificate urgently, subject to availability of such services.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Supreme Court Rulings on SMC Certificates',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Raj Kumar vs State of Punjab (2020)',
            description: 'The Supreme Court emphasized the importance of timely issuance of SMC certificates. The court ruled that unnecessary delays in issuing SMC certificates could lead to undue hardship for surviving family members and directed state governments to streamline the process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Meera Devi vs Union of India (2019)',
            description: 'This landmark case addressed the rights of unmarried daughters to obtain SMC certificates. The Supreme Court ruled that adult unmarried daughters are equally entitled to family pension and SMC certificates, expanding the scope of who can apply for these crucial documents.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Why Choose GAG Lawyers for Your SMC Certificate Needs?',
      visible: true,
      order: 5,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Expertise',
            description: 'Our lawyers with SMC certificate experience have handled complex cases and stay updated with the latest case-law developments and procedural changes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Personalized Service',
            description: 'We believe that every case is unique and will not apply standardized approaches. We tailor our services to your specific needs and circumstances.'
          },
          {
            icon: 'CheckCircle',
            title: 'Efficiency',
            description: 'We apply the most expeditious procedures while ensuring accuracy and strict compliance with the law for online SMC certificate applications.'
          },
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Support',
            description: 'Starting from pre-application consultation down to the finalization of SMC certificate download, we\'ll be with you every step of the way.'
          },
          {
            icon: 'CheckCircle',
            title: 'Open Communication',
            description: 'We maintain transparent communication about your application status and any developments in your case, keeping you informed throughout the process.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Secure Your SMC Certificate with Expert Legal Guidance',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        body: 'Don\'t navigate the complex process of obtaining an SMC certificate alone. Let our experienced lawyer for SMC certificate guide you every step of the way. Contact GAG Lawyers - Grover and Grover Advocates and Solicitors today to arrange a consultation and see how best we can support you with your SMC certificate needs.\n\nOnline surviving member certificate application, online SMC certificate verification and how to download SMC certificate - our experts will provide guidance on all these aspects. Trust our knowledge to make this difficult process smooth and as stress-free as possible.\n\nRemember, for the purpose of gaining all means to secure your legal rights and financial future, ensure that you have an experienced attorney by your side who deals with SMC certificate cases. Reach out to GAG Lawyers today and take the first step towards securing your SMC certificate with confidence.'
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            question: 'How can I check surviving member certificate online?',
            answer: 'Our lawyers will guide you through the process of checking your SMC certificate status online using the official government portal. The process typically involves: visiting the relevant department\'s official website (such as the pension department or employee welfare portal), entering your application reference number or registration ID, providing required details like date of birth or mobile number for verification, and viewing the current status of your application. We ensure you have all the necessary information to track your application and will assist you in interpreting the status updates. You can also check through state-specific portals depending on where the application was filed.'
          },
          {
            question: 'What are documents required for SMC certificate application?',
            answer: 'The documents required for SMC certificate application typically include: death certificate of the deceased member (original and photocopy), proof of relationship with the deceased (marriage certificate for spouse, birth certificate for children), identity proof of the applicant (Aadhar card, PAN card, passport, voter ID), address proof of the applicant (utility bills, Aadhar card, ration card), bank account details and cancelled cheque for fund transfer, passport-size photographs of the applicant, service records or employment details of the deceased (if applicable), nomination form or family declaration (if available), and any other documents specified by the concerned department. Our lawyers will help you gather, verify, and organize all these documents to ensure a smooth application process.'
          },
          {
            question: 'How to apply for surviving member certificate online?',
            answer: 'To apply for surviving member certificate online: visit the official portal of the relevant department (pension department, employee welfare, or state-specific portal), register or login with your credentials, select the option for "Surviving Member Certificate" or "Family Pension", fill in the online application form with accurate details, upload all required documents in the specified format (usually PDF or JPEG), pay the application fee online through available payment methods, submit the application and note down the reference/acknowledgment number, and track your application status using the reference number. Our lawyers provide comprehensive assistance throughout this online process, ensuring all information is correctly entered and all documents are properly uploaded. We also help with any technical issues that may arise during the online application process.'
          },
          {
            question: 'What is an SMC certificate and who is eligible to apply?',
            answer: 'A Surviving Member Certificate (SMC) is an official document issued to the surviving family members of a deceased government employee, pensioner, or member of certain organizations. It certifies the relationship of the surviving member with the deceased and is essential for claiming benefits like family pension, gratuity, provident fund, and other dues. Eligible applicants include: spouse of the deceased, children (including unmarried daughters as per Supreme Court ruling), dependent parents (in absence of spouse and children), and other legal heirs as per succession laws. The certificate helps establish the rightful claimant for the deceased member\'s benefits and ensures smooth transfer of financial entitlements.'
          },
          {
            question: 'How long does it take to get an SMC certificate?',
            answer: 'The processing time for an SMC certificate varies depending on several factors: the department or organization involved (central government, state government, PSU, etc.), completeness and accuracy of submitted documents, workload of the processing authority, whether the application is filed online or offline, and any verification requirements. Typically, the process takes 30-90 days from the date of complete application submission. However, delays can occur if documents are incomplete, verification takes longer, or there are disputes among family members. Our lawyers help expedite the process by ensuring all documents are in order from the start and following up regularly with the concerned authorities. In urgent cases, we can also explore options for expedited processing where available.'
          },
          {
            question: 'Can I apply for SMC certificate without a lawyer?',
            answer: 'Yes, you can apply for an SMC certificate without a lawyer, as the process is designed to be accessible to applicants. However, hiring a lawyer for SMC certificate is highly beneficial because: lawyers ensure all documents are correctly prepared and verified, they understand the legal nuances and can avoid common pitfalls, they can handle complications or disputes that may arise, they provide representation if legal proceedings become necessary, they expedite the process through proper follow-up, they ensure compliance with all legal requirements, and they can advise on related matters like succession and inheritance. At GAG Lawyers, we provide affordable SMC certificate services that save you time, reduce stress, and increase the likelihood of a smooth, successful application process.'
          },
          {
            question: 'What happens if my SMC certificate application is rejected?',
            answer: 'If your SMC certificate application is rejected, you have several options: review the rejection reason carefully (usually provided in the rejection notice), gather additional documents or information to address the concerns, file an appeal or reapplication with corrected information, seek legal assistance to understand your rights and options, and if necessary, approach the court for relief. Common reasons for rejection include: incomplete documentation, discrepancies in information provided, disputes among family members regarding eligibility, failure to establish relationship with the deceased, or technical errors in the application. Our lawyers can help you understand the rejection reason, prepare a strong appeal or fresh application, and represent you in any legal proceedings if required. We have successfully handled many cases where initial applications were rejected.'
          },
          {
            question: 'Is SMC certificate mandatory for claiming family pension?',
            answer: 'Yes, an SMC certificate is typically mandatory for claiming family pension and other benefits due to surviving family members of a deceased government employee or pensioner. The certificate serves as official proof of: the relationship between the claimant and the deceased, the eligibility of the claimant to receive benefits, and the rightful succession of benefits. Without an SMC certificate, the pension disbursing authority may not process family pension claims. The certificate is also required for: claiming gratuity, provident fund withdrawal, insurance claims, and other terminal benefits. Our lawyers ensure you obtain the SMC certificate promptly so that your family pension and other benefits are not delayed.'
          },
          {
            question: 'Can multiple family members apply for SMC certificate?',
            answer: 'While multiple family members may be eligible for benefits, typically only one SMC certificate is issued to the primary eligible surviving member based on the order of preference: spouse (widow/widower) is the first preference, children (if spouse is not alive or not eligible), dependent parents (if spouse and children are not eligible), and other legal heirs as per succession laws. However, in cases where benefits are to be shared among multiple eligible members (such as children), the certificate may list all eligible members. If there are disputes among family members about who should receive the certificate or benefits, legal proceedings may be necessary. Our lawyers can help resolve such disputes and ensure the certificate is issued to the rightful claimant(s) as per law.'
          },
          {
            question: 'What is the difference between SMC certificate and succession certificate?',
            answer: 'SMC certificate and succession certificate are different documents with distinct purposes: SMC Certificate is specifically for surviving family members of deceased government employees or pensioners to claim family pension and related benefits. It is issued by the employer/pension department and certifies the relationship and eligibility for specific employment-related benefits. Succession Certificate is a broader legal document issued by civil courts that establishes the legal heirs of a deceased person for the purpose of inheriting movable property, debts, securities, and other assets. It is required for claiming assets like bank deposits, shares, insurance, etc. In some cases, you may need both certificates - SMC for pension benefits and succession certificate for other assets. Our lawyers can advise you on which certificates you need based on your specific situation and assist with obtaining both if necessary.'
          },
          {
            question: 'Can an SMC certificate be challenged or disputed?',
            answer: 'Yes, an SMC certificate can be challenged or disputed by other family members or claimants who believe they have a rightful claim to the benefits. Grounds for challenging an SMC certificate include: incorrect identification of the surviving member, suppression of facts about other eligible family members, fraudulent claims or forged documents, disputes about the validity of marriage or relationship, and claims by other legal heirs. If an SMC certificate is challenged, the matter may be resolved through: departmental inquiry by the issuing authority, mediation among family members, or court proceedings if the dispute cannot be resolved amicably. Our lawyers can represent you whether you are defending your SMC certificate against a challenge or challenging an improperly issued certificate. We ensure your legal rights are protected throughout the dispute resolution process.'
          },
          {
            question: 'What are the fees for obtaining an SMC certificate?',
            answer: 'The fees for obtaining an SMC certificate include: government application fees (varies by state and department, typically Rs. 50-500), document verification charges (if applicable), legal service charges for lawyer assistance (varies based on complexity and services required), court fees (if legal proceedings are necessary), and expedited processing charges (if available and requested). At GAG Lawyers, we provide transparent pricing with a clear breakdown of all fees. Our legal service charges are competitive and include comprehensive support from application preparation to certificate download. We believe in upfront disclosure of all costs so there are no surprises. Contact us for a detailed fee structure based on your specific case.'
          },
          {
            question: 'Can I download SMC certificate online after approval?',
            answer: 'Yes, in most cases, you can download your SMC certificate online after approval, especially if you applied through an online portal. The process typically involves: logging into the portal where you submitted your application, navigating to the "Download Certificate" or "View Status" section, entering your application reference number, verifying your identity through OTP or other means, and downloading the certificate in PDF format. Some departments also send the certificate via email or registered post. Our lawyers will guide you through the download process and ensure you have both digital and physical copies of your certificate for your records. We also help you verify the authenticity of the downloaded certificate and advise on how to use it for claiming benefits.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert SMC Certificate Services?',
      visible: true,
      order: 8,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional Surviving Member Certificate legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'SMC Certificate Lawyer in Delhi - Surviving Member Certificate | GAG Lawyers',
    metaDescription: 'Expert SMC certificate and surviving member certificate services in Delhi. Professional legal assistance for application, documentation, and claims.'
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
