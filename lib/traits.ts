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
export const TRAIT_METADATA: Record
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
    description: "How comfortable you are working with ideas, concepts, and theories versus concrete facts and immediate reality",
    lowLabel: "Practical thinker",
    highLabel: "Conceptual thinker",
  },
  sensory_appreciation: {
    name: "Sensory Appreciation",
    description: "How much you notice and care about textures, aesthetics, physical details, and the quality of sensory experience",
    lowLabel: "Function over form",
    highLabel: "Aesthetics matter",
  },
  pattern_recognition: {
    name: "Pattern Recognition",
    description: "Your natural ability to spot connections, recurring themes, and underlying systems that others might miss",
    lowLabel: "Takes things as they are",
    highLabel: "Sees the bigger picture",
  },
  detail_orientation: {
    name: "Detail Orientation",
    description: "How much precision and thoroughness matter to you—whether small things get your full attention or you stay zoomed out",
    lowLabel: "Big strokes",
    highLabel: "Every detail counts",
  },
  present_moment_focus: {
    name: "Present Moment Focus",
    description: "Whether you're naturally anchored in what's happening right now, or often thinking about what's coming or what's passed",
    lowLabel: "Planning or reflecting",
    highLabel: "Living in the moment",
  },

  // CREATION / WORK STYLE
  craftsmanship_drive: {
    name: "Craftsmanship Drive",
    description: "How much you care about making things well versus just getting them done—quality as a personal standard",
    lowLabel: "Ships and moves on",
    highLabel: "Refines until right",
  },
  structure_preference: {
    name: "Structure Preference",
    description: "Your comfort with organization, plans, and clear frameworks versus fluid, adaptive approaches",
    lowLabel: "Keeps it flexible",
    highLabel: "Needs structure",
  },
  improvisation_comfort: {
    name: "Improvisation Comfort",
    description: "How easily you work without a plan—whether you thrive in spontaneity or need time to prepare",
    lowLabel: "Prepares first",
    highLabel: "Figures it out live",
  },
  pace_preference: {
    name: "Pace Preference",
    description: "The natural speed you move through life and work—fast and intense versus slow and deliberate",
    lowLabel: "High speed",
    highLabel: "Steady rhythm",
  },
  output_orientation: {
    name: "Output Orientation",
    description: "Whether you're motivated by tangible results and completion, or by the process and experience of doing",
    lowLabel: "Enjoys the journey",
    highLabel: "Driven by outcomes",
  },

  // EMOTIONAL / REGULATION
  emotional_stability: {
    name: "Emotional Stability",
    description: "How steady you stay under pressure—whether stress rattles you or you remain calm and grounded",
    lowLabel: "Runs hot",
    highLabel: "Stays even",
  },
  emotional_expressiveness: {
    name: "Emotional Expressiveness",
    description: "How openly you show what you feel—whether emotions stay internal or flow outward naturally",
    lowLabel: "Keeps it inside",
    highLabel: "Wears it openly",
  },
  environmental_sensitivity: {
    name: "Environmental Sensitivity",
    description: "How easily you're affected by noise, crowds, chaos, or intensity—your tolerance for stimulation",
    lowLabel: "High tolerance",
    highLabel: "Needs calm",
  },
  introspection_depth: {
    name: "Introspection Depth",
    description: "How much time you spend examining your own thoughts, feelings, and motivations versus focusing outward",
    lowLabel: "Action-focused",
    highLabel: "Self-reflective",
  },
  optimism_baseline: {
    name: "Optimism Baseline",
    description: "Your default outlook on how things will turn out—naturally hopeful or naturally cautious",
    lowLabel: "Expects problems",
    highLabel: "Expects the best",
  },

  // SOCIAL / INTERPERSONAL
  social_energy: {
    name: "Social Energy",
    description: "Whether being around people energizes you or drains you—your social battery recharges or depletes with interaction",
    lowLabel: "Solo recharges",
    highLabel: "People energize",
  },
  group_size_preference: {
    name: "Group Size Preference",
    description: "Whether you thrive in big crowds and events or prefer intimate, small gatherings",
    lowLabel: "Small circles",
    highLabel: "Big groups",
  },
  conflict_navigation: {
    name: "Conflict Navigation",
    description: "How you handle disagreement—whether you address it directly or find ways to avoid confrontation",
    lowLabel: "Keeps the peace",
    highLabel: "Speaks up",
  },
  influence_drive: {
    name: "Influence Drive",
    description: "Your natural inclination to lead, shape decisions, and assert your perspective versus following or deferring",
    lowLabel: "Lets others lead",
    highLabel: "Takes the lead",
  },
  collaborative_preference: {
    name: "Collaborative Preference",
    description: "Whether you do your best work alone or with others—solo focus versus team synergy",
    lowLabel: "Works solo",
    highLabel: "Works with others",
  },

  // VALUES / MOTIVATION
  tradition_orientation: {
    name: "Tradition Orientation",
    description: "How much you respect established methods, cultural continuity, and time-tested approaches",
    lowLabel: "Questions tradition",
    highLabel: "Values heritage",
  },
  novelty_seeking: {
    name: "Novelty Seeking",
    description: "Your drive for new experiences, change, and exploration versus staying with what's familiar",
    lowLabel: "Likes the familiar",
    highLabel: "Craves the new",
  },
  stability_seeking: {
    name: "Stability Seeking",
    description: "How much you need predictability, security, and consistency in your life and environment",
    lowLabel: "Comfortable with change",
    highLabel: "Needs consistency",
  },
  meaning_orientation: {
    name: "Meaning Orientation",
    description: "Whether purpose and significance drive your choices, or practicality and pleasure take priority",
    lowLabel: "Practical first",
    highLabel: "Meaning first",
  },

  // ENVIRONMENT / LIFESTYLE
  nature_connection: {
    name: "Nature Connection",
    description: "Whether you're grounded by natural environments or energized by urban settings and human activity",
    lowLabel: "City energy",
    highLabel: "Nature grounds",
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
