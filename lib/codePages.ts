/**
 * lib/codePages.ts
 *
 * CONTRACT-LOCKED to:
 * - app/codepages/[slug]/CodePageClient.tsx
 * - app/codepages/[slug]/page.tsx
 *
 * Display-only. Does NOT affect scoring / algorithms.
 * 
 * CRITICAL: All keys must be lowercase to match codeMatcher.ts output
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
  fullName: string;
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
  // ========================================
  // CODE 1: KHOISAN
  // ========================================
  khoisan: {
    codeName: "khoisan",
    fullName: "Earthlistener",
    snapshot:
      "You're hyper-attuned to your environment — noticing patterns, reading energy, and moving with present-moment intelligence.",

    origin: {
      level1: "San/Khoisan",
      lineage: [
        "Environmental attunement",
        "Radical egalitarianism",
        "Present-moment survival intelligence",
        "Conflict avoidance mastery",
      ],
    },

    lens: {
      title: "Environmental Presence",
      description: "Hyper-acute perception, immediate-return thinking, conflict resolution through space.",
      inPlainEnglish: [
        "You notice environmental details others miss.",
        "You prefer resolving tension by creating space.",
        "You live in the present moment naturally.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Environmentally attuned", meaning: "You read spaces and energy shifts quickly." },
        { label: "Present-focused", meaning: "You're anchored in now, not stuck in past/future." },
        { label: "Conflict-avoidant", meaning: "You prefer space over confrontation." },
        { label: "Egalitarian", meaning: "Hierarchy feels unnatural to you." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Spend time in nature daily.",
        "Create flexible routines, not rigid schedules.",
        "Use physical movement to process stress.",
      ],
      places: [
        "Nature-rich environments",
        "Open spaces with good airflow",
        "Communities with low hierarchy",
      ],
      music: [
        "Natural soundscapes",
        "Organic rhythms",
        "Minimal electronic interference",
      ],
      activities: [
        "Hiking, foraging, outdoor sports",
        "Meditation in nature",
        "Activities requiring environmental awareness",
      ],
    },

    strengths: ["Environmental intelligence", "Present-moment awareness", "Conflict de-escalation", "Egalitarian mindset"],
    watchouts: ["Avoiding necessary confrontation", "Struggling with rigid structure", "Difficulty with long-term planning"],
    tryThisWeek: [
      "Spend 30 minutes outdoors noticing details",
      "Practice one uncomfortable conversation",
      "Set one long-term goal (3+ months out)",
    ],
  },

  // ========================================
  // CODE 2: KAYORI
  // ========================================
  kayori: {
    codeName: "kayori",
    fullName: "Fireweaver",
    snapshot:
      "You're expressive and deeply connected to collective rhythm — your energy flows through ritual, creativity, and shared meaning.",

    origin: {
      level1: "Yoruba",
      lineage: [
        "Expressive ritual creativity",
        "Destiny-aware thinking (Ori)",
        "Communal intellect (Ifá logic)",
        "Oral-intellectual tradition",
      ],
    },

    lens: {
      title: "Collective Expression",
      description: "Ritual intelligence, destiny consciousness, communal creativity.",
      inPlainEnglish: [
        "You express through shared rituals and creativity.",
        "You think about purpose and destiny naturally.",
        "You thrive in communal, expressive environments.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Ritually expressive", meaning: "You create meaning through shared practices." },
        { label: "Destiny-aware", meaning: "You think about life's purpose and direction." },
        { label: "Communally intelligent", meaning: "Your best thinking happens with others." },
        { label: "Creatively fluid", meaning: "Expression comes naturally to you." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build daily rituals that feel meaningful.",
        "Connect with creative communities.",
        "Express through art, music, or movement.",
      ],
      places: [
        "Culturally vibrant neighborhoods",
        "Places with strong artistic communities",
        "Cities with public gathering spaces",
      ],
      music: [
        "Afrobeat, highlife, jazz",
        "Rhythmically complex music",
        "Anything that invites movement",
      ],
      activities: [
        "Dance, drumming, performance",
        "Community art projects",
        "Ritual or ceremonial practices",
      ],
    },

    strengths: ["Expressive intelligence", "Ritual creation", "Community building", "Destiny consciousness"],
    watchouts: ["Over-reliance on group validation", "Difficulty with solitude", "Getting lost in symbolism"],
    tryThisWeek: [
      "Create one small daily ritual",
      "Spend time alone with your thoughts",
      "Express something without seeking feedback",
    ],
  },

  // ========================================
  // CODE 3: SAHEN
  // ========================================
  sahen: {
    codeName: "sahen",
    fullName: "HorizonWalker",
    snapshot:
      "You're introspective and self-sufficient — comfortable with solitude, vast horizons, and internal strength.",

    origin: {
      level1: "Tuareg",
      lineage: [
        "Desert wisdom and endurance",
        "Poetic introspection",
        "Nomadic autonomy",
        "Existential longing (tezmer)",
      ],
    },

    lens: {
      title: "Solitary Endurance",
      description: "Internal strength, poetic identity, comfort with vastness and solitude.",
      inPlainEnglish: [
        "You're comfortable being alone for long periods.",
        "You think poetically and abstractly.",
        "You have deep internal strength.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Introspectively strong", meaning: "Your strength comes from within." },
        { label: "Poetically minded", meaning: "You think in metaphors and meaning." },
        { label: "Autonomously driven", meaning: "You don't need constant external input." },
        { label: "Horizon-focused", meaning: "You think in long timelines and vast spaces." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Protect solo time daily.",
        "Journal or write regularly.",
        "Embrace minimalism and essentialism.",
      ],
      places: [
        "Desert or open landscapes",
        "Quiet, spacious living environments",
        "Places with long sightlines",
      ],
      music: [
        "Tuareg blues (tinariwen)",
        "Ambient, meditative music",
        "Minimal, spacious soundscapes",
      ],
      activities: [
        "Long solo walks or runs",
        "Writing, poetry, philosophy",
        "Meditation and contemplation",
      ],
    },

    strengths: ["Self-sufficiency", "Internal resilience", "Poetic thinking", "Comfort with solitude"],
    watchouts: ["Isolation", "Difficulty asking for help", "Over-romanticizing struggle"],
    tryThisWeek: [
      "Ask someone for help with something small",
      "Connect with one person meaningfully",
      "Balance solitude with brief social contact",
    ],
  },

  // ========================================
  // CODE 4: ENZUKA
  // ========================================
  enzuka: {
    codeName: "enzuka",
    fullName: "Shieldbearer",
    snapshot:
      "You lead through protective strength — creating order, safety, and collective honor through courageous action.",

    origin: {
      level1: "Maasai + Zulu Fusion",
      lineage: [
        "Warrior discipline (ubuntu)",
        "Collective honor systems",
        "Protective leadership",
        "Courage as social duty",
      ],
    },

    lens: {
      title: "Protective Leadership",
      description: "Strength through people, courage as responsibility, order through honor.",
      inPlainEnglish: [
        "You feel responsible for protecting others.",
        "You create order and safety naturally.",
        "Your strength is rooted in collective honor.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Protectively strong", meaning: "You use strength to shield others." },
        { label: "Honor-driven", meaning: "Your reputation and word matter deeply." },
        { label: "Order-creating", meaning: "You bring structure to chaos." },
        { label: "Courageously responsible", meaning: "You step up when others hesitate." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Physical training or martial practice.",
        "Take on leadership roles.",
        "Build strong community bonds.",
      ],
      places: [
        "Communities with strong social fabric",
        "Places where honor and respect are valued",
        "Cities with clear social structures",
      ],
      music: [
        "Powerful, rhythmic music",
        "Music with strong collective energy",
        "Warrior or anthem-style tracks",
      ],
      activities: [
        "Martial arts, boxing, strength training",
        "Community leadership roles",
        "Mentorship and protection work",
      ],
    },

    strengths: ["Protective instincts", "Leadership courage", "Community building", "Honor maintenance"],
    watchouts: ["Over-responsibility", "Difficulty showing vulnerability", "Rigid hierarchical thinking"],
    tryThisWeek: [
      "Share one vulnerability with someone you trust",
      "Delegate one responsibility",
      "Practice receiving help gracefully",
    ],
  },

  // ========================================
  // CODE 5: SIYUANE
  // ========================================
  siyuane: {
    codeName: "siyuane",
    fullName: "Kitsune",
    snapshot:
      "You're disciplined and tradition-minded — valuing long continuity, hierarchical order, and patient mastery.",

    origin: {
      level1: "Ethiopian + Han Chinese Fusion",
      lineage: [
        "Harmony sustained across generations",
        "Long continuity thinking",
        "Hierarchical order (li)",
        "Disciplined tradition",
      ],
    },

    lens: {
      title: "Generational Harmony",
      description: "Long-term thinking, hierarchical respect, disciplined mastery.",
      inPlainEnglish: [
        "You think in multi-generational timelines.",
        "You respect tradition and hierarchy.",
        "You're patient and disciplined.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Traditionally grounded", meaning: "You value time-tested practices." },
        { label: "Patiently disciplined", meaning: "You're willing to master things slowly." },
        { label: "Hierarchically aware", meaning: "You understand social structures naturally." },
        { label: "Generationally minded", meaning: "You think about legacy and continuity." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build rituals that connect to lineage.",
        "Practice skills requiring long-term mastery.",
        "Maintain relationships across generations.",
      ],
      places: [
        "Cities with deep historical roots",
        "Neighborhoods with multi-generational families",
        "Places with strong cultural institutions",
      ],
      music: [
        "Classical music (Chinese, Ethiopian)",
        "Traditional instrumentation",
        "Music with historical depth",
      ],
      activities: [
        "Calligraphy, traditional arts",
        "Genealogy and family history",
        "Long-term skill development (Go, chess)",
      ],
    },

    strengths: ["Long-term thinking", "Disciplined practice", "Respect for tradition", "Hierarchical intelligence"],
    watchouts: ["Rigidity", "Difficulty with rapid change", "Over-deference to authority"],
    tryThisWeek: [
      "Try one new approach outside tradition",
      "Question one inherited belief",
      "Practice adapting quickly to something unexpected",
    ],
  },

  // ========================================
  // CODE 6: JAEJIN
  // ========================================
  jaejin: {
    codeName: "jaejin",
    fullName: "Harmonist",
    snapshot:
      "You're intensely loyal and emotionally compressed — balancing respect for order with deep internal feeling (han).",

    origin: {
      level1: "Korean",
      lineage: [
        "Compressed emotion (han)",
        "Intense loyalty and diligence",
        "Hierarchical harmony",
        "Strength forged under constraint",
      ],
    },

    lens: {
      title: "Compressed Strength",
      description: "Emotional depth held with discipline, loyalty as identity, harmony through respect.",
      inPlainEnglish: [
        "You feel deeply but don't always show it.",
        "You're fiercely loyal to those you commit to.",
        "You balance respect for authority with internal strength.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Emotionally deep", meaning: "You carry more feeling than you express." },
        { label: "Fiercely loyal", meaning: "Betrayal is unthinkable to you." },
        { label: "Diligently driven", meaning: "You work harder than most." },
        { label: "Hierarchically respectful", meaning: "You honor structure while maintaining dignity." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Create outlets for emotional release (art, movement).",
        "Balance work intensity with rest.",
        "Build trust slowly with select people.",
      ],
      places: [
        "Cities with strong work ethic",
        "Neighborhoods with clear social norms",
        "Places that honor both tradition and modernity",
      ],
      music: [
        "K-pop, Korean ballads",
        "Music with emotional depth",
        "Anything with strong melodic hooks",
      ],
      activities: [
        "Intensive training (music, sports, academics)",
        "Group activities with clear goals",
        "Creative outlets for han (painting, writing)",
      ],
    },

    strengths: ["Intense loyalty", "Work ethic", "Emotional resilience", "Hierarchical intelligence"],
    watchouts: ["Burnout", "Suppressed emotions", "Over-loyalty to undeserving people"],
    tryThisWeek: [
      "Express one difficult emotion to someone safe",
      "Take one rest day without guilt",
      "Practice saying no to one request",
    ],
  },

  // ========================================
  // CODE 7: NAMSEA
  // ========================================
  namsea: {
    codeName: "namsea",
    fullName: "Flowbinder",
    snapshot:
      "You're fluid and adaptable — moving with ease, avoiding conflict, and finding balance through water-like intelligence.",

    origin: {
      level1: "Vietnamese + Thai Fusion",
      lineage: [
        "Water-based cognition (grace under movement)",
        "Calm resilience",
        "Conflict avoidance mastery",
        "Relational balance",
      ],
    },

    lens: {
      title: "Fluid Adaptation",
      description: "Water intelligence, conflict avoidance, graceful ease.",
      inPlainEnglish: [
        "You adapt naturally like water.",
        "You avoid conflict through clever maneuvering.",
        "You move through life with calm grace.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Fluidly adaptive", meaning: "You change with circumstances effortlessly." },
        { label: "Conflict-avoiding", meaning: "You find paths of least resistance." },
        { label: "Calmly resilient", meaning: "You weather storms without breaking." },
        { label: "Relationally balanced", meaning: "You keep relationships smooth." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build flexibility into your schedule.",
        "Practice water-based activities (swimming).",
        "Keep environments calm and flowing.",
      ],
      places: [
        "Waterfront locations",
        "Places with gentle social rhythms",
        "Communities that value harmony",
      ],
      music: [
        "Smooth, flowing music",
        "Chill Southeast Asian pop",
        "Anything with gentle rhythms",
      ],
      activities: [
        "Swimming, tai chi, yoga",
        "Cooking, tea ceremony",
        "Activities requiring flow state",
      ],
    },

    strengths: ["Adaptability", "Conflict resolution", "Calm under pressure", "Relational intelligence"],
    watchouts: ["Avoiding necessary confrontation", "Over-accommodation", "Lack of firm boundaries"],
    tryThisWeek: [
      "Have one direct conversation you've been avoiding",
      "Set one firm boundary",
      "Practice standing your ground on something small",
    ],
  },

  // ========================================
  // CODE 8: SHOKUNIN
  // ========================================
  shokunin: {
    codeName: "shokunin",
    fullName: "BladeSmith",
    snapshot:
      "You're at your best when you can go deep, move with intention, and produce work that feels clean, precise, and worth your name.",

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
        { label: "Craft-driven", meaning: "You're motivated by mastery and refinement, not shortcuts." },
        { label: "Detail-oriented", meaning: "You naturally spot what's off and want to improve it." },
        { label: "Focused", meaning: "Deep work suits you better than rapid context-switching." },
        { label: "High standards", meaning: "You feel best when you can ship work you'd sign your name to." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build a calm daily rhythm with deep-focus blocks.",
        "Reduce noise: fewer commitments, higher quality.",
        "Create a 'clean reset' ritual after work (10–15 min).",
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
      "Ship one thing at 'clean enough' (not perfect).",
      "Declutter one workspace surface and keep it clean for 7 days.",
    ],

    notes: [
      "Display layer only — not an identity or ancestry claim.",
      "If it doesn't resonate, adjust questions/weights; don't force-fit.",
    ],
  },

  // ========================================
  // CODE 9: KHORUUN
  // ========================================
  khoruun: {
    codeName: "khoruun",
    fullName: "SkyRider",
    snapshot:
      "You're driven by freedom and movement — thriving in open spaces, decentralized power, and nomadic intelligence.",

    origin: {
      level1: "Mongolian",
      lineage: [
        "Nomadic mobility intelligence",
        "Freedom sustained by movement",
        "Decentralized strength",
        "Horse culture (wide horizons)",
      ],
    },

    lens: {
      title: "Nomadic Freedom",
      description: "Movement as life, decentralized power, wide-horizon thinking.",
      inPlainEnglish: [
        "You need freedom and movement to thrive.",
        "You resist being pinned down or controlled.",
        "You think in vast spaces and possibilities.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Freedom-driven", meaning: "Restriction feels suffocating to you." },
        { label: "Nomadically intelligent", meaning: "You adapt quickly to new environments." },
        { label: "Decentrally minded", meaning: "You resist centralized authority." },
        { label: "Horizon-focused", meaning: "You think big and expansively." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Keep your schedule flexible.",
        "Travel regularly.",
        "Avoid long-term commitments that feel restrictive.",
      ],
      places: [
        "Open landscapes (plains, steppes)",
        "Cities with good transit and movement",
        "Anywhere you can move freely",
      ],
      music: [
        "Mongolian throat singing",
        "Epic, expansive music",
        "Anything that evokes wide spaces",
      ],
      activities: [
        "Horseback riding, cycling, motorcycling",
        "Travel and exploration",
        "Any activity with freedom of movement",
      ],
    },

    strengths: ["Adaptability", "Freedom thinking", "Quick learning", "Decentralized intelligence"],
    watchouts: ["Commitment avoidance", "Restlessness", "Difficulty with routine"],
    tryThisWeek: [
      "Commit to one small thing for 30 days",
      "Practice staying put when you want to flee",
      "Build one stabilizing routine",
    ],
  },

  // ========================================
  // CODE 10: LHUMIR
  // ========================================
  lhumir: {
    codeName: "lhumir",
    fullName: "StillMind",
    snapshot:
      "You're contemplative and inwardly calm — finding clarity through stillness, meditation, and compassion discipline.",

    origin: {
      level1: "Tibetan",
      lineage: [
        "Contemplative consciousness",
        "Impermanence worldview (anicca)",
        "Compassion discipline (karuna)",
        "Stillness that includes others",
      ],
    },

    lens: {
      title: "Contemplative Clarity",
      description: "Inner stillness, impermanence awareness, compassionate discipline.",
      inPlainEnglish: [
        "You find answers through quiet contemplation.",
        "You understand that everything changes.",
        "Your calm includes care for others.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Contemplatively calm", meaning: "Your clarity comes from stillness." },
        { label: "Impermanence-aware", meaning: "You accept change naturally." },
        { label: "Compassionately disciplined", meaning: "Your care for others is structured." },
        { label: "Internally focused", meaning: "You look inward for answers." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build daily meditation practice.",
        "Simplify your environment.",
        "Practice non-attachment to outcomes.",
      ],
      places: [
        "Mountain or high-altitude locations",
        "Quiet, contemplative environments",
        "Communities with meditation centers",
      ],
      music: [
        "Tibetan chanting, singing bowls",
        "Ambient, meditative music",
        "Silence or minimal sound",
      ],
      activities: [
        "Meditation, yoga, tai chi",
        "Philosophy and spiritual study",
        "Walking meditation, retreat work",
      ],
    },

    strengths: ["Inner clarity", "Emotional regulation", "Compassionate presence", "Acceptance of change"],
    watchouts: ["Over-detachment", "Avoidance of practical matters", "Difficulty with worldly ambition"],
    tryThisWeek: [
      "Set one concrete material goal",
      "Engage fully with one 'worldly' activity",
      "Practice attachment to something you care about",
    ],
  },

  // ========================================
  // CODE 11: YATEVAR
  // ========================================
  yatevar: {
    codeName: "yatevar",
    fullName: "CycleKeeper",
    snapshot:
      "You're philosophically deep and ritual-oriented — understanding cosmic order through duty, cycles, and layered meaning.",

    origin: {
      level1: "Indian Vedic + Nahua Fusion",
      lineage: [
        "Law as lived ritual (dharma/tonalli)",
        "Metaphysical abstraction",
        "Warrior-philosopher synthesis",
        "Cosmic order through duty",
      ],
    },

    lens: {
      title: "Cosmic Duty",
      description: "Ritual precision, dharmic order, philosophical warrior.",
      inPlainEnglish: [
        "You see life as governed by cosmic principles.",
        "You take duty and ritual seriously.",
        "You're both philosophical and action-oriented.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Philosophically grounded", meaning: "You need meaning behind action." },
        { label: "Ritually precise", meaning: "You honor form and proper action." },
        { label: "Duty-driven", meaning: "You fulfill obligations regardless of feeling." },
        { label: "Cosmically aware", meaning: "You think in terms of universal order." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build structured daily rituals.",
        "Study philosophy or spiritual texts.",
        "Balance thought with action.",
      ],
      places: [
        "Places with strong spiritual infrastructure",
        "Cities with philosophical communities",
        "Locations with ancient cultural continuity",
      ],
      music: [
        "Vedic chanting, classical Indian",
        "Sacred or ceremonial music",
        "Anything with ritual significance",
      ],
      activities: [
        "Yoga, martial arts with philosophy",
        "Study of sacred texts",
        "Ritual practice and ceremonial work",
      ],
    },

    strengths: ["Philosophical depth", "Ritual intelligence", "Duty fulfillment", "Cosmic perspective"],
    watchouts: ["Rigidity", "Over-intellectualization", "Difficulty with flexibility"],
    tryThisWeek: [
      "Do one thing spontaneously without ritual",
      "Question one deeply held belief",
      "Practice improvisation",
    ],
  },

  // ========================================
  // CODE 12: RENARA
  // ========================================
  renara: {
    codeName: "renara",
    fullName: "Harmony Weaver",
    snapshot:
      "You create stability by softening friction — you're the person who makes environments feel calmer, smoother, and more livable.",

    origin: {
      level1: "Javanese",
      lineage: [
        "Harmony-first social rhythm",
        "Soft power influence (subtle, effective)",
        "Balance + restraint (halus)",
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
        { label: "Relationally intelligent", meaning: "You value cooperation over dominance." },
        { label: "Subtly powerful", meaning: "Your influence is gentle but effective." },
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

  // ========================================
  // CODE 13: KARAYNI
  // ========================================
  karayni: {
    codeName: "karayni",
    fullName: "AncestorRoot",
    snapshot:
      "You're rooted in reciprocity and sacred balance — understanding life as relationship between humans, spirits, and land.",

    origin: {
      level1: "Balinese + Quechua Fusion",
      lineage: [
        "Sacred balance through reciprocity",
        "Mutual responsibility (ayni/tri hita karana)",
        "Communal ritual labor",
        "Land-spirit-human unity",
      ],
    },

    lens: {
      title: "Sacred Reciprocity",
      description: "Balance through offering, communal ritual, three-way harmony.",
      inPlainEnglish: [
        "You understand life as give-and-take.",
        "You honor relationships with land and spirit.",
        "You thrive in communal ritual work.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Reciprocally minded", meaning: "You honor exchange and balance." },
        { label: "Ritually engaged", meaning: "Ceremony matters to you." },
        { label: "Communally responsible", meaning: "You contribute to collective wellbeing." },
        { label: "Land-connected", meaning: "You feel relationships with place." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build practices of giving and receiving.",
        "Engage in community ritual or ceremony.",
        "Connect with your local land.",
      ],
      places: [
        "Places with strong community ritual",
        "Agricultural or land-based communities",
        "Locations with spiritual infrastructure",
      ],
      music: [
        "Gamelan, Andean folk",
        "Ceremonial or ritual music",
        "Anything that evokes communal gathering",
      ],
      activities: [
        "Community gardening, land stewardship",
        "Group ceremony or ritual",
        "Reciprocity practices (gift exchange)",
      ],
    },

    strengths: ["Reciprocity intelligence", "Ritual engagement", "Community building", "Land connection"],
    watchouts: ["Over-responsibility to tradition", "Difficulty with individualism", "Excessive obligation"],
    tryThisWeek: [
      "Do one thing for yourself without reciprocating",
      "Practice receiving without giving back immediately",
      "Set one boundary with community expectations",
    ],
  },

  // ========================================
  // CODE 14: WOHAKA
  // ========================================
  wohaka: {
    codeName: "wohaka",
    fullName: "SonglineKeeper",
    snapshot:
      "You understand existence as relationship — all beings as kin, warrior courage integrated with spiritual depth.",

    origin: {
      level1: "Maori + Lakota Fusion",
      lineage: [
        "Existence as relationship (whakapapa/mitakuye oyasin)",
        "All beings as kin",
        "Warrior-spiritual synthesis",
        "Land-identity fusion",
      ],
    },

    lens: {
      title: "Relational Existence",
      description: "Everything is related, warrior and spiritual unified, land as identity.",
      inPlainEnglish: [
        "You see all life as interconnected family.",
        "You balance warrior strength with spiritual depth.",
        "Your identity is tied to place and lineage.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Relationally holistic", meaning: "You see connections everywhere." },
        { label: "Warrior-spiritual", meaning: "You integrate courage and reverence." },
        { label: "Land-identified", meaning: "Your identity includes your place." },
        { label: "Kinship-minded", meaning: "You treat beings as relatives." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Honor your lineage and ancestors.",
        "Build warrior practices (training, courage).",
        "Connect deeply with your land.",
      ],
      places: [
        "Places with strong indigenous presence",
        "Land you can develop relationship with",
        "Communities that honor kinship",
      ],
      music: [
        "Indigenous music (haka, pow wow)",
        "Drumming and chanting",
        "Music that honors ancestors",
      ],
      activities: [
        "Martial arts, warrior training",
        "Ceremony and spiritual practice",
        "Land stewardship, genealogy work",
      ],
    },

    strengths: ["Relational intelligence", "Warrior courage", "Spiritual depth", "Land connection"],
    watchouts: ["Difficulty with urban anonymity", "Over-identification with land", "Conflating identity and place"],
    tryThisWeek: [
      "Practice thriving in an anonymous environment",
      "Build one relationship that isn't land-based",
      "Explore identity beyond place",
    ],
  },

  // ========================================
  // CODE 15: TJUKARI
  // ========================================
  tjukari: {
    codeName: "tjukari",
    fullName: "Dreampath Navigator",
    snapshot:
      "You carry deep time consciousness — understanding that land remembers through us, navigating via Songlines and Dreamtime.",

    origin: {
      level1: "Aboriginal Australian",
      lineage: [
        "Dreamtime cosmology",
        "Songline navigation",
        "Deep time consciousness (60,000+ years)",
        "Land remembers through us",
      ],
    },

    lens: {
      title: "Deep Time",
      description: "Non-linear time, land as living memory, Songline intelligence.",
      inPlainEnglish: [
        "You experience time differently than most.",
        "You understand land as alive and remembering.",
        "You navigate through story and connection.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Deep-time aware", meaning: "You think in vast timescales." },
        { label: "Land-memory intelligent", meaning: "You read stories in landscape." },
        { label: "Songline-navigating", meaning: "You understand through narrative mapping." },
        { label: "Non-linearly minded", meaning: "Past, present, future are less separate for you." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Spend time learning land stories.",
        "Practice non-linear thinking.",
        "Connect with ancient places.",
      ],
      places: [
        "Ancient landscapes with long history",
        "Places with minimal modern disruption",
        "Locations with strong land memory",
      ],
      music: [
        "Didgeridoo, traditional Aboriginal",
        "Music that evokes timelessness",
        "Natural soundscapes",
      ],
      activities: [
        "Walking meditation on land",
        "Learning local history and stories",
        "Stargazing, deep time contemplation",
      ],
    },

    strengths: ["Deep time thinking", "Land intelligence", "Narrative navigation", "Non-linear consciousness"],
    watchouts: ["Difficulty with modern time pressure", "Struggle with linear planning", "Disorientation in placeless environments"],
    tryThisWeek: [
      "Use a calendar to plan one week ahead",
      "Practice linear, sequential thinking",
      "Engage with modernity on its own terms",
    ],
  },

  // ========================================
  // CODE 16: KINMORA
  // ========================================
  kinmora: {
    codeName: "kinmora",
    fullName: "TimeArchitect",
    snapshot:
      "You're a master of cycles and precision — understanding mathematical cosmology, astronomical precision, and cyclical time.",

    origin: {
      level1: "Maya",
      lineage: [
        "Mathematical cosmology",
        "Cyclical time consciousness",
        "Astronomical precision",
        "Mastery of cycles (calendars)",
      ],
    },

    lens: {
      title: "Cyclical Mastery",
      description: "Mathematical precision, cycle awareness, cosmic timing.",
      inPlainEnglish: [
        "You understand patterns and cycles deeply.",
        "You're precise about timing and rhythm.",
        "You think mathematically about life.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Cyclically aware", meaning: "You track patterns and repetitions." },
        { label: "Mathematically precise", meaning: "You value exactness and calculation." },
        { label: "Astronomically minded", meaning: "You're attuned to cosmic timing." },
        { label: "Pattern-recognizing", meaning: "You see cycles others miss." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Track cycles (personal, natural, cosmic).",
        "Build precise routines around timing.",
        "Study systems and patterns.",
      ],
      places: [
        "Places with clear seasonal changes",
        "Cities with strong rhythm and structure",
        "Locations with astronomical significance",
      ],
      music: [
        "Mathematically structured music",
        "Polyrhythmic compositions",
        "Music with clear cyclical patterns",
      ],
      activities: [
        "Astronomy, astrology, calendar work",
        "Mathematics, systems thinking",
        "Cycle tracking and pattern analysis",
      ],
    },

    strengths: ["Pattern recognition", "Cyclical thinking", "Mathematical precision", "Timing intelligence"],
    watchouts: ["Over-reliance on patterns", "Difficulty with randomness", "Excessive structure"],
    tryThisWeek: [
      "Do one spontaneous thing outside your cycle",
      "Practice embracing randomness",
      "Let one pattern break without fixing it",
    ],
  },

  // ========================================
  // CODE 17: SILJOA
  // ========================================
  siljoa: {
    codeName: "siljoa",
    fullName: "FrostSentinel",
    snapshot:
      "You live in dialogue with climate and place — treating environment as thinking partner, with Arctic survival intelligence.",

    origin: {
      level1: "Inuit + Sami Fusion",
      lineage: [
        "Climate as thinking partner",
        "Arctic survival intelligence",
        "Environmental attunement",
        "Cooperation with harsh conditions",
      ],
    },

    lens: {
      title: "Climate Partnership",
      description: "Environmental dialogue, survival intelligence, climate attunement.",
      inPlainEnglish: [
        "You work with environment, not against it.",
        "You read weather and climate naturally.",
        "You thrive by partnering with place.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Environmentally dialogical", meaning: "You treat place as partner." },
        { label: "Survival-intelligent", meaning: "You adapt to harsh conditions." },
        { label: "Climate-attuned", meaning: "You read weather and environment." },
        { label: "Cooperatively resilient", meaning: "You survive through partnership." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build relationship with your local climate.",
        "Practice environmental awareness daily.",
        "Learn survival skills for your region.",
      ],
      places: [
        "Cold or challenging climates",
        "Places with strong environmental presence",
        "Locations requiring climate adaptation",
      ],
      music: [
        "Throat singing, Nordic folk",
        "Music reflecting environmental harshness",
        "Natural soundscapes",
      ],
      activities: [
        "Outdoor survival skills",
        "Cold-weather activities",
        "Environmental observation and tracking",
      ],
    },

    strengths: ["Environmental intelligence", "Survival skills", "Climate adaptation", "Partnership thinking"],
    watchouts: ["Difficulty in comfortable environments", "Over-preparation", "Struggle with ease"],
    tryThisWeek: [
      "Practice being comfortable with ease",
      "Relax in a mild environment",
      "Do something without preparation",
    ],
  },

  // ========================================
  // CODE 18: SKENARI
  // ========================================
  skenari: {
    codeName: "skenari",
    fullName: "FutureGuardian",
    snapshot:
      "You think seven generations ahead — holding responsibility to the unborn, practicing consensus governance and future ethics.",

    origin: {
      level1: "Haudenosaunee",
      lineage: [
        "Seventh Generation principle",
        "Responsibility to the unborn",
        "Consensus governance",
        "Future-oriented ethics",
      ],
    },

    lens: {
      title: "Future Responsibility",
      description: "Seven-generation thinking, consensus governance, ethical future-building.",
      inPlainEnglish: [
        "You think about long-term consequences naturally.",
        "You feel responsible for future generations.",
        "You value consensus and collective decision-making.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Future-oriented", meaning: "You think generations ahead." },
        { label: "Ethically responsible", meaning: "You consider impact on those unborn." },
        { label: "Consensus-building", meaning: "You value collective agreement." },
        { label: "Guardianship-minded", meaning: "You protect what's not yet here." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Make decisions considering seven generations.",
        "Practice consensus in your communities.",
        "Invest in long-term sustainability.",
      ],
      places: [
        "Communities with strong governance",
        "Places that value long-term thinking",
        "Locations practicing sustainability",
      ],
      music: [
        "Indigenous American music",
        "Music about legacy and future",
        "Ceremonial or council music",
      ],
      activities: [
        "Environmental stewardship",
        "Governance and consensus work",
        "Future planning and legacy building",
      ],
    },

    strengths: ["Long-term thinking", "Ethical responsibility", "Consensus building", "Future guardianship"],
    watchouts: ["Neglecting present needs", "Paralysis by future-thinking", "Difficulty with short-term decisions"],
    tryThisWeek: [
      "Make one decision for immediate benefit",
      "Enjoy something ephemeral",
      "Practice present-moment focus",
    ],
  },

  // ========================================
  // CODE 19: ASHKARA
  // ========================================
  ashkara: {
    codeName: "ashkara",
    fullName: "TruthForger",
    snapshot:
      "You enact truth through ethical choice — believing truth is not just believed but embodied through moral action and fire symbolism.",

    origin: {
      level1: "Persian/Zoroastrian",
      lineage: [
        "Truth enacted not believed (asha)",
        "Moral choice as sacred action",
        "Ethical dualism (good thoughts, words, deeds)",
        "Fire as purifying principle",
      ],
    },

    lens: {
      title: "Enacted Truth",
      description: "Moral clarity, ethical action, truth embodied.",
      inPlainEnglish: [
        "You believe truth must be lived, not just believed.",
        "You're driven by moral clarity.",
        "You choose good actively, not passively.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Ethically driven", meaning: "Morality guides your decisions." },
        { label: "Truth-embodying", meaning: "You enact principles, not just believe them." },
        { label: "Dualistically clear", meaning: "You see good and evil distinctly." },
        { label: "Action-oriented", meaning: "Your ethics demand action." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Act on your principles consistently.",
        "Practice moral courage daily.",
        "Purify through action, not just thought.",
      ],
      places: [
        "Places with strong ethical culture",
        "Communities that value integrity",
        "Locations with clear moral leadership",
      ],
      music: [
        "Persian classical, devotional music",
        "Music with moral or epic themes",
        "Anything that inspires righteousness",
      ],
      activities: [
        "Ethical action and activism",
        "Fire ceremony or ritual",
        "Practices requiring moral courage",
      ],
    },

    strengths: ["Moral clarity", "Ethical courage", "Truth embodiment", "Principled action"],
    watchouts: ["Moral rigidity", "Dualistic thinking", "Difficulty with moral ambiguity"],
    tryThisWeek: [
      "Sit with one moral ambiguity",
      "Practice compassion for moral failure (yours or others)",
      "Embrace one gray area",
    ],
  },

  // ========================================
  // CODE 20: ALETHIR
  // ========================================
  alethir: {
    codeName: "alethir",
    fullName: "Seeker",
    snapshot:
      "You pursue truth through inquiry and dialogue — believing reality emerges through reasoning, debate, and logos-centered thinking.",

    origin: {
      level1: "Ancient Greek",
      lineage: [
        "Truth emerges through inquiry (aletheia)",
        "Reasoning and dialogue (dialectic)",
        "Logos-centered thinking",
        "Philosophy as way of life",
      ],
    },

    lens: {
      title: "Inquiry & Reason",
      description: "Truth through questioning, dialectical thinking, philosophical pursuit.",
      inPlainEnglish: [
        "You find truth through asking questions.",
        "You think best through dialogue and debate.",
        "Philosophy is how you understand life.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Inquiry-driven", meaning: "You question to understand." },
        { label: "Dialectically minded", meaning: "You think through conversation." },
        { label: "Reason-centered", meaning: "Logic and logos guide you." },
        { label: "Philosophically oriented", meaning: "You seek wisdom actively." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Engage in regular philosophical discussion.",
        "Question your assumptions actively.",
        "Study logic and reasoning.",
      ],
      places: [
        "Cities with strong intellectual culture",
        "Places with philosophical communities",
        "University towns or cultural centers",
      ],
      music: [
        "Classical Greek, structured music",
        "Anything that aids contemplation",
        "Music with intellectual depth",
      ],
      activities: [
        "Philosophy study and discussion",
        "Debate and dialectical practice",
        "Reading and intellectual pursuit",
      ],
    },

    strengths: ["Reasoning ability", "Philosophical depth", "Dialectical skill", "Inquiry mindset"],
    watchouts: ["Over-intellectualization", "Analysis paralysis", "Difficulty with feeling-based knowing"],
    tryThisWeek: [
      "Make one decision from gut feeling, not logic",
      "Practice accepting without understanding",
      "Trust one thing you can't reason through",
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
