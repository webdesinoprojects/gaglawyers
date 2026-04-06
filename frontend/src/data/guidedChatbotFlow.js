/**
 * Guided chatbot conversation graph (config-driven).
 * Add/edit nodes here or later load from CMS API with the same shape.
 *
 * Node shape:
 * - id: string (unique)
 * - message: string (assistant bubble text; use \n\n for short paragraphs)
 * - options: ChatOption[]
 * - meta?: { title?: string } for analytics / future CMS
 *
 * ChatOption:
 * - id, label (required)
 * - next?: string (node id)
 * - href?: string (internal route — navigates via React Router)
 * - external?: boolean
 * - tel?: string (e.g. +919996263370)
 * - whatsapp?: true (uses parent handler)
 * - scrollHomeForm?: true (scroll to #book-consultation on /)
 * - restart?: true (clears stack and goes to welcome)
 * - back?: true (pop stack — computed in engine; omit from config)
 */

export const CHATBOT_ROOT_ID = 'welcome';

/** @type {Record<string, import('../types/chatbot').ChatbotNode>} */
export const chatbotNodes = {
  welcome: {
    id: 'welcome',
    message:
      'Welcome to Grover & Grover Advocates (GAG Lawyers).\n\nI can guide you step by step—no need to type. What would you like help with today?',
    options: [
      { id: 'intent_services', label: 'Explore legal services', next: 'services_categories' },
      { id: 'intent_consult', label: 'Book a consultation', next: 'consultation_start' },
      { id: 'intent_contact', label: 'Office & contact details', next: 'contact_hub' },
      { id: 'intent_faq', label: 'Common questions (FAQ)', next: 'faq_hub' },
      { id: 'intent_human', label: 'Talk to a person', next: 'human_escalation' },
    ],
  },

  services_categories: {
    id: 'services_categories',
    message: 'Which area matches your situation best?',
    options: [
      { id: 'cat_criminal', label: 'Criminal law, bail & trial defence', next: 'svc_criminal' },
      { id: 'cat_civil', label: 'Civil disputes & litigation', next: 'svc_civil' },
      { id: 'cat_corp', label: 'Corporate, contracts & compliance', next: 'svc_corporate' },
      { id: 'cat_family', label: 'Family, matrimonial & domestic matters', next: 'svc_family' },
      { id: 'cat_property', label: 'Property, RERA & real estate', next: 'svc_property' },
      { id: 'cat_all', label: 'See full practice areas list', href: '/services', next: 'after_services_link' },
    ],
  },

  svc_criminal: {
    id: 'svc_criminal',
    message:
      'We handle bail (regular & anticipatory), criminal trials, appeals, and related matters before trial courts, High Courts, and the Supreme Court.\n\nYou can read more on our dedicated pages or book a confidential consultation.',
    options: [
      { id: 'cr_bail', label: 'Bail lawyer (Delhi)', href: '/bail-lawyer-in-delhi', next: 'after_deep_link' },
      { id: 'cr_cheque', label: 'Cheque bounce / NI Act', href: '/cheque-bounce-lawyer-in-delhi', next: 'after_deep_link' },
      { id: 'cr_all', label: 'All services — browse', href: '/services', next: 'after_deep_link' },
      { id: 'cr_book', label: 'Book consultation', next: 'consultation_start' },
    ],
  },

  svc_civil: {
    id: 'svc_civil',
    message:
      'Our civil team handles suits, injunctions, recovery, consumer issues, and appellate litigation with a clear strategy and timelines.',
    options: [
      { id: 'cv_page', label: 'Civil lawyer (Delhi)', href: '/civil-lawyer-in-delhi', next: 'after_deep_link' },
      { id: 'cv_contract', label: 'Contract disputes', href: '/contract-lawyer-in-delhi', next: 'after_deep_link' },
      { id: 'cv_all', label: 'Full services list', href: '/services', next: 'after_deep_link' },
      { id: 'cv_book', label: 'Book consultation', next: 'consultation_start' },
    ],
  },

  svc_corporate: {
    id: 'svc_corporate',
    message:
      'We advise on contracts, governance, compliance, disputes, and transactions—suited for businesses that need decisive legal support.',
    options: [
      { id: 'co_page', label: 'Corporate law overview', href: '/corporate-lawyer-in-delhi', next: 'after_deep_link' },
      { id: 'co_all', label: 'All practice areas', href: '/services', next: 'after_deep_link' },
      { id: 'co_book', label: 'Book consultation', next: 'consultation_start' },
    ],
  },

  svc_family: {
    id: 'svc_family',
    message:
      'Sensitive matters—divorce, custody, maintenance, and related proceedings—are handled with discretion and sound legal planning.',
    options: [
      { id: 'fam_page', label: 'Family law services', href: '/divorce-lawyer-in-delhi', next: 'after_deep_link' },
      { id: 'fam_all', label: 'Browse all services', href: '/services', next: 'after_deep_link' },
      { id: 'fam_book', label: 'Book consultation', next: 'consultation_start' },
    ],
  },

  svc_property: {
    id: 'svc_property',
    message:
      'Title diligence, sale/purchase support, RERA disputes, inheritance, and property litigation—we help protect your asset and paperwork.',
    options: [
      { id: 'prop_page', label: 'Property lawyer (Delhi)', href: '/property-lawyer-in-delhi', next: 'after_deep_link' },
      { id: 'prop_rera', label: 'RERA & real estate', href: '/rera-lawyer-in-delhi', next: 'after_deep_link' },
      { id: 'prop_all', label: 'All services', href: '/services', next: 'after_deep_link' },
      { id: 'prop_book', label: 'Book consultation', next: 'consultation_start' },
    ],
  },

  after_services_link: {
    id: 'after_services_link',
    message:
      'Opening the practice areas page for you.\n\nIf you tell us your matter briefly on the contact form, we can route it to the right partner.',
    options: [
      { id: 'as_contact', label: 'Go to contact / enquiry', href: '/contact', next: 'after_deep_link' },
      { id: 'as_home_form', label: 'Use home page booking form', href: '/', scrollHomeForm: true, next: 'after_deep_link' },
      { id: 'as_back', label: 'Back to main menu', next: 'welcome', restart: true },
    ],
  },

  after_deep_link: {
    id: 'after_deep_link',
    message: 'Is there anything else I can help you with?',
    options: [
      { id: 'ad_more', label: 'Explore another topic', next: 'welcome', restart: true },
      { id: 'ad_consult', label: 'Book consultation', next: 'consultation_start' },
      { id: 'ad_human', label: 'Speak with someone', next: 'human_escalation' },
    ],
  },

  consultation_start: {
    id: 'consultation_start',
    message:
      'We offer consultations for new enquiries and ongoing matters. How would you like to take the next step?',
    options: [
      { id: 'cs_form', label: 'Submit enquiry (contact page)', href: '/contact', next: 'consult_followup' },
      {
        id: 'cs_home',
        label: 'Book from home page (quick form)',
        href: '/',
        scrollHomeForm: true,
        next: 'consult_followup',
      },
      { id: 'cs_call', label: 'Call the office', tel: '+919996263370', next: 'human_escalation' },
      { id: 'cs_wa', label: 'Message on WhatsApp', whatsapp: true, next: 'consult_followup' },
    ],
  },

  consult_followup: {
    id: 'consult_followup',
    message:
      'Our team typically responds within one business day for enquiries. For urgent criminal or protective matters, mention urgency in your message or call us directly.',
    options: [
      { id: 'cf_faq', label: 'Read FAQs', next: 'faq_hub' },
      { id: 'cf_menu', label: 'Main menu', next: 'welcome', restart: true },
    ],
  },

  contact_hub: {
    id: 'contact_hub',
    message: 'What contact information do you need?',
    options: [
      { id: 'ch_office', label: 'Office & visiting info', next: 'contact_office' },
      { id: 'ch_hours', label: 'Availability & response time', next: 'contact_hours' },
      { id: 'ch_email', label: 'Email & phone', next: 'contact_direct' },
      { id: 'ch_form', label: 'Send a written enquiry', href: '/contact', next: 'after_deep_link' },
    ],
  },

  contact_office: {
    id: 'contact_office',
    message:
      'Grover & Grover Advocates is based in Delhi, India. For the latest address, suite details, and map links, please visit our Contact page—we keep official details updated there.',
    options: [
      { id: 'co_map', label: 'Open contact page', href: '/contact', next: 'after_deep_link' },
      { id: 'co_back_hub', label: 'Other contact options', next: 'contact_hub' },
    ],
  },

  contact_hours: {
    id: 'contact_hours',
    message:
      'We generally respond to enquiries within one business day. Court days and hearings may affect immediate availability—calling is best for time-sensitive matters.',
    options: [
      { id: 'ch_call2', label: 'Call now', tel: '+919996263370', next: 'human_escalation' },
      { id: 'ch_back', label: 'Back', next: 'contact_hub' },
    ],
  },

  contact_direct: {
    id: 'contact_direct',
    message:
      'You can email contact@gaglawyers.com or call +91-9996263370 (replace with your published numbers if different on the site).\n\nWhatsApp may also be available from the buttons on this page.',
    options: [
      { id: 'cd_call', label: 'Call', tel: '+919996263370', next: 'after_deep_link' },
      { id: 'cd_wa', label: 'WhatsApp', whatsapp: true, next: 'after_deep_link' },
      { id: 'cd_back', label: 'Back', next: 'contact_hub' },
    ],
  },

  faq_hub: {
    id: 'faq_hub',
    message: 'Choose a topic. This is general information only—not legal advice for your specific case.',
    options: [
      { id: 'fq_fees', label: 'Fees & retainers', next: 'faq_fees' },
      { id: 'fq_areas', label: 'Do you handle my type of case?', next: 'faq_areas' },
      { id: 'fq_docs', label: 'What should I bring to a consult?', next: 'faq_docs' },
      { id: 'fq_priv', label: 'Privacy & disclaimer', next: 'faq_disclaimer' },
      { id: 'fq_menu', label: 'Main menu', next: 'welcome', restart: true },
    ],
  },

  faq_fees: {
    id: 'faq_fees',
    message:
      'Fee structures depend on the forum, complexity, and stage of the matter. After understanding your brief, we explain options (e.g. lump sum, staged billing) transparently.',
    options: [
      { id: 'ff_book', label: 'Request a consultation', next: 'consultation_start' },
      { id: 'ff_back', label: 'More FAQ topics', next: 'faq_hub' },
    ],
  },

  faq_areas: {
    id: 'faq_areas',
    message:
      'We cover a wide range of civil, criminal, corporate, property, and regulatory matters. If you are unsure, choose “Explore legal services” or send a short summary via the contact form.',
    options: [
      { id: 'fa_svc', label: 'Explore services', next: 'services_categories' },
      { id: 'fa_form', label: 'Contact form', href: '/contact', next: 'after_deep_link' },
      { id: 'fa_back', label: 'More FAQ topics', next: 'faq_hub' },
    ],
  },

  faq_docs: {
    id: 'faq_docs',
    message:
      'Bring ID, timeline notes, key documents (notices, contracts, orders), and a concise list of questions. For ongoing litigation, carry the latest pleadings and court dates.',
    options: [
      { id: 'fd_book', label: 'Book consultation', next: 'consultation_start' },
      { id: 'fd_back', label: 'More FAQ topics', next: 'faq_hub' },
    ],
  },

  faq_disclaimer: {
    id: 'faq_disclaimer',
    message:
      'This chatbot provides general guidance only. No attorney–client relationship is formed through this tool. For advice on your situation, consult a qualified advocate at our firm.',
    options: [
      { id: 'fdis_priv', label: 'Privacy policy', href: '/privacy', next: 'after_deep_link' },
      { id: 'fdis_terms', label: 'Terms of use', href: '/terms', next: 'after_deep_link' },
      { id: 'fdis_back', label: 'FAQ menu', next: 'faq_hub' },
    ],
  },

  human_escalation: {
    id: 'human_escalation',
    message:
      "I will connect you with ways to reach our team directly. Choose the option that works best for you.",
    options: [
      { id: 'he_call', label: 'Call the office', tel: '+919996263370', next: 'after_human_channel' },
      { id: 'he_wa', label: 'WhatsApp', whatsapp: true, next: 'after_human_channel' },
      { id: 'he_contact', label: 'Contact / enquiry page', href: '/contact', next: 'after_deep_link' },
      { id: 'he_restart', label: 'Start over', next: 'welcome', restart: true },
    ],
  },

  /** Fallback if an unknown node is requested */
  after_human_channel: {
    id: 'after_human_channel',
    message: 'If you need anything else, you can continue here or start fresh from the main menu.',
    options: [
      { id: 'ahc_menu', label: 'Main menu', next: 'welcome', restart: true },
      { id: 'ahc_faq', label: 'FAQs', next: 'faq_hub' },
    ],
  },

  fallback: {
    id: 'fallback',
    message:
      "Something went off track. Let's restart from the beginning—or go straight to our contact page.",
    options: [
      { id: 'fb_restart', label: 'Start over', next: 'welcome', restart: true },
      { id: 'fb_contact', label: 'Contact page', href: '/contact', next: 'after_deep_link' },
    ],
  },
};

/** @param {string} id */
export function getChatbotNode(id) {
  return chatbotNodes[id] || chatbotNodes.fallback;
}

/**
 * Export intents map for future CMS / analytics (keyword → entry node).
 * @type {Record<string, string>}
 */
export const chatbotIntentEntry = {
  services: 'services_categories',
  consultation: 'consultation_start',
  contact: 'contact_hub',
  faq: 'faq_hub',
  human: 'human_escalation',
};
