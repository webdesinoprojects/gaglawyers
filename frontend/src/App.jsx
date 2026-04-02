import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Firm from './pages/Firm';
import Team from './pages/Team';
import Awards from './pages/Awards';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ServicePage from './pages/ServicePage';
import ServiceDetail from './pages/ServiceDetail';
import LocationPage from './pages/LocationPage';
import LocationPageDynamic from './pages/LocationPageDynamic';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import DisclaimerModal from './components/DisclaimerModal';
import ContentProtection from './components/ContentProtection';
import FloatingWidgets from './components/FloatingWidgets';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ContactForms from './pages/admin/ContactForms';
import SiteSettings from './pages/admin/SiteSettings';
import TeamManager from './pages/admin/TeamManager';
import BlogManager from './pages/admin/BlogManager';
import ReviewManager from './pages/admin/ReviewManager';
import AwardManager from './pages/admin/AwardManager';
import GalleryManager from './pages/admin/GalleryManager';
import ServiceManager from './pages/admin/ServiceManager';
import PageContentManager from './pages/admin/PageContentManager';
import LocationManager from './pages/admin/LocationManager';
import SEOManager from './pages/admin/SEOManager';
import ComingSoon from './pages/admin/ComingSoon';
import Affiliation from './pages/Affiliation';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <DisclaimerModal />
      <ContentProtection />
      <FloatingWidgets />
      <Routes>
        {/* Admin routes MUST come before Layout routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="pages" element={<PageContentManager />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="services" element={<ServiceManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="awards" element={<AwardManager />} />
          <Route path="reviews" element={<ReviewManager />} />
          <Route path="locations" element={<LocationManager />} />
          <Route path="contacts" element={<ContactForms />} />
          <Route path="settings" element={<SiteSettings />} />
          <Route path="seo" element={<SEOManager />} />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="firm" element={<Firm />} />
          <Route path="team" element={<Team />} />
          <Route path="awards" element={<Awards />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="services" element={<Services />} />
          {/* Detailed service pages - handles all 20 services dynamically */}
          <Route path="bail-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="cheque-bounce-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="civil-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="contract-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="criminal-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="divorce-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="employment-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="immigration-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="legal-notice-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="armed-force-tribunal-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="cat-matters-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="corporate-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="cyber-crime-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="debt-recovery-lawyer-drt-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="family-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="high-court-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="insolvency-bankruptcy-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="insurance-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="landlord-tenant-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="mediation-arbitration-lawyer-in-delhi" element={<ServiceDetail />} />
          {/* Additional 5 services */}
          <Route path="motor-accident-mact-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="property-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="sexual-harassment-section-498a-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="supreme-court-lawyer-in-delhi" element={<ServiceDetail />} />
          <Route path="writ-petition-lawyer-in-delhi" element={<ServiceDetail />} />
          {/* Keep existing service slug route for backward compatibility */}
          <Route path="services/:slug" element={<ServicePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="affiliation" element={<Affiliation />} />
          {/* Location pages - direct slug routing (must be last to avoid conflicts) */}
          <Route path=":slug" element={<LocationPageDynamic />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
