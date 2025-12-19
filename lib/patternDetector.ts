/**
 * PATTERN DETECTOR
 * Detects which of 30 behavioral patterns are present based on framework scores
 *
 * ✅ Changes made (behavior/logic only — your pipeline stays the same):
 * 1) Weighted confidence (Big5 + Enneagram matter more than MBTI + Astrology)
 * 2) “Behavioral anchor” rule: a pattern only exists if Big5 OR Enneagram supports it
 * 3) Fixed a logic bug: Scorpio is a sun sign, not an element
 * 4) Confidence threshold still defaults to 0.5, but now it’s harder to hit accidentally
 */

import { FrameworkScores } from "./frameworkCalculator";

export interface PatternMatch {
  patternId: number;
  patternName: string;
  confidence: number; // 0-1 (weighted support across frameworks)
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

/* ============================
   TYPES
============================ */

type Big5 = FrameworkScores["big5"];
type Mbti = FrameworkScores["mbti"];
type Ennea = FrameworkScores["enneagram"];
type Astro = FrameworkScores["astrology"];

type IndicatorSet = {
  big5: (scores: Big5) => boolean;
  mbti: (type: Mbti) => boolean;
  enneagram: (type: Ennea) => boolean;
  astrology: (data: Astro) => boolean;
};

type PatternRule = {
  id: number;
  name: string;
  indicators: IndicatorSet;
};

/* ============================
   SCORING POLICY
============================ */

/**
 * Framework weights (normalized to 1.0 total)
 * - Big5 + Enneagram: most behaviorally grounded from your input
 * - MBTI: supportive direction (still helpful)
 * - Astrology: symbolic reinforcement (kept, but lowest weight)
 */
const FRAMEWORK_WEIGHTS = {
  big5: 0.4,
  enneagram: 0.3,
  mbti: 0.2,
  astrology: 0.1,
} as const;

/**
 * A pattern should only exist if at least one behavioral anchor supports it:
 * Big5 OR Enneagram.
 * This prevents “MBTI + Astrology” from creating patterns by themselves.
 */
function hasBehavioralAnchor(support: {
  big5: boolean;
  enneagram: boolean;
}): boolean {
  return support.big5 || support.enneagram;
}

/**
 * Weighted confidence:
 * sum(weights of supporting frameworks) / sum(all weights)
 * Since weights sum to 1, this becomes just the supporting sum.
 */
function computeWeightedConfidence(support: {
  big5: boolean;
  mbti: boolean;
  enneagram: boolean;
  astrology: boolean;
}): number {
  let score = 0;

  if (support.big5) score += FRAMEWORK_WEIGHTS.big5;
  if (support.enneagram) score += FRAMEWORK_WEIGHTS.enneagram;
  if (support.mbti) score += FRAMEWORK_WEIGHTS.mbti;
  if (support.astrology) score += FRAMEWORK_WEIGHTS.astrology;

  // Clamp to [0, 1]
  return Math.max(0, Math.min(1, score));
}

/* ============================
   PATTERN RULES
============================ */

const PATTERN_RULES: PatternRule[] = [
  {
    id: 1,
    name: "Abstract Thinking",
    indicators: {
      big5: (scores) => scores.openness >= 70,
      mbti: (type) => type.preferences.SN === "N",
      enneagram: (type) => [4, 5, 7].includes(type.coreType),
      astrology: (data) => ["Air", "Fire"].includes(data.element),
    },
  },
  {
    id: 2,
    name: "Concrete Practical Focus",
    indicators: {
      big5: (scores) => scores.openness <= 50,
      mbti: (type) => type.preferences.SN === "S",
      enneagram: (type) => [1, 6, 8, 9].includes(type.coreType),
      astrology: (data) => data.element === "Earth",
    },
  },
  {
    id: 3,
    name: "Pattern Recognition Mastery",
    indicators: {
      big5: (scores) => scores.openness >= 70,
      mbti: (type) => type.preferences.SN === "N",
      enneagram: (type) => [5, 7].includes(type.coreType),
      // ✅ Fix: Scorpio is a sun sign, not an element
      astrology: (data) => data.element === "Air" || data.sunSign === "Scorpio",
    },
  },
  {
    id: 4,
    name: "Sensory Appreciation",
    indicators: {
      big5: (scores) => scores.openness >= 70,
      mbti: (type) => type.preferences.SN === "S" && type.preferences.TF === "F",
      enneagram: (type) => [4, 7].includes(type.coreType),
      astrology: (data) => ["Taurus", "Libra", "Cancer"].includes(data.sunSign),
    },
  },
  {
    id: 5,
    name: "Detail Obsession",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 75,
      mbti: (type) => type.preferences.SN === "S" && type.preferences.JP === "J",
      enneagram: (type) => [1, 6].includes(type.coreType),
      astrology: (data) => ["Virgo", "Capricorn"].includes(data.sunSign),
    },
  },
  {
    id: 6,
    name: "Present-Moment Focus",
    indicators: {
      big5: (scores) => scores.neuroticism <= 40 && scores.openness >= 40 && scores.openness <= 70,
      mbti: (type) => type.preferences.SN === "S" && type.preferences.JP === "P",
      enneagram: (type) => [7, 8, 9].includes(type.coreType),
      astrology: (data) => data.element === "Fire" || data.sunSign === "Sagittarius",
    },
  },
  {
    id: 7,
    name: "Craftsmanship Drive",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 70 && scores.openness >= 50,
      mbti: (type) => type.preferences.SN === "S" && type.preferences.JP === "J",
      enneagram: (type) => [1, 3, 4].includes(type.coreType),
      astrology: (data) => ["Taurus", "Virgo", "Capricorn"].includes(data.sunSign),
    },
  },
  {
    id: 8,
    name: "Structure Preference",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 70,
      mbti: (type) => type.preferences.JP === "J",
      enneagram: (type) => [1, 3, 6].includes(type.coreType),
      astrology: (data) => data.element === "Earth",
    },
  },
  {
    id: 9,
    name: "Improvisation Comfort",
    indicators: {
      big5: (scores) => scores.conscientiousness <= 40 && scores.openness >= 60,
      mbti: (type) => type.preferences.JP === "P",
      enneagram: (type) => [7, 9].includes(type.coreType),
      astrology: (data) => data.modality === "Mutable",
    },
  },
  {
    id: 10,
    name: "Slow Steady Pace",
    indicators: {
      big5: (scores) => scores.extraversion <= 40 && scores.conscientiousness >= 60,
      mbti: (type) => type.preferences.IE === "I" && type.preferences.JP === "J",
      enneagram: (type) => [1, 5, 9].includes(type.coreType),
      astrology: (data) => data.element === "Earth" || data.modality === "Fixed",
    },
  },
  {
    id: 11,
    name: "High Output Drive",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 75 && scores.extraversion >= 50,
      mbti: (type) => type.preferences.JP === "J" && type.preferences.TF === "T",
      enneagram: (type) => [3, 8].includes(type.coreType),
      astrology: (data) => data.modality === "Cardinal",
    },
  },
  {
    id: 12,
    name: "Emotional Stability",
    indicators: {
      big5: (scores) => scores.neuroticism <= 40,
      mbti: (type) => type.preferences.TF === "T",
      enneagram: (type) => [8, 9].includes(type.coreType),
      astrology: (data) => data.element === "Earth" || data.modality === "Fixed",
    },
  },
  {
    id: 13,
    name: "Emotional Expressiveness",
    indicators: {
      big5: (scores) => scores.extraversion >= 70 && scores.agreeableness >= 60,
      mbti: (type) => type.preferences.TF === "F" && type.preferences.IE === "E",
      enneagram: (type) => [2, 7].includes(type.coreType),
      astrology: (data) => data.element === "Fire" || ["Cancer", "Pisces"].includes(data.sunSign),
    },
  },
  {
    id: 14,
    name: "Emotional Restraint",
    indicators: {
      big5: (scores) => scores.extraversion <= 40 && scores.agreeableness <= 45,
      mbti: (type) => type.preferences.IE === "I" && type.preferences.TF === "T",
      enneagram: (type) => [1, 5, 9].includes(type.coreType),
      astrology: (data) => data.element === "Earth" || ["Capricorn", "Aquarius"].includes(data.sunSign),
    },
  },
  {
    id: 15,
    name: "Environmental Sensitivity",
    indicators: {
      big5: (scores) => scores.openness >= 70 && scores.neuroticism >= 60,
      mbti: (type) => type.preferences.TF === "F" && type.preferences.SN === "N",
      enneagram: (type) => [4, 9].includes(type.coreType),
      astrology: (data) => data.element === "Water",
    },
  },
  {
    id: 16,
    name: "Deep Introspection",
    indicators: {
      big5: (scores) => scores.openness >= 70 && scores.extraversion <= 40,
      mbti: (type) => type.preferences.IE === "I" && type.preferences.SN === "N",
      enneagram: (type) => [4, 5].includes(type.coreType),
      astrology: (data) => data.element === "Water",
    },
  },
  {
    id: 17,
    name: "Low Social Energy",
    indicators: {
      big5: (scores) => scores.extraversion <= 40,
      mbti: (type) => type.preferences.IE === "I",
      enneagram: (type) => [4, 5, 9].includes(type.coreType),
      astrology: (data) => data.element === "Water",
    },
  },
  {
    id: 18,
    name: "High Social Energy",
    indicators: {
      big5: (scores) => scores.extraversion >= 70,
      mbti: (type) => type.preferences.IE === "E",
      enneagram: (type) => [2, 7, 8].includes(type.coreType),
      astrology: (data) => data.element === "Fire" || ["Leo", "Gemini"].includes(data.sunSign),
    },
  },
  {
    id: 19,
    name: "Small Group Preference",
    indicators: {
      big5: (scores) => scores.extraversion >= 30 && scores.extraversion <= 55,
      mbti: (type) => type.preferences.IE === "I",
      enneagram: (type) => [1, 4, 6].includes(type.coreType),
      astrology: (data) => data.element === "Earth" || data.modality === "Fixed",
    },
  },
  {
    id: 20,
    name: "Conflict Avoidance",
    indicators: {
      big5: (scores) => scores.agreeableness >= 70,
      mbti: (type) => type.preferences.TF === "F",
      enneagram: (type) => [2, 6, 9].includes(type.coreType),
      astrology: (data) => ["Libra", "Cancer"].includes(data.sunSign),
    },
  },
  {
    id: 21,
    name: "Collaborative Nature",
    indicators: {
      big5: (scores) => scores.agreeableness >= 70,
      mbti: (type) => type.preferences.TF === "F" && type.preferences.JP === "J",
      enneagram: (type) => [2, 6, 9].includes(type.coreType),
      astrology: (data) => data.element === "Air" || data.sunSign === "Cancer",
    },
  },
  {
    id: 22,
    name: "Tradition Orientation",
    indicators: {
      big5: (scores) => scores.openness <= 40,
      mbti: (type) => type.preferences.SN === "S" && type.preferences.JP === "J",
      enneagram: (type) => [1, 6].includes(type.coreType),
      astrology: (data) => data.element === "Earth",
    },
  },
  {
    id: 23,
    name: "Novelty Seeking",
    indicators: {
      big5: (scores) => scores.openness >= 75 && scores.extraversion >= 60,
      mbti: (type) => type.preferences.SN === "N" && type.preferences.JP === "P",
      enneagram: (type) => [7, 3].includes(type.coreType),
      astrology: (data) => data.element === "Fire",
    },
  },
  {
    id: 24,
    name: "Stability Seeking",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 70 && scores.openness <= 50,
      mbti: (type) => type.preferences.SN === "S" && type.preferences.JP === "J",
      enneagram: (type) => [6, 9].includes(type.coreType),
      astrology: (data) => data.element === "Earth" || data.modality === "Fixed",
    },
  },
  {
    id: 25,
    name: "Meaning Orientation",
    indicators: {
      big5: (scores) => scores.openness >= 70,
      mbti: (type) => type.preferences.SN === "N" && type.preferences.TF === "F",
      enneagram: (type) => [1, 4, 5].includes(type.coreType),
      astrology: (data) => ["Sagittarius", "Pisces"].includes(data.sunSign),
    },
  },
  {
    id: 26,
    name: "Nature Connection",
    indicators: {
      big5: (scores) => scores.openness >= 60,
      mbti: (type) => type.preferences.SN === "S" && type.preferences.TF === "F",
      enneagram: (type) => [4, 9].includes(type.coreType),
      astrology: (data) => data.element === "Earth",
    },
  },
  {
    id: 27,
    name: "Optimism Baseline",
    indicators: {
      big5: (scores) => scores.neuroticism <= 35 && scores.extraversion >= 60,
      mbti: (type) => type.preferences.IE === "E" && type.preferences.JP === "P",
      enneagram: (type) => [7, 2].includes(type.coreType),
      astrology: (data) => data.element === "Fire",
    },
  },
  {
    id: 28,
    name: "Service Orientation",
    indicators: {
      big5: (scores) => scores.agreeableness >= 75,
      mbti: (type) => type.preferences.TF === "F" && type.preferences.JP === "J",
      enneagram: (type) => [2, 6].includes(type.coreType),
      astrology: (data) => data.sunSign === "Virgo",
    },
  },
  {
    id: 29,
    name: "Autonomy Drive",
    indicators: {
      big5: (scores) => scores.agreeableness <= 40 && scores.neuroticism <= 40,
      mbti: (type) => type.preferences.TF === "T" && type.preferences.JP === "P",
      enneagram: (type) => [5, 8].includes(type.coreType),
      astrology: (data) => ["Aquarius", "Aries"].includes(data.sunSign),
    },
  },
  {
    id: 30,
    name: "Future Orientation",
    indicators: {
      big5: (scores) => scores.conscientiousness >= 75,
      mbti: (type) => type.preferences.SN === "N" && type.preferences.JP === "J",
      enneagram: (type) => [1, 3, 6].includes(type.coreType),
      astrology: (data) => data.sunSign === "Capricorn",
    },
  },
];

/* ============================
   DETECTION
============================ */

/**
 * Detect all patterns from framework scores
 */
export function detectPatterns(frameworks: FrameworkScores): DetectedPatterns {
  const detectedPatterns: DetectedPatterns = {};

  for (const pattern of PATTERN_RULES) {
    const frameworkSupport = {
      big5: pattern.indicators.big5(frameworks.big5),
      mbti: pattern.indicators.mbti(frameworks.mbti),
      enneagram: pattern.indicators.enneagram(frameworks.enneagram),
      astrology: pattern.indicators.astrology(frameworks.astrology),
    };

    // ✅ New: require a behavioral anchor
    if (!hasBehavioralAnchor({ big5: frameworkSupport.big5, enneagram: frameworkSupport.enneagram })) {
      continue;
    }

    // ✅ New: weighted confidence
    const confidence = computeWeightedConfidence(frameworkSupport);

    // Keep your existing inclusion rule, but now it’s stricter by design
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

/**
 * Get pattern match by ID
 */
export function getPattern(patterns: DetectedPatterns, patternId: number): PatternMatch | null {
  return patterns[patternId] || null;
}

/**
 * Get all strong patterns (confidence >= 0.75)
 */
export function getStrongPatterns(patterns: DetectedPatterns): PatternMatch[] {
  return Object.values(patterns).filter((p) => p.confidence >= 0.75);
}

/**
 * Get all moderate patterns (confidence >= 0.5 and < 0.75)
 */
export function getModeratePatterns(patterns: DetectedPatterns): PatternMatch[] {
  return Object.values(patterns).filter((p) => p.confidence >= 0.5 && p.confidence < 0.75);
}
