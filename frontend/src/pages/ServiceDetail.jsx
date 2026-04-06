import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Home, ChevronRight, FileText, Scale, 
  Shield, CheckCircle, Users, Briefcase, HelpCircle, AlertCircle 
} from 'lucide-react';
import { getServiceBySlug } from '../data/servicesData';
import FAQAccordion from '../components/service/FAQAccordion';
import DocumentChecklist from '../components/service/DocumentChecklist';
import CaseCard from '../components/service/CaseCard';
import ConsultationForm from '../components/service/ConsultationForm';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-[#1a2744] mb-4">
            Service Not Found
          </h1>
          <Link to="/services" className="text-[#c9a84c] hover:underline">
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm font-sans">
            <Link to="/" className="text-gray-600 hover:text-[#c9a84c] transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link to="/services" className="text-gray-600 hover:text-[#c9a84c] transition-colors">
              Services
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-[#1a2744] font-semibold">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1a2744] to-[#1a2744]/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {service.hero.badge && (
              <div className="inline-block bg-[#c9a84c] text-[#1a2744] px-4 py-2 rounded-full font-sans font-bold text-sm mb-4">
                {service.hero.badge}
              </div>
            )}
            <h1 className="font-serif text-5xl font-bold mb-4">
              {service.hero.title}
            </h1>
            <p className="font-sans text-xl text-white/90 mb-8">
              {service.hero.subtitle}
            </p>
            <a
              href="#consultation-form"
              className="inline-block bg-[#c9a84c] text-[#1a2744] font-sans font-bold py-4 px-8 rounded-lg hover:bg-[#b89840] transition-all shadow-lg hover:shadow-xl"
            >
              {service.hero.cta}
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            {service.about && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.about.title}
                  </h2>
                </div>
                <p className="font-sans text-gray-700 leading-relaxed mb-6">
                  {service.about.content}
                </p>
                {service.about.sections && service.about.sections.map((section, idx) => (
                  <div key={idx} className="mt-6">
                    <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">
                      {section.heading}
                    </h3>
                    <ul className="space-y-2">
                      {section.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                          <span className="font-sans text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* Writ vs PIL Comparison Table */}
            {service.writVsPil && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <h2 className="font-serif text-3xl font-bold text-[#1a2744] mb-6">
                  {service.writVsPil.title}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#1a2744] text-white">
                        <th className="font-serif text-left p-4 rounded-tl-lg">Feature</th>
                        <th className="font-serif text-left p-4">Writ Petition</th>
                        <th className="font-serif text-left p-4 rounded-tr-lg">Public Interest Litigation (PIL)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.writVsPil.comparison.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="font-sans font-semibold text-[#1a2744] p-4 border-b border-gray-200">
                            {row.feature}
                          </td>
                          <td className="font-sans text-gray-700 p-4 border-b border-gray-200">
                            {row.writ}
                          </td>
                          <td className="font-sans text-gray-700 p-4 border-b border-gray-200">
                            {row.pil}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* What to Do Section (for procedural advice) */}
            {service.whatToDo && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.whatToDo.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {service.whatToDo.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#c9a84c] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-sans font-bold text-[#1a2744] text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p className="font-sans text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Types of Bail/Cases */}
            {service.typesOfBail && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Scale size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.typesOfBail.title}
                  </h2>
                </div>
                {service.typesOfBail.description && (
                  <p className="font-sans text-gray-700 mb-6">{service.typesOfBail.description}</p>
                )}
                <div className="space-y-4">
                  {service.typesOfBail.types.map((type, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#c9a84c]">
                      <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-2">
                        {type.name}
                      </h3>
                      <p className="font-sans text-gray-700">{type.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Types of Cases */}
            {service.typesOfCases && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.typesOfCases.title}
                  </h2>
                </div>
                <div className="grid gap-4">
                  {service.typesOfCases.cases.map((caseType, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#c9a84c]">
                      <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-2">
                        {caseType.name}
                      </h3>
                      <p className="font-sans text-gray-700">{caseType.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Types of Writs (for Writ Petition pages) */}
            {service.typesOfWrits && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Scale size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.typesOfWrits.title}
                  </h2>
                </div>
                <div className="grid gap-4">
                  {service.typesOfWrits.types.map((type, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#c9a84c]">
                      <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-2">
                        {type.name}
                      </h3>
                      <p className="font-sans text-gray-700">{type.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Acts & Provisions */}
            {service.actsProvisions && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Shield size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.actsProvisions.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {service.actsProvisions.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Major Statutes */}
            {service.majorStatutes && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Shield size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.majorStatutes.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {service.majorStatutes.statutes.map((statute, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700">{statute}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Charges & Penalties */}
            {service.chargesAndPenalties && (
              <section className="bg-white rounded-xl border-2 border-red-200 p-8 border-l-8 border-l-red-500">
                <h2 className="font-serif text-3xl font-bold text-[#1a2744] mb-6">
                  {service.chargesAndPenalties.title}
                </h2>
                <div className="space-y-3">
                  {service.chargesAndPenalties.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Legal Remedies */}
            {service.legalRemedies && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Scale size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.legalRemedies.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {service.legalRemedies.remedies.map((remedy, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Remedies Available (Detailed) */}
            {service.remediesAvailable && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Scale size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.remediesAvailable.title}
                  </h2>
                </div>
                <div className="grid gap-4">
                  {service.remediesAvailable.remedies.map((remedy, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#c9a84c]">
                      <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-2">
                        {remedy.name}
                      </h3>
                      <p className="font-sans text-gray-700">{remedy.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Property Services (for property lawyers) */}
            {service.propertyServices && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.propertyServices.title}
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.propertyServices.services.map((svc, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#c9a84c]">
                      <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-2">
                        {svc.name}
                      </h3>
                      <p className="font-sans text-sm text-gray-700">{svc.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Buying Property Steps */}
            {service.buyingProperty && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <h2 className="font-serif text-2xl font-bold text-[#1a2744] mb-6">
                  {service.buyingProperty.title}
                </h2>
                <div className="space-y-4">
                  {service.buyingProperty.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#c9a84c] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-sans font-bold text-[#1a2744] text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p className="font-sans text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Selling Property Steps */}
            {service.sellingProperty && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <h2 className="font-serif text-2xl font-bold text-[#1a2744] mb-6">
                  {service.sellingProperty.title}
                </h2>
                <div className="space-y-4">
                  {service.sellingProperty.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#c9a84c] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-sans font-bold text-[#1a2744] text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p className="font-sans text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Rights & Obligations */}
            {service.rightsObligations && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Shield size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.rightsObligations.title}
                  </h2>
                </div>
                
                {service.rightsObligations.rights && (
                  <div className="mb-6">
                    <h3 className="font-serif text-xl font-bold text-[#1a2744] mb-4">Rights</h3>
                    <ul className="space-y-3">
                      {service.rightsObligations.rights.map((right, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="font-sans text-gray-700">{right}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.rightsObligations.obligations && (
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1a2744] mb-4">Obligations</h3>
                    <ul className="space-y-3">
                      {service.rightsObligations.obligations.map((obligation, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                          <span className="font-sans text-gray-700">{obligation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* PIL Criteria */}
            {service.pilCriteria && (
              <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-8">
                <h2 className="font-serif text-2xl font-bold text-[#1a2744] mb-6">
                  {service.pilCriteria.title}
                </h2>
                <div className="space-y-3">
                  {service.pilCriteria.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-800">{point}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Filing Procedure */}
            {service.filingProcedure && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.filingProcedure.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {service.filingProcedure.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#c9a84c] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-sans font-bold text-[#1a2744] text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p className="font-sans text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Documents Required */}
            {service.documentsRequired && (
              <DocumentChecklist documents={service.documentsRequired.documents} />
            )}

            {/* Role of Our Lawyers */}
            {service.roleOfLawyers && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.roleOfLawyers.title}
                  </h2>
                </div>
                <p className="font-sans text-gray-700 leading-relaxed">
                  {service.roleOfLawyers.description}
                </p>
              </section>
            )}

            {/* How Grover & Grover Helps */}
            {service.howWeHelp && (
              <section className="bg-gradient-to-br from-[#c9a84c] to-[#b89840] rounded-xl p-8">
                <h2 className="font-serif text-3xl font-bold text-[#1a2744] mb-4">
                  {service.howWeHelp.title}
                </h2>
                <p className="font-sans text-[#1a2744]/90 leading-relaxed">
                  {service.howWeHelp.description}
                </p>
              </section>
            )}

            {/* Popular Cases */}
            {service.popularCases && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Scale size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    {service.popularCases.title}
                  </h2>
                </div>
                <div className="grid gap-4">
                  {service.popularCases.cases.map((caseName, index) => (
                    <CaseCard key={index} caseName={caseName} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {service.faqs && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <HelpCircle size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    Frequently Asked Questions
                  </h2>
                </div>
                <FAQAccordion faqs={service.faqs} />
              </section>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1" id="consultation-form">
            <ConsultationForm serviceName={service.title} />
            
            {/* Emergency Helpline (for Sexual Harassment / 498A) */}
            {slug === 'sexual-harassment-section-498a-lawyer-in-delhi' && (
              <div className="bg-red-600 rounded-xl p-6 mt-6 text-white sticky top-[calc(var(--site-header-height)+1rem)]">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle size={24} className="flex-shrink-0" />
                  <h3 className="font-serif text-xl font-bold">Emergency Helpline</h3>
                </div>
                <p className="font-sans text-sm mb-4 text-white/90">
                  Available 24/7 for urgent cases and immediate legal assistance.
                </p>
                <a
                  href="tel:+919996263370"
                  className="block bg-white text-red-600 font-sans font-bold py-3 px-6 rounded-lg hover:bg-red-50 transition-all text-center"
                >
                  Call Emergency: +91 99962 63370
                </a>
                <p className="font-sans text-xs mt-4 text-white/80">
                  Note: This firm handles both complainant representation and false case defence for accused parties under 498A.
                </p>
              </div>
            )}

            {/* Property Services Quick Links (for Property Lawyer) */}
            {slug === 'property-lawyer-in-delhi' && service.propertyServices && (
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mt-6">
                <h3 className="font-serif text-xl font-bold text-[#1a2744] mb-4">
                  Our Property Services
                </h3>
                <div className="space-y-3">
                  {service.propertyServices.services.map((svc, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-[#c9a84c]/10 transition-colors border-l-4 border-[#c9a84c]">
                      <h4 className="font-sans font-semibold text-[#1a2744] text-sm mb-1">
                        {svc.name}
                      </h4>
                      <p className="font-sans text-xs text-gray-600">{svc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MACT Compensation Note (for Motor Accident) */}
            {slug === 'motor-accident-mact-lawyer-in-delhi' && (
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 mt-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Scale size={24} className="flex-shrink-0" />
                  <h3 className="font-serif text-xl font-bold">Compensation Range</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <p className="font-sans text-sm font-bold mb-1">Death Claims</p>
                    <p className="font-sans text-xs">Up to ₹50 Lakh</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <p className="font-sans text-sm font-bold mb-1">Permanent Disability</p>
                    <p className="font-sans text-xs">Up to ₹10 Lakh</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <p className="font-sans text-sm font-bold mb-1">Hit & Run Cases</p>
                    <p className="font-sans text-xs">Via Solatium Fund</p>
                  </div>
                </div>
                <p className="font-sans text-xs mt-4 text-white/80">
                  Actual compensation depends on injury severity, medical expenses, and loss of income.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
