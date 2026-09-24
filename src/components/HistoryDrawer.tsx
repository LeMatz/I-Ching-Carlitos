import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ConsultationRecord } from '../types';
import { getHexagramByNumber } from '../data/hexagrams';
import { X, Trash2, Clock, ArrowRight, BookOpen, FileText, Check, Save, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { InfoButton } from './InfoButton';

interface HistoryRecordCardProps {
  rec: ConsultationRecord;
  onSelect: () => void;
  onDelete: () => void;
  onUpdateNote: (id: string, note: string) => void;
  onToggleProtect: (id: string) => void;
}

const HistoryRecordCard: React.FC<HistoryRecordCardProps> = ({
  rec,
  onSelect,
  onDelete,
  onUpdateNote,
  onToggleProtect,
}) => {
  const [note, setNote] = useState(rec.userNote || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setNote(rec.userNote || '');
  }, [rec.userNote]);

  const handleSave = () => {
    onUpdateNote(rec.id, note);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleBlur = () => {
    if (note !== (rec.userNote || '')) {
      handleSave();
    }
  };

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
      onClick={onSelect}
      className={`border rounded-xl p-3.5 transition-all flex flex-col gap-2 group cursor-pointer shadow-xs ${
        rec.isProtected
          ? 'bg-[#18161D] border-[#F59E0B]/40 hover:border-[#F59E0B]/70'
          : 'bg-[#16161D] border-[#272735] hover:border-[#FF6B2B]/60'
      }`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A1B0]">
        <span>{formattedDate}</span>
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {/* Manual protection button available to all records */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleProtect(rec.id);
            }}
            className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
              rec.isProtected
                ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/50 hover:bg-[#F59E0B]/30'
                : 'text-[#71717A] hover:text-[#F59E0B] border border-[#2B2B38] hover:border-[#F59E0B]/40 hover:bg-[#1E1E28]'
            }`}
            title={
              rec.isProtected
                ? 'Consulta protegida manualmente contra eliminación (clic para desproteger)'
                : 'Proteger manualmente esta consulta contra eliminación'
            }
          >
            {rec.isProtected ? (
              <>
                <Lock className="w-3 h-3 text-[#F59E0B]" />
                <span>Protegida</span>
              </>
            ) : (
              <>
                <Unlock className="w-3 h-3" />
                <span className="hidden xs:inline">Proteger</span>
              </>
            )}
          </button>

          {/* Delete button: always interactive, confirms if protected or has reflection */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className={`p-1 transition-colors cursor-pointer rounded hover:bg-[#252535] ${
              rec.isProtected
                ? 'text-[#F59E0B]/70 hover:text-red-400'
                : 'text-[#71717A] hover:text-red-400'
            }`}
            title={
              rec.isProtected
                ? 'Eliminar este registro (pedirá confirmación por estar protegido)'
                : rec.userNote && rec.userNote.trim().length > 0
                ? 'Eliminar este registro (pedirá confirmación por contener reflexión personal)'
                : 'Eliminar este registro'
            }
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
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

      {/* Editable Reflection / Personal Note */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-2 pt-2.5 border-t border-[#232332] flex flex-col gap-1.5"
      >
        <div className="flex items-center justify-between text-[11px]">
          <label
            htmlFor={`note-${rec.id}`}
            className="text-[#C5A593] font-medium flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3 h-3 text-[#FF6B2B]" />
            <span>Reflexión personal:</span>
          </label>
          {isSaved && (
            <span className="text-[#34D399] flex items-center gap-0.5 text-[10px] font-mono">
              <Check className="w-3 h-3" />
              Guardada
            </span>
          )}
        </div>

        <textarea
          id={`note-${rec.id}`}
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setIsSaved(false);
          }}
          onBlur={handleBlur}
          onKeyDown={(e) => e.stopPropagation()}
          placeholder="Escribe tu reflexión o notas sobre esta consulta..."
          rows={2}
          className="w-full bg-[#0C0C10] border border-[#272737] focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]/30 rounded-lg p-2 text-xs text-[#F4F4F6] placeholder:text-[#5E5E6E] resize-none outline-none transition-all"
        />

        {note !== (rec.userNote || '') && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="px-2.5 py-1 text-[11px] font-semibold bg-[#FF6B2B] hover:bg-[#FF8044] text-[#0A0A0D] rounded-md transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <Save className="w-3 h-3" />
              <span>Guardar reflexión</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  records: ConsultationRecord[];
  onSelectRecord: (record: ConsultationRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
  onUpdateNote: (id: string, note: string) => void;
  onToggleProtectRecord: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  records,
  onSelectRecord,
  onDeleteRecord,
  onClearHistory,
  onUpdateNote,
  onToggleProtectRecord,
}) => {
  const [recordPendingDelete, setRecordPendingDelete] = useState<ConsultationRecord | null>(null);
  const [isConfirmingClearAll, setIsConfirmingClearAll] = useState(false);

  if (!isOpen) return null;

  const handleDeleteRecord = (rec: ConsultationRecord) => {
    const hasNote = Boolean(rec.userNote && rec.userNote.trim().length > 0);
    if (rec.isProtected || hasNote) {
      setRecordPendingDelete(rec);
      return;
    }
    onDeleteRecord(rec.id);
  };

  const handleClearAllHistory = () => {
    const unprotectedRecords = records.filter((r) => !r.isProtected);
    if (unprotectedRecords.length === 0) return;

    const hasUnprotectedNotes = unprotectedRecords.some(
      (r) => Boolean(r.userNote && r.userNote.trim().length > 0)
    );

    if (hasUnprotectedNotes) {
      setIsConfirmingClearAll(true);
      return;
    }

    onClearHistory();
  };

  const protectedCount = records.filter((r) => r.isProtected).length;
  const unprotectedCount = records.filter((r) => !r.isProtected).length;

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
                  content="Guarda hasta 10 consultas en tu navegador. Puedes proteger manualmente cualquier consulta contra eliminación. Los registros con notas no están protegidos por defecto, pero siempre pedirán confirmación antes de borrarse."
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#F59E0B]">
                  {records.length} de 10 {records.length === 1 ? 'registro' : 'registros'}
                </span>
                {protectedCount > 0 && (
                  <span className="text-[#E5E7EB] flex items-center gap-0.5">
                    • <Lock className="w-2.5 h-2.5 text-[#F59E0B]" /> {protectedCount} {protectedCount === 1 ? 'protegido' : 'protegidos'}
                  </span>
                )}
              </div>
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
                Tus tiradas de monedas se guardarán automáticamente en tu navegador (máximo 10 registros).
              </p>
            </div>
          ) : (
            records.map((rec) => (
              <HistoryRecordCard
                key={rec.id}
                rec={rec}
                onSelect={() => {
                  onSelectRecord(rec);
                  onClose();
                }}
                onDelete={() => handleDeleteRecord(rec)}
                onUpdateNote={onUpdateNote}
                onToggleProtect={onToggleProtectRecord}
              />
            ))
          )}
        </div>

        {/* Footer actions */}
        {records.length > 0 && (
          <div className="p-4 border-t border-[#232330] flex items-center justify-between">
            <span className="text-xs text-[#71717A]">Memoria (máx. 10)</span>
            {unprotectedCount > 0 ? (
              <button
                type="button"
                onClick={handleClearAllHistory}
                className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Elimina las consultas que no están protegidas"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar no protegidas ({unprotectedCount})</span>
              </button>
            ) : (
              <span
                className="text-xs text-[#F59E0B] flex items-center gap-1 font-mono"
                title="Todos los registros están protegidos contra eliminación"
              >
                <Lock className="w-3 h-3" />
                <span>Todas protegidas</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal: Delete single record (protected or with reflection/note) */}
      {recordPendingDelete &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-[#181822] border border-red-500/50 rounded-xl p-5 max-w-sm w-full shadow-2xl text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2.5 text-red-400 mb-3">
                <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 border border-red-500/30">
                  {recordPendingDelete.isProtected ? (
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                  ) : (
                    <Trash2 className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#F4F4F6] leading-tight">
                    {recordPendingDelete.isProtected
                      ? '¿Eliminar consulta protegida?'
                      : '¿Eliminar esta consulta?'}
                  </h4>
                  <p className="text-[11px] font-mono text-[#A1A1B0]">
                    Hexagrama #{recordPendingDelete.primaryHexagramNumber}{' '}
                    {getHexagramByNumber(recordPendingDelete.primaryHexagramNumber).nameEs}
                  </p>
                </div>
              </div>

              {recordPendingDelete.isProtected && (
                <p className="text-xs text-[#F59E0B] mb-2 font-medium leading-relaxed">
                  Esta consulta tiene candado de protección manual contra eliminación.
                </p>
              )}

              {recordPendingDelete.userNote && recordPendingDelete.userNote.trim().length > 0 ? (
                <>
                  <p className="text-xs text-[#C8C8D6] mb-2 leading-relaxed">
                    Contiene una reflexión personal escrita que se perderá permanentemente:
                  </p>
                  <div className="bg-[#101015] border border-[#2B2B38] rounded-lg p-2.5 mb-4 text-xs italic text-[#FFC09F] max-h-24 overflow-y-auto">
                    «{recordPendingDelete.userNote}»
                  </div>
                </>
              ) : (
                <p className="text-xs text-[#C8C8D6] mb-4 leading-relaxed">
                  ¿Confirmas que deseas eliminar definitivamente este registro del historial?
                </p>
              )}

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setRecordPendingDelete(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#3A3A4A] text-xs text-[#C8C8D6] hover:bg-[#252535] hover:text-[#F4F4F6] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteRecord(recordPendingDelete.id);
                    setRecordPendingDelete(null);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-serif font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  {recordPendingDelete.isProtected ? 'Desproteger y eliminar' : 'Sí, eliminar'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Confirmation Modal: Clear all unprotected records */}
      {isConfirmingClearAll &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-[#181822] border border-red-500/50 rounded-xl p-5 max-w-sm w-full shadow-2xl text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2.5 text-red-400 mb-3">
                <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 border border-red-500/30">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#F4F4F6] leading-tight">
                    ¿Vaciar consultas no protegidas?
                  </h4>
                  <p className="text-[11px] font-mono text-[#A1A1B0]">
                    {unprotectedCount} {unprotectedCount === 1 ? 'consulta' : 'consultas'} a eliminar
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#C8C8D6] mb-4 leading-relaxed">
                Se eliminarán definitivamente las consultas sin candado activo, incluyendo sus reflexiones personales. Las consultas con protección manual permanecerán a salvo.
              </p>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsConfirmingClearAll(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#3A3A4A] text-xs text-[#C8C8D6] hover:bg-[#252535] hover:text-[#F4F4F6] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClearHistory();
                    setIsConfirmingClearAll(false);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-serif font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Sí, vaciar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
