import React from 'react';
import { motion } from 'motion/react';
import { HexagramLine } from '../types';

interface HexagramDrawingProps {
  lines: HexagramLine[]; // Ordered 1 to 6 (bottom to top)
  highlightLinePosition?: number | null;
  onSelectLine?: (position: number) => void;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isDerived?: boolean;
}

export const HexagramDrawing: React.FC<HexagramDrawingProps> = ({
  lines,
  highlightLinePosition = null,
  onSelectLine,
  showLabels = true,
  size = 'md',
  isDerived = false,
}) => {
  // Sort lines from top (pos 6) to bottom (pos 1) for visual top-down CSS rendering
  const displayLines = [...lines].sort((a, b) => b.position - a.position);

  const containerWidths = {
    sm: 'w-44 max-w-full',
    md: 'w-64 max-w-full sm:w-72',
    lg: 'w-full max-w-[280px] xs:max-w-xs sm:max-w-sm',
  };

  const lineHeights = {
    sm: 'h-3.5 my-1',
    md: 'h-4.5 my-1.5',
    lg: 'h-5.5 my-2',
  };

  return (
    <div
      className={`flex flex-col items-center select-none ${containerWidths[size]}`}
      role="img"
      aria-label={`Dibujo del hexagrama formado por 6 líneas ${isDerived ? 'derivado' : 'primario'}`}
    >
      <div className="w-full bg-[#121216] border border-[#272733] shadow-lg rounded-lg p-4 sm:p-5 relative">
        {/* Subtle decorative gold seal corners (Tertiary Accent) */}
        <div className="absolute top-1.5 left-2 text-[11px] text-[#F59E0B]/40 font-serif">☰</div>
        <div className="absolute top-1.5 right-2 text-[11px] text-[#F59E0B]/40 font-serif">☷</div>
        <div className="absolute bottom-1.5 left-2 text-[11px] text-[#F59E0B]/40 font-serif">☯</div>
        <div className="absolute bottom-1.5 right-2 text-[11px] text-[#F59E0B]/40 font-serif">卦</div>

        <div className="flex flex-col w-full">
          {displayLines.map((line) => {
            const isSelected = highlightLinePosition === line.position;
            const isSolid = line.isYang;
            const isMutating = !isDerived && line.isMutating;

            // Visual bar color: Orange for mutating lines, crisp light pearl for stable lines
            const strokeColor = isMutating
              ? 'bg-[#FF6B2B] shadow-[0_0_8px_rgba(255,107,43,0.35)]'
              : 'bg-[#E4E4E7] shadow-xs';

            return (
              <motion.div
                key={line.position}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (6 - line.position) * 0.05 }}
                onClick={() => onSelectLine && onSelectLine(line.position)}
                className={`group flex items-center justify-between gap-3 ${lineHeights[size]} ${
                  onSelectLine ? 'cursor-pointer' : ''
                } ${
                  isSelected
                    ? 'ring-2 ring-[#FF6B2B] ring-offset-2 ring-offset-[#121216] rounded-md px-1.5 bg-[#1C1C24]'
                    : 'px-1 hover:bg-[#1A1A22] rounded-md'
                } transition-all`}
                title={`Línea ${line.position}: ${
                  line.value === 6
                    ? 'Viejo Yin (6, mutante)'
                    : line.value === 7
                    ? 'Joven Yang (7)'
                    : line.value === 8
                    ? 'Joven Yin (8)'
                    : 'Viejo Yang (9, mutante)'
                }`}
              >
                {/* Left position indicator */}
                {showLabels && (
                  <span
                    className={`text-[11px] font-mono w-5 text-right font-semibold ${
                      isSelected ? 'text-[#FF6B2B]' : 'text-[#71717A]'
                    }`}
                  >
                    {line.position}
                  </span>
                )}

                {/* Hexagram Line Bar */}
                <div className="relative flex-1 flex items-center h-full">
                  {isSolid ? (
                    // Solid Yang Line (continuous)
                    <div
                      className={`w-full h-full rounded-[2px] ${strokeColor} relative flex items-center justify-center transition-colors`}
                    >
                      {/* Old Yang mark: Tertiary Amber Gold Circle */}
                      {isMutating && (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-[#121216] bg-[#F59E0B] shadow-xs flex items-center justify-center text-[9px] font-bold text-[#0A0A0D] leading-none">
                          ○
                        </span>
                      )}
                    </div>
                  ) : (
                    // Broken Yin Line (divided into two segments)
                    <div className="w-full h-full flex items-center justify-between relative">
                      <div
                        className={`w-[44%] h-full rounded-[2px] ${strokeColor} transition-colors`}
                      />
                      {/* Gap with marker if mutating */}
                      <div className="w-[12%] flex items-center justify-center">
                        {isMutating && (
                          <span className="text-[#F59E0B] font-black text-xs sm:text-sm font-sans leading-none drop-shadow-xs">
                            ✕
                          </span>
                        )}
                      </div>
                      <div
                        className={`w-[44%] h-full rounded-[2px] ${strokeColor} transition-colors`}
                      />
                    </div>
                  )}
                </div>

                {/* Right sum indicator */}
                {showLabels && (
                  <div className="w-8 flex items-center justify-end gap-1 text-[11px] font-mono">
                    <span
                      className={`font-semibold ${
                        isMutating ? 'text-[#FF6B2B]' : 'text-[#A1A1AA]'
                      }`}
                    >
                      {line.value}
                    </span>
                    {isMutating && (
                      <span className="text-[11px] text-[#F59E0B]" title="Línea mutante">
                        ★
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Trigram Division Labels */}
        {showLabels && (
          <div className="mt-3 pt-2.5 border-t border-[#252533] flex items-center justify-between text-[11px] text-[#8E8E9F] font-sans">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]" />
              Trigrama Superior (4-6)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              Trigrama Inferior (1-3)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
