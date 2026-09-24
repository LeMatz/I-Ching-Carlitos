import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info, X } from 'lucide-react';

interface InfoButtonProps {
  title?: string;
  content: React.ReactNode;
  label?: string;
  size?: 'sm' | 'md';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  showAcknowledgeButton?: boolean;
  acknowledgeText?: string;
}

export const InfoButton: React.FC<InfoButtonProps> = ({
  title,
  content,
  label = 'Más información',
  size = 'sm',
  className = '',
  showAcknowledgeButton = false,
  acknowledgeText = 'Entendido',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Absolute scroll lock for the background view across mobile Safari, Android Chrome and desktop
  useEffect(() => {
    if (!isOpen) return;

    // Capture the current scroll position before freezing
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    const prevBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const prevHtmlOverflow = document.documentElement.style.overflow;

    // Lock both html and body using position:fixed pin method
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Intercept touchmove on non-dialog elements (especially iOS WebKit)
    const handleTouchMove = (e: TouchEvent) => {
      if (!dialogRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (!dialogRef.current.contains(e.target as Node)) {
        if (e.cancelable) e.preventDefault();
      }
    };

    // Intercept wheel events outside the dialog
    const handleWheel = (e: WheelEvent) => {
      if (!dialogRef.current || !dialogRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);

      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.position = prevBodyStyle.position;
      document.body.style.top = prevBodyStyle.top;
      document.body.style.left = prevBodyStyle.left;
      document.body.style.right = prevBodyStyle.right;
      document.body.style.width = prevBodyStyle.width;
      document.body.style.overflow = prevBodyStyle.overflow;

      // Restore exact scroll position without jumping
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const iconSizes = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';
  const buttonSizes = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className={`relative inline-flex items-center align-middle ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={label}
        aria-expanded={isOpen}
        className={`${buttonSizes} rounded-full border border-[#48485C] bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F59E0B] hover:text-[#FF8F50] hover:border-[#FF6B2B] inline-flex items-center justify-center p-0 leading-none transition-all cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#FF6B2B] shrink-0`}
        title={typeof content === 'string' && !title ? content : label}
      >
        <Info className={`${iconSizes} shrink-0`} />
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'info-dialog-title' : undefined}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-sm sm:max-w-md p-4 sm:p-5 bg-[#16161F] border border-[#FF6B2B]/60 rounded-xl shadow-2xl text-left text-xs text-[#E2E2EC] leading-relaxed max-h-[85vh] overflow-y-auto overscroll-contain"
            >
              <div className="flex items-start justify-between gap-2 mb-2 pb-1.5 border-b border-[#2B2B3A]">
                <div
                  id="info-dialog-title"
                  className="flex items-center gap-1.5 text-[#F59E0B] font-bold font-sans text-xs sm:text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]" />
                  <span>{title || 'Información'}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="text-[#8E8E9E] hover:text-[#F4F4F6] p-1 rounded-md transition-colors cursor-pointer hover:bg-[#252535]"
                  aria-label="Cerrar ventana de información"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-[12px] text-[#C8C8D6] space-y-1.5 leading-relaxed">{content}</div>

              {showAcknowledgeButton && (
                <div className="mt-4 pt-3 border-t border-[#2B2B3A] flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#FF6B2B] hover:bg-[#FF8044] text-[#0A0A0D] font-serif font-bold text-xs transition-colors cursor-pointer text-center shadow-md hover:shadow-lg"
                  >
                    {acknowledgeText}
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
