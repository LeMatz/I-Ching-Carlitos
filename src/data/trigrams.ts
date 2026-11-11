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
    family: 'El Padre (Principio Yang Puro)',
    direction: 'Noroeste (Cielo Posterior) / Sur (Cielo Anterior)',
    season: 'Otoño tardío / Inicio de Invierno',
    animal: 'Caballo (vigor, resistencia infatigable)',
    bodyPart: 'Cabeza (sede rectora y de la conciencia)',
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
    family: 'La Madre (Principio Yin Puro)',
    direction: 'Sudoeste (Cielo Posterior) / Norte (Cielo Anterior)',
    season: 'Finales del Verano / Estío de transición',
    animal: 'Vaca / Yegua (fecundidad, devoción y paciencia)',
    bodyPart: 'Vientre (seno generador de vida)',
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
    family: 'El Hijo Mayor (El Primer Yang naciente)',
    direction: 'Este (El despertar del Oriente)',
    season: 'Primavera (Equinoccio de Primavera, brote inicial)',
    animal: 'Dragón (fuerza latente que asciende)',
    bodyPart: 'Pies (el impulso del primer paso)',
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
    family: 'El Hijo Mediano (La Luz Yang en el Abismo)',
    direction: 'Norte (Medianoche, hondura oceánica)',
    season: 'Invierno (Solsticio de Invierno, concentración interior)',
    animal: 'Cerdo / Jabalí (tenacidad en la dificultad)',
    bodyPart: 'Oídos (atenta escucha en la penumbra)',
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
    family: 'El Hijo Menor (La Culminación Yang)',
    direction: 'Noreste (Umbral entre la noche y la aurora)',
    season: 'Final del Invierno / Umbral de la Primavera',
    animal: 'Perro (lealtad vigilante, guardián del límite)',
    bodyPart: 'Manos (detención, aprehensión y sosiego)',
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
    family: 'La Hija Mayor (La Primera Yin naciente)',
    direction: 'Sudeste (Entrada de la brisa cálida)',
    season: 'Primavera tardía / Comienzo del Verano',
    animal: 'Gallo (llamado claro que despierta y penetra)',
    bodyPart: 'Muslos (flexibilidad para inclinarse y adaptarse)',
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
    family: 'La Hija Mediana (La Luz que se Adhiere)',
    direction: 'Sur (Mediodía radiante, iluminación cenital)',
    season: 'Verano (Solsticio de Verano, máximo fulgor)',
    animal: 'Faisán (plumaje ardiente y preclaro)',
    bodyPart: 'Ojos (visión y lucidez de la mente)',
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
    family: 'La Hija Menor (La Serenidad y el Júbilo)',
    direction: 'Oeste (Crepúsculo apacible, cosecha)',
    season: 'Otoño (Época de recolección y celebración compartida)',
    animal: 'Oveja (mansedumbre y serenidad fraterna)',
    bodyPart: 'Boca (la palabra veraz, el canto y la risa)',
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

export interface SimplifiedTrigramInfo {
  quality: string;
  explanation: string;
  naturalImage: string;
}

export const SIMPLIFIED_TRIGRAMS: Record<string, SimplifiedTrigramInfo> = {
  Cielo: {
    naturalImage: 'Cielo',
    quality: 'fuerte',
    explanation: 'Energía que inicia y empuja; lo firme y activo que no cede ante la dificultad.',
  },
  Tierra: {
    naturalImage: 'Tierra',
    quality: 'dócil',
    explanation: 'Receptividad que acoge y sostiene con paciencia; da forma a lo que otro inicia.',
  },
  Trueno: {
    naturalImage: 'Trueno',
    quality: 'mover',
    explanation: 'Impulso repentino que despierta con fuerza y pone en marcha todo lo estancado.',
  },
  Viento: {
    naturalImage: 'Viento',
    quality: 'penetrar',
    explanation: 'Influencia suave y constante que penetra poco a poco, por persistencia y no por fuerza.',
  },
  Agua: {
    naturalImage: 'Agua',
    quality: 'hundir',
    explanation: 'Peligro y profundidad; lo que fluye atravesando obstáculos sin perder jamás su naturaleza.',
  },
  Fuego: {
    naturalImage: 'Fuego',
    quality: 'adherir',
    explanation: 'Claridad que ilumina y revela; depende de aquello a lo que se adhiere para arder.',
  },
  Montaña: {
    naturalImage: 'Montaña',
    quality: 'detener',
    explanation: 'Detención y quietud; marca un límite firme y permite reposar antes de seguir avanzando.',
  },
  Lago: {
    naturalImage: 'Lago',
    quality: 'alegrar',
    explanation: 'Alegría y apertura transparente; el placer del intercambio sincero y la conversación compartida.',
  },
};

export function getSimplifiedTrigram(nameOrId: string): SimplifiedTrigramInfo {
  if (!nameOrId) return SIMPLIFIED_TRIGRAMS['Cielo'];
  const n = nameOrId.toLowerCase();
  if (n.includes('ciel')) return SIMPLIFIED_TRIGRAMS['Cielo'];
  if (n.includes('tierr')) return SIMPLIFIED_TRIGRAMS['Tierra'];
  if (n.includes('truen')) return SIMPLIFIED_TRIGRAMS['Trueno'];
  if (n.includes('vient')) return SIMPLIFIED_TRIGRAMS['Viento'];
  if (n.includes('agu')) return SIMPLIFIED_TRIGRAMS['Agua'];
  if (n.includes('fueg')) return SIMPLIFIED_TRIGRAMS['Fuego'];
  if (n.includes('monta')) return SIMPLIFIED_TRIGRAMS['Montaña'];
  if (n.includes('lag')) return SIMPLIFIED_TRIGRAMS['Lago'];
  return SIMPLIFIED_TRIGRAMS[nameOrId] || SIMPLIFIED_TRIGRAMS['Cielo'];
}

/**
 * Línea de síntesis generada con la fórmula canónica:
 * "{imagen inferior} ({cualidad inferior}) bajo {imagen superior} ({cualidad superior})"
 * Ejemplo (Hexagrama 62): "Trueno (mover) bajo Montaña (detener)"
 */
export function getTrigramSynthesis(lowerName: string, upperName: string): string {
  const lower = getSimplifiedTrigram(lowerName);
  const upper = getSimplifiedTrigram(upperName);
  return `${lower.naturalImage} (${lower.quality}) bajo ${upper.naturalImage} (${upper.quality})`;
}

