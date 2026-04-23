import React, { useState } from 'react';
import { Loader2, ExternalLink, Save } from 'lucide-react';
import SectionsTab from './SectionsTab';
import SeoTab from './SeoTab';
import ServicesPageTab from './ServicesPageTab';

/**
 * Service Editor - Right panel with tabs
 */
const ServiceEditor = ({
  serviceData,
  loading,
  saving,
  hasUnsavedChanges,
  onUpdate,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState('sections');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  // Debug logging
  console.log('ServiceEditor render - serviceData:', serviceData);
  console.log('ServiceEditor render - loading:', loading);

  // Empty state when no service selected
  if (!serviceData && !loading) {
    console.log('Showing empty state');
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-full w-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No service selected
          </h3>
          <p className="text-sm text-gray-500">
            Select a service from the left to start editing
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    console.log('Showing loading state');
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-sm text-gray-600">Loading service...</p>
        </div>
      </div>
    );
  }

  const handleNameEdit = () => {
    setTempName(serviceData.name);
    setEditingName(true);
  };

  const handleNameSave = () => {
    if (tempName.trim()) {
      onUpdate({ ...serviceData, name: tempName.trim() });
    }
    setEditingName(false);
  };

  const handleNameCancel = () => {
    setEditingName(false);
    setTempName('');
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNameSave();
                    if (e.key === 'Escape') handleNameCancel();
                  }}
                  autoFocus
                  className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none"
                />
              </div>
            ) : (
              <h1
                onClick={handleNameEdit}
                className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                title="Click to edit"
              >
                {serviceData.name}
              </h1>
            )}
            <p className="text-sm text-gray-500 mt-1">{serviceData.slug}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Page Link */}
            <a
              href={`/${serviceData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              View page
              <ExternalLink className="h-4 w-4" />
            </a>

            {/* Save Button */}
            <button
              onClick={onSave}
              disabled={!hasUnsavedChanges || saving}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                hasUnsavedChanges && !saving
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {hasUnsavedChanges && <span className="h-2 w-2 rounded-full bg-white" />}
                  Save changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'sections'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Sections
          </button>
          <button
            onClick={() => setActiveTab('servicesPage')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'servicesPage'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Services Page
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'seo'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            SEO & Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'sections' ? (
          <SectionsTab serviceData={serviceData} onUpdate={onUpdate} />
        ) : activeTab === 'servicesPage' ? (
          <ServicesPageTab serviceData={serviceData} onUpdate={onUpdate} />
        ) : (
          <SeoTab serviceData={serviceData} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  );
};

export default ServiceEditor;

