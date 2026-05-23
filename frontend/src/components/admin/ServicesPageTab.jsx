import React, { useState } from 'react';
import { 
  Sparkles, 
  Image, 
  Type, 
  Palette, 
  Eye,
  Upload,
  ExternalLink,
  CheckCircle2,
  Star,
  Award,
  Users,
  TrendingUp,
  Scale
} from 'lucide-react';

/**
 * Services Page Tab - Manage how this service appears on /services page
 */
const ServicesPageTab = ({ serviceData, onUpdate }) => {
  const [imagePreview, setImagePreview] = useState(false);

  const updateServiceField = (field, value) => {
    onUpdate({
      ...serviceData,
      [field]: value,
    });
  };

  const servicesPageSettings = serviceData.servicesPageSettings || {};

  const updateServicesPageSettings = (field, value) => {
    onUpdate({
      ...serviceData,
      servicesPageSettings: {
        ...servicesPageSettings,
        [field]: value,
      },
    });
  };

  // Suggested Unsplash search terms based on service type
  const getSuggestedSearchTerms = () => {
    const serviceName = serviceData.name?.toLowerCase() || '';
    const suggestions = [];

    if (serviceName.includes('criminal') || serviceName.includes('bail')) {
      suggestions.push('justice', 'courthouse', 'legal documents', 'judge gavel');
    } else if (serviceName.includes('corporate') || serviceName.includes('business')) {
      suggestions.push('business meeting', 'corporate office', 'handshake', 'contract signing');
    } else if (serviceName.includes('family') || serviceName.includes('divorce')) {
      suggestions.push('family', 'mediation', 'counseling', 'agreement');
    } else if (serviceName.includes('property') || serviceName.includes('real estate')) {
      suggestions.push('real estate', 'property', 'building', 'architecture');
    } else if (serviceName.includes('cyber') || serviceName.includes('technology')) {
      suggestions.push('cybersecurity', 'technology', 'digital', 'computer');
    } else {
      suggestions.push('law', 'legal', 'justice', 'courthouse');
    }

    return suggestions;
  };

  const suggestedTerms = getSuggestedSearchTerms();

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Services Page Appearance
              </h2>
              <p className="text-sm text-gray-600">
                Control how this service appears on the main /services page with the new modern design.
                These settings affect the service card, featured spotlight, and search results.
              </p>
            </div>
          </div>
        </div>

        {/* Visibility Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-gray-600" />
            Visibility Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                id="service-active"
                type="checkbox"
                checked={serviceData.isActive !== false}
                onChange={(e) => updateServiceField('isActive', e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="service-active" className="text-sm font-semibold text-gray-900 cursor-pointer">
                  Service Page Active
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Controls whether the public service detail URL is active.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                id="show-on-homepage"
                type="checkbox"
                checked={servicesPageSettings.showOnHomepage !== false}
                onChange={(e) => updateServicesPageSettings('showOnHomepage', e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="show-on-homepage" className="text-sm font-semibold text-gray-900 cursor-pointer">
                  Show on Homepage Services
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Controls whether this service appears in homepage service listings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                id="show-on-services-page"
                type="checkbox"
                checked={servicesPageSettings.showOnServicesPage !== false}
                onChange={(e) => updateServicesPageSettings('showOnServicesPage', e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="show-on-services-page" className="text-sm font-semibold text-gray-900 cursor-pointer">
                  Show in Services Listing
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Controls whether this service appears on `/services` cards and search.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <input
                id="featured-service"
                type="checkbox"
                checked={servicesPageSettings.isFeatured || false}
                onChange={(e) => updateServicesPageSettings('isFeatured', e.target.checked)}
                className="h-5 w-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <div className="flex-1">
                <label htmlFor="featured-service" className="text-sm font-semibold text-gray-900 cursor-pointer flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  Featured Service
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Featured services appear in the spotlight section with enhanced visibility
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Priority (Order)
              </label>
              <input
                type="number"
                value={servicesPageSettings.displayOrder || 0}
                onChange={(e) => updateServicesPageSettings('displayOrder', parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="0"
                min="0"
              />
              <p className="mt-1 text-xs text-gray-500">
                Lower numbers appear first. Services with same priority are sorted alphabetically.
              </p>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Type className="h-5 w-5 text-gray-600" />
            Card Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Title
              </label>
              <input
                type="text"
                value={servicesPageSettings.cardTitle || serviceData.name || ''}
                onChange={(e) => updateServicesPageSettings('cardTitle', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder={serviceData.name || 'Service Title'}
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty to use the service name. Keep it short (2-5 words).
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Summary
              </label>
              <textarea
                value={serviceData.shortDescription || ''}
                onChange={(e) => updateServiceField('shortDescription', e.target.value)}
                rows={3}
                maxLength={200}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="Brief description shown on the service card (150-200 characters recommended)"
              />
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  This appears in the card preview and search results
                </p>
                <span className="text-xs text-gray-400">
                  {(serviceData.shortDescription || '').length}/200
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Image */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Image className="h-5 w-5 text-gray-600" />
            Card Image
          </h3>
          
          <div className="space-y-4">
            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={serviceData.cardImageUrl || ''}
                  onChange={(e) => {
                    updateServiceField('cardImageUrl', e.target.value);
                    setImagePreview(false);
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  placeholder="https://images.unsplash.com/photo-..."
                />
                <button
                  onClick={() => setImagePreview(!imagePreview)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Recommended: 1200x800px or larger, landscape orientation
              </p>
            </div>

            {/* Image Preview */}
            {imagePreview && serviceData.cardImageUrl && (
              <div className="rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={serviceData.cardImageUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>
            )}

            {/* Alt Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Alt Text (Accessibility)
              </label>
              <input
                type="text"
                value={serviceData.cardImageAlt || ''}
                onChange={(e) => updateServiceField('cardImageAlt', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="Descriptive text for screen readers"
              />
              <p className="mt-1 text-xs text-gray-500">
                Describe what's in the image for accessibility and SEO
              </p>
            </div>

            {/* Unsplash Suggestions */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <Upload className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Find Images on Unsplash
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Suggested search terms for this service:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {suggestedTerms.map((term, index) => (
                      <a
                        key={index}
                        href={`https://unsplash.com/s/photos/${encodeURIComponent(term)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200 transition-colors"
                      >
                        {term}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    💡 Tip: Right-click on an Unsplash image → "Copy image address" → Paste above
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Badges */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-gray-600" />
            Card Badges
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Select which badges to display on this service card
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors">
              <input
                type="checkbox"
                checked={servicesPageSettings.showExpertTeamBadge !== false}
                onChange={(e) => updateServicesPageSettings('showExpertTeamBadge', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Expert Team</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
              <input
                type="checkbox"
                checked={servicesPageSettings.showProvenResultsBadge !== false}
                onChange={(e) => updateServicesPageSettings('showProvenResultsBadge', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Proven Results</span>
            </label>
          </div>
        </div>

        {/* Hero Stats Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            Custom Stats (Optional)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Override default stats when this service is featured
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Years Experience
              </label>
              <input
                type="text"
                value={servicesPageSettings.customStats?.experience || ''}
                onChange={(e) => updateServicesPageSettings('customStats', {
                  ...servicesPageSettings.customStats,
                  experience: e.target.value
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="25+"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Happy Clients
              </label>
              <input
                type="text"
                value={servicesPageSettings.customStats?.clients || ''}
                onChange={(e) => updateServicesPageSettings('customStats', {
                  ...servicesPageSettings.customStats,
                  clients: e.target.value
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="1000+"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Success Rate
              </label>
              <input
                type="text"
                value={servicesPageSettings.customStats?.successRate || ''}
                onChange={(e) => updateServicesPageSettings('customStats', {
                  ...servicesPageSettings.customStats,
                  successRate: e.target.value
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="95%"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Cases Handled
              </label>
              <input
                type="text"
                value={servicesPageSettings.customStats?.casesHandled || ''}
                onChange={(e) => updateServicesPageSettings('customStats', {
                  ...servicesPageSettings.customStats,
                  casesHandled: e.target.value
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="500+"
              />
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            Card Preview
          </h3>
          <div className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg max-w-sm">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={serviceData.cardImageUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80'}
                alt={serviceData.cardImageAlt || 'Service preview'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-transparent" />
              <span className="absolute top-3 right-3 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {serviceData.isActive !== false ? 'Active' : 'Inactive'}
              </span>
              {servicesPageSettings.isFeatured && (
                <span className="absolute top-3 left-3 bg-white/90 text-amber-600 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </span>
              )}
            </div>
            {/* Content */}
            <div className="p-4 space-y-3">
              <h4 className="font-serif text-xl font-bold text-slate-900 line-clamp-2">
                {servicesPageSettings.cardTitle || serviceData.name || 'Service Title'}
              </h4>
              <p className="text-sm text-slate-600 line-clamp-3">
                {serviceData.shortDescription || 'Add a short description to see it here...'}
              </p>
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {servicesPageSettings.showExpertTeamBadge !== false && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    <CheckCircle2 className="h-3 w-3" />
                    Expert Team
                  </span>
                )}
                {servicesPageSettings.showProvenResultsBadge !== false && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    <Star className="h-3 w-3" />
                    Proven Results
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPageTab;
