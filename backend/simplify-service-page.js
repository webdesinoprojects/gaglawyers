/**
 * This script removes all hardcoded overrides and images from ServicePage.jsx
 * to make all services have the same consistent layout.
 * 
 * Run this to create a simplified ServicePage component.
 */

const fs = require('fs');
const path = require('path');

const simplifiedServicePage = `import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, MapPin } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FAQItem from '../components/FAQItem';
import API_BASE_URL from '../config/api';

const ServicePage = () => {
  const { slug } = useParams();
  const