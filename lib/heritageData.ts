/**
 * HERITAGE DATA
 * Narrative + archival reference only.
 * NOT used in scoring or personality assignment.
 */

export interface HeritageSection {
  heading: string
  paragraphs: string[]
  highlights?: string[]
  quote?: {
    text: string
    attribution: string
  }
}

export interface HeritageChapter {
  id: string
  title: string
  subtitle?: string
  era?: string
  content: {
    intro?: string
    sections: HeritageSection[]
  }
}

export interface HeritageData {
  codeName: string
  level1: string
  level2?: string
  chapters: HeritageChapter[]
}

/* ======================================================
   HERITAGE ARCHIVES (REFERENCE ONLY)
====================================================== */

export const HERITAGE_DATA: Record<string, HeritageData> = {
  Shokunin: {
    codeName: "Shokunin",
    level1: "Japanese Craft Tradition",
    chapters: [
      {
        id: "origins",
        title: "Origins of the Craft Path",
        era: "Pre-Modern Japan",
        content: {
          intro:
            "The concept of Shokunin emerged from a worldview where work was not merely labor, but a lifelong devotion to mastery.",
          sections: [
            {
              heading: "Work as a Moral Act",
              paragraphs: [
                "In traditional Japanese society, craftsmanship was seen as an ethical responsibility.",
                "Each action carried weight, because it reflected one’s character."
              ],
              highlights: [
                "Mastery over speed",
                "Consistency over recognition"
              ]
            }
          ]
        }
      },
      {
        id: "discipline",
        title: "Discipline and Repetition",
        era: "Feudal Period",
        content: {
          sections: [
            {
              heading: "Repetition as Refinement",
              paragraphs: [
                "Progress was achieved through repetition, not innovation alone.",
                "Skill deepened through patience and humility."
              ],
              quote: {
                text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
                attribution: "Traditional maxim"
              }
            }
          ]
        }
      }
    ]
  },

  Renara: {
    codeName: "Renara",
    level1: "Javanese Harmony Culture",
    chapters: [
      {
        id: "balance",
        title: "Living in Balance",
        era: "Classical Java",
        content: {
          intro:
            "Renara reflects a philosophy where balance and social harmony outweigh individual dominance.",
          sections: [
            {
              heading: "Soft Power",
              paragraphs: [
                "Influence was exercised subtly through grace, restraint, and emotional intelligence.",
                "Stability was achieved through relationship management, not force."
              ],
              highlights: [
                "Harmony over control",
                "Balance over excess"
              ]
            }
          ]
        }
      }
    ]
  }
}

/* ======================================================
   HELPERS
====================================================== */

export function getHeritageData(codeName: string): HeritageData | null {
  return HERITAGE_DATA[codeName] ?? null
}
