```ts
/**
 * AVIRAGE QUIZ QUESTIONS - SITUATIONAL EDITION
 * 35 questions designed to detect Big 5, MBTI, Enneagram, Astrology
 * Culturally neutral, behaviorally focused, casual tone
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
    question:
      "It’s been a long week. You finally get a free evening. What actually recharges you most?",
    options: [
      { text: "Quiet time solo (or just 1 close person)", emoji: "🏠" },
      { text: "Being around people — friends, family, a crowd", emoji: "👥" },
      { text: "A bit of both depending on my mood", emoji: "⚖️" },
    ],
  },

  // Q2: I/E - Social Processing
  {
    id: "q2",
    question:
      "You’ve got a big decision to make (career, money, relationship). What’s your default way of processing it?",
    options: [
      { text: "I think privately first, then talk if needed", emoji: "🤔" },
      { text: "I talk it out — speaking helps me find clarity", emoji: "💬" },
      { text: "It depends on what the decision is", emoji: "🔄" },
    ],
  },

  // Q3: S/N - Information Focus
  {
    id: "q3",
    question:
      "A friend is explaining a new idea/project to you. What grabs your attention first?",
    options: [
      { text: "The concrete details: facts, steps, what’s real", emoji: "📋" },
      { text: "The bigger meaning: patterns, possibilities, what it could become", emoji: "💡" },
      { text: "I naturally notice both", emoji: "👁️" },
    ],
  },

  // Q4: S/N - Learning Style
  {
    id: "q4",
    question:
      "You’re learning something new (skill/app/job). What helps you get good faster?",
    options: [
      { text: "Examples + clear steps + proven method", emoji: "🎯" },
      { text: "Understanding the concept + seeing patterns", emoji: "🗺️" },
      { text: "Mix of both — concept AND steps", emoji: "🔗" },
    ],
  },

  // Q5: T/F - Decision Priority
  {
    id: "q5",
    question:
      "You have to choose between two options that both ‘work’. What usually decides it for you?",
    options: [
      { text: "What’s most logical / efficient / effective", emoji: "🧠" },
      { text: "What feels right for people and relationships", emoji: "❤️" },
      { text: "I weigh both pretty evenly", emoji: "⚖️" },
    ],
  },

  // Q6: T/F - Conflict Response
  {
    id: "q6",
    question:
      "You’re in a disagreement with someone you care about. What do you focus on first?",
    options: [
      { text: "Fix the issue: clarify, solve, move forward", emoji: "✅" },
      { text: "Keep the bond: understand feelings, reduce tension", emoji: "🤝" },
      { text: "Depends on what’s at stake", emoji: "🔄" },
    ],
  },

  // Q7: J/P - Planning Preference
  {
    id: "q7",
    question:
      "You’re planning a day out / trip / project. Which feels most natural?",
    options: [
      { text: "Plan it properly — I like structure and clarity", emoji: "📅" },
      { text: "Keep it open — I’ll adapt in real time", emoji: "🎲" },
      { text: "Plan the essentials, freestyle the rest", emoji: "🗂️" },
    ],
  },

  // Q8: J/P - Work Style
  {
    id: "q8",
    question:
      "When you’re mid-project, what makes you feel calm and in control?",
    options: [
      { text: "Organized, decided, locked-in plan", emoji: "✔️" },
      { text: "Options open so I can pivot anytime", emoji: "🔓" },
      { text: "A plan — but with room to adjust", emoji: "⚖️" },
    ],
  },

  // ==========================================
  // SECTION 2: BIG 5 PROFILE (Q9-23)
  // ==========================================

  // Q9-11: OPENNESS
  {
    id: "q9",
    question:
      "You stumble on a random topic (space, art, history, psychology). What happens?",
    options: [
      { text: "I’ll ignore it unless it’s useful", emoji: "🔧" },
      { text: "I’ll read a bit if it connects to my life", emoji: "📖" },
      { text: "I’ll deep-dive for fun", emoji: "🌟" },
    ],
  },
  {
    id: "q10",
    question:
      "You’re stuck on a problem. What’s your instinct?",
    options: [
      { text: "Use the proven way — what already works", emoji: "🛠️" },
      { text: "Mix: proven base with some tweaks", emoji: "🔄" },
      { text: "Try a new angle — I like experimenting", emoji: "💡" },
    ],
  },
  {
    id: "q11",
    question:
      "When you see music, design, films, places… how much do beauty/meaning hit you?",
    options: [
      { text: "Not much — I’m more practical", emoji: "⚙️" },
      { text: "Some — I enjoy it but it’s not central", emoji: "🎨" },
      { text: "A lot — it genuinely affects my mood and choices", emoji: "✨" },
    ],
  },

  // Q12-14: CONSCIENTIOUSNESS
  {
    id: "q12",
    question:
      "Your room/desk/phone is your vibe. Which is most accurate most days?",
    options: [
      { text: "A bit chaotic — I can still find things", emoji: "🌊" },
      { text: "Decent — not perfect but manageable", emoji: "📂" },
      { text: "Organized — I like systems", emoji: "📋" },
    ],
  },
  {
    id: "q13",
    question:
      "You set a goal (gym, study, side project). What usually happens after week 1?",
    options: [
      { text: "I drift — motivation changes fast", emoji: "🎈" },
      { text: "I mostly stick to it, with some off-days", emoji: "✓" },
      { text: "I lock in — consistency is my thing", emoji: "🎯" },
    ],
  },
  {
    id: "q14",
    question:
      "You’re delivering something (work, creative, task). How much do you care about polish?",
    options: [
      { text: "Speed > perfection. Ship it.", emoji: "⚡" },
      { text: "Balance — good enough, but not obsessive", emoji: "👁️" },
      { text: "High standard — quality matters a lot", emoji: "💎" },
    ],
  },

  // Q15-17: EXTRAVERSION
  {
    id: "q15",
    question:
      "You’ve been around a lot of people all day. After that, you feel…",
    options: [
      { text: "Drained — I need quiet to reset", emoji: "🏠" },
      { text: "Okay — depends how intense it was", emoji: "⚖️" },
      { text: "Charged — I like the energy", emoji: "🎉" },
    ],
  },
  {
    id: "q16",
    question:
      "In a group chat / group hang, you’re usually the one who…",
    options: [
      { text: "Listens more, speaks when it matters", emoji: "👂" },
      { text: "Joins in normally like everyone else", emoji: "🤝" },
      { text: "Starts things / leads the vibe / talks a lot", emoji: "💬" },
    ],
  },
  {
    id: "q17",
    question:
      "Your ideal weekend has more of…",
    options: [
      { text: "Chill + predictable + low stimulation", emoji: "🕊️" },
      { text: "A healthy mix of chill and fun", emoji: "⚖️" },
      { text: "Novelty + adventure + high energy", emoji: "🚀" },
    ],
  },

  // Q18-20: AGREEABLENESS
  {
    id: "q18",
    question:
      "A friend tells you they’re struggling. Your first move is usually…",
    options: [
      { text: "Problem-solve: ‘Okay, here’s what we do’", emoji: "🔧" },
      { text: "Both: listen first, then help practically", emoji: "🤝" },
      { text: "Emotional support: ‘I feel you, I’m here’", emoji: "❤️" },
    ],
  },
  {
    id: "q19",
    question:
      "You and someone else want different things. What’s your default?",
    options: [
      { text: "Hold my ground if I believe I’m right", emoji: "🛡️" },
      { text: "Meet in the middle", emoji: "⚖️" },
      { text: "I’ll bend to keep the peace", emoji: "🕊️" },
    ],
  },
  {
    id: "q20",
    question:
      "You meet someone new. Your gut assumption is usually…",
    options: [
      { text: "Cautious: trust is earned", emoji: "🔍" },
      { text: "Neutral: I wait and see", emoji: "🤔" },
      { text: "Warm: I assume good intentions", emoji: "🤗" },
    ],
  },

  // Q21-23: NEUROTICISM (Emotional Stability)
  {
    id: "q21",
    question:
      "Scenario: You wake up late. Your bank balance is low. Your car won’t start. Pressure building. What do you do first?",
    options: [
      { text: "I stay surprisingly calm and go into ‘solve mode’", emoji: "🧘" },
      { text: "I feel the stress, but I manage and start sorting it out", emoji: "⚖️" },
      { text: "I spiral or shut down for a bit — it feels like too much", emoji: "😰" },
    ],
  },
  {
    id: "q22",
    question:
      "Scenario: Someone says something that hits a nerve. Your emotional ‘wave’ is usually…",
    options: [
      { text: "Small ripple — I stay steady", emoji: "📏" },
      { text: "A wave, but I recover pretty fast", emoji: "🌊" },
      { text: "Big wave — it sticks with me for a while", emoji: "🎭" },
    ],
  },
  {
    id: "q23",
    question:
      "Scenario: You post/say something and then wonder how it landed. How much does ‘what people think’ affect you?",
    options: [
      { text: "Barely — I’m fine either way", emoji: "💪" },
      { text: "A little — depends who it is", emoji: "🤷" },
      { text: "A lot — I replay it in my head", emoji: "👀" },
    ],
  },

  // ==========================================
  // SECTION 3: ENNEAGRAM DISCOVERY (Q24-35)
  // ==========================================

  // Q24-32: Core Type (1 question per type)
  {
    id: "q24",
    question:
      "Scenario: You notice something is ‘not done right’ (work, home, teamwork). What’s your instinct?",
    options: [
      { text: "Let it slide — people do things differently", emoji: "🌊" },
      { text: "Nudge it a bit — quality matters, but I’m not strict", emoji: "✓" },
      { text: "Fix it / correct it — it bothers me until it’s right", emoji: "📐" },
    ],
  },
  {
    id: "q25",
    question:
      "Scenario: Someone needs help. How much do you feel pulled to step in?",
    options: [
      { text: "I care, but I keep boundaries", emoji: "🤷" },
      { text: "I help when asked / when I can", emoji: "🤝" },
      { text: "I almost can’t NOT help — it feels personal", emoji: "❤️" },
    ],
  },
  {
    id: "q26",
    question:
      "Scenario: You’re in a competitive environment (work, school, social status). What’s your drive like?",
    options: [
      { text: "I’m not chasing ‘winning’ like that", emoji: "🌿" },
      { text: "I want to do well, but balance matters", emoji: "⚖️" },
      { text: "I’m wired to achieve — results matter", emoji: "🏆" },
    ],
  },
  {
    id: "q27",
    question:
      "Scenario: You’re in a space where you could ‘fit in’… but it would hide parts of you. What do you do?",
    options: [
      { text: "I adapt — fitting the moment is normal", emoji: "🔄" },
      { text: "I balance both — belong, but keep my core", emoji: "⚖️" },
      { text: "I’d rather be myself, even if it stands out", emoji: "🦋" },
    ],
  },
  {
    id: "q28",
    question:
      "Scenario: You’ve been around people all day. Later, what do you need most?",
    options: [
      { text: "Action or connection — I don’t need much solitude", emoji: "🏃" },
      { text: "A bit of alone time, but not too much", emoji: "📖" },
      { text: "Proper solitude — I need to retreat and recharge mentally", emoji: "🧠" },
    ],
  },
  {
    id: "q29",
    question:
      "Scenario: Something feels uncertain (job, relationship, money). What’s your default response?",
    options: [
      { text: "I stay pretty relaxed and deal with it later", emoji: "😌" },
      { text: "I like having a backup plan", emoji: "🛡️" },
      { text: "I need clarity + reliable people — uncertainty eats at me", emoji: "🏰" },
    ],
  },
  {
    id: "q30",
    question:
      "Scenario: Your schedule opens up unexpectedly. What’s your instinct?",
    options: [
      { text: "Stick to familiar comfort — keep it simple", emoji: "🏡" },
      { text: "Mix: chill + one new thing", emoji: "⚖️" },
      { text: "Say yes to something new — options excite me", emoji: "🎈" },
    ],
  },
  {
    id: "q31",
    question:
      "Scenario: Someone crosses a line with you. What’s your default energy?",
    options: [
      { text: "I’m okay being soft — I don’t need to dominate", emoji: "🤗" },
      { text: "I can be strong, but I choose it carefully", emoji: "⚖️" },
      { text: "I go firm fast — I don’t let things slide", emoji: "💪" },
    ],
  },
  {
    id: "q32",
    question:
      "Scenario: There’s tension in the room (family, friends, work). What do you usually do?",
    options: [
      { text: "I don’t mind conflict — let’s address it", emoji: "⚔️" },
      { text: "I prefer harmony, but I won’t avoid everything", emoji: "🕊️" },
      { text: "I smooth it over / avoid it — peace matters most", emoji: "☮️" },
    ],
  },

  // Q33-35: Wing Identification
  {
    id: "q33",
    question:
      "Scenario: Someone new joins your circle. Your vibe is usually…",
    options: [
      { text: "Reserved at first — I warm up slowly", emoji: "🧊" },
      { text: "Present and friendly, not too intense", emoji: "⚖️" },
      { text: "Warm and expressive — I pull them in", emoji: "🔥" },
    ],
  },
  {
    id: "q34",
    question:
      "Scenario: You’re coordinating something with others. What style feels most ‘you’?",
    options: [
      { text: "Clear rules, clean standards, done properly", emoji: "📏" },
      { text: "Balance — structure with flexibility", emoji: "⚖️" },
      { text: "Flow state — keep it loose and adjust", emoji: "🌊" },
    ],
  },
  {
    id: "q35",
    question:
      "Scenario: You get a full day with zero obligations. What would feel most satisfying?",
    options: [
      { text: "Build/master something — progress feels good", emoji: "🏆" },
      { text: "Connect deeply — quality time / harmony", emoji: "🤝" },
      { text: "Freedom — explore, experience, intensity", emoji: "🚀" },
    ],
  },
];
