"use client";

import Link from "next/link";
import { CSSProperties, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


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
   FAQ DATA
============================ */

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Methodology" | "Results" | "Privacy";
}

const FAQ_DATA: FAQItem[] = [
  // GENERAL
  {
    category: "General",
    question: "What is Avirage?",
    answer: "Avirage is a lens-mapping system that identifies which archetypal cultural tradition you most strongly align with. It's not a personality test—it maps the cultural framework through which you naturally perceive, decide, and navigate the world. Think of it as discovering your 'operating system' for life rather than being classified into a personality box.",
  },
  {
    category: "General",
    question: "Is this astrology?",
    answer: "No. While Avirage uses astrology as one of four input frameworks (alongside Big Five, MBTI, and Enneagram), it's not an astrology system. Astrology provides symbolic archetypal language (element, modality) but represents only ~20% of the total signal. The innovation is the Pattern Abstraction Layer—25 behavioral patterns detected through cross-framework convergence—not astrological prediction.",
  },
  {
    category: "General",
    question: "How long does the quiz take?",
    answer: "The quiz takes approximately 10 minutes. It includes 30 questions designed to capture behavioral preferences across cognitive, emotional, social, and values dimensions, plus your birth date for the astrological component.",
  },
  {
    category: "General",
    question: "Is Avirage free?",
    answer: "Yes, taking the quiz and receiving your Cultural Code results is completely free. No credit card or payment required. We may introduce premium features in the future (like team reports or deeper analysis), but the core experience will always be free.",
  },

  // METHODOLOGY
  {
    category: "Methodology",
    question: "Is this scientifically valid?",
    answer: "Avirage is not a clinical diagnostic tool—it's a structured interpretive system inspired by psychology, anthropology, and cultural studies. It uses established frameworks (Big Five has strong scientific backing, MBTI and Enneagram have cultural validity, astrology provides archetypal language). The system's value is in pattern convergence and cultural mapping, not in making predictive medical claims. Think of it as 'culturally informed self-knowledge' rather than a lab-validated assessment.",
  },
  {
    category: "Methodology",
    question: "How does the matching algorithm work?",
    answer: "The algorithm works in 4 steps: (1) Converts quiz answers + birth date into scores across 4 frameworks, (2) Detects 25 behavioral patterns through cross-framework agreement, (3) Matches patterns to 20 Cultural Codes using weighted scoring (core patterns ×1.0, supporting ×0.5, incompatible −0.3), (4) Returns your top 3 codes with confidence scores. The Pattern Abstraction Layer is the innovation—it removes framework-specific bias and creates shared behavioral language.",
  },
  {
    category: "Methodology",
    question: "Why 20 Cultural Codes? Why these specific cultures?",
    answer: "The 20 codes were selected based on: (1) Historical cultural traditions with documented behavioral patterns, (2) Geographic and cultural diversity, (3) Distinct archetypal lenses (not overlapping), (4) Rich ethnographic and anthropological research. They're not meant to represent 'all cultures'—they're archetypal reference points. Someone might align with Shokunin (Japanese craft lens) without being Japanese, because the behavioral patterns resonate.",
  },
  {
    category: "Methodology",
    question: "What's a 'Pattern Abstraction Layer'?",
    answer: "Instead of mapping frameworks directly to Cultural Codes (which would create bias toward whichever framework you weight most), Avirage extracts 25 universal behavioral patterns that require agreement across multiple frameworks. For example, 'craftsmanship drive' needs signals from Big Five conscientiousness, MBTI sensing-judging preferences, Enneagram perfectionism, and earth element grounding. This cross-validation creates more reliable matches.",
  },

  // RESULTS
  {
    category: "Results",
    question: "Do I have to be from that culture to get that code?",
    answer: "Absolutely not. Cultural Codes are archetypal lenses, not ethnic identities. You can align with Shokunin (Japanese) without being Japanese, or Enzuka (Maasai + Zulu) without being from East Africa. The codes describe behavioral patterns and worldviews that transcend geography. You're aligning with how a culture organizes meaning, not claiming membership in that culture.",
  },
  {
    category: "Results",
    question: "Can my Cultural Code change over time?",
    answer: "Yes. Your lens can shift due to life experiences, intentional development, major transitions, or environmental changes. Some people stay aligned with one code for decades; others drift between 2-3 codes over their lifetime. Avirage captures your current lens alignment, not a permanent identity. You can retake the quiz periodically to track changes.",
  },
  {
    category: "Results",
    question: "What if I don't resonate with my result?",
    answer: "A few possibilities: (1) You might resonate more with your secondary or tertiary code—read all three, (2) You might be in transition between codes, (3) The quiz might not have captured your full context (it's 30 questions, not a clinical assessment), (4) You might be operating from a lens that's imposed (family, work) rather than natural. If the result feels off, trust your intuition—Avirage is a tool, not an authority.",
  },
  {
    category: "Results",
    question: "Why do I have three codes (Primary, Secondary, Tertiary)?",
    answer: "Most people don't fit cleanly into one archetypal lens—you're complex. The three-code system reflects that complexity: your Primary is your dominant lens (~60%+ of the time), Secondary is a strong influence (~30%), Tertiary is a minor but real pull (~10%). Over time, these can shift in priority. Some people are 'bi-cultural' in their lenses.",
  },
  {
    category: "Results",
    question: "What's the confidence score?",
    answer: "The confidence score tells you how strongly your patterns match the code. High (≥75%) = very strong alignment, Moderate (60-74%) = clear alignment with some ambiguity, Low (<60%) = weak or conflicted alignment. A low-confidence Primary might mean you're in transition or genuinely multi-lens. Confidence isn't 'better'—it's just clarity.",
  },

  // PRIVACY
  {
    category: "Privacy",
    question: "What data do you collect?",
    answer: "We collect: (1) Quiz answers, (2) Birth date (for astrology calculation), (3) Optional demographic info (name, location, gender—used only for personalization, never shared). We do NOT sell your data. We do NOT use your data for advertising. Your results are private to you. If you create an account (future feature), your data is encrypted and stored securely.",
  },
  {
    category: "Privacy",
    question: "Can I delete my data?",
    answer: "Yes. Once we implement accounts, you'll be able to delete all your data at any time from your settings. If you took the quiz without an account, your data is not stored long-term—it's only used to generate your result. For data deletion requests before account features launch, contact us at support@avirage.com.",
  },
  {
    category: "Privacy",
    question: "Is my birth date secure?",
    answer: "Yes. Your birth date is used only to calculate your sun sign, element, and modality for the astrological component. It's stored securely and never shared with third parties. We don't use it for identity verification, marketing, or anything beyond the Cultural Code calculation.",
  },
];

/* ============================
   COMPONENT
============================ */

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = ["All", "General", "Methodology", "Results", "Privacy"];

  const filteredFAQs =
    selectedCategory === "All"
      ? FAQ_DATA
      : FAQ_DATA.filter((faq) => faq.category === selectedCategory);

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
            <Link href="/codes" style={navLink}>
              Code Library
            </Link>
            <Link href="/faq" style={{ ...navLink, color: THEME.accent }}>
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
          <div style={heroKicker}>Support</div>
          <h1 style={h1}>Frequently Asked Questions</h1>
          <p style={heroDesc}>
            Everything you need to know about Avirage, Cultural Codes, and how the system works.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section style={filterSection}>
        <div style={container}>
          <div style={categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                style={selectedCategory === cat ? activeCategoryBtn : categoryBtn}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section style={faqSection}>
        <div style={container}>
          <div style={faqList}>
            {filteredFAQs.map((faq, index) => (
              <FAQAccordion
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section style={ctaSection}>
        <div style={ctaCard}>
          <h2 style={ctaTitle}>Still have questions?</h2>
          <p style={ctaText}>
            We're here to help. Reach out to us at{" "}
            <a href="mailto:support@avirage.com" style={emailLink}>
              support@avirage.com
            </a>
          </p>
          <Link href="/quiz" style={ctaBtn}>
            Or Just Take the Quiz
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
              <Link href="/about" style={footerLink}>
                About
              </Link>
              <Link href="/codes" style={footerLink}>
                Code Library
              </Link>
              <Link href="/faq" style={footerLink}>
                FAQ
              </Link>
            </div>

            <div style={footerCol}>
              <div style={footerColTitle}>Start</div>
              <Link href="/quiz" style={footerLink}>
                Take Quiz
              </Link>
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

function FAQAccordion({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={accordionItem}>
      <button onClick={onToggle} style={accordionButton}>
        <div style={accordionQuestion}>
          <span style={categoryBadge}>{faq.category}</span>
          <span style={questionText}>{faq.question}</span>
        </div>
        <span style={accordionIcon}>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div style={accordionAnswer}>
          <p style={answerText}>{faq.answer}</p>
        </div>
      )}
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

// Navigation (same as other pages)
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

// Container
const container: CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "0 24px",
};

// Filters
const filterSection: CSSProperties = {
  padding: "40px 0",
  borderBottom: `1px solid ${THEME.softBorder}`,
};

const categoryTabs: CSSProperties = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  flexWrap: "wrap",
};

const categoryBtn: CSSProperties = {
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 700,
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: "transparent",
  color: THEME.textSecondary,
  cursor: "pointer",
  transition: "all 0.2s",
};

const activeCategoryBtn: CSSProperties = {
  ...categoryBtn,
  border: `1px solid ${THEME.accent}`,
  background: "rgba(201,169,106,0.10)",
  color: THEME.accent,
};

// FAQ
const faqSection: CSSProperties = {
  padding: "60px 0 80px",
};

const faqList: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const accordionItem: CSSProperties = {
  borderRadius: 14,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  overflow: "hidden",
};

const accordionButton: CSSProperties = {
  width: "100%",
  padding: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  gap: 20,
};

const accordionQuestion: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const categoryBadge: CSSProperties = {
  display: "inline-block",
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: THEME.accent,
  background: "rgba(201,169,106,0.10)",
  border: `1px solid rgba(201,169,106,0.25)`,
  padding: "4px 10px",
  borderRadius: 8,
  alignSelf: "flex-start",
};

const questionText: CSSProperties = {
  fontSize: 17,
  fontWeight: 900,
  color: THEME.textPrimary,
  lineHeight: 1.5,
};

const accordionIcon: CSSProperties = {
  fontSize: 24,
  fontWeight: 300,
  color: THEME.accent,
  flexShrink: 0,
};

const accordionAnswer: CSSProperties = {
  padding: "0 24px 24px",
  borderTop: `1px solid ${THEME.softBorder}`,
};

const answerText: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.8,
  color: THEME.textSecondary,
  margin: "16px 0 0",
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

const emailLink: CSSProperties = {
  color: THEME.accent,
  textDecoration: "none",
  fontWeight: 700,
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
