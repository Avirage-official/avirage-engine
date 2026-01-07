/**
 * CODE MATCHER (UPGRADED — still Model B "Relative Resonance")
 * Matches detected patterns to 20 Cultural Codes and ranks all codes.
 *
 * Upgrades (better, not simpler):
 * - Sanitizes bad data (e.g., same pattern marked core + incompatible)
 * - Prevents double-counting across core/supporting/incompatible
 * - Adds stronger core-coverage shaping (core matters more than supporting)
 * - Uses confidence-aware scoring (pattern confidence influences contribution)
 * - Produces more defensible top-3 ordering (less "random" close ties)
 */

import { DetectedPatterns, PatternMatch } from "./patternDetector";

export interface CulturalCodeMatch {
  codeId: number;
  codeName: string;
  fullName: string;
  matchScore: number; // 0-100
  matchPercentage: number; // Same as matchScore (compat)
  confidence: "high" | "moderate" | "low";
  corePatternMatches: PatternMatch[];
  supportingPatternMatches: PatternMatch[];
  incompatiblePatterns: PatternMatch[];
}

interface CodeRequirement {
  codeId: number;
  codeName: string;
  fullName: string;
  corePatterns: number[]; // weight 1.0
  supportingPatterns: number[]; // weight 0.5
  incompatiblePatterns: number[]; // penalty
  minimumCoreMatch: number; // confidence shaping (not filtering)
}

/* =========================================================
   DATA (unchanged content, but we sanitize at runtime)
========================================================= */

const CODE_REQUIREMENTS_RAW: CodeRequirement[] = [
  {
    codeId: 1,
    codeName: "khoisan",
    fullName: "San/Khoisan",
    corePatterns: [4, 3, 6, 15, 26],
    supportingPatterns: [9, 17, 19, 20],
    incompatiblePatterns: [8, 11, 23],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 2,
    codeName: "kayori",
    fullName: "Yoruba",
    corePatterns: [1, 7, 13, 18, 25],
    supportingPatterns: [4, 21, 22, 27],
    incompatiblePatterns: [14, 17, 29],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 3,
    codeName: "sahen",
    fullName: "Tuareg",
    corePatterns: [1, 16, 15, 26, 29],
    supportingPatterns: [17, 19, 14, 2],
    incompatiblePatterns: [18, 27, 11],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 4,
    codeName: "enzuka",
    fullName: "Maasai + Zulu Fusion",
    corePatterns: [12, 21, 11, 20, 22],
    supportingPatterns: [2, 8, 18, 26],
    incompatiblePatterns: [17, 20, 29],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 5,
    codeName: "siyuane",
    fullName: "Ethiopian + Han Chinese Fusion",
    corePatterns: [8, 22, 24, 14, 30],
    supportingPatterns: [5, 10, 21, 25],
    incompatiblePatterns: [9, 23, 13],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 6,
    codeName: "jaejin",
    fullName: "Korean",
    corePatterns: [11, 21, 14, 8, 7],
    supportingPatterns: [2, 22, 19, 12],
    incompatiblePatterns: [9, 29, 13],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 7,
    codeName: "namsea",
    fullName: "Vietnamese + Thai Fusion",
    corePatterns: [6, 9, 20, 27, 15],
    supportingPatterns: [4, 18, 21, 26],
    incompatiblePatterns: [8, 11, 5],
    minimumCoreMatch: 3.0,
  },
  {
    codeId: 8,
    codeName: "shokunin",
    fullName: "Japanese",
    corePatterns: [7, 5, 8, 4, 11],
    supportingPatterns: [2, 22, 14, 15, 21],
    incompatiblePatterns: [9, 23, 13],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 9,
    codeName: "khoruun",
    fullName: "Mongolian",
    corePatterns: [9, 29, 15, 26, 12],
    supportingPatterns: [3, 2, 17, 20],
    incompatiblePatterns: [8, 24, 21],
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 10,
    codeName: "lhumir",
    fullName: "Tibetan",
    corePatterns: [1, 6, 12, 16, 25],
    supportingPatterns: [10, 17, 21, 22],
    incompatiblePatterns: [11, 23, 18],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 11,
    codeName: "yatevar",
    fullName: "Indian Vedic + Nahua Fusion",
    corePatterns: [1, 16, 25, 22, 8],
    supportingPatterns: [7, 13, 15, 26],
    incompatiblePatterns: [9, 23, 27],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 12,
    codeName: "renara",
    fullName: "Javanese",
    corePatterns: [8, 12, 14, 22, 24],
    supportingPatterns: [10, 21, 20, 7],
    incompatiblePatterns: [9, 13, 23],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 13,
    codeName: "karayni",
    fullName: "Balinese + Quechua Fusion",
    corePatterns: [15, 21, 25, 26, 28],
    supportingPatterns: [4, 7, 22, 18],
    incompatiblePatterns: [29, 17, 2],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 14,
    codeName: "wohaka",
    fullName: "Maori + Lakota Fusion",
    corePatterns: [15, 21, 22, 25, 26],
    supportingPatterns: [13, 18, 20, 27],
    incompatiblePatterns: [29, 14, 17],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 15,
    codeName: "tjukari",
    fullName: "Aboriginal Australian",
    corePatterns: [1, 4, 3, 6, 26],
    supportingPatterns: [15, 22, 25, 19],
    incompatiblePatterns: [11, 8, 23],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 16,
    codeName: "kinmora",
    fullName: "Maya",
    corePatterns: [1, 3, 5, 22, 25],
    supportingPatterns: [8, 24, 30, 26],
    incompatiblePatterns: [9, 23, 6],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 17,
    codeName: "siljoa",
    fullName: "Inuit + Sami Fusion",
    corePatterns: [3, 15, 26, 12, 9],
    supportingPatterns: [2, 17, 19, 24],
    incompatiblePatterns: [18, 23, 11],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 18,
    codeName: "skenari",
    fullName: "Haudenosaunee",
    corePatterns: [8, 21, 22, 24, 30],
    supportingPatterns: [25, 28, 20, 26],
    incompatiblePatterns: [23, 29, 9],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 19,
    codeName: "ashkara",
    fullName: "Persian/Zoroastrian",
    corePatterns: [1, 16, 25, 11, 22],
    supportingPatterns: [7, 8, 12, 26],
    incompatiblePatterns: [9, 20, 27],
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 20,
    codeName: "alethir",
    fullName: "Ancient Greek",
    corePatterns: [1, 3, 16, 25, 23],
    supportingPatterns: [13, 18, 7, 26],
    incompatiblePatterns: [22, 24, 14],
    minimumCoreMatch: 4.0,
  },
];

/* =========================================================
   SANITIZATION + UTILITIES
========================================================= */

function uniq(arr: number[]): number[] {
  return Array.from(new Set(arr));
}

function without(arr: number[], remove: Set<number>): number[] {
  return arr.filter((x) => !remove.has(x));
}

/**
 * Ensure:
 * - core/supporting/incompatible do not overlap (core wins, supporting loses)
 * - arrays are unique
 */
function sanitizeRequirement(req: CodeRequirement): CodeRequirement {
  const core = uniq(req.corePatterns);
  const coreSet = new Set(core);

  const supportingRaw = uniq(req.supportingPatterns);
  const supporting = without(supportingRaw, coreSet);
  const supportingSet = new Set(supporting);

  const incompatibleRaw = uniq(req.incompatiblePatterns);
  // if something is incompatible AND core/supporting, incompatible loses (data bug)
  const incompatible = incompatibleRaw.filter((p) => !coreSet.has(p) && !supportingSet.has(p));

  return {
    ...req,
    corePatterns: core,
    supportingPatterns: supporting,
    incompatiblePatterns: incompatible,
  };
}

const CODE_REQUIREMENTS: CodeRequirement[] = CODE_REQUIREMENTS_RAW.map(sanitizeRequirement);

/* =========================================================
   SCORING MODEL
========================================================= */

/**
 * Weight policy:
 * - Core patterns dominate (signal of identity)
 * - Supporting patterns add flavor
 * - Incompatibles penalize, but cannot "erase" a strong core
 */
const WEIGHTS = {
  core: 1.0,
  supporting: 0.55, // slightly higher than 0.5; supporting matters
  incompatible: 0.45, // penalty strength (scaled by confidence)
} as const;

/**
 * Core coverage shaping:
 * If you hit a lot of core patterns, you get a mild boost.
 * If you hit few cores, you get a mild dampener.
 */
function coreCoverageMultiplier(coreHitWeight: number, coreMaxWeight: number): number {
  if (coreMaxWeight <= 0) return 1;
  const coverage = coreHitWeight / coreMaxWeight; // 0..1

  // piecewise curve:
  // <0.35 => dampen
  // 0.35-0.7 => neutral
  // >0.7 => small boost
  if (coverage < 0.35) return 0.88;
  if (coverage > 0.7) return 1.08;
  return 1.0;
}

function clamp100(n: number): number {
  return Math.max(0, Math.min(100, n));
}

function avgConfidence(matches: PatternMatch[]): number {
  if (matches.length === 0) return 0;
  return matches.reduce((acc, m) => acc + m.confidence, 0) / matches.length;
}

/**
 * Calculate match score for one code (always returns a match)
 */
function calculateCodeMatch(codeReq: CodeRequirement, patterns: DetectedPatterns): CulturalCodeMatch {
  let score = 0;

  // Max possible is "best-case" sum of weights (core + supporting)
  // (We exclude incompatible from maxPossible so penalty can pull score down.)
  let maxPossible = 0;

  let coreHit = 0;
  let coreMax = 0;

  const coreMatches: PatternMatch[] = [];
  const supportingMatches: PatternMatch[] = [];
  const incompatibleMatches: PatternMatch[] = [];

  // CORE
  for (const pid of codeReq.corePatterns) {
    coreMax += WEIGHTS.core;
    maxPossible += WEIGHTS.core;

    const hit = patterns[pid];
    if (hit) {
      const add = hit.confidence * WEIGHTS.core;
      score += add;
      coreHit += add;
      coreMatches.push(hit);
    }
  }

  // SUPPORTING
  for (const pid of codeReq.supportingPatterns) {
    maxPossible += WEIGHTS.supporting;

    const hit = patterns[pid];
    if (hit) {
      score += hit.confidence * WEIGHTS.supporting;
      supportingMatches.push(hit);
    }
  }

  // INCOMPATIBLE (penalty, but moderated)
  // Penalty is stronger when incompatibles are high-confidence AND multiple.
  // Also, if you have strong core coverage, penalty is slightly softened.
  let penalty = 0;
  for (const pid of codeReq.incompatiblePatterns) {
    const hit = patterns[pid];
    if (hit) {
      penalty += hit.confidence * WEIGHTS.incompatible;
      incompatibleMatches.push(hit);
    }
  }

  const coreMult = coreCoverageMultiplier(coreHit, coreMax);
  const softenedPenalty = penalty * (coreMult > 1 ? 0.9 : 1.0);

  score = score * coreMult - softenedPenalty;

  if (maxPossible <= 0) maxPossible = 1;

  // Normalize to 0–100
  const rawPct = (score / maxPossible) * 100;
  const matchPercentage = clamp100(Math.round(rawPct));

  // Confidence shaping:
  // - coreMeets uses your existing minimumCoreMatch (in "weighted confidence" units)
  // - also consider core coverage ratio + avg confidence of core hits
  const coreMeets = coreHit >= codeReq.minimumCoreMatch;
  const coreCoverage = coreMax > 0 ? coreHit / coreMax : 0; // 0..1
  const coreAvg = avgConfidence(coreMatches);

  let confidence: "high" | "moderate" | "low" = "low";
  if (matchPercentage >= 78 && coreMeets && coreCoverage >= 0.55 && coreAvg >= 0.65) confidence = "high";
  else if (matchPercentage >= 62 && (coreCoverage >= 0.4 || coreMeets)) confidence = "moderate";

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

/* =========================================================
   PUBLIC API
========================================================= */

/**
 * Match patterns to all codes and return ranked list + top 3
 */
export function matchCulturalCodes(patterns: DetectedPatterns): {
  primary: CulturalCodeMatch;
  secondary: CulturalCodeMatch;
  tertiary: CulturalCodeMatch;
  allMatches: CulturalCodeMatch[];
} {
  const matches = CODE_REQUIREMENTS.map((req) => calculateCodeMatch(req, patterns));

  // Sort primarily by matchScore, secondarily by confidence tier
  const tier = (c: CulturalCodeMatch["confidence"]) => (c === "high" ? 2 : c === "moderate" ? 1 : 0);

  matches.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return tier(b.confidence) - tier(a.confidence);
  });

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
