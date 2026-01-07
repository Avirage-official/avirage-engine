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


function getCodeDescription(codeName: string): string {
  const descriptions: Record<string, string> = {
    "khoisan": "Hyper-acute environmental perception, radical egalitarianism, immediate-return economy, conflict avoidance, present-moment survival intelligence",
    "kayori": "Expressive ritual creativity, destiny-aware, communal intellect, Ifá divination logic, oral-intellectual tradition",
    "sahen": "Introspective poetic identity, desert wisdom, existential longing, nomadic autonomy",
    "enzuka": "Strength through people, courage as social duty, warrior discipline, collective honor",
    "siyuane": "Harmony sustained across generations, long continuity, hierarchical order, disciplined tradition",
    "jaejin": "Strength forged under constraint, compressed emotion (Han), intense loyalty, extreme diligence",
    "namsea": "Grace under movement, water-based cognition, calm resilience, gentle ease, conflict avoidance mastery",
    "shokunin": "Perfectionist craftsmanship, group harmony (Wa), aesthetic discipline, ritualized order",
    "khoruun": "Freedom sustained by movement, nomadic mobility intelligence, decentralized strength",
    "lhumir": "Stillness that includes others, contemplative consciousness, impermanence worldview, compassion discipline",
    "yatevar": "Order embodied through duty, law as lived ritual, metaphysical abstraction, warrior-philosopher",
    "renara": "Order maintained through balance, refined subtlety (Halus), emotional restraint, hierarchical harmony",
    "karayni": "Sacred balance through reciprocity, mutual responsibility (humans-spirits-land), communal ritual labor",
    "wohaka": "Existence as relationship, all beings as kin, warrior-spiritual synthesis, land-identity fusion",
    "tjukari": "Land remembers through us, Dreamtime cosmology, Songline navigation, non-linear time, deep time consciousness",
    "kinmora": "Mastery of cycles, mathematical cosmology, cyclical time consciousness, astronomical precision",
    "siljoa": "Living in dialogue with climate and place, environment as thinking partner, Arctic survival intelligence",
    "skenari": "Responsibility to the unborn, Seventh Generation principle, consensus governance, future-oriented ethics",
    "ashkara": "Truth enacted not believed, moral choice as sacred action, ethical dualism, fire symbolism",
    "alethir": "To live by seeking what is real, truth emerges through inquiry and dialogue, logos-centered thinking",
  };

  return descriptions[codeName] || "Cultural code description";
}

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

function getCodeDescription(codeName: string): string {
  const code = getCulturalCode(codeName.toLowerCase());
  return code?.archetype_essence || code?.description || "Cultural code";
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
