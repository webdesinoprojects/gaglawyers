import React, { useEffect, useState } from 'react';
import { Users, Award, Target, Globe, Heart, Shield, TrendingUp, BookOpen, Briefcase, Scale } from 'lucide-react';
import TeamCard from '../components/TeamCard';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team`);
      const data = await response.json();
      if (data.success) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const teamStrengths = [
    {
      icon: Users,
      title: 'Leadership at the Helm',
      description: 'Guided by the vision and experience of Advocate Rahul Grover.',
    },
    {
      icon: Briefcase,
      title: 'Diverse Expertise',
      description: 'Specialists across multiple practice areas under one roof.',
    },
    {
      icon: Target,
      title: 'Collaborative Spirit',
      description: 'Integrated approach to complex legal challenges.',
    },
    {
      icon: Heart,
      title: 'Client-Centric Values',
      description: 'Personalised attention and practical strategies.',
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'Pan-India presence with international reach.',
    },
  ];

  const teamRoles = [
    {
      icon: Scale,
      title: 'Associates & Legal Specialists',
      description: 'Specialists in corporate law, dispute resolution, family law, property law, criminal defence, employment law, and intellectual property rights. They work closely with Advocate Grover while managing their own practice areas with professionalism.',
    },
    {
      icon: BookOpen,
      title: 'Research & Drafting Experts',
      description: 'Research professionals and drafting experts ensure that no detail is overlooked, providing the analytical backbone that allows our litigators to walk into the courtroom fully prepared.',
    },
    {
      icon: Users,
      title: 'Client Relations & Support Staff',
      description: 'Our client relations team ensures seamless communication, smooth appointment management, and operational efficiency, allowing lawyers to focus on practicing law.',
    },
  ];

  return (
    <div>
      <SEOHead 
        title="Our Team | GAG Lawyers - Grover & Grover Advocates"
        description="Meet our team led by Advocate Rahul Grover. Skilled lawyers and professionals combining legal excellence with personal commitment to client success."
        keywords="legal team, advocate rahul grover, law firm team, lawyers in india, legal specialists"
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
                Meet Our Team
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Our
              <br />
              <span className="text-gold">Team</span>
            </h1>
            <p className="font-sans text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Our strength lies not just in legal knowledge but in the people who apply it with dedication and care.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <p className="font-sans text-xl text-gray-700 leading-relaxed">
              At GAG Lawyers – Grover & Grover Advocates, every member of our team shares the same vision: to combine <span className="font-semibold text-navy">legal excellence with personal commitment</span> so that our clients always feel supported, informed, and represented.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
            <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Leading this vision is our Founder & Owner, <span className="font-semibold text-navy">Advocate Rahul Grover</span>, whose leadership and experience have shaped the firm into what it is today. Around him, a team of skilled lawyers and professionals bring their expertise together to form a collective that is much more than the sum of its parts.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Our Founder & Owner
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full mb-6"></div>
            <p className="font-sans text-xl text-gray-600">
              Advocate Rahul Grover
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-navy/20 rounded-3xl blur-2xl"></div>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=750&fit=crop"
                    alt="Advocate Rahul Grover"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-block">
                <span className="font-sans text-sm font-semibold text-gold uppercase tracking-wider bg-gold/10 px-4 py-2 rounded-full">
                  A Visionary Leader in Law
                </span>
              </div>
              <div className="space-y-5 font-sans text-gray-700 leading-relaxed text-lg">
                <p>
                  Advocate Rahul Grover is the driving force behind GAG Lawyers – Grover & Grover Advocates. From the very beginning, he envisioned a law firm that would break away from traditional, rigid practices and instead embrace a <span className="font-semibold text-navy">client-first approach</span>.
                </p>
                <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-lg">
                  <p className="font-medium text-navy italic">
                    "Legal services should not just solve problems, they should empower clients to make confident decisions about their future."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Journey & Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy/80 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-4">
                Professional Journey
              </h3>
              <p className="font-sans text-gray-600 leading-relaxed text-sm">
                Years of practice in diverse areas including litigation, corporate advisory, family disputes, criminal defence, property transactions, and cross-border matters. Appeared before Supreme Court, High Courts, and various tribunals.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-gold to-gold/80 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-4">
                Leadership & Vision
              </h3>
              <p className="font-sans text-gray-600 leading-relaxed text-sm">
                Plays a dual role as strategist and mentor. Personally leads high-stakes matters while shaping firm growth and mentoring younger lawyers. Expanded reach across India with strong international partnerships.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy/80 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-4">
                Personal Philosophy
              </h3>
              <p className="font-sans text-gray-600 leading-relaxed text-sm">
                Law must remain accessible, understandable, and practical. Every client deserves the same level of attention and commitment. This human-centric approach has earned long-lasting relationships with clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Behind the Firm */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              The Team Behind the Firm
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full mb-6"></div>
            <p className="font-sans text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              While Advocate Rahul Grover is the cornerstone of the firm, the success of GAG Lawyers is also a reflection of its talented team. Each member brings a unique skill set, but together, they share a unified purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {teamRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-grey-light to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-4">
                    {role.title}
                  </h3>
                  <p className="font-sans text-gray-600 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Team Members Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="font-sans text-gray-600">Loading team members...</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h3 className="font-serif text-3xl font-bold text-navy mb-4">
                  Meet Our Advocates
                </h3>
                <div className="h-1 w-16 bg-gold mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                  <TeamCard
                    key={member._id}
                    name={member.name}
                    designation={member.designation}
                    imageUrl={member.imageUrl}
                    bio={member.bio}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* Collaborative Approach */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
              Our Collaborative Approach
            </h2>
            <div className="h-1 w-24 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 lg:p-14 border border-white/20 space-y-6 font-sans text-xl text-gray-200 leading-relaxed">
            <p>
              One of the defining features of GAG Lawyers is the <span className="font-semibold text-gold">collaborative way we work</span>. We believe that legal challenges rarely fit neatly into one category.
            </p>
            <p>
              By working as an integrated team, our lawyers pool their expertise across practice areas, ensuring that clients benefit from a well-rounded and multi-dimensional strategy. This collaboration extends beyond the firm – through our network of professionals across India and internationally, we provide support that transcends borders.
            </p>
            <div className="pt-6 border-t border-white/20">
              <p className="text-2xl font-medium text-white">
                Our firm places strong emphasis on continuous learning. Regular training sessions, internal discussions, and knowledge-sharing ensure that clients receive advice rooted in legal precedent and adapted to today's world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Team Stands Out */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Why Our Team Stands Out
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamStrengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-8 bg-gradient-to-br from-grey-light to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy/80 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy mb-3">
                    {strength.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-10 lg:p-14 shadow-2xl border border-gray-100 text-center">
            <Users className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-6">
              Moving Forward Together
            </h2>
            <div className="space-y-6 font-sans text-lg text-gray-700 leading-relaxed">
              <p>
                At GAG Lawyers – Grover & Grover Advocates, we see ourselves not just as lawyers but as partners in our clients' journeys. Every success we achieve is the result of teamwork, dedication, and a shared commitment to excellence.
              </p>
              <p className="text-xl font-medium text-navy">
                We believe that the right team makes all the difference. And at GAG Lawyers, our team is not just equipped with legal knowledge – it is powered by passion, guided by integrity, and driven by the determination to protect and advance our clients' interests.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-gold to-gold/90 text-white font-sans font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Schedule Consultation
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

export default Team;
