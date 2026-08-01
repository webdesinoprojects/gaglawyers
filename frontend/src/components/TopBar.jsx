import React, { useEffect, useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { getSocial, HEADER_DEFAULT_LINKS } from '../constants/socialLinks';
import { getGlobalSettings } from '../utils/globalSettings';

const TopBar = () => {
  // Social links: fall back to today's exact hardcoded set until a managed list exists.
  const [socials, setSocials] = useState(HEADER_DEFAULT_LINKS);

  useEffect(() => {
    let cancelled = false;
    getGlobalSettings().then((gs) => {
      if (cancelled) return;
      const arr = gs && Array.isArray(gs.socialLinks) ? gs.socialLinks : null;
      if (arr && arr.length) {
        const h = arr
          .filter((l) => l && l.showInHeader && l.url)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setSocials(h);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bg-navy-dark text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 gap-3 sm:py-2.5">
          {/* Left - Contact Info */}
          <div className="topbar-ticker sm:hidden">
            <div className="topbar-ticker-track">
              <div className="topbar-ticker-group">
                <a
                  href="tel:+919996263370"
                  className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:text-gold"
                >
                  <Phone size={14} strokeWidth={2} />
                  <span className="font-sans font-medium">+91-9996263370</span>
                </a>
                <a
                  href="tel:+911161381058"
                  className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:text-gold"
                >
                  <Phone size={14} strokeWidth={2} />
                  <span className="font-sans font-medium">+91-1161381058</span>
                </a>
                <a
                  href="mailto:contact@gaglawyers.com"
                  className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:text-gold"
                >
                  <Mail size={14} strokeWidth={2} />
                  <span className="font-sans font-medium">contact@gaglawyers.com</span>
                </a>
              </div>
              <div className="topbar-ticker-group" aria-hidden="true">
                <a
                  href="tel:+919996263370"
                  className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:text-gold"
                >
                  <Phone size={14} strokeWidth={2} />
                  <span className="font-sans font-medium">+91-9996263370</span>
                </a>
                <a
                  href="tel:+911161381058"
                  className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:text-gold"
                >
                  <Phone size={14} strokeWidth={2} />
                  <span className="font-sans font-medium">+91-1161381058</span>
                </a>
                <a
                  href="mailto:contact@gaglawyers.com"
                  className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:text-gold"
                >
                  <Mail size={14} strokeWidth={2} />
                  <span className="font-sans font-medium">contact@gaglawyers.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center gap-3 overflow-x-auto whitespace-nowrap text-[11px] sm:flex sm:w-auto sm:flex-wrap sm:gap-4 sm:text-xs lg:gap-6 lg:text-sm">
            <a 
              href="tel:+919996263370" 
              className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:text-gold"
            >
              <Phone size={14} strokeWidth={2} />
              <span className="font-sans font-medium">+91-9996263370</span>
            </a>
            
            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
            
            <a 
              href="tel:+911161381058" 
              className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:text-gold"
            >
              <Phone size={14} strokeWidth={2} />
              <span className="font-sans font-medium">+91-1161381058</span>
            </a>
            
            <div className="hidden lg:block w-px h-4 bg-white/20"></div>
            
            <a 
              href="mailto:contact@gaglawyers.com" 
              className="flex shrink-0 items-center gap-1.5 text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:text-gold"
            >
              <Mail size={14} strokeWidth={2} />
              <span className="font-sans font-medium">contact@gaglawyers.com</span>
            </a>
          </div>

          {/* Right - Social Media */}
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            {socials.map((s) => {
              const ic = getSocial(s.platform);
              return (
                <a
                  key={`${s.platform}-${s.url}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-gold text-gray-300 hover:text-navy transition-all duration-200"
                  aria-label={ic.label}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={ic.path} />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
