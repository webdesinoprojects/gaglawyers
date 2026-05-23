import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BriefcaseBusiness, GraduationCap, Handshake, Trophy, MapPin, Clock3 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ReCaptcha from '../components/ReCaptcha';
import API_BASE_URL from '../config/api';

const PERKS = [
  {
    title: 'Growth Opportunities',
    description: 'Work on real matters from day one with a clear path for professional development.',
    icon: Trophy,
  },
  {
    title: 'Mentorship',
    description: 'Learn directly from experienced advocates through hands-on guidance and feedback.',
    icon: GraduationCap,
  },
  {
    title: 'Collaborative Culture',
    description: 'Thrive in a team-first environment where research, drafting, and litigation work together.',
    icon: Handshake,
  },
  {
    title: 'Competitive Compensation',
    description: 'Receive market-aligned pay structures with performance-focused growth conversations.',
    icon: BriefcaseBusiness,
  },
];

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

const CORE_SELECT_FIELD = 'positionAppliedFor';

const Careers = () => {
  const formRef = useRef(null);
  const captchaRef = useRef(null);

  const [openings, setOpenings] = useState([]);
  const [loadingOpenings, setLoadingOpenings] = useState(true);

  const [formConfig, setFormConfig] = useState(CAREER_FORM_DEFAULT);
  const [formLoading, setFormLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/careers`);
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) setOpenings(data.data);
      } catch (error) {
        setOpenings([]);
      } finally {
        setLoadingOpenings(false);
      }
    };

    const fetchFormConfig = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cms/forms/career`);
        const data = await response.json();
        if (data.success && data.data) {
          const merged = {
            ...CAREER_FORM_DEFAULT,
            ...data.data,
            fields: Array.isArray(data.data.fields) && data.data.fields.length > 0
              ? data.data.fields
              : CAREER_FORM_DEFAULT.fields,
          };
          setFormConfig(merged);
          setFormData(
            (merged.fields || []).reduce((acc, field) => {
              if (field.fieldType === 'select') {
                acc[field.fieldName] = (field.options && field.options[0]) || 'General Application';
              } else {
                acc[field.fieldName] = '';
              }
              return acc;
            }, {})
          );
        } else {
          setFormConfig(CAREER_FORM_DEFAULT);
        }
      } catch (error) {
        setFormConfig(CAREER_FORM_DEFAULT);
      } finally {
        setFormLoading(false);
      }
    };

    fetchOpenings();
    fetchFormConfig();
  }, []);

  const visibleFields = useMemo(
    () =>
      (formConfig.fields || [])
        .filter((field) => field.isVisible !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [formConfig.fields]
  );

  const positionOptions = useMemo(() => {
    const fromJobs = openings.map((job) => job.title);
    const selectField = (formConfig.fields || []).find((field) => field.fieldName === CORE_SELECT_FIELD);
    const fromConfig = Array.isArray(selectField?.options) ? selectField.options : [];
    const set = new Set(['General Application', ...fromConfig, ...fromJobs]);
    return Array.from(set);
  }, [openings, formConfig.fields]);

  const scrollToForm = (positionTitle) => {
    setFormData((prev) => ({
      ...prev,
      [CORE_SELECT_FIELD]: positionTitle,
    }));
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitStatus(null);
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null;
    setResumeFile(file);
    setFormErrors((prev) => ({ ...prev, resumeUpload: '' }));
    setSubmitStatus(null);
  };

  const validateForm = () => {
    const nextErrors = {};

    visibleFields.forEach((field) => {
      const value = formData[field.fieldName];
      if (field.fieldType === 'file') {
        if (field.isRequired && !resumeFile) {
          nextErrors[field.fieldName] = `${field.label || 'This field'} is required.`;
        }
        return;
      }

      if (field.isRequired) {
        const isEmpty = value === null || value === undefined || String(value).trim() === '';
        if (isEmpty) {
          nextErrors[field.fieldName] = field.errorMessage || `${field.label || 'This field'} is required.`;
        }
      }

      if (field.fieldType === 'email' && String(value || '').trim()) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
        if (!ok) nextErrors[field.fieldName] = 'Please enter a valid email address.';
      }

      if (field.fieldType === 'tel' && String(value || '').trim()) {
        const digits = String(value).replace(/\D/g, '');
        if (digits.length < 10) nextErrors[field.fieldName] = 'Please enter a valid phone number.';
      }
    });

    if (resumeFile) {
      const ext = resumeFile.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'doc', 'docx'].includes(ext || '')) {
        nextErrors.resumeUpload = 'Resume must be a PDF, DOC, or DOCX file.';
      }
      if (resumeFile.size > 5 * 1024 * 1024) {
        nextErrors.resumeUpload = 'Resume file size must be under 5MB.';
      }
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;
    if (!captchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Please complete the captcha verification.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const name = String(formData.fullName || formData.name || '').trim() || 'Career Applicant';
    const email = String(formData.email || '').trim() || 'no-email@gaglawyers.local';
    const phone = String(formData.phone || '').trim() || 'N/A';
    const appliedFor = String(formData.positionAppliedFor || formData.position || 'General Application').trim();

    const messageLines = [];
    visibleFields.forEach((field) => {
      const fieldLabel = field.label || field.fieldName;
      if (field.fieldType === 'file') {
        const resumeLabel = resumeFile
          ? `${resumeFile.name} (${Math.max(1, Math.round(resumeFile.size / 1024))} KB)`
          : 'Not provided';
        messageLines.push(`${fieldLabel}: ${resumeLabel}`);
      } else {
        messageLines.push(`${fieldLabel}: ${formData[field.fieldName] ?? ''}`);
      }
    });

    try {
      const payload = new FormData();
      payload.append('name', name);
      payload.append('email', email);
      payload.append('phone', phone);
      payload.append('serviceOfInterest', `Careers - ${appliedFor}`);
      payload.append('message', messageLines.join('\n'));
      payload.append('captchaToken', captchaToken);
      if (resumeFile) {
        payload.append('resume', resumeFile);
      }

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: formConfig.successMessage || CAREER_FORM_DEFAULT.successMessage,
        });
        setFormData(
          (formConfig.fields || []).reduce((acc, field) => {
            acc[field.fieldName] = field.fieldType === 'select' ? (field.options?.[0] || 'General Application') : '';
            return acc;
          }, {})
        );
        setResumeFile(null);
        setCaptchaToken(null);
        if (captchaRef.current) {
          captchaRef.current.reset();
        }
      } else {
        if (data?.message === 'reCAPTCHA verification failed') {
          setCaptchaToken(null);
          if (captchaRef.current) captchaRef.current.reset();
        }
        setSubmitStatus({
          type: 'error',
          message: data?.message || formConfig.errorMessage || CAREER_FORM_DEFAULT.errorMessage,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: formConfig.errorMessage || CAREER_FORM_DEFAULT.errorMessage,
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
  };

  const renderField = (field) => {
    const baseClass =
      'w-full px-4 py-3 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none';
    const key = field.fieldName;

    if (field.fieldType === 'textarea') {
      return (
        <textarea
          name={key}
          value={formData[key] || ''}
          onChange={handleChange}
          rows={6}
          className={`${baseClass} resize-y`}
          placeholder={field.placeholder || ''}
        />
      );
    }

    if (field.fieldType === 'select') {
      const options = key === CORE_SELECT_FIELD ? positionOptions : (field.options || []);
      return (
        <select
          name={key}
          value={formData[key] || options[0] || ''}
          onChange={handleChange}
          className={`${baseClass} bg-white`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.fieldType === 'file') {
      return (
        <>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className={`${baseClass} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-navy file:text-white file:font-medium hover:file:bg-navy/90`}
          />
          {resumeFile && (
            <p className="mt-2 font-sans text-xs text-gray-500">Selected: {resumeFile.name}</p>
          )}
        </>
      );
    }

    const type = field.fieldType === 'tel' || field.fieldType === 'email' ? field.fieldType : 'text';
    return (
      <input
        type={type}
        name={key}
        value={formData[key] || ''}
        onChange={handleChange}
        className={baseClass}
        placeholder={field.placeholder || ''}
      />
    );
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Careers | GAG Lawyers - Grover & Grover Advocates"
        description="Build your legal career with Grover & Grover Advocates & Solicitors. Explore current openings and apply online."
        keywords="careers, legal jobs, law firm jobs, litigation associate, legal internship"
      />

      <section className="relative bg-gradient-to-br from-navy via-navy to-navy/90 text-white pt-8 pb-20 md:pt-10 lg:pt-12 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute top-24 right-12 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-block px-5 py-2 rounded-full border border-gold/20 bg-gold/10 font-sans text-xs font-semibold uppercase tracking-wider text-gold">
              Careers
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">Join Our Team</h1>
            <p className="font-sans text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Build a meaningful legal career at Grover & Grover Advocates & Solicitors, where
              excellence, mentorship, and client impact drive every matter we handle.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">Why Work With Us</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gold to-gold/60 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <article key={perk.title} className="group bg-gradient-to-br from-grey-light to-white rounded-2xl p-7 border border-gray-100 hover:border-gold/35 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">{perk.title}</h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">{perk.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#F7F9FC] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">Current Openings</h2>
            <p className="font-sans text-gray-600 max-w-3xl mx-auto">
              Explore opportunities to contribute to high-impact legal work across litigation, advisory, and research.
            </p>
          </div>

          {loadingOpenings ? (
            <div className="text-center bg-white border border-gray-200 rounded-2xl p-10">
              <p className="font-sans text-gray-600">Loading openings...</p>
            </div>
          ) : openings.length > 0 ? (
            <div className="space-y-5">
              {openings.map((job) => (
                <article key={job._id} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-7 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl font-bold text-navy">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm font-sans text-gray-600">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/5 text-navy">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-navy">
                          <Clock3 size={14} />
                          {job.employmentType}
                        </span>
                      </div>
                      <p className="font-sans text-gray-600 leading-relaxed">{job.description}</p>
                    </div>
                    <button type="button" onClick={() => scrollToForm(job.title)} className="inline-flex items-center justify-center px-6 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110 hover:scale-105">
                      Apply Now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white border border-gray-200 rounded-2xl p-10">
              <p className="font-serif text-2xl text-navy mb-3">No current openings right now</p>
              <p className="font-sans text-gray-600">Please send us your CV anyway. We are always interested in exceptional talent.</p>
              <button type="button" onClick={() => scrollToForm('General Application')} className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-navy text-white font-sans text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors">
                Submit General Application
              </button>
            </div>
          )}
        </div>
      </section>

      <section ref={formRef} className="py-16 lg:py-20 bg-white scroll-mt-[var(--site-header-height)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              {formConfig.formTitle || CAREER_FORM_DEFAULT.formTitle}
            </h2>
            <p className="font-sans text-gray-600">
              {formConfig.formDescription || CAREER_FORM_DEFAULT.formDescription}
            </p>
          </div>

          {!formLoading && formConfig.isActive === false ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
              <p className="font-sans text-gray-600">Applications are currently closed. Please check back soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-5" noValidate>
              {submitStatus && (
                <div className={`rounded-lg px-4 py-3 font-sans text-sm ${
                  submitStatus.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {visibleFields.map((field) => (
                  <div key={field.fieldName} className={field.fieldType === 'textarea' || field.fieldType === 'file' ? 'md:col-span-2' : ''}>
                    <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                      {field.label || field.fieldName}
                      {field.isRequired ? ' *' : ''}
                    </label>
                    {renderField(field)}
                    {formErrors[field.fieldName] && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{formErrors[field.fieldName]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <div className="mb-4 flex justify-start">
                  <ReCaptcha
                    ref={captchaRef}
                    onChange={handleCaptchaChange}
                    onExpired={handleCaptchaExpired}
                    theme="light"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !captchaToken}
                  className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Submitting...' : (formConfig.submitButtonText || CAREER_FORM_DEFAULT.submitButtonText)}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
