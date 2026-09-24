import React from 'react';
import { CalligraphyLine } from './CalligraphyLine';

interface TrigramCalligraphyProps {
  lines: (0 | 1)[]; // [bottom, middle, top]
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TrigramCalligraphy: React.FC<TrigramCalligraphyProps> = ({
  lines,
  size = 'md',
  className = '',
}) => {
  // Trigram lines are ordered [bottom (1), middle (2), top (3)].
  // To render top-down in CSS, we reverse to [top, middle, bottom].
  const displayLines = [
    { isYang: lines[2] === 1, position: 3 },
    { isYang: lines[1] === 1, position: 2 },
    { isYang: lines[0] === 1, position: 1 },
  ];

  const sizeClasses = {
    sm: { container: 'w-10 h-7', line: 'h-1.5' },
    md: { container: 'w-14 h-10', line: 'h-2' },
    lg: { container: 'w-20 h-14', line: 'h-3' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`flex flex-col justify-between items-center ${currentSize.container} select-none ${className}`}
      aria-hidden="true"
    >
      {displayLines.map((line) => (
        <div key={line.position} className={`w-full ${currentSize.line}`}>
          <CalligraphyLine
            isYang={line.isYang}
            position={line.position}
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};
