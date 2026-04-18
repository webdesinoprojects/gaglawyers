/**
 * Batch Content Importer
 * 
 * Processes all HTML files in temp-html directory
 * 
 * Usage: node scripts/batchImporter.js
 */

require('dotenv').config();
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const SITE_URL = 'https://www.gaglawyers.com';
const TEMP_HTML_DIR = path.join(__dirname, 'temp-html');

// Utility functions
const cleanText = (text) => {
  if (!text) return '';
  retur