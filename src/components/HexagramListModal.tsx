import React, { useState } from 'react';
import { HEXAGRAMS } from '../data/hexagrams';
import { HexagramData } from '../types';
import { X, Search, Grid } from 'lucide-react';
import { InfoButton } from './InfoButton';

interface HexagramListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHexagram: (hex: HexagramData) => void;
}

export const HexagramListModal: React.FC<HexagramListModalProps> = ({
  isOpen,
  onClose,
  onSelectHexagram,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const hexList = Object.values(HEXAGRAMS);
  const filtered = hexList.filter(
    (h) =>
      h.number.toString().includes(search) ||
      h.chinese.includes(search) ||
      h.pinyin.toLowerCase().includes(search.toLowerCase()) ||
      h.nameEs.toLowerCase().includes(search.toLowerCase()) ||
      h.upperTrigram.toLowerCase().includes(search.toLowerCase()) ||
      h.lowerTrigram.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
      <div
        className="w-full max-w-4xl bg-[#111115] border border-[#2B2B38] rounded-xl shadow-2xl p-4 sm:p-6 max-h-[88vh] flex flex-col text-[#F4F4F6]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hex-list-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#232330]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B2B]/20 border border-[#FF6B2B]/40 flex items-center justify-center text-[#FF6B2B]">
              <Grid className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 id="hex-list-title" className="font-serif font-bold text-xl text-[#F4F4F6]">
                  Los 64 Hexagramas del I Ching
                </h3>
                <InfoButton
                  title="Los 64 Hexagramas"
                  content="Arquetipos del cambio universal que combinan las 8 fuerzas de la naturaleza (Cielo, Tierra, Trueno, Agua, Montaña, Viento, Fuego, Lago) en todas sus permutaciones posibles."
                />
              </div>
              <span className="text-xs text-[#A1A1B0]">
                Orden tradicional de la Secuencia King Wen (1 al 64)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9E9EAA] hover:text-[#F4F4F6] hover:bg-[#1E1E26] rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar catálogo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="my-4 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#71717A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por número (#1-64), nombre en español, pinyin o trigramas..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#0C0C10] border border-[#2A2A38] rounded-lg text-sm text-[#F4F4F6] placeholder:text-[#646473] focus:outline-hidden focus:ring-1 focus:ring-[#FF6B2B] focus:border-[#FF6B2B]"
          />
        </div>

        {/* Hexagrams Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
          {filtered.map((hex) => (
            <div
              key={hex.number}
              onClick={() => {
                onSelectHexagram(hex);
                onClose();
              }}
              className="p-3.5 bg-[#16161D] border border-[#272735] hover:border-[#FF6B2B] hover:bg-[#1C1C26] rounded-xl transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-semibold text-[#F59E0B]">
                  #{hex.number}
                </span>
                <span className="font-chinese text-2xl font-bold text-[#FF6B2B] group-hover:scale-110 transition-transform">
                  {hex.chinese}
                </span>
              </div>

              <div className="mt-2.5">
                <div className="font-serif font-bold text-sm text-[#F4F4F6] group-hover:text-[#FF8F50] transition-colors leading-tight">
                  {hex.nameEs}
                </div>
                <div className="text-[11px] font-mono text-[#9E9EAA] mt-0.5">
                  {hex.pinyin}
                </div>
                <div className="text-[10px] text-[#71717A] mt-1">
                  {hex.upperTrigram} / {hex.lowerTrigram}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
