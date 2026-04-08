import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ReCaptcha from '../components/ReCaptcha';
import API_BASE_URL from '../config/api';
import { OFFICE_ADDRESS_LINES } from '../constants/officeAddress';

const PANEL = '#112240';

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6998.3752460208125!2d77.13081933769948!3d28.71393836202312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d010b75f3e47d%3A0x4e92383cc436853f!2sGAG%20Lawyers%20-%20Grover%20%26%20Grover%2C%20Advocates%20%7C%20Best%20Divorce%20Lawyer%20in%20Delhi%2C%20Property%20Lawyer%20in%20Delhi%2C%20Civil%20%26%20Criminal%20Lawyers!5e0!3m2!1sen!2sin!4v1775508641842!5m2!1sen!2sin';

const Contact = () => {
  const captchaRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceOfInterest: '',
    message: '',
  });
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setSubmitStatus({ type: 'error', message: 'Please complete the captcha verification.' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! We will contact you shortly.' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceOfInterest: '',
          message: '',
        });
        setCaptchaToken(null);
        if (captchaRef.current) {
          captchaRef.current.reset();
        }
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Unable to submit. Please try again later.' });
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
    setSubmitStatus({ type: 'error', message: 'Captcha expired. Please verify again.' });
  };

  const inputClass =
    'w-full rounded-md bg-[#0B1526] px-4 py-3 font-sans text-white placeholder:text-gray-500 border border-white/15 transition-colors duration-200 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/40';

  const labelClass = 'mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-[#8FA3B8]';

  return (
    <div className="min-h-screen bg-[#0B1526]">
      <SEOHead
        title="Contact Us - GAG Lawyers | Legal Consultation"
        description="Get in touch with our legal experts. Schedule a consultation for corporate law, litigation, real estate, and family law matters."
        keywords="contact lawyers, legal consultation, lawyers in delhi, law firm contact"
      />

      <section className="bg-[#0B1526] text-white">
        {/* Header banner — flows into main contact area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 md:pt-14 md:pb-12 lg:pt-16 lg:pb-14 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-white tracking-tight">
            Get In Touch
          </h1>
          <p className="mt-4 font-sans text-lg md:text-xl text-[#B8B5A8] max-w-2xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can help you with your legal needs
          </p>
          <div className="mt-6 flex justify-center" aria-hidden>
            <div className="h-px w-[60px] bg-[#C9A84C]" />
          </div>
        </div>

        {/* Main two-column block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
            {/* LEFT — Contact + map */}
            <div className="lg:pr-10 xl:pr-14 lg:border-r lg:border-[#C9A84C]/35">
              <div className="rounded-lg border border-white/10 bg-[#0B1526]/80 p-6 md:p-8 lg:p-10">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white relative inline-block">
                  Contact Information
                  <span
                    className="absolute -bottom-2 left-0 h-0.5 w-12 rounded-full bg-[#C9A84C]"
                    aria-hidden
                  />
                </h2>
                <p className="mt-8 font-sans text-sm md:text-[0.9375rem] text-[#9CA8B8] leading-relaxed max-w-lg">
                  Reach out through any of the following channels. Our team is ready to assist you with
                  your legal matters.
                </p>

                <ul className="mt-10 space-y-0 divide-y divide-white/10">
                  <li className="flex gap-4 pb-8 pt-0 first:pt-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#C9A84C]/35 bg-[#C9A84C]/10">
                      <Mail className="h-5 w-5 text-[#C9A84C]" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-[#C9A84C]">
                        Email
                      </p>
                      <a
                        href="mailto:contact@gaglawyers.com"
                        className="mt-1.5 block font-sans text-base text-white hover:text-[#C9A84C] transition-colors break-all"
                      >
                        contact@gaglawyers.com
                      </a>
                    </div>
                  </li>

                  <li className="flex flex-wrap items-start gap-4 pb-8 pt-8">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#C9A84C]/35 bg-[#C9A84C]/10">
                      <Phone className="h-5 w-5 text-[#C9A84C]" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-[#C9A84C]">
                        Phone
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <a
                          href="tel:+919996263370"
                          className="font-sans text-base text-white hover:text-[#C9A84C] transition-colors"
                        >
                          +91 99962 63370
                        </a>
                        <span className="inline-flex items-center rounded-full bg-[#1A3D2E] px-2.5 py-0.5 font-sans text-[0.625rem] font-semibold uppercase tracking-wide text-[#6EE7B7] ring-1 ring-[#22C55E]/40">
                          WhatsApp Available
                        </span>
                      </div>
                    </div>
                  </li>

                  <li className="flex gap-4 pb-0 pt-8">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#C9A84C]/35 bg-[#C9A84C]/10">
                      <MapPin className="h-5 w-5 text-[#C9A84C]" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-[#C9A84C]">
                        Office Address
                      </p>
                      <p className="mt-1.5 font-sans text-base text-white/95 leading-relaxed">
                        {OFFICE_ADDRESS_LINES.map((line, i) => (
                          <React.Fragment key={line}>
                            {i > 0 && <br />}
                            {line}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-10 pt-2">
                  <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-[#C9A84C] mb-3">
                    Find us
                  </p>
                  <div className="overflow-hidden rounded-[8px] border border-[#C9A84C]/90 ring-1 ring-[#C9A84C]/25 shadow-lg shadow-black/30">
                    <iframe
                      title="GAG Lawyers office on Google Maps"
                      src={MAP_EMBED_SRC}
                      className="w-full border-0 block h-[220px] sm:h-[280px] md:h-[360px] lg:h-[450px]"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="mt-12 lg:mt-0 lg:pl-10 xl:pl-14">
              <div
                className="rounded-[12px] border border-[#C9A84C]/50 p-6 sm:p-8 md:p-[2rem] shadow-xl shadow-black/25"
                style={{ backgroundColor: PANEL }}
              >
                <h2 className="font-serif text-2xl md:text-3xl lg:text-[2rem] font-bold text-white">
                  Send Us a Message
                </h2>
                <p className="mt-3 font-sans text-sm md:text-[0.9375rem] text-[#8FA3B8] leading-relaxed">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {submitStatus && (
                  <div
                    role="status"
                    className={`mt-6 rounded-md border px-4 py-3 font-sans text-sm ${
                      submitStatus.type === 'success'
                        ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-100'
                        : 'border-red-500/40 bg-red-950/35 text-red-100'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Your mobile number (with country code)"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceOfInterest" className={labelClass}>
                      Practice Area of Interest
                    </label>
                    <div className="relative">
                      <select
                        id="serviceOfInterest"
                        name="serviceOfInterest"
                        value={formData.serviceOfInterest}
                        onChange={handleChange}
                        required
                        className={`${inputClass} cursor-pointer pr-11 appearance-none`}
                      >
                        <option value="" className="bg-[#0B1526] text-gray-400">
                          Select a practice area
                        </option>
                        {services.map((service) => (
                          <option
                            key={service._id}
                            value={service.name || service.title}
                            className="bg-[#0B1526] text-white"
                          >
                            {service.name || service.title}
                          </option>
                        ))}
                        <option value="Other" className="bg-[#0B1526] text-white">
                          Other
                        </option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C9A84C]/80"
                        aria-hidden
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputClass} min-h-[8.75rem] resize-y`}
                      placeholder="Tell us about your legal matter..."
                    />
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCaptcha
                      ref={captchaRef}
                      onChange={handleCaptchaChange}
                      onExpired={handleCaptchaExpired}
                      theme="dark"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !captchaToken}
                    className="w-full rounded-md bg-[#C9A84C] py-3.5 px-6 font-sans text-base font-bold text-[#0B1526] shadow-md transition-all duration-200 hover:bg-[#B08A3E] hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry →'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
