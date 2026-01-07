// lib/codeDisplayMap.ts

export type CodeDisplay = {
  label: string;
  essence: string;
  description: string;
  icon: string;
  tone: "calm" | "bold" | "warm" | "mystic" | "electric";
};

/**
 * IMPORTANT:
 * - No imports
 * - No dependency on ./types
 * - Keys are inferred automatically
 * - Engine-safe, UI-only
 */

export const CODE_DISPLAY_MAP = {
  Shokunin: {
    label: "Kitsune",
    essence: "Precision • mastery • quiet excellence",
    description: "You refine instead of rushing. Craft speaks louder than noise.",
    icon: "kitsune",
    tone: "calm",
  },

  Ubuntu: {
    label: "Hearthbear",
    essence: "Belonging • care • shared strength",
    description: "You create safety through presence. People feel held around you.",
    icon: "hearthbear",
    tone: "warm",
  },

  Han: {
    label: "Moonwolf",
    essence: "Depth • endurance • quiet longing",
    description: "You carry emotional weight without breaking under it.",
    icon: "moonwolf",
    tone: "mystic",
  },

  Hygge: {
    label: "Snowhare",
    essence: "Comfort • softness • emotional warmth",
    description: "You seek gentle joy and small sanctuaries in everyday life.",
    icon: "snowhare",
    tone: "warm",
  },

  Lagom: {
    label: "StoneDeer",
    essence: "Balance • restraint • grounded clarity",
    description: "You know when enough is enough — and stop there.",
    icon: "stonedeer",
    tone: "calm",
  },

  Sisu: {
    label: "IronOx",
    essence: "Resilience • grit • unshakeable will",
    description: "You endure when others quit. Strength lives quietly in you.",
    icon: "ironox",
    tone: "bold",
  },

  JoieDeVivre: {
    label: "Sunfox",
    essence: "Joy • expression • aliveness",
    description: "Your energy lifts rooms. You remind people how to feel alive.",
    icon: "sunfox",
    tone: "electric",
  },

  PuraVida: {
    label: "WaveOtter",
    essence: "Ease • presence • natural flow",
    description: "You move with life instead of forcing it.",
    icon: "waveotter",
    tone: "calm",
  },

  Samba: {
    label: "FireMacaw",
    essence: "Rhythm • vitality • emotional release",
    description: "You express through movement, color, and feeling.",
    icon: "firemacaw",
    tone: "electric",
  },

  Flamenco: {
    label: "EmberStag",
    essence: "Intensity • pride • emotional power",
    description: "You feel deeply and express boldly. Your presence commands space.",
    icon: "emberstag",
    tone: "bold",
  },

  Tarab: {
    label: "EchoNightingale",
    essence: "Transcendence • resonance • emotional immersion",
    description: "You dissolve into moments that move the soul.",
    icon: "echonightingale",
    tone: "mystic",
  },

  Meraki: {
    label: "GoldenSpider",
    essence: "Devotion • soulful creation • care",
    description: "You pour yourself into what you make.",
    icon: "goldenspider",
    tone: "calm",
  },

  WabiSabi: {
    label: "MossTurtle",
    essence: "Acceptance • imperfection • quiet wisdom",
    description: "You see beauty where others see flaws.",
    icon: "mossturtle",
    tone: "mystic",
  },

  Gemuetlichkeit: {
    label: "OakBadger",
    essence: "Stability • familiarity • grounded warmth",
    description: "You value roots, rituals, and steady connection.",
    icon: "oakbadger",
    tone: "warm",
  },

  Bazaar: {
    label: "CrowMerchant",
    essence: "Adaptability • curiosity • exchange",
    description: "You thrive in movement, ideas, and shared energy.",
    icon: "crowmerchant",
    tone: "electric",
  },

  Vikingur: {
    label: "StormRaven",
    essence: "Exploration • courage • defiant freedom",
    description: "You are driven by horizons, not comfort.",
    icon: "stormraven",
    tone: "bold",
  },

  Piazza: {
    label: "MarbleLion",
    essence: "Presence • influence • civic confidence",
    description: "You thrive in shared spaces where ideas collide.",
    icon: "marblelion",
    tone: "bold",
  },

  MbukiMvuki: {
    label: "ThunderMonkey",
    essence: "Play • disruption • liberating joy",
    description: "You break seriousness and reset the room.",
    icon: "thundermonkey",
    tone: "electric",
  },

  Dadirri: {
    label: "StillHeron",
    essence: "Deep listening • patience • inner quiet",
    description: "You listen beneath words. Silence is your strength.",
    icon: "stillheron",
    tone: "calm",
  },

  CaPhe: {
    label: "DawnSparrow",
    essence: "Pause • reflection • gentle ritual",
    description: "You create meaning through small intentional moments.",
    icon: "dawnsparrow",
    tone: "calm",
  },
} as const;
