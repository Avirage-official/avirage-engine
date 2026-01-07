/**
 * CODE PAGES
 *
 * Display-only narrative + explanation layer.
 * Does NOT affect scoring, matching, or algorithms.
 */

export type CodeSlug = string;

/* =========================
   UI MODELS
========================= */

export interface CodeLens {
  title: string;
  description: string;
  inPlainEnglish: string[];
}

export interface CodeTraitHighlight {
  label: string;
  meaning: string;
}

export interface CodeTraitsBlock {
  headline: string;
  highlights: CodeTraitHighlight[];
}

export interface CodeRecommendationsBlock {
  lifestyle: string[];
  places: string[];
  music: string[];
  activities: string[];
}

export interface CodePageSection {
  title: string;
  content: string[];
}

export interface CodePage {
  codeName: string;

  // REQUIRED by UI
  lens: CodeLens;
  traits: CodeTraitsBlock;
  recommendations: CodeRecommendationsBlock;

  // Longform narrative
  headline: string;
  subheadline: string;
  essence: string;
  sections: CodePageSection[];
  tensions: {
    strengths: string[];
    challenges: string[];
  };
  reflectionPrompts: string[];
}

/* =========================
   CODE PAGES
========================= */

export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  Shokunin: {
    codeName: "Shokunin",

    lens: {
      title: "Quiet Mastery",
      description: "Precision, patience, and craft-first thinking.",
      inPlainEnglish: [
        "You care more about quality than speed.",
        "You notice details other people miss.",
        "You work best with focus and clear standards.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Craft-Driven", meaning: "Motivated by mastery and refinement, not shortcuts." },
        { label: "Detail-Oriented", meaning: "You naturally spot imperfections and want to improve them." },
        { label: "Focused", meaning: "You do your best work with uninterrupted time and clarity." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Create a calm daily rhythm (deep work blocks + clean resets).",
        "Own fewer things, but make them high quality.",
        "Choose environments that respect standards.",
        "Build routines that protect your attention.",
      ],
      places: [
        "Design-forward cities and craft neighborhoods.",
        "Quiet, walkable areas with predictable rhythm.",
        "Workspaces with tools and clean organization.",
        "Nature day-trips to reset your head.",
      ],
      music: [
        "Instrumental focus music (lo-fi, ambient, classical).",
        "Minimal electronic with clean structure.",
        "Anything that feels precise rather than chaotic.",
      ],
      activities: [
        "Skill-based hobbies: cooking, photography, design, coding.",
        "Strength training with form focus.",
        "Climbing / yoga (alignment).",
        "Workshop-style learning (hands-on mastery).",
      ],
    },

    headline: "The Path of Quiet Mastery",
    subheadline: "Depth over speed. Precision over noise.",
    essence:
      "You’re wired for craft, focus, and refinement. Progress comes through consistency and care, not urgency.",

    sections: [
      { title: "How You Move", content: ["You prefer depth over breadth.", "You refine until it feels correct."] },
      { title: "What Energizes You", content: ["Clear standards.", "Time for deep focus.", "Craft-friendly environments."] },
      { title: "What Drains You", content: ["Speed-first culture.", "Constant switching.", "Rushed output."] },
    ],

    tensions: {
      strengths: ["Exceptional focus", "High standards", "Reliable execution"],
      challenges: ["Overworking", "Delegation difficulty", "Stress in chaos"],
    },

    reflectionPrompts: ["Where does quality matter most right now?", "What deserves your full attention?"],
  },

  Renara: {
    codeName: "Renara",

    lens: {
      title: "Balance & Harmony",
      description: "Stability through calm awareness and soft power.",
      inPlainEnglish: [
        "You feel tension quickly.",
        "You smooth conflict naturally.",
        "You thrive in calm environments.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Emotionally Aware", meaning: "You sense atmosphere and tone early." },
        { label: "Stabilizing", meaning: "You reduce friction and restore balance." },
        { label: "Relational", meaning: "You value cooperation over dominance." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Keep your environment clean and calm (beauty regulates you).",
        "Prioritize stable relationships and clear boundaries.",
        "Choose consistency over drama.",
        "Reset often: walks, music, quiet rituals.",
      ],
      places: [
        "Calm, beautiful neighborhoods (parks, waterfronts, walkability).",
        "Spaces with respectful social rhythm.",
        "Cozy cafes and community hubs (not chaotic nightlife zones).",
      ],
      music: [
        "Warm soulful music, chill R&B, melodic house.",
        "Anything that feels smooth and emotionally balanced.",
      ],
      activities: [
        "Yoga, walking, swimming.",
        "Cooking, photography, design.",
        "Dance (flow + rhythm).",
        "Small community gatherings (low drama, consistent).",
      ],
    },

    headline: "The Art of Balance",
    subheadline: "Stability through harmony.",
    essence:
      "You stabilize systems by sensing imbalance early and softening friction before it escalates.",

    sections: [
      { title: "How You Move", content: ["You sense emotional undercurrents.", "You prioritize cooperation."] },
      { title: "What Energizes You", content: ["Calm spaces.", "Respectful relationships."] },
      { title: "What Drains You", content: ["Aggressive conflict.", "Chaotic systems."] },
    ],

    tensions: {
      strengths: ["Emotional intelligence", "Conflict reduction", "Relational awareness"],
      challenges: ["Avoiding confrontation", "Over-accommodation"],
    },

    reflectionPrompts: ["Where are you maintaining balance at a cost?", "What boundary restores harmony?"],
  },
};

/* =========================
   HELPERS (REQUIRED)
========================= */

export const CODE_SLUGS = Object.keys(CODE_PAGES) as CodeSlug[];

export function isCodeSlug(value: string): value is CodeSlug {
  return value in CODE_PAGES;
}

export function getCodePage(slug: CodeSlug): CodePage {
  return CODE_PAGES[slug];
}

export function getAllCodePages(): CodePage[] {
  return Object.values(CODE_PAGES);
}
