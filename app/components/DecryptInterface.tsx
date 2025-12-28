'use client'

import { useState } from 'react'
import { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ReactElement } from 'react'

const THEME = {
  bg: "#0a0d12",
  panel: "rgba(255,255,255,0.03)",
  panelStrong: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.12)",
  hairline: "rgba(255,255,255,0.06)",
  textPrimary: "#e6e9ee",
  textSecondary: "#9aa3ad",
  textMuted: "rgba(154,163,173,0.6)",
  cyan: "#00d9ff",
  cyanGlow: "rgba(0,217,255,0.3)",
  gold: "#c9a96a",
  goldGlow: "rgba(201,169,106,0.3)",
}

const DISPLAY_FONT = "'Cinzel', serif"
const MONO_FONT = "'Courier New', monospace"

interface DecryptInterfaceProps {
  userCode: string
  birthDate: Date
  userName?: string
}

type NodeKey = 'numerology' | 'inverse' | 'correlation' | 'rarity' | 'oracle'

const DATA_NODES: {
  key: NodeKey
  label: string
  status: string
  shape: 'octahedron' | 'pyramid' | 'rings' | 'crystal' | 'sphere'
}[] = [
  { key: 'numerology', label: 'NUMEROLOGY PROTOCOL', status: 'ENCRYPTED', shape: 'octahedron' },
  { key: 'inverse', label: 'INVERSE ANALYSIS', status: 'ENCRYPTED', shape: 'pyramid' },
  { key: 'correlation', label: 'PATTERN CORRELATION', status: 'ENCRYPTED', shape: 'rings' },
  { key: 'rarity', label: 'STATISTICAL RARITY', status: 'ENCRYPTED', shape: 'crystal' },
  { key: 'oracle', label: 'NEURAL QUERY', status: 'ENCRYPTED', shape: 'sphere' },
]

export default function DecryptInterface({ userCode, birthDate, userName }: DecryptInterfaceProps) {
  const [activeNode, setActiveNode] = useState<NodeKey | null>(null)
  const [decrypting, setDecrypting] = useState<NodeKey | null>(null)
  const [decryptedNodes, setDecryptedNodes] = useState<Set<NodeKey>>(new Set())

  const handleDecrypt = (key: NodeKey) => {
    if (decrypting || activeNode === key) return

    setDecrypting(key)
    setTimeout(() => {
      setActiveNode(key)
      setDecryptedNodes(prev => new Set([...prev, key]))
      setDecrypting(null)
    }, 1200) // Decryption sequence duration
  }

  const handleClose = () => {
    setActiveNode(null)
  }

  return (
    <section style={sectionStyle}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={header}
      >
        <div style={headerTop}>
          <div style={headerLabel}>PATTERN DECRYPTION INTERFACE</div>
          <div style={headerMeta}>
            <span style={metaItem}>USER ID: {userCode}</span>
            <span style={metaDivider}>|</span>
            <span style={metaItem}>STATUS: {decryptedNodes.size}/5</span>
          </div>
        </div>
        <div style={headerSubtitle}>
          Encrypted insights derived from your cultural pattern analysis
        </div>
      </motion.div>

      {/* Grid of Nodes */}
      <div style={gridContainer}>
        <AnimatePresence mode="wait">
          {!activeNode && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={nodesGrid}
            >
              {DATA_NODES.map((node, idx) => (
                <EncryptedNode
                  key={node.key}
                  node={node}
                  index={idx}
                  isDecrypting={decrypting === node.key}
                  isDecrypted={decryptedNodes.has(node.key)}
                  onClick={() => handleDecrypt(node.key)}
                />
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={instruction}
              >
                <ScanlineEffect />
                <span>SELECT NODE TO INITIATE DECRYPTION</span>
              </motion.div>
            </motion.div>
          )}

          {activeNode && (
            <DecryptedPanel
              nodeKey={activeNode}
              userCode={userCode}
              birthDate={birthDate}
              userName={userName}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ============================
   ENCRYPTED NODE
============================ */

interface EncryptedNodeProps {
  node: typeof DATA_NODES[0]
  index: number
  isDecrypting: boolean
  isDecrypted: boolean
  onClick: () => void
}

function EncryptedNode({ node, index, isDecrypting, isDecrypted, onClick }: EncryptedNodeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={nodeContainer}
    >
      {/* Glow effect */}
      <AnimatePresence>
        {(isHovered || isDecrypting) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              ...glowLayer,
              background: isDecrypted
                ? `radial-gradient(circle, ${THEME.goldGlow}, transparent 70%)`
                : `radial-gradient(circle, ${THEME.cyanGlow}, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Wireframe Shape */}
      <div style={shapeContainer}>
        <GeometricShape
          shape={node.shape}
          isDecrypting={isDecrypting}
          isDecrypted={isDecrypted}
          isHovered={isHovered}
        />
      </div>

      {/* Encrypted overlay */}
      {!isDecrypted && (
        <div style={encryptedOverlay}>
          <EncryptedText isHovered={isHovered} />
          <ScanlineEffect />
        </div>
      )}

      {/* Label */}
      <div style={nodeLabel}>
        <div style={nodeLabelText}>{node.label}</div>
        <div style={nodeStatus}>
          <StatusIndicator isDecrypted={isDecrypted} isDecrypting={isDecrypting} />
          <span style={statusText}>
            {isDecrypting ? 'DECRYPTING...' : isDecrypted ? 'DECRYPTED' : 'ENCRYPTED'}
          </span>
        </div>
      </div>

      {/* Decryption animation */}
      <AnimatePresence>
        {isDecrypting && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              style={decryptRipple}
            />
            <GlitchEffect />
          </>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ============================
   GEOMETRIC SHAPES
============================ */

interface GeometricShapeProps {
  shape: string
  isDecrypting: boolean
  isDecrypted: boolean
  isHovered: boolean
}

function GeometricShape({ shape, isDecrypting, isDecrypted, isHovered }: GeometricShapeProps) {
  const color = isDecrypted ? THEME.gold : THEME.cyan
  
  const shapes: Record<string, ReactElement> = {
    octahedron: (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <motion.g
          animate={isDecrypting ? {
            rotateY: [0, 180, 360],
            scale: [1, 1.5, 0],
          } : {
            rotateY: isHovered ? 360 : 0,
          }}
          transition={isDecrypting ? { duration: 1.2 } : { duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
          <line x1="50" y1="20" x2="50" y2="80" stroke={color} strokeWidth="1" opacity="0.4" />
          <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="1" opacity="0.4" />
        </motion.g>
      </svg>
    ),
    pyramid: (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <motion.g
          animate={isDecrypting ? { scale: [1, 0.5, 0], rotateX: [0, 180] } : {}}
          transition={{ duration: 1.2 }}
        >
          <polygon points="50,25 75,75 25,75" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
          <line x1="50" y1="25" x2="50" y2="75" stroke={color} strokeWidth="1" opacity="0.4" />
        </motion.g>
      </svg>
    ),
    rings: (
      <svg width="100" height="100" viewBox="0 0 100 100">
        {[25, 35, 45].map((r, i) => (
          <motion.circle
            key={i}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
            animate={isDecrypting ? {
              r: [r, r * 2, 0],
              opacity: [0.6, 0.3, 0],
            } : {
              rotate: isHovered ? 360 : 0,
            }}
            transition={isDecrypting ? { duration: 1.2, delay: i * 0.1 } : { duration: 3 + i, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50% 50%' }}
          />
        ))}
      </svg>
    ),
    crystal: (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <motion.g
          animate={isDecrypting ? { scale: [1, 1.5, 0], rotate: [0, 45, 90] } : {}}
          transition={{ duration: 1.2 }}
        >
          <polygon points="50,20 70,40 70,60 50,80 30,60 30,40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
          <line x1="50" y1="20" x2="50" y2="80" stroke={color} strokeWidth="1" opacity="0.4" />
          <line x1="30" y1="40" x2="70" y2="60" stroke={color} strokeWidth="1" opacity="0.4" />
        </motion.g>
      </svg>
    ),
    sphere: (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.8"
          animate={isDecrypting ? {
            r: [30, 50, 0],
            opacity: [0.8, 0.3, 0],
          } : {
            r: isHovered ? [30, 32, 30] : 30,
          }}
          transition={isDecrypting ? { duration: 1.2 } : { duration: 2, repeat: Infinity }}
        />
      </svg>
    ),
  }

  return shapes[shape] || shapes.sphere
}

/* ============================
   EFFECTS
============================ */

function EncryptedText({ isHovered }: { isHovered: boolean }) {
  const chars = '01ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
  const [text, setText] = useState('')

  useState(() => {
    const interval = setInterval(() => {
      setText(Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * chars.length)]).join(''))
    }, isHovered ? 50 : 200)
    return () => clearInterval(interval)
  })

  return (
    <div style={encryptedTextStyle}>
      {text}
    </div>
  )
}

function ScanlineEffect() {
  return (
    <motion.div
      animate={{ y: ['0%', '100%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      style={scanline}
    />
  )
}

function GlitchEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0, 1, 0],
        x: [-2, 2, -2, 2, 0],
      }}
      transition={{ duration: 0.3, times: [0, 0.2, 0.4, 0.6, 1] }}
      style={glitchLayer}
    />
  )
}

function StatusIndicator({ isDecrypted, isDecrypting }: { isDecrypted: boolean; isDecrypting: boolean }) {
  return (
    <motion.div
      animate={isDecrypting ? {
        opacity: [1, 0.3, 1],
        scale: [1, 1.2, 1],
      } : {}}
      transition={isDecrypting ? { duration: 0.5, repeat: Infinity } : {}}
      style={{
        ...statusDot,
        background: isDecrypted ? THEME.gold : isDecrypting ? THEME.cyan : THEME.textMuted,
        boxShadow: isDecrypted
          ? `0 0 10px ${THEME.goldGlow}`
          : isDecrypting
          ? `0 0 10px ${THEME.cyanGlow}`
          : 'none',
      }}
    />
  )
}

/* ============================
   DECRYPTED PANEL
============================ */

interface DecryptedPanelProps {
  nodeKey: NodeKey
  userCode: string
  birthDate: Date
  userName?: string
  onClose: () => void
}

function DecryptedPanel({ nodeKey, userCode, birthDate, userName, onClose }: DecryptedPanelProps) {
  return (
    <motion.div
      key="panel"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={panelContainer}
    >
      {/* Header */}
      <div style={panelHeader}>
        <div style={panelHeaderLeft}>
          <div style={panelIcon}>
            <GeometricShape shape={DATA_NODES.find(n => n.key === nodeKey)!.shape} isDecrypting={false} isDecrypted={true} isHovered={false} />
          </div>
          <div>
            <div style={panelTitle}>{DATA_NODES.find(n => n.key === nodeKey)!.label}</div>
            <div style={panelSubtitle}>DECRYPTION COMPLETE</div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={closeButton}
        >
          ✕
        </motion.button>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={dividerLine}
      />

      {/* Content */}
      <div style={panelContent}>
        <PanelContent nodeKey={nodeKey} userCode={userCode} birthDate={birthDate} userName={userName} />
      </div>
    </motion.div>
  )
}

function PanelContent({ nodeKey, userCode, birthDate, userName }: Omit<DecryptedPanelProps, 'onClose'>) {
  const content: Record<NodeKey, JSX.Element> = {
    numerology: <NumerologyContent birthDate={birthDate} userName={userName} />,
    inverse: <InverseContent userCode={userCode} />,
    correlation: <CorrelationContent userCode={userCode} />,
    rarity: <RarityContent userCode={userCode} />,
    oracle: <OracleContent userCode={userCode} />,
  }

  return content[nodeKey]
}

// Placeholder content components
function NumerologyContent({ birthDate, userName }: { birthDate: Date; userName?: string }) {
  // Calculate Life Path Number
  const calculateLifePath = (date: Date) => {
    const dateStr = date.getFullYear().toString() + 
                    (date.getMonth() + 1).toString().padStart(2, '0') + 
                    date.getDate().toString().padStart(2, '0')
    let sum = dateStr.split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    return sum
  }

  const lifePath = calculateLifePath(birthDate)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      style={contentSection}
    >
      <div style={dataLabel}>LIFE PATH NUMBER</div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: 'spring' }}
        style={lifePathNumber}
      >
        {lifePath}
      </motion.div>
      <div style={dataDescription}>
        Your life path number reveals core patterns that align with your {userCode} cultural code.
        {userName && ` Additional expression analysis available for "${userName}".`}
      </div>
      <div style={dataNote}>
        Full numerology breakdown: birth date matrix, personal year cycles, and name resonance analysis.
      </div>
    </motion.div>
  )
}

function InverseContent({ userCode }: { userCode: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={contentSection}>
      <div style={dataLabel}>INVERSE PATTERN ANALYSIS</div>
      <div style={dataDescription}>
        Shadow behaviors and environments that drain your {userCode} energy signature.
      </div>
      <div style={dataNote}>
        [Full inverse analysis: antipodes, friction zones, and recovery protocols]
      </div>
    </motion.div>
  )
}

function CorrelationContent({ userCode }: { userCode: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={contentSection}>
      <div style={dataLabel}>FRAMEWORK CORRELATION MATRIX</div>
      <div style={dataDescription}>
        Cross-validation patterns where all 4 frameworks agree on your {userCode} alignment.
      </div>
      <div style={dataNote}>
        [Network visualization: Big 5 ↔ MBTI ↔ Enneagram ↔ Astrology convergence points]
      </div>
    </motion.div>
  )
}

function RarityContent({ userCode }: { userCode: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={contentSection}>
      <div style={dataLabel}>STATISTICAL DISTRIBUTION</div>
      <div style={dataDescription}>
        Your {userCode} pattern combination exists in approximately 8.7% of population samples.
      </div>
      <div style={dataNote}>
        [Rarity metrics: percentile ranking, unique trait combinations, outlier factors]
      </div>
    </motion.div>
  )
}

function OracleContent({ userCode }: { userCode: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={contentSection}>
      <div style={dataLabel}>NEURAL QUERY INTERFACE</div>
      <div style={dataDescription}>
        Interactive analysis session: ask questions, receive {userCode}-filtered insights.
      </div>
      <div style={dataNote}>
        [Conversational AI interface: pattern-aware responses, contextual guidance]
      </div>
    </motion.div>
  )
}

/* ============================
   STYLES
============================ */

const sectionStyle: CSSProperties = {
  minHeight: '100vh',
  padding: '40px 20px',
  background: THEME.bg,
}

const header: CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto 60px',
}

const headerTop: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
  flexWrap: 'wrap',
  gap: 16,
}

const headerLabel: CSSProperties = {
  fontFamily: MONO_FONT,
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: 2,
  color: THEME.cyan,
}

const headerMeta: CSSProperties = {
  display: 'flex',
  gap: 12,
  fontFamily: MONO_FONT,
  fontSize: 12,
  color: THEME.textMuted,
}

const metaItem: CSSProperties = {}
const metaDivider: CSSProperties = { opacity: 0.3 }

const headerSubtitle: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  fontStyle: 'italic',
}

const gridContainer: CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  minHeight: 600,
  position: 'relative',
}

const nodesGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: 24,
  marginBottom: 40,
}

const nodeContainer: CSSProperties = {
  position: 'relative',
  padding: 24,
  borderRadius: 16,
  background: THEME.panel,
  border: `1px solid ${THEME.hairline}`,
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  minHeight: 280,
  justifyContent: 'center',
  perspective: '1000px',
}

const glowLayer: CSSProperties = {
  position: 'absolute',
  inset: -20,
  borderRadius: 16,
  opacity: 0.6,
  pointerEvents: 'none',
  zIndex: 0,
}

const shapeContainer: CSSProperties = {
  position: 'relative',
  zIndex: 1,
}

const encryptedOverlay: CSSProperties = {
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 2,
}

const encryptedTextStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  fontFamily: MONO_FONT,
  fontSize: 10,
  color: THEME.cyan,
  opacity: 0.2,
  lineHeight: 1.2,
  wordWrap: 'break-word',
  padding: 8,
}

const scanline: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: 2,
  background: `linear-gradient(transparent, ${THEME.cyan}, transparent)`,
  opacity: 0.3,
  pointerEvents: 'none',
}

const nodeLabel: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
}

const nodeLabelText: CSSProperties = {
  fontFamily: MONO_FONT,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 1.5,
  color: THEME.textPrimary,
  marginBottom: 8,
}

const nodeStatus: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  justifyContent: 'center',
}

const statusDot: CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: '50%',
}

const statusText: CSSProperties = {
  fontFamily: MONO_FONT,
  fontSize: 10,
  letterSpacing: 1,
  color: THEME.textMuted,
}

const decryptRipple: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 16,
  border: `2px solid ${THEME.cyan}`,
  pointerEvents: 'none',
  zIndex: 10,
}

const glitchLayer: CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: THEME.cyan,
  mixBlendMode: 'overlay',
  opacity: 0.3,
  pointerEvents: 'none',
  zIndex: 10,
}

const instruction: CSSProperties = {
  gridColumn: '1 / -1',
  textAlign: 'center',
  padding: 20,
  borderRadius: 12,
  background: THEME.panel,
  border: `1px solid ${THEME.hairline}`,
  fontFamily: MONO_FONT,
  fontSize: 11,
  letterSpacing: 2,
  color: THEME.textMuted,
  position: 'relative',
  overflow: 'hidden',
}

const panelContainer: CSSProperties = {
  padding: 32,
  borderRadius: 20,
  background: THEME.panelStrong,
  border: `2px solid ${THEME.gold}`,
  boxShadow: `0 0 40px ${THEME.goldGlow}`,
}

const panelHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 24,
}

const panelHeaderLeft: CSSProperties = {
  display: 'flex',
  gap: 20,
  alignItems: 'center',
}

const panelIcon: CSSProperties = {
  width: 60,
  height: 60,
}

const panelTitle: CSSProperties = {
  fontFamily: MONO_FONT,
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: 2,
  color: THEME.textPrimary,
  marginBottom: 4,
}

const panelSubtitle: CSSProperties = {
  fontFamily: MONO_FONT,
  fontSize: 11,
  letterSpacing: 1,
  color: THEME.gold,
}

const closeButton: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: 'transparent',
  border: `1px solid ${THEME.border}`,
  color: THEME.textSecondary,
  fontSize: 18,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const dividerLine: CSSProperties = {
  height: 1,
  background: `linear-gradient(90deg, transparent, ${THEME.gold}, transparent)`,
  marginBottom: 32,
  transformOrigin: 'left',
}

const panelContent: CSSProperties = {
  minHeight: 300,
}

const contentSection: CSSProperties = {
  padding: 24,
  borderRadius: 12,
  background: 'rgba(0,0,0,0.3)',
  border: `1px solid ${THEME.hairline}`,
}

const dataLabel: CSSProperties = {
  fontFamily: MONO_FONT,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 2,
  color: THEME.cyan,
  marginBottom: 20,
}

const lifePathNumber: CSSProperties = {
  fontSize: 80,
  fontFamily: DISPLAY_FONT,
  fontWeight: 900,
  color: THEME.gold,
  textAlign: 'center',
  margin: '20px 0',
  textShadow: `0 0 30px ${THEME.goldGlow}`,
}

const dataDescription: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.8,
  color: THEME.textSecondary,
  marginBottom: 20,
}

const dataNote: CSSProperties = {
  fontSize: 13,
  fontStyle: 'italic',
  color: THEME.textMuted,
  padding: 16,
  borderLeft: `2px solid ${THEME.hairline}`,
  background: 'rgba(255,255,255,0.02)',
}
