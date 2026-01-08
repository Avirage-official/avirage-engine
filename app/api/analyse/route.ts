/**
 * API ROUTE: /api/analyse
 * Processes quiz answers and returns Cultural Code matches
 */

import { NextRequest, NextResponse } from "next/server";
import { runTriangulation, validateQuizAnswers } from "@/lib/triangulationEngine";
import { QuizAnswers } from "@/lib/frameworkCalculator";
import { getCulturalCode } from "@/lib/culturalCodes";


/**
 * Get code description - FIXED VERSION with lowercase keys
 * Use this in BOTH:
 * - app/api/analyse/route.ts
 * - app/api/analyse-profile/route.ts
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Support both parameter formats for backwards compatibility
    const { 
      name, 
      userName, 
      birthDate, 
      quizAnswers, 
      answers,
      gender,
      city,
      ethnicity 
    } = body;
    
    // Use userName if name is not provided (quiz page sends userName)
    const userNameValue = name || userName;
    // Use answers if quizAnswers is not provided (quiz page sends answers)
    const quizAnswersValue = quizAnswers || answers;

    // Validate inputs
    if (!userNameValue || typeof userNameValue !== "string") {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!birthDate) {
      return NextResponse.json(
        { error: "Birth date is required" },
        { status: 400 }
      );
    }

    if (!quizAnswersValue || typeof quizAnswersValue !== "object") {
      return NextResponse.json(
        { error: "Quiz answers are required" },
        { status: 400 }
      );
    }

    // Convert birthDate string to Date object
    const birthDateObj = new Date(birthDate);
    if (isNaN(birthDateObj.getTime())) {
      return NextResponse.json(
        { error: "Invalid birth date format" },
        { status: 400 }
      );
    }

    // Validate quiz completeness
    const validation = validateQuizAnswers(quizAnswersValue as QuizAnswers);
    if (!validation.isComplete) {
      return NextResponse.json(
        {
          error: "Quiz incomplete",
          missingQuestions: validation.missingQuestions,
          completionPercentage: validation.completionPercentage,
        },
        { status: 400 }
      );
    }

    // Run triangulation
    const result = runTriangulation({
      quizAnswers: quizAnswersValue as QuizAnswers,
      birthDate: birthDateObj,
      userName: userNameValue,
    });

    // Format response for frontend
    const response = {
      userName: result.userName,
      primary: {
        code_name: result.culturalCodes.primary.codeName,
        full_name: result.culturalCodes.primary.fullName,
        description: getCodeDescription(result.culturalCodes.primary.codeName),
        matchPercentage: result.culturalCodes.primary.matchPercentage,
      },
      secondary: {
        code_name: result.culturalCodes.secondary.codeName,
        full_name: result.culturalCodes.secondary.fullName,
        description: getCodeDescription(result.culturalCodes.secondary.codeName),
        matchPercentage: result.culturalCodes.secondary.matchPercentage,
      },
      tertiary: {
        code_name: result.culturalCodes.tertiary.codeName,
        full_name: result.culturalCodes.tertiary.fullName,
        description: getCodeDescription(result.culturalCodes.tertiary.codeName),
        matchPercentage: result.culturalCodes.tertiary.matchPercentage,
      },
      explanation: result.explanation,
      keyTraits: getKeyTraits(result),
      astrologyData: {
        sunSign: result.frameworks.astrology.sunSign,
        element: result.frameworks.astrology.element,
        modality: result.frameworks.astrology.modality,
      },
      frameworkSummary: result.frameworkSummary,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error during analysis" },
      { status: 500 }
    );
  }
}

function getCodeDescription(codeName: string): string {
  const code = getCulturalCode(codeName);  // Already lowercase from codeMatcher
  return code?.description || "Cultural code description";
}
/**
 * Extract key traits from result
 */
function getKeyTraits(result: any): Array<{
  trait: string;
  score: number;
  description: string;
}> {
  const big5 = result.frameworks.big5;
  const traits: Array<{ trait: string; score: number; description: string }> = [];

  // Find most distinctive traits (furthest from 50)
  const traitData = [
    { trait: "Openness", score: big5.openness, high: "Creative & Open-minded", low: "Traditional & Practical" },
    { trait: "Conscientiousness", score: big5.conscientiousness, high: "Organized & Disciplined", low: "Flexible & Spontaneous" },
    { trait: "Extraversion", score: big5.extraversion, high: "Outgoing & Energetic", low: "Reserved & Reflective" },
    { trait: "Agreeableness", score: big5.agreeableness, high: "Cooperative & Warm", low: "Independent & Analytical" },
    { trait: "Emotional Stability", score: 100 - big5.neuroticism, high: "Calm & Resilient", low: "Sensitive & Responsive" },
  ];

  // Sort by distance from neutral (50)
  traitData.sort((a, b) => Math.abs(b.score - 50) - Math.abs(a.score - 50));

  // Take top 5 traits
  for (const t of traitData.slice(0, 5)) {
    traits.push({
      trait: t.trait,
      score: t.score,
      description: t.score >= 60 ? t.high : t.score <= 40 ? t.low : "Balanced",
    });
  }

  return traits;
}
