import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, UserCheck, FileText, Mail, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { OFFICE_ADDRESS_LINE } from '../constants/officeAddress';

const PrivacyPolicy = () => {
  return (
    <div className="bg-grey-light min-h-screen">
      <SEOHead 
        title="Privacy Policy | GAG Lawyers"
        description="Learn how GAG Lawyers collects, uses, and protects your personal information. Our commitment to your privacy and data security."
        keywords="privacy policy, data protection, confidentiality, legal privacy"
      />

      {/* Header */}
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-gray-300 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold">
                Privacy Policy
              </h1>
              <p className="font-sans text-gray-300 mt-2">
                Last Updated: March 20, 2024
              </p>
            </div>
          </div>
          
          <p className="font-sans text-lg text-gray-300 leading-relaxed">
            At GAG Lawyers - Grover & Grover Advocates, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-navy mb-3">Introduction</h2>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    This Privacy Policy explains how GAG Lawyers ("we," "us," or "our") collects, uses, discloses, and protects your personal information when you visit our website or use our legal services. By accessing our website or engaging our services, you agree to the terms outlined in this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-navy" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-4">Information We Collect</h2>
                  
                  <h3 className="font-sans text-lg font-semibold text-navy mb-3">Personal Information</h3>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    We may collect the following personal information when you contact us or use our services:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Name and contact details (email address, phone number, mailing address)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Professional information (company name, job title)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Case-related information and legal documents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Payment and billing information</span>
                    </li>
                  </ul>

                  <h3 className="font-sans text-lg font-semibold text-navy mb-3">Automatically Collected Information</h3>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    When you visit our website, we automatically collect certain information:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">IP address and browser type</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Device information and operating system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Pages visited and time spent on our website</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Referring website and search terms used</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-navy" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-4">How We Use Your Information</h2>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    We use your personal information for the following purposes:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Legal Services:</strong> To provide legal consultation, representation, and related services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Communication:</strong> To respond to inquiries, send updates, and communicate about your case</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Billing:</strong> To process payments and maintain financial records</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Website Improvement:</strong> To analyze usage patterns and improve our website functionality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Legal Compliance:</strong> To comply with legal obligations and protect our legal rights</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Marketing:</strong> To send newsletters and updates (with your consent)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-navy" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-4">Data Security</h2>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Secure servers with encryption technology</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Access controls and authentication procedures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Regular security audits and updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">Staff training on data protection and confidentiality</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-gold/10 border-l-4 border-gold rounded">
                    <p className="font-sans text-sm text-gray-700">
                      <strong>Note:</strong> While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-navy" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-4">Information Sharing and Disclosure</h2>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Service Providers:</strong> With trusted third-party service providers who assist in our operations (e.g., payment processors, cloud storage)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700"><strong>Legal Proceedings:</strong> To protect our rights, property, or safety, or that of our clients or others</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Your Rights</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-grey-light rounded-lg">
                  <h3 className="font-sans font-semibold text-navy mb-2">Access</h3>
                  <p className="font-sans text-sm text-gray-600">Request a copy of your personal information</p>
                </div>
                <div className="p-4 bg-grey-light rounded-lg">
                  <h3 className="font-sans font-semibold text-navy mb-2">Correction</h3>
                  <p className="font-sans text-sm text-gray-600">Request correction of inaccurate information</p>
                </div>
                <div className="p-4 bg-grey-light rounded-lg">
                  <h3 className="font-sans font-semibold text-navy mb-2">Deletion</h3>
                  <p className="font-sans text-sm text-gray-600">Request deletion of your personal information</p>
                </div>
                <div className="p-4 bg-grey-light rounded-lg">
                  <h3 className="font-sans font-semibold text-navy mb-2">Opt-Out</h3>
                  <p className="font-sans text-sm text-gray-600">Unsubscribe from marketing communications</p>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Cookies and Tracking Technologies</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-navy" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-4">Contact Us</h2>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p className="font-sans text-gray-700">
                      <strong>Email:</strong> <a href="mailto:privacy@gaglawyers.com" className="text-gold hover:underline">privacy@gaglawyers.com</a>
                    </p>
                    <p className="font-sans text-gray-700">
                      <strong>Phone:</strong> <a href="tel:+919996263370" className="text-gold hover:underline">+91 99962 63370</a>
                    </p>
                    <p className="font-sans text-gray-700">
                      <strong>Address:</strong> GAG Lawyers, {OFFICE_ADDRESS_LINE}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Changes to This Policy</h2>
              <p className="font-sans text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all"
            >
              Have Questions? Contact Us
              <Mail size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
