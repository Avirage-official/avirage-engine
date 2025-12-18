/**
 * AVIRAGE UNIVERSAL TRAITS
 * The 25 traits that form the foundation of personality measurement
 */

import { TraitScores } from "./types";

/**
 * Initialize all traits at neutral baseline (50)
 */
export function initializeTraits(): TraitScores {
  return {
    // Cognitive / Perceptual
    abstract_thinking: 50,
    sensory_appreciation: 50,
    pattern_recognition: 50,
    detail_orientation: 50,
    present_moment_focus: 50,

    // Creation / Work Style
    craftsmanship_drive: 50,
    structure_preference: 50,
    improvisation_comfort: 50,
    pace_preference: 50,
    output_orientation: 50,

    // Emotional / Regulation
    emotional_stability: 50,
    emotional_expressiveness: 50,
    environmental_sensitivity: 50,
    introspection_depth: 50,
    optimism_baseline: 50,

    // Social / Interpersonal
    social_energy: 50,
    group_size_preference: 50,
    conflict_navigation: 50,
    influence_drive: 50,
    collaborative_preference: 50,

    // Values / Motivation
    tradition_orientation: 50,
    novelty_seeking: 50,
    stability_seeking: 50,
    meaning_orientation: 50,

    // Environment / Lifestyle
    nature_connection: 50,
  };
}

/**
 * Trait metadata for display and explanation
 */
export const TRAIT_METADATA: Record<
  keyof TraitScores,
  {
    name: string;
    description: string;
    lowLabel: string;
    highLabel: string;
  }
> = {
  // COGNITIVE / PERCEPTUAL
  abstract_thinking: {
    name: "Abstract Thinking",
    description: "Comfort with theory, concepts, and non-concrete ideas",
    lowLabel: "Concrete, practical",
    highLabel: "Theoretical, conceptual",
  },
  sensory_appreciation: {
    name: "Sensory Appreciation",
    description: "Attunement to physical details, textures, aesthetics",
    lowLabel: "Function-focused",
    highLabel: "Aesthetically attuned",
  },
  pattern_recognition: {
    name: "Pattern Recognition",
    description: "Noticing systems, connections, recurring themes",
    lowLabel: "Takes as-is",
    highLabel: "Sees connections",
  },
  detail_orientation: {
    name: "Detail Orientation",
    description: "Precision, attentiveness to small elements",
    lowLabel: "Big picture",
    highLabel: "Meticulous",
  },
  present_moment_focus: {
    name: "Present Moment Focus",
    description: "Being fully engaged in the now vs past/future",
    lowLabel: "Future/past oriented",
    highLabel: "Present, mindful",
  },

  // CREATION / WORK STYLE
  craftsmanship_drive: {
    name: "Craftsmanship Drive",
    description: "Care in making things well, pride in quality",
    lowLabel: "Good enough",
    highLabel: "Artisan quality",
  },
  structure_preference: {
    name: "Structure Preference",
    description: "Desire for plans, schedules, organization",
    lowLabel: "Spontaneous",
    highLabel: "Structured",
  },
  improvisation_comfort: {
    name: "Improvisation Comfort",
    description: "Ease with spontaneity, working without plans",
    lowLabel: "Needs preparation",
    highLabel: "Thrives improvising",
  },
  pace_preference: {
    name: "Pace Preference",
    description: "Natural rhythm of work and life",
    lowLabel: "Fast-paced",
    highLabel: "Slow, deliberate",
  },
  output_orientation: {
    name: "Output Orientation",
    description: "Focus on tangible results vs process enjoyment",
    lowLabel: "Process-focused",
    highLabel: "Results-driven",
  },

  // EMOTIONAL / REGULATION
  emotional_stability: {
    name: "Emotional Stability",
    description: "Resilience under stress, even-keeled temperament",
    lowLabel: "Reactive",
    highLabel: "Calm, stable",
  },
  emotional_expressiveness: {
    name: "Emotional Expressiveness",
    description: "Outward display of feelings, warmth",
    lowLabel: "Reserved",
    highLabel: "Expressive, warm",
  },
  environmental_sensitivity: {
    name: "Environmental Sensitivity",
    description: "Susceptibility to sensory overload, stimulation",
    lowLabel: "High tolerance",
    highLabel: "Easily overwhelmed",
  },
  introspection_depth: {
    name: "Introspection Depth",
    description: "Degree of self-reflection, inner awareness",
    lowLabel: "Externally focused",
    highLabel: "Deeply introspective",
  },
  optimism_baseline: {
    name: "Optimism Baseline",
    description: "Default outlook on outcomes and possibilities",
    lowLabel: "Cautious, realistic",
    highLabel: "Optimistic, hopeful",
  },

  // SOCIAL / INTERPERSONAL
  social_energy: {
    name: "Social Energy",
    description: "Stimulation gained from people interaction",
    lowLabel: "Drained by people",
    highLabel: "Energized by people",
  },
  group_size_preference: {
    name: "Group Size Preference",
    description: "Comfort with large gatherings vs intimate groups",
    lowLabel: "Intimate, small",
    highLabel: "Crowds, large events",
  },
  conflict_navigation: {
    name: "Conflict Navigation",
    description: "Approach to disagreement and confrontation",
    lowLabel: "Avoids conflict",
    highLabel: "Confronts directly",
  },
  influence_drive: {
    name: "Influence Drive",
    description: "Desire to lead, shape outcomes, assert opinions",
    lowLabel: "Follows, defers",
    highLabel: "Leads, asserts",
  },
  collaborative_preference: {
    name: "Collaborative Preference",
    description: "Desire to work with others vs solo",
    lowLabel: "Prefers solo work",
    highLabel: "Prefers collaboration",
  },

  // VALUES / MOTIVATION
  tradition_orientation: {
    name: "Tradition Orientation",
    description: "Respect for established methods, heritage, continuity",
    lowLabel: "Innovates, questions",
    highLabel: "Respects tradition",
  },
  novelty_seeking: {
    name: "Novelty Seeking",
    description: "Drive for new experiences, change, exploration",
    lowLabel: "Prefers familiar",
    highLabel: "Constantly new",
  },
  stability_seeking: {
    name: "Stability Seeking",
    description: "Need for predictability, security, consistency",
    lowLabel: "Embraces change",
    highLabel: "Needs stability",
  },
  meaning_orientation: {
    name: "Meaning Orientation",
    description: "Prioritization of purpose over utility or pleasure",
    lowLabel: "Pragmatic, pleasure",
    highLabel: "Purpose-driven",
  },

  // ENVIRONMENT / LIFESTYLE
  nature_connection: {
    name: "Nature Connection",
    description: "Grounding from natural settings vs urban energy",
    lowLabel: "Urban-oriented",
    highLabel: "Nature-grounded",
  },
};

/**
 * Clamp trait scores to valid range (0-100)
 */
export function clampTraits(traits: TraitScores): TraitScores {
  const clamped = { ...traits };
  (Object.keys(clamped) as (keyof TraitScores)[]).forEach((key) => {
    clamped[key] = Math.max(0, Math.min(100, clamped[key]));
  });
  return clamped;
}
