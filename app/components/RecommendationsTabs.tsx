'use client'

import { useMemo, useState } from 'react'
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
  accentSoft: "rgba(201,169,106,0.18)",
  danger: "rgba(235,111,111,0.85)",
  dangerSoft: "rgba(235,111,111,0.12)",
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

  // Safe lookup (prevents “tabs disappear on reload”)
  const normalized = (primaryCode || '').trim()
  const codeKey = useMemo(() => {
    if (!normalized) return undefined
    if (normalized in RECOMMENDATIONS) return normalized
    return Object.keys(RECOMMENDATIONS).find(k => k.toLowerCase() === normalized.toLowerCase())
  }, [normalized])

  const codeRecs = codeKey ? RECOMMENDATIONS[codeKey] : undefined

  if (!normalized) {
    return (
      <section style={{ marginBottom: 56 }}>
        <p style={{ color: THEME.textSecondary }}>Loading your recommendations…</p>
      </section>
    )
  }

  if (!codeRecs) {
    return (
      <section style={{ marginBottom: 56 }}>
        <p style={{ color: THEME.textSecondary }}>
          No recommendations found for <strong style={{ color: THEME.textPrimary }}>{primaryCode}</strong>.
        </p>
      </section>
    )
  }

  return (
    <section style={{ marginBottom: 56 }}>
      <h2 style={title}>Exploring your {codeKey} alignment</h2>
      <p style={subtitle}>Move through these slowly. Notice what reacts.</p>

      <div style={tabNav}>
        {CATEGORIES.map(cat => {
          const active = activeTab === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              style={{
                ...tabBtn,
                ...(active ? tabBtnActive : {}),
              }}
            >
              <span style={{ opacity: active ? 1 : 0.9 }}>{cat.emoji}</span>
              <span>{cat.label}</span>

              {/* active glide indicator */}
              {active && (
                <motion.div
                  layoutId="activeTabPill"
                  style={activePill}
                  transition={{ type: 'spring', stiffness: 520, damping: 36 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          style={content}
        >
          <CategoryContent category={codeRecs[activeTab]} />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

/* --------------------------------
   CONTENT
--------------------------------- */

function CategoryContent({ category }: { category: CategoryRecommendation }) {
  const [showRed, setShowRed] = useState(false)
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({})

  if (!category?.why) return null

  const toggleExpanded = (idx: number) =>
    setExpandedMap(prev => ({ ...prev, [idx]: !prev[idx] }))

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

      {/* WHY – presented as a “chapter” */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.10 }}
        style={whyCard}
      >
        <div style={whyHeader}>Why this matters</div>
        {category.why.split('\n\n').map((p, i) => (
          <p key={i} style={whyText}>
            {renderInlineMarkdown(p)}
          </p>
        ))}
      </motion.div>

      {/* GREEN – each block as a card */}
      <div style={{ display: 'grid', gap: 14 }}>
        {category.greenLight.map((g, i) => {
          const expanded = !!expandedMap[i]
          const visibleItems = expanded ? g.items : g.items.slice(0, 3)
          const hiddenCount = Math.max(0, g.items.length - 3)

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              style={greenCard}
            >
              <div style={greenTop}>
                <div style={greenAccent} />
                <div>
                  <div style={greenTitle}>{g.title}</div>
                  {g.reasoning && <p style={reasoning}>{renderInlineMarkdown(g.reasoning)}</p>}
                </div>
              </div>

              <ul style={list}>
                {visibleItems.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: j * 0.03 }}
                  >
                    {renderInlineMarkdown(item)}
                  </motion.li>
                ))}
              </ul>

              {g.items.length > 3 && (
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleExpanded(i)}
                  style={revealBtn}
                >
                  {expanded ? 'Show less' : `Show ${hiddenCount} more`}
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.18 }}
                    style={chev}
                  >
                    ▾
                  </motion.span>
                </motion.button>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* RED – elegant friction card */}
      {category.redLight?.items?.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowRed(!showRed)}
            style={softToggle}
          >
            <span style={{ color: THEME.danger }}>⚠</span>
            <span>{showRed ? 'Hide friction signs' : 'When this might not fit'}</span>
            <motion.span
              animate={{ rotate: showRed ? 180 : 0 }}
              transition={{ duration: 0.18 }}
              style={chev}
            >
              ▾
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showRed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                style={redCard}
              >
                <div style={redTitle}>{category.redLight.title || 'Signs of friction'}</div>
                <ul style={list}>
                  {category.redLight.items.map((item, i) => (
                    <li key={i}>{renderInlineMarkdown(item)}</li>
                  ))}
                </ul>
                {category.redLight.reasoning && (
                  <p style={reasoning}>{renderInlineMarkdown(category.redLight.reasoning)}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Closure footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        style={reflectionCard}
      >
        <div style={reflectionTitle}>Reflection</div>
        <p style={validationHint}>
          If this felt familiar rather than impressive, you’re reading yourself.
        </p>
      </motion.div>
    </div>
  )
}

/* --------------------------------
   INLINE MARKDOWN (very small)
   Supports **bold** and *italic*
--------------------------------- */

function renderInlineMarkdown(text: string) {
  // Split by **bold** first, then *italic*
  const parts: Array<{ type: 'text' | 'bold' | 'italic'; value: string }> = []

  // bold: **...**
  const boldRegex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'bold', value: match[1] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push({ type: 'text', value: text.slice(lastIndex) })

  // Now process italics inside text parts only: *...*
  const final: React.ReactNode[] = []
  parts.forEach((p, idx) => {
    if (p.type === 'bold') {
      final.push(<strong key={`b-${idx}`} style={{ color: THEME.textPrimary }}>{p.value}</strong>)
      return
    }
    if (p.type === 'text') {
      const italicsRegex = /\*(.+?)\*/g
      let li = 0
      let m: RegExpExecArray | null
      while ((m = italicsRegex.exec(p.value)) !== null) {
        if (m.index > li) final.push(<span key={`t-${idx}-${li}`}>{p.value.slice(li, m.index)}</span>)
        final.push(<em key={`i-${idx}-${m.index}`} style={{ color: THEME.textPrimary, opacity: 0.92 }}>{m[1]}</em>)
        li = m.index + m[0].length
      }
      if (li < p.value.length) final.push(<span key={`t2-${idx}-${li}`}>{p.value.slice(li)}</span>)
    }
  })

  return final
}

/* ============================
   STYLES
============================ */

const title: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 28,
  fontWeight: 900,
  letterSpacing: 0.6,
}

const subtitle: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  marginBottom: 18,
}

const tabNav: CSSProperties = {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
  marginBottom: 18,
}

const tabBtn: CSSProperties = {
  position: 'relative',
  padding: '10px 14px',
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  color: THEME.textSecondary,
  fontWeight: 650,
  cursor: 'pointer',
  overflow: 'hidden',
  display: 'flex',
  gap: 8,
  alignItems: 'center',
}

const tabBtnActive: CSSProperties = {
  borderColor: THEME.accent,
  color: THEME.textPrimary,
}

const activePill: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 12,
  background: THEME.accentSoft,
  border: `1px solid rgba(201,169,106,0.35)`,
  zIndex: 0,
}

const content: CSSProperties = {
  padding: 22,
  borderRadius: 18,
  background: THEME.panel,
  border: `1px solid ${THEME.hairline}`,
}

const primer: CSSProperties = {
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
  marginBottom: 14,
  maxWidth: 520,
}

const whyCard: CSSProperties = {
  borderRadius: 16,
  padding: 18,
  border: `1px solid ${THEME.hairline}`,
  background: THEME.panelStrong,
  marginBottom: 14,
}

const whyHeader: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  letterSpacing: 0.4,
  textTransform: 'uppercase',
  marginBottom: 10,
}

const whyText: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.85,
  color: THEME.textSecondary,
  marginBottom: 12,
}

const greenCard: CSSProperties = {
  borderRadius: 16,
  padding: 16,
  border: `1px solid ${THEME.hairline}`,
  background: "rgba(255,255,255,0.03)",
}

const greenTop: CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'flex-start',
  marginBottom: 10,
}

const greenAccent: CSSProperties = {
  width: 4,
  borderRadius: 12,
  background: THEME.accent,
  marginTop: 4,
  flexShrink: 0,
  height: 36,
}

const greenTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 850,
  color: THEME.textPrimary,
  marginBottom: 2,
}

const list: CSSProperties = {
  paddingLeft: 18,
  lineHeight: 1.75,
  color: THEME.textSecondary,
  margin: 0,
}

const revealBtn: CSSProperties = {
  marginTop: 10,
  background: THEME.panelStrong,
  border: `1px solid rgba(201,169,106,0.25)`,
  color: THEME.accent,
  borderRadius: 999,
  padding: '8px 12px',
  fontSize: 13,
  cursor: 'pointer',
  display: 'inline-flex',
  gap: 8,
  alignItems: 'center',
}

const chev: CSSProperties = {
  display: 'inline-block',
  opacity: 0.9,
}

const reasoning: CSSProperties = {
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
  marginTop: 6,
  marginBottom: 0,
}

const softToggle: CSSProperties = {
  background: THEME.panelStrong,
  border: `1px solid ${THEME.hairline}`,
  color: THEME.textSecondary,
  borderRadius: 14,
  padding: '10px 12px',
  cursor: 'pointer',
  display: 'inline-flex',
  gap: 10,
  alignItems: 'center',
}

const redCard: CSSProperties = {
  marginTop: 12,
  borderRadius: 16,
  padding: 16,
  border: `1px solid rgba(235,111,111,0.22)`,
  background: THEME.dangerSoft,
  overflow: 'hidden',
}

const redTitle: CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
  color: THEME.danger,
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}

const reflectionCard: CSSProperties = {
  marginTop: 16,
  borderRadius: 16,
  padding: 16,
  border: `1px solid ${THEME.hairline}`,
  background: "rgba(255,255,255,0.03)",
}

const reflectionTitle: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  letterSpacing: 0.4,
  textTransform: 'uppercase',
  marginBottom: 8,
}

const validationHint: CSSProperties = {
  margin: 0,
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
}
