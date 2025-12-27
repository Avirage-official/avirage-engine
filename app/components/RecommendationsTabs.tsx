'use client'

import { useState } from 'react'
import { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RECOMMENDATIONS, CategoryRecommendation } from '@/lib/recommendationsData'

const THEME = {
  panel: "rgba(255,255,255,0.04)",
  panelStrong: "rgba(255,255,255,0.06)",
  softBorder: "rgba(255,255,255,0.08)",
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
      <h2 style={title}>Exploring your {primaryCode} alignment</h2>
      <p style={subtitle}>Move through these slowly. Notice what reacts.</p>

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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={content}
        >
          <CategoryContent category={codeRecs[activeTab]} />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function CategoryContent({ category }: { category: CategoryRecommendation }) {
  const [showRed, setShowRed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (!category?.why) return null

  return (
    <div>
      {/* Primer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        style={primer}
      >
        Some things energize you quietly. Others drain you slowly.
      </motion.p>

      {/* WHY */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        style={whyBox}
      >
        {category.why.split('\n\n').map((p, i) => (
          <p key={i} style={whyText}>{p}</p>
        ))}
      </motion.div>

      {/* GREEN */}
      {category.greenLight.map((g, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          <div style={greenTitle}>{g.title}</div>

          <ul style={list}>
            {(expanded ? g.items : g.items.slice(0, 3)).map((item, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: j * 0.04 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>

          {g.items.length > 3 && (
            <button onClick={() => setExpanded(!expanded)} style={revealBtn}>
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {g.reasoning && <p style={reasoning}>{g.reasoning}</p>}
        </div>
      ))}

      {/* RED – soft accordion */}
      {category.redLight?.items?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <button onClick={() => setShowRed(!showRed)} style={softToggle}>
            {showRed ? 'Hide friction signs' : 'When this might not fit'}
          </button>

          <AnimatePresence>
            {showRed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={redBox}
              >
                <ul style={list}>
                  {category.redLight.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                {category.redLight.reasoning && (
                  <p style={reasoning}>{category.redLight.reasoning}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* VALIDATION */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={validationHint}
      >
        If this felt familiar rather than impressive, you’re reading yourself.
      </motion.p>
    </div>
  )
}

/* ============================
   STYLES
============================ */

const title: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 26,
  fontWeight: 900,
}

const subtitle: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  marginBottom: 24,
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
  marginBottom: 18,
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

const greenTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  marginBottom: 8,
  color: THEME.accent,
}

const list: CSSProperties = {
  paddingLeft: 18,
  lineHeight: 1.7,
  color: THEME.textSecondary,
}

const revealBtn: CSSProperties = {
  marginTop: 6,
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

const validationHint: CSSProperties = {
  marginTop: 28,
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
}
