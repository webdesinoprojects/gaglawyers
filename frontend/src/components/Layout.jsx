import React from 'react';
import { Outlet } from 'react-router-dom';
import DynamicNavbar from './DynamicNavbar';
import Footer from './Footer';
import FloatingWidgets from './FloatingWidgets';
import SiteHeaderHeightSync from './SiteHeaderHeightSync';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DynamicNavbar />
      <SiteHeaderHeightSync />
      {/* Header is fixed; reserve space so content starts below it. */}
      <main className="flex-grow" style={{ paddingTop: 'var(--site-header-height, 7.25rem)' }}>
        <Outlet />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export default Layout;
