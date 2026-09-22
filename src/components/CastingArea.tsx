import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coin } from './Coin';
import { HexagramDrawing } from './HexagramDrawing';
import { generateLine, getLineMeta } from '../logic/iching';
import { CoinValue, HexagramLine } from '../types';
import { RefreshCw, Play, FastForward, Sparkles } from 'lucide-react';
import { InfoButton } from './InfoButton';

interface CastingAreaProps {
  question?: string;
  onComplete: (lines: HexagramLine[]) => void;
  onOpenGuide?: () => void;
  onOpenTutorial?: () => void;
}

export const CastingArea: React.FC<CastingAreaProps> = ({
  question,
  onComplete,
  onOpenGuide,
  onOpenTutorial,
}) => {
  const [lines, setLines] = useState<HexagramLine[]>([]);
  const [currentCoins, setCurrentCoins] = useState<[CoinValue, CoinValue, CoinValue]>([3, 2, 3]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [lastLineResult, setLastLineResult] = useState<HexagramLine | null>(null);

  const currentLineIndex = lines.length; // 0 to 5
  const isComplete = lines.length === 6;

  // Beginner descriptions for each position (from base 1 to summit 6)
  const positionDescriptions = [
    { name: 'Línea 1 (Base)', meaning: 'Tus cimientos: la raíz y origen del asunto' },
    { name: 'Línea 2 (Interior)', meaning: 'Tu actitud interna: serenidad y emociones' },
    { name: 'Línea 3 (Transición)', meaning: 'El umbral: paso del mundo interno a la acción' },
    { name: 'Línea 4 (Exterior)', meaning: 'Tu entorno: la relación con los demás' },
    { name: 'Línea 5 (Centro/Gobierno)', meaning: 'El núcleo: la posición clave y de sabiduría' },
    { name: 'Línea 6 (Cima)', meaning: 'La culminación: el desenlace y evitar excesos' },
  ];

  // Single line toss with animation
  const handleTossNextLine = () => {
    if (isFlipping || isComplete) return;

    setIsFlipping(true);
    const nextPosition = lines.length + 1; // 1 to 6
    const newLine = generateLine(nextPosition);

    // Coins finish flipping after 900ms
    setTimeout(() => {
      setCurrentCoins(newLine.coins);
      setLastLineResult(newLine);
      const updatedLines = [...lines, newLine];
      setLines(updatedLines);
      setIsFlipping(false);

      if (updatedLines.length === 6) {
        setTimeout(() => {
          onComplete(updatedLines);
        }, 1200);
      }
    }, 900);
  };

  // Fast forward: Toss all remaining lines smoothly
  const handleTossAllRemaining = async () => {
    if (isFlipping || isComplete) return;

    let current = [...lines];
    while (current.length < 6) {
      const nextPos = current.length + 1;
      const newLine = generateLine(nextPos);
      current = [...current, newLine];
    }

    setCurrentCoins(current[current.length - 1].coins);
    setLastLineResult(current[current.length - 1]);
    setLines(current);

    setTimeout(() => {
      onComplete(current);
    }, 600);
  };

  const handleReset = () => {
    setLines([]);
    setLastLineResult(null);
    setCurrentCoins([3, 2, 3]);
    setIsFlipping(false);
  };

  const currentLineInfo = positionDescriptions[Math.min(currentLineIndex, 5)];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Consultation Banner (Question) */}
      <div className="w-full mb-6 p-4 rounded-xl bg-[#141419] border border-[#272733] text-[#F4F4F6] flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B2B] shadow-[0_0_8px_#FF6B2B] shrink-0" />
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#A1A1B0] font-mono block">
              Consulta en Curso
            </span>
            <p className="font-serif text-base sm:text-lg italic text-[#F4F4F6]">
              {question ? `«${question}»` : 'Consulta abierta del momento presente'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Casting Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Virtual 3 Coins Plate */}
        <div className="md:col-span-7 bg-[#121216] border border-[#272733] rounded-xl p-5 sm:p-6 flex flex-col items-center shadow-xl">
          {/* Header indicator */}
          <div className="w-full min-h-[46px] flex items-center justify-between pb-4 border-b border-[#232330] mb-5 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#1F1F2A] border border-[#353545] flex items-center justify-center font-mono font-bold text-sm text-[#FF6B2B] shrink-0">
                {isComplete ? '6/6' : `${currentLineIndex + 1}/6`}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-wide uppercase text-[#F4F4F6] truncate">
                    {isComplete
                      ? 'Hexagrama Consumado'
                      : currentLineInfo.name}
                  </h3>
                  <InfoButton
                    title={currentLineInfo.name}
                    content={`La posición ${currentLineIndex + 1} de abajo hacia arriba representa: ${currentLineInfo.meaning}.`}
                  />
                </div>
                <span className="text-xs text-[#F59E0B] block truncate">
                  {isComplete ? '¡Generando lectura final!' : currentLineInfo.meaning}
                </span>
              </div>
            </div>
          </div>

          {/* Virtual Coin Tray (Deep obsidian with warm orange patina lighting) */}
          <div className="w-full py-5 sm:py-7 px-2 sm:px-4 bg-radial from-[#1E1E26] via-[#15151B] to-[#0D0D11] border border-[#2D2D3D] rounded-xl flex items-center justify-around shadow-inner my-2">
            <Coin value={currentCoins[0]} isFlipping={isFlipping} size="lg" delay={0} />
            <Coin value={currentCoins[1]} isFlipping={isFlipping} size="lg" delay={0.12} />
            <Coin value={currentCoins[2]} isFlipping={isFlipping} size="lg" delay={0.24} />
          </div>

          {/* Coin Convention Explanation */}
          <div className="w-full mt-3 text-center text-xs text-[#9E9EAA] flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <span className="flex items-center gap-1">
              <strong className="text-[#FF8F50]">Cara:</strong> 3 (Yang • Firme)
            </span>
            <span className="text-[#424252] hidden xs:inline">•</span>
            <span className="flex items-center gap-1">
              <strong className="text-[#A1A1B0]">Cruz:</strong> 2 (Yin • Flexible)
            </span>
            <InfoButton
              title="Valores de las monedas"
              content="En la tradición taoísta, el número impar 3 representa Yang (cielo, luz, firmeza) y el par 2 representa Yin (tierra, receptividad). Las sumas posibles son: 6 (Viejo Yin, muta a Yang), 7 (Joven Yang, fijo), 8 (Joven Yin, fijo) y 9 (Viejo Yang, muta a Yin)."
            />
          </div>

          {/* Result of the line just cast with Beginner Translation */}
          <div className="w-full min-h-[76px] mt-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {lastLineResult && !isFlipping ? (
                <motion.div
                  key={lastLineResult.position}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`w-full p-3.5 rounded-lg border text-center transition-all ${
                    lastLineResult.isMutating
                      ? 'bg-[#1E1410] border-[#FF6B2B]/60 shadow-[0_0_12px_rgba(255,107,43,0.15)]'
                      : 'bg-[#181820] border-[#2B2B38]'
                  }`}
                >
                  <div className="text-xs font-mono text-[#A1A1B0] mb-0.5">
                    Suma: {lastLineResult.coins.join(' + ')} = <strong className="text-[#F59E0B]">{lastLineResult.value}</strong>
                  </div>
                  <div className="text-sm font-bold text-[#F4F4F6] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                    <span>
                      Línea {lastLineResult.position}:{' '}
                      {getLineMeta(lastLineResult.value).traditionalName}
                    </span>
                    {lastLineResult.isMutating && (
                      <span className="bg-[#FF6B2B] text-[#0A0A0D] text-[10px] font-sans px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        ★ Línea Mutante
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#D1D1DC] mt-1">
                    {lastLineResult.value === 7 && 'Línea sólida: Acción decidida, luz y claridad.'}
                    {lastLineResult.value === 8 && 'Línea partida: Receptividad, serenidad y escucha.'}
                    {lastLineResult.value === 6 && 'Línea mutante: Máxima receptividad que pronto se transformará en acción activa (Yang).'}
                    {lastLineResult.value === 9 && 'Línea mutante: Máxima energía activa que pronto requerirá reposo (Yin).'}
                  </div>
                </motion.div>
              ) : (
                <div className="text-xs text-[#71717A] italic text-center py-2">
                  {isFlipping
                    ? 'Lanzando las 3 monedas de bronce...'
                    : 'Pulsa el botón naranja para lanzar las monedas y colocar la siguiente línea.'}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="w-full mt-5 pt-4 border-t border-[#232330] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={handleReset}
              disabled={lines.length === 0 || isFlipping}
              className="order-2 sm:order-1 px-3 py-2 text-xs text-[#9E9EAA] hover:text-[#F4F4F6] disabled:opacity-30 flex items-center justify-center sm:justify-start gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reiniciar Tirada</span>
            </button>

            <div className="order-1 sm:order-2 flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="flex items-center justify-between xs:justify-start gap-1 flex-1 xs:flex-initial">
                <button
                  onClick={handleTossAllRemaining}
                  disabled={isFlipping || isComplete}
                  className="w-full xs:w-auto px-3.5 py-2.5 text-xs font-semibold text-[#D1D1DC] bg-[#1E1E28] hover:bg-[#2A2A38] active:scale-95 disabled:opacity-30 rounded-lg border border-[#333345] flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Tirar todas las líneas restantes automáticamente"
                >
                  <FastForward className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Completar Rápido</span>
                </button>
                <InfoButton
                  title="Completar Rápido"
                  content="Genera todas las tiradas de monedas pendientes siguiendo las mismas reglas tradicionales (cara 3, cruz 2), ideal si tienes prisa."
                />
              </div>

              <button
                onClick={handleTossNextLine}
                disabled={isFlipping || isComplete}
                className="w-full xs:w-auto px-5 py-2.5 text-sm font-serif font-bold text-[#0A0A0D] bg-[#FF6B2B] hover:bg-[#FF8248] active:scale-95 disabled:opacity-40 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FF6B2B]/20 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#0A0A0D]" />
                <span>
                  {lines.length === 0
                    ? 'Lanzar Línea 1 (Base)'
                    : isComplete
                    ? 'Hexagrama Listo'
                    : `Lanzar Línea ${currentLineIndex + 1}`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Hexagram in Construction */}
        <div className="md:col-span-5 bg-[#121216] border border-[#272733] rounded-xl p-5 sm:p-6 flex flex-col items-center shadow-xl">
          <div className="w-full min-h-[46px] flex items-center justify-between pb-4 border-b border-[#232330] mb-5 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#A1A1B0] font-mono leading-none">
                Construcción del Hexagrama
              </span>
              <InfoButton
                title="De abajo hacia arriba"
                content="En la cosmovisión china antigua, todas las situaciones y seres vivos crecen desde la raíz hacia la copa. Por eso la línea 1 es la base inicial y la línea 6 es la culminación."
              />
            </div>
            <span className="text-xs text-[#F59E0B] font-medium shrink-0 whitespace-nowrap">De abajo hacia arriba</span>
          </div>

          {/* Hexagram Preview Display */}
          {lines.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              <HexagramDrawing lines={lines} size="md" />

              {/* Progress counter */}
              <div className="w-full mt-4 text-center">
                <div className="flex items-center justify-between text-xs font-mono text-[#A1A1B0] mb-1.5">
                  <span>Progreso:</span>
                  <span className="text-[#FF6B2B] font-bold">{lines.length} de 6 líneas</span>
                </div>
                <div className="w-full bg-[#1F1F28] h-2 rounded-full overflow-hidden border border-[#2D2D3D]">
                  <div
                    className="bg-gradient-to-r from-[#FF6B2B] to-[#F59E0B] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(lines.length / 6) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-64 border-2 border-dashed border-[#282836] rounded-xl flex flex-col items-center justify-center p-6 text-center text-[#71717A]">
              <div className="w-12 h-12 rounded-full border border-[#38384A] bg-[#16161D] flex items-center justify-center mb-3 text-lg font-chinese text-[#FF6B2B]">
                卦
              </div>
              <p className="text-sm text-[#F4F4F6] font-medium">El hexagrama aguarda la primera tirada.</p>
              <p className="text-xs text-[#8E8E9E] mt-1 max-w-xs">
                La línea 1 se colocará en los cimientos (abajo) y ascenderá hasta la línea 6 (arriba).
              </p>
            </div>
          )}

          {/* Traditional rule reminder for beginners */}
          <div className="w-full mt-5 p-3 rounded-lg bg-[#181820] border border-[#2B2B3A] text-xs text-[#A8A8B6] leading-relaxed">
            <strong className="text-[#F59E0B] flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              ¿Qué pasa si sale una línea mutante?
            </strong>
            Las sumas <strong className="text-[#FF6B2B]">6</strong> o <strong className="text-[#FF6B2B]">9</strong> son líneas que mutan y revelarán un <strong className="text-[#F4F4F6]">segundo hexagrama</strong> que muestra el desenlace de tu situación.
          </div>
        </div>
      </div>
    </div>
  );
};
