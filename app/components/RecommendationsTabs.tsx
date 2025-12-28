'use client'

import { useState } from 'react'
import { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RECOMMENDATIONS, CategoryRecommendation } from '@/lib/recommendationsData'
import type { ReactElement } from 'react'

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
        <p style={{ color: THEME.textSecondary, textAlign: 'center' }}>
          Recommendations coming soon for {primaryCode}
        </p>
      </section>
    )
  }

  const handleSealClick = (key: CategoryKey) => {
    if (openCategory === key) {
      setOpenCategory(null)
    } else {
      setUnsealing(key)
      setTimeout(() => {
        setOpenCategory(key)
        setUnsealing(null)
      }, 1000)
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
          Encoded knowledge from your {primaryCode} lineage. Break the seals to unlock guidance.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={gridStyle}>
        {CATEGORIES.map((cat, idx) => {
          const isOpen = openCategory === cat.key
          const isUnsealing = unsealing === cat.key
          const category = codeRecs[cat.key]
          const hasContent = !!(category?.why && typeof category.why === 'string' && !category.why.includes('coming next'))

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              style={{ gridColumn: isOpen ? '1 / -1' : 'span 1' }}
            >
              {!isOpen && (
                <SealedCard
                  category={cat}
                  hasContent={hasContent}
                  isUnsealing={isUnsealing}
                  onClick={() => hasContent && handleSealClick(cat.key)}
                />
              )}

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
      {/* Glow on hover */}
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

      {/* Geometric Symbol */}
      <div style={symbolContainer}>
        <GeometricSymbol
          categoryKey={category.key}
          isActive={hasContent}
          isHovered={isHovered}
          isUnsealing={isUnsealing}
        />
      </div>

      {/* Text */}
      <div style={sealedText}>
        <div style={sealedLabel}>{category.label}</div>
        <div style={sealedTagline}>{category.tagline}</div>
      </div>

      {/* Status */}
      <div style={statusDot(hasContent)} />

      {/* Unseal effect */}
      <AnimatePresence>
        {isUnsealing && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={unsealRipple}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1 }}
              style={unsealFlash}
            />
          </>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ============================
   GEOMETRIC SYMBOLS
============================ */

interface GeometricSymbolProps {
  categoryKey: CategoryKey
  isActive: boolean
  isHovered: boolean
  isUnsealing: boolean
}

function GeometricSymbol({ categoryKey, isActive, isHovered, isUnsealing }: GeometricSymbolProps) {
  const symbols: Record<CategoryKey, ReactElement> = {
    locations: <RotatingHexagon isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    work: <PulsingGrid isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    community: <InterlockingCircles isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    activities: <MorphingTriangle isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    learning: <ExpandingPages isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    media: <SoundWaveRipple isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    living: <NestedSquares isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    rituals: <CircularMandala isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    movement: <FlowingSineWave isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    wellness: <BreathingCircle isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    products: <RotatingCube isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
    travel: <OrbitalRings isActive={isActive} isHovered={isHovered} isUnsealing={isUnsealing} />,
  }

  return symbols[categoryKey]
}

// LOCATIONS - Rotating Hexagon
function RotatingHexagon({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <motion.polygon
        points="50,10 90,30 90,70 50,90 10,70 10,30"
        fill="none"
        stroke={isActive ? THEME.accent : THEME.textMuted}
        strokeWidth="2"
        animate={isUnsealing ? {
          scale: [1, 1.5, 0],
          rotate: [0, 180, 360],
          opacity: [1, 0.5, 0],
        } : {
          rotate: isHovered ? [0, 360] : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={isUnsealing ? { duration: 1 } : {
          rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.3 },
        }}
        style={{ filter: isActive ? `drop-shadow(0 0 8px ${THEME.accentGlow})` : 'none' }}
      />
      {/* Inner lines */}
      <motion.line x1="50" y1="10" x2="50" y2="90" stroke={THEME.accent} strokeWidth="1" opacity="0.3"
        animate={{ opacity: isHovered ? [0.3, 0.7, 0.3] : 0.3 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  )
}

// WORK - Pulsing Grid
function PulsingGrid({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <motion.g
        animate={isUnsealing ? {
          scale: [1, 0.5, 0],
          opacity: [1, 0],
        } : {
          scale: isHovered ? [1, 1.05, 1] : 1,
        }}
        transition={isUnsealing ? { duration: 1 } : { duration: 1.5, repeat: Infinity }}
      >
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col => (
            <rect
              key={`${row}-${col}`}
              x={10 + col * 30}
              y={10 + row * 30}
              width="20"
              height="20"
              fill="none"
              stroke={isActive ? THEME.accent : THEME.textMuted}
              strokeWidth="2"
              style={{ filter: isActive ? `drop-shadow(0 0 4px ${THEME.accentGlow})` : 'none' }}
            />
          ))
        )}
      </motion.g>
    </svg>
  )
}

// COMMUNITY - Interlocking Circles
function InterlockingCircles({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <motion.circle cx="35" cy="50" r="20" fill="none" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="2"
        animate={isUnsealing ? { scale: [1, 2, 0], opacity: [1, 0] } : { x: isHovered ? [-2, 2, -2] : 0 }}
        transition={isUnsealing ? { duration: 1 } : { duration: 2, repeat: Infinity }}
        style={{ filter: isActive ? `drop-shadow(0 0 6px ${THEME.accentGlow})` : 'none' }}
      />
      <motion.circle cx="65" cy="50" r="20" fill="none" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="2"
        animate={isUnsealing ? { scale: [1, 2, 0], opacity: [1, 0] } : { x: isHovered ? [2, -2, 2] : 0 }}
        transition={isUnsealing ? { duration: 1, delay: 0.1 } : { duration: 2, repeat: Infinity }}
        style={{ filter: isActive ? `drop-shadow(0 0 6px ${THEME.accentGlow})` : 'none' }}
      />
    </svg>
  )
}

// ACTIVITIES - Morphing Triangle
function MorphingTriangle({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <motion.polygon
        points="50,20 80,80 20,80"
        fill="none"
        stroke={isActive ? THEME.accent : THEME.textMuted}
        strokeWidth="2"
        animate={isUnsealing ? {
          scale: [1, 1.5, 0],
          rotate: [0, 120, 240],
          opacity: [1, 0],
        } : {
          rotate: isHovered ? [0, 15, -15, 0] : 0,
        }}
        transition={isUnsealing ? { duration: 1 } : { duration: 2, repeat: Infinity }}
        style={{ filter: isActive ? `drop-shadow(0 0 8px ${THEME.accentGlow})` : 'none', transformOrigin: '50% 60%' }}
      />
    </svg>
  )
}

// LEARNING - Expanding Pages
function ExpandingPages({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      {[0, 1, 2].map(i => (
        <motion.rect
          key={i}
          x={25 + i * 5}
          y={20}
          width="40"
          height="60"
          fill="none"
          stroke={isActive ? THEME.accent : THEME.textMuted}
          strokeWidth="2"
          rx="2"
          animate={isUnsealing ? {
            x: [25 + i * 5, 25 + i * 15, 25 + i * 30],
            opacity: [1, 0.5, 0],
          } : {
            x: isHovered ? 25 + i * 8 : 25 + i * 5,
          }}
          transition={isUnsealing ? { duration: 1, delay: i * 0.1 } : { duration: 0.3 }}
          style={{ filter: isActive ? `drop-shadow(0 0 4px ${THEME.accentGlow})` : 'none' }}
        />
      ))}
    </svg>
  )
}

// MEDIA - Sound Wave Ripple
function SoundWaveRipple({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      {[30, 40, 50, 60, 70].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1="50"
          x2={x}
          y2="50"
          stroke={isActive ? THEME.accent : THEME.textMuted}
          strokeWidth="3"
          strokeLinecap="round"
          animate={isUnsealing ? {
            y1: [50, 30, 70, 50],
            y2: [50, 70, 30, 50],
            opacity: [1, 0],
          } : {
            y1: isHovered ? [50, 30 + i * 2, 70 - i * 2] : 50,
            y2: isHovered ? [50, 70 - i * 2, 30 + i * 2] : 50,
          }}
          transition={isUnsealing ? { duration: 1, delay: i * 0.05 } : {
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.1,
          }}
          style={{ filter: isActive ? `drop-shadow(0 0 4px ${THEME.accentGlow})` : 'none' }}
        />
      ))}
    </svg>
  )
}

// LIVING - Nested Squares
function NestedSquares({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      {[15, 25, 35].map((offset, i) => (
        <motion.rect
          key={i}
          x={offset}
          y={offset}
          width={100 - offset * 2}
          height={100 - offset * 2}
          fill="none"
          stroke={isActive ? THEME.accent : THEME.textMuted}
          strokeWidth="2"
          animate={isUnsealing ? {
            scale: [1, 1.5 + i * 0.3, 0],
            opacity: [1, 0],
          } : {
            rotate: isHovered ? [0, 5 * (i + 1), -5 * (i + 1), 0] : 0,
          }}
          transition={isUnsealing ? { duration: 1, delay: i * 0.15 } : { duration: 3, repeat: Infinity }}
          style={{ filter: isActive ? `drop-shadow(0 0 4px ${THEME.accentGlow})` : 'none', transformOrigin: '50% 50%' }}
        />
      ))}
    </svg>
  )
}

// RITUALS - Circular Mandala
function CircularMandala({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <motion.circle cx="50" cy="50" r="30" fill="none" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="2"
        animate={isUnsealing ? { scale: [1, 2, 0], opacity: [1, 0] } : {}}
        transition={{ duration: 1 }}
        style={{ filter: isActive ? `drop-shadow(0 0 8px ${THEME.accentGlow})` : 'none' }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line
          key={i}
          x1="50"
          y1="50"
          x2={50 + 25 * Math.cos(angle * Math.PI / 180)}
          y2={50 + 25 * Math.sin(angle * Math.PI / 180)}
          stroke={isActive ? THEME.accent : THEME.textMuted}
          strokeWidth="1"
          animate={isUnsealing ? {
            x2: 50 + 50 * Math.cos(angle * Math.PI / 180),
            y2: 50 + 50 * Math.sin(angle * Math.PI / 180),
            opacity: [1, 0],
          } : {
            opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3,
          }}
          transition={isUnsealing ? { duration: 1, delay: i * 0.05 } : { duration: 2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </svg>
  )
}

// MOVEMENT - Flowing Sine Wave
function FlowingSineWave({ isActive, isHovered, isUnsealing }: any) {
  const points = Array.from({ length: 50 }, (_, i) => {
    const x = i * 2
    const y = 50 + 20 * Math.sin((i / 5) * Math.PI)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <motion.polyline
        points={points}
        fill="none"
        stroke={isActive ? THEME.accent : THEME.textMuted}
        strokeWidth="2"
        strokeLinecap="round"
        animate={isUnsealing ? {
          pathLength: [1, 0],
          opacity: [1, 0],
        } : {
          x: isHovered ? [0, -10, 0] : 0,
        }}
        transition={isUnsealing ? { duration: 1 } : { duration: 2, repeat: Infinity }}
        style={{ filter: isActive ? `drop-shadow(0 0 6px ${THEME.accentGlow})` : 'none' }}
      />
    </svg>
  )
}

// WELLNESS - Breathing Circle
function BreathingCircle({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <motion.circle
        cx="50"
        cy="50"
        r="25"
        fill="none"
        stroke={isActive ? THEME.accent : THEME.textMuted}
        strokeWidth="2"
        animate={isUnsealing ? {
          r: [25, 50, 0],
          opacity: [1, 0.5, 0],
        } : {
          r: isHovered ? [25, 30, 25] : 25,
        }}
        transition={isUnsealing ? { duration: 1 } : {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{ filter: isActive ? `drop-shadow(0 0 10px ${THEME.accentGlow})` : 'none' }}
      />
    </svg>
  )
}

// PRODUCTS - Rotating Cube (2D projection)
function RotatingCube({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <motion.g
        animate={isUnsealing ? {
          rotate: [0, 180, 360],
          scale: [1, 1.5, 0],
          opacity: [1, 0],
        } : {
          rotate: isHovered ? [0, 360] : 0,
        }}
        transition={isUnsealing ? { duration: 1 } : { duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '50% 50%' }}
      >
        <rect x="25" y="25" width="30" height="30" fill="none" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="2"
          style={{ filter: isActive ? `drop-shadow(0 0 6px ${THEME.accentGlow})` : 'none' }}
        />
        <rect x="35" y="35" width="30" height="30" fill="none" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="2" />
        <line x1="25" y1="25" x2="35" y2="35" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="1" />
        <line x1="55" y1="25" x2="65" y2="35" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="1" />
        <line x1="25" y1="55" x2="35" y2="65" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="1" />
        <line x1="55" y1="55" x2="65" y2="65" stroke={isActive ? THEME.accent : THEME.textMuted} strokeWidth="1" />
      </motion.g>
    </svg>
  )
}

// TRAVEL - Orbital Rings
function OrbitalRings({ isActive, isHovered, isUnsealing }: any) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100">
      {[20, 30, 40].map((r, i) => (
        <motion.circle
          key={i}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={isActive ? THEME.accent : THEME.textMuted}
          strokeWidth="2"
          animate={isUnsealing ? {
            r: [r, r * 2, r * 3],
            opacity: [1, 0.5, 0],
          } : {
            rotate: isHovered ? [0, 360] : 0,
          }}
          transition={isUnsealing ? { duration: 1, delay: i * 0.1 } : {
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ filter: isActive ? `drop-shadow(0 0 6px ${THEME.accentGlow})` : 'none', transformOrigin: '50% 50%' }}
        />
      ))}
      <circle cx="50" cy="50" r="5" fill={isActive ? THEME.accent : THEME.textMuted} />
    </svg>
  )
}

/* ============================
   OPENED ARTIFACT (Same as before)
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
      {/* Header */}
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

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={divider}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={primer}
      >
        This knowledge was encoded for people like you.
      </motion.p>

      {/* WHY */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={whySection}
      >
        <div style={sectionLabel}>THE TRUTH</div>
        <div style={whyContent}>
          {content.why.split('\n\n').map((p, i) => (
            <p key={i} style={whyParagraph}>{renderMarkdown(p)}</p>
          ))}
        </div>
      </motion.div>

      {/* GREEN */}
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
                <li key={i} style={listItem}>{renderMarkdown(item)}</li>
              ))}
            </ul>
            {g.reasoning && <p style={reasoning}>{renderMarkdown(g.reasoning)}</p>}
          </motion.div>
        ))}
      </div>

      {/* RED */}
      {content.redLight?.items?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: 20 }}
        >
          <button onClick={() => setShowRed(!showRed)} style={redToggle}>
            <span style={{ color: THEME.danger }}>⚠</span>
            <span>{showRed ? 'Hide friction signals' : 'What drains this pattern'}</span>
            <motion.span animate={{ rotate: showRed ? 180 : 0 }} style={{ display: 'inline-block', marginLeft: 8 }}>▾</motion.span>
          </button>

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
                {content.redLight.reasoning && <p style={reasoning}>{renderMarkdown(content.redLight.reasoning)}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

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

const sectionStyle: CSSProperties = { marginBottom: 64 }
const headerSection: CSSProperties = { marginBottom: 32, textAlign: 'center' }
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
const mainSubtitle: CSSProperties = { fontSize: 16, color: THEME.textSecondary, marginBottom: 20, lineHeight: 1.6 }
const gridStyle: CSSProperties = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 20, 
  alignItems: 'start' 
}
const sealedCard: CSSProperties = {
  position: 'relative',
  padding: 20,
  borderRadius: 20,
  background: THEME.panel,
  border: `1px solid ${THEME.softBorder}`,
  textAlign: 'center',
  overflow: 'hidden',
  minHeight: 180,
  aspectRatio: '1 / 1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}
const glowLayer: CSSProperties = {
  position: 'absolute',
  inset: -2,
  borderRadius: 20,
  background: `radial-gradient(circle at 50% 50%, ${THEME.accentGlow}, transparent 70%)`,
  opacity: 0.6,
  pointerEvents: 'none',
}
const symbolContainer: CSSProperties = { marginBottom: 4, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }
const sealedText: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4 }
const sealedLabel: CSSProperties = { fontSize: 16, fontWeight: 900, color: THEME.textPrimary, fontFamily: DISPLAY_FONT, letterSpacing: 0.5 }
const sealedTagline: CSSProperties = { fontSize: 12, color: THEME.textMuted, fontStyle: 'italic' }
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
const artifactHeader: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }
const artifactHeaderLeft: CSSProperties = { display: 'flex', gap: 16, alignItems: 'center' }
const artifactEmoji: CSSProperties = { fontSize: 40 }
const artifactTitle: CSSProperties = { fontSize: 24, fontWeight: 900, fontFamily: DISPLAY_FONT, color: THEME.textPrimary }
const artifactTagline: CSSProperties = { fontSize: 14, color: THEME.textMuted, fontStyle: 'italic' }
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
const primer: CSSProperties = { fontSize: 14, fontStyle: 'italic', color: THEME.textMuted, marginBottom: 20, textAlign: 'center' }
const whySection: CSSProperties = {
  padding: 20,
  borderRadius: 16,
  background: 'rgba(0,0,0,0.3)',
  border: `1px solid ${THEME.hairline}`,
  marginBottom: 20,
}
const sectionLabel: CSSProperties = { fontSize: 11, fontWeight: 900, letterSpacing: 1.5, color: THEME.accent, marginBottom: 12 }
const whyContent: CSSProperties = { display: 'grid', gap: 14 }
const whyParagraph: CSSProperties = { fontSize: 14, lineHeight: 1.8, color: THEME.textSecondary, margin: 0 }
const greenBlock: CSSProperties = {
  padding: 18,
  borderRadius: 14,
  background: 'rgba(100, 200, 100, 0.05)',
  border: '1px solid rgba(100, 200, 100, 0.2)',
}
const greenBlockHeader: CSSProperties = { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }
const greenAccent: CSSProperties = { width: 4, height: 24, borderRadius: 999, background: 'rgb(100, 200, 100)' }
const greenTitle: CSSProperties = { fontSize: 15, fontWeight: 900, color: THEME.textPrimary }
const itemList: CSSProperties = { margin: 0, paddingLeft: 20, lineHeight: 1.8, color: THEME.textSecondary }
const listItem: CSSProperties = { fontSize: 14, marginBottom: 8 }
const reasoning: CSSProperties = { fontSize: 13, fontStyle: 'italic', color: THEME.textMuted, marginTop: 12, marginBottom: 0 }
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
const footerText: CSSProperties = { fontSize: 13, fontStyle: 'italic', color: THEME.textMuted }
