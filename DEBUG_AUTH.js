/**
 * BROWSER CONSOLE DEBUG SCRIPT
 * Copy and paste this entire code into your browser console to debug auth issues
 */

console.log('🔍 GAG Lawyers - Admin Auth Debug\n');

// Check localStorage
const token = localStorage.getItem('adminToken');
const user = localStorage.getItem('adminUser');

console.log('📦 LocalStorage Check:');
console.log('  Token exists:', !!token);
console.log('  Token length:', token?.length || 0);
console.log('  Token preview:', token ? token.substring(0, 50) + '...' : 'NONE');
console.log('  User exists:', !!user);

if (user) {
  try {
    const userData = JSON.parse(user);
    console.log('  User data:', {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      isActive: userData.isActive
    });
  } catch (e) {
    console.log('  Error parsing user data:', e.message);
  }
}

// Check API connectivity
console.log('\n🌐 API Connectivity Check:');
(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('  API Status:', response.status);
    console.log('  Response OK:', response.ok);
    const data = await response.json();
    console.log('  API Response:', data);
  } catch (error) {
    console.log('  API Error:', error.message);
  }
})();

console.log('\n✅ Debug info logged above ☝️');
