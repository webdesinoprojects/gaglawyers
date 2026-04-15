require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // ==================== MEDIATION & ARBITRATION LAWYER SERVICE ====================
    console.log('--- Updating Mediation & Arbitration Lawyer Service ---');
    const mediationService = await Service.findOne({ slug: 'mediation-and-arbitration-lawyer' });
    
    if (mediationService) {
      mediationService.shortDescription = 'Mediation & Arbitration Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      mediationService.description = 'Mediation & Arbitration Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      mediationService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/mediation-arbitration-lawyer-hero.jpg';
      
      mediationService.contentBlocks = [
        {
          heading: 'Understanding Mediation and Arbitration',
          content: `Mediation is a process of dispute resolution in which an impartial third-party mediator assists two or more parties to reach a mutually acceptable agreement. This process helps the parties resolve their disputes without resorting to litigation or arbitration. It is often used in family disputes, business negotiations, and other areas of civil law.

The mediator works with both sides to identify common interests, explore possible solutions, and develop strategies for reaching an agreement that all parties can accept. Mediation offers an effective alternative to the costly and time-consuming court system.

Arbitration is a form of alternative dispute resolution (ADR) that is used to settle disputes between two or more parties. It is a voluntary process that involves the parties in dispute appointing an independent arbitrator who will listen to their arguments and make a decision on the matter.

The arbitrator's decision is legally binding and can be enforced by a court of law. Arbitration can be used in many different types of disputes, including those involving contracts, civil rights, family matters, business disputes, and personal injury claims.

Both mediation and arbitration are designed to provide an effective, efficient, and cost-effective way for parties to resolve their disputes without having to go through the lengthy and expensive process of litigation.`
        },
        {
          heading: 'Difference Between Mediation and Arbitration',
          content: `Mediation and arbitration are two different forms of dispute resolution. While they both involve a third party to help resolve a dispute, there are distinct differences between the two.

Mediation is a process where an impartial mediator helps the parties involved in the dispute come to an agreement without any form of judgment or decision-making. The mediator facilitates conversation between the two parties, taking notes as needed and assisting both sides with decision-making processes.

In contrast, arbitration is a legal process in which an arbitrator makes a binding decision on the outcome of the dispute after hearing both sides of the argument. The arbitrator acts as a judge and renders a decision that is final and enforceable by law.

Key differences include:

Voluntary vs Binding: Mediation is voluntary and non-binding until parties agree. Arbitration results in a binding decision.

Formality: Mediation is informal and flexible. Arbitration is more formal, similar to court proceedings.

Decision-making: In mediation, parties control the outcome. In arbitration, the arbitrator makes the final decision.

Confidentiality: Both processes are confidential, but arbitration proceedings may be more structured.

Cost and Time: Mediation is generally faster and less expensive than arbitration.

Understanding these differences helps parties choose the most appropriate method for their dispute.`
        },
        {
          heading: 'Benefits of Mediation and Arbitration',
          content: `Mediation and arbitration offer numerous advantages over traditional litigation:

Cost-Effective: Both processes are significantly less expensive than going to court. They avoid lengthy court proceedings and reduce legal fees.

Faster Resolution: Disputes can be resolved in weeks or months rather than years. This saves time and allows parties to move forward quickly.

Flexibility: Parties have more control over the process, including scheduling, procedures, and outcomes. They can negotiate terms that work for both sides.

Confidentiality: Unlike court proceedings, mediation and arbitration are private. This protects sensitive business information and personal matters.

Preservation of Relationships: The collaborative nature of mediation helps preserve business relationships and family ties. Parties work together rather than against each other.

Expert Decision-Makers: In arbitration, parties can choose arbitrators with specific expertise in the subject matter of the dispute.

Finality: Arbitration decisions are final and binding, with limited grounds for appeal. This provides certainty and closure.

Less Adversarial: Mediation focuses on finding common ground rather than winning and losing. This reduces hostility and stress.

These benefits make mediation and arbitration attractive options for resolving disputes efficiently and effectively.`
        },
        {
          heading: 'Role of Lawyers in Mediation and Arbitration',
          content: `Mediation and arbitration lawyers play an important role in these processes, providing legal counsel and advice to the parties involved in the dispute. Their responsibilities include:

Advising on Legal Rights: Lawyers help clients understand their rights, obligations, and potential risks or outcomes. They explain the legal implications of various settlement options.

Preparing for Proceedings: Lawyers help clients prepare documents, evidence, and arguments. They ensure all necessary materials are organized and presented effectively.

Representing Clients: Lawyers represent clients during mediation sessions and arbitration hearings. They present arguments, examine witnesses, and protect their clients' interests.

Negotiating Settlements: In mediation, lawyers help negotiate favorable settlement terms. They ensure agreements are fair and legally enforceable.

Drafting Agreements: Lawyers draft settlement agreements and arbitration awards to ensure they are legally binding and comprehensive.

Ensuring Compliance: Lawyers ensure that all agreements comply with applicable laws and regulations. They help enforce agreements if necessary.

Strategic Guidance: Lawyers provide strategic advice on when to settle, when to proceed to arbitration, and how to achieve the best possible outcome.

By providing their expertise, mediation and arbitration lawyers help ensure that proceedings are conducted fairly and effectively, protecting their clients' interests throughout the process.`
        },
        {
          heading: 'Documents Required for Mediation and Arbitration',
          content: `Filing a case for mediation or arbitration requires submission of several documents:

Mandatory Contract for Mediation and Arbitration: Under procedural rules, parties must enter into a written contract outlining how they expect to resolve their dispute. The contract describes who will do what, with whom they will meet, how long it will take, and other key details.

Petition or Application: A written petition stating the nature of the dispute, parties involved, and relief sought.

Affidavits: Sworn statements verifying the facts stated in the petition.

Supporting Documents: Contracts, agreements, correspondence, invoices, receipts, and other evidence supporting the claim.

Proof of Identity: Identification documents of all parties involved.

Arbitration Agreement: If proceeding to arbitration, a copy of the arbitration clause or agreement.

List of Witnesses: Names and contact information of witnesses who will testify.

Expert Reports: If applicable, reports from experts in relevant fields.

Financial Documents: Bank statements, financial records, or other documents showing financial impact.

These documents allow the mediator or arbitrator to assess the case accurately and facilitate resolution. Having complete documentation strengthens your position and helps achieve a favorable outcome.`
        },
        {
          heading: 'How GAG Lawyers Help in Mediation and Arbitration',
          content: `GAG Lawyers specialize in assisting clients with mediation and arbitration. By leveraging our expertise in dispute resolution, we provide clients with the necessary legal advice and representation to help them achieve successful outcomes.

Our services include:

Legal Consultation: We provide strategic advice on whether mediation or arbitration is the best approach for your dispute.

Document Preparation: We draft and review all necessary documents, including petitions, affidavits, and settlement agreements.

Representation: We represent clients in mediation sessions and arbitration hearings, presenting evidence and making persuasive arguments.

Negotiation: We facilitate negotiations between parties to reach mutually beneficial agreements.

Settlement Drafting: We draft comprehensive settlement agreements that protect our clients' interests and are legally enforceable.

Arbitration Advocacy: We present cases before arbitrators, cross-examine witnesses, and ensure proper application of law.

Enforcement: We assist in enforcing mediation settlements and arbitration awards through court proceedings if necessary.

With our comprehensive knowledge of alternative dispute resolution, we help ensure that clients achieve fair and efficient resolution of their disputes. We are committed to providing exceptional legal services and protecting our clients' rights throughout the mediation and arbitration process.

Whether you are facing a commercial dispute, family matter, employment issue, or any other conflict, GAG Lawyers have the experience and expertise to guide you through mediation and arbitration successfully.`
        }
      ];
      
      mediationService.documentChecklist = [
        'Written contract for mediation/arbitration',
        'Petition or application stating the dispute',
        'Affidavits supporting the claim',
        'Contracts and agreements related to the dispute',
        'Correspondence between parties',
        'Financial documents and records',
        'Proof of identity of all parties',
        'Arbitration agreement or clause',
        'List of witnesses and expert reports'
      ];
      
      mediationService.popularCases = [
        'Keshavananda Bharati v. State of Kerala (1973) - Arbitration in constitutional matters',
        'Vishakha v. State of Rajasthan (1997) - Mediation in workplace disputes',
        'Commercial arbitration cases under Arbitration and Conciliation Act, 1996'
      ];
      
      mediationService.faqs = [
        {
          question: 'What is mediation and arbitration?',
          answer: 'Mediation is a process where an impartial mediator helps parties reach a mutually acceptable agreement. Arbitration is a process where an arbitrator makes a binding decision on the dispute.'
        },
        {
          question: 'What are the benefits of mediation and arbitration?',
          answer: 'Benefits include cost-effectiveness, faster resolution, flexibility, confidentiality, preservation of relationships, and less adversarial proceedings compared to court litigation.'
        },
        {
          question: 'Is the decision binding in arbitration?',
          answer: 'Yes, the decision in arbitration is typically binding and can only be appealed under certain limited circumstances. Parties must comply with the arbitrator\'s decision.'
        },
        {
          question: 'Do I need a lawyer for mediation or arbitration?',
          answer: 'While not mandatory, having a lawyer is highly recommended to protect your rights, prepare your case effectively, and ensure favorable outcomes.'
        },
        {
          question: 'How long does mediation or arbitration take?',
          answer: 'Mediation can typically be completed in hours or days, while arbitration may take several weeks or months, depending on the complexity of the case.'
        }
      ];
      
      mediationService.seoKeywords = [
        'mediation lawyer',
        'arbitration lawyer',
        'alternative dispute resolution',
        'ADR',
        'mediation services',
        'arbitration services',
        'dispute resolution',
        'commercial arbitration',
        'family mediation',
        'arbitration agreement',
        'mediation settlement',
        'arbitration award',
        'conflict resolution'
      ];
      
      await mediationService.save();
      console.log('✓ Mediation & Arbitration Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Mediation & Arbitration Lawyer service not found\n');
    }

    // ==================== MOTOR ACCIDENT LAWYER SERVICE ====================
    console.log('--- Updating Motor Accident Lawyer Service ---');
    const motorService = await Service.findOne({ slug: 'motor-accident-lawyer' });
    
    if (motorService) {
      motorService.shortDescription = 'Motor Accident Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      motorService.description = 'Motor Accident Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      motorService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/motor-accident-lawyer-hero.jpg';
      
      motorService.contentBlocks = [
        {
          heading: 'Understanding Motor Accident Law in India',
          content: `Motor accident law in India is a set of laws and regulations that govern the rights and responsibilities of individuals involved in motor vehicle accidents. These laws are designed to protect people from injury, property damage, and financial loss due to motor vehicle accidents.

The Motor Vehicles Act is designed to regulate the manufacturing and use of vehicles in India, while the Indian Penal Code applies to actions committed by people who are driving or riding a vehicle. The Indian Penal Code also governs other offenses connected with motor vehicles such as causing death through rash driving, driving without license, driving without insurance, drunk-driving, and vehicular manslaughter.

There are many other laws that apply in certain circumstances related to collisions, such as helmet requirements for drivers of two-wheelers and motorcycles under Section 46 of MV Act, and the use of seat belts under Section 67 of MV Act.

Motor Accident Law covers issues such as compensation for injury or death, liability for damages caused by a motor vehicle accident, and insurance coverage for those involved in an accident. It also covers topics such as road safety regulations, traffic laws, and other related matters.

It is important to understand the various legal rights and obligations associated with motor vehicle accidents so that victims can receive the proper compensation they are entitled to.`
        },
        {
          heading: 'Rules and Regulations for Victims',
          content: `Motor accidents in India are unfortunately a leading cause of death and injury. It is crucial to have a thorough understanding of the compensation rules and regulations for victims in such cases.

Compensation rules and regulations for motor accident victims in India can be found in Sections 17, 19, 20, and 21 of the Motor Vehicles Act. These sections provide the legal framework through which victims can seek compensation after a motor accident occurs.

Victims have the option to take civil action against any party responsible for their injuries or death due to negligence or violation of traffic rules. Section 17 allows for action based on negligent driving resulting in an accident, while Section 20 deals with unsafe driving causing an accident.

To handle claims from motor accident victims, there is a legal body known as the Motor Accident Claims Tribunal (MACT). Victims are entitled to reimbursement for medical costs, loss of income, and mental anguish.

The maximum compensation for death is Rs 4.5 lakhs and for permanent total disability is Rs 1.5 lakhs under the Motor Vehicles Act. However, courts can award higher compensation based on the circumstances of each case.

Understanding these rules helps victims and their families navigate the legal process and obtain fair compensation for their losses.`
        },
        {
          heading: 'Steps to Claim Compensation After Motor Accident',
          content: `Accidents on the road can be incredibly traumatic, causing both physical and emotional damage. Individuals involved can claim compensation from insurance companies or through the court. Here are the steps:

File an FIR: First Information Report must be lodged immediately with the police. This creates an official record of the accident.

Gather Evidence: Collect photographs of the accident scene, vehicle damage, injuries, and any other relevant evidence. Obtain contact information of witnesses.

Seek Medical Treatment: Get immediate medical attention and keep all medical records, bills, and prescriptions. These documents are crucial for claiming compensation.

Inform Insurance Company: Notify your insurance company about the accident as soon as possible. Submit all relevant documents including FIR copy, medical bills, and repair estimates.

Engage Legal Representation: Hiring a motor accident lawyer is highly recommended. They can guide you through the legal process and ensure maximum compensation.

File Your Claim: Your lawyer will file a claim with the Motor Accident Claims Tribunal (MACT) if the insurance company's offer is inadequate or if the claim is denied.

Negotiate: Your lawyer will negotiate with the insurance company or opposite party to reach a fair settlement.

Receive Compensation: Once the claim is approved or the tribunal passes an order, the insurance company releases the agreed-upon amount.

Following these steps ensures that you receive fair compensation for your injuries and losses.`
        },
        {
          heading: 'Legal Provisions Related to Road Safety',
          content: `The Motor Vehicles Act of 1988, the Motor Vehicle (Amendment) Act 2019, Central Motor Vehicle Rules 1989, and Motor Vehicles (Insurance) Act 1938 govern road safety and enforce penalties for violations.

Key provisions include:

Mandatory Insurance: All motor vehicles must have valid insurance coverage. Driving without insurance is a punishable offense.

Licensing Requirements: Drivers must possess valid driving licenses appropriate for the type of vehicle they operate.

Speed Limits: Speed limits are prescribed for different types of roads and vehicles. Exceeding speed limits attracts penalties.

Traffic Rules: Rules regarding lane discipline, overtaking, signal compliance, and right of way must be followed.

Safety Equipment: Use of helmets for two-wheeler riders, seat belts for car occupants, and child restraint systems is mandatory.

Drunk Driving: Driving under the influence of alcohol or drugs is strictly prohibited and attracts severe penalties.

Penalties for Violations: The Motor Vehicles Act prescribes penalties including fines, license suspension, and imprisonment for various violations.

MACT Tribunal is specifically empowered under the Motor Accident Claims Tribunal (MACT) Act 1988 to settle claims arising from motor vehicle accidents.

Understanding these provisions helps ensure road safety and compliance with the law.`
        },
        {
          heading: 'Role of Motor Accident Lawyers',
          content: `Motor accident lawyers play a critical role in assisting victims. They provide legal guidance, help collect evidence, file claims, and represent victims in court. Their responsibilities include:

Legal Consultation: Advising victims on their rights and the compensation they are entitled to under the law.

Evidence Collection: Helping gather all necessary evidence including accident reports, medical records, witness statements, and photographs.

Claim Filing: Preparing and filing claims with insurance companies and the Motor Accident Claims Tribunal.

Negotiation: Negotiating with insurance companies to ensure victims receive fair compensation.

Court Representation: Representing victims in MACT proceedings and higher courts if necessary.

Documentation: Ensuring all legal documents are properly prepared and submitted within prescribed time limits.

Maximizing Compensation: Using legal expertise to calculate and claim maximum compensation for medical expenses, loss of income, pain and suffering, and permanent disability.

Appeals: Filing appeals if the compensation awarded is inadequate or if the claim is wrongfully rejected.

Motor accident lawyers ensure victims know their rights and act promptly in filing claims. They navigate the complex legal process and fight for the rights of accident victims.`
        },
        {
          heading: 'How GAG Lawyers Help in Motor Accident Cases',
          content: `GAG Lawyers provide comprehensive legal services for motor accident cases:

Legal Advice and Assessment: We assess your case and advise on the best course of action to maximize compensation.

Evidence Gathering: We help collect all necessary evidence including police reports, medical records, witness statements, and accident scene photographs.

Insurance Claim Filing: We prepare and file insurance claims with all required documentation.

MACT Representation: We represent clients in Motor Accident Claims Tribunal proceedings, presenting evidence and making legal arguments.

Negotiation with Insurers: We negotiate with insurance companies to secure fair settlements.

Court Litigation: If necessary, we represent clients in higher courts including High Courts and Supreme Court.

Compensation Calculation: We accurately calculate compensation for medical expenses, loss of income, pain and suffering, permanent disability, and other damages.

Follow-up and Enforcement: We ensure that compensation awarded is paid promptly and help enforce tribunal orders if necessary.

Our experienced team has handled thousands of motor accident cases and understands the complexities of motor vehicle law and insurance claims. We are committed to protecting the rights of accident victims and ensuring they receive the compensation they deserve.

Whether you are a victim of a car accident, motorcycle accident, truck accident, or hit-and-run case, GAG Lawyers have the expertise to handle your case effectively and achieve the best possible outcome.`
        }
      ];
      
      motorService.documentChecklist = [
        'FIR (First Information Report)',
        'Accident report from police',
        'Medical records and bills',
        'Vehicle registration papers',
        'Insurance policy documents',
        'Driving license of the driver',
        'Photographs of accident scene and vehicle damage',
        'Witness statements',
        'Death certificate (if applicable)'
      ];
      
      motorService.popularCases = [
        'Jacob Mathew v. State of Punjab (2005) - Medical negligence in motor accident cases',
        'S. Rajaseekaran v. Union of India (2014) - Loss of consortium in motor accidents',
        'Naveen Kumar v. Vijay Kumar (2018) - Hit and run offenses'
      ];
      
      motorService.faqs = [
        {
          question: 'What is a motor accident case in India?',
          answer: 'A motor accident case is a legal dispute arising from a road accident involving motor vehicles, resulting in injury or property damage. Victims can claim compensation through insurance or MACT.'
        },
        {
          question: 'How much compensation can I receive?',
          answer: 'Compensation varies based on injury severity and property damage. The Motor Vehicles Act provides for maximum compensation of Rs. 50 lakh for death and Rs. 10 lakh for permanent disability, but courts can award higher amounts.'
        },
        {
          question: 'Can I claim compensation for hit-and-run accidents?',
          answer: 'Yes, victims can claim compensation for hit-and-run accidents. The Motor Vehicles Act provides for compensation from the Solatium Fund administered by MACT.'
        },
        {
          question: 'How long does it take to resolve a motor accident case?',
          answer: 'The duration varies depending on case complexity and court workload. Simple cases may be resolved in months, while complex cases can take years.'
        },
        {
          question: 'Do I need a lawyer for motor accident cases?',
          answer: 'While not mandatory, hiring a motor accident lawyer is highly recommended to ensure proper documentation, maximize compensation, and navigate the legal process effectively.'
        }
      ];
      
      motorService.seoKeywords = [
        'motor accident lawyer',
        'car accident lawyer',
        'MACT lawyer',
        'motor accident compensation',
        'road accident lawyer',
        'vehicle accident claim',
        'motor accident tribunal',
        'accident injury lawyer',
        'hit and run lawyer',
        'motor vehicle act',
        'accident compensation claim',
        'traffic accident lawyer',
        'motor insurance claim'
      ];
      
      await motorService.save();
      console.log('✓ Motor Accident Lawyer service updated successfully!\n');
    } else {
      console.log('✗ Motor Accident Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Mediation & Arbitration and Motor Accident services updated!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServices();
