import { sql } from '@vercel/postgres'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      resultId,
      mbti,
      big5Openness,
      big5Conscientiousness,
      big5Extraversion,
      big5Agreeableness,
      big5Neuroticism,
      enneagram,
      sunSign,
      element,
      modality,
    } = body

    // Call the analysis API with profile data instead of quiz answers
    const analysisResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://avirage-engine.vercel.app'}/api/analyse-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        mbti,
        big5: {
          openness: big5Openness,
          conscientiousness: big5Conscientiousness,
          extraversion: big5Extraversion,
          agreeableness: big5Agreeableness,
          neuroticism: big5Neuroticism,
        },
        enneagram,
        astrology: {
          sunSign,
          element,
          modality,
        },
      }),
    })

    if (!analysisResponse.ok) {
      throw new Error('Profile analysis failed')
    }

    const analysisResult = await analysisResponse.json()

    // Update the result with profile data
    await sql`
      UPDATE quiz_results
      SET 
        profile_mbti = ${mbti},
        profile_big5_openness = ${big5Openness},
        profile_big5_conscientiousness = ${big5Conscientiousness},
        profile_big5_extraversion = ${big5Extraversion},
        profile_big5_agreeableness = ${big5Agreeableness},
        profile_big5_neuroticism = ${big5Neuroticism},
        profile_enneagram = ${enneagram},
        profile_sun_sign = ${sunSign},
        profile_element = ${element},
        profile_modality = ${modality},
        profile_based_primary_code = ${analysisResult.primary.code_name},
        profile_based_secondary_code = ${analysisResult.secondary.code_name},
        profile_based_tertiary_code = ${analysisResult.tertiary.code_name},
        profile_based_primary_percentage = ${analysisResult.primary.matchPercentage},
        profile_based_secondary_percentage = ${analysisResult.secondary.matchPercentage},
        profile_based_tertiary_percentage = ${analysisResult.tertiary.matchPercentage}
      WHERE id = ${resultId} AND user_id = ${userId}
    `

    return NextResponse.json({ 
      success: true,
      profileBasedCodes: {
        primary: analysisResult.primary,
        secondary: analysisResult.secondary,
        tertiary: analysisResult.tertiary,
      }
    })

  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' }, 
      { status: 500 }
    )
  }
}
