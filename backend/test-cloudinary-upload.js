require('dotenv').config();
const cloudinary = require('./config/cloudinary');

const testCloudinaryUpload = async () => {
  try {
    console.log('\n🧪 Testing Cloudinary Upload...\n');
    console.log('Cloudinary Config:');
    console.log(`  Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`  API Key: ${process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing'}`);
    console.log(`  API Secret: ${process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing'}`);
    
    // Test upload with a sample URL
    console.log('\n📤 Uploading test image from URL...');
    
    const result = await cloudinary.uploader.upload(
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
      {
        folder: 'gaglawyers',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      }
    );
    
    console.log('\n✅ Upload Successful!');
    console.log('\nResult:');
    console.log(`  URL: ${result.secure_url}`);
    console.log(`  Public ID: ${result.public_id}`);
    console.log(`  Format: ${result.format}`);
    console.log(`  Width: ${result.width}px`);
    console.log(`  Height: ${result.height}px`);
    console.log(`  Size: ${(result.bytes / 1024).toFixed(2)} KB`);
    
    // Test deletion
    console.log('\n🗑️  Testing deletion...');
    await cloudinary.uploader.destroy(result.public_id);
    console.log('✅ Deletion Successful!');
    
    console.log('\n✅ Cloudinary is working correctly!');
    console.log('\nYou can now upload images through the admin panel.');
    console.log('They will be stored in Cloudinary with proper publicIds.');
    
  } catch (error) {
    console.error('\n❌ Cloudinary Test Failed:');
    console.error(error.message);
    
    if (error.message.includes('Invalid API Key')) {
      console.log('\n💡 Fix: Check your Cloudinary credentials in .env file');
    } else if (error.message.includes('Must supply api_key')) {
      console.log('\n💡 Fix: Add CLOUDINARY_API_KEY to .env file');
    }
  }
};

testCloudinaryUpload();
