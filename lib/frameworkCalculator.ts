/**
 * FRAMEWORK CALCULATOR (REVIEW + UPGRADE)
 * Converts 35 situational quiz answers into:
 * - Big 5
 * - MBTI
 * - Enneagram (core + wing)
 * - Astrology (sun sign + element + modality)
 *
 * Key upgrades:
 * - Missing answers => neutral (prevents bias)
 * - Smoother scaling for 3-choice items
 * - MBTI returns optional strength (0-100 per dichotomy)
 * - Enneagram uses stronger separation + wing affinity model
 */

export interface QuizAnswers {
  [questionId: string]: number; // question ID -> option index (0,1,2)
}

export interface Big5Scores {
  openness: number; // 0-100
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number; // higher = more reactive
}

export interface MBTIType {
  type: string; // e.g., "INTJ"
  preferences: {
    IE: "I" | "E";
    SN: "S" | "N";
    TF: "T" | "F";
    JP: "J" | "P";
  };
  strength?: {
    IE: number;
    SN: number;
    TF: number;
    JP: number;
  };
}

export interface EnneagramType {
  coreType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  wing: string; // e.g., "6w5"
  scores: Record<number, number>;
  wingAffinity?: {
    lowerWing: number;
    higherWing: number;
  };
}

export interface AstrologyData {
  sunSign: string;
  element: string;  // Fire/Earth/Air/Water
  modality: string; // Cardinal/Fixed/Mutable
}

export interface FrameworkScores {
  big5: Big5Scores;
  mbti: MBTIType;
  enneagram: EnneagramType;
  astrology: AstrologyData;
}

/* =========================
   HELPERS
========================= */

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

/**
 * Neutral default for 3-option questions is 1 ("middle").
 */
function get3(answers: QuizAnswers, q: string, neutral: 0 | 1 | 2 = 1): 0 | 1 | 2 {
  const v = answers[q];
  return v === 0 || v === 1 || v === 2 ? v : neutral;
}

/**
 * Stable deterministic tie-breaker from the answer set.
 * (No randomness, same input -> same output)
 */
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
   BIG 5 (Q9–Q23)
========================= */

/**
 * 3-option scale tuned for better spread:
 * 0 -> 20, 1 -> 50, 2 -> 80 (classic), then lightly expanded by centering math.
 * We keep it explainable + stable.
 */
const BIG5_MAP: [number, number, number] = [20, 50, 80];

function big5Item(a: 0 | 1 | 2): number {
  return BIG5_MAP[a];
}

function avg(nums: number[]): number {
  if (!nums.length) return 50;
  return Math.round(nums.reduce((s, n) => s + n, 0) / nums.length);
}

function calculateBig5(answers: QuizAnswers): Big5Scores {
  const openness = avg([big5Item(get3(answers, "q9")), big5Item(get3(answers, "q10")), big5Item(get3(answers, "q11"))]);
  const conscientiousness = avg([big5Item(get3(answers, "q12")), big5Item(get3(answers, "q13")), big5Item(get3(answers, "q14"))]);
  const extraversion = avg([big5Item(get3(answers, "q15")), big5Item(get3(answers, "q16")), big5Item(get3(answers, "q17"))]);
  const agreeableness = avg([big5Item(get3(answers, "q18")), big5Item(get3(answers, "q19")), big5Item(get3(answers, "q20"))]);
  const neuroticism = avg([big5Item(get3(answers, "q21")), big5Item(get3(answers, "q22")), big5Item(get3(answers, "q23"))]);

  return {
    openness: clamp(openness),
    conscientiousness: clamp(conscientiousness),
    extraversion: clamp(extraversion),
    agreeableness: clamp(agreeableness),
    neuroticism: clamp(neuroticism),
  };
}

/* =========================
   MBTI (Q1–Q8)
========================= */

/**
 * For MBTI:
 * 0 = left letter
 * 1 = right letter
 * 2 = "both/depends" => split vote
 */
function voteMBTI(v: number | undefined): { left: number; right: number } {
  if (v === 0) return { left: 1, right: 0 };
  if (v === 1) return { left: 0, right: 1 };
  return { left: 0.5, right: 0.5 };
}

function pickDichotomy<L extends string, R extends string>(
  answers: QuizAnswers,
  qA: string,
  qB: string,
  left: L,
  right: R
): { pref: L | R; strength: number } {
  const a = voteMBTI(answers[qA]);
  const b = voteMBTI(answers[qB]);

  const leftScore = a.left + b.left;   // 0..2
  const rightScore = a.right + b.right; // 0..2

  // strength: abs diff mapped 0..100
  const strength = Math.round((Math.abs(leftScore - rightScore) / 2) * 100);

  if (leftScore === rightScore) {
    const pick = tiePick(answers, `mbti-${qA}-${qB}-${left}-${right}`);
    return { pref: pick === 0 ? left : right, strength: 0 };
  }
  return { pref: leftScore > rightScore ? left : right, strength };
}

function calculateMBTI(answers: QuizAnswers): MBTIType {
  const ie = pickDichotomy(answers, "q1", "q2", "I", "E");
  const sn = pickDichotomy(answers, "q3", "q4", "S", "N");
  const tf = pickDichotomy(answers, "q5", "q6", "T", "F");
  const jp = pickDichotomy(answers, "q7", "q8", "J", "P");

  const IE = ie.pref;
  const SN = sn.pref;
  const TF = tf.pref;
  const JP = jp.pref;

  return {
    type: `${IE}${SN}${TF}${JP}`,
    preferences: { IE, SN, TF, JP },
    strength: { IE: ie.strength, SN: sn.strength, TF: tf.strength, JP: jp.strength },
  };
}

/* =========================
   ENNEAGRAM (Q24–Q35)
========================= */

/**
 * Q24–Q32: one per type (1..9)
 * Score map tuned for better separation while keeping “middle” meaningful:
 * 0 -> 0, 1 -> 2, 2 -> 5
 */
const ENNEA_MAP: [number, number, number] = [0, 2, 5];

type EnneaCore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function breakCoreTie(tied: number[], answers: QuizAnswers): number {
  if (tied.length <= 1) return tied[0];
  const pick = tiePick(answers, `ennea-core-${tied.join(",")}`);
  return pick === 0 ? tied[0] : tied[tied.length - 1];
}

function calculateEnneagram(answers: QuizAnswers): EnneagramType {
  const scores: Record<number, number> = { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };

  const mapping: { q: string; type: EnneaCore }[] = [
    { q: "q24", type: 1 },
    { q: "q25", type: 2 },
    { q: "q26", type: 3 },
    { q: "q27", type: 4 },
    { q: "q28", type: 5 },
    { q: "q29", type: 6 },
    { q: "q30", type: 7 },
    { q: "q31", type: 8 },
    { q: "q32", type: 9 },
  ];

  for (const { q, type } of mapping) {
    const a = get3(answers, q, 1);
    scores[type] += ENNEA_MAP[a];
  }

  const max = Math.max(...Object.values(scores));
  const tied = Object.entries(scores)
    .filter(([, v]) => v === max)
    .map(([k]) => Number(k))
    .sort((a, b) => a - b);

  const coreType = breakCoreTie(tied, answers) as EnneaCore;

  // wing candidates
  const wingMap: Record<EnneaCore, [EnneaCore, EnneaCore]> = {
    1: [9, 2],
    2: [1, 3],
    3: [2, 4],
    4: [3, 5],
    5: [4, 6],
    6: [5, 7],
    7: [6, 8],
    8: [7, 9],
    9: [8, 1],
  };

  const [lowerWing, higherWing] = wingMap[coreType];

  /**
   * Wing questions:
   * q33 warmth: 0 reserved, 1 balanced, 2 warm
   * q34 structure: 0 structured, 1 balanced, 2 flowing
   * q35 drive: 0 mastery, 1 connection, 2 freedom
   */
  const warmth = get3(answers, "q33", 1) / 2;        // 0..1
  const structured = 1 - get3(answers, "q34", 1) / 2; // 1..0
  const freedom = get3(answers, "q35", 1) / 2;        // 0..1

  // Light feature “vectors” per type for wing selection (nudges only)
  const vec: Record<EnneaCore, { warm: number; struct: number; free: number }> = {
    1: { warm: 0.35, struct: 0.95, free: 0.15 },
    2: { warm: 0.90, struct: 0.45, free: 0.35 },
    3: { warm: 0.55, struct: 0.80, free: 0.25 },
    4: { warm: 0.65, struct: 0.35, free: 0.70 },
    5: { warm: 0.20, struct: 0.70, free: 0.40 },
    6: { warm: 0.45, struct: 0.85, free: 0.20 },
    7: { warm: 0.75, struct: 0.25, free: 0.95 },
    8: { warm: 0.40, struct: 0.55, free: 0.80 },
    9: { warm: 0.60, struct: 0.40, free: 0.55 },
  };

  const sim = (t: EnneaCore) => {
    const v = vec[t];
    const dw = 1 - Math.abs(warmth - v.warm);
    const ds = 1 - Math.abs(structured - v.struct);
    const df = 1 - Math.abs(freedom - v.free);
    // structure slightly more decisive
    return dw * 0.3 + ds * 0.4 + df * 0.3;
  };

  const lowerAff = sim(lowerWing);
  const higherAff = sim(higherWing);

  let wingNum: EnneaCore;
  if (lowerAff === higherAff) {
    wingNum = tiePick(answers, `ennea-wing-${coreType}`) === 0 ? lowerWing : higherWing;
  } else {
    wingNum = lowerAff > higherAff ? lowerWing : higherWing;
  }

  return {
    coreType,
    wing: `${coreType}w${wingNum}`,
    scores,
    wingAffinity: { lowerWing: Math.round(lowerAff * 100), higherWing: Math.round(higherAff * 100) },
  };
}

/* =========================
   ASTROLOGY (Sun sign only)
========================= */

function calculateAstrology(birthDate: Date): AstrologyData {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  let sunSign = "";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunSign = "Aries";
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunSign = "Taurus";
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunSign = "Gemini";
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunSign = "Cancer";
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunSign = "Leo";
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunSign = "Virgo";
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunSign = "Libra";
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunSign = "Scorpio";
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunSign = "Sagittarius";
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunSign = "Capricorn";
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunSign = "Aquarius";
  else sunSign = "Pisces";

  const elementMap: Record<string, string> = {
    Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
    Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
    Gemini: "Air", Libra: "Air", Aquarius: "Air",
    Cancer: "Water", Scorpio: "Water", Pisces: "Water",
  };

  const modalityMap: Record<string, string> = {
    Aries: "Cardinal", Cancer: "Cardinal", Libra: "Cardinal", Capricorn: "Cardinal",
    Taurus: "Fixed", Leo: "Fixed", Scorpio: "Fixed", Aquarius: "Fixed",
    Gemini: "Mutable", Virgo: "Mutable", Sagittarius: "Mutable", Pisces: "Mutable",
  };

  return { sunSign, element: elementMap[sunSign], modality: modalityMap[sunSign] };
}

/* =========================
   MAIN EXPORT
========================= */

export function calculateFrameworks(answers: QuizAnswers, birthDate: Date): FrameworkScores {
  return {
    big5: calculateBig5(answers),
    mbti: calculateMBTI(answers),
    enneagram: calculateEnneagram(answers),
    astrology: calculateAstrology(birthDate),
  };
}
