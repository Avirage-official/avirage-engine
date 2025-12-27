'use client'

import { useState } from 'react'
import { CSSProperties } from 'react'
import { RECOMMENDATIONS, CategoryRecommendation } from '@/lib/recommendationsData'

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

interface RecommendationsTabsProps {
  primaryCode: string
}

type CategoryKey = 'locations' | 'work' | 'community' | 'activities' | 'learning' | 'media' | 'living' | 'rituals' | 'movement' | 'wellness' | 'products' | 'travel'

const CATEGORIES: { key: CategoryKey; label: string; emoji: string }[] = [
  { key: 'locations', label: 'Locations', emoji: '🌍' },
  { key: 'work', label: 'Work Environments', emoji: '💼' },
  { key: 'community', label: 'Community Types', emoji: '👥' },
  { key: 'activities', label: 'Activities', emoji: '🎨' },
  { key: 'learning', label: 'Learning Styles', emoji: '📚' },
  { key: 'media', label: 'Music/Media', emoji: '🎵' },
  { key: 'living', label: 'Living Spaces', emoji: '🏠' },
  { key: 'rituals', label: 'Social Rituals', emoji: '🍽️' },
  { key: 'movement', label: 'Movement/Fitness', emoji: '💪' },
  { key: 'wellness', label: 'Wellness Practices', emoji: '🧘' },
  { key: 'products', label: 'Products/Tools', emoji: '🛍️' },
  { key: 'travel', label: 'Travel Styles', emoji: '✈️' },
]

export default function RecommendationsTabs({ primaryCode }: RecommendationsTabsProps) {
  const [activeTab, setActiveTab] = useState<CategoryKey>('locations')
  
  // Get recommendations for this code
  const codeRecs = RECOMMENDATIONS[primaryCode]
  
  if (!codeRecs) {
    return (
      <div style={emptyState}>
        <p style={emptyText}>Recommendations coming soon for {primaryCode}!</p>
      </div>
    )
  }

  const currentCategory = codeRecs[activeTab]

  return (
    <section style={{ marginBottom: 48 }}>
      <div style={sectionHeader}>
        <div>
          <h2 style={sectionTitle}>Your {primaryCode} Recommendations</h2>
          <p style={sectionDesc}>
            Deep guidance across 12 life categories—choose what feeds your soul, avoid what drains it
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={tabContainer}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            style={{
              ...tabButton,
              ...(activeTab === cat.key ? tabButtonActive : {}),
            }}
          >
            <span style={{ fontSize: 18 }}>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={tabContent}>
        <CategoryContent category={currentCategory} categoryKey={activeTab} />
      </div>
    </section>
  )
}

function CategoryContent({ category, categoryKey }: { category: CategoryRecommendation; categoryKey: string }) {
  if (!category.why || category.why.includes('coming next')) {
    return (
      <div style={emptyState}>
        <p style={emptyText}>Content for this category is being crafted with care. Check back soon!</p>
      </div>
    )
  }

  return (
    <div>
      {/* Why This Matters */}
      <div style={whySection}>
        <h3 style={whyTitle}>Why This Matters</h3>
        <div style={whyText}>
          {category.why.split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: 16, lineHeight: 1.8 }}>
              {paragraph.split('**').map((part, i) => 
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Green Light Sections */}
      {category.greenLight.map((section, idx) => (
        <div key={idx} style={greenLightSection}>
          <div style={sectionBadge}>
            <span style={badgeIcon}>✓</span>
            <span style={badgeText}>{section.title}</span>
          </div>
          
          <ul style={listStyle}>
            {section.items.map((item, i) => (
              <li key={i} style={listItem}>{item}</li>
            ))}
          </ul>

          {section.reasoning && (
            <p style={reasoningText}>
              <strong>Why it fits:</strong> {section.reasoning}
            </p>
          )}
        </div>
      ))}

      {/* Red Light Section */}
      {category.redLight.items.length > 0 && (
        <div style={redLightSection}>
          <div style={sectionBadgeRed}>
            <span style={badgeIconRed}>✕</span>
            <span style={badgeTextRed}>{category.redLight.title}</span>
          </div>
          
          <ul style={listStyle}>
            {category.redLight.items.map((item, i) => (
              <li key={i} style={listItemRed}>{item}</li>
            ))}
          </ul>

          {category.redLight.reasoning && (
            <p style={reasoningTextRed}>
              <strong>Why avoid:</strong> {category.redLight.reasoning}
            </p>
          )}
        </div>
      )}

      {/* Validation Questions */}
      {category.validation.resonates.length > 0 && (
        <div style={validationSection}>
          <h3 style={validationTitle}>How To Know If This Resonates</h3>
          
          <div style={validationGrid}>
            <div style={validationCard}>
              <div style={validationLabel}>✓ You resonate if:</div>
              <ul style={validationList}>
                {category.validation.resonates.map((item, i) => (
                  <li key={i} style={validationItem}>{item}</li>
                ))}
              </ul>
            </div>

            {category.validation.doesntResonate.length > 0 && (
              <div style={validationCard}>
                <div style={validationLabelAlt}>⚠️ You might not if:</div>
                <ul style={validationList}>
                  {category.validation.doesntResonate.map((item, i) => (
                    <li key={i} style={validationItem}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Affiliate Links */}
      {category.affiliates.length > 0 && (
        <div style={affiliateSection}>
          <h3 style={affiliateTitle}>Recommended Resources</h3>
          <div style={affiliateGrid}>
            {category.affiliates.map((aff, i) => (
              <a key={i} href={aff.url} target="_blank" rel="noopener noreferrer" style={affiliateLink}>
                <div style={affiliateName}>{aff.name}</div>
                <div style={affiliateType}>{aff.type}</div>
                <span style={affiliateArrow}>→</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================
   STYLES
============================ */

const sectionHeader: CSSProperties = {
  marginBottom: 32,
}

const sectionTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 28,
  fontWeight: 900,
  marginBottom: 8,
  color: THEME.textPrimary,
}

const sectionDesc: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  lineHeight: 1.7,
}

const tabContainer: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 10,
  marginBottom: 24,
}

const tabButton: CSSProperties = {
  padding: '14px 16px',
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  color: THEME.textSecondary,
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  transition: 'all 0.2s ease',
}

const tabButtonActive: CSSProperties = {
  background: 'rgba(201,169,106,0.10)',
  borderColor: THEME.accent,
  color: THEME.accent,
}

const tabContent: CSSProperties = {
  padding: 32,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
}

const whySection: CSSProperties = {
  marginBottom: 32,
  padding: 24,
  borderRadius: 12,
  background: THEME.panelStrong,
  border: `1px solid ${THEME.softBorder}`,
}

const whyTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 20,
  fontWeight: 900,
  marginBottom: 16,
  color: THEME.accent,
}

const whyText: CSSProperties = {
  fontSize: 14,
  color: THEME.textSecondary,
  lineHeight: 1.8,
}

const greenLightSection: CSSProperties = {
  marginBottom: 24,
  padding: 20,
  borderRadius: 12,
  border: `1px solid rgba(100, 200, 100, 0.2)`,
  background: 'rgba(100, 200, 100, 0.03)',
}

const redLightSection: CSSProperties = {
  marginBottom: 24,
  padding: 20,
  borderRadius: 12,
  border: `1px solid rgba(255, 100, 100, 0.2)`,
  background: 'rgba(255, 100, 100, 0.03)',
}

const sectionBadge: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 14px',
  borderRadius: 8,
  background: 'rgba(100, 200, 100, 0.15)',
  marginBottom: 16,
}

const sectionBadgeRed: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 14px',
  borderRadius: 8,
  background: 'rgba(255, 100, 100, 0.15)',
  marginBottom: 16,
}

const badgeIcon: CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  color: 'rgb(100, 200, 100)',
}

const badgeIconRed: CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  color: 'rgb(255, 100, 100)',
}

const badgeText: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: 'rgb(100, 200, 100)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const badgeTextRed: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: 'rgb(255, 100, 100)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: 20,
  listStyle: 'disc',
}

const listItem: CSSProperties = {
  fontSize: 14,
  color: THEME.textSecondary,
  marginBottom: 10,
  lineHeight: 1.7,
}

const listItemRed: CSSProperties = {
  fontSize: 14,
  color: THEME.textSecondary,
  marginBottom: 10,
  lineHeight: 1.7,
}

const reasoningText: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  marginTop: 12,
  fontStyle: 'italic',
  lineHeight: 1.6,
}

const reasoningTextRed: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  marginTop: 12,
  fontStyle: 'italic',
  lineHeight: 1.6,
}

const validationSection: CSSProperties = {
  marginTop: 32,
  padding: 24,
  borderRadius: 12,
  background: THEME.panelStrong,
  border: `1px solid ${THEME.softBorder}`,
}

const validationTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 18,
  fontWeight: 900,
  marginBottom: 20,
  color: THEME.textPrimary,
}

const validationGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 20,
}

const validationCard: CSSProperties = {
  padding: 16,
  borderRadius: 10,
  background: 'rgba(255,255,255,0.02)',
  border: `1px solid ${THEME.softBorder}`,
}

const validationLabel: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  color: 'rgb(100, 200, 100)',
  marginBottom: 12,
  letterSpacing: '0.04em',
}

const validationLabelAlt: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  color: 'rgb(255, 200, 100)',
  marginBottom: 12,
  letterSpacing: '0.04em',
}

const validationList: CSSProperties = {
  margin: 0,
  paddingLeft: 20,
  listStyle: 'circle',
}

const validationItem: CSSProperties = {
  fontSize: 13,
  color: THEME.textSecondary,
  marginBottom: 8,
  lineHeight: 1.6,
}

const affiliateSection: CSSProperties = {
  marginTop: 32,
  padding: 20,
  borderRadius: 12,
  background: 'rgba(201,169,106,0.05)',
  border: `1px solid ${THEME.accent}`,
}

const affiliateTitle: CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 16,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const affiliateGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 12,
}

const affiliateLink: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderRadius: 10,
  background: THEME.panel,
  border: `1px solid ${THEME.softBorder}`,
  textDecoration: 'none',
  color: THEME.textPrimary,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
}

const affiliateName: CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: THEME.textPrimary,
}

const affiliateType: CSSProperties = {
  fontSize: 12,
  color: THEME.textMuted,
}

const affiliateArrow: CSSProperties = {
  fontSize: 16,
  color: THEME.accent,
}

const emptyState: CSSProperties = {
  padding: 60,
  textAlign: 'center',
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
}

const emptyText: CSSProperties = {
  fontSize: 15,
  color: THEME.textSecondary,
  margin: 0,
}
