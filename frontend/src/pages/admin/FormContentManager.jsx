import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const FormContentManager = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('contact');
  const [formData, setFormData] = useState({
    formIdentifier: 'contact',
    formTitle: '',
    formDescription: '',
    fields: [],
    submitButtonText: 'Submit',
    successMessage: '',
    errorMessage: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    if (selectedForm) {
      fetchFormByIdentifier(selectedForm);
    }
  }, [selectedForm]);

  const fetchForms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/forms`);
      const data = await response.json();
      if (data.success) {
        setForms(data.data);
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const fetchFormByIdentifier = async (identifier) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/forms/${identifier}`);
      const data = await response.json();
      if (data.success) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching form:', error);
    }
  };

  const handleAddField = () => {
    setFormData(prev => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          fieldName: '',
          label: '',
          placeholder: '',
          fieldType: 'text',
          isRequired: false,
          order: prev.fields.length,
          isVisible: true,
        },
      ],
    }));
  };

  const handleFieldChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) =>
        i === index ? { ...f, [field]: value } : f
      ),
    }));
  };

  const handleRemoveField = (index) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/cms/forms/${formData.formIdentifier}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Form saved successfully!');
        fetchForms();
      } else {
        alert(data.message || 'Error saving form');
      }
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Error saving form');
    } finally {
      setLoading(false);
    }
  };

  const formIdentifiers = [
    { value: 'contact', label: 'Contact Form' },
    { value: 'appointment', label: 'Appointment Form' },
    { value: 'consultation', label: 'Consultation Form' },
    { value: 'newsletter', label: 'Newsletter Form' },
    { value: 'callback', label: 'Callback Request' },
  ];

  const fieldTypes = ['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio'];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Form Content Manager</h1>
        <p className="text-gray-600 mt-2">Manage form labels, placeholders, and messages</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Form
        </label>
        <select
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          {formIdentifiers.map(form => (
            <option key={form.value} value={form.value}>{form.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Title
              </label>
              <input
                type="text"
                value={formData.formTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, formTitle: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Send Us a Message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submit Button Text
              </label>
              <input
                type="text"
                value={formData.submitButtonText}
                onChange={(e) => setFormData(prev => ({ ...prev, submitButtonText: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Submit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Description
            </label>
            <textarea
              value={formData.formDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, formDescription: e.target.value }))}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Fill out the form below..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Success Message
              </label>
              <input
                type="text"
                value={formData.successMessage}
                onChange={(e) => setFormData(prev => ({ ...prev, successMessage: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Thank you! We will contact you shortly."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Error Message
              </label>
              <input
                type="text"
                value={formData.errorMessage}
                onChange={(e) => setFormData(prev => ({ ...prev, errorMessage: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Something went wrong. Please try again."
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-navy">Form Fields</h3>
              <button
                type="button"
                onClick={handleAddField}
                className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Field
              </button>
            </div>

            <div className="space-y-4">
              {formData.fields && formData.fields.map((field, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <GripVertical className="w-5 h-5 text-gray-400 mt-2 cursor-move" />
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Field Name
                        </label>
                        <input
                          type="text"
                          value={field.fieldName}
                          onChange={(e) => handleFieldChange(index, 'fieldName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Full Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Placeholder
                        </label>
                        <input
                          type="text"
                          value={field.placeholder}
                          onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Field Type
                        </label>
                        <select
                          value={field.fieldType}
                          onChange={(e) => handleFieldChange(index, 'fieldType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          {fieldTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-4 pt-6">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.isRequired}
                            onChange={(e) => handleFieldChange(index, 'isRequired', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">Required</span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.isVisible}
                            onChange={(e) => handleFieldChange(index, 'isVisible', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">Visible</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-gray-700">
              Form Active
            </label>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Form Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContentManager;
