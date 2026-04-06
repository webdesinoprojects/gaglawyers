import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Eye, EyeOff, Search, Filter, Download, Upload, RefreshCw, BarChart3 } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';
import { buildLocationPageSlug } from '../../utils/slugs';

const LocationManager = () => {
  const [pages, setPages] = useState([]);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPageId, setEditingPageId] = useState(null);
  const [formData, setFormData] = useState({
    service: '',
    city: '',
    slug: '',
    heading: '',
    intro: '',
    sections: [
      { title: 'Why Choose Our Services', content: 'We provide comprehensive legal solutions tailored to your specific needs. Our experienced team of advocates delivers expert guidance and representation.' },
      { title: 'Our Approach', content: 'We understand that every legal matter is unique. Our approach combines deep legal expertise with practical insight, ensuring you receive advice that is not only legally sound but also commercially viable.' },
      { title: 'Contact Our Legal Team', content: 'If you need legal assistance, our team is ready to help. We offer initial consultations to understand your situation and provide clear guidance on the best path forward.' }
    ],
    images: [
      { url: '', alt: '', caption: '' },
      { url: '', alt: '', caption: '' },
      { url: '', alt: '', caption: '' }
    ],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    isActive: true,
  });
  
  const [filters, setFilters] = useState({
    service: '',
    active: '',
  });
  const [searchDraft, setSearchDraft] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1,
  });

  useEffect(() => {
    fetchServices();
    fetchStats();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const next = searchDraft.trim();
      setDebouncedSearch((prev) => {
        if (prev !== next) {
          setPagination((p) => ({ ...p, page: 1 }));
        }
        return next;
      });
    }, 400);
    return () => clearTimeout(t);
  }, [searchDraft]);

  useEffect(() => {
    fetchPages();
  }, [pagination.page, pagination.limit, filters.service, filters.active, debouncedSearch]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchStats = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/locations/stats/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPages = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');

    const params = new URLSearchParams();
    params.set('page', String(pagination.page));
    params.set('limit', String(pagination.limit));
    if (filters.service) params.set('service', filters.service);
    if (filters.active) params.set('active', filters.active);
    if (debouncedSearch) params.set('search', debouncedSearch);

    try {
      const response = await fetch(`${API_BASE_URL}/api/locations?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        setPages(data.data);
        const pg = data.pagination || {};
        setPagination(prev => ({
          ...prev,
          total: pg.total ?? 0,
          pages: pg.pages ?? 1,
        }));
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePage = async (id, currentStatus) => {
    const token = localStorage.getItem('adminToken');
    
    try {
      await fetch(`${API_BASE_URL}/api/locations/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPages();
      fetchStats();
    } catch (error) {
      console.error('Error toggling page:', error);
    }
  };

  const handleBulkToggle = async (isActive) => {
    if (selectedPages.length === 0) {
      alert('Please select pages first');
      return;
    }

    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/locations/bulk/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ids: selectedPages,
          isActive,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`${data.modifiedCount} pages ${isActive ? 'activated' : 'deactivated'}`);
        setSelectedPages([]);
        fetchPages();
        fetchStats();
      }
    } catch (error) {
      console.error('Error bulk toggling:', error);
    }
  };

  const handleCreatePage = async () => {
    if (!formData.service || !formData.city) {
      alert('Please fill in service and city');
      return;
    }

    const token = localStorage.getItem('adminToken');
    const selectedService = services.find(s => s._id === formData.service);

    if (!selectedService) {
      alert('Service not found');
      return;
    }

    const slug = formData.slug || buildLocationPageSlug(selectedService.slug, formData.city);
    
    const pageData = {
      service: selectedService._id,
      serviceName: selectedService.name || selectedService.title,
      city: formData.city,
      slug,
      content: {
        heading: formData.heading || `${selectedService.name || selectedService.title} in ${formData.city}`,
        intro: formData.intro || `Expert ${(selectedService.name || selectedService.title).toLowerCase()} services in ${formData.city}.`,
        sections: formData.sections.filter(s => s.title && s.content),
      },
      seo: {
        title: formData.seoTitle || `${selectedService.name || selectedService.title} in ${formData.city} | GAG Lawyers`,
        description: formData.seoDescription || `Expert ${(selectedService.name || selectedService.title).toLowerCase()} services in ${formData.city}. Contact GAG Lawyers for professional legal assistance.`,
        keywords: formData.seoKeywords || `${(selectedService.name || selectedService.title).toLowerCase()}, lawyers in ${formData.city.toLowerCase()}, legal services ${formData.city.toLowerCase()}`,
        h1: `${selectedService.name || selectedService.title} in ${formData.city}`,
      },
      isActive: formData.isActive,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pageData),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Page created successfully');
        setShowCreateModal(false);
        setFormData({
          service: '',
          city: '',
          slug: '',
          heading: '',
          intro: '',
          sections: [
            { title: 'Why Choose Our Services', content: 'We provide comprehensive legal solutions tailored to your specific needs. Our experienced team of advocates delivers expert guidance and representation.' },
            { title: 'Our Approach', content: 'We understand that every legal matter is unique. Our approach combines deep legal expertise with practical insight, ensuring you receive advice that is not only legally sound but also commercially viable.' },
            { title: 'Contact Our Legal Team', content: 'If you need legal assistance, our team is ready to help. We offer initial consultations to understand your situation and provide clear guidance on the best path forward.' }
          ],
          images: [
            { url: '', alt: '', caption: '' },
            { url: '', alt: '', caption: '' },
            { url: '', alt: '', caption: '' }
          ],
          seoTitle: '',
          seoDescription: '',
          seoKeywords: '',
          isActive: true,
        });
        fetchPages();
        fetchStats();
      } else {
        alert(data.message || 'Error creating page');
      }
    } catch (error) {
      console.error('Error creating page:', error);
      alert('Error creating page');
    }
  };

  const handleEditPage = (page) => {
    setEditingPageId(page._id);
    setFormData({
      service: page.service?._id || page.service,
      city: page.city,
      slug: page.slug || '',
      heading: page.content?.heading || '',
      intro: page.content?.intro || '',
      sections: page.content?.sections || [
        { title: 'Why Choose Our Services', content: '' },
        { title: 'Our Approach', content: '' },
        { title: 'Contact Our Legal Team', content: '' }
      ],
      images: page.images || [
        { url: '', alt: '', caption: '' },
        { url: '', alt: '', caption: '' },
        { url: '', alt: '', caption: '' }
      ],
      seoTitle: page.seo?.title || '',
      seoDescription: page.seo?.description || '',
      seoKeywords: page.seo?.keywords || '',
      isActive: page.isActive,
    });
    setShowEditModal(true);
  };

  const handleUpdatePage = async () => {
    if (!formData.service || !formData.city) {
      alert('Please fill in service and city');
      return;
    }

    const token = localStorage.getItem('adminToken');
    const selectedService = services.find(s => s._id === formData.service);

    if (!selectedService) {
      alert('Service not found');
      return;
    }

    const slug = formData.slug || buildLocationPageSlug(selectedService.slug, formData.city);
    
    const pageData = {
      service: selectedService._id,
      serviceName: selectedService.name || selectedService.title,
      city: formData.city,
      slug,
      content: {
        heading: formData.heading,
        intro: formData.intro,
        sections: formData.sections.filter(s => s.title && s.content),
      },
      images: formData.images,
      seo: {
        title: formData.seoTitle,
        description: formData.seoDescription,
        keywords: formData.seoKeywords,
        h1: `${selectedService.name || selectedService.title} in ${formData.city}`,
      },
      isActive: formData.isActive,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/locations/${editingPageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pageData),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Page updated successfully');
        setShowEditModal(false);
        setEditingPageId(null);
        setFormData({
          service: '',
          city: '',
          heading: '',
          intro: '',
          sections: [
            { title: 'Why Choose Our Services', content: 'We provide comprehensive legal solutions tailored to your specific needs. Our experienced team of advocates delivers expert guidance and representation.' },
            { title: 'Our Approach', content: 'We understand that every legal matter is unique. Our approach combines deep legal expertise with practical insight, ensuring you receive advice that is not only legally sound but also commercially viable.' },
            { title: 'Contact Our Legal Team', content: 'If you need legal assistance, our team is ready to help. We offer initial consultations to understand your situation and provide clear guidance on the best path forward.' }
          ],
          images: [
            { url: '', alt: '', caption: '' },
            { url: '', alt: '', caption: '' },
            { url: '', alt: '', caption: '' }
          ],
          seoTitle: '',
          seoDescription: '',
          seoKeywords: '',
          isActive: true,
        });
        fetchPages();
        fetchStats();
      } else {
        alert(data.message || 'Error updating page');
      }
    } catch (error) {
      console.error('Error updating page:', error);
      alert('Error updating page');
    }
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', content: '' }],
    }));
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const updateImage = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((image, i) => 
        i === index ? { ...image, [field]: value } : image
      ),
    }));
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/cloudinary/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      const data = await response.json();

      if (data.success) {
        updateImage(index, 'url', data.data.url);
        updateImage(index, 'publicId', data.data.publicId);
        alert('Image uploaded successfully');
      } else {
        alert('Error uploading image: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  const handleRemoveImage = (index) => {
    updateImage(index, 'url', '');
    updateImage(index, 'publicId', '');
    updateImage(index, 'alt', '');
    updateImage(index, 'caption', '');
  };

  const handleServiceCityChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-populate content when both service and city are selected
      if (updated.service && updated.city) {
        const selectedService = services.find(s => s._id === updated.service);
        if (selectedService) {
          const serviceName = selectedService.name || selectedService.title;
          const city = updated.city;
          
          updated.slug = buildLocationPageSlug(selectedService.slug, city);
          
          // Auto-populate heading
          if (!prev.heading || prev.heading === '') {
            updated.heading = `${serviceName} in ${city}`;
          }
          
          // Auto-populate intro
          if (!prev.intro || prev.intro === '') {
            updated.intro = `GAG Lawyers - Grover & Grover Advocates provides expert ${serviceName.toLowerCase()} services in ${city}. Our experienced team of advocates delivers comprehensive legal solutions tailored to your specific needs.`;
          }
          
          // Auto-populate sections with service and city context
          updated.sections = [
            { 
              title: `Why Choose Our ${serviceName} Services in ${city}`, 
              content: `When it comes to ${serviceName.toLowerCase()} in ${city}, GAG Lawyers stands out for our commitment to excellence, client-focused approach, and proven track record. Our legal team has extensive experience handling complex cases and providing strategic counsel.` 
            },
            { 
              title: 'Our Approach', 
              content: `We understand that every legal matter is unique. Our approach combines deep legal expertise with practical insight, ensuring you receive advice that is not only legally sound but also commercially viable and personally relevant. We work in close partnership with our clients throughout the entire process.` 
            },
            { 
              title: `Contact Our ${city} Legal Team`, 
              content: `If you need ${serviceName.toLowerCase()} assistance in ${city}, our team is ready to help. We offer initial consultations to understand your situation and provide clear guidance on the best path forward. Contact us today to discuss your legal needs.` 
            }
          ];
          
          // Auto-populate SEO fields
          if (!prev.seoTitle || prev.seoTitle === '') {
            updated.seoTitle = `${serviceName} in ${city} | GAG Lawyers - Expert Legal Services`;
          }
          
          if (!prev.seoDescription || prev.seoDescription === '') {
            updated.seoDescription = `Looking for ${serviceName.toLowerCase()} in ${city}? GAG Lawyers offers professional legal services with 25+ years of experience. Contact us for expert consultation.`;
          }
          
          if (!prev.seoKeywords || prev.seoKeywords === '') {
            updated.seoKeywords = `${serviceName.toLowerCase()}, ${city}, lawyers, advocates, legal services, ${serviceName.toLowerCase()} ${city}`;
          }
        }
      }
      
      return updated;
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this location page?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${API_BASE_URL}/api/locations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPages();
      fetchStats();
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const handleSelectAll = () => {
    if (selectedPages.length === pages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(pages.map(p => p._id));
    }
  };

  const handleSelectPage = (id) => {
    if (selectedPages.includes(id)) {
      setSelectedPages(selectedPages.filter(p => p !== id));
    } else {
      setSelectedPages([...selectedPages, id]);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Location Pages Manager</h1>
        <p className="font-sans text-gray-600">Manage service-based location pages (scalable for thousands)</p>
      </div>

      {/* Stats Dashboard */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-sm shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm text-gray-600">Total Pages</p>
                <p className="font-serif text-3xl font-bold text-navy mt-1">{stats.total}</p>
              </div>
              <MapPin className="text-navy/20" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-sm shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm text-gray-600">Active</p>
                <p className="font-serif text-3xl font-bold text-green-600 mt-1">{stats.active}</p>
              </div>
              <Eye className="text-green-600/20" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-sm shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm text-gray-600">Inactive</p>
                <p className="font-serif text-3xl font-bold text-gray-500 mt-1">{stats.inactive}</p>
              </div>
              <EyeOff className="text-gray-400/20" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-sm shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm text-gray-600">Services</p>
                <p className="font-serif text-3xl font-bold text-navy mt-1">{stats.byService?.length || 0}</p>
              </div>
              <BarChart3 className="text-navy/20" size={32} />
            </div>
          </div>
        </div>
      )}

      {/* Filters & Actions */}
      <div className="bg-white rounded-sm shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <select
                value={filters.service}
                onChange={(e) => handleFilterChange('service', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans text-sm"
              >
                <option value="">All Services</option>
                {services.map(service => (
                  <option key={service._id} value={service._id}>{service.name || service.title}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <input
                type="text"
                placeholder="Search city, slug, service name, SEO title..."
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans text-sm"
                aria-label="Search location pages"
              />
            </div>
            <div>
              <select
                value={filters.active}
                onChange={(e) => handleFilterChange('active', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans text-sm"
              >
                <option value="">All Status</option>
                <option value="true">Active Only</option>
                <option value="false">Inactive Only</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
              <Plus className="inline mr-1" size={16} />
              Create Page
            </Button>
            <Button variant="outline" size="sm" onClick={fetchPages} className="inline-flex items-center gap-1">
              <RefreshCw className="inline" size={16} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`${API_BASE_URL}/sitemap.xml`, '_blank')}
              title="View current sitemap"
              className="inline-flex items-center gap-1"
            >
              <MapPin className="inline" size={16} />
              Sitemap
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-navy to-navy/90 px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">Create Location Page</h2>
                <p className="text-white/80 text-sm mt-1 font-sans">Add a new location-specific service page</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-sm font-semibold text-gray-800 mb-3">
                      Service <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => handleServiceCityChange('service', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700 appearance-none bg-white cursor-pointer hover:border-gray-300"
                      >
                        <option value="">Select service...</option>
                        {services.map(service => (
                          <option key={service._id} value={service._id}>
                            {service.name || service.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-sm font-semibold text-gray-800 mb-3">
                      City/Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleServiceCityChange('city', e.target.value)}
                      placeholder="e.g., Mumbai, Delhi, Bangalore"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700"
                    />
                  </div>
                </div>

                {/* Slug Field */}
                <div>
                  <label className="block font-sans text-sm font-semibold text-gray-800 mb-3">
                    Page Slug <span className="text-gray-500 text-xs font-normal">(Auto-generated, editable)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="e.g., service-name-city-name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-mono text-sm text-gray-700"
                  />
                  <p className="mt-2 text-xs text-gray-500 font-sans">
                    URL: {formData.slug ? `/${formData.slug}` : '/your-page-slug'}
                  </p>
                </div>

                {/* Content Section */}
                <div className="border-t pt-6">
                  <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">Page Content</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Main Heading
                      </label>
                      <input
                        type="text"
                        value={formData.heading}
                        onChange={(e) => setFormData(prev => ({ ...prev, heading: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Introduction
                      </label>
                      <textarea
                        value={formData.intro}
                        onChange={(e) => setFormData(prev => ({ ...prev, intro: e.target.value }))}
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700 resize-none"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-3">
                        Images (Upload to Cloudinary)
                      </label>
                      <div className="space-y-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-semibold text-gray-600">Image {index + 1}</span>
                              </div>
                              {image.url && (
                                <button
                                  onClick={() => handleRemoveImage(index)}
                                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            
                            {image.url ? (
                              <div className="space-y-3">
                                <div className="relative rounded-lg overflow-hidden bg-gray-200">
                                  <img 
                                    src={image.url} 
                                    alt={image.alt || `Image ${index + 1}`}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <input
                                    type="text"
                                    value={image.alt}
                                    onChange={(e) => updateImage(index, 'alt', e.target.value)}
                                    placeholder="Alt text"
                                    className="px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm"
                                  />
                                  <input
                                    type="text"
                                    value={image.caption}
                                    onChange={(e) => updateImage(index, 'caption', e.target.value)}
                                    placeholder="Caption"
                                    className="px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) handleImageUpload(index, file);
                                  }}
                                  className="hidden"
                                  id={`image-upload-${index}`}
                                />
                                <label
                                  htmlFor={`image-upload-${index}`}
                                  className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-navy hover:bg-gray-100 transition-colors"
                                >
                                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                  <span className="text-sm text-gray-600 font-medium">Click to upload image</span>
                                  <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</span>
                                </label>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Sections */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block font-sans text-sm font-semibold text-gray-800">
                          Content Sections
                        </label>
                        <button
                          onClick={addSection}
                          className="text-sm text-navy hover:text-navy/80 font-sans font-medium"
                        >
                          + Add Section
                        </button>
                      </div>
                      
                      {formData.sections.map((section, index) => (
                        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-gray-600">Section {index + 1}</span>
                            {formData.sections.length > 1 && (
                              <button
                                onClick={() => removeSection(index)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(index, 'title', e.target.value)}
                            placeholder="Section title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 font-sans text-sm"
                          />
                          <textarea
                            value={section.content}
                            onChange={(e) => updateSection(index, 'content', e.target.value)}
                            placeholder="Section content"
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SEO Section */}
                <div className="border-t pt-6">
                  <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">SEO Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={formData.seoDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                        rows="2"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Keywords
                      </label>
                      <input
                        type="text"
                        value={formData.seoKeywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-3 pt-4">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-5 h-5 text-navy border-gray-300 rounded focus:ring-navy"
                  />
                  <label htmlFor="isActive" className="font-sans text-sm font-medium text-gray-700 cursor-pointer">
                    Publish page immediately (make it active)
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-5 flex items-center justify-between border-t border-gray-200">
              <p className="text-sm text-gray-600 font-sans">
                {formData.service && formData.city 
                  ? 'Ready to create page'
                  : 'Fill in required fields to continue'}
              </p>
              <div className="flex space-x-3">
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleCreatePage}
                  disabled={!formData.service || !formData.city}
                >
                  <Plus className="inline mr-2" size={18} />
                  Create Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Same as Create but for editing */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-navy to-navy/90 px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">Edit Location Page</h2>
                <p className="text-white/80 text-sm mt-1 font-sans">Update location-specific service page</p>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingPageId(null);
                }}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content - Same form as create */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-sm font-semibold text-gray-800 mb-3">
                      Service <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => handleServiceCityChange('service', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700 appearance-none bg-white cursor-pointer hover:border-gray-300"
                      >
                        <option value="">Select service...</option>
                        {services.map(service => (
                          <option key={service._id} value={service._id}>
                            {service.name || service.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-sm font-semibold text-gray-800 mb-3">
                      City/Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleServiceCityChange('city', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700"
                    />
                  </div>
                </div>

                {/* Slug Field */}
                <div>
                  <label className="block font-sans text-sm font-semibold text-gray-800 mb-3">
                    Page Slug <span className="text-gray-500 text-xs font-normal">(Auto-generated, editable)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="e.g., service-name-city-name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-mono text-sm text-gray-700"
                  />
                  <p className="mt-2 text-xs text-gray-500 font-sans">
                    URL: {formData.slug ? `/${formData.slug}` : '/your-page-slug'}
                  </p>
                </div>

                {/* Content Section */}
                <div className="border-t pt-6">
                  <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">Page Content</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Main Heading
                      </label>
                      <input
                        type="text"
                        value={formData.heading}
                        onChange={(e) => setFormData(prev => ({ ...prev, heading: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Introduction
                      </label>
                      <textarea
                        value={formData.intro}
                        onChange={(e) => setFormData(prev => ({ ...prev, intro: e.target.value }))}
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700 resize-none"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-3">
                        Images (Upload to Cloudinary)
                      </label>
                      <div className="space-y-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-semibold text-gray-600">Image {index + 1}</span>
                              </div>
                              {image.url && (
                                <button
                                  onClick={() => handleRemoveImage(index)}
                                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            
                            {image.url ? (
                              <div className="space-y-3">
                                <div className="relative rounded-lg overflow-hidden bg-gray-200">
                                  <img 
                                    src={image.url} 
                                    alt={image.alt || `Image ${index + 1}`}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <input
                                    type="text"
                                    value={image.alt}
                                    onChange={(e) => updateImage(index, 'alt', e.target.value)}
                                    placeholder="Alt text"
                                    className="px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm"
                                  />
                                  <input
                                    type="text"
                                    value={image.caption}
                                    onChange={(e) => updateImage(index, 'caption', e.target.value)}
                                    placeholder="Caption"
                                    className="px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) handleImageUpload(index, file);
                                  }}
                                  className="hidden"
                                  id={`image-upload-edit-${index}`}
                                />
                                <label
                                  htmlFor={`image-upload-edit-${index}`}
                                  className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-navy hover:bg-gray-100 transition-colors"
                                >
                                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                  <span className="text-sm text-gray-600 font-medium">Click to upload image</span>
                                  <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</span>
                                </label>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Sections */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block font-sans text-sm font-semibold text-gray-800">
                          Content Sections
                        </label>
                        <button
                          onClick={addSection}
                          className="text-sm text-navy hover:text-navy/80 font-sans font-medium"
                        >
                          + Add Section
                        </button>
                      </div>
                      
                      {formData.sections.map((section, index) => (
                        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-gray-600">Section {index + 1}</span>
                            {formData.sections.length > 1 && (
                              <button
                                onClick={() => removeSection(index)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(index, 'title', e.target.value)}
                            placeholder="Section title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 font-sans text-sm"
                          />
                          <textarea
                            value={section.content}
                            onChange={(e) => updateSection(index, 'content', e.target.value)}
                            placeholder="Section content"
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SEO Section */}
                <div className="border-t pt-6">
                  <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">SEO Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={formData.seoDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                        rows="2"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-semibold text-gray-800 mb-2">
                        Keywords
                      </label>
                      <input
                        type="text"
                        value={formData.seoKeywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all font-sans text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-3 pt-4">
                  <input
                    type="checkbox"
                    id="isActiveEdit"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-5 h-5 text-navy border-gray-300 rounded focus:ring-navy"
                  />
                  <label htmlFor="isActiveEdit" className="font-sans text-sm font-medium text-gray-700 cursor-pointer">
                    Page is active (published)
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-5 flex items-center justify-between border-t border-gray-200">
              <p className="text-sm text-gray-600 font-sans">
                {formData.service && formData.city 
                  ? 'Ready to update page'
                  : 'Fill in required fields to continue'}
              </p>
              <div className="flex space-x-3">
                <Button variant="secondary" onClick={() => {
                  setShowEditModal(false);
                  setEditingPageId(null);
                }}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleUpdatePage}
                  disabled={!formData.service || !formData.city}
                >
                  <Edit className="inline mr-2" size={18} />
                  Update Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedPages.length > 0 && (
        <div className="bg-navy text-white rounded-sm shadow-sm p-4 mb-6 flex items-center justify-between">
          <p className="font-sans text-sm">
            {selectedPages.length} page(s) selected
          </p>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" onClick={() => handleBulkToggle(true)}>
              <Eye className="inline mr-1" size={16} />
              Activate
            </Button>
            <Button variant="secondary" size="sm" onClick={() => handleBulkToggle(false)}>
              <EyeOff className="inline mr-1" size={16} />
              Deactivate
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setSelectedPages([])}>
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Pages Table */}
      <div className="bg-white rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedPages.length === pages.length && pages.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-navy focus:ring-navy/20 rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left font-sans text-xs font-semibold text-gray-600 uppercase">Service</th>
                <th className="px-4 py-3 text-left font-sans text-xs font-semibold text-gray-600 uppercase">City</th>
                <th className="px-4 py-3 text-left font-sans text-xs font-semibold text-gray-600 uppercase">Slug</th>
                <th className="px-4 py-3 text-left font-sans text-xs font-semibold text-gray-600 uppercase">Views</th>
                <th className="px-4 py-3 text-left font-sans text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-right font-sans text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-navy border-t-transparent rounded-full mx-auto"></div>
                  </td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-sans text-gray-500">No location pages found</p>
                    <Button variant="primary" size="sm" className="mt-4" onClick={() => setShowCreateModal(true)}>
                      <Plus className="inline mr-1" size={16} />
                      Create Page
                    </Button>
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedPages.includes(page._id)}
                        onChange={() => handleSelectPage(page._id)}
                        className="w-4 h-4 text-navy focus:ring-navy/20 rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm text-navy font-medium">
                        {page.service?.title || page.serviceName}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm text-gray-700">{page.city}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-gray-500">{page.slug}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm text-gray-600">{page.views}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleTogglePage(page._id, page.isActive)}
                        className={`px-3 py-1 rounded-full text-xs font-sans font-medium ${
                          page.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {page.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => window.open(`/${page.slug}`, '_blank')}
                          className="p-2 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-sm transition-colors"
                          title="View page"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditPage(page)}
                          className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-sm transition-colors"
                          title="Edit page"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(page._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="border-t border-gray-200 px-4 py-4 flex items-center justify-between">
            <div className="font-sans text-sm text-gray-600">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} pages
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                      className={`px-3 py-1 rounded-sm font-sans text-sm ${
                        pagination.page === pageNum
                          ? 'bg-navy text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {pagination.pages > 5 && <span className="px-2 text-gray-400">...</span>}
              </div>
              <Button
                variant="secondary"
                size="sm"
                disabled={pagination.page === pagination.pages}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-sm p-4 mt-6">
        <h3 className="font-sans text-sm font-semibold text-blue-900 mb-2">How to use:</h3>
        <ul className="font-sans text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Use "Bulk Create" to generate pages for multiple cities at once</li>
          <li>Toggle individual pages on/off, or use checkboxes for bulk operations</li>
          <li>Inactive pages won't appear in sitemap or public site</li>
          <li>Use filters to find specific pages quickly</li>
          <li>View count helps identify popular pages</li>
        </ul>
      </div>
    </div>
  );
};

export default LocationManager;
