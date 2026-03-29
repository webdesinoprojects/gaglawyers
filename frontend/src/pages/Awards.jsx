import React, { useEffect, useState } from 'react';
import { Award as AwardIcon, Calendar, Building } from 'lucide-react';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/awards');
      const data = await response.json();
      if (data.success) {
        setAwards(data.data);
      }
    } catch (error) {
      console.error('Error fetching awards:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockAwards = [
    {
      title: 'Excellence in Legal Practice',
      year: 2024,
      issuingBody: 'Bar Council of India',
      description: 'Recognized for outstanding contribution to the legal profession',
      imageUrl: '',
    },
    {
      title: 'Top Law Firm Award',
      year: 2023,
      issuingBody: 'Indian Law Society',
      description: 'Awarded for exceptional client service and legal expertise',
      imageUrl: '',
    },
    {
      title: 'Corporate Law Excellence',
      year: 2023,
      issuingBody: 'National Legal Awards',
      description: 'Outstanding performance in corporate legal advisory',
      imageUrl: '',
    },
    {
      title: 'Best Litigation Firm',
      year: 2022,
      issuingBody: 'Legal Excellence Forum',
      description: 'Recognized for winning complex litigation cases',
      imageUrl: '',
    },
  ];

  const displayAwards = awards.length > 0 ? awards : mockAwards;

  return (
    <div>
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Awards & Affiliations
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Recognition for our commitment to legal excellence and client service
          </p>
        </div>
      </section>

      <section className="bg-grey-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayAwards.map((award, index) => (
              <div
                key={index}
                className="bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="aspect-video bg-navy/5 flex items-center justify-center">
                  {award.imageUrl ? (
                    <img
                      src={award.imageUrl}
                      alt={award.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AwardIcon className="w-16 h-16 text-gold" />
                  )}
                </div>
                
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gold">
                      <Calendar size={16} />
                      <span className="font-sans font-medium">{award.year}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    {award.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building size={16} />
                    <p className="font-sans text-sm">
                      {award.issuingBody}
                    </p>
                  </div>
                  
                  {award.description && (
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      {award.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
