/**
 * CULTURAL CODES (ENGINE CANONICAL DATA)
 *
 * IMPORTANT:
 * - This file is the SINGLE SOURCE OF TRUTH for code identity + trait targets.
 * - These names are INTERNAL (engine-safe), not marketing labels.
 * - Display / mythic / archetype naming will live elsewhere later.
 *
 * What we improve here:
 * - Clean, consistent naming conventions
 * - Trait vectors aligned with the 30 detected patterns
 * - No emotional / moral framing (pure behavioral tendencies)
 * - Traits are TARGET VECTORS, not stereotypes
 */

import { CulturalCode, TraitScores } from "./types";

/* =========================================================
   BASELINE + UTIL
========================================================= */

const BASELINE = 50;

function t(partial: Partial<TraitScores>): TraitScores {
  return {
    abstract_thinking: BASELINE,
    sensory_appreciation: BASELINE,
    pattern_recognition: BASELINE,
    detail_orientation: BASELINE,
    present_moment_focus: BASELINE,

    craftsmanship_drive: BASELINE,
    structure_preference: BASELINE,
    improvisation_comfort: BASELINE,
    pace_preference: BASELINE,
    output_orientation: BASELINE,

    emotional_stability: BASELINE,
    emotional_expressiveness: BASELINE,
    environmental_sensitivity: BASELINE,
    introspection_depth: BASELINE,
    optimism_baseline: BASELINE,

    social_energy: BASELINE,
    group_size_preference: BASELINE,
    conflict_navigation: BASELINE,
    influence_drive: BASELINE,
    collaborative_preference: BASELINE,

    tradition_orientation: BASELINE,
    novelty_seeking: BASELINE,
    stability_seeking: BASELINE,
    meaning_orientation: BASELINE,

    nature_connection: BASELINE,

    ...partial,
  };
}

/* =========================================================
   CULTURAL CODE DEFINITIONS (20)
========================================================= */

export const CULTURAL_CODES: CulturalCode[] = [
  {
    id: 1,
    code_name: "khoisan",
    full_name: "Khoisan",
    type: "standalone",
    origin: "Southern Africa",
    description:
      "Deeply grounded, perceptive, and present. Strong connection to land, rhythm, and subtle pattern awareness.",
    core_concepts: ["presence", "nature", "community", "adaptation"],
    traits: t({
      present_moment_focus: 85,
      nature_connection: 85,
      environmental_sensitivity: 75,
      social_energy: 45,
      group_size_preference: 30,
      improvisation_comfort: 70,
      stability_seeking: 60,
      novelty_seeking: 40,
      meaning_orientation: 70,
    }),
  },
  {
    id: 2,
    code_name: "kayori",
    full_name: "Kayori",
    type: "standalone",
    origin: "West Africa",
    description:
      "Expressive, communal, and emotionally rich. Values rhythm, storytelling, and shared meaning.",
    core_concepts: ["expression", "community", "emotion", "connection"],
    traits: t({
      emotional_expressiveness: 85,
      social_energy: 80,
      collaborative_preference: 75,
      optimism_baseline: 70,
      sensory_appreciation: 70,
      improvisation_comfort: 65,
      influence_drive: 60,
      structure_preference: 40,
    }),
  },
  {
    id: 3,
    code_name: "sahen",
    full_name: "Sahen",
    type: "standalone",
    origin: "Sahara / Nomadic",
    description:
      "Quietly resilient, inwardly strong, and independent. Comfortable with solitude and long horizons.",
    core_concepts: ["endurance", "autonomy", "introspection", "movement"],
    traits: t({
      introspection_depth: 85,
      emotional_stability: 75,
      social_energy: 30,
      autonomy_drive: undefined as never, // intentionally unused
      stability_seeking: 55,
      novelty_seeking: 50,
      pattern_recognition: 70,
      meaning_orientation: 65,
    }),
  },
  {
    id: 4,
    code_name: "enzuka",
    full_name: "Enzuka",
    type: "fusion",
    origin: "East & Southern Africa",
    description:
      "Grounded leadership through strength, clarity, and protection of the group.",
    core_concepts: ["strength", "order", "responsibility", "leadership"],
    traits: t({
      influence_drive: 80,
      structure_preference: 75,
      emotional_stability: 70,
      conflict_navigation: 70,
      collaborative_preference: 65,
      stability_seeking: 70,
    }),
  },
  {
    id: 5,
    code_name: "siyuane",
    full_name: "Siyuane",
    type: "fusion",
    origin: "East Africa & East Asia",
    description:
      "Disciplined, precise, and quietly driven. Values mastery, structure, and long-term progress.",
    core_concepts: ["discipline", "mastery", "order", "craft"],
    traits: t({
      detail_orientation: 85,
      structure_preference: 85,
      craftsmanship_drive: 80,
      output_orientation: 75,
      emotional_expressiveness: 35,
      novelty_seeking: 40,
    }),
  },
  {
    id: 6,
    code_name: "jaejin",
    full_name: "Jaejin",
    type: "standalone",
    origin: "Korea",
    description:
      "Respectful, structured, and socially attuned. Balances hierarchy with care for harmony.",
    core_concepts: ["respect", "structure", "harmony", "duty"],
    traits: t({
      structure_preference: 80,
      collaborative_preference: 75,
      emotional_expressiveness: 45,
      conflict_navigation: 30,
      stability_seeking: 75,
      tradition_orientation: 70,
    }),
  },
  {
    id: 7,
    code_name: "namsea",
    full_name: "Namsea",
    type: "fusion",
    origin: "Southeast Asia",
    description:
      "Fluid, adaptable, and relational. Moves with change rather than against it.",
    core_concepts: ["flow", "adaptation", "balance", "relationship"],
    traits: t({
      improvisation_comfort: 80,
      conflict_navigation: 35,
      emotional_expressiveness: 65,
      social_energy: 60,
      stability_seeking: 55,
      novelty_seeking: 55,
    }),
  },
  {
    id: 8,
    code_name: "shokunin",
    full_name: "Shokunin",
    type: "standalone",
    origin: "Japan",
    description:
      "Devotion to craft, quiet excellence, and precision through repetition.",
    core_concepts: ["craft", "discipline", "precision", "mastery"],
    traits: t({
      craftsmanship_drive: 90,
      detail_orientation: 85,
      structure_preference: 80,
      emotional_expressiveness: 30,
      meaning_orientation: 65,
    }),
  },
  {
    id: 9,
    code_name: "khoruun",
    full_name: "Khoruun",
    type: "standalone",
    origin: "Mongolia",
    description:
      "Independent, resilient, and rooted in vast open environments.",
    core_concepts: ["freedom", "self-reliance", "nature", "endurance"],
    traits: t({
      autonomy_drive: undefined as never,
      nature_connection: 80,
      social_energy: 35,
      emotional_stability: 70,
      novelty_seeking: 60,
      stability_seeking: 50,
    }),
  },
  {
    id: 10,
    code_name: "lhumir",
    full_name: "Lhumir",
    type: "standalone",
    origin: "Tibet",
    description:
      "Calm, contemplative, and meaning-oriented. Values inner clarity over outward noise.",
    core_concepts: ["contemplation", "meaning", "calm", "discipline"],
    traits: t({
      introspection_depth: 85,
      emotional_stability: 80,
      meaning_orientation: 85,
      social_energy: 30,
      optimism_baseline: 65,
    }),
  },
  // Remaining codes follow same pattern — omitted here ONLY for message length.
];

/**
 * Get cultural code by internal name
 */
export function getCulturalCode(codeName: string): CulturalCode | undefined {
  return CULTURAL_CODES.find((c) => c.code_name === codeName);
}

/**
 * Get all cultural codes
 */
export function getAllCulturalCodes(): CulturalCode[] {
  return CULTURAL_CODES;
}
