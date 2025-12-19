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

  if (strongPatterns.length === 0) {
    return `Your profile shows moderate alignment with ${primary.codeName}. This suggests you share some core values with this cultural tradition, particularly in how you approach life's challenges and opportunities.`;
  }

  // Build explanation based on framework convergence
  const frameworkNames: string[] = [];
  
  // Check which frameworks contributed to top pattern
  const topPattern = strongPatterns[0];
  if (topPattern.frameworkSupport.mbti) frameworkNames.push(`MBTI (${frameworks.mbti.type})`);
  if (topPattern.frameworkSupport.big5) frameworkNames.push("Big Five");
  if (topPattern.frameworkSupport.enneagram) frameworkNames.push(`Enneagram ${frameworks.enneagram.wing}`);
  if (topPattern.frameworkSupport.astrology) frameworkNames.push(`${frameworks.astrology.sunSign}`);

  const patternList = strongPatterns.map(p => p.patternName.toLowerCase()).join(", ");

  return `Your ${primary.codeName} match is strongly supported by convergence across ${frameworkNames.length} frameworks: ${frameworkNames.join(", ")}. These frameworks all point to patterns of ${patternList}, which are core to the ${primary.fullName} cultural tradition. This ${primary.confidence}-confidence match (${primary.matchPercentage}%) indicates your personality naturally aligns with how this culture approaches life, relationships, and meaning-making.`;
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
  // MBTI summary
  const mbtiType = frameworks.mbti.type;

  // Big 5 summary (highlight high/low traits)
  const big5Traits: string[] = [];
  if (frameworks.big5.openness >= 70) big5Traits.push("Open");
  else if (frameworks.big5.openness <= 30) big5Traits.push("Traditional");
  
  if (frameworks.big5.conscientiousness >= 70) big5Traits.push("Disciplined");
  else if (frameworks.big5.conscientiousness <= 30) big5Traits.push("Spontaneous");
  
  if (frameworks.big5.extraversion >= 70) big5Traits.push("Outgoing");
  else if (frameworks.big5.extraversion <= 30) big5Traits.push("Reserved");
  
  if (frameworks.big5.agreeableness >= 70) big5Traits.push("Cooperative");
  else if (frameworks.big5.agreeableness <= 30) big5Traits.push("Independent");
  
  if (frameworks.big5.neuroticism <= 30) big5Traits.push("Calm");
  else if (frameworks.big5.neuroticism >= 70) big5Traits.push("Sensitive");

  const big5Summary = big5Traits.length > 0 
    ? big5Traits.join(", ") 
    : "Balanced across traits";

  // Enneagram type
  const enneagramType = frameworks.enneagram.wing;

  // Astrology sign
  const astrologySign = `${frameworks.astrology.sunSign} (${frameworks.astrology.element}, ${frameworks.astrology.modality})`;

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
  // This could be expanded with specific explanations per pattern
  return `The "${patternName}" pattern was detected based on convergence across multiple frameworks in your personality profile.`;
}
