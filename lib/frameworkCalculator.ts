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

  // Q21-23: Neuroticism (Emotional Stability reversed)
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

/**
 * Calculate MBTI type from questions 1-8 (8 questions, 2 per dichotomy)
 */
function calculateMBTI(answers: QuizAnswers): MBTIType {
  // Q1-2: I/E (Introversion/Extraversion)
  const ieVotes = [
    answers["q1"] === 0 ? "I" : answers["q1"] === 1 ? "E" : null,
    answers["q2"] === 0 ? "I" : answers["q2"] === 1 ? "E" : null,
  ].filter(Boolean);
  const IE = ieVotes.filter(v => v === "I").length >= ieVotes.filter(v => v === "E").length ? "I" : "E";

  // Q3-4: S/N (Sensing/Intuition)
  const snVotes = [
    answers["q3"] === 0 ? "S" : answers["q3"] === 1 ? "N" : null,
    answers["q4"] === 0 ? "S" : answers["q4"] === 1 ? "N" : null,
  ].filter(Boolean);
  const SN = snVotes.filter(v => v === "S").length >= snVotes.filter(v => v === "N").length ? "S" : "N";

  // Q5-6: T/F (Thinking/Feeling)
  const tfVotes = [
    answers["q5"] === 0 ? "T" : answers["q5"] === 1 ? "F" : null,
    answers["q6"] === 0 ? "T" : answers["q6"] === 1 ? "F" : null,
  ].filter(Boolean);
  const TF = tfVotes.filter(v => v === "T").length >= tfVotes.filter(v => v === "F").length ? "T" : "F";

  // Q7-8: J/P (Judging/Perceiving)
  const jpVotes = [
    answers["q7"] === 0 ? "J" : answers["q7"] === 1 ? "P" : null,
    answers["q8"] === 0 ? "J" : answers["q8"] === 1 ? "P" : null,
  ].filter(Boolean);
  const JP = jpVotes.filter(v => v === "J").length >= jpVotes.filter(v => v === "P").length ? "J" : "P";

  return {
    type: `${IE}${SN}${TF}${JP}`,
    preferences: { IE, SN, TF, JP },
  };
}

/**
 * Calculate Enneagram type from questions 24-35 (12 questions)
 */
function calculateEnneagram(answers: QuizAnswers): EnneagramType {
  // Q24-32: Core type questions (9 questions, 1 per type)
  const typeScores: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  };

  // Score each type based on responses
  // Option 0 = Not type, Option 1 = Mild, Option 2 = Strong
  const typeQuestions = [
    { q: "q24", type: 1 }, // Type 1
    { q: "q25", type: 2 }, // Type 2
    { q: "q26", type: 3 }, // Type 3
    { q: "q27", type: 4 }, // Type 4
    { q: "q28", type: 5 }, // Type 5
    { q: "q29", type: 6 }, // Type 6
    { q: "q30", type: 7 }, // Type 7
    { q: "q31", type: 8 }, // Type 8
    { q: "q32", type: 9 }, // Type 9
  ];

  typeQuestions.forEach(({ q, type }) => {
    const answer = answers[q];
    if (answer === 0) typeScores[type] += 0;      // Not this type
    if (answer === 1) typeScores[type] += 1;      // Mild signal
    if (answer === 2) typeScores[type] += 3;      // Strong signal
  });

  // Find highest scoring type
  const coreType = (Object.entries(typeScores)
    .sort((a, b) => b[1] - a[1])[0][0] as unknown) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  // Determine wing from Q33-35
  // Simplified wing logic based on question patterns
  const wingIndicators = {
    toward_structured: 0,  // Wing toward 1, 3, 6
    toward_flowing: 0,     // Wing toward 4, 7, 9
    toward_social: 0,      // Wing toward 2, 3, 7
    toward_withdrawn: 0,   // Wing toward 4, 5, 8
  };

  if (answers["q33"] === 0) wingIndicators.toward_withdrawn += 1;
  if (answers["q33"] === 2) wingIndicators.toward_social += 1;
  
  if (answers["q34"] === 0) wingIndicators.toward_structured += 1;
  if (answers["q34"] === 2) wingIndicators.toward_flowing += 1;
  
  if (answers["q35"] === 0) wingIndicators.toward_structured += 1;
  if (answers["q35"] === 2) wingIndicators.toward_flowing += 1;

  // Determine wing direction based on core type
  let wingDirection: "w" + (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9);
  
  // Simple wing logic: adjacent types
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
  
  // Pick wing based on indicators (simplified)
  const wingNum = wingIndicators.toward_structured > wingIndicators.toward_flowing
    ? (coreType === 1 ? lowerWing : higherWing)
    : lowerWing;

  const wing = `${coreType}w${wingNum}`;

  return {
    coreType,
    wing,
    scores: typeScores,
  };
}

/**
 * Calculate astrology from birth date
 */
function calculateAstrology(birthDate: Date): AstrologyData {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  // Sun sign calculation
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

  // Element mapping
  const elementMap: Record<string, string> = {
    Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
    Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
    Gemini: "Air", Libra: "Air", Aquarius: "Air",
    Cancer: "Water", Scorpio: "Water", Pisces: "Water",
  };

  // Modality mapping
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
