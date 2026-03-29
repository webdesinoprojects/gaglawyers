import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import API_BASE_URL from '../../config/api';

const AwardManager = () => {
  const [awards, setAwards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAward, setEditingAward] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    issuingBody: '',
    imageUrl: '',
    cloudinaryPublicId: '',
    order: 0,
    isPublished: true,
  });

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/awards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setAwards(data.data);
      }
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingAward
        ? `${API_BASE_URL}/api/awards/${editingAward._id}`
        : `${API_BASE_URL}/api/awards`;
      
      const method = editingAward ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchAwards();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving award:', error);
    }
  };

  const handleEdit = (award) => {
    setEditingAward(award);
    setFormData({
      title: award.title,
      description: award.description,
      year: award.year,
      issuingBody: award.issuingBody,
      imageUrl: award.imageUrl,
      order: award.order,
      isPublished: award.isPublished,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this award?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${API_BASE_URL}/api/awards/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAwards();
    } catch (error) {
      console.error('Error deleting award:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      year: new Date().getFullYear(),
      issuingBody: '',
      imageUrl: '',
      order: 0,
      isPublished: true,
    });
    setEditingAward(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Awards Manager</h1>
          <p className="font-sans text-gray-600">Manage awards and recognitions</p>
        </div>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          <Plus className="inline mr-2" size={20} />
          Add Award
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-sm shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {editingAward ? 'Edit Award' : 'Add New Award'}
            </h2>
            <button onClick={resetForm}>
              <X className="text-gray-500 hover:text-navy" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Award Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Issuing Body
              </label>
              <input
                type="text"
                name="issuingBody"
                value={formData.issuingBody}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>

            <ImageUploader
              label="Award Image/Logo"
              currentImage={formData.imageUrl}
              onImageUploaded={(url, publicId) => setFormData({ ...formData, imageUrl: url, cloudinaryPublicId: publicId })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
                />
                <label htmlFor="isPublished" className="font-sans text-sm font-medium text-gray-700">
                  Published
                </label>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                <Save className="inline mr-2" size={18} />
                {editingAward ? 'Update' : 'Create'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map((award) => (
          <div key={award._id} className="bg-white rounded-sm shadow-sm overflow-hidden">
            <div className="aspect-video bg-grey-light flex items-center justify-center">
              {award.imageUrl ? (
                <img
                  src={award.imageUrl}
                  alt={award.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 font-sans text-sm">No Image</div>
              )}
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-gold font-medium">{award.year}</span>
                {!award.isPublished && (
                  <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                    Draft
                  </span>
                )}
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy">{award.title}</h3>
              <p className="font-sans text-sm text-gray-600">{award.issuingBody}</p>
              {award.description && (
                <p className="font-sans text-sm text-gray-500 line-clamp-2">{award.description}</p>
              )}
              
              <div className="flex space-x-2 pt-3">
                <button
                  onClick={() => handleEdit(award)}
                  className="flex-1 px-3 py-2 bg-navy text-white rounded-sm text-sm font-sans hover:bg-navy-dark transition-colors"
                >
                  <Edit className="inline mr-1" size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(award._id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-sm text-sm font-sans hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardManager;
