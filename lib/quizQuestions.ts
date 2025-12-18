/**
 * AVIRAGE QUIZ QUESTIONS
 * Multi-dimensional questions that score multiple traits at once
 */

import { TraitScores } from "./types";

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    traitScores: Partial<TraitScores>;
    emoji?: string;
  }[];
}

/**
 * 18 multi-dimensional questions covering all 25 traits
 * Each option scores 2-4 traits
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Q1: Social Energy + Group Size + Environmental Sensitivity
  {
    id: "social_gathering",
    question: "Your ideal Saturday night:",
    options: [
      {
        text: "Big party with 30+ people, loud music, dancing",
        emoji: "🎉",
        traitScores: {
          social_energy: 85,
          group_size_preference: 85,
          environmental_sensitivity: 25,
          optimism_baseline: 70,
        },
      },
      {
        text: "Dinner with 4-6 close friends, conversation and laughter",
        emoji: "🍷",
        traitScores: {
          social_energy: 65,
          group_size_preference: 45,
          environmental_sensitivity: 50,
          emotional_expressiveness: 65,
        },
      },
      {
        text: "Quiet night with 1-2 people, deep conversation",
        emoji: "☕",
        traitScores: {
          social_energy: 35,
          group_size_preference: 25,
          environmental_sensitivity: 70,
          introspection_depth: 70,
        },
      },
      {
        text: "Alone at home, recharging in solitude",
        emoji: "🏠",
        traitScores: {
          social_energy: 20,
          group_size_preference: 20,
          environmental_sensitivity: 75,
          introspection_depth: 75,
        },
      },
    ],
  },

  // Q2: Craftsmanship + Pace + Detail Orientation
  {
    id: "creation_style",
    question: "When making or creating something:",
    options: [
      {
        text: "I obsess over every detail, perfecting it slowly",
        emoji: "🎨",
        traitScores: {
          craftsmanship_drive: 90,
          detail_orientation: 85,
          pace_preference: 85,
          meaning_orientation: 75,
        },
      },
      {
        text: "I take my time but focus on the overall result",
        emoji: "🛠️",
        traitScores: {
          craftsmanship_drive: 70,
          detail_orientation: 60,
          pace_preference: 65,
          output_orientation: 65,
        },
      },
      {
        text: "I work quickly to see results, refine later",
        emoji: "⚡",
        traitScores: {
          craftsmanship_drive: 45,
          detail_orientation: 40,
          pace_preference: 30,
          output_orientation: 80,
        },
      },
      {
        text: "I improvise and go with the flow",
        emoji: "🎭",
        traitScores: {
          craftsmanship_drive: 50,
          improvisation_comfort: 80,
          structure_preference: 30,
          novelty_seeking: 70,
        },
      },
    ],
  },

  // Q3: Nature Connection + Introspection + Environmental Sensitivity
  {
    id: "recharge_method",
    question: "To recharge and feel centered, I need:",
    options: [
      {
        text: "Time in nature - forests, mountains, ocean",
        emoji: "🌲",
        traitScores: {
          nature_connection: 90,
          introspection_depth: 70,
          environmental_sensitivity: 65,
          emotional_stability: 70,
        },
      },
      {
        text: "Quiet indoor spaces with soft lighting and comfort",
        emoji: "🕯️",
        traitScores: {
          nature_connection: 40,
          environmental_sensitivity: 80,
          introspection_depth: 75,
          sensory_appreciation: 75,
        },
      },
      {
        text: "Urban energy - cafes, streets, people watching",
        emoji: "🏙️",
        traitScores: {
          nature_connection: 25,
          social_energy: 65,
          sensory_appreciation: 70,
          abstract_thinking: 60,
        },
      },
      {
        text: "Physical activity and movement",
        emoji: "🏃",
        traitScores: {
          nature_connection: 55,
          pace_preference: 35,
          environmental_sensitivity: 40,
          emotional_stability: 70,
        },
      },
    ],
  },

  // Q4: Conflict Navigation + Emotional Expression + Influence
  {
    id: "disagreement_style",
    question: "When there's a disagreement:",
    options: [
      {
        text: "I speak up directly and debate passionately",
        emoji: "🔥",
        traitScores: {
          conflict_navigation: 85,
          emotional_expressiveness: 80,
          influence_drive: 75,
          stability_seeking: 40,
        },
      },
      {
        text: "I calmly state my view and listen to others",
        emoji: "🤝",
        traitScores: {
          conflict_navigation: 60,
          emotional_stability: 75,
          influence_drive: 55,
          introspection_depth: 65,
        },
      },
      {
        text: "I prefer to keep peace and find common ground",
        emoji: "☮️",
        traitScores: {
          conflict_navigation: 30,
          emotional_stability: 65,
          collaborative_preference: 75,
          group_size_preference: 50,
        },
      },
      {
        text: "I avoid conflict and withdraw to process alone",
        emoji: "🚪",
        traitScores: {
          conflict_navigation: 20,
          introspection_depth: 80,
          environmental_sensitivity: 70,
          social_energy: 30,
        },
      },
    ],
  },

  // Q5: Structure vs Improvisation + Pace + Stability
  {
    id: "planning_style",
    question: "My approach to plans and schedules:",
    options: [
      {
        text: "I plan everything in detail, organized systems",
        emoji: "📋",
        traitScores: {
          structure_preference: 90,
          stability_seeking: 80,
          detail_orientation: 75,
          improvisation_comfort: 25,
        },
      },
      {
        text: "I have a rough plan but stay flexible",
        emoji: "🗺️",
        traitScores: {
          structure_preference: 60,
          improvisation_comfort: 60,
          stability_seeking: 55,
          novelty_seeking: 60,
        },
      },
      {
        text: "I prefer spontaneity, figure things out as I go",
        emoji: "🎲",
        traitScores: {
          structure_preference: 25,
          improvisation_comfort: 85,
          novelty_seeking: 80,
          stability_seeking: 30,
        },
      },
      {
        text: "I follow natural rhythms, no strict schedule",
        emoji: "🌊",
        traitScores: {
          structure_preference: 35,
          pace_preference: 70,
          present_moment_focus: 75,
          improvisation_comfort: 70,
        },
      },
    ],
  },

  // Q6: Sensory Appreciation + Craftsmanship + Detail
  {
    id: "aesthetic_awareness",
    question: "When choosing objects or spaces:",
    options: [
      {
        text: "Texture, quality, beauty matter deeply to me",
        emoji: "✨",
        traitScores: {
          sensory_appreciation: 90,
          craftsmanship_drive: 75,
          detail_orientation: 70,
          meaning_orientation: 65,
        },
      },
      {
        text: "I notice aesthetics but function comes first",
        emoji: "⚙️",
        traitScores: {
          sensory_appreciation: 55,
          craftsmanship_drive: 55,
          output_orientation: 75,
          detail_orientation: 60,
        },
      },
      {
        text: "I'm pretty indifferent to how things look",
        emoji: "🤷",
        traitScores: {
          sensory_appreciation: 30,
          abstract_thinking: 65,
          output_orientation: 70,
          detail_orientation: 40,
        },
      },
      {
        text: "I love rich sensory experiences - colors, sounds, tastes",
        emoji: "🎨",
        traitScores: {
          sensory_appreciation: 85,
          present_moment_focus: 70,
          emotional_expressiveness: 70,
          environmental_sensitivity: 60,
        },
      },
    ],
  },

  // Q7: Abstract vs Concrete + Meaning Orientation
  {
    id: "thinking_style",
    question: "I'm most interested in:",
    options: [
      {
        text: "Big ideas, philosophy, deeper meaning",
        emoji: "🧠",
        traitScores: {
          abstract_thinking: 85,
          meaning_orientation: 85,
          introspection_depth: 75,
          tradition_orientation: 60,
        },
      },
      {
        text: "Practical solutions and concrete results",
        emoji: "🔧",
        traitScores: {
          abstract_thinking: 30,
          output_orientation: 85,
          detail_orientation: 70,
          craftsmanship_drive: 65,
        },
      },
      {
        text: "Patterns, systems, how things connect",
        emoji: "🔗",
        traitScores: {
          abstract_thinking: 75,
          pattern_recognition: 80,
          introspection_depth: 70,
          detail_orientation: 65,
        },
      },
      {
        text: "Experiences and feelings in the moment",
        emoji: "💫",
        traitScores: {
          abstract_thinking: 50,
          present_moment_focus: 80,
          emotional_expressiveness: 75,
          sensory_appreciation: 75,
        },
      },
    ],
  },

  // Q8: Novelty vs Tradition + Stability
  {
    id: "change_approach",
    question: "My relationship with tradition and change:",
    options: [
      {
        text: "I honor tradition and proven methods",
        emoji: "📜",
        traitScores: {
          tradition_orientation: 85,
          stability_seeking: 80,
          novelty_seeking: 30,
          meaning_orientation: 70,
        },
      },
      {
        text: "I respect the past but embrace innovation",
        emoji: "⚖️",
        traitScores: {
          tradition_orientation: 55,
          novelty_seeking: 65,
          stability_seeking: 55,
          abstract_thinking: 70,
        },
      },
      {
        text: "I constantly seek new experiences and ideas",
        emoji: "🚀",
        traitScores: {
          novelty_seeking: 90,
          tradition_orientation: 25,
          stability_seeking: 30,
          optimism_baseline: 75,
        },
      },
      {
        text: "I question traditions and reimagine possibilities",
        emoji: "💡",
        traitScores: {
          novelty_seeking: 80,
          tradition_orientation: 30,
          abstract_thinking: 80,
          influence_drive: 70,
        },
      },
    ],
  },

  // Q9: Pace Preference + Output vs Process
  {
    id: "work_rhythm",
    question: "My natural work rhythm:",
    options: [
      {
        text: "Slow and steady, savoring the process",
        emoji: "🐌",
        traitScores: {
          pace_preference: 90,
          craftsmanship_drive: 75,
          present_moment_focus: 75,
          output_orientation: 35,
        },
      },
      {
        text: "Moderate pace, balance process and results",
        emoji: "🚶",
        traitScores: {
          pace_preference: 55,
          output_orientation: 60,
          craftsmanship_drive: 60,
          emotional_stability: 65,
        },
      },
      {
        text: "Fast and efficient, driven by deadlines",
        emoji: "⚡",
        traitScores: {
          pace_preference: 25,
          output_orientation: 85,
          structure_preference: 70,
          influence_drive: 65,
        },
      },
      {
        text: "Bursts of intense focus then rest",
        emoji: "🌊",
        traitScores: {
          pace_preference: 50,
          improvisation_comfort: 70,
          present_moment_focus: 65,
          emotional_expressiveness: 60,
        },
      },
    ],
  },

  // Q10: Emotional Expression + Stability + Introspection
  {
    id: "emotional_style",
    question: "With my emotions, I:",
    options: [
      {
        text: "Express them openly and passionately",
        emoji: "❤️",
        traitScores: {
          emotional_expressiveness: 90,
          emotional_stability: 45,
          social_energy: 70,
          meaning_orientation: 70,
        },
      },
      {
        text: "Share with close people, process deeply inside",
        emoji: "🤗",
        traitScores: {
          emotional_expressiveness: 60,
          introspection_depth: 80,
          group_size_preference: 30,
          environmental_sensitivity: 70,
        },
      },
      {
        text: "Stay calm and composed, rarely show feelings",
        emoji: "😌",
        traitScores: {
          emotional_expressiveness: 25,
          emotional_stability: 85,
          introspection_depth: 60,
          conflict_navigation: 50,
        },
      },
      {
        text: "Feel deeply but keep private, reflective",
        emoji: "🌙",
        traitScores: {
          emotional_expressiveness: 35,
          introspection_depth: 90,
          emotional_stability: 55,
          meaning_orientation: 75,
        },
      },
    ],
  },

  // Q11: Influence + Collaboration + Conflict
  {
    id: "leadership_style",
    question: "In groups, I naturally:",
    options: [
      {
        text: "Take charge and guide decisions",
        emoji: "👑",
        traitScores: {
          influence_drive: 90,
          conflict_navigation: 70,
          output_orientation: 80,
          social_energy: 75,
        },
      },
      {
        text: "Contribute ideas and collaborate equally",
        emoji: "🤝",
        traitScores: {
          influence_drive: 55,
          collaborative_preference: 80,
          conflict_navigation: 50,
          social_energy: 65,
        },
      },
      {
        text: "Support others and work behind the scenes",
        emoji: "🎭",
        traitScores: {
          influence_drive: 30,
          collaborative_preference: 75,
          conflict_navigation: 35,
          introspection_depth: 65,
        },
      },
      {
        text: "Prefer to work independently",
        emoji: "🦅",
        traitScores: {
          influence_drive: 50,
          collaborative_preference: 25,
          social_energy: 30,
          introspection_depth: 75,
        },
      },
    ],
  },

  // Q12: Optimism + Stability + Emotional
  {
    id: "outlook_style",
    question: "My general outlook on life:",
    options: [
      {
        text: "Optimistic and hopeful about the future",
        emoji: "☀️",
        traitScores: {
          optimism_baseline: 90,
          emotional_stability: 70,
          novelty_seeking: 70,
          social_energy: 70,
        },
      },
      {
        text: "Realistic but open to possibilities",
        emoji: "⚖️",
        traitScores: {
          optimism_baseline: 55,
          emotional_stability: 70,
          abstract_thinking: 65,
          introspection_depth: 65,
        },
      },
      {
        text: "Cautious and prepared for challenges",
        emoji: "🛡️",
        traitScores: {
          optimism_baseline: 35,
          stability_seeking: 80,
          detail_orientation: 70,
          structure_preference: 75,
        },
      },
      {
        text: "Accepting of life's impermanence and flow",
        emoji: "🌊",
        traitScores: {
          optimism_baseline: 55,
          emotional_stability: 75,
          meaning_orientation: 75,
          present_moment_focus: 80,
        },
      },
    ],
  },

  // Q13: Detail vs Big Picture + Pattern Recognition
  {
    id: "focus_style",
    question: "When observing or analyzing:",
    options: [
      {
        text: "I notice every small detail and nuance",
        emoji: "🔍",
        traitScores: {
          detail_orientation: 90,
          pattern_recognition: 70,
          environmental_sensitivity: 70,
          craftsmanship_drive: 75,
        },
      },
      {
        text: "I see the big picture and overall patterns",
        emoji: "🗺️",
        traitScores: {
          detail_orientation: 35,
          pattern_recognition: 85,
          abstract_thinking: 80,
          influence_drive: 65,
        },
      },
      {
        text: "I balance details with broader context",
        emoji: "👁️",
        traitScores: {
          detail_orientation: 60,
          pattern_recognition: 75,
          abstract_thinking: 65,
          introspection_depth: 70,
        },
      },
      {
        text: "I focus on what's useful and actionable",
        emoji: "🎯",
        traitScores: {
          detail_orientation: 55,
          output_orientation: 80,
          abstract_thinking: 40,
          structure_preference: 70,
        },
      },
    ],
  },

  // Q14: Present Moment vs Future/Past
  {
    id: "time_orientation",
    question: "My attention tends to be on:",
    options: [
      {
        text: "Right here, right now - fully present",
        emoji: "🧘",
        traitScores: {
          present_moment_focus: 90,
          introspection_depth: 75,
          sensory_appreciation: 75,
          pace_preference: 70,
        },
      },
      {
        text: "The future - planning and possibilities",
        emoji: "🔮",
        traitScores: {
          present_moment_focus: 30,
          novelty_seeking: 80,
          abstract_thinking: 75,
          optimism_baseline: 70,
        },
      },
      {
        text: "The past - memories and lessons learned",
        emoji: "📖",
        traitScores: {
          present_moment_focus: 35,
          tradition_orientation: 75,
          introspection_depth: 80,
          meaning_orientation: 70,
        },
      },
      {
        text: "All of it - past, present, and future interweave",
        emoji: "♾️",
        traitScores: {
          present_moment_focus: 55,
          abstract_thinking: 80,
          meaning_orientation: 80,
          pattern_recognition: 80,
        },
      },
    ],
  },

  // Q15: Meaning vs Pragmatic + Purpose
  {
    id: "motivation_source",
    question: "What drives me most:",
    options: [
      {
        text: "Deep meaning and purpose",
        emoji: "🕊️",
        traitScores: {
          meaning_orientation: 95,
          introspection_depth: 80,
          abstract_thinking: 75,
          tradition_orientation: 65,
        },
      },
      {
        text: "Practical results and tangible impact",
        emoji: "🔨",
        traitScores: {
          meaning_orientation: 40,
          output_orientation: 85,
          craftsmanship_drive: 70,
          detail_orientation: 70,
        },
      },
      {
        text: "Joy, pleasure, and enjoyment",
        emoji: "🎉",
        traitScores: {
          meaning_orientation: 45,
          optimism_baseline: 80,
          present_moment_focus: 75,
          sensory_appreciation: 75,
        },
      },
      {
        text: "Creating beauty and excellence",
        emoji: "💎",
        traitScores: {
          meaning_orientation: 70,
          craftsmanship_drive: 85,
          sensory_appreciation: 85,
          detail_orientation: 80,
        },
      },
    ],
  },

  // Q16: Sensory Environment Preference
  {
    id: "environment_preference",
    question: "I thrive in environments that are:",
    options: [
      {
        text: "Stimulating - colors, sounds, activity, energy",
        emoji: "🎪",
        traitScores: {
          environmental_sensitivity: 25,
          sensory_appreciation: 80,
          social_energy: 80,
          novelty_seeking: 75,
        },
      },
      {
        text: "Calm - quiet, soft, minimal, peaceful",
        emoji: "🤍",
        traitScores: {
          environmental_sensitivity: 85,
          introspection_depth: 75,
          pace_preference: 80,
          emotional_stability: 75,
        },
      },
      {
        text: "Natural - organic, earthy, connected to nature",
        emoji: "🌿",
        traitScores: {
          environmental_sensitivity: 65,
          nature_connection: 90,
          sensory_appreciation: 70,
          meaning_orientation: 65,
        },
      },
      {
        text: "Refined - curated beauty, intentional design",
        emoji: "🏛️",
        traitScores: {
          environmental_sensitivity: 60,
          sensory_appreciation: 90,
          craftsmanship_drive: 75,
          detail_orientation: 75,
        },
      },
    ],
  },

  // Q17: Stability vs Risk + Adventure
  {
    id: "risk_comfort",
    question: "When it comes to uncertainty:",
    options: [
      {
        text: "I need security and predictability",
        emoji: "🏰",
        traitScores: {
          stability_seeking: 90,
          structure_preference: 80,
          tradition_orientation: 70,
          optimism_baseline: 45,
        },
      },
      {
        text: "I'm comfortable with some uncertainty",
        emoji: "🎈",
        traitScores: {
          stability_seeking: 55,
          improvisation_comfort: 65,
          novelty_seeking: 60,
          emotional_stability: 65,
        },
      },
      {
        text: "I embrace risk and adventure",
        emoji: "🪂",
        traitScores: {
          stability_seeking: 25,
          novelty_seeking: 90,
          improvisation_comfort: 85,
          optimism_baseline: 80,
        },
      },
      {
        text: "I accept impermanence as natural",
        emoji: "🍂",
        traitScores: {
          stability_seeking: 45,
          emotional_stability: 80,
          meaning_orientation: 80,
          present_moment_focus: 75,
        },
      },
    ],
  },

  // Q18: Collaborative vs Independent
  {
    id: "work_preference",
    question: "I do my best work:",
    options: [
      {
        text: "Collaborating closely with others",
        emoji: "👥",
        traitScores: {
          collaborative_preference: 90,
          social_energy: 75,
          conflict_navigation: 50,
          emotional_expressiveness: 70,
        },
      },
      {
        text: "With occasional input from others",
        emoji: "🤝",
        traitScores: {
          collaborative_preference: 60,
          social_energy: 55,
          influence_drive: 55,
          introspection_depth: 60,
        },
      },
      {
        text: "Completely independently and alone",
        emoji: "🧗",
        traitScores: {
          collaborative_preference: 20,
          social_energy: 25,
          introspection_depth: 80,
          craftsmanship_drive: 75,
        },
      },
      {
        text: "In parallel - alone but with others nearby",
        emoji: "☕",
        traitScores: {
          collaborative_preference: 45,
          social_energy: 50,
          environmental_sensitivity: 55,
          present_moment_focus: 65,
        },
      },
    ],
  },
];
