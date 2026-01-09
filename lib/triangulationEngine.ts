/**
 * TRIANGULATION ENGINE
 * Main orchestrator: Quiz → Frameworks → Patterns → Cultural Codes
 */

import { calculateFrameworks, FrameworkScores, QuizAnswers } from "./frameworkCalculator";
import { detectPatterns, DetectedPatterns } from "./patternDetector";
import { matchCulturalCodes, CulturalCodeMatch } from "./codeMatcher";

export interface TriangulationInput {
  quizAnswers: QuizAnswers;
  birthDate: Date;
  userName: string;
}

export interface TriangulationOutput {
  userName: string;
  frameworks: FrameworkScores;
  patterns: DetectedPatterns;
  culturalCodes: {
    primary: CulturalCodeMatch;
    secondary: CulturalCodeMatch;
    tertiary: CulturalCodeMatch;
  };
  explanation: string;
  frameworkSummary: {
    mbtiType: string;
    big5Summary: string;
    enneagramType: string;
    astrologySign: string;
  };
}

/**
 * MAIN TRIANGULATION FUNCTION
 * Takes quiz answers + birth date → Returns Cultural Code matches
 */
export function runTriangulation(input: TriangulationInput): TriangulationOutput {
  // STEP 1: Calculate Framework Scores
  const frameworks = calculateFrameworks(input.quizAnswers, input.birthDate);

  // STEP 2: Detect Behavioral Patterns
  const patterns = detectPatterns(frameworks);

  // STEP 3: Match to Cultural Codes
  const matches = matchCulturalCodes(patterns);

  // STEP 4: Generate Explanation
  const explanation = generateExplanation(frameworks, patterns, matches);

  // STEP 5: Create Framework Summary
  const frameworkSummary = createFrameworkSummary(frameworks);

  return {
    userName: input.userName,
    frameworks,
    patterns,
    culturalCodes: {
      primary: matches.primary,
      secondary: matches.secondary,
      tertiary: matches.tertiary,
    },
    explanation,
    frameworkSummary,
  };
}

/**
 * Generate human-readable explanation of why codes match
 */
function generateExplanation(
  frameworks: FrameworkScores,
  patterns: DetectedPatterns,
  matches: ReturnType<typeof matchCulturalCodes>
): string {
  const primary = matches.primary;
  
  // Get strongest patterns that contributed to match
  const strongPatterns = primary.corePatternMatches
    .filter(p => p.confidence >= 0.75)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  const moderatePatterns = primary.corePatternMatches
    .filter(p => p.confidence >= 0.5 && p.confidence < 0.75)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 2);

  // If no strong patterns, provide moderate match explanation
  if (strongPatterns.length === 0) {
    const patternNames = moderatePatterns.map(p => p.patternName.toLowerCase()).slice(0, 2);
    const patternText = patternNames.length > 0 
      ? `particularly in ${patternNames.join(" and ")}` 
      : "in how you navigate the world";
    
    return `Your ${primary.codeName} alignment sits at ${primary.matchPercentage}%, which means you share some core values and approaches with this archetype, ${patternText}. This isn't a perfect mirror—more like recognizing a familiar rhythm in how you think and move through life.`;
  }

  // Strong match explanation - more dynamic based on confidence
  const matchStrength = primary.matchPercentage;
  let intensityPhrase = "";
  
  if (matchStrength >= 85) {
    intensityPhrase = "This is a strong resonance—";
  } else if (matchStrength >= 70) {
    intensityPhrase = "There's clear alignment here—";
  } else {
    intensityPhrase = "You share meaningful overlap—";
  }

  // Build framework list more naturally
  const supportingFrameworks: string[] = [];
  const topPattern = strongPatterns[0];
  
  if (topPattern.frameworkSupport.big5) supportingFrameworks.push("your behavioral traits");
  if (topPattern.frameworkSupport.mbti) supportingFrameworks.push(`cognitive style (${frameworks.mbti.type})`);
  if (topPattern.frameworkSupport.enneagram) supportingFrameworks.push(`core motivations (${frameworks.enneagram.wing})`);
  if (topPattern.frameworkSupport.astrology) supportingFrameworks.push(`elemental energy (${frameworks.astrology.element})`);

  // More natural pattern description
  const primaryPatternName = strongPatterns[0].patternName.toLowerCase();
  const secondaryPatterns = strongPatterns.slice(1, 3).map(p => p.patternName.toLowerCase());
  
  let patternDescription = primaryPatternName;
  if (secondaryPatterns.length > 0) {
    patternDescription += `, combined with ${secondaryPatterns.join(" and ")}`;
  }

  const frameworkText = supportingFrameworks.length > 1
    ? `${supportingFrameworks.slice(0, -1).join(", ")}, and ${supportingFrameworks[supportingFrameworks.length - 1]}`
    : supportingFrameworks[0];

  return `${intensityPhrase}your ${primary.codeName} match (${matchStrength}%) shows up consistently across ${frameworkText}. The clearest signal is ${patternDescription}, which sits at the heart of how ${primary.fullName} navigates life. This isn't about fitting a stereotype—it's about recognizing patterns in how you naturally operate.`;
}

/**
 * Create human-readable framework summary
 */
function createFrameworkSummary(frameworks: FrameworkScores): {
  mbtiType: string;
  big5Summary: string;
  enneagramType: string;
  astrologySign: string;
} {
  // MBTI summary with interpretation
  const mbtiType = frameworks.mbti.type;

  // Big 5 summary - more nuanced labels
  const big5Traits: string[] = [];
  
  // Openness
  if (frameworks.big5.openness >= 75) big5Traits.push("highly imaginative");
  else if (frameworks.big5.openness >= 60) big5Traits.push("open to new ideas");
  else if (frameworks.big5.openness <= 40) big5Traits.push("grounded in proven methods");
  else if (frameworks.big5.openness <= 25) big5Traits.push("prefers clear structure");
  
  // Conscientiousness
  if (frameworks.big5.conscientiousness >= 75) big5Traits.push("highly disciplined");
  else if (frameworks.big5.conscientiousness >= 60) big5Traits.push("organized");
  else if (frameworks.big5.conscientiousness <= 40) big5Traits.push("flexible");
  else if (frameworks.big5.conscientiousness <= 25) big5Traits.push("spontaneous");
  
  // Extraversion
  if (frameworks.big5.extraversion >= 75) big5Traits.push("socially energized");
  else if (frameworks.big5.extraversion >= 60) big5Traits.push("outgoing");
  else if (frameworks.big5.extraversion <= 40) big5Traits.push("introspective");
  else if (frameworks.big5.extraversion <= 25) big5Traits.push("deeply private");
  
  // Agreeableness
  if (frameworks.big5.agreeableness >= 75) big5Traits.push("highly cooperative");
  else if (frameworks.big5.agreeableness >= 60) big5Traits.push("considerate");
  else if (frameworks.big5.agreeableness <= 40) big5Traits.push("direct");
  else if (frameworks.big5.agreeableness <= 25) big5Traits.push("independently minded");
  
  // Neuroticism (flip the language)
  if (frameworks.big5.neuroticism <= 25) big5Traits.push("emotionally steady");
  else if (frameworks.big5.neuroticism <= 40) big5Traits.push("calm under pressure");
  else if (frameworks.big5.neuroticism >= 60) big5Traits.push("emotionally responsive");
  else if (frameworks.big5.neuroticism >= 75) big5Traits.push("deeply feeling");

  const big5Summary = big5Traits.length > 0 
    ? big5Traits.join(" • ") 
    : "balanced across dimensions";

  // Enneagram type
  const enneagramType = frameworks.enneagram.wing;

  // Astrology sign with more context
  const astrologySign = `${frameworks.astrology.sunSign} — ${frameworks.astrology.element} ${frameworks.astrology.modality}`;

  return {
    mbtiType,
    big5Summary,
    enneagramType,
    astrologySign,
  };
}

/**
 * Validate quiz completeness
 */
export function validateQuizAnswers(answers: QuizAnswers): {
  isComplete: boolean;
  missingQuestions: string[];
  completionPercentage: number;
} {
  const requiredQuestions = Array.from({ length: 35 }, (_, i) => `q${i + 1}`);
  const answeredQuestions = Object.keys(answers);
  const missingQuestions = requiredQuestions.filter(q => !answeredQuestions.includes(q));

  return {
    isComplete: missingQuestions.length === 0,
    missingQuestions,
    completionPercentage: Math.round((answeredQuestions.length / requiredQuestions.length) * 100),
  };
}

/**
 * Get detailed pattern explanation
 */
export function explainPattern(
  patternName: string,
  frameworks: FrameworkScores
): string {
  const patternExplanations: Record<string, (f: FrameworkScores) => string> = {
    "Abstract Thinking": (f) => 
      `You're naturally comfortable with concepts and theory. ${f.mbti.preferences.SN === "N" ? "Your intuitive thinking style" : "You"} tend${f.mbti.preferences.SN === "N" ? "s" : ""} to see patterns and connections beyond the immediate and concrete.`,
    
    "Concrete Practical Focus": (f) =>
      `You work best with tangible, real-world information. ${f.big5.openness <= 40 ? "You trust what's proven and practical" : "Hands-on experience matters more to you than abstract theory"}.`,
    
    "Pattern Recognition Mastery": (f) =>
      `You spot systems and connections others miss. ${f.enneagram.coreType === 5 ? "Your analytical nature" : "Your observational ability"} helps you see how things fit together.`,
    
    "Sensory Appreciation": (f) =>
      `You notice and care about textures, aesthetics, and the quality of physical experience. ${f.astrology.element === "Earth" ? "This grounds you in the material world" : "Beauty and sensory richness matter to you"}.`,
    
    "Detail Obsession": (f) =>
      `Small things get your full attention. ${f.big5.conscientiousness >= 75 ? "Your high standards demand precision" : "You naturally catch what others overlook"}.`,
    
    "Present-Moment Focus": (f) =>
      `You're anchored in what's happening right now. ${f.mbti.preferences.JP === "P" ? "You adapt to the moment rather than pre-planning everything" : "The here and now holds your attention"}.`,
    
    "Craftsmanship Drive": (f) =>
      `Quality matters to you—not as perfectionism, but as care. ${f.enneagram.coreType === 1 ? "Your integrity shows in your work" : "You take pride in making things well"}.`,
    
    "Structure Preference": (f) =>
      `You think better with frameworks and organization. ${f.big5.conscientiousness >= 70 ? "Clear plans help you operate at your best" : "Structure isn't restriction—it's clarity"}.`,
    
    "Improvisation Comfort": (f) =>
      `You work well without a script. ${f.mbti.preferences.JP === "P" ? "Spontaneity energizes you rather than stressing you out" : "You figure things out as you go"}.`,
    
    "Slow Steady Pace": (f) =>
      `You move deliberately, not slowly. ${f.big5.extraversion <= 40 ? "Internal processing takes time" : "Depth over speed is your natural rhythm"}.`,
    
    "High Output Drive": (f) =>
      `You're motivated by tangible results and completion. ${f.enneagram.coreType === 3 ? "Achievement fuels you" : "Getting things done gives you energy"}.`,
    
    "Emotional Stability": (f) =>
      `You stay steady under pressure. ${f.big5.neuroticism <= 40 ? "Stress doesn't rattle you easily" : "You maintain composure when things get intense"}.`,
    
    "Emotional Expressiveness": (f) =>
      `Your feelings show. ${f.mbti.preferences.TF === "F" ? "You lead with warmth and emotional openness" : "You express what you feel without holding back"}.`,
    
    "Emotional Restraint": (f) =>
      `You keep emotions internal. ${f.mbti.preferences.IE === "I" && f.mbti.preferences.TF === "T" ? "This isn't coldness—it's containment" : "You process privately before sharing"}.`,
    
    "Environmental Sensitivity": (f) =>
      `You're deeply affected by your surroundings. ${f.astrology.element === "Water" ? "Noise, crowds, and chaos drain you quickly" : "You need calm to function well"}.`,
    
    "Deep Introspection": (f) =>
      `You examine your own thoughts and motivations constantly. ${f.enneagram.coreType === 4 || f.enneagram.coreType === 5 ? "Self-reflection is your natural state" : "Internal processing runs deep"}.`,
    
    "Low Social Energy": (f) =>
      `People drain you, even when you enjoy them. ${f.big5.extraversion <= 40 ? "You recharge alone" : "Solitude restores you"}.`,
    
    "High Social Energy": (f) =>
      `Interaction energizes you. ${f.mbti.preferences.IE === "E" ? "You think out loud and process through conversation" : "Being around people brings you to life"}.`,
    
    "Small Group Preference": (f) =>
      `You thrive in intimate settings, not crowds. ${f.big5.extraversion >= 30 && f.big5.extraversion <= 55 ? "Deep connection over broad networks" : "Quality over quantity in relationships"}.`,
    
    "Conflict Avoidance": (f) =>
      `You'd rather keep the peace than push confrontation. ${f.enneagram.coreType === 9 ? "Harmony matters more than being right" : "You find indirect paths around tension"}.`,
    
    "Collaborative Nature": (f) =>
      `You do your best work with others. ${f.big5.agreeableness >= 70 ? "Cooperation comes naturally to you" : "Shared effort feels better than solo achievement"}.`,
    
    "Tradition Orientation": (f) =>
      `You respect what's been proven over time. ${f.big5.openness <= 40 ? "Established methods feel safer than untested experiments" : "Heritage and continuity matter to you"}.`,
    
    "Novelty Seeking": (f) =>
      `You crave new experiences and change. ${f.enneagram.coreType === 7 ? "Repetition bores you—variety energizes you" : "The unfamiliar excites rather than intimidates"}.`,
    
    "Stability Seeking": (f) =>
      `Predictability calms you. ${f.big5.conscientiousness >= 70 && f.big5.openness <= 50 ? "You build systems that create consistency" : "Security matters more than excitement"}.`,
    
    "Meaning Orientation": (f) =>
      `Purpose drives you more than pleasure or practicality. ${f.mbti.preferences.SN === "N" && f.mbti.preferences.TF === "F" ? "You need to know why something matters" : "Significance is your filter for decisions"}.`,
    
    "Nature Connection": (f) =>
      `Natural environments ground you. ${f.astrology.element === "Earth" ? "You need to touch grass, literally" : "Urban energy drains you—nature restores"}.`,
    
    "Optimism Baseline": (f) =>
      `You default to expecting things will work out. ${f.big5.neuroticism <= 35 && f.big5.extraversion >= 60 ? "This isn't naivety—it's orientation" : "Hope comes naturally to you"}.`,
    
    "Service Orientation": (f) =>
      `Helping others gives you purpose. ${f.enneagram.coreType === 2 ? "Supporting people is how you show love" : "Contributing to others' wellbeing matters deeply"}.`,
    
    "Autonomy Drive": (f) =>
      `You need independence to function well. ${f.enneagram.coreType === 5 || f.enneagram.coreType === 8 ? "Freedom isn't selfish—it's essential" : "You work best when you control your own direction"}.`,
    
    "Future Orientation": (f) =>
      `You think in long timelines. ${f.big5.conscientiousness >= 75 ? "Planning ahead is natural, not stressful" : "You build for what's coming, not just what's here"}.`,
  };

  const explainer = patternExplanations[patternName];
  
  if (explainer) {
    return explainer(frameworks);
  }

  return `The "${patternName}" pattern appears in your profile, indicating a consistent way you approach situations and make decisions.`;
}
