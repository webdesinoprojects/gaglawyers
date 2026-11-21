import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, FileText, AlertCircle, CheckCircle, XCircle, Mail, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { OFFICE_ADDRESS_LINE } from '../constants/officeAddress';

const TermsOfService = () => {
  return (
    <div className="bg-grey-light min-h-screen">
      <SEOHead 
        title="Terms of Service | GAG Lawyers"
        description="Read the terms and conditions for using GAG Lawyers' website and legal services. Understanding your rights and responsibilities."
        keywords="terms of service, legal terms, conditions, user agreement"
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
              <Scale className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold">
                Terms of Service
              </h1>
              <p className="font-sans text-gray-300 mt-2">
                Last Updated: March 20, 2024
              </p>
            </div>
          </div>
          
          <p className="font-sans text-lg text-gray-300 leading-relaxed">
            Please read these Terms of Service carefully before using our website or engaging our legal services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            
            {/* Agreement to Terms */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-navy mb-3">Agreement to Terms</h2>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    By accessing or using the GAG Lawyers website ("Website") or engaging our legal services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Website or services.
                  </p>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    These Terms constitute a legally binding agreement between you and GAG Lawyers - Grover & Grover Advocates ("we," "us," or "our").
                  </p>
                </div>
              </div>
            </div>

            {/* Use of Website */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Use of Website</h2>
              
              <h3 className="font-sans text-lg font-semibold text-navy mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Permitted Uses
              </h3>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                You may use our Website for the following purposes:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Accessing information about our legal services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Contacting us for legal consultation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Reading our blog and legal resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Scheduling appointments and consultations</span>
                </li>
              </ul>

              <h3 className="font-sans text-lg font-semibold text-navy mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                Prohibited Uses
              </h3>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Use the Website for any unlawful purpose</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Attempt to gain unauthorized access to our systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Transmit viruses, malware, or harmful code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Scrape, copy, or reproduce content without permission</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Impersonate any person or entity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Interfere with the proper functioning of the Website</span>
                </li>
              </ul>
            </div>

            {/* No Attorney-Client Relationship */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-4">No Attorney-Client Relationship</h2>
                  <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded mb-4">
                    <p className="font-sans text-gray-700 leading-relaxed font-semibold">
                      IMPORTANT: Visiting our Website, reading our content, or contacting us does not create an attorney-client relationship.
                    </p>
                  </div>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    An attorney-client relationship is established only when:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">You have formally engaged our services through a written agreement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">We have confirmed our representation in writing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-sans text-gray-700">All necessary conflict checks have been completed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Legal Information Disclaimer */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Legal Information Disclaimer</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                The information provided on this Website is for general informational purposes only and should not be construed as legal advice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-grey-light rounded-lg">
                  <h3 className="font-sans font-semibold text-navy mb-2">Not Legal Advice</h3>
                  <p className="font-sans text-sm text-gray-600">Content on this Website does not constitute legal advice for your specific situation</p>
                </div>
                <div className="p-4 bg-grey-light rounded-lg">
                  <h3 className="font-sans font-semibold text-navy mb-2">No Guarantee</h3>
                  <p className="font-sans text-sm text-gray-600">We make no guarantees about the accuracy or completeness of information</p>
                </div>
                <div className="p-4 bg-grey-light rounded-lg">
                  <h3 className="font-sans font-semibold text-navy mb-2">Jurisdiction Specific</h3>
                  <p className="font-sans text-sm text-gray-600">Laws vary by jurisdiction; consult a qualified attorney in your area</p>
                </div>
                <div className="p-4 bg-grey-light rounded-lg">
                  <h3 className="font-sans font-semibold text-navy mb-2">Time Sensitive</h3>
                  <p className="font-sans text-sm text-gray-600">Legal information may become outdated; verify current laws and regulations</p>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Intellectual Property Rights</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                All content on this Website, including text, graphics, logos, images, and software, is the property of GAG Lawyers or its content suppliers and is protected by Indian and international copyright laws.
              </p>
              <p className="font-sans text-gray-700 leading-relaxed">
                You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Limitation of Liability</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law, GAG Lawyers shall not be liable for:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Any indirect, incidental, special, or consequential damages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Loss of profits, data, or business opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Damages arising from your use or inability to use the Website</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="font-sans text-gray-700">Errors or omissions in Website content</span>
                </li>
              </ul>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Third-Party Links</h2>
              <p className="font-sans text-gray-700 leading-relaxed">
                Our Website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites. Accessing third-party links is at your own risk.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Indemnification</h2>
              <p className="font-sans text-gray-700 leading-relaxed">
                You agree to indemnify and hold harmless GAG Lawyers, its partners, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Website or violation of these Terms.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Governing Law and Jurisdiction</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Modifications to Terms</h2>
              <p className="font-sans text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Website after changes are posted constitutes your acceptance of the modified Terms.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Severability</h2>
              <p className="font-sans text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-navy" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-4">Contact Information</h2>
                  <p className="font-sans text-gray-700 leading-relaxed mb-4">
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p className="font-sans text-gray-700">
                      <strong>Email:</strong> <a href="mailto:legal@gaglawyers.com" className="text-gold hover:underline">legal@gaglawyers.com</a>
                    </p>
                    <p className="font-sans text-gray-700">
                      <strong>Phone:</strong> <a href="tel:+919996263370" className="text-gold hover:underline">+91 99962 63370</a>
                    </p>
                    <p className="font-sans text-gray-700">
                      <strong>Address:</strong> GAG Lawyers - Grover & Grover Advocates, {OFFICE_ADDRESS_LINE}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="border-t border-gray-200 pt-8">
              <div className="p-6 bg-navy/5 rounded-lg">
                <h2 className="font-serif text-xl font-bold text-navy mb-3">Acknowledgment</h2>
                <p className="font-sans text-gray-700 leading-relaxed">
                  By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please discontinue use of the Website immediately.
                </p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all"
            >
              Need Legal Assistance? Contact Us
              <Mail size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
