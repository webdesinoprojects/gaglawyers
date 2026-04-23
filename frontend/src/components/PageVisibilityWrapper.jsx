import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePageVisibility } from '../hooks/usePageVisibility';

/**
 * Wrapper component to check page visibility
 * Redirects to specified page or 404 if page is disabled
 */
const PageVisibilityWrapper = ({ pageKey, children }) => {
  const { isActive, redirectTo, loading } = usePageVisibility(pageKey);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  // If page is not active, redirect
  if (!isActive) {
    // Redirect to specified page or 404
    const redirectPath = redirectTo || '/404';
    return <Navigate to={redirectPath} replace />;
  }

  // Page is active, render children
  return <>{children}</>;
};

export default PageVisibilityWrapper;
