import React, { useState, useEffect } from 'react';
import { ConsultationInput } from './components/ConsultationInput';
import { CastingArea } from './components/CastingArea';
import { HexagramDetail } from './components/HexagramDetail';
import { HistoryDrawer } from './components/HistoryDrawer';
import { TrigramsGuideModal } from './components/TrigramsGuideModal';
import { HexagramListModal } from './components/HexagramListModal';
import { BeginnerTutorialModal } from './components/BeginnerTutorialModal';
import { calculateHexagramsFromLines } from './logic/iching';
import { getHexagramByNumber } from './data/hexagrams';
import { ConsultationRecord, HexagramData, HexagramLine } from './types';
import { BookOpen, Clock, Grid, Plus, ShieldCheck, Sparkles, Compass, Instagram } from 'lucide-react';

const STORAGE_KEY = 'iching_consultations_v1';

export default function App() {
  const [view, setView] = useState<'prompt' | 'casting' | 'result'>('prompt');
  const [question, setQuestion] = useState<string | undefined>(undefined);
  const [lines, setLines] = useState<HexagramLine[]>([]);
  const [primaryHexagram, setPrimaryHexagram] = useState<HexagramData | null>(null);
  const [derivedHexagram, setDerivedHexagram] = useState<HexagramData | undefined>(undefined);
  const [mutatingLinePositions, setMutatingLinePositions] = useState<number[]>([]);

  // Modals & Drawers
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // History state
  const [history, setHistory] = useState<ConsultationRecord[]>([]);

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // Load history on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (err) {
      console.error('Error loading history:', err);
    }
  }, []);

  const saveHistory = (newHistory: ConsultationRecord[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (err) {
      console.error('Error saving history:', err);
    }
  };

  // Start new consultation
  const handleStartCasting = (consultationQuestion?: string) => {
    setQuestion(consultationQuestion);
    setLines([]);
    setPrimaryHexagram(null);
    setDerivedHexagram(undefined);
    setMutatingLinePositions([]);
    setView('casting');
  };

  // Hexagram casting completed
  const handleCastingComplete = (completedLines: HexagramLine[]) => {
    const { primaryHexagram, derivedHexagram, mutatingLinePositions } =
      calculateHexagramsFromLines(completedLines);

    setLines(completedLines);
    setPrimaryHexagram(primaryHexagram);
    setDerivedHexagram(derivedHexagram);
    setMutatingLinePositions(mutatingLinePositions);

    // Save record to history
    const newRecord: ConsultationRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      question,
      lines: completedLines,
      primaryHexagramNumber: primaryHexagram.number,
      derivedHexagramNumber: derivedHexagram?.number,
      mutatingLinePositions,
    };

    const updatedHistory = [newRecord, ...history];
    saveHistory(updatedHistory);

    setView('result');
  };

  // Open past consultation from history
  const handleSelectRecord = (record: ConsultationRecord) => {
    setQuestion(record.question);
    setLines(record.lines);
    setPrimaryHexagram(getHexagramByNumber(record.primaryHexagramNumber));
    setDerivedHexagram(
      record.derivedHexagramNumber
        ? getHexagramByNumber(record.derivedHexagramNumber)
        : undefined
    );
    setMutatingLinePositions(record.mutatingLinePositions);
    setView('result');
  };

  // Delete single record
  const handleDeleteRecord = (id: string) => {
    const filtered = history.filter((r) => r.id !== id);
    saveHistory(filtered);
  };

  // Clear all history
  const handleClearHistory = () => {
    saveHistory([]);
  };

  // Inspect hexagram from catalog
  const handleSelectFromCatalog = (hex: HexagramData) => {
    // Construct dummy pure lines for the hexagram
    const hexBits = hex.binaryKey.split('').map((b) => (b === '1' ? 7 : 8)) as (7 | 8)[];

    const dummyLines: HexagramLine[] = hexBits.map((val, idx) => ({
      position: idx + 1,
      coins: val === 7 ? [3, 2, 2] : [2, 3, 3],
      value: val,
      isYang: val === 7,
      isMutating: false,
    }));

    setQuestion(`Consulta del Hexagrama #${hex.number}: ${hex.nameEs}`);
    setLines(dummyLines);
    setPrimaryHexagram(hex);
    setDerivedHexagram(undefined);
    setMutatingLinePositions([]);
    setView('result');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-dark-obsidian text-[#F4F4F6] flex flex-col justify-between selection:bg-[#FF6B2B] selection:text-[#0A0A0D]">
      {/* Top Header */}
      <header className="w-full border-b border-[#232330] bg-[#0E0E12]/90 backdrop-blur-md sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <button
            onClick={() => setView('prompt')}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer shrink-0"
            aria-label="Volver al inicio del I Ching"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FF6B2B] group-hover:bg-[#FF8248] text-[#0A0A0D] flex items-center justify-center font-chinese text-lg sm:text-xl font-bold shadow-[0_0_12px_rgba(255,107,43,0.35)] transition-all shrink-0">
              易
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg text-[#F4F4F6] tracking-tight block leading-tight group-hover:text-[#FF8F50] transition-colors">
                I Ching
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#A1A1B0] tracking-wide hidden xs:block">
                Libro de las Mutaciones
              </span>
            </div>
          </button>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Tutorial Button for Beginners */}
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="px-2 sm:px-3 py-1.5 text-xs font-semibold text-[#0A0A0D] bg-[#FF6B2B] hover:bg-[#FF8044] rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-[#FF6B2B]/20 cursor-pointer"
              title="Aprender a usar el I Ching paso a paso"
            >
              <Compass className="w-3.5 h-3.5 text-[#0A0A0D]" />
              <span className="inline">Tutorial</span>
              <span className="hidden md:inline text-[10px] bg-[#0A0A0D]/20 text-[#0A0A0D] px-1 rounded-sm font-bold">
                Principiantes
              </span>
            </button>

            <button
              onClick={() => setIsGuideOpen(true)}
              className="p-1.5 sm:px-3 sm:py-1.5 text-xs text-[#A1A1B0] hover:text-[#F4F4F6] hover:bg-[#1A1A22] rounded-lg border border-transparent hover:border-[#2F2F3D] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Guía del Método de las 3 Monedas"
            >
              <BookOpen className="w-4 h-4 text-[#F59E0B]" />
              <span className="hidden md:inline">Método & Monedas</span>
            </button>

            <button
              onClick={() => setIsCatalogOpen(true)}
              className="p-1.5 sm:px-3 sm:py-1.5 text-xs text-[#A1A1B0] hover:text-[#F4F4F6] hover:bg-[#1A1A22] rounded-lg border border-transparent hover:border-[#2F2F3D] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Catálogo de los 64 Hexagramas"
            >
              <Grid className="w-4 h-4 text-[#F59E0B]" />
              <span className="hidden md:inline">64 Hexagramas</span>
            </button>

            <button
              onClick={() => setIsHistoryOpen(true)}
              className="p-1.5 sm:px-3 sm:py-1.5 text-xs text-[#A1A1B0] hover:text-[#F4F4F6] hover:bg-[#1A1A22] rounded-lg border border-[#272733] flex items-center gap-1.5 transition-colors cursor-pointer relative"
              title="Historial de consultas"
            >
              <Clock className="w-4 h-4 text-[#F59E0B]" />
              <span className="hidden sm:inline">Historial</span>
              {history.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#FF6B2B] text-[#0A0A0D] font-mono text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {history.length}
                </span>
              )}
            </button>

            {view !== 'prompt' && (
              <button
                onClick={() => setView('prompt')}
                className="px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[#0A0A0D] bg-gradient-to-r from-[#FF6B2B] to-[#F59E0B] hover:brightness-110 rounded-lg flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                title="Comenzar nueva consulta"
              >
                <Plus className="w-3.5 h-3.5 text-[#0A0A0D]" />
                <span className="hidden sm:inline">Nueva Consulta</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 py-6 sm:py-10 flex flex-col justify-center overflow-x-hidden">
        {view === 'prompt' && (
          <ConsultationInput
            onStartCasting={handleStartCasting}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        )}

        {view === 'casting' && (
          <CastingArea
            question={question}
            onComplete={handleCastingComplete}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        )}

        {view === 'result' && primaryHexagram && (
          <HexagramDetail
            question={question}
            lines={lines}
            primaryHexagram={primaryHexagram}
            derivedHexagram={derivedHexagram}
            mutatingLinePositions={mutatingLinePositions}
            onNewConsultation={() => setView('prompt')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#232330] bg-[#0B0B0E] py-5 text-center text-xs text-[#71717A]">
        <div className="max-w-6xl mx-auto px-4 relative flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3">
          <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center">
            <a
              href="https://www.instagram.com/heroismo.cosmogonico/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#A1A1B0] hover:text-[#FF6B2B] transition-colors group cursor-pointer"
              title="Instagram @heroismo.cosmogonico"
              id="footer-instagram-link"
            >
              <Instagram className="w-4 h-4 text-[#A1A1B0] group-hover:text-[#FF6B2B] transition-colors" />
              <span className="text-[11px] font-mono text-[#8E8E9E] group-hover:text-[#FF8F50]">@heroismo.cosmogonico</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-[#8E8E9E]">
            <span className="text-[#A1A1B0]">Sabiduría milenaria tradicional</span>
            <span>•</span>
            <span className="text-[#F59E0B]">64 Hexagramas King Wen</span>
          </div>
        </div>
      </footer>

      {/* Drawers & Modals */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        records={history}
        onSelectRecord={handleSelectRecord}
        onDeleteRecord={handleDeleteRecord}
        onClearHistory={handleClearHistory}
      />

      <TrigramsGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <HexagramListModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectHexagram={handleSelectFromCatalog}
      />

      <BeginnerTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onStartConsultation={() => {
          setIsTutorialOpen(false);
          setView('prompt');
        }}
      />
    </div>
  );
}
