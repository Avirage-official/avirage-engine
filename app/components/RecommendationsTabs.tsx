'use client'

import { useState } from 'react'
import { CSSProperties } from 'react'
import { RECOMMENDATIONS, CategoryRecommendation } from '@/lib/recommendationsData'

const THEME = {
  bg: "linear-gradient(180deg, #0a0d12 0%, #111720 100%)",
  panel: "rgba(255,255,255,0.04)",
  panelStrong: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.14)",
  softBorder: "rgba(255,255,255,0.08)",
  textPrimary: "#e6e9ee",
  textSecondary: "#9aa3ad",
  textMuted: "rgba(154,163,173,0.75)",
  accent: "#c9a96a",
}

const DISPLAY_FONT = "'Cinzel', serif"

interface RecommendationsTabsProps {
  primaryCode: string
}

type CategoryKey =
  | 'locations' | 'work' | 'community' | 'activities'
  | 'learning' | 'media' | 'living' | 'rituals'
  | 'movement' | 'wellness' | 'products' | 'travel'

const CATEGORIES: { key: CategoryKey; label: string; emoji: string }[] = [
  { key: 'locations', label: 'Locations', emoji: '🌍' },
  { key: 'work', label: 'Work', emoji: '💼' },
  { key: 'community', label: 'Community', emoji: '👥' },
  { key: 'activities', label: 'Activities', emoji: '🎨' },
  { key: 'learning', label: 'Learning', emoji: '📚' },
  { key: 'media', label: 'Media', emoji: '🎵' },
  { key: 'living', label: 'Living', emoji: '🏠' },
  { key: 'rituals', label: 'Rituals', emoji: '🍽️' },
  { key: 'movement', label: 'Movement', emoji: '💪' },
  { key: 'wellness', label: 'Wellness', emoji: '🧘' },
  { key: 'products', label: 'Products', emoji: '🛍️' },
  { key: 'travel', label: 'Travel', emoji: '✈️' },
]

export default function RecommendationsTabs({ primaryCode }: RecommendationsTabsProps) {
  const [activeTab, setActiveTab] = useState<CategoryKey>('locations')
  const codeRecs = RECOMMENDATIONS[primaryCode]

  if (!codeRecs) return null

  return (
    <section style={{ marginBottom: 56 }}>
      <header style={header}>
        <h2 style={title}>Exploring your {primaryCode} alignment</h2>
        <p style={subtitle}>
          These aren’t rules. They’re patterns you may already recognize.
        </p>
      </header>

      <div style={tabNav}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            style={{
              ...tabBtn,
              ...(activeTab === cat.key ? tabBtnActive : {})
            }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div style={content}>
        <CategoryContent category={codeRecs[activeTab]} />
      </div>
    </section>
  )
}

function CategoryContent({ category }: { category: CategoryRecommendation }) {
  const [showRed, setShowRed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (!category?.why) return null

  return (
    <div>
      {/* Soft primer */}
      <p style={primer}>
        Some parts of life quietly energize you. Others slowly drain you.
        This section helps you notice the difference.
      </p>

      {/* Why */}
      <div style={whyBox}>
        {category.why.split('\n\n').map((p, i) => (
          <p key={i} style={whyText}>{p}</p>
        ))}
      </div>

      {/* Green Light */}
      {category.greenLight.map((g, i) => (
        <div key={i} style={greenBox}>
          <div style={greenTitle}>{g.title}</div>

          <ul style={list}>
            {(expanded ? g.items : g.items.slice(0, 3)).map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>

          {g.items.length > 3 && (
            <button onClick={() => setExpanded(!expanded)} style={revealBtn}>
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {g.reasoning && (
            <p style={reasoning}>{g.reasoning}</p>
          )}
        </div>
      ))}

      {/* Red Light (collapsed) */}
      {category.redLight?.items?.length > 0 && (
        <div style={redWrapper}>
          <button onClick={() => setShowRed(!showRed)} style={softToggle}>
            {showRed ? 'Hide friction signs' : 'When this might not fit'}
          </button>

          {showRed && (
            <div style={redBox}>
              <ul style={list}>
                {category.redLight.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {category.redLight.reasoning && (
                <p style={reasoning}>{category.redLight.reasoning}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Validation */}
      {category.validation?.resonates?.length > 0 && (
        <div style={validation}>
          <p style={validationHint}>
            If this felt familiar rather than impressive, you’re probably reading yourself.
          </p>
        </div>
      )}
    </div>
  )
}

/* ============================
   STYLES
============================ */

const header: CSSProperties = { marginBottom: 24 }
const title: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 26,
  fontWeight: 900,
}
const subtitle: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
}

const tabNav: CSSProperties = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  marginBottom: 24,
}

const tabBtn: CSSProperties = {
  padding: '10px 14px',
  borderRadius: 10,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  color: THEME.textSecondary,
  fontWeight: 600,
  cursor: 'pointer',
}

const tabBtnActive: CSSProperties = {
  borderColor: THEME.accent,
  color: THEME.accent,
}

const content: CSSProperties = {
  padding: 28,
  borderRadius: 16,
  background: THEME.panel,
  border: `1px solid ${THEME.softBorder}`,
}

const primer: CSSProperties = {
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
  marginBottom: 20,
  maxWidth: 520,
}

const whyBox: CSSProperties = {
  marginBottom: 28,
}

const whyText: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.8,
  color: THEME.textSecondary,
  marginBottom: 12,
}

const greenBox: CSSProperties = {
  marginBottom: 24,
}

const greenTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  marginBottom: 8,
  color: THEME.accent,
}

const list: CSSProperties = {
  paddingLeft: 18,
  color: THEME.textSecondary,
  lineHeight: 1.7,
}

const revealBtn: CSSProperties = {
  marginTop: 8,
  background: 'none',
  border: 'none',
  color: THEME.accent,
  fontSize: 13,
  cursor: 'pointer',
}

const reasoning: CSSProperties = {
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
  marginTop: 8,
}

const redWrapper: CSSProperties = {
  marginTop: 16,
}

const softToggle: CSSProperties = {
  background: 'none',
  border: 'none',
  color: THEME.textMuted,
  fontSize: 13,
  cursor: 'pointer',
}

const redBox: CSSProperties = {
  marginTop: 12,
  paddingLeft: 12,
}

const validation: CSSProperties = {
  marginTop: 32,
}

const validationHint: CSSProperties = {
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
}
