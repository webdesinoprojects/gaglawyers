import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionRenderer from '../components/sections/SectionRenderer';
import API_BASE_URL from '../config/api';

const SERVICE_SEO_OVERRIDES = {
  'agreement-to-sell': {
    title: 'Agreement to Sell - GAG Lawyers',
    description:
      'GAG Lawyers offers comprehensive Agreement to Sell services, ensuring smooth and legally sound transactions. Contact us for assistance!',
    ogTitle: 'Agreement to Sell Services by GAG Lawyers - Expert Help',
    ogDescription:
      'GAG Lawyers offers comprehensive Agreement to Sell services, ensuring smooth and legally sound transactions. Contact us for assistance!',
    keywords:
      'agreement to sell property, draft agreement to sell property, lawyer for agreement to sell property, agreement to sell flat, agreement to sell format, agreement to sell vehicle',
    canonical: 'https://www.gaglawyers.com/agreement-to-sell/',
  },
  'bail-lawyer': {
    title: 'Bail Lawyer - Grover & Grover Advocates',
    description:
      'Bail Lawyer - Grover & Grover Advocates Bail is a legal agreement that allows an individual accused of a crime to be released.',
    ogTitle: 'Bail Lawyer - Grover & Grover Advocates',
    ogDescription:
      'Bail Lawyer - Grover & Grover Advocates Bail is a legal agreement that allows an individual accused of a crime to be released.',
    keywords: 'Bail Lawyer',
    canonical: 'https://www.gaglawyers.com/bail-lawyer/',
  },
  'immigration-lawyer': {
    title: 'Immigration Lawyer - Grover & Grover Advocates',
    description:
      'Immigration Lawyer - Grover & Grover Advocates providing legal advice and representation on a range of immigration issues.',
    ogTitle: 'Immigration Lawyer - Grover & Grover Advocates',
    ogDescription:
      'Immigration Lawyer - Grover & Grover Advocates providing legal advice and representation on a range of immigration issues.',
    keywords: 'Immigration Lawyer',
    canonical: 'https://www.gaglawyers.com/immigration-lawyer/',
  },
  'employment-lawyer': {
    title: 'Employment Lawyer - Grover & Grover Advocates',
    description:
      'Employment Lawyer - Grover & Grover Advocates give legal advice and representation to employees on a range of workplace issues.',
    ogTitle: 'Employment Lawyer - Grover & Grover Advocates',
    ogDescription:
      'Employment Lawyer - Grover & Grover Advocates give legal advice and representation to employees on a range of workplace issues.',
    keywords: 'Employment Lawyer',
    canonical: 'https://www.gaglawyers.com/employment-lawyer/',
  },
  'court-marriage-lawyer': {
    title: 'Court Marriage Lawyer - Grover & Grover Advocates',
    description:
      'Court Marriage Lawyer - Grover & Grover Advocates legal professional of assisting couples with getting married in a court.',
    ogTitle: 'Court Marriage Lawyer - Grover & Grover Advocates',
    ogDescription:
      'Court Marriage Lawyer - Grover & Grover Advocates legal professional of assisting couples with getting married in a court.',
    keywords: 'Court Marriage Lawyer',
    canonical: 'https://www.gaglawyers.com/court-marriage-lawyer/',
  },
  'labour-lawyer': {
    title: 'Labour Lawyer - Grover & Grover Advocates',
    description:
      'Labour Lawyer - Grover & Grover Advocates providing legal Services on a range of labour and employment issues.',
    ogTitle: 'Labour Lawyer - Grover & Grover Advocates',
    ogDescription:
      'Labour Lawyer - Grover & Grover Advocates providing legal Services on a range of labour and employment issues.',
    keywords: 'Labour Lawyer',
    canonical: 'https://www.gaglawyers.com/labour-lawyer/',
  },
  'human-rights-lawyer': {
    title: 'Human Rights Lawyer - GAG Lawyers',
    description:
      'Human Rights Lawyer - Grover & Grover Advocate provide legal advice and service to individual whose human rights have been violated.',
    ogTitle: 'Human Rights Lawyer - GAG Lawyers',
    ogDescription:
      'Human Rights Lawyer - Grover & Grover Advocate provide legal advice and service to individual whose human rights have been violated.',
    keywords: 'Human Rights Lawyer',
    canonical: 'https://www.gaglawyers.com/human-rights-lawyer/',
  },
  'contract-lawyer': {
    title: 'Contract Lawyer - GAG Lawyers',
    description:
      'Contract Lawyer - Grover & Grover Advocates Contract law the formation and enforcement of agreements between Parties etc.',
    ogTitle: 'Contract Lawyer - GAG Lawyers',
    ogDescription:
      'Contract Lawyer - Grover & Grover Advocates Contract law the formation and enforcement of agreements between Parties etc.',
    keywords: 'Contract Lawyer',
    canonical: 'https://www.gaglawyers.com/contract-lawyer/',
  },
  'criminal-lawyer': {
    title: 'Criminal Lawyer - GAG Lawyers',
    description:
      'Criminal Lawyer - Grover & Grover Advocates provide legal advice and representation in criminal matters.',
    ogTitle: 'Criminal Lawyer - GAG Lawyers',
    ogDescription:
      'Criminal Lawyer - Grover & Grover Advocates provide legal advice and representation in criminal matters.',
    keywords: 'Criminal Lawyer',
    canonical: 'https://www.gaglawyers.com/criminal-lawyer/',
  },
  'cheque-bounce-lawyer': {
    title: 'Cheque Bounce Lawyer - GAG Lawyers',
    description:
      'Cheque Bounce Lawyer - Grover & Grover Advocates provide legal advice and representation in cheque bounce matters.',
    ogTitle: 'Cheque Bounce Lawyer - GAG Lawyers',
    ogDescription:
      'Cheque Bounce Lawyer - Grover & Grover Advocates provide legal advice and representation in cheque bounce matters.',
    keywords: 'Cheque Bounce Lawyer',
    canonical: 'https://www.gaglawyers.com/cheque-bounce-lawyer/',
  },
  'family-lawyer': {
    title: 'Family Lawyer - GAG Lawyers',
    description:
      'Family Lawyer - Grover & Grover Advocates provide legal advice and representation in family law matters.',
    ogTitle: 'Family Lawyer - GAG Lawyers',
    ogDescription:
      'Family Lawyer - Grover & Grover Advocates provide legal advice and representation in family law matters.',
    keywords: 'Family Lawyer',
    canonical: 'https://www.gaglawyers.com/family-lawyer/',
  },
  'civil-lawyer': {
    title: 'Civil Lawyer - GAG Lawyers',
    description: 'Civil Lawyer - Grover & Grover Advocates provide legal advice and representation in civil matters.',
    ogTitle: 'Civil Lawyer - GAG Lawyers',
    ogDescription:
      'Civil Lawyer - Grover & Grover Advocates provide legal advice and representation in civil matters.',
    keywords: 'Civil Lawyer',
    canonical: 'https://www.gaglawyers.com/civil-lawyer/',
  },
  'mediation-and-arbitration-lawyer': {
    title: 'Mediation and Arbitration Lawyer - GAG Lawyers',
    description:
      'Mediation and Arbitration Lawyer - Grover & Grover Advocates provide legal advice and representation in ADR matters.',
    ogTitle: 'Mediation and Arbitration Lawyer - GAG Lawyers',
    ogDescription:
      'Mediation and Arbitration Lawyer - Grover & Grover Advocates provide legal advice and representation in ADR matters.',
    keywords: 'Mediation and Arbitration Lawyer',
    canonical: 'https://www.gaglawyers.com/mediation-and-arbitration-lawyer/',
  },
  'corporate-lawyer': {
    title: 'Corporate Lawyer - GAG Lawyers',
    description:
      'Corporate Lawyer - Grover & Grover Advocates provide legal advice and representation in corporate law matters.',
    ogTitle: 'Corporate Lawyer - GAG Lawyers',
    ogDescription:
      'Corporate Lawyer - Grover & Grover Advocates provide legal advice and representation in corporate law matters.',
    keywords: 'Corporate Lawyer',
    canonical: 'https://www.gaglawyers.com/corporate-lawyer/',
  },
  'child-custody-lawyer': {
    title: 'Child Custody Lawyer - GAG Lawyers',
    description:
      'Child Custody Lawyer - Grover & Grover Advocates provide legal advice and representation in child custody matters.',
    ogTitle: 'Child Custody Lawyer - GAG Lawyers',
    ogDescription:
      'Child Custody Lawyer - Grover & Grover Advocates provide legal advice and representation in child custody matters.',
    keywords: 'Child Custody Lawyer',
    canonical: 'https://www.gaglawyers.com/child-custody-lawyer/',
  },
  'sports-lawyer': {
    title: 'Sports Lawyer - GAG Lawyers',
    description:
      'Sports Lawyer - Grover & Grover Advocates provide legal advice and representation in sports law matters.',
    ogTitle: 'Sports Lawyer - GAG Lawyers',
    ogDescription:
      'Sports Lawyer - Grover & Grover Advocates provide legal advice and representation in sports law matters.',
    keywords: 'Sports Lawyer',
    canonical: 'https://www.gaglawyers.com/sports-lawyer/',
  },
  'food-and-drug-lawyer': {
    title: 'Food and Drug Lawyer - GAG Lawyers',
    description:
      'Food and Drug Lawyer - Grover & Grover Advocates provide legal advice and representation in food and drug law matters.',
    ogTitle: 'Food and Drug Lawyer - GAG Lawyers',
    ogDescription:
      'Food and Drug Lawyer - Grover & Grover Advocates provide legal advice and representation in food and drug law matters.',
    keywords: 'Food and Drug Lawyer',
    canonical: 'https://www.gaglawyers.com/food-drug-lawyer/',
  },
  'food-drug-lawyer': {
    title: 'Food and Drug Lawyer - GAG Lawyers',
    description:
      'Food and Drug Lawyer - Grover & Grover Advocates provide legal advice and representation in food and drug law matters.',
    ogTitle: 'Food and Drug Lawyer - GAG Lawyers',
    ogDescription:
      'Food and Drug Lawyer - Grover & Grover Advocates provide legal advice and representation in food and drug law matters.',
    keywords: 'Food and Drug Lawyer',
    canonical: 'https://www.gaglawyers.com/food-drug-lawyer/',
  },
  'cat-matters-lawyer': {
    title: 'CAT Matters Lawyer - GAG Lawyers',
    description:
      'CAT Matters Lawyer - Grover & Grover Advocates provide legal advice and representation in CAT matters.',
    ogTitle: 'CAT Matters Lawyer - GAG Lawyers',
    ogDescription:
      'CAT Matters Lawyer - Grover & Grover Advocates provide legal advice and representation in CAT matters.',
    keywords: 'CAT Matters Lawyer',
    canonical: 'https://www.gaglawyers.com/cat-matters-lawyer/',
  },
  'dowry-lawyer': {
    title: 'Dowry Lawyer - GAG Lawyers',
    description:
      'Dowry Lawyer - Grover & Grover Advocates provide legal advice and representation in dowry matters.',
    ogTitle: 'Dowry Lawyer - GAG Lawyers',
    ogDescription:
      'Dowry Lawyer - Grover & Grover Advocates provide legal advice and representation in dowry matters.',
    keywords: 'Dowry Lawyer',
    canonical: 'https://www.gaglawyers.com/dowry-lawyer/',
  },
  'media-and-broadcasting-lawyer': {
    title: 'Media and Broadcasting Lawyer - GAG Lawyers',
    description:
      'Media and Broadcasting Lawyer - Grover & Grover Advocates provide legal advice and representation in media law matters.',
    ogTitle: 'Media and Broadcasting Lawyer - GAG Lawyers',
    ogDescription:
      'Media and Broadcasting Lawyer - Grover & Grover Advocates provide legal advice and representation in media law matters.',
    keywords: 'Media and Broadcasting Lawyer',
    canonical: 'https://www.gaglawyers.com/media-and-broadcasting-lawyer/',
  },
  'environment-lawyer': {
    title: 'Environment Lawyer - GAG Lawyers',
    description:
      'Environment Lawyer - Grover & Grover Advocates provide legal advice and representation in environmental law matters.',
    ogTitle: 'Environment Lawyer - GAG Lawyers',
    ogDescription:
      'Environment Lawyer - Grover & Grover Advocates provide legal advice and representation in environmental law matters.',
    keywords: 'Environment Lawyer',
    canonical: 'https://www.gaglawyers.com/environment-lawyer/',
  },
  'military-lawyer': {
    title: 'Military Lawyer - GAG Lawyers',
    description:
      'Military Lawyer - Grover & Grover Advocates provide legal advice and representation in military law matters.',
    ogTitle: 'Military Lawyer - GAG Lawyers',
    ogDescription:
      'Military Lawyer - Grover & Grover Advocates provide legal advice and representation in military law matters.',
    keywords: 'Military Lawyer',
    canonical: 'https://www.gaglawyers.com/military-lawyer/',
  },
  'sexual-harassment-lawyer': {
    title: 'Sexual Harassment Lawyer - GAG Lawyers',
    description:
      'Sexual Harassment Lawyer - Grover & Grover Advocates provide legal advice and representation in harassment matters.',
    ogTitle: 'Sexual Harassment Lawyer - GAG Lawyers',
    ogDescription:
      'Sexual Harassment Lawyer - Grover & Grover Advocates provide legal advice and representation in harassment matters.',
    keywords: 'Sexual Harassment Lawyer',
    canonical: 'https://www.gaglawyers.com/sexual-harassment-lawyer/',
  },
  'insolvency-bankruptcy-lawyer': {
    title: 'Insolvency Bankruptcy Lawyer - GAG Lawyers',
    description:
      'Insolvency Bankruptcy Lawyer - Grover & Grover Advocates provide legal advice and representation in insolvency matters.',
    ogTitle: 'Insolvency Bankruptcy Lawyer - GAG Lawyers',
    ogDescription:
      'Insolvency Bankruptcy Lawyer - Grover & Grover Advocates provide legal advice and representation in insolvency matters.',
    keywords: 'Insolvency Bankruptcy Lawyer',
    canonical: 'https://www.gaglawyers.com/insolvency-bankruptcy-lawyer/',
  },
  'divorce-lawyer': {
    title: 'Divorce Lawyer - GAG Lawyers',
    description:
      'Divorce Lawyer - Grover & Grover Advocates provide legal advice and representation in divorce matters.',
    ogTitle: 'Divorce Lawyer - GAG Lawyers',
    ogDescription:
      'Divorce Lawyer - Grover & Grover Advocates provide legal advice and representation in divorce matters.',
    keywords: 'Divorce Lawyer',
    canonical: 'https://www.gaglawyers.com/divorce-lawyer/',
  },
  'consumer-court-lawyer': {
    title: 'Consumer Court Lawyer - GAG Lawyers',
    description:
      'Consumer Court Lawyer - Grover & Grover Advocates provide legal advice and representation in consumer disputes.',
    ogTitle: 'Consumer Court Lawyer - GAG Lawyers',
    ogDescription:
      'Consumer Court Lawyer - Grover & Grover Advocates provide legal advice and representation in consumer disputes.',
    keywords: 'Consumer Court Lawyer',
    canonical: 'https://www.gaglawyers.com/consumer-court-lawyer/',
  },
  'high-court-lawyer': {
    title: 'High Court Lawyer - GAG Lawyers',
    description:
      'High Court Lawyer - Grover & Grover Advocates provide legal advice and representation in High Court matters.',
    ogTitle: 'High Court Lawyer - GAG Lawyers',
    ogDescription:
      'High Court Lawyer - Grover & Grover Advocates provide legal advice and representation in High Court matters.',
    keywords: 'High Court Lawyer',
    canonical: 'https://www.gaglawyers.com/high-court-lawyer/',
  },
  'supreme-court-lawyer': {
    title: 'Supreme Court Lawyer - GAG Lawyers',
    description:
      'Supreme Court Lawyer - Grover & Grover Advocates provide legal advice and representation in Supreme Court matters.',
    ogTitle: 'Supreme Court Lawyer - GAG Lawyers',
    ogDescription:
      'Supreme Court Lawyer - Grover & Grover Advocates provide legal advice and representation in Supreme Court matters.',
    keywords: 'Supreme Court Lawyer',
    canonical: 'https://www.gaglawyers.com/supreme-court-lawyer/',
  },
  'property-lawyer': {
    title: 'Property Lawyer - GAG Lawyers',
    description:
      'Property Lawyer - Grover & Grover Advocates provide legal advice and representation in property law matters.',
    ogTitle: 'Property Lawyer - GAG Lawyers',
    ogDescription:
      'Property Lawyer - Grover & Grover Advocates provide legal advice and representation in property law matters.',
    keywords: 'Property Lawyer',
    canonical: 'https://www.gaglawyers.com/property-lawyer/',
  },
  'muslim-lawyer': {
    title: 'Muslim Lawyer - GAG Lawyers',
    description: 'Muslim Lawyer - Grover & Grover Advocates provide legal advice and representation in personal law matters.',
    ogTitle: 'Muslim Lawyer - GAG Lawyers',
    ogDescription:
      'Muslim Lawyer - Grover & Grover Advocates provide legal advice and representation in personal law matters.',
    keywords: 'Muslim Lawyer',
    canonical: 'https://www.gaglawyers.com/muslim-lawyer/',
  },
  'motor-accident-lawyer': {
    title: 'Motor Accident Lawyer - GAG Lawyers',
    description:
      'Motor Accident Lawyer - Grover & Grover Advocates provide legal advice and representation in MACT and accident claims.',
    ogTitle: 'Motor Accident Lawyer - GAG Lawyers',
    ogDescription:
      'Motor Accident Lawyer - Grover & Grover Advocates provide legal advice and representation in MACT and accident claims.',
    keywords: 'Motor Accident Lawyer',
    canonical: 'https://www.gaglawyers.com/motor-accident-lawyer/',
  },
  'medical-negligence-lawyer': {
    title: 'Medical Negligence Lawyer - GAG Lawyers',
    description:
      'Medical Negligence Lawyer - Grover & Grover Advocates provide legal advice and representation in medical negligence cases.',
    ogTitle: 'Medical Negligence Lawyer - GAG Lawyers',
    ogDescription:
      'Medical Negligence Lawyer - Grover & Grover Advocates provide legal advice and representation in medical negligence cases.',
    keywords: 'Medical Negligence Lawyer',
    canonical: 'https://www.gaglawyers.com/medical-negligence-lawyer/',
  },
  'marriage-registration-lawyer': {
    title: 'Marriage Registration Lawyer - GAG Lawyers',
    description:
      'Marriage Registration Lawyer - Grover & Grover Advocates provide legal advice and representation in marriage registration matters.',
    ogTitle: 'Marriage Registration Lawyer - GAG Lawyers',
    ogDescription:
      'Marriage Registration Lawyer - Grover & Grover Advocates provide legal advice and representation in marriage registration matters.',
    keywords: 'Marriage Registration Lawyer',
    canonical: 'https://www.gaglawyers.com/marriage-registration-lawyer/',
  },
  'will-lawyer': {
    title: 'Will Lawyer - GAG Lawyers',
    description:
      'Will Lawyer - Grover & Grover Advocates provide legal advice and representation in will drafting and succession matters.',
    ogTitle: 'Will Lawyer - GAG Lawyers',
    ogDescription:
      'Will Lawyer - Grover & Grover Advocates provide legal advice and representation in will drafting and succession matters.',
    keywords: 'Will Lawyer',
    canonical: 'https://www.gaglawyers.com/will-lawyer/',
  },
  'landlord-tenant-lawyer': {
    title: 'Landlord Tenant Lawyer - GAG Lawyers',
    description:
      'Landlord Tenant Lawyer - Grover & Grover Advocates provide legal advice and representation in tenancy disputes.',
    ogTitle: 'Landlord Tenant Lawyer - GAG Lawyers',
    ogDescription:
      'Landlord Tenant Lawyer - Grover & Grover Advocates provide legal advice and representation in tenancy disputes.',
    keywords: 'Landlord Tenant Lawyer',
    canonical: 'https://www.gaglawyers.com/landlord-tenant-lawyer/',
  },
  'insurance-lawyer': {
    title: 'Insurance Lawyer - GAG Lawyers',
    description:
      'Insurance Lawyer - Grover & Grover Advocates provide legal advice and representation in insurance claim disputes.',
    ogTitle: 'Insurance Lawyer - GAG Lawyers',
    ogDescription:
      'Insurance Lawyer - Grover & Grover Advocates provide legal advice and representation in insurance claim disputes.',
    keywords: 'Insurance Lawyer',
    canonical: 'https://www.gaglawyers.com/insurance-lawyer/',
  },
  'cyber-crime-lawyer': {
    title: 'Cyber Crime Lawyer - GAG Lawyers',
    description:
      'Cyber Crime Lawyer - Grover & Grover Advocates provide legal advice and representation in cyber crime matters.',
    ogTitle: 'Cyber Crime Lawyer - GAG Lawyers',
    ogDescription:
      'Cyber Crime Lawyer - Grover & Grover Advocates provide legal advice and representation in cyber crime matters.',
    keywords: 'Cyber Crime Lawyer',
    canonical: 'https://www.gaglawyers.com/cyber-crime-lawyer/',
  },
  'armed-force-tribunal-lawyer': {
    title: 'Armed Force Tribunal Lawyer - GAG Lawyers',
    description:
      'Armed Force Tribunal Lawyer - Grover & Grover Advocates provide legal advice and representation in AFT matters.',
    ogTitle: 'Armed Force Tribunal Lawyer - GAG Lawyers',
    ogDescription:
      'Armed Force Tribunal Lawyer - Grover & Grover Advocates provide legal advice and representation in AFT matters.',
    keywords: 'Armed Force Tribunal Lawyer',
    canonical: 'https://www.gaglawyers.com/armed-force-tribunal-lawyer/',
  },
  'right-to-information-lawyer': {
    title: 'Right To Information Lawyer - GAG Lawyers',
    description:
      'Right To Information Lawyer - Grover & Grover Advocates provide legal advice and representation in RTI matters.',
    ogTitle: 'Right To Information Lawyer - GAG Lawyers',
    ogDescription:
      'Right To Information Lawyer - Grover & Grover Advocates provide legal advice and representation in RTI matters.',
    keywords: 'Right To Information Lawyer',
    canonical: 'https://www.gaglawyers.com/right-to-information-lawyer/',
  },
  'firearms-lawyer': {
    title: 'Firearms Lawyer - GAG Lawyers',
    description:
      'Firearms Lawyer - Grover & Grover Advocates provide legal advice and representation in firearms law matters.',
    ogTitle: 'Firearms Lawyer - GAG Lawyers',
    ogDescription:
      'Firearms Lawyer - Grover & Grover Advocates provide legal advice and representation in firearms law matters.',
    keywords: 'Firearms Lawyer',
    canonical: 'https://www.gaglawyers.com/firearms-lawyer/',
  },
  'writ-petition-lawyer': {
    title: 'Writ Petition Lawyer - GAG Lawyers',
    description:
      'Writ Petition Lawyer - Grover & Grover Advocates provide legal advice and representation in writ matters.',
    ogTitle: 'Writ Petition Lawyer - GAG Lawyers',
    ogDescription:
      'Writ Petition Lawyer - Grover & Grover Advocates provide legal advice and representation in writ matters.',
    keywords: 'Writ Petition Lawyer',
    canonical: 'https://www.gaglawyers.com/writ-petition-lawyer/',
  },
  'debt-recovery-lawyer-drt-lawyer': {
    title: 'Debt Recovery Lawyer (DRT Lawyer) - GAG Lawyers',
    description:
      'Debt Recovery Lawyer (DRT Lawyer) - Grover & Grover Advocates provide legal advice and representation in DRT matters.',
    ogTitle: 'Debt Recovery Lawyer (DRT Lawyer) - GAG Lawyers',
    ogDescription:
      'Debt Recovery Lawyer (DRT Lawyer) - Grover & Grover Advocates provide legal advice and representation in DRT matters.',
    keywords: 'Debt Recovery Lawyer (DRT Lawyer)',
    canonical: 'https://www.gaglawyers.com/debt-recovery-lawyer-drt-lawyer/',
  },
  'smc-certificate': {
    title: 'SMC Certificate - GAG Lawyers',
    description:
      'SMC Certificate - Grover & Grover Advocates provide legal advice and support for SMC certificate matters.',
    ogTitle: 'SMC Certificate - GAG Lawyers',
    ogDescription:
      'SMC Certificate - Grover & Grover Advocates provide legal advice and support for SMC certificate matters.',
    keywords: 'SMC Certificate',
    canonical: 'https://www.gaglawyers.com/smc-certificate/',
  },
  'legal-notice': {
    title: 'Legal Notice - GAG Lawyers',
    description:
      'Legal Notice - Grover & Grover Advocates provide legal advice and representation for legal notice drafting and replies.',
    ogTitle: 'Legal Notice - GAG Lawyers',
    ogDescription:
      'Legal Notice - Grover & Grover Advocates provide legal advice and representation for legal notice drafting and replies.',
    keywords: 'Legal Notice',
    canonical: 'https://www.gaglawyers.com/legal-notice/',
  },
  'legal-notice-lawyer': {
    title: 'Legal Notice - GAG Lawyers',
    description:
      'Legal Notice - Grover & Grover Advocates provide legal advice and representation for legal notice drafting and replies.',
    ogTitle: 'Legal Notice - GAG Lawyers',
    ogDescription:
      'Legal Notice - Grover & Grover Advocates provide legal advice and representation for legal notice drafting and replies.',
    keywords: 'Legal Notice',
    canonical: 'https://www.gaglawyers.com/legal-notice/',
  },
  'succession-certificate': {
    title: 'Succession Certificate - GAG Lawyers',
    description:
      'Succession Certificate - Grover & Grover Advocates provide legal advice and representation in succession certificate matters.',
    ogTitle: 'Succession Certificate - GAG Lawyers',
    ogDescription:
      'Succession Certificate - Grover & Grover Advocates provide legal advice and representation in succession certificate matters.',
    keywords: 'Succession Certificate',
    canonical: 'https://www.gaglawyers.com/succession-certificate/',
  },
  'memorandum-of-understanding-mou': {
    title: 'Memorandum of Understanding MOU - GAG Lawyers',
    description:
      'Memorandum of Understanding MOU - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'Memorandum of Understanding MOU - GAG Lawyers',
    ogDescription:
      'Memorandum of Understanding MOU - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'Memorandum of Understanding MOU',
    canonical: 'https://www.gaglawyers.com/memorandum-of-understanding-mou/',
  },
  'leave-and-license-agreement': {
    title: 'Leave and License Agreement - GAG Lawyers',
    description:
      'Leave and License Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'Leave and License Agreement - GAG Lawyers',
    ogDescription:
      'Leave and License Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'Leave and License Agreement',
    canonical: 'https://www.gaglawyers.com/leave-and-license-agreement/',
  },
  'sale-deed': {
    title: 'Sale Deed - GAG Lawyers',
    description: 'Sale Deed - Grover & Grover Advocates provide legal advice and support for sale deed matters.',
    ogTitle: 'Sale Deed - GAG Lawyers',
    ogDescription:
      'Sale Deed - Grover & Grover Advocates provide legal advice and support for sale deed matters.',
    keywords: 'Sale Deed',
    canonical: 'https://www.gaglawyers.com/sale-deed/',
  },
  'rent-agreement': {
    title: 'Rent Agreement - GAG Lawyers',
    description: 'Rent Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'Rent Agreement - GAG Lawyers',
    ogDescription: 'Rent Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'Rent Agreement',
    canonical: 'https://www.gaglawyers.com/rent-agreement/',
  },
  'employment-agreement': {
    title: 'Employment Agreement - GAG Lawyers',
    description: 'Employment Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'Employment Agreement - GAG Lawyers',
    ogDescription: 'Employment Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'Employment Agreement',
    canonical: 'https://www.gaglawyers.com/employment-agreement/',
  },
  'non-disclosure-agreement': {
    title: 'Non-disclosure Agreement - GAG Lawyers',
    description: 'Non-disclosure Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'Non-disclosure Agreement - GAG Lawyers',
    ogDescription: 'Non-disclosure Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'Non-disclosure Agreement',
    canonical: 'https://www.gaglawyers.com/non-disclosure-agreement/',
  },
  'loan-agreement': {
    title: 'Loan Agreement - GAG Lawyers',
    description: 'Loan Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'Loan Agreement - GAG Lawyers',
    ogDescription: 'Loan Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'Loan Agreement',
    canonical: 'https://www.gaglawyers.com/loan-agreement/',
  },
  'rera-registration': {
    title: 'RERA Registration - GAG Lawyers',
    description: 'RERA Registration - Grover & Grover Advocates provide legal advice and compliance support.',
    ogTitle: 'RERA Registration - GAG Lawyers',
    ogDescription: 'RERA Registration - Grover & Grover Advocates provide legal advice and compliance support.',
    keywords: 'RERA Registration',
    canonical: 'https://www.gaglawyers.com/rera-registration/',
  },
  'franchise-agreement': {
    title: 'Franchise Agreement - GAG Lawyers',
    description: 'Franchise Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'Franchise Agreement - GAG Lawyers',
    ogDescription: 'Franchise Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'Franchise Agreement',
    canonical: 'https://www.gaglawyers.com/franchise-agreement/',
  },
  'partnership-deed': {
    title: 'Partnership Deed - GAG Lawyers',
    description: 'Partnership Deed - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'Partnership Deed - GAG Lawyers',
    ogDescription: 'Partnership Deed - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'Partnership Deed',
    canonical: 'https://www.gaglawyers.com/partnership-deed/',
  },
  'ip-license-agreement': {
    title: 'IP License Agreement - GAG Lawyers',
    description: 'IP License Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    ogTitle: 'IP License Agreement - GAG Lawyers',
    ogDescription: 'IP License Agreement - Grover & Grover Advocates provide legal advice and drafting support.',
    keywords: 'IP License Agreement',
    canonical: 'https://www.gaglawyers.com/ip-license-agreement/',
  },
};


/**
 * Dynamic Service Page - Fetches content from database
 * Renders only visible sections, sorted by order
 */
const ServicePageDynamic = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stripDelhiSuffix = (value = '') =>
    String(value)
      .replace(/\s+in\s+delhi\b/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/services/${slug}`);
        const data = await response.json();

        if (data.success) {
          setService(data.data);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#c9a84c] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-sans">Loading service...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="mb-4 font-serif text-2xl font-bold text-[#1a2744] md:text-4xl">
            Service Not Found
          </h1>
          <p className="text-gray-600 mb-6">{error || 'The service you are looking for does not exist.'}</p>
          <Link
            to="/services"
            className="inline-block px-6 py-3 bg-[#c9a84c] text-[#1a2744] font-sans font-bold rounded-lg hover:bg-[#b89840] transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  const displayServiceName = stripDelhiSuffix(service?.name || '');
  const seoTitle = stripDelhiSuffix(
    service?.seo?.title || `${displayServiceName || service?.name} | Grover & Grover Advocates`
  );
  const seoDescription =
    service?.seo?.metaDescription ||
    service?.seo?.description ||
    `Get reliable legal support from Grover & Grover Advocates for ${displayServiceName.toLowerCase() || 'legal matters'}.`;
  const seoKeywords =
    service?.seo?.keywords ||
    `${displayServiceName || service?.name}, ${displayServiceName || service?.name} lawyer, legal services, Grover and Grover Advocates`;
  const seoOverride = SERVICE_SEO_OVERRIDES[slug] || null;
  const finalSeoTitle = seoOverride?.title || seoTitle;
  const finalSeoDescription = seoOverride?.description || seoDescription;
  const finalSeoKeywords = seoOverride?.keywords || seoKeywords;
  const finalOgTitle = seoOverride?.ogTitle || finalSeoTitle;
  const finalOgDescription = seoOverride?.ogDescription || finalSeoDescription;
  const finalCanonical = seoOverride?.canonical || '';

  const displaySections = Array.isArray(service?.sections)
    ? service.sections.map((section) => {
        const nextSection = {
          ...section,
          heading: stripDelhiSuffix(section.heading || ''),
        };

        if (section.type === 'hero' && section.content && typeof section.content === 'object') {
          nextSection.content = {
            ...section.content,
            subheading: stripDelhiSuffix(section.content.subheading || ''),
          };
        }

        return nextSection;
      })
    : [];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7f8fb_0%,_#f1f3f7_45%,_#edf0f5_100%)]">
      <SEOHead
        title={finalSeoTitle}
        description={finalSeoDescription}
        keywords={finalSeoKeywords}
        ogTitle={finalOgTitle}
        ogDescription={finalOgDescription}
        canonical={finalCanonical}
      />

      {/* Breadcrumb */}
      <div className="sticky top-0 z-30 border-b border-white/60 bg-white/85 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm font-sans text-slate-600">
            <Link to="/" className="rounded-md p-1 text-slate-500 transition-colors hover:text-[#c9a84c]">
              <Home size={16} />
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <Link to="/services" className="transition-colors hover:text-[#c9a84c]">
              Services
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-[#1a2744]">
              {displayServiceName || service.name}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      {displaySections.length > 0 ? (
        displaySections.map((section, index) => {
          const isHowGroverSection = /how grover/i.test(section?.heading || '');

          if (isHowGroverSection) {
            const teamImageSrc = section?.content?.imageUrl || null;
            const teamImageAlt =
              section?.content?.imageAlt || 'Grover & Grover Advocates team';

            return (
              <div key={section._id} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8">
                <div className={teamImageSrc ? 'section-split' : ''}>
                  <div className={teamImageSrc ? 'section-split__text' : ''}>
                    <SectionRenderer section={section} sectionIndex={index} serviceSlug={slug} />
                  </div>
                  {teamImageSrc && (
                    <div className="section-split__image">
                      <img
                        src={teamImageSrc}
                        alt={teamImageAlt}
                        loading="lazy"
                        style={{ borderRadius: '12px', width: '100%', objectFit: 'cover', maxHeight: '360px' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return <SectionRenderer key={section._id} section={section} sectionIndex={index} serviceSlug={slug} />;
        })
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-600 font-sans">No content available for this service yet.</p>
        </div>
      )}
    </div>
  );
};

export default ServicePageDynamic;
