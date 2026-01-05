/**
 * AVIRAGE TYPE DEFINITIONS
 * Core interfaces and types for the Cultural Code system
 *
 * Design goals:
 * - Prevent drift (trait keys, code identity, naming)
 * - Keep backwards compatibility with existing engine logic
 * - Support future "mythic/archetype display layer" without touching scoring
 */

// ============================================================================
// PRIMITIVES
// ============================================================================

/** Cultural code categories */
export type CodeType = "standalone" | "fusion";

/** Sentiment used in text/pattern detection */
export type Sentiment = "positive" | "negative" | "neutral";

/**
 * Canonical identity for a code.
 * Keep both `id` and `code_name` because your dataset + routing relies on both.
 */
export interface CodeRef {
  id: number;
  code_name: string; // stable internal key (slug-like)
}

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
 * (Used to ensure runtime loops always follow the same canonical order.)
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
export interface CulturalCode extends CodeRef {
  full_name: string;
  type: CodeType;
  origin: string;
  description: string;
  core_concepts: string[];
  source_cultures?: string[];

  /**
   * Canonical target trait vector for this code.
   * (Kept 1:1 with TraitScores to prevent drift / missing keys.)
   */
  traits: TraitScores;
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
    alignment: number; // typically 0-100
  }[];
}

/**
 * Final analysis result returned to user
 * NOTE: This keeps your current structure so UI doesn’t break.
 */
export interface AnalysisResult {
  primary: {
    code_name: string;
    full_name: string;
    description: string;
    matchPercentage: number;
  };
  secondary: {
    code_name: string;
    full_name: string;
    description: string;
    matchPercentage: number;
  };
  tertiary?: {
    code_name: string;
    full_name: string;
    description: string;
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
// TEXT / PATTERN ANALYSIS
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
    sentiment: Sentiment;
    intensity: number;
  }[];
  rawScores: Partial<TraitScores>;
  confidence: number;
}
