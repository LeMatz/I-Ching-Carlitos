import React, { useState } from 'react';
import { HexagramDrawing } from './HexagramDrawing';
import { TrigramCalligraphy } from './TrigramCalligraphy';
import { HexagramData, HexagramLine } from '../types';
import { TRIGRAMS } from '../data/trigrams';
import { getRecommendedAttitude } from '../data/attitudes';
import { getLineMeta } from '../logic/iching';
import { InfoButton } from './InfoButton';
import {
  RotateCcw,
  ArrowRightLeft,
  BookmarkCheck,
  BookOpen,
  Info,
  Lightbulb,
  Compass,
  Sparkles,
  ChevronDown,
  ChevronUp,
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

  // Collapsible dropdown states for results view
  const [isQuickSummaryOpen, setIsQuickSummaryOpen] = useState(false);
  const [isTrigramsOpen, setIsTrigramsOpen] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(true);
  const [isMutationsOpen, setIsMutationsOpen] = useState(true);

  const isViewingDerived = Boolean(activeTab === 'derived' && derivedHexagram);
  const currentHexagram = isViewingDerived && derivedHexagram ? derivedHexagram : primaryHexagram;

  // Trigrams
  const upperTrigramInfo = TRIGRAMS[currentHexagram.upperTrigram] || TRIGRAMS['Cielo'];
  const lowerTrigramInfo = TRIGRAMS[currentHexagram.lowerTrigram] || TRIGRAMS['Cielo'];

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
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Top Banner (Question and Context) */}
      <div className="w-full bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF6B2B] font-bold block">
              Consulta Formulada
            </span>
            <InfoButton
              title="Tu Consulta"
              content="El hexagrama principal refleja la configuración energética de la situación planteada en este momento."
            />
          </div>
          <p className="font-serif text-lg text-[#F4F4F6] font-medium mt-0.5">
            {question ? `«${question}»` : 'Consulta abierta del momento presente'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={onNewConsultation}
            className="px-4 py-2 text-xs font-serif font-bold bg-[#FF6B2B] hover:bg-[#FF8044] text-[#0A0A0D] rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-[#FF6B2B]/20 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#0A0A0D]" />
            <span>Nueva Consulta</span>
          </button>
        </div>
      </div>

      {/* Beginner-Friendly Quick Summary Guide (Collapsible Dropdown Card) */}
      <div className="w-full bg-gradient-to-r from-[#171411] via-[#14141A] to-[#121216] border border-[#FF6B2B]/40 rounded-xl p-4 sm:p-5 shadow-lg transition-all">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#FF6B2B]/20 text-[#FF6B2B]">
              <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <h4 className="font-bold text-sm text-[#F4F4F6] tracking-wide">
              Interpretación Rápida para Principiantes
            </h4>
            <InfoButton
              title="Resumen Esencial"
              content="Sintetiza en tres claves comprensibles: el estado del presente, la actitud interior sugerida y el horizonte hacia donde fluye la situación."
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-0.5 rounded-full font-mono font-semibold">
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
            <span className="text-[11px] text-[#F59E0B] shrink-0 ml-2 font-mono">Toca para ver +</span>
          </div>
        )}
      </div>

      {/* Hexagram Switch Tabs (if mutating lines exist) */}
      {derivedHexagram && (
        <div className="w-full bg-[#16161D] p-1.5 rounded-xl border border-[#272733] flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('primary')}
            className={`w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg font-serif text-xs sm:text-sm font-bold flex items-center justify-between sm:justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'primary'
                ? 'bg-[#FF6B2B] text-[#0A0A0D] shadow-md shadow-[#FF6B2B]/20'
                : 'text-[#A1A1B0] hover:text-[#F4F4F6] hover:bg-[#1E1E28]'
            }`}
          >
            <span className="truncate">Presente: #{primaryHexagram.number} {primaryHexagram.chinese} ({primaryHexagram.nameEs})</span>
            {mutatingLinePositions.length > 0 && (
              <span className={`text-[10px] font-sans px-1.5 py-0.5 rounded-md shrink-0 ${
                activeTab === 'primary' ? 'bg-[#0A0A0D] text-[#FF6B2B]' : 'bg-[#FF6B2B] text-[#0A0A0D]'
              }`}>
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
            <span className="truncate">Futuro: #{derivedHexagram.number} {derivedHexagram.chinese} ({derivedHexagram.nameEs})</span>
            <span className={`text-xs shrink-0 ${activeTab === 'derived' ? 'text-[#0A0A0D]' : 'text-[#F59E0B]'}`}>
              Tendencia
            </span>
          </button>

          <div className="flex items-center justify-center shrink-0 px-1.5 py-0.5 sm:py-0">
            <InfoButton
              title="Hexagrama Presente y Futuro (Tendencia)"
              content="El Hexagrama Presente refleja tu situación actual. Las líneas mutantes (6 o 9) se transforman en sus polaridades opuestas para dar lugar al Hexagrama Futuro, indicando la tendencia natural hacia la cual evoluciona la situación."
            />
          </div>
        </div>
      )}

      {/* Main Hexagram Reading Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Hexagram Drawing & Trigram Architecture */}
        <div className="lg:col-span-4 bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-6 flex flex-col items-center shadow-xl">
          {/* Hexagram Seal & Number */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#232330] mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl font-chinese font-bold text-[#FF6B2B] drop-shadow-[0_0_8px_rgba(255,107,43,0.3)]">
                {currentHexagram.chinese}
              </span>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-mono font-semibold text-[#F59E0B] block">
                    Hexagrama #{currentHexagram.number}
                  </span>
                  <InfoButton
                    title={`Hexagrama #${currentHexagram.number}`}
                    content={`Representa la energía arquetípica de «${currentHexagram.nameEs}». Ordenado según la secuencia legendaria del Rey Wen.`}
                  />
                </div>
                <span className="text-xs text-[#A1A1B0] font-medium">
                  {currentHexagram.pinyin}
                </span>
              </div>
            </div>

            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#1C1C26] text-[#FF8F50] rounded-md border border-[#333345]">
              {isViewingDerived ? 'Futuro / Tendencia' : 'Presente / Principal'}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#F4F4F6] text-center mb-1">
            {currentHexagram.nameEs}
          </h3>
          <p className="italic text-xs text-[#A1A1B0] text-center mb-5">
            {currentHexagram.characterMeaning}
          </p>

          {/* Graphical representation */}
          <HexagramDrawing
            lines={isViewingDerived ? derivedLines : lines}
            highlightLinePosition={selectedLinePos}
            onSelectLine={(pos) => setSelectedLinePos(pos)}
            size="md"
            isDerived={isViewingDerived}
            hexagramNumber={currentHexagram.number}
            hexagramName={currentHexagram.nameEs}
            lineMeanings={currentHexagram.lines}
            mutatingLinePositions={!isViewingDerived ? mutatingLinePositions : []}
          />

          {/* Hint to click lines */}
          <p className="text-[11px] text-[#A1A1B0] mt-3 flex items-center gap-1.5 text-center">
            <Info className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
            Toca cualquier línea del dibujo para abrir su significado en una ventana flotante
          </p>

          {/* Trigrams Anatomy Card (Collapsible Dropdown Menu) */}
          <div className="w-full mt-6 pt-4 border-t border-[#232330]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1B0]">
                  Estructura de Trigramas
                </span>
                <InfoButton
                  title="Estructura de Trigramas"
                  content="El trigrama superior representa el macrocosmos y el entorno exterior; el inferior representa el microcosmos y el mundo interno."
                />
              </div>

              <button
                type="button"
                onClick={() => setIsTrigramsOpen(!isTrigramsOpen)}
                className="p-1.5 rounded-md bg-[#1C1C26] hover:bg-[#282836] text-[#D1D1DC] border border-[#333345] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                aria-expanded={isTrigramsOpen}
                title={isTrigramsOpen ? 'Plegar trigramas' : 'Desplegar trigramas'}
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

            {isTrigramsOpen ? (
              <div className="space-y-3">
                {/* Upper Trigram */}
                <div className="p-3 bg-[#181820] rounded-lg border border-[#2B2B38] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A1A1B0] uppercase font-mono block">
                      Trigrama Superior (Exterior)
                    </span>
                    <div className="text-sm font-bold text-[#F4F4F6] flex items-center gap-1.5">
                      <span className="font-chinese text-base text-[#FF6B2B]">{upperTrigramInfo.chinese}</span>
                      <span>{upperTrigramInfo.name} ({upperTrigramInfo.pinyin})</span>
                    </div>
                    <span className="text-xs text-[#A1A1B0] block">{upperTrigramInfo.nature}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-[#121217] rounded-md border border-[#272733] shadow-xs" title={`Trigrama ${upperTrigramInfo.name} en pinceladas`}>
                      <TrigramCalligraphy lines={upperTrigramInfo.lines} size="md" />
                    </div>
                    <span className="text-2xl font-serif text-[#F59E0B]">{upperTrigramInfo.symbol}</span>
                  </div>
                </div>

                {/* Lower Trigram */}
                <div className="p-3 bg-[#181820] rounded-lg border border-[#2B2B38] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A1A1B0] uppercase font-mono block">
                      Trigrama Inferior (Interior)
                    </span>
                    <div className="text-sm font-bold text-[#F4F4F6] flex items-center gap-1.5">
                      <span className="font-chinese text-base text-[#FF6B2B]">{lowerTrigramInfo.chinese}</span>
                      <span>{lowerTrigramInfo.name} ({lowerTrigramInfo.pinyin})</span>
                    </div>
                    <span className="text-xs text-[#A1A1B0] block">{lowerTrigramInfo.nature}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-[#121217] rounded-md border border-[#272733] shadow-xs" title={`Trigrama ${lowerTrigramInfo.name} en pinceladas`}>
                      <TrigramCalligraphy lines={lowerTrigramInfo.lines} size="md" />
                    </div>
                    <span className="text-2xl font-serif text-[#F59E0B]">{lowerTrigramInfo.symbol}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsTrigramsOpen(true)}
                className="p-2.5 bg-[#181820] rounded-lg border border-[#2B2B38] text-xs text-[#C5C5D2] flex items-center justify-between cursor-pointer hover:border-[#FF6B2B]/40 transition-colors"
              >
                <span>
                  {upperTrigramInfo.symbol} {upperTrigramInfo.name} sobre {lowerTrigramInfo.symbol} {lowerTrigramInfo.name}
                </span>
                <span className="text-[10px] text-[#F59E0B] font-mono">Desplegar +</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Texts (El Juicio, Imagen, Líneas Mutantes, Seis Líneas) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* El Juicio */}
          <div className="bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-7 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-[#232330] mb-4">
              <span className="w-2.5 h-2.5 bg-[#FF6B2B] rounded-full shadow-[0_0_6px_#FF6B2B]" />
              <h4 className="font-serif font-bold text-lg text-[#F4F4F6] tracking-wide">
                El Juicio (Tuàn • 彖傳)
              </h4>
              <InfoButton
                title="El Juicio (Tuàn • 彖傳)"
                content="Atribuido al Rey Wen, define la cualidad intrínseca del momento y orienta sobre si conviene emprender acciones audaces, aguardar o perseverar en la rectitud."
              />
            </div>

            <p className="font-serif text-base sm:text-lg text-[#E4E4EB] leading-relaxed text-justify mb-4">
              {currentHexagram.judgment}
            </p>

            <div className="p-3 bg-[#181820] rounded-lg border border-[#2B2B38] text-xs text-[#A8A8B6] leading-relaxed">
              <strong className="text-[#F59E0B]">¿Cómo interpretarlo?</strong> El Juicio define la situación general y la disposición interna con la que debes abordar tu pregunta para actuar con sabiduría.
            </div>
          </div>

          {/* La Imagen (Xiàng • 象傳) - Menú desplegable */}
          <div className="bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-7 shadow-xl transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-[#232330] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-full" />
                <h4 className="font-serif font-bold text-lg text-[#F4F4F6] tracking-wide">
                  La Imagen (Xiàng • 象傳)
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
              <>
                <p className="font-serif text-base sm:text-lg text-[#E4E4EB] leading-relaxed text-justify mb-4">
                  {currentHexagram.image}
                </p>

                <div className="p-3 bg-[#181820] rounded-lg border border-[#2B2B38] text-xs text-[#A8A8B6] leading-relaxed">
                  <strong className="text-[#F59E0B]">Enseñanza Moral del Noble:</strong> La Imagen une las dos fuerzas naturales de los trigramas para aconsejarte qué actitud de carácter cultivar en el día a día.
                </div>
              </>
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
          </div>

          {/* Mutating Lines Section (Collapsible Dropdown Card) */}
          {!isViewingDerived && mutatingLinePositions.length > 0 && (
            <div className="bg-[#161311] border border-[#FF6B2B]/50 rounded-xl p-4 sm:p-7 shadow-xl transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#332219] mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-[#FF6B2B] rounded-full flex items-center justify-center text-[#0A0A0D] text-xs font-bold">
                    !
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#F4F4F6] tracking-wide">
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
                      const meta = lineData ? getLineMeta(lineData.value) : null;

                      return (
                        <div
                          key={pos}
                          onClick={() => setSelectedLinePos(pos)}
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1F1713] border-[#FF6B2B] shadow-[0_0_12px_rgba(255,107,43,0.2)] ring-1 ring-[#FF6B2B]'
                              : 'bg-[#181820] border-[#2E2E3C] hover:border-[#FF6B2B]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#FF6B2B] text-[#0A0A0D] font-mono text-xs font-bold flex items-center justify-center">
                                {pos}
                              </span>
                              <span className="font-bold text-sm text-[#F4F4F6]">
                                {meta?.traditionalName} (Valor {lineData?.value})
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#F59E0B] font-semibold">
                              {meta?.mutatesTo}
                            </span>
                          </div>

                          <p className="font-serif text-base text-[#E2E2EB] leading-relaxed">
                            {lineText}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Call to action to inspect secondary hexagram */}
                  {derivedHexagram && (
                    <div className="mt-5 pt-4 border-t border-[#332219] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-[#C5C5D2]">
                        Al mutar estas líneas se da origen al hexagrama futuro <strong>#{derivedHexagram.number} {derivedHexagram.chinese} ({derivedHexagram.nameEs})</strong>.
                      </span>
                      <button
                        onClick={() => setActiveTab('derived')}
                        className="px-4 py-2 text-xs font-serif font-bold text-[#0A0A0D] bg-[#FF6B2B] hover:bg-[#FF8044] rounded-lg flex items-center gap-2 transition-colors cursor-pointer shrink-0"
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
            </div>
          )}

          {/* If no mutating lines */}
          {!isViewingDerived && mutatingLinePositions.length === 0 && (
            <div className="bg-[#121216] border border-[#272733] rounded-xl p-6 text-center shadow-xl">
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
            </div>
          )}

          {/* All lines exploration section with interactive line filter */}
          <div className="bg-[#121216] border border-[#272733] rounded-xl p-4 sm:p-6 shadow-xl transition-all">
            <div className="flex items-center gap-2 pb-3 border-b border-[#232330] mb-4">
              <BookOpen className="w-4 h-4 text-[#FF6B2B]" />
              <h4 className="font-serif font-bold text-base text-[#F4F4F6] tracking-wide">
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

            <p className="text-xs text-[#A1A1B0] mb-3">
              Lectura completa de las seis posiciones (de la base a la cima):
            </p>

            <div className="space-y-2">
              {currentHexagram.lines
                .map((text, idx) => ({ text, lineNum: idx + 1 }))
                .map(({ text, lineNum }) => {
                  const isMutatingHere =
                    !isViewingDerived && mutatingLinePositions.includes(lineNum);
                  const isSelected = selectedLinePos === lineNum;

                  return (
                    <div
                      key={lineNum}
                      onClick={() => setSelectedLinePos(lineNum)}
                      className={`p-3.5 rounded-lg text-xs sm:text-sm font-serif leading-relaxed transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1E1915] border border-[#FF6B2B] text-[#F4F4F6]'
                          : isMutatingHere
                          ? 'bg-[#191412] border border-[#FF6B2B]/40 text-[#E4E4EC]'
                          : 'bg-[#16161D] border border-[#262633] text-[#A1A1B0] hover:text-[#F4F4F6] hover:bg-[#1C1C24]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono font-bold text-[11px] text-[#F59E0B]">
                          Posición {lineNum}
                        </span>
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
                      <div>{text}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
