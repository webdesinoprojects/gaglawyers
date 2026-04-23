import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';
import { OFFICE_ADDRESS_LINE } from '../../constants/officeAddress';
import { invalidatePublicWidgetSettingsCache } from '../../utils/widgetSettingsCache';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    disclaimerEnabled: true,
    disclaimerText: `Current rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers to provide information concerning their areas of practice. GAG Lawyers – Grover & Grover Advocates & Solicitors is, therefore, constrained from providing any further information on this web page.

The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on “I AGREE”, the user acknowledges that:
• The user wishes to gain more information about GAG Lawyers – Grover & Grover Advocates & Solicitors, its practice areas and its attorneys, for his/her own information and use
• The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user’s volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship
• None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.
• GAG Lawyers – Grover & Grover Advocates & Solicitors is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.`,
    whatsappEnabled: true,
    whatsappNumber: '+919996263370',
    tawkEnabled: false,
    tawkPropertyId: '',
    tawkWidgetId: '',
    phoneNumber: '+919996263370',
    email: 'contact@gaglawyers.com',
    address: OFFICE_ADDRESS_LINE,
    copyProtectionEnabled: false,
    rightClickDisabled: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        const settingsMap = {};
        data.data.forEach(setting => {
          settingsMap[setting.settingKey] = setting.settingValue;
        });
        setSettings({ ...settings, ...settingsMap });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('adminToken');

    try {
      const updates = Object.keys(settings).map(async (key) => {
        return fetch(`${API_BASE_URL}/api/settings/${key}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            settingValue: settings[key],
            description: key,
          }),
        });
      });

      await Promise.all(updates);
      invalidatePublicWidgetSettingsCache();
      setMessage('✓ Settings saved successfully! Changes will take effect immediately.');
      
      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      setMessage('✗ Error saving settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Site Settings</h1>
        <p className="font-sans text-gray-600">Configure global website settings</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-slideDown ${
          message.includes('✓') 
            ? 'bg-green-50 text-green-800 border-2 border-green-200' 
            : 'bg-red-50 text-red-800 border-2 border-red-200'
        }`}>
          <div className="flex-shrink-0">
            {message.includes('✓') ? (
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="font-sans text-sm font-medium flex-1">{message}</p>
          <button
            onClick={() => setMessage('')}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="font-serif text-xl font-semibold text-navy mb-6">Disclaimer Popup</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="disclaimerEnabled"
                name="disclaimerEnabled"
                checked={settings.disclaimerEnabled}
                onChange={handleChange}
                className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
              />
              <label htmlFor="disclaimerEnabled" className="font-sans text-sm font-medium text-gray-700">
                Enable Disclaimer Popup on Site Load
              </label>
            </div>

            <div>
              <label htmlFor="disclaimerText" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Disclaimer Text
              </label>
              <textarea
                id="disclaimerText"
                name="disclaimerText"
                value={settings.disclaimerText}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="font-serif text-xl font-semibold text-navy mb-6">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phoneNumber" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Office Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="font-serif text-xl font-semibold text-navy mb-6">WhatsApp Integration</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="whatsappEnabled"
                name="whatsappEnabled"
                checked={settings.whatsappEnabled}
                onChange={handleChange}
                className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
              />
              <label htmlFor="whatsappEnabled" className="font-sans text-sm font-medium text-gray-700">
                Enable WhatsApp Widget
              </label>
            </div>

            <div>
              <label htmlFor="whatsappNumber" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                id="whatsappNumber"
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                placeholder="International format, e.g. +91…"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="font-serif text-xl font-semibold text-navy mb-6">Tawk Live Chat</h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="tawkEnabled"
                name="tawkEnabled"
                checked={Boolean(settings.tawkEnabled)}
                onChange={handleChange}
                className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
              />
              <label htmlFor="tawkEnabled" className="font-sans text-sm font-medium text-gray-700">
                Enable Tawk Live Chat Widget
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tawkPropertyId" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Tawk Property ID
                </label>
                <input
                  type="text"
                  id="tawkPropertyId"
                  name="tawkPropertyId"
                  value={settings.tawkPropertyId || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                  placeholder="e.g. 67f0f6f5f00f4d190f7061f2"
                />
              </div>

              <div>
                <label htmlFor="tawkWidgetId" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Tawk Widget ID
                </label>
                <input
                  type="text"
                  id="tawkWidgetId"
                  name="tawkWidgetId"
                  value={settings.tawkWidgetId || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                  placeholder="e.g. 1io2bj6eo"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://dashboard.tawk.to/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-navy/20 px-4 py-2 text-sm font-medium text-navy hover:bg-navy hover:text-white transition-colors"
              >
                Manage Tawk Dashboard
              </a>
              <p className="font-sans text-xs text-gray-500">
                After saving, public pages will use Admin values first; env values are fallback.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="font-serif text-xl font-semibold text-navy mb-6">Content Protection</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="rightClickDisabled"
                name="rightClickDisabled"
                checked={settings.rightClickDisabled}
                onChange={handleChange}
                className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
              />
              <label htmlFor="rightClickDisabled" className="font-sans text-sm font-medium text-gray-700">
                Disable Right Click
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="copyProtectionEnabled"
                name="copyProtectionEnabled"
                checked={settings.copyProtectionEnabled}
                onChange={handleChange}
                className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
              />
              <label htmlFor="copyProtectionEnabled" className="font-sans text-sm font-medium text-gray-700">
                Disable Text Selection
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            <Save className="inline mr-2" size={20} />
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;
