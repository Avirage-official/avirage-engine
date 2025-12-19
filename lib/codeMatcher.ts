/**
 * CODE MATCHER
 * Matches detected patterns to 20 Cultural Codes
 */

import { DetectedPatterns, PatternMatch } from "./patternDetector";

export interface CulturalCodeMatch {
  codeId: number;
  codeName: string;
  fullName: string;
  matchScore: number; // 0-100
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
  corePatterns: number[]; // Pattern IDs (weight 1.0)
  supportingPatterns: number[]; // Pattern IDs (weight 0.5)
  incompatiblePatterns: number[]; // Pattern IDs (negative weight)
  minimumCoreMatch: number; // Minimum core patterns required
}

/**
 * Cultural Code requirements (all 20 codes)
 */
const CODE_REQUIREMENTS: CodeRequirement[] = [
  {
    codeId: 1,
    codeName: "Khoisan",
    fullName: "San/Khoisan",
    corePatterns: [4, 3, 6, 15, 26], // Sensory, Pattern Recognition, Present Focus, Environmental Sensitivity, Nature Connection
    supportingPatterns: [9, 17, 19, 20], // Improvisation, Low Social, Small Group, Conflict Avoidance
    incompatiblePatterns: [8, 11, 23], // Structure, High Output, Novelty Seeking
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 2,
    codeName: "Kayori",
    fullName: "Yoruba",
    corePatterns: [1, 7, 13, 18, 25], // Abstract, Craftsmanship, Emotional Expression, High Social, Meaning
    supportingPatterns: [4, 21, 22, 27], // Sensory, Collaborative, Tradition, Optimism
    incompatiblePatterns: [14, 17, 29], // Emotional Restraint, Low Social, Autonomy
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 3,
    codeName: "Sahen",
    fullName: "Tuareg",
    corePatterns: [1, 16, 15, 26, 29], // Abstract, Introspection, Environmental, Nature, Autonomy
    supportingPatterns: [17, 19, 14, 2], // Low Social, Small Group, Emotional Restraint, Concrete
    incompatiblePatterns: [18, 27, 11], // High Social, Optimism, High Output
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 4,
    codeName: "Enzuka",
    fullName: "Maasai + Zulu Fusion",
    corePatterns: [12, 21, 11, 20, 22], // Emotional Stability, Collaborative, High Output, Conflict Navigation (!avoidance), Tradition
    supportingPatterns: [2, 8, 18, 26], // Concrete, Structure, High Social, Nature
    incompatiblePatterns: [17, 20, 29], // Low Social, Conflict Avoidance, Autonomy
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 5,
    codeName: "Siyuane",
    fullName: "Ethiopian + Han Chinese Fusion",
    corePatterns: [8, 22, 24, 14, 30], // Structure, Tradition, Stability, Emotional Restraint, Future Orientation
    supportingPatterns: [5, 10, 21, 25], // Detail, Slow Pace, Collaborative, Meaning
    incompatiblePatterns: [9, 23, 13], // Improvisation, Novelty, Emotional Expression
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 6,
    codeName: "Jaejin",
    fullName: "Korean",
    corePatterns: [11, 21, 14, 8, 7], // High Output, Collaborative, Emotional Restraint, Structure, Craftsmanship
    supportingPatterns: [2, 22, 19, 12], // Concrete, Tradition, Small Group, Emotional Stability
    incompatiblePatterns: [9, 29, 13], // Improvisation, Autonomy, Emotional Expression
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 7,
    codeName: "Namsea",
    fullName: "Vietnamese + Thai Fusion",
    corePatterns: [6, 9, 20, 27, 15], // Present Focus, Improvisation, Conflict Avoidance, Optimism, Environmental
    supportingPatterns: [4, 18, 21, 26], // Sensory, High Social (moderate), Collaborative, Nature
    incompatiblePatterns: [8, 11, 5], // Structure, High Output, Detail Obsession
    minimumCoreMatch: 3.0,
  },
  {
    codeId: 8,
    codeName: "Shokunin",
    fullName: "Japanese",
    corePatterns: [7, 5, 8, 4, 11], // Craftsmanship, Detail, Structure, Sensory, High Output
    supportingPatterns: [2, 22, 14, 15, 21], // Concrete, Tradition, Emotional Restraint, Environmental, Collaborative
    incompatiblePatterns: [9, 23, 13], // Improvisation, Novelty, Emotional Expression
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 9,
    codeName: "Khoruun",
    fullName: "Mongolian",
    corePatterns: [9, 29, 15, 26, 12], // Improvisation, Autonomy, Environmental, Nature, Emotional Stability
    supportingPatterns: [3, 2, 17, 20], // Pattern Recognition, Concrete, Low Social, Conflict Navigation
    incompatiblePatterns: [8, 24, 21], // Structure, Stability Seeking, Collaborative
    minimumCoreMatch: 3.5,
  },
  {
    codeId: 10,
    codeName: "Lhumir",
    fullName: "Tibetan",
    corePatterns: [1, 6, 12, 16, 25], // Abstract, Present Focus, Emotional Stability, Introspection, Meaning
    supportingPatterns: [10, 17, 21, 22], // Slow Pace, Low Social, Collaborative (compassion), Tradition
    incompatiblePatterns: [11, 23, 18], // High Output, Novelty, High Social
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 11,
    codeName: "Yatevar",
    fullName: "Indian Vedic + Nahua Fusion",
    corePatterns: [1, 16, 25, 22, 8], // Abstract, Introspection, Meaning, Tradition, Structure
    supportingPatterns: [7, 13, 15, 26], // Craftsmanship, Emotional Expression (ritual), Environmental, Nature
    incompatiblePatterns: [9, 23, 27], // Improvisation, Novelty, Optimism
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 12,
    codeName: "Renara",
    fullName: "Javanese",
    corePatterns: [8, 12, 14, 22, 24], // Structure, Emotional Stability, Emotional Restraint, Tradition, Stability
    supportingPatterns: [10, 21, 20, 7], // Slow Pace, Collaborative, Conflict Avoidance, Craftsmanship
    incompatiblePatterns: [9, 13, 23], // Improvisation, Emotional Expression, Novelty
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 13,
    codeName: "Karayni",
    fullName: "Balinese + Quechua Fusion",
    corePatterns: [15, 21, 25, 26, 28], // Environmental, Collaborative, Meaning, Nature, Service
    supportingPatterns: [4, 7, 22, 18], // Sensory, Craftsmanship, Tradition, High Social
    incompatiblePatterns: [29, 17, 2], // Autonomy, Low Social, Concrete (too utilitarian)
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 14,
    codeName: "Wohaka",
    fullName: "Maori + Lakota Fusion",
    corePatterns: [15, 21, 22, 25, 26], // Environmental, Collaborative, Tradition, Meaning, Nature
    supportingPatterns: [13, 18, 20, 27], // Emotional Expression, High Social, Conflict Navigation, Optimism
    incompatiblePatterns: [29, 14, 17], // Autonomy, Emotional Restraint, Low Social
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 15,
    codeName: "Tjukari",
    fullName: "Aboriginal Australian",
    corePatterns: [1, 4, 3, 6, 26], // Abstract, Sensory, Pattern Recognition, Present Focus, Nature
    supportingPatterns: [15, 22, 25, 19], // Environmental, Tradition, Meaning, Small Group
    incompatiblePatterns: [11, 8, 23], // High Output, Structure, Novelty
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 16,
    codeName: "Kinmora",
    fullName: "Maya",
    corePatterns: [1, 3, 5, 22, 25], // Abstract, Pattern Recognition, Detail, Tradition, Meaning
    supportingPatterns: [8, 24, 30, 26], // Structure, Stability, Future Orientation, Nature
    incompatiblePatterns: [9, 23, 6], // Improvisation, Novelty, Present Focus (too immediate)
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 17,
    codeName: "Siljoa",
    fullName: "Inuit + Sami Fusion",
    corePatterns: [3, 15, 26, 12, 9], // Pattern Recognition, Environmental, Nature, Emotional Stability, Improvisation
    supportingPatterns: [2, 17, 19, 24], // Concrete, Low Social, Small Group, Stability
    incompatiblePatterns: [18, 23, 11], // High Social, Novelty, High Output
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 18,
    codeName: "Skenari",
    fullName: "Haudenosaunee",
    corePatterns: [8, 21, 22, 24, 30], // Structure, Collaborative, Tradition, Stability, Future Orientation
    supportingPatterns: [25, 28, 20, 26], // Meaning, Service, Conflict Avoidance, Nature
    incompatiblePatterns: [23, 29, 9], // Novelty, Autonomy, Improvisation
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 19,
    codeName: "Ashkara",
    fullName: "Persian/Zoroastrian",
    corePatterns: [1, 16, 25, 11, 22], // Abstract, Introspection, Meaning, High Output (action), Tradition
    supportingPatterns: [7, 8, 12, 26], // Craftsmanship, Structure, Emotional Stability, Nature (fire)
    incompatiblePatterns: [9, 20, 27], // Improvisation, Conflict Avoidance, Optimism
    minimumCoreMatch: 4.0,
  },
  {
    codeId: 20,
    codeName: "Alethir",
    fullName: "Ancient Greek",
    corePatterns: [1, 3, 16, 25, 23], // Abstract, Pattern Recognition, Introspection, Meaning, Novelty
    supportingPatterns: [13, 18, 7, 26], // Emotional Expression (debate), High Social, Craftsmanship (rhetoric), Nature
    incompatiblePatterns: [22, 24, 14], // Tradition, Stability Seeking, Emotional Restraint
    minimumCoreMatch: 4.0,
  },
];

type MatchMode = "strict" | "relaxed";

/**
 * Calculate match score for a single cultural code
 * - strict: enforces minimumCoreMatch gate
 * - relaxed: always returns a score (used to avoid "always fallback Namsea")
 */
function calculateCodeMatch(
  codeReq: CodeRequirement,
  patterns: DetectedPatterns,
  mode: MatchMode
): CulturalCodeMatch | null {
  let score = 0;
  let maxPossibleScore = 0;

  let coreScore = 0; // track core-only so the minimumCoreMatch check is correct
  const coreMatches: PatternMatch[] = [];
  const supportingMatches: PatternMatch[] = [];
  const incompatibleMatches: PatternMatch[] = [];

  // CORE PATTERNS (weight 1.0)
  for (const patternId of codeReq.corePatterns) {
    maxPossibleScore += 1.0;
    if (patterns[patternId]) {
      const patternMatch = patterns[patternId];
      const delta = patternMatch.confidence * 1.0;
      score += delta;
      coreScore += delta;
      coreMatches.push(patternMatch);
    }
  }

  // Strict minimum core gate (this is what was causing "no matches" frequently)
  if (mode === "strict" && coreScore < codeReq.minimumCoreMatch) {
    return null;
  }

  // SUPPORTING PATTERNS (weight 0.5)
  for (const patternId of codeReq.supportingPatterns) {
    maxPossibleScore += 0.5;
    if (patterns[patternId]) {
      const patternMatch = patterns[patternId];
      score += patternMatch.confidence * 0.5;
      supportingMatches.push(patternMatch);
    }
  }

  // INCOMPATIBLE PATTERNS (negative weight -0.3)
  for (const patternId of codeReq.incompatiblePatterns) {
    if (patterns[patternId]) {
      const patternMatch = patterns[patternId];
      score -= patternMatch.confidence * 0.3;
      incompatibleMatches.push(patternMatch);
    }
  }

  // Safety: if maxPossibleScore is 0, avoid NaN (shouldn't happen, but keep stable)
  const rawPct =
    maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;

  const matchPercentage = Math.max(0, Math.min(100, rawPct));

  let confidence: "high" | "moderate" | "low";
  if (matchPercentage >= 75) confidence = "high";
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
 *
 * Key fix:
 * - We keep your strict minimumCoreMatch gate as the “ideal” filter.
 * - BUT if too few codes qualify (common with random answering), we backfill using a
 *   relaxed scoring pass instead of always defaulting to Namsea.
 */
export function matchCulturalCodes(patterns: DetectedPatterns): {
  primary: CulturalCodeMatch;
  secondary: CulturalCodeMatch;
  tertiary: CulturalCodeMatch;
  allMatches: CulturalCodeMatch[];
} {
  const strictMatches: CulturalCodeMatch[] = [];
  const relaxedMatches: CulturalCodeMatch[] = [];

  // Build both views in one loop to avoid changing any other modules
  for (const codeReq of CODE_REQUIREMENTS) {
    const relaxed = calculateCodeMatch(codeReq, patterns, "relaxed");
    if (relaxed) relaxedMatches.push(relaxed);

    const strict = calculateCodeMatch(codeReq, patterns, "strict");
    if (strict) strictMatches.push(strict);
  }

  // Sort both lists by score (descending)
  strictMatches.sort((a, b) => b.matchScore - a.matchScore);
  relaxedMatches.sort((a, b) => b.matchScore - a.matchScore);

  // Start with strict winners
  const picked: CulturalCodeMatch[] = [];
  const pickedIds = new Set<number>();

  for (const m of strictMatches) {
    if (picked.length >= 3) break;
    picked.push(m);
    pickedIds.add(m.codeId);
  }

  // Backfill from relaxed list if strict is too sparse (prevents always Namsea fallback)
  if (picked.length < 3) {
    for (const m of relaxedMatches) {
      if (picked.length >= 3) break;
      if (!pickedIds.has(m.codeId)) {
        picked.push(m);
        pickedIds.add(m.codeId);
      }
    }
  }

  // Final safety: should never happen, but keep stable
  while (picked.length < 3) {
    picked.push(createDefaultMatch(picked.length + 1));
  }

  return {
    primary: picked[0],
    secondary: picked[1],
    tertiary: picked[2],
    // allMatches is the full ranked relaxed list (useful for debugging + UI expansion later)
    allMatches: relaxedMatches,
  };
}

/**
 * Create a default match if something goes very wrong
 */
function createDefaultMatch(rank: number): CulturalCodeMatch {
  // Use rank to avoid returning the same thing 3 times in worst-case scenarios
  const fallbackOrder = ["Namsea", "Renara", "Khoisan"] as const;
  const codeName = fallbackOrder[(rank - 1) % fallbackOrder.length];

  const req = CODE_REQUIREMENTS.find((c) => c.codeName === codeName);

  return {
    codeId: req?.codeId ?? 0,
    codeName: req?.codeName ?? codeName,
    fullName: req?.fullName ?? "Vietnamese + Thai Fusion",
    matchScore: 50,
    matchPercentage: 50,
    confidence: "low",
    corePatternMatches: [],
    supportingPatternMatches: [],
    incompatiblePatterns: [],
  };
}

/**
 * Get code requirement by code name
 */
export function getCodeRequirement(codeName: string): CodeRequirement | null {
  return CODE_REQUIREMENTS.find((c) => c.codeName === codeName) || null;
}
