import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PageVisibilityWrapper from './components/PageVisibilityWrapper';
import GoogleAnalytics from './components/GoogleAnalytics';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Firm from './pages/Firm';
import Team from './pages/Team';
import Awards from './pages/Awards';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Newsletter from './pages/Newsletter';
import BlogPost from './pages/BlogPost';
import SlugPageRouter from './pages/SlugPageRouter';
import LocationPage from './pages/LocationPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import ContentProtection from './components/ContentProtection';
import ScrollToTop from './components/ScrollToTop';
import DisclaimerProvider from './components/disclaimer/DisclaimerProvider';
import AdminLogin from './pages/admin/Login';
import AdminForgotPassword from './pages/admin/ForgotPassword';
import AdminResetPassword from './pages/admin/ResetPassword';
import AdminDashboard from './pages/admin/Dashboard';
import ContactForms from './pages/admin/ContactForms';
import FormRequirementManager from './pages/admin/FormRequirementManager';
import SiteSettings from './pages/admin/SiteSettings';
import TeamManager from './pages/admin/TeamManager';
import ResourceCenterManager from './pages/admin/ResourceCenterManager';
import ReviewManager from './pages/admin/ReviewManager';
import AwardManager from './pages/admin/AwardManager';
import GalleryManager from './pages/admin/GalleryManager';
import CareerManager from './pages/admin/CareerManager';
import ServiceManager from './pages/admin/ServiceManager';
import ServiceImport from './pages/admin/ServiceImport';
import PageContentManager from './pages/admin/PageContentManager';
import LocationManager from './pages/admin/LocationManager';
import SEOManager from './pages/admin/SEOManager';
import PageVisibilityManager from './pages/admin/PageVisibilityManager';
import ComingSoon from './pages/admin/ComingSoon';
import SocialLinksManager from './pages/admin/SocialLinksManager';
import Affiliation from './pages/Affiliation';
import API_BASE_URL from './config/api';

const RedirectToSlug = () => {
  const { slug } = useParams();
  return <Navigate to={`/${slug}`} replace />;
};

const RedirectBlogToArticles = () => {
  const { slug } = useParams();
  return <Navigate to={`/articles/${slug}`} replace />;
};

function App() {
  const [gaMeasurementId, setGaMeasurementId] = useState(import.meta.env.VITE_GA_MEASUREMENT_ID || '');

  useEffect(() => {
    const fetchGaFromSettings = async () => {
      if (gaMeasurementId) return;
      try {
        const response = await fetch(`${API_BASE_URL}/api/cms/global-settings`);
        const data = await response.json();
        if (data?.success) {
          const dynamicId = data?.data?.scripts?.googleAnalytics?.trim();
          if (dynamicId) {
            setGaMeasurementId(dynamicId);
          }
        }
      } catch (error) {
        console.error('Failed to load Google Analytics ID from settings:', error);
      }
    };

    fetchGaFromSettings();
  }, [gaMeasurementId]);
  
  return (
    <Router>
      <GoogleAnalytics measurementId={gaMeasurementId} />
      <DisclaimerProvider>
        <ScrollToTop />
        <ContentProtection />
        <Routes>
          {/* Admin routes MUST come before Layout routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password/:token" element={<AdminResetPassword />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="resource-center" element={<ResourceCenterManager />} />
            <Route path="blog" element={<Navigate to="/admin/resource-center" replace />} />
            <Route path="pages" element={<PageContentManager />} />
            <Route path="page-visibility" element={<PageVisibilityManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="services/import" element={<ServiceImport />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="awards" element={<AwardManager />} />
            <Route path="reviews" element={<ReviewManager />} />
            <Route path="careers" element={<CareerManager />} />
            <Route path="locations" element={<LocationManager />} />
            <Route path="seo" element={<SEOManager />} />
            <Route path="contacts" element={<ContactForms />} />
            <Route path="forms" element={<FormRequirementManager />} />
            <Route path="settings" element={<SiteSettings />} />
            <Route path="social-links" element={<SocialLinksManager />} />
            <Route path="*" element={<ComingSoon />} />
          </Route>

          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<PageVisibilityWrapper pageKey="home"><Home /></PageVisibilityWrapper>} />
            <Route path="about" element={<PageVisibilityWrapper pageKey="about"><About /></PageVisibilityWrapper>} />
            <Route path="firm" element={<PageVisibilityWrapper pageKey="firm"><Firm /></PageVisibilityWrapper>} />
            <Route path="team" element={<PageVisibilityWrapper pageKey="team"><Team /></PageVisibilityWrapper>} />
            <Route path="awards" element={<PageVisibilityWrapper pageKey="awards"><Awards /></PageVisibilityWrapper>} />
            <Route path="gallery" element={<PageVisibilityWrapper pageKey="gallery"><Gallery /></PageVisibilityWrapper>} />
            <Route path="services" element={<PageVisibilityWrapper pageKey="services"><Services /></PageVisibilityWrapper>} />
            <Route path="services/:slug" element={<RedirectToSlug />} />
            <Route path="articles" element={<PageVisibilityWrapper pageKey="blog"><Blog /></PageVisibilityWrapper>} />
            <Route path="newsletter" element={<PageVisibilityWrapper pageKey="newsletter"><Newsletter /></PageVisibilityWrapper>} />
            <Route path="newsletter/:slug" element={<BlogPost />} />
            <Route path="articles/:slug" element={<BlogPost />} />
            <Route path="blog" element={<Navigate to="/articles" replace />} />
            <Route path="blog/:slug" element={<RedirectBlogToArticles />} />
            <Route path="contact" element={<PageVisibilityWrapper pageKey="contact"><Contact /></PageVisibilityWrapper>} />
            <Route path="careers" element={<PageVisibilityWrapper pageKey="careers"><Careers /></PageVisibilityWrapper>} />
            <Route path="affiliation" element={<PageVisibilityWrapper pageKey="affiliation"><Affiliation /></PageVisibilityWrapper>} />
            <Route path="privacy" element={<PageVisibilityWrapper pageKey="privacyPolicy"><PrivacyPolicy /></PageVisibilityWrapper>} />
            <Route path="terms" element={<PageVisibilityWrapper pageKey="termsOfService"><TermsOfService /></PageVisibilityWrapper>} />
            {/* Location pages - dynamic service/city routing */}
            <Route path=":service/:city" element={<LocationPage />} />
            <Route path=":slug" element={<SlugPageRouter />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </DisclaimerProvider>
    </Router>
  );
}

export default App;
