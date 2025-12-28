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

export default function HeritageExplorer({ heritage, code }: HeritageExplorerProps) {
  const [activeChapter, setActiveChapter] = useState<string>(heritage.chapters[0]?.id || '')
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
      {/* Paper texture overlay */}
      <div style={paperTextureStyle} />

      {/* Ornate header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={headerStyle}
      >
        <div style={headerTopStyle}>
          <div style={labelStyle}>Cultural Archive</div>
          <div style={codeNameStyle}>{heritage.codeName}</div>
          <div style={originStyle}>
            Lineage: <span style={originHighlightStyle}>{heritage.level1}</span>
            {heritage.level2 && <> × <span style={originHighlightStyle}>{heritage.level2}</span></>}
          </div>
        </div>
        <div style={ornamentStyle}>✦</div>
      </motion.div>

      {/* Main layout: Table of Contents + Content */}
      <div style={mainGridStyle}>
        {/* LEFT: Table of Contents (Chapter Index) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={tocStyle}
        >
          <div style={tocHeaderStyle}>
            <div style={tocTitleStyle}>Contents</div>
            <div style={tocSubtitleStyle}>
              {heritage.chapters.length} chapters
            </div>
          </div>

          <div style={tocListStyle}>
            {heritage.chapters.map((chapter, idx) => (
              <ChapterButton
                key={chapter.id}
                chapter={chapter}
                index={idx + 1}
                isActive={activeChapter === chapter.id}
                onClick={() => handleChapterChange(chapter.id)}
              />
            ))}
          </div>

          {/* Progress indicator */}
          <div style={progressStyle}>
            <div style={progressLabelStyle}>Reading Progress</div>
            <div style={progressBarBgStyle}>
              <motion.div
                style={progressBarFillStyle}
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentIndex + 1) / heritage.chapters.length) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div style={progressTextStyle}>
              Chapter {currentIndex + 1} of {heritage.chapters.length}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Content Display (The Page) */}
        <div style={contentContainerStyle}>
          <AnimatePresence mode="wait">
            {!isTransitioning && currentChapter && (
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={pageStyle}
              >
                <ChapterContent chapter={currentChapter} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation arrows */}
          <div style={navArrowsStyle}>
            {currentIndex > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChapterChange(heritage.chapters[currentIndex - 1].id)}
                style={navButtonStyle}
              >
                ← Previous
              </motion.button>
            )}
            <div style={{ flex: 1 }} />
            {currentIndex < heritage.chapters.length - 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChapterChange(heritage.chapters[currentIndex + 1].id)}
                style={navButtonStyle}
              >
                Next →
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================
   CHAPTER BUTTON
============================ */

interface ChapterButtonProps {
  chapter: HeritageChapter
  index: number
  isActive: boolean
  onClick: () => void
}

function ChapterButton({ chapter, index, isActive, onClick }: ChapterButtonProps) {
  return (
    <motion.button
      whileHover={{ x: 4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        ...chapterBtnStyle,
        background: isActive ? 'rgba(139, 115, 85, 0.15)' : 'transparent',
        borderLeft: isActive ? `3px solid ${THEME.gold}` : '3px solid transparent',
      }}
    >
      <div style={chapterNumStyle}>{index}</div>
      <div style={chapterTextStyle}>
        <div style={chapterTitleStyle}>{chapter.title}</div>
        {chapter.era && <div style={chapterEraStyle}>{chapter.era}</div>}
      </div>
      {isActive && (
        <motion.div
          layoutId="activeChapter"
          style={activeIndicatorStyle}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  )
}

/* ============================
   CHAPTER CONTENT
============================ */

function ChapterContent({ chapter }: { chapter: HeritageChapter }) {
  return (
    <div style={chapterContentStyle}>
      {/* Chapter header */}
      <div style={chapterHeaderStyle}>
        <div style={chapterHeaderLabelStyle}>Chapter</div>
        <h2 style={chapterHeaderTitleStyle}>{chapter.title}</h2>
        {chapter.subtitle && (
          <p style={chapterHeaderSubtitleStyle}>{chapter.subtitle}</p>
        )}
        {chapter.era && (
          <div style={eraTagStyle}>
            <div style={eraIconStyle}>⏳</div>
            <div>{chapter.era}</div>
          </div>
        )}
      </div>

      <div style={dividerStyle} />

      {/* Intro */}
      {chapter.content.intro && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={introStyle}
        >
          <div style={dropCapContainerStyle}>
            <span style={dropCapStyle}>{chapter.content.intro[0]}</span>
            <span>{chapter.content.intro.slice(1)}</span>
          </div>
        </motion.div>
      )}

      {/* Sections */}
      <div style={sectionsContainerStyle}>
        {chapter.content.sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            style={sectionStyle}
          >
            <h3 style={sectionHeadingStyle}>{section.heading}</h3>

            {section.paragraphs.map((para, pIdx) => (
              <p key={pIdx} style={paragraphStyle}>
                {para}
              </p>
            ))}

            {/* Highlights box */}
            {section.highlights && section.highlights.length > 0 && (
              <div style={highlightsBoxStyle}>
                <div style={highlightsHeaderStyle}>Key Insights</div>
                <ul style={highlightsListStyle}>
                  {section.highlights.map((h, hIdx) => (
                    <li key={hIdx} style={highlightItemStyle}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quote */}
            {section.quote && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                style={quoteBoxStyle}
              >
                <div style={quoteMarkStyle}>"</div>
                <div style={quoteTextStyle}>{section.quote.text}</div>
                <div style={quoteAttributionStyle}>— {section.quote.attribution}</div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ============================
   STYLES
============================ */

const containerStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${THEME.parchment} 0%, #e8dcc8 100%)`,
  padding: '40px 20px',
  fontFamily: BODY_FONT,
  color: THEME.ink,
}

const paperTextureStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05' /%3E%3C/svg%3E")`,
  pointerEvents: 'none',
  opacity: 0.4,
}

const headerStyle: React.CSSProperties = {
  maxWidth: 1400,
  margin: '0 auto 40px',
  textAlign: 'center',
}

const headerTopStyle: React.CSSProperties = {
  marginBottom: 20,
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 3,
  textTransform: 'uppercase',
  color: THEME.sepia,
  marginBottom: 12,
}

const codeNameStyle: React.CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 48,
  fontWeight: 900,
  marginBottom: 8,
  color: THEME.ink,
  textShadow: `2px 2px 4px ${THEME.shadow}`,
}

const originStyle: React.CSSProperties = {
  fontSize: 15,
  color: THEME.sepia,
  fontStyle: 'italic',
}

const originHighlightStyle: React.CSSProperties = {
  color: THEME.gold,
  fontWeight: 700,
}

const ornamentStyle: React.CSSProperties = {
  fontSize: 24,
  color: THEME.gold,
  opacity: 0.6,
}

const mainGridStyle: React.CSSProperties = {
  maxWidth: 1400,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '340px 1fr',
  gap: 32,
  alignItems: 'start',
}

const tocStyle: React.CSSProperties = {
  position: 'sticky',
  top: 20,
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 16,
  padding: 24,
  boxShadow: `0 8px 32px ${THEME.shadow}`,
  border: `2px solid ${THEME.gold}`,
  backdropFilter: 'blur(10px)',
}

const tocHeaderStyle: React.CSSProperties = {
  marginBottom: 20,
  paddingBottom: 16,
  borderBottom: `1px solid rgba(139, 115, 85, 0.3)`,
}

const tocTitleStyle: React.CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  marginBottom: 4,
  color: THEME.ink,
}

const tocSubtitleStyle: React.CSSProperties = {
  fontSize: 13,
  color: THEME.sepia,
  fontStyle: 'italic',
}

const tocListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 24,
}

const chapterBtnStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: 12,
  borderRadius: 8,
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  position: 'relative',
  transition: 'all 0.2s',
}

const chapterNumStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: THEME.gold,
  color: THEME.parchment,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 900,
  flexShrink: 0,
}

const chapterTextStyle: React.CSSProperties = {
  flex: 1,
}

const chapterTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: THEME.ink,
  marginBottom: 4,
}

const chapterEraStyle: React.CSSProperties = {
  fontSize: 11,
  color: THEME.sepia,
  fontStyle: 'italic',
}

const activeIndicatorStyle: React.CSSProperties = {
  position: 'absolute',
  right: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: THEME.gold,
  boxShadow: `0 0 8px ${THEME.gold}`,
}

const progressStyle: React.CSSProperties = {
  paddingTop: 20,
  borderTop: `1px solid rgba(139, 115, 85, 0.3)`,
}

const progressLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: THEME.sepia,
  marginBottom: 8,
}

const progressBarBgStyle: React.CSSProperties = {
  height: 6,
  borderRadius: 3,
  background: 'rgba(139, 115, 85, 0.2)',
  overflow: 'hidden',
  marginBottom: 8,
}

const progressBarFillStyle: React.CSSProperties = {
  height: '100%',
  background: `linear-gradient(90deg, ${THEME.gold}, ${THEME.sepia})`,
  borderRadius: 3,
}

const progressTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: THEME.sepia,
  fontStyle: 'italic',
}

const contentContainerStyle: React.CSSProperties = {
  position: 'relative',
}

const pageStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.85)',
  borderRadius: 16,
  padding: 40,
  boxShadow: `0 12px 48px ${THEME.shadow}`,
  border: `2px solid ${THEME.gold}`,
  backdropFilter: 'blur(10px)',
  minHeight: 600,
}

const chapterContentStyle: React.CSSProperties = {}

const chapterHeaderStyle: React.CSSProperties = {
  marginBottom: 32,
}

const chapterHeaderLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: THEME.sepia,
  marginBottom: 8,
}

const chapterHeaderTitleStyle: React.CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 36,
  fontWeight: 900,
  marginBottom: 8,
  color: THEME.ink,
}

const chapterHeaderSubtitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontStyle: 'italic',
  color: THEME.sepia,
  marginBottom: 12,
}

const eraTagStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 12px',
  borderRadius: 999,
  background: 'rgba(201, 169, 106, 0.15)',
  border: `1px solid ${THEME.gold}`,
  fontSize: 12,
  fontWeight: 700,
  color: THEME.sepia,
}

const eraIconStyle: React.CSSProperties = {
  fontSize: 14,
}

const dividerStyle: React.CSSProperties = {
  height: 2,
  background: `linear-gradient(90deg, transparent, ${THEME.gold}, transparent)`,
  marginBottom: 32,
}

const introStyle: React.CSSProperties = {
  marginBottom: 32,
}

const dropCapContainerStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.8,
  color: THEME.ink,
}

const dropCapStyle: React.CSSProperties = {
  float: 'left',
  fontFamily: DISPLAY_FONT,
  fontSize: 64,
  lineHeight: 1,
  marginRight: 8,
  marginTop: 4,
  color: THEME.gold,
  fontWeight: 900,
}

const sectionsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}

const sectionStyle: React.CSSProperties = {}

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  marginBottom: 16,
  color: THEME.ink,
}

const paragraphStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.85,
  marginBottom: 16,
  color: THEME.ink,
  textAlign: 'justify',
}

const highlightsBoxStyle: React.CSSProperties = {
  marginTop: 20,
  padding: 20,
  borderRadius: 12,
  background: 'rgba(201, 169, 106, 0.1)',
  border: `2px solid ${THEME.gold}`,
}

const highlightsHeaderStyle: React.CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 14,
  fontWeight: 900,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: THEME.sepia,
  marginBottom: 12,
}

const highlightsListStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: 24,
  listStyle: 'none',
}

const highlightItemStyle: React.CSSProperties = {
  position: 'relative',
  fontSize: 14,
  lineHeight: 1.7,
  marginBottom: 8,
  color: THEME.ink,
  paddingLeft: 12,
}

const quoteBoxStyle: React.CSSProperties = {
  marginTop: 24,
  padding: 24,
  borderLeft: `4px solid ${THEME.gold}`,
  background: 'rgba(139, 115, 85, 0.08)',
  borderRadius: 8,
  position: 'relative',
}

const quoteMarkStyle: React.CSSProperties = {
  position: 'absolute',
  top: -10,
  left: 16,
  fontSize: 72,
  color: THEME.gold,
  opacity: 0.3,
  fontFamily: DISPLAY_FONT,
  lineHeight: 1,
}

const quoteTextStyle: React.CSSProperties = {
  fontSize: 16,
  fontStyle: 'italic',
  lineHeight: 1.7,
  marginBottom: 12,
  color: THEME.ink,
  position: 'relative',
  zIndex: 1,
}

const quoteAttributionStyle: React.CSSProperties = {
  fontSize: 13,
  color: THEME.sepia,
  fontWeight: 700,
}

const navArrowsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 32,
  gap: 16,
}

const navButtonStyle: React.CSSProperties = {
  padding: '12px 24px',
  borderRadius: 8,
  border: `2px solid ${THEME.gold}`,
  background: 'rgba(201, 169, 106, 0.1)',
  color: THEME.ink,
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.2s',
}
