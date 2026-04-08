import React, { useState, useEffect, useRef } from 'react';
import ReCaptcha from './ReCaptcha';
import API_BASE_URL from '../config/api';

const DynamicForm = ({ formIdentifier, onSuccess, services = [] }) => {
  const captchaRef = useRef(null);
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    fetchFormConfig();
  }, [formIdentifier]);

  const fetchFormConfig = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/forms/${formIdentifier}`);
      const data = await response.json();
      if (data.success) {
        setFormConfig(data.data);
        // Initialize form data
        const initialData = {};
        data.data.fields.forEach(field => {
          initialData[field.fieldName] = '';
        });
        setFormData(initialData);
      }
    } catch (error) {
      console.error('Error fetching form config:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please complete the captcha verification.' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          captchaToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: formConfig?.successMessage || 'Thank you! We will contact you shortly.' 
        });
        
        // Reset form
        const resetData = {};
        formConfig.fields.forEach(field => {
          resetData[field.fieldName] = '';
        });
        setFormData(resetData);
        setCaptchaToken(null);
        if (captchaRef.current) {
          captchaRef.current.reset();
        }

        if (onSuccess) onSuccess(data);
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: formConfig?.errorMessage || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: formConfig?.errorMessage || 'Unable to submit. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    setSubmitStatus(null);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
    setSubmitStatus({ 
      type: 'error', 
      message: 'Captcha expired. Please verify again.' 
    });
  };

  if (!formConfig) {
    return <div className="text-center py-4">Loading form...</div>;
  }

  return (
    <div>
      {formConfig.formTitle && (
        <div className="mb-6">
          <h3 className="font-serif text-2xl font-bold text-navy mb-2">
            {formConfig.formTitle}
          </h3>
          {formConfig.formDescription && (
            <p className="font-sans text-sm text-gray-600">
              {formConfig.formDescription}
            </p>
          )}
        </div>
      )}

      {submitStatus && (
        <div
          className={`mb-6 p-4 rounded-sm ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <p className="font-sans text-sm">{submitStatus.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {formConfig.fields
          .filter(field => field.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((field, index) => (
            <div key={index}>
              {field.label && (
                <label
                  htmlFor={field.fieldName}
                  className="block font-sans text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                  {field.isRequired && ' *'}
                </label>
              )}

              {field.fieldType === 'textarea' ? (
                <textarea
                  id={field.fieldName}
                  name={field.fieldName}
                  value={formData[field.fieldName] || ''}
                  onChange={handleChange}
                  required={field.isRequired}
                  rows={field.rows || 4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-sans text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none bg-white"
                  placeholder={field.placeholder}
                />
              ) : field.fieldType === 'select' ? (
                <select
                  id={field.fieldName}
                  name={field.fieldName}
                  value={formData[field.fieldName] || ''}
                  onChange={handleChange}
                  required={field.isRequired}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-sans text-sm text-gray-900 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors bg-white"
                >
                  <option value="">{field.placeholder || 'Select an option'}</option>
                  {field.fieldName === 'serviceOfInterest' || field.fieldName === 'service' ? (
                    services.map(service => (
                      <option key={service._id} value={service.name || service.title}>
                        {service.name || service.title}
                      </option>
                    ))
                  ) : field.options ? (
                    field.options.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))
                  ) : null}
                </select>
              ) : (
                <input
                  type={field.fieldType}
                  id={field.fieldName}
                  name={field.fieldName}
                  value={formData[field.fieldName] || ''}
                  onChange={handleChange}
                  required={field.isRequired}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-sans text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors bg-white"
                  placeholder={field.placeholder}
                />
              )}

              {field.helpText && (
                <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
              )}
            </div>
          ))}

        {/* reCAPTCHA */}
        <div className="flex justify-center">
          <ReCaptcha
            ref={captchaRef}
            onChange={handleCaptchaChange}
            onExpired={handleCaptchaExpired}
            theme="light"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formConfig.isActive || !captchaToken}
          className="w-full px-6 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : formConfig.submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
