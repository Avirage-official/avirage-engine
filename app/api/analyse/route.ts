/**
 * API ROUTE: /api/analyse
 * Processes quiz answers and returns Cultural Code matches
 */

import { NextRequest, NextResponse } from "next/server";
import { runTriangulation, validateQuizAnswers } from "@/lib/triangulationEngine";
import { QuizAnswers } from "@/lib/frameworkCalculator";
import { getCulturalCode } from "@/lib/culturalCodes";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, birthDate, quizAnswers } = body;

    // Validate inputs
    if (!name || typeof name !== "string") {
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

    if (!quizAnswers || typeof quizAnswers !== "object") {
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
    const validation = validateQuizAnswers(quizAnswers as QuizAnswers);
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
      quizAnswers: quizAnswers as QuizAnswers,
      birthDate: birthDateObj,
      userName: name,
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

/**
 * Get code description from culturalCodes database
 */
function getCodeDescription(codeName: string): string {
  const descriptions: Record<string, string> = {
    "Khoisan": "Hyper-acute environmental perception, radical egalitarianism, immediate-return economy, conflict avoidance, present-moment survival intelligence",
    "Kayori": "Expressive ritual creativity, destiny-aware, communal intellect, Ifá divination logic, oral-intellectual tradition",
    "Sahen": "Introspective poetic identity, desert wisdom, existential longing, nomadic autonomy",
    "Enzuka": "Strength through people, courage as social duty, warrior discipline, collective honor",
    "Siyuane": "Harmony sustained across generations, long continuity, hierarchical order, disciplined tradition",
    "Jaejin": "Strength forged under constraint, compressed emotion (Han), intense loyalty, extreme diligence",
    "Namsea": "Grace under movement, water-based cognition, calm resilience, gentle ease, conflict avoidance mastery",
    "Shokunin": "Perfectionist craftsmanship, group harmony (Wa), aesthetic discipline, ritualized order",
    "Khoruun": "Freedom sustained by movement, nomadic mobility intelligence, decentralized strength",
    "Lhumir": "Stillness that includes others, contemplative consciousness, impermanence worldview, compassion discipline",
    "Yatevar": "Order embodied through duty, law as lived ritual, metaphysical abstraction, warrior-philosopher",
    "Renara": "Order maintained through balance, refined subtlety (Halus), emotional restraint, hierarchical harmony",
    "Karayni": "Sacred balance through reciprocity, mutual responsibility (humans-spirits-land), communal ritual labor",
    "Wohaka": "Existence as relationship, all beings as kin, warrior-spiritual synthesis, land-identity fusion",
    "Tjukari": "Land remembers through us, Dreamtime cosmology, Songline navigation, non-linear time, deep time consciousness",
    "Kinmora": "Mastery of cycles, mathematical cosmology, cyclical time consciousness, astronomical precision",
    "Siljoa": "Living in dialogue with climate and place, environment as thinking partner, Arctic survival intelligence",
    "Skenari": "Responsibility to the unborn, Seventh Generation principle, consensus governance, future-oriented ethics",
    "Ashkara": "Truth enacted not believed, moral choice as sacred action, ethical dualism, fire symbolism",
    "Alethir": "To live by seeking what is real, truth emerges through inquiry and dialogue, logos-centered thinking",
  };

  return descriptions[codeName] || "Cultural code description";
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
