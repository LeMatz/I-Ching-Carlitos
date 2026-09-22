import { CoinValue, HexagramLine, LineValue } from '../types';
import { getHexagramByLines } from '../data/hexagrams';

/**
 * Simula el lanzamiento de una moneda tradicional china.
 *
 * Convención:
 * - Cara (Yang / Inscripción dinástica): valor 3
 * - Cruz (Yin / Reverso liso o símbolos): valor 2
 */
export function tossSingleCoin(): { value: CoinValue; side: 'cara' | 'cruz' } {
  const isHeads = Math.random() < 0.5;

  return {
    value: isHeads ? 3 : 2,
    side: isHeads ? 'cara' : 'cruz',
  };
}

/**
 * Tosses 3 coins to generate one hexagram line.
 * Sum possibilities:
 * - 2 + 2 + 2 = 6 (Viejo Yin / Yin mutante, muta a Yang)
 * - 2 + 2 + 3 = 7 (Joven Yang / Yang fijo, no muta)
 * - 2 + 3 + 3 = 8 (Joven Yin / Yin fijo, no muta)
 * - 3 + 3 + 3 = 9 (Viejo Yang / Yang mutante, muta a Yin)
 */
export function generateLine(position: number): HexagramLine {
  const c1 = tossSingleCoin().value;
  const c2 = tossSingleCoin().value;
  const c3 = tossSingleCoin().value;
  const sum = (c1 + c2 + c3) as LineValue;

  const isYang = sum === 7 || sum === 9;
  const isMutating = sum === 6 || sum === 9;

  return {
    position,
    coins: [c1, c2, c3],
    value: sum,
    isYang,
    isMutating,
  };
}

/**
 * Calculates primary hexagram and secondary (derived/mutated) hexagram from 6 lines.
 * Lines are ordered from 1 (bottom / inicial) to 6 (top / superior).
 */
export function calculateHexagramsFromLines(lines: HexagramLine[]) {
  if (lines.length !== 6) {
    throw new Error('Se requieren exactamente 6 líneas para calcular el hexagrama.');
  }

  // Primary hexagram binary representation: 1=yang (7 or 9), 0=yin (6 or 8)
  const primaryBits = lines.map((line) => (line.isYang ? (1 as 0 | 1) : (0 as 0 | 1)));
  const primaryHexagram = getHexagramByLines(primaryBits);

  // Identify mutating lines (1-indexed positions)
  const mutatingLines = lines.filter((l) => l.isMutating);
  const mutatingLinePositions = mutatingLines.map((l) => l.position);

  // Calculate secondary hexagram if there are mutating lines
  let derivedHexagram = undefined;
  if (mutatingLines.length > 0) {
    const derivedBits = lines.map((line) => {
      if (line.value === 6) {
        // Yin mutante (6) se convierte en Yang (1)
        return 1 as 0 | 1;
      }
      if (line.value === 9) {
        // Yang mutante (9) se convierte en Yin (0)
        return 0 as 0 | 1;
      }
      // Fijas se conservan
      return line.isYang ? (1 as 0 | 1) : (0 as 0 | 1);
    });

    derivedHexagram = getHexagramByLines(derivedBits);
  }

  return {
    primaryHexagram,
    derivedHexagram,
    mutatingLinePositions,
  };
}

/**
 * Helper to get traditional Chinese name and interpretation for line values
 */
export function getLineMeta(value: LineValue): {
  traditionalName: string;
  pinyin: string;
  typeDesc: string;
  symbol: string;
  mutatesTo: string;
} {
  switch (value) {
    case 6:
      return {
        traditionalName: 'Viejo Yin (老陰)',
        pinyin: 'Lǎo Yīn',
        typeDesc: 'Línea Yin Mutante',
        symbol: '— - — (con cruz)',
        mutatesTo: 'Muta a Yang firme (—)',
      };
    case 7:
      return {
        traditionalName: 'Joven Yang (少陽)',
        pinyin: 'Shào Yáng',
        typeDesc: 'Línea Yang Fija',
        symbol: '———',
        mutatesTo: 'Permanente',
      };
    case 8:
      return {
        traditionalName: 'Joven Yin (少陰)',
        pinyin: 'Shào Yīn',
        typeDesc: 'Línea Yin Fija',
        symbol: '—  —',
        mutatesTo: 'Permanente',
      };
    case 9:
      return {
        traditionalName: 'Viejo Yang (老陽)',
        pinyin: 'Lǎo Yáng',
        typeDesc: 'Línea Yang Mutante',
        symbol: '——— (con círculo)',
        mutatesTo: 'Muta a Yin receptivo (—  —)',
      };
  }
}
