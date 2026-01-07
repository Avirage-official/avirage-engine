/**
 * CODE PAGES
 *
 * Narrative + meaning layer for each Cultural Code.
 * Used ONLY for display.
 * Does NOT affect scoring or matching.
 */

export type CodeSlug = string

export interface CodePageSection {
  title: string
  content: string[]
}

export interface CodePage {
  codeName: string
  headline: string
  subheadline: string
  essence: string
  sections: CodePageSection[]
  tensions: {
    strengths: string[]
    challenges: string[]
  }
  reflectionPrompts: string[]
}

/* ======================================================
   CODE PAGES (CANONICAL CONTENT)
====================================================== */

export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  Shokunin: {
    codeName: "Shokunin",
    headline: "The Path of Quiet Mastery",
    subheadline: "Depth over speed. Precision over noise.",
    essence:
      "You are wired for craft, focus, and refinement. Progress comes through consistency and care, not urgency.",
    sections: [
      {
        title: "How You Move",
        content: [
          "You prefer depth over breadth.",
          "You notice flaws others ignore.",
          "You value systems that reward patience."
        ]
      }
    ],
    tensions: {
      strengths: [
        "Exceptional focus",
        "High standards",
        "Mastery-driven"
      ],
      challenges: [
        "Overworking",
        "Difficulty delegating",
        "Struggles in chaotic systems"
      ]
    },
    reflectionPrompts: [
      "Where does quality matter most in your life?",
      "What deserves your full attention?"
    ]
  },

  Renara: {
    codeName: "Renara",
    headline: "The Art of Balance",
    subheadline: "Stability through harmony.",
    essence:
      "You stabilize systems by sensing imbalance early and softening tension before it escalates.",
    sections: [
      {
        title: "How You Move",
        content: [
          "You sense emotional undercurrents.",
          "You prioritize harmony over dominance."
        ]
      }
    ],
    tensions: {
      strengths: [
        "Emotional intelligence",
        "Conflict reduction",
        "Relational awareness"
      ],
      challenges: [
        "Avoiding confrontation",
        "Over-accommodation"
      ]
    },
    reflectionPrompts: [
      "Where are you maintaining balance at a cost?",
      "What boundaries restore harmony?"
    ]
  }
}

/* ======================================================
   SLUG HELPERS (REQUIRED BY UI)
====================================================== */

export const CODE_SLUGS = Object.keys(CODE_PAGES) as CodeSlug[]

export function isCodeSlug(value: string): value is CodeSlug {
  return value in CODE_PAGES
}

export function getCodePage(slug: CodeSlug): CodePage {
  return CODE_PAGES[slug]
}

export function getAllCodePages(): CodePage[] {
  return Object.values(CODE_PAGES)
}
