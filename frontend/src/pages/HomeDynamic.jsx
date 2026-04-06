import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import SEOHead from '../components/SEOHead';
import AppointmentSection from '../components/home/AppointmentSection';
import BlockRenderer from '../components/blocks/BlockRenderer';
import API_BASE_URL from '../config/api';

const HomeDynamic = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [pageBlocks, setPageBlocks] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [servicesRes, reviewsRes, pageRes, blogRes, teamRes, blocksRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/reviews?featured=true`),
        fetch(`${API_BASE_URL}/api/pages/home`),
        fetch(`${API_BASE_URL}/api/blog?limit=3`),
        fetch(`${API_BASE_URL}/api/team?limit=5`),
        fetch(`${API_BASE_URL}/api/cms/page-blocks/home`),
      ]);

      const servicesData = await servicesRes.json();
      const reviewsData = await reviewsRes.json();
      const pageData = await pageRes.json();
      const blogData = await blogRes.json();
      const teamData = await teamRes.json();
      const blocksData = await blocksRes.json();

      if (servicesData.success && servicesData.data.length > 0) {
        setServices(servicesData.data);
      }

      if (reviewsData.success && reviewsData.data.length > 0) {
        setReviews(reviewsData.data);
      }

      if (pageData.success) {
        setPageContent(pageData.data);
      }

      if (blogData.success && blogData.data.length > 0) {
        setBlogPosts(blogData.data);
      }

      if (teamData.success && teamData.data.length > 0) {
        setTeamMembers(teamData.data);
      }

      if (blocksData.success && blocksData.data.blocks) {
        setPageBlocks(blocksData.data.blocks);
      }
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    } finally {
      setLoading(false);
    }
  };

  const practiceAreasSection = pageContent?.sections?.practiceAreas || {
    heading: 'Practice Areas',
    subheading: 'Comprehensive legal expertise across multiple domains',
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
        title={pageContent?.seo?.title || "GAG Lawyers - Premier Legal Services in India | Grover & Grover Advocates"}
        description={pageContent?.seo?.description || "Expert legal services in corporate law, civil litigation, real estate, and family law. 25+ years of excellence serving clients across India."}
        keywords={pageContent?.seo?.keywords || "lawyers in delhi, advocates in india, corporate law firm, civil litigation, real estate lawyers, family law"}
      />

      {/* Render Dynamic Blocks */}
      {pageBlocks.map((block, index) => (
        <BlockRenderer 
          key={block._id || index} 
          block={block}
          overrideContent={block.overrideContent}
        />
      ))}

      <AppointmentSection />

      {/* Practice Areas Section */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">
              {practiceAreasSection.heading}
            </h2>
            <p className="font-sans text-base lg:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              {practiceAreasSection.subheading}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, index) => (
              <div
                key={service._id || index}
                className="group bg-gray-50 rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold/30"
              >
                <ServiceCard
                  title={service.name || service.title}
                  description={service.shortDescription || service.description}
                  iconName={service.iconName}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/services">
              <button className="px-8 py-3 bg-navy text-white font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:bg-navy/90 hover:scale-105">
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      {teamMembers.length > 0 && (
        <section className="bg-white py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                Our Team
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
                Meet the Legal Minds Behind Our Success
              </h2>
              <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
                Led by experienced advocates with decades of combined expertise in diverse legal domains
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {teamMembers[0] && (
                <div className="lg:col-span-3 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-navy/5 to-gold/5 rounded-2xl p-8 border border-navy/10">
                  <div className="relative group flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold to-navy rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <img
                      src={teamMembers[0].imageUrl}
                      alt={teamMembers[0].name}
                      className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-3">
                      Founder
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-navy mb-2">
                      {teamMembers[0].name}
                    </h3>
                    <p className="font-sans text-lg text-gold font-semibold mb-4">
                      {teamMembers[0].designation}
                    </p>
                    <p className="font-sans text-gray-600 leading-relaxed mb-6">
                      {teamMembers[0].bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-navy/10 text-navy text-xs font-sans font-medium rounded-full">
                        20+ Years Experience
                      </span>
                      <span className="px-3 py-1 bg-navy/10 text-navy text-xs font-sans font-medium rounded-full">
                        Supreme Court Advocate
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {teamMembers.slice(1, 5).map((member) => (
                <div
                  key={member._id}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gold/30 transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-sans text-sm text-gold font-semibold mb-3">
                      {member.designation}
                    </p>
                    <p className="font-sans text-sm text-gray-600 line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/team">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-sans text-base font-semibold rounded-lg hover:bg-navy/90 transition-all hover:scale-105 shadow-lg">
                  Know More About Our Team
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts Section */}
      {blogPosts.length > 0 && (
        <section className="bg-grey-light py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                  Legal Insights
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-3">
                  Latest from Our Blog
                </h2>
                <p className="font-sans text-lg text-gray-600 max-w-2xl">
                  Stay informed with expert legal insights, case studies, and industry updates
                </p>
              </div>
              <Link 
                to="/blog"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all"
              >
                View All Articles
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomeDynamic;
