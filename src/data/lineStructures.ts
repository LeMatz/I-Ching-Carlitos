export interface LineStructureInfo {
  position: number;
  traditionalName: string;
  realm: string;
  level: string;
  trigramZone: string;
  polarityDefault: 'Yang' | 'Yin';
  description: string;
}

export const LINE_STRUCTURES: Record<number, LineStructureInfo> = {
  1: {
    position: 1,
    traditionalName: 'Línea Inicial (Chū • 初)',
    realm: 'La Tierra (Dì • 地)',
    level: 'Base y Cimiento',
    trigramZone: 'Trigrama Inferior (Mundo Interno)',
    polarityDefault: 'Yang',
    description:
      'Fase germinal y raíz del proceso. Representa el comienzo de la situación, al aprendiz o la fuerza latente. Aconseja prudencia, contención y no apresurarse; la fuerza aún debe consolidarse.',
  },
  2: {
    position: 2,
    traditionalName: 'Segunda Línea (Èr • 二)',
    realm: 'La Tierra (Dì • 地)',
    level: 'Centro Interior y Equilibrio',
    trigramZone: 'Trigrama Inferior (Mundo Interno)',
    polarityDefault: 'Yin',
    description:
      'Posición central del trigrama inferior. Simboliza la esfera íntima, el equilibrio personal, la rectitud en el servicio y la templanza. Mantiene correspondencia armónica natural con la línea 5.',
  },
  3: {
    position: 3,
    traditionalName: 'Tercera Línea (Sān • 三)',
    realm: 'El Ser Humano (Rén • 人)',
    level: 'Transición y Umbral de Tensión',
    trigramZone: 'Trigrama Inferior (Límite superior)',
    polarityDefault: 'Yang',
    description:
      'El umbral crítico que separa el ámbito privado del público. Zona de gran esfuerzo, tensión y cambio. Advierte sobre riesgos de soberbia, impaciencia o precipitación si se actúa sin cautela.',
  },
  4: {
    position: 4,
    traditionalName: 'Cuarta Línea (Sì • 四)',
    realm: 'El Ser Humano (Rén • 人)',
    level: 'Aproximación y Ámbito Público',
    trigramZone: 'Trigrama Superior (Mundo Externo)',
    polarityDefault: 'Yin',
    description:
      'Entrada al mundo exterior y cercanía inmediata con el líder (línea 5). Papel del consejero, ministro o ejecutor diplomático. Demanda fidelidad, cautela, flexibilidad y no rivalizar con la autoridad.',
  },
  5: {
    position: 5,
    traditionalName: 'Quinta Línea (Wǔ • 五)',
    realm: 'El Cielo (Tiān • 天)',
    level: 'El Soberano / Regente Supremo',
    trigramZone: 'Trigrama Superior (Mundo Externo)',
    polarityDefault: 'Yang',
    description:
      'La posición más noble y equilibrada del hexagrama. Encarna la madurez plena, el liderazgo sereno, la autoridad legítima y la visión generosa sobre el conjunto de los acontecimientos.',
  },
  6: {
    position: 6,
    traditionalName: 'Línea Superior (Shàng • 上)',
    realm: 'El Cielo (Tiān • 天)',
    level: 'Cima y Trascendencia',
    trigramZone: 'Trigrama Superior (Cima absoluta)',
    polarityDefault: 'Yin',
    description:
      'La culminación extrema del ciclo. Cuando una energía llega a su cumbre, se prepara para revertirse. Advierte contra la soberbia del aislamiento e invita a la sabia retirada y al desapego espiritual.',
  },
};
