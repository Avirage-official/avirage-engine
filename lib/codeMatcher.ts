/**
 * CODE MATCHER
 * Matches detected patterns to 20 Cultural Codes
 * Model B: "Relative Resonance" (rank all codes; no hard drop-off)
 */

import { DetectedPatterns, PatternMatch } from "./patternDetector";

export interface CulturalCodeMatch {
  codeId: number;
  codeName: string;
  fullName: string;
  matchScore: number;      // 0-100
  matchPercentage: number; // Same as matchScore (for compatibility)
  confidence: "high" | "moderate" | "low";
  corePatternMatches: PatternMatch[];
  supportingPatternMatches: PatternMatch[];
  incompatiblePatterns: PatternMatch[];
}

interface CodeRequirement {
  codeId: number;
  codeName: string;
  fullName: string;
  corePatterns: number[];         // Pattern IDs (weight 1.0)
  supportingPatterns: number[];   // Pattern IDs (weight 0.5)
  incompatiblePatterns: number[]; // Pattern IDs (negative weight)
  minimumCoreMatch: number;       // used for confidence shaping (not filtering)
}

/**
 * Cultural Code requirements (all 20 codes)
 */
const CODE_REQUIREMENTS: CodeRequirement[] = [
  {
    codeId: 1,
    codeName: "Khoisan",
    fullName: "San/Khoisan",
    corePatterns: [4, 3, 6, 15, 26],
    supportingPatterns: [9, 17, 19, 20],
    incompatiblePatterns: [8, 11, 23],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 2,
    codeName: "Kayori",
    fullName: "Yoruba",
    corePatterns: [1, 7, 13, 18, 25],
    supportingPatterns: [4, 21, 22, 27],
    incompatiblePatterns: [14, 17, 29],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 3,
    codeName: "Sahen",
    fullName: "Tuareg",
    corePatterns: [1, 16, 15, 26, 29],
    supportingPatterns: [17, 19, 14, 2],
    incompatiblePatterns: [18, 27, 11],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 4,
    codeName: "Enzuka",
    fullName: "Maasai + Zulu Fusion",
    corePatterns: [12, 21, 11, 20, 22],
    supportingPatterns: [2, 8, 18, 26],
    incompatiblePatterns: [17, 20, 29],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 5,
    codeName: "Siyuane",
    fullName: "Ethiopian + Han Chinese Fusion",
    corePatterns: [8, 22, 24, 14, 30],
    supportingPatterns: [5, 10, 21, 25],
    incompatiblePatterns: [9, 23, 13],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 6,
    codeName: "Jaejin",
    fullName: "Korean",
    corePatterns: [11, 21, 14, 8, 7],
    supportingPatterns: [2, 22, 19, 12],
    incompatiblePatterns: [9, 29, 13],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 7,
    codeName: "Namsea",
    fullName: "Vietnamese + Thai Fusion",
    corePatterns: [6, 9, 20, 27, 15],
    supportingPatterns: [4, 18, 21, 26],
    incompatiblePatterns: [8, 11, 5],
    minimumCoreMatch: 3.0,
  },
  {
    codeId: 8,
    codeName: "Shokunin",
    fullName: "Japanese",
    corePatterns: [7, 5, 8, 4, 11],
    supportingPatterns: [2, 22, 14, 15, 21],
    incompatiblePatterns: [9, 23, 13],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 9,
    codeName: "Khoruun",
    fullName: "Mongolian",
    corePatterns: [9, 29, 15, 26, 12],
    supportingPatterns: [3, 2, 17, 20],
    incompatiblePatterns: [8, 24, 21],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 10,
    codeName: "Lhumir",
    fullName: "Tibetan",
    corePatterns: [1, 6, 12, 16, 25],
    supportingPatterns: [10, 17, 21, 22],
    incompatiblePatterns: [11, 23, 18],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 11,
    codeName: "Yatevar",
    fullName: "Indian Vedic + Nahua Fusion",
    corePatterns: [1, 16, 25, 22, 8],
    supportingPatterns: [7, 13, 15, 26],
    incompatiblePatterns: [9, 23, 27],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 12,
    codeName: "Renara",
    fullName: "Javanese",
    corePatterns: [8, 12, 14, 22, 24],
    supportingPatterns: [10, 21, 20, 7],
    incompatiblePatterns: [9, 13, 23],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 13,
    codeName: "Karayni",
    fullName: "Balinese + Quechua Fusion",
    corePatterns: [15, 21, 25, 26, 28],
    supportingPatterns: [4, 7, 22, 18],
    incompatiblePatterns: [29, 17, 2],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 14,
    codeName: "Wohaka",
    fullName: "Maori + Lakota Fusion",
    corePatterns: [15, 21, 22, 25, 26],
    supportingPatterns: [13, 18, 20, 27],
    incompatiblePatterns: [29, 14, 17],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 15,
    codeName: "Tjukari",
    fullName: "Aboriginal Australian",
    corePatterns: [1, 4, 3, 6, 26],
    supportingPatterns: [15, 22, 25, 19],
    incompatiblePatterns: [11, 8, 23],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 16,
    codeName: "Kinmora",
    fullName: "Maya",
    corePatterns: [1, 3, 5, 22, 25],
    supportingPatterns: [8, 24, 30, 26],
    incompatiblePatterns: [9, 23, 6],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 17,
    codeName: "Siljoa",
    fullName: "Inuit + Sami Fusion",
    corePatterns: [3, 15, 26, 12, 9],
    supportingPatterns: [2, 17, 19, 24],
    incompatiblePatterns: [18, 23, 11],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 18,
    codeName: "Skenari",
    fullName: "Haudenosaunee",
    corePatterns: [8, 21, 22, 24, 30],
    supportingPatterns: [25, 28, 20, 26],
    incompatiblePatterns: [23, 29, 9],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 19,
    codeName: "Ashkara",
    fullName: "Persian/Zoroastrian",
    corePatterns: [1, 16, 25, 11, 22],
    supportingPatterns: [7, 8, 12, 26],
    incompatiblePatterns: [9, 20, 27],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 20,
    codeName: "Alethir",
    fullName: "Ancient Greek",
    corePatterns: [1, 3, 16, 25, 23],
    supportingPatterns: [13, 18, 7, 26],
    incompatiblePatterns: [22, 24, 14],
    minimumCoreMatch: 4.0,
  },
];

/**
 * Calculate match score for a single cultural code
 * Model B: Always returns a match (never null)
 */
function calculateCodeMatch(
  codeReq: CodeRequirement,
  patterns: DetectedPatterns
): CulturalCodeMatch {
  let score = 0;
  let maxPossibleScore = 0;

  let coreScore = 0;
  let coreMax = 0;

  const coreMatches: PatternMatch[] = [];
  const supportingMatches: PatternMatch[] = [];
  const incompatibleMatches: PatternMatch[] = [];

  // CORE PATTERNS (weight 1.0)
  for (const patternId of codeReq.corePatterns) {
    maxPossibleScore += 1.0;
    coreMax += 1.0;

    const hit = patterns[patternId];
    if (hit) {
      score += hit.confidence * 1.0;
      coreScore += hit.confidence * 1.0;
      coreMatches.push(hit);
    }
  }

  // SUPPORTING PATTERNS (weight 0.5)
  for (const patternId of codeReq.supportingPatterns) {
    maxPossibleScore += 0.5;

    const hit = patterns[patternId];
    if (hit) {
      score += hit.confidence * 0.5;
      supportingMatches.push(hit);
    }
  }

  // INCOMPATIBLE PATTERNS (negative weight -0.3)
  for (const patternId of codeReq.incompatiblePatterns) {
    const hit = patterns[patternId];
    if (hit) {
      score -= hit.confidence * 0.3;
      incompatibleMatches.push(hit);
    }
  }

  // Guard: avoid divide by zero
  if (maxPossibleScore <= 0) maxPossibleScore = 1;

  // Normalize to 0-100, clamp
  const rawPct = (score / maxPossibleScore) * 100;
  const matchPercentage = Math.max(0, Math.min(100, Math.round(rawPct)));

  // Confidence: use BOTH matchPercentage + whether core is reasonably met
  // (still "relative", but keeps your intent that core matters)
  const coreMeets = coreScore >= codeReq.minimumCoreMatch;
  let confidence: "high" | "moderate" | "low";
  if (matchPercentage >= 75 && coreMeets) confidence = "high";
  else if (matchPercentage >= 60) confidence = "moderate";
  else confidence = "low";

  return {
    codeId: codeReq.codeId,
    codeName: codeReq.codeName,
    fullName: codeReq.fullName,
    matchScore: matchPercentage,
    matchPercentage,
    confidence,
    corePatternMatches: coreMatches,
    supportingPatternMatches: supportingMatches,
    incompatiblePatterns: incompatibleMatches,
  };
}

/**
 * Match patterns to all cultural codes and return top 3
 * Model B: rank all 20; no fallback
 */
export function matchCulturalCodes(patterns: DetectedPatterns): {
  primary: CulturalCodeMatch;
  secondary: CulturalCodeMatch;
  tertiary: CulturalCodeMatch;
  allMatches: CulturalCodeMatch[];
} {
  const matches: CulturalCodeMatch[] = CODE_REQUIREMENTS.map((codeReq) =>
    calculateCodeMatch(codeReq, patterns)
  );

  matches.sort((a, b) => b.matchScore - a.matchScore);

  return {
    primary: matches[0],
    secondary: matches[1],
    tertiary: matches[2],
    allMatches: matches,
  };
}

/**
 * Get code requirement by code name
 */
export function getCodeRequirement(codeName: string): CodeRequirement | null {
  return CODE_REQUIREMENTS.find((c) => c.codeName === codeName) || null;
}
