import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Compass,
  HelpCircle,
  Briefcase,
  HeartHandshake,
  Leaf,
  Quote,
  CornerDownLeft,
  Check,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { InfoButton } from './InfoButton';

interface ConsultationInputProps {
  onStartCasting: (question?: string) => void;
  onOpenGuide: () => void;
  onOpenTutorial: () => void;
}

export const ConsultationInput: React.FC<ConsultationInputProps> = ({
  onStartCasting,
  onOpenGuide,
  onOpenTutorial,
}) => {
  const [question, setQuestion] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<'decision' | 'relaciones' | 'personal' | 'general' | null>(null);

  const categories = {
    decision: {
      label: 'Decisiones & Proyectos',
      icon: Briefcase,
      badge: 'Estrategia',
      questions: [
        {
          text: '¿Cómo proceder respecto a este nuevo proyecto o decisión?',
          tag: 'Dirección de acción',
          context: 'Ideal para evaluar el momento oportuno antes de comprometer recursos.',
        },
        {
          text: '¿Qué factores invisibles o riesgos debo considerar antes de dar el paso?',
          tag: 'Factores ocultos',
          context: 'Ayuda a percibir dinámicas del entorno que no son evidentes a primera vista.',
        },
        {
          text: '¿Es momento de actuar con firmeza o de aguardar con paciencia?',
          tag: 'Tiempo y ritmo',
          context: 'Discernimiento entre avance resuelto (Yang) o receptividad paciente (Yin).',
        },
      ],
    },
    relaciones: {
      label: 'Vínculos & Relaciones',
      icon: HeartHandshake,
      badge: 'Armonía',
      questions: [
        {
          text: '¿Qué actitud debo cultivar en mi relación con esta persona?',
          tag: 'Postura noble',
          context: 'Fomenta la introspección para actuar con serenidad y justicia hacia el otro.',
        },
        {
          text: '¿Cómo resolver esta tensión con serenidad y equilibrio?',
          tag: 'Resolución de conflictos',
          context: 'Busca la vía media para disolver asperezas sin agresividad.',
        },
        {
          text: '¿Hacia dónde se orienta la energía y el futuro de este vínculo?',
          tag: 'Evolución del vínculo',
          context: 'Comprende la tendencia natural de la relación según el cambio en curso.',
        },
      ],
    },
    personal: {
      label: 'Crecimiento Personal',
      icon: Leaf,
      badge: 'Claridad',
      questions: [
        {
          text: '¿Qué actitud interna necesito cultivar para superar esta etapa?',
          tag: 'Fortaleza interior',
          context: 'Para armonizar tus pensamientos y emociones frente a la incertidumbre.',
        },
        {
          text: '¿Qué aprendizaje esencial me está ofreciendo la dificultad actual?',
          tag: 'Sabiduría en la prueba',
          context: 'Enfoca los obstáculos como oportunidades de maduración del carácter.',
        },
        {
          text: '¿Cómo recuperar mi serenidad, discernimiento y centro interior?',
          tag: 'Re-centramiento',
          context: 'Consejo para apaciguar el ruido mental y volver a la calma.',
        },
      ],
    },
    general: {
      label: 'Momento Presente',
      icon: Compass,
      badge: 'El Tao actual',
      questions: [
        {
          text: 'Consulta abierta: comprender la dinámica y el sentido oculto del presente',
          tag: 'Lectura general',
          context: 'Una mirada panorámica cuando deseas orientación general sin preguntas cerradas.',
        },
        {
          text: '¿Hacia dónde se orienta el flujo natural del cambio en este momento?',
          tag: 'Flujo del cambio',
          context: 'Identifica hacia qué hexagrama de destino tiende la situación presente.',
        },
        {
          text: '¿Cuál es la enseñanza principal que debo integrar en este día?',
          tag: 'Enseñanza del día',
          context: 'Orientación moral y espiritual para conducir el día con sabiduría.',
        },
      ],
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartCasting(question.trim() ? question.trim() : undefined);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Inquiry Form Card */}
      <div className="w-full max-w-full relative overflow-hidden bg-gradient-to-b from-[#14141B] via-[#111116] to-[#0D0D12] border border-[#2B2B3C] rounded-2xl p-5 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        {/* Subtle top amber hairline rim light */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF6B2B]/40 to-transparent pointer-events-none" />

        {/* Ambient subtle calligraphy watermark in the background */}
        <div
          className="absolute -top-6 -right-3 text-[140px] font-chinese text-[#FF6B2B]/[0.025] select-none pointer-events-none leading-none font-bold"
          aria-hidden="true"
        >
          易
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="consultation-question"
                  className="block text-xs uppercase tracking-widest font-mono font-medium text-[#C5A593]"
                >
                  Tu Consulta o Intención
                </label>
                <InfoButton
                  title="Cómo preguntar"
                  content="Es mejor formular preguntas reflexivas como '¿Qué actitud debo tomar?' o '¿Cómo proceder ante esta situación?', en vez de preguntas rígidas de sí o no."
                />
              </div>

              <button
                type="button"
                onClick={onOpenGuide}
                className="text-xs text-[#8E8E9E] hover:text-[#FF8F50] flex items-center gap-1.5 font-sans transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Método 3 Monedas</span>
              </button>
            </div>

            <div className="relative group">
              <textarea
                id="consultation-question"
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Formula tu pregunta con tranquilidad y apertura..."
                className="w-full px-4 py-3.5 bg-[#09090D] border border-[#272737] hover:border-[#38384D] rounded-xl text-[#F4F4F6] font-serif text-sm sm:text-[15px] leading-relaxed focus:outline-hidden focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]/30 transition-all resize-none placeholder:text-[#5E5E6E] placeholder:font-sans"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-[#717185] mt-1.5 px-0.5">
                <span>Intención sincera y receptiva</span>
                {question.length > 0 && <span>{question.length} caracteres</span>}
              </div>
            </div>
          </div>

          {/* Categorized Question Suggestions for Autocomplete */}
          <div className="space-y-3 pt-0.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1B2] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Sugerencias de Consulta:</span>
                </span>
                <InfoButton
                  title="Preguntas sugeridas"
                  content="Si no sabes qué preguntar, selecciona un ámbito y pulsa una sugerencia para autocompletar tu consulta. También puedes dejarla vacía para una tirada abierta del presente."
                />
              </div>
              <div className="flex items-center gap-2">
                {question && (
                  <button
                    type="button"
                    onClick={() => setQuestion('')}
                    className="text-[11px] text-[#8E8EA0] hover:text-[#FF8F50] flex items-center gap-1 transition-colors cursor-pointer"
                    title="Borrar texto actual"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Limpiar</span>
                  </button>
                )}
                <span className="text-[11px] text-[#F59E0B] font-mono">Toca para autocompletar</span>
              </div>
            </div>

            {/* Category tabs (click to expand or fold) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(categories) as (keyof typeof categories)[]).map((catKey) => {
                const cat = categories[catKey];
                const Icon = cat.icon;
                const isExpanded = expandedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setExpandedCategory((prev) => (prev === catKey ? null : catKey))}
                    className={`px-3 py-2.5 text-xs rounded-xl transition-all duration-150 flex items-center justify-between gap-1.5 cursor-pointer font-sans border ${
                      isExpanded
                        ? 'bg-[#FF6B2B] text-[#0A0A0D] font-bold border-[#FF6B2B] shadow-md shadow-[#FF6B2B]/25 scale-[1.01]'
                        : 'bg-[#15151F] text-[#A6A6B8] hover:text-[#F4F4F6] hover:bg-[#1D1D29] border-[#29293B]'
                    }`}
                    aria-expanded={isExpanded}
                    title={isExpanded ? `Plegar sugerencias de ${cat.label}` : `Desplegar sugerencias de ${cat.label}`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isExpanded ? 'text-[#0A0A0D]' : 'text-[#FF6B2B]'}`} />
                      <span className="truncate">{cat.label}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-50" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Questions in category (only shown when expanded) */}
            {expandedCategory ? (
              <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-1 border-b border-[#252533]">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF8F50] font-semibold">
                      {categories[expandedCategory].label}
                    </span>
                    <span className="text-[10px] bg-[#FF6B2B]/15 text-[#FF8F50] px-1.5 py-0.5 rounded font-mono font-medium">
                      {categories[expandedCategory].badge}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedCategory(null)}
                    className="text-[11px] text-[#A1A1B2] hover:text-[#FF8F50] flex items-center gap-1 transition-colors cursor-pointer py-0.5 px-2 rounded hover:bg-[#1C1C26]"
                    title="Plegar sugerencias"
                  >
                    <span>Plegar</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-0.5">
                  {categories[expandedCategory].questions.map((sug, idx) => {
                    const isSelected = question.trim() === sug.text.trim();
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuestion(sug.text)}
                        className={`text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200 group relative flex flex-col gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1D1713] border-[#FF6B2B] shadow-lg shadow-[#FF6B2B]/10 ring-1 ring-[#FF6B2B]/50'
                            : 'bg-[#14141B] hover:bg-[#1A1A24] border-[#252535] hover:border-[#FF6B2B]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded font-semibold transition-colors ${
                              isSelected
                                ? 'bg-[#FF6B2B]/20 text-[#FF8F50] border border-[#FF6B2B]/40'
                                : 'bg-[#1E1E28] text-[#9E9EAA] group-hover:text-[#F59E0B] border border-[#2A2A38]'
                            }`}
                          >
                            {sug.tag}
                          </span>

                          {isSelected ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-[#FF8F50] bg-[#FF6B2B]/15 px-2 py-0.5 rounded-full border border-[#FF6B2B]/30 shrink-0">
                              <Check className="w-3 h-3 text-[#FF8F50]" />
                              <span>En tu consulta</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] text-[#78788A] group-hover:text-[#FF8F50] transition-colors shrink-0">
                              <CornerDownLeft className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                              <span>Autocompletar</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-start gap-2 pt-0.5">
                          <Quote
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors ${
                              isSelected ? 'text-[#FF6B2B]' : 'text-[#FF6B2B]/50 group-hover:text-[#FF6B2B]'
                            }`}
                          />
                          <p
                            className={`font-serif text-[13px] sm:text-sm font-medium leading-snug transition-colors ${
                              isSelected ? 'text-white' : 'text-[#E4E4EC] group-hover:text-white'
                            }`}
                          >
                            {sug.text}
                          </p>
                        </div>

                        <p
                          className={`text-[11px] pl-5.5 leading-normal transition-colors ${
                            isSelected ? 'text-[#C5A593]' : 'text-[#7A7A8E] group-hover:text-[#9A9AB0]'
                          }`}
                        >
                          {sug.context}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[11px] text-[#717182] px-1 pt-0.5">
                <span className="text-[#8E8EA0] hidden sm:inline">Toca de nuevo para plegar</span>
              </div>
            )}
          </div>

          {/* Start Action */}
          <div className="pt-5 border-t border-[#232332] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#9E9EAA]">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Tirada tradicional de las 3 monedas</span>
              <InfoButton
                title="El Método de las 3 Monedas"
                content="Lanzas 3 monedas a la vez por cada una de las 6 líneas (de abajo hacia arriba). Cada cara suma 3 y cada cruz suma 2. Las sumas dan 6, 7, 8 o 9."
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#FF6B2B] to-[#F59E0B] hover:brightness-110 active:scale-[0.99] text-[#0A0A0D] font-serif font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF6B2B]/20 hover:shadow-[#FF6B2B]/35 transition-all cursor-pointer group"
            >
              <span>{question ? 'Proceder a la Tirada' : 'Tirada del Momento Presente'}</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0D] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      </div>

      {/* Aesthetic quote / reflection */}
      <div className="mt-6 text-center text-xs text-[#71717A] space-y-1">
        <p>Sabiduría de los Reyes Wen y Zhou, comentada por Confucio.</p>
        <p className="text-[11px] font-mono text-[#52525B]">
          Método de las tres monedas (cara = 3, cruz = 2) • Secuencia King Wen (1 a 64)
        </p>
      </div>
    </div>
  );
};
