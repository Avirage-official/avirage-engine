import { auth } from '@clerk/nextjs/server'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CSSProperties } from 'react'
import DecryptInterface from '@/app/components/DecryptInterface'

const THEME = {
  bg: "#0a0d12",
  textPrimary: "#e6e9ee",
  textSecondary: "#9aa3ad",
  accent: "#c9a96a",
}

const DISPLAY_FONT = "'Cinzel', serif"

export default async function InsightsPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Get user's most recent quiz result
  const { rows } = await sql`
    SELECT * FROM quiz_results 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC 
    LIMIT 1
  `

  const latestResult = rows[0]

  if (!latestResult) {
    // No quiz results yet
    return (
      <main style={mainStyle}>
        <nav style={navStyle}>
          <div style={navContainer}>
            <Link href="/" style={logoStyle}>
              Avirage
            </Link>
            <div style={navLinks}>
              <Link href="/dashboard" style={navLink}>
                Dashboard
              </Link>
              <Link href="/quiz" style={{ ...navLink, color: THEME.accent }}>
                Take Quiz
              </Link>
            </div>
          </div>
        </nav>

        <div style={emptyContainer}>
          <div style={emptyIcon}>🔒</div>
          <h1 style={emptyTitle}>Insights Locked</h1>
          <p style={emptyText}>
            Complete the Cultural Code quiz to unlock your pattern decryption interface.
          </p>
          <Link href="/quiz" style={ctaButton}>
            Take the Quiz
          </Link>
        </div>
      </main>
    )
  }

  // Parse birth date
  const birthDate = new Date(latestResult.birth_date)
  const userName = latestResult.user_name || undefined

  return (
    <main style={mainStyle}>
      {/* Nav */}
      <nav style={navStyle}>
        <div style={navContainer}>
          <Link href="/" style={logoStyle}>
            Avirage
          </Link>
          <div style={navLinks}>
            <Link href="/dashboard" style={navLink}>
              Dashboard
            </Link>
            <Link href="/insights" style={{ ...navLink, color: THEME.accent }}>
              Insights
            </Link>
            <Link href="/quiz" style={navLink}>
              Retake Quiz
            </Link>
          </div>
        </div>
      </nav>

      {/* Decrypt Interface */}
      <DecryptInterface
        userCode={latestResult.primary_code}
        birthDate={birthDate}
        userName={userName}
      />
    </main>
  )
}

/* ============================
   STYLES
============================ */

const mainStyle: CSSProperties = {
  minHeight: '100vh',
  background: THEME.bg,
  color: THEME.textPrimary,
}

const navStyle: CSSProperties = {
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  padding: '16px 0',
  position: 'sticky',
  top: 0,
  background: 'rgba(10,13,18,0.95)',
  backdropFilter: 'blur(10px)',
  zIndex: 100,
}

const navContainer: CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const logoStyle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  color: THEME.accent,
  textDecoration: 'none',
  letterSpacing: 1,
}

const navLinks: CSSProperties = {
  display: 'flex',
  gap: 32,
}

const navLink: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: THEME.textSecondary,
  textDecoration: 'none',
  transition: 'color 0.2s',
}

const emptyContainer: CSSProperties = {
  maxWidth: 600,
  margin: '120px auto',
  padding: '60px 20px',
  textAlign: 'center',
  borderRadius: 20,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
}

const emptyIcon: CSSProperties = {
  fontSize: 64,
  marginBottom: 24,
  filter: 'drop-shadow(0 0 20px rgba(201,169,106,0.3))',
}

const emptyTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 32,
  fontWeight: 900,
  marginBottom: 16,
  letterSpacing: 1,
}

const emptyText: CSSProperties = {
  fontSize: 16,
  color: THEME.textSecondary,
  marginBottom: 32,
  lineHeight: 1.6,
}

const ctaButton: CSSProperties = {
  display: 'inline-block',
  padding: '14px 32px',
  borderRadius: 12,
  background: THEME.accent,
  color: '#0a0d12',
  fontSize: 15,
  fontWeight: 700,
  textDecoration: 'none',
  transition: 'all 0.2s',
}
