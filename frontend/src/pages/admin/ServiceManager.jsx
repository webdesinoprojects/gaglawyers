import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Search, Grid3x3, List, Briefcase, Filter, ChevronDown } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    iconName: 'Briefcase',
    order: 0,
  });

  const categories = ['Civil Law', 'Criminal Law', 'Corporate Law', 'Family Law', 'Labour Law', 'Litigation', 'Other'];

  // Get unique categories from actual services
  const actualCategories = [...new Set(services.map(s => s.category).filter(Boolean))].sort();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery, filterCategory]);

  const fetchServices = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const filterServices = () => {
    let filtered = [...services];
    
    if (searchQuery) {
      filtered = filtered.filter(service =>
        (service.name || service.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(service => service.category === filterCategory);
    }
    
    // Sort by order
    filtered.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    setFilteredServices(filtered);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingService
        ? `${API_BASE_URL}/api/services/${editingService._id}`
        : `${API_BASE_URL}/api/services`;
      
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchServices();
        closeModal();
        showMessage('success', editingService ? 'Service updated successfully' : 'Service created successfully');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      showMessage('error', 'Failed to save service');
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name || service.title || '',
        title: service.title || service.name || '',
        description: service.description || '',
        shortDescription: service.shortDescription || '',
        category: service.category || '',
        iconName: service.iconName || 'Briefcase',
        order: service.order || 0,
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        title: '',
        description: '',
        shortDescription: '',
        category: '',
        iconName: 'Briefcase',
        order: services.length,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const confirmDelete = (service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${API_BASE_URL}/api/services/${serviceToDelete._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
      showMessage('success', 'Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      showMessage('error', 'Failed to delete service');
    } finally {
      setShowDeleteModal(false);
      setServiceToDelete(null);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'military': 'bg-green-50 text-green-700 border-green-200',
      'criminal': 'bg-red-50 text-red-700 border-red-200',
      'administrative': 'bg-purple-50 text-purple-700 border-purple-200',
      'civil': 'bg-blue-50 text-blue-700 border-blue-200',
      'corporate': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'family': 'bg-pink-50 text-pink-700 border-pink-200',
      'labour': 'bg-orange-50 text-orange-700 border-orange-200',
      'property': 'bg-teal-50 text-teal-700 border-teal-200',
      'litigation': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'immigration': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'adr': 'bg-violet-50 text-violet-700 border-violet-200',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Services Manager</h1>
          <p className="font-sans text-gray-600">Manage your legal practice areas and services</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {/* Message Toast */}
      {message.text && (
        <div className={`p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border-green-200' 
            : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          <p className="font-sans text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="font-sans text-sm text-gray-600 mb-1">Total Services</p>
          <p className="font-serif text-2xl font-bold text-navy">{services.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="font-sans text-sm text-gray-600 mb-1">Categories</p>
          <p className="font-serif text-2xl font-bold text-navy">
            {[...new Set(services.map(s => s.category))].filter(Boolean).length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="font-sans text-sm text-gray-600 mb-1">Showing</p>
          <p className="font-serif text-2xl font-bold text-navy">{filteredServices.length}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy cursor-pointer"
              >
                <option value="all">All Categories</option>
                {actualCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-navy shadow-sm' : 'text-gray-600 hover:text-navy'
              }`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white text-navy shadow-sm' : 'text-gray-600 hover:text-navy'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="font-serif text-xl font-bold text-navy mb-2">
            {searchQuery || filterCategory !== 'all' ? 'No services found' : 'No services yet'}
          </h3>
          <p className="font-sans text-gray-600 mb-6">
            {searchQuery || filterCategory !== 'all' 
              ? 'Try adjusting your search or filter' 
              : 'Get started by adding your first service'}
          </p>
          {!searchQuery && filterCategory === 'all' && (
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors"
            >
              <Plus size={20} />
              Add Service
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-navy/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-navy" size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-navy text-base mb-1">
                      {service.name || service.title}
                    </h3>
                    {service.category && (
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-sans font-medium border ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="font-sans text-sm text-gray-600 line-clamp-2 mb-4">
                {service.shortDescription || service.description || 'No description'}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md font-sans text-xs font-medium">
                  #{service.order || 0}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal(service)}
                    className="p-2 text-navy hover:bg-navy/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => confirmDelete(service)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Service</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Description</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">Order</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="text-navy" size={20} />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-navy text-sm">
                          {service.name || service.title}
                        </p>
                        {service.category && (
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-sans font-medium border mt-1 ${getCategoryColor(service.category)}`}>
                            {service.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-sans text-sm text-gray-600 max-w-md line-clamp-2">
                      {service.shortDescription || service.description || 'No description'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-navy/10 text-navy rounded-lg font-sans text-sm font-bold">
                      {service.order || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(service)}
                        className="px-3 py-1.5 text-navy hover:bg-navy/10 rounded-lg transition-colors font-sans text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(service)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-navy">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Corporate Law Services"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  >
                    <option value="">Select category</option>
                    <option value="military">Military</option>
                    <option value="criminal">Criminal</option>
                    <option value="administrative">Administrative</option>
                    <option value="civil">Civil</option>
                    <option value="corporate">Corporate</option>
                    <option value="family">Family</option>
                    <option value="labour">Labour</option>
                    <option value="property">Property</option>
                    <option value="litigation">Litigation</option>
                    <option value="immigration">Immigration</option>
                    <option value="adr">ADR (Mediation & Arbitration)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="Brief description for cards (2-3 lines)"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Full Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Detailed description for service page"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors"
                >
                  <Save size={18} />
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy text-center mb-2">Delete Service</h3>
              <p className="font-sans text-sm text-gray-600 text-center mb-6">
                Are you sure you want to delete "{serviceToDelete?.name || serviceToDelete?.title}"? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
