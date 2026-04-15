require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== LANDLORD TENANT LAWYER SERVICE ====================
    console.log('--- Updating Landlord Tenant Lawyer Service ---');
    const landlordService = await Service.findOne({ slug: 'landlord-tenant-lawyer' });
    
    if (landlordService) {
      landlordService.shortDescription = 'Landlord Tenant Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      landlordService.description = 'Landlord Tenant Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      landlordService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/landlord-tenant-lawyer-hero.jpg';
      
      landlordService.contentBlocks = [
        {
          heading: 'Understanding Landlord-Tenant Law',
          content: `Landlord-tenant law is a specialized set of laws that govern the relationship between landlords and tenants. It covers topics such as how to properly draft a lease agreement, how to collect rent, and how to handle evictions.

This area of law protects landlords from unfair tenant practices and tenants from unfair landlord practices. A landlord is a person or entity that owns property used for leasing to tenants. In most jurisdictions, a tenant is either an individual owner of property or an entity that leases property from the landlord.

Tenants commonly rent out residential and commercial spaces, but other types of landlords may exist as well, such as hotels, mining companies, and farms. Landlord-tenant law usually covers the following topics: the relationship between the parties, occupying obligations, rent, security deposit refunds, repairs, and day-to-day interaction with the landlord.

It is a term used to refer to people who own property, which they rent out, or to other entities with privileges over the property. A landlord is an individual or entity that owns residential rental properties and leases them out on a long-term basis.

Landlords typically provide these housing units in return for occupancy rents and security deposits from tenants. Understanding landlord-tenant law is crucial for both parties to protect their rights and fulfill their obligations.`
        },
        {
          heading: 'Charges, Penalties & Punishment Under Landlord-Tenant Law',
          content: `In India, landlord-tenant law cases can be complex. Landlords and tenants should be aware of different charges, penalties, and punishments imposed when disputes arise.

A landlord can face charges depending on the specifics of the dispute. For example, if a tenant is not paying rent, the landlord could be charged for eviction proceedings and damages. If a dispute arises between two landlords over rental contracts, both parties could be charged.

Unauthorized demands from a landlord or their agent for repairs may result in fines for expenses incurred by the tenant. Penalties and punishments in landlord-tenant law vary. If a tenant has a valid lease agreement, the landlord may not evict them without court permission.

Eviction without court approval can lead to substantial fines. The charges, penalties, and punishments depend on the nature of the dispute and applicable state laws. The landlord may file civil suits or criminal complaints against tenants violating rental agreements.

Civil suits may include claims for damages or rent arrears, while criminal complaints may involve trespass, intimidation, or wrongful confinement. Punishments may include imprisonment, fines, or both. The landlord may also seek compensation for property damage caused by the tenant.`
        },
        {
          heading: 'Legal Remedies Available Under Landlord-Tenant Law',
          content: `In India, both landlords and tenants have legal remedies to resolve disputes. These laws protect both parties from exploitation or abuse. Being aware of these remedies can save time, money, and energy.

Key remedies include:

Lease Agreement: A lease agreement legally binds the landlord (lessor) and tenant (lessee), outlining rent, duration, security deposits, maintenance responsibilities, and restrictions. A well-drafted lease agreement helps avoid disputes.

Written Lease Agreement: Clear clauses on rent, duration, security deposits, maintenance, and property use help avoid disputes. Having a written agreement protects both parties.

Rent Control Laws: Regulate rental amounts and ensure fair returns for landlords while protecting tenants. These laws vary by state and help maintain balance in the rental market.

Eviction: Landlords may evict tenants violating the lease or failing to pay rent, but must follow proper legal procedures. Illegal eviction can result in penalties.

Deposit Refund: Tenants can claim refundable deposits if the landlord fails to return them after the lease ends. Courts can order landlords to return deposits with interest.

Compensation: Tenants may claim monetary or legal compensation if landlords fail their duties, such as property repairs or deposit returns. Landlords can also claim compensation for property damage.`
        },
        {
          heading: 'Role of Landlord-Tenant Lawyers',
          content: `Landlord-tenant lawyers in India provide crucial services:

Legal advice for landlords and tenants: Lawyers explain rights and obligations under the law and help parties understand their legal position.

Drafting and reviewing agreements: Lawyers draft lease agreements, rental contracts, and other legal documents to protect their clients' interests.

Court representation in disputes: Lawyers represent clients in court proceedings, present evidence, and make legal arguments.

Protecting tenants from unfair practices: Lawyers help tenants challenge illegal evictions, unfair rent increases, and other violations.

Protecting landlords from legal disputes: Lawyers help landlords recover unpaid rent, evict problematic tenants, and protect their property rights.

Negotiating rental agreements: Lawyers negotiate terms that benefit both parties and help avoid future disputes.

With India's booming real estate market, landlord-tenant lawyers are increasingly sought-after. Lawyers ensure landlords and tenants understand their rights, follow regulations, and avoid unnecessary litigation.`
        },
        {
          heading: 'Documents Required to File Landlord-Tenant Case',
          content: `Filing a case requires specific documents:

Lease Agreement: Valid lease agreement between landlord and tenant outlining terms and conditions.

Notice of Termination: Required for eviction, specifying reasons for termination.

Rent Receipts: Proof of timely rent payments or evidence of non-payment.

Proof of Ownership: Landlord must prove property ownership through title deeds or sale deeds.

Property Tax Returns: Copies to show tax compliance and ownership.

Property Documents: Title deed, building plans, and other relevant papers.

Legal Documents: State-specific rules regarding landlord-tenant law.

Evidence of Breach of Contract: Documentation of violations by the tenant, such as property damage or illegal subletting.

Correspondence: Emails, letters, and notices exchanged between landlord and tenant.

Having complete documentation strengthens your case and helps ensure a favorable outcome.`
        },
        {
          heading: 'How GAG Lawyers Help in Landlord-Tenant Disputes',
          content: `GAG Lawyers provide professional advice and representation for landlord-tenant cases. We help with:

Drafting rental agreements and lease contracts: We ensure agreements are legally sound and protect your interests.

Negotiating rental terms: We help negotiate fair terms for both landlords and tenants.

Resolving disputes between landlords and tenants: We mediate disputes and seek amicable solutions.

Filing eviction notices: We assist landlords in filing legal eviction notices and representing them in court.

Guidance on legal rights and obligations: We educate clients about their rights and responsibilities under the law.

Representation in court proceedings: We represent clients in hearings, trials, and appeals.

GAG Lawyers, with years of experience, handle commercial and residential property disputes. We offer individual legal advice, full services for disputes, and strategic guidance on rent and eviction issues.

Our team is committed to providing exceptional legal services and achieving the best possible outcomes for our clients in all landlord-tenant matters.`
        }
      ];
      
      landlordService.documentChecklist = [
        'Lease Agreement between landlord and tenant',
        'Notice of Termination (for eviction cases)',
        'Rent Receipts or proof of payment',
        'Proof of Ownership (title deed, sale deed)',
        'Property Tax Returns',
        'Building plans and property documents',
        'Evidence of breach of contract',
        'Correspondence between parties',
        'Photographs of property condition (if applicable)'
      ];
      
      landlordService.popularCases = [
        'Phool Kumari v. Kalu Ram, AIR 1980 SC 1717 - Tenant\'s right to remain after lease expiration',
        'Mallikarjun v. Bhimrao, AIR 1988 SC 1464 - Eviction for non-payment of rent',
        'N.K. Sharma v. Rajesh Kumar, AIR 1991 SC 1468 - Eviction on grounds of non-use'
      ];
      
      landlordService.faqs = [
        {
          question: 'What is a landlord-tenant dispute?',
          answer: 'A landlord-tenant dispute is a legal disagreement between a landlord and a tenant over issues such as rent, security deposits, lease terms, eviction, or property maintenance.'
        },
        {
          question: 'Can a landlord evict a tenant without a court order?',
          answer: 'No, a landlord cannot evict a tenant without a court order in India. The eviction process must be carried out in accordance with applicable laws and regulations.'
        },
        {
          question: 'What are common types of landlord-tenant disputes?',
          answer: 'Common types include failure to pay rent, illegal eviction, breach of lease agreements, damage to rental property, and security deposit disputes.'
        },
        {
          question: 'How can a landlord-tenant lawyer help?',
          answer: 'A lawyer can provide legal representation, draft agreements, negotiate settlements, file eviction notices, and represent clients in court proceedings.'
        },
        {
          question: 'Can a tenant break a lease agreement?',
          answer: 'Yes, a tenant can break a lease agreement, but there may be consequences such as losing the security deposit or being sued for breach of contract.'
        }
      ];
      
      landlordService.seoKeywords = [
        'landlord tenant lawyer',
        'eviction lawyer',
        'rental dispute',
        'lease agreement',
        'tenant rights',
        'landlord rights',
        'property dispute',
        'rent control',
        'security deposit',
        'illegal eviction',
        'rental law',
        'tenant eviction',
        'landlord attorney'
      ];
      
      await landlordService.save();
      console.log('✓ Landlord Tenant Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Landlord Tenant Lawyer service not found\n');
    }

    // ==================== LEGAL NOTICE LAWYER SERVICE ====================
    console.log('--- Updating Legal Notice Lawyer Service ---');
    const legalNoticeService = await Service.findOne({ slug: 'legal-notice' });
    
    if (legalNoticeService) {
      legalNoticeService.shortDescription = 'Legal Notice Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      legalNoticeService.description = 'Legal Notice Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      legalNoticeService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/legal-notice-lawyer-hero.jpg';
      
      legalNoticeService.contentBlocks = [
        {
          heading: 'Understanding Legal Notices',
          content: `A legal notice is essentially a formal notice sent to a person who is expecting to commence legal proceedings. Legal notification must precede legal proceedings. And having a good lawyer will make all the difference in achieving your intended results.

At GAG Lawyers, it is widely accepted that communication is a key component of successful legal representation. Our team of expert legal notice lawyers will help you draft and respond to legal notices and guide you through even the most difficult situations.

A legal notice serves as a formal communication that informs the recipient of your intention to take legal action if the matter is not resolved. It provides an opportunity for the parties to settle disputes without going to court.

Legal notices are used in various situations, including recovery of money, cheque bounce cases, property disputes, employment issues, defamation, breach of contract, and many other civil and criminal matters.

Having a professional lawyer draft your legal notice ensures that it is legally sound, clearly communicates your position, and complies with all relevant laws and regulations.`
        },
        {
          heading: 'Our Legal Notice Services',
          content: `We provide comprehensive legal notice services:

Drafting and Sending Legal Notices: Our lawyers have the expertise to draft accurate and effective legal notices specific to your situation. Whether it's a legal notice for non-payment of loan or any other issue, we ensure the information is clear, accurate, and complete.

Legal Notice for Recovery of Money: If you are in debt, our team will help you draft a legal notice for recovery of money. We know the legal notice format for recovery of money and can draft such a document clearly stating your claim and what the recipient must do to settle it.

Legal Notice for Cheque Bounce: Bounced checks are a real hassle. Our attorneys can help you draft a legal notice for cheque bounce, beginning the process of getting your money back with all appropriate legal remedies available.

Legal Notice to Tenant to Vacate: Cases involving disputes between landlords and tenants are often complex. We can help you draft a compliant notice asking the tenant to move out in accordance with all applicable laws.

Legal Notice Under Section 138: We can help draft legal notices under Section 138 of the Negotiable Instruments Act. In the case of dishonest checks, our lawyers will ensure that all formalities are taken care of.

Online Legal Notice Services: In the current digital age, we offer online legal notice services. This can be a quick and effective way to start the recovery process.

Reply to Legal Notice: We ensure that you can respond appropriately to legal notices. Our legal services team will draft replies to legal notices, ensuring that your interests are addressed and claims against you are clearly clarified.`
        },
        {
          heading: 'Legal Notice Fees and Charges',
          content: `We understand that legal costs are a concern for many clients. Our legal notice fees are transparent and competitive. At GAG Lawyers, our legal notice fees are structured to deliver value, ensuring high-quality legal service.

For cases involving monetary recovery, we offer clear information about legal notice charges for recovery of money. We believe in transparency and will provide you with a detailed breakdown of all costs involved.

The fees depend on the complexity of the case, the type of legal notice required, and the amount of work involved. We offer:

Free initial consultation to understand your case
Transparent fee structure with no hidden charges
Affordable rates for standard legal notices
Customized pricing for complex cases
Payment plans for clients who need them

Our goal is to make legal services accessible while maintaining the highest standards of professional representation.`
        },
        {
          heading: 'Importance of Professional Legal Notices',
          content: `Although it is possible to submit legal information without a lawyer, having professional legal advice can greatly strengthen your position. A lawyer for legal notice can:

Ensure your notice is legally sound and effective: Lawyers understand the legal requirements and ensure compliance.

Help you avoid common pitfalls: Many self-drafted notices fail due to technical errors or incomplete information.

Advise you on the best course of action: Lawyers can recommend the most effective legal strategy based on your situation.

Prepare you for potential legal proceedings: If the matter isn't resolved through the notice, lawyers can represent you in court.

Protect your legal rights: Professional representation ensures your rights are protected throughout the process.

Increase chances of settlement: A well-drafted legal notice from a lawyer often prompts the recipient to settle the matter quickly.

Having professional legal representation demonstrates seriousness and often leads to faster resolution of disputes.`
        },
        {
          heading: 'Key Supreme Court Rulings on Legal Notices',
          content: `Several Supreme Court cases have shaped the law on legal notices:

Nandlal Wasudeo Badwaik v. Lata Nandlal Badwaik (2014): The Supreme Court held that sending information via registered mail alone is not considered evidence of service. This decision emphasizes the need for professional management of legal notices to ensure proper service.

Kumari Madhuri Patil v. Additional Commissioner, Tribal Development (1994): This case concerned the appropriate length of a legal notice. The Supreme Court concluded that what constitutes 'reasonable time' to comply with any notice depends on the facts and circumstances of each case.

These decisions show that legal notices must be drafted correctly and served properly. Professional lawyers ensure compliance with all legal requirements and court precedents.

Understanding these rulings helps in drafting effective legal notices that stand up to legal scrutiny and achieve the desired results.`
        },
        {
          heading: 'How GAG Lawyers Help with Legal Notices',
          content: `If you need help with legal information, contact GAG Lawyers. Our lawyers are here to help you manage this important part of the legal communications process.

We provide:

Expert legal advice on your rights and options
Professional drafting of legal notices for all types of cases
Proper service of legal notices with proof of delivery
Strategic guidance on next steps based on the response
Representation in court if the matter proceeds to litigation
Reply drafting services if you receive a legal notice
Online legal notice services for convenience

Our experienced team has handled thousands of legal notices across various practice areas. We understand the nuances of different types of legal notices and ensure that your notice is effective and legally compliant.

Call us today and schedule your appointment. We are committed to providing exceptional legal services and achieving the best possible outcomes for our clients.`
        }
      ];
      
      legalNoticeService.documentChecklist = [
        'Details of the parties (sender and recipient)',
        'Facts and circumstances of the dispute',
        'Legal grounds for the claim',
        'Demand or relief sought',
        'Time period for compliance',
        'Supporting documents (contracts, receipts, correspondence)',
        'Proof of identity and address',
        'Evidence of the cause of action',
        'Any previous correspondence related to the matter'
      ];
      
      legalNoticeService.popularCases = [
        'Nandlal Wasudeo Badwaik v. Lata Nandlal Badwaik (2014) - Service of legal notice',
        'Kumari Madhuri Patil v. Additional Commissioner (1994) - Reasonable time for compliance',
        'Section 138 NI Act cases - Cheque bounce legal notices'
      ];
      
      legalNoticeService.faqs = [
        {
          question: 'Can I send a legal notice without a lawyer?',
          answer: 'You can draft a legal notice without a lawyer, but it\'s not recommended. A lawyer ensures your notice is legally sound, communicates your position effectively, and complies with all relevant laws.'
        },
        {
          question: 'What is the format of reply to legal notice under Section 138?',
          answer: 'A reply to Section 138 notice generally includes acknowledgment of receipt, denial of allegations or explanation, any counter-claims, and request for withdrawal or proposal for settlement.'
        },
        {
          question: 'How to send legal notice for divorce?',
          answer: 'To send legal notice of divorce, consult a lawyer to draft the notice, include grounds for divorce and relevant details, send via registered post with acknowledgment, and keep proof of sending and delivery.'
        },
        {
          question: 'How to send legal notice online?',
          answer: 'To send a legal notice online, draft the notice (preferably with legal assistance), use a reputable online service platform, upload your notice and recipient details, pay the required fee, and the platform will send the notice.'
        },
        {
          question: 'What happens after sending a legal notice?',
          answer: 'After sending a legal notice, the recipient may respond by complying with demands, negotiating a settlement, or ignoring the notice. If ignored, you can proceed with legal action in court.'
        }
      ];
      
      legalNoticeService.seoKeywords = [
        'legal notice',
        'legal notice lawyer',
        'legal notice for recovery',
        'cheque bounce notice',
        'legal notice format',
        'reply to legal notice',
        'online legal notice',
        'legal notice fees',
        'legal notice under section 138',
        'legal notice for divorce',
        'legal notice to tenant',
        'legal notice drafting',
        'send legal notice'
      ];
      
      await legalNoticeService.save();
      console.log('✓ Legal Notice Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Legal Notice Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Landlord Tenant and Legal Notice services updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServices();
