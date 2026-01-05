/**
 * FRAMEWORK CALCULATOR
 * Converts 35 quiz answers into Big 5, MBTI, Enneagram, Astrology scores
 *
 * Upgrades (non-breaking):
 * - Neutral handling for missing answers (prevents skew)
 * - Smoother Big5 scaling (still 3 options)
 * - MBTI returns optional strength scores (kept backward compatible)
 * - Enneagram: improved scoring + wing selection via feature-fit (less arbitrary)
 */

export interface QuizAnswers {
  [questionId: string]: number; // question ID → selected option index (0, 1, or 2)
}

export interface Big5Scores {
  openness: number;           // 0-100
  conscientiousness: number;  // 0-100
  extraversion: number;       // 0-100
  agreeableness: number;      // 0-100
  neuroticism: number;        // 0-100 (higher = more reactive)
}

export interface MBTIType {
  type: string;               // e.g., "ISTJ"
  preferences: {
    IE: "I" | "E";
    SN: "S" | "N";
    TF: "T" | "F";
    JP: "J" | "P";
  };

  /**
   * Optional: strength of each dichotomy, 0-100 (how strongly one side won)
   * Backward compatible because it's optional.
   */
  strength?: {
    IE: number;
    SN: number;
    TF: number;
    JP: number;
  };
}

export interface EnneagramType {
  coreType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  wing: string;                     // e.g., "6w5", "4w3"
  scores: Record<number, number>;   // Score for each type 1-9

  /**
   * Optional: wing affinity scores (diagnostic)
   */
  wingAffinity?: {
    lowerWing: number;
    higherWing: number;
  };
}

export interface AstrologyData {
  sunSign: string;            // e.g., "Virgo"
  element: string;            // Fire, Earth, Air, Water
  modality: string;           // Cardinal, Fixed, Mutable
}

export interface FrameworkScores {
  big5: Big5Scores;
  mbti: MBTIType;
  enneagram: EnneagramType;
  astrology: AstrologyData;
}

/* ============================
   HELPERS
============================ */

/**
 * Safe getter with neutral default for missing answers.
 * For 3-option questions: neutral is 1 (middle option).
 */
function getAnswer(answers: QuizAnswers, q: string, neutral: 0 | 1 | 2 = 1): 0 | 1 | 2 {
  const v = answers[q];
  if (v === 0 || v === 1 || v === 2) return v;
  return neutral;
}

/**
 * For MBTI questions:
 * - 0 means left letter
 * - 1 means right letter
 * - 2 means "both/depends" (split vote)
 * - undefined treated as split vote (neutral)
 */
function voteSplit(answer: number | undefined): { left: number; right: number } {
  if (answer === 0) return { left: 1, right: 0 };
  if (answer === 1) return { left: 0, right: 1 };
  // answer === 2 OR undefined
  return { left: 0.5, right: 0.5 };
}

/**
 * Deterministic 0/1 pick from answers + salt
 * (stable per exact answer set; not random)
 */
function deterministicTiePick(answers: QuizAnswers, salt: string): 0 | 1 {
  const keys = Object.keys(answers).sort();
  let str = salt;
  for (const k of keys) str += `|${k}:${answers[k]}`;

  // FNV-like hash
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash & 1) as 0 | 1;
}

function pickDichotomy<L extends string, R extends string>(
  answers: QuizAnswers,
  qA: string,
  qB: string,
  left: L,
  right: R
): { pref: L | R; strength: number } {
  const a = voteSplit(answers[qA]);
  const b = voteSplit(answers[qB]);

  const leftScore = a.left + b.left;
  const rightScore = a.right + b.right;

  // strength: 0 (tie) -> 100 (full 2 votes on one side)
  const diff = Math.abs(leftScore - rightScore);
  const strength = Math.round((diff / 2) * 100);

  if (leftScore === rightScore) {
    const tiePick = deterministicTiePick(answers, `${qA}|${qB}|${left}|${right}`);
    return { pref: tiePick === 0 ? left : right, strength: 0 };
  }

  return { pref: leftScore > rightScore ? left : right, strength };
}

/**
 * Tie-break core type deterministically (stable)
 */
function breakCoreTypeTie(tiedTypes: number[], answers: QuizAnswers): number {
  if (tiedTypes.length === 1) return tiedTypes[0];

  const pickBit = deterministicTiePick(answers, `ennea-core-${tiedTypes.join(",")}`);
  const idx = pickBit === 0 ? 0 : tiedTypes.length - 1;
  return tiedTypes[idx];
}

/* ============================
   BIG 5
============================ */

/**
 * We still have 3 options per item.
 * Upgrade: use a slightly wider + smoother mapping than [20,50,80].
 * This reduces “everyone clusters at 50” and gives more separation.
 */
const BIG5_MAP: [number, number, number] = [15, 50, 85];

function avg3(a: number, b: number, c: number): number {
  return Math.round((a + b + c) / 3);
}

function scoreBig5Item(answer: 0 | 1 | 2): number {
  return BIG5_MAP[answer];
}

/**
 * Calculate Big 5 scores from questions 9-23 (15 questions, 3 per trait)
 * Missing answers default to neutral (middle option).
 */
function calculateBig5(answers: QuizAnswers): Big5Scores {
  const openness = avg3(
    scoreBig5Item(getAnswer(answers, "q9")),
    scoreBig5Item(getAnswer(answers, "q10")),
    scoreBig5Item(getAnswer(answers, "q11"))
  );

  const conscientiousness = avg3(
    scoreBig5Item(getAnswer(answers, "q12")),
    scoreBig5Item(getAnswer(answers, "q13")),
    scoreBig5Item(getAnswer(answers, "q14"))
  );

  const extraversion = avg3(
    scoreBig5Item(getAnswer(answers, "q15")),
    scoreBig5Item(getAnswer(answers, "q16")),
    scoreBig5Item(getAnswer(answers, "q17"))
  );

  const agreeableness = avg3(
    scoreBig5Item(getAnswer(answers, "q18")),
    scoreBig5Item(getAnswer(answers, "q19")),
    scoreBig5Item(getAnswer(answers, "q20"))
  );

  const neuroticism = avg3(
    scoreBig5Item(getAnswer(answers, "q21")),
    scoreBig5Item(getAnswer(answers, "q22")),
    scoreBig5Item(getAnswer(answers, "q23"))
  );

  return { openness, conscientiousness, extraversion, agreeableness, neuroticism };
}

/* ============================
   MBTI
============================ */

/**
 * Calculate MBTI type from questions 1-8 (8 questions, 2 per dichotomy)
 * "Both/depends" remains a split vote (0.5 / 0.5).
 */
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
    strength: {
      IE: ie.strength,
      SN: sn.strength,
      TF: tf.strength,
      JP: jp.strength,
    },
  };
}

/* ============================
   ENNEAGRAM
============================ */

/**
 * Each core-type question (q24-q32) targets one type.
 * We treat:
 * - option 0 = low expression
 * - option 1 = moderate/healthy expression
 * - option 2 = strong/default expression
 *
 * Upgrade: use a curve [0, 2, 5] instead of [0,1,3]
 * This increases separation for strong signals, without making it binary.
 */
const ENNEA_CORE_MAP: [number, number, number] = [0, 2, 5];

type EnneaCore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function calculateEnneagram(answers: QuizAnswers): EnneagramType {
  const typeScores: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  const typeQuestions: { q: string; type: EnneaCore }[] = [
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

  // core scoring (neutral default)
  for (const { q, type } of typeQuestions) {
    const a = getAnswer(answers, q, 1);
    typeScores[type] += ENNEA_CORE_MAP[a];
  }

  // Choose core type with tie-safe deterministic rule
  const entries = Object.entries(typeScores).map(([k, v]) => ({ type: Number(k), score: v }));
  const maxScore = Math.max(...entries.map((e) => e.score));
  const tied = entries
    .filter((e) => e.score === maxScore)
    .map((e) => e.type)
    .sort((a, b) => a - b);

  const chosenCore = breakCoreTypeTie(tied, answers) as EnneaCore;
  const coreType = chosenCore;

  // Wing candidates (adjacent types)
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
   * Wing selection upgrade:
   * Use wing questions (q33-q35) as feature signals, and compare against wing “profiles”.
   *
   * Features:
   * - warmth (q33): 0 reserved, 1 balanced, 2 warm
   * - structure (q34): 0 structured, 1 balanced, 2 flowing
   * - drive (q35): 0 mastery/achievement, 1 connection, 2 freedom/experience
   */
  const warmth = getAnswer(answers, "q33", 1);   // 0..2
  const structure = getAnswer(answers, "q34", 1); // 0..2
  const drive = getAnswer(answers, "q35", 1);     // 0..2

  // Convert to 0..1 floats
  const fWarm = warmth / 2;
  const fStruct = 1 - structure / 2; // 1=structured, 0=flowing
  const fDrive = drive / 2;          // 0 mastery -> 1 freedom

  /**
   * Wing archetype vectors (0..1):
   * These aren’t stereotypes; they’re small nudges to choose between two adjacent wings.
   */
  const wingVector: Record<EnneaCore, { warm: number; struct: number; freedom: number }> = {
    1: { warm: 0.35, struct: 0.95, freedom: 0.15 },
    2: { warm: 0.90, struct: 0.45, freedom: 0.35 },
    3: { warm: 0.55, struct: 0.80, freedom: 0.25 },
    4: { warm: 0.65, struct: 0.35, freedom: 0.70 },
    5: { warm: 0.20, struct: 0.70, freedom: 0.40 },
    6: { warm: 0.45, struct: 0.85, freedom: 0.20 },
    7: { warm: 0.75, struct: 0.25, freedom: 0.95 },
    8: { warm: 0.40, struct: 0.55, freedom: 0.80 },
    9: { warm: 0.60, struct: 0.40, freedom: 0.55 },
  };

  function similarity(type: EnneaCore): number {
    const v = wingVector[type];
    // Weighted cosine-ish similarity (simple, stable, explainable)
    const dw = 1 - Math.abs(fWarm - v.warm);
    const ds = 1 - Math.abs(fStruct - v.struct);
    const df = 1 - Math.abs(fDrive - v.freedom);
    // structure is slightly more decisive in wings than warmth
    return (dw * 0.3) + (ds * 0.4) + (df * 0.3);
  }

  const lowerAff = similarity(lowerWing);
  const higherAff = similarity(higherWing);

  let wingNum: EnneaCore;
  if (lowerAff === higherAff) {
    wingNum = deterministicTiePick(answers, `ennea-wing-${coreType}`) === 0 ? lowerWing : higherWing;
  } else {
    wingNum = lowerAff > higherAff ? lowerWing : higherWing;
  }

  const wing = `${coreType}w${wingNum}`;

  return {
    coreType,
    wing,
    scores: typeScores,
    wingAffinity: { lowerWing: Math.round(lowerAff * 100), higherWing: Math.round(higherAff * 100) },
  };
}

/* ============================
   ASTROLOGY
============================ */

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

  return {
    sunSign,
    element: elementMap[sunSign],
    modality: modalityMap[sunSign],
  };
}

/* ============================
   MAIN
============================ */

export function calculateFrameworks(
  answers: QuizAnswers,
  birthDate: Date
): FrameworkScores {
  return {
    big5: calculateBig5(answers),
    mbti: calculateMBTI(answers),
    enneagram: calculateEnneagram(answers),
    astrology: calculateAstrology(birthDate),
  };
}
