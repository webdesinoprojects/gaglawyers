import React from 'react';
import { Globe } from 'lucide-react';

/**
 * SEO Tab - SEO settings and global settings
 */
const SeoTab = ({ serviceData, onUpdate }) => {
  const seo = serviceData.seo || {};
  const globalSettings = serviceData.globalSettings || {};
  const isActive = serviceData.isActive !== false;

  const updateSeo = (field, value) => {
    onUpdate({
      ...serviceData,
      seo: { ...seo, [field]: value },
    });
  };

  const updateGlobalSettings = (field, value) => {
    onUpdate({
      ...serviceData,
      globalSettings: { ...globalSettings, [field]: value },
    });
  };

  const updateServiceField = (field, value) => {
    onUpdate({
      ...serviceData,
      [field]: value,
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* SEO Settings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            SEO Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={seo.title || ''}
                onChange={(e) => updateSeo('title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Expert Cheque Bounce Lawyers | Legal Services"
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended: 50-60 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={seo.metaDescription || ''}
                onChange={(e) => updateSeo('metaDescription', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Professional legal assistance for cheque bounce cases. Free consultation available."
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended: 150-160 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Keywords
              </label>
              <input
                type="text"
                value={seo.keywords || ''}
                onChange={(e) => updateSeo('keywords', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="bail lawyer in delhi, bail advocate, criminal bail legal services"
              />
              <p className="mt-1 text-xs text-gray-500">
                Comma-separated keywords relevant to this service page
              </p>
            </div>

            {/* SEO Preview */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2">
                    Google Search Preview
                  </p>
                  <div className="space-y-1">
                    <div className="text-blue-600 text-lg font-medium">
                      {seo.title || serviceData.name || 'Service Title'}
                    </div>
                    <div className="text-green-700 text-sm">yoursite.com/{serviceData.slug}</div>
                    <div className="text-gray-600 text-sm">
                      {seo.metaDescription ||
                        'Add a meta description to see how it appears in search results.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Listing Settings */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Service Listing Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
              <input
                id="service-active-toggle"
                type="checkbox"
                checked={isActive}
                onChange={(e) => updateServiceField('isActive', e.target.checked)}
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="service-active-toggle" className="text-sm font-medium text-gray-800">
                Service Active (shows on public menus and /services page)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Summary (for /services page)
              </label>
              <textarea
                value={serviceData.shortDescription || ''}
                onChange={(e) => updateServiceField('shortDescription', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Short summary shown in service cards."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Image URL
              </label>
              <input
                type="text"
                value={serviceData.cardImageUrl || ''}
                onChange={(e) => updateServiceField('cardImageUrl', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Image Alt Text
              </label>
              <input
                type="text"
                value={serviceData.cardImageAlt || ''}
                onChange={(e) => updateServiceField('cardImageAlt', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Descriptive image text for accessibility"
              />
            </div>
          </div>
        </div>

        {/* Global Settings */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Global Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={globalSettings.primaryColor || '#c9a84c'}
                  onChange={(e) => updateGlobalSettings('primaryColor', e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={globalSettings.primaryColor || '#c9a84c'}
                  onChange={(e) => updateGlobalSettings('primaryColor', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="#c9a84c"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Used for buttons, accents, and highlights
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firm Name
              </label>
              <input
                type="text"
                value={globalSettings.firmName || ''}
                onChange={(e) => updateGlobalSettings('firmName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="GAG Lawyers"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <input
                type="text"
                value={globalSettings.logoUrl || ''}
                onChange={(e) => updateGlobalSettings('logoUrl', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default CTA Link
              </label>
              <input
                type="text"
                value={globalSettings.defaultCtaLink || ''}
                onChange={(e) => updateGlobalSettings('defaultCtaLink', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="/contact"
              />
              <p className="mt-1 text-xs text-gray-500">
                Default link for call-to-action buttons
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoTab;
