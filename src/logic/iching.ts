import { CoinValue, HexagramData, HexagramLine, LineValue, TrigramInfo } from '../types';
import { getHexagramByLines } from '../data/hexagrams';
import { getTrigramFromLines } from '../data/trigrams';

/**
 * Simula el lanzamiento de una moneda tradicional china.
 *
 * Convención:
 * - Cara (Yang / Inscripción dinástica): valor 3
 * - Cruz (Yin / Reverso liso o símbolos): valor 2
 */
export function tossSingleCoin(): { value: CoinValue; side: 'cara' | 'cruz' } {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const isHeads = buf[0] / 0xFFFFFFFF < 0.5;

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

export interface HexagramCalculationResult {
  primaryHexagram: HexagramData;
  derivedHexagram?: HexagramData;
  mutatingLinePositions: number[];
  allLinesMutating: boolean;
  isAllNines: boolean;
  isAllSixes: boolean;
  activeCanonicalExtra?: HexagramData['canonicalExtra'];
  specialCanonicalRule?: {
    type: 'yong_jiu' | 'yong_liu' | 'all_mutating';
    title: string;
    chineseTitle: string;
    subtitle: string;
    ruleExplanation: string;
  };
  nuclearHexagram: HexagramData;
  nuclearInfo: ReturnType<typeof getNuclearHexagram>;
}

/**
 * Calculates primary hexagram and secondary (derived/mutated) hexagram from 6 lines.
 * Lines are ordered from 1 (bottom / inicial) to 6 (top / superior).
 * Also handles canonical special cases (用九 when all 9s, 用六 when all 6s, and all mutating).
 */
export function calculateHexagramsFromLines(lines: HexagramLine[]): HexagramCalculationResult {
  if (lines.length !== 6) {
    throw new Error('Se requieren exactamente 6 líneas para calcular el hexagrama.');
  }

  // Primary hexagram binary representation: 1=yang (7 or 9), 0=yin (6 or 8)
  const primaryBits = lines.map((line) => (line.isYang ? (1 as 0 | 1) : (0 as 0 | 1)));
  const primaryHexagram = getHexagramByLines(primaryBits);

  // Identify mutating lines (1-indexed positions)
  const mutatingLines = lines.filter((l) => l.isMutating);
  const mutatingLinePositions = mutatingLines.map((l) => l.position);
  const allLinesMutating = mutatingLines.length === 6;

  // Check specific 6-line mutation cases
  const isAllNines = lines.every((l) => l.value === 9); // Hex 1 -> Hex 2 with 用九
  const isAllSixes = lines.every((l) => l.value === 6); // Hex 2 -> Hex 1 with 用六

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

  // Special canonical rule resolution according to Zhu Xi / Shao Yong / Master Gao Heng
  let activeCanonicalExtra: HexagramData['canonicalExtra'] | undefined = undefined;
  let specialCanonicalRule: HexagramCalculationResult['specialCanonicalRule'] = undefined;

  if (isAllNines && primaryHexagram.canonicalExtra) {
    activeCanonicalExtra = primaryHexagram.canonicalExtra;
    specialCanonicalRule = {
      type: 'yong_jiu',
      title: 'Regla Canónica Suprema: Al Usar los Nueves (Yòng Jiǔ)',
      chineseTitle: '用九：见群龙无首，吉。',
      subtitle: 'Hexagrama 1 muta íntegramente hacia el Hexagrama 2',
      ruleExplanation:
        'Cuando los seis trazos de Lo Creativo (乾) son nueve (Viejo Yang), la tradición clásica de los maestros (Zhu Xi, Shao Yong) establece que no se leen las líneas 1 a 6 por separado. Se consulta el texto especial canónico «用九» (Yòng Jiǔ): los dragones celestes actúan al unísono sin pretender cabezas rectoras tiránicas; la máxima plenitud yang se transforma en la perfecta docilidad receptiva de Lo Receptivo (坤).',
    };
  } else if (isAllSixes && primaryHexagram.canonicalExtra) {
    activeCanonicalExtra = primaryHexagram.canonicalExtra;
    specialCanonicalRule = {
      type: 'yong_liu',
      title: 'Regla Canónica Suprema: Al Usar los Seises (Yòng Liù)',
      chineseTitle: '用六：利永贞。',
      subtitle: 'Hexagrama 2 muta íntegramente hacia el Hexagrama 1',
      ruleExplanation:
        'Cuando los seis trazos de Lo Receptivo (坤) son seis (Viejo Yin), la regla canónica milenaria determina que no se leen las líneas individuales 1 a 6. Se consulta el texto especial «用六» (Yòng Liù): la entrega fértil y absoluta transmuta en luz creadora duradera. Favorable es la perseverancia duradera, dando origen a Lo Creativo (乾).',
    };
  } else if (allLinesMutating) {
    specialCanonicalRule = {
      type: 'all_mutating',
      title: 'Regla de Mutación Total de las Seis Líneas',
      chineseTitle: '六爻皆變',
      subtitle: `Hexagrama #${primaryHexagram.number} transita íntegramente a #${derivedHexagram?.number}`,
      ruleExplanation:
        'Cuando las seis líneas de un hexagrama mutan a la vez (en cualquier hexagrama del 3 al 64), la situación vive una metamorfosis radical y completa. Según las reglas tradicionales de adivinación del I Ching de Zhu Xi, el dictamen del Hexagrama Derivado (Juicio) asume la máxima regencia interpretativa, señalando hacia dónde se transfigura el destino.',
    };
  }

  // Calculate Nuclear Hexagram
  const nuclearInfo = getNuclearHexagram(lines);

  return {
    primaryHexagram,
    derivedHexagram,
    mutatingLinePositions,
    allLinesMutating,
    isAllNines,
    isAllSixes,
    activeCanonicalExtra,
    specialCanonicalRule,
    nuclearHexagram: nuclearInfo.hexagram,
    nuclearInfo,
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

/**
  * Calcula el Hexagrama Nuclear (互卦 • Hù Guà) a partir de las 6 líneas.
  * - Trigrama nuclear inferior: líneas 2, 3 y 4 del hexagrama original.
  * - Trigrama nuclear superior: líneas 3, 4 y 5 del hexagrama original.
  * Las 6 líneas resultantes forman el núcleo latente y la tensión interior de la situación.
  */
export function getNuclearHexagram(
  input: HexagramLine[] | (0 | 1)[] | string
): {
  hexagram: HexagramData;
  lowerNuclearTrigram: TrigramInfo;
  upperNuclearTrigram: TrigramInfo;
  nuclearBits: (0 | 1)[];
} {
  let bits: (0 | 1)[];

  if (typeof input === 'string') {
    bits = input.split('').map((c) => (c === '1' ? 1 : 0) as 0 | 1);
  } else if (input.length > 0 && typeof input[0] === 'object') {
    bits = (input as HexagramLine[]).map((l) => (l.isYang ? 1 : 0) as 0 | 1);
  } else {
    bits = input as (0 | 1)[];
  }

  // Líneas 1 a 6 indexadas de 0 a 5:
  // Línea 2 = bits[1], Línea 3 = bits[2], Línea 4 = bits[3], Línea 5 = bits[4]
  const lowerLines: [0 | 1, 0 | 1, 0 | 1] = [bits[1], bits[2], bits[3]];
  const upperLines: [0 | 1, 0 | 1, 0 | 1] = [bits[2], bits[3], bits[4]];

  const nuclearBits: (0 | 1)[] = [...lowerLines, ...upperLines];
  const hexagram = getHexagramByLines(nuclearBits);
  const lowerNuclearTrigram = getTrigramFromLines(lowerLines[0], lowerLines[1], lowerLines[2]);
  const upperNuclearTrigram = getTrigramFromLines(upperLines[0], upperLines[1], upperLines[2]);

  return {
    hexagram,
    lowerNuclearTrigram,
    upperNuclearTrigram,
    nuclearBits,
  };
}
