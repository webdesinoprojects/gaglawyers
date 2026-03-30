import React from 'react';
import { Award, Trophy, Star, Target, Users, Briefcase, Shield, TrendingUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Awards = () => {
  const awards = [
    {
      icon: Trophy,
      title: 'Excellence in Litigation',
      description: 'Recognized for representing clients in complex civil, criminal, and commercial disputes across India, often handling high-stakes cases that require meticulous preparation and strategic foresight.',
      color: 'from-gold to-gold/80',
    },
    {
      icon: Briefcase,
      title: 'Corporate & Commercial Advisory Award',
      description: 'Acknowledged for delivering innovative and practical solutions to start-ups, established businesses, and multinational corporations. This award reflects our ability to combine legal knowledge with business insight.',
      color: 'from-navy to-navy/80',
    },
    {
      icon: Users,
      title: 'Client Choice Recognition',
      description: 'Commended for consistently putting client needs first, maintaining transparency, and providing timely, actionable advice. This recognition comes directly from our clients\' feedback and trust.',
      color: 'from-gold to-gold/80',
    },
    {
      icon: TrendingUp,
      title: 'Emerging Full-Service Law Firm Award',
      description: 'Honoured for rapid growth and a comprehensive service portfolio. This award recognizes the vision of Advocate Rahul Grover in creating a firm that is versatile, reliable, and client-focused.',
      color: 'from-navy to-navy/80',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Upholding ethical standards in every matter',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Delivering exceptional legal solutions',
    },
    {
      icon: Users,
      title: 'Client-First',
      description: 'Prioritizing client needs and satisfaction',
    },
    {
      icon: Star,
      title: 'Innovation',
      description: 'Combining legal expertise with business insight',
    },
  ];

  return (
    <div>
      <SEOHead 
        title="Awards & Recognition | GAG Lawyers - Grover & Grover Advocates"
        description="Recognition for excellence in litigation, corporate advisory, and legal innovation. Awards highlighting our commitment to client satisfaction and professional excellence."
        keywords="law firm awards, legal excellence, litigation awards, corporate advisory recognition, client choice award"
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
                Recognition & Excellence
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Awards &
              <br />
              <span className="text-gold">Achievements</span>
            </h1>
            <p className="font-sans text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Recognition is a reflection of our unwavering commitment to excellence, integrity, and client satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Trophy className="w-12 h-12 text-gold" />
              <Award className="w-12 h-12 text-navy" />
              <Star className="w-12 h-12 text-gold" />
            </div>
            <p className="font-sans text-xl text-gray-700 leading-relaxed">
              At GAG Lawyers – Grover & Grover Advocates, over the years, the firm has been honoured for its outstanding work in <span className="font-semibold text-navy">litigation, corporate advisory, and legal innovation</span>, underscoring the dedication of our team under the leadership of Advocate Rahul Grover.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Recognitions and Achievements
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full mb-6"></div>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Our awards highlight both the depth of our expertise and our focus on results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gold/30 relative overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${award.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-navy mb-4 group-hover:text-gold transition-colors">
                      {award.title}
                    </h3>
                    <p className="font-sans text-gray-600 leading-relaxed text-lg">
                      {award.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment to Excellence */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-gold/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-gold/30">
                <Target className="w-10 h-10 text-gold" />
              </div>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
              Commitment to Excellence
            </h2>
            <div className="h-1 w-24 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 lg:p-14 border border-white/20">
            <div className="space-y-6 font-sans text-xl text-gray-200 leading-relaxed">
              <p>
                Awards are <span className="font-semibold text-gold">milestones, not destinations</span>. They reflect the trust placed in us by clients and peers alike, and they remind us of the responsibility we carry as legal advisors.
              </p>
              <p>
                At GAG Lawyers, we view every matter—whether a sensitive family dispute or a high-value commercial negotiation—as an opportunity to uphold the values that have earned us recognition.
              </p>
              <div className="pt-6 border-t border-white/20">
                <p className="text-2xl font-medium text-white">
                  Through these accolades, we aim not only to celebrate achievements but also to reinforce our commitment to being a law firm that combines expert legal solutions with integrity, reliability, and a client-first approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Values That Drive Us
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-8 bg-gradient-to-br from-grey-light to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy/80 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
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

      {/* Recognition Timeline */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-10 lg:p-14 shadow-2xl border border-gray-100">
            <div className="text-center mb-12">
              <Award className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
                A Legacy of Excellence
              </h2>
              <p className="font-sans text-lg text-gray-600 leading-relaxed">
                Each award represents countless hours of dedication, strategic thinking, and unwavering commitment to our clients' success. Under the leadership of Advocate Rahul Grover, we continue to set new standards in legal excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-gold mb-2">25+</div>
                <div className="font-sans text-sm text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-navy mb-2">1000+</div>
                <div className="font-sans text-sm text-gray-600">Cases Won</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold mb-2">Top Rated</div>
                <div className="font-sans text-sm text-gray-600">Legal Firm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-navy to-navy/90 rounded-3xl p-10 lg:p-14 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
            
            <div className="relative z-10">
              <Trophy className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
                Experience Award-Winning Legal Services
              </h2>
              <p className="font-sans text-lg text-gray-300 leading-relaxed mb-8">
                Let our recognized expertise work for you. Contact us today for a consultation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-gold to-gold/90 text-white font-sans font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Schedule Consultation
                </a>
                <a
                  href="/about"
                  className="inline-block px-8 py-4 bg-white text-navy font-sans font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
