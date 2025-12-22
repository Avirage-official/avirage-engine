import { auth } from '@clerk/nextjs/server'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CSSProperties } from 'react'

const THEME = {
  bg: "linear-gradient(180deg, #0a0d12 0%, #111720 100%)",
  panel: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.14)",
  softBorder: "rgba(255,255,255,0.08)",
  textPrimary: "#e6e9ee",
  textSecondary: "#9aa3ad",
  textMuted: "rgba(154,163,173,0.75)",
  accent: "#c9a96a",
}

const DISPLAY_FONT = "'Cinzel', serif"
const BODY_FONT = "'Inter', system-ui, sans-serif"

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Get user's quiz results
  const { rows } = await sql`
    SELECT * FROM quiz_results 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `

  return (
    <main style={mainStyle}>
      {/* Nav */}
      <nav style={navStyle}>
        <div style={navContainer}>
          <Link href="/" style={logoStyle}>
            Avirage
          </Link>
          <div style={navLinks}>
            <Link href="/dashboard" style={{ ...navLink, color: THEME.accent }}>
              Dashboard
            </Link>
            <Link href="/quiz" style={navLink}>
              Take Quiz Again
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={container}>
        <div style={header}>
          <h1 style={h1}>Your Results</h1>
          <p style={subheading}>
            All your Cultural Code discoveries in one place
          </p>
        </div>

        {rows.length === 0 ? (
          <div style={emptyState}>
            <div style={emptyIcon}>📊</div>
            <h2 style={emptyTitle}>No results yet</h2>
            <p style={emptyText}>
              Take the quiz to discover your Cultural Code
            </p>
            <Link href="/quiz" style={ctaBtn}>
              Start Quiz
            </Link>
          </div>
        ) : (
          <div style={resultsGrid}>
            {rows.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function ResultCard({ result }: { result: any }) {
  const date = new Date(result.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div style={resultCard}>
      <div style={resultHeader}>
        <div style={resultDate}>{date}</div>
      </div>

      <div style={codeSection}>
        <div style={codeLabel}>Primary</div>
        <div style={codeName}>{result.primary_code}</div>
        <div style={codePercentage}>{result.primary_percentage}% match</div>
      </div>

      <div style={codeRow}>
        <div style={codeSmall}>
          <div style={codeSmallLabel}>Secondary</div>
          <div style={codeSmallName}>{result.secondary_code}</div>
          <div style={codeSmallPercentage}>{result.secondary_percentage}%</div>
        </div>
        <div style={codeSmall}>
          <div style={codeSmallLabel}>Tertiary</div>
          <div style={codeSmallName}>{result.tertiary_code}</div>
          <div style={codeSmallPercentage}>{result.tertiary_percentage}%</div>
        </div>
      </div>

      <Link 
        href={`/codepages/${result.primary_code.toLowerCase()}`} 
        style={viewBtn}
      >
        View Code Page →
      </Link>
    </div>
  )
}

// Styles
const mainStyle: CSSProperties = {
  minHeight: "100vh",
  fontFamily: BODY_FONT,
  background: THEME.bg,
  color: THEME.textPrimary,
}

const navStyle: CSSProperties = {
  borderBottom: `1px solid ${THEME.softBorder}`,
  background: "rgba(10,13,18,0.92)",
  backdropFilter: "blur(12px)",
}

const navContainer: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const logoStyle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  color: THEME.accent,
  textDecoration: "none",
}

const navLinks: CSSProperties = {
  display: "flex",
  gap: 32,
  alignItems: "center",
}

const navLink: CSSProperties = {
  color: THEME.textSecondary,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
}

const container: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
}

const header: CSSProperties = {
  marginBottom: 48,
}

const h1: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 48,
  fontWeight: 900,
  marginBottom: 12,
}

const subheading: CSSProperties = {
  fontSize: 18,
  color: THEME.textSecondary,
}

const resultsGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
  gap: 24,
}

const resultCard: CSSProperties = {
  padding: 28,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
}

const resultHeader: CSSProperties = {
  marginBottom: 24,
}

const resultDate: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  fontWeight: 600,
}

const codeSection: CSSProperties = {
  marginBottom: 20,
  paddingBottom: 20,
  borderBottom: `1px solid ${THEME.softBorder}`,
}

const codeLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: THEME.accent,
  marginBottom: 8,
}

const codeName: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 28,
  fontWeight: 900,
  marginBottom: 6,
}

const codePercentage: CSSProperties = {
  fontSize: 14,
  color: THEME.textSecondary,
  fontWeight: 600,
}

const codeRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  marginBottom: 20,
}

const codeSmall: CSSProperties = {
  padding: 16,
  borderRadius: 12,
  background: "rgba(255,255,255,0.02)",
  border: `1px solid ${THEME.softBorder}`,
}

const codeSmallLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: THEME.textMuted,
  marginBottom: 6,
}

const codeSmallName: CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  marginBottom: 4,
}

const codeSmallPercentage: CSSProperties = {
  fontSize: 12,
  color: THEME.textSecondary,
  fontWeight: 600,
}

const viewBtn: CSSProperties = {
  display: "block",
  width: "100%",
  padding: "12px",
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: "rgba(201,169,106,0.08)",
  color: THEME.accent,
  textAlign: "center",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
}

const emptyState: CSSProperties = {
  textAlign: "center",
  padding: "80px 24px",
}

const emptyIcon: CSSProperties = {
  fontSize: 64,
  marginBottom: 24,
}

const emptyTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 32,
  fontWeight: 900,
  marginBottom: 12,
}

const emptyText: CSSProperties = {
  fontSize: 16,
  color: THEME.textSecondary,
  marginBottom: 32,
}

const ctaBtn: CSSProperties = {
  display: "inline-block",
  padding: "16px 32px",
  borderRadius: 14,
  border: `1px solid rgba(201,169,106,0.45)`,
  background: "rgba(201,169,106,0.12)",
  color: THEME.textPrimary,
  fontWeight: 900,
  fontSize: 14,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
}
