/**
 * AVIRAGE QUIZ ENGINE
 * Combines astrology data + quiz answers to generate trait scores
 */

import { TraitScores } from "./types";
import { initializeTraits, clampTraits } from "./traits";
import { getAstrologyTraits } from "./astrologyMapper";
import { QUIZ_QUESTIONS } from "./quizQuestions";

export interface QuizAnswers {
  [questionId: string]: number; // question ID → selected option index
}

export interface UserBasicInfo {
  name: string;
  birthDate: Date;
}

/**
 * Calculate complete trait scores from astrology + quiz answers
 */
export function calculateTraitScores(
  basicInfo: UserBasicInfo,
  quizAnswers: QuizAnswers
): {
  traitScores: TraitScores;
  astrologyData: {
    sunSign: string;
    element: string;
    modality: string;
  };
} {
  // Start with neutral baseline
  const traits = initializeTraits();

  // STEP 1: Get astrology contribution (weight: 0.3)
  const astrologyResult = getAstrologyTraits(basicInfo.birthDate);
  const astrologyTraits = astrologyResult.traits;

  for (const key in astrologyTraits) {
    const traitKey = key as keyof TraitScores;
    const astrologyScore = astrologyTraits[traitKey];
    if (astrologyScore !== undefined) {
      // Apply 30% weight to astrology
      const adjustment = (astrologyScore - 50) * 0.3;
      traits[traitKey] += adjustment;
    }
  }

  // STEP 2: Get quiz contribution (weight: 0.7)
  for (const questionId in quizAnswers) {
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
    if (!question) continue;

    const selectedOptionIndex = quizAnswers[questionId];
    const selectedOption = question.options[selectedOptionIndex];
    if (!selectedOption) continue;

    // Apply quiz answer scores
    const optionScores = selectedOption.traitScores;
    for (const key in optionScores) {
      const traitKey = key as keyof TraitScores;
      const quizScore = optionScores[traitKey];
      if (quizScore !== undefined) {
        // Apply 70% weight to quiz answers
        // Each question contributes its score directly (already calibrated)
        const adjustment = (quizScore - 50) * 0.7;
        traits[traitKey] += adjustment;
      }
    }
  }

  // STEP 3: Normalize scores if user answered all questions
  const answeredCount = Object.keys(quizAnswers).length;
  const totalQuestions = QUIZ_QUESTIONS.length;

  if (answeredCount === totalQuestions) {
    // Full quiz completed - scores are well-calibrated
    // Just clamp to 0-100 range
  } else {
    // Partial quiz - be more conservative
    // Pull scores closer to neutral for traits with fewer signals
    for (const key in traits) {
      const traitKey = key as keyof TraitScores;
      const deviation = Math.abs(traits[traitKey] - 50);
      
      // Reduce confidence in extreme scores if quiz incomplete
      if (deviation > 20) {
        const reductionFactor = 0.7; // Pull back 30% toward neutral
        traits[traitKey] = 50 + (traits[traitKey] - 50) * reductionFactor;
      }
    }
  }

  return {
    traitScores: clampTraits(traits),
    astrologyData: {
      sunSign: astrologyResult.sunSign,
      element: astrologyResult.element,
      modality: astrologyResult.modality,
    },
  };
}

/**
 * Calculate quiz completion percentage
 */
export function getQuizProgress(quizAnswers: QuizAnswers): {
  answered: number;
  total: number;
  percentage: number;
} {
  const answered = Object.keys(quizAnswers).length;
  const total = QUIZ_QUESTIONS.length;
  const percentage = Math.round((answered / total) * 100);

  return { answered, total, percentage };
}

/**
 * Validate that all questions are answered
 */
export function isQuizComplete(quizAnswers: QuizAnswers): boolean {
  return Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length;
}

/**
 * Get next unanswered question
 */
export function getNextQuestion(quizAnswers: QuizAnswers): typeof QUIZ_QUESTIONS[0] | null {
  for (const question of QUIZ_QUESTIONS) {
    if (!(question.id in quizAnswers)) {
      return question;
    }
  }
  return null; // All answered
}
