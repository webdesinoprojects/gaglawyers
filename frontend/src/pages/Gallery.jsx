import React, { useEffect, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/gallery');
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockImages = [
    {
      title: 'Office Reception',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      category: 'office',
    },
    {
      title: 'Conference Room',
      imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
      category: 'office',
    },
    {
      title: 'Law Library',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop',
      category: 'office',
    },
    {
      title: 'Team Meeting',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      category: 'events',
    },
    {
      title: 'Award Ceremony',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      category: 'events',
    },
    {
      title: 'Client Consultation',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
      category: 'work',
    },
  ];

  const displayImages = images.length > 0 ? images : mockImages;

  const categories = ['all', 'office', 'events', 'work'];

  const filteredImages = activeCategory === 'all'
    ? displayImages
    : displayImages.filter(img => img.category === activeCategory);

  return (
    <div>
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Gallery
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            A glimpse into our workspace, events, and moments
          </p>
        </div>
      </section>

      <section className="bg-grey-light py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-sm font-sans text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-navy text-white'
                    : 'bg-white text-gray-700 hover:bg-navy/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-video bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-sans font-medium">{image.title}</p>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gold transition-colors"
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl max-h-[90vh]">
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
            />
            <p className="text-white text-center font-sans mt-4 text-lg">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
