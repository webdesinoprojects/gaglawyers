import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const DISCLAIMER_TEXT = {
  title: 'Disclaimer',
  intro:
    'Current rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers to provide information concerning their areas of practice. GAG Lawyers – Grover & Grover Advocates & Solicitors is, therefore, constrained from providing any further information on this web page.',
  lead:
    "The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on 'I AGREE', the user acknowledges that:",
  bullets: [
    'The user wishes to gain more information about GAG Lawyers – Grover & Grover Advocates & Solicitors, its practice areas and its attorneys, for his/her own information and use.',
    "The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user's volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship.",
    'None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.',
    'GAG Lawyers – Grover & Grover Advocates & Solicitors is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.',
  ],
};

export default function DisclaimerModal({ onAgree, onDecline }) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const blockEscape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener('keydown', blockEscape, true);
    return () => window.removeEventListener('keydown', blockEscape, true);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-transparent">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
        className={`flex h-[76dvh] max-h-[760px] w-full flex-col overflow-hidden border-t-4 border-amber-500 bg-[#f8f5e9] shadow-[0_-18px_45px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-out sm:h-auto sm:max-h-[68vh] ${
          animateIn ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex flex-none items-center justify-between bg-navy px-5 py-3 sm:px-10 lg:px-16">
          <span className="brand-logo-shell">
            <img src="/logo.png" alt="GAG Lawyers" className="h-7 w-auto" />
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/80">Disclaimer</span>
            <button
              type="button"
              onClick={onDecline}
              aria-label="Close disclaimer"
              className="text-white/80 hover:text-white text-xl leading-none"
            >
              x
            </button>
          </div>
        </div>
        <div className="h-[2px] flex-none bg-amber-500" />

        <div className="flex min-h-0 flex-1 flex-col px-5 py-4 sm:px-10 sm:py-5 lg:px-16">
          <h2 id="disclaimer-title" className="text-xl font-bold text-slate-900 mb-1">
            Important Notice
          </h2>
          <p className="mb-4 text-xs uppercase tracking-widest text-slate-400 sm:mb-5">
            Bar Council of India - Mandatory Disclosure
          </p>

          <div className="disclaimer-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pr-3 sm:pr-5">
            <p className="text-sm font-semibold text-slate-700 leading-relaxed mb-4">{DISCLAIMER_TEXT.title}</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{DISCLAIMER_TEXT.intro}</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{DISCLAIMER_TEXT.lead}</p>

            <div>
              {DISCLAIMER_TEXT.bullets.map((item, idx) => (
                <div
                  key={idx}
                  className="border-l-2 border-amber-500 pl-4 py-1 mb-3 text-sm text-slate-600 leading-relaxed"
                >
                  <span className="font-semibold text-slate-500 mr-2">•</span>
                  {item}
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100">
              By proceeding, you also acknowledge that you have read and agree to our{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 underline underline-offset-2 hover:text-amber-800"
              >
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 underline underline-offset-2 hover:text-amber-800"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex-none border-t border-slate-300/70 bg-[#f8f5e9] px-5 py-4 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex w-full gap-3 sm:w-auto">
            <button
              type="button"
              onClick={onDecline}
              className="w-full min-w-32 bg-slate-100 px-8 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-200 sm:w-auto"
            >
              I Decline
            </button>
            <button
              type="button"
              onClick={onAgree}
              className="w-full min-w-32 bg-navy px-8 py-2.5 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-navy-dark sm:w-auto"
            >
              I Agree
            </button>
            </div>
            <p className="text-center text-xs text-slate-400 sm:text-right">
              This disclaimer is mandatory under Bar Council of India Rules, 1962
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
