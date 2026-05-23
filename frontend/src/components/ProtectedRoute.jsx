import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenExpired = (token) => {
  try {
    const payloadPart = token.split('.')[1];
    if (!payloadPart) return true;
    const payload = JSON.parse(atob(payloadPart));
    if (!payload?.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
