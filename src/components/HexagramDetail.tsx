import React, { useState } from 'react';
import { HexagramDrawing } from './HexagramDrawing';
import { TrigramCalligraphy } from './TrigramCalligraphy';
import { HexagramData, HexagramLine } from '../types';
import { TRIGRAMS, getSimplifiedTrigram, getTrigramSynthesis } from '../data/trigrams';
import { getRecommendedAttitude } from '../data/attitudes';
import { getLineMeta } from '../logic/iching';
import { InfoButton } from './InfoButton';
import { getHexagramBackground, getTrigramBackground } from '../data/artworks';
import {
  getSimplifiedJudgment,
  getSimplifiedImage,
  getSimplifiedLine,
} from '../logic/simplifiedReader';
import {
  ArrowRightLeft,
  BookmarkCheck,
  BookOpen,
  Info,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  ScrollText,
  Feather,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface HexagramDetailProps {
  question?: string;
  lines: HexagramLine[];
  primaryHexagram: HexagramData;
  derivedHexagram?: HexagramData;
  mutatingLinePositions: number[];
  onNewConsultation: () => void;
}

export const HexagramDetail: React.FC<HexagramDetailProps> = ({
  question,
  lines,
  primaryHexagram,
  derivedHexagram,
  mutatingLinePositions,
  onNewConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'primary' | 'derived'>('primary');
  const [selectedLinePos, setSelectedLinePos] = useState<number | null>(
    mutatingLinePositions.length > 0 ? mutatingLinePositions[0] : null
  );

  // Modo global de lectura: 'simplified' (claro y directo) vs 'original' (canónico / poético)
  const [readingMode, setReadingMode] = useState<'simplified' | 'original'>('simplified');

  // Collapsible dropdown states for interpretation sections
  const [isQuickSummaryOpen, setIsQuickSummaryOpen] = useState(false);
  const [isTrigramsOpen, setIsTrigramsOpen] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(true);
  const [isTuanOpen, setIsTuanOpen] = useState(false);
  const [isWenyanOpen, setIsWenyanOpen] = useState(false);
  const [isMutationsOpen, setIsMutationsOpen] = useState(true);
  const [isAllLinesOpen, setIsAllLinesOpen] = useState(true);

  const isViewingDerived = Boolean(activeTab === 'derived' && derivedHexagram);
  const currentHexagram = isViewingDerived && derivedHexagram ? derivedHexagram : primaryHexagram;

  // Canonical 6-mutating-lines conditions (Zhu Xi / Shao Yong rules)
  const isAllNines = lines.length === 6 && lines.every((l) => l.value === 9);
  const isAllSixes = lines.length === 6 && lines.every((l) => l.value === 6);
  const allLinesMutating = mutatingLinePositions.length === 6;

  // Trigrams for current hexagram
  const upperTrigramInfo = TRIGRAMS[currentHexagram.upperTrigram] || TRIGRAMS['Cielo'];
  const lowerTrigramInfo = TRIGRAMS[currentHexagram.lowerTrigram] || TRIGRAMS['Cielo'];
  const upperSimplified = getSimplifiedTrigram(upperTrigramInfo.name);
  const lowerSimplified = getSimplifiedTrigram(lowerTrigramInfo.name);
  const trigramSynthesisText = getTrigramSynthesis(lowerTrigramInfo.name, upperTrigramInfo.name);

  // Simplified representations for judgment and image
  const simplifiedJudgment = getSimplifiedJudgment(currentHexagram);
  const simplifiedImage = getSimplifiedImage(currentHexagram);

  // Lines for derived hexagram (if viewing derived)
  const derivedLines: HexagramLine[] = lines.map((l) => {
    let newVal = l.value;
    let newYang = l.isYang;
    if (l.value === 6) {
      newVal = 7;
      newYang = true;
    } else if (l.value === 9) {
      newVal = 8;
      newYang = false;
    }
    return {
      ...l,
      value: newVal,
      isYang: newYang,
      isMutating: false,
    };
  });

  const primaryAttitude = getRecommendedAttitude(primaryHexagram.number, primaryHexagram.image);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. LA CAJA DEL HEXAGRAMA: LO PRIMERO QUE APARECE EN PANTALLA               */}
      {/* ========================================================================= */}
      <section
        aria-label="Hexagrama obtenido"
        className="w-full bg-[#121216] border border-[#272733] rounded-xl p-5 sm:p-7 shadow-2xl relative overflow-hidden"
      >
        {/* Cabecera del Hexagrama con Imagen de Fondo Tradicional Shan Shui Visible */}
        <div className="w-full relative rounded-2xl overflow-hidden border border-[#3E384D] shadow-2xl mb-6 min-h-[250px] sm:min-h-[290px] flex items-end sm:items-center p-4 sm:p-8">
          {/* Imagen de fondo artística en ALTA VISIBILIDAD (rotación tradicional Shan Shui según hexagrama) */}
          <img
            src={getHexagramBackground(currentHexagram.number)}
            alt={`Paisaje tradicional Shan Shui para ${currentHexagram.nameEs}`}
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-100 filter contrast-105"
          />

          {/* Sombra sutil perimetral para enmarcar la imagen sin taparla */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/60 via-transparent to-[#0A0A0E]/25 pointer-events-none" />

          {/* Tarjeta de texto flotante translúcida: integrada con la imagen de fondo y texto con trazo fuerte */}
          <div className="relative z-10 w-full max-w-3xl bg-[#0A0A0E]/15 sm:bg-[#0A0A0E]/10 backdrop-blur-[2px] rounded-2xl p-3 sm:p-5 border border-white/10 shadow-lg">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Sello Caligráfico Imperial */}
              <div
                className={`rounded-2xl bg-[#141218]/90 backdrop-blur-sm border-2 border-[#FF6B2B] flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,107,43,0.5),0_4px_12px_rgba(0,0,0,0.8)] relative transition-all ${
                  currentHexagram.chinese.length > 1
                    ? 'w-auto min-w-[5.25rem] sm:min-w-[6.5rem] px-3 sm:px-4 h-16 sm:h-20'
                    : 'w-16 h-16 sm:w-20 sm:h-20'
                }`}
              >
                <span
                  className={`font-chinese font-bold text-[#FF6B2B] drop-shadow-[0_0_12px_rgba(255,107,43,0.8)] select-none text-center leading-none whitespace-nowrap overflow-hidden ${
                    currentHexagram.chinese.length > 2
                      ? 'text-xl sm:text-2xl'
                      : currentHexagram.chinese.length > 1
                      ? 'text-2xl sm:text-3xl tracking-tight'
                      : 'text-4xl sm:text-5xl'
                  }`}
                >
                  {currentHexagram.chinese}
                </span>
                <span className="absolute -bottom-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF6B2B] text-[#0A0A0D] uppercase shadow-md whitespace-nowrap">
                  #{currentHexagram.number}
                </span>
              </div>

              {/* Gran Título y Esencia del Hexagrama */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#F59E0B] text-[#0A0A0D] tracking-wider uppercase shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    Hexagrama #{currentHexagram.number}
                  </span>
                  <span
                    className="text-xs sm:text-sm font-mono text-white font-bold tracking-wide"
                    style={{
                      WebkitTextStroke: '0.8px #07070A',
                      paintOrder: 'stroke fill',
                      textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.9)',
                    }}
                  >
                    {currentHexagram.pinyin}
                  </span>
                  <span className="text-[#E2E2E8] drop-shadow-md">•</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#1C1C28]/90 text-[#FF8F50] border border-[#FF8F50]/40 shadow-[0_2px_8px_rgba(0,0,0,0.7)] backdrop-blur-xs">
                    {isViewingDerived ? 'Hexagrama Futuro' : 'Hexagrama Presente'}
                  </span>
                  <InfoButton
                    title={`Hexagrama #${currentHexagram.number}: ${currentHexagram.nameEs}`}
                    content={`Representa la energía arquetípica de «${currentHexagram.nameEs}». Ordenado según la secuencia clásica del Rey Wen.`}
                  />
                </div>

                <h2
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight"
                  style={{
                    WebkitTextStroke: '2.2px #050508',
                    paintOrder: 'stroke fill',
                    textShadow:
                      '0 3px 12px rgba(0,0,0,1), 0 0 24px rgba(0,0,0,0.95), 2px 2px 0 #050508, -2px -2px 0 #050508, 2px -2px 0 #050508, -2px 2px 0 #050508',
                  }}
                >
                  {currentHexagram.nameEs}
                </h2>

                <p
                  className="italic text-xs sm:text-sm md:text-base text-[#FDE68A] mt-1 font-serif leading-snug font-semibold"
                  style={{
                    WebkitTextStroke: '1px #050508',
                    paintOrder: 'stroke fill',
                    textShadow:
                      '0 2px 8px rgba(0,0,0,1), 0 0 14px rgba(0,0,0,0.9), 1px 1px 0 #050508, -1px -1px 0 #050508',
                  }}
                >
                  «{currentHexagram.characterMeaning}»
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cuerpo del Hexagrama: Dibujo Caligráfico y Estructura de Trigramas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Columna Izquierda: Dibujo Caligráfico del Hexagrama (con interacción en líneas) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex justify-center">
              <HexagramDrawing
                lines={isViewingDerived ? derivedLines : lines}
                highlightLinePosition={selectedLinePos}
                onSelectLine={(pos) => setSelectedLinePos(pos)}
                size="md"
                isDerived={isViewingDerived}
                hexagramNumber={currentHexagram.number}
                hexagramName={currentHexagram.nameEs}
                lineMeanings={currentHexagram.lines}
                lineImages={currentHexagram.lineImages}
                mutatingLinePositions={!isViewingDerived ? mutatingLinePositions : []}
              />
            </div>

            <p className="text-[11px] text-[#A1A1B0] mt-3.5 flex items-center justify-center gap-1.5 text-center max-w-xs">
              <Info className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              Toca cualquier trazo del hexagrama para consultar su significado y consejo detallado
            </p>
          </div>

          {/* Columna Derecha: Anatomía de Trigramas (Superior e Inferior) con Atributos Canónicos */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#232330]">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1B0] font-bold">
                  Estructura de Trigramas
                </span>
                <InfoButton
                  title="Estructura de Trigramas"
                  content="El trigrama superior representa el macrocosmos y el entorno exterior; el inferior representa el microcosmos y el mundo interno."
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Selector de modo: Simplificado vs Original */}
                <div className="flex items-center bg-[#14141B] p-0.5 rounded-lg border border-[#2B2B38]" role="tablist" aria-label="Modo de vista de trigramas">
                  <button
                    type="button"
                    onClick={() => setReadingMode('simplified')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                      readingMode === 'simplified'
                        ? 'bg-[#FF6B2B] text-[#0A0A0E] font-bold shadow-xs'
                        : 'text-[#A1A1B0] hover:text-white'
                    }`}
                  >
                    Simplificado
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadingMode('original')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                      readingMode === 'original'
                        ? 'bg-[#FF6B2B] text-[#0A0A0E] font-bold shadow-xs'
                        : 'text-[#A1A1B0] hover:text-white'
                    }`}
                  >
                    Original
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTrigramsOpen(!isTrigramsOpen)}
                  className="p-1.5 rounded-md bg-[#1C1C26] hover:bg-[#282836] text-[#D1D1DC] border border-[#333345] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                  aria-expanded={isTrigramsOpen}
                >
                  <span className="text-[10px] text-[#A1A1B0] hidden xs:inline">
                    {isTrigramsOpen ? 'Plegar' : 'Desplegar'}
                  </span>
                  {isTrigramsOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#FF8F50]" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#FF8F50]" />
                  )}
                </button>
              </div>
            </div>

            {isTrigramsOpen ? (
              <div className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Trigrama Superior con Imagen del Elemento */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#3E384D] shadow-xl flex flex-col justify-between p-3 sm:p-4 min-h-[260px]">
                    {/* Imagen que representa el elemento puro correspondiente */}
                    <img
                      src={getTrigramBackground(upperTrigramInfo.name)}
                      alt={`Elemento ${upperTrigramInfo.name}`}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-100 filter contrast-105"
                    />

                    {/* Sombra sutil perimetral para enmarcar la imagen sin taparla */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/85 via-[#0A0A0E]/35 to-[#0A0A0E]/40 pointer-events-none" />

                    {/* Tarjeta de contenido translúcida con trazo fuerte para máxima legibilidad */}
                    <div className="relative z-10 flex flex-col justify-between h-full bg-[#0A0A0E]/25 sm:bg-[#0A0A0E]/15 backdrop-blur-[2px] rounded-xl p-3 border border-white/10 shadow-sm">
                      <div>
                        <span
                          className="text-[10px] uppercase font-mono block mb-1 text-white font-bold"
                          style={{
                            WebkitTextStroke: '0.6px #050508',
                            paintOrder: 'stroke fill',
                            textShadow: '0 1px 4px rgba(0,0,0,1)',
                          }}
                        >
                          Trigrama Superior (Exterior)
                        </span>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                            <span
                              className="font-chinese text-2xl sm:text-3xl text-[#FF6B2B]"
                              style={{
                                WebkitTextStroke: '1px #050508',
                                paintOrder: 'stroke fill',
                                textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 12px rgba(255,107,43,0.7)',
                              }}
                            >
                              {upperTrigramInfo.chinese}
                            </span>
                            <span
                              className="font-serif tracking-wide text-base sm:text-lg"
                              style={{
                                WebkitTextStroke: '1.2px #050508',
                                paintOrder: 'stroke fill',
                                textShadow: '0 2px 8px rgba(0,0,0,1)',
                              }}
                            >
                              {upperTrigramInfo.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-[#121217]/85 backdrop-blur-sm rounded border border-white/15 shadow-md" title={`Trigrama ${upperTrigramInfo.name}`}>
                              <TrigramCalligraphy lines={upperTrigramInfo.lines} size="sm" />
                            </div>
                            <span
                              className="text-2xl font-serif text-[#F59E0B]"
                              style={{
                                WebkitTextStroke: '0.8px #050508',
                                paintOrder: 'stroke fill',
                                textShadow: '0 2px 8px rgba(0,0,0,1)',
                              }}
                            >
                              {upperTrigramInfo.symbol}
                            </span>
                          </div>
                        </div>
                        <span
                          className="text-xs text-[#FDE68A] font-semibold block mb-2"
                          style={{
                            WebkitTextStroke: '0.7px #050508',
                            paintOrder: 'stroke fill',
                            textShadow: '0 2px 6px rgba(0,0,0,1)',
                          }}
                        >
                          {upperTrigramInfo.nature}
                        </span>
                      </div>

                      {/* Contenido según modo: Simplificado (3 campos) vs Original (atributos canónicos) */}
                      {readingMode === 'simplified' ? (
                        <div className="pt-2 border-t border-white/15 bg-[#0A0A0E]/75 backdrop-blur-sm rounded-lg p-3 flex flex-col gap-2 text-xs shadow-sm">
                          {/* 1. Cualidad */}
                          <div className="flex items-center gap-2">
                            <span className="text-[#FF8F50] font-mono text-[10px] uppercase font-bold shrink-0">
                              Cualidad:
                            </span>
                            <span className="text-white font-bold capitalize px-2 py-0.5 rounded bg-[#FF6B2B]/20 text-[#FF8F50] border border-[#FF6B2B]/40 text-xs">
                              {upperSimplified.quality}
                            </span>
                          </div>

                          {/* 2. Explicación */}
                          <div>
                            <span className="text-[#B5B5C4] font-mono text-[9px] uppercase font-bold block mb-0.5">
                              Explicación:
                            </span>
                            <p className="text-white/95 text-xs leading-relaxed">
                              {upperSimplified.explanation}
                            </p>
                          </div>

                          {/* 3. Posición */}
                          <div className="pt-1.5 border-t border-white/10">
                            <span className="text-[#B5B5C4] font-mono text-[9px] uppercase font-bold block mb-0.5">
                              Posición:
                            </span>
                            <p className="text-[#FDE68A] text-xs font-semibold">
                              Superior · externo: la situación, el contexto
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-white/15 bg-[#0A0A0E]/65 backdrop-blur-sm rounded-lg p-2.5 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] shadow-sm">
                          <div>
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Rol Familiar</span>
                            <span className="text-white font-medium drop-shadow-sm">{upperTrigramInfo.family}</span>
                          </div>
                          <div>
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Dirección</span>
                            <span className="text-white font-medium drop-shadow-sm">{upperTrigramInfo.direction}</span>
                          </div>
                          <div>
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Estación</span>
                            <span className="text-white font-medium drop-shadow-sm">{upperTrigramInfo.season}</span>
                          </div>
                          <div>
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Animal</span>
                            <span className="text-white font-medium drop-shadow-sm">{upperTrigramInfo.animal}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Cuerpo / Elemento</span>
                            <span className="text-white font-medium drop-shadow-sm">{upperTrigramInfo.bodyPart} • {upperTrigramInfo.element}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trigrama Inferior con Imagen del Elemento */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#3E384D] shadow-xl flex flex-col justify-between p-3 sm:p-4 min-h-[260px]">
                    {/* Imagen que representa el elemento puro correspondiente */}
                    <img
                      src={getTrigramBackground(lowerTrigramInfo.name)}
                      alt={`Elemento ${lowerTrigramInfo.name}`}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-100 filter contrast-105"
                    />

                    {/* Sombra sutil perimetral para enmarcar la imagen sin taparla */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/85 via-[#0A0A0E]/35 to-[#0A0A0E]/40 pointer-events-none" />

                    {/* Tarjeta de contenido translúcida con trazo fuerte para máxima legibilidad */}
                    <div className="relative z-10 flex flex-col justify-between h-full bg-[#0A0A0E]/25 sm:bg-[#0A0A0E]/15 backdrop-blur-[2px] rounded-xl p-3 border border-white/10 shadow-sm">
                      <div>
                        <span
                          className="text-[10px] uppercase font-mono block mb-1 text-white font-bold"
                          style={{
                            WebkitTextStroke: '0.6px #050508',
                            paintOrder: 'stroke fill',
                            textShadow: '0 1px 4px rgba(0,0,0,1)',
                          }}
                        >
                          Trigrama Inferior (Interior)
                        </span>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                            <span
                              className="font-chinese text-2xl sm:text-3xl text-[#FF6B2B]"
                              style={{
                                WebkitTextStroke: '1px #050508',
                                paintOrder: 'stroke fill',
                                textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 12px rgba(255,107,43,0.7)',
                              }}
                            >
                              {lowerTrigramInfo.chinese}
                            </span>
                            <span
                              className="font-serif tracking-wide text-base sm:text-lg"
                              style={{
                                WebkitTextStroke: '1.2px #050508',
                                paintOrder: 'stroke fill',
                                textShadow: '0 2px 8px rgba(0,0,0,1)',
                              }}
                            >
                              {lowerTrigramInfo.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-[#121217]/85 backdrop-blur-sm rounded border border-white/15 shadow-md" title={`Trigrama ${lowerTrigramInfo.name}`}>
                              <TrigramCalligraphy lines={lowerTrigramInfo.lines} size="sm" />
                            </div>
                            <span
                              className="text-2xl font-serif text-[#F59E0B]"
                              style={{
                                WebkitTextStroke: '0.8px #050508',
                                paintOrder: 'stroke fill',
                                textShadow: '0 2px 8px rgba(0,0,0,1)',
                              }}
                            >
                              {lowerTrigramInfo.symbol}
                            </span>
                          </div>
                        </div>
                        <span
                          className="text-xs text-[#FDE68A] font-semibold block mb-2"
                          style={{
                            WebkitTextStroke: '0.7px #050508',
                            paintOrder: 'stroke fill',
                            textShadow: '0 2px 6px rgba(0,0,0,1)',
                          }}
                        >
                          {lowerTrigramInfo.nature}
                        </span>
                      </div>

                      {/* Contenido según modo: Simplificado (3 campos) vs Original (atributos canónicos) */}
                      {readingMode === 'simplified' ? (
                        <div className="pt-2 border-t border-white/15 bg-[#0A0A0E]/75 backdrop-blur-sm rounded-lg p-3 flex flex-col gap-2 text-xs shadow-sm">
                          {/* 1. Cualidad */}
                          <div className="flex items-center gap-2">
                            <span className="text-[#FF8F50] font-mono text-[10px] uppercase font-bold shrink-0">
                              Cualidad:
                            </span>
                            <span className="text-white font-bold capitalize px-2 py-0.5 rounded bg-[#FF6B2B]/20 text-[#FF8F50] border border-[#FF6B2B]/40 text-xs">
                              {lowerSimplified.quality}
                            </span>
                          </div>

                          {/* 2. Explicación */}
                          <div>
                            <span className="text-[#B5B5C4] font-mono text-[9px] uppercase font-bold block mb-0.5">
                              Explicación:
                            </span>
                            <p className="text-white/95 text-xs leading-relaxed">
                              {lowerSimplified.explanation}
                            </p>
                          </div>

                          {/* 3. Posición */}
                          <div className="pt-1.5 border-t border-white/10">
                            <span className="text-[#B5B5C4] font-mono text-[9px] uppercase font-bold block mb-0.5">
                              Posición:
                            </span>
                            <p className="text-[#FDE68A] text-xs font-semibold">
                              Inferior · interno: lo que ocurre en uno, el punto de partida
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-white/15 bg-[#0A0A0E]/65 backdrop-blur-sm rounded-lg p-2.5 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] shadow-sm">
                          <div>
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Rol Familiar</span>
                            <span className="text-white font-medium drop-shadow-sm">{lowerTrigramInfo.family}</span>
                          </div>
                          <div>
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Dirección</span>
                            <span className="text-white font-medium drop-shadow-sm">{lowerTrigramInfo.direction}</span>
                          </div>
                          <div>
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Estación</span>
                            <span className="text-white font-medium drop-shadow-sm">{lowerTrigramInfo.season}</span>
                          </div>
                          <div>
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Animal</span>
                            <span className="text-white font-medium drop-shadow-sm">{lowerTrigramInfo.animal}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[#B5B5C4] block text-[9px] uppercase font-mono font-bold">Cuerpo / Elemento</span>
                            <span className="text-white font-medium drop-shadow-sm">{lowerTrigramInfo.bodyPart} • {lowerTrigramInfo.element}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Línea de síntesis canónica de interacción de trigramas */}
                <div className="w-full p-3 sm:p-3.5 bg-gradient-to-r from-[#17141A] via-[#1F1926] to-[#17141A] rounded-xl border border-[#FF6B2B]/40 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF8F50] font-bold px-2 py-0.5 rounded bg-[#FF6B2B]/20 border border-[#FF6B2B]/35">
                      Síntesis
                    </span>
                    <span className="text-xs text-[#A1A1B0] hidden sm:inline">
                      Dinámica de interacción:
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-serif font-bold text-[#FDE68A] tracking-wide text-center">
                    «{trigramSynthesisText}»
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsTrigramsOpen(true)}
                className="p-3 bg-[#181820] rounded-lg border border-[#2B2B38] text-xs text-[#C5C5D2] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 cursor-pointer hover:border-[#FF6B2B]/40 transition-colors"
              >
                <span>
                  {upperTrigramInfo.symbol} {upperTrigramInfo.name} ({upperTrigramInfo.nature}) sobre {lowerTrigramInfo.symbol} {lowerTrigramInfo.name} ({lowerTrigramInfo.nature}) — <span className="text-[#FDE68A] font-serif font-bold">«{trigramSynthesisText}»</span>
                </span>
                <span className="text-[11px] text-[#F59E0B] font-mono">Ver anatomía +</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CAJA DEL HEXAGRAMA PRINCIPAL Y DERIVADO (Pestañas de alternancia)      */}
      {/* ========================================================================= */}
      {derivedHexagram && (
        <section
          aria-label="Selector de hexagrama principal y derivado"
          className="w-full bg-[#16161D] p-2 rounded-xl border border-[#272733] flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 shadow-lg"
        >
          <button
            onClick={() => setActiveTab('primary')}
            className={`w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg font-serif text-xs sm:text-sm font-bold flex items-center justify-between sm:justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'primary'
                ? 'bg-[#FF6B2B] text-[#0A0A0D] shadow-md shadow-[#FF6B2B]/20'
                : 'text-[#A1A1B0] hover:text-[#F4F4F6] hover:bg-[#1E1E28]'
            }`}
          >
            <span className="truncate">
              Hexagrama Presente: #{primaryHexagram.number} {primaryHexagram.chinese} ({primaryHexagram.nameEs})
            </span>
            {mutatingLinePositions.length > 0 && (
              <span
                className={`text-[10px] font-sans px-1.5 py-0.5 rounded-md shrink-0 ${
                  activeTab === 'primary'
                    ? 'bg-[#0A0A0D] text-[#FF6B2B]'
                    : 'bg-[#FF6B2B] text-[#0A0A0D]'
                }`}
              >
                {mutatingLinePositions.length} mutación(es)
              </span>
            )}
          </button>

          <div className="hidden sm:flex items-center justify-center">
            <ArrowRightLeft className="w-4 h-4 text-[#71717A] shrink-0" />
          </div>

          <button
            onClick={() => setActiveTab('derived')}
            className={`w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg font-serif text-xs sm:text-sm font-bold flex items-center justify-between sm:justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'derived'
                ? 'bg-[#FF6B2B] text-[#0A0A0D] shadow-md shadow-[#FF6B2B]/20'
                : 'text-[#A1A1B0] hover:text-[#F4F4F6] hover:bg-[#1E1E28]'
            }`}
          >
            <span className="truncate">
              Hexagrama Futuro: #{derivedHexagram.number} {derivedHexagram.chinese} ({derivedHexagram.nameEs})
            </span>
            <span
              className={`text-xs shrink-0 font-sans ${
                activeTab === 'derived' ? 'text-[#0A0A0D] font-bold' : 'text-[#F59E0B]'
              }`}
            >
              Tendencia
            </span>
          </button>

          <div className="flex items-center justify-center shrink-0 px-1.5 py-0.5 sm:py-0">
            <InfoButton
              title="Hexagrama Presente y Futuro (Tendencia)"
              content="El Hexagrama Presente refleja tu situación actual. Las líneas mutantes (6 o 9) se transforman en sus polaridades opuestas para dar lugar al Hexagrama Futuro, indicando la tendencia natural hacia la cual evoluciona la situación."
            />
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. CAJA DE LA CONSULTA ELEGIDA                                             */}
      {/* ========================================================================= */}
      <section
        aria-label="Consulta elegida"
        className="w-full bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-5 shadow-xl flex items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF6B2B] font-bold block">
              Consulta Elegida
            </span>
            <InfoButton
              title="Tu Consulta"
              content="El hexagrama principal refleja la configuración energética de la situación planteada en este momento."
            />
          </div>
          <p className="font-serif text-base sm:text-lg text-[#F4F4F6] font-medium mt-0.5">
            {question ? `«${question}»` : 'Consulta abierta del momento presente'}
          </p>
        </div>
      </section>

      {/* Reglas Canónicas Supremas (para 6 mutaciones: 用九, 用六, o mutación total) */}
      {!isViewingDerived && isAllNines && primaryHexagram.canonicalExtra && (
        <div className="w-full bg-gradient-to-r from-[#2A1805] via-[#1E140C] to-[#141216] border-2 border-[#F59E0B] rounded-xl p-5 sm:p-6 shadow-2xl shadow-[#F59E0B]/20 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 text-8xl font-chinese text-[#F59E0B]/10 select-none pointer-events-none">
            用九
          </div>
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/60 flex items-center justify-center shrink-0 text-[#F59E0B] shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#F59E0B] text-[#0A0A0D]">
                  Regla Canónica Suprema
                </span>
                <span className="text-xs font-mono text-[#F59E0B] font-semibold">
                  Tirada de Seis Nueves (9-9-9-9-9-9)
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F4F4F6] tracking-wide mb-1">
                {primaryHexagram.canonicalExtra.title}
              </h3>
              <p className="text-xs text-[#FFC09F] font-mono mb-3">
                {primaryHexagram.canonicalExtra.chinese}
              </p>

              <div className="p-3.5 bg-[#0F0C08]/80 border border-[#F59E0B]/40 rounded-lg mb-3">
                <p className="font-serif text-base sm:text-lg text-[#FDE68A] italic leading-relaxed mb-2">
                  «{primaryHexagram.canonicalExtra.text}»
                </p>
                <p className="text-xs text-[#E5E5EB] leading-relaxed">
                  {primaryHexagram.canonicalExtra.meaning}
                </p>
              </div>

              <div className="p-2.5 bg-[#17120D] rounded-lg border border-[#3E2B1A] text-[11px] text-[#D4D4DC] leading-relaxed">
                <strong className="text-[#F59E0B]">Instrucción de los Sabios (Zhu Xi / Shao Yong):</strong> Al mutar los seis trazos yang en Lo Creativo (1), no se leen las seis líneas individuales de forma aislada. Rige exclusivamente este dictamen supremo: la energía cósmica pura muta íntegramente hacia la perfecta entrega nutricia de Lo Receptivo (Hexagrama #2).
              </div>
            </div>
          </div>
        </div>
      )}

      {!isViewingDerived && isAllSixes && primaryHexagram.canonicalExtra && (
        <div className="w-full bg-gradient-to-r from-[#20150A] via-[#1A1312] to-[#121217] border-2 border-[#EAB308] rounded-xl p-5 sm:p-6 shadow-2xl shadow-[#EAB308]/20 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 text-8xl font-chinese text-[#EAB308]/10 select-none pointer-events-none">
            用六
          </div>
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#EAB308]/20 border border-[#EAB308]/60 flex items-center justify-center shrink-0 text-[#EAB308] shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#EAB308] text-[#0A0A0D]">
                  Regla Canónica Suprema
                </span>
                <span className="text-xs font-mono text-[#EAB308] font-semibold">
                  Tirada de Seis Seises (6-6-6-6-6-6)
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F4F4F6] tracking-wide mb-1">
                {primaryHexagram.canonicalExtra.title}
              </h3>
              <p className="text-xs text-[#FEF08A] font-mono mb-3">
                {primaryHexagram.canonicalExtra.chinese}
              </p>

              <div className="p-3.5 bg-[#0F0C08]/80 border border-[#EAB308]/40 rounded-lg mb-3">
                <p className="font-serif text-base sm:text-lg text-[#FEF08A] italic leading-relaxed mb-2">
                  «{primaryHexagram.canonicalExtra.text}»
                </p>
                <p className="text-xs text-[#E5E5EB] leading-relaxed">
                  {primaryHexagram.canonicalExtra.meaning}
                </p>
              </div>

              <div className="p-2.5 bg-[#17120D] rounded-lg border border-[#3E2B1A] text-[11px] text-[#D4D4DC] leading-relaxed">
                <strong className="text-[#EAB308]">Instrucción de los Sabios (Zhu Xi / Shao Yong):</strong> Al mutar los seis trazos yin en Lo Receptivo (2), no se leen las seis líneas individuales aisladas. Rige esta séptima cláusula: la entrega absoluta transmuta en luz creadora activa duradera, dando origen a Lo Creativo (Hexagrama #1).
              </div>
            </div>
          </div>
        </div>
      )}

      {!isViewingDerived && allLinesMutating && !isAllNines && !isAllSixes && derivedHexagram && (
        <div className="w-full bg-gradient-to-r from-[#201015] via-[#18121A] to-[#121218] border border-[#FF6B2B]/60 rounded-xl p-5 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B2B]/20 border border-[#FF6B2B]/50 flex items-center justify-center shrink-0 text-[#FF6B2B]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6B2B] font-bold block">
                Regla Canónica Tradicional (六爻皆變)
              </span>
              <h4 className="font-serif font-bold text-base text-[#F4F4F6] mt-0.5">
                Mutación Total de las Seis Líneas
              </h4>
              <p className="text-xs text-[#C8C8D6] mt-1 leading-relaxed">
                Cuando las seis líneas mutan a la vez en cualquier hexagrama, la situación experimenta una transformación integral y radical. Según la regla de interpretación de Zhu Xi, el dictamen de <strong>«El Juicio» del Hexagrama Derivado (#{derivedHexagram.number} {derivedHexagram.nameEs})</strong> asume el rol regente principal en tu respuesta.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LUEGO LAS INTERPRETACIONES (Lectura rápida, Juicio, Imagen, etc.)      */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 4. LUEGO LAS INTERPRETACIONES (Lectura rápida, Juicio, Imagen, etc.)      */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-gradient-to-b from-[#FF6B2B] to-[#F59E0B] rounded-full" />
          <h3 className="font-serif font-bold text-xl text-[#F4F4F6] tracking-wide">
            Interpretación de la Consulta
          </h3>
          <span className="text-xs text-[#A1A1B0] hidden md:inline">
            • Trigramas, juicio, imagen y líneas
          </span>
        </div>

        {/* Selector Global de Modo de Lectura */}
        <div className="flex items-center gap-2 bg-[#14141B] p-1 rounded-xl border border-[#2B2B38] shadow-md shrink-0" role="tablist" aria-label="Modo global de lectura">
          <span className="text-[11px] font-mono font-bold text-[#A1A1B0] pl-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B2B]" />
            Lectura:
          </span>
          <button
            type="button"
            onClick={() => setReadingMode('simplified')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              readingMode === 'simplified'
                ? 'bg-[#FF6B2B] text-[#0A0A0D] shadow-sm'
                : 'text-[#A1A1B0] hover:text-white'
            }`}
          >
            Simplificado
          </button>
          <button
            type="button"
            onClick={() => setReadingMode('original')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              readingMode === 'original'
                ? 'bg-[#FF6B2B] text-[#0A0A0D] shadow-sm'
                : 'text-[#A1A1B0] hover:text-white'
            }`}
          >
            Original
          </button>
        </div>
      </div>

      {/* 4.1. Lectura Rápida para Principiantes (Resumen Esencial) */}
      <section
        aria-label="Lectura rápida para principiantes"
        className="w-full bg-gradient-to-r from-[#171411] via-[#14141A] to-[#121216] border border-[#FF6B2B]/40 rounded-xl p-4 sm:p-5 shadow-lg transition-all"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#FF6B2B]/20 text-[#FF6B2B]">
              <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-[#F4F4F6] tracking-wide">
              Lectura Rápida (Las 3 Claves de tu Tirada)
            </h4>
            <InfoButton
              title="Resumen Esencial"
              content="Sintetiza en tres claves comprensibles: el estado del presente, la actitud interior sugerida y el horizonte hacia donde fluye la situación."
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] bg-[#F59E0B]/20 text-[#F59E0B] px-2.5 py-0.5 rounded-full font-mono font-semibold">
              En pocas palabras
            </span>
            <button
              type="button"
              onClick={() => setIsQuickSummaryOpen(!isQuickSummaryOpen)}
              className="p-1.5 rounded-lg bg-[#1F1F2A] hover:bg-[#2A2A38] text-[#D1D1DC] border border-[#333345] transition-colors cursor-pointer flex items-center gap-1 text-xs"
              aria-expanded={isQuickSummaryOpen}
              title={isQuickSummaryOpen ? 'Plegar resumen' : 'Desplegar resumen'}
            >
              <span className="text-[11px] text-[#A1A1B0] hidden xs:inline">
                {isQuickSummaryOpen ? 'Plegar' : 'Desplegar'}
              </span>
              {isQuickSummaryOpen ? (
                <ChevronUp className="w-4 h-4 text-[#FF8F50]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#FF8F50]" />
              )}
            </button>
          </div>
        </div>

        {isQuickSummaryOpen ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3.5 pt-3 border-t border-[#2A2320]">
            <div className="p-3 bg-[#181822] rounded-lg border border-[#2A2A38]">
              <span className="text-[#FF6B2B] font-bold block mb-1">
                1. Tu Presente (#{primaryHexagram.number})
              </span>
              <p className="text-[#C5C5D2] leading-relaxed">
                Estás bajo la influencia de <strong className="text-[#F4F4F6]">«{primaryHexagram.nameEs}»</strong>. Señala una etapa de {primaryHexagram.characterMeaning.toLowerCase()}.
              </p>
            </div>

            <div className="p-3 bg-[#181822] rounded-lg border border-[#2A2A38]">
              <span className="text-[#F59E0B] font-bold block mb-1">
                2. Actitud Recomendada ({primaryAttitude.short})
              </span>
              <p className="text-[#C5C5D2] leading-relaxed">
                {primaryAttitude.advice}
              </p>
            </div>

            <div className="p-3 bg-[#181822] rounded-lg border border-[#2A2A38]">
              <span className="text-[#2DD4BF] font-bold block mb-1">
                3. ¿Hacia Dónde Evoluciona?
              </span>
              <p className="text-[#C5C5D2] leading-relaxed">
                {derivedHexagram ? (
                  <>
                    Tus {mutatingLinePositions.length} líneas mutantes señalan que la situación transitará hacia <strong className="text-[#F4F4F6]">«{derivedHexagram.nameEs}» (#{derivedHexagram.number})</strong>.
                  </>
                ) : (
                  'Hexagrama estable: No hay cambios drásticos inmediatos; se consolida el estado presente.'
                )}
              </p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsQuickSummaryOpen(true)}
            className="mt-2 text-xs text-[#A8A8B6] flex items-center justify-between cursor-pointer hover:text-[#F4F4F6] py-1"
          >
            <span className="line-clamp-1">
              Presente: <strong className="text-[#FF6B2B]">«{primaryHexagram.nameEs}»</strong> • Actitud: {primaryAttitude.short} • {derivedHexagram ? `Evoluciona a: «${derivedHexagram.nameEs}»` : 'Consolidación'}
            </span>
            <span className="text-[11px] text-[#F59E0B] shrink-0 ml-2 font-mono">Toca para desplegar +</span>
          </div>
        )}
      </section>

      {/* 4.2. El Juicio (Tuàn • 彖傳) */}
      <section
        aria-label="El Juicio"
        className="w-full bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-7 shadow-xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#232330] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF6B2B] rounded-full shadow-[0_0_6px_#FF6B2B]" />
            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#F4F4F6] tracking-wide">
              El Juicio {readingMode === 'simplified' ? '• Significado y Consejo Práctico' : '(Tuàn • 彖傳)'}
            </h4>
            <InfoButton
              title="El Juicio (Tuàn • 彖傳)"
              content="Atribuido al Rey Wen, define la cualidad intrínseca del momento y orienta sobre si conviene emprender acciones audaces, aguardar o perseverar en la rectitud."
            />
          </div>

          <div className="flex items-center gap-2">
            {currentHexagram.tuanCommentary && (
              <button
                type="button"
                onClick={() => setIsTuanOpen(!isTuanOpen)}
                className="px-2.5 py-1 rounded-lg bg-[#1B1B24] hover:bg-[#252533] text-[#F59E0B] border border-[#3E342B] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Comentario de las Diez Alas atribuido a Confucio"
              >
                <ScrollText className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="hidden sm:inline">Tuàn Zhuàn (彖傳)</span>
                <span className="sm:hidden">Alas</span>
                {isTuanOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {readingMode === 'simplified' ? (
          <div className="space-y-4">
            {/* 1. Significado Esencial en lenguaje llano: directo y espacioso */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-[#171722] via-[#151520] to-[#13131C] rounded-xl border border-[#303044] shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#FF8F50] px-2.5 py-1 rounded-md bg-[#FF6B2B]/15 border border-[#FF6B2B]/30">
                  Dinámica de la Situación
                </span>
                <span className="text-xs text-[#9CA3AF] hidden sm:inline">
                  Fuerzas en juego y desarrollo del momento presente
                </span>
              </div>
              <p className="font-sans text-sm sm:text-base text-[#F4F4F7] leading-relaxed tracking-normal font-normal">
                {simplifiedJudgment.essentialMeaning}
              </p>
            </div>

            {/* 2. Dos columnas: Qué favorece vs Qué evitar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-[#101C16] border border-[#10B981]/30 rounded-xl">
                <div className="flex items-center gap-1.5 text-[#34D399] font-mono font-bold text-xs mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Qué te favorece hacer:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#D1FAE5] leading-relaxed">
                  {simplifiedJudgment.favorableAdvice}
                </p>
              </div>

              <div className="p-3.5 bg-[#1C1412] border border-[#EF4444]/30 rounded-xl">
                <div className="flex items-center gap-1.5 text-[#F87171] font-mono font-bold text-xs mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0" />
                  <span>Qué debes evitar:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#FEE2E2] leading-relaxed">
                  {simplifiedJudgment.warningAdvice}
                </p>
              </div>
            </div>

            {/* 3. Actitud sugerida */}
            <div className="p-3 bg-[#181824] rounded-lg border border-[#2E2E40] text-xs text-[#D1D1DE] leading-relaxed">
              <strong className="text-[#F59E0B]">Consejo de actitud:</strong> {simplifiedJudgment.practicalAttitude}
            </div>

            {/* Referencia clásica colapsable */}
            <details className="mt-2 text-xs text-[#8E8EA0] group cursor-pointer">
              <summary className="hover:text-[#F4F4F6] transition-colors font-mono text-[11px] select-none">
                Ver texto clásico original del Juicio (Wilhelm) ▾
              </summary>
              <div className="mt-2 p-3 bg-[#0E0E12] rounded-lg border border-[#20202C] text-[#C5C5D2] font-serif text-sm italic leading-relaxed">
                «{currentHexagram.judgment}»
              </div>
            </details>
          </div>
        ) : (
          /* Modo Original */
          <>
            <p className="font-serif text-base sm:text-lg text-[#E4E4EB] leading-relaxed text-justify mb-4">
              {currentHexagram.judgment}
            </p>
            <div className="p-3 bg-[#181820] rounded-lg border border-[#2B2B38] text-xs text-[#A8A8B6] leading-relaxed">
              <strong className="text-[#F59E0B]">¿Cómo interpretarlo?</strong> El Juicio define la situación general y la disposición interna con la que debes abordar tu pregunta para actuar con sabiduría.
            </div>
          </>
        )}

        {/* Tuàn Zhuàn Commentary (Diez Alas de Confucio) */}
        {currentHexagram.tuanCommentary && isTuanOpen && (
          <div className="mt-4 p-4 bg-[#181412] rounded-lg border border-[#FF6B2B]/40 text-xs text-[#E8D4C8] animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-[#FF8F50] font-mono font-bold uppercase text-[11px] mb-1.5">
              <ScrollText className="w-3.5 h-3.5" />
              <span>Comentario Tuàn Zhuàn (彖傳 • Las Diez Alas)</span>
            </div>
            <p className="font-serif text-sm italic leading-relaxed text-[#F2E5DC] mb-2">
              {currentHexagram.tuanCommentary}
            </p>
            <span className="text-[10px] text-[#A19188] block">
              Exégesis canónica tradicional que dilucida la armonía cósmica y las razones éticas del dictamen.
            </span>
          </div>
        )}
      </section>

      {/* 4.3. La Imagen (Xiàng • 象傳) */}
      <section
        aria-label="La Imagen"
        className="w-full bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-7 shadow-xl transition-all"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#232330] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-full" />
            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#F4F4F6] tracking-wide">
              La Imagen {readingMode === 'simplified' ? '• Lección de la Naturaleza' : '(Xiàng • 象傳)'}
            </h4>
            <InfoButton
              title="La Imagen (Xiàng)"
              content="Enseña cómo armonizar nuestra conducta con la naturaleza representada por la interacción de los dos trigramas, según la tradición del sabio noble."
            />
          </div>

          <button
            type="button"
            onClick={() => setIsImageOpen(!isImageOpen)}
            className="p-1.5 rounded-lg bg-[#1F1F2A] hover:bg-[#2A2A38] text-[#D1D1DC] border border-[#333345] transition-colors cursor-pointer flex items-center gap-1 text-xs"
            aria-expanded={isImageOpen}
            title={isImageOpen ? 'Plegar Imagen' : 'Desplegar Imagen'}
          >
            <span className="text-[11px] text-[#A1A1B0] hidden xs:inline">
              {isImageOpen ? 'Plegar' : 'Desplegar'}
            </span>
            {isImageOpen ? (
              <ChevronUp className="w-4 h-4 text-[#FF8F50]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#FF8F50]" />
            )}
          </button>
        </div>

        {isImageOpen ? (
          readingMode === 'simplified' ? (
            <div className="space-y-3.5">
              {/* 1. Fenómeno de las Fuerzas en la Naturaleza */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-[#171722] via-[#151520] to-[#13131C] rounded-xl border border-[#303044] shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#38BDF8] px-2.5 py-1 rounded-md bg-[#38BDF8]/15 border border-[#38BDF8]/30">
                    Interacción Elemental en la Naturaleza
                  </span>
                  <span className="text-xs text-[#9CA3AF] hidden sm:inline">
                    Manifestación viva de las dos fuerzas naturales en el cosmos
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[#F4F4F7] leading-relaxed font-sans">
                  {simplifiedImage.naturalPhenomenon}
                </p>
              </div>

              {/* 2. Dinámica de Energías y Pauta de Conducta Humana */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-3.5 sm:p-4 bg-[#141824] rounded-xl border border-[#38BDF8]/30">
                  <div className="flex items-center gap-1.5 text-[#38BDF8] font-mono font-bold text-xs mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                    <span>Movimiento de las Fuerzas:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E0F2FE] leading-relaxed font-sans">
                    {simplifiedImage.energyDynamics}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 bg-[#1C1814] rounded-xl border border-[#F59E0B]/35">
                  <div className="flex items-center gap-1.5 text-[#F59E0B] font-mono font-bold text-xs mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>Armonización de la Conducta:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#FEF3C7] leading-relaxed font-sans font-medium">
                    {simplifiedImage.practicalAttitude}
                  </p>
                </div>
              </div>

              <details className="mt-2 text-xs text-[#8E8EA0] group cursor-pointer">
                <summary className="hover:text-[#F4F4F6] transition-colors font-mono text-[11px] select-none">
                  Ver texto clásico original de la Imagen (Dà Xiàng) ▾
                </summary>
                <div className="mt-2 p-3 bg-[#0E0E12] rounded-lg border border-[#20202C] text-[#C5C5D2] font-serif text-sm italic leading-relaxed">
                  «{currentHexagram.image}»
                </div>
              </details>
            </div>
          ) : (
            <>
              <p className="font-serif text-base sm:text-lg text-[#E4E4EB] leading-relaxed text-justify mb-4">
                {currentHexagram.image}
              </p>
              <div className="p-3 bg-[#181820] rounded-lg border border-[#2B2B38] text-xs text-[#A8A8B6] leading-relaxed">
                <strong className="text-[#F59E0B]">Enseñanza Moral del Noble:</strong> La Imagen une las dos fuerzas naturales de los trigramas para aconsejarte qué actitud de carácter cultivar en el día a día.
              </div>
            </>
          )
        ) : (
          <div
            onClick={() => setIsImageOpen(true)}
            className="text-xs text-[#A8A8B6] flex items-center justify-between cursor-pointer hover:text-[#F4F4F6] py-1"
          >
            <span className="line-clamp-1 italic text-[#D1D1DC]">
              «{currentHexagram.image}»
            </span>
            <span className="text-[11px] text-[#F59E0B] shrink-0 ml-2 font-mono">Leer completa +</span>
          </div>
        )}
      </section>

      {/* 4.4. Tus Líneas Mutantes (Puntos de Cambio Activo) */}
      {!isViewingDerived && mutatingLinePositions.length > 0 && (
        <section
          aria-label="Líneas mutantes"
          className="w-full bg-[#161311] border border-[#FF6B2B]/50 rounded-xl p-4 sm:p-7 shadow-xl transition-all"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#332219] mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 bg-[#FF6B2B] rounded-full flex items-center justify-center text-[#0A0A0D] text-xs font-bold">
                !
              </span>
              <h4 className="font-serif font-bold text-lg sm:text-xl text-[#F4F4F6] tracking-wide">
                Tus Líneas Mutantes (Puntos de Cambio Activo)
              </h4>
              <InfoButton
                title="Líneas Mutantes (6 y 9)"
                content="Indican los puntos de tensión dinámica donde la situación está cambiando. Al mutar, transforman el hexagrama del presente en el hexagrama derivado del futuro."
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#FF6B2B] font-bold bg-[#FF6B2B]/15 px-2.5 py-1 rounded-full border border-[#FF6B2B]/30">
                {mutatingLinePositions.length} {mutatingLinePositions.length === 1 ? 'Línea activa' : 'Líneas activas'}
              </span>
              <button
                type="button"
                onClick={() => setIsMutationsOpen(!isMutationsOpen)}
                className="p-1.5 rounded-lg bg-[#221A15] hover:bg-[#2F221B] text-[#D1D1DC] border border-[#442D20] transition-colors cursor-pointer flex items-center gap-1 text-xs"
                aria-expanded={isMutationsOpen}
                title={isMutationsOpen ? 'Plegar líneas mutantes' : 'Desplegar líneas mutantes'}
              >
                <span className="text-[11px] text-[#A1A1B0] hidden xs:inline">
                  {isMutationsOpen ? 'Plegar' : 'Desplegar'}
                </span>
                {isMutationsOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#FF8F50]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#FF8F50]" />
                )}
              </button>
            </div>
          </div>

          {isMutationsOpen ? (
            <>
              <p className="text-xs text-[#B5B5C2] mb-4">
                Estas son las líneas que arrojaron 6 o 9 en tu tirada. Representan las áreas de mayor transformación y donde debes prestar más atención:
              </p>

              <div className="space-y-3.5">
                {mutatingLinePositions.map((pos) => {
                  const lineData = lines.find((l) => l.position === pos);
                  const isSelected = selectedLinePos === pos;
                  const lineText = primaryHexagram.lines[pos - 1];
                  const lineImage = primaryHexagram.lineImages?.[pos - 1];
                  const meta = lineData ? getLineMeta(lineData.value) : null;
                  const sLine = getSimplifiedLine(primaryHexagram, pos, lineText, true);

                  return (
                    <div
                      key={pos}
                      onClick={() => setSelectedLinePos(pos)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1F1F2B] border-[#4F4F6B] shadow-md'
                          : 'bg-[#181820] border-[#2E2E3C] hover:border-[#FF6B2B]/50'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#FF6B2B] text-[#0A0A0D] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {pos}
                          </span>
                          <span className="font-bold text-sm text-[#F4F4F6]">
                            {readingMode === 'simplified' ? sLine.stageName : `${meta?.traditionalName} (Valor ${lineData?.value})`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {readingMode === 'simplified' && (
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                sLine.favorableStatus === 'favorable'
                                  ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30'
                                  : sLine.favorableStatus === 'warning'
                                  ? 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/30'
                                  : 'bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/30'
                              }`}
                            >
                              {sLine.favorableStatus === 'favorable' ? 'Favorable' : sLine.favorableStatus === 'warning' ? 'Advertencia' : 'Momento Clave'}
                            </span>
                          )}
                          <span className="text-xs font-mono text-[#F59E0B] font-semibold">
                            {meta?.mutatesTo}
                          </span>
                        </div>
                      </div>

                      {readingMode === 'simplified' ? (
                        <div className="space-y-2">
                          <p className="font-sans text-sm sm:text-base text-white font-medium leading-relaxed">
                            {sLine.directCounsel}
                          </p>

                          <p className="text-xs text-[#B5B5C4] leading-relaxed font-sans">
                            {sLine.positionStage}
                          </p>

                          {sLine.mutatingTransitionNote && (
                            <div className="p-2.5 rounded-lg bg-[#25150F] border border-[#FF6B2B]/35 text-xs text-[#FF8F50] leading-relaxed">
                              <strong>Dirección de cambio:</strong> {sLine.mutatingTransitionNote}
                            </div>
                          )}

                          <details className="mt-1 text-xs text-[#8E8EA0] group">
                            <summary className="cursor-pointer hover:text-white select-none font-mono text-[11px]">
                              Ver texto clásico Wilhelm ▾
                            </summary>
                            <p className="font-serif italic text-xs text-[#C5C5D2] mt-1 bg-[#101014] p-2 rounded">
                              «{lineText}»
                            </p>
                          </details>
                        </div>
                      ) : (
                        <>
                          <p className="font-serif text-base text-[#E2E2EB] leading-relaxed">
                            {lineText}
                          </p>

                          {/* Xiǎo Xiàng Image for Mutating Line */}
                          {lineImage && (
                            <div className="mt-2.5 pt-2 border-t border-[#2F241F] text-xs text-[#C5C5D2] flex items-start gap-1.5 bg-[#120F0D] p-2 rounded-md">
                              <span className="text-[10px] font-mono text-[#F59E0B] font-semibold uppercase shrink-0">
                                Xiǎo Xiàng:
                              </span>
                              <span className="italic text-[#E0D0C5]">{lineImage}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Acceso directo para consultar el Hexagrama Futuro */}
              {derivedHexagram && (
                <div className="mt-5 pt-4 border-t border-[#332219] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-[#C5C5D2]">
                    Al mutar estas líneas se da origen al hexagrama futuro <strong>#{derivedHexagram.number} {derivedHexagram.chinese} ({derivedHexagram.nameEs})</strong>.
                  </span>
                  <button
                    onClick={() => setActiveTab('derived')}
                    className="px-4 py-2 text-xs font-serif font-bold text-[#0A0A0D] bg-[#FF6B2B] hover:bg-[#FF8044] rounded-lg flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-sm"
                  >
                    <span>Ver Hexagrama Derivado</span>
                    <ArrowRightLeft className="w-3.5 h-3.5 text-[#0A0A0D]" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              onClick={() => setIsMutationsOpen(true)}
              className="text-xs text-[#A8A8B6] flex items-center justify-between cursor-pointer hover:text-[#F4F4F6] py-1"
            >
              <span>
                {mutatingLinePositions.length} líneas en mutación ({mutatingLinePositions.map((p) => `Posición ${p}`).join(', ')}).
              </span>
              <span className="text-[11px] text-[#FF6B2B] shrink-0 ml-2 font-mono">
                Desplegar textos de cambio +
              </span>
            </div>
          )}
        </section>
      )}

      {/* Si no hubo líneas mutantes */}
      {!isViewingDerived && mutatingLinePositions.length === 0 && (
        <section
          aria-label="Hexagrama estable"
          className="w-full bg-[#121216] border border-[#272733] rounded-xl p-6 text-center shadow-xl"
        >
          <BookmarkCheck className="w-8 h-8 text-[#10B981] mx-auto mb-2" />
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <h5 className="font-serif font-bold text-base text-[#F4F4F6]">
              Hexagrama Estable (Sin Líneas Mutantes)
            </h5>
            <InfoButton
              title="Hexagrama Estable"
              content="Cuando todas las monedas arrojan valores fijos (7 u 8), no hay mutación. El hexagrama no deriva en otro futuro; la respuesta se concentra exclusivamente en el hexagrama principal."
            />
          </div>
          <p className="text-xs text-[#A1A1B0] max-w-md mx-auto mt-1 leading-relaxed">
            Todas las líneas arrojaron sumas 7 (Yang estable) u 8 (Yin estable). Esto indica una situación en reposo, asentamiento o consolidación, sin transformaciones inminentes hacia otro hexagrama.
          </p>
        </section>
      )}

      {/* 4.5. Comentario Wényán (文言傳 • Sobre las Palabras) para Hexagramas 1 y 2 */}
      {currentHexagram.wenyanCommentary && (
        <section
          aria-label="Comentario Wenyan"
          className="w-full bg-[#151318] border border-[#F59E0B]/50 rounded-xl p-4 sm:p-6 shadow-xl transition-all"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#2C241E] mb-3">
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-[#F59E0B]" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#F4F4F6] tracking-wide">
                Comentario Wényán (文言傳 • Sobre las Palabras)
              </h4>
              <InfoButton
                title="Comentario Wényán (文言傳)"
                content="Doctrina filosófica suprema reservada exclusivamente a los dos hexagramas primordiales (Cielo y Tierra), profundizando en las virtudes éticas cardinales del ser humano sabio."
              />
            </div>

            <button
              type="button"
              onClick={() => setIsWenyanOpen(!isWenyanOpen)}
              className="p-1.5 rounded-lg bg-[#201C18] hover:bg-[#2B2520] text-[#E0D5CC] border border-[#3E3326] transition-colors cursor-pointer flex items-center gap-1 text-xs"
              aria-expanded={isWenyanOpen}
            >
              <span className="text-[11px] text-[#A1A1B0] hidden xs:inline">
                {isWenyanOpen ? 'Plegar' : 'Desplegar'}
              </span>
              {isWenyanOpen ? (
                <ChevronUp className="w-4 h-4 text-[#F59E0B]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#F59E0B]" />
              )}
            </button>
          </div>

          {isWenyanOpen ? (
            <div className="space-y-3 animate-in fade-in duration-150">
              <p className="font-serif text-sm sm:text-base text-[#F3E8DF] leading-relaxed text-justify italic">
                {currentHexagram.wenyanCommentary}
              </p>
              <div className="text-[11px] text-[#A6998E] bg-[#0E0C0A] p-2.5 rounded-lg border border-[#29221C]">
                {currentHexagram.number === 1 ? (
                  <span>
                    • <strong>Las Cuatro Virtudes Cardinales de Lo Creativo:</strong> Benevolencia (Yuán), Conveniencia armónica (Hēng), Justicia recta (Lì) y Perseverancia inquebrantable (Zhēn).
                  </span>
                ) : (
                  <span>
                    • <strong>La Doctrina de Lo Receptivo:</strong> La reverencia interior para enderezar el corazón y la justicia para cuadrar los actos externos, asegurando que la virtud no decaiga jamás.
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsWenyanOpen(true)}
              className="text-xs text-[#A8A8B6] flex items-center justify-between cursor-pointer hover:text-[#F4F4F6] py-1"
            >
              <span className="line-clamp-1 italic text-[#D8C9BC]">
                {currentHexagram.wenyanCommentary}
              </span>
              <span className="text-[11px] text-[#F59E0B] shrink-0 ml-2 font-mono">Leer doctrina +</span>
            </div>
          )}
        </section>
      )}
      {/* 4.6. Las Seis Líneas del Hexagrama (Estructura Completa) */}
      <section
        aria-label="Las seis líneas del hexagrama"
        className="w-full bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-7 shadow-xl transition-all"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#232330] mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#FF6B2B]" />
            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#F4F4F6] tracking-wide">
              Las Seis Líneas del Hexagrama #{currentHexagram.number}
            </h4>
            <InfoButton
              title="Estructura de las Seis Posiciones"
              showAcknowledgeButton={true}
              acknowledgeText="Entendido"
              content={
                <div className="space-y-3 text-xs leading-relaxed text-[#C8C8D6]">
                  <p className="text-[#A1A1B0]">
                    Los hexagramas se leen de abajo hacia arriba (de la línea 1 a la 6), reflejando la evolución temporal y el despliegue natural de cualquier proceso vital:
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-[#111116] border border-[#272738]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[#F59E0B] text-[11px]">
                          Línea 1 (Inicial • 初)
                        </span>
                        <span className="text-[10px] text-[#FF8F50] font-mono">
                          Base / Cimiento
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8A8B6] leading-relaxed">
                        <strong>El Comienzo y la Raíz:</strong> Simboliza la fase germinal, el aprendiz o la fuerza latente. Aconseja prudencia, acumular energía y no precipitarse; la fuerza aún debe consolidarse.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#111116] border border-[#272738]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[#F59E0B] text-[11px]">
                          Línea 2 (Segunda • 二)
                        </span>
                        <span className="text-[10px] text-[#FF8F50] font-mono">
                          Centro Interior
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8A8B6] leading-relaxed">
                        <strong>Equilibrio y Servicio:</strong> Centro del trigrama inferior. Representa la esfera íntima, la templanza, la rectitud ética y el deber sereno. Guarda correspondencia natural armónica con la línea 5.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#111116] border border-[#272738]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[#F59E0B] text-[11px]">
                          Línea 3 (Tercera • 三)
                        </span>
                        <span className="text-[10px] text-[#FF8F50] font-mono">
                          Transición / Umbral
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8A8B6] leading-relaxed">
                        <strong>El Umbral de Tensión:</strong> Límite superior del trigrama interior. Marca el paso de lo privado a lo público. Posición de esfuerzo, inestabilidad y posible soberbia; demanda cautela y vigilancia permanente.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#111116] border border-[#272738]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[#F59E0B] text-[11px]">
                          Línea 4 (Cuarta • 四)
                        </span>
                        <span className="text-[10px] text-[#FF8F50] font-mono">
                          Aproximación / Ministro
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8A8B6] leading-relaxed">
                        <strong>La Esfera Pública y el Consejero:</strong> Base del trigrama superior. Se ubica en contacto directo con el líder (línea 5). Requiere diplomacia, adaptabilidad, lealtad y discreción sin pretender suplantar al soberano.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#111116] border border-[#272738]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[#F59E0B] text-[11px]">
                          Línea 5 (Quinta • 五)
                        </span>
                        <span className="text-[10px] text-[#FF8F50] font-mono">
                          El Soberano / Regente
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8A8B6] leading-relaxed">
                        <strong>La Cúspide del Liderazgo:</strong> Centro del trigrama superior y el lugar más noble del hexagrama. Encarna la madurez, la autoridad benevolente, la justicia y la visión global sobre el conjunto.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#111116] border border-[#272738]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[#F59E0B] text-[11px]">
                          Línea 6 (Superior • 上)
                        </span>
                        <span className="text-[10px] text-[#FF8F50] font-mono">
                          Cima / Retiro
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8A8B6] leading-relaxed">
                        <strong>La Culminación y la Trascendencia:</strong> Fin del hexagrama. En el punto culminante el ciclo concluye y se prepara para transmutar. Advierte contra la soberbia del aislamiento e invita a la sabia retirada y al desapego espiritual.
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#262638] text-[10px] text-[#8E8E9E] space-y-1">
                    <p>
                      • <strong>Los Tres Planos Cósmicos (Sān Cái):</strong> Líneas 1-2 = La Tierra (Dì) • Líneas 3-4 = El Ser Humano (Rén) • Líneas 5-6 = El Cielo (Tiān).
                    </p>
                    <p>
                      • <strong>Lugares Yang/Yin:</strong> Las posiciones impares (1, 3, 5) son por naturaleza activas (Yang); las posiciones pares (2, 4, 6) son por naturaleza receptivas (Yin).
                    </p>
                  </div>
                </div>
              }
            />
          </div>

          <button
            type="button"
            onClick={() => setIsAllLinesOpen(!isAllLinesOpen)}
            className="p-1.5 rounded-lg bg-[#1F1F2A] hover:bg-[#2A2A38] text-[#D1D1DC] border border-[#333345] transition-colors cursor-pointer flex items-center gap-1 text-xs"
            aria-expanded={isAllLinesOpen}
            title={isAllLinesOpen ? 'Plegar líneas' : 'Desplegar líneas'}
          >
            <span className="text-[11px] text-[#A1A1B0] hidden xs:inline">
              {isAllLinesOpen ? 'Plegar' : 'Desplegar'}
            </span>
            {isAllLinesOpen ? (
              <ChevronUp className="w-4 h-4 text-[#FF8F50]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#FF8F50]" />
            )}
          </button>
        </div>

        {isAllLinesOpen && (
          <>
            <p className="text-xs text-[#A1A1B0] mb-3.5">
              {readingMode === 'simplified'
                ? 'Lectura clara de las seis posiciones (de la base a la cima) con su fase evolutiva y consejo:'
                : 'Lectura canónica de las seis posiciones (de la base a la cima) con su correspondiente Imagen Menor (Xiǎo Xiàng):'}
            </p>

            <div className="space-y-2.5">
              {currentHexagram.lines
                .map((text, idx) => ({ text, lineNum: idx + 1 }))
                .map(({ text, lineNum }) => {
                  const isMutatingHere =
                    !isViewingDerived && mutatingLinePositions.includes(lineNum);
                  const isSelected = selectedLinePos === lineNum;
                  const lineImage = currentHexagram.lineImages?.[lineNum - 1];
                  const sLine = getSimplifiedLine(currentHexagram, lineNum, text, isMutatingHere);

                  return (
                    <div
                      key={lineNum}
                      onClick={() => setSelectedLinePos(lineNum)}
                      className={`p-3.5 rounded-xl text-xs sm:text-sm font-sans leading-relaxed transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#20202E] border border-[#4F4F6B] text-[#F4F4F6] shadow-sm'
                          : isMutatingHere
                          ? 'bg-[#191412] border border-[#FF6B2B]/40 text-[#E4E4EC]'
                          : 'bg-[#16161D] border border-[#262633] text-[#A1A1B0] hover:text-[#F4F4F6] hover:bg-[#1C1C24]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono font-bold text-[11px] text-[#F59E0B]">
                          Posición {lineNum}
                        </span>
                        {readingMode === 'simplified' && (
                          <span className="text-[11px] font-serif font-bold text-white">
                            • {sLine.stageName}
                          </span>
                        )}
                        {isMutatingHere && (
                          <span className="bg-[#FF6B2B] text-[#0A0A0D] text-[9px] px-1.5 py-0.2 rounded-md font-sans font-bold">
                            Mutante en tu tirada
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-[10px] text-[#FF8F50] font-sans ml-auto">
                            Seleccionada en el dibujo
                          </span>
                        )}
                      </div>

                      {readingMode === 'simplified' ? (
                        <div className="space-y-1.5">
                          <div className="text-white font-medium text-xs sm:text-sm">
                            {sLine.directCounsel}
                          </div>
                          <div className="text-[11px] text-[#A1A1B0] leading-relaxed">
                            {sLine.positionStage}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="text-[#E6E6EE] font-serif mb-1">{text}</div>
                          {/* Xiǎo Xiàng Image */}
                          {lineImage && (
                            <div className="mt-2 pt-2 border-t border-[#232330] text-xs text-[#A8A8B6] flex items-start gap-1.5 bg-[#0F0F14]/70 p-2 rounded-md font-sans">
                              <span className="text-[10px] font-mono text-[#F59E0B] font-semibold uppercase shrink-0">
                                Xiǎo Xiàng:
                              </span>
                              <span className="italic text-[#D4D4E0]">{lineImage}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Séptima Entrada Canónica tradicional para Hexagramas 1 y 2 (用九 / 用六) */}
            {currentHexagram.canonicalExtra && (
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#1F180F] to-[#16141C] border border-[#F59E0B]/60 shadow-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[#F59E0B] text-[#0A0A0D] uppercase">
                    Séptima Entrada Canónica
                  </span>
                  <span className="text-xs font-mono font-bold text-[#F59E0B]">
                    {currentHexagram.canonicalExtra.title}
                  </span>
                </div>
                <div className="font-mono text-xs text-[#FEF08A] mb-1">
                  {currentHexagram.canonicalExtra.chinese}
                </div>
                <p className="font-serif text-sm sm:text-base text-[#F4F4F6] italic mb-1.5">
                  «{currentHexagram.canonicalExtra.text}»
                </p>
                <p className="text-xs text-[#C8C8D6] leading-relaxed">
                  {currentHexagram.canonicalExtra.meaning}
                </p>
                <div className="mt-2 text-[10px] text-[#A1A1B0] font-mono">
                  * Se aplica cuando los 6 trazos de este hexagrama mutan al unísono ({currentHexagram.number === 1 ? 'seis 9s' : 'seis 6s'}).
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
