import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    disclaimerEnabled: true,
    disclaimerText: 'The information provided on this website is for general informational purposes only. It does not constitute legal advice and should not be relied upon as such. No attorney-client relationship is created by use of this website or its content.\n\nFor specific legal advice regarding your individual situation, please consult directly with a qualified attorney at our firm. Past results do not guarantee future outcomes.',
    whatsappEnabled: true,
    whatsappNumber: '+919876543210',
    phoneNumber: '+919876543210',
    email: 'contact@gaglawyers.com',
    address: '123 Lawyers Colony, Connaught Place, New Delhi - 110001',
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
                placeholder="+919876543210"
              />
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
