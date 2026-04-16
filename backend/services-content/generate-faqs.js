/**
 * Generate comprehensive FAQs for each service
 */

const generateFAQs = (serviceName, category) => {
  const faqs = [
    {
      question: `What is ${serviceName}?`,
      answer: `${serviceName} refers to legal services and representation in matters related to ${category} law. It involves providing expert legal advice, documentation, court representation, and strategic guidance to protect your rights and interests.`
    },
    {
      question: `When do I need a ${serviceName}?`,
      answer: `You need a ${serviceName.toLowerCase()} when facing legal issues, disputes, or matters requiring professional legal expertise. Early consultation helps in understanding your rights, preventing legal complications, and ensuring proper handling of your case.`
    },
    {
      question: `How much does ${serviceName} cost?`,
      answer: `The cost varies depending on case complexity, court level, and time required. We offer transparent pricing with no hidden charges. Initial consultation is free, and we provide detailed cost estimates after case assessment.`
    },
    {
      question: `How long does a ${serviceName.toLowerCase()} case take?`,
      answer: `Case duration varies based on complexity, court workload, and matter type. Simple matters may resolve in weeks, while complex cases can take months or years. We provide realistic timelines during consultation and keep you updated throughout.`
    },
    {
      question: `What documents are required for ${serviceName}?`,
      answer: `Required documents vary by case type but typically include identity proof, relevant agreements/orders, correspondence, financial documents, and evidence. We provide a detailed checklist during consultation.`
    },
    {
      question: `Can I handle ${serviceName.toLowerCase()} matters without a lawyer?`,
      answer: `While legally possible, it's not advisable. Legal matters involve complex procedures, technical requirements, and strategic considerations. Professional representation significantly improves your chances of favorable outcomes.`
    },
    {
      question: `What is the success rate for ${serviceName} cases?`,
      answer: `Success rates depend on case merits, evidence quality, and legal strategy. We provide honest assessment during consultation and work diligently to achieve the best possible outcomes for our clients.`
    },
    {
      question: `Do you provide emergency ${serviceName} services?`,
      answer: `Yes, we understand that legal emergencies require immediate attention. We offer urgent consultation and representation services for time-sensitive matters. Contact us immediately for emergency assistance.`
    },
    {
      question: `How do I choose the right lawyer for ${serviceName}?`,
      answer: `Look for experience in relevant practice area, track record, communication skills, and client reviews. Our team specializes in ${category} law with proven expertise and personalized attention to each case.`
    },
    {
      question: `What happens during the first consultation?`,
      answer: `During initial consultation, we listen to your case, review documents, assess legal merits, explain your rights and options, discuss strategy, provide cost estimates, and answer all your questions.`
    },
    {
      question: `Can ${serviceName} cases be settled out of court?`,
      answer: `Yes, many cases can be resolved through negotiation, mediation, or settlement. We explore all options to achieve favorable outcomes while minimizing time, cost, and stress of prolonged litigation.`
    },
    {
      question: `What if I lose my ${serviceName.toLowerCase()} case?`,
      answer: `If the decision is unfavorable, we can file appeals to higher courts. We analyze the judgment, identify grounds for appeal, and represent you in appellate proceedings to seek justice.`
    },
    {
      question: `How often will I receive updates about my case?`,
      answer: `We provide regular updates after every court hearing, significant development, or procedural step. You can also contact us anytime for case status updates and clarifications.`
    },
    {
      question: `Why choose Grover & Grover for ${serviceName}?`,
      answer: `We offer specialized expertise, proven track record, personalized attention, transparent communication, competitive fees, and commitment to achieving the best outcomes. Our client-focused approach ensures your interests are always prioritized.`
    },
    {
      question: `What areas do you serve for ${serviceName}?`,
      answer: `We serve clients across Delhi NCR and represent cases in all courts including District Courts, High Court, and Supreme Court. We also handle matters in tribunals and other judicial forums.`
    }
  ];

  return faqs;
};

module.exports = { generateFAQs };
