import React from 'react';
import { Outlet } from 'react-router-dom';
import DynamicNavbar from './DynamicNavbar';
import Footer from './Footer';
import FloatingWidgets from './FloatingWidgets';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DynamicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export default Layout;
