import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PageVisibilityWrapper from './components/PageVisibilityWrapper';
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
import SlugPageRouter from './pages/SlugPageRouter';
import LocationPage from './pages/LocationPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import ContentProtection from './components/ContentProtection';
import ScrollToTop from './components/ScrollToTop';
import DisclaimerProvider from './components/disclaimer/DisclaimerProvider';
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
import ServiceImport from './pages/admin/ServiceImport';
import PageContentManager from './pages/admin/PageContentManager';
import LocationManager from './pages/admin/LocationManager';
import SEOManager from './pages/admin/SEOManager';
import PageVisibilityManager from './pages/admin/PageVisibilityManager';
import ComingSoon from './pages/admin/ComingSoon';
import Affiliation from './pages/Affiliation';

const RedirectToSlug = () => {
  const { slug } = useParams();
  return <Navigate to={`/${slug}`} replace />;
};

function App() {
  return (
    <Router>
      <DisclaimerProvider>
        <ScrollToTop />
        <ContentProtection />
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
            <Route path="page-visibility" element={<PageVisibilityManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="services/import" element={<ServiceImport />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="awards" element={<AwardManager />} />
            <Route path="reviews" element={<ReviewManager />} />
            <Route path="locations" element={<LocationManager />} />
            <Route path="seo" element={<SEOManager />} />
            <Route path="contacts" element={<ContactForms />} />
            <Route path="settings" element={<SiteSettings />} />
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
            <Route path="blog" element={<PageVisibilityWrapper pageKey="blog"><Blog /></PageVisibilityWrapper>} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<PageVisibilityWrapper pageKey="contact"><Contact /></PageVisibilityWrapper>} />
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
