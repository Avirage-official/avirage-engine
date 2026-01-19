/**
 * PATTERN DETECTOR (UPGRADED v2)
 * - Uses full natal chart (5 placements)
 * - Dynamic MBTI handling (optional)
 */

import { FrameworkScores } from "./frameworkCalculator";

export interface PatternMatch {
  patternId: number;
  patternName: string;
  confidence: number;
  frameworkSupport: {
    big5: boolean;
    mbti: boolean;
    enneagram: boolean;
    astrology: boolean;
  };
}

export interface DetectedPatterns {
  [patternId: number]: PatternMatch;
}

type Big5 = FrameworkScores["big5"];
type Mbti = FrameworkScores["mbti"];
type Ennea = FrameworkScores["enneagram"];
type Astro = FrameworkScores["astrology"];

type IndicatorSet = {
  big5: (scores: Big5) => boolean;
  mbti: (type: Mbti | null) => boolean;
  enneagram: (type: Ennea) => boolean;
  astrology: (data: Astro) => boolean;
};

type PatternRule = {
  id: number;
  name: string;
  indicators: IndicatorSet;
};

/* =========================
   FRAMEWORK WEIGHTS
========================= */

function getFrameworkWeights(hasMBTI: boolean) {
  if (hasMBTI) {
    return {
      big5: 0.45,
      enneagram: 0.25,
      mbti: 0.15,
      astrology: 0.15,
    };
  }
  return {
    big5: 0.50,
    enneagram: 0.30,
    mbti: 0.0,
    astrology: 0.20,
  };
}

function hasBehavioralAnchor(support: { big5: boolean; enneagram: boolean }): boolean {
  return support.big5 || support.enneagram;
}

function computeWeightedConfidence(
  support: {
    big5: boolean;
    mbti: boolean;
    enneagram: boolean;
    astrology: boolean;
  },
  hasMBTI: boolean
): number {
  const weights = getFrameworkWeights(hasMBTI);
  let score = 0;
  if (support.big5) score += weights.big5;
  if (support.enneagram) score += weights.enneagram;
  if (support.mbti && hasMBTI) score += weights.mbti;
  if (support.astrology) score += weights.astrology;
  return Math.max(0, Math.min(1, score));
}

/* =========================
   ASTROLOGY HELPERS
========================= */

function countElement(astro: Astro, element: string): number {
  let count = 0;
  if (astro.sun.element === element) count++;
  if (astro.moon?.element === element) count++;
  if (astro.rising?.element === element) count++;
  if (astro.mercury?.element === element) count++;
  if (astro.venus?.element === element) count++;
  return count;
}

function hasElement(astro: Astro, element: string): boolean {
  return countElement(astro, element) >= 2; // At least 2 placements
}

function dominantElement(astro: Astro): string {
  const elements = ["Fire", "Earth", "Air", "Water"];
  const counts = elements.map(e => ({ element: e, count: countElement(astro, e) }));
  counts.sort((a, b) => b.count - a.count);
  return counts[0].element;
}

/* =========================
   PATTERN RULES
========================= */

const PATTERN_RULES: PatternRule[] = [
  {
    id: 1,
    name: "Abstract Thinking",
    indicators: {
      big5: (scores) => scores.openness >= 70,
      mbti: (type) => type?.preferences.SN === "N" || false,
      enneagram: (type) => [4, 5, 7].includes(type.coreType),
      astrology: (data) => hasElement(data, "Air") || hasElement(data, "Fire"),
    },
  },
  {
    id: 2,
    name: "Concrete Practical Focus",
    indicators: {
      big5: (scores) => scores.openness <= 50,
      mbti: (type) => type?.preferences.SN === "S" || false,
      enneagram: (type) => [1, 6, 8, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Earth"),
    },
  },
  {
    id: 3,
    name: "Pattern Recognition Mastery",
    indicators: {
      big5: (scores) => scores.openness >= 70,
      mbti: (type) => type?.preferences.SN === "N" || false,
      enneagram: (type) => [5, 7].includes(type.coreType),
      astrology: (data) => data.sun.sign === "Scorpio" || hasElement(data, "Air"),
    },
  },
  {
    id: 4,
    name: "Sensory Appreciation",
    indicators: {
      big5: (scores) => scores.openness >= 60,
      mbti: (type) => type?.preferences.SN === "S" || false,
      enneagram: (type) => [4, 7, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Earth") || data.venus?.element === "Earth",
    },
  },
  {
    id: 5,
    name: "Detail Obsession",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 75,
      mbti: (type) => type?.preferences.SN === "S" && type?.preferences.JP === "J",
      enneagram: (type) => [1, 5, 6].includes(type.coreType),
      astrology: (data) => data.sun.sign === "Virgo" || data.mercury?.sign === "Virgo",
    },
  },
  {
    id: 6,
    name: "Present-Moment Focus",
    indicators: {
      big5: (scores) => scores.openness <= 55 && scores.conscientiousness <= 55,
      mbti: (type) => type?.preferences.SN === "S" && type?.preferences.JP === "P",
      enneagram: (type) => [7, 8, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Fire") || hasElement(data, "Water"),
    },
  },
  {
    id: 7,
    name: "Craftsmanship Drive",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 70,
      mbti: (type) => type?.preferences.SN === "S" && type?.preferences.TF === "T",
      enneagram: (type) => [1, 3, 5].includes(type.coreType),
      astrology: (data) => hasElement(data, "Earth"),
    },
  },
  {
    id: 8,
    name: "Structure Preference",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 65,
      mbti: (type) => type?.preferences.JP === "J" || false,
      enneagram: (type) => [1, 6].includes(type.coreType),
      astrology: (data) => data.sun.modality === "Fixed" || hasElement(data, "Earth"),
    },
  },
  {
    id: 9,
    name: "Improvisation Comfort",
    indicators: {
      big5: (scores) => scores.conscientiousness <= 45 && scores.openness >= 60,
      mbti: (type) => type?.preferences.JP === "P" || false,
      enneagram: (type) => [7, 9].includes(type.coreType),
      astrology: (data) => data.sun.modality === "Mutable" || hasElement(data, "Fire"),
    },
  },
  {
    id: 10,
    name: "Slow Steady Pace",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 60 && scores.extraversion <= 50,
      mbti: (type) => type?.preferences.IE === "I" && type?.preferences.JP === "J",
      enneagram: (type) => [4, 5, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Earth") || data.sun.modality === "Fixed",
    },
  },
  {
    id: 11,
    name: "High Energy Output",
    indicators: {
      big5: (scores) => scores.extraversion >= 70 && scores.conscientiousness >= 60,
      mbti: (type) => type?.preferences.IE === "E" && type?.preferences.JP === "J",
      enneagram: (type) => [3, 7, 8].includes(type.coreType),
      astrology: (data) => hasElement(data, "Fire") || data.sun.modality === "Cardinal",
    },
  },
  {
    id: 12,
    name: "Product-Over-Process",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 70,
      mbti: (type) => type?.preferences.TF === "T" && type?.preferences.JP === "J",
      enneagram: (type) => [1, 3, 8].includes(type.coreType),
      astrology: (data) => hasElement(data, "Fire") || hasElement(data, "Earth"),
    },
  },
  {
    id: 13,
    name: "Emotional Stability",
    indicators: {
      big5: (scores) => scores.neuroticism <= 35,
      mbti: (type) => type?.preferences.TF === "T" || false,
      enneagram: (type) => [8, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Earth") || hasElement(data, "Air"),
    },
  },
  {
    id: 14,
    name: "Emotional Volatility",
    indicators: {
      big5: (scores) => scores.neuroticism >= 65,
      mbti: (type) => type?.preferences.TF === "F" || false,
      enneagram: (type) => [4, 6].includes(type.coreType),
      astrology: (data) => hasElement(data, "Water") || data.moon?.element === "Water",
    },
  },
  {
    id: 15,
    name: "Expressive Nature",
    indicators: {
      big5: (scores) => scores.extraversion >= 70 && scores.agreeableness >= 60,
      mbti: (type) => type?.preferences.IE === "E" && type?.preferences.TF === "F",
      enneagram: (type) => [2, 3, 7].includes(type.coreType),
      astrology: (data) => hasElement(data, "Fire") || hasElement(data, "Air"),
    },
  },
  {
    id: 16,
    name: "Environmental Sensitivity",
    indicators: {
      big5: (scores) => scores.neuroticism >= 55 && scores.openness >= 60,
      mbti: (type) => type?.preferences.SN === "S" || false,
      enneagram: (type) => [4, 5, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Water") || data.moon?.element === "Water",
    },
  },
  {
    id: 17,
    name: "Deep Introspection",
    indicators: {
      big5: (scores) => scores.extraversion <= 40 && scores.openness >= 65,
      mbti: (type) => type?.preferences.IE === "I" && type?.preferences.SN === "N",
      enneagram: (type) => [4, 5].includes(type.coreType),
      astrology: (data) => hasElement(data, "Water") || data.sun.sign === "Scorpio",
    },
  },
  {
    id: 18,
    name: "Optimistic Baseline",
    indicators: {
      big5: (scores) => scores.neuroticism <= 40 && scores.extraversion >= 60,
      mbti: (type) => type?.preferences.IE === "E" || false,
      enneagram: (type) => [7, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Fire") || hasElement(data, "Air"),
    },
  },
  {
    id: 19,
    name: "Social Energy",
    indicators: {
      big5: (scores) => scores.extraversion >= 70,
      mbti: (type) => type?.preferences.IE === "E" || false,
      enneagram: (type) => [2, 3, 7].includes(type.coreType),
      astrology: (data) => hasElement(data, "Air") || hasElement(data, "Fire"),
    },
  },
  {
    id: 20,
    name: "Solitude Preference",
    indicators: {
      big5: (scores) => scores.extraversion <= 35,
      mbti: (type) => type?.preferences.IE === "I" || false,
      enneagram: (type) => [4, 5, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Earth") || hasElement(data, "Water"),
    },
  },
  {
    id: 21,
    name: "Large Group Comfort",
    indicators: {
      big5: (scores) => scores.extraversion >= 75 && scores.agreeableness >= 55,
      mbti: (type) => type?.preferences.IE === "E" || false,
      enneagram: (type) => [2, 7].includes(type.coreType),
      astrology: (data) => hasElement(data, "Fire") || hasElement(data, "Air"),
    },
  },
  {
    id: 22,
    name: "Conflict Avoidance",
    indicators: {
      big5: (scores) => scores.agreeableness >= 70 && scores.neuroticism >= 50,
      mbti: (type) => type?.preferences.TF === "F" || false,
      enneagram: (type) => [2, 6, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Water") || hasElement(data, "Air"),
    },
  },
  {
    id: 23,
    name: "Direct Confrontation",
    indicators: {
      big5: (scores) => scores.agreeableness <= 45 && scores.extraversion >= 60,
      mbti: (type) => type?.preferences.TF === "T" || false,
      enneagram: (type) => [1, 8].includes(type.coreType),
      astrology: (data) => hasElement(data, "Fire") || data.sun.modality === "Cardinal",
    },
  },
  {
    id: 24,
    name: "Influence Drive",
    indicators: {
      big5: (scores) => scores.extraversion >= 70 && scores.conscientiousness >= 65,
      mbti: (type) => type?.preferences.IE === "E" && type?.preferences.TF === "T",
      enneagram: (type) => [3, 8].includes(type.coreType),
      astrology: (data) => hasElement(data, "Fire") || data.sun.modality === "Cardinal",
    },
  },
  {
    id: 25,
    name: "Collaborative Preference",
    indicators: {
      big5: (scores) => scores.agreeableness >= 65 && scores.extraversion >= 55,
      mbti: (type) => type?.preferences.TF === "F" || false,
      enneagram: (type) => [2, 6, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Air") || hasElement(data, "Water"),
    },
  },
  {
    id: 26,
    name: "Nature Connection",
    indicators: {
      big5: (scores) => scores.openness >= 60 && scores.agreeableness >= 60,
      mbti: (type) => type?.preferences.SN === "S" || false,
      enneagram: (type) => [4, 9].includes(type.coreType),
      astrology: (data) => hasElement(data, "Earth") || data.venus?.element === "Earth",
    },
  },
];

/* =========================
   DETECTION
========================= */

export function detectPatterns(frameworks: FrameworkScores): DetectedPatterns {
  const detectedPatterns: DetectedPatterns = {};
  const hasMBTI = frameworks.mbti !== null;

  for (const pattern of PATTERN_RULES) {
    const frameworkSupport = {
      big5: pattern.indicators.big5(frameworks.big5),
      mbti: pattern.indicators.mbti(frameworks.mbti),
      enneagram: pattern.indicators.enneagram(frameworks.enneagram),
      astrology: pattern.indicators.astrology(frameworks.astrology),
    };

    if (!hasBehavioralAnchor({ big5: frameworkSupport.big5, enneagram: frameworkSupport.enneagram })) {
      continue;
    }

    const confidence = computeWeightedConfidence(frameworkSupport, hasMBTI);

    if (confidence >= 0.5) {
      detectedPatterns[pattern.id] = {
        patternId: pattern.id,
        patternName: pattern.name,
        confidence,
        frameworkSupport,
      };
    }
  }

  return detectedPatterns;
}

export function getPattern(patterns: DetectedPatterns, patternId: number): PatternMatch | null {
  return patterns[patternId] || null;
}

export function getStrongPatterns(patterns: DetectedPatterns): PatternMatch[] {
  return Object.values(patterns).filter((p) => p.confidence >= 0.75);
}

export function getModeratePatterns(patterns: DetectedPatterns): PatternMatch[] {
  return Object.values(patterns).filter((p) => p.confidence >= 0.5 && p.confidence < 0.75);
}