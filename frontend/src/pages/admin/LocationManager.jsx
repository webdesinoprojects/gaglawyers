import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Eye, EyeOff, Search, Filter, Download, Upload, RefreshCw, BarChart3 } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';

const LocationManager = () => {
  const [pages, setPages] = useState([]);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const [showBulkCreate, setShowBulkCreate] = useState(false);
  const [bulkCities, setBulkCities] = useState('');
  
  const [filters, setFilters] = useState({
    service: '',
    city: '',
    active: '',
  });
  
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
    fetchPages();
  }, [pagination.page, pagination.limit, filters]);

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
    
    const queryParams = new URLSearchParams({
      page: pagination.page,
      limit: pagination.limit,
      ...filters,
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/locations?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.success) {
        setPages(data.data);
        setPagination(prev => ({
          ...prev,
          total: data.total,
          pages: data.pages,
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

  const handleBulkCreate = async () => {
    if (!filters.service) {
      alert('Please select a service first');
      return;
    }

    const cities = bulkCities.split('\n').map(c => c.trim()).filter(Boolean);
    
    if (cities.length === 0) {
      alert('Please enter at least one city');
      return;
    }

    const token = localStorage.getItem('adminToken');
    const selectedService = services.find(s => s._id === filters.service);

    if (!selectedService) {
      alert('Service not found');
      return;
    }

    const pagesToCreate = cities.map(city => {
      const slug = `${selectedService.title.toLowerCase().replace(/\s+/g, '-')}-${city.toLowerCase().replace(/\s+/g, '-')}`;
      
      return {
        service: selectedService._id,
        serviceName: selectedService.title,
        city,
        slug,
        content: {
          heading: `${selectedService.title} in ${city}`,
          intro: `Expert ${selectedService.title.toLowerCase()} services in ${city}. ${selectedService.description}`,
          sections: [
            {
              title: 'Our Services',
              content: `We provide comprehensive ${selectedService.title.toLowerCase()} services to clients in ${city} and surrounding areas.`,
            },
          ],
        },
        seo: {
          title: `${selectedService.title} in ${city} | GAG Lawyers`,
          description: `Expert ${selectedService.title.toLowerCase()} services in ${city}. Contact GAG Lawyers for professional legal assistance.`,
          keywords: `${selectedService.title.toLowerCase()}, lawyers in ${city.toLowerCase()}, legal services ${city.toLowerCase()}`,
          h1: `${selectedService.title} in ${city}`,
        },
        isActive: true,
      };
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/locations/bulk/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pages: pagesToCreate }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`${data.count} pages created successfully`);
        setBulkCities('');
        setShowBulkCreate(false);
        fetchPages();
        fetchStats();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error bulk creating:', error);
      alert('Error creating pages');
    }
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
                  <option key={service._id} value={service._id}>{service.title}</option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search by city..."
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans text-sm"
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
            <Button variant="primary" size="sm" onClick={() => setShowBulkCreate(true)}>
              <Plus className="inline mr-1" size={16} />
              Bulk Create
            </Button>
            <Button variant="secondary" size="sm" onClick={fetchPages}>
              <RefreshCw className="inline mr-1" size={16} />
              Refresh
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => window.open(`${API_BASE_URL}/sitemap.xml`, '_blank')}
              title="View current sitemap"
            >
              <MapPin className="inline mr-1" size={16} />
              Sitemap
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Create Modal */}
      {showBulkCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Bulk Create Location Pages</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    Select Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={filters.service}
                    onChange={(e) => setFilters(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  >
                    <option value="">Choose a service...</option>
                    {services.map(service => (
                      <option key={service._id} value={service._id}>{service.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    Cities (one per line) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={bulkCities}
                    onChange={(e) => setBulkCities(e.target.value)}
                    placeholder="Mumbai&#10;Delhi&#10;Bangalore&#10;Chennai&#10;Kolkata"
                    rows="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  />
                  <p className="mt-2 text-xs text-gray-500 font-sans">
                    {bulkCities.split('\n').filter(c => c.trim()).length} cities entered
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                  <p className="text-sm text-blue-800 font-sans">
                    <strong>Note:</strong> Pages will be auto-generated with SEO-optimized content based on the service and city. You can edit individual pages later if needed.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="secondary" onClick={() => setShowBulkCreate(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleBulkCreate}>
                  <Plus className="inline mr-2" size={18} />
                  Create Pages
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
                    <Button variant="primary" size="sm" className="mt-4" onClick={() => setShowBulkCreate(true)}>
                      <Plus className="inline mr-1" size={16} />
                      Create Pages
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
