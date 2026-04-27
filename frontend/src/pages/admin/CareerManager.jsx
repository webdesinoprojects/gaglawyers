import React, { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  MapPin,
  Clock3,
  Settings2,
  ClipboardList,
} from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';

const OPENING_INITIAL_FORM = {
  title: '',
  location: 'New Delhi',
  employmentType: 'Full-time',
  description: '',
  order: 0,
  isPublished: true,
};

const CAREER_FORM_DEFAULT = {
  formIdentifier: 'career',
  formTitle: 'Application Form',
  formDescription: 'Submit your details and we will review your profile carefully.',
  fields: [
    { fieldName: 'fullName', label: 'Full Name', placeholder: 'Enter your full name', fieldType: 'text', isRequired: true, isVisible: true, order: 0 },
    { fieldName: 'email', label: 'Email', placeholder: 'you@example.com', fieldType: 'email', isRequired: true, isVisible: true, order: 1 },
    { fieldName: 'phone', label: 'Phone', placeholder: '+91', fieldType: 'tel', isRequired: true, isVisible: true, order: 2 },
    { fieldName: 'positionAppliedFor', label: 'Position Applied For', placeholder: '', fieldType: 'select', options: ['General Application'], isRequired: true, isVisible: true, order: 3 },
    { fieldName: 'coverLetter', label: 'Cover Letter', placeholder: 'Tell us why you would like to join us.', fieldType: 'textarea', isRequired: false, isVisible: true, order: 4 },
    { fieldName: 'resumeUpload', label: 'Resume Upload', placeholder: '', fieldType: 'file', isRequired: true, isVisible: true, order: 5 },
  ],
  submitButtonText: 'Submit Application',
  successMessage: 'Application submitted successfully. Our team will review your profile and get in touch.',
  errorMessage: 'Could not submit your application. Please try again.',
  isActive: true,
};

const FIELD_TYPES = ['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio', 'file'];
const TABS = [
  { id: 'openings', label: 'Openings' },
  { id: 'form', label: 'Application Form' },
  { id: 'applications', label: 'Applications' },
];

const parseAppliedPosition = (serviceOfInterest = '') => {
  const raw = String(serviceOfInterest || '');
  const parts = raw.split('-');
  if (parts.length < 2) return raw;
  return parts.slice(1).join('-').trim();
};

const triggerResumeDownload = async ({ applicationId, resumeOriginalName, token }) => {
  const response = await fetch(`${API_BASE_URL}/api/careers/applications/${applicationId}/resume`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to download resume');
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = resumeOriginalName || 'resume';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
};

const CareerManager = () => {
  const [activeTab, setActiveTab] = useState('openings');

  const [openings, setOpenings] = useState([]);
  const [openingsLoading, setOpeningsLoading] = useState(true);
  const [isEditingOpening, setIsEditingOpening] = useState(false);
  const [editingOpening, setEditingOpening] = useState(null);
  const [openingForm, setOpeningForm] = useState(OPENING_INITIAL_FORM);

  const [formConfig, setFormConfig] = useState(CAREER_FORM_DEFAULT);
  const [formConfigLoading, setFormConfigLoading] = useState(true);
  const [formSaving, setFormSaving] = useState(false);

  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [updatingApplicationId, setUpdatingApplicationId] = useState(null);
  const [downloadingResumeId, setDownloadingResumeId] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchOpenings();
    fetchFormConfig();
    fetchApplications();
  }, []);

  const fetchOpenings = async () => {
    setOpeningsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/careers/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) setOpenings(data.data || []);
    } catch (error) {
      console.error('Error fetching career openings:', error);
    } finally {
      setOpeningsLoading(false);
    }
  };

  const fetchFormConfig = async () => {
    setFormConfigLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/forms/career`);
      const data = await response.json();
      if (data.success && data.data) {
        setFormConfig({
          ...CAREER_FORM_DEFAULT,
          ...data.data,
          fields: Array.isArray(data.data.fields) && data.data.fields.length > 0
            ? data.data.fields
            : CAREER_FORM_DEFAULT.fields,
        });
      } else {
        setFormConfig(CAREER_FORM_DEFAULT);
      }
    } catch (error) {
      setFormConfig(CAREER_FORM_DEFAULT);
    } finally {
      setFormConfigLoading(false);
    }
  };

  const fetchApplications = async () => {
    setApplicationsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/careers/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) setApplications(data.data || []);
    } catch (error) {
      console.error('Error fetching career applications:', error);
    } finally {
      setApplicationsLoading(false);
    }
  };

  const visibleFieldCount = useMemo(
    () => (formConfig.fields || []).filter((field) => field.isVisible !== false).length,
    [formConfig.fields]
  );

  const resetOpeningForm = () => {
    setOpeningForm(OPENING_INITIAL_FORM);
    setEditingOpening(null);
    setIsEditingOpening(false);
  };

  const handleOpeningChange = (event) => {
    const { name, value, type, checked } = event.target;
    setOpeningForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value || 0) : value,
    }));
  };

  const handleOpeningSubmit = async (event) => {
    event.preventDefault();
    try {
      const isEdit = Boolean(editingOpening?._id);
      const url = isEdit
        ? `${API_BASE_URL}/api/careers/${editingOpening._id}`
        : `${API_BASE_URL}/api/careers`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(openingForm),
      });

      if (response.ok) {
        await fetchOpenings();
        resetOpeningForm();
      }
    } catch (error) {
      console.error('Error saving opening:', error);
    }
  };

  const handleEditOpening = (opening) => {
    setEditingOpening(opening);
    setOpeningForm({
      title: opening.title || '',
      location: opening.location || 'New Delhi',
      employmentType: opening.employmentType || 'Full-time',
      description: opening.description || '',
      order: opening.order || 0,
      isPublished: Boolean(opening.isPublished),
    });
    setIsEditingOpening(true);
  };

  const handleDeleteOpening = async (id) => {
    if (!confirm('Are you sure you want to delete this opening?')) return;
    try {
      await fetch(`${API_BASE_URL}/api/careers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchOpenings();
    } catch (error) {
      console.error('Error deleting opening:', error);
    }
  };

  const toggleOpeningVisibility = async (opening) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/careers/${opening._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !opening.isPublished }),
      });
      if (response.ok) await fetchOpenings();
    } catch (error) {
      console.error('Error toggling opening visibility:', error);
    }
  };

  const updateFormField = (index, key, value) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: (prev.fields || []).map((field, fieldIndex) =>
        fieldIndex === index ? { ...field, [key]: value } : field
      ),
    }));
  };

  const addFormField = () => {
    setFormConfig((prev) => ({
      ...prev,
      fields: [
        ...(prev.fields || []),
        {
          fieldName: '',
          label: '',
          placeholder: '',
          fieldType: 'text',
          isRequired: false,
          isVisible: true,
          options: [],
          order: (prev.fields || []).length,
        },
      ],
    }));
  };

  const removeFormField = (index) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: (prev.fields || []).filter((_, fieldIndex) => fieldIndex !== index),
    }));
  };

  const handleSaveFormConfig = async (event) => {
    event.preventDefault();
    setFormSaving(true);
    try {
      const payload = {
        ...formConfig,
        formIdentifier: 'career',
        fields: (formConfig.fields || []).map((field, index) => ({
          ...field,
          order: typeof field.order === 'number' ? field.order : index,
          options: Array.isArray(field.options) ? field.options : [],
        })),
      };

      const response = await fetch(`${API_BASE_URL}/api/cms/forms/career`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setFormConfig({
          ...CAREER_FORM_DEFAULT,
          ...data.data,
          fields: Array.isArray(data.data.fields) && data.data.fields.length > 0
            ? data.data.fields
            : CAREER_FORM_DEFAULT.fields,
        });
      }
    } catch (error) {
      console.error('Error saving career form config:', error);
    } finally {
      setFormSaving(false);
    }
  };

  const handleUpdateApplicationStatus = async (id, status) => {
    setUpdatingApplicationId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/careers/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        await fetchApplications();
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  const handleDownloadResume = async (application) => {
    setDownloadingResumeId(application._id);
    try {
      await triggerResumeDownload({
        applicationId: application._id,
        resumeOriginalName: application.resumeOriginalName,
        token,
      });
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Unable to download resume right now. Please try again.');
    } finally {
      setDownloadingResumeId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Career Manager</h1>
          <p className="font-sans text-gray-600">Control openings, application form fields, and submitted applications.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-sm font-sans font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-navy text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-grey-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'openings' && (
        <div>
          <div className="flex items-center justify-end mb-6">
            <Button variant="primary" onClick={() => setIsEditingOpening(true)}>
              <Plus className="inline mr-2" size={20} />
              Add Opening
            </Button>
          </div>

          {isEditingOpening && (
            <div className="bg-white rounded-sm shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold text-navy">
                  {editingOpening ? 'Edit Opening' : 'Create New Opening'}
                </h2>
                <button type="button" onClick={resetOpeningForm}>
                  <X className="text-gray-500 hover:text-navy" size={24} />
                </button>
              </div>

              <form onSubmit={handleOpeningSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                    <input type="text" name="title" value={openingForm.title} onChange={handleOpeningChange} required className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans" />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <input type="text" name="location" value={openingForm.location} onChange={handleOpeningChange} required className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Type *</label>
                    <select name="employmentType" value={openingForm.employmentType} onChange={handleOpeningChange} className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans">
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Display Order</label>
                    <input type="number" name="order" value={openingForm.order} onChange={handleOpeningChange} className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans" />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea name="description" value={openingForm.description} onChange={handleOpeningChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans" />
                </div>

                <label className="flex items-center gap-2 p-4 bg-grey-light rounded-sm cursor-pointer">
                  <input type="checkbox" name="isPublished" checked={openingForm.isPublished} onChange={handleOpeningChange} className="w-5 h-5 text-navy rounded" />
                  <span className="font-sans text-sm text-navy font-medium">Published on Careers page</span>
                </label>

                <div className="flex space-x-3">
                  <Button type="submit" variant="primary">
                    <Save className="inline mr-2" size={18} />
                    {editingOpening ? 'Update Opening' : 'Create Opening'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={resetOpeningForm}>Cancel</Button>
                </div>
              </form>
            </div>
          )}

          {openingsLoading ? (
            <div className="text-center py-12 bg-white rounded-sm"><p className="font-sans text-gray-500">Loading openings...</p></div>
          ) : openings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-sm"><p className="font-sans text-gray-500">No openings yet. Add your first opening.</p></div>
          ) : (
            <div className="space-y-4">
              {openings.map((opening) => (
                <div key={opening._id} className="bg-white rounded-sm shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-serif text-xl font-semibold text-navy">{opening.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-xs ${opening.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {opening.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                          {opening.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-sans mb-3 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-grey-light rounded-sm"><MapPin size={12} />{opening.location}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-grey-light rounded-sm"><Clock3 size={12} />{opening.employmentType}</span>
                        <span className="px-2 py-1 bg-grey-light rounded-sm">Order: {opening.order || 0}</span>
                      </div>
                      <p className="font-sans text-sm text-gray-600 leading-relaxed">{opening.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => toggleOpeningVisibility(opening)} className={`px-3 py-2 rounded-sm text-sm text-white ${opening.isPublished ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}`} title={opening.isPublished ? 'Set as draft' : 'Publish'}>
                        {opening.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button type="button" onClick={() => handleEditOpening(opening)} className="px-3 py-2 bg-navy text-white rounded-sm text-sm hover:bg-navy-dark"><Edit size={16} /></button>
                      <button type="button" onClick={() => handleDeleteOpening(opening._id)} className="px-3 py-2 bg-red-500 text-white rounded-sm text-sm hover:bg-red-600"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'form' && (
        <div className="bg-white rounded-sm shadow-md p-6">
          {formConfigLoading ? (
            <p className="font-sans text-gray-500">Loading form settings...</p>
          ) : (
            <form onSubmit={handleSaveFormConfig} className="space-y-6">
              <div className="flex items-center gap-3">
                <Settings2 className="text-navy" size={20} />
                <h2 className="font-serif text-2xl font-bold text-navy">Career Application Form Settings</h2>
              </div>
              <p className="font-sans text-sm text-gray-600">
                Control labels, placeholders, required fields, and visibility. Visible fields right now: {visibleFieldCount}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Form Title</label>
                  <input
                    type="text"
                    value={formConfig.formTitle || ''}
                    onChange={(e) => setFormConfig((prev) => ({ ...prev, formTitle: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Submit Button Text</label>
                  <input
                    type="text"
                    value={formConfig.submitButtonText || ''}
                    onChange={(e) => setFormConfig((prev) => ({ ...prev, submitButtonText: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Form Description</label>
                <textarea
                  rows={2}
                  value={formConfig.formDescription || ''}
                  onChange={(e) => setFormConfig((prev) => ({ ...prev, formDescription: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Success Message</label>
                  <input
                    type="text"
                    value={formConfig.successMessage || ''}
                    onChange={(e) => setFormConfig((prev) => ({ ...prev, successMessage: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Error Message</label>
                  <input
                    type="text"
                    value={formConfig.errorMessage || ''}
                    onChange={(e) => setFormConfig((prev) => ({ ...prev, errorMessage: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-navy">Fields</h3>
                <Button type="button" variant="outline" onClick={addFormField}>
                  <Plus className="inline mr-2" size={16} />
                  Add Field
                </Button>
              </div>

              <div className="space-y-4">
                {(formConfig.fields || [])
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((field, index) => (
                    <div key={`${field.fieldName || 'field'}-${index}`} className="border border-gray-200 rounded-sm p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Field Name</label>
                          <input type="text" value={field.fieldName || ''} onChange={(e) => updateFormField(index, 'fieldName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans" />
                        </div>
                        <div>
                          <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Label</label>
                          <input type="text" value={field.label || ''} onChange={(e) => updateFormField(index, 'label', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans" />
                        </div>
                        <div>
                          <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Placeholder</label>
                          <input type="text" value={field.placeholder || ''} onChange={(e) => updateFormField(index, 'placeholder', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans" />
                        </div>
                        <div>
                          <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Field Type</label>
                          <select value={field.fieldType || 'text'} onChange={(e) => updateFormField(index, 'fieldType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans">
                            {FIELD_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input type="number" value={field.order ?? index} onChange={(e) => updateFormField(index, 'order', Number(e.target.value || 0))} className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans" />
                        </div>
                        <div className="flex items-center gap-5 pt-8">
                          <label className="inline-flex items-center gap-2 font-sans text-sm text-gray-700">
                            <input type="checkbox" checked={field.isRequired !== false} onChange={(e) => updateFormField(index, 'isRequired', e.target.checked)} />
                            Required
                          </label>
                          <label className="inline-flex items-center gap-2 font-sans text-sm text-gray-700">
                            <input type="checkbox" checked={field.isVisible !== false} onChange={(e) => updateFormField(index, 'isVisible', e.target.checked)} />
                            Visible
                          </label>
                        </div>
                      </div>

                      {field.fieldType === 'select' && (
                        <div className="mt-4">
                          <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                            Options (comma separated)
                          </label>
                          <input
                            type="text"
                            value={(field.options || []).join(', ')}
                            onChange={(e) =>
                              updateFormField(
                                index,
                                'options',
                                e.target.value
                                  .split(',')
                                  .map((opt) => opt.trim())
                                  .filter(Boolean)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans"
                          />
                        </div>
                      )}

                      <div className="mt-4">
                        <button type="button" onClick={() => removeFormField(index)} className="px-3 py-2 bg-red-500 text-white rounded-sm text-sm hover:bg-red-600 inline-flex items-center gap-1">
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <label className="inline-flex items-center gap-2 font-sans text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={formConfig.isActive !== false}
                  onChange={(e) => setFormConfig((prev) => ({ ...prev, isActive: e.target.checked }))}
                />
                Form Active
              </label>

              <div>
                <Button type="submit" variant="primary" disabled={formSaving}>
                  <Save className="inline mr-2" size={16} />
                  {formSaving ? 'Saving...' : 'Save Form Settings'}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white rounded-sm shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="text-navy" size={20} />
            <h2 className="font-serif text-2xl font-bold text-navy">Career Applications</h2>
          </div>

          {applicationsLoading ? (
            <p className="font-sans text-gray-500">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="font-sans text-gray-500">No career applications received yet.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application._id} className="border border-gray-200 rounded-sm p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl font-semibold text-navy">{application.name}</h3>
                      <p className="font-sans text-sm text-gray-700">{application.email} • {application.phone}</p>
                      <p className="font-sans text-sm text-gray-600">
                        <span className="font-medium text-navy">Applied for:</span> {parseAppliedPosition(application.serviceOfInterest)}
                      </p>
                      {application.resumeUrl ? (
                        <p className="font-sans text-sm">
                          <button
                            type="button"
                            onClick={() => handleDownloadResume(application)}
                            disabled={downloadingResumeId === application._id}
                            className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 underline disabled:opacity-60"
                          >
                            {downloadingResumeId === application._id ? 'Downloading...' : 'Download Resume'}
                          </button>
                          {application.resumeOriginalName ? (
                            <span className="text-gray-500"> ({application.resumeOriginalName})</span>
                          ) : null}
                        </p>
                      ) : null}
                      <p className="font-sans text-xs text-gray-500">
                        {new Date(application.createdAt).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <div className="w-full md:w-auto">
                      <select
                        value={application.status || 'new'}
                        onChange={(e) => handleUpdateApplicationStatus(application._id, e.target.value)}
                        disabled={updatingApplicationId === application._id}
                        className="w-full md:w-44 px-3 py-2 border border-gray-300 rounded-sm font-sans text-sm"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  <details className="mt-3">
                    <summary className="cursor-pointer font-sans text-sm font-medium text-navy">View message</summary>
                    <pre className="mt-2 whitespace-pre-wrap bg-grey-light border border-gray-200 rounded-sm p-3 font-sans text-sm text-gray-700">
                      {application.message}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CareerManager;
