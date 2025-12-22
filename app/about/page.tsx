"use client";

import Link from "next/link";
import { CSSProperties } from "react";

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
   COMPONENT
============================ */

export default function AboutPage() {
  return (
    <main style={mainStyle}>
      {/* Navigation */}
      <nav style={navStyle}>
        <div style={navContainer}>
          <Link href="/" style={logoStyle}>
            Avirage
          </Link>

          <div style={navLinks}>
            <Link href="/about" style={{ ...navLink, color: THEME.accent }}>
              About
            </Link>
            <Link href="/codes" style={navLink}>
              Code Library
            </Link>
            <Link href="/faq" style={navLink}>
              FAQ
            </Link>
            <Link href="/quiz" style={signInBtn}>
              Take Quiz
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={heroSection}>
        <div style={heroContent}>
          <div style={heroKicker}>Methodology</div>
          <h1 style={h1}>What Avirage Actually Is</h1>
          <p style={heroDesc}>
            A structured interpretive system for identifying archetypal cultural traditions
            through cross-framework behavioral pattern analysis.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div style={contentContainer}>
        {/* Core Concept */}
        <section style={section}>
          <h2 style={h2}>Not a Personality Test</h2>
          <p style={bodyText}>
            Avirage is a <strong>lens-mapping system</strong>. It doesn't classify you into personality
            types or diagnose traits. Instead, it identifies which archetypal cultural tradition you
            most strongly align with—the framework through which you naturally perceive, decide, relate,
            and move through the world.
          </p>
          <p style={bodyText}>
            These archetypal traditions are expressed as <strong>Cultural Codes</strong>—each grounded in:
          </p>
          <ul style={listStyle}>
            <li style={listItem}>Historically real cultures (Level-1 origins)</li>
            <li style={listItem}>Recurring behavioral patterns</li>
            <li style={listItem}>Shared value systems</li>
            <li style={listItem}>Characteristic ways of living, working, socializing, and creating meaning</li>
          </ul>
        </section>

        <div style={divider} />

        {/* Philosophy */}
        <section style={section}>
          <h2 style={h2}>From "Personality" to "Lens"</h2>
          <div style={comparisonCard}>
            <div style={comparisonCol}>
              <div style={comparisonLabel}>Traditional Models Ask:</div>
              <ul style={listStyle}>
                <li style={listItem}>What traits do you have?</li>
                <li style={listItem}>What category do you belong to?</li>
              </ul>
            </div>
            <div style={comparisonCol}>
              <div style={comparisonLabel}>Avirage Asks:</div>
              <ul style={listStyle}>
                <li style={listItem}>What worldview do you naturally operate from?</li>
                <li style={listItem}>Which cultural logic feels intuitive to you?</li>
              </ul>
            </div>
          </div>
          <p style={bodyText}>
            People don't just have traits—they live inside <strong>interpretive frameworks</strong>. Avirage maps
            those frameworks.
          </p>
        </section>

        <div style={divider} />

        {/* The System */}
        <section style={section}>
          <h2 style={h2}>How the System Works</h2>
          
          {/* Step 1 */}
          <div style={stepCard}>
            <div style={stepNumber}>1</div>
            <div style={stepContent}>
              <h3 style={stepTitle}>Input Frameworks (Foundational Signals)</h3>
              <p style={bodyText}>
                Avirage integrates four established interpretive frameworks, not as truth-claims, but as
                pattern generators:
              </p>
              <div style={frameworkGrid}>
                <FrameworkCard
                  name="Big Five"
                  description="Behavioral tendencies — statistically grounded distributions for stability, energy, openness, regulation"
                />
                <FrameworkCard
                  name="MBTI"
                  description="Cognitive preference axes — IE/SN/TF/JP treated as directional signals, not type identity"
                />
                <FrameworkCard
                  name="Enneagram"
                  description="Motivational gravity — detects why behaviors occur, focuses on coping styles and desire patterns"
                />
                <FrameworkCard
                  name="Astrology"
                  description="Symbolic archetypal layer — element/modality provides mythic language, used non-deterministically"
                />
              </div>
              <p style={noteText}>
                <strong>Key:</strong> Each framework contributes partial, imperfect signals. No single framework dominates.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={stepCard}>
            <div style={stepNumber}>2</div>
            <div style={stepContent}>
              <h3 style={stepTitle}>Pattern Abstraction Layer (The Innovation)</h3>
              <p style={bodyText}>
                Instead of mapping frameworks directly to codes, Avirage introduces a{" "}
                <strong>Pattern Abstraction Layer</strong>—the critical innovation that removes framework-specific
                bias and creates a shared behavioral language.
              </p>
              <p style={bodyText}>
                <strong>25 Universal Behavioral Patterns</strong> detected independently across all frameworks:
              </p>
              <div style={patternGrid}>
                <PatternCategory title="Cognitive" patterns={["Abstract thinking", "Sensory appreciation", "Pattern recognition", "Detail orientation", "Present-moment focus"]} />
                <PatternCategory title="Creation" patterns={["Craftsmanship drive", "Structure preference", "Improvisation comfort", "Pace preference", "Output orientation"]} />
                <PatternCategory title="Emotional" patterns={["Emotional stability", "Expressiveness", "Environmental sensitivity", "Introspection depth", "Optimism baseline"]} />
                <PatternCategory title="Social" patterns={["Social energy", "Group size preference", "Conflict navigation", "Influence drive", "Collaborative preference"]} />
                <PatternCategory title="Values" patterns={["Tradition orientation", "Novelty seeking", "Stability seeking", "Meaning orientation"]} />
                <PatternCategory title="Environment" patterns={["Nature connection"]} />
              </div>
              <p style={noteText}>
                Each pattern requires <strong>agreement across frameworks</strong> and carries a confidence score (0.5–1.0).
                This creates cross-framework convergences, not raw traits.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={stepCard}>
            <div style={stepNumber}>3</div>
            <div style={stepContent}>
              <h3 style={stepTitle}>Cultural Code Matching</h3>
              <p style={bodyText}>
                Each of the 20 Cultural Codes defines:
              </p>
              <ul style={listStyle}>
                <li style={listItem}><strong>Core patterns</strong> (non-negotiable, weighted ×1.0)</li>
                <li style={listItem}><strong>Supporting patterns</strong> (add nuance, weighted ×0.5)</li>
                <li style={listItem}><strong>Incompatible patterns</strong> (penalized at −0.3 weight)</li>
                <li style={listItem}><strong>Minimum coherence threshold</strong> (prevents random matches)</li>
              </ul>
              <p style={bodyText}>
                This prevents "everyone fits everything" and ensures only behaviorally coherent matches appear.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div style={stepCard}>
            <div style={stepNumber}>4</div>
            <div style={stepContent}>
              <h3 style={stepTitle}>Result Interpretation</h3>
              <p style={bodyText}>
                You receive your top 3 Cultural Code matches (Primary, Secondary, Tertiary) with confidence scores
                (High ≥75%, Moderate 60–74%, Low &lt;60%).
              </p>
              <div style={warningCard}>
                <div style={warningIcon}>⚠</div>
                <div>
                  <div style={warningTitle}>What Your Result DOES NOT Mean:</div>
                  <ul style={listStyle}>
                    <li style={listItem}>You are from that culture</li>
                    <li style={listItem}>You behave like a stereotype</li>
                    <li style={listItem}>You are fixed or permanent</li>
                  </ul>
                </div>
              </div>
              <div style={successCard}>
                <div style={successIcon}>✓</div>
                <div>
                  <div style={successTitle}>What Your Result Means:</div>
                  <p style={bodyText}>
                    "Given how you currently think, regulate, relate, and orient meaning—this archetypal
                    tradition fits you best." It's your <strong>current lens alignment</strong>, not your identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={divider} />

        {/* Scientific Positioning */}
        <section style={section}>
          <h2 style={h2}>Why This Is Defensible (Not Pseudoscience)</h2>
          <p style={bodyText}>Avirage is:</p>
          <div style={twoColGrid}>
            <div style={checkCard}>
              <div style={checkIcon}>✓</div>
              <div>
                <div style={checkTitle}>Inspired By</div>
                <ul style={listStyle}>
                  <li style={listItem}>Psychology (Big Five, MBTI, Enneagram)</li>
                  <li style={listItem}>Anthropology (cultural patterns)</li>
                  <li style={listItem}>Cultural studies (archetypal theory)</li>
                </ul>
              </div>
            </div>
            <div style={xCard}>
              <div style={xIcon}>✗</div>
              <div>
                <div style={xTitle}>NOT Claiming</div>
                <ul style={listStyle}>
                  <li style={listItem}>Clinical diagnosis</li>
                  <li style={listItem}>Predictive certainty</li>
                  <li style={listItem}>Biological determinism</li>
                </ul>
              </div>
            </div>
          </div>
          <p style={bodyText}>
            Avirage operates as a <strong>structured interpretive system</strong>, not a medical or psychological
            instrument. It's culturally informed self-knowledge, not fate.
          </p>
        </section>

        <div style={divider} />

        {/* Intellectual Foundation */}
        <section style={section}>
          <h2 style={h2}>Why This Works</h2>
          <div style={principleCard}>
            <p style={principleText}>
              <strong>1. Humans organize meaning culturally.</strong> We don't operate in isolation—we inherit
              and align with cultural logics.
            </p>
            <p style={principleText}>
              <strong>2. Cultures encode repeatable behavioral logics.</strong> Cultural traditions aren't random—they
              represent coherent ways of being.
            </p>
            <p style={principleText}>
              <strong>3. Individuals unconsciously align with certain logics.</strong> You gravitate toward frameworks
              that feel "right" to you.
            </p>
            <p style={principleText}>
              <strong>4. Those alignments affect outcomes.</strong> Your lens impacts work satisfaction, social belonging,
              lifestyle harmony, and creative output.
            </p>
            <p style={principleText}>
              <strong>Avirage makes that implicit alignment explicit.</strong>
            </p>
          </div>
        </section>

        <div style={divider} />

        {/* Use Cases */}
        <section style={section}>
          <h2 style={h2}>What Avirage Is For</h2>
          <div style={useCaseGrid}>
            <UseCaseCard title="Self-Understanding" description="Discover the lens through which you naturally operate" />
            <UseCaseCard title="Lifestyle Alignment" description="Find environments, activities, and rhythms that fit your lens" />
            <UseCaseCard title="Community Matching" description="Connect with others who share your cultural logic" />
            <UseCaseCard title="Creative Direction" description="Understand your aesthetic and creative instincts" />
            <UseCaseCard title="Team Dynamics" description="Map team members' lenses for better collaboration" />
            <UseCaseCard title="Career Fit" description="Identify work cultures that align with your worldview" />
          </div>
        </section>

        {/* CTA */}
        <section style={ctaSection}>
          <h2 style={h2}>Ready to discover your lens?</h2>
          <Link href="/quiz" style={ctaBtn}>
            Take the Quiz
          </Link>
        </section>
      </div>

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

function FrameworkCard({ name, description }: { name: string; description: string }) {
  return (
    <div style={frameworkCardStyle}>
      <div style={frameworkName}>{name}</div>
      <p style={frameworkDesc}>{description}</p>
    </div>
  );
}

function PatternCategory({ title, patterns }: { title: string; patterns: string[] }) {
  return (
    <div style={patternCategoryStyle}>
      <div style={patternCategoryTitle}>{title}</div>
      <ul style={patternListStyle}>
        {patterns.map((p, i) => (
          <li key={i} style={patternItem}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function UseCaseCard({ title, description }: { title: string; description: string }) {
  return (
    <div style={useCaseCardStyle}>
      <div style={useCaseTitle}>{title}</div>
      <p style={useCaseDesc}>{description}</p>
    </div>
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
  maxWidth: 1200,
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

// Content
const contentContainer: CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "60px 24px",
};

const section: CSSProperties = {
  marginBottom: 60,
};

const h2: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 32,
  fontWeight: 900,
  marginBottom: 24,
  color: THEME.textPrimary,
};

const bodyText: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: THEME.textSecondary,
  marginBottom: 16,
};

const listStyle: CSSProperties = {
  margin: "16px 0",
  paddingLeft: 24,
};

const listItem: CSSProperties = {
  marginBottom: 10,
  lineHeight: 1.7,
  color: THEME.textSecondary,
};

const divider: CSSProperties = {
  height: 1,
  background: THEME.softBorder,
  margin: "60px 0",
};

// Comparison
const comparisonCard: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
  padding: 32,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  marginBottom: 24,
};

const comparisonCol: CSSProperties = {};

const comparisonLabel: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 12,
  letterSpacing: "0.04em",
};

// Steps
const stepCard: CSSProperties = {
  display: "flex",
  gap: 24,
  marginBottom: 32,
  padding: 32,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
};

const stepNumber: CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: 12,
  border: `1px solid rgba(201,169,106,0.30)`,
  background: "rgba(201,169,106,0.08)",
  color: THEME.accent,
  fontWeight: 900,
  fontSize: 20,
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
};

const stepContent: CSSProperties = {
  flex: 1,
};

const stepTitle: CSSProperties = {
  fontSize: 20,
  fontWeight: 900,
  marginBottom: 16,
  color: THEME.textPrimary,
};

const noteText: CSSProperties = {
  fontSize: 14,
  color: THEME.textMuted,
  fontStyle: "italic",
  marginTop: 16,
};

// Frameworks
const frameworkGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 16,
  margin: "24px 0",
};

const frameworkCardStyle: CSSProperties = {
  padding: 20,
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: "rgba(255,255,255,0.02)",
};

const frameworkName: CSSProperties = {
  fontSize: 15,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 8,
};

const frameworkDesc: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  color: THEME.textMuted,
  margin: 0,
};

// Patterns
const patternGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 20,
  margin: "24px 0",
};

const patternCategoryStyle: CSSProperties = {
  padding: 16,
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: "rgba(255,255,255,0.02)",
};

const patternCategoryTitle: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 12,
  letterSpacing: "0.04em",
};

const patternListStyle: CSSProperties = {
  margin: 0,
  paddingLeft: 16,
  listStyle: "disc",
};

const patternItem: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.6,
  color: THEME.textMuted,
  marginBottom: 6,
};

// Warning/Success cards
const warningCard: CSSProperties = {
  display: "flex",
  gap: 16,
  padding: 20,
  borderRadius: 12,
  border: "1px solid rgba(255,107,107,0.30)",
  background: "rgba(255,107,107,0.05)",
  marginBottom: 16,
};

const warningIcon: CSSProperties = {
  fontSize: 24,
  color: "#ff6b6b",
};

const warningTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: "#ff6b6b",
  marginBottom: 12,
};

const successCard: CSSProperties = {
  display: "flex",
  gap: 16,
  padding: 20,
  borderRadius: 12,
  border: `1px solid rgba(201,169,106,0.30)`,
  background: "rgba(201,169,106,0.05)",
};

const successIcon: CSSProperties = {
  fontSize: 24,
  color: THEME.accent,
};

const successTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 12,
};

// Check/X cards
const twoColGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
  margin: "24px 0",
};

const checkCard: CSSProperties = {
  display: "flex",
  gap: 16,
  padding: 24,
  borderRadius: 12,
  border: `1px solid rgba(201,169,106,0.30)`,
  background: "rgba(201,169,106,0.05)",
};

const checkIcon: CSSProperties = {
  fontSize: 24,
  color: THEME.accent,
};

const checkTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 12,
};

const xCard: CSSProperties = {
  display: "flex",
  gap: 16,
  padding: 24,
  borderRadius: 12,
  border: "1px solid rgba(255,107,107,0.30)",
  background: "rgba(255,107,107,0.05)",
};

const xIcon: CSSProperties = {
  fontSize: 24,
  color: "#ff6b6b",
};

const xTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: "#ff6b6b",
  marginBottom: 12,
};

// Principles
const principleCard: CSSProperties = {
  padding: 32,
  borderRadius: 16,
  border: `1px solid ${THEME.border}`,
  background: THEME.panelStrong,
};

const principleText: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.8,
  color: THEME.textSecondary,
  marginBottom: 20,
};

// Use Cases
const useCaseGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 20,
  margin: "24px 0",
};

const useCaseCardStyle: CSSProperties = {
  padding: 24,
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
};

const useCaseTitle: CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  color: THEME.textPrimary,
  marginBottom: 8,
};

const useCaseDesc: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  color: THEME.textMuted,
  margin: 0,
};

// CTA
const ctaSection: CSSProperties = {
  textAlign: "center",
  padding: "60px 0",
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
  marginTop: 24,
};

// Footer
const footerStyle: CSSProperties = {
  borderTop: `1px solid ${THEME.softBorder}`,
  padding: "60px 24px 32px",
  background: "rgba(0,0,0,0.2)",
};

const footerContainer: CSSProperties = {
  maxWidth: 1200,
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
  maxWidth: 1200,
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
