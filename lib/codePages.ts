// lib/codePages.ts
/**
 * CODE PAGES (STUBS)
 * - Single source of truth for all cultural code “lens” pages
 * - Slugs are URL-safe + file-path-safe (lowercase, no accents)
 * - Display fields can include accents
 */

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

export type CodeLevel = 1 | 2 | 3 | 4;

export type CodeImageKey =
  | "hero"
  | "origin"
  | "lens"
  | "lifestyle"
  | "places"
  | "music"
  | "activities";

export interface CodePageImage {
  key: CodeImageKey;
  /**
   * Image path convention:
   * Put images inside:
   *   /public/codepages/<slug>/<key>.jpg
   * Example:
   *   /public/codepages/shokunin/hero.jpg
   *
   * You can switch jpg/png/webp—just update the path here.
   */
  src: string;
  alt: string;
  caption?: string;
}

export interface CodePageSection {
  id:
    | "overview"
    | "origin"
    | "traits"
    | "lens"
    | "signals"
    | "shadow"
    | "growth"
    | "lifestyle"
    | "places"
    | "music"
    | "activities"
    | "community"
    | "notes";
  title: string;
  /**
   * Keep content as paragraphs (strings).
   * Your page template can render these as <p> blocks.
   */
  body: string[];
}

export interface CodePage {
  slug: CodeSlug;

  // Display / educational naming (can include accents)
  codeName: string; // e.g. "Shokunin"
  fullName: string; // e.g. "Japanese"
  type: "standalone" | "fusion";
  origin: string; // e.g. "Japan"
  level: CodeLevel; // your “Level 1 culture” concept, etc.

  /**
   * Short, high-level description for top of page.
   * Keep it clean + credible (no overclaiming).
   */
  summary: string;

  /**
   * Optional: show the “lineage” you described.
   * Example:
   *  ["Level 1: Japan (historic)", "Level 2: Edo artisan guilds", ...]
   */
  lineage: string[];

  /**
   * Pull from your culturalCodes.ts core_concepts if you want,
   * but keep as editable content here for the page narrative.
   */
  coreConcepts: string[];

  /**
   * Optional: your trait profile (0-100) — can mirror your culturalCodes.ts
   * Keep empty for stubs; fill later.
   */
  traitProfile?: Partial<Record<string, number>>;

  images: CodePageImage[];
  sections: CodePageSection[];

  /**
   * Optional metadata for later (SEO, internal linking, etc.)
   */
  seo?: {
    title?: string;
    description?: string;
  };
}

/**
 * Helper: build image path for a given slug + key
 */
export function codeImage(slug: CodeSlug, key: CodeImageKey, ext: "jpg" | "png" | "webp" = "jpg") {
  return `/codepages/${slug}/${key}.${ext}`;
}

/**
 * Empty but valid stubs for all 20 codes.
 * Fill in images/sections incrementally without breaking routes.
 */
export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  khoisan: {
    slug: "khoisan",
    codeName: "Khoisan",
    fullName: "San/Khoisan",
    type: "standalone",
    origin: "Southern Africa",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [
      { key: "hero", src: codeImage("khoisan", "hero"), alt: "Khoisan — hero image" },
    ],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Khoisan — Avirage Code", description: "" },
  },

  kayori: {
    slug: "kayori",
    codeName: "Kayori",
    fullName: "Yoruba",
    type: "standalone",
    origin: "West Africa",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("kayori", "hero"), alt: "Kayori — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Kayori — Avirage Code", description: "" },
  },

  sahen: {
    slug: "sahen",
    codeName: "Sahen",
    fullName: "Tuareg",
    type: "standalone",
    origin: "Sahara Desert",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("sahen", "hero"), alt: "Sahen — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Sahen — Avirage Code", description: "" },
  },

  enzuka: {
    slug: "enzuka",
    codeName: "Enzuka",
    fullName: "Maasai + Zulu Fusion",
    type: "fusion",
    origin: "East Africa",
    level: 2,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("enzuka", "hero"), alt: "Enzuka — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Enzuka — Avirage Code", description: "" },
  },

  siyuane: {
    slug: "siyuane",
    codeName: "Siyuane",
    fullName: "Ethiopian + Han Chinese Fusion",
    type: "fusion",
    origin: "Highland Ethiopia + Ancient China",
    level: 2,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("siyuane", "hero"), alt: "Siyuane — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Siyuane — Avirage Code", description: "" },
  },

  jaejin: {
    slug: "jaejin",
    codeName: "Jaejin",
    fullName: "Korean",
    type: "standalone",
    origin: "Korea",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("jaejin", "hero"), alt: "Jaejin — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Jaejin — Avirage Code", description: "" },
  },

  namsea: {
    slug: "namsea",
    codeName: "Namsea",
    fullName: "Vietnamese + Thai Fusion",
    type: "fusion",
    origin: "Southeast Asia",
    level: 2,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("namsea", "hero"), alt: "Namsea — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Namsea — Avirage Code", description: "" },
  },

  shokunin: {
    slug: "shokunin",
    codeName: "Shokunin",
    fullName: "Japanese",
    type: "standalone",
    origin: "Japan",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("shokunin", "hero"), alt: "Shokunin — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Shokunin — Avirage Code", description: "" },
  },

  khoruun: {
    slug: "khoruun",
    codeName: "Khoruun",
    fullName: "Mongolian",
    type: "standalone",
    origin: "Mongolian Steppe",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("khoruun", "hero"), alt: "Khoruun — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Khoruun — Avirage Code", description: "" },
  },

  lhumir: {
    slug: "lhumir",
    codeName: "Lhumir",
    fullName: "Tibetan",
    type: "standalone",
    origin: "Tibetan Plateau",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("lhumir", "hero"), alt: "Lhumir — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Lhumir — Avirage Code", description: "" },
  },

  yatevar: {
    slug: "yatevar",
    codeName: "Yatevar",
    fullName: "Indian Vedic + Nahua Fusion",
    type: "fusion",
    origin: "Ancient India + Mesoamerica",
    level: 2,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("yatevar", "hero"), alt: "Yatevar — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Yatevar — Avirage Code", description: "" },
  },

  renara: {
    slug: "renara",
    codeName: "Renara",
    fullName: "Javanese",
    type: "standalone",
    origin: "Java, Indonesia",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("renara", "hero"), alt: "Renara — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Renara — Avirage Code", description: "" },
  },

  karayni: {
    slug: "karayni",
    codeName: "Karayni",
    fullName: "Balinese + Quechua Fusion",
    type: "fusion",
    origin: "Bali + Andean Highlands",
    level: 2,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("karayni", "hero"), alt: "Karayni — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Karayni — Avirage Code", description: "" },
  },

  wohaka: {
    slug: "wohaka",
    codeName: "Wohaka",
    fullName: "Maori + Lakota Fusion",
    type: "fusion",
    origin: "Aotearoa + Great Plains",
    level: 2,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("wohaka", "hero"), alt: "Wohaka — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Wohaka — Avirage Code", description: "" },
  },

  tjukari: {
    slug: "tjukari",
    codeName: "Tjukari",
    fullName: "Aboriginal Australian",
    type: "standalone",
    origin: "Australia",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("tjukari", "hero"), alt: "Tjukari — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Tjukari — Avirage Code", description: "" },
  },

  kinmora: {
    slug: "kinmora",
    codeName: "Kinmora",
    fullName: "Maya",
    type: "standalone",
    origin: "Mesoamerica",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("kinmora", "hero"), alt: "Kinmora — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Kinmora — Avirage Code", description: "" },
  },

  siljoa: {
    slug: "siljoa",
    codeName: "Siljoa",
    fullName: "Inuit + Sami Fusion",
    type: "fusion",
    origin: "Circumpolar Arctic",
    level: 2,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("siljoa", "hero"), alt: "Siljoa — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Siljoa — Avirage Code", description: "" },
  },

  skenari: {
    slug: "skenari",
    codeName: "Skenari",
    fullName: "Haudenosaunee",
    type: "standalone",
    origin: "Eastern Woodlands, North America",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("skenari", "hero"), alt: "Skenari — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Skenari — Avirage Code", description: "" },
  },

  ashkara: {
    slug: "ashkara",
    codeName: "Ashkara",
    fullName: "Persian/Zoroastrian",
    type: "standalone",
    origin: "Ancient Persia",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("ashkara", "hero"), alt: "Ashkara — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Ashkara — Avirage Code", description: "" },
  },

  alethir: {
    slug: "alethir",
    codeName: "Alethir",
    fullName: "Ancient Greek",
    type: "standalone",
    origin: "Ancient Greece",
    level: 1,
    summary: "",
    lineage: [],
    coreConcepts: [],
    images: [{ key: "hero", src: codeImage("alethir", "hero"), alt: "Alethir — hero image" }],
    sections: [
      { id: "overview", title: "Overview", body: [] },
      { id: "origin", title: "Cultural Origin", body: [] },
      { id: "traits", title: "Trait Profile", body: [] },
      { id: "lens", title: "Lens", body: [] },
      { id: "lifestyle", title: "Lifestyle Alignment", body: [] },
      { id: "activities", title: "Activities", body: [] },
      { id: "notes", title: "Notes", body: [] },
    ],
    seo: { title: "Alethir — Avirage Code", description: "" },
  },
};

/**
 * Convenience helpers
 */
export const ALL_CODE_SLUGS: CodeSlug[] = Object.keys(CODE_PAGES) as CodeSlug[];

export function getCodePage(slug: CodeSlug): CodePage {
  return CODE_PAGES[slug];
}
