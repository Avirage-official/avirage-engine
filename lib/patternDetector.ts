/**
 * PATTERN DETECTOR
 * Detects which of 30 behavioral patterns are present based on framework scores
 */

import { FrameworkScores } from "./frameworkCalculator";

export interface PatternMatch {
  patternId: number;
  patternName: string;
  confidence: number; // 0-1 (percentage of frameworks that agree)
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

/**
 * Pattern detection rules
 * Each pattern has indicators across all 4 frameworks
 */
const PATTERN_RULES = [
  {
    id: 1,
    name: "Abstract Thinking",
    indicators: {
      big5: (scores: any) => scores.openness >= 70,
      mbti: (type: any) => type.preferences.SN === "N",
      enneagram: (type: any) => [4, 5, 7].includes(type.coreType),
      astrology: (data: any) => ["Air", "Fire"].includes(data.element),
    },
  },
  {
    id: 2,
    name: "Concrete Practical Focus",
    indicators: {
      big5: (scores: any) => scores.openness <= 50,
      mbti: (type: any) => type.preferences.SN === "S",
      enneagram: (type: any) => [1, 6, 8, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth",
    },
  },
  {
    id: 3,
    name: "Pattern Recognition Mastery",
    indicators: {
      big5: (scores: any) => scores.openness >= 70,
      mbti: (type: any) => type.preferences.SN === "N",
      enneagram: (type: any) => [5, 7].includes(type.coreType),
      astrology: (data: any) => ["Air", "Scorpio"].includes(data.element) || data.sunSign === "Scorpio",
    },
  },
  {
    id: 4,
    name: "Sensory Appreciation",
    indicators: {
      big5: (scores: any) => scores.openness >= 70,
      mbti: (type: any) => type.preferences.SN === "S" && type.preferences.TF === "F",
      enneagram: (type: any) => [4, 7].includes(type.coreType),
      astrology: (data: any) => ["Taurus", "Libra", "Cancer"].includes(data.sunSign),
    },
  },
  {
    id: 5,
    name: "Detail Obsession",
    indicators: {
      big5: (scores: any) => scores.conscientiousness >= 75,
      mbti: (type: any) => type.preferences.SN === "S" && type.preferences.JP === "J",
      enneagram: (type: any) => [1, 6].includes(type.coreType),
      astrology: (data: any) => ["Virgo", "Capricorn"].includes(data.sunSign),
    },
  },
  {
    id: 6,
    name: "Present-Moment Focus",
    indicators: {
      big5: (scores: any) => scores.neuroticism <= 40 && scores.openness >= 40 && scores.openness <= 70,
      mbti: (type: any) => type.preferences.SN === "S" && type.preferences.JP === "P",
      enneagram: (type: any) => [7, 8, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Fire" || data.sunSign === "Sagittarius",
    },
  },
  {
    id: 7,
    name: "Craftsmanship Drive",
    indicators: {
      big5: (scores: any) => scores.conscientiousness >= 70 && scores.openness >= 50,
      mbti: (type: any) => type.preferences.SN === "S" && type.preferences.JP === "J",
      enneagram: (type: any) => [1, 3, 4].includes(type.coreType),
      astrology: (data: any) => ["Taurus", "Virgo", "Capricorn"].includes(data.sunSign),
    },
  },
  {
    id: 8,
    name: "Structure Preference",
    indicators: {
      big5: (scores: any) => scores.conscientiousness >= 70,
      mbti: (type: any) => type.preferences.JP === "J",
      enneagram: (type: any) => [1, 3, 6].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth",
    },
  },
  {
    id: 9,
    name: "Improvisation Comfort",
    indicators: {
      big5: (scores: any) => scores.conscientiousness <= 40 && scores.openness >= 60,
      mbti: (type: any) => type.preferences.JP === "P",
      enneagram: (type: any) => [7, 9].includes(type.coreType),
      astrology: (data: any) => data.modality === "Mutable",
    },
  },
  {
    id: 10,
    name: "Slow Steady Pace",
    indicators: {
      big5: (scores: any) => scores.extraversion <= 40 && scores.conscientiousness >= 60,
      mbti: (type: any) => type.preferences.IE === "I" && type.preferences.JP === "J",
      enneagram: (type: any) => [1, 5, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth" || data.modality === "Fixed",
    },
  },
  {
    id: 11,
    name: "High Output Drive",
    indicators: {
      big5: (scores: any) => scores.conscientiousness >= 75 && scores.extraversion >= 50,
      mbti: (type: any) => type.preferences.JP === "J" && type.preferences.TF === "T",
      enneagram: (type: any) => [3, 8].includes(type.coreType),
      astrology: (data: any) => data.modality === "Cardinal",
    },
  },
  {
    id: 12,
    name: "Emotional Stability",
    indicators: {
      big5: (scores: any) => scores.neuroticism <= 40,
      mbti: (type: any) => type.preferences.TF === "T",
      enneagram: (type: any) => [8, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth" || data.modality === "Fixed",
    },
  },
  {
    id: 13,
    name: "Emotional Expressiveness",
    indicators: {
      big5: (scores: any) => scores.extraversion >= 70 && scores.agreeableness >= 60,
      mbti: (type: any) => type.preferences.TF === "F" && type.preferences.IE === "E",
      enneagram: (type: any) => [2, 7].includes(type.coreType),
      astrology: (data: any) => data.element === "Fire" || ["Cancer", "Pisces"].includes(data.sunSign),
    },
  },
  {
    id: 14,
    name: "Emotional Restraint",
    indicators: {
      big5: (scores: any) => scores.extraversion <= 40 && scores.agreeableness <= 45,
      mbti: (type: any) => type.preferences.IE === "I" && type.preferences.TF === "T",
      enneagram: (type: any) => [1, 5, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth" || ["Capricorn", "Aquarius"].includes(data.sunSign),
    },
  },
  {
    id: 15,
    name: "Environmental Sensitivity",
    indicators: {
      big5: (scores: any) => scores.openness >= 70 && scores.neuroticism >= 60,
      mbti: (type: any) => type.preferences.TF === "F" && type.preferences.SN === "N",
      enneagram: (type: any) => [4, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Water",
    },
  },
  {
    id: 16,
    name: "Deep Introspection",
    indicators: {
      big5: (scores: any) => scores.openness >= 70 && scores.extraversion <= 40,
      mbti: (type: any) => type.preferences.IE === "I" && type.preferences.SN === "N",
      enneagram: (type: any) => [4, 5].includes(type.coreType),
      astrology: (data: any) => data.element === "Water",
    },
  },
  {
    id: 17,
    name: "Low Social Energy",
    indicators: {
      big5: (scores: any) => scores.extraversion <= 40,
      mbti: (type: any) => type.preferences.IE === "I",
      enneagram: (type: any) => [4, 5, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Water",
    },
  },
  {
    id: 18,
    name: "High Social Energy",
    indicators: {
      big5: (scores: any) => scores.extraversion >= 70,
      mbti: (type: any) => type.preferences.IE === "E",
      enneagram: (type: any) => [2, 7, 8].includes(type.coreType),
      astrology: (data: any) => data.element === "Fire" || ["Leo", "Gemini"].includes(data.sunSign),
    },
  },
  {
    id: 19,
    name: "Small Group Preference",
    indicators: {
      big5: (scores: any) => scores.extraversion >= 30 && scores.extraversion <= 55,
      mbti: (type: any) => type.preferences.IE === "I",
      enneagram: (type: any) => [1, 4, 6].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth" || data.modality === "Fixed",
    },
  },
  {
    id: 20,
    name: "Conflict Avoidance",
    indicators: {
      big5: (scores: any) => scores.agreeableness >= 70,
      mbti: (type: any) => type.preferences.TF === "F",
      enneagram: (type: any) => [2, 6, 9].includes(type.coreType),
      astrology: (data: any) => ["Libra", "Cancer"].includes(data.sunSign),
    },
  },
  {
    id: 21,
    name: "Collaborative Nature",
    indicators: {
      big5: (scores: any) => scores.agreeableness >= 70,
      mbti: (type: any) => type.preferences.TF === "F" && type.preferences.JP === "J",
      enneagram: (type: any) => [2, 6, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Air" || data.sunSign === "Cancer",
    },
  },
  {
    id: 22,
    name: "Tradition Orientation",
    indicators: {
      big5: (scores: any) => scores.openness <= 40,
      mbti: (type: any) => type.preferences.SN === "S" && type.preferences.JP === "J",
      enneagram: (type: any) => [1, 6].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth",
    },
  },
  {
    id: 23,
    name: "Novelty Seeking",
    indicators: {
      big5: (scores: any) => scores.openness >= 75 && scores.extraversion >= 60,
      mbti: (type: any) => type.preferences.SN === "N" && type.preferences.JP === "P",
      enneagram: (type: any) => [7, 3].includes(type.coreType),
      astrology: (data: any) => data.element === "Fire",
    },
  },
  {
    id: 24,
    name: "Stability Seeking",
    indicators: {
      big5: (scores: any) => scores.conscientiousness >= 70 && scores.openness <= 50,
      mbti: (type: any) => type.preferences.SN === "S" && type.preferences.JP === "J",
      enneagram: (type: any) => [6, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth" || data.modality === "Fixed",
    },
  },
  {
    id: 25,
    name: "Meaning Orientation",
    indicators: {
      big5: (scores: any) => scores.openness >= 70,
      mbti: (type: any) => type.preferences.SN === "N" && type.preferences.TF === "F",
      enneagram: (type: any) => [1, 4, 5].includes(type.coreType),
      astrology: (data: any) => ["Sagittarius", "Pisces"].includes(data.sunSign),
    },
  },
  {
    id: 26,
    name: "Nature Connection",
    indicators: {
      big5: (scores: any) => scores.openness >= 60,
      mbti: (type: any) => type.preferences.SN === "S" && type.preferences.TF === "F",
      enneagram: (type: any) => [4, 9].includes(type.coreType),
      astrology: (data: any) => data.element === "Earth",
    },
  },
  {
    id: 27,
    name: "Optimism Baseline",
    indicators: {
      big5: (scores: any) => scores.neuroticism <= 35 && scores.extraversion >= 60,
      mbti: (type: any) => type.preferences.IE === "E" && type.preferences.JP === "P",
      enneagram: (type: any) => [7, 2].includes(type.coreType),
      astrology: (data: any) => data.element === "Fire",
    },
  },
  {
    id: 28,
    name: "Service Orientation",
    indicators: {
      big5: (scores: any) => scores.agreeableness >= 75,
      mbti: (type: any) => type.preferences.TF === "F" && type.preferences.JP === "J",
      enneagram: (type: any) => [2, 6].includes(type.coreType),
      astrology: (data: any) => data.sunSign === "Virgo",
    },
  },
  {
    id: 29,
    name: "Autonomy Drive",
    indicators: {
      big5: (scores: any) => scores.agreeableness <= 40 && scores.neuroticism <= 40,
      mbti: (type: any) => type.preferences.TF === "T" && type.preferences.JP === "P",
      enneagram: (type: any) => [5, 8].includes(type.coreType),
      astrology: (data: any) => ["Aquarius", "Aries"].includes(data.sunSign),
    },
  },
  {
    id: 30,
    name: "Future Orientation",
    indicators: {
      big5: (scores: any) => scores.conscientiousness >= 75,
      mbti: (type: any) => type.preferences.SN === "N" && type.preferences.JP === "J",
      enneagram: (type: any) => [1, 3, 6].includes(type.coreType),
      astrology: (data: any) => data.sunSign === "Capricorn",
    },
  },
];

/**
 * Detect all patterns from framework scores
 */
export function detectPatterns(frameworks: FrameworkScores): DetectedPatterns {
  const detectedPatterns: DetectedPatterns = {};

  for (const pattern of PATTERN_RULES) {
    // Check each framework indicator
    const frameworkSupport = {
      big5: pattern.indicators.big5(frameworks.big5),
      mbti: pattern.indicators.mbti(frameworks.mbti),
      enneagram: pattern.indicators.enneagram(frameworks.enneagram),
      astrology: pattern.indicators.astrology(frameworks.astrology),
    };

    // Calculate confidence (how many frameworks agree)
    const supportCount = Object.values(frameworkSupport).filter(Boolean).length;
    const confidence = supportCount / 4; // 0.0 to 1.0

    // Only include patterns with at least 50% support (2/4 frameworks)
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
  return Object.values(patterns).filter(p => p.confidence >= 0.75);
}

/**
 * Get all moderate patterns (confidence >= 0.5 and < 0.75)
 */
export function getModeratePatterns(patterns: DetectedPatterns): PatternMatch[] {
  return Object.values(patterns).filter(p => p.confidence >= 0.5 && p.confidence < 0.75);
}
