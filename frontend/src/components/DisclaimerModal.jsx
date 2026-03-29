import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [disclaimerText, setDisclaimerText] = useState('');
  const [disclaimerEnabled, setDisclaimerEnabled] = useState(true);

  useEffect(() => {
    fetchDisclaimerSettings();
  }, []);

  const fetchDisclaimerSettings = async () => {
    try {
      const [enabledRes, textRes] = await Promise.all([
        fetch('http://localhost:5000/api/settings/disclaimerEnabled'),
        fetch('http://localhost:5000/api/settings/disclaimerText'),
      ]);

      const enabledData = await enabledRes.json();
      const textData = await textRes.json();

      if (enabledData.success) {
        setDisclaimerEnabled(enabledData.data.settingValue);
      }

      if (textData.success) {
        setDisclaimerText(textData.data.settingValue);
      }

      const hasAccepted = localStorage.getItem('gaglawyers-disclaimer-accepted');
      if (!hasAccepted && (enabledData.data?.settingValue !== false)) {
        setIsOpen(true);
      }
    } catch (error) {
      const hasAccepted = localStorage.getItem('gaglawyers-disclaimer-accepted');
      if (!hasAccepted) {
        setDisclaimerText('The information provided on this website is for general informational purposes only. It does not constitute legal advice and should not be relied upon as such. No attorney-client relationship is created by use of this website or its content.\n\nFor specific legal advice regarding your individual situation, please consult directly with a qualified attorney at our firm. Past results do not guarantee future outcomes.');
        setIsOpen(true);
      }
    }
  };

  const handleAccept = () => {
    localStorage.setItem('gaglawyers-disclaimer-accepted', 'true');
    setIsOpen(false);
  };

  if (!isOpen || !disclaimerEnabled) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleAccept}
          className="absolute top-4 right-4 text-gray-400 hover:text-navy transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 lg:p-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-6">
            Disclaimer
          </h2>

          <div className="space-y-4 font-sans text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
            {disclaimerText || 'Loading...'}
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleAccept}
            className="w-full"
          >
            I Understand & Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
