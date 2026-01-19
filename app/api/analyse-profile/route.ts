import { NextResponse } from 'next/server';
import { FrameworkScores } from '@/lib/frameworkCalculator';
import { detectPatterns } from '@/lib/patternDetector';
import { matchCulturalCodes } from '@/lib/codeMatcher';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mbtiType, birthDate } = body;

    // Validate inputs
    if (!mbtiType || typeof mbtiType !== 'string' || !/^[IE][NS][TF][JP]$/.test(mbtiType)) {
      return NextResponse.json(
        { error: 'Invalid MBTI type. Expected format: INTJ, ENFP, etc.' },
        { status: 400 }
      );
    }

    if (!birthDate || typeof birthDate !== 'string') {
      return NextResponse.json(
        { error: 'birthDate is required (YYYY-MM-DD format)' },
        { status: 400 }
      );
    }

    // Create simplified frameworks object with just MBTI and Astrology
    // (This endpoint doesn't have Big5/Enneagram data)
    const frameworks: FrameworkScores = {
      mbti: {
        type: mbtiType,
        preferences: {
          IE: mbtiType.includes('I') ? 'I' : 'E',
          SN: mbtiType.includes('S') ? 'S' : 'N',
          TF: mbtiType.includes('T') ? 'T' : 'F',
          JP: mbtiType.includes('J') ? 'J' : 'P',
        },
        source: 'user-provided', // FIXED: Added source property
      },
      big5: {
        openness: 50,
        conscientiousness: 50,
        extraversion: mbtiType.includes('E') ? 65 : 35,
        agreeableness: 50,
        neuroticism: 50,
      },
      enneagram: {
        coreType: 5, // Default placeholder
        wing: '5w4',
        scores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 5, 6: 0, 7: 0, 8: 0, 9: 0 },
      },
      astrology: {
        sun: {
          sign: getSunSign(new Date(birthDate)),
          element: getElement(getSunSign(new Date(birthDate))),
          modality: getModality(getSunSign(new Date(birthDate))),
        },
        moon: null,
        rising: null,
        mercury: null,
        venus: null,
      },
    };

    // Detect patterns
    const patterns = detectPatterns(frameworks);

    // Match cultural codes
    const matches = matchCulturalCodes(patterns);

    // Format response
    const response = {
      primary: {
        code_name: matches.primary.codeName,
        full_name: matches.primary.fullName,
        matchPercentage: matches.primary.matchPercentage,
      },
      secondary: {
        code_name: matches.secondary.codeName,
        full_name: matches.secondary.fullName,
        matchPercentage: matches.secondary.matchPercentage,
      },
      tertiary: {
        code_name: matches.tertiary.codeName,
        full_name: matches.tertiary.fullName,
        matchPercentage: matches.tertiary.matchPercentage,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in analyse-profile route:', error);
    return NextResponse.json(
      { error: 'Failed to analyze profile' },
      { status: 500 }
    );
  }
}

// Helper functions for astrology calculation
function getSunSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

function getElement(sign: string): string {
  const fireElements = ['Aries', 'Leo', 'Sagittarius'];
  const earthElements = ['Taurus', 'Virgo', 'Capricorn'];
  const airElements = ['Gemini', 'Libra', 'Aquarius'];
  const waterElements = ['Cancer', 'Scorpio', 'Pisces'];

  if (fireElements.includes(sign)) return 'Fire';
  if (earthElements.includes(sign)) return 'Earth';
  if (airElements.includes(sign)) return 'Air';
  if (waterElements.includes(sign)) return 'Water';
  return 'Unknown';
}

function getModality(sign: string): string {
  const cardinalSigns = ['Aries', 'Cancer', 'Libra', 'Capricorn'];
  const fixedSigns = ['Taurus', 'Leo', 'Scorpio', 'Aquarius'];
  const mutableSigns = ['Gemini', 'Virgo', 'Sagittarius', 'Pisces'];

  if (cardinalSigns.includes(sign)) return 'Cardinal';
  if (fixedSigns.includes(sign)) return 'Fixed';
  if (mutableSigns.includes(sign)) return 'Mutable';
  return 'Unknown';
}