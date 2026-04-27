import React, { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  Menu,
  Home,
  Users,
  Briefcase,
  Award,
  Image,
  BookOpen,
  Mail,
  Building,
  Shield,
  FileText,
  Save,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Navigation,
  ArrowRight,
  Info,
  Loader2
} from 'lucide-react';
import API_BASE_URL from '../../config/api';

const PageVisibilityManager = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  // Page definitions with metadata
  const pages = [
    {
      key: 'home',
      name: 'Home',
      path: '/',
      icon: Home,
      description: 'Main landing page',
      category: 'Main',
      canDisable: false, // Home should always be accessible
    },
    {
      key: 'about',
      name: 'About',
      path: '/about',
      icon: Info,
      description: 'About the firm',
      category: 'Main',
      canDisable: true,
    },
    {
      key: 'services',
      name: 'Services',
      path: '/services',
      icon: Briefcase,
      description: 'Legal services overview',
      category: 'Main',
      canDisable: true,
    },
    {
      key: 'team',
      name: 'Team',
      path: '/team',
      icon: Users,
      description: 'Team members',
      category: 'Main',
      canDisable: true,
    },
    {
      key: 'awards',
      name: 'Awards',
      path: '/awards',
      icon: Award,
      description: 'Awards and recognitions',
      category: 'Content',
      canDisable: true,
    },
    {
      key: 'gallery',
      name: 'Gallery',
      path: '/gallery',
      icon: Image,
      description: 'Photo gallery',
      category: 'Content',
      canDisable: true,
    },
    {
      key: 'blog',
      name: 'Resource Center',
      path: '/blog',
      icon: BookOpen,
      description: 'Articles',
      category: 'Content',
      canDisable: true,
    },
    {
      key: 'newsletter',
      name: 'Newsletter',
      path: '/newsletter',
      icon: Mail,
      description: 'Newsletter and updates',
      category: 'Content',
      canDisable: true,
    },
    {
      key: 'contact',
      name: 'Contact',
      path: '/contact',
      icon: Mail,
      description: 'Contact form',
      category: 'Main',
      canDisable: false, // Contact should always be accessible
    },
    {
      key: 'firm',
      name: 'Firm',
      path: '/firm',
      icon: Building,
      description: 'Firm information',
      category: 'Main',
      canDisable: true,
    },
    {
      key: 'affiliation',
      name: 'Affiliation',
      path: '/affiliation',
      icon: Shield,
      description: 'Professional affiliations',
      category: 'Content',
      canDisable: true,
    },
    {
      key: 'privacyPolicy',
      name: 'Privacy Policy',
      path: '/privacy',
      icon: FileText,
      description: 'Privacy policy',
      category: 'Legal',
      canDisable: false, // Legal pages should remain accessible
    },
    {
      key: 'termsOfService',
      name: 'Terms of Service',
      path: '/terms',
      icon: FileText,
      description: 'Terms of service',
      category: 'Legal',
      canDisable: false, // Legal pages should remain accessible
    },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      }
      const response = await fetch(`${API_BASE_URL}/api/cms/global-settings`);
      const data = await response.json();
      
      if (data.success) {
        // Initialize pageVisibility for all pages if not present
        const initializedSettings = {
          ...data.data,
          pageVisibility: data.data.pageVisibility || {}
        };

        // Ensure all pages have visibility settings
        pages.forEach(page => {
          if (!initializedSettings.pageVisibility[page.key]) {
            initializedSettings.pageVisibility[page.key] = {
              isActive: true,
              showInNavigation: page.category !== 'Legal', // Legal pages hidden by default
              redirectTo: ''
            };
          }
        });

        setSettings(initializedSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      showMessage('Failed to load settings', 'error');
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const handleToggleActive = (pageKey) => {
    const page = pages.find(p => p.key === pageKey);
    if (!page.canDisable) {
      showMessage(`${page.name} page cannot be disabled`, 'warning');
      return;
    }

    setSettings(prev => ({
      ...prev,
      pageVisibility: {
        ...prev.pageVisibility,
        [pageKey]: {
          ...prev.pageVisibility?.[pageKey],
          isActive: !prev.pageVisibility?.[pageKey]?.isActive,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleToggleNavigation = (pageKey) => {
    setSettings(prev => ({
      ...prev,
      pageVisibility: {
        ...prev.pageVisibility,
        [pageKey]: {
          ...prev.pageVisibility?.[pageKey],
          showInNavigation: !prev.pageVisibility?.[pageKey]?.showInNavigation,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleRedirectChange = (pageKey, value) => {
    setSettings(prev => ({
      ...prev,
      pageVisibility: {
        ...prev.pageVisibility,
        [pageKey]: {
          ...prev.pageVisibility?.[pageKey],
          redirectTo: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    try {
      setSaving(true);
      const token = localStorage.getItem('adminToken');

      if (!token) {
        showMessage('Authentication required', 'error');
        return;
      }

      // Log what we're saving
      console.log('Saving settings:', settings);
      console.log('PageVisibility being saved:', settings.pageVisibility);

      const response = await fetch(`${API_BASE_URL}/api/cms/global-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();
      console.log('Save response:', data);
      console.log('PageVisibility in response:', data.data?.pageVisibility);

      if (data.success) {
        setHasChanges(false);
        showMessage('Settings saved successfully!', 'success');

        // Refresh settings in background without triggering full-page loading UI.
        fetchSettings(true);
      } else {
        showMessage(data.message || 'Failed to save settings', 'error');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showMessage('Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (message, type) => {
    setSaveMessage({ message, type });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const getPageVisibility = (pageKey) => {
    return settings?.pageVisibility?.[pageKey] || {
      isActive: true,
      showInNavigation: true,
      redirectTo: '',
    };
  };

  const groupedPages = pages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading page settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Eye className="h-8 w-8 text-blue-600" />
                Page Visibility Manager
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Control which pages are active and visible in navigation
              </p>
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                hasChanges && !saving
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  {hasChanges && <span className="h-2 w-2 rounded-full bg-white" />}
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`rounded-lg p-4 flex items-center gap-3 ${
              saveMessage.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : saveMessage.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
            }`}
          >
            {saveMessage.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="font-medium">{saveMessage.message}</span>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                How Page Visibility Works
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Active:</strong> Page is accessible via its URL</li>
                <li>• <strong>Show in Navigation:</strong> Page appears in the main menu</li>
                <li>• <strong>Redirect:</strong> Optionally redirect to another page when disabled</li>
                <li>• <strong>Protected Pages:</strong> Home, Contact, and Legal pages cannot be disabled</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Page Groups */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {Object.entries(groupedPages).map(([category, categoryPages]) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Menu className="h-5 w-5 text-gray-600" />
                {category} Pages
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {categoryPages.map((page) => {
                  const visibility = getPageVisibility(page.key);
                  const PageIcon = page.icon;

                  return (
                    <div
                      key={page.key}
                      className={`bg-white rounded-xl border-2 p-6 transition-all ${
                        visibility.isActive
                          ? 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                          : 'border-red-200 bg-red-50/30'
                      }`}
                    >
                      {/* Page Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              visibility.isActive
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <PageIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {page.name}
                            </h3>
                            <p className="text-sm text-gray-500">{page.description}</p>
                          </div>
                        </div>
                        <a
                          href={page.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </div>

                      {/* Path */}
                      <div className="mb-4 px-3 py-2 bg-gray-50 rounded-lg">
                        <span className="text-xs font-mono text-gray-600">{page.path}</span>
                      </div>

                      {/* Controls */}
                      <div className="space-y-3">
                        {/* Active Toggle */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            {visibility.isActive ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-red-600" />
                            )}
                            <span className="text-sm font-medium text-gray-700">
                              Page Active
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleActive(page.key)}
                            disabled={!page.canDisable}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              !page.canDisable
                                ? 'bg-gray-300 cursor-not-allowed'
                                : visibility.isActive
                                ? 'bg-green-600'
                                : 'bg-red-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                visibility.isActive ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Navigation Toggle */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Navigation className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">
                              Show in Navigation
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleNavigation(page.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              visibility.showInNavigation ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                visibility.showInNavigation ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Redirect URL */}
                        {!visibility.isActive && page.canDisable && (
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <label className="block text-xs font-medium text-yellow-900 mb-2 flex items-center gap-2">
                              <ArrowRight className="h-3 w-3" />
                              Redirect to (optional)
                            </label>
                            <input
                              type="text"
                              value={visibility.redirectTo || ''}
                              onChange={(e) => handleRedirectChange(page.key, e.target.value)}
                              placeholder="/contact"
                              className="w-full px-3 py-2 text-sm border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                            />
                            <p className="mt-1 text-xs text-yellow-700">
                              Users will be redirected here when accessing this page
                            </p>
                          </div>
                        )}

                        {/* Protected Notice */}
                        {!page.canDisable && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center gap-2 text-xs text-blue-800">
                              <Shield className="h-3 w-3" />
                              <span className="font-medium">
                                This page cannot be disabled for legal/functional reasons
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Status:</span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              visibility.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {visibility.isActive ? (
                              <>
                                <CheckCircle2 className="h-3 w-3" />
                                Active
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-3 w-3" />
                                Disabled
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {pages.filter(p => getPageVisibility(p.key).isActive).length}
              </div>
              <div className="text-sm text-green-800 mt-1">Active Pages</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">
                {pages.filter(p => !getPageVisibility(p.key).isActive).length}
              </div>
              <div className="text-sm text-red-800 mt-1">Disabled Pages</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {pages.filter(p => getPageVisibility(p.key).showInNavigation).length}
              </div>
              <div className="text-sm text-blue-800 mt-1">In Navigation</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-600">{pages.length}</div>
              <div className="text-sm text-gray-800 mt-1">Total Pages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageVisibilityManager;
