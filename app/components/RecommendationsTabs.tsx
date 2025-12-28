'use client'

import { useState } from 'react'
import { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RECOMMENDATIONS, CategoryRecommendation } from '@/lib/recommendationsData'

const THEME = {
  panel: "rgba(255,255,255,0.04)",
  panelStrong: "rgba(255,255,255,0.06)",
  softBorder: "rgba(255,255,255,0.10)",
  hairline: "rgba(255,255,255,0.06)",
  textPrimary: "rgba(230,233,238,0.95)",
  textSecondary: "#9aa3ad",
  textMuted: "rgba(154,163,173,0.75)",
  accent: "#c9a96a",
  accentGlow: "rgba(201,169,106,0.25)",
  danger: "rgba(235,111,111,0.85)",
}

const DISPLAY_FONT = "'Cinzel', serif"

interface RecommendationsTabsProps {
  primaryCode: string
}

type CategoryKey =
  | 'locations' | 'work' | 'community' | 'activities'
  | 'learning' | 'media' | 'living' | 'rituals'
  | 'movement' | 'wellness' | 'products' | 'travel'

const CATEGORIES: { key: CategoryKey; label: string; emoji: string; tagline: string }[] = [
  { key: 'locations', label: 'Locations', emoji: '🌍', tagline: 'Where you belong' },
  { key: 'work', label: 'Work', emoji: '💼', tagline: 'How you operate' },
  { key: 'community', label: 'Community', emoji: '👥', tagline: 'Who you need' },
  { key: 'activities', label: 'Activities', emoji: '🎨', tagline: 'What feeds you' },
  { key: 'learning', label: 'Learning', emoji: '📚', tagline: 'How you grow' },
  { key: 'media', label: 'Media', emoji: '🎵', tagline: 'What resonates' },
  { key: 'living', label: 'Living', emoji: '🏠', tagline: 'Your environment' },
  { key: 'rituals', label: 'Rituals', emoji: '🍽️', tagline: 'How you connect' },
  { key: 'movement', label: 'Movement', emoji: '💪', tagline: 'How you move' },
  { key: 'wellness', label: 'Wellness', emoji: '🧘', tagline: 'How you sustain' },
  { key: 'products', label: 'Products', emoji: '🛍️', tagline: 'What serves you' },
  { key: 'travel', label: 'Travel', emoji: '✈️', tagline: 'How you explore' },
]

export default function RecommendationsTabs({ primaryCode }: RecommendationsTabsProps) {
  const [openCategory, setOpenCategory] = useState<CategoryKey | null>(null)

  const codeRecs = RECOMMENDATIONS[primaryCode]

  if (!codeRecs) {
    return (
      <section style={sectionStyle}>
        <p style={{ color: THEME.textSecondary, textAlign: 'center' }}>
          Recommendations coming soon for {primaryCode}
        </p>
      </section>
    )
  }

  return (
    <section style={sectionStyle}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={headerSection}
      >
        <h2 style={mainTitle}>Your {primaryCode} Recommendations</h2>
        <p style={mainSubtitle}>
          Deep guidance across 12 life categories—choose what feeds your soul, avoid what drains it
        </p>
      </motion.div>

      {/* Compact List */}
      <div style={listContainer}>
        {CATEGORIES.map((cat, idx) => {
          const isOpen = openCategory === cat.key
          const category = codeRecs[cat.key]
          const hasContent = !!(category?.why && typeof category.why === 'string' && !category.why.includes('coming next'))

          return (
            <div key={cat.key}>
              {/* Category Row */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => hasContent && setOpenCategory(isOpen ? null : cat.key)}
                disabled={!hasContent}
                style={{
                  ...categoryRow,
                  cursor: hasContent ? 'pointer' : 'not-allowed',
                  opacity: hasContent ? 1 : 0.4,
                  background: isOpen ? THEME.panelStrong : 'transparent',
                  borderLeft: isOpen ? `3px solid ${THEME.accent}` : '3px solid transparent',
                }}
                whileHover={hasContent ? { x: 4 } : {}}
              >
                {/* Left side */}
                <div style={rowLeft}>
                  <div style={emojiIcon}>{cat.emoji}</div>
                  <div style={rowText}>
                    <div style={rowLabel}>{cat.label}</div>
                    <div style={rowTagline}>{cat.tagline}</div>
                  </div>
                </div>

                {/* Right side - Status indicator */}
                <div style={rowRight}>
                  {hasContent ? (
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={chevron}
                    >
                      →
                    </motion.div>
                  ) : (
                    <div style={comingSoon}>Soon</div>
                  )}
                </div>
              </motion.button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isOpen && hasContent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={expandedContent}
                  >
                    <CategoryContent category={category!} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              {idx < CATEGORIES.length - 1 && <div style={divider} />}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ============================
   CATEGORY CONTENT
============================ */

function CategoryContent({ category }: { category: CategoryRecommendation }) {
  const [showRed, setShowRed] = useState(false)

  return (
    <div style={contentPadding}>
      {/* WHY */}
      <div style={whySection}>
        <div style={sectionLabel}>Why this matters</div>
        <div style={whyContent}>
          {category.why.split('\n\n').map((p, i) => (
            <p key={i} style={whyParagraph}>
              {renderMarkdown(p)}
            </p>
          ))}
        </div>
      </div>

      {/* GREEN LIGHT */}
      <div style={{ display: 'grid', gap: 12 }}>
        {category.greenLight.map((g, idx) => (
          <div key={idx} style={greenBlock}>
            <div style={greenHeader}>
              <div style={greenDot} />
              <div style={greenTitle}>{g.title}</div>
            </div>
            <ul style={itemList}>
              {g.items.map((item, i) => (
                <li key={i} style={listItem}>{renderMarkdown(item)}</li>
              ))}
            </ul>
            {g.reasoning && (
              <p style={reasoning}>{renderMarkdown(g.reasoning)}</p>
            )}
          </div>
        ))}
      </div>

      {/* RED LIGHT */}
      {category.redLight?.items?.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => setShowRed(!showRed)}
            style={redToggle}
          >
            <span>What drains this pattern</span>
            <motion.span
              animate={{ rotate: showRed ? 180 : 0 }}
              style={{ display: 'inline-block', marginLeft: 8 }}
            >
              ▾
            </motion.span>
          </button>

          <AnimatePresence>
            {showRed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={redBlock}
              >
                <div style={redTitle}>{category.redLight.title || 'Avoid'}</div>
                <ul style={itemList}>
                  {category.redLight.items.map((item, i) => (
                    <li key={i} style={listItem}>{renderMarkdown(item)}</li>
                  ))}
                </ul>
                {category.redLight.reasoning && (
                  <p style={reasoning}>{renderMarkdown(category.redLight.reasoning)}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

/* ============================
   MARKDOWN RENDERER
============================ */

function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = []
  const boldRegex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(<strong key={match.index} style={{ color: THEME.textPrimary }}>{match[1]}</strong>)
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))

  return parts
}

/* ============================
   STYLES
============================ */

const sectionStyle: CSSProperties = {
  marginBottom: 64,
}

const headerSection: CSSProperties = {
  marginBottom: 24,
}

const mainTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 28,
  fontWeight: 900,
  letterSpacing: 0.6,
  marginBottom: 8,
}

const mainSubtitle: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  lineHeight: 1.6,
}

const listContainer: CSSProperties = {
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  overflow: 'hidden',
}

const categoryRow: CSSProperties = {
  width: '100%',
  padding: '16px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'transparent',
  border: 'none',
  textAlign: 'left',
  transition: 'all 0.2s ease',
}

const rowLeft: CSSProperties = {
  display: 'flex',
  gap: 14,
  alignItems: 'center',
}

const emojiIcon: CSSProperties = {
  fontSize: 22,
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const rowText: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

const rowLabel: CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: THEME.textPrimary,
}

const rowTagline: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  fontStyle: 'italic',
}

const rowRight: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}

const chevron: CSSProperties = {
  fontSize: 18,
  color: THEME.accent,
  fontWeight: 900,
}

const comingSoon: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: THEME.textMuted,
  padding: '4px 10px',
  borderRadius: 999,
  background: THEME.panelStrong,
  border: `1px solid ${THEME.hairline}`,
  letterSpacing: 0.5,
  textTransform: 'uppercase',
}

const divider: CSSProperties = {
  height: 1,
  background: THEME.hairline,
  margin: 0,
}

const expandedContent: CSSProperties = {
  overflow: 'hidden',
  background: THEME.panelStrong,
  borderTop: `1px solid ${THEME.hairline}`,
}

const contentPadding: CSSProperties = {
  padding: '24px 20px',
}

const whySection: CSSProperties = {
  marginBottom: 20,
  padding: 18,
  borderRadius: 12,
  background: 'rgba(0,0,0,0.3)',
  border: `1px solid ${THEME.hairline}`,
}

const sectionLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 1.5,
  color: THEME.accent,
  marginBottom: 12,
  textTransform: 'uppercase',
}

const whyContent: CSSProperties = {
  display: 'grid',
  gap: 12,
}

const whyParagraph: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.8,
  color: THEME.textSecondary,
  margin: 0,
}

const greenBlock: CSSProperties = {
  padding: 14,
  borderRadius: 10,
  background: 'rgba(100, 200, 100, 0.05)',
  border: '1px solid rgba(100, 200, 100, 0.2)',
}

const greenHeader: CSSProperties = {
  display: 'flex',
  gap: 10,
  alignItems: 'center',
  marginBottom: 10,
}

const greenDot: CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: 'rgb(100, 200, 100)',
  boxShadow: '0 0 8px rgba(100, 200, 100, 0.6)',
}

const greenTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  color: THEME.textPrimary,
}

const itemList: CSSProperties = {
  margin: 0,
  paddingLeft: 20,
  lineHeight: 1.8,
  color: THEME.textSecondary,
}

const listItem: CSSProperties = {
  fontSize: 13,
  marginBottom: 6,
}

const reasoning: CSSProperties = {
  fontSize: 12,
  fontStyle: 'italic',
  color: THEME.textMuted,
  marginTop: 10,
  marginBottom: 0,
}

const redToggle: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 14px',
  borderRadius: 10,
  background: 'rgba(235, 111, 111, 0.08)',
  border: '1px solid rgba(235, 111, 111, 0.25)',
  color: THEME.textSecondary,
  fontSize: 13,
  cursor: 'pointer',
  fontWeight: 600,
}

const redBlock: CSSProperties = {
  marginTop: 10,
  padding: 14,
  borderRadius: 10,
  background: 'rgba(235, 111, 111, 0.08)',
  border: '1px solid rgba(235, 111, 111, 0.25)',
  overflow: 'hidden',
}

const redTitle: CSSProperties = {
  fontSize: 12,
  fontWeight: 800,
  color: THEME.danger,
  marginBottom: 10,
  letterSpacing: 1,
  textTransform: 'uppercase',
}
