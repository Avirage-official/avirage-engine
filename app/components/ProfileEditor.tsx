'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CSSProperties } from 'react'

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

interface ProfileEditorProps {
  result: any
}

export default function ProfileEditor({ result }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Pre-fill with quiz-detected values or existing profile values
  const [mbti, setMbti] = useState(result.profile_mbti || '')
  const [big5Openness, setBig5Openness] = useState(result.profile_big5_openness || '')
  const [big5Conscientiousness, setBig5Conscientiousness] = useState(result.profile_big5_conscientiousness || '')
  const [big5Extraversion, setBig5Extraversion] = useState(result.profile_big5_extraversion || '')
  const [big5Agreeableness, setBig5Agreeableness] = useState(result.profile_big5_agreeableness || '')
  const [big5Neuroticism, setBig5Neuroticism] = useState(result.profile_big5_neuroticism || '')
  const [enneagram, setEnneagram] = useState(result.profile_enneagram || '')
  const [sunSign, setSunSign] = useState(result.profile_sun_sign || result.astrology_data?.sunSign || '')
  const [element, setElement] = useState(result.profile_element || result.astrology_data?.element || '')
  const [modality, setModality] = useState(result.profile_modality || result.astrology_data?.modality || '')

  const hasProfileData = result.profile_based_primary_code

  async function handleSave() {
    setIsSaving(true)
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resultId: result.id,
          mbti,
          big5Openness,
          big5Conscientiousness,
          big5Extraversion,
          big5Agreeableness,
          big5Neuroticism,
          enneagram,
          sunSign,
          element,
          modality,
        }),
      })

      if (response.ok) {
        setIsEditing(false)
        window.location.reload()
      } else {
        alert('Failed to save profile')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section style={{ marginBottom: 48 }}>
      <div style={sectionHeader}>
        <div>
          <h2 style={sectionTitle}>Your Framework Profile</h2>
          <p style={sectionDesc}>
            Select your known frameworks to see how they map to Cultural Codes
          </p>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} style={editBtn}>
            {hasProfileData ? 'Edit Profile' : 'Add Profile Data'}
          </button>
        )}
      </div>

      {isEditing ? (
        <div style={profileCard}>
          <div style={formGrid}>
            {/* MBTI */}
            <div style={formField}>
              <label style={formLabel}>MBTI Type</label>
              <select value={mbti} onChange={(e) => setMbti(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="INTJ">INTJ</option>
                <option value="INTP">INTP</option>
                <option value="ENTJ">ENTJ</option>
                <option value="ENTP">ENTP</option>
                <option value="INFJ">INFJ</option>
                <option value="INFP">INFP</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENFP">ENFP</option>
                <option value="ISTJ">ISTJ</option>
                <option value="ISFJ">ISFJ</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ISTP">ISTP</option>
                <option value="ISFP">ISFP</option>
                <option value="ESTP">ESTP</option>
                <option value="ESFP">ESFP</option>
              </select>
            </div>

            {/* Enneagram */}
            <div style={formField}>
              <label style={formLabel}>Enneagram Type</label>
              <select value={enneagram} onChange={(e) => setEnneagram(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="1">Type 1 - The Reformer</option>
                <option value="2">Type 2 - The Helper</option>
                <option value="3">Type 3 - The Achiever</option>
                <option value="4">Type 4 - The Individualist</option>
                <option value="5">Type 5 - The Investigator</option>
                <option value="6">Type 6 - The Loyalist</option>
                <option value="7">Type 7 - The Enthusiast</option>
                <option value="8">Type 8 - The Challenger</option>
                <option value="9">Type 9 - The Peacemaker</option>
              </select>
            </div>

            {/* Big 5 - Openness */}
            <div style={formField}>
              <label style={formLabel}>Openness</label>
              <select value={big5Openness} onChange={(e) => setBig5Openness(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Big 5 - Conscientiousness */}
            <div style={formField}>
              <label style={formLabel}>Conscientiousness</label>
              <select value={big5Conscientiousness} onChange={(e) => setBig5Conscientiousness(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Big 5 - Extraversion */}
            <div style={formField}>
              <label style={formLabel}>Extraversion</label>
              <select value={big5Extraversion} onChange={(e) => setBig5Extraversion(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Big 5 - Agreeableness */}
            <div style={formField}>
              <label style={formLabel}>Agreeableness</label>
              <select value={big5Agreeableness} onChange={(e) => setBig5Agreeableness(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Big 5 - Neuroticism */}
            <div style={formField}>
              <label style={formLabel}>Emotional Stability (Neuroticism)</label>
              <select value={big5Neuroticism} onChange={(e) => setBig5Neuroticism(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="High">High (Less Stable)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low (Very Stable)</option>
              </select>
            </div>

            {/* Sun Sign */}
            <div style={formField}>
              <label style={formLabel}>Sun Sign</label>
              <select value={sunSign} onChange={(e) => setSunSign(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="Aries">Aries</option>
                <option value="Taurus">Taurus</option>
                <option value="Gemini">Gemini</option>
                <option value="Cancer">Cancer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Sagittarius">Sagittarius</option>
                <option value="Capricorn">Capricorn</option>
                <option value="Aquarius">Aquarius</option>
                <option value="Pisces">Pisces</option>
              </select>
            </div>

            {/* Element */}
            <div style={formField}>
              <label style={formLabel}>Element</label>
              <select value={element} onChange={(e) => setElement(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="Fire">Fire</option>
                <option value="Earth">Earth</option>
                <option value="Air">Air</option>
                <option value="Water">Water</option>
              </select>
            </div>

            {/* Modality */}
            <div style={formField}>
              <label style={formLabel}>Modality</label>
              <select value={modality} onChange={(e) => setModality(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                <option value="Cardinal">Cardinal</option>
                <option value="Fixed">Fixed</option>
                <option value="Mutable">Mutable</option>
              </select>
            </div>
          </div>

          <div style={formActions}>
            <button onClick={() => setIsEditing(false)} style={cancelBtn} disabled={isSaving}>
              Cancel
            </button>
            <button onClick={handleSave} style={saveBtn} disabled={isSaving}>
              {isSaving ? 'Calculating...' : 'Calculate Profile-Based Code'}
            </button>
          </div>
        </div>
      ) : hasProfileData ? (
        // Show comparison
        <ComparisonView result={result} />
      ) : (
        // Empty state
        <div style={emptyProfile}>
          <div style={emptyIcon}>🎯</div>
          <p style={emptyText}>
            Add your known frameworks to see how they compare to your quiz results
          </p>
        </div>
      )}
    </section>
  )
}

function ComparisonView({ result }: { result: any }) {
  return (
    <div style={comparisonGrid}>
      {/* Quiz-Based */}
      <div style={comparisonCard}>
        <div style={comparisonHeader}>
          <div style={comparisonLabel}>Quiz-Based</div>
          <div style={comparisonSubtext}>How you answered</div>
        </div>

        <div style={codeDisplay}>
          <div style={codeLabel}>Primary</div>
          <div style={codeName}>{result.primary_code}</div>
          <div style={codePercentage}>{result.primary_percentage}% match</div>
        </div>

        <div style={codeRowSmall}>
          <div>
            <div style={codeSmallLabel}>Secondary</div>
            <div style={codeSmallName}>{result.secondary_code}</div>
            <div style={codeSmallPercentage}>{result.secondary_percentage}%</div>
          </div>
          <div>
            <div style={codeSmallLabel}>Tertiary</div>
            <div style={codeSmallName}>{result.tertiary_code}</div>
            <div style={codeSmallPercentage}>{result.tertiary_percentage}%</div>
          </div>
        </div>

        <Link href={`/codepages/${result.primary_code.toLowerCase()}`} style={viewLinkBtn}>
          View Code Page →
        </Link>
      </div>

      {/* Profile-Based */}
      <div style={comparisonCard}>
        <div style={comparisonHeader}>
          <div style={comparisonLabel}>Profile-Based</div>
          <div style={comparisonSubtext}>Who you say you are</div>
        </div>

        <div style={codeDisplay}>
          <div style={codeLabel}>Primary</div>
          <div style={codeName}>{result.profile_based_primary_code}</div>
          <div style={codePercentage}>{result.profile_based_primary_percentage}% match</div>
        </div>

        <div style={codeRowSmall}>
          <div>
            <div style={codeSmallLabel}>Secondary</div>
            <div style={codeSmallName}>{result.profile_based_secondary_code}</div>
            <div style={codeSmallPercentage}>{result.profile_based_secondary_percentage}%</div>
          </div>
          <div>
            <div style={codeSmallLabel}>Tertiary</div>
            <div style={codeSmallName}>{result.profile_based_tertiary_code}</div>
            <div style={codeSmallPercentage}>{result.profile_based_tertiary_percentage}%</div>
          </div>
        </div>

        <Link href={`/codepages/${result.profile_based_primary_code.toLowerCase()}`} style={viewLinkBtn}>
          View Code Page →
        </Link>
      </div>
    </div>
  )
}

/* ============================
   STYLES
============================ */

const sectionHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 24,
  gap: 20,
}

const sectionTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 28,
  fontWeight: 900,
  marginBottom: 8,
}

const sectionDesc: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  lineHeight: 1.7,
}

const editBtn: CSSProperties = {
  padding: '12px 20px',
  borderRadius: 12,
  border: `1px solid ${THEME.accent}`,
  background: 'rgba(201,169,106,0.10)',
  color: THEME.accent,
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
}

const profileCard: CSSProperties = {
  padding: 32,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
}

const formGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: 20,
  marginBottom: 24,
}

const formField: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const formLabel: CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: THEME.textSecondary,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const selectStyle: CSSProperties = {
  padding: '12px',
  borderRadius: 10,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panelStrong,
  color: THEME.textPrimary,
  fontSize: 14,
  fontFamily: BODY_FONT,
  cursor: 'pointer',
}

const formActions: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 12,
}

const cancelBtn: CSSProperties = {
  padding: '12px 20px',
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: 'transparent',
  color: THEME.textSecondary,
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
}

const saveBtn: CSSProperties = {
  padding: '12px 24px',
  borderRadius: 12,
  border: `1px solid ${THEME.accent}`,
  background: 'rgba(201,169,106,0.10)',
  color: THEME.accent,
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
}

const emptyProfile: CSSProperties = {
  padding: 60,
  textAlign: 'center',
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
}

const emptyIcon: CSSProperties = {
  fontSize: 48,
  marginBottom: 16,
}

const emptyText: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  margin: 0,
}

const comparisonGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
}

const comparisonCard: CSSProperties = {
  padding: 28,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
}

const comparisonHeader: CSSProperties = {
  marginBottom: 24,
  paddingBottom: 16,
  borderBottom: `1px solid ${THEME.softBorder}`,
}

const comparisonLabel: CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 4,
  letterSpacing: '0.04em',
}

const comparisonSubtext: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
}

const codeDisplay: CSSProperties = {
  marginBottom: 20,
  paddingBottom: 20,
  borderBottom: `1px solid ${THEME.softBorder}`,
}

const codeLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: THEME.textMuted,
  marginBottom: 8,
}

const codeName: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  marginBottom: 6,
}

const codePercentage: CSSProperties = {
  fontSize: 14,
  color: THEME.accent,
  fontWeight: 700,
}

const codeRowSmall: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
  marginBottom: 20,
}

const codeSmallLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: THEME.textMuted,
  marginBottom: 4,
}

const codeSmallName: CSSProperties = {
  fontSize: 15,
  fontWeight: 900,
  marginBottom: 2,
}

const codeSmallPercentage: CSSProperties = {
  fontSize: 12,
  color: THEME.textSecondary,
  fontWeight: 600,
}

const viewLinkBtn: CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px',
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: 'rgba(201,169,106,0.08)',
  color: THEME.accent,
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 700,
}
