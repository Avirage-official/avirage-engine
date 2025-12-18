/**
 * AVIRAGE TYPE DEFINITIONS
 * Core interfaces and types for the Cultural Code system
 */

// ============================================================================
// TRAIT SYSTEM
// ============================================================================

/**
 * The 25 universal traits that map across all personality frameworks
 * Each trait is scored 0-100, with 50 as neutral baseline
 */
export interface TraitScores {
  // Cognitive / Perceptual (5 traits)
  abstract_thinking: number;
  sensory_appreciation: number;
  pattern_recognition: number;
  detail_orientation: number;
  present_moment_focus: number;

  // Creation / Work Style (5 traits)
  craftsmanship_drive: number;
  structure_preference: number;
  improvisation_comfort: number;
  pace_preference: number;
  output_orientation: number;

  // Emotional / Regulation (5 traits)
  emotional_stability: number;
  emotional_expressiveness: number;
  environmental_sensitivity: number;
  introspection_depth: number;
  optimism_baseline: number;

  // Social / Interpersonal (5 traits)
  social_energy: number;
  group_size_preference: number;
  conflict_navigation: number;
  influence_drive: number;
  collaborative_preference: number;

  // Values / Motivation (4 traits)
  tradition_orientation: number;
  novelty_seeking: number;
  stability_seeking: number;
  meaning_orientation: number;

  // Environment / Lifestyle (1 trait)
  nature_connection: number;
}

/**
 * Trait names as a const array for iteration
 */
export const TRAIT_NAMES: (keyof TraitScores)[] = [
  // Cognitive
  "abstract_thinking",
  "sensory_appreciation",
  "pattern_recognition",
  "detail_orientation",
  "present_moment_focus",
  // Creation
  "craftsmanship_drive",
  "structure_preference",
  "improvisation_comfort",
  "pace_preference",
  "output_orientation",
  // Emotional
  "emotional_stability",
  "emotional_expressiveness",
  "environmental_sensitivity",
  "introspection_depth",
  "optimism_baseline",
  // Social
  "social_energy",
  "group_size_preference",
  "conflict_navigation",
  "influence_drive",
  "collaborative_preference",
  // Values
  "tradition_orientation",
  "novelty_seeking",
  "stability_seeking",
  "meaning_orientation",
  // Environment
  "nature_connection",
];

// ============================================================================
// CULTURAL CODE SYSTEM
// ============================================================================

/**
 * A Cultural Code represents a distinct cultural pattern
 * with specific trait ranges and cultural grounding
 */
export interface CulturalCode {
  id: string;
  name: string;
  culture: string;
  essence: string;
  traitProfile: Partial<TraitScores>;
  strongestDifferentiators: {
    trait: keyof TraitScores;
    score: number;
  }[];
}

/**
 * Result of matching user traits against Cultural Codes
 */
export interface CodeMatch {
  code: CulturalCode;
  matchScore: number;
  matchPercentage: number;
  traitAlignments: {
    trait: keyof TraitScores;
    userScore: number;
    codeScore: number;
    alignment: number;
  }[];
}

/**
 * Final analysis result returned to user
 */
export interface AnalysisResult {
  primary: {
    name: string;
    culture: string;
    essence: string;
    matchPercentage: number;
  };
  secondary: {
    name: string;
    culture: string;
    essence: string;
    matchPercentage: number;
  };
  tertiary?: {
    name: string;
    culture: string;
    essence: string;
    matchPercentage: number;
  };
  traitScores: TraitScores;
  explanation: string;
  keyTraits: {
    trait: string;
    score: number;
    description: string;
  }[];
}

// ============================================================================
// TEXT ANALYSIS
// ============================================================================

/**
 * Text analysis configuration for extracting traits
 */
export interface TextPattern {
  keywords: string[];
  phrases: string[];
  negations: string[];
  intensifiers: string[];
  weight: number;
}

/**
 * Intermediate analysis state
 */
export interface TextAnalysisState {
  detectedPatterns: {
    trait: keyof TraitScores;
    pattern: string;
    sentiment: "positive" | "negative" | "neutral";
    intensity: number;
  }[];
  rawScores: Partial<TraitScores>;
  confidence: number;
}
