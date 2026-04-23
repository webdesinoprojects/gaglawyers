import React from 'react';
import { useParams } from 'react-router-dom';
import ServicePageDynamic from './ServicePageDynamic';
import LocationPageDynamic from './LocationPageDynamic';

const SlugPageRouter = () => {
  const { slug = '' } = useParams();

  if (slug.includes('-in-')) {
    return <LocationPageDynamic />;
  }

  return <ServicePageDynamic />;
};

export default SlugPageRouter;
