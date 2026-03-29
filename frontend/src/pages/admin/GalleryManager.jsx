import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: 'office',
    description: '',
    order: 0,
    isPublished: true,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:5000/api/gallery', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingImage
        ? `http://localhost:5000/api/gallery/${editingImage._id}`
        : 'http://localhost:5000/api/gallery';
      
      const method = editingImage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchImages();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      imageUrl: image.imageUrl,
      category: image.category,
      description: image.description,
      order: image.order,
      isPublished: image.isPublished,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      imageUrl: '',
      category: 'office',
      description: '',
      order: 0,
      isPublished: true,
    });
    setEditingImage(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Gallery Manager</h1>
          <p className="font-sans text-gray-600">Upload and manage gallery images</p>
        </div>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          <Plus className="inline mr-2" size={20} />
          Add Image
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-sm shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </h2>
            <button onClick={resetForm}>
              <X className="text-gray-500 hover:text-navy" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUploader
              label="Gallery Image"
              currentImage={formData.imageUrl}
              onImageUploaded={(url) => setFormData({ ...formData, imageUrl: url })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Title
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
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                >
                  <option value="office">Office</option>
                  <option value="events">Events</option>
                  <option value="work">Work</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>

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
                {editingImage ? 'Update' : 'Create'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image._id} className="bg-white rounded-sm shadow-sm overflow-hidden group">
            <div className="aspect-video bg-grey-light">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-navy/10 text-navy text-xs rounded-full font-sans">
                  {image.category}
                </span>
                {!image.isPublished && (
                  <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                    Draft
                  </span>
                )}
              </div>
              <h3 className="font-sans text-sm font-semibold text-navy">{image.title}</h3>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 px-2 py-1.5 bg-navy text-white rounded-sm text-xs font-sans hover:bg-navy-dark transition-colors"
                >
                  <Edit className="inline mr-1" size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image._id)}
                  className="px-2 py-1.5 bg-red-500 text-white rounded-sm text-xs font-sans hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
