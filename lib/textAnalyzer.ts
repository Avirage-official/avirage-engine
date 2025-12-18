/**
 * AVIRAGE TEXT ANALYZER
 * Extracts trait scores from written text input
 */

import { TraitScores } from "./types";
import { initializeTraits, clampTraits } from "./traits";

// ============================================================================
// PATTERN DEFINITIONS
// ============================================================================

/**
 * Text patterns for each trait
 * Each pattern has keywords, phrases, negations, and weight
 */
const TRAIT_PATTERNS: Record<
  keyof TraitScores,
  {
    positive: string[];
    negative: string[];
    intensifiers: string[];
    weight: number;
  }
> = {
  // COGNITIVE / PERCEPTUAL
  abstract_thinking: {
    positive: [
      "theory", "concept", "philosophy", "abstract", "intellectual", 
      "theoretical", "ideas", "meaning", "why", "deeper", "symbolic",
      "metaphor", "principles", "frameworks", "thinking", "contemplate"
    ],
    negative: [
      "practical", "concrete", "hands-on", "tangible", "real-world",
      "physical", "straightforward", "simple", "direct", "action"
    ],
    intensifiers: ["very", "really", "deeply", "always", "constantly"],
    weight: 1.0,
  },

  sensory_appreciation: {
    positive: [
      "texture", "taste", "smell", "feel", "sound", "aesthetic",
      "beautiful", "beauty", "quality", "materials", "sensory",
      "aroma", "visual", "tactile", "soft", "smooth", "rich",
      "luxurious", "refined", "delicate", "subtle", "elegant"
    ],
    negative: [
      "functional", "basic", "simple", "plain", "practical",
      "doesn't matter how it looks", "care about function"
    ],
    intensifiers: ["absolutely", "incredibly", "stunning", "exquisite"],
    weight: 1.2,
  },

  pattern_recognition: {
    positive: [
      "pattern", "connection", "relate", "system", "framework",
      "notice", "observe", "see how", "link", "connect"
    ],
    negative: ["random", "unrelated", "don't see", "miss"],
    intensifiers: ["always", "constantly", "everywhere"],
    weight: 0.8,
  },

  detail_orientation: {
    positive: [
      "detail", "precise", "careful", "meticulous", "thorough",
      "exact", "specific", "accuracy", "attention", "notice small",
      "perfectionist", "fine", "minute", "subtle"
    ],
    negative: [
      "big picture", "overview", "general", "rough", "approximate",
      "don't sweat", "details don't matter", "quick"
    ],
    intensifiers: ["extremely", "very", "highly", "obsessively"],
    weight: 1.3,
  },

  present_moment_focus: {
    positive: [
      "present", "now", "here", "mindful", "aware", "moment",
      "currently", "right now", "this moment", "being present"
    ],
    negative: [
      "future", "past", "planning", "remember", "anticipate",
      "worry", "thinking ahead", "dwelling"
    ],
    intensifiers: ["fully", "completely", "entirely"],
    weight: 1.0,
  },

  // CREATION / WORK STYLE
  craftsmanship_drive: {
    positive: [
      "craft", "make", "create", "build", "handmade", "quality",
      "artisan", "master", "carefully", "pride", "excellence",
      "skill", "hone", "perfect", "refine", "dedicate"
    ],
    negative: [
      "quick", "fast", "efficient", "mass-produced", "factory",
      "don't care about quality", "good enough", "rushed"
    ],
    intensifiers: ["obsessed", "devoted", "passionate", "dedicated"],
    weight: 1.5,
  },

  structure_preference: {
    positive: [
      "plan", "schedule", "organize", "structure", "system",
      "routine", "order", "organized", "prepared", "systematic",
      "methodical", "planned", "arranged", "neat"
    ],
    negative: [
      "spontaneous", "flexible", "go with flow", "unplanned",
      "improvise", "wing it", "figure out as I go", "loose"
    ],
    intensifiers: ["always", "need to", "must", "have to"],
    weight: 1.2,
  },

  improvisation_comfort: {
    positive: [
      "spontaneous", "improvise", "wing it", "adapt", "flexible",
      "go with flow", "last minute", "unplanned", "unexpected"
    ],
    negative: [
      "plan", "prepare", "schedule", "need structure", "organized",
      "uncomfortable without plan"
    ],
    intensifiers: ["love", "thrive", "comfortable", "natural"],
    weight: 1.0,
  },

  pace_preference: {
    positive: [
      "slow", "unhurried", "patient", "take time", "leisurely",
      "gradual", "calm pace", "no rush", "deliberate", "savor"
    ],
    negative: [
      "fast", "quick", "rapid", "speed", "hurry", "efficient",
      "time is money", "get it done", "move quickly"
    ],
    intensifiers: ["very", "extremely", "always", "prefer"],
    weight: 1.3,
  },

  output_orientation: {
    positive: [
      "results", "achieve", "accomplish", "deliver", "complete",
      "finish", "goal", "outcome", "productive", "efficient",
      "get things done", "tangible"
    ],
    negative: [
      "process", "journey", "experience", "enjoy the work",
      "not about results", "being is enough"
    ],
    intensifiers: ["highly", "very", "extremely", "driven"],
    weight: 1.0,
  },

  // EMOTIONAL / REGULATION
  emotional_stability: {
    positive: [
      "calm", "stable", "even", "composed", "balanced", "steady",
      "unflappable", "resilient", "peaceful", "grounded", "centered"
    ],
    negative: [
      "emotional", "reactive", "moody", "volatile", "intense",
      "passionate", "dramatic", "feelings fluctuate"
    ],
    intensifiers: ["very", "extremely", "always", "naturally"],
    weight: 1.1,
  },

  emotional_expressiveness: {
    positive: [
      "express", "show feelings", "warm", "affectionate", "open",
      "share emotions", "vocal", "demonstrative", "passionate",
      "emotional", "feelings", "heart", "cry", "laugh openly"
    ],
    negative: [
      "reserved", "private", "keep to myself", "stoic", "contained",
      "don't show", "internalize", "quiet", "restrained"
    ],
    intensifiers: ["very", "openly", "freely", "naturally"],
    weight: 1.2,
  },

  environmental_sensitivity: {
    positive: [
      "sensitive", "overwhelmed", "overstimulated", "need quiet",
      "easily affected", "notice everything", "drained by",
      "crowds exhaust", "need calm", "intense environments"
    ],
    negative: [
      "resilient", "thick-skinned", "doesn't bother me", "thrive in chaos",
      "love stimulation", "energized by noise"
    ],
    intensifiers: ["very", "extremely", "highly", "easily"],
    weight: 1.0,
  },

  introspection_depth: {
    positive: [
      "reflect", "introspect", "self-aware", "examine myself",
      "inner world", "contemplate", "soul-search", "question myself",
      "analyze my feelings", "deep thought", "meditate"
    ],
    negative: [
      "external", "outward", "don't think about it", "action over thought",
      "not introspective", "don't analyze"
    ],
    intensifiers: ["deeply", "constantly", "always", "naturally"],
    weight: 1.1,
  },

  optimism_baseline: {
    positive: [
      "optimistic", "hopeful", "positive", "bright side", "work out",
      "confident", "expect good", "glass half full", "sunny"
    ],
    negative: [
      "pessimistic", "cautious", "realistic", "worried", "concerned",
      "expect worst", "skeptical", "glass half empty"
    ],
    intensifiers: ["very", "naturally", "always", "inherently"],
    weight: 1.2,
  },

  // SOCIAL / INTERPERSONAL
  social_energy: {
    positive: [
      "people", "social", "gathering", "party", "crowd", "friends",
      "energized by people", "love socializing", "outgoing",
      "extroverted", "meet people", "group", "together"
    ],
    negative: [
      "alone", "solitary", "quiet", "introverted", "drained by people",
      "need space", "prefer solo", "recharge alone", "avoid crowds"
    ],
    intensifiers: ["love", "thrive", "energized", "need"],
    weight: 1.4,
  },

  group_size_preference: {
    positive: [
      "crowd", "big group", "party", "lots of people", "festival",
      "gathering", "many people", "large", "everyone"
    ],
    negative: [
      "small group", "intimate", "few people", "one-on-one",
      "close friends", "quiet gathering", "just us", "couple people"
    ],
    intensifiers: ["love", "prefer", "thrive", "comfortable"],
    weight: 1.2,
  },

  conflict_navigation: {
    positive: [
      "confront", "direct", "speak up", "address conflict", "honest",
      "straightforward", "say what I think", "challenge", "debate"
    ],
    negative: [
      "avoid conflict", "harmony", "peace", "keep quiet", "don't confront",
      "smooth over", "uncomfortable with", "prefer agreement"
    ],
    intensifiers: ["very", "always", "naturally", "comfortable"],
    weight: 1.1,
  },

  influence_drive: {
    positive: [
      "lead", "influence", "convince", "persuade", "guide", "direct",
      "in charge", "shape", "impact", "leadership", "authority"
    ],
    negative: [
      "follow", "support", "defer", "behind scenes", "don't need control",
      "let others lead", "happy to follow", "collaborative"
    ],
    intensifiers: ["natural", "born", "driven to", "need to"],
    weight: 1.0,
  },

  collaborative_preference: {
    positive: [
      "collaborate", "team", "together", "group work", "partnership",
      "with others", "collective", "shared", "cooperative"
    ],
    negative: [
      "solo", "alone", "independent", "by myself", "own",
      "prefer working alone", "individual"
    ],
    intensifiers: ["love", "prefer", "thrive", "best when"],
    weight: 1.0,
  },

  // VALUES / MOTIVATION
  tradition_orientation: {
    positive: [
      "tradition", "heritage", "respect old ways", "ancestral",
      "proven methods", "time-tested", "cultural", "roots",
      "classical", "established", "honor the past"
    ],
    negative: [
      "modern", "new", "innovate", "change", "break from",
      "challenge tradition", "forward", "update", "reimagine"
    ],
    intensifiers: ["deeply", "strongly", "value", "honor"],
    weight: 1.1,
  },

  novelty_seeking: {
    positive: [
      "new", "novel", "explore", "discover", "adventure", "change",
      "try different", "experiment", "innovation", "cutting-edge",
      "latest", "fresh", "unexplored", "curious"
    ],
    negative: [
      "familiar", "routine", "same", "tried and true", "comfortable",
      "don't like change", "prefer known", "stick with"
    ],
    intensifiers: ["love", "crave", "always", "constantly"],
    weight: 1.2,
  },

  stability_seeking: {
    positive: [
      "stable", "secure", "predictable", "reliable", "consistent",
      "safety", "security", "certainty", "dependable", "steady"
    ],
    negative: [
      "risk", "uncertain", "change", "unpredictable", "adventure",
      "don't need security", "comfortable with unknown"
    ],
    intensifiers: ["need", "require", "value", "prioritize"],
    weight: 1.1,
  },

  meaning_orientation: {
    positive: [
      "meaning", "purpose", "why", "significance", "deeper",
      "spiritual", "soul", "calling", "mission", "profound",
      "existential", "matters", "meaningful"
    ],
    negative: [
      "practical", "functional", "utility", "pleasure", "fun",
      "doesn't need to mean something", "just enjoy"
    ],
    intensifiers: ["deeply", "need", "seek", "driven by"],
    weight: 1.3,
  },

  // ENVIRONMENT / LIFESTYLE
  nature_connection: {
    positive: [
      "nature", "outdoors", "natural", "earth", "wilderness",
      "forest", "mountains", "ocean", "trees", "outside",
      "hiking", "grounded by nature", "need nature"
    ],
    negative: [
      "urban", "city", "indoor", "prefer inside", "concrete",
      "don't need nature", "indifferent to outdoors"
    ],
    intensifiers: ["deeply", "need", "love", "connected to"],
    weight: 1.2,
  },
};

// ============================================================================
// NEGATION DETECTION
// ============================================================================

const NEGATION_WORDS = [
  "not", "no", "never", "don't", "doesn't", "didn't", "won't",
  "wouldn't", "can't", "cannot", "shouldn't", "isn't", "aren't",
  "wasn't", "weren't", "hate", "dislike", "avoid", "rarely"
];

/**
 * Check if a keyword appears with negation nearby
 */
function hasNegation(text: string, keywordIndex: number): boolean {
  const words = text.split(/\s+/);
  const keywordPosition = text.substring(0, keywordIndex).split(/\s+/).length;
  
  // Check 3 words before keyword
  for (let i = Math.max(0, keywordPosition - 3); i < keywordPosition; i++) {
    if (NEGATION_WORDS.includes(words[i]?.toLowerCase())) {
      return true;
    }
  }
  
  return false;
}

// ============================================================================
// TEXT ANALYSIS
// ============================================================================

/**
 * Analyze text and extract trait scores
 */
export function analyzeText(text: string): TraitScores {
  const lowerText = text.toLowerCase();
  const traits = initializeTraits();
  
  // For each trait, scan for patterns
  for (const traitKey in TRAIT_PATTERNS) {
    const trait = traitKey as keyof TraitScores;
    const patterns = TRAIT_PATTERNS[trait];
    
    let traitAdjustment = 0;
    let matchCount = 0;
    
    // Check positive keywords
    for (const keyword of patterns.positive) {
      const index = lowerText.indexOf(keyword);
      if (index !== -1) {
        const isNegated = hasNegation(lowerText, index);
        
        if (isNegated) {
          // Negated positive = decrease trait
          traitAdjustment -= 15 * patterns.weight;
        } else {
          // Positive keyword = increase trait
          traitAdjustment += 15 * patterns.weight;
        }
        
        matchCount++;
      }
    }
    
    // Check negative keywords (inverse relationship)
    for (const keyword of patterns.negative) {
      const index = lowerText.indexOf(keyword);
      if (index !== -1) {
        const isNegated = hasNegation(lowerText, index);
        
        if (isNegated) {
          // Negated negative = increase trait
          traitAdjustment += 12 * patterns.weight;
        } else {
          // Negative keyword = decrease trait
          traitAdjustment -= 15 * patterns.weight;
        }
        
        matchCount++;
      }
    }
    
    // Check for intensifiers (boost adjustment)
    for (const intensifier of patterns.intensifiers) {
      if (lowerText.includes(intensifier)) {
        traitAdjustment *= 1.2;
      }
    }
    
    // Apply adjustment (capped to avoid extreme swings)
    if (matchCount > 0) {
      traits[trait] += Math.max(-40, Math.min(40, traitAdjustment));
    }
  }
  
  return clampTraits(traits);
}

/**
 * Get confidence score for analysis
 * Based on amount of text and keyword matches
 */
export function getConfidence(text: string, traits: TraitScores): number {
  const wordCount = text.split(/\s+/).length;
  
  // Low confidence for very short text
  if (wordCount < 20) return 0.3;
  if (wordCount < 50) return 0.5;
  if (wordCount < 100) return 0.7;
  
  // Check how many traits deviated from neutral
  let deviatedTraits = 0;
  for (const key in traits) {
    const score = traits[key as keyof TraitScores];
    if (Math.abs(score - 50) > 10) {
      deviatedTraits++;
    }
  }
  
  // More trait signals = higher confidence
  const traitConfidence = Math.min(1.0, deviatedTraits / 15);
  const lengthConfidence = Math.min(1.0, wordCount / 150);
  
  return (traitConfidence + lengthConfidence) / 2;
}
