/**
 * CULTURAL HERITAGE DATA
 * Deep historical context for each Cultural Code
 */

export interface HeritageChapter {
  id: string
  title: string
  subtitle: string
  era?: string
  content: {
    intro: string
    sections: {
      heading: string
      paragraphs: string[]
      highlights?: string[]
      quote?: {
        text: string
        attribution: string
      }
    }[]
  }
}

export interface HeritageData {
  codeName: string
  cultureType: 'single' | 'fusion'
  level1: string
  level2?: string
  mapImage?: string
  chapters: HeritageChapter[]
}

export const HERITAGE_DATA: Record<string, HeritageData> = {
  jaejin: {
    codeName: 'Jaejin',
    cultureType: 'single',
    level1: 'Korean',
    chapters: [
      {
        id: 'foundations',
        title: 'Ancient Foundations',
        subtitle: 'The roots of collective resilience',
        era: '57 BCE - 935 CE',
        content: {
          intro: 'Korean culture emerged on a mountainous peninsula caught between three empires: China, Japan, and the northern nomadic tribes. Geography shaped destiny - survival required unity, speed, and unwavering collective resolve.',
          sections: [
            {
              heading: 'The Three Kingdoms and Unity',
              paragraphs: [
                'From 57 BCE to 668 CE, three kingdoms (Goguryeo, Baekje, and Silla) competed fiercely for dominance on the Korean peninsula. This was not mere political rivalry - it was an existential crucible that forged the Korean psyche. Victory required total mobilization: every farmer could be called to war, every artisan redirected to defense.',
                'The eventual unification under Silla (668 CE) did not erase this competitive intensity - it internalized it. Koreans learned that survival demanded not just individual excellence, but synchronized collective effort. The concept of uri (we/us) became more fundamental than I. Your fate was inseparable from your community fate.',
                'This period established a pattern: when pressure mounted, Koreans did not fragment - they compressed into a unified force. Speed of response became cultural doctrine. Hesitation meant conquest.',
              ],
              highlights: [
                'Geography as pressure: peninsula position meant constant threat from all sides',
                'Unity through crisis: survival required collective mobilization',
                'Speed as virtue: slow response equals annihilation',
              ],
            },
          ],
        },
      },
      {
        id: 'placeholder',
        title: 'More Chapters Coming',
        subtitle: 'Additional heritage content',
        content: {
          intro: 'Additional chapters will be added with full historical detail.',
          sections: [],
        },
      },
    ],
  },
  shokunin: {
    codeName: 'Shokunin',
    cultureType: 'single',
    level1: 'Japanese',
    chapters: [
      {
        id: 'placeholder',
        title: 'Heritage Coming Soon',
        subtitle: 'Deep dive into Japanese craft mastery traditions',
        content: {
          intro: 'Full heritage content for Shokunin will be available soon.',
          sections: [],
        },
      },
    ],
  },
}
