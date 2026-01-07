/**
 * CODE PAGES
 *
 * Display-only content model.
 * This file is a SUPERSET of all UI expectations.
 * It does NOT affect scoring or algorithms.
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

  /* ---- UI blocks ---- */
  lens: CodeLens;
  traits: CodeTraitsBlock;
  recommendations: CodeRecommendationsBlock;

  strengths: string[];
  watchouts: string[];
  tryThisWeek: string[];

  /* ---- Narrative ---- */
  headline: string;
  subheadline: string;
  essence: string;
  sections: CodePageSection[];

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
        "You notice details others miss.",
        "You work best with focus and clear standards.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Craft-driven", meaning: "Motivated by mastery, not shortcuts." },
        { label: "Detail-oriented", meaning: "You naturally refine what others overlook." },
        { label: "Focused", meaning: "Deep work suits you better than rapid switching." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build a calm daily rhythm with deep-focus blocks.",
        "Reduce noise — fewer commitments, higher quality.",
      ],
      places: [
        "Quiet, design-forward neighborhoods.",
        "Workspaces that respect order and tools.",
      ],
      music: [
        "Instrumental, ambient, minimal electronic.",
      ],
      activities: [
        "Skill-based hobbies (craft, coding, cooking).",
        "Training that rewards technique over chaos.",
      ],
    },

    strengths: [
      "Exceptional attention to detail",
      "Consistency and reliability",
      "Ability to master complex systems",
    ],

    watchouts: [
      "Overworking in pursuit of perfection",
      "Difficulty delegating",
      "Burnout in chaotic environments",
    ],

    tryThisWeek: [
      "Protect one uninterrupted block of deep work.",
      "Ship something when it’s good enough — not perfect.",
      "Declutter one workspace.",
    ],

    headline: "The Path of Quiet Mastery",
    subheadline: "Depth over speed. Precision over noise.",
    essence:
      "You’re wired for craft, focus, and refinement. Progress comes through consistency and care, not urgency.",

    sections: [
      {
        title: "How You Move",
        content: [
          "You prefer depth over breadth.",
          "You refine until things feel correct.",
        ],
      },
      {
        title: "What Energizes You",
        content: [
          "Clear standards.",
          "Time for deep focus.",
          "Respect for quality.",
        ],
      },
    ],

    reflectionPrompts: [
      "Where does quality matter most right now?",
      "What deserves your full attention?",
    ],
  },

  Renara: {
    codeName: "Renara",

    lens: {
      title: "Balance & Harmony",
      description: "Stability through calm awareness and soft power.",
      inPlainEnglish: [
        "You sense tension quickly.",
        "You smooth conflict naturally.",
        "You thrive in calm environments.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Emotionally aware", meaning: "You read atmosphere and tone early." },
        { label: "Stabilizing", meaning: "You reduce friction and restore flow." },
        { label: "Relational", meaning: "You value cooperation over dominance." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Keep routines gentle and consistent.",
        "Choose stability over drama.",
      ],
      places: [
        "Calm, beautiful neighborhoods.",
        "Spaces with respectful social rhythm.",
      ],
      music: [
        "Warm, melodic, emotionally balanced music.",
      ],
      activities: [
        "Yoga, walking, swimming.",
        "Creative flow activities.",
      ],
    },

    strengths: [
      "Emotional intelligence",
      "Conflict reduction",
      "Relationship awareness",
    ],

    watchouts: [
      "Avoiding necessary confrontation",
      "Over-accommodating others",
    ],

    tryThisWeek: [
      "Say no once without explaining.",
      "Do one thing purely for calm.",
      "Set one clear boundary.",
    ],

    headline: "The Art of Balance",
    subheadline: "Stability through harmony.",
    essence:
      "You stabilize systems by sensing imbalance early and softening friction before it escalates.",

    sections: [
      {
        title: "How You Move",
        content: [
          "You sense emotional undercurrents.",
          "You prioritize cooperation.",
        ],
      },
    ],

    reflectionPrompts: [
      "Where are you maintaining balance at your expense?",
      "What boundary would restore harmony?",
    ],
  },
};

/* =========================
   HELPERS
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
