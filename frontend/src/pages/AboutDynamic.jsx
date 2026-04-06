import React, { useEffect, useState } from 'react';
import SEOHead from '../components/SEOHead';
import BlockRenderer from '../components/blocks/BlockRenderer';
import API_BASE_URL from '../config/api';

const AboutDynamic = () => {
  const [pageBlocks, setPageBlocks] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [pageRes, blocksRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/pages/about`),
        fetch(`${API_BASE_URL}/api/cms/page-blocks/about`),
      ]);

      const pageData = await pageRes.json();
      const blocksData = await blocksRes.json();

      if (pageData.success) {
        setPageContent(pageData.data);
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
              GAG Lawyers
              <br />
              <span className="text-gold">Grover & Grover Advocates</span>
            </h1>
            <p className="font-sans text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Law is not only about interpreting statutes but also about offering guidance, clarity, and support during some of life's most critical moments.
            </p>
          </div>
        </div>
      </section>

      {/* Render Dynamic Blocks */}
      {pageBlocks.map((block, index) => (
        <BlockRenderer 
          key={block._id || index} 
          block={block}
          overrideContent={block.overrideContent}
        />
      ))}

      {/* Founder Section - Keep if not in blocks */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  Our Founder
                </span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy">
                Advocate Rahul Grover
              </h2>
              <div className="h-1 w-16 bg-gold rounded-full"></div>
              <div className="space-y-5 font-sans text-gray-700 leading-relaxed text-lg">
                <p>Advocate Rahul Grover established this firm with a clear vision: to create a practice that values professionalism, client trust, and results above all. With years of experience in litigation and advisory work, he has appeared before courts, tribunals, and regulatory authorities across the country.</p>
                <p>His work spans sensitive family disputes, complex criminal defence, high-value commercial contracts, and real estate transactions.</p>
                <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-lg">
                  <p className="font-medium text-navy italic">
                    "What sets him apart is his ability to simplify the most complicated legal issues into strategies that clients can understand and act upon."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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

export default AboutDynamic;
