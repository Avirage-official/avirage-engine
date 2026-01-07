// lib/codeDisplayMap.ts

import { CulturalCodeKey } from "./types";

export type CodeDisplay = {
  label: string;        // Mythical / symbolic name shown to users
  essence: string;      // Short identity truth
  description: string; // Human-readable explanation
  icon: string;         // icon / svg / asset key
  tone: "calm" | "bold" | "warm" | "mystic" | "electric";
};

export const CODE_DISPLAY_MAP: Record<CulturalCodeKey, CodeDisplay> = {
  Shokunin: {
    label: "Kitsune",
    essence: "Precision • mastery • quiet excellence",
    description:
      "You refine instead of rushing. You believe craft speaks louder than attention.",
    icon: "kitsune",
    tone: "calm",
  },

  Ubuntu: {
    label: "Hearthbear",
    essence: "Belonging • care • shared strength",
    description:
      "You create safety through presence. People feel held around you.",
    icon: "hearthbear",
    tone: "warm",
  },

  Han: {
    label: "Moonwolf",
    essence: "Depth • endurance • quiet longing",
    description:
      "You carry emotional depth without collapsing under it. You endure.",
    icon: "moonwolf",
    tone: "mystic",
  },

  Hygge: {
    label: "Snowhare",
    essence: "Comfort • softness • emotional warmth",
    description:
      "You seek gentle joy and small sanctuaries in an overwhelming world.",
    icon: "snowhare",
    tone: "warm",
  },

  Lagom: {
    label: "StoneDeer",
    essence: "Balance • restraint • grounded clarity",
    description:
      "You instinctively know when enough is enough — and stop there.",
    icon: "stonedeer",
    tone: "calm",
  },

  Sisu: {
    label: "IronOx",
    essence: "Resilience • grit • unshakeable will",
    description:
      "You keep going long after others stop. Strength lives quietly in you.",
    icon: "ironox",
    tone: "bold",
  },

  JoieDeVivre: {
    label: "Sunfox",
    essence: "Joy • expression • aliveness",
    description:
      "You bring lightness into heavy spaces. Your energy lifts others.",
    icon: "sunfox",
    tone: "electric",
  },

  PuraVida: {
    label: "WaveOtter",
    essence: "Ease • presence • natural flow",
    description:
      "You move with life instead of against it. You trust the current.",
    icon: "waveotter",
    tone: "calm",
  },

  Samba: {
    label: "FireMacaw",
    essence: "Rhythm • vitality • emotional release",
    description:
      "You express through movement and feeling. Life is meant to be felt.",
    icon: "firemacaw",
    tone: "electric",
  },

  Flamenco: {
    label: "EmberStag",
    essence: "Intensity • pride • emotional power",
    description:
      "You feel deeply and express boldly. Your presence commands respect.",
    icon: "emberstag",
    tone: "bold",
  },

  Tarab: {
    label: "EchoNightingale",
    essence: "Transcendence • emotion • resonance",
    description:
      "You lose yourself in moments that move the soul beyond words.",
    icon: "echonightingale",
    tone: "mystic",
  },

  Meraki: {
    label: "GoldenSpider",
    essence: "Soulful creation • devotion • care",
    description:
      "You pour yourself into what you create. Your work carries you.",
    icon: "goldenspider",
    tone: "calm",
  },

  WabiSabi: {
    label: "MossTurtle",
    essence: "Acceptance • imperfection • quiet wisdom",
    description:
      "You see beauty where others see flaws. You move slowly and deeply.",
    icon: "mossturtle",
    tone: "mystic",
  },

  Gemuetlichkeit: {
    label: "OakBadger",
    essence: "Stability • familiarity • grounded warmth",
    description:
      "You value roots, rituals, and steady connection over novelty.",
    icon: "oakbadger",
    tone: "warm",
  },

  Bazaar: {
    label: "CrowMerchant",
    essence: "Adaptability • curiosity • exchange",
    description:
      "You thrive in movement, ideas, and the trade of perspectives.",
    icon: "crowmerchant",
    tone: "electric",
  },

  Vikingur: {
    label: "StormRaven",
    essence: "Exploration • courage • defiant freedom",
    description:
      "You are driven by horizons. Comfort has never been your goal.",
    icon: "stormraven",
    tone: "bold",
  },

  Piazza: {
    label: "MarbleLion",
    essence: "Presence • influence • civic confidence",
    description:
      "You thrive in shared spaces where ideas and people meet.",
    icon: "marblelion",
    tone: "bold",
  },

  MbukiMvuki: {
    label: "ThunderMonkey",
    essence: "Play • chaos • liberating joy",
    description:
      "You disrupt seriousness and remind others to breathe and laugh.",
    icon: "thundermonkey",
    tone: "electric",
  },

  Dadirri: {
    label: "StillHeron",
    essence: "Deep listening • patience • inner quiet",
    description:
      "You listen beneath words. Silence is where you understand most.",
    icon: "stillheron",
    tone: "calm",
  },

  CaPhe: {
    label: "DawnSparrow",
    essence: "Reflection • pause • gentle ritual",
    description:
      "You create meaning through small moments of intentional pause.",
    icon: "dawnsparrow",
    tone: "calm",
  },
};
