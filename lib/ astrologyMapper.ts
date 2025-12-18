/**
 * AVIRAGE ASTROLOGY MAPPER
 * Converts birth data (sun sign, optional moon/rising) to trait scores
 */

import { TraitScores } from "./types";

// ============================================================================
// ZODIAC SIGN DEFINITIONS
// ============================================================================

type ZodiacSign =
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
 * Trait profiles for each zodiac sign
 * Based on traditional astrology + our framework mapping
 */
const ZODIAC_PROFILES: Record<ZodiacSign, SignTraits> = {
  aries: {
    element: "fire",
    modality: "cardinal",
    traits: {
      novelty_seeking: 75,
      pace_preference: 35, // fast
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
      pace_preference: 75, // slow
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
      pace_preference: 40, // fast
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
      group_size_preference: 70, // large
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
      conflict_navigation: 25, // avoidant
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

/**
 * Element modifiers (apply on top of sun sign)
 */
const ELEMENT_MODIFIERS: Record<Element, Partial<TraitScores>> = {
  fire: {
    social_energy: 10,
    optimism_baseline: 10,
    pace_preference: -10, // faster
    novelty_seeking: 10,
  },
  earth: {
    stability_seeking: 10,
    sensory_appreciation: 10,
    craftsmanship_drive: 10,
    nature_connection: 10,
  },
  air: {
    abstract_thinking: 10,
    social_energy: 10,
    novelty_seeking: 10,
    conflict_navigation: 5,
  },
  water: {
    emotional_expressiveness: 10,
    introspection_depth: 10,
    environmental_sensitivity: 10,
    meaning_orientation: 10,
  },
};

/**
 * Modality modifiers
 */
const MODALITY_MODIFIERS: Record<Modality, Partial<TraitScores>> = {
  cardinal: {
    influence_drive: 10,
    output_orientation: 10,
    novelty_seeking: 5,
  },
  fixed: {
    stability_seeking: 10,
    tradition_orientation: 5,
    craftsmanship_drive: 5,
  },
  mutable: {
    improvisation_comfort: 10,
    novelty_seeking: 5,
    structure_preference: -5,
  },
};

// ============================================================================
// DATE CALCULATION
// ============================================================================

/**
 * Calculate zodiac sign from birth date
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
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "aquarius";
  return "pisces"; // Feb 19 - Mar 20
}

// ============================================================================
// TRAIT EXTRACTION
// ============================================================================

/**
 * Get trait scores from astrology data
 * Weight: 0.3 (astrology is least reliable in our framework)
 */
export function getAstrologyTraits(birthDate: Date): {
  traits: Partial<TraitScores>;
  sunSign: string;
  element: string;
  modality: string;
} {
  const sunSign = getZodiacSign(birthDate);
  const profile = ZODIAC_PROFILES[sunSign];

  // Start with sun sign traits
  const traits: Partial<TraitScores> = { ...profile.traits };

  // Apply element modifiers
  const elementMods = ELEMENT_MODIFIERS[profile.element];
  for (const key in elementMods) {
    const traitKey = key as keyof TraitScores;
    traits[traitKey] = (traits[traitKey] || 50) + (elementMods[traitKey] || 0);
  }

  // Apply modality modifiers
  const modalityMods = MODALITY_MODIFIERS[profile.modality];
  for (const key in modalityMods) {
    const traitKey = key as keyof TraitScores;
    traits[traitKey] =
      (traits[traitKey] || 50) + (modalityMods[traitKey] || 0);
  }

  return {
    traits,
    sunSign: sunSign.charAt(0).toUpperCase() + sunSign.slice(1),
    element: profile.element,
    modality: profile.modality,
  };
}

/**
 * Calculate age from birthdate
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
