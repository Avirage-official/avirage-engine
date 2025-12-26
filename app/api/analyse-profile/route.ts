import { NextResponse } from 'next/server'
import { detectPatterns } from '@/lib/patternDetector'
import { matchCulturalCodes } from '@/lib/codeMatcher'
import { FrameworkScores } from '@/lib/frameworkCalculator'

/**
 * Profile-Based Analysis
 * Bypasses quiz → Uses self-reported frameworks → Same triangulation logic
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { mbti, big5, enneagram, astrology } = body

    // Convert self-reported frameworks into FrameworkScores format
    const frameworks: FrameworkScores = {
      mbti: {
        type: mbti || 'INFP', // Default if not provided
        scores: {
          I_vs_E: mbti?.includes('I') ? 0.7 : 0.3,
          N_vs_S: mbti?.includes('N') ? 0.7 : 0.3,
          F_vs_T: mbti?.includes('F') ? 0.7 : 0.3,
          P_vs_J: mbti?.includes('P') ? 0.7 : 0.3,
        }
      },
      big5: {
        openness: convertBig5ToScore(big5.openness),
        conscientiousness: convertBig5ToScore(big5.conscientiousness),
        extraversion: convertBig5ToScore(big5.extraversion),
        agreeableness: convertBig5ToScore(big5.agreeableness),
        neuroticism: convertBig5ToScore(big5.neuroticism),
      },
      enneagram: {
        wing: enneagram || '4',
        scores: {
          type1: enneagram === '1' ? 0.8 : 0.2,
          type2: enneagram === '2' ? 0.8 : 0.2,
          type3: enneagram === '3' ? 0.8 : 0.2,
          type4: enneagram === '4' ? 0.8 : 0.2,
          type5: enneagram === '5' ? 0.8 : 0.2,
          type6: enneagram === '6' ? 0.8 : 0.2,
          type7: enneagram === '7' ? 0.8 : 0.2,
          type8: enneagram === '8' ? 0.8 : 0.2,
          type9: enneagram === '9' ? 0.8 : 0.2,
        }
      },
      astrology: {
        sunSign: astrology.sunSign || 'Pisces',
        element: astrology.element || 'Water',
        modality: astrology.modality || 'Mutable',
      }
    }

    // Use the SAME triangulation logic
    const patterns = detectPatterns(frameworks)
    const matches = matchCulturalCodes(patterns)

    // Return in same format as quiz-based
    return NextResponse.json({
      primary: {
        code_name: matches.primary.codeName,
        full_name: matches.primary.fullName,
        description: getCodeDescription(matches.primary.codeName),
        matchPercentage: matches.primary.matchPercentage,
      },
      secondary: {
        code_name: matches.secondary.codeName,
        full_name: matches.secondary.fullName,
        description: getCodeDescription(matches.secondary.codeName),
        matchPercentage: matches.secondary.matchPercentage,
      },
      tertiary: {
        code_name: matches.tertiary.codeName,
        full_name: matches.tertiary.fullName,
        description: getCodeDescription(matches.tertiary.codeName),
        matchPercentage: matches.tertiary.matchPercentage,
      },
    })

  } catch (error) {
    console.error('Profile analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed' }, 
      { status: 500 }
    )
  }
}

/**
 * Convert "High/Medium/Low" to 0-100 score
 */
function convertBig5ToScore(level: string): number {
  if (level === 'High') return 75
  if (level === 'Low') return 25
  return 50 // Medium
}

/**
 * Code descriptions (reused from analyse route)
 */
function getCodeDescription(codeName: string): string {
  const descriptions: Record<string, string> = {
    "Khoisan": "Hyper-acute environmental perception, radical egalitarianism, immediate-return economy, conflict avoidance, present-moment survival intelligence",
    "Kayori": "Expressive ritual creativity, destiny-aware, communal intellect, Ifá divination logic, oral-intellectual tradition",
    "Sahen": "Introspective poetic identity, desert wisdom, existential longing, nomadic autonomy",
    "Enzuka": "Strength through people, courage as social duty, warrior discipline, collective honor",
    "Siyuane": "Harmony sustained across generations, long continuity, hierarchical order, disciplined tradition",
    "Jaejin": "Strength forged under constraint, compressed emotion (Han), intense loyalty, extreme diligence",
    "Namsea": "Grace under movement, water-based cognition, calm resilience, gentle ease, conflict avoidance mastery",
    "Shokunin": "Perfectionist craftsmanship, group harmony (Wa), aesthetic discipline, ritualized order",
    "Khoruun": "Freedom sustained by movement, nomadic mobility intelligence, decentralized strength",
    "Lhumir": "Stillness that includes others, contemplative consciousness, impermanence worldview, compassion discipline",
    "Yatevar": "Order embodied through duty, law as lived ritual, metaphysical abstraction, warrior-philosopher",
    "Renara": "Order maintained through balance, refined subtlety (Halus), emotional restraint, hierarchical harmony",
    "Karayni": "Sacred balance through reciprocity, mutual responsibility (humans-spirits-land), communal ritual labor",
    "Wohaka": "Existence as relationship, all beings as kin, warrior-spiritual synthesis, land-identity fusion",
    "Tjukari": "Land remembers through us, Dreamtime cosmology, Songline navigation, non-linear time, deep time consciousness",
    "Kinmora": "Mastery of cycles, mathematical cosmology, cyclical time consciousness, astronomical precision",
    "Siljoa": "Living in dialogue with climate and place, environment as thinking partner, Arctic survival intelligence",
    "Skenari": "Responsibility to the unborn, Seventh Generation principle, consensus governance, future-oriented ethics",
    "Ashkara": "Truth enacted not believed, moral choice as sacred action, ethical dualism, fire symbolism",
    "Alethir": "To live by seeking what is real, truth emerges through inquiry and dialogue, logos-centered thinking",
  }

  return descriptions[codeName] || "Cultural code description"
}
