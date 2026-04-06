import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfoBlock = ({ content }) => {
  return (
    <div className="space-y-8">
      <div>
        {content.heading && (
          <h2 className="font-serif text-3xl font-bold text-navy mb-6">
            {content.heading}
          </h2>
        )}
        {content.description && (
          <p className="font-sans text-gray-600 leading-relaxed mb-8">
            {content.description}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {content.email && (
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-navy/5 flex-shrink-0">
              <Mail className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-navy mb-1">{content.email.label}</h3>
              <a
                href={content.email.href}
                className="font-sans text-gray-600 hover:text-gold transition-colors"
              >
                {content.email.value}
              </a>
            </div>
          </div>
        )}

        {content.phone && (
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-navy/5 flex-shrink-0">
              <Phone className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-navy mb-1">{content.phone.label}</h3>
              <p className="font-sans text-gray-600">{content.phone.value}</p>
              {content.phone.additional && (
                <p className="font-sans text-sm text-gray-500">{content.phone.additional}</p>
              )}
            </div>
          </div>
        )}

        {content.address && (
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-navy/5 flex-shrink-0">
              <MapPin className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-navy mb-1">{content.address.label}</h3>
              <p className="font-sans text-gray-600 whitespace-pre-line">
                {content.address.value}
              </p>
            </div>
          </div>
        )}
      </div>

      {content.mapEmbedUrl && (
        <div className="mt-8 rounded-sm overflow-hidden shadow-md h-64">
          <iframe
            src={content.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ContactInfoBlock;
