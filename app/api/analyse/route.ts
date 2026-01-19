import { NextResponse } from "next/server";
import { runTriangulation, validateQuizAnswers } from "@/lib/triangulationEngine";
import { QuizAnswers } from "@/lib/frameworkCalculator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userName: userNameValue,
      birthDate: birthDateValue,
      birthTime: birthTimeValue, // NEW: Optional
      answers: quizAnswersValue,
      mbti: mbtiValue, // NEW: Optional
    } = body;

    // Validate required fields
    if (!userNameValue || typeof userNameValue !== "string") {
      return NextResponse.json({ error: "userName is required and must be a string" }, { status: 400 });
    }

    if (!birthDateValue || typeof birthDateValue !== "string") {
      return NextResponse.json({ error: "birthDate is required and must be a string (YYYY-MM-DD)" }, { status: 400 });
    }

    if (!quizAnswersValue || typeof quizAnswersValue !== "object") {
      return NextResponse.json({ error: "answers is required and must be an object" }, { status: 400 });
    }

    // Parse birth date
    const birthDateObj = new Date(birthDateValue + "T00:00:00");
    if (Number.isNaN(birthDateObj.getTime())) {
      return NextResponse.json({ error: "Invalid birth date format" }, { status: 400 });
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
      userMBTI: mbtiValue, // NEW: Pass optional MBTI
      birthTime: birthTimeValue, // NEW: Pass optional birth time
    });
console.log("=== DEBUG INFO ===");
console.log("Astrology data:", result.frameworks.astrology);
console.log("Patterns detected:", Object.keys(result.patterns).length);
console.log("Primary code:", result.culturalCodes.primary.codeName);
console.log("Match percentage:", result.culturalCodes.primary.matchPercentage);
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
        sunSign: result.frameworks.astrology.sun.sign,
        element: result.frameworks.astrology.sun.element,
        modality: result.frameworks.astrology.sun.modality || "Unknown",
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in analyse route:", error);
    return NextResponse.json({ error: "Failed to analyze quiz results" }, { status: 500 });
  }
}

function getCodeDescription(codeName: string): string {
  // Simplified descriptions - you can expand these
  const descriptions: Record<string, string> = {
    khoisan: "Deeply grounded, perceptive, present-moment focused",
    kayori: "Expressive, communal, emotionally transmissive",
    sahen: "Resilient, solitary, internally strong",
    // Add all 20 codes here...
  };
  return descriptions[codeName] || "A unique cultural archetype";
}

function getKeyTraits(result: any): string[] {
  // Extract top 5 strongest patterns
  return Object.values(result.patterns)
    .sort((a: any, b: any) => b.confidence - a.confidence)
    .slice(0, 5)
    .map((p: any) => p.patternName);
}