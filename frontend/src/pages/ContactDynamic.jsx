import React, { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import BlockRenderer from '../components/blocks/BlockRenderer';
import DynamicForm from '../components/DynamicForm';
import API_BASE_URL from '../config/api';

const ContactDynamic = () => {
  const [services, setServices] = useState([]);
  const [pageBlocks, setPageBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [servicesRes, blocksRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/cms/page-blocks/contact`),
      ]);

      const servicesData = await servicesRes.json();
      const blocksData = await blocksRes.json();

      if (servicesData.success) {
        setServices(servicesData.data);
      }

      if (blocksData.success && blocksData.data.blocks) {
        setPageBlocks(blocksData.data.blocks);
      }
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <SEOHead 
        title="Contact Us - GAG Lawyers | Legal Consultation"
        description="Get in touch with our legal experts. Schedule a consultation for corporate law, litigation, real estate, and family law matters."
        keywords="contact lawyers, legal consultation, lawyers in delhi, law firm contact"
      />
      
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Get In Touch
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Let's discuss how we can help you with your legal needs
          </p>
        </div>
      </section>

      <section className="bg-grey-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info from Blocks */}
            <div className="space-y-8">
              {pageBlocks.map((block, index) => (
                <BlockRenderer 
                  key={block._id || index} 
                  block={block}
                  overrideContent={block.overrideContent}
                />
              ))}
            </div>

            {/* Dynamic Contact Form */}
            <div className="bg-white rounded-sm shadow-md p-8 lg:p-10">
              <DynamicForm 
                formIdentifier="contact" 
                services={services}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactDynamic;
