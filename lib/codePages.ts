/**
 * lib/codePages.ts
 *
 * MYTHICAL ARCHETYPES - Research-Backed Personality Profiles
 * 
 * Each code represents a constellation of behavioral patterns derived from:
 * - Big Five personality traits (empirically validated)
 * - Enneagram motivation systems (clinically used)
 * - MBTI cognitive preferences (widely adopted)
 * - Archetypal symbolism (depth psychology)
 *
 * CRITICAL: All keys must match codeMatcher.ts exactly (lowercase except Tahiri)
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

export interface CodeMusicGenre {
  genre: string;
  spotifySearch: string;
  why?: string;
  starterArtists?: string[];
}

export interface CodeFocusThisWeek {
  title: string;
  intention: string;
  actions: string[];
  frictionToExpect?: string[];
  successSignal?: string[];
}

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
  tryThisWeek: string[];
  notes?: string[];
  musicGenres?: CodeMusicGenre[];
  focusThisWeek?: CodeFocusThisWeek;
  deepDive?: CodeDeepDive;
  rituals?: CodeRitual[];
  workStyle?: CodeWorkStyle;
  relationships?: CodeRelationships;
  travelMode?: CodeTravelMode;
}

function spotifySearchUrl(query: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}

export const CODE_PAGES: Record<CodeSlug, CodePage> = {
  // ========================================
  // CODE 1: KHOISAN - EARTHLISTENER
  // Patterns: [4, 3, 6, 15, 26] = Sensory Appreciation, Pattern Recognition, Present Focus, Environmental Sensitivity, Nature Connection
  // ========================================
  khoisan: {
    codeName: "khoisan",
    fullName: "Earthlistener",
    snapshot:
      "Hyper-attuned to environment and subtle shifts — you read space, energy, and timing with present-moment intelligence.",

    origin: {
      level1: "Mythical Archetype: The Grounded Sensor",
      lineage: [
        "High sensory processing sensitivity (research: Elaine Aron, HSP)",
        "Present-moment awareness (mindfulness research: Jon Kabat-Zinn)",
        "Environmental attunement (ecological psychology: James Gibson)",
        "Conflict de-escalation through spatial awareness",
      ],
    },

    lens: {
      title: "Environmental Presence",
      description:
        "You sense the world through micro-details: airflow, texture, tone, distance, exits, tension. You regulate emotions by adjusting physical space rather than engaging verbally.",
      inPlainEnglish: [
        "You notice what others ignore: subtle shifts in mood, light, and physical environment.",
        "You resolve tension by changing distance, pacing, or setting — not by escalating words.",
        "You're at your best when life is simple, direct, and physically grounded.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Sensory Intelligence (High Openness to Experience)", 
          meaning: "You process environmental data at a granular level — tracking micro-changes in light, sound, texture, and social energy." 
        },
        { 
          label: "Present-Moment Focus (Low Neuroticism)", 
          meaning: "Your attention naturally anchors to 'now' — future abstraction feels less real than immediate sensory input." 
        },
        { 
          label: "Spatial Regulation (Introverted Sensing)", 
          meaning: "You manage stress by adjusting physical variables (distance, lighting, noise) rather than verbal negotiation." 
        },
        { 
          label: "Egalitarian Structure (Type 9 Enneagram)", 
          meaning: "Hierarchy feels artificial; respect is earned through behavior, not titles." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Daily nature contact (even 10 minutes). Research shows sensory-rich environments reduce cortisol faster than indoor recovery.",
        "Flexible rhythm > rigid schedule. Use natural anchors (sunrise, sunset) rather than clock-based blocks.",
        "Process stress kinesthetically: walk, swim, stretch. Cognitive reframing alone won't discharge nervous system activation.",
      ],
      places: [
        "Nature-accessible environments (parks, coastlines, trails) — your baseline regulation depends on organic sensory input.",
        "Homes with airflow + natural light; avoid cramped, artificially lit, or acoustically harsh spaces.",
        "Communities with low status performance: maker spaces, outdoor groups, calm creative collectives.",
      ],
      music: [
        "Organic minimal: low cognitive load, high textural detail.",
        "Natural soundscapes + subtle percussion (biophilia effect).",
        "Ambient that feels like weather, not performance.",
      ],
      activities: [
        "Awareness-rewarding activities: hiking, foraging, trail running, freediving, rock climbing.",
        "Slow observation: birding, nature photography, landscape sketching.",
        "Precision skills that sharpen sensing: archery, surfing, bouldering.",
      ],
    },

    musicGenres: [
      { genre: "Organic Ambient", spotifySearch: spotifySearchUrl("Organic ambient"), why: "Textural calm without mental clutter." },
      { genre: "Nature Soundscapes", spotifySearch: spotifySearchUrl("Nature soundscapes"), why: "Regulates baseline fast (biophilia research)." },
      { genre: "Minimal Percussion", spotifySearch: spotifySearchUrl("Minimal percussion"), why: "Rhythm without noise." },
      { genre: "Downtempo", spotifySearch: spotifySearchUrl("Downtempo"), why: "Grounding pulse for movement." },
    ],

    strengths: [
      "Environmental intelligence (tracking micro-changes)",
      "Present-moment awareness (low rumination)",
      "Conflict de-escalation through spatial adjustment",
      "Pattern sensing (space + social dynamics)",
      "Egalitarian mindset (merit-based respect)",
    ],

    watchouts: [
      "Avoiding necessary confrontation until it becomes crisis (conflict avoidance pattern)",
      "Struggling with rigid bureaucracy or artificial structure",
      "Under-planning for future (temporal discounting bias)",
      "Sensory overload in dense urban or chaotic social settings",
    ],

    tryThisWeek: [
      "30-minute 'Earth Scan': outdoors, no headphones. Notice 10 environmental details (wind direction, temperature gradients, textures). Journal them.",
      "Tension protocol: Next conflict, change *space* first (walk outside, adjust seating) before speaking. Track your nervous system response.",
      "Future anchor: Pick one 3-month goal and tie it to a physical habit (e.g., Tuesday/Thursday walk = planning time).",
    ],

    deepDive: {
      essence:
        "Earthlistener represents high sensory processing combined with present-focus cognition. Research in Highly Sensitive Persons (Aron, 1996) and ecological perception (Gibson, 1979) suggests this pattern excels in environments requiring rapid environmental assessment.",
      sections: [
        {
          title: "Neurological Foundation",
          body:
            "fMRI studies show heightened activation in brain regions processing sensory-discriminative information (insula, sensory cortex). You're not 'anxious' — you have higher sensory resolution.",
          bullets: [
            "Detect micro-changes before conscious awareness (pre-attentive processing)",
            "Trust sensory data over verbal claims (experience > theory)",
            "Environmental variables affect mood more than social variables",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide by moving toward 'clean' signals and away from distorted ones. When forced into pure logic games, you disengage — not from inability, but medium mismatch.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Prolonged indoor time + high social noise = nervous system dysregulation. Manifests as irritation, withdrawal, and eventually resentment.",
          bullets: [
            "Low patience threshold",
            "Short fuse in crowded spaces",
            "'Can't breathe' sensation",
            "Avoiding messages/calls",
          ],
        },
      ],
      shadowPatterns: [
        "Using space-adjustment to avoid truth",
        "Over-reading signals and attributing intent",
        "Future denial (letting problems arrive unprepared)",
      ],
      misalignmentSigns: ["Constant indoor time", "High social noise", "Too many obligations", "No movement rituals"],
      alignmentSignals: ["Daily nature contact", "Simple routines", "Regular movement", "2-3 high-trust relationships"],
    },

    workStyle: {
      thrivesIn: ["Autonomy", "Field work", "Low organizational politics", "Clear scope"],
      strugglesIn: ["Constant meetings", "Performance culture", "Open offices", "Micromanagement"],
      bestRoles: ["Operations (real environments)", "UX research", "Outdoor professions", "Systems + craft roles"],
      collaboration: ["Small teams", "Calm leadership", "Clear agreements", "Minimal hierarchy games"],
    },

    relationships: {
      youNeed: ["Space to decompress", "Quiet honesty", "Non-reactive partners", "Permission for alone time"],
      youGive: ["Grounded presence", "Early warning signals", "Practical care", "Safety"],
      watchFor: ["People who escalate for stimulation", "Partners who punish your need for space"],
      repairMoves: ["Walk-and-talk conversations", "Side-by-side positioning", "Brief text setting time/place to talk"],
    },

    travelMode: {
      bestTrips: ["Nature-based resets", "Slow coastal towns", "Hiking + simple food", "Minimal itinerary"],
      avoidTrips: ["Packed multi-city tours", "Nightlife-heavy schedules", "Constant group dynamics"],
      packingPhilosophy: ["Comfort + mobility > fashion", "One good jacket, good shoes, layers"],
      itineraryStyle: ["2 anchors/day max", "Leave gaps for sensing and wandering"],
    },

    rituals: [
      {
        title: "Evening Sensory Reset (10 minutes)",
        why: "Turns off hyper-vigilance, returns to baseline regulation.",
        steps: [
          "Dim lights, phone away",
          "Slow shoulder/neck stretches (no intensity)",
          "Drink water, step outside 2 minutes",
          "Name 3 things you sensed today that were true",
        ],
      },
    ],

    focusThisWeek: {
      title: "Calm authority through positioning",
      intention: "You don't need sharper words — you need better spatial strategy.",
      actions: [
        "Before difficult conversations: 5-minute walk first, enter slower than impulse",
        "Choose the setting (quiet corner, outdoors, side-by-side seating)",
        "Speak in shorter sentences, pause longer than feels normal",
      ],
      frictionToExpect: ["May feel 'avoidant' initially — it's actually regulation"],
      successSignal: ["Conversations end without adrenaline spikes", "You feel clean after"],
    },

    notes: [
      "Mythical archetype, not ethnic identity",
      "If doesn't resonate, update quiz weights — never force-fit",
    ],
  },

  // ========================================
  // CODE 2: KAYORI - FIREWEAVER
  // Patterns: [1, 7, 13, 18, 25] = Abstract Thinking, Expression, Emotional Expressiveness, Social Energy, Meaning Orientation
  // ========================================
  kayori: {
    codeName: "kayori",
    fullName: "Fireweaver",
    snapshot:
      "Expressive and rhythm-connected — you create meaning through ritual, story, creativity, and shared emotional resonance.",

    origin: {
      level1: "Mythical Archetype: The Ritual Creator",
      lineage: [
        "High emotional expressiveness (Big Five research: extraversion + openness)",
        "Meaning-making through creative expression (existential psychology: Viktor Frankl)",
        "Communal intelligence (social cognition research)",
        "Rhythmic synchronization (neuroscience: interpersonal synchrony)",
      ],
    },

    lens: {
      title: "Collective Expression",
      description:
        "You metabolize life through rhythm and shared meaning. You don't just 'feel' — you translate emotion into culture: ritual, art, movement, story. Your confidence rises when expression lands with real people.",
      inPlainEnglish: [
        "You recharge through shared creative expression (music, dance, gatherings).",
        "You naturally think about purpose and 'path' — life must mean something.",
        "Your energy multiplies in communal flow states, not solitary work.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Expressive Intelligence (High Extraversion + Openness)", 
          meaning: "You process emotion through external expression — art, movement, music become thought-language." 
        },
        { 
          label: "Meaning Orientation (Type 4/7 Enneagram)", 
          meaning: "Random pleasure isn't enough — experiences must connect to larger narrative or purpose." 
        },
        { 
          label: "Communal Cognition (High Agreeableness)", 
          meaning: "Your best thinking happens in dialogue, movement, or collaborative creation." 
        },
        { 
          label: "Rhythmic Attunement (ENFP/ENFJ)", 
          meaning: "You synchronize with group energy — social rhythms regulate your mood." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Create daily ritual anchors (morning music, evening reflection, weekly creative session).",
        "Choose communities where expression is normalized, not embarrassing.",
        "Build creative output into identity: even 20 minutes/day compounds.",
      ],
      places: [
        "Culturally vibrant neighborhoods with street life",
        "Cities where music is embedded in daily rhythm",
        "Communities valuing public gathering and celebration",
      ],
      music: [
        "Afrobeats, Amapiano, Highlife",
        "Jazz-influenced grooves",
        "Rhythm-forward music inviting movement",
      ],
      activities: [
        "Dance, percussion, performance",
        "Community art projects",
        "Hosting + curating social experiences",
        "Storytelling and oral tradition",
      ],
    },

    musicGenres: [
      { genre: "Afrobeats", spotifySearch: spotifySearchUrl("Afrobeats"), why: "Collective rhythm + emotional lift." },
      { genre: "Amapiano", spotifySearch: spotifySearchUrl("Amapiano"), why: "Flow-state grooves, social warmth." },
      { genre: "Highlife", spotifySearch: spotifySearchUrl("Highlife"), why: "Tradition-modern fusion." },
      { genre: "Jazz Funk", spotifySearch: spotifySearchUrl("Jazz funk"), why: "Complex rhythm without chaos." },
    ],

    strengths: [
      "Expressive intelligence (emotion → art)",
      "Ritual creation (meaning through repetition)",
      "Community building (social architecture)",
      "Purpose awareness (existential clarity)",
    ],

    watchouts: [
      "Over-reliance on external validation for self-worth",
      "Difficulty with sustained solitude",
      "Getting lost in symbolism instead of concrete action",
      "Emotional dysregulation when isolated",
    ],

    tryThisWeek: [
      "Design 7-day ritual loop: (1) morning song (2) midday check-in (3) evening gratitude. Keep it tiny.",
      "Create one 'no-feedback' output: write/record/make something, don't share for 48 hours.",
      "Lead one social session where you set the vibe (playlist + location + timing).",
    ],

    deepDive: {
      essence:
        "Fireweaver combines high emotional expressiveness with meaning-seeking drive. Research in flow states (Csikszentmihalyi) and collective effervescence (Durkheim) shows this pattern thrives in synchronized group creativity.",
      sections: [
        {
          title: "Neurological Foundation",
          body:
            "Enhanced mirror neuron activity and limbic synchronization during group experiences. Your nervous system co-regulates through social rhythm.",
          bullets: [
            "Emotional contagion works bidirectionally (you transmit AND receive)",
            "Creative expression reduces cortisol more than passive consumption",
            "Social isolation triggers faster mood decline than in other patterns",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through embodied exploration — moving through options, feeling resonance, checking against purpose/meaning.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Isolation + lack of creative outlet = mood collapse. Manifests as depression, meaninglessness, or chaotic expression-seeking.",
        },
      ],
      shadowPatterns: [
        "Performing emotion rather than processing it",
        "Seeking validation through audience reaction",
        "Avoiding necessary solitude",
      ],
      alignmentSignals: ["Daily creative practice", "Weekly communal gathering", "Meaningful work", "Authentic expression"],
    },

    workStyle: {
      thrivesIn: ["Collaborative environments", "Creative freedom", "Mission-driven work", "Expression-valued culture"],
      strugglesIn: ["Isolated roles", "Meaningless tasks", "Rigid structure", "Low social interaction"],
      bestRoles: ["Arts/creative", "Community organizing", "Performance", "Culture-building roles"],
      collaboration: ["Co-creation", "Open dialogue", "Shared ownership", "Celebration of wins"],
    },

    relationships: {
      youNeed: ["Shared rituals", "Emotional resonance", "Creative partnership", "Meaning-making together"],
      youGive: ["Warmth and energy", "Creative spark", "Emotional honesty", "Community connection"],
      watchFor: ["People who mock expression", "Partners who need constant solitude"],
      repairMoves: ["Create together", "Dance/move to reconnect", "Share what it meant to you"],
    },

    travelMode: {
      bestTrips: ["Festival/cultural immersion", "Music-centered experiences", "Group adventures", "Creative retreats"],
      avoidTrips: ["Solo isolation trips", "Rigid schedules", "No human connection"],
      packingPhilosophy: ["Expression tools (journal, instruments)", "Comfortable movement clothes"],
      itineraryStyle: ["Anchor around shared experiences", "Leave room for spontaneous connection"],
    },

    rituals: [
      {
        title: "Morning Creative Spark (15 minutes)",
        why: "Activates expressive pathway before reactive tasks claim your energy.",
        steps: [
          "Play one song that makes you move",
          "Free-write 3 minutes (no editing)",
          "Speak/sing one truth out loud",
          "Set intention for the day",
        ],
      },
    ],

    focusThisWeek: {
      title: "Grounded expression",
      intention: "Channel creative energy into sustainable practice, not explosive bursts.",
      actions: [
        "15 minutes daily creative practice (same time)",
        "One social experience where you listen 60% of the time",
        "Create one thing for yourself only (no audience)",
      ],
      frictionToExpect: ["Will feel like 'not enough'", "Urge to share immediately"],
      successSignal: ["Feeling proud without needing validation", "More energy at week's end"],
    },

    notes: [
      "Mythical archetype representing expressive-communal behavioral pattern",
      "Not tied to any specific ethnicity or culture",
    ],
  },

  // ========================================
  // CODE 3: SAHEN - HORIZONWALKER  
  // Patterns: [1, 16, 15, 26, 29] = Abstract Thinking, Introspection, Environmental Sensitivity, Nature Connection, Autonomy
  // ========================================
  sahen: {
    codeName: "sahen",
    fullName: "HorizonWalker",
    snapshot: 
      "Self-sufficient and introspective — you're comfortable with solitude, vastness, and long-horizon thinking.",

    origin: {
      level1: "Mythical Archetype: The Solitary Endurer",
      lineage: [
        "High introspective depth (Big Five: low extraversion + high openness)",
        "Autonomous self-regulation (self-determination theory: Ryan & Deci)",
        "Poetic/metaphorical cognition (narrative psychology)",
        "Comfort with existential solitude (existential psychology)",
      ],
    },

    lens: {
      title: "Solitary Endurance",
      description:
        "Your strength is internal, not dependent on external validation. You think in metaphors and meaning. You navigate vast landscapes — physical and psychological — with quiet resilience.",
      inPlainEnglish: [
        "You're comfortable being alone for extended periods.",
        "You naturally translate experience into symbols and stories.",
        "Your resilience is quiet, often underestimated by others.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Introspective Strength (Low Extraversion + High Openness)", 
          meaning: "Your power source is internal reflection, not social validation." 
        },
        { 
          label: "Metaphorical Cognition (Type 4/5 Enneagram)", 
          meaning: "You understand through symbols, patterns, and narrative meaning." 
        },
        { 
          label: "Autonomous Drive (High Autonomy Need)", 
          meaning: "External management feels suffocating — you need self-direction." 
        },
        { 
          label: "Horizon Focus (INFP/INFJ/INTJ)", 
          meaning: "You think in long timelines and vast landscapes, literal and psychological." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Protect solo time daily (non-negotiable recovery).",
        "Regular writing/journaling (externalizes internal world).",
        "Embrace minimalism — essentials over accumulation.",
      ],
      places: [
        "Open landscapes with long sightlines",
        "Quiet, spacious homes (acoustic and visual space)",
        "Locations supporting contemplation",
      ],
      music: [
        "Desert blues, post-rock",
        "Ambient with space to breathe",
        "Minimal, wide sound design",
      ],
      activities: [
        "Long solo walks/hikes",
        "Writing, poetry, creative prose",
        "Meditation and contemplative practice",
      ],
    },

    musicGenres: [
      { genre: "Desert Blues", spotifySearch: spotifySearchUrl("Desert blues"), why: "Vastness + grit + beauty." },
      { genre: "Ambient", spotifySearch: spotifySearchUrl("Ambient"), why: "Space to think without pressure." },
      { genre: "Post-Rock", spotifySearch: spotifySearchUrl("Post-rock"), why: "Long arcs, big horizons." },
      { genre: "Minimalism", spotifySearch: spotifySearchUrl("Minimalism music"), why: "Clarity and restraint." },
    ],

    strengths: [
      "Self-sufficiency (internal resource generation)",
      "Internal resilience (enduring without external support)",
      "Poetic/metaphorical thinking",
      "Comfort with solitude and silence",
    ],

    watchouts: [
      "Isolation becoming loneliness",
      "Difficulty asking for help (self-reliance becomes stubbornness)",
      "Romanticizing struggle instead of accepting support",
    ],

    tryThisWeek: [
      "Ask for help once — small, specific, low-stakes. Practice receiving.",
      "Schedule 'horizon hour': uninterrupted time for long-term thinking.",
      "Balance solitude with one meaningful social touchpoint (1:1, not group).",
    ],

    deepDive: {
      essence:
        "HorizonWalker represents high autonomy need combined with introspective processing. Research in solitude (Averill & Sundararajan) shows this pattern uses alone-time for creative integration, not avoidance.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High comfort with solitude correlates with secure attachment + high self-efficacy. You're not 'avoiding people' — you recharge differently.",
          bullets: [
            "Solitude increases creativity and problem-solving",
            "Internal narrative is primary processing mode",
            "External validation feels hollow compared to internal alignment",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through extended contemplation — walking with questions, journaling, allowing answers to emerge.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Forced constant socialization + no alone time = identity fragmentation. Manifests as irritation, emotional numbness, or retreat.",
        },
      ],
      shadowPatterns: [
        "Using solitude to avoid vulnerability",
        "Glorifying suffering instead of accepting ease",
        "Refusing help as identity protection",
      ],
      alignmentSignals: ["Daily solo time", "Regular creative output", "Long walks", "Deep one-on-one connections"],
    },

    workStyle: {
      thrivesIn: ["Autonomy", "Deep work", "Minimal meetings", "Clear expectations"],
      strugglesIn: ["Constant collaboration", "Open offices", "Performance culture", "Micromanagement"],
      bestRoles: ["Writing", "Research", "Strategy", "Independent consulting"],
      collaboration: ["Asynchronous communication", "Deep 1:1s", "Clear ownership", "Respect for focus time"],
    },

    relationships: {
      youNeed: ["Space for solitude", "Deep conversation", "Emotional honesty", "Acceptance of quiet"],
      youGive: ["Thoughtful presence", "Poetic insight", "Steady loyalty", "Depth"],
      watchFor: ["People who need constant interaction", "Partners who view alone time as rejection"],
      repairMoves: ["Write letter before talking", "Long walk together", "Share internal world slowly"],
    },

    travelMode: {
      bestTrips: ["Solo contemplative journeys", "Vast landscapes", "Minimal human density", "Long timelines"],
      avoidTrips: ["Group tours", "Party destinations", "Packed itineraries"],
      packingPhilosophy: ["Journal", "One good book", "Comfortable walking gear"],
      itineraryStyle: ["Loose framework", "Follow curiosity", "Embrace unplanned"],
    },

    rituals: [
      {
        title: "Morning Horizon Practice (20 minutes)",
        why: "Grounds you in long-term perspective before daily demands.",
        steps: [
          "Find window or outdoor space with sightline",
          "Free-write stream of consciousness (10 min)",
          "Identify one 'horizon question' to carry through day",
          "Silent sitting (5 min)",
        ],
      },
    ],

    focusThisWeek: {
      title: "Strength through connection",
      intention: "Practice interdependence without losing autonomy.",
      actions: [
        "Ask someone for specific help once",
        "Share one internal insight with trusted person",
        "Accept support without immediately reciprocating",
      ],
      frictionToExpect: ["Feeling exposed", "Urge to retreat immediately after"],
      successSignal: ["Accepting help felt okay", "Connection didn't drain you"],
    },

    notes: [
      "Mythical archetype, not cultural identity",
      "Solitude is strength, not avoidance — unless it becomes isolation",
    ],
  },

 // ========================================
  // CODE 4: ENZUKA - SHIELDBEARER
  // Patterns: [12, 21, 11, 20, 22] = Influence Drive, Collaborative Preference, Structure Preference, Group Size, Tradition
  // ========================================
  enzuka: {
    codeName: "enzuka",
    fullName: "Shieldbearer",
    snapshot: 
      "Protective leader energy — you create order, safety, and collective honor through courageous action and service.",

    origin: {
      level1: "Mythical Archetype: The Protective Leader",
      lineage: [
        "Protective prosocial behavior (altruism research: Batson)",
        "Leadership through service (servant leadership: Greenleaf)",
        "Group cohesion drive (social identity theory: Tajfel)",
        "Honor-based motivation (moral foundations theory: Haidt)",
      ],
    },

    lens: {
      title: "Protective Leadership",
      description:
        "You feel responsibility for others' wellbeing and safety. Your strength exists in service to the collective. You create order from chaos and use courage as a form of care, not dominance.",
      inPlainEnglish: [
        "You naturally step up when others need protection or guidance.",
        "Your strength is meant to shield others, not dominate them.",
        "You create structure and safety wherever you go.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Protective Strength (High Extraversion + Conscientiousness)", 
          meaning: "You use personal power to create safety for others — leadership as responsibility, not status." 
        },
        { 
          label: "Honor-Driven (Type 8/2 Enneagram)", 
          meaning: "Your word and reputation matter deeply — integrity is non-negotiable." 
        },
        { 
          label: "Order-Creating (High Structure Preference)", 
          meaning: "You bring organization to chaos — clear roles, expectations, and boundaries." 
        },
        { 
          label: "Courageously Responsible (ESFJ/ENFJ)", 
          meaning: "You step forward when others hesitate — courage as duty, not recklessness." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Physical training (your body is a protective tool — maintain it).",
        "Lead where needed, but delegate to develop others.",
        "Build strong community bonds through shared responsibility.",
      ],
      places: [
        "Communities with strong social fabric and mutual accountability",
        "Environments where respect is earned through action, not titles",
        "Structured settings with clear social roles and expectations",
      ],
      music: [
        "Anthemic rhythms that activate courage",
        "Powerful drums and collective-energy tracks",
        "Music that builds resolve and unity",
      ],
      activities: [
        "Strength training and martial discipline",
        "Mentorship and youth leadership",
        "Team sports and group challenges",
        "Community service and protection roles",
      ],
    },

    musicGenres: [
      { genre: "Epic Orchestral", spotifySearch: spotifySearchUrl("Epic orchestral"), why: "Activates protective courage and resolve." },
      { genre: "Anthemic Hip Hop", spotifySearch: spotifySearchUrl("Anthemic hip hop"), why: "Leadership energy and collective identity." },
      { genre: "Powerful Drums", spotifySearch: spotifySearchUrl("Powerful drums"), why: "Primal strength activation." },
      { genre: "Motivational Rock", spotifySearch: spotifySearchUrl("Motivational rock"), why: "Duty and determination." },
    ],

    strengths: [
      "Protective instincts (anticipating threats to group)",
      "Leadership courage (stepping up under pressure)",
      "Community building (creating cohesion)",
      "Honor maintenance (integrity under stress)",
    ],

    watchouts: [
      "Over-responsibility (carrying too much for others)",
      "Difficulty showing vulnerability (weakness = threat)",
      "Rigid hierarchy thinking (authority as fixed, not fluid)",
      "Burnout from constant protection mode",
    ],

    tryThisWeek: [
      "Show one controlled vulnerability: name what's heavy, ask for specific support (not collapse, just honesty).",
      "Delegate one responsibility completely and tolerate the discomfort of 'not carrying everything'.",
      "Before protecting someone, ask: 'Do you want protection, advice, or just presence?'",
    ],

    deepDive: {
      essence:
        "Shieldbearer combines high protective drive with leadership courage. Research in prosocial behavior (Batson) and servant leadership (Greenleaf) shows this pattern creates safety through strength-in-service.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High protective instinct correlates with secure attachment + high conscientiousness. You're not 'controlling' — you're threat-scanning for the group.",
          bullets: [
            "Threat detection is automatic (hypervigilance in service of others)",
            "Leadership feels like duty, not choice",
            "Group safety = personal responsibility",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide by assessing impact on group cohesion and safety. 'What protects the collective?' is primary filter.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "No one to protect + no clear structure = loss of purpose. Manifests as restlessness, over-involvement, or seeking conflict.",
        },
      ],
      shadowPatterns: [
        "Protecting to feel needed (codependency)",
        "Using strength to dominate, not serve",
        "Refusing help as weakness",
      ],
      alignmentSignals: ["Clear responsibilities", "Trusted team", "Physical practice", "Honored commitments"],
    },

    workStyle: {
      thrivesIn: ["Clear leadership roles", "Team environments", "Mission-driven work", "Structured responsibility"],
      strugglesIn: ["Ambiguous authority", "Individualistic culture", "No team to support", "Unclear expectations"],
      bestRoles: ["Team leadership", "Operations management", "Security/protection", "Community organizing"],
      collaboration: ["Clear roles", "Direct communication", "Mutual accountability", "Respect hierarchy when earned"],
    },

    relationships: {
      youNeed: ["Trust and loyalty", "Permission to rest", "Partners who don't exploit protection", "Vulnerability safety"],
      youGive: ["Unwavering support", "Physical/emotional protection", "Reliable presence", "Courageous honesty"],
      watchFor: ["People who demand constant saving", "Partners who view strength as threat"],
      repairMoves: ["Acknowledge impact directly", "Show vulnerability authentically", "Ask what they need vs. assuming"],
    },

    travelMode: {
      bestTrips: ["Group adventures with clear roles", "Challenge-based experiences", "Service trips", "Team-building retreats"],
      avoidTrips: ["Solo isolation", "No structure/purpose", "High vulnerability situations"],
      packingPhilosophy: ["Prepared for emergencies", "Group utility items", "Comfort for others"],
      itineraryStyle: ["Clear objectives", "Backup plans", "Group safety first"],
    },

    rituals: [
      {
        title: "Evening Protection Release (15 minutes)",
        why: "Discharges hyper-responsibility and returns to personal boundaries.",
        steps: [
          "Physical release: 10 push-ups or wall presses (discharge protective tension)",
          "Journal: 'What was mine to carry today? What wasn't?'",
          "Deep breathing: 10 breaths visualizing releasing what's not yours",
          "Affirmation: 'I am enough. Others are capable.'",
        ],
      },
    ],

    focusThisWeek: {
      title: "Strength through vulnerability",
      intention: "True protection includes showing your humanity, not just your strength.",
      actions: [
        "Share one fear or struggle with someone you protect",
        "Let someone care for you without deflecting",
        "Rest for 1 hour without checking on anyone",
      ],
      frictionToExpect: ["Feeling exposed or weak", "Urge to immediately return to protector mode"],
      successSignal: ["Vulnerability didn't break trust", "You feel lighter, not weaker"],
    },

    notes: [
      "Mythical archetype representing protective-leadership pattern",
      "Not tied to any specific ethnicity or warrior culture",
    ],
  },

  // ========================================
  // CODE 5: SIYUANE - KITSUNE
  // Patterns: [8, 22, 24, 14, 30] = Structure Preference, Tradition Orientation, Hierarchy, Conscientiousness, Future Orientation
  // ========================================
  siyuane: {
    codeName: "siyuane",
    fullName: "Kitsune",
    snapshot: 
      "Continuity-minded and disciplined — you value tradition, hierarchical harmony, and patient mastery across generations.",

    origin: {
      level1: "Mythical Archetype: The Generational Harmonizer",
      lineage: [
        "Long-term orientation (Hofstede cultural dimensions research)",
        "Hierarchical respect structures (social structure psychology)",
        "Discipline and mastery (deliberate practice research: Ericsson)",
        "Continuity thinking (temporal psychology)",
      ],
    },

    lens: {
      title: "Generational Harmony",
      description:
        "You think in multi-generational timelines. Respect for tradition and hierarchy isn't submission — it's understanding how continuity works. You value patient, disciplined mastery over quick wins.",
      inPlainEnglish: [
        "You naturally think beyond your own lifetime — legacy and continuity matter.",
        "You respect earned hierarchy and time-tested practices.",
        "You're patient and disciplined in skill-building — no shortcuts.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Traditionally Grounded (High Tradition Orientation)", 
          meaning: "You value practices proven across time — innovation must respect foundation." 
        },
        { 
          label: "Patiently Disciplined (High Conscientiousness)", 
          meaning: "You master slowly and properly — quality compounds over decades." 
        },
        { 
          label: "Hierarchically Aware (ISTJ/INFJ)", 
          meaning: "You understand structural order naturally — roles exist for reason." 
        },
        { 
          label: "Legacy-Minded (Type 1/6 Enneagram)", 
          meaning: "You track impact across generations — continuity is sacred." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Rituals connected to lineage or tradition (even chosen, not inherited).",
        "Long-term skill mastery (10-year commitments, not 90-day sprints).",
        "Maintain cross-generational relationships (elders and youth).",
      ],
      places: [
        "Historic cities with preserved architecture",
        "Cultural institutions and libraries",
        "Multi-generational neighborhoods",
      ],
      music: [
        "Traditional instrumentation",
        "Classical forms with historical depth",
        "Music showing evolution across generations",
      ],
      activities: [
        "Traditional arts (calligraphy, pottery, classical music)",
        "Genealogy and lineage research",
        "Long-mastery games (Go, chess, classical instruments)",
      ],
    },

    musicGenres: [
      { genre: "Classical", spotifySearch: spotifySearchUrl("Classical music"), why: "Structure, discipline, and historical continuity." },
      { genre: "Traditional Folk", spotifySearch: spotifySearchUrl("Traditional folk"), why: "Cultural memory preserved through generations." },
      { genre: "Chamber Music", spotifySearch: spotifySearchUrl("Chamber music"), why: "Refined collaboration and precision." },
      { genre: "Modern Classical", spotifySearch: spotifySearchUrl("Modern classical"), why: "Evolution within tradition." },
    ],

    strengths: [
      "Long-term thinking (multi-decade planning)",
      "Disciplined practice (sustained effort)",
      "Respect for proven systems",
      "Structural intelligence (understanding hierarchies)",
    ],

    watchouts: [
      "Rigidity (tradition as unchangeable)",
      "Difficulty with rapid change or disruption",
      "Over-deference to authority (even when flawed)",
      "Perfectionism blocking necessary iteration",
    ],

    tryThisWeek: [
      "Try one new method inside a familiar practice (same goal, different path).",
      "Question one inherited 'must' — replace with chosen principle.",
      "Do something in 20 minutes that you'd normally perfect for hours.",
    ],

    deepDive: {
      essence:
        "Kitsune combines high conscientiousness with long-term orientation. Research in deliberate practice (Ericsson) and cultural time perspective (Hofstede) shows this pattern excels at sustained mastery.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High future orientation + low impulsivity creates preference for proven systems over experimental novelty.",
          bullets: [
            "Delayed gratification comes naturally",
            "Respect hierarchy when it proves competence",
            "Value process as much as outcome",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide by examining precedent, consulting wisdom, and assessing long-term consequences across generations.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Constant disruption + no continuity + rapid change without foundation = anxiety and rigidity increase.",
        },
      ],
      shadowPatterns: [
        "Using tradition to avoid necessary change",
        "Hierarchy worship (following rank over truth)",
        "Perfection as procrastination",
      ],
      alignmentSignals: ["Long-term practice", "Respected mentors", "Clear lineage", "Patient progress"],
    },

    workStyle: {
      thrivesIn: ["Clear hierarchy", "Long-term projects", "Mastery-valued culture", "Stable organizations"],
      strugglesIn: ["Constant pivots", "Flat chaos", "Move-fast-break-things culture", "No reverence for expertise"],
      bestRoles: ["Craftsmanship", "Teaching/mentorship", "Archival/preservation", "Traditional professions"],
      collaboration: ["Clear roles", "Respect for expertise", "Patient timelines", "Quality focus"],
    },

    relationships: {
      youNeed: ["Commitment and stability", "Respect for your pace", "Shared values", "Long-term perspective"],
      youGive: ["Steady loyalty", "Patient support", "Wisdom over time", "Reliable presence"],
      watchFor: ["People seeking constant novelty", "Partners who mock tradition"],
      repairMoves: ["Patient conversation", "Acknowledge hurt without defensiveness", "Return to shared values"],
    },

    travelMode: {
      bestTrips: ["Historical sites", "Cultural immersion", "Master classes", "Pilgrimage-style journeys"],
      avoidTrips: ["Party tourism", "Rushed multi-city tours", "No cultural depth"],
      packingPhilosophy: ["Quality over quantity", "Items that last", "Respectful attire"],
      itineraryStyle: ["Deep not wide", "Learn history first", "Honor local customs"],
    },

    rituals: [
      {
        title: "Generational Reflection (Weekly, 30 minutes)",
        why: "Connects daily practice to longer arc of meaning.",
        steps: [
          "Review week's progress in long-term skill",
          "Write: 'What did I learn that my future self will value?'",
          "Identify one teaching to pass forward",
          "Gratitude for those who taught you",
        ],
      },
    ],

    focusThisWeek: {
      title: "Flexible tradition",
      intention: "Honor foundations while allowing evolution — tradition can breathe.",
      actions: [
        "Do one familiar practice in a new way",
        "Question one rule you follow without thinking",
        "Complete one task imperfectly but fully",
      ],
      frictionToExpect: ["Discomfort with 'wrong' approach", "Urge to perfect"],
      successSignal: ["Innovation didn't destroy foundation", "Felt freeing, not reckless"],
    },

    notes: [
      "Mythical archetype representing continuity-discipline pattern",
      "Not tied to any specific Asian culture",
    ],
  },

  // ========================================
  // CODE 6: JAEJIN - HARMONIST
  // Patterns: [11, 21, 14, 8, 7] = Structure Preference, Collaborative Preference, Hierarchy Awareness, Structure, Expression (compressed)
  // ========================================
  jaejin: {
    codeName: "jaejin",
    fullName: "Harmonist",
    snapshot: 
      "Loyal and emotionally deep — you hold intensity inside, balancing discipline with profound internal feeling.",

    origin: {
      level1: "Mythical Archetype: The Loyal Discipline",
      lineage: [
        "Compressed emotional expression (cultural emotion regulation research)",
        "Loyalty as identity (attachment theory + cultural psychology)",
        "Diligence and work ethic (achievement motivation research)",
        "Navigating hierarchy with dignity (social role theory)",
      ],
    },

    lens: {
      title: "Compressed Strength",
      description:
        "You feel deeply but express selectively. Your loyalty, once given, is absolute. You navigate structured environments with self-control and dignity, balancing intense internal experience with disciplined external presentation.",
      inPlainEnglish: [
        "You feel more than you show — expression is controlled, not absent.",
        "You're fiercely loyal once you commit to someone or something.",
        "You navigate hierarchy and structure with grace and hard work.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Emotionally Deep (High Emotional Depth, Controlled Expression)", 
          meaning: "Internal world is vast — you just don't broadcast everything." 
        },
        { 
          label: "Fiercely Loyal (Type 2/6 Enneagram)", 
          meaning: "Commitment is sacred — betrayal is unforgivable." 
        },
        { 
          label: "Diligently Driven (High Conscientiousness)", 
          meaning: "You outwork most people through consistent, disciplined effort." 
        },
        { 
          label: "Respectful Strength (ISFJ/ESFJ)", 
          meaning: "You honor structure without losing self — dignity in all roles." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Creative outlet for emotional release (art, music, writing).",
        "Balance work intensity with genuine rest (recovery is not weakness).",
        "Build trust slowly with select people — quality over quantity.",
      ],
      places: [
        "Work-ethic cultures that value diligence",
        "Clear social norms with respect for privacy",
        "Blend of tradition and modernity",
      ],
      music: [
        "Emotionally rich melodic music",
        "Ballads with cathartic depth",
        "Strong emotional hooks with controlled delivery",
      ],
      activities: [
        "Disciplined training (martial arts, structured fitness)",
        "Goal-based group activities",
        "Creative emotional release (music, art, journaling)",
      ],
    },

    musicGenres: [
      { genre: "R&B Ballads", spotifySearch: spotifySearchUrl("R&B ballads"), why: "Emotion without chaos — controlled depth." },
      { genre: "Alternative Pop", spotifySearch: spotifySearchUrl("Alternative pop"), why: "Modern edge with emotional core." },
      { genre: "Cinematic Music", spotifySearch: spotifySearchUrl("Cinematic music"), why: "Epic emotional arcs." },
      { genre: "Neo-Soul", spotifySearch: spotifySearchUrl("Neo-soul"), why: "Deep feeling with sophistication." },
    ],

    strengths: [
      "Loyalty (once committed, unshakeable)",
      "Work ethic (sustained high effort)",
      "Emotional resilience (enduring without collapse)",
      "Navigating structure with dignity",
    ],

    watchouts: [
      "Burnout from constant intensity without release",
      "Suppressed emotions becoming physical symptoms",
      "Over-loyalty to undeserving people or organizations",
      "Difficulty setting boundaries with authority",
    ],

    tryThisWeek: [
      "Name one emotion out loud to someone safe (no explanation needed — just name it).",
      "Take one rest block and treat it as training (recovery is discipline).",
      "Practice saying 'I can't' once without apologizing or justifying.",
    ],

    deepDive: {
      essence:
        "Harmonist combines high loyalty with controlled emotional expression. Research in emotion regulation shows this pattern uses internal processing + selective expression for social harmony.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High emotional depth + controlled expression ≠ emotional suppression. You process internally, express strategically.",
          bullets: [
            "Internal emotional world is rich and active",
            "Expression is choice, not inability",
            "Loyalty creates identity stability",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) assess loyalty implications, (2) consider hierarchy, (3) internal emotional check, (4) diligent action.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "No emotional outlet + exploited loyalty + endless work = burnout and resentment explosion.",
        },
      ],
      shadowPatterns: [
        "Suppressing emotion until explosion",
        "Loyalty to abusive systems",
        "Using work to avoid feeling",
      ],
      alignmentSignals: ["Creative emotional practice", "Trusted inner circle", "Balanced work/rest", "Clear boundaries"],
    },

    workStyle: {
      thrivesIn: ["Clear expectations", "Merit-based advancement", "Team loyalty culture", "Structured environment"],
      strugglesIn: ["Chaotic management", "Disloyalty normalized", "No work-life boundaries", "Disrespect for effort"],
      bestRoles: ["Operations", "Project management", "Team coordination", "Roles requiring sustained diligence"],
      collaboration: ["Clear roles", "Mutual respect", "Reliable teammates", "Acknowledged effort"],
    },

    relationships: {
      youNeed: ["Deep trust and loyalty", "Emotional safety", "Respect for privacy", "Partners who don't exploit dedication"],
      youGive: ["Unwavering support", "Thoughtful care", "Remembered details", "Consistent presence"],
      watchFor: ["People who take advantage of loyalty", "Partners who demand constant emotional performance"],
      repairMoves: ["Calm direct conversation", "Written letter before talking", "Action to demonstrate care"],
    },

    travelMode: {
      bestTrips: ["Cultural depth trips", "Goal-oriented travel (learn skill/language)", "Small trusted group", "Mix structure + freedom"],
      avoidTrips: ["Pure party tourism", "Superficial rushed tours", "Chaotic unplanned"],
      packingPhilosophy: ["Organized and prepared", "Balance comfort + efficiency"],
      itineraryStyle: ["Structured with flex", "Research culture first", "Mix obligations + rest"],
    },

    rituals: [
      {
        title: "Weekly Emotional Release (45 minutes)",
        why: "Prevents buildup and honors internal experience.",
        steps: [
          "20 min: Creative expression (write, draw, music) — no audience",
          "10 min: Physical release (intense workout or dance)",
          "10 min: Journal honest feelings (no filter)",
          "5 min: Breathwork reset",
        ],
      },
    ],

    focusThisWeek: {
      title: "Expressed authenticity",
      intention: "Let trusted people see more of your internal world.",
      actions: [
        "Share one vulnerable feeling before you've 'processed it perfectly'",
        "Let someone care for you without immediately reciprocating",
        "Take one full day of rest without guilt",
      ],
      frictionToExpect: ["Feeling exposed or unprofessional", "Urge to immediately return to productivity"],
      successSignal: ["Vulnerability strengthened connection", "Rest felt earned, not stolen"],
    },

    notes: [
      "Mythical archetype representing loyal-discipline pattern",
      "Not tied to any specific East Asian culture",
    ],
  },
  // ========================================
  // CODE 7: NAMSEA - FLOWBINDER
  // Patterns: [6, 9, 20, 27, 15] = Present Focus, Improvisation, Group Dynamics, Optimism, Environmental Sensitivity
  // ========================================
  namsea: {
    codeName: "namsea",
    fullName: "Flowbinder",
    snapshot: 
      "Adaptable and fluid — you navigate life like water, preserving harmony through graceful movement and relational intelligence.",

    origin: {
      level1: "Mythical Archetype: The Fluid Adapter",
      lineage: [
        "Water metaphor cognition (conceptual metaphor theory: Lakoff & Johnson)",
        "Conflict avoidance through adaptation (conflict resolution research)",
        "Relational harmony (cultural psychology: Markus & Kitayama)",
        "Flow states and improvisation (Csikszentmihalyi)",
      ],
    },

    lens: {
      title: "Fluid Adaptation",
      description:
        "You move through life like water — adapting to containers, flowing around obstacles, taking the path of least resistance. Your strength is graceful flexibility, not rigid force. You preserve relationships through movement, not confrontation.",
      inPlainEnglish: [
        "You adapt naturally to changing circumstances — resistance feels unnatural.",
        "You avoid conflict through clever maneuvering, not direct opposition.",
        "You keep relationships flowing smoothly through flexibility.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Fluidly Adaptive (High Agreeableness + Openness)", 
          meaning: "You change form to fit context — not weakness, but intelligent flexibility." 
        },
        { 
          label: "Harmony Keeper (Type 9 Enneagram)", 
          meaning: "You reduce friction and smooth relational edges — peace through flow." 
        },
        { 
          label: "Calm Resilience (Low Neuroticism)", 
          meaning: "You weather storms without breaking — bending, not snapping." 
        },
        { 
          label: "Relational Balance (ISFP/ESFP)", 
          meaning: "You sense and maintain equilibrium in relationships and groups." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build flexibility into schedules (rigid structure feels suffocating).",
        "Water-based activities for physical metaphor alignment.",
        "Calm, aesthetically gentle environments.",
      ],
      places: [
        "Waterfront locations (ocean, rivers, lakes)",
        "Communities with gentle social rhythms",
        "Harmony-valuing cultures (low aggression, high cooperation)",
      ],
      music: [
        "Soft grooves and chill rhythms",
        "Gentle electronic and lo-fi",
        "Music that flows without jarring transitions",
      ],
      activities: [
        "Swimming, yoga, tai chi (embodied flow)",
        "Cooking, tea ceremony (gentle ritual)",
        "Flow-state hobbies (painting, gardening, crafting)",
      ],
    },

    musicGenres: [
      { genre: "Chillhop", spotifySearch: spotifySearchUrl("Chillhop"), why: "Flow-state baseline without intensity." },
      { genre: "Downtempo", spotifySearch: spotifySearchUrl("Downtempo"), why: "Gentle pulse that moves you forward." },
      { genre: "City Pop", spotifySearch: spotifySearchUrl("City pop"), why: "Smooth optimism and soft energy." },
      { genre: "Ambient Electronica", spotifySearch: spotifySearchUrl("Ambient electronica"), why: "Fluid texture without edges." },
    ],

    strengths: [
      "Adaptability (thriving through change)",
      "Conflict resolution (de-escalation mastery)",
      "Calm under pressure (emotional regulation)",
      "Relational intelligence (reading group dynamics)",
    ],

    watchouts: [
      "Avoiding necessary confrontation until crisis",
      "Over-accommodation (losing self in others' needs)",
      "Weak boundaries (flowing into others' containers)",
      "Resentment buildup from unexpressed needs",
    ],

    tryThisWeek: [
      "Say one clear 'no' without explanation or softening.",
      "Have one direct conversation you've been flowing around.",
      "Choose one non-negotiable boundary and maintain it for 7 days.",
    ],

    deepDive: {
      essence:
        "Flowbinder combines high agreeableness with adaptive flexibility. Research in conflict avoidance and relational harmony shows this pattern excels at maintaining social cohesion through strategic adaptation.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High agreeableness + low neuroticism creates preference for harmony over confrontation. You're not 'weak' — you're strategically fluid.",
          bullets: [
            "Adaptation is active intelligence, not passive submission",
            "You sense relational tension before others name it",
            "Calm baseline allows for flexible response",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide by: (1) assess relational impact, (2) find path of least resistance, (3) preserve harmony while moving forward.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Constant confrontation + rigid structure + no flow = rigidity, shutdown, or passive-aggressive resentment.",
        },
      ],
      shadowPatterns: [
        "Using flexibility to avoid truth",
        "Losing self through over-adaptation",
        "Passive-aggression instead of direct communication",
      ],
      alignmentSignals: ["Water contact", "Flexible routines", "Clear boundaries", "Authentic relationships"],
    },

    workStyle: {
      thrivesIn: ["Collaborative teams", "Flexible structure", "Harmony culture", "Adaptive roles"],
      strugglesIn: ["Aggressive competition", "Constant conflict", "Rigid hierarchy", "Win-lose culture"],
      bestRoles: ["Mediation/facilitation", "Client relations", "Creative collaboration", "Support roles"],
      collaboration: ["Consensus building", "Gentle communication", "Shared decision-making", "Mutual respect"],
    },

    relationships: {
      youNeed: ["Gentle communication", "Emotional safety", "Flexibility honored", "Non-aggressive partners"],
      youGive: ["Peace and ease", "Adaptive support", "Calm presence", "Relational smoothness"],
      watchFor: ["People who exploit your flexibility", "Partners who create constant conflict"],
      repairMoves: ["Gentle re-engagement", "Express hurt without blame", "Propose new flow together"],
    },

    travelMode: {
      bestTrips: ["Beach/water destinations", "Slow-paced exploration", "Wellness retreats", "Low-pressure itineraries"],
      avoidTrips: ["Aggressive competitive trips", "Rushed packed schedules", "High-conflict group dynamics"],
      packingPhilosophy: ["Comfortable and versatile", "Light and adaptable"],
      itineraryStyle: ["Loose framework", "Flow with mood", "Leave space for nothing"],
    },

    rituals: [
      {
        title: "Evening Flow Release (20 minutes)",
        why: "Releases accumulated tension from over-accommodation.",
        steps: [
          "5 min: Gentle stretching or yoga",
          "10 min: Journal honestly (no self-editing for others)",
          "5 min: Water contact (shower, bath, drink slowly)",
        ],
      },
    ],

    focusThisWeek: {
      title: "Grounded flow",
      intention: "Maintain flexibility while honoring your own needs.",
      actions: [
        "State one preference clearly before adapting to others",
        "Notice one moment you want to flow around conflict — pause first",
        "Set one small boundary and keep it, even if awkward",
      ],
      frictionToExpect: ["Discomfort with 'being difficult'", "Urge to immediately smooth over"],
      successSignal: ["Boundary held without guilt", "Felt centered, not selfish"],
    },

    notes: [
      "Mythical archetype representing adaptive-harmony pattern",
      "Not tied to any specific Southeast Asian culture",
    ],
  },

  // ========================================
  // CODE 8: SHOKUNIN - BLADESMITH
  // Patterns: [7, 5, 8, 4, 11] = Craftsmanship, Detail Orientation, Structure, Sensory Appreciation, Influence Drive
  // ========================================
  shokunin: {
    codeName: "shokunin",
    fullName: "BladeSmith",
    snapshot:
      "Detail-obsessed and craft-driven — you pursue mastery through repetition, precision, and deep focus on quality.",

    origin: {
      level1: "Mythical Archetype: The Quiet Master",
      lineage: [
        "Deliberate practice and mastery (Anders Ericsson: 10,000-hour research)",
        "Intrinsic motivation (Self-Determination Theory: Deci & Ryan)",
        "Quality focus over speed (Craftsmanship research)",
        "Detail orientation (Big Five conscientiousness research)",
      ],
    },

    lens: {
      title: "Quiet Mastery",
      description:
        "You don't chase hype — you chase refinement. Your confidence grows from repetition, standards, and depth. You care about quality more than speed, and details more than appearances. You work best with focus, clean inputs, and clear standards.",
      inPlainEnglish: [
        "You care about quality more than speed or scale.",
        "You notice details that most people skip over.",
        "You work best with sustained focus, not constant task-switching.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Craft-Driven (High Conscientiousness + Openness to Detail)", 
          meaning: "Mastery and refinement motivate you more than external rewards or shortcuts." 
        },
        { 
          label: "Detail-Oriented (High Attention to Detail)", 
          meaning: "You spot what's off and feel compelled to improve it — excellence is felt, not just seen." 
        },
        { 
          label: "Deep Focus (Low Distractibility)", 
          meaning: "You prefer sustained concentration over constant context-switching — flow states are your zone." 
        },
        { 
          label: "High Standards (Type 1 Enneagram)", 
          meaning: "You want to ship work you'd sign your name to — anything less feels wrong." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Deep-focus blocks + recovery rhythm (90-min work, 20-min reset).",
        "Reduce noise: fewer commitments, higher quality.",
        "Clean workspace ritual after sessions (physical reset).",
      ],
      places: [
        "Quiet, design-forward neighborhoods with steady rhythm",
        "Studios, libraries, spaces with good light and minimal distraction",
        "Nature resets: parks, coastlines, slow mornings",
      ],
      music: [
        "Instrumental focus (lo-fi, ambient, minimal techno)",
        "Modern classical with clean structure",
        "Anything precise rather than chaotic",
      ],
      activities: [
        "Skill-based crafts (cooking, design, coding, woodworking, photography)",
        "Technique-first training (climbing, yoga alignment, form lifting)",
        "Workshops where mastery compounds over time",
      ],
    },

    musicGenres: [
      { genre: "Minimal Techno", spotifySearch: spotifySearchUrl("Minimal techno"), why: "Precision rhythm, low cognitive clutter." },
      { genre: "Ambient Focus", spotifySearch: spotifySearchUrl("Ambient focus"), why: "Deep work scaffolding without lyrics." },
      { genre: "Modern Classical", spotifySearch: spotifySearchUrl("Modern classical"), why: "Structure + emotional depth." },
      { genre: "Lo-Fi Instrumental", spotifySearch: spotifySearchUrl("Lofi instrumental"), why: "Steady concentration baseline." },
    ],

    strengths: [
      "Attention to detail (micro-level quality control)",
      "Consistency (sustained effort over time)",
      "Mastering complex systems (depth over breadth)",
      "Intrinsic motivation (driven by craft, not applause)",
    ],

    watchouts: [
      "Perfectionism blocking shipping (endless refinement)",
      "Difficulty delegating (no one meets your standards)",
      "Over-refining past point of diminishing returns",
      "Burnout in chaotic, low-quality environments",
    ],

    tryThisWeek: [
      "Protect one 90-minute deep-work block. No notifications. Single objective.",
      "Ship one thing at 'clean enough' (define acceptance criteria first, then stop).",
      "Declutter one workspace surface and maintain it for 7 days.",
    ],

    deepDive: {
      essence:
        "BladeSmith combines high conscientiousness with intrinsic motivation toward mastery. Research in deliberate practice (Ericsson) shows this pattern achieves expert-level skill through sustained, focused repetition.",
      sections: [
        {
          title: "Neurological Foundation",
          body:
            "High detail-orientation + low impulsivity creates natural flow states during focused work. Your brain rewards refinement intrinsically.",
          bullets: [
            "Dopamine from quality improvement, not just completion",
            "Error detection is automatic (you can't NOT see flaws)",
            "Deep work feels restorative, not depleting",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide by: (1) assess quality implications, (2) consider long-term mastery, (3) refine until clean, (4) ship with integrity.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Chaotic environment + constant interruptions + low standards = frustration, withdrawal, or compulsive over-work.",
        },
      ],
      shadowPatterns: [
        "Perfectionism as procrastination",
        "Judging others for 'low standards'",
        "Using craft to avoid human connection",
      ],
      alignmentSignals: ["Daily deep work", "Clear standards", "Skill progression", "Clean environment"],
    },

    workStyle: {
      thrivesIn: ["Autonomy", "Quality culture", "Deep focus support", "Clear standards"],
      strugglesIn: ["Constant meetings", "Low-quality accepted", "Chaotic open offices", "Rush culture"],
      bestRoles: ["Specialized craft", "Technical depth roles", "Quality assurance", "R&D"],
      collaboration: ["Async communication", "Respect for focus time", "Shared standards", "Clear ownership"],
    },

    relationships: {
      youNeed: ["Respect for focus time", "Shared quality values", "Low drama", "Depth over breadth"],
      youGive: ["Reliable excellence", "Thoughtful care", "Consistent presence", "High-quality output"],
      watchFor: ["People who mock precision", "Partners who create constant chaos"],
      repairMoves: ["Thoughtful gesture (quality over speed)", "Clear communication", "Demonstrate care through craft"],
    },

    travelMode: {
      bestTrips: ["Craftsmanship destinations (workshops, studios)", "Cultural depth", "Skill-learning focused", "Slow exploration"],
      avoidTrips: ["Rushed multi-city tours", "Party-focused", "Superficial tourist traps"],
      packingPhilosophy: ["Quality essentials", "Well-made items", "Organized system"],
      itineraryStyle: ["Deep over wide", "Master one thing", "Leave time for practice"],
    },

    rituals: [
      {
        title: "Morning Craft Ritual (30 minutes)",
        why: "Starts day with quality focus before reactive tasks claim energy.",
        steps: [
          "5 min: Workspace setup (clean, organized, intentional)",
          "20 min: Deliberate practice on one skill",
          "5 min: Reflect on what improved, what needs work",
        ],
      },
    ],

    focusThisWeek: {
      title: "Excellence through completion",
      intention: "Ship clean work without endless refinement.",
      actions: [
        "Define 'done' criteria before starting one project",
        "Set timer: stop refining when criteria met, even if you see more to improve",
        "Celebrate shipping, not just perfection",
      ],
      frictionToExpect: ["'Not good enough yet' feeling", "Urge to add 'just one more thing'"],
      successSignal: ["Shipped on time with integrity", "Felt proud, not anxious"],
    },

    notes: [
      "Mythical archetype representing mastery-precision pattern",
      "Not tied to any specific Japanese or craft culture",
    ],
  },

  // ========================================
  // CODE 9: KHORUUN - SKYRIDER
  // Patterns: [9, 29, 15, 26, 12] = Improvisation, Autonomy, Environmental Sensitivity, Nature Connection, Influence Drive
  // ========================================
  khoruun: {
    codeName: "khoruun",
    fullName: "SkyRider",
    snapshot: 
      "Freedom-driven and mobile — you thrive in open spaces, movement, and decentralized autonomy.",

    origin: {
      level1: "Mythical Archetype: The Nomadic Free Spirit",
      lineage: [
        "Nomadic mobility intelligence (environmental psychology)",
        "Freedom through movement (self-determination theory: autonomy need)",
        "Decentralized thinking (organizational psychology: flat structures)",
        "Wide-horizon cognition (spatial cognition research)",
      ],
    },

    lens: {
      title: "Nomadic Freedom",
      description:
        "You need movement and freedom to thrive. Restriction feels like suffocation. You think expansively, adapt quickly, and resist being pinned down by systems, locations, or rigid commitments. Your intelligence is mobile, not stationary.",
      inPlainEnglish: [
        "You need freedom and movement — staying still feels like dying slowly.",
        "You resist centralized control and rigid commitments.",
        "You think in big ranges, wide possibilities, and open horizons.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Freedom-Driven (High Autonomy Need)", 
          meaning: "Restriction triggers fight-or-flight — you need space to move physically and mentally." 
        },
        { 
          label: "Nomadic Intelligence (High Openness + Low Conscientiousness)", 
          meaning: "You adapt fast to new environments — novelty is energizing, not stressful." 
        },
        { 
          label: "Decentralized Mind (Type 7/8 Enneagram)", 
          meaning: "You resist hierarchical control — authority must be earned, not assumed." 
        },
        { 
          label: "Horizon Focus (ENFP/ESTP)", 
          meaning: "You think spatially and expansively — confinement shrinks your world." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Keep structural flexibility (avoid long-term rigid commitments).",
        "Travel regularly (even local exploration counts).",
        "Avoid roles/relationships that feel like cages.",
      ],
      places: [
        "Open landscapes with long sightlines",
        "Cities with mobility and movement infrastructure",
        "Anywhere you can roam freely without barriers",
      ],
      music: [
        "Expansive cinematic soundtracks",
        "Throat-singing and wide textures",
        "Music that evokes motion and space",
      ],
      activities: [
        "Cycling, motorcycling, horseback riding",
        "Exploration and adventure travel",
        "Any freedom-of-movement hobby (parkour, skating, flying)",
      ],
    },

    musicGenres: [
      { genre: "Cinematic Epic", spotifySearch: spotifySearchUrl("Cinematic epic"), why: "Wide-horizon emotional lift." },
      { genre: "Mongolian Throat Singing", spotifySearch: spotifySearchUrl("Mongolian throat singing"), why: "Ancestral spaciousness and power." },
      { genre: "Road Trip Indie", spotifySearch: spotifySearchUrl("Road trip indie rock"), why: "Movement fuel and freedom energy." },
      { genre: "Open Air Electronic", spotifySearch: spotifySearchUrl("Open air electronic"), why: "Motion and lift without confinement." },
    ],

    strengths: [
      "Adaptability (quick learning in new environments)",
      "Freedom thinking (resisting unnecessary constraints)",
      "Mobility intelligence (navigating space and change)",
      "Resourcefulness (thriving with minimal stability)",
    ],

    watchouts: [
      "Commitment avoidance (fleeing before roots can form)",
      "Chronic restlessness (inability to ever settle)",
      "Difficulty with necessary routine or structure",
      "Burning bridges to maintain freedom illusion",
    ],

    tryThisWeek: [
      "Choose ONE small commitment for 30 days and make it a game (not a cage).",
      "Practice staying in one place for 60 minutes with no escape behaviors.",
      "Build one stabilizing ritual that doesn't kill freedom (10 min/day).",
    ],

    deepDive: {
      essence:
        "SkyRider combines high autonomy need with low need for structure. Research in self-determination theory shows this pattern thrives when movement and choice are preserved.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High openness + low conscientiousness creates preference for exploration over stability. You're not 'irresponsible' — you're optimized for mobility.",
          bullets: [
            "Novelty activates reward centers (dopamine from new environments)",
            "Routine feels like death, not comfort",
            "Freedom is felt physically, not just conceptually",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide by: (1) assess freedom impact, (2) check for escape routes, (3) commit if movement is preserved.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Trapped in rigid structure + no movement + forced commitment = rage, escape planning, or complete shutdown.",
        },
      ],
      shadowPatterns: [
        "Using freedom as avoidance of depth",
        "Fleeing before vulnerability can form",
        "Confusing commitment with captivity",
      ],
      alignmentSignals: ["Regular travel", "Flexible commitments", "Movement practice", "Open options"],
    },

    workStyle: {
      thrivesIn: ["Remote/flexible", "Project-based", "Travel included", "Autonomy granted"],
      strugglesIn: ["Rigid 9-5", "Micromanagement", "Office-bound", "Long-term single location"],
      bestRoles: ["Consulting", "Freelance", "Travel-based work", "Entrepreneurship"],
      collaboration: ["Clear deliverables", "Trust-based", "Async communication", "Outcome focus"],
    },

    relationships: {
      youNeed: ["Freedom and space", "Non-possessive partners", "Shared adventure", "Trust without control"],
      youGive: ["Excitement and novelty", "Resourcefulness", "Adventure spirit", "Non-clingy love"],
      watchFor: ["People who need constant presence", "Partners who view independence as threat"],
      repairMoves: ["Adventure together", "Honest communication about needs", "Reconnect through movement"],
    },

    travelMode: {
      bestTrips: ["Open-ended exploration", "Motorcycle/road trips", "Multi-country adventures", "Spontaneous routes"],
      avoidTrips: ["Rigid group tours", "Resort confinement", "Over-scheduled itineraries"],
      packingPhilosophy: ["Light and mobile", "Ready to move", "Minimal baggage"],
      itineraryStyle: ["Loose direction", "Follow wind", "No fixed timeline"],
    },

    rituals: [
      {
        title: "Weekly Horizon Check (30 minutes)",
        why: "Prevents cage-feeling from building up unnoticed.",
        steps: [
          "Review week: Did I feel free or trapped?",
          "Plan one movement activity for next week",
          "Identify one micro-commitment to keep (build trust without cage)",
          "Map next adventure (even if 6 months out)",
        ],
      },
    ],

    focusThisWeek: {
      title: "Grounded freedom",
      intention: "Practice commitment without confinement.",
      actions: [
        "Keep one small daily commitment for 7 days (prove you can)",
        "Stay present in one conversation without planning escape",
        "Build one anchor that creates stability, not cage (morning walk, weekly call)",
      ],
      frictionToExpect: ["Feeling trapped by routine", "Urge to flee commitment"],
      successSignal: ["Commitment felt like choice, not prison", "Freedom through discipline, not chaos"],
    },

    notes: [
      "Mythical archetype representing freedom-movement pattern",
      "Not tied to any specific nomadic culture",
    ],
  },

  // ========================================
  // CODE 10: LHUMIR - STILLMIND
  // Patterns: [1, 6, 12, 16, 25] = Abstract Thinking, Present Focus, Influence Drive (low), Introspection, Meaning Orientation
  // ========================================
  lhumir: {
    codeName: "lhumir",
    fullName: "StillMind",
    snapshot: 
      "Contemplative and calm — you find clarity through stillness, compassion, and disciplined inner work.",

    origin: {
      level1: "Mythical Archetype: The Contemplative Presence",
      lineage: [
        "Contemplative consciousness (mindfulness research: Kabat-Zinn)",
        "Impermanence worldview (Buddhist psychology research)",
        "Compassion cultivation (Kristin Neff: self-compassion research)",
        "Stillness-based regulation (meditation neuroscience)",
      ],
    },

    lens: {
      title: "Contemplative Clarity",
      description:
        "Your power comes from inner stillness, not external action. You accept impermanence naturally — change doesn't scare you because you expect it. Your calm includes active care for others, not detachment. You go inward to find truth, not to escape.",
      inPlainEnglish: [
        "You find answers through quiet contemplation, not endless action.",
        "You accept change naturally — impermanence is reality, not tragedy.",
        "Your calm includes compassion — stillness that holds others too.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Still Clarity (High Introspection + Low Neuroticism)", 
          meaning: "You stabilize through inner quiet, not external control." 
        },
        { 
          label: "Impermanence-Aware (High Openness to Change)", 
          meaning: "Change doesn't scare you — you expect it and flow with it." 
        },
        { 
          label: "Compassion Discipline (Type 9/2 Enneagram)", 
          meaning: "Care is active practice, not passive sentiment — you work at kindness." 
        },
        { 
          label: "Inner Focus (INFP/INFJ)", 
          meaning: "You resolve through inward contemplation, not outward reaction." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Daily meditation or contemplative practice (non-negotiable anchor).",
        "Simplify physical environment (fewer possessions, cleaner space).",
        "Non-attachment to outcomes (hold goals lightly).",
      ],
      places: [
        "Mountains, high altitude, quiet elevation",
        "Contemplative settings (monasteries, retreat centers, nature)",
        "Minimal noise and visual stimulation environments",
      ],
      music: [
        "Singing bowls and harmonic resonance",
        "Chanting and mantra textures",
        "Ambient minimal soundscapes",
      ],
      activities: [
        "Meditation, yoga, tai chi",
        "Philosophy and spiritual study",
        "Walking meditation in nature",
        "Silence retreats",
      ],
    },

    musicGenres: [
      { genre: "Meditation Music", spotifySearch: spotifySearchUrl("Meditation music"), why: "Baseline nervous system regulation." },
      { genre: "Tibetan Singing Bowls", spotifySearch: spotifySearchUrl("Tibetan singing bowls"), why: "Clarity through resonance and vibration." },
      { genre: "Ambient Drone", spotifySearch: spotifySearchUrl("Ambient drone"), why: "Long stillness arcs without interruption." },
      { genre: "Sacred Chant", spotifySearch: spotifySearchUrl("Sacred chant"), why: "Contemplative focus through repetition." },
    ],

    strengths: [
      "Inner clarity (cutting through mental noise)",
      "Emotional regulation (calm under chaos)",
      "Compassionate presence (holding space for others)",
      "Acceptance of change (low resistance to impermanence)",
    ],

    watchouts: [
      "Over-detachment (avoiding necessary action)",
      "Spiritual bypassing (using peace to avoid problems)",
      "Under-asserting needs (compassion without boundaries)",
      "Neglecting practical matters (all contemplation, no execution)",
    ],

    tryThisWeek: [
      "Set one concrete material goal (small, measurable, worldly).",
      "Do one 'worldly' task with full presence (no spiritual bypass).",
      "Practice saying what you want directly once (clear request).",
    ],

    deepDive: {
      essence:
        "StillMind combines high introspection with low reactivity. Research in contemplative neuroscience shows this pattern achieves emotional regulation through inner stillness, not external control.",
      sections: [
        {
          title: "Neurological Foundation",
          body:
            "Meditation practice literally changes brain structure — thicker prefrontal cortex, reduced amygdala reactivity. Your calm is trained, not just temperament.",
          bullets: [
            "Inner stillness as active skill, not passive state",
            "Compassion requires practice (you work at it)",
            "Acceptance ≠ passivity (you can act from calm)",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) create inner stillness, (2) observe without attachment, (3) wait for clarity, (4) act from center.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "No contemplative practice + constant external demands + forced reactivity = anxiety spike or complete withdrawal.",
        },
      ],
      shadowPatterns: [
        "Using detachment to avoid responsibility",
        "Spiritual bypassing ('it's all impermanent anyway')",
        "Refusing to assert needs (compassion without boundaries)",
      ],
      alignmentSignals: ["Daily practice", "Simple living", "Clear boundaries", "Active compassion"],
    },

    workStyle: {
      thrivesIn: ["Quiet environments", "Meaningful work", "Autonomy", "Contemplative pace"],
      strugglesIn: ["Aggressive culture", "Constant urgency", "High chaos", "Reactivity rewarded"],
      bestRoles: ["Counseling/therapy", "Teaching contemplative practice", "Research", "Writing"],
      collaboration: ["Calm communication", "Deep listening", "Non-reactive presence", "Clear intentions"],
    },

    relationships: {
      youNeed: ["Emotional calm", "Respect for stillness", "Shared values", "Non-reactive partners"],
      youGive: ["Grounded presence", "Deep listening", "Compassionate holding", "Perspective"],
      watchFor: ["People who create constant drama", "Partners who mistake calm for indifference"],
      repairMoves: ["Meditation together", "Calm honest conversation", "Listen without fixing"],
    },

    travelMode: {
      bestTrips: ["Meditation retreats", "Mountain solitude", "Spiritual pilgrimages", "Minimal tourism"],
      avoidTrips: ["Party destinations", "Chaotic group tours", "Overstimulation focus"],
      packingPhilosophy: ["Minimal essentials", "Meditation tools", "Simple comfort"],
      itineraryStyle: ["Unstructured stillness", "Follow inner guidance", "Plenty of nothing"],
    },

    rituals: [
      {
        title: "Daily Sitting Practice (20-40 minutes)",
        why: "Core regulation — everything flows from this anchor.",
        steps: [
          "Same time, same place daily",
          "Sit in stillness (breath focus, body scan, or open awareness)",
          "No agenda, no performance — just being",
          "Journal brief reflection after",
        ],
      },
    ],

    focusThisWeek: {
      title: "Engaged compassion",
      intention: "Act from stillness, don't hide in it.",
      actions: [
        "Complete one practical task you've been avoiding with mindful presence",
        "Assert one need clearly and directly",
        "Balance meditation with embodied action",
      ],
      frictionToExpect: ["Feels 'unspiritual' to be assertive", "Urge to return to pure contemplation"],
      successSignal: ["Action felt aligned, not reactive", "Presence included practical engagement"],
    },

    notes: [
      "Mythical archetype representing contemplative-stillness pattern",
      "Not tied to any specific Buddhist or meditation tradition",
    ],
  },
  // ========================================
  // CODE 11: YATEVAR - CYCLEKEEPER
  // Patterns: [1, 16, 25, 22, 8] = Abstract Thinking, Introspection, Meaning Orientation, Tradition, Structure
  // ========================================
  yatevar: {
    codeName: "yatevar",
    fullName: "CycleKeeper",
    snapshot: 
      "Ritual and cosmic order — you understand life through duty, cycles, layered meaning, and precision of practice.",

    origin: {
      level1: "Mythical Archetype: The Ritual Philosopher",
      lineage: [
        "Cyclical time perception (temporal psychology research)",
        "Dharmic duty orientation (moral psychology: Shweder)",
        "Ritual precision (ritual studies: Roy Rappaport)",
        "Metaphysical abstraction (philosophy of mind research)",
      ],
    },

    lens: {
      title: "Cosmic Duty",
      description:
        "You see life as governed by principles and cycles, not random chaos. Ritual and form matter because they encode truth. Duty isn't burden — it's alignment with cosmic order. You need meaning behind action, not just efficiency.",
      inPlainEnglish: [
        "You see life as governed by patterns and principles, not randomness.",
        "Duty and proper form matter deeply to you — there's a right way.",
        "You need philosophical meaning behind actions, not just results.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Philosophical Ground (High Abstract Thinking + Meaning Orientation)", 
          meaning: "You need conceptual frameworks and principles — random action feels empty." 
        },
        { 
          label: "Ritual Precision (High Conscientiousness + Tradition)", 
          meaning: "Form is part of truth — how you do things matters as much as what you do." 
        },
        { 
          label: "Duty-Driven (Type 1/6 Enneagram)", 
          meaning: "You do what's right even when it's hard — obligation as sacred responsibility." 
        },
        { 
          label: "Cosmic Awareness (INTJ/INFJ)", 
          meaning: "You think beyond immediate concerns — patterns across time and space." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Structured daily rituals (morning practice, evening reflection).",
        "Study philosophical and spiritual texts regularly.",
        "Balance abstract thinking with embodied action.",
      ],
      places: [
        "Places with spiritual infrastructure (temples, sacred sites)",
        "Philosophical communities and study groups",
        "Locations with continuity and historical depth",
      ],
      music: [
        "Ceremonial and sacred music",
        "Classical structures with philosophical depth",
        "Chanting and mantra repetition",
      ],
      activities: [
        "Yoga with philosophical study",
        "Martial arts with spiritual foundation",
        "Sacred study and contemplative practice",
        "Ceremony and ritual creation",
      ],
    },

    musicGenres: [
      { genre: "Mantra & Chant", spotifySearch: spotifySearchUrl("Mantra chant"), why: "Ritual focus and cosmic alignment." },
      { genre: "Indian Classical", spotifySearch: spotifySearchUrl("Indian classical"), why: "Discipline, cycles, and mathematical precision." },
      { genre: "Ceremonial World", spotifySearch: spotifySearchUrl("Ceremonial world music"), why: "Sacred order through sound." },
      { genre: "Devotional Fusion", spotifySearch: spotifySearchUrl("Devotional fusion"), why: "Tradition meets contemporary depth." },
    ],

    strengths: [
      "Philosophical depth (understanding complex systems)",
      "Ritual intelligence (creating meaningful practice)",
      "Duty fulfillment (doing right despite difficulty)",
      "Cosmic perspective (thinking beyond self and moment)",
    ],

    watchouts: [
      "Rigidity (ritual becomes inflexible dogma)",
      "Over-intellectualization (thinking instead of doing)",
      "Difficulty improvising (needing perfect form)",
      "Judging others' lack of philosophical depth",
    ],

    tryThisWeek: [
      "Do one thing spontaneously without philosophical justification.",
      "Pick one ritual and simplify it (keep meaning, drop excess form).",
      "Turn one belief into concrete action (prove it through behavior, not just thought).",
    ],

    deepDive: {
      essence:
        "CycleKeeper combines high meaning-orientation with ritual precision. Research in temporal psychology and moral foundations shows this pattern creates order through principled practice.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High conscientiousness + meaning-seeking + abstract thinking creates natural philosophical orientation. You're not 'overthinking' — you're pattern-mapping reality.",
          bullets: [
            "Ritual creates psychological order and meaning",
            "Duty provides identity stability across time",
            "Cycles are comforting (predictable patterns in chaos)",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) consult principles, (2) assess duty implications, (3) check alignment with cosmic order, (4) execute with precision.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "No philosophical framework + meaningless tasks + broken rituals = existential anxiety and rigid compensatory control.",
        },
      ],
      shadowPatterns: [
        "Using philosophy to avoid action",
        "Ritual becoming empty performance",
        "Duty as self-punishment, not alignment",
      ],
      alignmentSignals: ["Daily practice", "Philosophical study", "Meaningful work", "Embodied principles"],
    },

    workStyle: {
      thrivesIn: ["Mission-driven work", "Clear principles", "Structured practice", "Philosophical depth"],
      strugglesIn: ["Meaningless tasks", "Constant chaos", "No guiding principles", "Shallow culture"],
      bestRoles: ["Philosophy/teaching", "Spiritual leadership", "Policy/ethics work", "Research with meaning"],
      collaboration: ["Shared values", "Principled discussion", "Clear frameworks", "Ritual respect"],
    },

    relationships: {
      youNeed: ["Philosophical alignment", "Shared principles", "Ritual respect", "Depth and meaning"],
      youGive: ["Principled consistency", "Philosophical guidance", "Ritual stability", "Cosmic perspective"],
      watchFor: ["People who mock meaning-seeking", "Partners with no principles"],
      repairMoves: ["Philosophical conversation", "Ritual reconnection", "Clarify principles together"],
    },

    travelMode: {
      bestTrips: ["Sacred sites and pilgrimages", "Philosophical retreats", "Historical depth exploration", "Ceremonial experiences"],
      avoidTrips: ["Meaningless party tourism", "Superficial rushed tours", "No cultural depth"],
      packingPhilosophy: ["Sacred items and books", "Ritual tools", "Intentional preparation"],
      itineraryStyle: ["Principle-guided", "Ceremony included", "Deep over wide"],
    },

    rituals: [
      {
        title: "Daily Dharma Practice (45 minutes)",
        why: "Aligns action with cosmic order through embodied ritual.",
        steps: [
          "Morning ritual (yoga, meditation, or movement - 20 min)",
          "Philosophical study (read sacred text - 15 min)",
          "Intention setting aligned with principles (5 min)",
          "Evening reflection on duty fulfillment (5 min)",
        ],
      },
    ],

    focusThisWeek: {
      title: "Embodied philosophy",
      intention: "Live principles through action, not just contemplation.",
      actions: [
        "Take one philosophical belief and act on it concretely",
        "Simplify one ritual while keeping its essence",
        "Do something without needing perfect philosophical justification",
      ],
      frictionToExpect: ["Feels 'wrong' to act without full understanding", "Urge to add more complexity"],
      successSignal: ["Action felt aligned despite imperfection", "Philosophy lived, not just studied"],
    },

    notes: [
      "Mythical archetype representing ritual-philosophy pattern",
      "Not tied to any specific Vedic or indigenous spiritual tradition",
    ],
  },

  // ========================================
  // CODE 12: TAHIRI - HEARTBEARER
  // Patterns: [8, 12, 14, 22, 24] = Structure, Influence Drive, Hierarchy Awareness, Tradition, Emotional Expressiveness
  // ========================================
  Tahiri: {
    codeName: "Tahiri",
    fullName: "HeartBearer",
    snapshot: 
      "Warm and expressive — you're grounded in honor, hospitality, and bold emotional truth through shared values.",

    origin: {
      level1: "Mythical Archetype: The Generous Heart",
      lineage: [
        "Honor-based moral systems (moral foundations theory: Haidt)",
        "Hospitality as sacred duty (cultural psychology research)",
        "Emotional expressiveness (affective science: cultural display rules)",
        "Kinship-centered identity (social psychology: collectivism research)",
      ],
    },

    lens: {
      title: "Passionate Honor",
      description:
        "You express emotions openly and generously — feelings are meant to be shared, not hidden. Honor and integrity matter deeply. You create belonging through warmth, hospitality, and fierce loyalty to your people. Your heart is your strength.",
      inPlainEnglish: [
        "You express emotions fully and openly with people you trust.",
        "Honor, integrity, and keeping your word are non-negotiable.",
        "You create home and belonging wherever you are through warmth.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Warm Expression (High Emotional Expressiveness)", 
          meaning: "Your feelings are alive and visible — emotional honesty is strength, not weakness." 
        },
        { 
          label: "Honor-Centered (High Tradition + Conscientiousness)", 
          meaning: "Integrity and dignity matter — your word is your bond." 
        },
        { 
          label: "Hospitable (High Agreeableness + Extraversion)", 
          meaning: "You create warmth and welcome — hosting and caring for others feels natural." 
        },
        { 
          label: "Kinship-Grounded (Type 2 Enneagram)", 
          meaning: "You thrive with strong social bonds — family and chosen family are central." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Host gatherings and create spaces of warmth regularly.",
        "Express emotions with trusted people (don't bottle up).",
        "Honor commitments fiercely — your word matters.",
      ],
      places: [
        "Communities with strong social ties and mutual care",
        "Cafes, plazas, and public gathering spaces",
        "Cultures that value hospitality and emotional expression",
      ],
      music: [
        "Emotionally expressive music (soul, R&B, cultural pop)",
        "Music with passion and heart",
        "Rhythmic and warm soundscapes",
      ],
      activities: [
        "Hosting dinners and social gatherings",
        "Cooking and sharing meals",
        "Storytelling and conversation",
        "Community celebrations and ceremonies",
      ],
    },

    musicGenres: [
      { genre: "Soul & R&B", spotifySearch: spotifySearchUrl("Soul R&B"), why: "Emotional depth and passionate expression." },
      { genre: "World Pop", spotifySearch: spotifySearchUrl("World pop"), why: "Cultural warmth and rhythmic joy." },
      { genre: "Latin Music", spotifySearch: spotifySearchUrl("Latin music"), why: "Passion, rhythm, and emotional honesty." },
      { genre: "Gospel", spotifySearch: spotifySearchUrl("Gospel"), why: "Heart-centered power and collective expression." },
    ],

    strengths: [
      "Emotional expressiveness (authentic connection)",
      "Hospitality and generosity (creating belonging)",
      "Community bonds (deep social networks)",
      "Honor and integrity (trustworthy consistency)",
    ],

    watchouts: [
      "Over-commitment (saying yes to everyone)",
      "Weak boundaries (giving until depleted)",
      "Taking critique as dishonor (personal offense)",
      "Emotional reactivity (heat before clarity)",
    ],

    tryThisWeek: [
      "Set one clear boundary without guilt (short, kind, firm).",
      "Express one vulnerable feeling without turning it into performance.",
      "Let someone care for you without immediately reciprocating.",
    ],

    deepDive: {
      essence:
        "HeartBearer combines high emotional expressiveness with honor-based values. Research in cultural emotion and collectivism shows this pattern creates deep community through passionate authenticity.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High extraversion + high agreeableness + cultural collectivism creates natural warmth and hospitality. You're not 'too much' — you're emotionally generous.",
          bullets: [
            "Emotional expression strengthens bonds (not weakness)",
            "Honor provides identity stability",
            "Generosity creates reciprocal community",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) assess impact on relationships, (2) check honor implications, (3) feel into your heart, (4) act generously.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "No emotional expression + weak community + dishonor tolerated = depression, resentment, or explosive outbursts.",
        },
      ],
      shadowPatterns: [
        "Giving to be needed (codependency)",
        "Honor as ego protection",
        "Emotional manipulation through guilt",
      ],
      alignmentSignals: ["Strong community", "Emotional honesty", "Honored commitments", "Healthy boundaries"],
    },

    workStyle: {
      thrivesIn: ["Team environments", "Relationship-focused roles", "Honor culture", "Warm leadership"],
      strugglesIn: ["Cold corporate", "Isolated roles", "Dishonor tolerated", "Emotional suppression expected"],
      bestRoles: ["Community organizing", "Hospitality", "Client relations", "Team leadership"],
      collaboration: ["Open communication", "Mutual respect", "Emotional honesty", "Shared meals"],
    },

    relationships: {
      youNeed: ["Emotional reciprocity", "Honor and integrity", "Warmth and affection", "Loyalty"],
      youGive: ["Generous care", "Passionate support", "Deep loyalty", "Warm presence"],
      watchFor: ["People who exploit generosity", "Partners who shame emotional expression"],
      repairMoves: ["Direct honest conversation", "Share feelings openly", "Reaffirm commitment"],
    },

    travelMode: {
      bestTrips: ["Cultural immersion", "Food-centered experiences", "Community-based travel", "Family gatherings"],
      avoidTrips: ["Cold isolated destinations", "No human connection", "Transactional tourism"],
      packingPhilosophy: ["Gifts for hosts", "Items to share", "Comfortable and expressive"],
      itineraryStyle: ["People-centered", "Meals as anchors", "Connection over sights"],
    },

    rituals: [
      {
        title: "Weekly Gathering Ritual (2-3 hours)",
        why: "Feeds your need for community and allows emotional expression.",
        steps: [
          "Host or attend a meal with loved ones",
          "Share stories and feelings openly",
          "Express gratitude and appreciation",
          "Reaffirm bonds and commitments",
        ],
      },
    ],

    focusThisWeek: {
      title: "Boundaried generosity",
      intention: "Give from fullness, not depletion.",
      actions: [
        "Say no to one request without guilt or over-explanation",
        "Express one need clearly before giving to others",
        "Accept help from someone without immediately repaying",
      ],
      frictionToExpect: ["Guilt about 'not being there'", "Discomfort receiving without giving"],
      successSignal: ["Boundary held with love", "Felt more energized, not drained"],
    },

    notes: [
      "Mythical archetype representing warm-honor pattern",
      "Not tied to any specific Middle Eastern or North African culture",
    ],
  },

  // ========================================
  // CODE 13: KARAYNI - ANCESTORROOT
  // Patterns: [15, 21, 25, 26, 28] = Environmental Sensitivity, Collaborative Preference, Meaning Orientation, Nature Connection, Service Orientation
  // ========================================
  karayni: {
    codeName: "karayni",
    fullName: "AncestorRoot",
    snapshot: 
      "Reciprocity and sacred balance — you understand life as relationship between humans, spirits, land, and ancestors.",

    origin: {
      level1: "Mythical Archetype: The Sacred Reciprocator",
      lineage: [
        "Reciprocity systems (anthropology: Marcel Mauss - gift theory)",
        "Three-way relational ontology (human-land-spirit connection)",
        "Ritual labor as sacred duty (ritual studies)",
        "Collective responsibility (social psychology: interdependence)",
      ],
    },

    lens: {
      title: "Sacred Reciprocity",
      description:
        "You see life as constant exchange and balance. Relationships aren't just human-to-human — they include land, ancestors, and unseen forces. You thrive in communal ritual work where giving and receiving create sacred balance.",
      inPlainEnglish: [
        "You understand life as give-and-take, not just take.",
        "You honor relationships with land, ancestors, and spirit — not just humans.",
        "You thrive when contributing to collective wellbeing through ritual work.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Reciprocal Mind (High Collaborative Preference + Service)", 
          meaning: "Exchange and balance guide you — every gift creates obligation, every obligation creates gift." 
        },
        { 
          label: "Ritual Engaged (High Meaning Orientation)", 
          meaning: "Ceremony and practice matter — they maintain balance between worlds." 
        },
        { 
          label: "Communal Duty (Type 2/6 Enneagram)", 
          meaning: "You contribute to collective wellbeing — individual success feels hollow without community." 
        },
        { 
          label: "Land Connection (High Nature Connection + Environmental Sensitivity)", 
          meaning: "Place is relational, not background — land is kin, not resource." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Practice giving and receiving consciously (track reciprocity).",
        "Engage in community ritual and ceremony regularly.",
        "Build relationship with local land and place.",
      ],
      places: [
        "Communities with active ritual life",
        "Land-based living or access to nature",
        "Places with spiritual infrastructure and ceremony",
      ],
      music: [
        "Gamelan and ensemble textures",
        "Andean folk and communal music",
        "Ceremonial world music",
      ],
      activities: [
        "Community gardening and land stewardship",
        "Ceremony and ritual practice",
        "Reciprocity practices (gift circles, mutual aid)",
      ],
    },

    musicGenres: [
      { genre: "Gamelan", spotifySearch: spotifySearchUrl("Gamelan"), why: "Communal precision and collective harmony." },
      { genre: "Andean Folk", spotifySearch: spotifySearchUrl("Andean folk"), why: "Land-lineage connection and warmth." },
      { genre: "World Ritual", spotifySearch: spotifySearchUrl("World ritual music"), why: "Sacred offering energy." },
      { genre: "Communal Chant", spotifySearch: spotifySearchUrl("Communal chant"), why: "Collective voice and reciprocity." },
    ],

    strengths: [
      "Reciprocity intelligence (understanding exchange)",
      "Ritual engagement (creating meaningful practice)",
      "Community building (weaving social fabric)",
      "Land connection (relational ecology)",
    ],

    watchouts: [
      "Excess obligation (giving beyond capacity)",
      "Difficulty with individualism (guilt about self-focus)",
      "Over-responsibility to tradition (no space for evolution)",
      "Resentment from unreciprocated giving",
    ],

    tryThisWeek: [
      "Receive something without immediately 'paying it back' — practice accepting.",
      "Do one self-care action that isn't justified as service to others.",
      "Set one gentle boundary with community expectations (clear and kind).",
    ],

    deepDive: {
      essence:
        "AncestorRoot combines reciprocity orientation with sacred relational worldview. Research in gift theory (Mauss) and relational ontology shows this pattern creates meaning through balanced exchange.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High collaborative preference + service orientation + meaning-seeking creates natural reciprocity awareness. You're not 'codependent' — you're relationally intelligent.",
          bullets: [
            "Reciprocity creates social order and meaning",
            "Ritual maintains balance between seen and unseen",
            "Community responsibility provides identity",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) assess reciprocity implications, (2) consult ritual/tradition, (3) check community impact, (4) honor balance.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Forced individualism + broken reciprocity + no ritual = guilt, depletion, or rigid compensatory giving.",
        },
      ],
      shadowPatterns: [
        "Giving to manipulate outcomes",
        "Using obligation to control others",
        "Refusing to receive (one-way giving)",
      ],
      alignmentSignals: ["Balanced exchange", "Active ritual", "Community engagement", "Land connection"],
    },

    workStyle: {
      thrivesIn: ["Cooperative structures", "Mission-driven work", "Reciprocity culture", "Community-focused"],
      strugglesIn: ["Hyper-individualistic", "No shared values", "Extractive culture", "Isolation"],
      bestRoles: ["Community organizing", "Sustainability work", "Education", "Ceremony/ritual leadership"],
      collaboration: ["Shared responsibility", "Mutual support", "Clear reciprocity", "Collective ownership"],
    },

    relationships: {
      youNeed: ["Reciprocal care", "Shared ritual", "Community context", "Balance honored"],
      youGive: ["Consistent support", "Ritual participation", "Community glue", "Sacred witnessing"],
      watchFor: ["People who only take", "Partners who mock reciprocity"],
      repairMoves: ["Ritual reconnection", "Honest exchange of needs", "Community mediation"],
    },

    travelMode: {
      bestTrips: ["Community-based travel", "Ceremony participation", "Land-focused pilgrimages", "Exchange programs"],
      avoidTrips: ["Extractive tourism", "Pure consumption", "No cultural exchange"],
      packingPhilosophy: ["Gifts for hosts", "Reciprocity items", "Ritual tools"],
      itineraryStyle: ["Relationship-centered", "Give and receive", "Honor local customs"],
    },

    rituals: [
      {
        title: "Weekly Reciprocity Practice (30 minutes)",
        why: "Maintains sacred balance and prevents depletion.",
        steps: [
          "Review week: What did I give? What did I receive?",
          "Gratitude for received gifts (name them specifically)",
          "Offering practice (give to land, community, or ancestors)",
          "Set intention for balanced exchange next week",
        ],
      },
    ],

    focusThisWeek: {
      title: "Balanced reciprocity",
      intention: "Give and receive with equal grace.",
      actions: [
        "Accept one gift without immediately reciprocating",
        "Ask for help once (practice receiving)",
        "Give from fullness, not obligation (check your energy first)",
      ],
      frictionToExpect: ["Guilt about receiving", "Discomfort with imbalance"],
      successSignal: ["Receiving felt okay", "Balance through time, not immediate exchange"],
    },

    notes: [
      "Mythical archetype representing reciprocity-ritual pattern",
      "Not tied to any specific Balinese or Quechua tradition",
    ],
  },

  // ========================================
  // CODE 14: WOHAKA - SONGLINEKEEPER
  // Patterns: [15, 21, 22, 25, 26] = Environmental Sensitivity, Collaborative Preference, Tradition, Meaning Orientation, Nature Connection
  // ========================================
  wohaka: {
    codeName: "wohaka",
    fullName: "SonglineKeeper",
    snapshot: 
      "Relational existence — all beings as kin, courage integrated with spiritual depth, land as living identity.",

    origin: {
      level1: "Mythical Archetype: The Kinship Warrior",
      lineage: [
        "Relational ontology (philosophy: all beings interconnected)",
        "Warrior-spiritual integration (combining courage with reverence)",
        "Land-based identity (geography as self)",
        "Kinship cosmology (everyone as relatives)",
      ],
    },

    lens: {
      title: "Relational Existence",
      description:
        "You see everything as interconnected — all beings are relatives, not resources. Your courage and your spirituality aren't separate — strength and reverence coexist. Land isn't just where you live; it's part of who you are. Your identity includes place, lineage, and web of relations.",
      inPlainEnglish: [
        "You see all life as interconnected — everything is related.",
        "You balance warrior courage with spiritual reverence — both are sacred.",
        "Your identity includes land and lineage, not just individual self.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Holistic Relation (High Environmental Sensitivity + Meaning)", 
          meaning: "You see networks of connection — no being exists in isolation." 
        },
        { 
          label: "Warrior-Spiritual (Type 8/9 Enneagram fusion)", 
          meaning: "Strength and reverence coexist — courage as sacred practice." 
        },
        { 
          label: "Land-Identified (High Nature Connection)", 
          meaning: "Place is part of self — you're not just 'from' somewhere, you're 'of' it." 
        },
        { 
          label: "Kinship Mind (High Collaborative Preference)", 
          meaning: "You treat beings as relatives — responsibility flows from relationship." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Honor lineage and ancestors (ritual connection).",
        "Train courage regularly (physical/emotional/spiritual).",
        "Build deep relationship with specific land/place.",
      ],
      places: [
        "Places with indigenous presence and respect",
        "Strong land-relationship cultures",
        "Kinship-based communities",
      ],
      music: [
        "Indigenous drumming and chant",
        "Warrior energy music",
        "Land-based traditional music",
      ],
      activities: [
        "Physical training (martial arts, strength work)",
        "Ceremony and ritual practice",
        "Land stewardship and genealogy work",
      ],
    },

    musicGenres: [
      { genre: "Indigenous Drumming", spotifySearch: spotifySearchUrl("Indigenous drumming"), why: "Courage activation and ancestral connection." },
      { genre: "Haka & Warrior Chants", spotifySearch: spotifySearchUrl("Haka"), why: "Power, identity, and collective strength." },
      { genre: "Native American", spotifySearch: spotifySearchUrl("Native American music"), why: "Land connection and kinship awareness." },
      { genre: "Polynesian", spotifySearch: spotifySearchUrl("Polynesian music"), why: "Place-based identity and strength." },
    ],

    strengths: [
      "Relational intelligence (seeing interconnection)",
      "Warrior courage (protective strength)",
      "Spiritual depth (reverence and meaning)",
      "Land connection (place-based identity)",
    ],

    watchouts: [
      "Urban anonymity stress (disconnection from land/kin)",
      "Over-identification with place (can't function elsewhere)",
      "Conflating all identity with location",
      "Warrior energy without spiritual balance (aggression)",
    ],

    tryThisWeek: [
      "Practice belonging without place cues: join one new space and stay present.",
      "Train courage in small way (cold exposure, hard workout, honest conversation).",
      "Name one kinship responsibility you can sustain without burnout.",
    ],

    deepDive: {
      essence:
        "SonglineKeeper combines relational worldview with integrated warrior-spiritual identity. Research in relational ontology and indigenous psychology shows this pattern creates meaning through kinship networks.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "Relational ontology + land-based identity creates different self-concept than individualism. You're not 'enmeshed' — you're relationally grounded.",
          bullets: [
            "Self includes relationships, land, and ancestors",
            "Courage serves collective, not just ego",
            "Reverence prevents warrior energy from becoming destructive",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) assess kinship impact, (2) check land relationship, (3) balance courage with reverence, (4) honor connections.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Disconnection from land + broken kinship + no spiritual practice = rage, grief, or dissociation.",
        },
      ],
      shadowPatterns: [
        "Using kinship to avoid individual responsibility",
        "Warrior energy without spiritual check (violence)",
        "Rigid place-identity (can't adapt to new contexts)",
      ],
      alignmentSignals: ["Land connection", "Active kinship", "Balanced courage", "Spiritual practice"],
    },

    workStyle: {
      thrivesIn: ["Mission-driven", "Community-based", "Values alignment", "Relational culture"],
      strugglesIn: ["Pure individualism", "Extractive capitalism", "No values", "Urban anonymity"],
      bestRoles: ["Community leadership", "Land stewardship", "Cultural work", "Protective roles"],
      collaboration: ["Kinship-based", "Shared values", "Collective ownership", "Land-centered"],
    },

    relationships: {
      youNeed: ["Kinship understanding", "Land connection", "Spiritual alignment", "Courage respect"],
      youGive: ["Protective strength", "Relational depth", "Spiritual grounding", "Kinship care"],
      watchFor: ["People who mock kinship thinking", "Partners with pure individualism"],
      repairMoves: ["Ceremony together", "Land-based reconnection", "Honest warrior conversation"],
    },

    travelMode: {
      bestTrips: ["Ancestral land visits", "Indigenous exchange", "Sacred site pilgrimages", "Land-based learning"],
      avoidTrips: ["Extractive tourism", "No cultural respect", "Pure consumption"],
      packingPhilosophy: ["Sacred items", "Gifts for hosts", "Respectful preparation"],
      itineraryStyle: ["Relationship first", "Honor protocols", "Deep not wide"],
    },

    rituals: [
      {
        title: "Weekly Kinship Practice (45 minutes)",
        why: "Maintains relational identity and warrior-spiritual balance.",
        steps: [
          "Land acknowledgment and connection (10 min outdoors)",
          "Physical courage training (20 min)",
          "Ancestor/kinship reflection (10 min)",
          "Gratitude for web of relations (5 min)",
        ],
      },
    ],

    focusThisWeek: {
      title: "Portable kinship",
      intention: "Carry relational identity into new contexts.",
      actions: [
        "Build one connection in unfamiliar space (practice belonging portably)",
        "Express courage in small daily way (not just dramatic moments)",
        "Name kinship responsibility you can honor sustainably",
      ],
      frictionToExpect: ["Feeling displaced without familiar land", "Urge to retreat to known territory"],
      successSignal: ["Felt connected without place cues", "Kinship extended, not just blood"],
    },

    notes: [
      "Mythical archetype representing kinship-warrior pattern",
      "Not tied to any specific Maori, Lakota, or indigenous tradition",
    ],
  },
// ========================================
  // CODE 15: TJUKARI - DREAMPATH NAVIGATOR
  // Patterns: [1, 4, 3, 6, 26] = Abstract Thinking, Sensory Appreciation, Pattern Recognition, Present Focus, Nature Connection
  // ========================================
  tjukari: {
    codeName: "tjukari",
    fullName: "Dreampath Navigator",
    snapshot: 
      "Deep-time consciousness — land remembers through you; you navigate via story, memory, and layered connection.",

    origin: {
      level1: "Mythical Archetype: The Deep-Time Navigator",
      lineage: [
        "Non-linear time perception (temporal psychology: polychronic cultures)",
        "Songline navigation (spatial memory research: O'Keefe & Nadel)",
        "Deep time consciousness (geological timescale thinking)",
        "Land as living memory (environmental psychology)",
      ],
    },

    lens: {
      title: "Deep Time",
      description:
        "You experience time differently — past, present, and future feel woven together, not separate. Land carries story and memory for you. You navigate through narrative and connection, not just GPS coordinates. Deep time feels natural to you.",
      inPlainEnglish: [
        "You experience time non-linearly — past and present feel connected.",
        "Land feels alive and meaningful, not just scenery.",
        "You understand through story and mythic mapping, not just facts.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Deep-Time Aware (High Abstract Thinking + Pattern Recognition)", 
          meaning: "You think in vast timescales — centuries and millennia feel real, not abstract." 
        },
        { 
          label: "Land-Memory (High Nature Connection + Environmental Sensitivity)", 
          meaning: "Landscape carries story for you — places remember and speak." 
        },
        { 
          label: "Narrative Navigation (Type 4/5 Enneagram)", 
          meaning: "You understand through myth, symbol, and layered meaning — not linear logic." 
        },
        { 
          label: "Non-Linear Mind (INFP/INFJ)", 
          meaning: "Past/present/future feel woven together — time is circular, not arrow-straight." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Learn stories and history of the land you live on.",
        "Practice non-linear thinking (circles, spirals, not just timelines).",
        "Connect with ancient places and deep-time landscapes.",
      ],
      places: [
        "Ancient landscapes with minimal human disruption",
        "Places with strong geological or historical memory",
        "Locations where deep time is visible (canyons, old forests, deserts)",
      ],
      music: [
        "Didgeridoo and primal resonance",
        "Timeless ambient soundscapes",
        "Music that evokes deep time and space",
      ],
      activities: [
        "Walking meditation in ancient places",
        "Local history and indigenous story learning",
        "Stargazing and cosmic perspective",
        "Geological exploration",
      ],
    },

    musicGenres: [
      { genre: "Didgeridoo", spotifySearch: spotifySearchUrl("Didgeridoo"), why: "Primal earth resonance and deep time." },
      { genre: "World Ambient", spotifySearch: spotifySearchUrl("World ambient"), why: "Timeless atmosphere without temporal markers." },
      { genre: "Drone Music", spotifySearch: spotifySearchUrl("Drone music"), why: "Long sonic arcs mirroring deep time." },
      { genre: "Nature Soundscapes", spotifySearch: spotifySearchUrl("Nature soundscapes"), why: "Land dialogue and memory." },
    ],

    strengths: [
      "Deep time thinking (long perspective)",
      "Land intelligence (reading place)",
      "Narrative navigation (story-based understanding)",
      "Non-linear consciousness (circular time awareness)",
    ],

    watchouts: [
      "Modern time pressure (deadlines feel violent)",
      "Linear planning stress (quarterly goals feel absurd)",
      "Placeless disorientation (no land connection = lost)",
      "Difficulty with urgency culture",
    ],

    tryThisWeek: [
      "Plan one week ahead in simple linear list (practice the constraint).",
      "Complete one 'time-boxed' task within the box (no perfection).",
      "Spend 20 minutes mapping a place in words (story, not GPS).",
    ],

    deepDive: {
      essence:
        "Dreampath Navigator combines non-linear time perception with land-based memory. Research in songline navigation and polychronic cultures shows this pattern excels in spatial-narrative intelligence.",
      sections: [
        {
          title: "Neurological Foundation",
          body:
            "Spatial memory + narrative cognition creates different time perception. You're not 'scattered' — you process time cyclically, not linearly.",
          bullets: [
            "Past/present/future feel simultaneous, not sequential",
            "Land triggers memory and story (place = time)",
            "Mythic thinking is primary, not secondary",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) feel into deep time, (2) consult land/place, (3) follow narrative thread, (4) move when story aligns.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Disconnection from land + forced linear time + no narrative meaning = dissociation, depression, or temporal disorientation.",
        },
      ],
      shadowPatterns: [
        "Using non-linear thinking to avoid concrete action",
        "Romanticizing 'deep time' to escape present responsibility",
        "Getting lost in story without grounding",
      ],
      alignmentSignals: ["Land connection", "Story practice", "Circular rituals", "Cosmic perspective"],
    },

    workStyle: {
      thrivesIn: ["Flexible timelines", "Story-based work", "Non-linear projects", "Creative freedom"],
      strugglesIn: ["Strict deadlines", "Linear productivity", "Factory time", "Urgency culture"],
      bestRoles: ["Storytelling", "Creative arts", "Cultural work", "Research with depth"],
      collaboration: ["Narrative co-creation", "Flexible timelines", "Meaning-centered", "Non-hierarchical"],
    },

    relationships: {
      youNeed: ["Patience with your time sense", "Shared stories", "Land connection together", "Non-linear communication"],
      youGive: ["Deep perspective", "Mythic meaning", "Story weaving", "Timeless presence"],
      watchFor: ["People who demand urgency constantly", "Partners with pure linear thinking"],
      repairMoves: ["Tell the story of what happened", "Walk land together", "Create shared narrative"],
    },

    travelMode: {
      bestTrips: ["Ancient site pilgrimages", "Deep-time landscapes", "Story-based journeys", "Slow wandering"],
      avoidTrips: ["Rushed itineraries", "Surface tourism", "No historical depth"],
      packingPhilosophy: ["Journal for stories", "Minimal stuff", "Comfortable walking gear"],
      itineraryStyle: ["Follow stories", "Let land guide", "Deep not rushed"],
    },

    rituals: [
      {
        title: "Weekly Deep-Time Practice (40 minutes)",
        why: "Reconnects to circular time and land memory.",
        steps: [
          "Sit on land (same spot weekly - 15 min)",
          "Notice what changed, what stayed same",
          "Write one story the land tells",
          "Reflect on deep time perspective (10 min)",
        ],
      },
    ],

    focusThisWeek: {
      title: "Grounded in now",
      intention: "Honor deep time while meeting linear deadlines.",
      actions: [
        "Set one simple deadline and meet it (practice linear time)",
        "Use calendar for one week without resentment",
        "Balance story-thinking with concrete next step",
      ],
      frictionToExpect: ["Linear time feels constraining", "Urge to abandon structure"],
      successSignal: ["Met deadline without losing deep-time awareness", "Both/and, not either/or"],
    },

    notes: [
      "Mythical archetype representing deep-time navigation pattern",
      "Not tied to any specific Aboriginal Australian tradition",
    ],
  },

  // ========================================
  // CODE 16: KINMORA - TIMEARCHITECT
  // Patterns: [1, 3, 5, 22, 25] = Abstract Thinking, Pattern Recognition, Detail Orientation, Tradition, Meaning Orientation
  // ========================================
  kinmora: {
    codeName: "kinmora",
    fullName: "TimeArchitect",
    snapshot: 
      "Cycles and precision — you understand timing, systems, and recurring patterns with mathematical clarity.",

    origin: {
      level1: "Mythical Archetype: The Cyclical Mathematician",
      lineage: [
        "Mathematical cosmology (astronomy and calendrical systems)",
        "Cyclical time orientation (temporal psychology)",
        "Pattern recognition mastery (cognitive science)",
        "Systems thinking (complexity theory)",
      ],
    },

    lens: {
      title: "Cyclical Mastery",
      description:
        "You see patterns and cycles everywhere — time is circular and predictable. Precision and timing matter deeply. You think systemically, connecting dots across time and space with mathematical elegance. You track cycles naturally.",
      inPlainEnglish: [
        "You see patterns and cycles that others miss — repetition reveals truth.",
        "Timing and precision matter deeply to you — there's a right moment.",
        "You think in systems and connections, not isolated events.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Cycle-Aware (High Pattern Recognition + Abstract Thinking)", 
          meaning: "You track repetition and rhythm across time — cycles are visible to you." 
        },
        { 
          label: "Mathematical Precision (High Detail Orientation)", 
          meaning: "Exactness is calming — you love elegant systems and clean numbers." 
        },
        { 
          label: "Astronomical Mind (Type 5/1 Enneagram)", 
          meaning: "You think in cosmic patterns and grand systems — big structures matter." 
        },
        { 
          label: "Systems Thinker (INTJ/INTP)", 
          meaning: "You connect dots reliably — isolated facts become coherent wholes." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Track cycles intentionally (moon phases, seasons, personal patterns).",
        "Build timing-based routines and rituals.",
        "Study systems and complexity.",
      ],
      places: [
        "Places with clear seasonal changes",
        "Cities with rhythm and predictable structure",
        "Astronomy-significant locations (observatories, ancient sites)",
      ],
      music: [
        "Polyrhythmic and mathematically complex",
        "Structured compositions with cyclical patterns",
        "Minimalism and repetitive structures",
      ],
      activities: [
        "Astronomy and stargazing",
        "Systems thinking and modeling",
        "Cycle tracking (personal, natural, economic)",
        "Mathematical arts",
      ],
    },

    musicGenres: [
      { genre: "Polyrhythmic", spotifySearch: spotifySearchUrl("Polyrhythm"), why: "Pattern pleasure and mathematical beauty." },
      { genre: "Minimalism", spotifySearch: spotifySearchUrl("Minimalism music"), why: "Cycle repetition and elegant structure." },
      { genre: "Math Rock", spotifySearch: spotifySearchUrl("Math rock"), why: "Complex time signatures and precision." },
      { genre: "Classical Patterns", spotifySearch: spotifySearchUrl("Classical repetitive"), why: "Order through cyclical repetition." },
    ],

    strengths: [
      "Pattern recognition (seeing what repeats)",
      "Cyclical thinking (understanding time's rhythm)",
      "Mathematical precision (elegant systems)",
      "Timing intelligence (knowing the right moment)",
    ],

    watchouts: [
      "Over-structuring (forcing patterns where none exist)",
      "Difficulty with true randomness and chaos",
      "Trying to control natural cycles",
      "Analysis paralysis (too much pattern-seeking)",
    ],

    tryThisWeek: [
      "Do one spontaneous thing without analyzing the pattern.",
      "Let one cycle break and don't repair it immediately.",
      "Try a 'good enough' approach where you don't optimize timing.",
    ],

    deepDive: {
      essence:
        "TimeArchitect combines high pattern recognition with cyclical time perception. Research in mathematical cognition and systems thinking shows this pattern excels at temporal-spatial modeling.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High pattern recognition + low randomness tolerance creates natural systems thinking. You're not 'obsessive' — you're mathematically oriented.",
          bullets: [
            "Patterns provide psychological order and predictability",
            "Cycles are comforting (known rhythms in chaos)",
            "Precision feels right (elegant solutions are beautiful)",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) analyze patterns, (2) check cycles and timing, (3) model systems, (4) act at optimal moment.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Constant disruption + broken patterns + chaotic randomness = anxiety and compensatory over-structuring.",
        },
      ],
      shadowPatterns: [
        "Using patterns to create false certainty",
        "Controlling others through 'optimal timing'",
        "Refusing to adapt when cycles shift",
      ],
      alignmentSignals: ["Tracked cycles", "Clear patterns", "Elegant systems", "Right timing"],
    },

    workStyle: {
      thrivesIn: ["Data-driven work", "Systems design", "Research", "Cyclical projects"],
      strugglesIn: ["Pure chaos", "No patterns", "Constant unpredictability", "Anti-structure culture"],
      bestRoles: ["Systems architecture", "Data science", "Research", "Strategic planning"],
      collaboration: ["Pattern-sharing", "Systems co-design", "Timing coordination", "Mathematical communication"],
    },

    relationships: {
      youNeed: ["Predictable rhythms", "Shared systems", "Timing respect", "Pattern appreciation"],
      youGive: ["Reliable cycles", "Systems intelligence", "Perfect timing", "Mathematical clarity"],
      watchFor: ["People who create constant chaos", "Partners who mock structure"],
      repairMoves: ["Analyze the pattern of conflict", "Propose system adjustment", "Time conversation well"],
    },

    travelMode: {
      bestTrips: ["Astronomical sites", "Cyclical festivals", "Systems-rich cities", "Mathematical wonder destinations"],
      avoidTrips: ["Pure spontaneity", "No structure", "Chaotic group dynamics"],
      packingPhilosophy: ["Optimized system", "Precise preparation", "Timing tools"],
      itineraryStyle: ["Cycle-based", "Optimal timing", "Structured freedom"],
    },

    rituals: [
      {
        title: "Weekly Pattern Review (30 minutes)",
        why: "Maintains cycle awareness and pattern recognition.",
        steps: [
          "Track one personal cycle (energy, mood, productivity)",
          "Note what repeated this week",
          "Identify one emerging pattern",
          "Plan next week based on cycle awareness",
        ],
      },
    ],

    focusThisWeek: {
      title: "Flexible patterns",
      intention: "Honor cycles while allowing emergence.",
      actions: [
        "Notice one pattern, then consciously break it (small, safe)",
        "Do something without optimizing timing",
        "Accept one 'random' outcome without forcing pattern",
      ],
      frictionToExpect: ["Discomfort with unpredictability", "Urge to find pattern anyway"],
      successSignal: ["Randomness didn't create anxiety", "Flexibility felt freeing"],
    },

    notes: [
      "Mythical archetype representing cyclical-systems pattern",
      "Not tied to any specific Maya or astronomical tradition",
    ],
  },

  // ========================================
  // CODE 17: SILJOA - FROSTSENTINEL
  // Patterns: [3, 15, 26, 12, 9] = Pattern Recognition, Environmental Sensitivity, Nature Connection, Influence Drive (moderate), Improvisation
  // ========================================
  siljoa: {
    codeName: "siljoa",
    fullName: "FrostSentinel",
    snapshot: 
      "Climate-dialogue intelligence — environment is thinking partner; you adapt through cooperative resilience with harsh conditions.",

    origin: {
      level1: "Mythical Archetype: The Climate Partner",
      lineage: [
        "Environmental dialogue (ecological psychology: organism-environment interaction)",
        "Arctic survival intelligence (extreme adaptation research)",
        "Climate attunement (weather sensitivity studies)",
        "Cooperative resilience (social support under harsh conditions)",
      ],
    },

    lens: {
      title: "Climate Partnership",
      description:
        "You don't fight environment — you work with it as active partner. You read weather, conditions, and climate like a conversation. You thrive by adapting through cooperation with harshness, not denial or domination.",
      inPlainEnglish: [
        "You work with environment as partner, not obstacle to overcome.",
        "You read weather and conditions constantly — climate awareness is automatic.",
        "You endure through teamwork with place, not against it.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Environmental Dialogue (High Environmental Sensitivity + Nature Connection)", 
          meaning: "Place is active variable, not passive background — you're in constant conversation with conditions." 
        },
        { 
          label: "Prepared Resilience (High Pattern Recognition)", 
          meaning: "You plan for harshness — preparation is respect for reality, not fear." 
        },
        { 
          label: "Condition Awareness (Type 6 Enneagram)", 
          meaning: "You monitor context continuously — vigilance keeps you safe." 
        },
        { 
          label: "Cooperative Survival (ISFJ/ISTJ)", 
          meaning: "You endure through teamwork — individual strength + collective support." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Build relationship with local climate and weather patterns.",
        "Practice environmental awareness (temperature, wind, light changes).",
        "Learn survival skills appropriate to your environment.",
      ],
      places: [
        "Cold or challenging climates (not required, but natural fit)",
        "Environments with strong weather presence",
        "Adaptation-requiring locations",
      ],
      music: [
        "Nordic folk and cold-climate soundscapes",
        "Throat singing and primal endurance music",
        "Atmospheric music from harsh-to-soft",
      ],
      activities: [
        "Outdoor skills in varied conditions",
        "Cold-weather sports and training",
        "Weather tracking and observation",
        "Preparedness practice",
      ],
    },

    musicGenres: [
      { genre: "Nordic Folk", spotifySearch: spotifySearchUrl("Nordic folk"), why: "Cold clarity and endurance beauty." },
      { genre: "Throat Singing", spotifySearch: spotifySearchUrl("Throat singing"), why: "Primal resilience and harsh-beauty." },
      { genre: "Dark Ambient", spotifySearch: spotifySearchUrl("Dark ambient"), why: "Atmospheric harshness as art." },
      { genre: "Post-Folk", spotifySearch: spotifySearchUrl("Post-folk"), why: "Resilient softness in hard environments." },
    ],

    strengths: [
      "Environmental intelligence (reading conditions)",
      "Survival skills (prepared resilience)",
      "Climate adaptation (thriving in harsh conditions)",
      "Partnership thinking (cooperating with reality)",
    ],

    watchouts: [
      "Over-preparation (preparing for threats that won't come)",
      "Difficulty with ease (comfort feels wrong or unsafe)",
      "Hypervigilance in safe environments",
      "Creating harshness where none exists",
    ],

    tryThisWeek: [
      "Do something without preparation once (low-risk situation).",
      "Practice being comfortable: sit in ease 20 minutes without 'fixing' anything.",
      "Lighten one 'preparedness' habit — make it simpler, not heavier.",
    ],

    deepDive: {
      essence:
        "FrostSentinel combines environmental sensitivity with adaptive resilience. Research in extreme environment psychology shows this pattern excels in organism-environment cooperation.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High environmental monitoring + preparedness orientation creates vigilant partnership with conditions. You're not 'paranoid' — you're climate-intelligent.",
          bullets: [
            "Environmental awareness is survival intelligence",
            "Preparation shows respect for reality's harshness",
            "Cooperation with conditions > fighting against them",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) read conditions, (2) assess resources, (3) prepare for harshness, (4) adapt cooperatively.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Climate-controlled comfort + no environmental challenge + forced ease = restlessness or manufactured difficulty.",
        },
      ],
      shadowPatterns: [
        "Creating harshness to feel competent",
        "Over-preparing as control mechanism",
        "Refusing ease as weakness",
      ],
      alignmentSignals: ["Weather awareness", "Prepared resilience", "Environmental partnership", "Cooperative adaptation"],
    },

    workStyle: {
      thrivesIn: ["Field work", "Variable conditions", "Preparedness culture", "Environmental awareness"],
      strugglesIn: ["Climate-controlled offices", "Soft corporate", "No environmental challenge", "Ease as default"],
      bestRoles: ["Outdoor professions", "Emergency services", "Environmental work", "Operations in real conditions"],
      collaboration: ["Shared preparedness", "Condition awareness", "Cooperative adaptation", "Environmental respect"],
    },

    relationships: {
      youNeed: ["Shared resilience", "Preparedness respect", "Comfort with challenge", "Environmental partnership"],
      youGive: ["Reliable preparation", "Environmental wisdom", "Calm in harsh conditions", "Cooperative strength"],
      watchFor: ["People who mock preparedness", "Partners who need constant ease"],
      repairMoves: ["Weather difficulty together", "Share preparation", "Acknowledge harshness honestly"],
    },

    travelMode: {
      bestTrips: ["Challenging environments", "Weather-immersive", "Skill-building adventures", "Preparedness required"],
      avoidTrips: ["Climate-controlled resorts", "Pure comfort tourism", "No environmental challenge"],
      packingPhilosophy: ["Prepared for conditions", "Layered adaptability", "Respect for harshness"],
      itineraryStyle: ["Condition-responsive", "Flexible to weather", "Partnership with place"],
    },

    rituals: [
      {
        title: "Daily Condition Check (10 minutes)",
        why: "Maintains environmental partnership and awareness.",
        steps: [
          "Check weather and conditions",
          "Note what's required today (layering, timing, etc.)",
          "Adjust plans based on conditions",
          "Appreciate environmental partnership",
        ],
      },
    ],

    focusThisWeek: {
      title: "Ease without guilt",
      intention: "Practice comfort as strength, not weakness.",
      actions: [
        "Enjoy one moment of ease without preparing for harshness",
        "Do something without backup plan (safe context)",
        "Accept one comfortable situation without making it harder",
      ],
      frictionToExpect: ["Ease feels wrong or dangerous", "Urge to create challenge"],
      successSignal: ["Comfort felt okay", "Ease didn't weaken you"],
    },

    notes: [
      "Mythical archetype representing climate-partnership pattern",
      "Not tied to any specific Arctic or Sami tradition",
    ],
  },

  // ========================================
  // CODE 18: SKENARI - FUTUREGUARDIAN
  // Patterns: [8, 21, 22, 24, 30] = Structure, Collaborative Preference, Tradition, Hierarchy Awareness (moderate), Future Orientation
  // ========================================
  skenari: {
    codeName: "skenari",
    fullName: "FutureGuardian",
    snapshot: 
      "Seven-generation thinking — responsibility to the unborn; consensus governance; future ethics as daily practice.",

    origin: {
      level1: "Mythical Archetype: The Future Steward",
      lineage: [
        "Seventh Generation principle (long-term responsibility thinking)",
        "Intergenerational ethics (moral philosophy: future persons)",
        "Consensus governance (decision-making research: deliberative democracy)",
        "Stewardship orientation (environmental ethics)",
      ],
    },

    lens: {
      title: "Future Responsibility",
      description:
        "You consider long-term consequences naturally — seven generations ahead feels real, not abstract. You feel responsible for what comes after you. You prefer collective agreement over domination. Future isn't just timeline — it's sacred trust.",
      inPlainEnglish: [
        "You think about long-term consequences automatically — impact on future generations matters.",
        "You feel responsible for protecting what isn't here yet.",
        "You prefer consensus and shared agreement over winner-takes-all.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Future-Oriented (High Future Orientation + Meaning)", 
          meaning: "You think beyond yourself and your lifetime — legacy is automatic consideration." 
        },
        { 
          label: "Ethical Responsibility (High Conscientiousness)", 
          meaning: "Impact matters more than intent — you track consequences across time." 
        },
        { 
          label: "Consensus Builder (High Collaborative Preference)", 
          meaning: "You value shared agreement over domination — collective wisdom matters." 
        },
        { 
          label: "Guardianship Mind (Type 1/6 Enneagram)", 
          meaning: "You protect what's not here yet — stewardship as sacred duty." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Make choices with seven-generation impact in mind.",
        "Practice consensus decision-making in communities.",
        "Invest in sustainability and long-term thinking.",
      ],
      places: [
        "Communities with strong governance and participation",
        "Long-term oriented cultures",
        "Sustainability-focused locations",
      ],
      music: [
        "Ceremonial council energy",
        "Legacy and continuity themes",
        "Community and collective rhythms",
      ],
      activities: [
        "Environmental stewardship",
        "Governance and civic participation",
        "Legacy building and long-term projects",
      ],
    },

    musicGenres: [
      { genre: "Indigenous Ceremonial", spotifySearch: spotifySearchUrl("Indigenous ceremonial"), why: "Legacy consciousness and council energy." },
      { genre: "Folk Protest", spotifySearch: spotifySearchUrl("Folk protest music"), why: "Future-protection themes and collective voice." },
      { genre: "World Choral", spotifySearch: spotifySearchUrl("World choral"), why: "Collective harmony and shared purpose." },
      { genre: "Ambient Hopeful", spotifySearch: spotifySearchUrl("Ambient hopeful"), why: "Future-oriented soundscapes." },
    ],

    strengths: [
      "Long-term thinking (multi-generational perspective)",
      "Ethical responsibility (consequence awareness)",
      "Consensus building (collective wisdom)",
      "Guardianship orientation (protecting future)",
    ],

    watchouts: [
      "Neglecting present needs for future ideals",
      "Paralysis by future-thinking (can't act now)",
      "Difficulty with necessary short-term decisions",
      "Guilt about any present enjoyment",
    ],

    tryThisWeek: [
      "Make one decision for immediate joy without future guilt.",
      "Do one small present-moment activity with no productivity outcome.",
      "Choose one long-term project and reduce it to 10-minute first step.",
    ],

    deepDive: {
      essence:
        "FutureGuardian combines long-term orientation with ethical stewardship. Research in intergenerational ethics and consensus governance shows this pattern excels at protecting collective future.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High future orientation + ethical responsibility creates natural stewardship thinking. You're not 'delaying gratification' — you're protecting generations.",
          bullets: [
            "Future generations feel as real as present people",
            "Consequences across time guide every decision",
            "Consensus honors collective wisdom over individual will",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) assess seven-generation impact, (2) seek consensus, (3) prioritize sustainability, (4) act as steward.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Short-term thinking forced + no consensus + extractive culture = moral injury and compensatory future-obsession.",
        },
      ],
      shadowPatterns: [
        "Using future to avoid present responsibility",
        "Moral superiority from 'thinking long-term'",
        "Paralyzing others with future consequences",
      ],
      alignmentSignals: ["Sustainable choices", "Consensus practice", "Legacy projects", "Present-future balance"],
    },

    workStyle: {
      thrivesIn: ["Mission-driven", "Sustainability focus", "Participatory governance", "Long-term projects"],
      strugglesIn: ["Quarterly capitalism", "Short-term extraction", "Authoritarian culture", "No ethics"],
      bestRoles: ["Sustainability", "Policy/governance", "Long-term strategy", "Environmental protection"],
      collaboration: ["Consensus decision-making", "Shared stewardship", "Future consideration", "Ethical dialogue"],
    },

    relationships: {
      youNeed: ["Shared values", "Future consideration", "Ethical alignment", "Consensus respect"],
      youGive: ["Long-term commitment", "Ethical consistency", "Future protection", "Collective wisdom"],
      watchFor: ["People with pure short-term thinking", "Partners who mock future concern"],
      repairMoves: ["Consensus conversation", "Reaffirm shared values", "Future visioning together"],
    },

    travelMode: {
      bestTrips: ["Sustainability learning", "Community exchange", "Long-term projects", "Legacy visits"],
      avoidTrips: ["Extractive tourism", "Pure consumption", "No future consideration"],
      packingPhilosophy: ["Sustainable items", "Minimal impact", "Future-conscious"],
      itineraryStyle: ["Stewardship-guided", "Low footprint", "Community benefit"],
    },

    rituals: [
      {
        title: "Monthly Future Reflection (45 minutes)",
        why: "Balances present action with future responsibility.",
        steps: [
          "Review month: What built toward future? What was just now?",
          "Seven-generation check: Would ancestors/descendants approve?",
          "Adjust one habit for long-term benefit",
          "Celebrate one present joy without future guilt",
        ],
      },
     ],

    focusThisWeek: {
      title: "Present-future integration",
      intention: "Honor both now and later without sacrificing either.",
      actions: [
        "Enjoy one present pleasure fully (no future justification needed)",
        "Make one practical short-term decision without seven-generation analysis",
        "Balance one long-term goal with immediate next step",
      ],
      frictionToExpect: ["Guilt about present focus", "Fear of short-term thinking"],
      successSignal: ["Present joy didn't betray future", "Both timescales felt honored"],
    },

    notes: [
      "Mythical archetype representing future-stewardship pattern",
      "Not tied to any specific Haudenosaunee or indigenous governance tradition",
    ],
  },

  // ========================================
  // CODE 19: ASHKARA - TRUTHFORGER
  // Patterns: [1, 16, 25, 11, 22] = Abstract Thinking, Introspection, Meaning Orientation, Structure Preference (moderate), Tradition
  // ========================================
  ashkara: {
    codeName: "ashkara",
    fullName: "TruthForger",
    snapshot: 
      "Truth embodied — moral clarity through action; integrity as daily practice; fire as purification and commitment.",

    origin: {
      level1: "Mythical Archetype: The Moral Warrior",
      lineage: [
        "Truth enacted as sacred duty (virtue ethics: Aristotle)",
        "Moral clarity orientation (moral foundations theory)",
        "Good thoughts/words/deeds integration (ethical wholeness)",
        "Fire as purifying principle (transformation through truth)",
      ],
    },

    lens: {
      title: "Enacted Truth",
      description:
        "Truth must be lived, not just believed. You're driven by moral clarity — right and wrong feel real, not relative. Integrity is daily practice through concrete choices, not abstract philosophy. You prove values through action, not words.",
      inPlainEnglish: [
        "Truth must become behavior, not just belief or nice idea.",
        "You're driven by clear sense of right and wrong — moral clarity guides you.",
        "Integrity is something you practice daily, not just claim.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Ethically Driven (High Meaning Orientation + Conscientiousness)", 
          meaning: "Morality guides decisions automatically — you can't act against your principles." 
        },
        { 
          label: "Truth-Embodying (High Introspection + Abstract Thinking)", 
          meaning: "Principles must become embodied behavior — thought without action is empty." 
        },
        { 
          label: "Clear Duality (Type 1/8 Enneagram)", 
          meaning: "You see right/wrong distinctly — moral ambiguity feels like weakness." 
        },
        { 
          label: "Action-Based (INTJ/ENTJ)", 
          meaning: "You prove values through choice and action, not just contemplation." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Act on principles consistently (integrity through behavior).",
        "Practice moral courage in small daily ways.",
        "Purify through action (align behavior with values).",
      ],
      places: [
        "Integrity-focused communities",
        "Clear ethical culture environments",
        "Places where moral leadership is valued",
      ],
      music: [
        "Epic themes of courage and resolve",
        "Devotional intensity and commitment",
        "Music that activates moral strength",
      ],
      activities: [
        "Service and activism aligned with values",
        "Ethical leadership and advocacy",
        "Rituals that reinforce commitment to truth",
      ],
    },

    musicGenres: [
      { genre: "Epic Orchestral", spotifySearch: spotifySearchUrl("Epic orchestral"), why: "Courage activation and moral resolve." },
      { genre: "Devotional World", spotifySearch: spotifySearchUrl("Devotional world music"), why: "Principle reinforcement through sacred sound." },
      { genre: "Cinematic Rock", spotifySearch: spotifySearchUrl("Cinematic rock"), why: "Action energy and moral intensity." },
      { genre: "Protest Folk", spotifySearch: spotifySearchUrl("Protest folk"), why: "Truth-telling and moral courage." },
    ],

    strengths: [
      "Moral clarity (seeing right from wrong)",
      "Ethical courage (acting on principles despite cost)",
      "Truth embodiment (living what you believe)",
      "Principled action (proving values through choice)",
    ],

    watchouts: [
      "Moral rigidity (black-and-white thinking)",
      "Difficulty with ethical gray areas and complexity",
      "Judging others harshly for moral failings",
      "Burnout from constant moral vigilance",
    ],

    tryThisWeek: [
      "Sit with one 'gray area' without forcing immediate verdict.",
      "Practice compassion for imperfection (yours or others') once.",
      "Choose one principle and embody it in concrete action today.",
    ],

    deepDive: {
      essence:
        "TruthForger combines moral clarity with action-orientation. Research in virtue ethics and moral psychology shows this pattern excels at integrity-through-practice.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High conscientiousness + meaning-seeking + moral clarity creates natural ethical orientation. You're not 'judgmental' — you have strong moral compass.",
          bullets: [
            "Moral clarity provides psychological stability",
            "Action proves truth (words alone feel empty)",
            "Integrity creates identity coherence",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) identify moral truth, (2) assess integrity alignment, (3) choose right action, (4) act with courage.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "Forced ethical compromise + no moral clarity + values violated = rage, moral injury, or rigid compensatory judgment.",
        },
      ],
      shadowPatterns: [
        "Using morality to dominate others",
        "Rigid judgment blocking compassion",
        "Truth as weapon, not guide",
      ],
      alignmentSignals: ["Daily integrity practice", "Moral courage", "Compassionate clarity", "Embodied principles"],
    },

    workStyle: {
      thrivesIn: ["Mission-driven", "Clear ethics", "Integrity culture", "Purpose-aligned"],
      strugglesIn: ["Amoral capitalism", "Ethics-free zones", "Constant compromise", "No principles"],
      bestRoles: ["Advocacy", "Ethical leadership", "Social justice", "Integrity-focused work"],
      collaboration: ["Shared values", "Ethical dialogue", "Principled action", "Moral courage"],
    },

    relationships: {
      youNeed: ["Shared principles", "Integrity alignment", "Moral honesty", "Courage respect"],
      youGive: ["Unwavering truth", "Moral consistency", "Principled support", "Ethical clarity"],
      watchFor: ["People who mock integrity", "Partners with no moral compass"],
      repairMoves: ["Honest moral conversation", "Acknowledge wrong clearly", "Demonstrate changed behavior"],
    },

    travelMode: {
      bestTrips: ["Purpose-driven travel", "Service trips", "Pilgrimage with meaning", "Ethical tourism"],
      avoidTrips: ["Pure hedonism", "Exploitative tourism", "No moral consideration"],
      packingPhilosophy: ["Ethical sourcing", "Principle-aligned items", "Integrity in choices"],
      itineraryStyle: ["Value-guided", "Low exploitation", "High integrity"],
    },

    rituals: [
      {
        title: "Daily Integrity Check (15 minutes)",
        why: "Maintains alignment between principles and action.",
        steps: [
          "Evening reflection: Did I act with integrity today?",
          "Name one moment of moral courage (even small)",
          "Name one compromise — was it necessary or avoidable?",
          "Set intention for tomorrow's integrity practice",
        ],
      },
    ],

    focusThisWeek: {
      title: "Compassionate truth",
      intention: "Hold moral clarity with kindness, not harshness.",
      actions: [
        "Acknowledge one moral gray area honestly (complexity is real)",
        "Extend compassion to someone who failed morally",
        "Act on one principle with kindness toward those who don't share it",
      ],
      frictionToExpect: ["Feels like weakness or compromise", "Urge to judge"],
      successSignal: ["Clarity without cruelty", "Truth with compassion"],
    },

    notes: [
      "Mythical archetype representing moral-action pattern",
      "Not tied to any specific Persian or Zoroastrian tradition",
    ],
  },

  // ========================================
  // CODE 20: ALETHIR - SEEKER
  // Patterns: [1, 3, 16, 25, 23] = Abstract Thinking, Pattern Recognition, Introspection, Meaning Orientation, Inquiry Drive
  // ========================================
  alethir: {
    codeName: "alethir",
    fullName: "Seeker",
    snapshot: 
      "Truth through inquiry — you believe reality emerges through reasoning, dialogue, and logos-centered thinking.",

    origin: {
      level1: "Mythical Archetype: The Philosophical Inquirer",
      lineage: [
        "Inquiry as path to truth (Socratic method)",
        "Dialectical thinking (thesis-antithesis-synthesis)",
        "Logos-centered reasoning (rational discourse philosophy)",
        "Philosophy as way of life (not just academic exercise)",
      ],
    },

    lens: {
      title: "Inquiry & Reason",
      description:
        "You find truth through questions, not answers. Dialogue sharpens understanding — conversation reveals what's real. Logic and reason guide you. Wisdom is active practice of questioning, not passive acceptance of authority.",
      inPlainEnglish: [
        "You find truth by asking better questions, not accepting easy answers.",
        "You think through conversation and dialogue — talking sharpens thought.",
        "Wisdom is something you practice through inquiry, not just read about.",
      ],
    },

    traits: {
      headline: "Core Behavioral Patterns",
      highlights: [
        { 
          label: "Inquiry-Driven (High Abstract Thinking + Pattern Recognition)", 
          meaning: "You question to understand — curiosity is your primary mode of engagement." 
        },
        { 
          label: "Dialectical (High Introspection + Meaning Orientation)", 
          meaning: "Conversation and dialogue reveal truth — thinking happens through exchange." 
        },
        { 
          label: "Reason-Centered (Type 5 Enneagram)", 
          meaning: "Logic guides you — irrational arguments feel physically uncomfortable." 
        },
        { 
          label: "Wisdom-Oriented (INTJ/INTP)", 
          meaning: "You seek depth over noise — surface answers don't satisfy." 
        },
      ],
    },

    recommendations: {
      lifestyle: [
        "Regular philosophical discussion and reading.",
        "Question assumptions systematically.",
        "Study logic, reasoning, and argumentation.",
      ],
      places: [
        "Intellectual culture cities (university towns)",
        "Philosophical communities and discussion groups",
        "Libraries and contemplative spaces",
      ],
      music: [
        "Contemplative classical structures",
        "Music that supports deep thinking",
        "Clean focus soundscapes",
      ],
      activities: [
        "Philosophy reading groups",
        "Debate and dialectical practice",
        "Writing and thinking practice",
        "Inquiry-based learning",
      ],
    },

    musicGenres: [
      { genre: "Classical", spotifySearch: spotifySearchUrl("Classical music"), why: "Logical structure supporting thought." },
      { genre: "Modern Classical", spotifySearch: spotifySearchUrl("Modern classical"), why: "Contemporary philosophical depth." },
      { genre: "Ambient Focus", spotifySearch: spotifySearchUrl("Ambient focus"), why: "Clean cognition without distraction." },
      { genre: "Jazz Intellectual", spotifySearch: spotifySearchUrl("Intellectual jazz"), why: "Complexity without chaos." },
    ],

    strengths: [
      "Reasoning ability (logical thinking)",
      "Philosophical depth (understanding complex ideas)",
      "Dialogue skill (thinking through conversation)",
      "Inquiry mindset (questioning to understand)",
    ],

    watchouts: [
      "Over-intellectualization (thinking instead of doing)",
      "Analysis paralysis (too much reasoning blocks action)",
      "Dismissing emotion-based or intuitive knowing",
      "Loneliness from pure intellectual engagement",
    ],

    tryThisWeek: [
      "Make one decision from gut feeling (small, safe) and observe outcomes.",
      "Practice accepting uncertainty once (no research, no optimization).",
      "Have one conversation where you listen 70% and ask better questions.",
    ],

    deepDive: {
      essence:
        "Seeker combines high abstract thinking with inquiry-orientation. Research in Socratic method and philosophical practice shows this pattern excels at truth-seeking through dialogue.",
      sections: [
        {
          title: "Psychological Foundation",
          body:
            "High openness + introspection + meaning-seeking creates natural philosophical orientation. You're not 'overthinking' — you're reasoning toward truth.",
          bullets: [
            "Questions reveal reality (inquiry as path)",
            "Dialogue sharpens thought (conversation > monologue)",
            "Reason provides psychological order",
          ],
        },
        {
          title: "Decision-Making Pattern",
          body:
            "You decide through: (1) question assumptions, (2) dialogue with others or self, (3) reason through logic, (4) act on best understanding.",
        },
        {
          title: "Misalignment Indicators",
          body:
            "No intellectual stimulation + forced acceptance without question + anti-reason culture = depression, withdrawal, or compensatory intellectualization.",
        },
      ],
      shadowPatterns: [
        "Using reason to avoid emotional truth",
        "Intellectual superiority over others",
        "Paralyzing action through endless inquiry",
      ],
      alignmentSignals: ["Daily inquiry practice", "Philosophical dialogue", "Embodied wisdom", "Balanced reason-intuition"],
    },

    workStyle: {
      thrivesIn: ["Intellectual culture", "Research environments", "Dialogue-rich", "Reasoning valued"],
      strugglesIn: ["Anti-intellectual", "No questioning allowed", "Pure emotion-based", "Shallow culture"],
      bestRoles: ["Philosophy/teaching", "Research", "Writing", "Strategic thinking"],
      collaboration: ["Dialectical dialogue", "Reasoning together", "Question-based", "Intellectual respect"],
    },

    relationships: {
      youNeed: ["Intellectual engagement", "Good questions", "Reasoning respect", "Depth conversations"],
      youGive: ["Thoughtful perspective", "Sharp questions", "Logical clarity", "Philosophical companionship"],
      watchFor: ["People who mock thinking", "Partners who need pure emotion"],
      repairMoves: ["Honest philosophical conversation", "Question assumptions together", "Reason toward understanding"],
    },

    travelMode: {
      bestTrips: ["Philosophical sites", "University towns", "Library cities", "Intellectual culture destinations"],
      avoidTrips: ["Pure party tourism", "No intellectual depth", "Anti-thinking environments"],
      packingPhilosophy: ["Books and journals", "Minimal distraction", "Thinking tools"],
      itineraryStyle: ["Inquiry-guided", "Deep conversations", "Contemplative pace"],
    },

    rituals: [
      {
        title: "Daily Philosophical Practice (30 minutes)",
        why: "Maintains inquiry orientation and wisdom cultivation.",
        steps: [
          "Read philosophy or wisdom literature (15 min)",
          "Journal one question that emerged (5 min)",
          "Dialectical self-dialogue on the question (10 min)",
          "Note one insight or deeper question",
        ],
      },
    ],

    focusThisWeek: {
      title: "Embodied wisdom",
      intention: "Balance reason with intuition and action.",
      actions: [
        "Act on one gut feeling without logical justification (safe context)",
        "Accept one uncertainty without researching (practice not-knowing)",
        "Listen to one person without mentally debating — just receive",
      ],
      frictionToExpect: ["Discomfort with non-rational knowing", "Urge to analyze everything"],
      successSignal: ["Intuition felt valid", "Not-knowing felt okay", "Listening without debate deepened understanding"],
    },

    notes: [
      "Mythical archetype representing inquiry-wisdom pattern",
      "Not tied to any specific Ancient Greek or philosophical tradition",
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