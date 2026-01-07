/**
 * RECOMMENDATIONS DATA (UPGRADED)
 * Deep, actionable guidance for each code across 12 life categories.
 *
 * Important principles:
 * - Recommendations are *environment + behavior fit*, not ancestry or identity claims.
 * - This layer must NOT affect scoring. It is output-only.
 * - Tone: grounded, casual, non-therapeutic, not moralizing.
 * 
 * CRITICAL: Keys must be lowercase to match codeMatcher.ts output
 */

export interface CategoryRecommendation {
  /** Deep reasoning (can be multiple paragraphs / markdown) */
  why: string;

  /** What tends to work well for this code */
  greenLight: {
    title: string;
    items: string[];
    reasoning: string;
  }[];

  /** What tends to drain or distort this code */
  redLight: {
    title: string;
    items: string[];
    reasoning: string;
  };

  /** Quick self-check so users don't force-fit */
  validation: {
    resonates: string[];
    doesntResonate: string[];
  };

  /** Optional affiliate links (purely UX; keep empty if not used) */
  affiliates: {
    name: string;
    type: string;
    url: string;
  }[];
}

export interface CodeRecommendations {
  locations: CategoryRecommendation;
  work: CategoryRecommendation;
  community: CategoryRecommendation;
  activities: CategoryRecommendation;
  learning: CategoryRecommendation;
  media: CategoryRecommendation;
  living: CategoryRecommendation;
  rituals: CategoryRecommendation;
  movement: CategoryRecommendation;
  wellness: CategoryRecommendation;
  products: CategoryRecommendation;
  travel: CategoryRecommendation;
}

/**
 * Engine keys MUST match codeMatcher codeName values (lowercase)
 */
export const RECOMMENDATIONS: Record<string, CodeRecommendations> = {
  /* ==========================================
     SHOKUNIN — CRAFT / MASTERY / PRECISION
  ========================================== */
  shokunin: {
    locations: {
      why: `You don't need a "cool city." You need a place where **standards exist** and people actually notice detail.
If your environment rewards speed over quality, you'll feel constantly rushed and never satisfied.

**Look for:** craft neighborhoods, design cities, calm order, functional beauty, quiet competence.`,
      greenLight: [
        {
          title: "Places that respect craft",
          items: [
            "Cities with active maker districts (studios, workshops, artisan streets)",
            "Design-forward places (architecture + product culture feels intentional)",
            "Neighborhoods with calm rhythm (walkable, not chaotic)",
          ],
          reasoning:
            "Your nervous system relaxes when quality is normal. You'll naturally do your best work.",
        },
        {
          title: "Examples",
          items: [
            "Kyoto, Portland, Copenhagen, certain Berlin neighborhoods",
            "Melbourne design districts, Barcelona's artisan quarters",
            "Small college towns with maker scenes",
          ],
          reasoning: "Quality culture is in the air—you don't have to justify yourself.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: [
          "Pure hustle/status cities where speed is everything",
          "Loud, overstimulating environments with constant chaos",
          "Places that mock attention to detail as 'overthinking'",
        ],
        reasoning:
          "You'll burn out or go numb. Either way, you lose your edge.",
      },
      validation: {
        resonates: ["You relax when your environment respects quality"],
        doesntResonate: ["You feel alive only in chaotic, low-quality spaces"],
      },
      affiliates: [],
    },

    work: {
      why: `You do your best work in environments that value **depth over speed**.
You become lethal when you're allowed to refine.`,
      greenLight: [
        {
          title: "Work that fits",
          items: [
            "Deep technical roles (engineering, design, research)",
            "Craftsmanship-based work (trades, artisan production, creative work)",
            "Roles with clear quality standards and feedback loops",
          ],
          reasoning:
            "You become lethal when you're allowed to refine.",
        },
        {
          title: "Team culture signals",
          items: [
            "People respect details (not 'good enough' culture)",
            "Feedback is specific (not vague praise)",
            "Time is protected for quality (not constant last-minute fires)",
          ],
          reasoning:
            "You don't need 'nice' teams. You need teams that respect the work.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: [
          "Constant urgent deadlines that force shortcuts",
          "Work that punishes depth (too many meetings, context switching)",
          "Teams that call refinement 'perfectionism' in a negative way",
        ],
        reasoning:
          "You'll either numb yourself and get sloppy, or overwork to keep standards alone.",
      },
      validation: {
        resonates: [
          "You feel proud when the small details are right",
          "You hate shipping work you wouldn't sign your name to",
        ],
        doesntResonate: [
          "You love speed-first chaos and ship-by-Friday energy",
        ],
      },
      affiliates: [],
    },

    community: {
      why: `Your community isn't about quantity. It's about **shared standards**.
You bond through doing, building, learning, and mutual respect.`,
      greenLight: [
        {
          title: "Your people",
          items: [
            "Makers, builders, craftspeople, engineers, designers",
            "Quiet high-competence circles",
            "Small groups that meet consistently (not huge social churn)",
          ],
          reasoning:
            "You don't need constant social energy—just real people who get your brain.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: [
          "Status-only communities with shallow conversation",
          "Crowds that mock care/detail as 'try-hard'",
        ],
        reasoning:
          "If your values are mocked, you'll either withdraw or become bitter.",
      },
      validation: {
        resonates: ["You respect people who take their craft seriously"],
        doesntResonate: ["You prefer big, loud, constantly changing social scenes"],
      },
      affiliates: [],
    },

    activities: {
      why: `You love activities that reward repetition, technique, and progression.`,
      greenLight: [
        {
          title: "Best-fit activities",
          items: [
            "Anything skill-based: cooking, photography, coding, woodworking, design",
            "Precision sports: climbing, archery, weightlifting technique work",
            "Restorative craft: journaling, tea/coffee ritual, instrument practice",
          ],
          reasoning:
            "You're happiest when your effort turns into mastery you can feel.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Pure chaos activities with no skill curve or progression"],
        reasoning: "You'll get bored or feel like you're wasting time.",
      },
      validation: {
        resonates: ["You love getting better at a thing over time"],
        doesntResonate: ["You only want novelty, not depth"],
      },
      affiliates: [],
    },

    learning: {
      why: `You learn best through *depth*: fundamentals → repetition → refinement.`,
      greenLight: [
        {
          title: "Learning style",
          items: [
            "Curricula with clear skill ladders",
            "Mentors who give specific feedback",
            "Slow deliberate practice",
          ],
          reasoning:
            "You don't want random tips. You want systems, standards, and reps.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Motivational-only learning with no method", "Surface-level tutorials hopping"],
        reasoning: "It feels empty—like eating snacks instead of a meal.",
      },
      validation: {
        resonates: ["You love fundamentals"],
        doesntResonate: ["You learn only by hype and speed"],
      },
      affiliates: [],
    },

    media: {
      why: `You're pulled to media with craft, structure, and quiet intensity.`,
      greenLight: [
        {
          title: "Media that lands",
          items: [
            "Process documentaries (craft, design, engineering, art)",
            "Slow cinema / deliberate storytelling",
            "YouTube channels with technique breakdowns",
          ],
          reasoning: "You relax when the creator respects the audience's intelligence.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Overstimulating, shallow, constant-noise content loops"],
        reasoning: "It fragments focus and makes you feel mentally messy.",
      },
      validation: {
        resonates: ["You rewatch things to notice details"],
        doesntResonate: ["You only want loud, fast content"],
      },
      affiliates: [],
    },

    living: {
      why: `Your home should feel like a **workspace for your mind**: calm, ordered, functional.`,
      greenLight: [
        {
          title: "Home setup",
          items: [
            "Clear surfaces, dedicated work corner",
            "Good light + comfortable chair",
            "Tools accessible and stored cleanly",
          ],
          reasoning: "Your environment directly affects your output and mood.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Clutter traps", "Noisy shared spaces with zero boundaries"],
        reasoning: "You'll slowly lose your ability to focus.",
      },
      validation: {
        resonates: ["A clean space makes you feel sharper"],
        doesntResonate: ["You don't care about space at all"],
      },
      affiliates: [],
    },

    rituals: {
      why: `Your best ritual is a simple one you can repeat: same time, same tools, same calm.`,
      greenLight: [
        {
          title: "Ritual ideas",
          items: ["Morning prep ritual", "End-of-day reset", "Weekly craft block"],
          reasoning:
            "Consistency protects you. When you're stable, your work becomes insane.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Overcomplicated routines you can't sustain"],
        reasoning: "If it's fragile, it won't last.",
      },
      validation: {
        resonates: ["You love repeatable routines"],
        doesntResonate: ["Routines feel suffocating"],
      },
      affiliates: [],
    },

    movement: {
      why: `Movement for you is technique + control, not chaos.`,
      greenLight: [
        {
          title: "Movement that fits",
          items: ["Strength training with form focus", "Yoga (alignment)", "Climbing", "Martial arts basics"],
          reasoning: "You enjoy mastery. Form progress feels satisfying.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Random workouts with no progression or feedback"],
        reasoning: "You'll feel like you're spinning wheels.",
      },
      validation: {
        resonates: ["You care about form"],
        doesntResonate: ["You want only adrenaline"],
      },
      affiliates: [],
    },

    wellness: {
      why: `Your wellness improves when your environment is clean and your mind isn't constantly interrupted.`,
      greenLight: [
        {
          title: "High ROI habits",
          items: ["Sleep schedule", "Deep work boundaries", "Simple food routine", "Weekly reset"],
          reasoning: "Stability gives you power.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Overcommitment", "Always-on notifications", "Constant social obligations"],
        reasoning: "It shreds your focus—the thing you're built for.",
      },
      validation: {
        resonates: ["You feel best when your day is clean and intentional"],
        doesntResonate: ["You thrive on nonstop stimulation"],
      },
      affiliates: [],
    },

    products: {
      why: `You like tools that feel precise, durable, and quietly excellent.`,
      greenLight: [
        {
          title: "Product taste",
          items: ["Fewer, better tools", "Reliable materials", "Timeless design", "Repairable items"],
          reasoning: "You hate waste. You respect objects that respect you back.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Flashy disposable products that break quickly"],
        reasoning: "They feel noisy and unserious.",
      },
      validation: {
        resonates: ["You'd rather buy once and keep it"],
        doesntResonate: ["You love constant trendy replacements"],
      },
      affiliates: [],
    },

    travel: {
      why: `Your best travel is slow and intentional: places where you can learn craft, observe detail, and reset your mind.`,
      greenLight: [
        {
          title: "Travel style",
          items: ["Workshops", "Design cities", "Nature + quiet towns", "Slow itineraries"],
          reasoning: "You want depth, not box-ticking.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Party-first, chaotic travel with no quiet time"],
        reasoning: "It drains you and you come back more tired.",
      },
      validation: {
        resonates: ["You like trips that teach you something"],
        doesntResonate: ["You travel only for chaos and crowds"],
      },
      affiliates: [],
    },
  },

  /* ==========================================
     RENARA — HARMONY / BALANCE / SOFT POWER
  ========================================== */
  renara: {
    locations: {
      why: `You thrive in environments that feel **balanced**: aesthetically calm, socially respectful, not overly aggressive.
Too much chaos makes you tense. Too much rigidity makes you feel trapped.`,
      greenLight: [
        {
          title: "Balanced environments",
          items: [
            "Cities with good public spaces and beauty (parks, waterfronts, plazas)",
            "Places with polite social rhythm (respectful, not loud)",
            "Homes/neighborhoods that feel calm and safe",
          ],
          reasoning:
            "Your system prefers harmony: enough movement, but not constant friction.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: [
          "Aggressive 'every man for himself' environments",
          "Constant conflict zones (socially or physically)",
          "Very harsh, noisy, overstimulating neighborhoods",
        ],
        reasoning:
          "You'll spend energy regulating the environment instead of living your life.",
      },
      validation: {
        resonates: ["You feel best in calm, beautiful places"],
        doesntResonate: ["You feel alive only in intensity and chaos"],
      },
      affiliates: [],
    },

    work: {
      why: `You do your best work where people value **cooperation, taste, and stability**.
You're strong at smoothing systems, coordinating people, and creating flow.`,
      greenLight: [
        {
          title: "Work that fits",
          items: [
            "Operations / systems roles (making things run smoothly)",
            "Client/partner management (relationship + structure)",
            "Design-adjacent work (taste + coherence)",
            "Teams that have respectful conflict rules",
          ],
          reasoning:
            "You're a harmonizer—when your environment respects that, you become a multiplier.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["High-conflict politics-heavy teams", "Constant confrontation roles"],
        reasoning: "It forces you into armor that isn't your natural strength.",
      },
      validation: {
        resonates: ["You naturally reduce tension and create order"],
        doesntResonate: ["You enjoy dominating and fighting daily"],
      },
      affiliates: [],
    },

    community: {
      why: `You bond through **consistency and mutual respect** more than hype.`,
      greenLight: [
        {
          title: "Community fit",
          items: [
            "Small-to-medium circles with repeat gatherings",
            "People who value kindness + boundaries",
            "Groups built around shared lifestyle (health, art, community service)",
          ],
          reasoning: "You grow in steady spaces, not chaotic ones.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Drama-heavy social scenes", "Friends who thrive on conflict"],
        reasoning: "It drains your energy and makes you lose your softness.",
      },
      validation: {
        resonates: ["You prefer calm, stable friendships"],
        doesntResonate: ["You want constant drama or intensity"],
      },
      affiliates: [],
    },

    activities: {
      why: `You like activities that feel **smooth**: rhythm, flow, beauty, coordination.`,
      greenLight: [
        {
          title: "Best-fit activities",
          items: ["Dance classes", "Yoga", "Pilates", "Cooking", "Interior styling", "Photography"],
          reasoning: "Your joy comes from harmony and clean execution.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Hyper-aggressive, chaotic activities with constant confrontation"],
        reasoning: "It pulls you out of your natural power.",
      },
      validation: {
        resonates: ["You love flow and rhythm"],
        doesntResonate: ["You only want aggression and intensity"],
      },
      affiliates: [],
    },

    learning: {
      why: `You learn best through **structure + aesthetics**: clear steps, beautiful examples, social feedback.`,
      greenLight: [
        {
          title: "Learning style",
          items: ["Courses with elegant structure", "Study groups with supportive tone", "Practice with feedback"],
          reasoning: "You stick with learning when it feels good and coherent.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Harsh, humiliating teaching styles"],
        reasoning: "It shuts you down.",
      },
      validation: {
        resonates: ["You improve fast with supportive feedback"],
        doesntResonate: ["You prefer brutal pressure always"],
      },
      affiliates: [],
    },

    media: {
      why: `You like media that feels **beautiful and emotionally balanced**.`,
      greenLight: [
        {
          title: "Media that lands",
          items: ["Aesthetic films", "Music with warmth", "Design content", "Travel visuals"],
          reasoning: "Beauty is regulation for you.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Constant rage content", "Endless conflict feeds"],
        reasoning: "It destabilizes your mood without you noticing.",
      },
      validation: {
        resonates: ["You're sensitive to tone in content"],
        doesntResonate: ["You feel nothing from content tone"],
      },
      affiliates: [],
    },

    living: {
      why: `Your home should feel like a **soft reset**: clean lines, calm color, and cozy function.`,
      greenLight: [
        {
          title: "Home setup",
          items: ["Decluttered space", "Warm lighting", "Soft textures", "Plants", "A beautiful corner for calm"],
          reasoning: "Your environment directly shapes your emotional baseline.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Harsh lighting", "Messy chaos", "Constant noise"],
        reasoning: "You'll spend energy restoring balance every day.",
      },
      validation: {
        resonates: ["A calm home makes you feel like yourself"],
        doesntResonate: ["You don't care about environment at all"],
      },
      affiliates: [],
    },

    rituals: {
      why: `Your rituals should be **simple and soothing** — small daily anchors.`,
      greenLight: [
        {
          title: "Ritual ideas",
          items: ["Morning quiet drink", "Evening walk", "Weekly home reset", "Music + tidy ritual"],
          reasoning: "Small consistent rituals keep you stable.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Intense routines you can't sustain"],
        reasoning: "If it feels like a performance, it won't last.",
      },
      validation: {
        resonates: ["You love gentle routines"],
        doesntResonate: ["Routines feel pointless"],
      },
      affiliates: [],
    },

    movement: {
      why: `Movement for you is about **grace and balance**.`,
      greenLight: [
        {
          title: "Movement that fits",
          items: ["Yoga", "Dance", "Walking", "Swimming", "Light strength training"],
          reasoning: "You prefer movement that brings you back to center.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Pure confrontation-based training"],
        reasoning: "It pushes you into a harsh mode.",
      },
      validation: {
        resonates: ["You like graceful movement"],
        doesntResonate: ["You only like extreme intensity"],
      },
      affiliates: [],
    },

    wellness: {
      why: `Your wellness improves when your relationships are calm and your environment is stable.`,
      greenLight: [
        {
          title: "High ROI habits",
          items: ["Sleep stability", "Boundaries", "Nutrition routine", "Less doomscrolling"],
          reasoning: "Your nervous system is your engine—keep it clean.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["People-pleasing with no boundaries", "Staying in conflict too long"],
        reasoning: "You'll lose yourself trying to balance everyone else.",
      },
      validation: {
        resonates: ["You feel best with stability + kindness"],
        doesntResonate: ["You thrive in constant confrontation"],
      },
      affiliates: [],
    },

    products: {
      why: `You prefer items that feel **beautiful, calm, and high quality** — not loud.`,
      greenLight: [
        {
          title: "Product taste",
          items: ["Understated design", "Comfortable quality", "Soft color palettes", "Functional beauty"],
          reasoning: "Your products should support peace, not noise.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Flashy loud low-quality products"],
        reasoning: "They feel chaotic and distracting.",
      },
      validation: {
        resonates: ["You prefer understated quality"],
        doesntResonate: ["You love flashy products"],
      },
      affiliates: [],
    },

    travel: {
      why: `You travel to **restore balance**: calm beauty, respectful pace, and meaningful atmosphere.`,
      greenLight: [
        {
          title: "Travel style",
          items: ["Slow travel", "Nature + calm towns", "Beautiful cities with good parks", "Cultural respect travel"],
          reasoning: "Travel should soften you, not overstimulate you.",
        },
      ],
      redLight: {
        title: "Avoid",
        items: ["Chaotic party-driven travel"],
        reasoning: "It disrupts equilibrium and you come back drained.",
      },
      validation: {
        resonates: ["You travel to find calm"],
        doesntResonate: ["You travel for chaos"],
      },
      affiliates: [],
    },
  },
};

/**
 * Safe getter (UI can use this to avoid crashes)
 */
export function getRecommendations(codeName: string): CodeRecommendations | null {
  return RECOMMENDATIONS[codeName] ?? null;
}
