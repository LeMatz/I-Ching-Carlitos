import React from 'react';
import { TRIGRAMS } from '../data/trigrams';
import { X, Compass, BookOpen, Sparkles } from 'lucide-react';
import { InfoButton } from './InfoButton';

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
        className="w-full max-w-2xl bg-[#111115] border border-[#2B2B38] rounded-xl shadow-2xl p-4 sm:p-7 max-h-[90vh] overflow-y-auto text-[#F4F4F6]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#232330] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B2B]/20 border border-[#FF6B2B]/40 flex items-center justify-center text-[#FF6B2B]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 id="guide-title" className="font-serif font-bold text-lg sm:text-xl text-[#F4F4F6]">
                  Guía del Método de las Tres Monedas
                </h3>
                <InfoButton
                  title="Método de las 3 Monedas"
                  content="Es el método clásico derivado de los tallos de milenrama (aquilea). Cada tirada de 3 monedas genera una línea. Seis tiradas componen el hexagrama completo de 6 líneas."
                />
              </div>
              <p className="text-xs text-[#9E9EAA]">
                Cálculo numérico tradicional, valores y los 8 trigramas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9E9EAA] hover:text-[#F4F4F6] hover:bg-[#1E1E26] rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-[#D1D1DC] leading-relaxed">
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
                  Lado con caracteres o dragón. Representa el principio solar, activo, luminoso y generador.
                </span>
              </div>

              <div className="p-3 bg-[#181822] rounded-lg border border-[#2A2A38]">
                <strong className="text-[#A1A1B0] block text-sm mb-0.5">Cruz (Yin) = 2</strong>
                <span className="text-[#A1A1B0]">
                  Lado con símbolos o liso. Representa el principio terrestre, receptivo, paciente y dócil.
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
                    <th className="p-2.5 text-left border-b border-[#2A2A38]">Suma</th>
                    <th className="p-2.5 text-left border-b border-[#2A2A38]">Nombre Clásico</th>
                    <th className="p-2.5 text-left border-b border-[#2A2A38]">Línea</th>
                    <th className="p-2.5 text-left border-b border-[#2A2A38]">Mutación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232330] bg-[#121216]">
                  <tr className="bg-[#1F1410]">
                    <td className="p-2.5 font-mono font-bold text-[#FF6B2B]">6 (2+2+2)</td>
                    <td className="p-2.5 text-[#F4F4F6]">Viejo Yin (老陰, Lǎo Yīn)</td>
                    <td className="p-2.5 font-mono text-[#FF8F50]">—— ✕ ——</td>
                    <td className="p-2.5 text-[#FF6B2B] font-semibold">Muta a Yang (——)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-[#E4E4E7]">7 (2+2+3)</td>
                    <td className="p-2.5">Joven Yang (少陽, Shào Yáng)</td>
                    <td className="p-2.5 font-mono text-[#E4E4E7]">——————</td>
                    <td className="p-2.5 text-[#71717A]">Permanece fija</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-[#E4E4E7]">8 (2+3+3)</td>
                    <td className="p-2.5">Joven Yin (少陰, Shào Yīn)</td>
                    <td className="p-2.5 font-mono text-[#A1A1AA]">——  ——</td>
                    <td className="p-2.5 text-[#71717A]">Permanece fija</td>
                  </tr>
                  <tr className="bg-[#1F1410]">
                    <td className="p-2.5 font-mono font-bold text-[#FF6B2B]">9 (3+3+3)</td>
                    <td className="p-2.5 text-[#F4F4F6]">Viejo Yang (老陽, Lǎo Yáng)</td>
                    <td className="p-2.5 font-mono text-[#FF8F50]">—— ○ ——</td>
                    <td className="p-2.5 text-[#FF6B2B] font-semibold">Muta a Yin (——  ——)</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                  className="p-2.5 bg-[#171720] border border-[#272733] rounded-lg flex flex-col items-center text-center"
                >
                  <span className="text-xl font-serif text-[#F59E0B]">{t.symbol}</span>
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

          {/* Section 4: Tradición y Enfoque en la Consulta */}
          <div className="p-3.5 bg-[#15151C] rounded-lg border border-[#2B2B38] flex items-start gap-3 text-xs text-[#A1A1B0]">
            <Compass className="w-5 h-5 text-[#FF6B2B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F4F4F6] block mb-0.5">Enfoque y Serenidad en la Consulta:</strong>
              Para una lectura fecunda, formula tu inquietud con sinceridad y calma interior. El I Ching no predice un futuro inmutable; ofrece un espejo lúcido para cultivar la rectitud y la templanza del noble.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
