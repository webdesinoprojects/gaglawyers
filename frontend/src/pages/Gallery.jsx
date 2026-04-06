import React, { useEffect, useState } from 'react';
import { X, ZoomIn, Camera, Users, Award, BookOpen, Heart, TrendingUp, Scale } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

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
      const response = await fetch(`${API_BASE_URL}/api/gallery`);
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
      title: 'Supreme Court Representation',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
      category: 'courtroom',
    },
    {
      title: 'High Court Proceedings',
      imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=600&fit=crop',
      category: 'courtroom',
    },
    {
      title: 'Client Consultation',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
      category: 'client',
    },
    {
      title: 'Advisory Session',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      category: 'client',
    },
    {
      title: 'Legal Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      category: 'events',
    },
    {
      title: 'Professional Seminar',
      imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
      category: 'events',
    },
    {
      title: 'Excellence Award Ceremony',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      category: 'milestones',
    },
    {
      title: 'Firm Anniversary Celebration',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=800&h=600&fit=crop',
      category: 'milestones',
    },
    {
      title: 'Pro Bono Legal Aid Camp',
      imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
      category: 'community',
    },
    {
      title: 'CSR Initiative',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      category: 'community',
    },
  ];

  const displayImages = images.length > 0 ? images : mockImages;

  const categories = [
    { id: 'all', name: 'All', icon: Camera },
    { id: 'courtroom', name: 'Courtroom Advocacy', icon: Scale },
    { id: 'client', name: 'Client Engagements', icon: Users },
    { id: 'events', name: 'Events & Conferences', icon: BookOpen },
    { id: 'milestones', name: 'Firm Milestones', icon: Award },
    { id: 'community', name: 'Community & Outreach', icon: Heart },
  ];

  const filteredImages = activeCategory === 'all'
    ? displayImages
    : displayImages.filter(img => img.category === activeCategory);

  const highlights = [
    {
      icon: Scale,
      title: 'Courtroom Advocacy',
      description: 'Captures our representation in High Courts, District Courts, and Tribunals, showcasing the professionalism and dedication that define our litigation team.',
    },
    {
      icon: Users,
      title: 'Client Engagements',
      description: 'Photographs of advisory sessions, consultations, and collaborative meetings illustrate our client-first approach and personal attention to each case.',
    },
    {
      icon: BookOpen,
      title: 'Events & Conferences',
      description: 'Images from legal workshops, seminars, and knowledge-sharing sessions reflect our commitment to continuous learning and professional development.',
    },
    {
      icon: Award,
      title: 'Firm Milestones',
      description: 'Celebrating awards, achievements, and growth moments highlights the collective effort of our team under Advocate Rahul Grover\'s leadership.',
    },
    {
      icon: Heart,
      title: 'Community & Outreach',
      description: 'Documenting pro bono work, CSR initiatives, and social engagement emphasizes our belief in justice and giving back to society.',
    },
  ];

  return (
    <div>
      <SEOHead 
        title="Image Gallery | GAG Lawyers - Grover & Grover Advocates"
        description="Visual journey into the life of GAG Lawyers - courtroom advocacy, client engagements, events, milestones, and community outreach."
        keywords="law firm gallery, courtroom photos, legal events, firm milestones, community outreach"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-navy/90 text-white pt-8 pb-20 md:pt-10 lg:pt-12 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block mb-4">
              <span className="font-sans text-sm font-semibold text-gold uppercase tracking-wider bg-gold/10 px-6 py-2 rounded-full border border-gold/20">
                Visual Journey
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Image
              <br />
              <span className="text-gold">Gallery</span>
            </h1>
            <p className="font-sans text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A visual journey into the life of the firm, highlighting milestones, achievements, and the people who make it all possible.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Camera className="w-12 h-12 text-gold" />
              <TrendingUp className="w-12 h-12 text-navy" />
              <Award className="w-12 h-12 text-gold" />
            </div>
            <p className="font-sans text-xl text-gray-700 leading-relaxed">
              The Image Gallery at GAG Lawyers – Grover & Grover Advocates offers a visual journey into the life of the firm. It is a reflection of our <span className="font-semibold text-navy">values, dedication, and commitment</span> to clients across India and globally.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Highlights from Our Gallery
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    {highlight.title}
                  </h3>
                  <p className="font-sans text-gray-600 leading-relaxed text-sm">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-navy to-navy/90 text-white shadow-lg scale-105'
                      : 'bg-grey-light text-gray-700 hover:bg-navy/10 hover:scale-105'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Image Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="font-sans text-gray-600">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="font-sans font-semibold text-lg">{image.title}</p>
                      <p className="font-sans text-sm text-gray-300 capitalize">{image.category}</p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-16 bg-grey-light rounded-2xl">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="font-sans text-gray-600 text-lg">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Moving Forward */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M5QTg2QSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-gold/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-gold/30">
              <TrendingUp className="w-10 h-10 text-gold" />
            </div>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
            Moving Forward
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto rounded-full mb-8"></div>
          <div className="space-y-6 font-sans text-xl text-gray-200 leading-relaxed">
            <p>
              As GAG Lawyers continues to grow, our gallery will evolve to showcase more milestones, achievements, and stories of client success.
            </p>
            <p className="text-2xl font-medium text-white">
              Each photograph reflects our dedication, teamwork, and the human touch that makes our firm a trusted legal partner.
            </p>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
          >
            <X size={24} />
          </button>
          <div className="max-w-6xl max-h-[90vh] w-full">
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-2xl"
            />
            <div className="text-center mt-6">
              <p className="text-white font-sans text-xl font-semibold mb-2">
                {selectedImage.title}
              </p>
              <p className="text-gray-400 font-sans text-sm capitalize">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
