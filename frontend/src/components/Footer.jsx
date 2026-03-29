import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold text-white">
                GAG
              </span>
              <span className="font-serif text-2xl font-light text-gold">
                Lawyers
              </span>
            </div>
            <p className="font-sans text-sm text-gray-300 leading-relaxed">
              Grover & Grover Advocates - Delivering excellence in legal services for over 25 years.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/firm" className="text-gray-300 hover:text-gold transition-colors">
                  The Firm
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-gold transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/awards" className="text-gray-300 hover:text-gold transition-colors">
                  Awards
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-gold transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li className="flex items-start space-x-2 text-gray-300">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@gaglawyers.com" className="hover:text-gold transition-colors">
                  contact@gaglawyers.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-300">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-300">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-gold transition-all duration-300 hover:-translate-y-1"
              >
                <Globe size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-gold transition-all duration-300 hover:-translate-y-1"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-gold transition-all duration-300 hover:-translate-y-1"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="font-sans text-sm text-gray-400">
            © {currentYear} GAG Lawyers. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
