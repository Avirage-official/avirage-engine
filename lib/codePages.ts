// lib/codePages.ts
// Master content registry for Cultural Code (Lens) pages.
// Each "code page" is editorial content + assets (images) that explain the lens.

export type CodeSlug =
  | "khoisan"
  | "kayori"
  | "sahen"
  | "enzuka"
  | "siyuane"
  | "jaejin"
  | "namsea"
  | "shokunin"
  | "khoruun"
  | "lhumir"
  | "yatevar"
  | "renara"
  | "karayni"
  | "wohaka"
  | "tjukari"
  | "kinmora"
  | "siljoa"
  | "skenari"
  | "ashkara"
  | "alethir";

export type ImageAsset = {
  src: string; // path from /public, e.g. "/codepages/shokunin/hero.jpg"
  alt: string;
  caption?: string;
};

export type CodePageSection =
  | {
      type: "prose";
      title: string;
      body: string; // keep as plain text; you can render line breaks with \n\n
    }
  | {
      type: "bullets";
      title: string;
      bullets: string[];
    }
  | {
      type: "callout";
      title: string;
      tone?: "neutral" | "insight" | "warning";
      body: string;
    }
  | {
      type: "imageRow";
      title?: string;
      images: ImageAsset[];
    };

export type CodePage = {
  slug: CodeSlug;

  // Display
  codeName: string; // "Shokunin"
  fullName: string; // "Japanese"
  origin: string; // "Japan"
  tagline: string; // one-liner
  heroImage?: ImageAsset;

  // “Level 1 culture” educational framing
  level1Culture: {
    name: string; // e.g. "Japanese"
    note: string; // short: how level 1 relates to this lens
  };

  // Traits (optional, but useful to show “why”)
  traitHighlights: Array<{
    label: string; // e.g. "Craftsmanship drive"
    value: number; // 0-100
    note: string;  // one-liner interpretation
  }>;

  // Main narrative
  sections: CodePageSection[];

  // Light recommendations (kept careful + non-prescriptive)
  suggestedEcosystems: {
    places: string[];
    activities: string[];
    musicMood: string[];
    workStyles: string[];
  };

  // Asset convention note (for you / future scaling)
  assetsHint?: {
    folder: string; // e.g. "/public/codepages/shokunin/"
    recommendedFiles: string[]; // filenames you plan to add
  };
};

/**
 * Shokunin — fully written example
 * Keep it compact + “intellectual” without pretending it is deterministic science.
 */
const SHOKUNIN_PAGE: CodePage = {
  slug: "shokunin",
  codeName: "Shokunin",
  fullName: "Japanese",
  origin: "Japan",
  tagline: "Craft, discipline, and quiet excellence — a lens for building quality over time.",
  heroImage: {
    src: "/codepages/shokunin/hero.jpg",
    alt: "Shokunin lens — craftsmanship, order, and refined focus",
    caption: "Avirage lens page imagery is aesthetic, not diagnostic.",
  },

  level1Culture: {
    name: "Japanese (Level 1)",
    note:
      "This lens is inspired by long-running cultural patterns often associated with Japanese craft traditions and social harmony norms — translated into a modern behavioral archetype, not a statement about ethnicity or nationality.",
  },

  // These values match your culturalCodes.ts “Japanese / Shokunin” profile.
  traitHighlights: [
    { label: "Craftsmanship drive", value: 95, note: "Pride in doing things properly, repeatedly." },
    { label: "Detail orientation", value: 95, note: "Noticing small errors before they become big ones." },
    { label: "Structure preference", value: 95, note: "Clear systems reduce noise and raise quality." },
    { label: "Sensory appreciation", value: 95, note: "Refinement in feel, finish, and atmosphere." },
    { label: "Collaborative preference", value: 95, note: "Excellence is often achieved together." },
  ],

  sections: [
    {
      type: "prose",
      title: "What this lens means",
      body:
        "The Shokunin lens is about earning trust through precision. People who lean Shokunin tend to value quality, reliability, and refinement — not as perfectionism for its own sake, but as a way to reduce harm, create beauty, and respect time.\n\nIt often shows up as: clear standards, strong taste, careful execution, and a preference for environments that reward mastery.",
    },
    {
      type: "bullets",
      title: "Signature patterns you might recognize",
      bullets: [
        "You feel calmer when systems are clean: steps, checklists, rituals, routines.",
        "You’d rather build one great thing than ten rushed things.",
        "You can sense “off” details quickly (tone, layout, quality, timing).",
        "You prefer controlled novelty: improvement > chaos.",
      ],
    },
    {
      type: "prose",
      title: "Why it links to the culture (educational, not literal identity)",
      body:
        "Across many Japanese craft lineages, there’s a repeated emphasis on disciplined practice, continuity, and respect for tools, materials, and process. In everyday life, related ideas are often described as harmony (Wa), attention to form, and refinement under constraints.\n\nAvirage uses this as an archetypal tradition: the lens of “careful mastery” and “order that creates beauty.”",
    },
    {
      type: "callout",
      tone: "neutral",
      title: "Trust note",
      body:
        "This is not a clinical assessment. It’s a structured interpretation of your quiz patterns. Use it as a mirror and a vocabulary — not a cage.",
    },
    {
      type: "imageRow",
      title: "Visual mood",
      images: [
        { src: "/codepages/shokunin/gallery-1.jpg", alt: "Refined workspace aesthetic" },
        { src: "/codepages/shokunin/gallery-2.jpg", alt: "Craft detail / texture aesthetic" },
      ],
    },
    {
      type: "bullets",
      title: "What helps you thrive",
      bullets: [
        "Clear standards and authority: you do best when “good” is defined.",
        "Time to iterate: you improve things through cycles, not one-shot bursts.",
        "Respect-based teams: you don’t need loud culture — you need competent culture.",
      ],
    },
    {
      type: "bullets",
      title: "Common friction points",
      bullets: [
        "Messy environments can feel physically draining.",
        "If quality is constantly sacrificed, motivation drops fast.",
        "You may carry stress silently — performance looks fine, but the inside feels tense.",
      ],
    },
  ],

  suggestedEcosystems: {
    places: [
      "Quiet cafes with intentional design",
      "Museums, galleries, design bookstores",
      "Minimal, well-curated spaces (good lighting, good sound, low clutter)",
    ],
    activities: [
      "Craft learning (ceramics, cooking technique, typography, photography, woodworking)",
      "Skill journaling / deliberate practice routines",
      "Slow improvement hobbies (tea, espresso, calligraphy-style practice, language study)",
    ],
    musicMood: [
      "Minimal / ambient focus music",
      "Instrumental jazz / lo-fi that supports concentration",
      "Soundtracks with clean structure (for deep work)",
    ],
    workStyles: [
      "Quality-first roles: craft, design, engineering, operations excellence",
      "Process ownership: systems, documentation, QA, product polish",
      "Small teams with high standards and stable cadence",
    ],
  },

  assetsHint: {
    folder: "/public/codepages/shokunin/",
    recommendedFiles: ["hero.jpg", "gallery-1.jpg", "gallery-2.jpg"],
  },
};

/**
 * Stubs for the other 19 (valid but empty-ish).
 * You’ll fill these one by one like we did for Shokunin.
 */
function stub(slug: CodeSlug, codeName: string, fullName: string, origin: string): CodePage {
  return {
    slug,
    codeName,
    fullName,
    origin,
    tagline: "Page coming soon.",
    level1Culture: {
      name: fullName,
      note: "Stub. Add educational lens explanation here.",
    },
    traitHighlights: [],
    sections: [
      { type: "prose", title: "Overview", body: "Stub content." },
    ],
    suggestedEcosystems: { places: [], activities: [], musicMood: [], workStyles: [] },
    assetsHint: { folder: `/public/codepages/${slug}/`, recommendedFiles: ["hero.jpg"] },
  };
}

export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  khoisan: stub("khoisan", "Khoisan", "San/Khoisan", "Southern Africa"),
  kayori: stub("kayori", "Kayori", "Yoruba", "West Africa"),
  sahen: stub("sahen", "Sahen", "Tuareg", "Sahara Desert"),
  enzuka: stub("enzuka", "Enzuka", "Maasai + Zulu Fusion", "East Africa"),
  siyuane: stub("siyuane", "Siyuane", "Ethiopian + Han Chinese Fusion", "Highland Ethiopia + Ancient China"),
  jaejin: stub("jaejin", "Jaejin", "Korean", "Korea"),
  namsea: stub("namsea", "Namsea", "Vietnamese + Thai Fusion", "Southeast Asia"),

  // ✅ Fully authored first page:
  shokunin: SHOKUNIN_PAGE,

  khoruun: stub("khoruun", "Khoruun", "Mongolian", "Mongolian Steppe"),
  lhumir: stub("lhumir", "Lhumir", "Tibetan", "Tibetan Plateau"),
  yatevar: stub("yatevar", "Yatevar", "Indian Vedic + Nahua Fusion", "Ancient India + Mesoamerica"),
  renara: stub("renara", "Renara", "Javanese", "Java, Indonesia"),
  karayni: stub("karayni", "Karayni", "Balinese + Quechua Fusion", "Bali + Andean Highlands"),
  wohaka: stub("wohaka", "Wohaka", "Maori + Lakota Fusion", "Aotearoa + Great Plains"),
  tjukari: stub("tjukari", "Tjukari", "Aboriginal Australian", "Australia"),
  kinmora: stub("kinmora", "Kinmora", "Maya", "Mesoamerica"),
  siljoa: stub("siljoa", "Siljoa", "Inuit + Sami Fusion", "Circumpolar Arctic"),
  skenari: stub("skenari", "Skenari", "Haudenosaunee", "Eastern Woodlands, North America"),
  ashkara: stub("ashkara", "Ashkara", "Persian/Zoroastrian", "Ancient Persia"),
  alethir: stub("alethir", "Alethir", "Ancient Greek", "Ancient Greece"),
};

export function getCodePage(slug: CodeSlug): CodePage {
  return CODE_PAGES[slug];
}

export function getAllCodePages(): CodePage[] {
  return Object.values(CODE_PAGES);
}
