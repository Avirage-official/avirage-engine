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
    const mbtiType = mbti || 'INFP'
    const enneagramCore = parseInt(enneagram) || 4
    
    const frameworks: FrameworkScores = {
      mbti: {
        type: mbtiType,
        preferences: {
          IE: mbtiType.includes('I') ? 'I' : 'E',
          SN: mbtiType.includes('N') ? 'N' : 'S',
          TF: mbtiType.includes('T') ? 'T' : 'F',
          JP: mbtiType.includes('J') ? 'J' : 'P',
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
        coreType: enneagramCore as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
        wing: `${enneagramCore}w${enneagramCore === 9 ? 1 : enneagramCore + 1}`,
        scores: {
          1: enneagramCore === 1 ? 3 : 0,
          2: enneagramCore === 2 ? 3 : 0,
          3: enneagramCore === 3 ? 3 : 0,
          4: enneagramCore === 4 ? 3 : 0,
          5: enneagramCore === 5 ? 3 : 0,
          6: enneagramCore === 6 ? 3 : 0,
          7: enneagramCore === 7 ? 3 : 0,
          8: enneagramCore === 8 ? 3 : 0,
          9: enneagramCore === 9 ? 3 : 0,
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
