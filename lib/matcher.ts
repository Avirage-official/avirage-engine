/**
 * AVIRAGE MATCHER
 * Compares user trait scores against Cultural Code profiles
 */

import { TraitScores, CulturalCode, CodeMatch, AnalysisResult } from "./types";
import { CULTURAL_CODES } from "./culturalCodes";
import { TRAIT_METADATA } from "./traits";

// ============================================================================
// MATCHING ALGORITHM
// ============================================================================

/**
 * Calculate similarity between user traits and a Cultural Code profile
 * Uses weighted distance calculation
 */
function calculateMatch(
  userTraits: TraitScores,
  code: CulturalCode
): CodeMatch {
  let totalDistance = 0;
  let totalWeight = 0;
  const alignments: CodeMatch["traitAlignments"] = [];

  // Compare each trait
  for (const traitKey in code.traits) {
    const trait = traitKey as keyof TraitScores;
    const userScore = userTraits[trait];
    const codeScore = code.traits[trait];

    if (codeScore === undefined) continue;

    // Calculate distance (0 = perfect match, 100 = maximum difference)
    const distance = Math.abs(userScore - codeScore);

    // Weight based on core concepts (traits mentioned in core_concepts get higher weight)
    // Simple heuristic: if trait has extreme value (>80 or <20), it's likely a differentiator
    const isExtreme = codeScore > 80 || codeScore < 20;
    const weight = isExtreme ? 2.0 : 1.0;

    totalDistance += distance * weight;
    totalWeight += weight;

    // Calculate alignment percentage (inverse of distance)
    const alignment = 100 - distance;

    alignments.push({
      trait,
      userScore,
      codeScore,
      alignment,
    });
  }

  // Calculate match score (0-100, higher is better)
  const averageDistance = totalDistance / totalWeight;
  const matchScore = 100 - averageDistance;
  const matchPercentage = Math.max(0, Math.min(100, matchScore));

  // Sort alignments by strongest matches
  alignments.sort((a, b) => b.alignment - a.alignment);

  return {
    code,
    matchScore,
    matchPercentage,
    traitAlignments: alignments,
  };
}

/**
 * Find best matching Cultural Codes for user traits
 */
export function findMatches(userTraits: TraitScores): CodeMatch[] {
  const matches: CodeMatch[] = [];

  // Calculate match for each code
  for (const code of CULTURAL_CODES) {
    const match = calculateMatch(userTraits, code);
    matches.push(match);
  }

  // Sort by best match
  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return matches;
}

// ============================================================================
// EXPLANATION GENERATION
// ============================================================================

/**
 * Generate human-readable explanation of why codes matched
 */
function generateExplanation(
  primary: CodeMatch,
  secondary: CodeMatch,
  userTraits: TraitScores
): string {
  // Get top 3 aligned traits for primary code
  const topAlignments = primary.traitAlignments.slice(0, 3);

  const traitDescriptions = topAlignments.map((alignment) => {
    const metadata = TRAIT_METADATA[alignment.trait];
    const score = alignment.userScore;

    let description: string;
    if (score > 70) {
      description = `high ${metadata.name.toLowerCase()} (${metadata.highLabel})`;
    } else if (score < 30) {
      description = `low ${metadata.name.toLowerCase()} (${metadata.lowLabel})`;
    } else if (score > 55) {
      description = `moderate ${metadata.name.toLowerCase()}`;
    } else if (score < 45) {
      description = `lower ${metadata.name.toLowerCase()}`;
    } else {
      description = `balanced ${metadata.name.toLowerCase()}`;
    }

    return description;
  });

  const explanation = `You align with ${primary.code.code_name} (${
    Math.round(primary.matchPercentage)
  }% match) through your ${traitDescriptions.join(", ")}. Your secondary resonance with ${
    secondary.code.code_name
  } (${
    Math.round(secondary.matchPercentage)
  }% match) suggests you also value ${secondary.code.description.toLowerCase()}.`;

  return explanation;
}

/**
 * Get key traits to highlight (most distinctive scores)
 */
function getKeyTraits(userTraits: TraitScores): {
  trait: string;
  score: number;
  description: string;
}[] {
  const keyTraits: {
    trait: string;
    score: number;
    description: string;
  }[] = [];

  // Find traits that deviate significantly from neutral (50)
  for (const traitKey in userTraits) {
    const trait = traitKey as keyof TraitScores;
    const score = userTraits[trait];
    const deviation = Math.abs(score - 50);

    if (deviation > 20) {
      // Significant deviation
      const metadata = TRAIT_METADATA[trait];

      let description: string;
      if (score > 70) {
        description = `Very ${metadata.highLabel.toLowerCase()}`;
      } else if (score < 30) {
        description = `Very ${metadata.lowLabel.toLowerCase()}`;
      } else if (score > 55) {
        description = `Tends toward ${metadata.highLabel.toLowerCase()}`;
      } else {
        description = `Tends toward ${metadata.lowLabel.toLowerCase()}`;
      }

      keyTraits.push({
        trait: metadata.name,
        score: Math.round(score),
        description,
      });
    }
  }

  // Sort by deviation magnitude
  keyTraits.sort(
    (a, b) => Math.abs(b.score - 50) - Math.abs(a.score - 50)
  );

  // Return top 5
  return keyTraits.slice(0, 5);
}

// ============================================================================
// MAIN ANALYSIS FUNCTION
// ============================================================================

/**
 * Complete analysis: traits → codes → formatted result
 */
export function analyzeTraits(userTraits: TraitScores): AnalysisResult {
  // Find matching codes
  const matches = findMatches(userTraits);

  const primary = matches[0];
  const secondary = matches[1];
  const tertiary = matches[2];

  // Generate explanation
  const explanation = generateExplanation(primary, secondary, userTraits);

  // Get key traits
  const keyTraits = getKeyTraits(userTraits);

  return {
    primary: {
      code_name: primary.code.code_name,
      full_name: primary.code.full_name,
      description: primary.code.description,
      matchPercentage: Math.round(primary.matchPercentage),
    },
    secondary: {
      code_name: secondary.code.code_name,
      full_name: secondary.code.full_name,
      description: secondary.code.description,
      matchPercentage: Math.round(secondary.matchPercentage),
    },
    tertiary: {
      code_name: tertiary.code.code_name,
      full_name: tertiary.code.full_name,
      description: tertiary.code.description,
      matchPercentage: Math.round(tertiary.matchPercentage),
    },
    traitScores: userTraits,
    explanation,
    keyTraits,
  };
}

/**
 * Get detailed breakdown for debugging/advanced users
 */
export function getDetailedBreakdown(
  userTraits: TraitScores
): {
  matches: CodeMatch[];
  topAlignments: {
    code: string;
    traits: { trait: string; userScore: number; codeScore: number; alignment: number }[];
  }[];
} {
  const matches = findMatches(userTraits);

  const topAlignments = matches.slice(0, 3).map((match) => ({
    code: match.code.code_name,
    traits: match.traitAlignments.slice(0, 5).map((a) => ({
      trait: TRAIT_METADATA[a.trait].name,
      userScore: Math.round(a.userScore),
      codeScore: Math.round(a.codeScore),
      alignment: Math.round(a.alignment),
    })),
  }));

  return {
    matches,
    topAlignments,
  };
}
