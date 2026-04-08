import React from 'react';

/**
 * LogoBanner Component
 * 
 * A horizontal logo banner with monogram on left and main branding on right
 * Dark navy background with white serif typography
 * 
 * Props:
 * - width: Width in pixels (default: 800)
 * - height: Height in pixels (default: 200)
 * - variant: 'horizontal' | 'compact' (default: 'horizontal')
 */
const LogoBanner = ({ width = 1000, height = 200, variant = 'horizontal' }) => {
  const isCompact = variant === 'compact';
  
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Background */}
      <rect
        width={width}
        height={height}
        fill="#1a2a42"
        rx="0"
      />

      {/* Left Section - Monogram Block */}
      <g>
        {/* G&G Monogram */}
        <text
          x="100"
          y="75"
          fontFamily="Georgia, Times New Roman, serif"
          fontSize="48"
          fontWeight="bold"
          fill="#ffffff"
          textAnchor="middle"
          letterSpacing="2"
        >
          G&G
        </text>

        {/* Grover & Grover (small) */}
        <text
          x="100"
          y="115"
          fontFamily="Georgia, Times New Roman, serif"
          fontSize="14"
          fontWeight="normal"
          fill="#ffffff"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          Grover & Grover
        </text>

        {/* Advocates and Solicitors (tiny) */}
        <text
          x="100"
          y="135"
          fontFamily="Georgia, Times New Roman, serif"
          fontSize="11"
          fontWeight="normal"
          fill="#9ca3af"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          Advocates and Solicitors
        </text>
      </g>

      {/* Vertical Divider Line */}
      <line
        x1="215"
        y1="40"
        x2="215"
        y2="160"
        stroke="#ffffff"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Right Section - Main Branding */}
      <g>
        {/* Grover & Grover (large) */}
        <text
          x="500"
          y="95"
          fontFamily="Georgia, Times New Roman, serif"
          fontSize="56"
          fontWeight="bold"
          fill="#ffffff"
          textAnchor="middle"
          letterSpacing="4"
        >
          Grover & Grover
        </text>

        {/* Advocates and Solicitors (medium) */}
        <text
          x="500"
          y="130"
          fontFamily="Georgia, Times New Roman, serif"
          fontSize="22"
          fontWeight="normal"
          fill="#9ca3af"
          textAnchor="middle"
          letterSpacing="2"
        >
          Advocates and Solicitors
        </text>
      </g>
    </svg>
  );
};

export default LogoBanner;

/**
 * Usage Examples:
 * 
 * // Horizontal logo (default)
 * <LogoBanner />
 * 
 * // Custom size
 * <LogoBanner width={1000} height={250} />
 * 
 * // Compact version
 * <LogoBanner variant="compact" width={600} height={150} />
 */
