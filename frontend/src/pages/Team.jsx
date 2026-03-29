import React, { useEffect, useState } from 'react';
import TeamCard from '../components/TeamCard';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team');
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

  const displayTeam = teamMembers.length > 0 ? teamMembers : mockTeam;

  return (
    <div>
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Our Team
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated legal professionals who bring decades of combined expertise
          </p>
        </div>
      </section>

      <section className="bg-grey-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="font-sans text-gray-600">Loading team members...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayTeam.map((member, index) => (
                <TeamCard
                  key={index}
                  name={member.name}
                  designation={member.designation}
                  imageUrl={member.imageUrl}
                  bio={member.bio}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Team;
