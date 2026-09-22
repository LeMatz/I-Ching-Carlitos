import React from 'react';
import { ConsultationRecord } from '../types';
import { getHexagramByNumber } from '../data/hexagrams';
import { X, Trash2, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { InfoButton } from './InfoButton';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  records: ConsultationRecord[];
  onSelectRecord: (record: ConsultationRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  records,
  onSelectRecord,
  onDeleteRecord,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div
        className="w-full max-w-md bg-[#111115] border-l border-[#2B2B38] h-full shadow-2xl flex flex-col justify-between text-[#F4F4F6]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#232330] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B2B]/20 border border-[#FF6B2B]/40 flex items-center justify-center text-[#FF6B2B]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 id="history-title" className="font-serif font-bold text-lg text-[#F4F4F6]">
                  Historial de Consultas
                </h3>
                <InfoButton
                  title="Historial de Consultas"
                  content="Guarda tus preguntas y hexagramas resultantes en la memoria local de tu navegador para que puedas contrastar la evolución de tus situaciones a lo largo del tiempo."
                />
              </div>
              <span className="text-xs font-mono text-[#F59E0B]">
                {records.length} {records.length === 1 ? 'registro guardado' : 'registros guardados'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9E9EAA] hover:text-[#F4F4F6] hover:bg-[#1E1E26] rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar historial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {records.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-[#71717A]">
              <BookOpen className="w-10 h-10 text-[#38384A] mb-2" />
              <p className="font-serif text-sm text-[#D1D1DC]">Aún no has realizado consultas.</p>
              <p className="text-xs text-[#71717A] mt-1 max-w-xs">
                Tus tiradas de monedas se guardarán automáticamente en tu navegador.
              </p>
            </div>
          ) : (
            records.map((rec) => {
              const primary = getHexagramByNumber(rec.primaryHexagramNumber);
              const derived = rec.derivedHexagramNumber
                ? getHexagramByNumber(rec.derivedHexagramNumber)
                : undefined;
              const formattedDate = new Date(rec.date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={rec.id}
                  onClick={() => {
                    onSelectRecord(rec);
                    onClose();
                  }}
                  className="bg-[#16161D] border border-[#272735] hover:border-[#FF6B2B]/60 rounded-xl p-3.5 transition-all flex flex-col gap-2 group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A1B0]">
                    <span>{formattedDate}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRecord(rec.id);
                      }}
                      className="text-[#71717A] hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Eliminar este registro"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {rec.question && (
                    <p className="font-serif italic text-xs text-[#FFC09F] line-clamp-1">
                      «{rec.question}»
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-chinese text-2xl font-bold text-[#FF6B2B]">
                        {primary.chinese}
                      </span>
                      <div>
                        <div className="font-serif font-bold text-sm text-[#F4F4F6] leading-tight">
                          #{primary.number} {primary.nameEs}
                        </div>
                        <div className="text-[11px] text-[#A1A1B0]">
                          {rec.mutatingLinePositions.length > 0
                            ? `${rec.mutatingLinePositions.length} mutación(es)`
                            : 'Hexagrama estable'}
                        </div>
                      </div>
                    </div>

                    {derived && (
                      <div className="flex items-center gap-1.5 text-xs text-[#F59E0B]">
                        <ArrowRight className="w-3.5 h-3.5 text-[#71717A]" />
                        <span className="font-chinese text-lg font-bold">{derived.chinese}</span>
                        <span className="font-mono text-[11px]">#{derived.number}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        {records.length > 0 && (
          <div className="p-4 border-t border-[#232330] flex items-center justify-between">
            <span className="text-xs text-[#71717A]">Almacenamiento local</span>
            <button
              onClick={() => {
                if (window.confirm('¿Deseas vaciar todo tu historial de consultas?')) {
                  onClearHistory();
                }
              }}
              className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vaciar Historial</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
