require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateService() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== INSURANCE LAWYER SERVICE ====================
    console.log('--- Updating Insurance Lawyer Service ---');
    const insuranceService = await Service.findOne({ slug: 'insurance-lawyer' });
    
    if (insuranceService) {
      insuranceService.shortDescription = 'Insurance Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      insuranceService.description = 'Insurance Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      insuranceService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/insurance-lawyer-hero.jpg';
      
      insuranceService.contentBlocks = [
        {
          heading: 'Understanding Insurance Law in India',
          content: `Insurance law in India is a set of rules, regulations, and guidelines for the insurance industry. Insurance law ensures that the rights of policyholders are safeguarded and that insurance companies comply with their obligations.

Insurance law also regulates how insurers should conduct business, how claims should be handled, and what limits can be imposed on coverage. Insurance law also establishes procedures for filing claims, resolving disputes between insurers and policyholders, and determining compensation for injuries or damages caused by an accident or illness.

The Insurance Laws Act of India provides for the regulation and development of the insurance sector. It came into force on January 1, 1956. Insurance law in India is primarily administered by the Insurance Regulatory and Development Authority of India (IRDAI).

The IRDAI was established as an independent statutory body under Section 3 of the Insurance Laws Act 1956 to regulate, develop, and promote the Indian insurance industry so that it can create a sense of security among consumers.

The Ministry of Corporate Affairs (MCA) is responsible for enforcing provisions related to financial services and corporate governance under the Companies Act, 2013. The Indian insurance laws provide for registration of insurance companies, prohibition on unfair trade practices, establishment of solvency standards, regulation of domestic and foreign life insurance companies and their subsidiaries.

The IRDAI is the sole regulator of health insurance in India. The IRDAI's responsibilities include defining the mandate, policies, and standards for various types of insurance, including general health cover, life cover, and long-term care cover.`
        },
        {
          heading: 'Primary Types of Insurance Law',
          content: `Insurance law in India is a combination of statutory law and common law. It protects the interests of policyholders by prescribing their rights and obligations toward insurance companies. The main types of insurance law in India are life insurance law, health insurance law, motor vehicle insurance law, accident insurance law, and property insurance law.

The primary types of Indian insurance law include:

Insurance Regulatory and Development Authority (IRDA) Act: The IRDA Act, 1999, provides for the establishment of an authority to protect the interests of insurance policyholders, regulate, and ensure orderly growth of the insurance industry. The Act defines the powers, duties, and licensing terms of insurers and agents.

Life Insurance Corporation Act: The LIC Act, 1956, regulates all life insurance businesses and created the Life Insurance Corporation of India (LIC), which has exclusive rights to transact life insurance business in India.

Insurance Act: The Insurance Act, 1938, governs the insurance sector, outlining insurer and insured responsibilities and the framework for disputes.

Insurance Ombudsman Act: Introduced in 2019, it provides a platform for the resolution of complaints related to insurance services. Appointments are made in consultation with IRDAI.

Motor Vehicles Act: Governs all matters relating to motor vehicles, including insurance coverage, registration, inspection, and licencing.

Marine Insurance Act: Enacted in 1963 to regulate marine insurance contracts.

Insurance Claims Settlement and Surveyors Act: Regulates the activities of surveyors and loss assessors and ensures fair claims settlement.`
        },
        {
          heading: 'Charges, Penalties & Punishment in Insurance Cases',
          content: `Insurance law cases in India are legislated by the Insurance Act, 1938 and the General Insurance Business (Nationalisation) Act, 1972. Penalties vary depending on the type of violation and may include fines, imprisonment, or both.

Fraud or misrepresentation: Imprisonment up to 3 years, fine up to ₹10,000, or both. This applies when policyholders provide false information in insurance applications or claims.

Non-compliance with Insurance Act or IRDA Act: Imprisonment up to 6 months, fine up to ₹1 lakh, or both. This covers violations of regulatory requirements by insurance companies or agents.

Criminal breach of trust by an insurer: Imprisonment up to 7 years, fine up to ₹1 lakh. This applies when insurers misappropriate funds or fail to honor valid claims.

Negligence by insurance agents: Imprisonment up to 1 year, fine up to ₹1 lakh. This covers cases where agents fail to fulfill their duties or provide misleading information.

Bad faith practices: Insurance companies engaging in bad faith practices, such as unreasonably denying claims or delaying payments, can face penalties including fines, sanctions, and revocation of their license.

The severity of penalties depends on the nature and extent of the violation. Courts and regulatory authorities aim to protect policyholders while ensuring fair treatment of all parties involved.`
        },
        {
          heading: 'Legal Remedies Available Under Insurance Law',
          content: `Policyholders and insurers have several legal remedies available under insurance law:

Civil Remedies: File a claim in civil court for damages or compensation. This is the most common remedy for disputes over claim denials or policy interpretation.

Criminal Remedies: File a complaint against insurers for criminal breach of trust, fraud, or other criminal offenses.

Regulatory Relief: Approach IRDAI or Insurance Ombudsman for resolution of complaints. The Insurance Ombudsman provides a free and efficient forum for resolving disputes.

Arbitration: Many insurance policies include arbitration clauses. Arbitration provides binding awards from arbitrators and can be faster than court proceedings.

Consumer Forums: File complaints with consumer protection forums for unfair trade practices or deficiency in service.

High Court and Supreme Court: Appeal to higher courts if dissatisfied with lower court decisions or seek enforcement of rights under constitutional provisions.

The choice of remedy depends on the nature of the dispute, the amount involved, and the desired outcome. Insurance lawyers can provide strategic guidance on the most appropriate remedy for each situation.`
        },
        {
          heading: 'Role of Insurance Lawyer',
          content: `Insurance lawyers in India play a crucial role in protecting the rights of policyholders and ensuring fair treatment by insurance companies. Their responsibilities include:

Advising clients on rights and obligations: Helping policyholders understand their insurance policies, coverage limits, exclusions, and claim procedures.

Representing clients in courts and tribunals: Appearing before civil courts, consumer forums, IRDAI, and Insurance Ombudsman on behalf of clients.

Assisting with claim filing: Helping policyholders prepare and file insurance claims with proper documentation and evidence.

Negotiating settlements: Facilitating negotiations with insurance companies to reach fair settlement terms.

Challenging claim denials: Representing policyholders when insurance companies wrongfully deny or undervalue claims.

Providing counsel on insurance law: Advising on consumer protection, contract law, tort law, and regulatory compliance.

Protecting clients from bad faith practices: Taking legal action against insurers who engage in unfair or deceptive practices.

Reviewing insurance policies: Analyzing policy terms to ensure adequate coverage and identify potential issues.

Handling subrogation matters: Representing insurers or insureds in subrogation claims.

Insurance lawyers ensure that policyholders receive the benefits they are entitled to under their policies and that insurance companies comply with their legal obligations.`
        },
        {
          heading: 'How GAG Lawyers Help in Insurance Cases',
          content: `GAG Lawyers provides comprehensive legal services for insurance-related matters:

Advice on policy terms and coverage: We help clients understand their insurance policies, including coverage adequacy, exclusions, and limitations.

Negotiation with insurers: We negotiate with insurance companies on behalf of clients to secure fair settlements for claims.

Court representation: We represent clients in civil courts, consumer forums, and before the Insurance Ombudsman and IRDAI.

Assistance with claims filing: We help clients prepare and file insurance claims with proper documentation and evidence.

Guidance on insurance law: We provide expert advice on consumer protection, contract law, tort law, and regulatory compliance.

Challenging claim denials: We represent clients when insurance companies wrongfully deny, delay, or undervalue claims.

Bad faith litigation: We take legal action against insurers who engage in bad faith practices.

Policy review and analysis: We review insurance policies to ensure adequate coverage and identify potential issues.

Subrogation matters: We handle subrogation claims for both insurers and insureds.

Appeals: We file and argue appeals when clients are dissatisfied with lower court or tribunal decisions.

Our goal is to help clients obtain rightful compensation and ensure that insurance companies fulfill their obligations. We are committed to providing exceptional legal services and protecting the rights of policyholders in all insurance matters.

Whether you are dealing with a denied claim, bad faith practices, or need assistance understanding your policy, GAG Lawyers has the expertise to help you navigate the complexities of insurance law.`
        }
      ];
      
      insuranceService.documentChecklist = [
        'Insurance policy documents',
        'Claim forms and applications',
        'Medical reports and bills (for health insurance)',
        'Police reports and FIRs (for accident/theft claims)',
        'Repair estimates and bills (for vehicle/property insurance)',
        'Proof of loss or damage (photographs, videos)',
        'Correspondence with insurance company',
        'Proof of premium payments',
        'Any other supporting evidence'
      ];
      
      insuranceService.popularCases = [
        'United India Insurance Co. Ltd. v. Subhash Chandra Gupta (2018) - Non-disclosure of material facts',
        'Oriental Insurance Co. Ltd. v. United India Insurance Co. Ltd. (2015) - False statements in policy applications',
        'Liberty India Insurance Co. Ltd. v. Meenakshi (2019) - Denial of death benefit claims'
      ];
      
      insuranceService.faqs = [
        {
          question: 'What are common types of insurance law cases?',
          answer: 'Common types include disputes over coverage, denial of claims, bad faith practices by insurers, breach of contract, and misrepresentation in policy applications.'
        },
        {
          question: 'Can I sue an insurance company for denying my claim?',
          answer: 'Yes, you can sue an insurance company for denying your claim. An insurance lawyer can help you file a lawsuit and represent you in court or before the Insurance Ombudsman.'
        },
        {
          question: 'What should I do if my insurance claim is denied?',
          answer: 'Review the denial letter carefully, gather supporting documents, and contact an insurance lawyer to discuss your legal options, which may include appeal, complaint to IRDAI, or litigation.'
        },
        {
          question: 'What are the penalties for insurance companies engaging in bad faith?',
          answer: 'Penalties can include fines, sanctions, revocation of license, and liability for damages. The severity depends on the nature and extent of the bad faith conduct.'
        },
        {
          question: 'How long does it take to resolve an insurance dispute?',
          answer: 'The duration varies depending on the complexity of the case and the forum. Insurance Ombudsman cases may resolve in a few months, while court cases can take longer.'
        }
      ];
      
      insuranceService.seoKeywords = [
        'insurance lawyer',
        'insurance claims',
        'claim denial',
        'bad faith insurance',
        'insurance dispute',
        'IRDAI',
        'insurance ombudsman',
        'policy coverage',
        'health insurance lawyer',
        'motor insurance lawyer',
        'life insurance lawyer',
        'insurance litigation',
        'claim settlement'
      ];
      
      await insuranceService.save();
      console.log('✓ Insurance Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Insurance Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Insurance service updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating service:', error);
    process.exit(1);
  }
}

updateService();
