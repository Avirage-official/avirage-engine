// lib/codeDisplayMap.ts

export type CodeDisplay = {
  label: string;
  essence: string;
  description: string;
  icon: string;
  emblem: string; // ← normalized image slug (used by UI)
  tone: "calm" | "bold" | "warm" | "mystic" | "electric";
};

/**
 * CRITICAL: Keys must match code_name values from culturalCodes.ts exactly
 * This is the ONLY place where archetype display names are defined
 *
 * Architecture:
 * - Keys = internal code_name (lowercase, engine-facing)
 * - label = mythical archetype (user-facing)
 * - essence = archetype_essence (user-facing tagline)
 * - description = user-friendly explanation
 * - icon = symbolic identifier (legacy / abstract)
 * - emblem = image filename slug in /public/emblems
 * - tone = emotional category
 */

export const CODE_DISPLAY_MAP = {
  khoisan: {
    label: "Earthlistener",
    essence: "Presence • attunement • environmental intelligence",
    description: "You're deeply grounded and perceptive. You notice patterns others miss and move with natural rhythm.",
    icon: "spiral-stone",
    emblem: "EARTHLISTENER.jpeg",
    tone: "mystic",
  },

  kayori: {
    label: "Fireweaver",
    essence: "Expression • emotional transmission • collective rhythm",
    description: "You're expressive and communal. Your energy connects people and brings shared meaning to life.",
    icon: "ember-drum",
    emblem: "FIREWEAVER.jpeg",
    tone: "electric",
  },

  sahen: {
    label: "HorizonWalker",
    essence: "Endurance • solitude • internal strength",
    description: "You're quietly resilient and inwardly strong. You're comfortable with solitude and long horizons.",
    icon: "distant-sun",
    emblem: "HORIZONWALKER.jpeg",
    tone: "calm",
  },

  enzuka: {
    label: "Shieldbearer",
    essence: "Protective leadership • order • responsibility",
    description: "You lead through strength and clarity. You create safety and structure for those around you.",
    icon: "iron-circle",
    emblem: "SHIELDBEARER.jpeg",
    tone: "bold",
  },

  siyuane: {
    label: "Kitsune",
    essence: "Precision • mastery • quiet excellence",
    description: "You're disciplined and precise. You value mastery, structure, and long-term progress over shortcuts.",
    icon: "folded-blade",
    emblem: "kitsune",
    tone: "calm",
  },

  jaejin: {
    label: "Harmonist",
    essence: "Order • respect • social equilibrium",
    description: "You're respectful and socially attuned. You balance hierarchy with care for harmony.",
    icon: "balanced-knot",
    emblem: "HARMONIST.jpeg",
    tone: "warm",
  },

  namsea: {
    label: "Flowbinder",
    essence: "Adaptation • relational balance • fluid intelligence",
    description: "You're fluid and adaptable. You move with change rather than against it, finding balance naturally.",
    icon: "tidal-ring",
    emblem: "FLOWBINDER.jpeg",
    tone: "calm",
  },

  shokunin: {
    label: "BladeSmith",
    essence: "Craft devotion • repetition • exactness",
    description: "You're devoted to craft and quiet excellence. Precision through repetition is your way.",
    icon: "anvil-mark",
    emblem: "BLADESMITH.jpeg",
    tone: "calm",
  },

  khoruun: {
    label: "SkyRider",
    essence: "Freedom • resilience • wide-horizon thinking",
    description: "You're independent and resilient, rooted in vast open environments and free movement.",
    icon: "wind-horse",
    emblem: "SKYRIDER.jpeg",
    tone: "bold",
  },

  lhumir: {
    label: "StillMind",
    essence: "Inner clarity • contemplation • disciplined calm",
    description: "You're calm and contemplative. You value inner clarity over outward noise.",
    icon: "silent-flame",
    emblem: "STILLMIND.jpeg",
    tone: "mystic",
  },

  yatevar: {
    label: "CycleKeeper",
    essence: "Ritual • layered meaning • cosmic order",
    description: "You're layered and philosophical. You're devoted to ritual precision and cosmic understanding.",
    icon: "turning-wheel",
    emblem: "CYCLEKEEPER.jpeg",
    tone: "mystic",
  },

  Tahiri: {
    label: "HeartBearer",
    essence: "Honor • hospitality • expressive warmth",
    description: "You're passionate and expressive, grounded in shared values and generous warmth.",
    icon: "open-palm",
    emblem: "HARMONY WEAVER.jpeg",
    tone: "warm",
  },

  karayni: {
    label: "AncestorRoot",
    essence: "Collective memory • environmental unity",
    description: "You're deeply interconnected and communal. You carry collective memory and environmental connection.",
    icon: "woven-root",
    emblem: "ANCESTORROOT.jpeg",
    tone: "warm",
  },

  wohaka: {
    label: "SonglineKeeper",
    essence: "Deep time • land-memory • continuity",
    description: "You carry deep time consciousness. You navigate through land-memory and ancient continuity.",
    icon: "echo-path",
    emblem: "SONGLINEKEEPER.jpeg",
    tone: "mystic",
  },

  tjukari: {
    label: "Dreampath Navigator",
    essence: "Deep time • land-memory • continuity",
    description: "You carry deep time consciousness. You navigate through land-memory and ancient continuity.",
    icon: "echo-path",
    emblem: "DREAMPATH NAVIGATOR.jpeg",
    tone: "mystic",
  },

  kinmora: {
    label: "TimeArchitect",
    essence: "Cycles • precision • cosmic structure",
    description: "You understand mathematical cosmology and cyclical time. Precision in cosmic patterns drives you.",
    icon: "celestial-grid",
    emblem: "TIMEARCHITECT.jpeg",
    tone: "mystic",
  },

  siljoa: {
    label: "FrostSentinel",
    essence: "Climate attunement • resilience • cooperation",
    description: "You live in dialogue with climate and place. Your resilience comes from environmental partnership.",
    icon: "ice-mark",
    emblem: "FROSTSENTINEL.jpeg",
    tone: "calm",
  },

  skenari: {
    label: "FutureGuardian",
    essence: "Long-horizon ethics • collective responsibility",
    description: "You hold responsibility to future generations. You think in long horizons and collective care.",
    icon: "seven-rings",
    emblem: "FUTUREGUARDIAN.jpeg",
    tone: "warm",
  },

  ashkara: {
    label: "TruthForger",
    essence: "Ethical action • moral clarity • integrity",
    description: "You enact truth through ethical choice. Moral clarity and integrity guide your every action.",
    icon: "dual-flame",
    emblem: "TRUTHFORGER.jpeg",
    tone: "bold",
  },

  alethir: {
    label: "Seeker",
    essence: "Inquiry • reason • pursuit of truth",
    description: "Truth emerges through inquiry and dialogue for you. You pursue understanding through reasoning.",
    icon: "open-eye",
    emblem: "SEEKER.jpeg",
    tone: "mystic",
  },
} as const;

/**
 * Type-safe accessor
 */
export function getCodeDisplay(codeName: string): CodeDisplay | undefined {
  return CODE_DISPLAY_MAP[codeName as keyof typeof CODE_DISPLAY_MAP];
}

export function getArchetypeLabel(codeName: string): string {
  return getCodeDisplay(codeName)?.label || codeName;
}

export function getAllDisplayCodeNames(): string[] {
  return Object.keys(CODE_DISPLAY_MAP);
}
