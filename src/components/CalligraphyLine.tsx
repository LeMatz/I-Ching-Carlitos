import React from 'react';

interface CalligraphyLineProps {
  isYang: boolean;
  isMutating?: boolean;
  position?: number;
  className?: string;
}

// Master calligraphy brush paths modeled after classical Chinese ink brush strokes (楷书/行书)
// Multiple variations per stroke position so each of the 6 lines has hand-painted character
const YANG_BRUSH_PATHS = [
  // Variation 0: Firm, centered brush stroke with balanced terminals
  'M 5,9 C 2.5,6 7.5,3.2 17,3.5 C 44,3.2 82,3.9 105,3.5 C 138,3.2 172,2.8 187,3.2 C 196.5,3.6 199,6.2 198,9.2 C 196.8,12.2 192.5,14 183.5,13.6 C 158,13.8 121,13.3 95,13.7 C 62,14 26,14.3 12.5,13.8 C 5.5,13.5 3,11.8 5,9 Z',
  // Variation 1: Spirited brush stroke with sweeping momentum
  'M 4,8.5 C 2,5.5 8.5,2.8 19.5,3.2 C 48,3.7 86,3.1 110,3.7 C 144,3.3 170,2.9 186.5,3.5 C 197,4.1 199,7.5 197,10.2 C 195,12.8 188.5,14.2 180.5,13.7 C 151,13.3 116,13.8 89,13.4 C 56,13.7 23,14.4 10.5,13.5 C 4.5,12.8 2.8,11 4,8.5 Z',
  // Variation 2: Grounded, anchored stroke with deliberate ink pressure
  'M 5.8,9.4 C 3,7 7,3.6 16.5,3.6 C 42,3.4 78,3.9 102,3.4 C 138,3 167.5,3.4 185.5,3.1 C 195,3.3 198.5,6.5 197,9.5 C 195.8,12.2 191,13.9 182.5,13.8 C 155,13.5 122,14 92,13.5 C 62,13.8 28,14.1 14,13.7 C 7,13.4 3.8,12 5.8,9.4 Z',
];

// Broken Yin lines: Left and Right brush strokes separated by an expressive central void
const YIN_LEFT_PATHS = [
  // Variation 0
  'M 5,9 C 2.5,6 8,3.2 18,3.5 C 38,3.2 60,3.8 77.5,3.4 C 85.5,3.2 91,5.5 90,8.5 C 89,11.5 84.5,13.8 75.5,13.5 C 58,13.8 35,13.4 16,13.7 C 8,13.5 3,11.8 5,9 Z',
  // Variation 1
  'M 4,8.5 C 2,5.8 8.5,3 19,3.3 C 39.5,3.6 62,3.2 78.5,3.6 C 86.5,3.8 91.5,6.5 89.5,9.5 C 87.5,12.5 83.5,13.9 74.5,13.6 C 56,13.3 32,13.8 15,13.5 C 6,13.2 2.8,11 4,8.5 Z',
  // Variation 2
  'M 5.5,9.2 C 2.8,6.5 7.5,3.5 17,3.6 C 37,3.3 59,3.9 76.5,3.5 C 85,3.3 90.5,5.8 89.5,8.8 C 88.5,11.8 84,13.7 75,13.5 C 57,13.7 34,13.5 15.5,13.8 C 7.5,13.5 3.5,11.8 5.5,9.2 Z',
];

const YIN_RIGHT_PATHS = [
  // Variation 0
  'M 111,8.5 C 109,5.5 115,3.4 124,3.5 C 145,3.2 170,2.9 184,3.3 C 194,3.7 198,6.5 197,9.5 C 196,12.2 191,13.9 182,13.6 C 165,13.8 140,13.3 122,13.7 C 114,13.5 110,11.5 111,8.5 Z',
  // Variation 1
  'M 112,9 C 110,6.2 116,3.6 125,3.7 C 147.5,3.4 172,3.1 185,3.5 C 195,4 198,7 197,10 C 195,12.8 188.5,14.1 180,13.7 C 162,13.4 138,13.8 123,13.5 C 115,13.2 111,11.5 112,9 Z',
  // Variation 2
  'M 111.5,8.8 C 109.5,5.8 115.5,3.2 124.5,3.4 C 146,3.1 171,3 184.5,3.4 C 194.5,3.8 198,6.8 197,9.7 C 195.8,12.5 190,14 181.5,13.6 C 164,13.7 139,13.4 122.5,13.8 C 114.5,13.5 110.5,11.5 111.5,8.8 Z',
];

export const CalligraphyLine: React.FC<CalligraphyLineProps> = ({
  isYang,
  isMutating = false,
  position = 1,
  className = '',
}) => {
  // Deterministic variation based on line position (1-6)
  const variantIndex = (position - 1) % 3;
  const yangPath = YANG_BRUSH_PATHS[variantIndex];
  const yinLeftPath = YIN_LEFT_PATHS[variantIndex];
  const yinRightPath = YIN_RIGHT_PATHS[variantIndex];

  // Gradients and drop-shadows for ink brush aesthetic
  // Mutating: Radiant cinnabar vermilion ink (朱砂 Zhūshā) with intense glowing warmth
  // Stable: Silk-smooth pearl bone ink (墨银 Mò Yín) with subtle calligraphic wash
  const fillGradientId = isMutating
    ? `brush-mutating-grad-${position}`
    : `brush-stable-grad-${position}`;

  return (
    <div className={`w-full h-full flex items-center justify-center relative ${className}`}>
      <svg
        viewBox="0 0 202 17"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible drop-shadow-xs"
        aria-hidden="true"
      >
        <defs>
          {/* Cinnabar Vermilion Ink Gradient for Mutating Lines */}
          <linearGradient id={`brush-mutating-grad-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7A3D" />
            <stop offset="25%" stopColor="#FF5722" />
            <stop offset="70%" stopColor="#FF6B2B" />
            <stop offset="100%" stopColor="#FA4A14" />
          </linearGradient>

          {/* Classical Pearl Ink Wash for Stable Lines */}
          <linearGradient id={`brush-stable-grad-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EDE9E3" />
            <stop offset="30%" stopColor="#F5F3EF" />
            <stop offset="75%" stopColor="#E4E2DC" />
            <stop offset="100%" stopColor="#D8D4CC" />
          </linearGradient>
        </defs>

        {isYang ? (
          // Solid Yang brush stroke
          <g>
            {/* Subtle brush bristle aura */}
            <path
              d={yangPath}
              fill={`url(#${fillGradientId})`}
              className={`transition-all duration-300 ${
                isMutating
                  ? 'filter drop-shadow-[0_0_8px_rgba(255,107,43,0.55)]'
                  : 'filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
              }`}
            />
            {/* Subtle inner core highlight line for calligraphic brush ridge */}
            <path
              d={
                variantIndex === 0
                  ? 'M 20,8.5 Q 105,8.2 180,8.4'
                  : variantIndex === 1
                  ? 'M 22,8.2 Q 110,8.6 178,8.3'
                  : 'M 20,8.6 Q 102,8.1 179,8.5'
              }
              fill="none"
              stroke={isMutating ? '#FFB184' : '#FFFFFF'}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
          </g>
        ) : (
          // Broken Yin brush stroke (left & right segments)
          <g>
            {/* Left Segment */}
            <path
              d={yinLeftPath}
              fill={`url(#${fillGradientId})`}
              className={`transition-all duration-300 ${
                isMutating
                  ? 'filter drop-shadow-[0_0_8px_rgba(255,107,43,0.55)]'
                  : 'filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
              }`}
            />
            <path
              d="M 18,8.5 Q 50,8.2 74,8.4"
              fill="none"
              stroke={isMutating ? '#FFB184' : '#FFFFFF'}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />

            {/* Right Segment */}
            <path
              d={yinRightPath}
              fill={`url(#${fillGradientId})`}
              className={`transition-all duration-300 ${
                isMutating
                  ? 'filter drop-shadow-[0_0_8px_rgba(255,107,43,0.55)]'
                  : 'filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
              }`}
            />
            <path
              d="M 126,8.5 Q 155,8.2 180,8.4"
              fill="none"
              stroke={isMutating ? '#FFB184' : '#FFFFFF'}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
