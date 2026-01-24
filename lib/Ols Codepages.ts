/**
 * lib/codePages.ts
 *
 * CONTRACT-LOCKED to:
 * - app/codepages/[slug]/CodePageClient.tsx
 * - app/codepages/[slug]/page.tsx
 *
 * Display-only. Does NOT affect scoring / algorithms.
 *
 * CRITICAL: All keys must match codeMatcher.ts exactly (lowercase except Tahiri)
 *
 * ✅ Backwards-compatible upgrade:
 * - Keeps existing fields used by current UI
 * - Adds OPTIONAL richer fields per code (deepDive, musicGenres w/ Spotify links, etc.)
 * - You can update CodePageClient later to render these richer fields
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
  music: string[]; // legacy string list (kept for compatibility)
  activities: string[];
}

/** NEW (optional): Spotify genre linking + richer music direction */
export interface CodeMusicGenre {
  genre: string; // label shown to user
  spotifySearch: string; // clickable URL (Spotify search)
  why?: string; // short reason
  starterArtists?: string[]; // optional hints
}

/** NEW (optional): Weekly focus that isn't generic "one move" */
export interface CodeFocusThisWeek {
  title: string;
  intention: string;
  actions: string[];
  frictionToExpect?: string[];
  successSignal?: string[];
}

/** NEW (optional): Long-form narrative + practical depth */
export interface CodeDeepDiveSection {
  title: string;
  body: string;
  bullets?: string[];
}
export interface CodeDeepDive {
  essence: string;
  sections: CodeDeepDiveSection[];
  shadowPatterns?: string[];
  misalignmentSigns?: string[];
  alignmentSignals?: string[];
}

/** NEW (optional): lifestyle “modules” per code */
export interface CodeRitual {
  title: string;
  why: string;
  steps: string[];
}
export interface CodeWorkStyle {
  thrivesIn: string[];
  strugglesIn: string[];
  bestRoles: string[];
  collaboration: string[];
}
export interface CodeRelationships {
  youNeed: string[];
  youGive: string[];
  watchFor: string[];
  repairMoves: string[];
}
export interface CodeTravelMode {
  bestTrips: string[];
  avoidTrips: string[];
  packingPhilosophy: string[];
  itineraryStyle: string[];
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
  tryThisWeek: string[]; // legacy (kept)

  notes?: string[];

  // ✅ New optional depth fields (safe to add)
  musicGenres?: CodeMusicGenre[];
  focusThisWeek?: CodeFocusThisWeek;
  deepDive?: CodeDeepDive;
  rituals?: CodeRitual[];
  workStyle?: CodeWorkStyle;
  relationships?: CodeRelationships;
  travelMode?: CodeTravelMode;
}

/** Spotify search helper (safe for server + client) */
function spotifySearchUrl(query: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}

/**
 * NOTE:
 * - Keep keys exactly as matcher expects (slug keys)
 * - Tahiri must stay with uppercase key if your matcher expects that
 */
export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  // ========================================
  // CODE 1: KHOISAN
  // ========================================
  khoisan: {
    codeName: "khoisan",
    fullName: "Earthlistener",
    snapshot:
      "Hyper-attuned to environment and subtle shifts — you read space, energy, and timing with present-moment intelligence.",

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
      description:
        "You sense the world through micro-details: airflow, texture, tone, distance, exits, tension. You regulate by adjusting space.",
      inPlainEnglish: [
        "You notice what others ignore: subtle shifts in mood, light, and physical environment.",
        "You resolve tension by changing distance, pacing, or setting — not by escalating words.",
        "You’re at your best when life is simple, direct, and physically grounded.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Environmentally attuned", meaning: "You read spaces and energy shifts quickly — like a sensor." },
        { label: "Present-focused", meaning: "You live in now; long-term abstraction drains you unless grounded." },
        { label: "Conflict-de-escalator", meaning: "You reduce heat by changing space, not ‘winning’ arguments." },
        { label: "Egalitarian", meaning: "Hierarchy feels unnatural; respect is earned through behavior." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Daily nature contact (even 10 minutes). Your nervous system calibrates through real air + real light.",
        "Flexible rhythm > rigid schedule. Use anchors (morning, sunset), not strict blocks.",
        "Process stress through movement (walk, swim, mobility). Don’t try to ‘think it away’.",
      ],
      places: [
        "Nature-rich environments (parks, coastlines, hills) — places where your senses can breathe.",
        "Homes with airflow + light; avoid cramped, cluttered, noisy rooms.",
        "Communities with low status-games: makers, outdoors groups, calm creatives.",
      ],
      music: [
        "Organic minimal: low distraction, high texture.",
        "Natural soundscapes + subtle percussion.",
        "Ambient that feels like weather, not performance.",
      ],
      activities: [
        "Hiking, foraging, trail running, snorkeling — anything that rewards awareness.",
        "Slow observation (birding, photography walks, landscape sketching).",
        "Skill loops that sharpen sensing: archery, climbing, surfing, freedive drills.",
      ],
    },

    musicGenres: [
      { genre: "Organic Ambient", spotifySearch: spotifySearchUrl("Organic ambient"), why: "Textural calm without mental clutter." },
      { genre: "Nature Soundscapes", spotifySearch: spotifySearchUrl("Nature soundscapes"), why: "Regulates your baseline fast." },
      { genre: "Minimal Percussion", spotifySearch: spotifySearchUrl("Minimal percussion"), why: "Rhythm without noise." },
      { genre: "Downtempo", spotifySearch: spotifySearchUrl("Downtempo"), why: "Grounding pulse for movement." },
    ],

    strengths: [
      "Environmental intelligence",
      "Present-moment awareness",
      "Conflict de-escalation",
      "Egalitarian mindset",
      "Fast pattern sensing (space + people)",
    ],

    watchouts: [
      "Avoiding necessary confrontation until it becomes unavoidable",
      "Struggling with rigid structure or bureaucracy",
      "Under-planning (future feels unreal until it arrives)",
      "Over-stimulation in dense urban or loud social settings",
    ],

    // Legacy list (kept) — now written as *non-generic*, code-specific micro-protocols
    tryThisWeek: [
      "30-minute ‘Earth Scan’: outdoors, no headphones. Notice 10 details (wind, light, temperature, textures). Write them down.",
      "Tension protocol: next time you feel social heat, don’t argue — change *space* first (walk, step outside, slow breathing). Then speak.",
      "Future anchor: pick one 3-month goal and attach it to a physical habit (e.g., walk every Tue/Thu to plan it).",
    ],

    focusThisWeek: {
      title: "Calm authority through space",
      intention: "You don’t need sharper words — you need better positioning and pacing.",
      actions: [
        "Before difficult convos: walk 5 minutes first. Enter slower than you want to.",
        "Choose the setting (quiet corner, outdoors, side-by-side seating).",
        "Speak in shorter lines, pause longer than feels normal.",
      ],
      frictionToExpect: ["You may feel ‘avoidant’ at first — it’s actually regulation."],
      successSignal: ["Conversations end without adrenaline spikes. You feel clean after."],
    },

    deepDive: {
      essence:
        "Earthlistener is a sensing-based archetype: you read reality through environment, and you create safety by shaping space.",
      sections: [
        {
          title: "How you perceive",
          body:
            "You’re built for subtle inputs. You track micro-signals unconsciously: shifts in tone, posture, noise, proximity. This isn’t anxiety — it’s a high-resolution nervous system.",
          bullets: [
            "You detect changes early (before people ‘name’ them).",
            "You trust what you sense more than what people claim.",
            "You prefer direct experience over theory.",
          ],
        },
        {
          title: "How you decide",
          body:
            "You decide by moving closer to what feels clean and stepping away from what feels distorted. When forced into rigid logic games, you’ll disengage — not because you can’t, but because it’s the wrong medium.",
        },
        {
          title: "When you’re misaligned",
          body:
            "You get trapped indoors, overloaded by noise and social demands, and your sensing turns into irritation. You withdraw, avoid confrontation, then silently resent.",
          bullets: ["Low patience", "Short fuse in crowded spaces", "‘I can’t breathe’ feeling", "Avoiding messages/calls"],
        },
      ],
      shadowPatterns: [
        "Space-as-avoidance (using distance to dodge truth)",
        "Over-reading signals and assuming intent",
        "Future denial (letting problems arrive unprepared)",
      ],
      misalignmentSigns: ["Constant indoor time", "High social noise", "Too many obligations", "No movement"],
      alignmentSignals: ["Nature contact", "Simple routines", "Movement", "Few high-trust relationships"],
    },

    rituals: [
      {
        title: "Evening sensory reset (10 minutes)",
        why: "Turns off hyper-vigilance and returns you to baseline.",
        steps: [
          "Lights low. Phone away.",
          "Stretch shoulders/neck slowly (no intensity).",
          "Drink water, then step outside for 2 minutes.",
          "Name 3 things you sensed today that were true.",
        ],
      },
    ],

    workStyle: {
      thrivesIn: ["Autonomy", "Field work / real-world inputs", "Low politics", "Clear scope"],
      strugglesIn: ["Constant meetings", "Performative culture", "Noisy open offices", "Micromanagement"],
      bestRoles: ["Ops in real environments", "Design/UX research", "Outdoor/field roles", "Craft + systems roles"],
      collaboration: ["Small teams, calm leaders, clear agreements, minimal hierarchy games"],
    },

    relationships: {
      youNeed: ["Space", "Quiet honesty", "Non-reactive partners", "Permission to decompress"],
      youGive: ["Safety, calm, grounded presence", "Early warning signals", "Practical care"],
      watchFor: ["People who escalate conflict for stimulation", "Partners who punish your need for space"],
      repairMoves: ["Walk-and-talk", "Side-by-side conversations", "Short texts that set a time/place to talk"],
    },

    travelMode: {
      bestTrips: ["Nature-based resets", "Slow coastal towns", "Hikes + simple food", "Minimal itinerary"],
      avoidTrips: ["Packed multi-city tours", "Nightlife-heavy schedules", "Constant group travel"],
      packingPhilosophy: ["Comfort + mobility > fashion", "One good jacket, one good shoe, layers."],
      itineraryStyle: ["2 anchors/day max. Leave gaps for sensing and wandering."],
    },
  },

  // ========================================
  // CODE 2: KAYORI
  // ========================================
  kayori: {
    codeName: "kayori",
    fullName: "Fireweaver",
    snapshot:
      "Expressive and rhythm-connected — you create meaning through ritual, story, creativity, and shared emotional heat.",

    origin: {
      level1: "Yoruba",
      lineage: ["Expressive ritual creativity", "Destiny-aware thinking (Ori)", "Communal intellect (Ifá logic)", "Oral tradition"],
    },

    lens: {
      title: "Collective Expression",
      description:
        "You metabolize life through rhythm and shared meaning. You don’t just ‘feel’ — you translate emotion into culture: ritual, art, movement, story.",
      inPlainEnglish: [
        "You recharge through shared expression (music, dance, gatherings).",
        "You naturally think about purpose and ‘path’ — you want life to mean something.",
        "Your confidence rises when your expression lands with real people (not metrics).",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Ritually expressive", meaning: "You create meaning through repeatable practices, not random vibes." },
        { label: "Destiny-aware", meaning: "You track purpose — what your life is ‘for’." },
        { label: "Communal intelligence", meaning: "Your best thinking happens with others in motion." },
        { label: "Creative heat", meaning: "You spark rooms when you’re aligned." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Create daily ritual anchors (morning music, evening reflection, weekly gathering).",
        "Choose communities where expression is normal — not embarrassing.",
        "Build creative output into your identity (even small: 20 mins/day).",
      ],
      places: [
        "Culturally vibrant neighborhoods",
        "Cities with street life and public gathering",
        "Places where music is part of daily rhythm",
      ],
      music: [
        "Afrobeats, Amapiano, Highlife",
        "Jazz-influenced grooves",
        "Rhythm-forward music that invites movement",
      ],
      activities: ["Dance, drums, performance", "Community art", "Hosting + curating gatherings", "Storytelling"],
    },

    musicGenres: [
      { genre: "Afrobeats", spotifySearch: spotifySearchUrl("Afrobeats"), why: "Collective rhythm + emotional lift." },
      { genre: "Amapiano", spotifySearch: spotifySearchUrl("Amapiano"), why: "Flow-state grooves, social warmth." },
      { genre: "Highlife", spotifySearch: spotifySearchUrl("Highlife"), why: "Bright tradition-modern blend." },
      { genre: "Jazz Funk", spotifySearch: spotifySearchUrl("Jazz funk"), why: "Complex rhythm without chaos." },
    ],

    strengths: ["Expressive intelligence", "Ritual creation", "Community building", "Purpose awareness"],
    watchouts: ["Over-reliance on group validation", "Difficulty with solitude", "Getting lost in symbolism instead of action"],
    tryThisWeek: [
      "Design a 7-day ritual loop: (1) morning song (2) midday check-in (3) evening gratitude. Keep it tiny.",
      "Create one ‘no-feedback’ output: write/record/make something and don’t share it for 48 hours.",
      "Book one social session where you lead the vibe (playlist + location + time).",
    ],
  },

  // ========================================
  // CODE 3: SAHEN
  // ========================================
  sahen: {
    codeName: "sahen",
    fullName: "HorizonWalker",
    snapshot: "Self-sufficient, poetic, endurance-built — you’re comfortable with solitude, vastness, and inner strength.",

    origin: {
      level1: "Tuareg",
      lineage: ["Desert endurance", "Poetic introspection", "Nomadic autonomy", "Existential longing (tezmer)"],
    },

    lens: {
      title: "Solitary Endurance",
      description: "Internal strength, poetic identity, comfort with vastness and solitude.",
      inPlainEnglish: [
        "You’re comfortable being alone for long periods.",
        "You think in metaphors and meaning.",
        "You carry quiet resilience that others underestimate.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Introspectively strong", meaning: "Your strength is internal — not dependent on praise." },
        { label: "Poetically minded", meaning: "You naturally translate life into symbols and story." },
        { label: "Autonomously driven", meaning: "You prefer self-direction over external management." },
        { label: "Horizon-focused", meaning: "You think in long timelines and big landscapes." },
      ],
    },

    recommendations: {
      lifestyle: ["Protect solo time daily.", "Write/journal regularly.", "Embrace minimalism and essentials."],
      places: ["Open landscapes", "Quiet spacious homes", "Places with long sightlines"],
      music: ["Desert blues", "Ambient spacious soundscapes", "Minimal, wide mixes"],
      activities: ["Long solo walks", "Writing/poetry", "Meditation and contemplation"],
    },

    musicGenres: [
      { genre: "Desert Blues", spotifySearch: spotifySearchUrl("Desert blues"), why: "Vastness + grit + beauty." },
      { genre: "Ambient", spotifySearch: spotifySearchUrl("Ambient"), why: "Space to think without pressure." },
      { genre: "Minimalism", spotifySearch: spotifySearchUrl("Minimalism music"), why: "Clarity and restraint." },
      { genre: "Post-Rock (slow)", spotifySearch: spotifySearchUrl("Slow post-rock"), why: "Long arcs, big horizons." },
    ],

    strengths: ["Self-sufficiency", "Internal resilience", "Poetic thinking", "Comfort with solitude"],
    watchouts: ["Isolation", "Difficulty asking for help", "Romanticizing struggle"],
    tryThisWeek: [
      "Ask for help once — small, specific, non-dramatic. Let someone support you.",
      "Schedule a ‘horizon hour’: one uninterrupted hour to think long-term (write, plan, dream).",
      "Balance solitude with one meaningful social touchpoint (1:1, not group).",
    ],
  },

  // ========================================
  // CODE 4: ENZUKA
  // ========================================
  enzuka: {
    codeName: "enzuka",
    fullName: "Shieldbearer",
    snapshot: "Protective leader energy — you create order, safety, and collective honor through courageous action.",

    origin: {
      level1: "Maasai + Zulu Fusion",
      lineage: ["Warrior discipline", "Collective honor", "Protective leadership", "Courage as duty"],
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
        { label: "Honor-driven", meaning: "Your word and reputation matter deeply." },
        { label: "Order-creating", meaning: "You bring structure to chaos." },
        { label: "Courageously responsible", meaning: "You step up when others hesitate." },
      ],
    },

    recommendations: {
      lifestyle: ["Physical training.", "Lead where needed.", "Build strong community bonds."],
      places: ["Communities with strong social fabric", "Places where respect is real", "Clear social structure environments"],
      music: ["Anthemic rhythms", "Powerful drums", "Collective-energy tracks"],
      activities: ["Strength training", "Mentorship", "Leadership roles"],
    },

    musicGenres: [
      { genre: "War Drums", spotifySearch: spotifySearchUrl("War drums"), why: "Activates protective courage." },
      { genre: "Anthemic Hip Hop", spotifySearch: spotifySearchUrl("Anthemic hip hop"), why: "Leadership charge." },
      { genre: "Afro Tribal", spotifySearch: spotifySearchUrl("Afro tribal"), why: "Collective rhythm + identity." },
      { genre: "Epic Soundtracks", spotifySearch: spotifySearchUrl("Epic soundtrack"), why: "Duty + resolve." },
    ],

    strengths: ["Protective instincts", "Leadership courage", "Community building", "Honor maintenance"],
    watchouts: ["Over-responsibility", "Difficulty showing vulnerability", "Rigid hierarchy thinking"],
    tryThisWeek: [
      "Show one controlled vulnerability (not a collapse): name what’s heavy and what you need.",
      "Delegate one responsibility and tolerate the discomfort of ‘not carrying everything’.",
      "Practice asking before acting: ‘Do you want protection, advice, or presence?’",
    ],
  },

  // ========================================
  // CODE 5: SIYUANE
  // ========================================
  siyuane: {
    codeName: "siyuane",
    fullName: "Kitsune",
    snapshot: "Continuity-minded and disciplined — you value tradition, hierarchy, and patient mastery across generations.",

    origin: {
      level1: "Ethiopian + Han Chinese Fusion",
      lineage: ["Harmony across generations", "Continuity thinking", "Hierarchical order (li)", "Disciplined tradition"],
    },

    lens: {
      title: "Generational Harmony",
      description: "Long-term thinking, hierarchical respect, disciplined mastery.",
      inPlainEnglish: [
        "You think in multi-generational timelines.",
        "You respect tradition and hierarchy.",
        "You’re patient and disciplined.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Traditionally grounded", meaning: "You value time-tested practices." },
        { label: "Patiently disciplined", meaning: "You master slowly, properly." },
        { label: "Hierarchically aware", meaning: "You understand structure naturally." },
        { label: "Legacy-minded", meaning: "You think about continuity and impact." },
      ],
    },

    recommendations: {
      lifestyle: ["Rituals connected to lineage.", "Long-term skill mastery.", "Maintain cross-generational relationships."],
      places: ["Historic cities", "Cultural institutions", "Multi-generational neighborhoods"],
      music: ["Traditional instrumentation", "Classical forms", "Historical depth"],
      activities: ["Calligraphy/traditional arts", "Genealogy", "Go/chess/long mastery games"],
    },

    musicGenres: [
      { genre: "Traditional Classical", spotifySearch: spotifySearchUrl("Traditional classical"), why: "Structure and continuity." },
      { genre: "Chinese Traditional", spotifySearch: spotifySearchUrl("Chinese traditional music"), why: "Order + refinement." },
      { genre: "Ethiopian Jazz", spotifySearch: spotifySearchUrl("Ethiopian jazz"), why: "Tradition with intelligence." },
      { genre: "Modern Classical", spotifySearch: spotifySearchUrl("Modern classical"), why: "Discipline without stiffness." },
    ],

    strengths: ["Long-term thinking", "Disciplined practice", "Respect for tradition", "Structural intelligence"],
    watchouts: ["Rigidity", "Difficulty with rapid change", "Over-deference to authority"],
    tryThisWeek: [
      "Try one new method inside a familiar ritual (same goal, different path).",
      "Challenge one inherited ‘must’ and replace it with a chosen principle.",
      "Practice speed once: do something in 20 minutes that you’d normally perfect.",
    ],
  },

  // ========================================
  // CODE 6: JAEJIN
  // ========================================
  jaejin: {
    codeName: "jaejin",
    fullName: "Harmonist",
    snapshot: "Loyal and emotionally deep — you hold a lot inside, balancing discipline with intense internal feeling.",

    origin: {
      level1: "Korean",
      lineage: ["Compressed emotion (han)", "Intense loyalty", "Hierarchical harmony", "Strength under constraint"],
    },

    lens: {
      title: "Compressed Strength",
      description: "Emotional depth held with discipline, loyalty as identity, harmony through respect.",
      inPlainEnglish: [
        "You feel deeply but don’t always show it.",
        "You’re fiercely loyal once committed.",
        "You navigate structure with dignity and self-control.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Emotionally deep", meaning: "More feeling than expression." },
        { label: "Fiercely loyal", meaning: "Commitment is sacred." },
        { label: "Diligently driven", meaning: "You outwork most people." },
        { label: "Respectful strength", meaning: "You honor structure without losing self." },
      ],
    },

    recommendations: {
      lifestyle: ["Creative outlet for release.", "Balance intensity with rest.", "Build trust slowly with select people."],
      places: ["Work-ethic cultures", "Clear norms", "Tradition + modern blend"],
      music: ["Emotional melodic music", "Ballads / cathartic pop", "Strong hooks"],
      activities: ["Training", "Goal-based groups", "Creative release (writing/art)"],
    },

    musicGenres: [
      { genre: "K-R&B", spotifySearch: spotifySearchUrl("K-R&B"), why: "Emotion without chaos." },
      { genre: "Korean Ballads", spotifySearch: spotifySearchUrl("Korean ballads"), why: "Catharsis and han release." },
      { genre: "Alt Pop", spotifySearch: spotifySearchUrl("Korean alt pop"), why: "Depth + modern edge." },
      { genre: "Cinematic Pop", spotifySearch: spotifySearchUrl("Cinematic pop"), why: "Emotional arc." },
    ],

    strengths: ["Loyalty", "Work ethic", "Emotional resilience", "Structural intelligence"],
    watchouts: ["Burnout", "Suppressed emotions", "Over-loyalty to undeserving people"],
    tryThisWeek: [
      "Name one emotion out loud to someone safe (no explanation needed — just name it).",
      "Take one rest block and treat it as training (recovery is discipline).",
      "Practice saying ‘I can’t’ once without apologizing.",
    ],
  },

  // ========================================
  // CODE 7: NAMSEA
  // ========================================
  namsea: {
    codeName: "namsea",
    fullName: "Flowbinder",
    snapshot: "Adaptable and fluid — you navigate life like water, preserving harmony through graceful movement.",

    origin: {
      level1: "Vietnamese + Thai Fusion",
      lineage: ["Water cognition", "Calm resilience", "Conflict avoidance mastery", "Relational balance"],
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
        { label: "Harmony keeper", meaning: "You reduce friction and smooth edges." },
        { label: "Calm resilience", meaning: "You weather storms without breaking." },
        { label: "Relational balance", meaning: "You keep relationships flowing." },
      ],
    },

    recommendations: {
      lifestyle: ["Flex in schedule.", "Water-based activities.", "Calm environments."],
      places: ["Waterfront locations", "Gentle social rhythms", "Harmony-valuing communities"],
      music: ["Soft grooves", "Chill SEA pop", "Gentle rhythms"],
      activities: ["Swimming/yoga", "Cooking/tea", "Flow-state hobbies"],
    },

    musicGenres: [
      { genre: "Chillhop", spotifySearch: spotifySearchUrl("Chillhop"), why: "Flow-state baseline." },
      { genre: "Downtempo", spotifySearch: spotifySearchUrl("Downtempo"), why: "Gentle pulse." },
      { genre: "City Pop", spotifySearch: spotifySearchUrl("City pop"), why: "Smooth optimism." },
      { genre: "Thai Indie", spotifySearch: spotifySearchUrl("Thai indie"), why: "Light, modern softness." },
    ],

    strengths: ["Adaptability", "Conflict resolution", "Calm under pressure", "Relational intelligence"],
    watchouts: ["Avoiding necessary confrontation", "Over-accommodation", "Weak boundaries"],
    tryThisWeek: [
      "Say one clear ‘no’ (short sentence). Don’t over-explain.",
      "Have one direct conversation you’ve been smoothing over.",
      "Choose one non-negotiable habit and keep it for 7 days.",
    ],
  },

  // ========================================
  // CODE 8: SHOKUNIN
  // ========================================
  shokunin: {
    codeName: "shokunin",
    fullName: "BladeSmith",
    snapshot:
      "You go deep, move with intention, and produce work that feels clean, precise, and worth your name.",

    origin: {
      level1: "Japanese",
      lineage: ["Craft devotion", "Discipline through repetition", "Precision culture", "Quiet excellence"],
    },

    lens: {
      title: "Quiet Mastery",
      description:
        "You don’t chase hype — you chase refinement. Your confidence grows from repetition, standards, and depth.",
      inPlainEnglish: [
        "You care about quality more than speed.",
        "You notice details that most people skip.",
        "You work best with focus, clean inputs, and clear standards.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Craft-driven", meaning: "Mastery and refinement motivate you more than shortcuts." },
        { label: "Detail-oriented", meaning: "You spot what’s off and want to improve it." },
        { label: "Deep focus", meaning: "You prefer sustained work over constant switching." },
        { label: "High standards", meaning: "You want to ship work you’d sign your name to." },
      ],
    },

    recommendations: {
      lifestyle: [
        "Deep-focus blocks + recovery (clean rhythm).",
        "Reduce noise: fewer commitments, higher quality.",
        "A ‘clean reset’ ritual after work (10–15 mins).",
      ],
      places: [
        "Quiet, design-forward neighborhoods with steady rhythm.",
        "Studios/libraries, spaces with good light and fewer distractions.",
        "Nature resets: parks, coastlines, slow mornings.",
      ],
      music: [
        "Instrumental focus (lo-fi, ambient, minimal).",
        "Modern classical / clean-structure electronic.",
        "Anything precise rather than chaotic.",
      ],
      activities: [
        "Skill-based crafts (cooking, design, coding, photography).",
        "Technique-first training (climbing, yoga alignment, form lifting).",
        "Workshops where mastery compounds.",
      ],
    },

    musicGenres: [
      { genre: "Minimal Techno", spotifySearch: spotifySearchUrl("Minimal techno"), why: "Precision rhythm, low clutter." },
      { genre: "Ambient Focus", spotifySearch: spotifySearchUrl("Ambient focus"), why: "Deep work scaffolding." },
      { genre: "Modern Classical", spotifySearch: spotifySearchUrl("Modern classical"), why: "Structure + emotion." },
      { genre: "Lo-Fi Instrumental", spotifySearch: spotifySearchUrl("Lofi instrumental"), why: "Steady concentration." },
    ],

    strengths: ["Attention to detail", "Consistency", "Mastering complex systems", "Responsibility"],
    watchouts: ["Perfectionism", "Difficulty delegating", "Over-refining", "Burnout in chaotic environments"],
    tryThisWeek: [
      "Protect one 90-minute deep-work block. No notifications. One objective.",
      "Ship one thing at ‘clean enough’ (define the acceptance criteria first).",
      "Declutter one workspace surface and keep it clean for 7 days.",
    ],

    notes: ["Display layer only — not identity or ancestry claim.", "If it doesn’t resonate, update questions/weights; don’t force-fit."],
  },

  // ========================================
  // CODE 9: KHORUUN
  // ========================================
  khoruun: {
    codeName: "khoruun",
    fullName: "SkyRider",
    snapshot: "Freedom-driven and mobile — you thrive in open spaces, movement, and decentralized power.",

    origin: {
      level1: "Mongolian",
      lineage: ["Nomadic mobility intelligence", "Freedom sustained by movement", "Decentralized strength", "Wide horizons"],
    },

    lens: {
      title: "Nomadic Freedom",
      description: "Movement as life, decentralized power, wide-horizon thinking.",
      inPlainEnglish: ["You need freedom and movement to thrive.", "You resist being pinned down.", "You think expansively."],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Freedom-driven", meaning: "Restriction feels suffocating." },
        { label: "Nomadic intelligence", meaning: "You adapt fast to new environments." },
        { label: "Decentralized mind", meaning: "You resist centralized control." },
        { label: "Horizon focus", meaning: "You think in big ranges and possibilities." },
      ],
    },

    recommendations: {
      lifestyle: ["Keep flexibility.", "Travel regularly.", "Avoid commitments that feel like cages."],
      places: ["Open landscapes", "Cities with movement", "Anywhere you can roam freely"],
      music: ["Expansive cinematic", "Throat-singing textures", "Wide-space sound"],
      activities: ["Cycling/motorbike", "Exploration", "Any freedom-of-movement hobby"],
    },

    musicGenres: [
      { genre: "Cinematic", spotifySearch: spotifySearchUrl("Cinematic music"), why: "Wide-horizon feel." },
      { genre: "Throat Singing", spotifySearch: spotifySearchUrl("Mongolian throat singing"), why: "Ancestral spaciousness." },
      { genre: "Indie Rock (road)", spotifySearch: spotifySearchUrl("Road trip indie rock"), why: "Movement fuel." },
      { genre: "Electronic (open)", spotifySearch: spotifySearchUrl("Open air electronic"), why: "Motion and lift." },
    ],

    strengths: ["Adaptability", "Freedom thinking", "Quick learning", "Mobility intelligence"],
    watchouts: ["Commitment avoidance", "Restlessness", "Difficulty with routine"],
    tryThisWeek: [
      "Choose ONE small commitment for 30 days and make it a game.",
      "Practice staying in one place for 60 minutes with no escape behaviors.",
      "Build one stabilizing ritual that doesn’t kill freedom (10 min/day).",
    ],
  },

  // ========================================
  // CODE 10: LHUMIR
  // ========================================
  lhumir: {
    codeName: "lhumir",
    fullName: "StillMind",
    snapshot: "Contemplative and calm — you find clarity through stillness, compassion, and disciplined inner work.",

    origin: {
      level1: "Tibetan",
      lineage: ["Contemplative consciousness", "Impermanence worldview", "Compassion discipline", "Stillness that includes others"],
    },

    lens: {
      title: "Contemplative Clarity",
      description: "Inner stillness, impermanence awareness, compassionate discipline.",
      inPlainEnglish: ["You find answers through quiet contemplation.", "You accept change naturally.", "Your calm includes care for others."],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Still clarity", meaning: "You stabilize through inner quiet." },
        { label: "Impermanence-aware", meaning: "Change doesn’t scare you — you expect it." },
        { label: "Compassion discipline", meaning: "Care is active, not sentimental." },
        { label: "Inner focus", meaning: "You go inward to resolve." },
      ],
    },

    recommendations: {
      lifestyle: ["Meditation practice.", "Simplify environment.", "Non-attachment to outcomes."],
      places: ["Mountains/high altitude", "Quiet contemplative settings", "Retreat-friendly communities"],
      music: ["Singing bowls", "Chanting textures", "Ambient minimal"],
      activities: ["Meditation/yoga", "Philosophy/spiritual study", "Walking meditation"],
    },

    musicGenres: [
      { genre: "Meditation", spotifySearch: spotifySearchUrl("Meditation music"), why: "Baseline regulation." },
      { genre: "Singing Bowls", spotifySearch: spotifySearchUrl("Singing bowls"), why: "Clarity through resonance." },
      { genre: "Ambient", spotifySearch: spotifySearchUrl("Ambient"), why: "Space to breathe." },
      { genre: "Drone", spotifySearch: spotifySearchUrl("Drone music"), why: "Long stillness arcs." },
    ],

    strengths: ["Inner clarity", "Emotional regulation", "Compassionate presence", "Acceptance of change"],
    watchouts: ["Over-detachment", "Avoiding practical matters", "Under-asserting needs"],
    tryThisWeek: [
      "Set one concrete material goal (small, measurable).",
      "Do one ‘worldly’ task with full presence (no spiritual bypass).",
      "Practice saying what you want directly once.",
    ],
  },

  // ========================================
  // CODE 11: YATEVAR
  // ========================================
  yatevar: {
    codeName: "yatevar",
    fullName: "CycleKeeper",
    snapshot: "Ritual and cosmic order — you understand life through duty, cycles, layered meaning, and precision of practice.",

    origin: {
      level1: "Indian Vedic + Nahua Fusion",
      lineage: ["Law as lived ritual", "Metaphysical abstraction", "Warrior-philosopher synthesis", "Cosmic order through duty"],
    },

    lens: {
      title: "Cosmic Duty",
      description: "Ritual precision, dharmic order, philosophical warrior.",
      inPlainEnglish: [
        "You see life as governed by principles.",
        "Duty and form matter to you.",
        "You need meaning behind action.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Philosophical ground", meaning: "You need reasons and principles." },
        { label: "Ritual precision", meaning: "Form is part of truth." },
        { label: "Duty-driven", meaning: "You do what’s right even when it’s hard." },
        { label: "Cosmic awareness", meaning: "You think beyond the immediate." },
      ],
    },

    recommendations: {
      lifestyle: ["Structured rituals.", "Study philosophical texts.", "Balance thought and action."],
      places: ["Spiritual infrastructure", "Philosophical communities", "Continuity-rich locations"],
      music: ["Ceremonial", "Sacred chanting", "Classical structures"],
      activities: ["Yoga/martial philosophy", "Sacred study", "Ceremony"],
    },

    musicGenres: [
      { genre: "Mantra", spotifySearch: spotifySearchUrl("Mantra"), why: "Ritual focus." },
      { genre: "Indian Classical", spotifySearch: spotifySearchUrl("Indian classical"), why: "Discipline + depth." },
      { genre: "Ceremonial", spotifySearch: spotifySearchUrl("Ceremonial music"), why: "Order through sound." },
      { genre: "World Fusion (ritual)", spotifySearch: spotifySearchUrl("Ritual fusion"), why: "Mythic texture." },
    ],

    strengths: ["Philosophical depth", "Ritual intelligence", "Duty fulfillment", "Cosmic perspective"],
    watchouts: ["Rigidity", "Over-intellectualization", "Difficulty improvising"],
    tryThisWeek: [
      "Do one thing spontaneously without optimizing it.",
      "Pick one ritual and simplify it (keep meaning, drop excess).",
      "Turn one belief into action (prove it through behavior).",
    ],
  },

  // ========================================
  // CODE 12: TAHIRI
  // ========================================
  Tahiri: {
    codeName: "Tahiri",
    fullName: "HeartBearer",
    snapshot: "Warm and expressive — you’re grounded in shared values, honor, hospitality, and bold emotional truth.",

    origin: {
      level1: "Middle East & North Africa",
      lineage: ["Honor • hospitality • expressive warmth", "Passionate expressiveness", "Kinship values", "Generous hosting tradition"],
    },

    lens: {
      title: "Passionate Honor",
      description: "Expressive warmth, communal values, generous hospitality.",
      inPlainEnglish: [
        "You express emotions openly and generously.",
        "Honor and shared bonds matter.",
        "You create belonging through warmth.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Warm expression", meaning: "Your feelings are alive and visible." },
        { label: "Honor-centered", meaning: "Integrity and dignity matter." },
        { label: "Hospitable", meaning: "You create home wherever you are." },
        { label: "Kinship grounded", meaning: "You thrive with strong social bonds." },
      ],
    },

    recommendations: {
      lifestyle: ["Host and gather.", "Express with trusted people.", "Honor commitments."],
      places: ["Strong social ties", "Cafes/plazas", "Hospitality-valuing cultures"],
      music: ["Arabic pop/classical", "Emotion-forward music", "Expressive rhythms"],
      activities: ["Hosting/cooking", "Storytelling", "Community celebrations"],
    },

    musicGenres: [
      { genre: "Arabic Pop", spotifySearch: spotifySearchUrl("Arabic pop"), why: "Emotional expression + rhythm." },
      { genre: "Arabic Classical", spotifySearch: spotifySearchUrl("Arabic classical"), why: "Depth and ornament." },
      { genre: "Rai", spotifySearch: spotifySearchUrl("Rai"), why: "Heat + heart." },
      { genre: "Middle Eastern Instrumental", spotifySearch: spotifySearchUrl("Middle Eastern instrumental"), why: "Atmosphere." },
    ],

    strengths: ["Emotional expressiveness", "Hospitality", "Community bonds", "Honor and integrity"],
    watchouts: ["Over-commitment", "Weak boundaries", "Taking critique as dishonor"],
    tryThisWeek: [
      "Set one boundary without guilt (short and kind).",
      "Express one vulnerable feeling without turning it into a performance.",
      "Let someone care for you without immediately reciprocating.",
    ],
  },

  // ========================================
  // CODE 13: KARAYNI
  // ========================================
  karayni: {
    codeName: "karayni",
    fullName: "AncestorRoot",
    snapshot: "Reciprocity and sacred balance — you understand life as relationship between humans, spirits, and land.",

    origin: {
      level1: "Balinese + Quechua Fusion",
      lineage: ["Sacred balance", "Mutual responsibility", "Ritual labor", "Land-spirit-human unity"],
    },

    lens: {
      title: "Sacred Reciprocity",
      description: "Balance through offering, communal ritual, three-way harmony.",
      inPlainEnglish: ["You understand life as give-and-take.", "You honor land/spirit relationships.", "You thrive in communal work."],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Reciprocal mind", meaning: "Exchange and balance guide you." },
        { label: "Ritual engaged", meaning: "Ceremony matters." },
        { label: "Communal duty", meaning: "You contribute to collective wellbeing." },
        { label: "Land connection", meaning: "Place is relational, not background." },
      ],
    },

    recommendations: {
      lifestyle: ["Give/receive practices.", "Community ritual.", "Connect with local land."],
      places: ["Ritual communities", "Land-based living", "Spiritual infrastructure"],
      music: ["Gamelan textures", "Andean folk", "Ceremonial ensembles"],
      activities: ["Community gardening", "Ceremony", "Reciprocity practices"],
    },

    musicGenres: [
      { genre: "Gamelan", spotifySearch: spotifySearchUrl("Gamelan"), why: "Communal precision." },
      { genre: "Andean Folk", spotifySearch: spotifySearchUrl("Andean folk"), why: "Land + lineage warmth." },
      { genre: "World Ritual", spotifySearch: spotifySearchUrl("Ritual world music"), why: "Offering energy." },
      { genre: "Chamber World", spotifySearch: spotifySearchUrl("World chamber"), why: "Collective texture." },
    ],

    strengths: ["Reciprocity intelligence", "Ritual engagement", "Community building", "Land connection"],
    watchouts: ["Excess obligation", "Difficulty with individualism", "Over-responsibility to tradition"],
    tryThisWeek: [
      "Receive something without ‘paying it back’ immediately.",
      "Do one self-care action that isn’t justified as service to others.",
      "Set one boundary with community expectations (gentle + clear).",
    ],
  },

  // ========================================
  // CODE 14: WOHAKA
  // ========================================
  wohaka: {
    codeName: "wohaka",
    fullName: "SonglineKeeper",
    snapshot: "Existence as relationship — all beings as kin, courage integrated with spiritual depth and place-based identity.",

    origin: {
      level1: "Maori + Lakota Fusion",
      lineage: ["All beings as kin", "Warrior-spiritual synthesis", "Land-identity fusion", "Relational ontology"],
    },

    lens: {
      title: "Relational Existence",
      description: "Everything is related; warrior and spiritual unified; land as identity.",
      inPlainEnglish: [
        "You see all life as interconnected.",
        "You balance courage with reverence.",
        "Your identity includes place and lineage.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Holistic relation", meaning: "You see networks of connection." },
        { label: "Warrior-spiritual", meaning: "Strength and reverence coexist." },
        { label: "Land-identified", meaning: "Place is part of self." },
        { label: "Kinship mind", meaning: "You treat beings as relatives." },
      ],
    },

    recommendations: {
      lifestyle: ["Honor lineage.", "Train courage.", "Connect with land."],
      places: ["Indigenous presence", "Land relationship", "Kinship communities"],
      music: ["Drumming/chant", "Pow wow textures", "Haka energy"],
      activities: ["Training", "Ceremony", "Stewardship/genealogy"],
    },

    musicGenres: [
      { genre: "Indigenous Drumming", spotifySearch: spotifySearchUrl("Indigenous drumming"), why: "Courage + connection." },
      { genre: "Pow Wow", spotifySearch: spotifySearchUrl("Pow wow"), why: "Collective identity." },
      { genre: "Polynesian", spotifySearch: spotifySearchUrl("Polynesian music"), why: "Place-based strength." },
      { genre: "Chant", spotifySearch: spotifySearchUrl("Chanting"), why: "Ritual focus." },
    ],

    strengths: ["Relational intelligence", "Warrior courage", "Spiritual depth", "Land connection"],
    watchouts: ["Urban anonymity stress", "Over-identification with place", "Conflating identity and location"],
    tryThisWeek: [
      "Practice belonging without place cues: join one new room and stay present.",
      "Train courage in a small way (cold shower, hard workout, honest conversation).",
      "Name one ‘kinship responsibility’ you can do sustainably (not endlessly).",
    ],
  },

  // ========================================
  // CODE 15: TJUKARI
  // ========================================
  tjukari: {
    codeName: "tjukari",
    fullName: "Dreampath Navigator",
    snapshot: "Deep-time consciousness — land remembers through you; you navigate through story, memory, and connection.",

    origin: {
      level1: "Aboriginal Australian",
      lineage: ["Dreamtime cosmology", "Songline navigation", "Deep time", "Land memory"],
    },

    lens: {
      title: "Deep Time",
      description: "Non-linear time, land as living memory, Songline intelligence.",
      inPlainEnglish: [
        "You experience time differently.",
        "Land feels alive and meaningful.",
        "You navigate via story and connection.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Deep-time aware", meaning: "You think in vast timescales." },
        { label: "Land-memory", meaning: "Landscape carries story for you." },
        { label: "Narrative navigation", meaning: "You understand through myth and mapping." },
        { label: "Non-linear mind", meaning: "Past/present/future feel connected." },
      ],
    },

    recommendations: {
      lifestyle: ["Learn land stories.", "Practice non-linear thinking.", "Connect with ancient places."],
      places: ["Ancient landscapes", "Minimal disruption", "Strong land memory"],
      music: ["Didgeridoo", "Timeless soundscapes", "Ceremonial textures"],
      activities: ["Walking meditation", "Local history", "Stargazing"],
    },

    musicGenres: [
      { genre: "Didgeridoo", spotifySearch: spotifySearchUrl("Didgeridoo"), why: "Earth resonance." },
      { genre: "World Ambient", spotifySearch: spotifySearchUrl("World ambient"), why: "Timeless atmosphere." },
      { genre: "Drone", spotifySearch: spotifySearchUrl("Drone"), why: "Deep time arcs." },
      { genre: "Nature Soundscapes", spotifySearch: spotifySearchUrl("Nature soundscapes"), why: "Land dialogue." },
    ],

    strengths: ["Deep time thinking", "Land intelligence", "Narrative navigation", "Non-linear consciousness"],
    watchouts: ["Modern time pressure", "Linear planning stress", "Placeless disorientation"],
    tryThisWeek: [
      "Plan one week ahead in a simple linear list (no perfection).",
      "Do one modern ‘time-boxed’ task and finish inside the box.",
      "Spend 20 minutes outside and map a place in words (story, not GPS).",
    ],
  },

  // ========================================
  // CODE 16: KINMORA
  // ========================================
  kinmora: {
    codeName: "kinmora",
    fullName: "TimeArchitect",
    snapshot: "Cycles and precision — you understand timing, systems, and recurring patterns with mathematical clarity.",

    origin: {
      level1: "Maya",
      lineage: ["Mathematical cosmology", "Cyclical time", "Astronomical precision", "Calendrical mastery"],
    },

    lens: {
      title: "Cyclical Mastery",
      description: "Mathematical precision, cycle awareness, cosmic timing.",
      inPlainEnglish: ["You see patterns and cycles deeply.", "Timing matters to you.", "You think systemically."],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Cycle-aware", meaning: "You track repetition and rhythm." },
        { label: "Precision", meaning: "Exactness is calming." },
        { label: "Astronomical mind", meaning: "Big patterns matter." },
        { label: "Systems thinker", meaning: "You connect dots reliably." },
      ],
    },

    recommendations: {
      lifestyle: ["Track cycles.", "Build timing-based routines.", "Study systems."],
      places: ["Seasonal change clarity", "Rhythm + structure cities", "Astronomy-significant locations"],
      music: ["Polyrhythms", "Structured compositions", "Cyclical patterns"],
      activities: ["Astronomy", "Systems thinking", "Cycle tracking"],
    },

    musicGenres: [
      { genre: "Polyrhythms", spotifySearch: spotifySearchUrl("Polyrhythm"), why: "Pattern pleasure." },
      { genre: "Minimalism", spotifySearch: spotifySearchUrl("Minimalism"), why: "Cycle repetition." },
      { genre: "Math Rock", spotifySearch: spotifySearchUrl("Math rock"), why: "Structure + surprise." },
      { genre: "Classical (patterns)", spotifySearch: spotifySearchUrl("Classical repetitive"), why: "Order through repetition." },
    ],

    strengths: ["Pattern recognition", "Cyclical thinking", "Precision", "Timing intelligence"],
    watchouts: ["Over-structuring", "Difficulty with randomness", "Trying to control cycles"],
    tryThisWeek: [
      "Do one spontaneous thing without tracking it.",
      "Let one pattern break and don’t repair it immediately.",
      "Try a ‘good enough’ day where you optimize nothing.",
    ],
  },

  // ========================================
  // CODE 17: SILJOA
  // ========================================
  siljoa: {
    codeName: "siljoa",
    fullName: "FrostSentinel",
    snapshot: "Climate-dialogue intelligence — environment is a thinking partner; you adapt through cooperative resilience.",

    origin: {
      level1: "Inuit + Sami Fusion",
      lineage: ["Climate as partner", "Arctic survival intelligence", "Environmental attunement", "Cooperation with harshness"],
    },

    lens: {
      title: "Climate Partnership",
      description: "Environmental dialogue, survival intelligence, climate attunement.",
      inPlainEnglish: ["You work with environment.", "You read weather and conditions.", "You thrive by partnering with place."],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Environmental dialogue", meaning: "Place is an active variable." },
        { label: "Prepared resilience", meaning: "You plan for harshness." },
        { label: "Condition awareness", meaning: "You monitor context continuously." },
        { label: "Cooperative survival", meaning: "You endure through teamwork." },
      ],
    },

    recommendations: {
      lifestyle: ["Build relationship with climate.", "Practice awareness.", "Learn survival skills."],
      places: ["Cold/challenging climates", "Strong environmental presence", "Adaptation-required locations"],
      music: ["Nordic folk", "Throat singing", "Harsh-to-soft atmospheres"],
      activities: ["Outdoor skills", "Cold-weather sports", "Tracking/observation"],
    },

    musicGenres: [
      { genre: "Nordic Folk", spotifySearch: spotifySearchUrl("Nordic folk"), why: "Cold clarity." },
      { genre: "Throat Singing", spotifySearch: spotifySearchUrl("Throat singing"), why: "Primal endurance." },
      { genre: "Dark Ambient", spotifySearch: spotifySearchUrl("Dark ambient"), why: "Harshness-as-art." },
      { genre: "Post-Folk", spotifySearch: spotifySearchUrl("Post-folk"), why: "Resilient softness." },
    ],

    strengths: ["Environmental intelligence", "Survival skills", "Adaptation", "Partnership thinking"],
    watchouts: ["Over-preparation", "Difficulty with ease", "Hypervigilance in safe environments"],
    tryThisWeek: [
      "Do something without preparation once (low risk).",
      "Practice being comfortable: sit in ease for 20 minutes without ‘fixing’ anything.",
      "Pick one ‘preparedness’ habit and make it lighter, not heavier.",
    ],
  },

  // ========================================
  // CODE 18: SKENARI
  // ========================================
  skenari: {
    codeName: "skenari",
    fullName: "FutureGuardian",
    snapshot: "Seven-generation thinking — responsibility to the unborn; consensus governance; future ethics as daily practice.",

    origin: {
      level1: "Haudenosaunee",
      lineage: ["Seventh Generation principle", "Responsibility to unborn", "Consensus governance", "Future ethics"],
    },

    lens: {
      title: "Future Responsibility",
      description: "Seven-generation thinking, consensus governance, ethical future-building.",
      inPlainEnglish: [
        "You consider long-term consequences naturally.",
        "You feel responsible for what comes next.",
        "You prefer collective agreement over domination.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Future-oriented", meaning: "You think beyond yourself." },
        { label: "Ethical responsibility", meaning: "Impact matters." },
        { label: "Consensus builder", meaning: "You value shared agreement." },
        { label: "Guardianship mind", meaning: "You protect what isn’t here yet." },
      ],
    },

    recommendations: {
      lifestyle: ["Make choices with future in mind.", "Practice consensus.", "Invest in sustainability."],
      places: ["Strong governance communities", "Long-term cultures", "Sustainability-focused locations"],
      music: ["Ceremonial council energy", "Legacy themes", "Community rhythms"],
      activities: ["Stewardship", "Governance work", "Legacy building"],
    },

    musicGenres: [
      { genre: "Indigenous", spotifySearch: spotifySearchUrl("Indigenous music"), why: "Legacy and continuity." },
      { genre: "Ceremonial", spotifySearch: spotifySearchUrl("Ceremonial"), why: "Council energy." },
      { genre: "Folk (legacy)", spotifySearch: spotifySearchUrl("Folk legacy"), why: "Future stories." },
      { genre: "World Hymns", spotifySearch: spotifySearchUrl("World hymns"), why: "Collective meaning." },
    ],

    strengths: ["Long-term thinking", "Ethical responsibility", "Consensus building", "Guardianship"],
    watchouts: ["Neglecting present needs", "Paralysis by future-thinking", "Difficulty with short-term decisions"],
    tryThisWeek: [
      "Make one decision for immediate joy without guilt.",
      "Do one small present-moment activity (no productivity outcome).",
      "Choose one long-term project and reduce it to a 10-minute first step.",
    ],
  },

  // ========================================
  // CODE 19: ASHKARA
  // ========================================
  ashkara: {
    codeName: "ashkara",
    fullName: "TruthForger",
    snapshot: "Truth embodied — moral clarity through action; integrity as practice; fire as purification and commitment.",

    origin: {
      level1: "Persian/Zoroastrian",
      lineage: ["Truth enacted (asha)", "Moral choice as sacred action", "Good thoughts/words/deeds", "Fire as purifying principle"],
    },

    lens: {
      title: "Enacted Truth",
      description: "Moral clarity, ethical action, truth embodied.",
      inPlainEnglish: [
        "Truth must be lived, not just believed.",
        "You’re driven by moral clarity.",
        "Integrity is daily practice, not a vibe.",
      ],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Ethically driven", meaning: "Morality guides decisions." },
        { label: "Truth-embodying", meaning: "Principles must become behavior." },
        { label: "Clear duality", meaning: "You see right/wrong strongly." },
        { label: "Action-based", meaning: "You prove values through choice." },
      ],
    },

    recommendations: {
      lifestyle: ["Act on principles consistently.", "Practice moral courage.", "Purify through action."],
      places: ["Integrity-focused communities", "Clear ethical culture", "Moral leadership environments"],
      music: ["Epic themes", "Devotional intensity", "Courage soundtracks"],
      activities: ["Service/activism", "Ethical leadership", "Ritual that reinforces commitment"],
    },

    musicGenres: [
      { genre: "Epic", spotifySearch: spotifySearchUrl("Epic music"), why: "Courage and resolve." },
      { genre: "Devotional", spotifySearch: spotifySearchUrl("Devotional music"), why: "Principle reinforcement." },
      { genre: "Persian Classical", spotifySearch: spotifySearchUrl("Persian classical"), why: "Cultural depth." },
      { genre: "Cinematic Rock", spotifySearch: spotifySearchUrl("Cinematic rock"), why: "Action energy." },
    ],

    strengths: ["Moral clarity", "Ethical courage", "Truth embodiment", "Principled action"],
    watchouts: ["Moral rigidity", "Black/white thinking", "Difficulty with ambiguity"],
    tryThisWeek: [
      "Sit with one ‘gray area’ without forcing a verdict.",
      "Practice compassion for imperfection (yours or others) once.",
      "Choose one principle and embody it in a concrete action today.",
    ],
  },

  // ========================================
  // CODE 20: ALETHIR
  // ========================================
  alethir: {
    codeName: "alethir",
    fullName: "Seeker",
    snapshot: "Truth through inquiry — you believe reality emerges through reasoning, dialogue, and logos-centered thinking.",

    origin: {
      level1: "Ancient Greek",
      lineage: ["Inquiry (aletheia)", "Dialectic", "Logos-centered thinking", "Philosophy as way of life"],
    },

    lens: {
      title: "Inquiry & Reason",
      description: "Truth through questioning, dialectical thinking, philosophical pursuit.",
      inPlainEnglish: ["You find truth through questions.", "You think through dialogue.", "Wisdom is an active practice."],
    },

    traits: {
      headline: "Core Traits",
      highlights: [
        { label: "Inquiry-driven", meaning: "You question to understand." },
        { label: "Dialectical", meaning: "Conversation sharpens truth." },
        { label: "Reason-centered", meaning: "Logic guides you." },
        { label: "Wisdom oriented", meaning: "You seek depth, not noise." },
      ],
    },

    recommendations: {
      lifestyle: ["Regular discussion.", "Question assumptions.", "Study logic and reasoning."],
      places: ["Intellectual culture cities", "University towns", "Philosophical communities"],
      music: ["Contemplative structure", "Classical forms", "Focus sound"],
      activities: ["Reading groups", "Debate", "Writing/thinking practice"],
    },

    musicGenres: [
      { genre: "Classical", spotifySearch: spotifySearchUrl("Classical"), why: "Structure supports thought." },
      { genre: "Modern Classical", spotifySearch: spotifySearchUrl("Modern classical"), why: "Contemporary depth." },
      { genre: "Ambient Focus", spotifySearch: spotifySearchUrl("Ambient focus"), why: "Clean cognition." },
      { genre: "Jazz (thoughtful)", spotifySearch: spotifySearchUrl("Jazz instrumental"), why: "Complexity without chaos." },
    ],

    strengths: ["Reasoning ability", "Philosophical depth", "Dialogue skill", "Inquiry mindset"],
    watchouts: ["Over-intellectualization", "Analysis paralysis", "Dismissing feeling-based knowing"],
    tryThisWeek: [
      "Make one decision from gut feeling (small) and observe outcomes.",
      "Practice accepting uncertainty once (no research, no optimization).",
      "Have one conversation where you listen 70% and ask better questions.",
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
