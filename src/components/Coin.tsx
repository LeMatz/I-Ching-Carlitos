import React from 'react';
import { motion } from 'motion/react';
import { CoinValue } from '../types';

interface CoinProps {
  value: CoinValue;
  isFlipping?: boolean;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

export const Coin: React.FC<CoinProps> = ({
  value,
  isFlipping = false,
  size = 'md',
  delay = 0,
}) => {
  const isYang = value === 3; // Cara = 3 (Yang), Cruz = 2 (Yin)

  const sizeClasses = {
    sm: 'w-10 h-10 xs:w-11 xs:h-11 text-xs',
    md: 'w-14 h-14 xs:w-16 xs:h-16 text-sm',
    lg: 'w-16 h-16 xs:w-20 xs:h-20 text-sm xs:text-base',
  };

  const squareSize = {
    sm: 'w-3 h-3 xs:w-3.5 xs:h-3.5',
    md: 'w-4.5 h-4.5 xs:w-5 xs:h-5',
    lg: 'w-5 h-5 xs:w-6 xs:h-6',
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        animate={
          isFlipping
            ? {
                rotateY: [0, 720, 1440, 2160],
                rotateZ: [0, 45, -30, 0],
                y: [0, -38, -18, 0],
                scale: [1, 1.18, 1.06, 1],
              }
            : {
                rotateY: 0,
                rotateZ: 0,
                y: 0,
                scale: 1,
              }
        }
        transition={{
          duration: 0.9,
          delay: delay,
          ease: [0.25, 1, 0.5, 1],
        }}
        className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center cursor-default select-none shadow-lg border-2 border-[#FF6B2B]/70 bg-gradient-to-br from-[#FF7A36] via-[#B84410] to-[#1A120E] text-[#FDE047]`}
        style={{ transformStyle: 'preserve-3d' }}
        aria-label={`Moneda de bronce: ${isYang ? 'Cara (Yang = 3)' : 'Cruz (Yin = 2)'}`}
      >
        {/* Outer Coin Edge Rim with Gold Tertiary Reflection */}
        <div className="absolute inset-0.5 rounded-full border border-[#FDE047]/40 pointer-events-none" />

        {/* Inner square cut-out (Traditional Fang Kong Qian) */}
        <div
          className={`${squareSize[size]} bg-[#0A0A0D] border border-[#F59E0B]/60 shadow-inner flex items-center justify-center`}
        >
          <div className="w-full h-full bg-[#08080A]" />
        </div>

        {/* Calligraphic inscriptions with Tertiary Gold */}
        {isYang ? (
          // Cara (Yang - Valor 3): 4 classical Chinese characters
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-chinese font-bold text-[#FDE68A] text-[9px] sm:text-[10px] drop-shadow-xs">
            <span className="absolute top-1">乾</span>
            <span className="absolute bottom-1">元</span>
            <span className="absolute left-1">通</span>
            <span className="absolute right-1">寶</span>
          </div>
        ) : (
          // Cruz (Yin - Valor 2): Twin cloud / wave marks
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-chinese font-medium text-[#F4F4F6] text-[8px] sm:text-[9px] drop-shadow-xs">
            <span className="absolute top-1 text-[#FCD34D]">陰</span>
            <span className="absolute bottom-1 text-[#FCD34D]">順</span>
            <span className="absolute left-1 text-[#FF8F50]">☽</span>
            <span className="absolute right-1 text-[#FF8F50]">☽</span>
          </div>
        )}

        {/* Deep dark burnished vignette ring */}
        <div className="absolute inset-0 rounded-full bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />
      </motion.div>

      <div className="flex items-center gap-1">
        <span
          className={`text-[11px] font-sans font-bold px-1.5 py-0.2 rounded-xs ${
            isYang
              ? 'bg-[#FF6B2B]/20 text-[#FF8F50] border border-[#FF6B2B]/40'
              : 'bg-[#272733] text-[#A1A1AA] border border-[#3F3F4E]'
          }`}
        >
          {isYang ? 'Cara (3)' : 'Cruz (2)'}
        </span>
      </div>
    </div>
  );
};
