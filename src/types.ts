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
  judgment: string; // Dictamen / Juicio (Tuàn)
  image: string; // La Imagen (Xiàng)
  lines: [string, string, string, string, string, string]; // Line 1 to 6 interpretations
}

export interface ConsultationRecord {
  id: string;
  date: string;
  question?: string;
  lines: HexagramLine[];
  primaryHexagramNumber: number;
  derivedHexagramNumber?: number;
  mutatingLinePositions: number[]; // 1 to 6
}
