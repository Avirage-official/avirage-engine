import { NextResponse } from "next/server";
import { analyzeTextToCulture } from "@/lib/engine";

export async function POST(req: Request) {
  const body = await req.json();
  const { text } = body;

  if (!text || text.length < 5) {
    return NextResponse.json(
      { error: "Not enough input" },
      { status: 400 }
    );
  }

  const result = analyzeTextToCulture(text);

  return NextResponse.json(result);
}
