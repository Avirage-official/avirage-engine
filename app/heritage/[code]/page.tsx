import { notFound } from 'next/navigation'
import Link from 'next/link'
import { HERITAGE_DATA } from '@/lib/heritageData'
import HeritageExplorer from '@/app/components/HeritageExplorer'

const THEME = {
  parchment: '#f4e8d0',
  ink: '#1a1410',
  gold: '#c9a96a',
}

const DISPLAY_FONT = "'Cinzel', serif"

export default async function HeritagePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const heritage = HERITAGE_DATA[code.toLowerCase()]

  if (!heritage) {
    notFound()
  }

  return (
    <main style={mainStyle}>
      {/* Navigation */}
      <nav style={navStyle}>
        <div style={navContainer}>
          <Link href="/" style={logoStyle}>
            Avirage
          </Link>
          <div style={navLinks}>
            <Link href="/dashboard" style={navLink}>
              Dashboard
            </Link>
            <Link href={`/codepages/${code.toLowerCase()}`} style={navLink}>
              Code Page
            </Link>
            <Link href={`/heritage/${code.toLowerCase()}`} style={{ ...navLink, color: THEME.gold }}>
              Heritage
            </Link>
          </div>
        </div>
      </nav>

      {/* Heritage Explorer */}
      <HeritageExplorer heritage={heritage} code={code} />
    </main>
  )
}

/* ============================
   STYLES
============================ */

const mainStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${THEME.parchment} 0%, #e8dcc8 100%)`,
}

const navStyle: React.CSSProperties = {
  borderBottom: '2px solid rgba(139, 115, 85, 0.3)',
  background: 'rgba(244, 232, 208, 0.95)',
  backdropFilter: 'blur(10px)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
}

const navContainer: React.CSSProperties = {
  maxWidth: 1400,
  margin: '0 auto',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const logoStyle: React.CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  color: THEME.gold,
  textDecoration: 'none',
  letterSpacing: 1,
}

const navLinks: React.CSSProperties = {
  display: 'flex',
  gap: 32,
  alignItems: 'center',
}

const navLink: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: THEME.ink,
  textDecoration: 'none',
  transition: 'color 0.2s',
}
