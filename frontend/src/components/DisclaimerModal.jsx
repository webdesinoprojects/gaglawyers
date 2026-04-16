import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import API_BASE_URL from '../config/api';

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [disclaimerText, setDisclaimerText] = useState('');
  const [disclaimerEnabled, setDisclaimerEnabled] = useState(true);

  useEffect(() => {
    fetchDisclaimerSettings();
  }, []);

  const fetchDisclaimerSettings = async () => {
    // Check if user already accepted disclaimer
    const hasAccepted = localStorage.getItem('gaglawyers-disclaimer-accepted');
    if (hasAccepted === 'true') {
      setIsOpen(false);
      return;
    }

    try {
      const [enabledRes, textRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/settings/disclaimerEnabled`),
        fetch(`${API_BASE_URL}/api/settings/disclaimerText`),
      ]);

      const enabledData = await enabledRes.json();
      const textData = await textRes.json();

      if (enabledData.success) {
        setDisclaimerEnabled(enabledData.data.settingValue);
      }

      if (textData.success) {
        setDisclaimerText(textData.data.settingValue);
      }

      if (enabledData.data?.settingValue !== false) {
        setIsOpen(true);
      }
    } catch (error) {
      setDisclaimerText(`Current rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers to provide information concerning their areas of practice. GAG Lawyers – Grover & Grover Advocates & Solicitors is, therefore, constrained from providing any further information on this web page.

The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on “I AGREE”, the user acknowledges that:
• The user wishes to gain more information about GAG Lawyers – Grover & Grover Advocates & Solicitors, its practice areas and its attorneys, for his/her own information and use
• The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user’s volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship
• None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.
• GAG Lawyers – Grover & Grover Advocates & Solicitors is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.`);
      setIsOpen(true);
    }
  };

  const handleAccept = () => {
    localStorage.setItem('gaglawyers-disclaimer-accepted', 'true');
    setIsOpen(false);
  };

  if (!isOpen || !disclaimerEnabled) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/60 backdrop-blur-sm md:items-center md:p-4">
      <div className="relative flex h-full w-full max-h-[100dvh] flex-col overflow-hidden bg-white shadow-2xl md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-2xl md:overflow-y-auto">
        <button
          type="button"
          onClick={handleAccept}
          aria-label="Close disclaimer"
          className="absolute right-2 top-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-navy md:right-3 md:top-3"
        >
          <X size={24} />
        </button>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 pt-14 md:p-8 lg:p-10">
          <h2 className="mb-4 font-serif text-xl font-bold leading-snug text-navy md:mb-6 md:text-3xl lg:text-4xl">
            Disclaimer
          </h2>

          <div className="mb-6 max-w-prose space-y-4 font-sans text-sm leading-normal text-gray-700 whitespace-pre-line md:mb-8 md:text-base">
            {disclaimerText || 'Loading...'}
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleAccept}
            className="mt-auto w-full min-h-[48px] md:w-full"
          >
            I AGREE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
