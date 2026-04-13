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
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
        className={`max-w-2xl w-[95vw] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="bg-navy py-4 px-8 flex items-center justify-between">
          <img src="/logo.png" alt="GAG Lawyers" className="h-8 w-auto" />
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/80">Disclaimer</span>
        </div>
        <div className="h-[2px] bg-amber-500" />

        <div className="px-8 py-6">
          <h2 id="disclaimer-title" className="text-xl font-bold text-slate-900 mb-1">
            Important Notice
          </h2>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">
            Bar Council of India - Mandatory Disclosure
          </p>

          <div className="max-h-[45vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 pr-1 disclaimer-scroll">
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

        <div className="border-t border-slate-100 px-8 py-5">
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onDecline}
              className="border border-slate-300 text-slate-500 hover:bg-slate-50 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 w-full sm:w-auto"
            >
              I Decline
            </button>
            <button
              type="button"
              onClick={onAgree}
              className="bg-navy hover:bg-navy-dark text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              I Agree
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center sm:text-right mt-2">
            This disclaimer is mandatory under Bar Council of India Rules, 1962
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
