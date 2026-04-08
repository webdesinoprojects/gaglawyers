/**
 * Default home page section content when API has no data yet.
 * Shape matches what Page Content Manager saves under page `home` → sections.
 */

export const DEFAULT_CAROUSEL_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
    tagline: 'Grover and Grover Advocates and Solicitors',
    heading: 'Precision in Law.',
    headingAccent: 'Excellence in Practice.',
    description:
      "India's premier law firm delivering strategic legal counsel across corporate, litigation, and regulatory matters for over two decades.",
    ctaPrimaryText: 'Book a Consultation',
    ctaPrimaryLink: '/#book-appointment',
    ctaSecondaryText: 'Our Practice Areas',
    ctaSecondaryLink: '/#practice-areas',
  },
  {
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=80',
    tagline: 'Expert Legal Representation',
    heading: 'Your Trusted',
    headingAccent: 'Legal Partners.',
    description:
      'Comprehensive legal solutions tailored to your unique needs. From corporate law to civil litigation, we stand by your side.',
    ctaPrimaryText: 'Book a Consultation',
    ctaPrimaryLink: '/#book-appointment',
    ctaSecondaryText: 'View Services',
    ctaSecondaryLink: '/#practice-areas',
  },
  {
    image: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1920&q=80',
    tagline: 'Proven Track Record',
    heading: '20+ Years of',
    headingAccent: 'Legal Excellence.',
    description:
      'With over 5000 cases won and a 98% success rate, we bring unmatched expertise and dedication to every case.',
    ctaPrimaryText: 'Book a Consultation',
    ctaPrimaryLink: '/#book-appointment',
    ctaSecondaryText: 'Our Achievements',
    ctaSecondaryLink: '/awards',
  },
];

export const DEFAULT_CAROUSEL_TRUST_STRIP = [
  { value: '20+', label: 'Years Experience' },
  { value: '5000+', label: 'Cases Won' },
  { value: '98%', label: 'Success Rate' },
];

export const DEFAULT_WHY_CHOOSE = {
  eyebrow: 'Why GAG Lawyers',
  title: 'Your Trusted Legal Partner',
  subtitle:
    'We combine decades of experience with innovative legal strategies to deliver exceptional results',
  cards: [
    {
      icon: 'Shield',
      title: 'Proven Track Record',
      body: 'Over 5000+ successful cases with a 98% success rate across diverse legal matters',
    },
    {
      icon: 'Users',
      title: 'Expert Team',
      body: 'Highly qualified advocates with specialized expertise in multiple practice areas',
    },
    {
      icon: 'Award',
      title: 'Client-Focused',
      body: "Personalized attention and tailored legal strategies for every client's unique needs",
    },
    {
      icon: 'TrendingUp',
      title: 'Results-Driven',
      body: 'Strategic approach focused on achieving the best possible outcomes for our clients',
    },
  ],
};

export const DEFAULT_HOW_WE_WORK = {
  eyebrow: 'Our Process',
  title: 'How We Work With You',
  subtitle: 'A transparent, systematic approach to delivering exceptional legal services',
  steps: [
    {
      number: '1',
      title: 'Initial Consultation',
      body: 'We listen to your concerns and understand your legal needs in detail',
      variant: 'navy',
    },
    {
      number: '2',
      title: 'Case Analysis',
      body: 'Thorough review of your case with detailed legal research and strategy development',
      variant: 'light',
    },
    {
      number: '3',
      title: 'Action Plan',
      body: 'Clear roadmap with timelines, milestones, and transparent cost structure',
      variant: 'light',
    },
    {
      number: '4',
      title: 'Execution & Results',
      body: 'Dedicated representation with regular updates until successful resolution',
      variant: 'gold',
    },
  ],
};

export const DEFAULT_TEAM_SECTION = {
  eyebrow: 'Our Team',
  title: 'Meet the Legal Minds Behind Our Success',
  subtitle:
    'Led by experienced advocates with decades of combined expertise in diverse legal domains',
  founderBadge: 'Founder',
  badgeA: '20+ Years Experience',
  badgeB: 'Supreme Court Advocate',
  ctaText: 'Know More About Our Team',
};

export const DEFAULT_BLOG_SECTION = {
  eyebrow: 'Legal Insights',
  title: 'Latest from Our Blog',
  subtitle: 'Stay informed with expert legal insights, case studies, and industry updates',
  viewAllText: 'View All Articles',
};

export const DEFAULT_TESTIMONIALS_INTRO = {
  eyebrow: 'Client Success Stories',
};

export const DEFAULT_WHO_WE_ARE = {
  eyebrow: 'Who We Are',
  title: 'A Firm Built on Integrity & Results',
  intro:
    'GAG Lawyers — Grover & Grover Advocates — is a full-service law firm with a decades-long record of representing clients in complex disputes, regulatory matters, and high-stakes litigation.',
  mission:
    'Our mission is to deliver precise, ethical, and business-aware legal counsel while keeping clients informed and empowered at every stage.',
};

export const DEFAULT_OUR_VALUES = {
  eyebrow: 'Our Values',
  title: 'What Guides Us Every Day',
  subtitle: 'Principles that shape how we advise, represent, and partner with clients.',
  cards: [
    { title: 'Integrity', body: 'Transparent advice and steadfast ethical standards in every matter.' },
    { title: 'Excellence', body: 'Rigorous preparation, clear strategy, and disciplined execution.' },
    { title: 'Respect', body: 'We listen first—then advocate with clarity and empathy.' },
    { title: 'Accountability', body: 'Measurable progress, honest timelines, and regular communication.' },
  ],
};

export const DEFAULT_AWARDS_HOME = {
  eyebrow: 'Recognition',
  title: 'Awards & Recognition',
  subtitle: 'Highlights from our journey—honouring excellence in advocacy and client service.',
  viewAllText: 'View all awards',
};

export const DEFAULT_CONSULTATION_CTA = {
  eyebrow: 'Schedule Consultation',
  title: 'Schedule Your Legal Consultation Today',
  subtitle: 'Share your legal issue and preferred time to talk. Our team will respond promptly.',
  submitLabel: 'Request consultation',
  submittingLabel: 'Sending…',
};

export const DEFAULT_CONSULTATION_FORM = {
  title: 'Book Your Consultation',
  subtitle: 'We will contact you within 24 hours',
  placeholders: {
    name: 'Your name',
    email: 'your@email.com',
    phone: 'Your mobile number (with country code)',
    service: 'Select a service',
    description: 'Your legal matter (optional)',
  },
  submitLabel: 'Book appointment',
  submittingLabel: 'Submitting...',
  successMessage:
    'Thank you! Your appointment request has been submitted. We will contact you within 24 hours.',
};

export const DEFAULT_CTA_BAND = {
  eyebrow: 'Get Started Today',
  title: 'Ready to Discuss Your Legal Matter?',
  subtitle:
    'Our experienced legal team is here to provide you with expert guidance and representation. Schedule a consultation to discuss your case and explore your legal options.',
  primaryCtaText: 'Schedule Consultation',
  primaryCtaLink: '/contact',
  phoneDisplay: '+919996263370',
  secondaryCtaText: 'Call Now',
  sidebarTitle: 'What to Expect',
  checklist: [
    { title: 'Expert Legal Advice', body: 'Get clarity on your legal options' },
    { title: 'Transparent Pricing', body: 'Clear fee structure with no hidden costs' },
    { title: 'Dedicated Support', body: 'Regular updates throughout your case' },
  ],
};

export const DEFAULT_STATS_LABELS = {
  casesRepresented: '5000+',
  criminalMatters: '700+',
  familyMatters: '500+',
  civilMatters: '900+',
  casesRepresentedLabel: 'Cases Represented',
  criminalMattersLabel: 'Criminal Matters',
  familyMattersLabel: 'Family Dispute Matters',
  civilMattersLabel: 'Civil Matters',
};

export const DEFAULT_PRACTICE_CTA = {
  viewAllServicesText: 'View All Services',
};

export const DEFAULT_TESTIMONIALS_SCROLL_HINT = {
  hint: 'Scroll horizontally to see more',
};

/** Full default `sections` for admin when creating / resetting home page content. */
export function getDefaultHomeSectionsForAdmin() {
  return {
    hero: {
      heading: 'Excellence in Legal Advisory & Advocacy',
      subheading:
        'Grover & Grover Advocates delivers sophisticated legal solutions with integrity, precision, and unwavering commitment to your success.',
      ctaPrimary: 'Schedule Consultation',
      ctaSecondary: 'Our Services',
    },
    carousel: {
      slides: JSON.parse(JSON.stringify(DEFAULT_CAROUSEL_SLIDES)),
      trustStrip: DEFAULT_CAROUSEL_TRUST_STRIP.map((x) => ({ ...x })),
    },
    stats: { ...DEFAULT_STATS_LABELS },
    practiceAreas: {
      heading: 'Practice Areas',
      subheading: 'Comprehensive legal expertise across multiple domains',
    },
    practiceCta: { ...DEFAULT_PRACTICE_CTA },
    testimonials: {
      heading: 'What Our Clients Say',
      subheading: 'Trusted by leading businesses and individuals across India',
    },
    testimonialsIntro: { ...DEFAULT_TESTIMONIALS_INTRO },
    testimonialsScroll: { ...DEFAULT_TESTIMONIALS_SCROLL_HINT },
    whyChoose: JSON.parse(JSON.stringify(DEFAULT_WHY_CHOOSE)),
    howWeWork: JSON.parse(JSON.stringify(DEFAULT_HOW_WE_WORK)),
    whoWeAre: JSON.parse(JSON.stringify(DEFAULT_WHO_WE_ARE)),
    ourValues: JSON.parse(JSON.stringify(DEFAULT_OUR_VALUES)),
    awardsHome: JSON.parse(JSON.stringify(DEFAULT_AWARDS_HOME)),
    consultationCta: JSON.parse(JSON.stringify(DEFAULT_CONSULTATION_CTA)),
    teamSection: { ...DEFAULT_TEAM_SECTION },
    blogSection: { ...DEFAULT_BLOG_SECTION },
    consultationForm: JSON.parse(JSON.stringify(DEFAULT_CONSULTATION_FORM)),
    ctaBand: JSON.parse(JSON.stringify(DEFAULT_CTA_BAND)),
  };
}

/** Merge API sections with defaults (deep enough for home UI). */
export function mergeHomeSections(sections) {
  const s = sections && typeof sections === 'object' ? sections : {};
  return {
    hero: s.hero,
    stats: { ...DEFAULT_STATS_LABELS, ...(s.stats || {}) },
    practiceAreas: s.practiceAreas,
    practiceCta: { ...DEFAULT_PRACTICE_CTA, ...s.practiceCta },
    testimonials: {
      heading: 'What Our Clients Say',
      subheading: 'Trusted by leading businesses and individuals across India',
      ...s.testimonials,
    },
    testimonialsIntro: { ...DEFAULT_TESTIMONIALS_INTRO, ...s.testimonialsIntro },
    testimonialsScroll: { ...DEFAULT_TESTIMONIALS_SCROLL_HINT, ...s.testimonialsScroll },
    carousel: {
      slides:
        Array.isArray(s.carousel?.slides) && s.carousel.slides.length > 0
          ? s.carousel.slides
          : DEFAULT_CAROUSEL_SLIDES,
      trustStrip:
        Array.isArray(s.carousel?.trustStrip) && s.carousel.trustStrip.length >= 3
          ? s.carousel.trustStrip
          : DEFAULT_CAROUSEL_TRUST_STRIP,
    },
    whyChoose: {
      ...DEFAULT_WHY_CHOOSE,
      ...s.whyChoose,
      cards:
        s.whyChoose?.cards?.length > 0 ? s.whyChoose.cards : DEFAULT_WHY_CHOOSE.cards,
    },
    howWeWork: {
      ...DEFAULT_HOW_WE_WORK,
      ...s.howWeWork,
      steps: s.howWeWork?.steps?.length > 0 ? s.howWeWork.steps : DEFAULT_HOW_WE_WORK.steps,
    },
    whoWeAre: { ...DEFAULT_WHO_WE_ARE, ...(s.whoWeAre || {}) },
    ourValues: {
      ...DEFAULT_OUR_VALUES,
      ...s.ourValues,
      cards:
        s.ourValues?.cards?.length > 0 ? s.ourValues.cards : DEFAULT_OUR_VALUES.cards,
    },
    awardsHome: { ...DEFAULT_AWARDS_HOME, ...(s.awardsHome || {}) },
    consultationCta: { ...DEFAULT_CONSULTATION_CTA, ...(s.consultationCta || {}) },
    teamSection: { ...DEFAULT_TEAM_SECTION, ...s.teamSection },
    blogSection: { ...DEFAULT_BLOG_SECTION, ...s.blogSection },
    consultationForm: {
      ...DEFAULT_CONSULTATION_FORM,
      ...(s.consultationForm || {}),
      placeholders: {
        ...DEFAULT_CONSULTATION_FORM.placeholders,
        ...(s.consultationForm?.placeholders || {}),
      },
    },
    ctaBand: {
      ...DEFAULT_CTA_BAND,
      ...s.ctaBand,
      checklist:
        s.ctaBand?.checklist?.length > 0 ? s.ctaBand.checklist : DEFAULT_CTA_BAND.checklist,
    },
  };
}
