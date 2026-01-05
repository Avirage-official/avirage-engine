/**
 * AVIRAGE ASTROLOGY MAPPER (UPGRADED)
 * Converts birth data (sun sign) to trait tendencies.
 *
 * Design goals:
 * - Keep exports + signatures compatible with your engine
 * - Make the math cleaner (clamp 0–100, avoid runaway values)
 * - Keep astrology as a light influence (traits are "tendencies", not destiny)
 */

import { TraitScores } from "./types";

// ============================================================================
// ZODIAC SIGN DEFINITIONS
// ============================================================================

export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

type Element = "fire" | "earth" | "air" | "water";
type Modality = "cardinal" | "fixed" | "mutable";

interface SignTraits {
  element: Element;
  modality: Modality;
  traits: Partial<TraitScores>;
}

/**
 * Astrology influence weight.
 * Your engine can choose to apply this as a multiplier when blending sources.
 * (We do NOT force-weight inside this mapper; we just return trait tendencies.)
 */
export const ASTROLOGY_WEIGHT = 0.3;

// ============================================================================
// UTILITIES
// ============================================================================

const BASELINE = 50;

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function clamp100(n: number): number {
  if (Number.isNaN(n)) return BASELINE;
  return Math.max(0, Math.min(100, n));
}

function toTitleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Apply a modifier map onto an existing trait map.
 * Missing traits default to baseline (50) before modifications.
 */
function applyModifiers(
  current: Partial<TraitScores>,
  mods: Partial<TraitScores>
): Partial<TraitScores> {
  const next: Partial<TraitScores> = { ...current };

  for (const key in mods) {
    const k = key as keyof TraitScores;
    const base = typeof next[k] === "number" ? (next[k] as number) : BASELINE;
    const delta = mods[k] ?? 0;
    next[k] = clamp100(base + delta);
  }

  return next;
}

/**
 * Optional: soft-normalize trait values to avoid overly extreme profiles.
 * Keeps relative differences, but gently pulls everything toward baseline.
 * intensity: 0 = no change, 1 = strong pull to baseline
 */
function softenExtremes(
  traits: Partial<TraitScores>,
  intensity = 0.18
): Partial<TraitScores> {
  const t = clamp01(intensity);
  const out: Partial<TraitScores> = { ...traits };

  for (const key in out) {
    const k = key as keyof TraitScores;
    const v = out[k];
    if (typeof v !== "number") continue;
    // lerp(v -> 50)
    out[k] = clamp100(v + (BASELINE - v) * t);
  }

  return out;
}

// ============================================================================
// ZODIAC PROFILES (SUN SIGN BASE)
// ============================================================================

/**
 * Trait profiles for each zodiac sign.
 * These are *tendencies* (light hints), not strong determinants.
 *
 * Rule: Keep the list short per sign so astrology doesn't overwhelm your
 * 3-framework triangulation.
 */
const ZODIAC_PROFILES: Record<ZodiacSign, SignTraits> = {
  aries: {
    element: "fire",
    modality: "cardinal",
    traits: {
      novelty_seeking: 75,
      pace_preference: 35, // faster
      influence_drive: 70,
      conflict_navigation: 70, // direct
      optimism_baseline: 70,
      stability_seeking: 35,
      social_energy: 65,
    },
  },
  taurus: {
    element: "earth",
    modality: "fixed",
    traits: {
      sensory_appreciation: 85,
      stability_seeking: 85,
      pace_preference: 75, // slower
      nature_connection: 70,
      tradition_orientation: 65,
      novelty_seeking: 35,
      craftsmanship_drive: 70,
    },
  },
  gemini: {
    element: "air",
    modality: "mutable",
    traits: {
      abstract_thinking: 70,
      novelty_seeking: 80,
      social_energy: 75,
      pace_preference: 40, // faster
      improvisation_comfort: 75,
      structure_preference: 35,
    },
  },
  cancer: {
    element: "water",
    modality: "cardinal",
    traits: {
      emotional_expressiveness: 75,
      environmental_sensitivity: 75,
      group_size_preference: 30, // intimate
      introspection_depth: 70,
      stability_seeking: 70,
      nature_connection: 60,
    },
  },
  leo: {
    element: "fire",
    modality: "fixed",
    traits: {
      influence_drive: 80,
      emotional_expressiveness: 75,
      social_energy: 80,
      optimism_baseline: 75,
      group_size_preference: 70, // larger
      craftsmanship_drive: 65,
    },
  },
  virgo: {
    element: "earth",
    modality: "mutable",
    traits: {
      detail_orientation: 85,
      structure_preference: 75,
      craftsmanship_drive: 75,
      introspection_depth: 70,
      sensory_appreciation: 65,
      improvisation_comfort: 40,
    },
  },
  libra: {
    element: "air",
    modality: "cardinal",
    traits: {
      sensory_appreciation: 80,
      conflict_navigation: 25, // more avoidant
      social_energy: 70,
      abstract_thinking: 65,
      group_size_preference: 60,
      emotional_stability: 60,
    },
  },
  scorpio: {
    element: "water",
    modality: "fixed",
    traits: {
      introspection_depth: 85,
      emotional_expressiveness: 70,
      meaning_orientation: 80,
      stability_seeking: 70,
      influence_drive: 70,
      environmental_sensitivity: 65,
    },
  },
  sagittarius: {
    element: "fire",
    modality: "mutable",
    traits: {
      novelty_seeking: 85,
      optimism_baseline: 85,
      abstract_thinking: 75,
      social_energy: 70,
      tradition_orientation: 35,
      stability_seeking: 30,
    },
  },
  capricorn: {
    element: "earth",
    modality: "cardinal",
    traits: {
      structure_preference: 85,
      output_orientation: 80,
      stability_seeking: 80,
      tradition_orientation: 70,
      craftsmanship_drive: 70,
      pace_preference: 60,
    },
  },
  aquarius: {
    element: "air",
    modality: "fixed",
    traits: {
      abstract_thinking: 80,
      novelty_seeking: 80,
      tradition_orientation: 30,
      social_energy: 60,
      conflict_navigation: 65,
      meaning_orientation: 70,
    },
  },
  pisces: {
    element: "water",
    modality: "mutable",
    traits: {
      introspection_depth: 80,
      emotional_expressiveness: 75,
      sensory_appreciation: 75,
      improvisation_comfort: 75,
      meaning_orientation: 75,
      environmental_sensitivity: 75,
    },
  },
};

// ============================================================================
// ELEMENT + MODALITY MODIFIERS
// ============================================================================

/**
 * Element modifiers (small deltas applied on top of sun sign)
 * Keep deltas moderate so we don't push traits out of range.
 */
const ELEMENT_MODIFIERS: Record<Element, Partial<TraitScores>> = {
  fire: {
    social_energy: 8,
    optimism_baseline: 8,
    pace_preference: -8, // faster
    novelty_seeking: 8,
  },
  earth: {
    stability_seeking: 8,
    sensory_appreciation: 8,
    craftsmanship_drive: 8,
    nature_connection: 8,
  },
  air: {
    abstract_thinking: 8,
    social_energy: 6,
    novelty_seeking: 6,
    conflict_navigation: 4,
  },
  water: {
    emotional_expressiveness: 8,
    introspection_depth: 8,
    environmental_sensitivity: 8,
    meaning_orientation: 8,
  },
};

/**
 * Modality modifiers (small deltas)
 */
const MODALITY_MODIFIERS: Record<Modality, Partial<TraitScores>> = {
  cardinal: {
    influence_drive: 8,
    output_orientation: 6,
    novelty_seeking: 4,
  },
  fixed: {
    stability_seeking: 8,
    tradition_orientation: 4,
    craftsmanship_drive: 4,
  },
  mutable: {
    improvisation_comfort: 8,
    novelty_seeking: 4,
    structure_preference: -4,
  },
};

// ============================================================================
// DATE → SIGN
// ============================================================================

/**
 * Calculate zodiac sign from birth date (tropical sun sign)
 */
export function getZodiacSign(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1; // 1-12
  const day = birthDate.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
  return "pisces"; // Feb 19 - Mar 20
}

// ============================================================================
// TRAIT EXTRACTION
// ============================================================================

/**
 * Get trait tendencies from astrology.
 *
 * Note:
 * - We keep this output as Partial<TraitScores> because astrology only touches
 *   a subset of traits.
 * - Your engine should blend these with other sources using ASTROLOGY_WEIGHT.
 */
export function getAstrologyTraits(birthDate: Date): {
  traits: Partial<TraitScores>;
  sunSign: string;
  element: string;
  modality: string;
} {
  const sunSign = getZodiacSign(birthDate);
  const profile = ZODIAC_PROFILES[sunSign];

  // Start with sun sign traits (clamped)
  let traits: Partial<TraitScores> = {};
  for (const key in profile.traits) {
    const k = key as keyof TraitScores;
    const v = profile.traits[k];
    if (typeof v === "number") traits[k] = clamp100(v);
  }

  // Apply element + modality deltas
  traits = applyModifiers(traits, ELEMENT_MODIFIERS[profile.element]);
  traits = applyModifiers(traits, MODALITY_MODIFIERS[profile.modality]);

  // Prevent astrology output from getting too extreme
  traits = softenExtremes(traits, 0.18);

  return {
    traits,
    sunSign: toTitleCase(sunSign),
    element: toTitleCase(profile.element),
    modality: toTitleCase(profile.modality),
  };
}

/**
 * Calculate age from birthdate (simple utility)
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
