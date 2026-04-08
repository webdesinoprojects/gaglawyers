import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import LogoBanner from '../components/LogoBanner';

const LogoGenerator = () => {
  const [variant, setVariant] = useState('horizontal');
  const svgRef = useRef(null);

  const downloadSVG = () => {
    const svgElement = svgRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gag-lawyers-logo-${variant}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = async () => {
    const svgElement = svgRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width * 2; // 2x for retina
      canvas.height = img.height * 2;
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `gag-lawyers-logo-${variant}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
      });
    };

    img.src = url;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-navy mb-3">
            Logo Generator
          </h1>
          <p className="font-sans text-gray-600">
            Generate and download your GAG Lawyers logo in different formats
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="font-sans text-lg font-semibold text-navy mb-4">
            Logo Style
          </h2>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setVariant('horizontal')}
              className={`px-6 py-3 rounded-lg font-sans font-medium transition-all ${
                variant === 'horizontal'
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Horizontal (Full)
            </button>
            <button
              onClick={() => setVariant('compact')}
              className={`px-6 py-3 rounded-lg font-sans font-medium transition-all ${
                variant === 'compact'
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Compact
            </button>
          </div>

          <h2 className="font-sans text-lg font-semibold text-navy mb-4">
            Download
          </h2>
          <div className="flex gap-4">
            <button
              onClick={downloadSVG}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-navy rounded-lg font-sans font-semibold hover:brightness-110 transition-all"
            >
              <Download size={18} />
              Download SVG
            </button>
            <button
              onClick={downloadPNG}
              className="flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-lg font-sans font-semibold hover:bg-navy/90 transition-all"
            >
              <Download size={18} />
              Download PNG
            </button>
          </div>
        </div>

        {/* Logo Preview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="font-sans text-lg font-semibold text-navy mb-6 text-center">
            Preview
          </h2>
          <div
            ref={svgRef}
            className="flex items-center justify-center p-8 bg-gray-50 rounded-lg"
          >
            <LogoBanner variant={variant} />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-sans text-base font-semibold text-navy mb-3">
            How to Use:
          </h3>
          <ol className="font-sans text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Select your preferred logo style (Rectangle, Square, or Circle)</li>
            <li>Click "Download SVG" for vector format (scalable, best for web)</li>
            <li>Click "Download PNG" for raster format (high resolution, 2x retina)</li>
            <li>Replace the existing logo.png in the public folder with your downloaded file</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LogoGenerator;
