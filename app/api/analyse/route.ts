import { NextRequest, NextResponse } from "next/server";
import { calculateTraitScores, isQuizComplete } from "@/lib/quizEngine";
import { analyzeTraits } from "@/lib/matcher";

export async function POST(req: NextRequest) {
  try {
    const { name, birthDate, quizAnswers } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!birthDate) {
      return NextResponse.json({ error: "Birth date is required" }, { status: 400 });
    }

    if (!quizAnswers || typeof quizAnswers !== "object") {
      return NextResponse.json({ error: "Quiz answers are required" }, { status: 400 });
    }

    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
      return NextResponse.json({ error: "Invalid birth date" }, { status: 400 });
    }

    const quizComplete = isQuizComplete(quizAnswers);

    const { traitScores, astrologyData } = calculateTraitScores(
      { name, birthDate: parsedBirthDate },
      quizAnswers
    );

    const result = analyzeTraits(traitScores);

    return NextResponse.json({
      ...result,
      userName: name,
      astrologyData,
      quizComplete,
      warning: quizComplete ? null : "Complete all questions for best accuracy",
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze. Please try again." }, { status: 500 });
  }
}
