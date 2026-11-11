import { HexagramData } from '../types';
import { RECOMMENDED_ATTITUDES } from '../data/attitudes';
import { SIMPLIFIED_TRIGRAMS } from '../data/trigrams';
import { HEXAGRAM_SITUATION_DYNAMICS } from '../data/hexagramDynamics';
import { HEXAGRAM_NATURAL_IMAGES } from '../data/hexagramNaturalImages';

export interface SimplifiedJudgmentData {
  essentialMeaning: string;
  favorableAdvice: string;
  warningAdvice: string;
  practicalAttitude: string;
}

export interface SimplifiedImageData {
  naturalPhenomenon: string;
  energyDynamics: string;
  practicalAttitude: string;
}

export interface SimplifiedLineData {
  positionStage: string;
  stageName: string;
  directCounsel: string;
  favorableStatus: 'favorable' | 'warning' | 'neutral';
  mutatingTransitionNote?: string;
}

/**
 * Traduce el Juicio (Tuàn) clásico a un desglose claro, llano y directo.
 */
export function getSimplifiedJudgment(hexagram: HexagramData): SimplifiedJudgmentData {
  const attitude = RECOMMENDED_ATTITUDES[hexagram.number] || {
    short: 'Actuar con templanza',
    advice: 'Mantén la claridad y la perseverancia en tus intenciones.',
  };

  // Limpiar texto clásico para extraer el núcleo en lenguaje corriente
  const raw = hexagram.judgment;

  // Analizar aspectos favorables y advertencias del juicio canónico
  let favorable = 'Perseverar con rectitud, mantener la calma y avanzar con firmeza paso a paso.';
  let warning = 'Actuar con precipitación, imponerse por la fuerza o dejarse llevar por la impaciencia.';

  if (raw.toLowerCase().includes('propicio atravesar las grandes aguas') || raw.toLowerCase().includes('cruzar las grandes aguas')) {
    favorable = 'Es momento favorable para emprender proyectos de envergadura, viajar o asumir retos que requerían valor.';
  } else if (raw.toLowerCase().includes('no debe emprenderse') || raw.toLowerCase().includes('no es propicio ir')) {
    favorable = 'Conviene esperar, consolidar la situación actual y reunir información antes de comprometerse.';
    warning = 'Emprender nuevas iniciativas sin bases firmes traerá pérdidas o complicaciones innecesarias.';
  }

  if (raw.toLowerCase().includes('amigos') || raw.toLowerCase().includes('aliados') || raw.toLowerCase().includes('gran hombre')) {
    favorable += ' Es un momento propicio para buscar consejo de personas de confianza y forjar alianzas sinceras.';
  }

  if (raw.toLowerCase().includes('peligro') || raw.toLowerCase().includes('arrepentimiento')) {
    warning = 'Desatender los avisos de la situación o confiarte en exceso aumentará el riesgo de equivocación.';
  }

  // Descripción directa, amplia y sustancial de la situación sin fórmulas repetitivas
  const essential = HEXAGRAM_SITUATION_DYNAMICS[hexagram.number] ||
    'Momento de evolución en el que las circunstancias demandan templanza y lucidez, actuando en sintonía con las leyes del cambio sin forzar los acontecimientos.';

  return {
    essentialMeaning: essential,
    favorableAdvice: favorable,
    warningAdvice: warning,
    practicalAttitude: attitude.advice,
  };
}

/**
 * Traduce La Imagen (Xiàng) clásica a una interpretación viva y profunda
 * de las energías de la naturaleza y su correlación con la conducta humana.
 */
export function getSimplifiedImage(hexagram: HexagramData): SimplifiedImageData {
  const naturalData = HEXAGRAM_NATURAL_IMAGES[hexagram.number];

  if (naturalData) {
    return {
      naturalPhenomenon: naturalData.elementalPhenomenon,
      energyDynamics: naturalData.energyDynamics,
      practicalAttitude: naturalData.humanConduct,
    };
  }

  // Fallback si por alguna razón no existiera
  return {
    naturalPhenomenon: hexagram.image,
    energyDynamics: 'Interacción de fuerzas elementales de la naturaleza.',
    practicalAttitude: 'Armonizar la conducta con las leyes naturales del cambio.',
  };
}

const STAGE_MAP: Record<number, { name: string; stage: string }> = {
  1: {
    name: 'Fase Inicial (Raíz y Comienzo)',
    stage: 'El asunto apenas está brotando. La energía se encuentra abajo; es tiempo de prepararse, observar y no precipitarse.',
  },
  2: {
    name: 'Fase de Desarrollo (Equilibrio Interior)',
    stage: 'Centro del mundo interno. Momento de actuar con serenidad, rectitud y buscar apoyos sinceros en tu entorno cercano.',
  },
  3: {
    name: 'Fase de Transición (Punto de Tensión)',
    stage: 'Umbral delicado entre lo privado y lo público. Requiere máxima atención; no te confíes ni cedas al desgaste.',
  },
  4: {
    name: 'Fase de Aproximación (El Contacto Exterior)',
    stage: 'Comienza el ámbito exterior. Conviene actuar con diplomacia, saber adaptarse a los tiempos y actuar sin soberbia.',
  },
  5: {
    name: 'Fase de Madurez (Cúspide y Regencia)',
    stage: 'Punto de mayor influencia y claridad. Es el momento de liderar con justicia, templanza y generosidad.',
  },
  6: {
    name: 'Fase de Culminación (Cierre de Ciclo)',
    stage: 'La situación ha alcanzado su límite natural. Advierte evitar el exceso de apego o orgullo; momento de saber soltar.',
  },
};

/**
 * Traduce una línea individual a un desglose comprensible.
 */
export function getSimplifiedLine(
  hexagram: HexagramData,
  linePos: number,
  lineText: string,
  isMutating: boolean
): SimplifiedLineData {
  const stageInfo = STAGE_MAP[linePos] || {
    name: `Posición ${linePos}`,
    stage: 'Momento de evolución en este aspecto.',
  };

  // Quitar el prefijo "Línea X (Nueve/Seis en...): " para dejar el mensaje directo
  let cleaned = lineText;
  const colonIndex = lineText.indexOf(':');
  if (colonIndex !== -1 && colonIndex < 40) {
    cleaned = lineText.substring(colonIndex + 1).trim();
  }

  // Evaluar tono de la línea
  const lower = cleaned.toLowerCase();
  let status: 'favorable' | 'warning' | 'neutral' = 'neutral';
  if (lower.includes('ventura') || lower.includes('éxito') || lower.includes('propicio') || lower.includes('sin falta')) {
    status = 'favorable';
  } else if (lower.includes('peligro') || lower.includes('humillación') || lower.includes('arrepentimiento') || lower.includes('desgracia') || lower.includes('no actúes')) {
    status = 'warning';
  }

  let mutatingNote: string | undefined;
  if (isMutating) {
    mutatingNote =
      'Esta línea está en plena transformación activa. Su mensaje no es estático; señala exactamente la tensión o aprendizaje que impulsa el cambio hacia el hexagrama futuro.';
  }

  return {
    stageName: stageInfo.name,
    positionStage: stageInfo.stage,
    directCounsel: cleaned,
    favorableStatus: status,
    mutatingTransitionNote: mutatingNote,
  };
}
