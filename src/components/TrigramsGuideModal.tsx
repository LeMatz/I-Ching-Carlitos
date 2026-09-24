import React from 'react';
import { TRIGRAMS } from '../data/trigrams';
import { TrigramCalligraphy } from './TrigramCalligraphy';
import {
  X,
  Compass,
  Sparkles,
  Layers,
  ArrowRight,
  FileText,
  Eye,
  CheckCircle2,
  Split,
  Maximize2,
  Check,
} from 'lucide-react';

interface TrigramsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrigramsGuideModal: React.FC<TrigramsGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-[#111115] border border-[#2B2B38] rounded-xl shadow-2xl p-4 sm:p-7 max-h-[92vh] overflow-y-auto text-[#F4F4F6]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#232330] mb-5 gap-4">
          <div>
            <h3 id="guide-title" className="font-serif font-bold text-lg sm:text-xl text-[#F4F4F6]">
              Guía del Método de las Tres Monedas
            </h3>
            <p className="text-xs text-[#9E9EAA] mt-1 leading-relaxed">
              Método clásico derivado de los tallos de milenrama (aquilea): cada tirada de 3 monedas genera una línea y seis tiradas componen el hexagrama completo. Incluye el cálculo numérico tradicional, los 8 trigramas y las claves para interpretar cada elemento de tu consulta.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9E9EAA] hover:text-[#F4F4F6] hover:bg-[#1E1E26] rounded-lg transition-colors cursor-pointer shrink-0 mt-0.5"
            aria-label="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-7 text-sm text-[#D1D1DC] leading-relaxed">
          {/* Section 1: Traditional Coin Method */}
          <div>
            <h4 className="font-bold text-base text-[#F4F4F6] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2B]" />
              1. Asignación de Valores Numéricos
            </h4>
            <p className="text-xs sm:text-sm text-[#A1A1B0] mb-3">
              En cada tirada se lanzan simultáneamente 3 monedas chinas de bronce. Se emplea la convención clásica:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#181822] rounded-lg border border-[#2A2A38]">
                <strong className="text-[#FF8F50] block text-sm mb-0.5">Cara (Yang) = 3</strong>
                <span className="text-[#A1A1B0]">
                  Lado con caracteres o cuatro signos. Representa el principio solar, activo, luminoso y generador.
                </span>
              </div>

              <div className="p-3 bg-[#181822] rounded-lg border border-[#2A2A38]">
                <strong className="text-[#A1A1B0] block text-sm mb-0.5">Cruz (Yin) = 2</strong>
                <span className="text-[#A1A1B0]">
                  Lado con símbolos manchúes o reverso. Representa el principio terrestre, receptivo, paciente y dócil.
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Sums & Mutation */}
          <div>
            <h4 className="font-bold text-base text-[#F4F4F6] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2B]" />
              2. Las Cuatro Clases de Líneas
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-[#2A2A38] rounded-lg overflow-hidden">
                <thead className="bg-[#181822] text-[#F4F4F6]">
                  <tr>
                    <th className="p-2.5 text-left border-b border-[#2A2A38] whitespace-nowrap">Suma</th>
                    <th className="p-2.5 text-left border-b border-[#2A2A38]">Nombre Clásico</th>
                    <th className="p-2.5 text-left border-b border-[#2A2A38] whitespace-nowrap">Línea</th>
                    <th className="p-2.5 text-center border-b border-[#2A2A38] w-20 whitespace-nowrap">Mutante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232330] bg-[#121216]">
                  <tr className="bg-[#1F1410]">
                    <td className="p-2.5 font-mono font-bold text-[#FF6B2B] whitespace-nowrap">6 (2+2+2)</td>
                    <td className="p-2.5 text-[#F4F4F6]">Viejo Yin (老陰, Lǎo Yīn)</td>
                    <td className="p-2.5 font-mono text-[#FF8F50] whitespace-nowrap font-bold text-sm tracking-wider">
                      —— ✕ ——
                    </td>
                    <td className="p-2.5 text-center">
                      <div
                        className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#FF6B2B]/20 border border-[#FF6B2B] text-[#FF6B2B] shadow-xs"
                        title="Línea mutante: muta a Yang (——)"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-[#E4E4E7] whitespace-nowrap">7 (2+2+3)</td>
                    <td className="p-2.5">Joven Yang (少陽, Shào Yáng)</td>
                    <td className="p-2.5 font-mono text-[#E4E4E7] whitespace-nowrap font-bold text-sm tracking-wider">
                      ——————
                    </td>
                    <td className="p-2.5 text-center">
                      <div
                        className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#1A1A24] border border-[#343446]"
                        title="Línea fija"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-[#E4E4E7] whitespace-nowrap">8 (2+3+3)</td>
                    <td className="p-2.5">Joven Yin (少陰, Shào Yīn)</td>
                    <td className="p-2.5 font-mono text-[#A1A1AA] whitespace-nowrap font-bold text-sm tracking-wider">
                      ——  ——
                    </td>
                    <td className="p-2.5 text-center">
                      <div
                        className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#1A1A24] border border-[#343446]"
                        title="Línea fija"
                      />
                    </td>
                  </tr>
                  <tr className="bg-[#1F1410]">
                    <td className="p-2.5 font-mono font-bold text-[#FF6B2B] whitespace-nowrap">9 (3+3+3)</td>
                    <td className="p-2.5 text-[#F4F4F6]">Viejo Yang (老陽, Lǎo Yáng)</td>
                    <td className="p-2.5 font-mono text-[#FF8F50] whitespace-nowrap font-bold text-sm tracking-wider">
                      —— ○ ——
                    </td>
                    <td className="p-2.5 text-center">
                      <div
                        className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#FF6B2B]/20 border border-[#FF6B2B] text-[#FF6B2B] shadow-xs"
                        title="Línea mutante: muta a Yin (——  ——)"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-[#A1A1B0] mt-2 leading-relaxed">
              <strong className="text-[#FF8F50]">Líneas marcadas con casilla activa (✓):</strong> Son líneas mutantes. El <strong className="text-[#F4F4F6]">6</strong> muta a Yang (<span className="font-mono text-[#FF8F50]">——</span>) y el <strong className="text-[#F4F4F6]">9</strong> muta a Yin (<span className="font-mono text-[#FF8F50]">——  ——</span>). Las casillas vacías indican líneas jóvenes estables que permanecen fijas.
            </p>
          </div>

          {/* Section 3: The 8 Trigrams (Bāguà) */}
          <div>
            <h4 className="font-bold text-base text-[#F4F4F6] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2B]" />
              3. Los 8 Trigramas Primordiales (Bāguà • 八卦)
            </h4>
            <p className="text-xs sm:text-sm text-[#A1A1B0] mb-3">
              Todo hexagrama está formado por dos trigramas de tres líneas: uno interior (base) y uno exterior (superior).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {Object.values(TRIGRAMS).map((t) => (
                <div
                  key={t.id}
                  className="p-2.5 bg-[#171720] border border-[#272733] rounded-lg flex flex-col items-center text-center group hover:border-[#FF6B2B]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="p-1 bg-[#101015] rounded border border-[#2B2B38]" title={`Trigrama ${t.name} en pinceladas`}>
                      <TrigramCalligraphy lines={t.lines} size="sm" />
                    </div>
                    <span className="text-lg font-serif text-[#F59E0B]">{t.symbol}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="font-chinese font-bold text-sm text-[#FF6B2B]">{t.chinese}</span>
                    <span className="font-bold text-xs text-[#F4F4F6]">{t.name}</span>
                  </div>
                  <span className="text-[10px] text-[#A1A1B0] mt-0.5">{t.nature}</span>
                  <span className="text-[10px] font-mono text-[#F59E0B]">{t.element}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Interpretation of Consultation Results (NEW & DETAILED) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#252533] pb-2">
              <h4 className="font-bold text-base text-[#F4F4F6] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6B2B]" />
                4. Cómo Interpretar la Consulta: ¿Qué Significa Cada Elemento?
              </h4>
              <span className="text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                Estructura de la Lectura
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A1A1B0]">
              Al concluir las seis tiradas, la pantalla de resultados organiza la respuesta en varios planos complementarios. Comprender la función de cada uno te permitirá extraer la máxima sabiduría:
            </p>

            {/* A. Hexagrama Principal vs Derivado */}
            <div className="p-4 bg-[#161620] border border-[#2A2A38] rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F4F4F6]">
                <Layers className="w-4 h-4 text-[#FF6B2B]" />
                <span>Hexagrama Principal vs. Hexagrama Derivado (de Cambio)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#111116] rounded-lg border border-[#2D2D3E]">
                  <div className="flex items-center justify-between mb-1.5">
                    <strong className="text-[#FF8F50] text-xs uppercase tracking-wider font-mono">
                      Hexagrama Principal (Presente)
                    </strong>
                    <span className="text-[10px] bg-[#FF6B2B]/20 text-[#FF8F50] px-1.5 py-0.2 rounded font-mono">
                      Matriz
                    </span>
                  </div>
                  <p className="text-[#B5B5C4] leading-relaxed">
                    Es el hexagrama que nace directamente de tus tiradas. Refleja la <strong className="text-[#F4F4F6]">situación actual</strong>, el clima energético presente, las causas profundas y las condiciones de fondo en las que te encuentras ante tu pregunta.
                  </p>
                </div>

                <div className="p-3 bg-[#111116] rounded-lg border border-[#2D2D3E]">
                  <div className="flex items-center justify-between mb-1.5">
                    <strong className="text-[#34D399] text-xs uppercase tracking-wider font-mono">
                      Hexagrama Derivado (Futuro / Zhī Guà)
                    </strong>
                    <span className="text-[10px] bg-[#34D399]/20 text-[#34D399] px-1.5 py-0.2 rounded font-mono">
                      Tendencia
                    </span>
                  </div>
                  <p className="text-[#B5B5C4] leading-relaxed">
                    Surge <strong className="text-[#F4F4F6]">únicamente si hay líneas mutantes</strong> (valores 6 o 9). Muestra hacia dónde tiende a evolucionar la situación una vez que las fuerzas activas completan su transformación. Si todas las líneas son estables (7 y 8), no hay derivado: el momento es autosuficiente y perdurable.
                  </p>
                </div>
              </div>
            </div>

            {/* B. El Juicio y La Imagen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#161620] border border-[#2A2A38] rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-sm text-[#F4F4F6] mb-1.5">
                    <FileText className="w-4 h-4 text-[#F59E0B]" />
                    <span>El Juicio (Guà Cí / Tuan)</span>
                  </div>
                  <p className="text-[#A1A1B0] leading-relaxed">
                    Atribuido al <strong className="text-[#D1D1DC]">Rey Wen</strong>, es el dictamen oracular central. Evalúa la conveniencia general del momento: si es oportuno emprender proyectos («cruzar las grandes aguas»), esperar, rectificar el rumbo o mantenerse firme en la perseverancia.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#232330] text-[11px] text-[#F59E0B] font-mono">
                  ¿Es favorable actuar ahora o aguardar?
                </div>
              </div>

              <div className="p-3.5 bg-[#161620] border border-[#2A2A38] rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-sm text-[#F4F4F6] mb-1.5">
                    <Eye className="w-4 h-4 text-[#38BDF8]" />
                    <span>La Imagen (Dà Xiàng)</span>
                  </div>
                  <p className="text-[#A1A1B0] leading-relaxed">
                    Atribuida a la tradición confuciana. Analiza la metáfora natural entre los dos trigramas (ej. «Cielo sobre la Tierra», «Fuego bajo el Agua») y ofrece la <strong className="text-[#D1D1DC]">lección moral y psicológica</strong>: qué conducta interior debe adoptar la persona sabia («el noble») para armonizarse con el momento.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#232330] text-[11px] text-[#38BDF8] font-mono">
                  ¿Qué actitud y carácter debo cultivar?
                </div>
              </div>
            </div>

            {/* C. Significado de las Líneas y su Orden */}
            <div className="p-4 bg-[#161620] border border-[#2A2A38] rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#F4F4F6]">
                  <Split className="w-4 h-4 text-[#FF6B2B]" />
                  <span>El Significado de las 6 Líneas (Yáo • 爻) y su Progresión</span>
                </div>
                <span className="text-[11px] font-mono text-[#FF8F50] bg-[#FF6B2B]/10 px-2 py-0.5 rounded border border-[#FF6B2B]/20">
                  Lectura: De abajo hacia arriba
                </span>
              </div>

              <p className="text-[#A1A1B0] leading-relaxed">
                Las seis líneas simbolizan la maduración temporal y jerárquica de cualquier fenómeno, leídas siempre desde la base (Tierra) hacia la cima (Cielo):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <div className="p-2.5 bg-[#111116] rounded-lg border border-[#242433]">
                  <div className="flex items-center justify-between text-[#FF8F50] font-bold">
                    <span>Línea 1 (Inicial): El Origen</span>
                    <span className="text-[10px] text-[#71717A]">Base</span>
                  </div>
                  <span className="text-[#9E9EAA] block font-sans mt-0.5 text-xs">
                    Inicio, germinación silenciosa. Exige prudencia y no precipitarse.
                  </span>
                </div>

                <div className="p-2.5 bg-[#111116] rounded-lg border border-[#242433]">
                  <div className="flex items-center justify-between text-[#FF8F50] font-bold">
                    <span>Línea 2: El Interior</span>
                    <span className="text-[10px] text-[#71717A]">Trigrama inferior</span>
                  </div>
                  <span className="text-[#9E9EAA] block font-sans mt-0.5 text-xs">
                    El mundo íntimo, preparación de recursos y afinidad con el centro.
                  </span>
                </div>

                <div className="p-2.5 bg-[#111116] rounded-lg border border-[#242433]">
                  <div className="flex items-center justify-between text-[#F59E0B] font-bold">
                    <span>Línea 3: El Umbral Crítico</span>
                    <span className="text-[10px] text-[#71717A]">Transición</span>
                  </div>
                  <span className="text-[#9E9EAA] block font-sans mt-0.5 text-xs">
                    Paso de lo privado a lo público. Tensión, tentación de imprudencia.
                  </span>
                </div>

                <div className="p-2.5 bg-[#111116] rounded-lg border border-[#242433]">
                  <div className="flex items-center justify-between text-[#F59E0B] font-bold">
                    <span>Línea 4: El Mundo Exterior</span>
                    <span className="text-[10px] text-[#71717A]">Trigrama superior</span>
                  </div>
                  <span className="text-[#9E9EAA] block font-sans mt-0.5 text-xs">
                    Ámbito social o profesional. Proximidad a la autoridad, cautela ejecutiva.
                  </span>
                </div>

                <div className="p-2.5 bg-[#111116] rounded-lg border border-[#242433]">
                  <div className="flex items-center justify-between text-[#34D399] font-bold">
                    <span>Línea 5: El Gobernante</span>
                    <span className="text-[10px] text-[#34D399]">Cénit / Centro</span>
                  </div>
                  <span className="text-[#9E9EAA] block font-sans mt-0.5 text-xs">
                    Posición de liderazgo, madurez y máxima influencia virtuosa.
                  </span>
                </div>

                <div className="p-2.5 bg-[#111116] rounded-lg border border-[#242433]">
                  <div className="flex items-center justify-between text-[#A78BFA] font-bold">
                    <span>Línea 6 (Superior): El Desenlace</span>
                    <span className="text-[10px] text-[#71717A]">Cúspide</span>
                  </div>
                  <span className="text-[#9E9EAA] block font-sans mt-0.5 text-xs">
                    Fin del ciclo. Peligro de exceso («el dragón arrogante») o desapego sabio.
                  </span>
                </div>
              </div>
            </div>

            {/* D. Las Líneas Mutantes */}
            <div className="p-4 bg-[#1D1410] border border-[#FF6B2B]/40 rounded-xl space-y-2.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-sm text-[#FF8F50]">
                <Sparkles className="w-4 h-4 text-[#FF6B2B]" />
                <span>Las Líneas Mutantes: El Núcleo Dinámico de la Respuesta</span>
              </div>
              <p className="text-[#D1D1DC] leading-relaxed">
                Cuando una línea obtiene una suma extrema de <strong className="text-[#FF8F50]">6 (Viejo Yin)</strong> o <strong className="text-[#FF8F50]">9 (Viejo Yang)</strong>, se considera que esa energía ha llegado a su máxima saturación y está en proceso inminente de mutación hacia su opuesto.
              </p>
              <div className="p-3 bg-[#111116] rounded-lg border border-[#3A241A] space-y-1.5 text-[11px] text-[#A8A8B6]">
                <strong className="text-[#F4F4F6] block">¿Por qué son tan importantes?</strong>
                <p>
                  Son las <strong className="text-[#FF6B2B]">advertencias específicas</strong> dirigidas a tu consulta. El texto de cada línea mutante contiene el consejo puntual para tu momento concreto, mientras que el resto de líneas fijas componen el escenario general.
                </p>
              </div>
            </div>

            {/* E. Guía de Síntesis Oracular */}
            <div className="p-3.5 bg-[#14141A] border border-[#262635] rounded-xl text-xs space-y-2">
              <strong className="text-[#F4F4F6] text-xs flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                Regla Clásica de Lectura según las Mutaciones:
              </strong>
              <ul className="space-y-1 text-[#A1A1B0] pl-4 list-disc text-[11px]">
                <li>
                  <strong className="text-[#F4F4F6]">Sin líneas mutantes:</strong> La situación es estable. La respuesta descansa exclusivamente en el Juicio y la Imagen del Hexagrama Principal.
                </li>
                <li>
                  <strong className="text-[#F4F4F6]">1 o 2 líneas mutantes:</strong> El texto de esas líneas particulares es el consejo determinante. El Hexagrama Derivado te muestra hacia dónde se encaminará el desenlace.
                </li>
                <li>
                  <strong className="text-[#F4F4F6]">3 o más líneas mutantes:</strong> Gran conmoción o transición. La situación está mutando profundamente; contempla la transición entre ambos hexagramas en su totalidad.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 5: Tradición y Enfoque en la Consulta */}
          <div className="p-3.5 bg-[#15151C] rounded-lg border border-[#2B2B38] flex items-start gap-3 text-xs text-[#A1A1B0]">
            <Compass className="w-5 h-5 text-[#FF6B2B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F4F4F6] block mb-0.5">Enfoque y Serenidad en la Consulta:</strong>
              Para una lectura fecunda, formula tu inquietud con sinceridad y calma interior. El I Ching no predice un futuro inmutable ni condena al destino; ofrece un espejo lúcido para cultivar la rectitud, la serenidad y la templanza del noble en cada instante de cambio.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
