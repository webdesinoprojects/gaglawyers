import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const Newsletter = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog?published=true&contentType=newsletter`);
      const data = await response.json();
      if (data.success) {
        setEntries(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const getEntryUrl = (entry) => entry.externalUrl || `/newsletter/${entry.slug}`;
  const isExternalEntry = (entry) => Boolean(entry.externalUrl && /^https?:\/\//i.test(entry.externalUrl));

  return (
    <div>
      <SEOHead
        title="Newsletter | GAG Lawyers - Resource Center"
        description="Legal newsletter updates and practical insights from GAG Lawyers Resource Center."
        keywords="legal newsletter, law updates, resource center, gag lawyers"
      />

      <section className="bg-gradient-to-br from-navy via-navy/95 to-[#0a1628] text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-5">
            Resource Center
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Newsletter</h1>
          <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
            Explore newsletter updates, legal briefings, and important firm announcements.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="font-sans text-gray-600">Loading newsletter entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="font-sans text-gray-600">No newsletter entries published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {entries.map((entry) => (
                <article
                  key={entry._id}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-6"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(entry.publishedAt || entry.createdAt)}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                    {entry.title}
                  </h2>
                  <p className="font-sans text-gray-600 leading-relaxed mb-5">{entry.excerpt}</p>
                  {isExternalEntry(entry) ? (
                    <a
                      href={getEntryUrl(entry)}
                      className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-navy group-hover:text-gold transition-colors"
                    >
                      Read more
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <Link
                      to={getEntryUrl(entry)}
                      className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-navy group-hover:text-gold transition-colors"
                    >
                      Read more
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
