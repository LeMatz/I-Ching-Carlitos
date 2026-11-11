import bgDefault from '../assets/images/iching_title_bg_1794200089228.jpg';
import bgPeaks from '../assets/images/iching_bg_peaks_1794282631860.jpg';
import bgRiver from '../assets/images/iching_bg_river_1794282640719.jpg';
import bgPines from '../assets/images/iching_bg_pines_1794282634127.jpg';
import bgDawn from '../assets/images/iching_bg_dawn_1794282634056.jpg';

import trigramCielo from '../assets/images/elem_cielo_1794283031184.jpg';
import trigramTierra from '../assets/images/elem_tierra_1794283031297.jpg';
import trigramTrueno from '../assets/images/elem_trueno_1794283016495.jpg';
import trigramAgua from '../assets/images/elem_agua_1794283015852.jpg';
import trigramMontana from '../assets/images/elem_montana_1794283030538.jpg';
import trigramViento from '../assets/images/elem_viento_1794283016269.jpg';
import trigramFuego from '../assets/images/elem_fuego_1794283015361.jpg';
import trigramLago from '../assets/images/elem_lago_1794283030661.jpg';

/**
 * 5 pinturas de paisaje tradicional chino Shan Shui para el banner del hexagrama.
 * Permite rotar obras de arte según el hexagrama obtenido para rica variedad visual.
 */
export const HEXAGRAM_BACKGROUNDS: string[] = [
  bgDefault,
  bgPeaks,
  bgRiver,
  bgPines,
  bgDawn,
];

export function getHexagramBackground(hexagramNumber: number): string {
  if (!hexagramNumber || hexagramNumber < 1) return HEXAGRAM_BACKGROUNDS[0];
  const index = (hexagramNumber - 1) % HEXAGRAM_BACKGROUNDS.length;
  return HEXAGRAM_BACKGROUNDS[index];
}

/**
 * Pinturas tradicionales Shan Shui para cada uno de los 8 trigramas del I Ching.
 * Concordantes con el elemento y arquetipo del trigrama.
 */
export const TRIGRAM_BACKGROUNDS: Record<string, string> = {
  cielo: trigramCielo,
  Cielo: trigramCielo,
  tierra: trigramTierra,
  Tierra: trigramTierra,
  trueno: trigramTrueno,
  Trueno: trigramTrueno,
  agua: trigramAgua,
  Agua: trigramAgua,
  montaña: trigramMontana,
  Montaña: trigramMontana,
  montana: trigramMontana,
  viento: trigramViento,
  Viento: trigramViento,
  fuego: trigramFuego,
  Fuego: trigramFuego,
  lago: trigramLago,
  Lago: trigramLago,
};

export function getTrigramBackground(nameOrId?: string): string {
  if (!nameOrId) return trigramCielo;
  const normalized = nameOrId.trim().toLowerCase();
  if (normalized.includes('ciel')) return trigramCielo;
  if (normalized.includes('tierr')) return trigramTierra;
  if (normalized.includes('truen')) return trigramTrueno;
  if (normalized.includes('agu')) return trigramAgua;
  if (normalized.includes('monta')) return trigramMontana;
  if (normalized.includes('vient')) return trigramViento;
  if (normalized.includes('fueg')) return trigramFuego;
  if (normalized.includes('lag')) return trigramLago;
  return TRIGRAM_BACKGROUNDS[nameOrId] || trigramCielo;
}
