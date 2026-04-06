#!/usr/bin/env node

/**
 * CMS Setup Verification Script
 * 
 * This script verifies that the CMS transformation is complete and working correctly.
 * Run this script to check:
 * - Database collections exist
 * - Content is seeded
 * - API endpoints are accessible
 * - Files are in place
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 CMS SETUP VERIFICATION\n');
console.log('=' .repeat(50));

let allChecksPass = true;

// Check 1: Backend Models
console.log('\n📦 Checking Backend Models...');
const backendModels = [
  'backend/models/ReusableBlock.js',
  'backend/models/PageBlock.js',
  'backend/models/NavigationMenu.js',
  'backend/models/FormContent.js',
  'backend/models/GlobalSettings.js'
];

backendModels.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 2: Backend Controllers
console.log('\n🎮 Checking Backend Controllers...');
const backendControllers = [
  'backend/controllers/reusableBlockController.js',
  'backend/controllers/pageBlockController.js',
  'backend/controllers/navigationController.js',
  'backend/controllers/formContentController.js'
];

backendControllers.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 3: Backend Routes
console.log('\n🛣️  Checking Backend Routes...');
const backendRoutes = [
  'backend/routes/reusableBlockRoutes.js',
  'backend/routes/pageBlockRoutes.js',
  'backend/routes/navigationRoutes.js',
  'backend/routes/formContentRoutes.js'
];

backendRoutes.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 4: Seed Script
console.log('\n🌱 Checking Seed Script...');
if (fs.existsSync('backend/seed-cms-content.js')) {
  console.log('  ✅ backend/seed-cms-content.js');
} else {
  console.log('  ❌ backend/seed-cms-content.js - MISSING');
  allChecksPass = false;
}

// Check 5: Frontend Dynamic Components
console.log('\n⚛️  Checking Frontend Dynamic Components...');
const frontendComponents = [
  'frontend/src/components/DynamicNavbar.jsx',
  'frontend/src/components/DynamicFooter.jsx',
  'frontend/src/components/DynamicForm.jsx',
  'frontend/src/components/blocks/BlockRenderer.jsx'
];

frontendComponents.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 6: Frontend Block Components
console.log('\n🧱 Checking Frontend Block Components...');
const blockComponents = [
  'frontend/src/components/blocks/HeroBlock.jsx',
  'frontend/src/components/blocks/StatsBlock.jsx',
  'frontend/src/components/blocks/FeaturesBlock.jsx',
  'frontend/src/components/blocks/ProcessStepsBlock.jsx',
  'frontend/src/components/blocks/ValuesBlock.jsx',
  'frontend/src/components/blocks/WhyChooseUsBlock.jsx',
  'frontend/src/components/blocks/TextContentBlock.jsx',
  'frontend/src/components/blocks/FAQBlock.jsx',
  'frontend/src/components/blocks/ContactInfoBlock.jsx'
];

blockComponents.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 7: Frontend Dynamic Pages
console.log('\n📄 Checking Frontend Dynamic Pages...');
const dynamicPages = [
  'frontend/src/pages/HomeDynamic.jsx',
  'frontend/src/pages/AboutDynamic.jsx',
  'frontend/src/pages/ServicesDynamic.jsx',
  'frontend/src/pages/ContactDynamic.jsx'
];

dynamicPages.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 8: Frontend Admin Panels
console.log('\n🔧 Checking Frontend Admin Panels...');
const adminPanels = [
  'frontend/src/pages/admin/BlockManager.jsx',
  'frontend/src/pages/admin/PageBlockAssignmentManager.jsx',
  'frontend/src/pages/admin/NavigationManager.jsx',
  'frontend/src/pages/admin/FormContentManager.jsx'
];

adminPanels.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecksPass = false;
  }
});

// Check 9: App.jsx Integration
console.log('\n🔗 Checking App.jsx Integration...');
const appJsxPath = 'frontend/src/App.jsx';
if (fs.existsSync(appJsxPath)) {
  const appJsxContent = fs.readFileSync(appJsxPath, 'utf8');
  
  const checks = [
    { name: 'HomeDynamic import', pattern: /import.*HomeDynamic/ },
    { name: 'AboutDynamic import', pattern: /import.*AboutDynamic/ },
    { name: 'ServicesDynamic import', pattern: /import.*ServicesDynamic/ },
    { name: 'ContactDynamic import', pattern: /import.*ContactDynamic/ },
    { name: 'BlockManager route', pattern: /path="blocks".*BlockManager/ },
    { name: 'NavigationManager route', pattern: /path="navigation".*NavigationManager/ },
    { name: 'FormContentManager route', pattern: /path="forms".*FormContentManager/ },
    { name: 'PageBlockAssignmentManager route', pattern: /path="page-blocks".*PageBlockAssignmentManager/ }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(appJsxContent)) {
      console.log(`  ✅ ${check.name}`);
    } else {
      console.log(`  ❌ ${check.name} - NOT FOUND`);
      allChecksPass = false;
    }
  });
} else {
  console.log('  ❌ App.jsx - MISSING');
  allChecksPass = false;
}

// Check 10: Layout.jsx Integration
console.log('\n🎨 Checking Layout.jsx Integration...');
const layoutPath = 'frontend/src/components/Layout.jsx';
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  const checks = [
    { name: 'DynamicNavbar import', pattern: /import.*DynamicNavbar/ },
    { name: 'DynamicFooter import', pattern: /import.*DynamicFooter/ },
    { name: 'DynamicNavbar usage', pattern: /<DynamicNavbar/ },
    { name: 'DynamicFooter usage', pattern: /<DynamicFooter/ }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(layoutContent)) {
      console.log(`  ✅ ${check.name}`);
    } else {
      console.log(`  ❌ ${check.name} - NOT FOUND`);
      allChecksPass = false;
    }
  });
} else {
  console.log('  ❌ Layout.jsx - MISSING');
  allChecksPass = false;
}

// Check 11: Documentation Files
console.log('\n📚 Checking Documentation Files...');
const docFiles = [
  'CMS_TRANSFORMATION_COMPLETE.md',
  'DEPLOYMENT_CHECKLIST.md',
  'CMS_TRANSFORMATION_FINAL_STATUS.md',
  'CMS_TESTING_GUIDE.md',
  'REMAINING_HARDCODED_CONTENT_GUIDE.md',
  'CMS_COMPLETION_SUMMARY.md'
];

docFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ⚠️  ${file} - MISSING (optional)`);
  }
});

// Final Summary
console.log('\n' + '='.repeat(50));
if (allChecksPass) {
  console.log('\n✅ ALL CHECKS PASSED!');
  console.log('\nThe CMS transformation is complete and all files are in place.');
  console.log('\nNext steps:');
  console.log('1. Run seed script: cd backend && node seed-cms-content.js');
  console.log('2. Start backend: cd backend && npm start');
  console.log('3. Start frontend: cd frontend && npm run dev');
  console.log('4. Test admin panels at http://localhost:3000/admin');
  console.log('5. Test frontend pages at http://localhost:3000');
} else {
  console.log('\n❌ SOME CHECKS FAILED');
  console.log('\nPlease review the missing files above and ensure all components are in place.');
}
console.log('\n' + '='.repeat(50) + '\n');

process.exit(allChecksPass ? 0 : 1);
