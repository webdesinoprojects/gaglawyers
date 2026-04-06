import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-grey-light">
      <SEOHead
        title="Page Not Found | GAG Lawyers"
        description="The page you are looking for could not be found."
        keywords="page not found, 404, GAG Lawyers"
      />

      <section className="min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 lg:p-14 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-navy/8">
              <Search className="w-10 h-10 text-navy" />
            </div>

            <p className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-gold mb-4">
              404 Error
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">
              This page is not available
            </h1>
            <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              The page may have moved, the link may be outdated, or the address may be incorrect.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3 font-sans font-semibold text-white transition-all duration-200 hover:bg-navy/90"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-navy/15 px-7 py-3 font-sans font-semibold text-navy transition-all duration-200 hover:bg-navy/5"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
