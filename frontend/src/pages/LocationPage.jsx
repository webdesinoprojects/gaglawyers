import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { buildLocationPageSlug } from '../utils/slugs';

const LocationPage = () => {
  const { service, city } = useParams();

  if (!service || !city) {
    return <Navigate to="/" replace />;
  }

  const slug = buildLocationPageSlug(service, city);
  if (!slug) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={`/${slug}`} replace />;
};

export default LocationPage;
