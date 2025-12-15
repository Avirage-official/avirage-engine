import { culturalCodes } from "./culturalCodes";
import { keywordToTraitMap } from "./traitMap";

export function analyzeTextToCulture(input: string) {
  const text = input.toLowerCase();

  // 1. Extract traits
  const detectedTraits: string[] = [];

  Object.entries(keywordToTraitMap).forEach(([keyword, traits]) => {
    if (text.includes(keyword)) {
      detectedTraits.push(...traits);
    }
  });

  // 2. Score cultural codes
  const scores = culturalCodes.map((code) => {
    const score = code.traits.reduce((acc, trait) => {
      return detectedTraits.includes(trait) ? acc + 1 : acc;
    }, 0);

    return {
      code,
      score,
    };
  });

  // 3. Sort strongest first
  scores.sort((a, b) => b.score - a.score);

  const primary = scores[0];
  const secondary = scores[1];

  return {
    primary: primary.code.name,
    secondary: secondary.code.name,
    explanation: primary.code.description,
  };
}
