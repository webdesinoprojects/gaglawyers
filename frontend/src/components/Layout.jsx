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
      {/* Header is position:sticky in normal flow — no extra padding-top on main (avoids double offset). */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export default Layout;
