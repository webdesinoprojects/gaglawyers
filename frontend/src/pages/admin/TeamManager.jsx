import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import Button from '../../components/Button';

const TeamManager = () => {
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    bio: '',
    imageUrl: '',
    order: 0,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:5000/api/team', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setMembers(data.data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingMember
        ? `http://localhost:5000/api/team/${editingMember._id}`
        : 'http://localhost:5000/api/team';
      
      const method = editingMember ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchMembers();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      designation: member.designation,
      bio: member.bio,
      imageUrl: member.imageUrl,
      order: member.order,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`http://localhost:5000/api/team/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', designation: '', bio: '', imageUrl: '', order: 0 });
    setEditingMember(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Team Manager</h1>
          <p className="font-sans text-gray-600">Add and manage team members</p>
        </div>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          <Plus className="inline mr-2" size={20} />
          Add Member
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-sm shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {editingMember ? 'Edit Member' : 'Add New Member'}
            </h2>
            <button onClick={resetForm}>
              <X className="text-gray-500 hover:text-navy" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                <Save className="inline mr-2" size={18} />
                {editingMember ? 'Update' : 'Create'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member._id} className="bg-white rounded-sm shadow-sm overflow-hidden">
            <div className="aspect-[3/4] bg-grey-light">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-serif text-lg font-semibold text-navy">{member.name}</h3>
              <p className="font-sans text-sm text-gold">{member.designation}</p>
              <p className="font-sans text-sm text-gray-600 line-clamp-2">{member.bio}</p>
              
              <div className="flex space-x-2 pt-3">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 px-3 py-2 bg-navy text-white rounded-sm text-sm font-sans hover:bg-navy-dark transition-colors"
                >
                  <Edit className="inline mr-1" size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
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

export default TeamManager;
