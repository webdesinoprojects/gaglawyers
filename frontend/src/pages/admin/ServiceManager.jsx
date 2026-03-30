import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconName: 'Briefcase',
    order: 0,
  });

  const availableIcons = [
    'Briefcase', 'Building2', 'Scale', 'Home', 'Users', 'FileText',
    'Shield', 'TrendingUp', 'Globe', 'Heart', 'Gavel', 'Landmark',
    'UserCheck', 'Building', 'HandshakeIcon', 'Coins', 'Factory', 'Wallet'
  ];

  useEffect(() => {
    fetchServices();
  }, []);

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
        resetForm();
      }
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      order: service.order,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      iconName: 'Briefcase',
      order: 0,
    });
    setEditingService(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Services Manager</h1>
          <p className="font-sans text-gray-600">Manage practice areas and services</p>
        </div>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          <Plus className="inline mr-2" size={20} />
          Add Service
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-sm shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <button onClick={resetForm}>
              <X className="text-gray-500 hover:text-navy" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Corporate Law"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Icon <span className="text-red-500">*</span>
                </label>
                <select
                  name="iconName"
                  value={formData.iconName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Brief description of this service..."
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
              <p className="mt-1 text-xs text-gray-500 font-sans">Lower numbers appear first</p>
            </div>

            <div className="flex space-x-3 pt-2">
              <Button type="submit" variant="primary">
                <Save className="inline mr-2" size={18} />
                {editingService ? 'Update Service' : 'Create Service'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-sm shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-navy/10 rounded-lg">
                  <span className="text-navy text-xs font-sans font-medium">{service.iconName.substring(0, 3)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GripVertical className="text-gray-400" size={16} />
                  <span className="text-xs text-gray-500 font-sans">Order: {service.order}</span>
                </div>
              </div>
            </div>
            <h3 className="font-serif text-xl font-semibold text-navy mb-2">{service.title}</h3>
            <p className="font-sans text-sm text-gray-600 line-clamp-3 mb-4">{service.description}</p>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(service)}
                className="flex-1 px-3 py-2 bg-navy text-white rounded-sm text-sm font-sans hover:bg-navy-dark transition-colors"
              >
                <Edit className="inline mr-1" size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="px-3 py-2 bg-red-500 text-white rounded-sm text-sm font-sans hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="bg-white rounded-sm shadow-sm p-12 text-center">
          <p className="font-sans text-gray-500 mb-4">No services added yet</p>
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <Plus className="inline mr-2" size={18} />
            Add Your First Service
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
