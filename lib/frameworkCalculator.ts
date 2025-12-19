/**
 * FRAMEWORK CALCULATOR
 * Converts 35 quiz answers into Big 5, MBTI, Enneagram, Astrology scores
 */

export interface QuizAnswers {
  [questionId: string]: number; // question ID → selected option index (0, 1, or 2)
}

export interface Big5Scores {
  openness: number;           // 0-100
  conscientiousness: number;  // 0-100
  extraversion: number;       // 0-100
  agreeableness: number;      // 0-100
  neuroticism: number;        // 0-100 (lower = more stable)
}

export interface MBTIType {
  type: string;               // e.g., "ISTJ"
  preferences: {
    IE: "I" | "E";           // Introvert vs Extravert
    SN: "S" | "N";           // Sensing vs Intuitive
    TF: "T" | "F";           // Thinking vs Feeling
    JP: "J" | "P";           // Judging vs Perceiving
  };
}

export interface EnneagramType {
  coreType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  wing: string;               // e.g., "6w5", "4w3"
  scores: Record<number, number>; // Score for each type 1-9
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
 * For MBTI questions:
 * - 0 means left letter
 * - 1 means right letter
 * - 2 means "both" (split vote)
 * - undefined also treated as split vote (so no default bias)
 */
function voteSplit(answer: number | undefined): { left: number; right: number } {
  if (answer === 0) return { left: 1, right: 0 };
  if (answer === 1) return { left: 0, right: 1 };
  // answer === 2 OR undefined
  return { left: 0.5, right: 0.5 };
}

function pickDichotomy(
  answers: QuizAnswers,
  qA: string,
  qB: string,
  left: string,
  right: string
): "I" | "E" | "S" | "N" | "T" | "F" | "J" | "P" {
  const a = voteSplit(answers[qA]);
  const b = voteSplit(answers[qB]);

  const leftScore = a.left + b.left;
  const rightScore = a.right + b.right;

  // If perfectly tied, pick deterministically based on answers (no "always-left" bias)
  if (leftScore === rightScore) {
    const tiePick = deterministicTiePick(answers, `${qA}|${qB}|${left}|${right}`);
    return (tiePick === 0 ? left : right) as any;
  }

  return (leftScore > rightScore ? left : right) as any;
}

/**
 * Deterministic 0/1 pick from answers + salt
 * (stable per exact answer set; not random, not biased toward lower IDs)
 */
function deterministicTiePick(answers: QuizAnswers, salt: string): 0 | 1 {
  const keys = Object.keys(answers).sort();
  let str = salt;
  for (const k of keys) str += `|${k}:${answers[k]}`;

  // Simple hash
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash & 1) as 0 | 1;
}

/**
 * For Enneagram core-type tie breaks:
 * choose deterministically from tied types using the same stable hash approach.
 */
function breakCoreTypeTie(tiedTypes: number[], answers: QuizAnswers): number {
  if (tiedTypes.length === 1) return tiedTypes[0];

  // deterministic index
  const pickBit = deterministicTiePick(answers, `ennea-core-${tiedTypes.join(",")}`);
  // Use pickBit to select from two halves so it distributes across ties
  const idx = pickBit === 0 ? 0 : tiedTypes.length - 1;
  return tiedTypes[idx];
}

/* ============================
   BIG 5
============================ */

/**
 * Calculate Big 5 scores from questions 9-23 (15 questions, 3 per trait)
 */
function calculateBig5(answers: QuizAnswers): Big5Scores {
  // Q9-11: Openness
  const oScores = [
    answers["q9"] !== undefined ? [20, 50, 80][answers["q9"]] : 50,
    answers["q10"] !== undefined ? [20, 50, 80][answers["q10"]] : 50,
    answers["q11"] !== undefined ? [20, 50, 80][answers["q11"]] : 50,
  ];
  const openness = Math.round(oScores.reduce((a, b) => a + b, 0) / oScores.length);

  // Q12-14: Conscientiousness
  const cScores = [
    answers["q12"] !== undefined ? [20, 50, 80][answers["q12"]] : 50,
    answers["q13"] !== undefined ? [20, 50, 80][answers["q13"]] : 50,
    answers["q14"] !== undefined ? [20, 50, 80][answers["q14"]] : 50,
  ];
  const conscientiousness = Math.round(cScores.reduce((a, b) => a + b, 0) / cScores.length);

  // Q15-17: Extraversion
  const eScores = [
    answers["q15"] !== undefined ? [20, 50, 80][answers["q15"]] : 50,
    answers["q16"] !== undefined ? [20, 50, 80][answers["q16"]] : 50,
    answers["q17"] !== undefined ? [20, 50, 80][answers["q17"]] : 50,
  ];
  const extraversion = Math.round(eScores.reduce((a, b) => a + b, 0) / eScores.length);

  // Q18-20: Agreeableness
  const aScores = [
    answers["q18"] !== undefined ? [20, 50, 80][answers["q18"]] : 50,
    answers["q19"] !== undefined ? [20, 50, 80][answers["q19"]] : 50,
    answers["q20"] !== undefined ? [20, 50, 80][answers["q20"]] : 50,
  ];
  const agreeableness = Math.round(aScores.reduce((a, b) => a + b, 0) / aScores.length);

  // Q21-23: Neuroticism
  const nScores = [
    answers["q21"] !== undefined ? [20, 50, 80][answers["q21"]] : 50,
    answers["q22"] !== undefined ? [20, 50, 80][answers["q22"]] : 50,
    answers["q23"] !== undefined ? [20, 50, 80][answers["q23"]] : 50,
  ];
  const neuroticism = Math.round(nScores.reduce((a, b) => a + b, 0) / nScores.length);

  return {
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    neuroticism,
  };
}

/* ============================
   MBTI
============================ */

/**
 * Calculate MBTI type from questions 1-8 (8 questions, 2 per dichotomy)
 *
 * Key improvement:
 * Option 2 ("both/depends") is now treated as 0.5 vote each side,
 * preventing the old "defaults-to-left" bias.
 */
function calculateMBTI(answers: QuizAnswers): MBTIType {
  const IE = pickDichotomy(answers, "q1", "q2", "I", "E");
  const SN = pickDichotomy(answers, "q3", "q4", "S", "N");
  const TF = pickDichotomy(answers, "q5", "q6", "T", "F");
  const JP = pickDichotomy(answers, "q7", "q8", "J", "P");

  return {
    type: `${IE}${SN}${TF}${JP}`,
    preferences: { IE, SN, TF, JP },
  };
}

/* ============================
   ENNEAGRAM
============================ */

/**
 * Calculate Enneagram type from questions 24-35 (12 questions)
 */
function calculateEnneagram(answers: QuizAnswers): EnneagramType {
  const typeScores: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  };

  const typeQuestions = [
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

  typeQuestions.forEach(({ q, type }) => {
    const answer = answers[q];
    if (answer === 0) typeScores[type] += 0;
    if (answer === 1) typeScores[type] += 1;
    if (answer === 2) typeScores[type] += 3;
  });

  // Find highest score
  const entries = Object.entries(typeScores).map(([k, v]) => ({ type: Number(k), score: v }));
  const maxScore = Math.max(...entries.map(e => e.score));

  // ✅ Tie-safe selection (no "always type 1" bias)
  const tied = entries.filter(e => e.score === maxScore).map(e => e.type).sort((a, b) => a - b);
  const chosenCore = breakCoreTypeTie(tied, answers);

  const coreType = chosenCore as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  // Determine wing (adjacent types)
  const wingMap: Record<number, [number, number]> = {
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
   * Your wing questions are broad (q33-35), so keep it simple but less biased:
   * - q34 and q35 indicate "structured vs flowing"
   * - if tied/neutral, pick deterministically.
   */
  let structured = 0;
  let flowing = 0;

  // q34: 0 structured, 1 balanced, 2 flowing
  if (answers["q34"] === 0) structured += 1;
  if (answers["q34"] === 2) flowing += 1;

  // q35: 0 excellence/mastery (structured), 1 connection (neutral-ish), 2 freedom/intensity (flowing)
  if (answers["q35"] === 0) structured += 1;
  if (answers["q35"] === 2) flowing += 1;

  let wingNum: number;
  if (structured > flowing) {
    // pick the wing that is "more structured" if possible, else default to higherWing
    const structuredTypes = new Set([1, 3, 6]);
    if (structuredTypes.has(lowerWing) && !structuredTypes.has(higherWing)) wingNum = lowerWing;
    else if (structuredTypes.has(higherWing) && !structuredTypes.has(lowerWing)) wingNum = higherWing;
    else wingNum = higherWing;
  } else if (flowing > structured) {
    const flowingTypes = new Set([4, 7, 9]);
    if (flowingTypes.has(lowerWing) && !flowingTypes.has(higherWing)) wingNum = lowerWing;
    else if (flowingTypes.has(higherWing) && !flowingTypes.has(lowerWing)) wingNum = higherWing;
    else wingNum = lowerWing;
  } else {
    // tie: pick deterministically
    wingNum = deterministicTiePick(answers, `ennea-wing-${coreType}`) === 0 ? lowerWing : higherWing;
  }

  const wing = `${coreType}w${wingNum}`;

  return {
    coreType,
    wing,
    scores: typeScores,
  };
}

/* ============================
   ASTROLOGY
============================ */

/**
 * Calculate astrology from birth date
 */
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

/**
 * MAIN FUNCTION: Calculate all framework scores
 */
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
