'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CSSProperties } from 'react'
import { CODE_PAGES } from '@/lib/codePages'
import ProfileEditor from '@/app/components/ProfileEditor'

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

export default function DashboardClient({ rows }: { rows: any[] }) {
  const [key, setKey] = useState(0)
  const latestResult = rows[0] || null

  function handleRefresh() {
    setKey(prev => prev + 1)
    window.location.reload()
  }

  return (
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
            <ProfileEditor key={key} result={latestResult} onProfileUpdate={handleRefresh} />
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
  )
}

// Copy all the component functions and styles from the original dashboard file
// (LensProfileCard, ExploreYourLens, etc.)
