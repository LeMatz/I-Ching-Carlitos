import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HexagramLine } from '../types';
import { LINE_STRUCTURES } from '../data/lineStructures';
import { CalligraphyLine } from './CalligraphyLine';

interface HexagramDrawingProps {
  lines: HexagramLine[]; // Ordered 1 to 6 (bottom to top)
  highlightLinePosition?: number | null;
  onSelectLine?: (position: number) => void;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isDerived?: boolean;
  hexagramNumber?: number;
  hexagramName?: string;
  lineMeanings?: string[];
  mutatingLinePositions?: number[];
}

export const HexagramDrawing: React.FC<HexagramDrawingProps> = ({
  lines,
  highlightLinePosition = null,
  onSelectLine,
  showLabels = true,
  size = 'md',
  isDerived = false,
  hexagramNumber,
  hexagramName,
  lineMeanings,
  mutatingLinePositions = [],
}) => {
  // Sort lines from top (pos 6) to bottom (pos 1) for visual top-down CSS rendering
  const displayLines = [...lines].sort((a, b) => b.position - a.position);

  // Floating modal state for line details
  const [modalLinePos, setModalLinePos] = useState<number | null>(null);

  // Close modal with ESC key
  useEffect(() => {
    if (!modalLinePos) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalLinePos(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalLinePos]);

  const containerWidths = {
    sm: 'w-56 max-w-full',
    md: 'w-full max-w-[320px] sm:max-w-[340px]',
    lg: 'w-full max-w-[340px] sm:max-w-sm',
  };

  const lineHeights = {
    sm: 'h-4 my-1.5',
    md: 'h-5 my-2',
    lg: 'h-6 my-2.5',
  };

  const handleLineClick = (position: number) => {
    if (onSelectLine) {
      onSelectLine(position);
    }
    // Open floating window if we have meanings or lines to display
    if (lineMeanings && lineMeanings.length > 0) {
      setModalLinePos(position);
    }
  };

  const activeModalLine = modalLinePos ? lines.find((l) => l.position === modalLinePos) : null;
  const activeStructure = modalLinePos ? LINE_STRUCTURES[modalLinePos] : null;
  const activeMeaning =
    modalLinePos && lineMeanings && lineMeanings[modalLinePos - 1]
      ? lineMeanings[modalLinePos - 1]
      : null;
  const isCurrentMutating =
    modalLinePos !== null &&
    !isDerived &&
    (mutatingLinePositions.includes(modalLinePos) || activeModalLine?.isMutating);

  return (
    <div
      className={`flex flex-col items-center select-none ${containerWidths[size]}`}
      role="img"
      aria-label={`Dibujo del hexagrama formado por 6 líneas ${isDerived ? 'derivado' : 'primario'}`}
    >
      <div className="w-full bg-[#121216] border border-[#272733] shadow-lg rounded-lg px-5 pt-8 pb-8 sm:px-6 sm:pt-9 sm:pb-9 relative">
        {/* Subtle decorative gold seal corners (Tertiary Accent) */}
        <div className="absolute top-2.5 left-3 text-[11px] text-[#F59E0B]/40 font-serif select-none pointer-events-none">☰</div>
        <div className="absolute top-2.5 right-3 text-[11px] text-[#F59E0B]/40 font-serif select-none pointer-events-none">☷</div>
        <div className="absolute bottom-2.5 left-3 text-[11px] text-[#F59E0B]/40 font-serif select-none pointer-events-none">☯</div>
        <div className="absolute bottom-2.5 right-3 text-[11px] text-[#F59E0B]/40 font-serif select-none pointer-events-none">卦</div>

        {/* Clear Column Headers: Distinguishing # de Tirada from Suma de Monedas */}
        {showLabels && (
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8E8E9F] pb-2 mb-2.5 border-b border-[#222230]">
            <span
              className="text-left font-bold text-[#F59E0B] flex items-center gap-1"
              title="Número de tirada (del 1 al 6, leídas de la base a la cima)"
            >
              Tirada
            </span>
            <span className="text-[10px] font-sans text-[#68687D] tracking-wider uppercase">
              Trazo
            </span>
            <span
              className="text-right font-bold text-[#F59E0B] flex items-center justify-end gap-1"
              title="Resultado de la suma de las 3 monedas (6, 7, 8 o 9)"
            >
              Suma
            </span>
          </div>
        )}

        <div className="flex flex-col w-full">
          {displayLines.map((line) => {
            const isSelected = highlightLinePosition === line.position;
            const isSolid = line.isYang;
            const isMutating = !isDerived && line.isMutating;

            return (
              <motion.div
                key={line.position}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (6 - line.position) * 0.05 }}
                onClick={() => handleLineClick(line.position)}
                className={`group flex items-center justify-between gap-2.5 sm:gap-3 ${
                  lineHeights[size]
                } cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-[#FF6B2B] ring-offset-2 ring-offset-[#121216] rounded-md px-1.5 bg-[#1C1C24]'
                    : 'px-1 hover:bg-[#1A1A22] rounded-md'
                } transition-all`}
                title={`Línea ${line.position} • Toca para abrir su significado en ventana flotante`}
              >
                {/* Left Column: # de Tirada / Posición (distinct badge style) */}
                {showLabels && (
                  <div className="w-9 shrink-0 flex items-center justify-start">
                    <span
                      className={`inline-flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded transition-all ${
                        isSelected
                          ? 'bg-[#FF6B2B] text-[#0A0A0D]'
                          : 'bg-[#181824] text-[#A1A1B4] border border-[#2B2B3D] group-hover:border-[#FF6B2B]/50 group-hover:text-[#F4F4F6]'
                      }`}
                      title={`Tirada #${line.position} (de la base a la cima)`}
                    >
                      #{line.position}
                    </span>
                  </div>
                )}

                {/* Hexagram Line Bar - Classical Chinese Ink Calligraphy Brush Stroke */}
                <div className="relative flex-1 flex items-center h-full px-0.5">
                  <CalligraphyLine
                    isYang={isSolid}
                    isMutating={isMutating}
                    position={line.position}
                    className="w-full h-full"
                  />

                  {/* Old Yang mark: Tertiary Amber Gold Circle (○) in center */}
                  {isSolid && isMutating && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-4 h-4 rounded-full border border-[#121216] bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)] flex items-center justify-center text-[10px] font-bold text-[#0A0A0D] leading-none">
                        ○
                      </span>
                    </div>
                  )}

                  {/* Old Yin mark: Tertiary Amber Gold Cross (✕) in center gap */}
                  {!isSolid && isMutating && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[#F59E0B] font-black text-xs sm:text-sm font-sans leading-none drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]">
                        ✕
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Column: Resultado de la Suma */}
                {showLabels && (
                  <div className="w-12 shrink-0 flex items-center justify-end gap-1 font-mono text-[10px] sm:text-[11px]">
                    <span
                      className={`inline-flex items-center justify-center min-w-[22px] px-1.5 py-0.5 rounded font-bold transition-all ${
                        isMutating
                          ? 'bg-[#FF6B2B]/20 text-[#FF8F50] border border-[#FF6B2B]/50 shadow-[0_0_6px_rgba(255,107,43,0.25)]'
                          : 'bg-[#181822] text-[#D1D1DC] border border-[#2A2A38] group-hover:border-[#3E3E50]'
                      }`}
                      title={`Resultado de la suma de monedas: ${line.value} (${
                        line.value === 6
                          ? 'Viejo Yin (mutante)'
                          : line.value === 7
                          ? 'Joven Yang (fijo)'
                          : line.value === 8
                          ? 'Joven Yin (fijo)'
                          : 'Viejo Yang (mutante)'
                      })`}
                    >
                      <span>{line.value}</span>
                    </span>
                    {isMutating && (
                      <span className="text-[11px] text-[#F59E0B] leading-none shrink-0" title="Línea mutante activa">
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
          <div className="mt-3.5 pt-3 border-t border-[#252533] flex items-center justify-between text-[11px] text-[#8E8E9F] font-sans px-1">
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

      {/* Floating Window (Ventana Flotante / Modal) when clicking any line */}
      {modalLinePos !== null &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
              onClick={() => setModalLinePos(null)}
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="line-modal-title"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-md sm:max-w-lg p-5 sm:p-6 bg-[#16161F] border border-[#FF6B2B]/60 rounded-xl shadow-2xl text-left text-xs text-[#E2E2EC] leading-relaxed max-h-[90vh] overflow-y-auto overscroll-contain animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#282838] mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-[#FF6B2B] text-[#0A0A0D]">
                      Posición #{modalLinePos}
                    </span>
                    <span className="text-[11px] font-mono text-[#F59E0B]">
                      Tirada {modalLinePos} de 6
                    </span>
                  </div>
                  <h3 id="line-modal-title" className="font-serif font-bold text-base sm:text-lg text-[#F4F4F6]">
                    {hexagramName
                      ? `Línea ${modalLinePos} • Hexagrama #${hexagramNumber} ${hexagramName}`
                      : `Línea ${modalLinePos} del Hexagrama`}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setModalLinePos(null)}
                  className="text-[#8E8E9E] hover:text-[#F4F4F6] p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-[#252535] shrink-0"
                  aria-label="Cerrar ventana"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Line Characteristic Summary Cards */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2.5 rounded-lg bg-[#111116] border border-[#262635]">
                  <span className="text-[10px] text-[#8E8E9F] font-mono uppercase block mb-0.5">
                    Naturaleza del Trazo
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#F4F4F6]">
                    {activeModalLine?.isYang ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[#E4E4E7]" />
                        <span>Yang (Trazo Firme ⚊)</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[#A1A1AA]" />
                        <span>Yin (Trazo Abierto ⚋)</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#111116] border border-[#262635]">
                  <span className="text-[10px] text-[#8E8E9F] font-mono uppercase block mb-0.5">
                    Resultado de Monedas
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F59E0B]">
                    <span>Suma = {activeModalLine?.value ?? '-'}</span>
                    <span className="text-[10px] text-[#8E8E9F] font-sans font-normal">
                      ({activeModalLine?.value === 6
                        ? 'Viejo Yin'
                        : activeModalLine?.value === 7
                        ? 'Joven Yang'
                        : activeModalLine?.value === 8
                        ? 'Joven Yin'
                        : 'Viejo Yang'})
                    </span>
                  </div>
                </div>
              </div>

              {/* Mutating Alert Banner if applicable */}
              {isCurrentMutating && (
                <div className="mb-4 p-3 rounded-lg bg-[#241510] border border-[#FF6B2B]/60 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#FF8F50] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#FFC4A8] leading-relaxed">
                    <strong className="text-[#FF8F50] block font-sans">
                      Línea Mutante Activa en tu Consulta
                    </strong>
                    Esta línea contiene un potencial de transformación dinámico; su mensaje es especialmente relevante para tu pregunta y se transforma en su opuesto en el hexagrama futuro.
                  </div>
                </div>
              )}

              {/* Oracular Interpretation of the Line (repeated from below) */}
              <div className="mb-4">
                <span className="text-[11px] font-mono text-[#F59E0B] uppercase tracking-wider block mb-1.5">
                  Significado e Interpretación Oracular:
                </span>
                <div className="p-4 rounded-lg bg-[#121218] border border-[#FF6B2B]/40 text-xs sm:text-sm font-serif leading-relaxed text-[#F4F4F6] shadow-inner">
                  {activeMeaning ? (
                    activeMeaning
                  ) : (
                    <span className="text-[#8E8E9E] italic">
                      Significado no disponible para esta posición.
                    </span>
                  )}
                </div>
              </div>

              {/* Structural meaning of this line position */}
              {activeStructure && (
                <div className="mb-5 p-3.5 rounded-lg bg-[#121217] border border-[#272738] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#8E8E9F] font-mono pb-1 border-b border-[#222230]">
                    <span className="text-[#FF8F50] font-bold">
                      {activeStructure.traditionalName}
                    </span>
                    <span>{activeStructure.realm}</span>
                  </div>
                  <div className="text-[11px] text-[#D1D1DE] leading-relaxed pt-0.5">
                    <strong className="text-[#F59E0B]">Función estructural ({activeStructure.level}):</strong>{' '}
                    {activeStructure.description}
                  </div>
                </div>
              )}

              {/* Footer: Line Navigation and Close Button */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#262635]">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={modalLinePos <= 1}
                    onClick={() => {
                      if (modalLinePos > 1) {
                        const newPos = modalLinePos - 1;
                        setModalLinePos(newPos);
                        if (onSelectLine) onSelectLine(newPos);
                      }
                    }}
                    className="p-1.5 px-2 rounded-lg bg-[#1F1F2A] hover:bg-[#2A2A38] disabled:opacity-30 disabled:pointer-events-none text-[#D1D1DC] border border-[#333345] transition-colors cursor-pointer flex items-center gap-1 text-xs"
                    title="Ver línea inferior anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline text-[11px]">Línea ant.</span>
                  </button>

                  <span className="text-[11px] font-mono text-[#8E8E9E] px-1.5">
                    {modalLinePos} / 6
                  </span>

                  <button
                    type="button"
                    disabled={modalLinePos >= 6}
                    onClick={() => {
                      if (modalLinePos < 6) {
                        const newPos = modalLinePos + 1;
                        setModalLinePos(newPos);
                        if (onSelectLine) onSelectLine(newPos);
                      }
                    }}
                    className="p-1.5 px-2 rounded-lg bg-[#1F1F2A] hover:bg-[#2A2A38] disabled:opacity-30 disabled:pointer-events-none text-[#D1D1DC] border border-[#333345] transition-colors cursor-pointer flex items-center gap-1 text-xs"
                    title="Ver línea superior siguiente"
                  >
                    <span className="hidden xs:inline text-[11px]">Línea sig.</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setModalLinePos(null)}
                  className="px-4 py-2 rounded-lg bg-[#FF6B2B] hover:bg-[#FF8044] text-[#0A0A0D] font-serif font-bold text-xs transition-colors cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
