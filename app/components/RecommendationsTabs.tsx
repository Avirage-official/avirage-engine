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
  accentGlow: "rgba(201,169,106,0.35)",
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
  const [unsealing, setUnsealing] = useState<CategoryKey | null>(null)

  const codeRecs = RECOMMENDATIONS[primaryCode]

  if (!codeRecs) {
    return (
      <section style={sectionStyle}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={emptyState}
        >
          <div style={emptyIcon}>🔒</div>
          <p style={emptyText}>Recommendations coming soon for {primaryCode}</p>
        </motion.div>
      </section>
    )
  }

  const handleSealClick = (key: CategoryKey) => {
    if (openCategory === key) {
      // Close it
      setOpenCategory(null)
    } else {
      // Unseal animation
      setUnsealing(key)
      setTimeout(() => {
        setOpenCategory(key)
        setUnsealing(null)
      }, 800) // Duration of unseal animation
    }
  }

  return (
    <section style={sectionStyle}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={headerSection}
      >
        <h2 style={mainTitle}>Cultural Artifacts</h2>
        <p style={mainSubtitle}>
          These aren't recommendations. They're <strong style={{ color: THEME.accent }}>encoded knowledge</strong> from your {primaryCode} lineage.
        </p>
        <div style={instructionBox}>
          <span style={instructionIcon}>⚡</span>
          <span style={instructionText}>Break the seals. Absorb what resonates. Ignore the rest.</span>
        </div>
      </motion.div>

      {/* Sealed Categories Grid */}
      <div style={gridStyle}>
        {CATEGORIES.map((cat, idx) => {
          const isOpen = openCategory === cat.key
          const isUnsealing = unsealing === cat.key
          const category = codeRecs[cat.key]
          const hasContent = category?.why && !category.why.includes('coming next')

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              style={{ gridColumn: isOpen ? 'span 2' : 'span 1' }}
            >
              {/* Sealed Card */}
              {!isOpen && (
                <SealedCard
                  category={cat}
                  hasContent={hasContent}
                  isUnsealing={isUnsealing}
                  onClick={() => hasContent && handleSealClick(cat.key)}
                />
              )}

              {/* Opened Content */}
              {isOpen && (
                <OpenedArtifact
                  category={cat}
                  content={category!}
                  onClose={() => setOpenCategory(null)}
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

/* ============================
   SEALED CARD
============================ */

interface SealedCardProps {
  category: typeof CATEGORIES[0]
  hasContent: boolean
  isUnsealing: boolean
  onClick: () => void
}

function SealedCard({ category, hasContent, isUnsealing, onClick }: SealedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onHoverStart={() => hasContent && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={hasContent ? { scale: 1.02, y: -4 } : {}}
      whileTap={hasContent ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={!hasContent}
      style={{
        ...sealedCard,
        cursor: hasContent ? 'pointer' : 'not-allowed',
        opacity: hasContent ? 1 : 0.4,
      }}
    >
      {/* Glow effect when hovering */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={glowLayer}
          />
        )}
      </AnimatePresence>

      {/* Seal icon with animation */}
      <motion.div
        animate={isUnsealing ? {
          scale: [1, 1.2, 0.8, 1.5, 0],
          rotate: [0, 10, -10, 360],
          opacity: [1, 1, 1, 0.5, 0],
        } : {}}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={sealIcon}
      >
        {hasContent ? (
          <motion.div
            animate={isHovered ? {
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            style={sealEmoji}
          >
            🔒
          </motion.div>
        ) : (
          <div style={{ ...sealEmoji, opacity: 0.3 }}>⏳</div>
        )}
      </motion.div>

      {/* Category emoji */}
      <div style={categoryEmoji}>{category.emoji}</div>

      {/* Text */}
      <div style={sealedText}>
        <div style={sealedLabel}>{category.label}</div>
        <div style={sealedTagline}>{category.tagline}</div>
      </div>

      {/* Status indicator */}
      <div style={statusDot(hasContent)} />

      {/* Unsealing effect */}
      <AnimatePresence>
        {isUnsealing && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={unsealRipple}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8 }}
              style={unsealFlash}
            />
          </>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ============================
   OPENED ARTIFACT
============================ */

interface OpenedArtifactProps {
  category: typeof CATEGORIES[0]
  content: CategoryRecommendation
  onClose: () => void
}

function OpenedArtifact({ category, content, onClose }: OpenedArtifactProps) {
  const [showRed, setShowRed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={artifactCard}
    >
      {/* Header with close */}
      <div style={artifactHeader}>
        <div style={artifactHeaderLeft}>
          <div style={artifactEmoji}>{category.emoji}</div>
          <div>
            <div style={artifactTitle}>{category.label}</div>
            <div style={artifactTagline}>{category.tagline}</div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={closeBtn}
        >
          ✕
        </motion.button>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={divider}
      />

      {/* Primer */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={primer}
      >
        This knowledge was encoded for people like you. Not everyone will understand it.
      </motion.p>

      {/* WHY section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={whySection}
      >
        <div style={sectionLabel}>THE TRUTH</div>
        <div style={whyContent}>
          {content.why.split('\n\n').map((p, i) => (
            <p key={i} style={whyParagraph}>
              {renderMarkdown(p)}
            </p>
          ))}
        </div>
      </motion.div>

      {/* GREEN LIGHT sections */}
      <div style={{ display: 'grid', gap: 16 }}>
        {content.greenLight.map((g, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            style={greenBlock}
          >
            <div style={greenBlockHeader}>
              <div style={greenAccent} />
              <div style={greenTitle}>{g.title}</div>
            </div>
            <ul style={itemList}>
              {g.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 + i * 0.05 }}
                  style={listItem}
                >
                  {renderMarkdown(item)}
                </motion.li>
              ))}
            </ul>
            {g.reasoning && (
              <p style={reasoning}>{renderMarkdown(g.reasoning)}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* RED LIGHT (collapsible) */}
      {content.redLight?.items?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: 20 }}
        >
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowRed(!showRed)}
            style={redToggle}
          >
            <span style={{ color: THEME.danger }}>⚠</span>
            <span>{showRed ? 'Hide friction signals' : 'What drains this pattern'}</span>
            <motion.span
              animate={{ rotate: showRed ? 180 : 0 }}
              style={{ display: 'inline-block', marginLeft: 8 }}
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
                transition={{ duration: 0.3 }}
                style={redBlock}
              >
                <div style={redTitle}>{content.redLight.title || 'Friction signals'}</div>
                <ul style={itemList}>
                  {content.redLight.items.map((item, i) => (
                    <li key={i} style={listItem}>{renderMarkdown(item)}</li>
                  ))}
                </ul>
                {content.redLight.reasoning && (
                  <p style={reasoning}>{renderMarkdown(content.redLight.reasoning)}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={artifactFooter}
      >
        <div style={footerText}>
          If this felt obvious rather than impressive, you're reading yourself correctly.
        </div>
      </motion.div>
    </motion.div>
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
  marginBottom: 32,
  textAlign: 'center',
}

const mainTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 36,
  fontWeight: 900,
  letterSpacing: 1.2,
  marginBottom: 12,
  background: `linear-gradient(135deg, ${THEME.textPrimary} 0%, ${THEME.accent} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const mainSubtitle: CSSProperties = {
  fontSize: 16,
  color: THEME.textSecondary,
  marginBottom: 20,
  lineHeight: 1.6,
}

const instructionBox: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 20px',
  borderRadius: 999,
  background: THEME.panelStrong,
  border: `1px solid ${THEME.accent}`,
}

const instructionIcon: CSSProperties = {
  fontSize: 18,
}

const instructionText: CSSProperties = {
  fontSize: 13,
  color: THEME.accent,
  fontWeight: 700,
  letterSpacing: 0.5,
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 16,
}

const sealedCard: CSSProperties = {
  position: 'relative',
  padding: 24,
  borderRadius: 20,
  background: THEME.panel,
  border: `1px solid ${THEME.softBorder}`,
  textAlign: 'center',
  overflow: 'hidden',
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
}

const glowLayer: CSSProperties = {
  position: 'absolute',
  inset: -2,
  borderRadius: 20,
  background: `radial-gradient(circle at 50% 50%, ${THEME.accentGlow}, transparent 70%)`,
  opacity: 0.6,
  pointerEvents: 'none',
}

const sealIcon: CSSProperties = {
  fontSize: 48,
  marginBottom: 8,
}

const sealEmoji: CSSProperties = {
  fontSize: 48,
  filter: `drop-shadow(0 0 20px ${THEME.accentGlow})`,
}

const categoryEmoji: CSSProperties = {
  fontSize: 32,
  marginBottom: 8,
}

const sealedText: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}

const sealedLabel: CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
  color: THEME.textPrimary,
  fontFamily: DISPLAY_FONT,
}

const sealedTagline: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  fontStyle: 'italic',
}

const statusDot = (active: boolean): CSSProperties => ({
  position: 'absolute',
  top: 16,
  right: 16,
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: active ? THEME.accent : THEME.textMuted,
  boxShadow: active ? `0 0 12px ${THEME.accentGlow}` : 'none',
})

const unsealRipple: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 20,
  border: `2px solid ${THEME.accent}`,
  pointerEvents: 'none',
}

const unsealFlash: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 20,
  background: THEME.accent,
  pointerEvents: 'none',
}

const artifactCard: CSSProperties = {
  padding: 28,
  borderRadius: 24,
  background: THEME.panelStrong,
  border: `2px solid ${THEME.accent}`,
  boxShadow: `0 0 40px ${THEME.accentGlow}`,
}

const artifactHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 20,
}

const artifactHeaderLeft: CSSProperties = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
}

const artifactEmoji: CSSProperties = {
  fontSize: 40,
}

const artifactTitle: CSSProperties = {
  fontSize: 24,
  fontWeight: 900,
  fontFamily: DISPLAY_FONT,
  color: THEME.textPrimary,
}

const artifactTagline: CSSProperties = {
  fontSize: 14,
  color: THEME.textMuted,
  fontStyle: 'italic',
}

const closeBtn: CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: 'transparent',
  border: `1px solid ${THEME.softBorder}`,
  color: THEME.textSecondary,
  fontSize: 16,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const divider: CSSProperties = {
  height: 1,
  background: `linear-gradient(90deg, transparent, ${THEME.accent}, transparent)`,
  marginBottom: 20,
  transformOrigin: 'left',
}

const primer: CSSProperties = {
  fontSize: 14,
  fontStyle: 'italic',
  color: THEME.textMuted,
  marginBottom: 20,
  textAlign: 'center',
}

const whySection: CSSProperties = {
  padding: 20,
  borderRadius: 16,
  background: 'rgba(0,0,0,0.3)',
  border: `1px solid ${THEME.hairline}`,
  marginBottom: 20,
}

const sectionLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 1.5,
  color: THEME.accent,
  marginBottom: 12,
}

const whyContent: CSSProperties = {
  display: 'grid',
  gap: 14,
}

const whyParagraph: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.8,
  color: THEME.textSecondary,
  margin: 0,
}

const greenBlock: CSSProperties = {
  padding: 18,
  borderRadius: 14,
  background: 'rgba(100, 200, 100, 0.05)',
  border: '1px solid rgba(100, 200, 100, 0.2)',
}

const greenBlockHeader: CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  marginBottom: 12,
}

const greenAccent: CSSProperties = {
  width: 4,
  height: 24,
  borderRadius: 999,
  background: 'rgb(100, 200, 100)',
}

const greenTitle: CSSProperties = {
  fontSize: 15,
  fontWeight: 900,
  color: THEME.textPrimary,
}

const itemList: CSSProperties = {
  margin: 0,
  paddingLeft: 20,
  lineHeight: 1.8,
  color: THEME.textSecondary,
}

const listItem: CSSProperties = {
  fontSize: 14,
  marginBottom: 8,
}

const reasoning: CSSProperties = {
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
  marginTop: 12,
  marginBottom: 0,
}

const redToggle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 16px',
  borderRadius: 12,
  background: THEME.panel,
  border: `1px solid rgba(235,111,111,0.3)`,
  color: THEME.textSecondary,
  fontSize: 14,
  cursor: 'pointer',
  width: '100%',
}

const redBlock: CSSProperties = {
  marginTop: 12,
  padding: 18,
  borderRadius: 14,
  background: 'rgba(235, 111, 111, 0.08)',
  border: '1px solid rgba(235, 111, 111, 0.25)',
  overflow: 'hidden',
}

const redTitle: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  color: THEME.danger,
  marginBottom: 12,
  letterSpacing: 1,
  textTransform: 'uppercase',
}

const artifactFooter: CSSProperties = {
  marginTop: 24,
  padding: 16,
  borderRadius: 12,
  background: 'rgba(0,0,0,0.2)',
  border: `1px solid ${THEME.hairline}`,
  textAlign: 'center',
}

const footerText: CSSProperties = {
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
}

const emptyState: CSSProperties = {
  padding: 60,
  textAlign: 'center',
  borderRadius: 20,
  background: THEME.panel,
  border: `1px solid ${THEME.softBorder}`,
}

const emptyIcon: CSSProperties = {
  fontSize: 48,
  marginBottom: 16,
  filter: `drop-shadow(0 0 20px ${THEME.accentGlow})`,
}

const emptyText: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
}
