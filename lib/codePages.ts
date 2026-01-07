/**
 * CODE PAGES
 *
 * PURPOSE:
 * - Long-form narrative + meaning layer for each Cultural Code
 * - Used ONLY for display (results pages, deep dives)
 * - Does NOT affect scoring, matching, or traits
 *
 * DESIGN PRINCIPLES:
 * - No ancestry claims
 * - No moral framing (good/bad)
 * - Language = reflective, grounded, human
 * - Identity = operating style, not culture
 */

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
   CODE PAGES (CANONICAL)
====================================================== */

export const CODE_PAGES: Record<string, CodePage> = {
  Shokunin: {
    codeName: "Shokunin",
    headline: "The Path of Quiet Mastery",
    subheadline: "You are wired for depth, precision, and long-term excellence.",
    essence:
      "Shokunin represents an operating style centered on craft, discipline, and refinement. You are not driven by speed or recognition, but by the internal satisfaction of doing something properly. Your nervous system calms when standards are clear and quality is respected.",

    sections: [
      {
        title: "How You Move Through the World",
        content: [
          "You tend to approach life the way a craftsperson approaches their work: patiently, deliberately, and with care.",
          "You notice details others miss, and you feel unsettled when things are rushed or sloppy.",
          "Progress for you is not about quick wins, but about steady accumulation of skill and clarity."
        ]
      },
      {
        title: "What Energizes You",
        content: [
          "Deep focus and uninterrupted time.",
          "Clear systems where effort directly translates into improvement.",
          "Environments that reward consistency rather than urgency."
        ]
      },
      {
        title: "What Drains You",
        content: [
          "Chaotic environments with constant last-minute changes.",
          "Being forced to prioritize speed over quality.",
          "Work cultures that dismiss care as perfectionism."
        ]
      },
      {
        title: "Growth Path",
        content: [
          "Your growth accelerates when you protect your focus and choose fewer, higher-quality commitments.",
          "Learning to release work when it is *good enough* — without abandoning standards — prevents burnout.",
          "Teaching or mentoring others can deepen your own mastery."
        ]
      }
    ],

    tensions: {
      strengths: [
        "Exceptional attention to detail",
        "High internal standards",
        "Strong sense of personal responsibility",
        "Ability to master complex systems"
      ],
      challenges: [
        "Overworking in pursuit of excellence",
        "Difficulty operating in chaotic environments",
        "Being misunderstood as slow or rigid",
        "Reluctance to delegate"
      ]
    },

    reflectionPrompts: [
      "Where in your life does quality matter more than speed?",
      "What would it look like to protect your focus more intentionally?",
      "Are your standards serving you — or exhausting you?"
    ]
  },

  Renara: {
    codeName: "Renara",
    headline: "The Art of Balance",
    subheadline: "You create stability through harmony, not force.",
    essence:
      "Renara reflects an operating style focused on balance, relational awareness, and emotional intelligence. You are sensitive to atmosphere, tone, and group dynamics. Rather than dominating systems, you soften them — creating flow where others create friction.",

    sections: [
      {
        title: "How You Move Through the World",
        content: [
          "You instinctively sense imbalance — in rooms, conversations, and systems.",
          "You often act as a quiet stabilizer, smoothing tension before it escalates.",
          "Your influence is subtle, but deeply felt."
        ]
      },
      {
        title: "What Energizes You",
        content: [
          "Calm, aesthetically pleasing environments.",
          "Predictable rhythms and respectful interactions.",
          "Spaces where cooperation is valued over competition."
        ]
      },
      {
        title: "What Drains You",
        content: [
          "Aggressive conflict and constant confrontation.",
          "Chaotic systems with unclear boundaries.",
          "Being forced to choose sides in unnecessary tension."
        ]
      },
      {
        title: "Growth Path",
        content: [
          "Your growth deepens when you learn to set firmer boundaries without abandoning kindness.",
          "Expressing needs early prevents quiet resentment.",
          "You are most effective when balance includes yourself, not just others."
        ]
      }
    ],

    tensions: {
      strengths: [
        "Strong emotional awareness",
        "Ability to reduce conflict",
        "Consistency and reliability",
        "High relational intelligence"
      ],
      challenges: [
        "Avoiding necessary confrontation",
        "Over-accommodating others",
        "Suppressing personal desires for harmony",
        "Difficulty thriving in aggressive environments"
      ]
    },

    reflectionPrompts: [
      "Where are you maintaining harmony at your own expense?",
      "What boundaries would create more balance in your life?",
      "How do you recharge when emotional energy runs low?"
    ]
  }
}

/* ======================================================
   HELPERS
====================================================== */

export function getCodePage(codeName: string): CodePage | null {
  return CODE_PAGES[codeName] ?? null
}

export function getAllCodePages(): CodePage[] {
  return Object.values(CODE_PAGES)
}
