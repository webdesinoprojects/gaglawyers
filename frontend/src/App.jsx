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
import LocationPage from './pages/LocationPage';
import DisclaimerModal from './components/DisclaimerModal';
import ContentProtection from './components/ContentProtection';
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
import ComingSoon from './pages/admin/ComingSoon';
import Affiliation from './pages/Affiliation';

function App() {
  return (
    <Router>
      <DisclaimerModal />
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
          <Route path="team" element={<TeamManager />} />
          <Route path="services" element={<ServiceManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="awards" element={<AwardManager />} />
          <Route path="reviews" element={<ReviewManager />} />
          <Route path="locations" element={<LocationManager />} />
          <Route path="contacts" element={<ContactForms />} />
          <Route path="settings" element={<SiteSettings />} />
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
          <Route path="services/:slug" element={<ServicePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="affiliation" element={<Affiliation />} />
          {/* Location pages - dynamic service/city routing */}
          <Route path=":service/:city" element={<LocationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
