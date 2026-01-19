/**
 * ETHOS QUIZ QUESTIONS - UPGRADED v2
 * 25 questions: 15 Big Five + 10 Enneagram
 * Dual-purpose design (questions signal multiple frameworks)
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    emoji?: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // SECTION 1: BIG FIVE - OPENNESS (Q1-3)
  // Also detects: Enneagram 4, 5, 7
  // ==========================================

  {
    id: "q1",
    question:
      "Your friend is explaining their new business idea. What actually grabs your attention?",
    options: [
      { text: "The step-by-step plan — show me the real details", emoji: "📋" },
      { text: "The vision — where could this go in 5 years?", emoji: "🚀" },
      { text: "Both matter, but I lean toward the big picture", emoji: "🌅" },
    ],
  },

  {
    id: "q2",
    question:
      "You've got a free Saturday. What sounds most appealing right now?",
    options: [
      { text: "Try something brand new I've never done before", emoji: "✨" },
      { text: "Do a favorite activity that I know I enjoy", emoji: "🎯" },
      { text: "Mix of both — familiar base, small twist", emoji: "🔄" },
    ],
  },

  {
    id: "q3",
    question:
      "Someone asks: 'What kind of art/music/media do you like?' Your honest answer:",
    options: [
      { text: "I'm all over the place — weird, niche, experimental", emoji: "🎨" },
      { text: "I stick to what's proven good — classics, hits, reliable stuff", emoji: "⭐" },
      { text: "Bit of both — some deep cuts, some mainstream", emoji: "🎭" },
    ],
  },

  // ==========================================
  // SECTION 2: BIG FIVE - CONSCIENTIOUSNESS (Q4-6)
  // Also detects: Enneagram 1, 3, 6
  // ==========================================

  {
    id: "q4",
    question:
      "Big work deadline is in 3 days. How are you handling this?",
    options: [
      { text: "Already done or 80% done — I don't wait until the last minute", emoji: "✅" },
      { text: "I'll get it done tomorrow or the day after — I work better under pressure", emoji: "⚡" },
      { text: "Started early but taking breaks — steady progress", emoji: "🚶" },
    ],
  },

  {
    id: "q5",
    question:
      "Your workspace/room right now. What does it look like?",
    options: [
      { text: "Organized, clean, everything has a place", emoji: "🧘" },
      { text: "Organized chaos — I know where everything is, even if it looks messy", emoji: "🌪️" },
      { text: "Somewhere in between — tidy enough to function", emoji: "📦" },
    ],
  },

  {
    id: "q6",
    question:
      "You're planning a trip. What's your approach?",
    options: [
      { text: "Detailed itinerary — flights, hotels, activities all locked in", emoji: "📅" },
      { text: "Rough idea of where I'm going, figure out the rest as I go", emoji: "🗺️" },
      { text: "Major stuff booked, but I leave room for spontaneity", emoji: "✈️" },
    ],
  },

  // ==========================================
  // SECTION 3: BIG FIVE - EXTRAVERSION (Q7-9)
  // Also detects: Enneagram 2, 7, 8
  // ==========================================

  {
    id: "q7",
    question:
      "Friday night. You've had a long week. What actually recharges you?",
    options: [
      { text: "Being around people — friends, party, social energy", emoji: "🎉" },
      { text: "Quiet time alone or with one close person", emoji: "🏠" },
      { text: "Small group hangout — not too big, not totally alone", emoji: "👥" },
    ],
  },

  {
    id: "q8",
    question:
      "You walk into a room full of strangers. What's your natural move?",
    options: [
      { text: "Jump in — start talking, introduce myself, make connections", emoji: "🤝" },
      { text: "Hang back and observe — wait for someone to approach me", emoji: "👀" },
      { text: "Find one person and have a real conversation", emoji: "💬" },
    ],
  },

  {
    id: "q9",
    question:
      "After a full day of back-to-back meetings or social events, you feel:",
    options: [
      { text: "Energized — I'm ready for more", emoji: "⚡" },
      { text: "Drained — I need to recover in silence", emoji: "🔋" },
      { text: "Fine, but I'll need downtime tomorrow", emoji: "⚖️" },
    ],
  },

  // ==========================================
  // SECTION 4: BIG FIVE - AGREEABLENESS (Q10-12)
  // Also detects: Enneagram 2, 6, 9
  // ==========================================

  {
    id: "q10",
    question:
      "You're in a group decision and everyone's leaning toward something you don't love. What do you do?",
    options: [
      { text: "Speak up — I'll share my view even if it's unpopular", emoji: "💪" },
      { text: "Go with the group — harmony matters more than getting my way", emoji: "🤝" },
      { text: "Mention my concern once, then go with the majority", emoji: "🗣️" },
    ],
  },

  {
    id: "q11",
    question:
      "Someone criticizes your work unfairly. What's your first instinct?",
    options: [
      { text: "Push back — I'll defend myself and correct them", emoji: "🛡️" },
      { text: "Take it personally and overthink it for days", emoji: "😔" },
      { text: "Hear them out, clarify if needed, then move on", emoji: "💭" },
    ],
  },

  {
    id: "q12",
    question:
      "A friend asks for help moving apartments this weekend. You were planning to relax. What do you do?",
    options: [
      { text: "Of course I'll help — that's what friends do", emoji: "💪" },
      { text: "Politely decline — I need my rest and that's okay", emoji: "🏠" },
      { text: "Help for a few hours, then head out", emoji: "⏰" },
    ],
  },

  // ==========================================
  // SECTION 5: BIG FIVE - NEUROTICISM (Q13-15)
  // Also detects: Enneagram 4, 6, 9
  // ==========================================

  {
    id: "q13",
    question:
      "Something unexpected messes up your plans. How do you react?",
    options: [
      { text: "I adapt quickly — not a big deal, I'll figure it out", emoji: "🌊" },
      { text: "I get stressed and need time to process the change", emoji: "😰" },
      { text: "Annoyed at first, but I adjust within an hour or so", emoji: "😤" },
    ],
  },

  {
    id: "q14",
    question:
      "When you're stressed or overwhelmed, what's your go-to coping mechanism?",
    options: [
      { text: "Talk it out with someone I trust", emoji: "💬" },
      { text: "Withdraw and process it alone", emoji: "🧘" },
      { text: "Distract myself with activity or entertainment", emoji: "🎮" },
    ],
  },

  {
    id: "q15",
    question:
      "How often do you replay awkward or embarrassing moments in your head?",
    options: [
      { text: "Rarely — I forget about it pretty fast", emoji: "😎" },
      { text: "All the time — my brain won't let it go", emoji: "🔁" },
      { text: "Sometimes, but I can usually shake it off", emoji: "🤷" },
    ],
  },

  // ==========================================
  // SECTION 6: ENNEAGRAM CORE DETECTION (Q16-25)
  // 10 questions focused on motivation/fear/desire
  // ==========================================

  {
    id: "q16",
    question:
      "What actually drives you to work hard? Be honest.",
    options: [
      { text: "Doing things right — integrity and quality matter", emoji: "✨" },
      { text: "Being needed and appreciated by others", emoji: "❤️" },
      { text: "Achieving goals and being recognized for success", emoji: "🏆" },
    ],
  },

  {
    id: "q17",
    question:
      "What's your relationship with emotions?",
    options: [
      { text: "I feel things deeply and intensely — it's exhausting sometimes", emoji: "🌊" },
      { text: "I prefer to analyze and understand rather than feel", emoji: "🧠" },
      { text: "I keep emotions in check — they're not always helpful", emoji: "🛡️" },
    ],
  },

  {
    id: "q18",
    question:
      "When making a big life decision, what scares you most?",
    options: [
      { text: "Making the wrong choice or being unprepared", emoji: "⚠️" },
      { text: "Missing out on something amazing", emoji: "😱" },
      { text: "Losing control or being vulnerable", emoji: "🔒" },
    ],
  },

  {
    id: "q19",
    question:
      "How do you feel about conflict?",
    options: [
      { text: "I avoid it at all costs — peace is everything", emoji: "☮️" },
      { text: "I engage directly — better to address it than let it fester", emoji: "⚔️" },
      { text: "Depends on the situation, but I usually try to smooth things over", emoji: "🤝" },
    ],
  },

  {
    id: "q20",
    question:
      "What makes you feel most fulfilled?",
    options: [
      { text: "Creating something unique or expressing myself authentically", emoji: "🎨" },
      { text: "Mastering a skill or understanding something deeply", emoji: "📚" },
      { text: "Experiencing new things and feeling fully alive", emoji: "🎢" },
    ],
  },

  {
    id: "q21",
    question:
      "When things go wrong, what's your first thought?",
    options: [
      { text: "What did I do wrong? How can I fix it?", emoji: "🔧" },
      { text: "Who can help me with this?", emoji: "🤝" },
      { text: "What's the next move to get back on track?", emoji: "🎯" },
    ],
  },

  {
    id: "q22",
    question:
      "What do you value most in relationships?",
    options: [
      { text: "Depth and emotional connection", emoji: "💞" },
      { text: "Loyalty and reliability", emoji: "🛡️" },
      { text: "Fun and shared adventures", emoji: "🎉" },
    ],
  },

  {
    id: "q23",
    question:
      "How do you handle being criticized?",
    options: [
      { text: "I take it seriously and try to improve", emoji: "📈" },
      { text: "I get defensive or hurt — it stings", emoji: "😔" },
      { text: "I evaluate if it's valid, then move on", emoji: "🤔" },
    ],
  },

  {
    id: "q24",
    question:
      "What's your relationship with rest and relaxation?",
    options: [
      { text: "Rest feels like wasting time — I'd rather be productive", emoji: "⏰" },
      { text: "I love rest — it's where I recharge and feel most myself", emoji: "🧘" },
      { text: "Rest is fine, but I get bored if I'm idle too long", emoji: "🔄" },
    ],
  },

  {
    id: "q25",
    question:
      "If you're being completely honest: what do you fear most?",
    options: [
      { text: "Being flawed, wrong, or morally compromised", emoji: "⚖️" },
      { text: "Being unloved, unwanted, or alone", emoji: "💔" },
      { text: "Being worthless, unsuccessful, or unimportant", emoji: "📉" },
    ],
  },
];