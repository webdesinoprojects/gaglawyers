import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';
import { OFFICE_ADDRESS_LINE } from '../../constants/officeAddress';
import { invalidatePublicWidgetSettingsCache } from '../../utils/widgetSettingsCache';

const DEFAULT_MAIN_OFFICE_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6998.3752460208125!2d77.13081933769948!3d28.71393836202312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d010b75f3e47d%3A0x4e92383cc436853f!2sGAG%20Lawyers%20-%20Grover%20%26%20Grover%2C%20Advocates%20%7C%20Best%20Divorce%20Lawyer%20in%20Delhi%2C%20Property%20Lawyer%20in%20Delhi%2C%20Civil%20%26%20Criminal%20Lawyers!5e0!3m2!1sen!2sin!4v1775508641842!5m2!1sen!2sin';

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
    contactEmails: ['contact@gaglawyers.com'],
    contactPhones: ['+91 99962 63370'],
    officeAddresses: [OFFICE_ADDRESS_LINE],
    mainOfficeMapEmbedUrl: DEFAULT_MAIN_OFFICE_MAP_EMBED_URL,
    otherOffices: [],
    footerLocationsLimit: 200,
    footerLocationSlugs: [],
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
        setSettings((prev) => ({ ...prev, ...settingsMap }));
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

  const handleOfficeChange = (index, field, value) => {
    setSettings((prev) => ({
      ...prev,
      otherOffices: (prev.otherOffices || []).map((office, officeIndex) =>
        officeIndex === index ? { ...office, [field]: value } : office
      ),
    }));
  };

  const addOffice = () => {
    setSettings((prev) => ({
      ...prev,
      otherOffices: [
        ...(prev.otherOffices || []),
        { heading: '', address: '', email: '', phone: '', mapEmbedUrl: '' },
      ],
    }));
  };

  const removeOffice = (index) => {
    setSettings((prev) => ({
      ...prev,
      otherOffices: (prev.otherOffices || []).filter((_, officeIndex) => officeIndex !== index),
    }));
  };

  const handleListItemChange = (key, index, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key])
        ? prev[key].map((item, itemIndex) => (itemIndex === index ? value : item))
        : [],
    }));
  };

  const addListItem = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: [...(Array.isArray(prev[key]) ? prev[key] : []), ''],
    }));
  };

  const removeListItem = (key, index) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key])
        ? prev[key].filter((_, itemIndex) => itemIndex !== index)
        : [],
    }));
  };

  const footerSlugsText = Array.isArray(settings.footerLocationSlugs)
    ? settings.footerLocationSlugs.join('\n')
    : '';

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

            <div className="md:col-span-2">
              <label htmlFor="mainOfficeMapEmbedUrl" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Main Office Google Maps Embed URL
              </label>
              <input
                type="text"
                id="mainOfficeMapEmbedUrl"
                name="mainOfficeMapEmbedUrl"
                value={settings.mainOfficeMapEmbedUrl || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="border border-gray-200 rounded-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-base font-semibold text-navy">Contact Emails</h3>
                <button
                  type="button"
                  onClick={() => addListItem('contactEmails')}
                  className="text-sm text-navy font-medium hover:underline"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {(settings.contactEmails || []).length === 0 ? (
                  <p className="font-sans text-sm text-gray-500">No emails added yet.</p>
                ) : (
                  (settings.contactEmails || []).map((emailItem, index) => (
                    <div key={`email-${index}`} className="border border-gray-200 rounded-sm p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-sans text-xs font-semibold text-gray-700">
                          Email {index + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeListItem('contactEmails', index)}
                          className="text-red-600 text-xs font-medium hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="email"
                        value={emailItem || ''}
                        onChange={(e) => handleListItemChange('contactEmails', index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans text-sm"
                        placeholder="office@gaglawyers.com"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border border-gray-200 rounded-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-base font-semibold text-navy">Contact Phones</h3>
                <button
                  type="button"
                  onClick={() => addListItem('contactPhones')}
                  className="text-sm text-navy font-medium hover:underline"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {(settings.contactPhones || []).length === 0 ? (
                  <p className="font-sans text-sm text-gray-500">No phone numbers added yet.</p>
                ) : (
                  (settings.contactPhones || []).map((phoneItem, index) => (
                    <div key={`phone-${index}`} className="border border-gray-200 rounded-sm p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-sans text-xs font-semibold text-gray-700">
                          Phone {index + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeListItem('contactPhones', index)}
                          className="text-red-600 text-xs font-medium hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        value={phoneItem || ''}
                        onChange={(e) => handleListItemChange('contactPhones', index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans text-sm"
                        placeholder="+91 ..."
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-navy">Other Offices</h3>
              <Button type="button" variant="outline" onClick={addOffice}>
                Add another office
              </Button>
            </div>

            <div className="space-y-5">
              {(settings.otherOffices || []).map((office, index) => (
                <div key={`office-${index}`} className="border border-gray-200 rounded-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-sans text-sm font-semibold text-gray-800">
                      Office {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeOffice(index)}
                      className="text-red-600 text-sm font-medium hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                        Office Heading
                      </label>
                      <input
                        type="text"
                        value={office.heading || ''}
                        onChange={(e) => handleOfficeChange(index, 'heading', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                        placeholder="e.g. Mumbai Office"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={office.email || ''}
                        onChange={(e) => handleOfficeChange(index, 'email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                        placeholder="office@gaglawyers.com"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        value={office.phone || ''}
                        onChange={(e) => handleOfficeChange(index, 'phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                        placeholder="+91 ..."
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                        Google Maps Embed URL
                      </label>
                      <input
                        type="text"
                        value={office.mapEmbedUrl || ''}
                        onChange={(e) => handleOfficeChange(index, 'mapEmbedUrl', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                        placeholder="https://www.google.com/maps?q=...&output=embed"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={office.address || ''}
                        onChange={(e) => handleOfficeChange(index, 'address', e.target.value)}
                        rows="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                        placeholder="Full office address"
                      />
                    </div>
                  </div>
                </div>
              ))}
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

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="font-serif text-xl font-semibold text-navy mb-6">Footer Locations</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="footerLocationsLimit" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Default Footer Locations Count
              </label>
              <input
                type="number"
                id="footerLocationsLimit"
                name="footerLocationsLimit"
                min="1"
                max="5000"
                value={settings.footerLocationsLimit ?? 200}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footerLocationsLimit: Math.max(1, Math.min(5000, parseInt(e.target.value || '200', 10))),
                  }))
                }
                className="w-full max-w-[220px] px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
              />
              <p className="mt-2 text-xs text-gray-500 font-sans">
                Used when no manual location list is provided.
              </p>
            </div>

            <div>
              <label htmlFor="footerLocationSlugs" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Manual Footer Location Slugs (one per line)
              </label>
              <textarea
                id="footerLocationSlugs"
                value={footerSlugsText}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footerLocationSlugs: e.target.value
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean),
                  }))
                }
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                placeholder="example-slug-in-delhi&#10;another-slug-in-mumbai"
              />
              <p className="mt-2 text-xs text-gray-500 font-sans">
                If provided, footer will show exactly these active locations in this order.
              </p>
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
