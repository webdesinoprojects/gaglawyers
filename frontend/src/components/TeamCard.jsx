import React, { useEffect, useMemo, useState } from 'react';

const TeamCard = ({ name, designation, imageUrl, bio }) => {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const bioModalId = useMemo(
    () =>
      `team-bio-${String(name || 'member')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}`,
    [name]
  );

  useEffect(() => {
    if (!isBioOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsBioOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isBioOpen]);

  const normalizedBio = (() => {
    if (!bio) return '';
    const raw = String(bio);
    const hasHtml = /<\/?[a-z][\s\S]*>/i.test(raw);
    return hasHtml ? raw : raw.replace(/\n/g, '<br />');
  })();

  useEffect(() => {
    if (!isBioOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isBioOpen]);

  return (
    <>
      <div className="group relative bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
        <div className="aspect-[3/4] overflow-hidden bg-grey-light">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain object-top grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="font-serif text-xl font-semibold text-navy mb-1">{name}</h3>
          <p className="font-sans text-sm text-gold mb-3">{designation}</p>
          <div
            className="font-sans text-sm text-gray-600 leading-relaxed line-clamp-3 mb-3 text-left sm:text-center [&_p]:m-0 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: normalizedBio || 'Biography will be updated soon.' }}
          />
          <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              onClick={() => setIsBioOpen(true)}
              aria-expanded={isBioOpen}
              aria-controls={bioModalId}
              className="font-sans text-sm text-navy hover:text-gold transition-colors"
            >
              Read bio
            </button>
          </div>
        </div>
      </div>

      {isBioOpen && (
        <div
          className="fixed inset-0 z-[120] bg-navy/70 backdrop-blur-sm p-4 pt-[calc(var(--site-header-height)+0.75rem)] sm:pt-[calc(var(--site-header-height)+1rem)] overflow-y-auto flex items-start justify-center"
          onClick={() => setIsBioOpen(false)}
          role="presentation"
        >
          <div
            id={bioModalId}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} biography`}
            className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-navy">{name}</h4>
                  <p className="font-sans text-sm text-gold mt-1">{designation}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBioOpen(false)}
                  className="shrink-0 rounded-md px-2 py-1 font-sans text-sm text-gray-500 hover:bg-gray-100 hover:text-navy transition-colors inline-flex items-center gap-1"
                  aria-label="Close biography"
                >
                  <span aria-hidden className="text-base leading-none">x</span>
                  Close
                </button>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div
                className="font-sans text-base text-gray-700 leading-relaxed whitespace-pre-line [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                dangerouslySetInnerHTML={{ __html: normalizedBio || 'Biography will be updated soon.' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamCard;
