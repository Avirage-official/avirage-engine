/**
 * lib/codePages.ts
 *
 * CONTRACT-LOCKED to:
 * - app/codepages/[slug]/CodePageClient.tsx
 * - app/codepages/[slug]/page.tsx
 *
 * Display-only. Does NOT affect scoring / algorithms.
 */

export type CodeSlug = string;

export interface CodeOrigin {
  level1: string;
  lineage: string[];
}

export interface CodeLens {
  title: string;
  description: string;
  inPlainEnglish: string[];
}

export interface CodeTraitHighlight {
  label: string;
  meaning: string;
}

export interface CodeTraits {
  headline: string;
  highlights: CodeTraitHighlight[];
}

export interface CodeRecommendations {
  lifestyle: string[];
  places: string[];
  music: string[];
  activities: string[];
}

export interface CodePage {
  codeName: string;
  fullName: string; // ✅ required by /app/codepages/[slug]/page.tsx
  snapshot: string;

  origin: CodeOrigin;

  lens: CodeLens;
  traits: CodeTraits;
  recommendations: CodeRecommendations;

  strengths: string[];
  watchouts: string[];
  tryThisWeek: string[];

  notes?: string[];
}

export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  Shokunin: {
    codeName: "Shokunin",
    fullName: "Shokunin (The Craft Path)",
    snapshot:
      "You’re at your best when you can go deep, move with intention, and produce work that feels clean, precise, and worth your name.",

    origin: {
      level1: "Japanese",
      lineage: [
        "Craft devotion (mastery over shortcuts)",
        "Discipline through repetition",
        "Precision culture",
        "Quiet excellence (results speak)",
      ],
    },

    lens: {
      title: "Quiet Mastery",
      description: "Precision, patience, and craft-first thinking — depth over speed.",
      inPlainEnglish: [
        "You care more about quality than speed.",
        "You notice details other people miss.",
        "You work best with focus and clear standards.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Craft-driven", meaning: "You’re motivated by mastery and refinement, not shortcuts." },
        { label: "Detail-oriented", meaning: "You naturally spot what’s off and want to improve it." },
        { label: "Focused", meaning: "Deep work suits you better than rapid context-switching." },
        { label: "High standards", meaning: "You feel best when you can ship work you’d sign your name to." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build a calm daily rhythm with deep-focus blocks.",
        "Reduce noise: fewer commitments, higher quality.",
        "Create a ‘clean reset’ ritual after work (10–15 min).",
      ],
      places: [
        "Quiet, design-forward neighborhoods with a steady rhythm.",
        "Spaces with good light and fewer distractions (libraries, studios).",
        "Nature resets: parks, coastlines, slow mornings.",
      ],
      music: [
        "Instrumental focus (lo-fi, ambient, minimal).",
        "Clean-structure electronic or modern classical.",
        "Anything that feels precise rather than chaotic.",
      ],
      activities: [
        "Skill-based hobbies (cooking, photography, coding, design).",
        "Training with technique focus (lifting form, climbing, yoga alignment).",
        "Workshops where mastery compounds.",
      ],
    },

    strengths: [
      "Exceptional attention to detail",
      "Consistency and reliability",
      "Ability to master complex systems",
      "Strong sense of personal responsibility",
    ],

    watchouts: [
      "Overworking in pursuit of perfection",
      "Difficulty delegating",
      "Getting stuck refining when shipping would be enough",
      "Burnout in chaotic environments",
    ],

    tryThisWeek: [
      "Protect one uninterrupted deep-work block (60–90 mins).",
      "Ship one thing at ‘clean enough’ (not perfect).",
      "Declutter one workspace surface and keep it clean for 7 days.",
    ],

    notes: [
      "Display layer only — not an identity or ancestry claim.",
      "If it doesn’t resonate, adjust questions/weights; don’t force-fit.",
    ],
  },

  Renara: {
    codeName: "Renara",
    fullName: "Renara (Harmony Weaver)",
    snapshot:
      "You create stability by softening friction — you’re the person who makes environments feel calmer, smoother, and more livable.",

    origin: {
      level1: "Javanese",
      lineage: [
        "Harmony-first social rhythm",
        "Soft power influence (subtle, effective)",
        "Balance + restraint",
        "Community stability",
      ],
    },

    lens: {
      title: "Balance & Harmony",
      description: "Stability through calm awareness, emotional intelligence, and soft power.",
      inPlainEnglish: [
        "You feel tension quickly.",
        "You smooth conflict naturally.",
        "You thrive in calm, respectful environments.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Emotionally aware", meaning: "You read atmosphere and tone early." },
        { label: "Stabilizing", meaning: "You reduce friction and restore flow." },
        { label: "Relational", meaning: "You value cooperation over dominance." },
        { label: "Steady", meaning: "You help people and systems settle into balance." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Keep routines gentle and consistent.",
        "Choose stability over drama.",
        "Set boundaries early so harmony includes you too.",
      ],
      places: [
        "Calm, beautiful neighborhoods (parks, waterfronts, walkable areas).",
        "Spaces with respectful social rhythm (not chaotic nightlife).",
        "Cozy community hubs you can return to.",
      ],
      music: [
        "Warm, melodic, emotionally balanced music.",
        "Chill R&B, melodic house, soft soul.",
        "Anything smooth (not rage content energy).",
      ],
      activities: [
        "Yoga, walking, swimming (reset your baseline).",
        "Cooking, photography, design (beauty + flow).",
        "Small gatherings with low drama and consistency.",
      ],
    },

    strengths: ["Emotional intelligence", "Conflict reduction", "Relationship awareness", "Stability-building"],

    watchouts: [
      "Avoiding necessary confrontation",
      "Over-accommodating others",
      "Quiet resentment from delayed needs",
      "Staying too long in unbalanced environments",
    ],

    tryThisWeek: [
      "Say no once without over-explaining.",
      "Choose one boundary and communicate it early.",
      "Do one calm reset (walk, music, tidy) before sleep.",
    ],
  },
};

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
