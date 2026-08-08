import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Calendar, CheckCircle, Mail, Phone } from 'lucide-react';
import ReCaptcha from '../ReCaptcha';
import API_BASE_URL from '../../config/api';
import { getLeadSource } from '../../utils/leadSource';

const DEFAULT_FORM_COPY = {
  title: 'Book Your Consultation',
  subtitle: 'We will contact you within 24 hours',
  submitLabel: 'Book appointment',
  successMessage:
    'Thank you! Your appointment request has been submitted. We will contact you within 24 hours.',
};

const DEFAULT_FIELDS = {
  name: { label: 'Full Name', placeholder: 'Enter your name', required: true },
  email: { label: 'Email Address', placeholder: 'your@email.com', required: true },
  phone: { label: 'Phone Number', placeholder: '+91 98765 43210', required: true },
  service: { label: 'Practice area', placeholder: 'Select a service', required: false },
  description: {
    label: 'Brief Description',
    placeholder: 'Tell us about your legal matter...',
    required: false,
  },
};

let serviceOptionsPromise;

const fetchServiceOptions = async () => {
  if (!serviceOptionsPromise) {
    serviceOptionsPromise = fetch(`${API_BASE_URL}/api/services?compact=1&limit=100`)
      .then((response) => response.json())
      .then((result) => (result.success && Array.isArray(result.data) ? result.data : []))
      .catch((error) => {
        serviceOptionsPromise = null;
        throw error;
      });
  }

  return serviceOptionsPromise;
};

const LocationConsultationSection = ({ serviceName, city }) => {
  const captchaRef = useRef(null);
  const [services, setServices] = useState([]);
  const [formConfig, setFormConfig] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceName || '',
    preferredDate: '',
    description: '',
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      fetchServiceOptions().catch((error) => {
        console.error('Error fetching services for location appointment form:', error);
        return [];
      }),
      fetch(`${API_BASE_URL}/api/cms/forms/appointment`)
        .then((response) => response.json())
        .then((result) => (result.success ? result.data : null))
        .catch(() => null),
    ]).then(([nextServices, nextFormConfig]) => {
      if (!mounted) return;
      setServices(nextServices);
      setFormConfig(nextFormConfig);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      service: current.service || serviceName || '',
    }));
  }, [serviceName]);

  const serviceOptions = useMemo(() => {
    const currentExists = services.some(
      (service) => (service.name || service.title) === serviceName
    );
    if (!serviceName || currentExists) return services;
    return [{ _id: `current-${serviceName}`, name: serviceName }, ...services];
  }, [serviceName, services]);

  const getFieldMeta = (fieldName) => {
    const fallback = DEFAULT_FIELDS[fieldName];
    const configured = formConfig?.fields?.find((field) => field.fieldName === fieldName);
    const rawLabel = configured?.label || fallback.label;

    return {
      label: String(rawLabel).replace(/\s*\*+\s*$/, '').trim(),
      placeholder: configured?.placeholder || fallback.placeholder,
      required: configured
        ? configured.isVisible !== false && Boolean(configured.isRequired)
        : fallback.required,
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const missingFields = ['name', 'email', 'phone', 'service', 'description']
      .filter((fieldName) => getFieldMeta(fieldName).required && !String(form[fieldName] || '').trim())
      .map((fieldName) => getFieldMeta(fieldName).label);

    if (missingFields.length > 0) {
      setStatus({
        type: 'error',
        message: `Please provide all required fields. Missing: ${missingFields.join(', ')}.`,
      });
      return;
    }

    if (!captchaToken) {
      setStatus({ type: 'error', message: 'Please complete the captcha verification.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const messageParts = [];
      if (form.preferredDate) messageParts.push(`Preferred date: ${form.preferredDate}`);
      if (form.description.trim()) messageParts.push(form.description.trim());
      messageParts.push(`Location page: ${serviceName} in ${city}`);

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...getLeadSource(),
          formIdentifier: 'appointment',
          name: form.name,
          email: form.email,
          phone: form.phone,
          serviceOfInterest: form.service,
          message: messageParts.join('\n\n'),
          captchaToken,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        if (result?.message === 'reCAPTCHA verification failed') {
          setCaptchaToken(null);
          captchaRef.current?.reset();
        }
        throw new Error(result?.message || formConfig?.errorMessage || 'Unable to submit. Please try again.');
      }

      setStatus({
        type: 'success',
        message: formConfig?.successMessage || DEFAULT_FORM_COPY.successMessage,
      });
      setForm({
        name: '',
        email: '',
        phone: '',
        service: serviceName || '',
        preferredDate: '',
        description: '',
      });
      setCaptchaToken(null);
      captchaRef.current?.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to submit. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="location-consultation" className="bg-[#f3f5f8] py-14 md:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.82fr)] lg:gap-12">
          <div className="py-2 lg:py-8">
            <span className="mb-4 inline-block font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#a88627]">
              Local legal assistance
            </span>
            <h2 className="max-w-2xl font-serif text-3xl font-bold leading-tight text-navy md:text-4xl">
              Discuss Your {serviceName} Matter in {city}
            </h2>
            <p className="mt-5 max-w-xl font-sans text-base leading-7 text-slate-600">
              Share the essentials of your matter and our legal team will contact you to discuss the appropriate next steps.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                'Focused guidance for your specific legal matter',
                'Clear next steps and document requirements',
                'A response from our team within 24 hours',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-gold" />
                  <span className="font-sans text-sm leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 border-t border-slate-300 pt-6 sm:flex-row sm:gap-7 lg:flex-col">
              <a href="tel:+919996263370" className="inline-flex items-center gap-3 font-sans text-sm font-semibold text-navy hover:text-[#a88627]">
                <Phone className="h-5 w-5 text-gold" />
                +91 99962 63370
              </a>
              <a href="mailto:contact@gaglawyers.com" className="inline-flex items-center gap-3 font-sans text-sm font-semibold text-navy hover:text-[#a88627]">
                <Mail className="h-5 w-5 text-gold" />
                contact@gaglawyers.com
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
            <div className="mb-6 text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <Calendar className="text-gold" size={26} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy">{DEFAULT_FORM_COPY.title}</h3>
              <p className="mt-1 font-sans text-sm text-slate-600">{DEFAULT_FORM_COPY.subtitle}</p>
            </div>

            {status && (
              <div
                className={`mb-4 rounded-lg border p-3 ${
                  status.type === 'success'
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-red-200 bg-red-50 text-red-800'
                }`}
              >
                <p className="font-sans text-xs font-medium">{status.message}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {['name', 'email', 'phone'].map((fieldName) => {
                const field = getFieldMeta(fieldName);
                const inputType = fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'text';
                return (
                  <div key={fieldName}>
                    <label htmlFor={`location-${fieldName}`} className="mb-1 block font-sans text-xs font-medium text-slate-700">
                      {field.label}{field.required ? ' *' : ''}
                    </label>
                    <input
                      id={`location-${fieldName}`}
                      type={inputType}
                      name={fieldName}
                      value={form[fieldName]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-sans text-sm text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/40"
                      placeholder={field.placeholder}
                    />
                  </div>
                );
              })}

              <div>
                <label htmlFor="location-service" className="mb-1 block font-sans text-xs font-medium text-slate-700">
                  {getFieldMeta('service').label}{getFieldMeta('service').required ? ' *' : ''}
                </label>
                <select
                  id="location-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required={getFieldMeta('service').required}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-sans text-sm text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/40"
                >
                  <option value="">{getFieldMeta('service').placeholder}</option>
                  {serviceOptions.map((service) => (
                    <option key={service._id || service.slug || service.name} value={service.name || service.title}>
                      {service.name || service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location-preferred-date" className="mb-1 block font-sans text-xs font-medium text-slate-700">
                  Preferred date
                </label>
                <input
                  id="location-preferred-date"
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-sans text-sm text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/40"
                />
              </div>

              <div>
                <label htmlFor="location-description" className="mb-1 block font-sans text-xs font-medium text-slate-700">
                  {getFieldMeta('description').label}{getFieldMeta('description').required ? ' *' : ''}
                </label>
                <textarea
                  id="location-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required={getFieldMeta('description').required}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 font-sans text-sm text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/40"
                  placeholder={getFieldMeta('description').placeholder}
                />
              </div>

              <div className="flex justify-center overflow-x-auto">
                <ReCaptcha
                  ref={captchaRef}
                  onChange={(token) => {
                    setCaptchaToken(token);
                    setStatus(null);
                  }}
                  onExpired={() => {
                    setCaptchaToken(null);
                    setStatus({ type: 'error', message: 'Captcha expired. Please verify again.' });
                  }}
                  theme="light"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !captchaToken}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 font-sans text-sm font-semibold text-navy transition-all hover:brightness-110 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : formConfig?.submitButtonText || DEFAULT_FORM_COPY.submitLabel}
                {!isSubmitting && <ArrowRight size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationConsultationSection;
