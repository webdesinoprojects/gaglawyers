import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const FORM_TEMPLATES = {
  contact: {
    formIdentifier: 'contact',
    formTitle: 'Send Us a Message',
    formDescription: "Fill out the form below and we'll get back to you within 24 hours.",
    fields: [
      { fieldName: 'name', label: 'Full Name', placeholder: 'Your full name', fieldType: 'text', isRequired: true, order: 0, isVisible: true },
      { fieldName: 'email', label: 'Email Address', placeholder: 'you@example.com', fieldType: 'email', isRequired: true, order: 1, isVisible: true },
      { fieldName: 'phone', label: 'Phone Number', placeholder: 'Your mobile number (with country code)', fieldType: 'tel', isRequired: true, order: 2, isVisible: true },
      { fieldName: 'serviceOfInterest', label: 'Practice Area of Interest', placeholder: 'Select a practice area', fieldType: 'select', isRequired: true, order: 3, isVisible: true },
      { fieldName: 'message', label: 'Message', placeholder: 'Tell us about your legal matter...', fieldType: 'textarea', isRequired: true, order: 4, isVisible: true },
    ],
    submitButtonText: 'Submit Inquiry',
    successMessage: 'Thank you! We will contact you shortly.',
    errorMessage: 'Something went wrong. Please try again.',
    isActive: true,
  },
  appointment: {
    formIdentifier: 'appointment',
    formTitle: 'Book Appointment',
    formDescription: 'Schedule a consultation with our legal experts',
    fields: [
      { fieldName: 'name', label: 'Full Name', placeholder: 'Enter your name', fieldType: 'text', isRequired: true, order: 0, isVisible: true },
      { fieldName: 'email', label: 'Email Address', placeholder: 'your@email.com', fieldType: 'email', isRequired: true, order: 1, isVisible: true },
      { fieldName: 'phone', label: 'Phone Number', placeholder: 'Your mobile number (with country code)', fieldType: 'tel', isRequired: true, order: 2, isVisible: true },
      { fieldName: 'service', label: 'Legal Service', placeholder: 'Select a service', fieldType: 'select', isRequired: true, order: 3, isVisible: true },
      { fieldName: 'description', label: 'Brief Description', placeholder: 'Tell us about your legal matter...', fieldType: 'textarea', isRequired: false, order: 4, isVisible: true },
    ],
    submitButtonText: 'Book Appointment',
    successMessage: 'Thank you! Your appointment request has been submitted.',
    errorMessage: 'Unable to book appointment. Please try again.',
    isActive: true,
  },
  consultation: {
    formIdentifier: 'consultation',
    formTitle: 'Request Consultation',
    formDescription: 'Share your details and legal issue, and we will call you back.',
    fields: [
      { fieldName: 'name', label: 'Full Name', placeholder: 'Your full name', fieldType: 'text', isRequired: true, order: 0, isVisible: true },
      { fieldName: 'email', label: 'Email Address', placeholder: 'you@example.com', fieldType: 'email', isRequired: true, order: 1, isVisible: true },
      { fieldName: 'phone', label: 'Phone Number', placeholder: 'Your mobile number', fieldType: 'tel', isRequired: true, order: 2, isVisible: true },
      { fieldName: 'legalIssue', label: 'Legal Issue', placeholder: 'Briefly describe your matter', fieldType: 'textarea', isRequired: true, order: 3, isVisible: true },
      { fieldName: 'preferredContactTime', label: 'Preferred Contact Time', placeholder: 'Select a preference', fieldType: 'select', isRequired: false, order: 4, isVisible: true },
    ],
    submitButtonText: 'Request Consultation',
    successMessage: 'Thank you. We will reach out shortly.',
    errorMessage: 'Unable to submit. Please try again later.',
    isActive: true,
  },
  newsletter: {
    formIdentifier: 'newsletter',
    formTitle: 'Subscribe to Newsletter',
    formDescription: 'Get latest legal updates and insights.',
    fields: [
      { fieldName: 'email', label: 'Email Address', placeholder: 'you@example.com', fieldType: 'email', isRequired: true, order: 0, isVisible: true },
    ],
    submitButtonText: 'Subscribe',
    successMessage: 'Subscribed successfully.',
    errorMessage: 'Unable to subscribe right now.',
    isActive: true,
  },
  callback: {
    formIdentifier: 'callback',
    formTitle: 'Request a Callback',
    formDescription: 'Share your number and we will call you.',
    fields: [
      { fieldName: 'name', label: 'Full Name', placeholder: 'Your full name', fieldType: 'text', isRequired: true, order: 0, isVisible: true },
      { fieldName: 'phone', label: 'Phone Number', placeholder: 'Your mobile number', fieldType: 'tel', isRequired: true, order: 1, isVisible: true },
    ],
    submitButtonText: 'Request Callback',
    successMessage: 'Callback request submitted.',
    errorMessage: 'Unable to submit callback request.',
    isActive: true,
  },
  career: {
    formIdentifier: 'career',
    formTitle: 'Apply for Position',
    formDescription: 'Submit your details and resume.',
    fields: [
      { fieldName: 'fullName', label: 'Full Name', placeholder: 'Your full name', fieldType: 'text', isRequired: true, order: 0, isVisible: true },
      { fieldName: 'email', label: 'Email Address', placeholder: 'you@example.com', fieldType: 'email', isRequired: true, order: 1, isVisible: true },
      { fieldName: 'phone', label: 'Phone Number', placeholder: 'Your mobile number', fieldType: 'tel', isRequired: true, order: 2, isVisible: true },
      { fieldName: 'resume', label: 'Resume', placeholder: '', fieldType: 'file', isRequired: true, order: 3, isVisible: true },
    ],
    submitButtonText: 'Submit Application',
    successMessage: 'Application submitted successfully.',
    errorMessage: 'Unable to submit application.',
    isActive: true,
  },
};

const getTemplate = (identifier) => {
  const base = FORM_TEMPLATES[identifier] || FORM_TEMPLATES.contact;
  return {
    ...base,
    fields: (base.fields || []).map((field, index) => ({
      ...field,
      order: Number.isFinite(field.order) ? field.order : index,
      isVisible: field.isVisible !== false,
      isRequired: Boolean(field.isRequired),
    })),
  };
};

const FormContentManager = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('contact');
  const [formData, setFormData] = useState(getTemplate('contact'));
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
        setForms(Array.isArray(data.data) ? data.data : []);
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const fetchFormByIdentifier = async (identifier) => {
    setIsFetching(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/forms/${identifier}`);
      const data = await response.json();
      if (response.status === 404 || !data.success) {
        setFormData(getTemplate(identifier));
      } else {
        const merged = {
          ...getTemplate(identifier),
          ...data.data,
          formIdentifier: identifier,
          fields: Array.isArray(data.data?.fields) && data.data.fields.length > 0
            ? data.data.fields.map((field, index) => ({
                ...field,
                order: Number.isFinite(field.order) ? field.order : index,
                isVisible: field.isVisible !== false,
                isRequired: Boolean(field.isRequired),
              }))
            : getTemplate(identifier).fields,
        };
        setFormData(merged);
      }
    } catch (error) {
      console.error('Error fetching form:', error);
      setFormData(getTemplate(identifier));
      setMessage({ type: 'error', text: 'Unable to load form config. Showing template values.' });
    } finally {
      setIsFetching(false);
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
      fields: prev.fields
        .filter((_, i) => i !== index)
        .map((field, nextIndex) => ({ ...field, order: nextIndex })),
    }));
  };

  const validateForm = () => {
    const invalidField = (formData.fields || []).find(
      (field) => !String(field.fieldName || '').trim()
    );
    if (invalidField) {
      setMessage({ type: 'error', text: 'Every field must have a field name before saving.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setMessage({ type: 'error', text: 'Admin session expired. Please login again.' });
        setLoading(false);
        return;
      }

      const normalizedPayload = {
        ...formData,
        formIdentifier: selectedForm,
        fields: (formData.fields || []).map((field, index) => ({
          ...field,
          fieldName: String(field.fieldName || '').trim(),
          label: String(field.label || '').trim(),
          placeholder: String(field.placeholder || ''),
          helpText: String(field.helpText || ''),
          order: index,
          isRequired: Boolean(field.isRequired),
          isVisible: field.isVisible !== false,
        })),
      };

      const response = await fetch(`${API_BASE_URL}/api/cms/forms/${selectedForm}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(normalizedPayload),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setMessage({ type: 'error', text: 'Session expired. Please login and retry.' });
      } else if (data.success) {
        setMessage({ type: 'success', text: 'Form configuration saved successfully.' });
        setFormData({
          ...normalizedPayload,
          ...data.data,
          formIdentifier: selectedForm,
        });
        await fetchForms();
      } else {
        setMessage({ type: 'error', text: data.message || 'Error saving form configuration.' });
      }
    } catch (error) {
      console.error('Error saving form:', error);
      setMessage({ type: 'error', text: 'Network error while saving form.' });
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
    { value: 'career', label: 'Career Form' },
  ];

  const fieldTypes = ['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio', 'file'];
  const selectedFormLabel = useMemo(
    () => formIdentifiers.find((form) => form.value === selectedForm)?.label || 'Form',
    [selectedForm]
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Form Content Manager</h1>
        <p className="text-gray-600 mt-2">Manage required fields, labels, placeholders, and messages</p>
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
        <p className="text-xs text-gray-500 mt-2">
          If this form was not created earlier, a default template loads and can be saved immediately.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {message.text && (
          <div
            className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
              message.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3">
            <p className="text-sm font-semibold text-gray-800">{selectedFormLabel}</p>
            <p className="text-xs text-gray-600 mt-1">
              Identifier: <code>{selectedForm}</code>
            </p>
          </div>

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
                        <p className="mt-1 text-[11px] text-gray-500">Backend key, for example: <code>name</code>, <code>email</code></p>
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
              disabled={loading || isFetching}
              className="px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : isFetching ? 'Loading...' : 'Save Form Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContentManager;
