import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const BlockManager = () => {
  const [blocks, setBlocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [formData, setFormData] = useState({
    blockIdentifier: '',
    blockName: '',
    blockType: 'text-content',
    category: 'content',
    content: {},
    settings: {},
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBlocks();
  }, [filter]);

  const fetchBlocks = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const url = filter === 'all' 
        ? `${API_BASE_URL}/api/cms/reusable-blocks`
        : `${API_BASE_URL}/api/cms/reusable-blocks?blockType=${filter}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setBlocks(data.data);
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContentChange = (e) => {
    try {
      const content = JSON.parse(e.target.value);
      setFormData(prev => ({ ...prev, content }));
    } catch (error) {
      // Invalid JSON, keep as is
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingBlock
        ? `${API_BASE_URL}/api/cms/reusable-blocks/${editingBlock._id}`
        : `${API_BASE_URL}/api/cms/reusable-blocks`;
      
      const method = editingBlock ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingBlock ? 'Block updated successfully!' : 'Block created successfully!');
        resetForm();
        fetchBlocks();
      } else {
        alert(data.message || 'Error saving block');
      }
    } catch (error) {
      console.error('Error saving block:', error);
      alert('Error saving block');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (block) => {
    setEditingBlock(block);
    setFormData({
      blockIdentifier: block.blockIdentifier,
      blockName: block.blockName,
      blockType: block.blockType,
      category: block.category,
      content: block.content,
      settings: block.settings || {},
      isActive: block.isActive,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this block?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/cms/reusable-blocks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        alert('Block deleted successfully!');
        fetchBlocks();
      } else {
        alert(data.message || 'Error deleting block');
      }
    } catch (error) {
      console.error('Error deleting block:', error);
      alert('Error deleting block');
    }
  };

  const resetForm = () => {
    setFormData({
      blockIdentifier: '',
      blockName: '',
      blockType: 'text-content',
      category: 'content',
      content: {},
      settings: {},
      isActive: true,
    });
    setEditingBlock(null);
    setIsEditing(false);
  };

  const blockTypes = [
    'hero', 'stats', 'features', 'process-steps', 'cta', 'testimonials',
    'team-showcase', 'blog-preview', 'services-grid', 'values',
    'why-choose-us', 'contact-info', 'text-content', 'image-text', 'faq', 'custom'
  ];

  const categories = ['marketing', 'content', 'navigation', 'form', 'media', 'other'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy">Reusable Blocks</h1>
          <p className="text-gray-600 mt-2">Manage content blocks that can be reused across pages</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/90 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          {isEditing ? 'Cancel' : 'Add Block'}
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Block Types</option>
          {blockTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Form */}
      {isEditing && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-navy mb-6">
            {editingBlock ? 'Edit Block' : 'Create New Block'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Block Identifier *
                </label>
                <input
                  type="text"
                  name="blockIdentifier"
                  value={formData.blockIdentifier}
                  onChange={handleChange}
                  required
                  disabled={!!editingBlock}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy disabled:bg-gray-100"
                  placeholder="home-hero"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Block Name *
                </label>
                <input
                  type="text"
                  name="blockName"
                  value={formData.blockName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Home Hero Section"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Block Type *
                </label>
                <select
                  name="blockType"
                  value={formData.blockType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy"
                >
                  {blockTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content (JSON) *
              </label>
              <textarea
                value={JSON.stringify(formData.content, null, 2)}
                onChange={handleContentChange}
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy font-mono text-sm"
                placeholder='{"heading": "Title", "description": "Text"}'
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium text-gray-700">
                Active
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/90 transition-all disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingBlock ? 'Update Block' : 'Create Block'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blocks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map((block) => (
          <div
            key={block._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-navy">{block.blockName}</h3>
                <p className="text-sm text-gray-500">{block.blockIdentifier}</p>
              </div>
              {block.isActive ? (
                <Eye className="w-5 h-5 text-green-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-navy/10 text-navy text-xs rounded">
                  {block.blockType}
                </span>
                <span className="px-2 py-1 bg-gold/10 text-gold text-xs rounded">
                  {block.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Used: {block.usageCount || 0} times
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(block)}
                className="flex-1 px-4 py-2 bg-navy/10 text-navy rounded-lg hover:bg-navy/20 transition-all flex items-center justify-center gap-2"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(block._id)}
                className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {blocks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No blocks found. Create your first block!</p>
        </div>
      )}
    </div>
  );
};

export default BlockManager;
