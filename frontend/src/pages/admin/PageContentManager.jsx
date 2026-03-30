import React, { useEffect, useState } from 'react';
import { Save, FileText } from 'lucide-react';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import API_BASE_URL from '../../config/api';

const PageContentManager = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const pages = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'firm', label: 'The Firm' },
    { id: 'contact', label: 'Contact Page' },
    { id: 'awards', label: 'Awards Page' },
    { id: 'gallery', label: 'Gallery Page' },
  ];

  useEffect(() => {
    fetchPageContent(selectedPage);
  }, [selectedPage]);

  const fetchPageContent = async (pageName) => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/pages/${pageName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.success) {
        setPageData(data.data);
      } else {
        setPageData(getDefaultPageStructure(pageName));
      }
    } catch (error) {
      console.error('Error fetching page:', error);
      setPageData(getDefaultPageStructure(pageName));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultPageStructure = (pageName) => {
    const defaults = {
      home: {
        pageName: 'home',
        sections: {
          hero: {
            heading: 'Excellence in Legal Advisory & Advocacy',
            subheading: 'Grover & Grover Advocates delivers sophisticated legal solutions with integrity, precision, and unwavering commitment to your success.',
            ctaPrimary: 'Schedule Consultation',
            ctaSecondary: 'Our Services',
          },
          stats: {
            casesRepresented: '5000+',
            criminalMatters: '700+',
            familyMatters: '500+',
            civilMatters: '900+',
          },
          practiceAreas: {
            heading: 'Practice Areas',
            subheading: 'Comprehensive legal expertise across multiple domains',
          },
          testimonials: {
            heading: 'What Our Clients Say',
            subheading: 'Trusted by leading businesses and individuals across India',
          },
        },
        seo: {
          title: 'GAG Lawyers - Premier Legal Services in India',
          description: 'Expert legal services in corporate law, civil litigation, real estate, and family law.',
          keywords: 'lawyers in delhi, advocates in india, corporate law firm',
        },
        isPublished: true,
      },
      about: {
        pageName: 'about',
        sections: {
          hero: {
            heading: 'GAG Lawyers',
            subheading: 'Grover & Grover Advocates',
            tagline: 'Law is not only about interpreting statutes but also about offering guidance, clarity, and support during some of life\'s most critical moments.',
          },
          introduction: {
            text: 'At GAG Lawyers - Grover & Grover Advocates, whether it is a business transaction, a personal dispute, or a cross-border matter, our focus remains the same – to provide solutions that are practical, reliable, and aligned with our clients\' goals.',
          },
          founder: {
            name: 'Advocate Rahul Grover',
            imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=750&fit=crop',
            bio: 'Advocate Rahul Grover established this firm with a clear vision: to create a practice that values professionalism, client trust, and results above all. With years of experience in litigation and advisory work, he has appeared before courts, tribunals, and regulatory authorities across the country.',
            quote: 'What sets him apart is his ability to simplify the most complicated legal issues into strategies that clients can understand and act upon.',
          },
          mission: {
            heading: 'Our Mission and Values',
            description: 'We approach every matter with the belief that the client\'s interest is paramount.',
          },
        },
        seo: {
          title: 'About Us - The Firm | GAG Lawyers',
          description: 'Founded by Advocate Rahul Grover, GAG Lawyers provides high-quality legal services across India and abroad.',
          keywords: 'about gag lawyers, rahul grover advocate, law firm india',
        },
        isPublished: true,
      },
    };

    return defaults[pageName] || {
      pageName,
      sections: {},
      seo: { title: '', description: '', keywords: '' },
      isPublished: true,
    };
  };

  const handleSectionChange = (sectionKey, field, value) => {
    setPageData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          [field]: value,
        },
      },
    }));
  };

  const handleSEOChange = (field, value) => {
    setPageData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${API_BASE_URL}/api/pages/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pageData),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Page content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving page content');
      }
    } catch (error) {
      console.error('Error saving page:', error);
      setMessage('Error saving page content');
    } finally {
      setIsSaving(false);
    }
  };

  const renderHomePageEditor = () => {
    if (!pageData?.sections) return null;
    const sections = pageData.sections;

    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Main Heading
              </label>
              <input
                type="text"
                value={sections.hero?.heading || ''}
                onChange={(e) => handleSectionChange('hero', 'heading', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <textarea
                value={sections.hero?.subheading || ''}
                onChange={(e) => handleSectionChange('hero', 'subheading', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={sections.hero?.ctaPrimary || ''}
                  onChange={(e) => handleSectionChange('hero', 'ctaPrimary', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Secondary CTA Text
                </label>
                <input
                  type="text"
                  value={sections.hero?.ctaSecondary || ''}
                  onChange={(e) => handleSectionChange('hero', 'ctaSecondary', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Statistics Bar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Cases Represented
              </label>
              <input
                type="text"
                value={sections.stats?.casesRepresented || ''}
                onChange={(e) => handleSectionChange('stats', 'casesRepresented', e.target.value)}
                placeholder="e.g., 5000+"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Criminal Matters
              </label>
              <input
                type="text"
                value={sections.stats?.criminalMatters || ''}
                onChange={(e) => handleSectionChange('stats', 'criminalMatters', e.target.value)}
                placeholder="e.g., 700+"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Family Dispute Matters
              </label>
              <input
                type="text"
                value={sections.stats?.familyMatters || ''}
                onChange={(e) => handleSectionChange('stats', 'familyMatters', e.target.value)}
                placeholder="e.g., 500+"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Civil Matters
              </label>
              <input
                type="text"
                value={sections.stats?.civilMatters || ''}
                onChange={(e) => handleSectionChange('stats', 'civilMatters', e.target.value)}
                placeholder="e.g., 900+"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Practice Areas Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Practice Areas Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Section Heading
              </label>
              <input
                type="text"
                value={sections.practiceAreas?.heading || ''}
                onChange={(e) => handleSectionChange('practiceAreas', 'heading', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <input
                type="text"
                value={sections.practiceAreas?.subheading || ''}
                onChange={(e) => handleSectionChange('practiceAreas', 'subheading', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <p className="text-sm text-gray-500 font-sans">
              Note: Actual services are managed in Services Manager. This controls the section heading only.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Testimonials Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Section Heading
              </label>
              <input
                type="text"
                value={sections.testimonials?.heading || ''}
                onChange={(e) => handleSectionChange('testimonials', 'heading', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <input
                type="text"
                value={sections.testimonials?.subheading || ''}
                onChange={(e) => handleSectionChange('testimonials', 'subheading', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAboutPageEditor = () => {
    if (!pageData?.sections) return null;
    const sections = pageData.sections;

    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Main Heading
              </label>
              <input
                type="text"
                value={sections.hero?.heading || ''}
                onChange={(e) => handleSectionChange('hero', 'heading', e.target.value)}
                placeholder="e.g., GAG Lawyers"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <input
                type="text"
                value={sections.hero?.subheading || ''}
                onChange={(e) => handleSectionChange('hero', 'subheading', e.target.value)}
                placeholder="e.g., Grover & Grover Advocates"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Tagline
              </label>
              <textarea
                value={sections.hero?.tagline || ''}
                onChange={(e) => handleSectionChange('hero', 'tagline', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Introduction</h3>
          <textarea
            value={sections.introduction?.text || ''}
            onChange={(e) => handleSectionChange('introduction', 'text', e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
          />
        </div>

        {/* Founder Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Founder Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Founder Name
              </label>
              <input
                type="text"
                value={sections.founder?.name || ''}
                onChange={(e) => handleSectionChange('founder', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <ImageUploader
                label="Founder Photo"
                currentImage={sections.founder?.imageUrl || ''}
                onImageUploaded={(url, publicId) => {
                  handleSectionChange('founder', 'imageUrl', url);
                  handleSectionChange('founder', 'cloudinaryPublicId', publicId);
                }}
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={sections.founder?.bio || ''}
                onChange={(e) => handleSectionChange('founder', 'bio', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Quote
              </label>
              <textarea
                value={sections.founder?.quote || ''}
                onChange={(e) => handleSectionChange('founder', 'quote', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Mission Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Heading
              </label>
              <input
                type="text"
                value={sections.mission?.heading || ''}
                onChange={(e) => handleSectionChange('mission', 'heading', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={sections.mission?.description || ''}
                onChange={(e) => handleSectionChange('mission', 'description', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGenericPageEditor = () => {
    if (!pageData?.sections) return null;

    return (
      <div className="bg-white rounded-sm shadow-sm p-6">
        <h3 className="font-serif text-xl font-semibold text-navy mb-4">Page Content</h3>
        <p className="text-sm text-gray-500 font-sans mb-4">
          This page uses a generic structure. Content sections will be added as needed.
        </p>
        <div>
          <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
            Content (JSON format)
          </label>
          <textarea
            value={JSON.stringify(pageData.sections, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setPageData(prev => ({ ...prev, sections: parsed }));
              } catch (err) {
                // Invalid JSON, don't update
              }
            }}
            rows="12"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-mono text-sm"
          />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!pageData) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Page Content Manager</h1>
        <p className="font-sans text-gray-600">Edit page content and SEO settings</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-sm ${message.includes('success') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          <p className="font-sans text-sm">{message}</p>
        </div>
      )}

      {/* Page Selector Tabs */}
      <div className="bg-white rounded-sm shadow-sm mb-6 p-2 flex flex-wrap gap-2">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setSelectedPage(page.id)}
            className={`px-6 py-3 rounded-sm font-sans text-sm font-medium transition-all ${
              selectedPage === page.id
                ? 'bg-navy text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="inline mr-2" size={16} />
            {page.label}
          </button>
        ))}
      </div>

      {/* Content Editor */}
      <div className="space-y-6 mb-6">
        {selectedPage === 'home' && renderHomePageEditor()}
        {selectedPage === 'about' && renderAboutPageEditor()}
        {!['home', 'about'].includes(selectedPage) && renderGenericPageEditor()}

        {/* SEO Section - Common for all pages */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Page Title <span className="text-xs text-gray-500">(appears in browser tab)</span>
              </label>
              <input
                type="text"
                value={pageData.seo?.title || ''}
                onChange={(e) => handleSEOChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
              <p className="mt-1 text-xs text-gray-500 font-sans">
                {pageData.seo?.title?.length || 0} characters (recommended: 50-60)
              </p>
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={pageData.seo?.description || ''}
                onChange={(e) => handleSEOChange('description', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
              <p className="mt-1 text-xs text-gray-500 font-sans">
                {pageData.seo?.description?.length || 0} characters (recommended: 150-160)
              </p>
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Keywords <span className="text-xs text-gray-500">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={pageData.seo?.keywords || ''}
                onChange={(e) => handleSEOChange('keywords', e.target.value)}
                placeholder="law firm, legal services, corporate law"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <ImageUploader
                label="Open Graph Image (for social media sharing)"
                currentImage={pageData.seo?.ogImage || ''}
                onImageUploaded={(url, publicId) => {
                  handleSEOChange('ogImage', url);
                  handleSEOChange('ogImagePublicId', publicId);
                }}
              />
            </div>
          </div>
        </div>

        {/* Publish Status */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={pageData.isPublished}
              onChange={(e) => setPageData(prev => ({ ...prev, isPublished: e.target.checked }))}
              className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
            />
            <label htmlFor="isPublished" className="font-sans text-sm font-medium text-gray-700">
              Page is Published (visible to public)
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end sticky bottom-0 bg-gray-50 py-4 border-t border-gray-200">
        <Button variant="primary" size="lg" onClick={handleSave} disabled={isSaving}>
          <Save className="inline mr-2" size={20} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default PageContentManager;
