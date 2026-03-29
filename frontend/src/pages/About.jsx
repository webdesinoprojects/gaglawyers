import React, { useEffect, useState } from 'react';
import TeamCard from '../components/TeamCard';
import { Award } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  const mockTeam = [
    {
      name: 'Advocate Rajesh Grover',
      designation: 'Senior Partner & Founder',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
      bio: 'Over 30 years of experience in corporate and civil law.',
    },
    {
      name: 'Advocate Meera Grover',
      designation: 'Managing Partner',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
      bio: 'Specializes in family law and alternative dispute resolution.',
    },
    {
      name: 'Advocate Vikram Singh',
      designation: 'Partner - Litigation',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
      bio: 'Expert in criminal defense and appellate litigation.',
    },
    {
      name: 'Advocate Neha Kapoor',
      designation: 'Partner - Corporate',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
      bio: 'Specializes in M&A and corporate advisory.',
    },
  ];

  return (
    <div>
      <SEOHead 
        title="About Us - GAG Lawyers | Leading Law Firm in India"
        description="Learn about Grover & Grover Advocates - a legacy of legal excellence built on integrity, expertise, and dedication to clients since 1998."
        keywords="about gag lawyers, law firm history, legal team, advocates in india"
      />
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            The Firm
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            A legacy of legal excellence built on integrity, expertise, and unwavering dedication to our clients.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=750&fit=crop"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-block px-4 py-1 bg-gold/10 rounded-full">
                <span className="font-sans text-sm font-medium text-gold">Founder's Message</span>
              </div>
              <blockquote className="font-serif text-2xl lg:text-3xl text-navy leading-relaxed italic border-l-4 border-gold pl-6">
                "In law, as in life, integrity is not negotiable. We believe in delivering solutions that stand the test of time."
              </blockquote>
              <div className="space-y-4 font-sans text-gray-600 leading-relaxed">
                <p>
                  Founded in 1998, Grover & Grover Advocates has grown from a small practice to one of the most respected law firms in the region. Our journey has been defined by an unwavering commitment to excellence and client-first philosophy.
                </p>
                <p>
                  With a team of seasoned advocates and legal professionals, we bring deep expertise across corporate law, civil litigation, real estate, and family matters. Every case is approached with strategic thinking, meticulous preparation, and personalized attention.
                </p>
              </div>
              <div className="pt-4">
                <p className="font-serif text-xl font-semibold text-navy">
                  Advocate Rajesh Grover
                </p>
                <p className="font-sans text-sm text-gold">
                  Senior Partner & Founder
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
              Our Team
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the advocates who bring decades of combined experience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockTeam.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                designation={member.designation}
                imageUrl={member.imageUrl}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              Awards & Affiliations
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16 opacity-40 grayscale">
            <div className="flex items-center space-x-2">
              <Award size={32} className="text-navy" />
              <span className="font-sans font-semibold text-navy">Bar Council of India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award size={32} className="text-navy" />
              <span className="font-sans font-semibold text-navy">Indian Law Society</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award size={32} className="text-navy" />
              <span className="font-sans font-semibold text-navy">Legal Excellence Award</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
