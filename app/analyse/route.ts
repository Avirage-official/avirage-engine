  /**
 * AVIRAGE QUIZ API ENDPOINT
 * POST /api/analyze
 * Receives basic info + quiz answers, returns Cultural Code analysis
 */

import { NextRequest, NextResponse } from "next/server";
import { calculateTraitScores, isQuizComplete } from "@/lib/quizEngine";
import { analyzeTraits } from "@/lib/matcher";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { name, birthDate, quizAnswers } = await req.json();

    // Validate input
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

    // Parse birth date
    const parsedBirthDate = new Date(birthDate.replace(/\//g, '-'));
    if (isNaN(parsedBirthDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid birth date" },
        { status: 400 }
      );
    }

    // Check if quiz is complete
    const quizComplete = isQuizComplete(quizAnswers);

    // STEP 1: Calculate trait scores from astrology + quiz
    const { traitScores, astrologyData } = calculateTraitScores(
      { name, birthDate: parsedBirthDate },
      quizAnswers
    );

    // STEP 2: Match traits to Cultural Codes
    const result = analyzeTraits(traitScores);

    // STEP 3: Return complete analysis
    return NextResponse.json({
      ...result,
      userName: name,
      astrologyData,
      quizComplete,
      warning: quizComplete
        ? null
        : "Complete all questions for best accuracy",
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze. Please try again." },
      { status: 500 }
    );
  }
}
