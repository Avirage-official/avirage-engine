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
      name,
      gender,
      birthDate,
      city,
      ethnicity,
      quizAnswers,
      primary,
      secondary,
      tertiary,
      explanation,
      keyTraits,
      astrologyData,
    } = body

    // Save to database
    const result = await sql`
      INSERT INTO quiz_results (
        user_id, 
        name, 
        gender, 
        birth_date, 
        city, 
        ethnicity,
        quiz_answers, 
        primary_code, 
        secondary_code, 
        tertiary_code,
        primary_percentage,
        secondary_percentage,
        tertiary_percentage,
        primary_description,
        secondary_description,
        tertiary_description,
        explanation,
        key_traits,
        astrology_data
      )
      VALUES (
        ${userId},
        ${name || null},
        ${gender || null},
        ${birthDate || null},
        ${city || null},
        ${ethnicity || null},
        ${JSON.stringify(quizAnswers)},
        ${primary.code_name},
        ${secondary.code_name},
        ${tertiary.code_name},
        ${primary.matchPercentage},
        ${secondary.matchPercentage},
        ${tertiary.matchPercentage},
        ${primary.description},
        ${secondary.description},
        ${tertiary.description},
        ${explanation},
        ${JSON.stringify(keyTraits)},
        ${JSON.stringify(astrologyData)}
      )
      RETURNING id
    `

    return NextResponse.json({ 
      success: true, 
      resultId: result.rows[0].id 
    })

  } catch (error) {
    console.error('Error saving result:', error)
    return NextResponse.json(
      { error: 'Failed to save result' }, 
      { status: 500 }
    )
  }
}
