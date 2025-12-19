/**
 * AVIRAGE QUIZ QUESTIONS - FRAMEWORK EDITION
 * 35 questions designed to detect Big 5, MBTI, Enneagram, Astrology
 * Culturally neutral, behaviorally focused
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    emoji?: string;
  }[];
}

/**
 * 35 FRAMEWORK DETECTION QUESTIONS
 * Q1-8: MBTI (2 per dichotomy)
 * Q9-23: Big 5 (3 per trait)
 * Q24-32: Enneagram Core (1 per type)
 * Q33-35: Enneagram Wing
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // SECTION 1: MBTI DISCOVERY (Q1-8)
  // ==========================================

  // Q1: I/E - Energy Source
  {
    id: "q1",
    question: "When you need to restore your energy, you naturally prefer:",
    options: [
      { text: "Solitude or one-on-one time with someone close", emoji: "🏠" },
      { text: "Gathering with friends, family, or community", emoji: "👥" },
      { text: "A mix of both", emoji: "⚖️" },
    ],
  },

  // Q2: I/E - Social Processing
  {
    id: "q2",
    question: "When working through a problem or big decision, I naturally:",
    options: [
      { text: "Think it through internally first, then maybe discuss it", emoji: "🤔" },
      { text: "Talk it out with others - speaking helps me process", emoji: "💬" },
      { text: "Depends on the situation", emoji: "🔄" },
    ],
  },

  // Q3: S/N - Information Focus
  {
    id: "q3",
    question: "When someone explains something to me, I pay most attention to:",
    options: [
      { text: "The concrete details, facts, and step-by-step process", emoji: "📋" },
      { text: "The overall concept, possibilities, and what it could mean", emoji: "💡" },
      { text: "Both equally", emoji: "👁️" },
    ],
  },

  // Q4: S/N - Learning Style
  {
    id: "q4",
    question: "When understanding something new, I prefer:",
    options: [
      { text: "Clear examples, step-by-step guidance, and proven methods", emoji: "🎯" },
      { text: "Understanding the bigger idea and seeing patterns", emoji: "🗺️" },
      { text: "A combination of both", emoji: "🔗" },
    ],
  },

  // Q5: T/F - Decision Priority
  {
    id: "q5",
    question: "When making an important decision, my first consideration is:",
    options: [
      { text: "What makes the most logical sense and solves the problem effectively", emoji: "🧠" },
      { text: "How it affects people's feelings and whether it feels right to me", emoji: "❤️" },
      { text: "Both logic and people matter equally", emoji: "⚖️" },
    ],
  },

  // Q6: T/F - Conflict Response
  {
    id: "q6",
    question: "When there's a disagreement, I focus more on:",
    options: [
      { text: "Getting to the right answer and resolving the issue", emoji: "✅" },
      { text: "Understanding everyone's perspective and keeping relationships intact", emoji: "🤝" },
      { text: "Depends on the situation", emoji: "🔄" },
    ],
  },

  // Q7: J/P - Planning Preference
  {
    id: "q7",
    question: "When approaching tasks or activities, I prefer to:",
    options: [
      { text: "Plan ahead with clear structure - I like knowing what to expect", emoji: "📅" },
      { text: "Keep things flexible and adapt as I go", emoji: "🎲" },
      { text: "Some structure with room to adjust", emoji: "🗂️" },
    ],
  },

  // Q8: J/P - Work Style
  {
    id: "q8",
    question: "I'm most comfortable when:",
    options: [
      { text: "Things are organized, decided, and settled", emoji: "✔️" },
      { text: "Options stay open and I can adjust as needed", emoji: "🔓" },
      { text: "Mix of structure and flexibility", emoji: "⚖️" },
    ],
  },

  // ==========================================
  // SECTION 2: BIG 5 PROFILE (Q9-23)
  // ==========================================

  // Q9-11: OPENNESS
  {
    id: "q9",
    question: "How often do you find yourself diving deep into topics just for curiosity?",
    options: [
      { text: "Rarely - I prefer practical, useful knowledge", emoji: "🔧" },
      { text: "Sometimes - if it's relevant to my life", emoji: "📖" },
      { text: "Often - I love learning new ideas and perspectives", emoji: "🌟" },
    ],
  },
  {
    id: "q10",
    question: "My approach to problems is:",
    options: [
      { text: "Use what has worked before - tried and true methods", emoji: "🛠️" },
      { text: "Sometimes traditional, sometimes try something different", emoji: "🔄" },
      { text: "I enjoy finding new ways to do things", emoji: "💡" },
    ],
  },
  {
    id: "q11",
    question: "Beauty, meaning, and artistic expression:",
    options: [
      { text: "Are not central to how I live", emoji: "⚙️" },
      { text: "Matter to me but aren't my main focus", emoji: "🎨" },
      { text: "Deeply affect me - I seek beauty and meaning in life", emoji: "✨" },
    ],
  },

  // Q12-14: CONSCIENTIOUSNESS
  {
    id: "q12",
    question: "Given the choice, I naturally keep things:",
    options: [
      { text: "Loose and flexible - I don't need much order", emoji: "🌊" },
      { text: "Somewhat organized - manageable but not rigid", emoji: "📂" },
      { text: "Very organized - I create systems and structure", emoji: "📋" },
    ],
  },
  {
    id: "q13",
    question: "When I set a goal, I:",
    options: [
      { text: "Often don't follow through - I get distracted or lose interest", emoji: "🎈" },
      { text: "Usually complete it, though sometimes I need reminders", emoji: "✓" },
      { text: "Almost always see it through with consistent effort", emoji: "🎯" },
    ],
  },
  {
    id: "q14",
    question: "How much do small details and quality matter to you?",
    options: [
      { text: "Not much - I focus on the big picture and move fast", emoji: "⚡" },
      { text: "Moderately - I notice them but don't obsess", emoji: "👁️" },
      { text: "Very much - I care deeply about precision and excellence", emoji: "💎" },
    ],
  },

  // Q15-17: EXTRAVERSION
  {
    id: "q15",
    question: "Being around many people:",
    options: [
      { text: "Tires me - I prefer quiet or small groups", emoji: "🏠" },
      { text: "Is fine in moderation", emoji: "⚖️" },
      { text: "Energizes me - I enjoy social activity", emoji: "🎉" },
    ],
  },
  {
    id: "q16",
    question: "In group settings, I tend to:",
    options: [
      { text: "Observe more, speak when I have something important to say", emoji: "👂" },
      { text: "Participate equally with others", emoji: "🤝" },
      { text: "Naturally speak up, suggest ideas, or guide discussion", emoji: "💬" },
    ],
  },
  {
    id: "q17",
    question: "I'm drawn to:",
    options: [
      { text: "Calm, predictable experiences - I avoid intense stimulation", emoji: "🕊️" },
      { text: "A balanced mix of calm and excitement", emoji: "⚖️" },
      { text: "Adventure, novelty, and high-energy experiences", emoji: "🚀" },
    ],
  },

  // Q18-20: AGREEABLENESS
  {
    id: "q18",
    question: "When someone shares a struggle, I naturally:",
    options: [
      { text: "Focus on solutions - how to fix or improve the situation", emoji: "🔧" },
      { text: "Listen and offer both understanding and practical help", emoji: "🤝" },
      { text: "Focus on emotional support - feeling with them", emoji: "❤️" },
    ],
  },
  {
    id: "q19",
    question: "When my needs differ from others', I tend to:",
    options: [
      { text: "Hold firm to what I think is right or best", emoji: "🛡️" },
      { text: "Find middle ground that works for everyone", emoji: "⚖️" },
      { text: "Adjust to maintain harmony and relationships", emoji: "🕊️" },
    ],
  },
  {
    id: "q20",
    question: "My default assumption about people's intentions is:",
    options: [
      { text: "Skeptical - prove yourself first", emoji: "🔍" },
      { text: "Cautiously optimistic", emoji: "🤔" },
      { text: "Trusting - I assume good intentions", emoji: "🤗" },
    ],
  },

  // Q21-23: NEUROTICISM (Emotional Stability)
  {
    id: "q21",
    question: "Under pressure or stress, I:",
    options: [
      { text: "Stay calm and grounded - stress doesn't shake me much", emoji: "🧘" },
      { text: "Feel stress but manage it fairly well", emoji: "⚖️" },
      { text: "Feel anxious or overwhelmed easily", emoji: "😰" },
    ],
  },
  {
    id: "q22",
    question: "My emotions are:",
    options: [
      { text: "Steady and even-keeled - I don't have big swings", emoji: "📏" },
      { text: "Fluctuate but stay manageable", emoji: "🌊" },
      { text: "Intense and changeable - I feel things deeply", emoji: "🎭" },
    ],
  },
  {
    id: "q23",
    question: "How much do you worry about others' opinions of you?",
    options: [
      { text: "Rarely - I'm confident in who I am", emoji: "💪" },
      { text: "Sometimes - depends on the situation", emoji: "🤷" },
      { text: "Often - I'm very aware of how I'm perceived", emoji: "👀" },
    ],
  },

  // ==========================================
  // SECTION 3: ENNEAGRAM DISCOVERY (Q24-35)
  // ==========================================

  // Q24-32: Core Type (1 question per type)
  {
    id: "q24",
    question: "Having strong internal standards and noticing what's wrong:",
    options: [
      { text: "Not really - I'm flexible about how things are done", emoji: "🌊" },
      { text: "Somewhat - I care about quality but not perfection", emoji: "✓" },
      { text: "Very much - I have clear ideas of how things should be", emoji: "📐" },
    ],
  },
  {
    id: "q25",
    question: "How much does helping others and being appreciated for it matter?",
    options: [
      { text: "It's nice but not central to my identity", emoji: "🤷" },
      { text: "I like helping when asked", emoji: "🤝" },
      { text: "I deeply need to be helpful and valued by others", emoji: "❤️" },
    ],
  },
  {
    id: "q26",
    question: "Success, accomplishment, and being effective:",
    options: [
      { text: "Not my main focus - other things matter more", emoji: "🌿" },
      { text: "Important, but balanced with other priorities", emoji: "⚖️" },
      { text: "Very important - I'm driven to achieve and do well", emoji: "🏆" },
    ],
  },
  {
    id: "q27",
    question: "Being true to my inner self and expressing what makes me 'me':",
    options: [
      { text: "Not particularly important - I adapt to situations", emoji: "🔄" },
      { text: "Matters to me but I balance it with belonging", emoji: "⚖️" },
      { text: "Essential - I need to honor my authentic feelings and identity", emoji: "🦋" },
    ],
  },
  {
    id: "q28",
    question: "I need time alone to think, observe, and understand:",
    options: [
      { text: "Not really - I prefer action and connection", emoji: "🏃" },
      { text: "Sometimes - I enjoy learning", emoji: "📖" },
      { text: "Yes - I need solitude to process and master knowledge", emoji: "🧠" },
    ],
  },
  {
    id: "q29",
    question: "Loyalty, trust, and preparation for worst-case scenarios matter to me:",
    options: [
      { text: "Not particularly - I'm fairly relaxed", emoji: "😌" },
      { text: "Moderately - I like being prepared", emoji: "🛡️" },
      { text: "Very much - I need security and reliable people", emoji: "🏰" },
    ],
  },
  {
    id: "q30",
    question: "I'm drawn to new possibilities, variety, and positive experiences:",
    options: [
      { text: "Not really - I value stability and what's familiar", emoji: "🏡" },
      { text: "I enjoy some variety while maintaining stability", emoji: "⚖️" },
      { text: "Very much - I seek new experiences and keep my options open", emoji: "🎈" },
    ],
  },
  {
    id: "q31",
    question: "I need to be strong, autonomous, and protect what matters:",
    options: [
      { text: "Not particularly - I'm comfortable with softness and depending on others", emoji: "🤗" },
      { text: "Somewhat - I value strength but can be vulnerable", emoji: "⚖️" },
      { text: "Very much - I need to stay strong and in control", emoji: "💪" },
    ],
  },
  {
    id: "q32",
    question: "Avoiding conflict and maintaining inner/outer peace is my priority:",
    options: [
      { text: "Not really - I don't mind conflict", emoji: "⚔️" },
      { text: "Somewhat - I prefer harmony", emoji: "🕊️" },
      { text: "Yes - I go out of my way to keep peace", emoji: "☮️" },
    ],
  },

  // Q33-35: Wing Identification
  {
    id: "q33",
    question: "In how you relate to others, you tend to be:",
    options: [
      { text: "More reserved, independent, or self-contained", emoji: "🧊" },
      { text: "Present and engaged but not overwhelming", emoji: "⚖️" },
      { text: "Warm, expressive, or actively supportive", emoji: "🔥" },
    ],
  },
  {
    id: "q34",
    question: "I naturally gravitate toward:",
    options: [
      { text: "Order, rules, and doing things correctly", emoji: "📏" },
      { text: "Balance between structure and flow", emoji: "⚖️" },
      { text: "Going with the flow and keeping options open", emoji: "🌊" },
    ],
  },
  {
    id: "q35",
    question: "What fuels you most?",
    options: [
      { text: "Excellence, achievement, or mastery", emoji: "🏆" },
      { text: "Connection, understanding, or harmony", emoji: "🤝" },
      { text: "Freedom, experience, or intensity", emoji: "🚀" },
    ],
  },
];
