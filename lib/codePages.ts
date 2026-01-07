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

export interface CodePageSection {
  title: string;
  content: string[];
}

export interface CodePage {
  codeName: string;

  // REQUIRED by UI
  lens: CodeLens;
  traits: CodeTraitsBlock;

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
      description:
        "Precision, patience, and craft-first thinking.",
      inPlainEnglish: [
        "You care more about quality than speed.",
        "You notice details other people miss.",
        "You work best with focus and clear standards.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        {
          label: "Craft-Driven",
          meaning: "You’re motivated by mastery and refinement, not shortcuts.",
        },
        {
          label: "Detail-Oriented",
          meaning: "You naturally see imperfections and want to improve them.",
        },
        {
          label: "Focused",
          meaning: "You do your best work with uninterrupted time and clarity.",
        },
      ],
    },

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
          "You respect systems that reward patience.",
        ],
      },
      {
        title: "What Energizes You",
        content: [
          "Clear quality standards.",
          "Time for deep focus.",
          "Tools and environments built for craft.",
        ],
      },
      {
        title: "What Drains You",
        content: [
          "Speed-first cultures.",
          "Constant context switching.",
          "Being rushed into sloppy output.",
        ],
      },
    ],

    tensions: {
      strengths: [
        "Exceptional focus",
        "High standards",
        "Reliable execution",
      ],
      challenges: [
        "Overworking",
        "Difficulty delegating",
        "Stress in chaotic systems",
      ],
    },

    reflectionPrompts: [
      "Where does quality matter most in your life?",
      "What deserves your full attention right now?",
    ],
  },

  Renara: {
    codeName: "Renara",

    lens: {
      title: "Balance & Harmony",
      description:
        "Stability through calm awareness and soft power.",
      inPlainEnglish: [
        "You feel tension quickly.",
        "You smooth conflict naturally.",
        "You thrive in calm environments.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        {
          label: "Emotionally Aware",
          meaning: "You sense atmosphere and emotional shifts early.",
        },
        {
          label: "Stabilizing",
          meaning: "You reduce friction and bring people back to center.",
        },
        {
          label: "Relational",
          meaning: "You value cooperation over dominance.",
        },
      ],
    },

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
      {
        title: "What Energizes You",
        content: [
          "Calm spaces.",
          "Respectful relationships.",
        ],
      },
      {
        title: "What Drains You",
        content: [
          "Aggressive conflict.",
          "Chaotic systems.",
        ],
      },
    ],

    tensions: {
      strengths: [
        "Emotional intelligence",
        "Conflict reduction",
        "Relational awareness",
      ],
      challenges: [
        "Avoiding confrontation",
        "Over-accommodation",
      ],
    },

    reflectionPrompts: [
      "Where are you maintaining balance at a cost?",
      "What boundary would restore harmony?",
    ],
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
