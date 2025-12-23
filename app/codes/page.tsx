"use client";

import Link from "next/link";
import { CSSProperties, useState } from "react";
import { CODE_PAGES, CODE_SLUGS, type CodeSlug } from "@/lib/codePages";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';  // ← ADD THIS LINE
/* ============================
   THEME
============================ */

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
};

const DISPLAY_FONT = "'Cinzel', serif";
const BODY_FONT = "'Inter', system-ui, sans-serif";

/* ============================
   DATA
============================ */

// Region groupings for filtering
const REGIONS: Record<string, CodeSlug[]> = {
  "All Codes": CODE_SLUGS as unknown as CodeSlug[],
  "Africa": ["khoisan", "kayori", "sahen", "enzuka"],
  "Asia": ["siyuane", "jaejin", "namsea", "shokunin", "khoruun", "lhumir", "yatevar", "renara"],
  "Pacific": ["karayni", "wohaka", "tjukari"],
  "Americas": ["kinmora", "skenari"],
  "Arctic": ["siljoa"],
  "Middle East": ["ashkara"],
  "Mediterranean": ["alethir"],
};

const CODE_TYPES: Record<string, CodeSlug[]> = {
  "All": CODE_SLUGS as unknown as CodeSlug[],
  "Standalone": ["khoisan", "kayori", "sahen", "shokunin", "khoruun", "lhumir", "renara", "tjukari", "kinmora", "skenari", "ashkara", "alethir"],
  "Fusion": ["enzuka", "siyuane", "jaejin", "namsea", "yatevar", "karayni", "wohaka", "siljoa"],
};

/* ============================
   COMPONENT
============================ */

export default function CodesLibraryPage() {
  const [regionFilter, setRegionFilter] = useState<string>("All Codes");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get filtered codes
  const filteredCodes = CODE_SLUGS.filter((slug) => {
    const regionMatch = REGIONS[regionFilter]?.includes(slug);
    const typeMatch = CODE_TYPES[typeFilter]?.includes(slug);
    const searchMatch = 
      searchQuery === "" ||
      CODE_PAGES[slug].codeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      CODE_PAGES[slug].fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      CODE_PAGES[slug].snapshot.toLowerCase().includes(searchQuery.toLowerCase());
    
    return regionMatch && typeMatch && searchMatch;
  });

  return (
    <main style={mainStyle}>
      {/* Navigation */}
      <nav style={navStyle}>
        <div style={navContainer}>
          <Link href="/" style={logoStyle}>
            Avirage
          </Link>

          <div style={navLinks}>
            <Link href="/about" style={navLink}>
              About
            </Link>
            <Link href="/codes" style={{ ...navLink, color: THEME.accent }}>
              Code Library
            </Link>
            <Link href="/faq" style={navLink}>
              FAQ
            </Link>
             <SignedIn>           
  <Link href="/dashboard" style={navLink}>
    Dashboard
  </Link>
</SignedIn>
            <Link href="/quiz" style={signInBtn}>
              Take Quiz
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={heroSection}>
        <div style={heroContent}>
          <div style={heroKicker}>Explore</div>
          <h1 style={h1}>Cultural Code Library</h1>
          <p style={heroDesc}>
            20 archetypal traditions grounded in historical cultures. Each code represents a distinct
            lens through which people perceive and navigate the world.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section style={filtersSection}>
        <div style={container}>
          {/* Search Bar */}
          <div style={searchContainer}>
            <input
              type="text"
              placeholder="Search codes by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInput}
            />
          </div>

          {/* Filter Tabs */}
          <div style={filterRow}>
            <div style={filterGroup}>
              <div style={filterLabel}>Region:</div>
              <div style={filterTabs}>
                {Object.keys(REGIONS).map((region) => (
                  <button
                    key={region}
                    onClick={() => setRegionFilter(region)}
                    style={regionFilter === region ? activeFilterBtn : filterBtn}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div style={filterGroup}>
              <div style={filterLabel}>Type:</div>
              <div style={filterTabs}>
                {Object.keys(CODE_TYPES).map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    style={typeFilter === type ? activeFilterBtn : filterBtn}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div style={resultsCount}>
            Showing {filteredCodes.length} of {CODE_SLUGS.length} codes
          </div>
        </div>
      </section>

      {/* Code Grid */}
      <section style={codesSection}>
        <div style={container}>
          {filteredCodes.length === 0 ? (
            <div style={emptyState}>
              <div style={emptyIcon}>🔍</div>
              <div style={emptyTitle}>No codes found</div>
              <p style={emptyText}>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div style={codeGrid}>
              {filteredCodes.map((slug) => (
                <CodeCard key={slug} slug={slug} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <div style={ctaCard}>
          <h2 style={ctaTitle}>Ready to discover your code?</h2>
          <p style={ctaText}>
            Take the 10-minute quiz to find your archetypal cultural lens.
          </p>
          <Link href="/quiz" style={ctaBtn}>
            Start Quiz
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <div style={footerContainer}>
          <div style={footerBrand}>
            <div style={footerLogo}>Avirage</div>
            <p style={footerTagline}>Cultural lens identification system</p>
          </div>

          <div style={footerLinks}>
            <div style={footerCol}>
              <div style={footerColTitle}>Learn</div>
              <Link href="/about" style={footerLink}>About</Link>
              <Link href="/codes" style={footerLink}>Code Library</Link>
              <Link href="/faq" style={footerLink}>FAQ</Link>
            </div>

            <div style={footerCol}>
              <div style={footerColTitle}>Start</div>
              <Link href="/quiz" style={footerLink}>Take Quiz</Link>
            </div>
          </div>
        </div>

        <div style={footerBottom}>
          <p style={footerCopyright}>© 2025 Avirage. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

/* ============================
   HELPER COMPONENTS
============================ */

function CodeCard({ slug }: { slug: CodeSlug }) {
  const code = CODE_PAGES[slug];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/codepages/${slug}`}
      style={{
        ...codeCard,
        ...(isHovered ? codeCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div style={codeCardHeader}>
        <div style={codeCardName}>{code.codeName}</div>
        <div style={codeCardOrigin}>{code.fullName}</div>
        <div style={codeCardType}>
          {code.origin.level1}
        </div>
      </div>

      {/* Description */}
      <p style={codeCardDesc}>{code.snapshot}</p>

      {/* Lens Label */}
      <div style={codeCardLens}>
        <span style={lensIcon}>👁</span>
        <span style={lensText}>{code.lens.title}</span>
      </div>

      {/* Arrow */}
      <div style={codeCardArrow}>→</div>
    </Link>
  );
}

/* ============================
   STYLES
============================ */

const mainStyle: CSSProperties = {
  minHeight: "100vh",
  fontFamily: BODY_FONT,
  background: THEME.bg,
  color: THEME.textPrimary,
};

// Navigation
const navStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "rgba(10,13,18,0.92)",
  backdropFilter: "blur(12px)",
  borderBottom: `1px solid ${THEME.softBorder}`,
};

const navContainer: CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  color: THEME.accent,
  textDecoration: "none",
};

const navLinks: CSSProperties = {
  display: "flex",
  gap: 32,
  alignItems: "center",
};

const navLink: CSSProperties = {
  color: THEME.textSecondary,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "0.02em",
};

const signInBtn: CSSProperties = {
  padding: "8px 20px",
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  color: THEME.textPrimary,
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.04em",
};

// Hero
const heroSection: CSSProperties = {
  padding: "80px 24px 60px",
  textAlign: "center",
  borderBottom: `1px solid ${THEME.softBorder}`,
};

const heroContent: CSSProperties = {
  maxWidth: 800,
  margin: "0 auto",
};

const heroKicker: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.20em",
  textTransform: "uppercase",
  color: THEME.accent,
  fontWeight: 900,
  marginBottom: 16,
};

const h1: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 48,
  fontWeight: 900,
  lineHeight: 1.2,
  margin: "0 0 20px",
};

const heroDesc: CSSProperties = {
  fontSize: 18,
  lineHeight: 1.7,
  color: THEME.textSecondary,
  margin: 0,
};

// Container
const container: CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 24px",
};

// Filters
const filtersSection: CSSProperties = {
  padding: "40px 0",
  borderBottom: `1px solid ${THEME.softBorder}`,
};

const searchContainer: CSSProperties = {
  marginBottom: 32,
};

const searchInput: CSSProperties = {
  width: "100%",
  padding: "14px 20px",
  fontSize: 15,
  borderRadius: 14,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  color: THEME.textPrimary,
  fontFamily: BODY_FONT,
  outline: "none",
};

const filterRow: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const filterGroup: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap",
};

const filterLabel: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  color: THEME.textMuted,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const filterTabs: CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const filterBtn: CSSProperties = {
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 700,
  borderRadius: 10,
  border: `1px solid ${THEME.softBorder}`,
  background: "transparent",
  color: THEME.textSecondary,
  cursor: "pointer",
  transition: "all 0.2s",
};

const activeFilterBtn: CSSProperties = {
  ...filterBtn,
  border: `1px solid ${THEME.accent}`,
  background: "rgba(201,169,106,0.10)",
  color: THEME.accent,
};

const resultsCount: CSSProperties = {
  marginTop: 24,
  fontSize: 13,
  color: THEME.textMuted,
  fontWeight: 600,
};

// Codes Grid
const codesSection: CSSProperties = {
  padding: "60px 0 80px",
};

const codeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 24,
};

const codeCard: CSSProperties = {
  padding: 28,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.2s",
  cursor: "pointer",
  position: "relative",
};

const codeCardHover: CSSProperties = {
  borderColor: THEME.border,
  background: THEME.panelStrong,
  transform: "translateY(-2px)",
};

const codeCardHeader: CSSProperties = {
  marginBottom: 16,
};

const codeCardName: CSSProperties = {
  fontSize: 22,
  fontFamily: DISPLAY_FONT,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 6,
};

const codeCardOrigin: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  fontWeight: 700,
  marginBottom: 4,
};

const codeCardType: CSSProperties = {
  fontSize: 11,
  color: THEME.textMuted,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const codeCardDesc: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  color: THEME.textSecondary,
  margin: "0 0 20px",
  flex: 1,
};

const codeCardLens: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 14px",
  borderRadius: 10,
  border: `1px solid ${THEME.softBorder}`,
  background: "rgba(255,255,255,0.02)",
  marginBottom: 16,
  alignSelf: "flex-start",
};

const lensIcon: CSSProperties = {
  fontSize: 14,
};

const lensText: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: THEME.textMuted,
};

const codeCardArrow: CSSProperties = {
  fontSize: 20,
  color: THEME.accent,
  opacity: 0.5,
  position: "absolute",
  bottom: 24,
  right: 24,
};

// Empty State
const emptyState: CSSProperties = {
  textAlign: "center",
  padding: "80px 24px",
};

const emptyIcon: CSSProperties = {
  fontSize: 48,
  marginBottom: 16,
};

const emptyTitle: CSSProperties = {
  fontSize: 20,
  fontWeight: 900,
  color: THEME.textPrimary,
  marginBottom: 8,
};

const emptyText: CSSProperties = {
  fontSize: 14,
  color: THEME.textMuted,
};

// CTA
const ctaSection: CSSProperties = {
  padding: "0 24px 80px",
};

const ctaCard: CSSProperties = {
  maxWidth: 680,
  margin: "0 auto",
  padding: 60,
  borderRadius: 20,
  border: `1px solid ${THEME.border}`,
  background: "rgba(255,255,255,0.02)",
  textAlign: "center",
};

const ctaTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 36,
  fontWeight: 900,
  marginBottom: 16,
};

const ctaText: CSSProperties = {
  fontSize: 16,
  color: THEME.textSecondary,
  marginBottom: 32,
};

const ctaBtn: CSSProperties = {
  display: "inline-block",
  padding: "18px 40px",
  borderRadius: 14,
  border: `1px solid rgba(201,169,106,0.45)`,
  background: "rgba(201,169,106,0.12)",
  color: THEME.textPrimary,
  fontWeight: 900,
  fontSize: 15,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
};

// Footer
const footerStyle: CSSProperties = {
  borderTop: `1px solid ${THEME.softBorder}`,
  padding: "60px 24px 32px",
  background: "rgba(0,0,0,0.2)",
};

const footerContainer: CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto 40px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 60,
};

const footerBrand: CSSProperties = {};

const footerLogo: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 8,
};

const footerTagline: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  margin: 0,
};

const footerLinks: CSSProperties = {
  display: "flex",
  gap: 80,
  justifyContent: "flex-end",
};

const footerCol: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const footerColTitle: CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: THEME.textPrimary,
  marginBottom: 4,
};

const footerLink: CSSProperties = {
  fontSize: 14,
  color: THEME.textSecondary,
  textDecoration: "none",
};

const footerBottom: CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  paddingTop: 24,
  borderTop: `1px solid ${THEME.softBorder}`,
  textAlign: "center",
};

const footerCopyright: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  margin: 0,
};
