import React, { useCallback, useEffect, useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import { useGuidedChatbot } from '../hooks/useGuidedChatbot';
import GuidedChatbotPanel from './chatbot/GuidedChatbotPanel';

const WIDGET_SETTINGS_CACHE_KEY = 'gag-widget-settings-v1';
let widgetSettingsCache = null;

const FloatingWidgets = () => {
  const location = useLocation();
  const [settings, setSettings] = useState({
    whatsappEnabled: false,
    whatsappNumber: '',
    phoneNumber: ''
  });
  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Don't show widgets in admin panel
  const isAdminPanel = location.pathname.startsWith('/admin');

  useEffect(() => {
    let isMounted = true;
    let visibilityTimer;

    if (!isAdminPanel) {
      fetchSettings().then((nextSettings) => {
        if (isMounted && nextSettings) {
          setSettings(nextSettings);
        }
      });
      // Show widgets after a small delay for better UX
      visibilityTimer = setTimeout(() => {
        if (isMounted) {
          setIsVisible(true);
        }
      }, 1000);
    }

    return () => {
      isMounted = false;
      if (visibilityTimer) {
        clearTimeout(visibilityTimer);
      }
    };
  }, [isAdminPanel]);

  const fetchSettings = async () => {
    if (widgetSettingsCache) {
      return widgetSettingsCache;
    }

    const cachedSettings = sessionStorage.getItem(WIDGET_SETTINGS_CACHE_KEY);
    if (cachedSettings) {
      const parsedSettings = JSON.parse(cachedSettings);
      widgetSettingsCache = parsedSettings;
      return parsedSettings;
    }

    try {
      const [whatsappEnabledRes, whatsappNumberRes, phoneNumberRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/settings/whatsappEnabled`),
        fetch(`${API_BASE_URL}/api/settings/whatsappNumber`),
        fetch(`${API_BASE_URL}/api/settings/phoneNumber`)
      ]);

      const whatsappEnabledData = await whatsappEnabledRes.json();
      const whatsappNumberData = await whatsappNumberRes.json();
      const phoneNumberData = await phoneNumberRes.json();

      const nextSettings = {
        whatsappEnabled: whatsappEnabledData.success ? whatsappEnabledData.data.settingValue : false,
        whatsappNumber: whatsappNumberData.success ? whatsappNumberData.data.settingValue : '',
        phoneNumber: phoneNumberData.success ? phoneNumberData.data.settingValue : ''
      };

      widgetSettingsCache = nextSettings;
      sessionStorage.setItem(WIDGET_SETTINGS_CACHE_KEY, JSON.stringify(nextSettings));

      return nextSettings;
    } catch (error) {
      console.error('Error fetching widget settings:', error);
      return null;
    }
  };

  const handleWhatsAppClick = useCallback(() => {
    if (settings.whatsappNumber) {
      const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
      const message = encodeURIComponent('Hello! I would like to inquire about your legal services.');
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
    }
  }, [settings.whatsappNumber]);

  const handlePhoneClick = () => {
    if (settings.phoneNumber) {
      window.location.href = `tel:${settings.phoneNumber}`;
    }
  };

  const handleChatClick = () => {
    setShowChat(!showChat);
  };

  const guidedChatbot = useGuidedChatbot({
    onWhatsApp: handleWhatsAppClick,
    typingDelayMs: 420,
  });

  // Hide entire widget rail on admin; public site always gets guided assistant
  if (isAdminPanel) {
    return null;
  }

  const hasWhatsApp = settings.whatsappEnabled && settings.whatsappNumber;
  const hasPhone = Boolean(settings.phoneNumber);

  return (
    <>
      {/* Right Side Widgets Stack - Bottom Right */}
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
        {/* Chat Widget Button */}
        <button
          onClick={handleChatClick}
          className="group relative w-14 h-14 bg-gold hover:bg-gold/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          title="GAG Assistant"
        >
          {showChat ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {showChat ? 'Close' : 'Help & options'}
          </span>

          {/* Notification Badge */}
          {!showChat && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </button>

        {/* WhatsApp Button */}
        {hasWhatsApp && (
          <button
            onClick={handleWhatsAppClick}
            className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
            title="Chat on WhatsApp"
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat on WhatsApp
            </span>

            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
          </button>
        )}
      </div>

      {/* Phone Button - Bottom Left */}
      {hasPhone && (
        <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <button
            onClick={handlePhoneClick}
            className="group relative w-16 h-16 bg-navy hover:bg-navy/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
            title="Call Us"
          >
            <Phone className="w-7 h-7" />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Call: {settings.phoneNumber}
            </span>

            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-navy animate-ping opacity-20"></span>
          </button>
        </div>
      )}

      {showChat && (
        <GuidedChatbotPanel
          messages={guidedChatbot.messages}
          currentOptions={guidedChatbot.currentOptions}
          currentNodeId={guidedChatbot.currentNodeId}
          stack={guidedChatbot.stack}
          isTyping={guidedChatbot.isTyping}
          selectOption={guidedChatbot.selectOption}
          goBack={guidedChatbot.goBack}
          startOver={guidedChatbot.startOver}
          onClose={() => setShowChat(false)}
          phoneDisplay={hasPhone ? settings.phoneNumber : ''}
        />
      )}
    </>
  );
};

export default FloatingWidgets;
