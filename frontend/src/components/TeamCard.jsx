import React from 'react';

const TeamCard = ({ name, designation, imageUrl, bio }) => {
  return (
    <div className="group relative bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[3/4] overflow-hidden bg-grey-light">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="font-serif text-xl font-semibold text-navy mb-1">
          {name}
        </h3>
        <p className="font-sans text-sm text-gold mb-3">
          {designation}
        </p>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="font-sans text-sm text-navy hover:text-gold transition-colors">
            Read Bio →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
