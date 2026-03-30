import React from 'react';
import { Scale, Award, Briefcase, Globe, Users, Target, Shield, Building2, Handshake } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Affiliation = () => {
  const affiliations = [
    {
      icon: Scale,
      title: 'Bar Council of India',
      description: 'Our registration and compliance under the Bar Council of India ensure that all our practice standards meet national legal requirements.',
      color: 'from-navy to-navy/80',
    },
    {
      icon: Award,
      title: 'Supreme Court Bar Association (SCBA)',
      description: 'Membership in the SCBA enables us to represent clients effectively before India\'s highest judicial forum and stay updated on emerging legal precedents.',
      color: 'from-gold to-gold/80',
    },
    {
      icon: Briefcase,
      title: 'Delhi High Court Bar Association (DHCBA)',
      description: 'Active engagement in this forum allows our team to participate in continuing legal education and remain connected with the judicial community.',
      color: 'from-navy to-navy/80',
    },
    {
      icon: Globe,
      title: 'International Legal Networks',
      description: 'Collaborations with global law firms and professionals allow us to serve clients with cross-border interests, ensuring comprehensive solutions for international and NRI clients.',
      color: 'from-gold to-gold/80',
    },
    {
      icon: Building2,
      title: 'Industry Forums & Chambers of Commerce',
      description: 'Partnerships with trade and business organizations strengthen our understanding of industry-specific legal challenges, benefiting corporate clients.',
      color: 'from-navy to-navy/80',
    },
  ];

  return (
    <div>
      <SEOHead 
        title="Affiliations & Memberships | GAG Lawyers - Grover & Grover Advocates"
        description="Our memberships in esteemed legal and industry bodies reflect our commitment to ethical practice, professional growth, and global connectivity."
        keywords="bar council india, scba, legal affiliations, law firm memberships, international legal networks"
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
                Professional Memberships
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Affiliations &
              <br />
              <span className="text-gold">Memberships</span>
            </h1>
            <p className="font-sans text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Our memberships in esteemed legal and industry bodies reflect our commitment to ethical practice, professional growth, and global connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Shield className="w-12 h-12 text-gold" />
              <Handshake className="w-12 h-12 text-navy" />
              <Award className="w-12 h-12 text-gold" />
            </div>
            <p className="font-sans text-xl text-gray-700 leading-relaxed">
              Affiliations are an essential part of professional credibility. At GAG Lawyers – Grover & Grover Advocates, our memberships in esteemed legal and industry bodies reflect our commitment to <span className="font-semibold text-navy">ethical practice, professional growth, and global connectivity</span>.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
            <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              These associations ensure that we remain aligned with evolving legal standards, maintain high ethical practices, and serve our clients with cutting-edge legal expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Key Legal Affiliations */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Key Legal Affiliations
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {affiliations.map((affiliation, index) => {
              const Icon = affiliation.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gold/30 relative overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${affiliation.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors">
                      {affiliation.title}
                    </h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {affiliation.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Perspective */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-gold/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-gold/30">
                <Globe className="w-10 h-10 text-gold" />
              </div>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
              A Global Perspective
            </h2>
            <div className="h-1 w-24 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 lg:p-14 border border-white/20">
            <div className="space-y-6 font-sans text-xl text-gray-200 leading-relaxed">
              <p>
                At GAG Lawyers, affiliations extend beyond domestic boundaries. We collaborate with international legal networks, giving our clients access to expertise in <span className="font-semibold text-gold">cross-border transactions, arbitration, and international dispute resolution</span>.
              </p>
              <p>
                This global outlook, combined with our deep knowledge of Indian laws, enables us to provide solutions that are both practical and strategically sound.
              </p>
              <div className="pt-6 border-t border-white/20">
                <p className="text-2xl font-medium text-white">
                  Through our affiliations, we reinforce our credibility, strengthen professional relationships, and enhance the value we deliver to every client we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              What Our Affiliations Mean for You
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Ethical Standards',
                description: 'Adherence to the highest professional and ethical standards in legal practice.',
              },
              {
                icon: Target,
                title: 'Continuous Learning',
                description: 'Access to ongoing legal education and emerging legal precedents.',
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'International network for cross-border legal matters and expertise.',
              },
              {
                icon: Users,
                title: 'Industry Insight',
                description: 'Deep understanding of sector-specific legal challenges and solutions.',
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-8 bg-gradient-to-br from-grey-light to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy/80 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-10 lg:p-14 shadow-2xl border border-gray-100">
            <Award className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-6">
              Professional Excellence Through Association
            </h2>
            <p className="font-sans text-lg text-gray-600 leading-relaxed mb-8">
              Our affiliations are not just memberships – they are commitments to maintaining the highest standards of legal practice and delivering exceptional value to our clients.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-gold to-gold/90 text-white font-sans font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </a>
              <a
                href="/about"
                className="inline-block px-8 py-4 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all duration-300"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliation;
