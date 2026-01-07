/**
 * AVIRAGE TYPE DEFINITIONS
 * Core interfaces and types for the Cultural Code system
 *
 * DESIGN RULES (LOCKED):
 * - Prevent drift (trait keys, code identity, naming)
 * - Maintain full backwards compatibility
 * - Cultural Codes remain the ENGINE backbone
 * - Mythic / archetype layer is ADDITIVE, not substitutive
 * - Scoring, matching, and routing MUST NOT change
 */

// ============================================================================
// PRIMITIVES
// ============================================================================

/** Cultural code categories */
export type CodeType = "standalone" | "fusion";

/** Sentiment used in text / pattern detection */
export type Sentiment = "positive" | "negative" | "neutral";

/**
 * Canonical identity reference.
 * Both id + code_name are required for routing, storage, and stability.
 */
export interface CodeRef {
  id: number;
  code_name: string; // stable internal key (slug-like, never user-facing)
}

// ============================================================================
// TRAIT SYSTEM
// ============================================================================

/**
 * The 25 universal traits that map across all personality frameworks.
 * Each trait is scored 0–100, with 50 as neutral baseline.
 */
export interface TraitScores {
  // Cognitive / Perceptual (5)
  abstract_thinking: number;
  sensory_appreciation: number;
  pattern_recognition: number;
  detail_orientation: number;
  present_moment_focus: number;

  // Creation / Work Style (5)
  craftsmanship_drive: number;
  structure_preference: number;
  improvisation_comfort: number;
  pace_preference: number;
  output_orientation: number;

  // Emotional / Regulation (5)
  emotional_stability: number;
  emotional_expressiveness: number;
  environmental_sensitivity: number;
  introspection_depth: number;
  optimism_baseline: number;

  // Social / Interpersonal (5)
  social_energy: number;
  group_size_preference: number;
  conflict_navigation: number;
  influence_drive: number;
  collaborative_preference: number;

  // Values / Motivation (4)
  tradition_orientation: number;
  novelty_seeking: number;
  stability_seeking: number;
  meaning_orientation: number;

  // Environment / Lifestyle (1)
  nature_connection: number;
}

/**
 * Canonical trait order for iteration.
 * This prevents runtime drift and guarantees consistent loops.
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
// CULTURAL CODE SYSTEM (ENGINE CANONICAL)
// ============================================================================

/**
 * A Cultural Code represents a researched behavioral pattern
 * grounded in cultural observation and expressed through trait vectors.
 *
 * IMPORTANT:
 * - Cultural framing is ENGINE-LEVEL grounding, not user identity
 * - User identity is layered later via mythic / archetype fields
 */
export interface CulturalCode extends CodeRef {
  /** Human-readable internal name (legacy + engine compatibility) */
  full_name: string;

  /** Standalone or fusion classification */
  type: CodeType;

  /** Cultural research origin / grounding */
  origin: string;

  /** Canonical behavioral description */
  description: string;

  /** Core conceptual anchors used for explanation */
  core_concepts: string[];

  /** Optional additional research references */
  source_cultures?: string[];

  /**
   * Mythic / archetype identity layer
   * ADDITIVE ONLY — never replaces cultural grounding
   * User-facing representation lives here
   */
  archetype_name?: string;
  archetype_essence?: string;
  archetype_symbol?: string;

  /**
   * Canonical target trait vector.
   * Must remain 1:1 with TraitScores to prevent drift.
   */
  traits: TraitScores;
}

// ============================================================================
// MATCHING + RESULTS
// ============================================================================

/**
 * Result of matching user traits against a Cultural Code
 */
export interface CodeMatch {
  code: CulturalCode;
  matchScore: number;
  matchPercentage: number;
  traitAlignments: {
    trait: keyof TraitScores;
    userScore: number;
    codeScore: number;
    alignment: number; // 0–100
  }[];
}

/**
 * Final analysis result returned to the user.
 * Structure is intentionally stable to avoid UI breakage.
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
 * Text analysis configuration for extracting trait signals
 */
export interface TextPattern {
  keywords: string[];
  phrases: string[];
  negations: string[];
  intensifiers: string[];
  weight: number;
}

/**
 * Intermediate text analysis state
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
