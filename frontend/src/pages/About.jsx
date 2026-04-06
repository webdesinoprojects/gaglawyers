import React, { useEffect, useState } from 'react';
import { Shield, Target, Globe, Users, Award, Scale, Briefcase, Heart, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const About = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    Shield, Target, Globe, Users, Award, Scale, Briefcase, Heart, CheckCircle
  };

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pages/about`);
      const data = await response.json();
      
      if (data.success) {
        setPageContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching page content:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultValues = [
    { icon: Shield, title: 'Integrity', description: 'Ethical practice and transparency in every matter.' },
    { icon: Award, title: 'Excellence', description: 'Consistent pursuit of quality and precision.' },
    { icon: Heart, title: 'Commitment', description: 'Dedication to protecting client interests.' },
    { icon: Target, title: 'Innovation', description: 'Forward-looking solutions for evolving challenges.' },
    { icon: Globe, title: 'Global Outlook', description: 'Understanding the needs of both Indian and international clients.' },
  ];

  const defaultPracticeAreas = [
    { title: 'Litigation & Dispute Resolution', description: 'Our lawyers represent clients before the Supreme Court of India, various High Courts, District Courts, and Tribunals.' },
    { title: 'Corporate & Commercial Law', description: 'From company formation to contract negotiation and mergers & acquisitions, we assist businesses at every stage of growth.' },
    { title: 'Family & Matrimonial Law', description: 'We understand the sensitivity of family disputes and work to achieve fair, practical, and compassionate outcomes.' },
    { title: 'Criminal Law', description: 'We have successfully defended clients in matters involving bail, anticipatory bail, quashing of FIRs, white-collar crimes, cybercrimes, and economic offences.' },
    { title: 'Real Estate & Property Law', description: 'We advise on property transactions, title due diligence, lease and tenancy matters, builder-buyer disputes, and property transfers.' },
    { title: 'Intellectual Property Rights (IPR)', description: 'We help clients safeguard their intellectual property through trademark registration, copyright enforcement, patent filings, and IP litigation.' },
    { title: 'Employment & Labour Law', description: 'Our team advises on employment agreements, workplace policies, labour compliance, and disputes between employers and employees.' },
    { title: 'International & Cross-Border Matters', description: 'For NRIs and international businesses, we provide specialized services related to property disputes, matrimonial cases, inheritance issues.' },
  ];

  const defaultClientTypes = [
    { icon: Users, title: 'Individuals & Families', description: 'In matters such as divorce, custody, property, and criminal defence.' },
    { icon: Briefcase, title: 'Businesses & Corporates', description: 'From start-ups to multinational companies seeking legal advisory and compliance support.' },
    { icon: Globe, title: 'International Clients & NRIs', description: 'Who require assistance with Indian property, matrimonial, inheritance, or commercial disputes.' },
  ];

  const defaultWhyChooseUs = [
    'Full-Service Expertise – One firm for all legal needs, whether personal or business-related.',
    'Pan-India Reach – Presence across courts and tribunals in India.',
    'Global Perspective – Services designed for international clients with interests in India.',
    'Proven Results – A strong track record of success in complex cases.',
    'Client-Centric Service – Individual attention and strategies tailored to each client.',
  ];

  const values = defaultValues;
  const practiceAreas = defaultPracticeAreas;
  const clientTypes = defaultClientTypes;
  const whyChooseUs =
    Array.isArray(pageContent?.sections?.whyChooseUs) && pageContent.sections.whyChooseUs.length > 0
      ? pageContent.sections.whyChooseUs
      : defaultWhyChooseUs;

  const hero = pageContent?.sections?.hero || {
    heading: 'GAG Lawyers',
    subheading: 'Grover & Grover Advocates',
    tagline: 'Law is not only about interpreting statutes but also about offering guidance, clarity, and support during some of life\'s most critical moments.',
  };

  const introduction = pageContent?.sections?.introduction || {
    text: 'At GAG Lawyers - Grover & Grover Advocates, whether it is a business transaction, a personal dispute, or a cross-border matter, our focus remains the same – to provide solutions that are practical, reliable, and aligned with our clients\' goals.',
  };

  const founder = pageContent?.sections?.founder || {
    name: 'Advocate Rahul Grover',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=750&fit=crop',
    bio: 'Advocate Rahul Grover established this firm with a clear vision: to create a practice that values professionalism, client trust, and results above all. With years of experience in litigation and advisory work, he has appeared before courts, tribunals, and regulatory authorities across the country.',
    quote: 'What sets him apart is his ability to simplify the most complicated legal issues into strategies that clients can understand and act upon.',
  };

  const mission = pageContent?.sections?.mission || {
    heading: 'Our Mission and Values',
    description: 'We approach every matter with the belief that the client\'s interest is paramount. Our mission is to combine deep legal expertise with practical insight, ensuring that every client receives advice tailored to their situation.',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <SEOHead 
        title={pageContent?.seo?.title || "About Us - The Firm | GAG Lawyers - Grover & Grover Advocates"}
        description={pageContent?.seo?.description || "Founded by Advocate Rahul Grover, GAG Lawyers provides high-quality legal services across India and abroad."}
        keywords={pageContent?.seo?.keywords || "about gag lawyers, rahul grover advocate, law firm india, legal services"}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-navy/90 text-white pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block mb-4">
              <span className="font-sans text-sm font-semibold text-gold uppercase tracking-wider bg-gold/10 px-6 py-2 rounded-full border border-gold/20">
                The Firm
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {hero.heading}
              <br />
              <span className="text-gold">{hero.subheading}</span>
            </h1>
            <p className="font-sans text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {hero.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Who we are & why clients choose us — unified */}
      <section className="relative bg-gradient-to-b from-white via-grey-light/40 to-white py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[min(100%,28rem)] h-72 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
            <span className="inline-block font-sans text-sm font-semibold text-gold uppercase tracking-wider bg-gold/10 px-4 py-2 rounded-full border border-gold/15 mb-5">
              About the firm
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-5 leading-tight">
              Who we are
            </h2>
            <p className="font-sans text-xl lg:text-2xl text-navy/75 font-medium leading-snug">
              — and why clients choose GAG Lawyers
            </p>
            <p className="font-sans text-base lg:text-lg text-gray-600 leading-relaxed mt-6">
              One story: who we are as a firm, and what you can expect when you work with us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7 space-y-8">
              <p className="font-sans text-xl text-gray-800 leading-relaxed">
                {introduction.text}
              </p>
              <div className="h-px w-full max-w-lg bg-gradient-to-r from-gold via-gold/50 to-transparent rounded-full" />
              <p className="font-sans text-lg text-gray-600 leading-relaxed">
                Founded by <span className="font-semibold text-navy">{founder.name}</span>, the firm
                has built a reputation for delivering high-quality legal services across India and
                abroad. Over the years, we have grown from a single-practice office into a full-service
                law firm catering to individuals, entrepreneurs, corporates, and international clients.
              </p>
            </div>

            <aside className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl border border-navy/10 bg-white shadow-xl shadow-navy/[0.06] overflow-hidden lg:sticky lg:top-28">
                <div className="h-1.5 bg-gradient-to-r from-gold via-gold/70 to-navy/25" aria-hidden />
                <div className="p-8 lg:p-9">
                  <h3 className="font-serif text-2xl font-bold text-navy mb-2">Why clients work with us</h3>
                  <p className="font-sans text-sm text-gray-600 mb-6 leading-relaxed">
                    Clear reasons clients trust our team with high-stakes matters—in India and beyond.
                  </p>
                  <ul className="space-y-4">
                    {whyChooseUs.map((reason, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle
                          className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                          strokeWidth={2}
                          aria-hidden
                        />
                        <p className="font-sans text-[15px] text-gray-700 leading-relaxed">{reason}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-navy/20 rounded-3xl blur-2xl"></div>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={founder.imageUrl}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-block">
                <span className="font-sans text-sm font-semibold text-gold uppercase tracking-wider bg-gold/10 px-4 py-2 rounded-full">
                  Our Founder
                </span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy">
                {founder.name}
              </h2>
              <div className="h-1 w-16 bg-gold rounded-full"></div>
              <div className="space-y-5 font-sans text-gray-700 leading-relaxed text-lg">
                <p>{founder.bio}</p>
                <p>
                  His work spans sensitive family disputes, complex criminal defence, high-value commercial contracts, and real estate transactions.
                </p>
                <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-lg">
                  <p className="font-medium text-navy italic">
                    "{founder.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              {mission.heading}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full mb-6"></div>
            <p className="font-sans text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {mission.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-8 bg-gradient-to-br from-grey-light to-white rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
              Who We Serve
            </h2>
            <div className="h-1 w-24 bg-gold mx-auto rounded-full mb-6"></div>
            <p className="font-sans text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our clients are as diverse as our practice areas. With a Pan-India presence and partnerships with global associates, we provide seamless services that extend beyond geographical boundaries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientTypes.map((client, index) => {
              const Icon = client.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:border-gold/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4">
                    {client.title}
                  </h3>
                  <p className="font-sans text-gray-300 leading-relaxed">
                    {client.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Our Practice Areas
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full mb-6"></div>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              We are a multi-disciplinary law firm offering a wide range of services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceAreas.map((area, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-grey-light to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-gold rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-navy mb-4">
                      {area.title}
                    </h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Our Approach
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
          </div>
          <div className="bg-white rounded-3xl p-10 lg:p-14 shadow-xl border border-gray-100">
            <div className="space-y-6 font-sans text-lg text-gray-700 leading-relaxed">
              <p>
                We recognize that no two matters are the same. Every client brings a unique set of concerns, and we craft our strategies accordingly. Our approach combines legal knowledge with practical insight, ensuring that the advice we provide is not only legally sound but also <span className="font-semibold text-navy">commercially viable and personally relevant</span>.
              </p>
              <p>
                We work in close partnership with our clients, keeping them informed and involved at every stage. By doing so, we build trust and long-term relationships rather than one-time engagements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Scale className="w-20 h-20 text-gold mx-auto mb-8" />
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8">
            Moving Forward Together
          </h2>
          <div className="space-y-6 font-sans text-xl text-gray-300 leading-relaxed">
            <p>
              GAG Lawyers - Grover & Grover Advocates stands today as more than just a law firm. We are a trusted advisor and a partner in growth and justice for clients across India and abroad.
            </p>
            <p>
              Under the leadership of Advocate Rahul Grover, our commitment to excellence continues to guide every case we handle and every client we represent.
            </p>
            <div className="pt-6">
              <p className="text-2xl font-medium text-white">
                For us, success is measured not just by judgments won or deals closed, but by the confidence our clients place in us to stand by their side, protect their interests, and help them move forward with certainty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
