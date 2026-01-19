/**
 * FRAMEWORK CALCULATOR (UPGRADED v2)
 * - Optional MBTI (user-provided)
 * - Full natal chart astrology (5 placements)
 * - Dynamic weighting
 */

export interface QuizAnswers {
  [questionId: string]: number; // question ID -> option index (0,1,2)
}

export interface Big5Scores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface MBTIType {
  type: string; // e.g., "INTJ"
  preferences: {
    IE: "I" | "E";
    SN: "S" | "N";
    TF: "T" | "F";
    JP: "J" | "P";
  };
  source: "user-provided" | "not-available"; // Track if user gave it
}

export interface EnneagramType {
  coreType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  wing: string;
  scores: Record<number, number>;
}

export interface AstrologyPlacement {
  sign: string;
  element: string;
  modality?: string;
}

export interface AstrologyData {
  sun: AstrologyPlacement;
  moon: AstrologyPlacement | null;
  rising: AstrologyPlacement | null;
  mercury: AstrologyPlacement | null;
  venus: AstrologyPlacement | null;
}

export interface FrameworkScores {
  big5: Big5Scores;
  mbti: MBTIType | null;
  enneagram: EnneagramType;
  astrology: AstrologyData;
}

/* =========================
   HELPERS
========================= */

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

function get3(answers: QuizAnswers, q: string, neutral: 0 | 1 | 2 = 1): 0 | 1 | 2 {
  const v = answers[q];
  return v === 0 || v === 1 || v === 2 ? v : neutral;
}

function tiePick(answers: QuizAnswers, salt: string): 0 | 1 {
  const keys = Object.keys(answers).sort();
  let str = salt;
  for (const k of keys) str += `|${k}:${answers[k]}`;

  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash & 1) as 0 | 1;
}

/* =========================
   BIG 5
========================= */

const BIG5_MAP: [number, number, number] = [20, 50, 80];

function big5Item(a: 0 | 1 | 2): number {
  return BIG5_MAP[a];
}

function avg(nums: number[]): number {
  if (!nums.length) return 50;
  return Math.round(nums.reduce((s, n) => s + n, 0) / nums.length);
}

function calculateBig5(answers: QuizAnswers): Big5Scores {
  // Updated to use new question IDs (q1-q15 for Big5)
  const openness = avg([
    big5Item(get3(answers, "q1")),
    big5Item(get3(answers, "q2")),
    big5Item(get3(answers, "q3"))
  ]);
  
  const conscientiousness = avg([
    big5Item(get3(answers, "q4")),
    big5Item(get3(answers, "q5")),
    big5Item(get3(answers, "q6"))
  ]);
  
  const extraversion = avg([
    big5Item(get3(answers, "q7")),
    big5Item(get3(answers, "q8")),
    big5Item(get3(answers, "q9"))
  ]);
  
  const agreeableness = avg([
    big5Item(get3(answers, "q10")),
    big5Item(get3(answers, "q11")),
    big5Item(get3(answers, "q12"))
  ]);
  
  const neuroticism = avg([
    big5Item(get3(answers, "q13")),
    big5Item(get3(answers, "q14")),
    big5Item(get3(answers, "q15"))
  ]);

  return {
    openness: clamp(openness),
    conscientiousness: clamp(conscientiousness),
    extraversion: clamp(extraversion),
    agreeableness: clamp(agreeableness),
    neuroticism: clamp(neuroticism),
  };
}

/* =========================
   MBTI (OPTIONAL USER INPUT)
========================= */

function parseUserMBTI(mbtiString: string): MBTIType | null {
  const cleaned = mbtiString.trim().toUpperCase();
  const pattern = /^[IE][NS][TF][JP]$/;
  
  if (!pattern.test(cleaned)) return null;

  return {
    type: cleaned,
    preferences: {
      IE: cleaned[0] as "I" | "E",
      SN: cleaned[1] as "S" | "N",
      TF: cleaned[2] as "T" | "F",
      JP: cleaned[3] as "J" | "P",
    },
    source: "user-provided",
  };
}

/* =========================
   ENNEAGRAM
========================= */

const ENNEA_MAP: [number, number, number] = [0, 2, 5];

type EnneaCore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function breakCoreTie(tied: number[], answers: QuizAnswers): number {
  if (tied.length <= 1) return tied[0];
  const pick = tiePick(answers, `ennea-core-${tied.join(",")}`);
  return pick === 0 ? tied[0] : tied[1];
}

function calculateEnneagram(answers: QuizAnswers): EnneagramType {
  const scores: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  };

  // Q16-Q25 = Enneagram detection (10 questions, dual-purpose with Big5)
  const qMap: [string, EnneaCore][] = [
    ["q16", 1], ["q17", 2], ["q18", 3], ["q19", 4], ["q20", 5],
    ["q21", 6], ["q22", 7], ["q23", 8], ["q24", 9], ["q25", 6], // q25 reinforces type 6
  ];

  for (const [qid, typeNum] of qMap) {
    const val = get3(answers, qid);
    scores[typeNum] += ENNEA_MAP[val];
  }

  const max = Math.max(...Object.values(scores));
  const tied = (Object.keys(scores) as unknown as number[]).filter(
    (t) => scores[t] === max
  );

  const coreType = (tied.length === 1 ? tied[0] : breakCoreTie(tied, answers)) as EnneaCore;

  // Wing detection (simplified)
  const lower = coreType === 1 ? 9 : coreType - 1;
  const higher = coreType === 9 ? 1 : coreType + 1;
  const wing = scores[lower] > scores[higher] ? `${coreType}w${lower}` : `${coreType}w${higher}`;

  return { coreType, wing, scores };
}

/* =========================
   ASTROLOGY (FULL NATAL CHART)
========================= */

interface ZodiacSign {
  name: string;
  element: string;
  modality: string;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: "Aries", element: "Fire", modality: "Cardinal" },
  { name: "Taurus", element: "Earth", modality: "Fixed" },
  { name: "Gemini", element: "Air", modality: "Mutable" },
  { name: "Cancer", element: "Water", modality: "Cardinal" },
  { name: "Leo", element: "Fire", modality: "Fixed" },
  { name: "Virgo", element: "Earth", modality: "Mutable" },
  { name: "Libra", element: "Air", modality: "Cardinal" },
  { name: "Scorpio", element: "Water", modality: "Fixed" },
  { name: "Sagittarius", element: "Fire", modality: "Mutable" },
  { name: "Capricorn", element: "Earth", modality: "Cardinal" },
  { name: "Aquarius", element: "Air", modality: "Fixed" },
  { name: "Pisces", element: "Water", modality: "Mutable" },
];

function getSunSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS[0];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS[1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS[2];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS[3];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS[4];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS[5];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_SIGNS[6];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_SIGNS[7];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS[8];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS[9];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS[10];
  return ZODIAC_SIGNS[11];
}

// Simplified planetary position calculation (approximation for demo)
// In production, use a proper astronomy library like 'astronomy-engine'
function calculatePlanetaryPositions(birthDate: Date): {
  moon: ZodiacSign;
  mercury: ZodiacSign;
  venus: ZodiacSign;
} {
  // This is a simplified approximation
  // For production, use proper ephemeris calculations
  const sunSign = getSunSign(birthDate);
  const sunIndex = ZODIAC_SIGNS.findIndex(z => z.name === sunSign.name);
  
  // Approximate moon position (moves ~13 degrees/day through zodiac)
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / 86400000);
  const moonIndex = Math.floor((dayOfYear * 13) / 30) % 12;
  
  // Mercury and Venus stay close to Sun
  const mercuryIndex = (sunIndex + 11) % 12; // Usually within 1 sign of Sun
  const venusIndex = (sunIndex + 1) % 12; // Usually within 2 signs of Sun
  
  return {
    moon: ZODIAC_SIGNS[moonIndex],
    mercury: ZODIAC_SIGNS[mercuryIndex],
    venus: ZODIAC_SIGNS[venusIndex],
  };
}

function calculateAstrology(birthDate: Date, birthTime?: string): AstrologyData {
  const sun = getSunSign(birthDate);
  
  // If birth time provided, calculate more accurate positions
  // For now, using simplified calculation
  const planets = calculatePlanetaryPositions(birthDate);
  
  return {
    sun: {
      sign: sun.name,
      element: sun.element,
      modality: sun.modality,
    },
    moon: {
      sign: planets.moon.name,
      element: planets.moon.element,
      modality: planets.moon.modality,
    },
    rising: null, // Requires birth time + location for accurate calculation
    mercury: {
      sign: planets.mercury.name,
      element: planets.mercury.element,
    },
    venus: {
      sign: planets.venus.name,
      element: planets.venus.element,
    },
  };
}

/* =========================
   MAIN CALCULATOR
========================= */

export function calculateFrameworks(
  answers: QuizAnswers,
  birthDate: Date,
  userMBTI?: string,
  birthTime?: string
): FrameworkScores {
  const big5 = calculateBig5(answers);
  const mbti = userMBTI ? parseUserMBTI(userMBTI) : null;
  const enneagram = calculateEnneagram(answers);
  const astrology = calculateAstrology(birthDate, birthTime);

  return {
    big5,
    mbti,
    enneagram,
    astrology,
  };
}