/**
 * lib/codePages.ts
 * Single source of truth for ALL 20 Cultural Code pages.
 *
 * IMPORTANT (your convention):
 * Images live in: /public/codepages/<slug>/
 * This file references images as: /codepages/<slug>/<filename>
 *
 * Default image naming convention per code (3 images):
 *  - cover.jpg
 *  - detail-1.jpg
 *  - detail-2.jpg
 *
 * If an image doesn’t exist, your page can simply hide it (recommended).
 */

// ✅ Define slugs FIRST (no circular types)
export const CODE_SLUGS = [
  "khoisan",
  "kayori",
  "sahen",
  "enzuka",
  "siyuane",
  "jaejin",
  "namsea",
  "shokunin",
  "khoruun",
  "lhumir",
  "yatevar",
  "renara",
  "karayni",
  "wohaka",
  "tjukari",
  "kinmora",
  "siljoa",
  "skenari",
  "ashkara",
  "alethir",
] as const;

export type CodeSlug = (typeof CODE_SLUGS)[number];

export type CodePageSection =
  | "Overview"
  | "Origin"
  | "Lens"
  | "Traits"
  | "Lifestyle"
  | "Places"
  | "Music"
  | "Activities"
  | "Strengths"
  | "Watchouts"
  | "TryThisWeek"
  | "Notes";

export type CodePageImage = {
  /** Public URL path (ex: /codepages/shokunin/cover.jpg) */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption shown under the image */
  caption?: string;
};

export type CodePage = {
  slug: CodeSlug;

  /** Display name (matches your code names in results, but without accents) */
  codeName: string;
  /** Full name (what the code is derived from) */
  fullName: string;

  /**
   * Educational framing:
   * “Level 1 cultures” = the origin tradition(s) you researched.
   * “Lineage” explains why the linkage exists (compact version).
   */
  origin: {
    level1: string; // ex: "Japan"
    lineage: string[]; // short bullet lineage (levels 1-4 style)
    notes?: string; // optional
  };

  /** One-paragraph snapshot (trustworthy, not mystical claims) */
  snapshot: string;

  /**
   * Lens framing: This is NOT claiming someone is “that culture”.
   * It’s “archetypal tradition match / lens”.
   */
  lens: {
    title: string; // ex: "The Craft Lens"
    description: string; // 2–4 sentences
    inPlainEnglish: string[]; // 3–6 bullets
  };

  /**
   * Trait highlights: keep aligned with your app’s behavioral/trait angle.
   * These are “tendencies”, not diagnoses.
   */
  traits: {
    headline: string; // e.g., "Precision + Harmony"
    highlights: Array<{
      label: string; // e.g., "Quality threshold"
      meaning: string; // 1 sentence
    }>;
  };

  /**
   * Lifestyle suggestions: “places/activities/music” are guidance, not fate.
   * Keep compact for now.
   */
  recommendations: {
    lifestyle: string[]; // 4–8 bullets
    places: string[]; // 4–8 bullets
    music: string[]; // 4–8 bullets (genres/qualities, not specific copyrighted lists)
    activities: string[]; // 4–10 bullets
  };

  /**
   * Practical “so what” blocks that make it feel professional + actionable.
   */
  strengths: string[]; // 4–8 bullets
  watchouts: string[]; // 4–8 bullets
  tryThisWeek: string[]; // 3–6 bullets

  /** Optional: connect to secondary/tertiary codes later */
  related?: {
    complements?: CodeSlug[];
    tensions?: CodeSlug[];
  };

  /** Images (optional — your UI can hide missing images gracefully) */
  images: {
    cover?: CodePageImage;
    gallery?: CodePageImage[];
  };

  /** Long-form notes for later expansion (keep compact now) */
  notes?: string[];
  /** Render order for the page UI */
  sectionsOrder?: CodePageSection[];
};

function img(slug: CodeSlug, file: string, alt: string, caption?: string): CodePageImage {
  return { src: `/codepages/${slug}/${file}`, alt, caption };
}

/**
 * MASTER DATABASE (20)
 */
export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  /* =========================================================
     1) SHOKUNIN
  ========================================================= */
  shokunin: {
    slug: "shokunin",
    codeName: "Shokunin",
    fullName: "Japanese",
    origin: {
      level1: "Japan",
      lineage: [
        "Level 1: Japanese craft tradition (shokunin ethos)",
        "Level 2: Social harmony systems (wa) + apprenticeship culture",
        "Level 3: Ritualized quality and continuous refinement (kaizen-like discipline)",
        "Level 4: Aesthetics as function (wabi-sabi / form-with-purpose)",
      ],
      notes:
        "This code describes a craft-and-harmony lens: high standards, deep care, and a preference for clean systems.",
    },
    snapshot:
      "Shokunin is an archetypal craft lens: you tend to raise the quality bar, notice details others miss, and feel most grounded when your environment and work are intentional. It’s less about perfection for ego, more about respect for the work and the people who will use it.",
    lens: {
      title: "The Craft Lens",
      description:
        "You experience the world through refinement: small improvements compound, quality is a form of care, and calm structure enables creativity. You prefer environments that respect focus, process, and taste.",
      inPlainEnglish: [
        "You’re sensitive to “almost right” — you want “done properly.”",
        "You do best with a clean system and clear standards.",
        "You trust repetition and practice more than hype.",
        "You value harmony: fewer disruptions, more flow.",
        "You’d rather build something enduring than chase novelty.",
      ],
    },
    traits: {
      headline: "Precision + Harmony",
      highlights: [
        { label: "Quality threshold", meaning: "You prefer fewer things, done better." },
        { label: "Detail awareness", meaning: "You naturally spot small inconsistencies or weak points." },
        { label: "Process respect", meaning: "You believe results follow discipline and iteration." },
        { label: "Calm structure", meaning: "You think best when the environment feels ordered." },
        { label: "Aesthetic intelligence", meaning: "Taste and function feel connected for you." },
      ],
    },
    recommendations: {
      lifestyle: [
        "Design your day like a ritual: consistent start, consistent shutdown.",
        "Keep a small toolkit of repeatable habits (sleep, movement, focus blocks).",
        "Reduce noise: fewer commitments, cleaner calendar, clearer standards.",
        "Choose roles where quality matters (craft, product, ops, design, research).",
        "Protect deep work windows; you’re at your best when uninterrupted.",
      ],
      places: [
        "Quiet cafés with good lighting and space",
        "Museums, galleries, architecture walks",
        "Well-designed studios, libraries, calm co-working spaces",
        "Nature trails with a steady pace (less chaos, more rhythm)",
        "Craft districts / markets where process is visible",
      ],
      music: [
        "Instrumental / minimal / ambient focus music",
        "Jazz or acoustic sets with structure and variation",
        "Soundtracks for flow (low lyric density)",
        "Traditional instruments + modern minimal production",
        "Anything that supports concentration without emotional whiplash",
      ],
      activities: [
        "A craft practice: cooking, ceramics, calligraphy, photography, woodworking",
        "Skill progression systems (courses with drills + feedback loops)",
        "Personal “quality upgrades”: workspace, wardrobe basics, tools",
        "Slow mastery sports: climbing, martial arts, tennis, swimming",
        "Minimalist travel: one city, deep exploration",
      ],
    },
    strengths: [
      "You raise standards without needing hype.",
      "You create systems that make quality repeatable.",
      "You’re trusted because you care about outcomes.",
      "You build things that age well (durability mindset).",
      "You can turn taste into real craft over time.",
    ],
    watchouts: [
      "Perfectionism can delay shipping (quality vs momentum).",
      "You may be harsh on yourself when standards aren’t met.",
      "Rigid environments can reduce your playfulness.",
      "You may under-communicate progress (“quiet work” invisibility).",
      "You might dismiss novelty too early — sometimes it’s fuel.",
    ],
    tryThisWeek: [
      "Pick one craft and do 30 minutes daily for 5 days.",
      "Define a ‘good enough to ship’ bar for one task and ship it.",
      "Declutter one surface (desk/table) and keep it clean for 7 days.",
      "Replace one recurring friction with a small system (checklist/template).",
    ],
    related: {
      complements: ["siyuane", "renara", "skenari"],
      tensions: ["namsea", "khoruun"],
    },
    images: {
      cover: img("shokunin", "cover.jpg", "Shokunin cover image", "The craft lens: refinement through repetition."),
      gallery: [
        img("shokunin", "detail-1.jpg", "Shokunin detail image 1", "Quality is care made visible."),
        img("shokunin", "detail-2.jpg", "Shokunin detail image 2", "Calm structure enables precision."),
      ],
    },
    notes: [
      "Language rule: never claim identity; frame as lens/archetype alignment.",
      "Keep suggestions practical: “what to try”, not “what you are destined to be.”",
    ],
    sectionsOrder: [
      "Overview",
      "Origin",
      "Lens",
      "Traits",
      "Lifestyle",
      "Places",
      "Music",
      "Activities",
      "Strengths",
      "Watchouts",
      "TryThisWeek",
      "Notes",
    ],
  },

  /* =========================================================
     2) NAMSEA
  ========================================================= */
  namsea: {
    slug: "namsea",
    codeName: "Namsea",
    fullName: "Vietnamese + Thai Fusion",
    origin: {
      level1: "Southeast Asia",
      lineage: [
        "Level 1: Vietnamese + Thai cultural patterns",
        "Level 2: Water/flow metaphors (adaptability, ease, social smoothness)",
        "Level 3: Conflict-avoidance skill and relational gentleness",
        "Level 4: Resilience through softness + steady optimism",
      ],
    },
    snapshot:
      "Namsea is a flow-and-ease lens: you navigate life by reducing friction, keeping relationships smooth, and staying adaptable. You tend to stabilize environments through calmness rather than control.",
    lens: {
      title: "The Flow Lens",
      description:
        "You prioritize harmony, comfort, and flexible movement. Instead of forcing outcomes, you adjust angles, timing, and tone until things work naturally.",
      inPlainEnglish: [
        "You avoid unnecessary conflict and prefer smooth solutions.",
        "You adapt quickly when conditions change.",
        "You build comfort and stability through social skill.",
      ],
    },
    traits: {
      headline: "Adaptability + Ease",
      highlights: [
        { label: "Soft power", meaning: "You influence through tone, timing, and relationship." },
        { label: "Friction reduction", meaning: "You’re good at making hard things feel manageable." },
        { label: "Flexible structure", meaning: "You can organize without becoming rigid." },
        { label: "Resilient calm", meaning: "You recover by returning to ease and simplicity." },
      ],
    },
    recommendations: {
      lifestyle: [
        "Build routines that feel light, not strict.",
        "Choose teams with emotional intelligence and low drama.",
        "Keep a ‘reset ritual’ (walk, tea, music, shower) for stress.",
        "Practice saying no without harshness: short, kind, clear.",
      ],
      places: [
        "Waterfront walks and parks",
        "Markets and food-focused streets",
        "Low-pressure social spaces (lounges, cafés, gardens)",
        "Warm climates / places with relaxed pacing",
      ],
      music: [
        "Chill / downtempo / lo-fi",
        "Melodic pop with soft energy",
        "Acoustic sessions and light jazz",
        "Anything that feels like “movement without urgency”",
      ],
      activities: [
        "Cooking and hosting (light, relational)",
        "Yoga, swimming, dance",
        "Language exchange / community meetups",
        "Short trips with flexible plans",
      ],
    },
    strengths: [
      "You stabilize social environments.",
      "You adapt without panic.",
      "You’re good at de-escalation and smooth coordination.",
      "You create comfort and belonging.",
    ],
    watchouts: [
      "Avoiding conflict too much can create quiet resentment.",
      "You may delay hard decisions to preserve harmony.",
      "People may underestimate your seriousness because you’re gentle.",
    ],
    tryThisWeek: [
      "Practice one direct ‘kind no.’",
      "Do one activity near water (or nature) to reset.",
      "Choose one small friction point and simplify it.",
    ],
    images: {
      cover: img("namsea", "cover.jpg", "Namsea cover image"),
      gallery: [
        img("namsea", "detail-1.jpg", "Namsea detail image 1"),
        img("namsea", "detail-2.jpg", "Namsea detail image 2"),
      ],
    },
  },

  /* =========================================================
     3) ALETHIR
  ========================================================= */
  alethir: {
    slug: "alethir",
    codeName: "Alethir",
    fullName: "Ancient Greek",
    origin: {
      level1: "Ancient Greece",
      lineage: [
        "Level 1: Greek inquiry + civic debate traditions",
        "Level 2: Logos-thinking (reasoning, argument, clarity)",
        "Level 3: Identity through ideas, discourse, and excellence",
        "Level 4: Novelty through exploration (intellectual openness)",
      ],
    },
    snapshot:
      "Alethir is an inquiry lens: you move through the world by testing ideas, debating meaning, and seeking what’s real through reasoning and dialogue.",
    lens: {
      title: "The Inquiry Lens",
      description:
        "You learn by questioning. Your confidence grows when you can explain something clearly and defend it under pressure.",
      inPlainEnglish: [
        "You want the real reason, not the surface story.",
        "You sharpen through discussion and critique.",
        "You feel alive when exploring concepts and possibilities.",
      ],
    },
    traits: {
      headline: "Inquiry + Expression",
      highlights: [
        { label: "Truth-seeking", meaning: "You prefer clarity and honest reasoning." },
        { label: "Argument skill", meaning: "You can pressure-test ideas and refine them." },
        { label: "Concept appetite", meaning: "You’re energized by new frameworks and perspectives." },
      ],
    },
    recommendations: {
      lifestyle: [
        "Join spaces where debate is respectful and high-signal.",
        "Write to think: essays, notes, argument maps.",
        "Balance novelty with follow-through: ship your ideas.",
      ],
      places: [
        "Universities, lectures, salons, bookshops",
        "Cities with strong arts + discussion culture",
        "Public forums: panels, talks, meetups",
      ],
      music: [
        "Dynamic genres that support thinking",
        "Instrumental + lyrical balance (varies by mood)",
        "Anything that matches your ‘debate + discovery’ energy",
      ],
      activities: [
        "Debate club, toastmasters, writing groups",
        "Philosophy circles, strategy games, improv (verbal agility)",
        "Travel for museums and historic sites",
      ],
    },
    strengths: [
      "You clarify confusion with reasoning.",
      "You can lead with ideas and narrative.",
      "You’re persuasive when grounded in evidence and logic.",
    ],
    watchouts: [
      "Overthinking can delay action.",
      "Argument can become identity (win vs understand).",
      "You may undervalue emotional tone in communication.",
    ],
    tryThisWeek: [
      "Write one-page argument for a decision you’re avoiding.",
      "Have one conversation where your goal is understanding, not winning.",
      "Ship a small piece of work publicly.",
    ],
    images: {
      cover: img("alethir", "cover.jpg", "Alethir cover image"),
      gallery: [
        img("alethir", "detail-1.jpg", "Alethir detail image 1"),
        img("alethir", "detail-2.jpg", "Alethir detail image 2"),
      ],
    },
  },

  /* =========================================================
     4) KHOISAN
  ========================================================= */
  khoisan: {
    slug: "khoisan",
    codeName: "Khoisan",
    fullName: "San/Khoisan",
    origin: {
      level1: "Southern Africa",
      lineage: [
        "Level 1: San/Khoisan survival intelligence",
        "Level 2: Tracking/perception mastery",
        "Level 3: Small-group egalitarian coordination",
        "Level 4: Present-moment attunement with environment",
      ],
    },
    snapshot:
      "Khoisan is an attunement lens: you read subtle cues, track patterns in people and environments, and prefer grounded, practical awareness over abstract performance.",
    lens: {
      title: "The Attunement Lens",
      description:
        "You notice what others miss. Your intelligence often shows up as timing, sensing, and picking up real-world signals.",
      inPlainEnglish: [
        "You’re highly observant and context-aware.",
        "You prefer small groups and low ego environments.",
        "You value practical awareness and real-time adaptation.",
      ],
    },
    traits: {
      headline: "Perception + Grounding",
      highlights: [
        { label: "Environmental reading", meaning: "You pick up subtle changes quickly." },
        { label: "Pattern sensing", meaning: "You see repeating signals and cycles." },
        { label: "Present focus", meaning: "You operate best with what’s real now." },
      ],
    },
    recommendations: {
      lifestyle: [
        "Get outside often; your nervous system resets in nature.",
        "Choose work with real signals (field, ops, product, research).",
        "Keep social circles small but high-trust.",
      ],
      places: [
        "Nature trails, reserves, quiet outdoor routes",
        "Low-noise environments with good visibility",
        "Small communities with stable rhythm",
      ],
      music: [
        "Rhythms that feel grounded and embodied",
        "Minimal vocals when focusing",
        "Music that supports movement (walk/run)",
      ],
      activities: [
        "Hiking, tracking-style walks, photography",
        "Skill-based survival/craft workshops",
        "Mindfulness practices that are body-based",
      ],
    },
    strengths: [
      "High situational awareness.",
      "Strong real-world pattern recognition.",
      "Calm competence under changing conditions.",
    ],
    watchouts: [
      "Over-sensing can become overstimulation in noisy places.",
      "You may disengage from high-drama environments quickly.",
      "You might under-sell your intelligence because it’s non-theatrical.",
    ],
    tryThisWeek: [
      "Do one long walk without headphones and observe details.",
      "Reduce digital noise for one evening.",
      "Pick one ‘signal’ metric for your life and track it (sleep, mood, output).",
    ],
    images: {
      cover: img("khoisan", "cover.jpg", "Khoisan cover image"),
      gallery: [
        img("khoisan", "detail-1.jpg", "Khoisan detail image 1"),
        img("khoisan", "detail-2.jpg", "Khoisan detail image 2"),
      ],
    },
  },

  /* =========================================================
     5) KAYORI
  ========================================================= */
  kayori: {
    slug: "kayori",
    codeName: "Kayori",
    fullName: "Yoruba",
    origin: {
      level1: "West Africa",
      lineage: [
        "Level 1: Yoruba ritual and artistic traditions",
        "Level 2: Meaning through story, rhythm, and symbol",
        "Level 3: Community intelligence (social + spiritual aesthetics)",
        "Level 4: Expressiveness as power and connection",
      ],
    },
    snapshot:
      "Kayori is an expressive-meaning lens: you move through life with rhythm, symbolism, warmth, and a strong sense of purpose anchored in community.",
    lens: {
      title: "The Ritual-Expression Lens",
      description:
        "You’re energized by shared meaning: gatherings, stories, music, and cultural aesthetics that make life feel alive and connected.",
      inPlainEnglish: [
        "You gain energy through people and shared moments.",
        "You communicate through feeling, story, and symbolism.",
        "Meaning matters as much as achievement.",
      ],
    },
    traits: {
      headline: "Expression + Meaning",
      highlights: [
        { label: "Social vitality", meaning: "Community and celebration refuel you." },
        { label: "Symbolic thinking", meaning: "You connect events to deeper meaning and story." },
        { label: "Creative force", meaning: "You generate energy through art, rhythm, and ritual." },
      ],
    },
    recommendations: {
      lifestyle: [
        "Create a weekly ritual: dinner, music night, gathering, community time.",
        "Use art as processing: writing, dance, design, storytelling.",
        "Choose environments that respect warmth and expressiveness.",
      ],
      places: [
        "Live music venues and community events",
        "Festivals, cultural markets, gatherings",
        "Spaces that feel vibrant and shared",
      ],
      music: [
        "Rhythmic, communal music",
        "Afrobeats / high-groove styles",
        "Anything that invites movement and expression",
      ],
      activities: [
        "Hosting, community organizing, volunteering",
        "Dance, drumming, performance, public speaking",
        "Creative production with people (collabs)",
      ],
    },
    strengths: [
      "You create belonging and momentum.",
      "You transmit meaning through expression.",
      "You build strong relational networks.",
    ],
    watchouts: [
      "Over-giving can lead to burnout.",
      "You may avoid solitude even when you need it.",
      "You might prioritize harmony over difficult truth sometimes.",
    ],
    tryThisWeek: [
      "Host or join one community moment.",
      "Make one creative piece in 60 minutes (no perfection).",
      "Write a short ‘meaning statement’ for the month.",
    ],
    images: {
      cover: img("kayori", "cover.jpg", "Kayori cover image"),
      gallery: [
        img("kayori", "detail-1.jpg", "Kayori detail image 1"),
        img("kayori", "detail-2.jpg", "Kayori detail image 2"),
      ],
    },
  },

  /* =========================================================
     6) SAHEN
  ========================================================= */
  sahen: {
    slug: "sahen",
    codeName: "Sahen",
    fullName: "Tuareg",
    origin: {
      level1: "Sahara Desert",
      lineage: [
        "Level 1: Tuareg desert life + autonomy",
        "Level 2: Poetic identity and inner endurance",
        "Level 3: Quiet competence and independence",
        "Level 4: Meaning through solitude and landscape",
      ],
    },
    snapshot:
      "Sahen is a solitary-strength lens: you value independence, deep inner life, and competence that doesn’t require applause.",
    lens: {
      title: "The Desert Mind Lens",
      description:
        "You’re comfortable with distance—space helps you think. You prefer depth over noise, and freedom over heavy social obligation.",
      inPlainEnglish: [
        "You recharge alone and think deeply.",
        "You value autonomy and self-direction.",
        "You carry meaning quietly rather than loudly.",
      ],
    },
    traits: {
      headline: "Autonomy + Depth",
      highlights: [
        { label: "Inner stamina", meaning: "You can endure and remain steady." },
        { label: "Self-direction", meaning: "You prefer choosing your path." },
        { label: "Quiet insight", meaning: "You notice patterns from a distance." },
      ],
    },
    recommendations: {
      lifestyle: [
        "Protect solitude; it’s not a luxury for you.",
        "Choose roles with autonomy and deep focus.",
        "Build 1–3 high-trust relationships rather than big circles.",
      ],
      places: [
        "Wide-open spaces, deserts, mountains, night skies",
        "Quiet cafés, libraries, private studios",
        "Long-distance travel with low social pressure",
      ],
      music: ["Ambient, desert blues-inspired moods", "Minimal lyric density for thinking", "Slow, spacious sound"],
      activities: ["Long walks, journaling, photography", "Solo travel, learning deep skills", "Meditation or contemplative practice"],
    },
    strengths: ["Self-reliance", "Depth of thought", "Calm under pressure"],
    watchouts: ["Isolation can become default", "You may avoid asking for help", "Others might misread your quietness as distance"],
    tryThisWeek: ["Schedule one long solo focus block", "Reach out to one trusted person", "Write what you’re actually longing for (no filter)"],
    images: {
      cover: img("sahen", "cover.jpg", "Sahen cover image"),
      gallery: [
        img("sahen", "detail-1.jpg", "Sahen detail image 1"),
        img("sahen", "detail-2.jpg", "Sahen detail image 2"),
      ],
    },
  },

  /* =========================================================
     7) ENZUKA
  ========================================================= */
  enzuka: {
    slug: "enzuka",
    codeName: "Enzuka",
    fullName: "Maasai + Zulu Fusion",
    origin: {
      level1: "East Africa",
      lineage: [
        "Level 1: Maasai + Zulu warrior/community duty traditions",
        "Level 2: Strength as responsibility to the group",
        "Level 3: Honor, discipline, and protective leadership",
        "Level 4: Identity through role, loyalty, and courage",
      ],
    },
    snapshot:
      "Enzuka is a duty-and-strength lens: you thrive in roles where leadership protects people, standards are clear, and courage is practical.",
    lens: {
      title: "The Duty Lens",
      description:
        "You want a mission, a team, and a structure that makes strength meaningful. You prefer respect-based hierarchies and directness.",
      inPlainEnglish: ["You step up under pressure.", "You value loyalty and duty.", "You prefer clear roles and boundaries."],
    },
    traits: {
      headline: "Courage + Structure",
      highlights: [
        { label: "Protective leadership", meaning: "You’re strong when others rely on you." },
        { label: "Honor code", meaning: "Values guide your decisions." },
        { label: "Team discipline", meaning: "You like coordinated effort." },
      ],
    },
    recommendations: {
      lifestyle: ["Choose mission-driven teams", "Train your body (strength + stamina)", "Keep clear standards and boundaries"],
      places: ["Sports communities", "Team environments", "Nature with strong landscapes"],
      music: ["High-drive, rhythmic music", "Anthems / motivational energy", "Drums / strong beats"],
      activities: ["Martial arts, strength training", "Leadership roles", "Team sports / coordinated action"],
    },
    strengths: ["Decisive leadership", "Reliability under stress", "Strong loyalty"],
    watchouts: ["Over-control can push others away", "You may carry too much responsibility", "Conflict can become default tool"],
    tryThisWeek: ["Train 3x", "Set one boundary clearly", "Lead one small initiative"],
    images: {
      cover: img("enzuka", "cover.jpg", "Enzuka cover image"),
      gallery: [
        img("enzuka", "detail-1.jpg", "Enzuka detail image 1"),
        img("enzuka", "detail-2.jpg", "Enzuka detail image 2"),
      ],
    },
  },

  /* =========================================================
     8) SIYUANE
  ========================================================= */
  siyuane: {
    slug: "siyuane",
    codeName: "Siyuane",
    fullName: "Ethiopian + Han Chinese Fusion",
    origin: {
      level1: "Highland Ethiopia + Ancient China",
      lineage: [
        "Level 1: Civilizational continuity and hierarchy",
        "Level 2: Order as moral endurance",
        "Level 3: Discipline across generations",
        "Level 4: Harmony through structure and responsibility",
      ],
    },
    snapshot:
      "Siyuane is a continuity lens: you trust tradition, structure, and long-term thinking. You prefer stability and moral order over improvisation.",
    lens: {
      title: "The Continuity Lens",
      description:
        "You orient toward what lasts—systems, lineage, duty, and refined social order. You feel safe when the rules and expectations are clear.",
      inPlainEnglish: ["You plan for the long term.", "You prefer structure and stability.", "You value respect, duty, and continuity."],
    },
    traits: {
      headline: "Order + Endurance",
      highlights: [
        { label: "Future orientation", meaning: "You sacrifice short-term comfort for long-term outcome." },
        { label: "Stability seeking", meaning: "You prefer predictable systems." },
        { label: "Emotional restraint", meaning: "You keep composure under pressure." },
      ],
    },
    recommendations: {
      lifestyle: ["Use routines and planning", "Choose stable environments", "Build legacy skills (finance, craft, leadership)"],
      places: ["Institutions, libraries, structured communities", "Historic sites", "Quiet high-quality spaces"],
      music: ["Classical/instrumental", "Structured compositions", "Low chaos sound"],
      activities: ["Long-term projects", "Mentorship/apprenticeship", "Traditional arts or disciplined study"],
    },
    strengths: ["Reliability", "Long-term execution", "Composure"],
    watchouts: ["Rigidity under change", "Difficulty relaxing", "Overweighting ‘should’ over ‘want’"],
    tryThisWeek: ["Create a weekly plan", "Declutter one system", "Do one deep study session (90 minutes)"],
    images: {
      cover: img("siyuane", "cover.jpg", "Siyuane cover image"),
      gallery: [
        img("siyuane", "detail-1.jpg", "Siyuane detail image 1"),
        img("siyuane", "detail-2.jpg", "Siyuane detail image 2"),
      ],
    },
  },

  /* =========================================================
     9) JAEJIN
  ========================================================= */
  jaejin: {
    slug: "jaejin",
    codeName: "Jaejin",
    fullName: "Korean",
    origin: {
      level1: "Korea",
      lineage: [
        "Level 1: Compressed modernity + resilience",
        "Level 2: Diligence under pressure",
        "Level 3: Loyalty bonds and team sacrifice",
        "Level 4: Speed + intensity with restrained emotion",
      ],
    },
    snapshot:
      "Jaejin is an intensity lens: you execute under pressure, stay loyal to your people, and move fast when stakes are real.",
    lens: {
      title: "The Pressure Lens",
      description:
        "Constraint sharpens you. You’re at your best when there’s a clear goal, a strong team bond, and real accountability.",
      inPlainEnglish: ["You can work extremely hard when it matters.", "You value loyalty and competence.", "You often keep emotions contained."],
    },
    traits: {
      headline: "Intensity + Loyalty",
      highlights: [
        { label: "High output", meaning: "You can push through and deliver." },
        { label: "Team-first bond", meaning: "You commit deeply once trust is earned." },
        { label: "Composed exterior", meaning: "You don’t show everything you feel." },
      ],
    },
    recommendations: {
      lifestyle: ["Use sprint cycles", "Protect recovery (sleep, off-days)", "Choose teams with strong culture"],
      places: ["High-performance hubs", "Training environments", "Cities with momentum"],
      music: ["High-energy focus tracks", "Rhythmic drive", "Workout music"],
      activities: ["Strength training", "Skill drills", "Team projects and execution roles"],
    },
    strengths: ["Execution under pressure", "Loyalty", "Speed and diligence"],
    watchouts: ["Burnout risk", "Overworking identity", "Emotional bottling"],
    tryThisWeek: ["One sprint + one recovery day", "Have one honest conversation", "Set a hard stop time nightly"],
    images: {
      cover: img("jaejin", "cover.jpg", "Jaejin cover image"),
      gallery: [
        img("jaejin", "detail-1.jpg", "Jaejin detail image 1"),
        img("jaejin", "detail-2.jpg", "Jaejin detail image 2"),
      ],
    },
  },

  /* =========================================================
     10) KHORUUN
  ========================================================= */
  khoruun: {
    slug: "khoruun",
    codeName: "Khoruun",
    fullName: "Mongolian",
    origin: {
      level1: "Mongolian Steppe",
      lineage: [
        "Level 1: Nomadic autonomy and movement intelligence",
        "Level 2: Environmental toughness and resilience",
        "Level 3: Decentralized strength (self-directed)",
        "Level 4: Freedom sustained by competence",
      ],
    },
    snapshot:
      "Khoruun is a freedom lens: you thrive with autonomy, movement, and environments that don’t over-control you.",
    lens: {
      title: "The Freedom Lens",
      description:
        "You think better when you can move—physically or strategically. You value competence, independence, and self-owned direction.",
      inPlainEnglish: ["You dislike micromanagement.", "You’re adaptable under rough conditions.", "You prefer freedom with responsibility."],
    },
    traits: {
      headline: "Autonomy + Toughness",
      highlights: [
        { label: "Improvisation", meaning: "You can adjust quickly when plans break." },
        { label: "Self-direction", meaning: "You prefer owning decisions." },
        { label: "Environmental resilience", meaning: "You’re steady through discomfort." },
      ],
    },
    recommendations: {
      lifestyle: ["Keep your calendar spacious", "Choose roles with autonomy", "Move your body daily"],
      places: ["Open landscapes", "Road trips", "Places with space and low rules"],
      music: ["Driving music", "Rhythmic / expansive sound", "Anything that feels ‘wide’"],
      activities: ["Travel, hiking, horseback-style sports (or equivalents)", "Entrepreneurial projects", "Adventure sports"],
    },
    strengths: ["Independence", "Resilience", "Fast adaptation"],
    watchouts: ["Commitment aversion", "Under-communicating needs", "Isolation through self-reliance"],
    tryThisWeek: ["Plan one ‘free day’", "Do one hard physical session", "Take a long drive/walk and think"],
    images: {
      cover: img("khoruun", "cover.jpg", "Khoruun cover image"),
      gallery: [
        img("khoruun", "detail-1.jpg", "Khoruun detail image 1"),
        img("khoruun", "detail-2.jpg", "Khoruun detail image 2"),
      ],
    },
  },

  /* =========================================================
     11) LHUMIR
  ========================================================= */
  lhumir: {
    slug: "lhumir",
    codeName: "Lhumir",
    fullName: "Tibetan",
    origin: {
      level1: "Tibetan Plateau",
      lineage: [
        "Level 1: Contemplative and monastic traditions",
        "Level 2: Compassion discipline and impermanence worldview",
        "Level 3: Stillness as strength",
        "Level 4: Meaning through inner training",
      ],
    },
    snapshot:
      "Lhumir is a contemplative lens: you find clarity through stillness, inner training, and meaning-centered living.",
    lens: {
      title: "The Contemplative Lens",
      description:
        "You stabilize yourself by looking inward, simplifying, and practicing compassion as a discipline rather than a mood.",
      inPlainEnglish: ["You’re steady when you slow down.", "You value meaning over status.", "You prefer depth and calm."],
    },
    traits: {
      headline: "Stillness + Meaning",
      highlights: [
        { label: "Inner focus", meaning: "You process through reflection." },
        { label: "Emotional stability", meaning: "You aim for calm and equanimity." },
        { label: "Meaning orientation", meaning: "You want life to feel purposeful." },
      ],
    },
    recommendations: {
      lifestyle: ["Daily quiet practice", "Simplify commitments", "Prioritize meaning-driven work"],
      places: ["Mountains, quiet retreats", "Meditation spaces", "Libraries/temples"],
      music: ["Ambient, chant-like, slow", "Low stimulation sound", "Music for meditation"],
      activities: ["Meditation, breathwork", "Long walks", "Service with low ego"],
    },
    strengths: ["Calm presence", "Deep insight", "Compassionate steadiness"],
    watchouts: ["Withdrawal", "Avoiding action", "Over-idealizing calm"],
    tryThisWeek: ["10 minutes meditation daily", "One day of reduced stimulation", "One act of quiet service"],
    images: {
      cover: img("lhumir", "cover.jpg", "Lhumir cover image"),
      gallery: [
        img("lhumir", "detail-1.jpg", "Lhumir detail image 1"),
        img("lhumir", "detail-2.jpg", "Lhumir detail image 2"),
      ],
    },
  },

  /* =========================================================
     12) YATEVAR
  ========================================================= */
  yatevar: {
    slug: "yatevar",
    codeName: "Yatevar",
    fullName: "Indian Vedic + Nahua/Aztec Fusion",
    origin: {
      level1: "Ancient India + Mesoamerica",
      lineage: [
        "Level 1: Dharma (duty/order) + cosmic worldview",
        "Level 2: Metaphysical abstraction and ritual structure",
        "Level 3: Warrior-philosopher synthesis",
        "Level 4: Meaning through law-as-lived practice",
      ],
    },
    snapshot:
      "Yatevar is an order-through-meaning lens: you like structure when it serves something bigger—purpose, duty, cosmology, or a moral code.",
    lens: {
      title: "The Duty-Meaning Lens",
      description:
        "You’re motivated by principles. You can be intense about doing things ‘the right way’ when the stakes feel sacred or meaningful.",
      inPlainEnglish: ["You care about purpose and duty.", "You like structure with meaning.", "You’re serious about integrity."],
    },
    traits: {
      headline: "Purpose + Structure",
      highlights: [
        { label: "Meaning orientation", meaning: "You want life to ‘mean something’." },
        { label: "Rule clarity", meaning: "You prefer clear principles." },
        { label: "Depth", meaning: "You think in systems and metaphors." },
      ],
    },
    recommendations: {
      lifestyle: ["Write a personal code", "Pick one discipline and practice it", "Choose work with moral clarity"],
      places: ["Historic sites", "Study spaces", "Ritual/ceremony environments"],
      music: ["Epic / ceremonial moods", "Rhythmic intensity", "Spiritual/instrumental"],
      activities: ["Martial arts + philosophy", "Ritualized fitness routines", "Study, debate, tradition-based arts"],
    },
    strengths: ["Integrity", "Meaning-driven execution", "Strong standards"],
    watchouts: ["Rigidity", "Moral perfectionism", "Over-seriousness"],
    tryThisWeek: ["Write your top 3 principles", "Do one ritual habit daily", "Serve something bigger than you once"],
    images: {
      cover: img("yatevar", "cover.jpg", "Yatevar cover image"),
      gallery: [
        img("yatevar", "detail-1.jpg", "Yatevar detail image 1"),
        img("yatevar", "detail-2.jpg", "Yatevar detail image 2"),
      ],
    },
  },

  /* =========================================================
     13) RENARA
  ========================================================= */
  renara: {
    slug: "renara",
    codeName: "Renara",
    fullName: "Javanese",
    origin: {
      level1: "Java, Indonesia",
      lineage: [
        "Level 1: Halus (refinement) and hierarchical harmony",
        "Level 2: Emotional restraint + calm power",
        "Level 3: Order maintained through balance",
        "Level 4: Social stability via subtlety",
      ],
    },
    snapshot:
      "Renara is a refinement lens: you prefer subtle influence, emotional composure, and stable structure that keeps life smooth.",
    lens: {
      title: "The Refinement Lens",
      description:
        "You move strategically but quietly—calm, controlled, and tuned to social equilibrium.",
      inPlainEnglish: ["You influence subtly.", "You keep emotions contained.", "You value stability and balance."],
    },
    traits: {
      headline: "Calm + Stability",
      highlights: [
        { label: "Emotional restraint", meaning: "You keep composure even when stressed." },
        { label: "Balance seeking", meaning: "You stabilize systems through moderation." },
        { label: "Structure comfort", meaning: "You do well with clear norms." },
      ],
    },
    recommendations: {
      lifestyle: ["Keep routines", "Choose low-chaos relationships", "Use calm communication"],
      places: ["Quiet cultural spaces", "Gardens, temples", "Stable communities"],
      music: ["Soft, refined sound", "Traditional-influenced calm", "Low tempo music"],
      activities: ["Craft, cooking, gardening", "Meditation", "Community roles with harmony"],
    },
    strengths: ["Stability", "Diplomacy", "Calm leadership"],
    watchouts: ["Avoiding necessary conflict", "Over-containment", "Suppressing needs"],
    tryThisWeek: ["Say one need directly", "Declutter one routine", "Spend 1 hour in a calm cultural space"],
    images: {
      cover: img("renara", "cover.jpg", "Renara cover image"),
      gallery: [
        img("renara", "detail-1.jpg", "Renara detail image 1"),
        img("renara", "detail-2.jpg", "Renara detail image 2"),
      ],
    },
  },

  /* =========================================================
     14) KARAYNI
  ========================================================= */
  karayni: {
    slug: "karayni",
    codeName: "Karayni",
    fullName: "Balinese + Quechua Fusion",
    origin: {
      level1: "Bali + Andean Highlands",
      lineage: [
        "Level 1: Sacred reciprocity traditions",
        "Level 2: Community ritual labor + land relationship",
        "Level 3: Meaning as shared responsibility",
        "Level 4: Balance between humans, spirit, and nature",
      ],
    },
    snapshot:
      "Karayni is a reciprocity lens: you’re motivated by shared responsibility, service, and meaning built through community and place.",
    lens: {
      title: "The Reciprocity Lens",
      description:
        "You feel most ‘you’ when your life is embedded in community, rituals, and mutual care—people, land, and purpose all connected.",
      inPlainEnglish: ["You thrive in community.", "Service feels meaningful, not optional.", "Nature and place matter to your identity."],
    },
    traits: {
      headline: "Service + Meaning",
      highlights: [
        { label: "Reciprocity", meaning: "You value mutual contribution." },
        { label: "Community orientation", meaning: "You prefer shared projects." },
        { label: "Nature connection", meaning: "Place and environment ground you." },
      ],
    },
    recommendations: {
      lifestyle: ["Join a community project", "Volunteer regularly", "Make rituals with friends/family"],
      places: ["Cultural festivals", "Nature-rich communities", "Local markets and ceremony spaces"],
      music: ["Ceremonial/folk-inspired sound", "Rhythm + warmth", "Music for gatherings"],
      activities: ["Volunteering", "Dance, ceremony, craft", "Hiking, farming/gardening"],
    },
    strengths: ["Community building", "Care-based leadership", "Meaning-centered living"],
    watchouts: ["Over-giving", "Guilt when resting", "Losing self in group needs"],
    tryThisWeek: ["One act of service", "One nature day", "Host a small shared meal"],
    images: {
      cover: img("karayni", "cover.jpg", "Karayni cover image"),
      gallery: [
        img("karayni", "detail-1.jpg", "Karayni detail image 1"),
        img("karayni", "detail-2.jpg", "Karayni detail image 2"),
      ],
    },
  },

  /* =========================================================
     15) WOHAKA
  ========================================================= */
  wohaka: {
    slug: "wohaka",
    codeName: "Wohaka",
    fullName: "Maori + Lakota Fusion",
    origin: {
      level1: "Aotearoa + Great Plains",
      lineage: [
        "Level 1: Kinship cosmologies and ancestry identity",
        "Level 2: Warrior-spiritual synthesis",
        "Level 3: Land-identity fusion",
        "Level 4: Relationship as the foundation of life",
      ],
    },
    snapshot:
      "Wohaka is a kinship lens: you experience life as relationship—people, land, ancestry, spirit, community. Belonging and identity are linked.",
    lens: {
      title: "The Kinship Lens",
      description:
        "You’re strongest when you feel connected—your values are relational, and you prefer communities that honor identity and meaning.",
      inPlainEnglish: ["You value belonging.", "You protect what you love.", "Nature and lineage matter to your sense of self."],
    },
    traits: {
      headline: "Belonging + Courage",
      highlights: [
        { label: "Relational identity", meaning: "Connection defines you." },
        { label: "Protectiveness", meaning: "You defend people and values." },
        { label: "Meaning depth", meaning: "You look for purpose beneath events." },
      ],
    },
    recommendations: {
      lifestyle: ["Build or join a strong community", "Create rituals with your circle", "Spend time on land/nature"],
      places: ["Community gatherings", "Nature-connected travel", "Cultural learning spaces"],
      music: ["Drums and ceremony-inspired moods", "Songs about belonging", "Warm communal sound"],
      activities: ["Volunteer leadership", "Team sports/ceremony", "Nature stewardship activities"],
    },
    strengths: ["Strong belonging builder", "Courage", "Values-driven leadership"],
    watchouts: ["Over-identifying with group conflict", "Taking things personally", "Burnout from protecting everyone"],
    tryThisWeek: ["One community act", "One nature stewardship act", "Write what you stand for (3 values)"],
    images: {
      cover: img("wohaka", "cover.jpg", "Wohaka cover image"),
      gallery: [
        img("wohaka", "detail-1.jpg", "Wohaka detail image 1"),
        img("wohaka", "detail-2.jpg", "Wohaka detail image 2"),
      ],
    },
  },

  /* =========================================================
     16) TJUKARI
  ========================================================= */
  tjukari: {
    slug: "tjukari",
    codeName: "Tjukari",
    fullName: "Aboriginal Australian",
    origin: {
      level1: "Australia",
      lineage: [
        "Level 1: Dreamtime cosmology + songline navigation",
        "Level 2: Land-as-law worldview",
        "Level 3: Deep time consciousness",
        "Level 4: Meaning embedded in place and story",
      ],
    },
    snapshot:
      "Tjukari is a deep-time lens: you sense meaning through place, story, and patterns across time. You’re grounded when connected to land and narrative.",
    lens: {
      title: "The Deep-Time Lens",
      description:
        "You don’t just want ‘what works now’—you want what fits the larger story. You’re sensitive to symbols, cycles, and place-based meaning.",
      inPlainEnglish: ["Nature grounds you.", "Story and meaning guide you.", "You think in cycles, not straight lines."],
    },
    traits: {
      headline: "Meaning + Place",
      highlights: [
        { label: "Symbolic cognition", meaning: "You understand via story and metaphor." },
        { label: "Environmental attunement", meaning: "Place affects your clarity." },
        { label: "Present awareness", meaning: "You notice what’s happening now." },
      ],
    },
    recommendations: {
      lifestyle: ["Spend time outdoors regularly", "Journal your ‘life story’ themes", "Choose meaningful work over status"],
      places: ["Nature trails", "Starlight/night sky locations", "Cultural heritage spaces"],
      music: ["Atmospheric, story-driven sound", "Rhythms that feel ancient/grounded", "Low chaos"],
      activities: ["Hiking, camping", "Storytelling, art", "Cultural education and learning"],
    },
    strengths: ["Meaning sensing", "Grounded presence", "Pattern awareness"],
    watchouts: ["Feeling lost in modern noise", "Romanticizing meaning without action", "Isolation"],
    tryThisWeek: ["One nature trip", "Write your 3 recurring life themes", "Create one small ritual"],
    images: {
      cover: img("tjukari", "cover.jpg", "Tjukari cover image"),
      gallery: [
        img("tjukari", "detail-1.jpg", "Tjukari detail image 1"),
        img("tjukari", "detail-2.jpg", "Tjukari detail image 2"),
      ],
    },
  },

  /* =========================================================
     17) KINMORA
  ========================================================= */
  kinmora: {
    slug: "kinmora",
    codeName: "Kinmora",
    fullName: "Maya",
    origin: {
      level1: "Mesoamerica",
      lineage: [
        "Level 1: Mathematical cosmology + calendrics",
        "Level 2: Cyclical time consciousness",
        "Level 3: Precision in ritual and structure",
        "Level 4: Meaning through cycles and patterns",
      ],
    },
    snapshot:
      "Kinmora is a cycles lens: you make sense of life through patterns over time—structure, timing, and meaning linked together.",
    lens: {
      title: "The Cycles Lens",
      description:
        "You prefer systems that repeat reliably. You notice timing, structure, and the rhythm of seasons—both literally and in human behavior.",
      inPlainEnglish: ["You like planning and structure.", "Patterns over time matter to you.", "You value meaningful systems."],
    },
    traits: {
      headline: "Precision + Cycles",
      highlights: [
        { label: "Pattern mastery", meaning: "You detect repeated cycles and signals." },
        { label: "Detail orientation", meaning: "Accuracy matters." },
        { label: "Meaning structure", meaning: "Systems feel sacred when done right." },
      ],
    },
    recommendations: {
      lifestyle: ["Use calendars and cycles (weekly/monthly reviews)", "Track metrics lightly", "Choose long-term projects"],
      places: ["Historic sites", "Quiet structured spaces", "Nature with seasonal rhythm"],
      music: ["Structured instrumental", "Rhythmic repetition", "Focus music"],
      activities: ["Planning rituals", "Astronomy/learning cycles", "Craft with precision"],
    },
    strengths: ["Systems thinking", "Consistency", "Pattern detection"],
    watchouts: ["Rigidity", "Over-optimizing", "Anxiety when timing is off"],
    tryThisWeek: ["Weekly review", "Track 1 metric", "Practice one precise skill session"],
    images: {
      cover: img("kinmora", "cover.jpg", "Kinmora cover image"),
      gallery: [
        img("kinmora", "detail-1.jpg", "Kinmora detail image 1"),
        img("kinmora", "detail-2.jpg", "Kinmora detail image 2"),
      ],
    },
  },

  /* =========================================================
     18) SILJOA
  ========================================================= */
  siljoa: {
    slug: "siljoa",
    codeName: "Siljoa",
    fullName: "Inuit + Sami Fusion",
    origin: {
      level1: "Circumpolar Arctic",
      lineage: [
        "Level 1: Arctic survival intelligence",
        "Level 2: Weather/place as thinking partner",
        "Level 3: Small-group cooperation",
        "Level 4: Calm resilience under harsh conditions",
      ],
    },
    snapshot:
      "Siljoa is a climate-dialogue lens: you’re calm, adaptive, and cooperative, with a strong sense of environmental realism and small-group trust.",
    lens: {
      title: "The Climate Lens",
      description:
        "You respect conditions. You plan with reality, adapt quickly, and prefer reliable people over large crowds.",
      inPlainEnglish: ["You read environments well.", "You prefer small trusted groups.", "You stay calm under pressure."],
    },
    traits: {
      headline: "Resilience + Cooperation",
      highlights: [
        { label: "Environmental realism", meaning: "You plan with conditions in mind." },
        { label: "Steady nerves", meaning: "You remain composed." },
        { label: "Practical collaboration", meaning: "You coordinate well with a few people." },
      ],
    },
    recommendations: {
      lifestyle: ["Simplify and prepare", "Build a tight circle", "Get outdoors for regulation"],
      places: ["Nature, cold climates", "Quiet reliable spaces", "Workshops and practical environments"],
      music: ["Calm ambient", "Rhythmic, steady sound", "Low stimulation"],
      activities: ["Hiking, endurance sports", "Team-of-3 projects", "Practical crafts"],
    },
    strengths: ["Stability", "Adaptation", "Reliability"],
    watchouts: ["Isolation", "Under-sharing emotions", "Over-accepting tough conditions"],
    tryThisWeek: ["Plan one practical system", "Outdoor time 3x", "Strengthen one key relationship"],
    images: {
      cover: img("siljoa", "cover.jpg", "Siljoa cover image"),
      gallery: [
        img("siljoa", "detail-1.jpg", "Siljoa detail image 1"),
        img("siljoa", "detail-2.jpg", "Siljoa detail image 2"),
      ],
    },
  },

  /* =========================================================
     19) SKENARI
  ========================================================= */
  skenari: {
    slug: "skenari",
    codeName: "Skenari",
    fullName: "Haudenosaunee",
    origin: {
      level1: "Eastern Woodlands, North America",
      lineage: [
        "Level 1: Seventh Generation principle",
        "Level 2: Consensus governance",
        "Level 3: Peace-centered power",
        "Level 4: Future-oriented responsibility",
      ],
    },
    snapshot:
      "Skenari is a responsibility lens: you think long-term, value collective stability, and prefer systems that serve people beyond the present moment.",
    lens: {
      title: "The Responsibility Lens",
      description:
        "You’re oriented toward what lasts. Decisions should be ethical, stable, and good for the future—not just convenient now.",
      inPlainEnglish: ["You plan long-term.", "You value fairness and consensus.", "You prefer stable systems."],
    },
    traits: {
      headline: "Future + Stability",
      highlights: [
        { label: "Future orientation", meaning: "You consider long-term consequences." },
        { label: "Collaborative structure", meaning: "You prefer consensus and shared order." },
        { label: "Stability seeking", meaning: "You build systems that last." },
      ],
    },
    recommendations: {
      lifestyle: ["Use planning and governance tools", "Build community roles", "Mentor or teach"],
      places: ["Institutions, community orgs", "Civic spaces", "Nature parks and calm environments"],
      music: ["Steady grounded sound", "Community-oriented music", "Low chaos"],
      activities: ["Volunteering", "Community leadership", "Long-term projects"],
    },
    strengths: ["Ethical clarity", "Long-term thinking", "Community leadership"],
    watchouts: ["Slow decisions", "Over-responsibility", "Rigid ‘best practice’ bias"],
    tryThisWeek: ["Write a 1-year plan", "Join one community effort", "Mentor someone for 30 minutes"],
    images: {
      cover: img("skenari", "cover.jpg", "Skenari cover image"),
      gallery: [
        img("skenari", "detail-1.jpg", "Skenari detail image 1"),
        img("skenari", "detail-2.jpg", "Skenari detail image 2"),
      ],
    },
  },

  /* =========================================================
     20) ASHKARA
  ========================================================= */
  ashkara: {
    slug: "ashkara",
    codeName: "Ashkara",
    fullName: "Persian/Zoroastrian",
    origin: {
      level1: "Ancient Persia",
      lineage: [
        "Level 1: Asha (truth/order) ethics",
        "Level 2: Moral choice as sacred action",
        "Level 3: Fire symbolism (clarity/purity metaphor)",
        "Level 4: Meaning expressed through deeds",
      ],
    },
    snapshot:
      "Ashkara is an ethics-in-action lens: you care about truth, integrity, and living your values through what you do—not what you claim.",
    lens: {
      title: "The Integrity Lens",
      description:
        "You’re motivated by principles and accountability. You want your actions to match your words.",
      inPlainEnglish: ["You care about truth and order.", "You want ethics expressed through behavior.", "You respect disciplined action."],
    },
    traits: {
      headline: "Truth + Action",
      highlights: [
        { label: "Integrity drive", meaning: "You align behavior with values." },
        { label: "Meaning orientation", meaning: "You want actions to matter." },
        { label: "High output (when purposeful)", meaning: "You act decisively when it’s meaningful." },
      ],
    },
    recommendations: {
      lifestyle: ["Clarify principles", "Commit to one purposeful project", "Avoid low-integrity environments"],
      places: ["Historic spaces", "Quiet high-quality environments", "Workplaces with strong ethics"],
      music: ["Focused, intense, purposeful sound", "Ceremonial moods", "Low-noise"],
      activities: ["Volunteering, leadership", "Craft + discipline", "Learning ethics/philosophy"],
    },
    strengths: ["Integrity", "Purposeful execution", "Ethical leadership"],
    watchouts: ["Moral rigidity", "Judgment toward others", "Over-seriousness"],
    tryThisWeek: ["Write your ‘good thoughts/words/deeds’ practice", "Do one integrity action you’ve delayed", "Remove one low-integrity habit"],
    images: {
      cover: img("ashkara", "cover.jpg", "Ashkara cover image"),
      gallery: [
        img("ashkara", "detail-1.jpg", "Ashkara detail image 1"),
        img("ashkara", "detail-2.jpg", "Ashkara detail image 2"),
      ],
    },
  },
};
/**
 * Helpers
 */
export function getCodePage(slug: CodeSlug): CodePage {
  return CODE_PAGES[slug];
}

export function getAllCodeSlugs(): CodeSlug[] {
  return Object.keys(CODE_PAGES) as CodeSlug[];
}

export function isCodeSlug(slug: string): slug is CodeSlug {
  return slug in CODE_PAGES;
}
