import { auth } from '@clerk/nextjs/server'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CSSProperties } from 'react'
import { CODE_PAGES } from '@/lib/codePages'
import ProfileEditor from '@/app/components/ProfileEditor'
import RecommendationsTabs from '@/app/components/RecommendationsTabs'

const THEME = {
  bg: "linear-gradient(180deg, #0a0d12 0%, #111720 100%)",
  panel: "rgba(255,255,255,0.04)",
  panelStrong: "rgba(255,255,255,0.06)",
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

  // Get the most recent result for "Your Lens Profile" section
  const latestResult = rows[0] || null

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
            <Link href="/insights" style={navLink}>
              Insights
            </Link>
            <Link href="/quiz" style={navLink}>
              Take Quiz Again
            </Link>
          </div>
          </div>
        </div>
      </nav>

      <div style={container}>
        {/* Header */}
        <div style={header}>
          <h1 style={h1}>Your Dashboard</h1>
          <p style={subheading}>
            Your cultural lens discoveries and personalized explorations
          </p>
        </div>

        {rows.length === 0 ? (
          // Empty State
          <div style={emptyState}>
            <div style={emptyIcon}>🧭</div>
            <h2 style={emptyTitle}>No results yet</h2>
            <p style={emptyText}>
              Take the quiz to discover your Cultural Code
            </p>
            <Link href="/quiz" style={ctaBtn}>
              Start Your Journey
            </Link>
          </div>
        ) : (
          <>
            {/* Your Lens Profile Card */}
            {latestResult && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={sectionTitle}>Your Lens Profile</h2>
                <LensProfileCard result={latestResult} />
              </section>
            )}

            {/* Profile Editor */}
            {latestResult && (
              <ProfileEditor result={latestResult} />
            )}

            {/* Recommendations Tabs - NEW! */}
            {latestResult && (
              <RecommendationsTabs primaryCode={latestResult.primary_code} />
            )}

            {/* Explore Your Lens */}
            {latestResult && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={sectionTitle}>Explore Your Lens</h2>
                <p style={sectionDesc}>
                  Based on your {latestResult.primary_code} alignment, here are some directions that might resonate. 
                  Not prescriptions—just starting points.
                </p>
                <ExploreYourLens primaryCode={latestResult.primary_code} />
              </section>
            )}

            {/* Results History */}
            <section>
              <h2 style={sectionTitle}>Quiz History</h2>
              <p style={sectionDesc}>All your Cultural Code discoveries</p>
              <div style={resultsGrid}>
                {rows.map((result) => (
                  <ResultCard key={result.id} result={result} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}

/* ============================
   LENS PROFILE CARD
============================ */

function LensProfileCard({ result }: { result: any }) {
  const date = new Date(result.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const codeSlug = result.primary_code.toLowerCase()
  const codeData = CODE_PAGES[codeSlug as keyof typeof CODE_PAGES]

  return (
    <div style={lensProfileCard}>
      <div style={lensProfileGrid}>
        {/* Left: Emblem */}
        <div style={lensProfileEmblem}>
          <img
            src={`/emblems/${result.primary_code} 1.jpg`}
            alt={`${result.primary_code} emblem`}
            style={emblemImg}
          />
        </div>

        {/* Right: Info */}
        <div style={lensProfileInfo}>
          <div style={lensProfileLabel}>Your Current Lens</div>
          <h2 style={lensProfileName}>{result.primary_code}</h2>
          <p style={lensProfileFullName}>{codeData?.fullName || result.primary_code}</p>
          <p style={lensProfileMatch}>{result.primary_percentage}% resonance</p>
          
          <div style={lensProfileTraits}>
            <div style={traitLabel}>Key Lens:</div>
            <p style={traitText}>{codeData?.lens.title || 'Pattern-based lens'}</p>
          </div>

          <div style={lensProfileMeta}>
            <span style={metaItem}>Last updated: {date}</span>
          </div>

          <div style={lensProfileActions}>
            <Link href={`/codepages/${codeSlug}`} style={secondaryBtn}>
              Read Full Code Page →
            </Link>
            <Link href="/quiz" style={tertiaryBtn}>
              Retake Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================
   EXPLORE YOUR LENS
============================ */

function ExploreYourLens({ primaryCode }: { primaryCode: string }) {
  const codeSlug = primaryCode.toLowerCase()
  const codeData = CODE_PAGES[codeSlug as keyof typeof CODE_PAGES]

  if (!codeData) {
    return <div style={exploreEmpty}>No suggestions available yet.</div>
  }

  const lifestyle = codeData.recommendations

  return (
    <div style={exploreGrid}>
      {/* Places */}
      <ExploreCard
        icon="🌍"
        title="Places"
        intro={`Many ${primaryCode}-aligned people find resonance in:`}
        items={lifestyle.places}
      />

      {/* Music */}
      <ExploreCard
        icon="🎵"
        title="Sounds"
        intro="Worth exploring:"
        items={lifestyle.music}
      />

      {/* Activities */}
      <ExploreCard
        icon="🎨"
        title="Activities"
        intro="Have you tried:"
        items={lifestyle.activities}
      />
    </div>
  )
}

function ExploreCard({ 
  icon, 
  title, 
  intro, 
  items 
}: { 
  icon: string
  title: string
  intro: string
  items: string[]
}) {
  return (
    <div style={exploreCard}>
      <div style={exploreIcon}>{icon}</div>
      <h3 style={exploreTitle}>{title}</h3>
      <p style={exploreIntro}>{intro}</p>
      <ul style={exploreList}>
        {items.slice(0, 4).map((item, idx) => (
          <li key={idx} style={exploreItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ============================
   RESULT CARD (History)
============================ */

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

/* ============================
   STYLES
============================ */

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

const sectionTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 28,
  fontWeight: 900,
  marginBottom: 12,
}

const sectionDesc: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  marginBottom: 24,
  lineHeight: 1.7,
}

// Lens Profile Card
const lensProfileCard: CSSProperties = {
  padding: 32,
  borderRadius: 20,
  border: `1px solid ${THEME.border}`,
  background: THEME.panelStrong,
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
}

const lensProfileGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "200px 1fr",
  gap: 32,
  alignItems: "center",
}

const lensProfileEmblem: CSSProperties = {
  display: "grid",
  placeItems: "center",
}

const emblemImg: CSSProperties = {
  width: 180,
  height: 180,
  objectFit: "contain",
  filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
}

const lensProfileInfo: CSSProperties = {}

const lensProfileLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: THEME.accent,
  marginBottom: 8,
}

const lensProfileName: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 42,
  fontWeight: 900,
  marginBottom: 6,
}

const lensProfileFullName: CSSProperties = {
  fontSize: 16,
  color: THEME.textSecondary,
  marginBottom: 8,
}

const lensProfileMatch: CSSProperties = {
  fontSize: 14,
  color: THEME.accent,
  fontWeight: 700,
  marginBottom: 20,
}

const lensProfileTraits: CSSProperties = {
  marginBottom: 20,
  padding: 16,
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: "rgba(255,255,255,0.02)",
}

const traitLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: THEME.textMuted,
  marginBottom: 6,
}

const traitText: CSSProperties = {
  fontSize: 14,
  color: THEME.textSecondary,
  margin: 0,
}

const lensProfileMeta: CSSProperties = {
  marginBottom: 20,
}

const metaItem: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
}

const lensProfileActions: CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
}

const secondaryBtn: CSSProperties = {
  padding: "12px 20px",
  borderRadius: 12,
  border: `1px solid ${THEME.accent}`,
  background: "rgba(201,169,106,0.10)",
  color: THEME.accent,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
}

const tertiaryBtn: CSSProperties = {
  padding: "12px 20px",
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: "transparent",
  color: THEME.textSecondary,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
}

// Explore Your Lens
const exploreGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 20,
}

const exploreCard: CSSProperties = {
  padding: 24,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
}

const exploreIcon: CSSProperties = {
  fontSize: 32,
  marginBottom: 12,
}

const exploreTitle: CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
  marginBottom: 8,
}

const exploreIntro: CSSProperties = {
  fontSize: 13,
  color: THEME.textSecondary,
  marginBottom: 16,
}

const exploreList: CSSProperties = {
  margin: 0,
  paddingLeft: 20,
  listStyle: "disc",
}

const exploreItem: CSSProperties = {
  fontSize: 14,
  color: THEME.textSecondary,
  marginBottom: 8,
  lineHeight: 1.6,
}

const exploreEmpty: CSSProperties = {
  padding: 40,
  textAlign: "center",
  color: THEME.textMuted,
  fontSize: 14,
}

// Results History
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

// Empty State
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
