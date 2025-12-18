/**
 * AVIRAGE API ENDPOINT
 * POST /api/analyze
 * Receives text input, returns Cultural Code analysis
 */

import { NextRequest, NextResponse } from "next/server";
import { analyzeText, getConfidence } from "@/lib/textAnalyzer";
import { analyzeTraits } from "@/lib/matcher";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { text } = await req.json();

    // Validate input
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text input is required" },
        { status: 400 }
      );
    }

    if (text.trim().length < 20) {
      return NextResponse.json(
        { error: "Please write at least 20 characters to get accurate results" },
        { status: 400 }
      );
    }

    // STEP 1: Extract trait scores from text
    const traitScores = analyzeText(text);

    // STEP 2: Calculate confidence
    const confidence = getConfidence(text, traitScores);

    // STEP 3: Match traits to Cultural Codes
    const result = analyzeTraits(traitScores);

    // STEP 4: Return complete analysis
    return NextResponse.json({
      ...result,
      confidence: Math.round(confidence * 100),
      lowConfidence: confidence < 0.6,
      suggestedAction:
        confidence < 0.6
          ? "Try writing more about your preferences, habits, and how you like to spend your time for better accuracy."
          : null,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze text. Please try again." },
      { status: 500 }
    );
  }
}
