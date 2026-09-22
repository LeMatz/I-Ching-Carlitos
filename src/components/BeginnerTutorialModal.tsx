import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Compass,
  Coins,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Eye,
  Lightbulb,
  Play,
} from 'lucide-react';
import { Coin } from './Coin';
import { CoinValue } from '../types';
import { InfoButton } from './InfoButton';

interface BeginnerTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartConsultation?: () => void;
}

export const BeginnerTutorialModal: React.FC<BeginnerTutorialModalProps> = ({
  isOpen,
  onClose,
  onStartConsultation,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever step changes
  useEffect(() => {
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  // Practice toss in step 2
  const [practiceCoins, setPracticeCoins] = useState<[CoinValue, CoinValue, CoinValue]>([3, 2, 3]);
  const [isPracticeFlipping, setIsPracticeFlipping] = useState(false);
  const [practiceCount, setPracticeCount] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      id: 'intro',
      title: '¿Qué es el I Ching?',
      subtitle: 'El Oráculo del Cambio en 60 segundos',
      icon: Compass,
    },
    {
      id: 'question',
      title: 'Cómo hacer tu pregunta',
      subtitle: 'El secreto de una respuesta reveladora',
      icon: HelpCircle,
    },
    {
      id: 'coins',
      title: 'Las 3 Monedas y las Líneas',
      subtitle: 'Cómo se crea un Hexagrama',
      icon: Coins,
    },
    {
      id: 'mutations',
      title: 'Las Líneas Mutantes',
      subtitle: 'El paso del Presente al Futuro',
      icon: Sparkles,
    },
    {
      id: 'reading',
      title: 'Cómo leer tu resultado',
      subtitle: 'Dictamen, Imagen y Consejo Práctico',
      icon: Eye,
    },
  ];

  const handlePracticeToss = () => {
    if (isPracticeFlipping) return;
    setIsPracticeFlipping(true);
    setTimeout(() => {
      const c1: CoinValue = Math.random() < 0.5 ? 3 : 2;
      const c2: CoinValue = Math.random() < 0.5 ? 3 : 2;
      const c3: CoinValue = Math.random() < 0.5 ? 3 : 2;
      setPracticeCoins([c1, c2, c3]);
      setIsPracticeFlipping(false);
      setPracticeCount((prev) => prev + 1);
    }, 800);
  };

  const practiceSum = practiceCoins[0] + practiceCoins[1] + practiceCoins[2];

  const getPracticeDescription = (sum: number) => {
    switch (sum) {
      case 6:
        return {
          type: 'Viejo Yin (6)',
          symbol: '— ✕ —',
          isMutating: true,
          explanation: '¡Línea Mutante! Tres cruces (2+2+2). Muta a una línea continua Yang.',
        };
      case 7:
        return {
          type: 'Joven Yang (7)',
          symbol: '—————',
          isMutating: false,
          explanation: 'Línea sólida fija. Energía de acción, luz y firmeza (2 cruces + 1 cara).',
        };
      case 8:
        return {
          type: 'Joven Yin (8)',
          symbol: '—   —',
          isMutating: false,
          explanation: 'Línea partida fija. Energía receptiva, escucha y calma (1 cruz + 2 caras).',
        };
      case 9:
        return {
          type: 'Viejo Yang (9)',
          symbol: '— ○ —',
          isMutating: true,
          explanation: '¡Línea Mutante! Tres caras (3+3+3). Muta a una línea partida Yin.',
        };
      default:
        return { type: '', symbol: '', isMutating: false, explanation: '' };
    }
  };

  const practiceDesc = getPracticeDescription(practiceSum);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-[#111115] border border-[#2D2D38] rounded-xl shadow-2xl p-4 sm:p-7 max-h-[92vh] flex flex-col text-[#F4F4F6] relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#24242F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF6B2B]/20 border border-[#FF6B2B]/40 flex items-center justify-center text-[#FF6B2B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 id="tutorial-title" className="font-serif font-bold text-lg sm:text-xl text-[#F4F4F6]">
                  Guía Rápida para Principiantes
                </h3>
                <InfoButton
                  title="Tutorial I Ching"
                  content="Este tutorial interactivo te enseña en 5 sencillos pasos los fundamentos: cómo formular una pregunta clara, qué significan las monedas y cómo leer el consejo de tu hexagrama."
                />
              </div>
              <p className="text-xs text-[#9E9EAA]">
                Paso {currentStep + 1} de {steps.length}: {steps[currentStep].title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9E9EAA] hover:text-[#F4F4F6] hover:bg-[#1E1E26] rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-5 gap-1.5 my-4">
          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isDone = idx < currentStep;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6B2B]'
                    : isDone
                    ? 'bg-[#F59E0B]'
                    : 'bg-[#22222B] hover:bg-[#2F2F3D]'
                }`}
                title={`Ir al paso ${idx + 1}: ${step.title}`}
              />
            );
          })}
        </div>

        {/* Main Step Content Area */}
        <div
          ref={scrollContentRef}
          className="flex-1 overflow-y-auto py-2 pr-1 space-y-4 font-sans text-sm text-[#D4D4DC] leading-relaxed"
        >
          {/* STEP 0: ¿Qué es el I Ching? */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#181820] border border-[#2B2B38] flex items-start gap-3">
                <div className="p-2 rounded-md bg-[#FF6B2B]/10 text-[#FF6B2B] shrink-0 mt-0.5">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#F4F4F6] text-base mb-1">
                    No es adivinación fatalista, es un espejo sabio
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A8A8B6]">
                    El <strong className="text-[#FF6B2B]">I Ching</strong> (Libro de las Mutaciones) tiene más de 3.000 años de antigüedad. No te dice un destino inamovible, sino que analiza la <span className="text-[#F59E0B]">energía de tu presente</span> y te sugiere cuál es la actitud más sabia a tomar.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-lg bg-[#15151B] border border-[#272733]">
                  <div className="flex items-center gap-2 text-[#FF6B2B] font-bold text-xs uppercase tracking-wider mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B2B]" />
                    ¿Cómo te ayuda?
                  </div>
                  <ul className="text-xs text-[#A8A8B6] space-y-1.5 list-disc list-inside">
                    <li>Aclara dudas en momentos de incertidumbre.</li>
                    <li>Muestra puntos ciegos que no estás viendo.</li>
                    <li>Orienta tus decisiones hacia la serenidad.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-[#15151B] border border-[#272733]">
                  <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-xs uppercase tracking-wider mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    Concepto clave: Los 64 Hexagramas
                  </div>
                  <p className="text-xs text-[#A8A8B6]">
                    Un <strong>hexagrama</strong> es una figura de 6 líneas superpuestas. Cada una de las 64 figuras representa un arquetipo o situación de la vida humana.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#1C1C24] border border-[#FF6B2B]/30 flex items-center gap-2.5 text-xs text-[#F4F4F6]">
                <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>
                  <strong>Tip de inicio:</strong> No necesitas memorizar nada. La aplicación te guiará y traducirá cada símbolo paso a paso.
                </span>
              </div>
            </div>
          )}

          {/* STEP 1: Cómo formular tu pregunta */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#A8A8B6]">
                La calidad de la respuesta depende de la intención con la que preguntas. Respira hondo y enfoca tu mente.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/40">
                  <div className="flex items-center gap-2 text-red-400 font-semibold text-xs mb-1">
                    <span>✕</span> Evita preguntas cerradas de sí o no:
                  </div>
                  <p className="text-xs text-[#9E9EAA] italic">
                    «¿Me darán el trabajo mañana?» o «¿Me va a llamar mi ex?»
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Prefiere preguntas reflexivas y de acción:
                  </div>
                  <ul className="text-xs text-[#C5C5D2] space-y-1">
                    <li>• «¿Qué actitud me conviene cultivar en mi trabajo actual?»</li>
                    <li>• «¿Cómo debo proceder respecto a esta decisión?»</li>
                    <li>• «¿Qué dinámicas ocultas rodean mi situación personal?»</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#181820] border border-[#2B2B38] text-xs text-[#A8A8B6]">
                <strong className="text-[#F59E0B] block mb-1">¿Y si no tengo una pregunta concreta?</strong>
                Puedes dejar el campo de texto vacío y pulsar directamente «Proceder a la Tirada». El I Ching interpretará el estado actual de tu momento presente.
              </div>
            </div>
          )}

          {/* STEP 2: Las 3 Monedas */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#A8A8B6]">
                Para construir un hexagrama se lanzan <strong className="text-[#F4F4F6]">3 monedas</strong> un total de <strong className="text-[#FF6B2B]">6 veces</strong>. Cada tirada genera una línea, <strong className="text-[#F59E0B]">comenzando por la base (línea 1) y subiendo hasta la cima (línea 6)</strong>.
              </p>

              {/* Coin values display */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#181820] border border-[#2C2C3A] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF8F50] to-[#C94D18] flex items-center justify-center font-bold text-white font-mono shadow-sm">
                    3
                  </div>
                  <div>
                    <strong className="text-[#F4F4F6] block">Cara = 3 (Yang)</strong>
                    <span className="text-[#9E9EAA] text-[11px]">Principio solar, activo y firme</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#181820] border border-[#2C2C3A] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A4A57] to-[#252530] border border-[#5A5A6D] flex items-center justify-center font-bold text-white font-mono shadow-sm">
                    2
                  </div>
                  <div>
                    <strong className="text-[#F4F4F6] block">Cruz = 2 (Yin)</strong>
                    <span className="text-[#9E9EAA] text-[11px]">Principio lunar, receptivo y flexible</span>
                  </div>
                </div>
              </div>

              {/* Interactive Practice Toss */}
              <div className="p-4 rounded-lg bg-[#16161D] border border-[#FF6B2B]/30 flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-3 text-xs">
                  <span className="font-bold text-[#FF6B2B] flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" /> Pruébalo aquí mismo (Tirada de práctica):
                  </span>
                  <span className="text-[11px] text-[#9E9EAA]">
                    {practiceCount > 0 ? `Lanzamiento #${practiceCount}` : 'Toca el botón'}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-6 py-2">
                  <Coin value={practiceCoins[0]} isFlipping={isPracticeFlipping} size="sm" delay={0} />
                  <Coin value={practiceCoins[1]} isFlipping={isPracticeFlipping} size="sm" delay={0.1} />
                  <Coin value={practiceCoins[2]} isFlipping={isPracticeFlipping} size="sm" delay={0.2} />
                </div>

                <div className="w-full mt-3 pt-3 border-t border-[#262633] flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="text-xs text-center sm:text-left">
                    <span className="font-mono text-[#F59E0B] font-bold">
                      Suma: {practiceCoins[0]}+{practiceCoins[1]}+{practiceCoins[2]} = {practiceSum}
                    </span>
                    <span className="mx-2 text-[#5A5A6E]">•</span>
                    <strong className="text-[#F4F4F6]">{practiceDesc.type}</strong>
                    <p className="text-[11px] text-[#A8A8B6] mt-0.5">{practiceDesc.explanation}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handlePracticeToss}
                    disabled={isPracticeFlipping}
                    className="px-3 py-1.5 bg-[#FF6B2B] hover:bg-[#FF8248] text-[#0A0A0D] font-bold text-xs rounded-md flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    <span>Lanzar Monedas</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Líneas Mutantes */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-[#181820] border border-[#2C2C3A]">
                <h4 className="font-bold text-[#F4F4F6] text-sm mb-1.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B2B]" />
                  ¿Por qué se llama Libro de las "Mutaciones"?
                </h4>
                <p className="text-xs text-[#A8A8B6]">
                  La vida nunca es estática. Cuando una energía llega a su límite máximo, empieza a convertirse en su contrario.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#16161D] border border-[#2B2B38]">
                  <span className="text-[#9E9EAA] uppercase text-[10px] font-mono block">Suma 7 u 8</span>
                  <strong className="text-[#F4F4F6] block text-sm my-0.5">Líneas Estables</strong>
                  <p className="text-[#A8A8B6] text-xs">
                    Son situaciones firmes o tranquilas que no van a cambiar inmediatamente.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#1E1614] border border-[#FF6B2B]/40">
                  <span className="text-[#FF6B2B] uppercase text-[10px] font-mono font-bold block">Suma 6 o 9</span>
                  <strong className="text-[#FF6B2B] block text-sm my-0.5">Líneas Mutantes (Activas)</strong>
                  <p className="text-[#A8A8B6] text-xs">
                    ¡Puntos de máxima tensión! Señalan dónde está ocurriendo la transformación en tu vida.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#141419] border border-[#2A2A38] space-y-2 text-xs">
                <div className="font-bold text-[#F59E0B] flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Los dos Hexagramas resultantes:
                </div>
                <p className="text-[#A8A8B6]">
                  Si tu tirada tiene al menos una línea mutante, obtendrás:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2 rounded bg-[#1C1C24] border border-[#2E2E3C]">
                    <strong className="text-[#F4F4F6] block">1. Hexagrama Principal</strong>
                    <span>Describe tu situación presente.</span>
                  </div>
                  <div className="p-2 rounded bg-[#1C1C24] border border-[#FF6B2B]/30">
                    <strong className="text-[#FF6B2B] block">2. Hexagrama Derivado</strong>
                    <span>Hacia dónde evoluciona o el desenlace probable.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Cómo leer tu resultado */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#A8A8B6]">
                Cuando termine tu tirada verás la pantalla de lectura. Para no abrumarte, sigue este orden:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-[#181820] border border-[#2C2C3A] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FF6B2B] text-[#0A0A0D] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-[#F4F4F6] text-sm block">El Dictamen (El Juicio)</strong>
                    <p className="text-[#A8A8B6] mt-0.5">
                      Es el consejo central. Te dice si el momento es propicio para avanzar, esperar, cruzar las grandes aguas o mantener la perseverancia.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#181820] border border-[#2C2C3A] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-[#0A0A0D] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-[#F4F4F6] text-sm block">La Imagen (La Naturaleza)</strong>
                    <p className="text-[#A8A8B6] mt-0.5">
                      Combina dos elementos de la naturaleza (cielo, tierra, agua, fuego, montaña, trueno, viento, lago) para inspirarte una actitud noble y madura.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#181820] border border-[#2C2C3A] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#2DD4BF] text-[#0A0A0D] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-[#F4F4F6] text-sm block">Tus Líneas Mutantes</strong>
                    <p className="text-[#A8A8B6] mt-0.5">
                      Si salieron líneas mutantes, léelas con atención prioritaria: son advertencias personalizadas para el momento exacto en que te encuentras.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#1E1712] border border-[#FF6B2B]/40 text-center text-xs text-[#FFC49E]">
                ¡Ya tienes todo lo necesario para tu primera consulta con serenidad y claridad!
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="pt-4 mt-2 border-t border-[#24242F] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-3.5 py-2 text-xs font-semibold text-[#A8A8B6] hover:text-[#F4F4F6] disabled:opacity-30 disabled:hover:text-[#A8A8B6] rounded-lg border border-[#2B2B38] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-5 py-2 bg-[#FF6B2B] hover:bg-[#FF7E40] text-[#0A0A0D] font-bold text-xs sm:text-sm rounded-lg flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onStartConsultation) onStartConsultation();
                }}
                className="px-5 py-2 bg-gradient-to-r from-[#FF6B2B] to-[#F59E0B] hover:brightness-110 text-[#0A0A0D] font-bold text-xs sm:text-sm rounded-lg flex items-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <span>¡Entendido! Comenzar Consulta</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
