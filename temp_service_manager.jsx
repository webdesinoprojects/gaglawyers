import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Briefcase, Building2, Scale, Home, Users, FileText, Shield, TrendingUp, Globe, Heart, Gavel, Landmark, UserCheck, Building, Handshake, Coins, Factory, Wallet, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    category: 'litigation',
    shortDescription: '',
    longDescription: '',
    iconName: 'Briefcase',
    order: 0,
  });

  const iconComponents = {
    Briefcase, Building2, Scale, Home, Users, FileText,
    Shield, TrendingUp, Globe, Heart, Gavel, Landmark,
    UserCheck, Building, Handshake, Coins, Factory, Wallet
  };

  const availableIcons = Object.keys(iconComponents);

  useEffect(() => {
    fetchServices();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchServices = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);
    
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
      showNotification('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    setSaving(true);

    try {
      const slug = generateSlug(formData.name || formData.title);
      const dataToSend = {
        ...formData,
        slug,
        description: formData.shortDescription,
      };

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
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await fetchServices();
        resetForm();
        showNotification(
          editingService ? 'Service updated successfully!' : 'Service created successfully!',
          'success'
        );
      } else {
        const errorData = await response.json();
        showNotification(errorData.message || 'Failed to save service', 'error');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      showNotification('An error occurred while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || service.title || '',
      title: service.title || service.name || '',
      category: service.category || 'litigation',
      shortDescription: service.shortDescription || service.description || '',
      longDescription: service.longDescription || service.description || '',
      iconName: service.iconName || 'Briefcase',
      order: service.order || 0,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service? This action cannot be undone.')) return;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        await fetchServices();
        showNotification('Service deleted successfully', 'success');
      } else {
        showNotification('Failed to delete service', 'error');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      showNotification('An error occurred while deleting', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      category: 'litigation',
      shortDescription: '',
      longDescription: '',
      iconName: 'Briefcase',
      order: 0,
    });
    setEditingService(null);
    setIsEditing(false);
  };

  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || Briefcase;
  };

  return (
    <div className="min-h-screen bg-gray-50 -m-8 p-8">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {notification.type === 'success' ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="font-sans font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-navy mb-2">Services Manager</h1>
          <p className="font-sans text-gray-600">Manage your practice areas and legal services</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center justify-center px-6 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="mr-2" size={20} />
          Add Service
        </button>
      </div>

      {/* Service Count Card */}
      {!loading && services.length > 0 && (
        <>
          <div className="bg-gradient-to-r from-navy to-navy/80 rounded-xl shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm opacity-90 mb-1">Total Services</p>
                <p className="font-serif text-4xl font-bold">{services.length}</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Briefcase size={32} />
              </div>
            </div>
          </div>

          {/* Ordering Info Card */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-white">
                <span className="font-serif text-navy font-bold text-lg">#</span>
              </div>
              <div className="flex-1">
                <h3 className="font-sans text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                  ✨ How Service Ordering Works
                </h3>
                <p className="font-sans text-sm text-amber-800 mb-3">
                  Services are displayed in the order shown below (see the golden <strong>#1, #2, #3</strong> badges). Set the "Display Order" value in the form to control positioning - lower numbers appear first.
                </p>
                <div className="flex items-center gap-2 text-xs text-amber-700 font-sans flex-wrap">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-amber-200">
                    <span className="w-5 h-5 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center text-navy font-bold text-xs">#1</span>
                    <span className="font-medium">Order: 0</span>
                  </div>
                  <span className="text-amber-600">→</span>
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-amber-200">
                    <span className="w-5 h-5 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center text-navy font-bold text-xs">#2</span>
                    <span className="font-medium">Order: 1</span>
                  </div>
                  <span className="text-amber-600">→</span>
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-amber-200">
                    <span className="w-5 h-5 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center text-navy font-bold text-xs">#3</span>
                    <span className="font-medium">Order: 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit/Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="font-serif text-2xl font-bold text-navy">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button 
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="text-gray-500 hover:text-navy" size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-sm font-semibold text-gray-700 mb-3">
                    Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Corporate Law"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-navy focus:ring-4 focus:ring-navy/10 font-sans transition-all"
                  />
                  <p className="mt-2 text-xs text-gray-500 font-sans">Primary name for the service</p>
                </div>

                <div>
                  <label className="block font-sans text-sm font-semibold text-gray-700 mb-3">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-navy focus:ring-4 focus:ring-navy/10 font-sans transition-all"
                  >
                    <option value="military">Military Law</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="administrative">Administrative Law</option>
                    <option value="civil">Civil Law</option>
                    <option value="corporate">Corporate Law</option>
                    <option value="family">Family Law</option>
                    <option value="labour">Labour Law</option>
                    <option value="property">Property Law</option>
                    <option value="litigation">Litigation</option>
                    <option value="immigration">Immigration Law</option>
                    <option value="adr">ADR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-sm font-semibold text-gray-700 mb-3">
                    Display Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Optional display title"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-navy focus:ring-4 focus:ring-navy/10 font-sans transition-all"
                  />
                  <p className="mt-2 text-xs text-gray-500 font-sans">Alternative title for display (optional)</p>
                </div>

                <div>
                  <label className="block font-sans text-sm font-semibold text-gray-700 mb-3">
                    Icon <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="iconName"
                      value={formData.iconName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-navy focus:ring-4 focus:ring-navy/10 font-sans appearance-none transition-all"
                    >
                      {availableIcons.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      {React.createElement(getIconComponent(formData.iconName), { size: 20, className: "text-navy" })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-semibold text-gray-700 mb-3">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Brief description (shown in cards and previews)..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-navy focus:ring-4 focus:ring-navy/10 font-sans resize-none transition-all"
                />
                <p className="mt-2 text-sm text-gray-500 font-sans">
                  {formData.shortDescription.length} characters
                </p>
              </div>

              <div>
                <label className="block font-sans text-sm font-semibold text-gray-700 mb-3">
                  Long Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Detailed description of this service (shown on service detail page)..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-navy focus:ring-4 focus:ring-navy/10 font-sans resize-none transition-all"
                />
                <p className="mt-2 text-sm text-gray-500 font-sans">
                  {formData.longDescription.length} characters
                </p>
              </div>

              <div>
                <label className="block font-sans text-sm font-semibold text-gray-700 mb-3">
                  Display Order (Website Position)
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-navy focus:ring-4 focus:ring-navy/10 font-sans transition-all"
                />
                <div className="mt-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="font-serif text-navy font-bold text-xs">#</span>
                    </div>
                    <div>
                      <p className="text-sm text-amber-900 font-sans font-semibold mb-1.5">
                        ✨ How it works
                      </p>
                      <p className="text-sm text-amber-800 font-sans mb-2">
                        Lower numbers appear first. For example:
                      </p>
                      <div className="flex items-center gap-2 text-xs text-amber-700 font-sans">
                        <span className="px-2 py-1 bg-white rounded font-semibold border border-amber-200">Order 0</span>
                        <span>→</span>
                        <span className="px-2 py-1 bg-white rounded font-semibold border border-amber-200">Order 1</span>
                        <span>→</span>
                        <span className="px-2 py-1 bg-white rounded font-semibold border border-amber-200">Order 2</span>
                      </div>
                      <p className="text-xs text-amber-700 font-sans mt-2">
                        Tip: Use increments of 10 (0, 10, 20) to easily insert services later
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" size={18} />
                      {editingService ? 'Update Service' : 'Create Service'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-sans font-semibold rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-navy" size={48} />
        </div>
      )}

      {/* Empty State */}
      {!loading && services.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase size={40} className="text-gray-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-navy mb-3">No Services Yet</h3>
          <p className="font-sans text-gray-600 mb-8 max-w-md mx-auto">
            Get started by adding your first legal service or practice area to showcase your expertise.
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-6 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all shadow-md hover:shadow-lg"
          >
            <Plus className="mr-2" size={20} />
            Add Your First Service
          </button>
        </div>
      )}

      {/* Services Grid */}
      {!loading && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...services].sort((a, b) => (a.order || 0) - (b.order || 0)).map((service, index) => {
            const IconComponent = getIconComponent(service.iconName || 'Briefcase');
            const displayPosition = index + 1;
            return (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border-2 border-gray-100 hover:border-navy/20 group relative"
              >
                {/* Rank Badge - Top Left Corner */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center shadow-lg z-10 border-4 border-white">
                  <span className="font-serif text-navy font-bold text-sm">#{displayPosition}</span>
                </div>

                <div className="p-6 pt-8">
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy/80 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                      <IconComponent size={28} />
                    </div>
                  </div>

                  {/* Title and Category */}
                  <div className="mb-4">
                    <h3 className="font-serif text-xl font-bold text-navy mb-2 group-hover:text-navy/80 transition-colors">
                      {service.title || service.name}
                    </h3>
                    {service.category && (
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-sans font-medium">
                        {service.category}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-gray-600 mb-6 line-clamp-3 min-h-[3.75rem]">
                    {service.shortDescription || service.description || 'No description available'}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-all shadow-sm hover:shadow-md"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="px-4 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 transition-all"
                      title="Delete service"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
