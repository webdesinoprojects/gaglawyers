import React, { useEffect, useState } from 'react';
import { CheckCircle, Scale } from 'lucide-react';
import DynamicForm from '../DynamicForm';
import API_BASE_URL from '../../config/api';

const AppointmentSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`);
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
        }
      } catch (error) {
        console.error('Error fetching services for appointment form:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="bg-gradient-to-br from-grey-light via-white to-grey-light py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div className="bg-navy text-white rounded-3xl p-8 lg:p-10 shadow-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
              <Scale size={14} />
              Book Appointment
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold leading-tight mb-5">
              Book a legal consultation from the home page
            </h2>
            <p className="font-sans text-base text-gray-300 leading-relaxed mb-8">
              Share your matter, preferred practice area, and contact details. Our team will review it and reach out to schedule the next step.
            </p>

            <div className="space-y-4">
              {[
                'Quick appointment request without leaving the page',
                'Practice-area selection for faster case routing',
                'Suitable for urgent consultations and general inquiries',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold" />
                  </div>
                  <p className="font-sans text-sm text-gray-200 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 lg:p-10">
            <DynamicForm 
              formIdentifier="appointment" 
              services={services}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
