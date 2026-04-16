/**
 * Generate document checklists for different service categories
 */

const generateDocumentChecklist = (category) => {
  const commonDocs = [
    'Identity Proof (Aadhaar Card, PAN Card, Passport)',
    'Address Proof (Utility Bills, Rent Agreement)',
    'Photographs (Passport size)',
    'Email ID and Phone Number'
  ];

  const categorySpecificDocs = {
    criminal: [
      'FIR Copy or Complaint',
      'Charge Sheet (if filed)',
      'Bail Order (if applicable)',
      'Previous Court Orders',
      'Witness Statements',
      'Evidence Documents',
      'Medical Reports (if applicable)',
      'Police Investigation Reports'
    ],
    family: [
      'Marriage Certificate',
      'Birth Certificates of Children',
      'Income Proof of Both Parties',
      'Property Documents',
      'Bank Statements',
      'Photographs of Family Events',
      'Communication Records',
      'Medical Records (if applicable)'
    ],
    civil: [
      'Relevant Agreements/Contracts',
      'Correspondence Between Parties',
      'Financial Documents',
      'Property Documents (if applicable)',
      'Previous Court Orders',
      'Evidence of Damages',
      'Expert Reports',
      'Witness Details'
    ],
    corporate: [
      'Company Registration Certificate',
      'MOA and AOA',
      'Board Resolutions',
      'Financial Statements',
      'Tax Returns',
      'Contracts and Agreements',
      'Compliance Certificates',
      'Shareholder Details'
    ],
    property: [
      'Title Deeds',
      'Sale Agreement/Purchase Agreement',
      'Property Tax Receipts',
      'Encumbrance Certificate',
      'Survey Documents',
      'Building Approval Plans',
      'Possession Certificate',
      'NOC from Society/Authority'
    ],
    labour: [
      'Employment Contract',
      'Appointment Letter',
      'Salary Slips',
      'Bank Statements',
      'Termination Letter (if applicable)',
      'Performance Appraisals',
      'Correspondence with Employer',
      'Provident Fund Details'
    ],
    litigation: [
      'Original Petition/Plaint',
      'Written Statement/Reply',
      'All Court Orders',
      'Evidence Documents',
      'Witness Statements',
      'Expert Reports',
      'Correspondence',
      'Previous Judgments'
    ],
    military: [
      'Service Records',
      'Appointment Orders',
      'Discharge/Retirement Orders',
      'Pay Slips',
      'Pension Documents',
      'Medical Reports',
      'Court Martial Proceedings (if applicable)',
      'Service Certificates'
    ],
    administrative: [
      'Application Forms',
      'Government Orders',
      'Service Records',
      'Correspondence with Department',
      'Previous Orders/Decisions',
      'Supporting Documents',
      'Affidavits',
      'Certificates'
    ],
    adr: [
      'Arbitration Agreement',
      'Contract/Agreement in Dispute',
      'Correspondence Between Parties',
      'Financial Documents',
      'Evidence of Dispute',
      'Previous Settlement Attempts',
      'Expert Reports',
      'Witness Details'
    ],
    immigration: [
      'Passport',
      'Visa Documents',
      'Travel History',
      'Employment Documents',
      'Educational Certificates',
      'Financial Proof',
      'Sponsorship Documents',
      'Medical Reports'
    ]
  };

  return [...commonDocs, ...(categorySpecificDocs[category] || categorySpecificDocs.civil)];
};

module.exports = { generateDocumentChecklist };
