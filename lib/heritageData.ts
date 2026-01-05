/**
 * HERITAGE DATA
 *
 * PURPOSE:
 * - Provide historical / cultural reference data
 * - NOT used for scoring
 * - NOT used for personality labeling
 *
 * This file exists purely for:
 * - educational context
 * - long-form explanations
 * - optional “learn more” sections
 *
 * CRITICAL RULE:
 * ➜ NOTHING in this file should affect algorithmic outcomes.
 * ➜ Personality identity ≠ real-world culture.
 *
 * This is where we reduce cultural risk properly.
 */

export interface HeritageReference {
  code_name: string;          // must match CulturalCode.code_name
  regions: string[];
  timeframes: string[];
  themes: string[];
  practices: string[];
  values: string[];
  notes?: string;
}

/**
 * Canonical heritage reference set
 * Names here are descriptive, not identity claims.
 */
export const HERITAGE_DATA: HeritageReference[] = [
  {
    code_name: "khoisan",
    regions: ["Southern Africa"],
    timeframes: ["Ancient", "Pre-colonial"],
    themes: ["hunter-gatherer life", "ecological awareness", "oral tradition"],
    practices: ["tracking", "storytelling", "communal living"],
    values: ["presence", "adaptability", "community"],
    notes:
      "Referenced for worldview patterns, not lineage or ancestry claims.",
  },
  {
    code_name: "kayori",
    regions: ["West Africa"],
    timeframes: ["Pre-colonial", "Classical"],
    themes: ["rhythm", "myth", "community expression"],
    practices: ["music", "dance", "oral history"],
    values: ["expression", "connection", "shared meaning"],
  },
  {
    code_name: "sahen",
    regions: ["Sahara", "Sahel"],
    timeframes: ["Nomadic eras"],
    themes: ["mobility", "resilience", "self-sufficiency"],
    practices: ["nomadic trade", "navigation", "minimalism"],
    values: ["endurance", "autonomy", "adaptation"],
  },
  {
    code_name: "enzuka",
    regions: ["East Africa", "Southern Africa"],
    timeframes: ["Pre-colonial"],
    themes: ["warrior societies", "social order"],
    practices: ["rites of passage", "age-based leadership"],
    values: ["responsibility", "protection", "order"],
  },
  {
    code_name: "siyuane",
    regions: ["East Africa", "East Asia"],
    timeframes: ["Classical", "Imperial"],
    themes: ["discipline", "craft mastery"],
    practices: ["artisan systems", "structured learning"],
    values: ["precision", "long-term thinking", "discipline"],
  },
  {
    code_name: "jaejin",
    regions: ["Korean Peninsula"],
    timeframes: ["Joseon period", "Modern"],
    themes: ["hierarchy", "social harmony"],
    practices: ["ritual respect", "collective responsibility"],
    values: ["duty", "respect", "harmony"],
  },
  {
    code_name: "namsea",
    regions: ["Southeast Asia"],
    timeframes: ["Pre-modern", "Agrarian eras"],
    themes: ["flow-based living", "environmental adaptation"],
    practices: ["wet-rice agriculture", "communal cooperation"],
    values: ["balance", "flexibility", "relationship"],
  },
  {
    code_name: "shokunin",
    regions: ["Japan"],
    timeframes: ["Feudal", "Modern"],
    themes: ["craft devotion", "process mastery"],
    practices: ["artisan guilds", "mentorship"],
    values: ["precision", "patience", "excellence"],
  },
  {
    code_name: "khoruun",
    regions: ["Central Asia"],
    timeframes: ["Nomadic empires"],
    themes: ["freedom", "open landscapes"],
    practices: ["pastoral nomadism", "horsemanship"],
    values: ["self-reliance", "mobility", "endurance"],
  },
  {
    code_name: "lhumir",
    regions: ["Himalayan regions"],
    timeframes: ["Ancient", "Monastic eras"],
    themes: ["inner life", "meaning"],
    practices: ["meditation", "ritual study"],
    values: ["clarity", "stillness", "purpose"],
  },
];

/**
 * Lookup helpers
 */

export function getHeritageByCode(code_name: string): HeritageReference | undefined {
  return HERITAGE_DATA.find((h) => h.code_name === code_name);
}

export function getAllHeritage(): HeritageReference[] {
  return HERITAGE_DATA;
}
