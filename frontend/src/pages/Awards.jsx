import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, Calendar, Building2, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/awards`);
      const data = await response.json();
      if (data.success) {
        // Sort by year (descending) and then by order
        const sortedAwards = data.data.sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          return a.order - b.order;
        });
        setAwards(sortedAwards);
      }
    } catch (error) {
      console.error('Error fetching awards:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique years for filter
  const years = ['all', ...new Set(awards.map(award => award.year))].sort((a, b) => {
    if (a === 'all') return -1;
    if (b === 'all') return 1;
    return b - a;
  });

  // Filter awards by selected year
  const filteredAwards = selectedYear === 'all' 
    ? awards 
    : awards.filter(award => award.year === selectedYear);

  return (
    <div>
      <SEOHead 
        title="Awards & Recognition | GAG Lawyers - Grover & Grover Advocates"
        description="Recognition for excellence in litigation, corporate advisory, and legal innovation. Awards highlighting our commitment to client satisfaction and professional excellence."
        keywords="law firm awards, legal excellence, litigation awards, corporate advisory recognition, client choice award"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-[#0a1628] to-navy text-white pt-8 pb-20 md:pt-10 lg:pt-12 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-3 mb-4 bg-gold/10 px-6 py-3 rounded-full border border-gold/20">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="font-sans text-sm font-semibold text-gold uppercase tracking-wider">
                Recognition & Excellence
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Awards &
              <br />
              <span className="text-gold">Achievements</span>
            </h1>
            <p className="font-sans text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A testament to our unwavering commitment to excellence, integrity, and client satisfaction.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gold mb-2">{awards.length}</div>
                <div className="font-sans text-sm text-gray-400">Awards Won</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold mb-2">{years.length - 1}</div>
                <div className="font-sans text-sm text-gray-400">Years Recognized</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold mb-2">25+</div>
                <div className="font-sans text-sm text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Year Filter */}
      {years.length > 2 && (
        <section className="bg-white py-8 border-b border-gray-200 sticky top-36 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="font-sans text-sm font-medium text-gray-600 mr-2">Filter by Year:</span>
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                    selectedYear === year
                      ? 'bg-gold text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year === 'all' ? 'All Years' : year}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Awards Grid Section */}
      <section className="bg-gradient-to-br from-grey-light via-white to-grey-light py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-gold" />
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy">
                Our Journey of Excellence
              </h2>
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full mb-6"></div>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Each award represents our dedication to delivering exceptional legal services
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gold border-t-transparent"></div>
              <p className="font-sans text-gray-600 mt-4">Loading awards...</p>
            </div>
          ) : filteredAwards.length === 0 ? (
            <div className="text-center py-20">
              <Award className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <p className="font-sans text-xl text-gray-600">No awards found for the selected year.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAwards.map((award, index) => (
                <div
                  key={award._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gold/30 hover:-translate-y-2"
                >
                  {/* Award Image */}
                  {award.imageUrl && (
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-navy/5 to-gold/5">
                      <img
                        src={award.imageUrl}
                        alt={award.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy to-navy/80">
                              <svg class="w-20 h-20 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                              </svg>
                            </div>
                          `;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 bg-gold text-white px-4 py-2 rounded-full font-sans text-sm font-semibold shadow-lg flex items-center gap-2">
                        <Calendar size={16} />
                        {award.year}
                      </div>

                      {/* Trophy Icon */}
                      <div className="absolute bottom-4 left-4 w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                        <Trophy className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Award Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl lg:text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors leading-tight">
                      {award.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-4 pb-4 border-b border-gray-100">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="font-sans text-sm font-medium">{award.issuingBody}</span>
                    </div>
                    
                    {award.description && (
                      <p className="font-sans text-gray-600 leading-relaxed text-sm line-clamp-3">
                        {award.description}
                      </p>
                    )}
                  </div>

                  {/* Decorative Bottom Bar */}
                  <div className="h-1 bg-gradient-to-r from-gold via-gold/50 to-transparent group-hover:from-navy group-hover:via-gold group-hover:to-gold transition-all duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Commitment Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-2xl mb-6 backdrop-blur-sm border border-gold/30">
              <Star className="w-10 h-10 text-gold" />
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

      {/* CTA Section */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy to-navy/90 rounded-3xl p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
            <div className="absolute top-10 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <Trophy className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
                Experience Award-Winning Legal Services
              </h2>
              <p className="font-sans text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                Let our recognized expertise work for you. Contact us today for a consultation with our award-winning legal team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-sans font-semibold rounded-lg hover:brightness-110 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Schedule Consultation
                  <ArrowRight size={20} />
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy font-sans font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
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
