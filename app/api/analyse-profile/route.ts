import { NextResponse } from 'next/server'

// Simple mapping logic: Self-reported frameworks → Cultural Codes
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { mbti, big5, enneagram, astrology } = body

    // Calculate pattern scores based on self-reported data
    const patterns = calculatePatternsFromProfile(mbti, big5, enneagram, astrology)
    
    // Match to codes (using same logic as quiz-based, but with profile patterns)
    const codeMatches = matchToCodes(patterns)
    
    // Return top 3
    const [primary, secondary, tertiary] = codeMatches.slice(0, 3)

    return NextResponse.json({
      primary: {
        code_name: primary.code,
        full_name: primary.fullName,
        description: primary.description,
        matchPercentage: Math.round(primary.score * 100),
      },
      secondary: {
        code_name: secondary.code,
        full_name: secondary.fullName,
        description: secondary.description,
        matchPercentage: Math.round(secondary.score * 100),
      },
      tertiary: {
        code_name: tertiary.code,
        full_name: tertiary.fullName,
        description: tertiary.description,
        matchPercentage: Math.round(tertiary.score * 100),
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

// Pattern calculation from self-reported frameworks
function calculatePatternsFromProfile(
  mbti: string,
  big5: any,
  enneagram: string,
  astrology: any
) {
  const patterns: Record<string, number> = {}

  // MBTI → Patterns
  if (mbti.includes('I')) patterns.introversion = 0.8
  if (mbti.includes('E')) patterns.extraversion = 0.8
  if (mbti.includes('S')) patterns.sensory = 0.7
  if (mbti.includes('N')) patterns.intuition = 0.7
  if (mbti.includes('T')) patterns.thinking = 0.7
  if (mbti.includes('F')) patterns.feeling = 0.7
  if (mbti.includes('J')) patterns.structure = 0.8
  if (mbti.includes('P')) patterns.flexibility = 0.8

  // Big 5 → Patterns
  if (big5.openness === 'High') patterns.novelty = 0.8
  if (big5.openness === 'Low') patterns.tradition = 0.7
  if (big5.conscientiousness === 'High') patterns.discipline = 0.8
  if (big5.extraversion === 'High') patterns.social_energy = 0.8
  if (big5.extraversion === 'Low') patterns.solitude = 0.7
  if (big5.agreeableness === 'High') patterns.harmony = 0.7
  if (big5.neuroticism === 'High') patterns.sensitivity = 0.6
  if (big5.neuroticism === 'Low') patterns.stability = 0.8

  // Enneagram → Patterns
  if (enneagram === '1') { patterns.perfectionism = 0.8; patterns.structure = 0.7 }
  if (enneagram === '2') { patterns.service = 0.8; patterns.relational = 0.7 }
  if (enneagram === '3') { patterns.achievement = 0.8; patterns.image = 0.6 }
  if (enneagram === '4') { patterns.meaning = 0.8; patterns.uniqueness = 0.7 }
  if (enneagram === '5') { patterns.analysis = 0.8; patterns.independence = 0.7 }
  if (enneagram === '6') { patterns.loyalty = 0.7; patterns.security = 0.7 }
  if (enneagram === '7') { patterns.novelty = 0.8; patterns.optimism = 0.7 }
  if (enneagram === '8') { patterns.power = 0.8; patterns.directness = 0.7 }
  if (enneagram === '9') { patterns.harmony = 0.8; patterns.peace = 0.7 }

  // Astrology → Patterns
  if (astrology.element === 'Fire') patterns.energy = 0.6
  if (astrology.element === 'Earth') patterns.grounding = 0.6
  if (astrology.element === 'Air') patterns.ideas = 0.6
  if (astrology.element === 'Water') patterns.emotion = 0.6

  return patterns
}

// Match patterns to Cultural Codes
function matchToCodes(patterns: Record<string, number>) {
  const codes = [
    {
      code: 'Shokunin',
      fullName: 'Japanese Craft Mastery',
      description: 'Craft-focused precision and refinement',
      requiredPatterns: ['discipline', 'structure', 'perfectionism', 'grounding'],
    },
    {
      code: 'Namsea',
      fullName: 'Vietnamese + Thai Fusion',
      description: 'Flow and adaptability',
      requiredPatterns: ['flexibility', 'harmony', 'social_energy'],
    },
    {
      code: 'Alethir',
      fullName: 'Ancient Greek',
      description: 'Inquiry and philosophical exploration',
      requiredPatterns: ['ideas', 'analysis', 'novelty', 'thinking'],
    },
    {
      code: 'Khoisan',
      fullName: 'San/Khoisan',
      description: 'Environmental attunement',
      requiredPatterns: ['grounding', 'solitude', 'sensory'],
    },
    {
      code: 'Kayori',
      fullName: 'Yoruba',
      description: 'Expressive and communal',
      requiredPatterns: ['social_energy', 'meaning', 'relational'],
    },
    {
      code: 'Sahen',
      fullName: 'Tuareg',
      description: 'Solitary strength and independence',
      requiredPatterns: ['solitude', 'independence', 'stability'],
    },
    {
      code: 'Enzuka',
      fullName: 'Maasai + Zulu Fusion',
      description: 'Duty and protective strength',
      requiredPatterns: ['power', 'loyalty', 'structure', 'directness'],
    },
    {
      code: 'Siyuane',
      fullName: 'Ethiopian + Han Chinese Fusion',
      description: 'Order and long-term thinking',
      requiredPatterns: ['structure', 'tradition', 'discipline', 'stability'],
    },
    {
      code: 'Jaejin',
      fullName: 'Korean',
      description: 'Intensity and execution',
      requiredPatterns: ['discipline', 'achievement', 'loyalty'],
    },
    {
      code: 'Khoruun',
      fullName: 'Mongolian',
      description: 'Freedom and autonomy',
      requiredPatterns: ['independence', 'flexibility', 'energy'],
    },
    {
      code: 'Lhumir',
      fullName: 'Tibetan',
      description: 'Contemplative meaning',
      requiredPatterns: ['meaning', 'stability', 'solitude'],
    },
    {
      code: 'Yatevar',
      fullName: 'Indian Vedic + Nahua/Aztec Fusion',
      description: 'Duty through cosmic meaning',
      requiredPatterns: ['meaning', 'structure', 'tradition'],
    },
    {
      code: 'Renara',
      fullName: 'Javanese',
      description: 'Refinement and balance',
      requiredPatterns: ['harmony', 'stability', 'structure'],
    },
    {
      code: 'Karayni',
      fullName: 'Balinese + Quechua Fusion',
      description: 'Reciprocity and community',
      requiredPatterns: ['service', 'relational', 'harmony', 'grounding'],
    },
    {
      code: 'Wohaka',
      fullName: 'Maori + Lakota Fusion',
      description: 'Belonging and kinship',
      requiredPatterns: ['relational', 'loyalty', 'meaning'],
    },
    {
      code: 'Tjukari',
      fullName: 'Aboriginal Australian',
      description: 'Deep-time and place',
      requiredPatterns: ['grounding', 'meaning', 'sensory'],
    },
    {
      code: 'Kinmora',
      fullName: 'Maya',
      description: 'Pattern and cyclical order',
      requiredPatterns: ['analysis', 'structure', 'ideas'],
    },
    {
      code: 'Siljoa',
      fullName: 'Inuit + Sami Fusion',
      description: 'Environmental intelligence',
      requiredPatterns: ['grounding', 'sensory', 'solitude', 'stability'],
    },
    {
      code: 'Skenari',
      fullName: 'Haudenosaunee',
      description: 'Future responsibility',
      requiredPatterns: ['structure', 'harmony', 'meaning', 'tradition'],
    },
    {
      code: 'Ashkara',
      fullName: 'Persian/Zoroastrian',
      description: 'Truth and moral action',
      requiredPatterns: ['meaning', 'thinking', 'structure'],
    },
  ]

  // Score each code
  const scored = codes.map(code => {
    let score = 0
    let matches = 0

    for (const pattern of code.requiredPatterns) {
      if (patterns[pattern]) {
        score += patterns[pattern]
        matches++
      }
    }

    // Average score
    return {
      ...code,
      score: matches > 0 ? score / code.requiredPatterns.length : 0,
    }
  })

  // Sort by score
  return scored.sort((a, b) => b.score - a.score)
}
