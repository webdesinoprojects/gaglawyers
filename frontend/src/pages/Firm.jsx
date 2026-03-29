import React, { useEffect, useState } from 'react';
import { Building2, Target, Eye, Heart } from 'lucide-react';

const Firm = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pages/firm');
      const data = await response.json();
      if (data.success) {
        setPageContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching firm content:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultContent = {
    history: {
      title: 'Our History',
      content: 'Founded in 1998, Grover & Grover Advocates began as a vision to provide exceptional legal services with unwavering integrity. Over the past 25+ years, we have grown into one of the most respected law firms in the region, serving a diverse clientele ranging from individuals to multinational corporations. Our journey has been marked by landmark cases, satisfied clients, and a steadfast commitment to justice.',
    },
    mission: {
      title: 'Our Mission',
      content: 'To deliver exceptional legal services that protect our clients\' interests, uphold justice, and contribute to the development of a fair and equitable society. We strive to be trusted advisors who provide strategic, practical, and innovative legal solutions.',
    },
    vision: {
      title: 'Our Vision',
      content: 'To be recognized as a leading law firm known for excellence, integrity, and client-focused service. We envision a future where legal expertise meets technological innovation, making quality legal services accessible to all who need them.',
    },
    values: [
      {
        title: 'Integrity',
        description: 'We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty in every interaction.',
        icon: 'Heart',
      },
      {
        title: 'Excellence',
        description: 'We are committed to delivering superior legal services through continuous learning, strategic thinking, and meticulous attention to detail.',
        icon: 'Target',
      },
      {
        title: 'Client-First',
        description: 'Your success is our priority. We listen, understand, and tailor our approach to meet your unique needs and objectives.',
        icon: 'Users',
      },
      {
        title: 'Innovation',
        description: 'We embrace modern legal practices and technology to provide efficient, effective solutions in an ever-evolving legal landscape.',
        icon: 'Lightbulb',
      },
    ],
  };

  const content = pageContent?.sections || defaultContent;

  return (
    <div>
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            The Firm
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            A legacy built on excellence, integrity, and unwavering commitment
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Building2 className="w-10 h-10 text-gold" />
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">
                  {content.history?.title || defaultContent.history.title}
                </h2>
              </div>
              <p className="font-sans text-lg text-gray-700 leading-relaxed">
                {content.history?.content || defaultContent.history.content}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-10 h-10 text-gold" />
                  <h2 className="font-serif text-3xl font-bold text-navy">
                    {content.mission?.title || defaultContent.mission.title}
                  </h2>
                </div>
                <p className="font-sans text-gray-700 leading-relaxed">
                  {content.mission?.content || defaultContent.mission.content}
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Eye className="w-10 h-10 text-gold" />
                  <h2 className="font-serif text-3xl font-bold text-navy">
                    {content.vision?.title || defaultContent.vision.title}
                  </h2>
                </div>
                <p className="font-sans text-gray-700 leading-relaxed">
                  {content.vision?.content || defaultContent.vision.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-grey-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              Our Core Values
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(content.values || defaultContent.values).map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-navy/5 mx-auto mb-4">
                  <Heart className="w-8 h-8 text-navy" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Firm;
