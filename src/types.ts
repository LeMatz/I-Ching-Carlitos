export type CoinValue = 2 | 3; // 2 = Cruz (Yin), 3 = Cara (Yang)

export type LineValue = 6 | 7 | 8 | 9;
// 6 = Viejo Yin (mutante, --x--)
// 7 = Joven Yang (fijo, -------)
// 8 = Joven Yin (fijo, --  --)
// 9 = Viejo Yang (mutante, ---o---)

export interface HexagramLine {
  position: number; // 1 to 6 (1 = base / inferior, 6 = superior)
  coins: [CoinValue, CoinValue, CoinValue];
  value: LineValue;
  isYang: boolean; // true for 7 and 9; false for 6 and 8
  isMutating: boolean; // true for 6 and 9
}

export interface TrigramInfo {
  id: string;
  name: string; // e.g. "Cielo"
  chinese: string; // 乾
  pinyin: string; // Qián
  element: string; // Creativo / Metal / Luz
  nature: string; // Firmeza, Movimiento, Profundidad, etc.
  symbol: string; // ☰
  lines: [0 | 1, 0 | 1, 0 | 1]; // bottom to top (1=yang, 0=yin)
  family: string; // Familia (Padre, Madre, Hijo mayor, etc.)
  direction: string; // Dirección cardinal tradicional
  season: string; // Estación del año
  animal: string; // Animal arquetípico
  bodyPart: string; // Parte del cuerpo asociada
}

export interface HexagramData {
  number: number; // 1 to 64
  chinese: string; // 乾
  pinyin: string; // Qián
  nameEs: string; // Lo Creativo
  characterMeaning: string; // El Cielo, La Fuerza Activa
  upperTrigram: string; // "Cielo"
  lowerTrigram: string; // "Cielo"
  binaryKey: string; // 6 bits from line 1 to 6 e.g. "111111"
  judgment: string; // Dictamen / Juicio (Tuàn • 彖)
  image: string; // La Gran Imagen (Dà Xiàng • 大象)
  lines: [string, string, string, string, string, string]; // Line 1 to 6 interpretations
  tuanCommentary?: string; // Comentario al Juicio (Tuàn Zhuàn • 彖傳)
  lineImages?: [string, string, string, string, string, string]; // Imagen breve de cada línea (Xiǎo Xiàng • 小象)
  canonicalExtra?: {
    title: string; // e.g. "用九 (Yòng Jiǔ - Al usar los nueves)"
    chinese: string; // 用九 / 用六
    text: string; // "见群龙无首，吉。" / "利永贞。"
    meaning: string;
  };
  wenyanCommentary?: string; // Comentario a las palabras (Wényán Zhuàn • 文言傳) para hexagramas 1 y 2
}

export interface ConsultationRecord {
  id: string;
  date: string;
  question?: string;
  lines: HexagramLine[];
  primaryHexagramNumber: number;
  derivedHexagramNumber?: number;
  mutatingLinePositions: number[]; // 1 to 6
  userNote?: string;
  isProtected?: boolean;
}
