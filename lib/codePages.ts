/**
 * CODE PAGES
 *
 * Narrative + meaning layer for each Cultural Code.
 * Used ONLY for display.
 * Does NOT affect scoring or matching.
 */

export type CodeSlug = string;

export interface CodeLens {
  title: string;
  description: string;
  inPlainEnglish: string[];
}

export interface CodePageSection {
  title: string;
  content: string[];
}

export interface CodePage {
  codeName: string;

  // Required by CodePageClient.tsx
  lens: CodeLens;

  // Longform
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

/* ======================================================
   CODE PAGES (CANONICAL CONTENT)
   NOTE: keep keys = slugs used in routes
====================================================== */

export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  Shokunin: {
    codeName: "Shokunin",

    lens: {
      title: "Quiet Mastery",
      description:
        "Precision, patience, and craft-first thinking. You get sharp through repetition and care.",
      inPlainEnglish: [
        "You care about quality more than speed.",
        "You notice details other people miss.",
        "You feel best when you have focus and clear standards.",
      ],
    },

    headline: "The Path of Quiet Mastery",
    subheadline: "Depth over speed. Precision over noise.",
    essence:
      "You’re wired for craft, focus, and refinement. Progress comes through consistency and care, not urgency. When standards are clear and time is protected, your output becomes exceptional.",

    sections: [
      {
        title: "How You Move",
        content: [
          "You prefer depth over breadth.",
          "You naturally refine things until they feel correct.",
          "You respect systems that reward patience and competence.",
        ],
      },
      {
        title: "What Energizes You",
        content: [
          "Clear quality standards and a calm rhythm.",
          "Time blocks where you can go deep without interruptions.",
          "Tools, environments, and teams that respect craft.",
        ],
      },
      {
        title: "What Drains You",
        content: [
          "Speed-first cultures that force shortcuts.",
          "Constant context switching and last-minute changes.",
          "Being pressured to ship work you wouldn’t sign your name to.",
        ],
      },
    ],

    tensions: {
      strengths: ["Exceptional focus", "High standards", "Mastery-driven", "Reliable execution"],
      challenges: ["Overworking", "Difficulty delegating", "Stress in chaotic systems", "Taking on too much alone"],
    },

    reflectionPrompts: [
      "Where does quality matter most in your life right now?",
      "What deserves your full attention — and what doesn’t?",
      "Are your standards serving you… or exhausting you?",
    ],
  },

  Renara: {
    codeName: "Renara",

    lens: {
      title: "Balance & Harmony",
      description:
        "You stabilize people and environments through calm, relational intelligence, and soft power.",
      inPlainEnglish: [
        "You can feel tension in a room fast.",
        "You naturally smooth conflict and create flow.",
        "You thrive in calm, respectful environments.",
      ],
    },

    headline: "The Art of Balance",
    subheadline: "Stability through harmony.",
    essence:
      "You stabilize systems by sensing imbalance early and softening friction before it escalates. Your strength is creating flow: emotionally, socially, and structurally — without needing to dominate.",

    sections: [
      {
        title: "How You Move",
        content: [
          "You sense atmosphere and emotional tone quickly.",
          "You prefer cooperation over competition.",
          "You influence through steadiness, not force.",
        ],
      },
      {
        title: "What Energizes You",
        content: [
          "Calm spaces with beauty and breathing room.",
          "Relationships with mutual respect and clean boundaries.",
          "Work where smooth operations and harmony matter.",
        ],
      },
      {
        title: "What Drains You",
        content: [
          "Aggressive conflict and constant confrontation.",
          "Chaotic systems with unclear rules.",
          "Carrying everyone’s emotional load without boundaries.",
        ],
      },
    ],

    tensions: {
      strengths: ["Emotional intelligence", "Conflict reduction", "Relational awareness", "Stability-building"],
      challenges: ["Avoiding necessary confrontation", "Over-accommodation", "Quiet resentment", "Delayed self-advocacy"],
    },

    reflectionPrompts: [
      "Where are you maintaining harmony at your own expense?",
      "What boundary would instantly restore balance?",
      "What does ‘peace’ look like when it includes you too?",
    ],
  },
};

/* ======================================================
   SLUG HELPERS (REQUIRED BY UI)
====================================================== */

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
