import { TrigramInfo } from '../types';

export const TRIGRAMS: Record<string, TrigramInfo> = {
  Cielo: {
    id: 'cielo',
    name: 'Cielo',
    chinese: '乾',
    pinyin: 'Qián',
    element: 'Fuerza Creativa / Luz',
    nature: 'Lo Firme, la potencia generatriz',
    symbol: '☰',
    lines: [1, 1, 1],
  },
  Tierra: {
    id: 'tierra',
    name: 'Tierra',
    chinese: '坤',
    pinyin: 'Kūn',
    element: 'Materia Receptiva / Entrega',
    nature: 'Lo Dócil, el sostén nutritivo',
    symbol: '☷',
    lines: [0, 0, 0],
  },
  Trueno: {
    id: 'trueno',
    name: 'Trueno',
    chinese: '震',
    pinyin: 'Zhèn',
    element: 'Movimiento Despertador',
    nature: 'Lo Incitante, conmoción que despierta',
    symbol: '☳',
    lines: [1, 0, 0],
  },
  Agua: {
    id: 'agua',
    name: 'Agua',
    chinese: '坎',
    pinyin: 'Kǎn',
    element: 'Lo Abismal / Corriente',
    nature: 'El Peligro, profundidad insondable',
    symbol: '☵',
    lines: [0, 1, 0],
  },
  Montaña: {
    id: 'montaña',
    name: 'Montaña',
    chinese: '艮',
    pinyin: 'Gèn',
    element: 'Aquietamiento / Roca',
    nature: 'La Detención, firmeza inmutable',
    symbol: '☶',
    lines: [0, 0, 1],
  },
  Viento: {
    id: 'viento',
    name: 'Viento / Madera',
    chinese: '巽',
    pinyin: 'Xùn',
    element: 'Penetración Suave',
    nature: 'La Flexibilidad, influjo constante',
    symbol: '☴',
    lines: [0, 1, 1],
  },
  Fuego: {
    id: 'fuego',
    name: 'Fuego',
    chinese: '離',
    pinyin: 'Lí',
    element: 'Claridad / Adherencia',
    nature: 'Lo Luminoso, conciencia que ilumina',
    symbol: '☲',
    lines: [1, 0, 1],
  },
  Lago: {
    id: 'lago',
    name: 'Lago',
    chinese: '兌',
    pinyin: 'Duì',
    element: 'Serenidad / Niebla',
    nature: 'Lo Regocijante, comunicación alegre',
    symbol: '☱',
    lines: [1, 1, 0],
  },
};

/**
 * Identify trigram name from 3 lines (bottom to top, 1=yang, 0=yin)
 */
export function getTrigramFromLines(l1: 0 | 1, l2: 0 | 1, l3: 0 | 1): TrigramInfo {
  const key = `${l1}${l2}${l3}`;
  for (const trigram of Object.values(TRIGRAMS)) {
    if (trigram.lines.join('') === key) {
      return trigram;
    }
  }
  return TRIGRAMS['Cielo'];
}
