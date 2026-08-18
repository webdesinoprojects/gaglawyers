import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
const AdminLayout = lazy(() => import('./components/AdminLayout'));
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
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminForgotPassword = lazy(() => import('./pages/admin/ForgotPassword'));
const AdminResetPassword = lazy(() => import('./pages/admin/ResetPassword'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ContactForms = lazy(() => import('./pages/admin/ContactForms'));
const FormRequirementManager = lazy(() => import('./pages/admin/FormRequirementManager'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));
const TeamManager = lazy(() => import('./pages/admin/TeamManager'));
const ResourceCenterManager = lazy(() => import('./pages/admin/ResourceCenterManager'));
const ReviewManager = lazy(() => import('./pages/admin/ReviewManager'));
const AwardManager = lazy(() => import('./pages/admin/AwardManager'));
const HomeAwardsManager = lazy(() => import('./pages/admin/HomeAwardsManager'));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager'));
const CareerManager = lazy(() => import('./pages/admin/CareerManager'));
const ServiceManager = lazy(() => import('./pages/admin/ServiceManager'));
const ServiceImport = lazy(() => import('./pages/admin/ServiceImport'));
const PageContentManager = lazy(() => import('./pages/admin/PageContentManager'));
const LocationManager = lazy(() => import('./pages/admin/LocationManager'));
const SEOManager = lazy(() => import('./pages/admin/SEOManager'));
const PageVisibilityManager = lazy(() => import('./pages/admin/PageVisibilityManager'));
const ComingSoon = lazy(() => import('./pages/admin/ComingSoon'));
const SocialLinksManager = lazy(() => import('./pages/admin/SocialLinksManager'));
const LocationSeoManager = lazy(() => import('./pages/admin/LocationSeoManager'));
import Affiliation from './pages/Affiliation';

const GA_MEASUREMENT_ID = 'G-QNKLZP7NJS';

const RedirectToSlug = () => {
  const { slug } = useParams();
  return <Navigate to={`/${slug}`} replace />;
};

const RedirectBlogToArticles = () => {
  const { slug } = useParams();
  return <Navigate to={`/articles/${slug}`} replace />;
};

/**
 * PERF-01. Shown only while an admin chunk downloads — public pages are static
 * imports and never suspend. Mirrors the spinner the admin pages use themselves
 * so the transition is not jarring.
 */
const AdminChunkFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full" />
  </div>
);

function App() {
  return (
    <Router>
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      <DisclaimerProvider>
        <ScrollToTop />
        <ContentProtection />
        {/* PERF-01: admin routes are lazy-loaded, so this boundary only ever
            renders while an admin chunk is downloading. Public routes are static
            imports and never suspend, so visitors are unaffected. */}
        <Suspense fallback={<AdminChunkFallback />}>
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
            <Route path="home-awards" element={<HomeAwardsManager />} />
            <Route path="reviews" element={<ReviewManager />} />
            <Route path="careers" element={<CareerManager />} />
            <Route path="locations" element={<LocationManager />} />
            <Route path="seo" element={<SEOManager />} />
            <Route path="contacts" element={<ContactForms />} />
            <Route path="forms" element={<FormRequirementManager />} />
            <Route path="settings" element={<SiteSettings />} />
            <Route path="social-links" element={<SocialLinksManager />} />
            <Route path="location-seo" element={<LocationSeoManager />} />
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
        </Suspense>
      </DisclaimerProvider>
    </Router>
  );
}

export default App;
