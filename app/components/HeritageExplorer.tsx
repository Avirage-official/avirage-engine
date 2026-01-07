'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HeritageData, HeritageChapter } from '@/lib/heritageData'

const THEME = {
  parchment: '#f4e8d0',
  ink: '#1a1410',
  sepia: '#8b7355',
  gold: '#c9a96a',
  sealRed: '#8b4049',
  shadow: 'rgba(26, 20, 16, 0.15)',
}

const DISPLAY_FONT = "'Cinzel', serif"
const BODY_FONT = "'Crimson Text', 'Georgia', serif"

interface HeritageExplorerProps {
  heritage: HeritageData
  code: string
}

export default function HeritageExplorer({ heritage }: HeritageExplorerProps) {
  const [activeChapter, setActiveChapter] = useState(
    heritage.chapters[0]?.id ?? ''
  )
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentChapter = heritage.chapters.find(c => c.id === activeChapter)
  const currentIndex = heritage.chapters.findIndex(c => c.id === activeChapter)

  const handleChapterChange = (chapterId: string) => {
    if (chapterId === activeChapter) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveChapter(chapterId)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <div style={containerStyle}>
      <div style={paperTextureStyle} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={headerStyle}
      >
        <div style={labelStyle}>Cultural Archive</div>
        <div style={codeNameStyle}>{heritage.codeName}</div>
        <div style={originStyle}>
          Lineage: <span style={originHighlightStyle}>{heritage.level1}</span>
          {heritage.level2 && <> × <span style={originHighlightStyle}>{heritage.level2}</span></>}
        </div>
      </motion.div>

      <div style={mainGridStyle}>
        {/* TOC */}
        <div style={tocStyle}>
          {heritage.chapters.map((chapter, idx) => (
            <ChapterButton
              key={chapter.id}
              chapter={chapter}
              index={idx + 1}
              isActive={chapter.id === activeChapter}
              onClick={() => handleChapterChange(chapter.id)}
            />
          ))}
        </div>

        {/* Content */}
        <div style={contentContainerStyle}>
          <AnimatePresence mode="wait">
            {!isTransitioning && currentChapter && (
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                style={pageStyle}
              >
                <ChapterContent chapter={currentChapter} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ============================
   CHAPTER BUTTON
============================ */

function ChapterButton({
  chapter,
  index,
  isActive,
  onClick,
}: {
  chapter: HeritageChapter
  index: number
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        cursor: 'pointer',
        background: isActive ? 'rgba(201,169,106,0.2)' : 'transparent',
        border: `2px solid ${isActive ? THEME.gold : 'transparent'}`,
      }}
    >
      {index}. {chapter.title}
    </button>
  )
}

/* ============================
   CHAPTER CONTENT
============================ */

function ChapterContent({ chapter }: { chapter: HeritageChapter }) {
  return (
    <div>
      <h2 style={{ fontFamily: DISPLAY_FONT }}>{chapter.title}</h2>
      {chapter.content.intro && <p>{chapter.content.intro}</p>}

      {chapter.content.sections.map((section, idx) => (
        <div key={idx}>
          <h3>{section.heading}</h3>
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ============================
   STYLES (unchanged)
============================ */

const containerStyle: React.CSSProperties = {
  background: THEME.parchment,
  padding: 40,
  fontFamily: BODY_FONT,
}

const paperTextureStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
}

const headerStyle: React.CSSProperties = { textAlign: 'center', marginBottom: 40 }
const labelStyle: React.CSSProperties = { fontSize: 12, letterSpacing: 2 }
const codeNameStyle: React.CSSProperties = { fontSize: 42, fontFamily: DISPLAY_FONT }
const originStyle: React.CSSProperties = { fontStyle: 'italic' }
const originHighlightStyle: React.CSSProperties = { color: THEME.gold }

const mainGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: 24,
}

const tocStyle: React.CSSProperties = { padding: 16 }
const contentContainerStyle: React.CSSProperties = {}
const pageStyle: React.CSSProperties = { padding: 32, background: '#fff' }
