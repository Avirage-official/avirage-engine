/**
 * TRIANGULATION ENGINE (UPGRADED v2)
 */

import { calculateFrameworks, FrameworkScores, QuizAnswers } from "./frameworkCalculator";
import { detectPatterns, DetectedPatterns } from "./patternDetector";
import { matchCulturalCodes, CulturalCodeMatch } from "./codeMatcher";

export interface TriangulationInput {
  quizAnswers: QuizAnswers;
  birthDate: Date;
  userName: string;
  userMBTI?: string; // Optional user-provided MBTI
  birthTime?: string; // Optional birth time for more accurate astrology
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
    mbtiType: string | null;
    big5Summary: string;
    enneagramType: string;
    astrologySign: string;
  };
}

export function runTriangulation(input: TriangulationInput): TriangulationOutput {
  // STEP 1: Calculate Framework Scores
  const frameworks = calculateFrameworks(
    input.quizAnswers,
    input.birthDate,
    input.userMBTI,
    input.birthTime
  );

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

function generateExplanation(
  frameworks: FrameworkScores,
  patterns: DetectedPatterns,
  matches: ReturnType<typeof matchCulturalCodes>
): string {
  const primary = matches.primary;
  
  const strongPatterns = primary.corePatternMatches
    .filter(p => p.confidence >= 0.75)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  const moderatePatterns = primary.corePatternMatches
    .filter(p => p.confidence >= 0.5 && p.confidence < 0.75)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 2);

  if (strongPatterns.length === 0) {
    const patternNames = moderatePatterns.map(p => p.patternName.toLowerCase()).slice(0, 2);
    const patternText = patternNames.length > 0 
      ? `particularly in ${patternNames.join(" and ")}` 
      : "in how you navigate the world";
    
    return `Your ${primary.codeName} alignment sits at ${primary.matchPercentage}%, which means you share some core values and approaches with this archetype, ${patternText}.`;
  }

  const matchStrength = 
    primary.matchPercentage >= 85 ? "very strong" :
    primary.matchPercentage >= 75 ? "strong" :
    primary.matchPercentage >= 65 ? "clear" :
    "moderate";

  const intensityPhrase = 
    primary.matchPercentage >= 85 ? "Unmistakably, " :
    primary.matchPercentage >= 75 ? "Clearly, " :
    "";

  const topPattern = strongPatterns[0];
  const patternDescription = topPattern.patternName.toLowerCase();

  const supportingFrameworks: string[] = [];
  if (topPattern.frameworkSupport.big5) supportingFrameworks.push("behavioral patterns");
  if (topPattern.frameworkSupport.enneagram) supportingFrameworks.push("core motivations");
  if (topPattern.frameworkSupport.mbti && frameworks.mbti) supportingFrameworks.push("cognitive style");
  if (topPattern.frameworkSupport.astrology) supportingFrameworks.push("archetypal tendencies");

  const frameworkText = supportingFrameworks.length > 1
    ? `${supportingFrameworks.slice(0, -1).join(", ")}, and ${supportingFrameworks[supportingFrameworks.length - 1]}`
    : supportingFrameworks[0];

  return `${intensityPhrase}your ${primary.codeName} match (${matchStrength}%) shows up consistently across ${frameworkText}. The clearest signal is ${patternDescription}, which sits at the heart of how ${primary.fullName} navigates life. This isn't about fitting a stereotype—it's about recognizing patterns in how you naturally operate.`;
}

function createFrameworkSummary(frameworks: FrameworkScores): {
  mbtiType: string | null;
  big5Summary: string;
  enneagramType: string;
  astrologySign: string;
} {
  const mbtiType = frameworks.mbti?.type || null;

  const big5Traits: string[] = [];
  
  if (frameworks.big5.openness >= 75) big5Traits.push("highly imaginative");
  else if (frameworks.big5.openness >= 60) big5Traits.push("open to new ideas");
  else if (frameworks.big5.openness <= 40) big5Traits.push("grounded in proven methods");
  
  if (frameworks.big5.conscientiousness >= 75) big5Traits.push("highly disciplined");
  else if (frameworks.big5.conscientiousness >= 60) big5Traits.push("organized");
  else if (frameworks.big5.conscientiousness <= 40) big5Traits.push("flexible");
  
  if (frameworks.big5.extraversion >= 75) big5Traits.push("socially energized");
  else if (frameworks.big5.extraversion >= 60) big5Traits.push("outgoing");
  else if (frameworks.big5.extraversion <= 40) big5Traits.push("introspective");
  
  if (frameworks.big5.agreeableness >= 75) big5Traits.push("highly cooperative");
  else if (frameworks.big5.agreeableness >= 60) big5Traits.push("considerate");
  else if (frameworks.big5.agreeableness <= 40) big5Traits.push("direct");
  
  if (frameworks.big5.neuroticism <= 25) big5Traits.push("emotionally steady");
  else if (frameworks.big5.neuroticism >= 60) big5Traits.push("emotionally responsive");

  const big5Summary = big5Traits.length > 0 
    ? big5Traits.join(" • ") 
    : "balanced across dimensions";

  const enneagramType = frameworks.enneagram.wing;

  const astrologySign = `${frameworks.astrology.sun.sign} Sun, ${frameworks.astrology.moon?.sign || "unknown"} Moon`;

  return {
    mbtiType,
    big5Summary,
    enneagramType,
    astrologySign,
  };
}

export function validateQuizAnswers(answers: QuizAnswers): {
  isComplete: boolean;
  missingQuestions: string[];
  completionPercentage: number;
} {
  const requiredQuestions = Array.from({ length: 25 }, (_, i) => `q${i + 1}`);
  const answeredQuestions = Object.keys(answers);
  const missingQuestions = requiredQuestions.filter(q => !answeredQuestions.includes(q));

  return {
    isComplete: missingQuestions.length === 0,
    missingQuestions,
    completionPercentage: Math.round((answeredQuestions.length / requiredQuestions.length) * 100),
  };
}