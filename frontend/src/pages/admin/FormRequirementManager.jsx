import React, { useEffect, useMemo, useState } from 'react';
import API_BASE_URL from '../../config/api';

const FORM_SCHEMAS = {
  contact: {
    title: 'Contact Form',
    fields: [
      { fieldName: 'name', label: 'Full Name', fieldType: 'text', placeholder: 'Your full name' },
      { fieldName: 'email', label: 'Email Address', fieldType: 'email', placeholder: 'you@example.com' },
      { fieldName: 'phone', label: 'Phone Number', fieldType: 'tel', placeholder: 'Your mobile number (with country code)' },
      { fieldName: 'serviceOfInterest', label: 'Practice Area of Interest', fieldType: 'select', placeholder: 'Select a practice area' },
      { fieldName: 'message', label: 'Message', fieldType: 'textarea', placeholder: 'Tell us about your legal matter...' },
    ],
  },
  appointment: {
    title: 'Appointment Form',
    fields: [
      { fieldName: 'name', label: 'Full Name', fieldType: 'text', placeholder: 'Enter your name' },
      { fieldName: 'email', label: 'Email Address', fieldType: 'email', placeholder: 'your@email.com' },
      { fieldName: 'phone', label: 'Phone Number', fieldType: 'tel', placeholder: '+91 98765 43210' },
      { fieldName: 'service', label: 'Legal Service', fieldType: 'select', placeholder: 'Select a service' },
      { fieldName: 'description', label: 'Brief Description', fieldType: 'textarea', placeholder: 'Tell us about your legal matter...' },
    ],
  },
  consultation: {
    title: 'Consultation Form',
    fields: [
      { fieldName: 'name', label: 'Full Name', fieldType: 'text', placeholder: 'Your full name' },
      { fieldName: 'email', label: 'Email Address', fieldType: 'email', placeholder: 'you@example.com' },
      { fieldName: 'phone', label: 'Phone Number', fieldType: 'tel', placeholder: 'Your mobile number' },
      { fieldName: 'legalIssue', label: 'Legal Issue', fieldType: 'textarea', placeholder: 'Briefly describe your matter' },
      { fieldName: 'preferredContactTime', label: 'Preferred Contact Time', fieldType: 'select', placeholder: 'Select a preference' },
    ],
  },
  newsletter: {
    title: 'Newsletter Form',
    fields: [
      { fieldName: 'email', label: 'Email Address', fieldType: 'email', placeholder: 'you@example.com' },
    ],
  },
  callback: {
    title: 'Callback Form',
    fields: [
      { fieldName: 'name', label: 'Full Name', fieldType: 'text', placeholder: 'Your full name' },
      { fieldName: 'phone', label: 'Phone Number', fieldType: 'tel', placeholder: 'Your mobile number' },
    ],
  },
  career: {
    title: 'Career Form',
    fields: [
      { fieldName: 'fullName', label: 'Full Name', fieldType: 'text', placeholder: 'Your full name' },
      { fieldName: 'email', label: 'Email Address', fieldType: 'email', placeholder: 'you@example.com' },
      { fieldName: 'phone', label: 'Phone Number', fieldType: 'tel', placeholder: 'Your mobile number' },
      { fieldName: 'resume', label: 'Resume', fieldType: 'file', placeholder: '' },
    ],
  },
};

const buildDefaultConfig = (formIdentifier) => {
  const schema = FORM_SCHEMAS[formIdentifier];
  return {
    formIdentifier,
    formTitle: schema?.title || formIdentifier,
    formDescription: '',
    submitButtonText: 'Submit',
    successMessage: 'Form submitted successfully.',
    errorMessage: 'Unable to submit form.',
    isActive: true,
    fields: (schema?.fields || []).map((field, index) => ({
      ...field,
      order: index,
      isRequired: true,
      isVisible: true,
      helpText: '',
      options: [],
      validation: {},
    })),
  };
};

const FormRequirementManager = () => {
  const [selectedForm, setSelectedForm] = useState('contact');
  const [configs, setConfigs] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const formOrder = useMemo(() => Object.keys(FORM_SCHEMAS), []);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/cms/forms`);
        const data = await response.json();
        const byIdentifier = {};
        if (data?.success && Array.isArray(data.data)) {
          data.data.forEach((item) => {
            if (item?.formIdentifier) {
              byIdentifier[item.formIdentifier] = item;
            }
          });
        }
        setConfigs(byIdentifier);
      } catch (error) {
        console.error('Failed to load form configurations:', error);
        setMessage({ type: 'error', text: 'Failed to load forms. Please refresh and try again.' });
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const currentSchema = FORM_SCHEMAS[selectedForm];
  const currentConfig = configs[selectedForm] || buildDefaultConfig(selectedForm);

  const getRequiredValue = (fieldName) => {
    const field = (currentConfig.fields || []).find((item) => item.fieldName === fieldName);
    if (field) return Boolean(field.isRequired);
    return true;
  };

  const toggleRequired = (fieldName, value) => {
    setMessage({ type: '', text: '' });
    setConfigs((prev) => {
      const existing = prev[selectedForm] || buildDefaultConfig(selectedForm);
      const existingFields = Array.isArray(existing.fields) ? existing.fields : [];
      const fieldExists = existingFields.some((item) => item.fieldName === fieldName);

      let nextFields;
      if (fieldExists) {
        nextFields = existingFields.map((item) =>
          item.fieldName === fieldName ? { ...item, isRequired: value } : item
        );
      } else {
        const schemaField = (FORM_SCHEMAS[selectedForm]?.fields || []).find((item) => item.fieldName === fieldName);
        nextFields = [
          ...existingFields,
          {
            ...(schemaField || { fieldName, label: fieldName, fieldType: 'text', placeholder: '' }),
            isRequired: value,
            isVisible: true,
            order: existingFields.length,
          },
        ];
      }

      return {
        ...prev,
        [selectedForm]: {
          ...existing,
          formIdentifier: selectedForm,
          fields: nextFields,
        },
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setMessage({ type: 'error', text: 'Admin session expired. Please login again.' });
        setSaving(false);
        return;
      }

      const existing = configs[selectedForm] || buildDefaultConfig(selectedForm);
      const existingFields = Array.isArray(existing.fields) ? existing.fields : [];
      const schemaFields = FORM_SCHEMAS[selectedForm]?.fields || [];

      const normalizedSchemaFields = schemaFields.map((schemaField, index) => {
        const currentField = existingFields.find((item) => item.fieldName === schemaField.fieldName);
        return {
          ...(currentField || {}),
          fieldName: schemaField.fieldName,
          label: currentField?.label || schemaField.label,
          placeholder: currentField?.placeholder ?? schemaField.placeholder ?? '',
          fieldType: currentField?.fieldType || schemaField.fieldType,
          isRequired: Boolean(currentField?.isRequired),
          isVisible: currentField?.isVisible !== false,
          order: index,
          helpText: currentField?.helpText || '',
          options: Array.isArray(currentField?.options) ? currentField.options : [],
          validation: currentField?.validation && typeof currentField.validation === 'object' ? currentField.validation : {},
        };
      });

      const extraFields = existingFields
        .filter((item) => !schemaFields.some((schemaField) => schemaField.fieldName === item.fieldName))
        .map((item, index) => ({
          ...item,
          order: normalizedSchemaFields.length + index,
        }));

      const payload = {
        ...buildDefaultConfig(selectedForm),
        ...existing,
        formIdentifier: selectedForm,
        fields: [...normalizedSchemaFields, ...extraFields],
      };

      const response = await fetch(`${API_BASE_URL}/api/cms/forms/${selectedForm}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data?.message || 'Failed to save form requirements');
      }

      setConfigs((prev) => ({ ...prev, [selectedForm]: data.data || payload }));
      setMessage({ type: 'success', text: 'Required field settings saved successfully.' });
    } catch (error) {
      console.error('Failed to save required fields:', error);
      setMessage({ type: 'error', text: error.message || 'Unable to save changes. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Form Required Field Controls</h1>
        <p className="mt-2 text-sm text-gray-600">
          Control only which fields are required for each form. Field keys are locked to prevent ambiguity.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {formOrder.map((formKey) => (
          <button
            key={formKey}
            type="button"
            onClick={() => {
              setSelectedForm(formKey);
              setMessage({ type: '', text: '' });
            }}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              selectedForm === formKey
                ? 'bg-navy text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {FORM_SCHEMAS[formKey].title}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{currentSchema?.title}</h2>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Required Settings'}
          </button>
        </div>

        {message.text && (
          <div
            className={`mb-4 rounded-md border px-3 py-2 text-sm ${
              message.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="py-8 text-sm text-gray-500">Loading form configuration...</div>
        ) : (
          <div className="space-y-3">
            {(currentSchema?.fields || []).map((field) => (
              <div
                key={field.fieldName}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{field.label}</p>
                  <p className="text-xs text-gray-500">Field key: {field.fieldName}</p>
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={getRequiredValue(field.fieldName)}
                    onChange={(event) => toggleRequired(field.fieldName, event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy"
                  />
                  Required
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormRequirementManager;
