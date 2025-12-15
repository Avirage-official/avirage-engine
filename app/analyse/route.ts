import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text }: { text: string } = await req.json();

  const traits: Record<string, number> = {
    craftsmanship_drive: 50,
    comfort_seeking: 50,
    novelty_seeking: 50,
    pace_preference: 50,
    emotional_warmth: 50,
  };

  const keywords: Record<string, string[]> = {
    craftsmanship_drive: ["make", "craft", "build", "detail", "hands"],
    comfort_seeking: ["cozy", "warm", "safe", "home", "quiet"],
    novelty_seeking: ["new", "explore", "different", "change"],
    pace_preference: ["slow", "calm", "gentle", "relaxed"],
    emotional_warmth: ["care", "connect", "together", "share"],
  };

  const lowerText = text.toLowerCase();

  for (const trait in keywords) {
    for (const word of keywords[trait]) {
      if (lowerText.includes(word)) {
        traits[trait] += 10;
      }
    }
  }

  const culturalCodes: Record<string, number> = {
    Meraki: traits.craftsmanship_drive + traits.pace_preference,
    Hygge: traits.comfort_seeking + traits.emotional_warmth,
    "Wabi-Sabi": traits.pace_preference + traits.craftsmanship_drive,
  };

  const sorted = Object.entries(culturalCodes).sort(
    (a, b) => b[1] - a[1]
  );

  return NextResponse.json({
    primary: sorted[0][0],
    secondary: sorted[1][0],
    explanation:
      "Your language suggests how you value pace, comfort, and meaning in how you live and create.",
  });
}
