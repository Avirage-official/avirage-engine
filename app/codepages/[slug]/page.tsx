// app/codepages/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// IMPORTANT:
// This page expects you have: lib/codePages.ts exporting:
// - CodeSlug (union of 20 slugs, lowercase, no accents) and
// - CODE_PAGES: Record<CodeSlug, CodePageLike>
//
// Your images stay exactly as you said:
// public/codepages/<slug>/<filename>  (e.g. public/codepages/shokunin/hero.jpg)

import { CODE_PAGES, type CodeSlug } from "@/lib/codePages";

type Params = { slug: string };

type CodePageLike = {
  slug: CodeSlug;
  codeName: string; // "Shokunin"
  fullName?: string; // "Japanese"
  origin?: string;
  tagline?: string;
  summary?: string;

  // Images are just aesthetic: keep it simple.
  // Put filenames only (NOT full paths). We will resolve to /codepages/<slug>/<filename>
  images?: {
    hero?: string; // e.g. "hero.jpg"
    gallery?: string[]; // e.g. ["1.jpg","2.jpg"]
  };

  // Optional educational content blocks
  sections?: Array<{
    title: string;
    body: string; // keep as plain text for now
  }>;

  // Optional “recommendations” buckets (activities/places/music etc.)
  recommendations?: Array<{
    title: string; // e.g. "Places that fit your lens"
    items: string[];
  }>;

  // Optional traits / signals
  traits?: Array<{
    label: string;
    value: string; // e.g. "High"
    note?: string;
  }>;
};

function isCodeSlug(x: string): x is CodeSlug {
  return Object.prototype.hasOwnProperty.call(CODE_PAGES, x);
}

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(CODE_PAGES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const slug = params.slug;
  if (!isCodeSlug(slug)) return { title: "Code Page • Avirage" };

  const page = (CODE_PAGES as Record<CodeSlug, CodePageLike>)[slug];
  const title = `${page.codeName} • Avirage`;
  const description =
    page.summary ||
    page.tagline ||
    `Learn the ${page.codeName} lens, its origin, and what it suggests about how you move through the world.`;

  return { title, description };
}

export default function CodePage({ params }: { params: Params }) {
  const slug = params.slug;

  if (!isCodeSlug(slug)) notFound();

  const page = (CODE_PAGES as Record<CodeSlug, CodePageLike>)[slug];

  const heroFile = page.images?.hero || "hero.jpg"; // you can keep a default hero.jpg for each folder
  const heroSrc = `/codepages/${page.slug}/${heroFile}`;

  const gallery = page.images?.gallery || [];
  const hasAnyGallery = gallery.length > 0;

  return (
    <main style={styles.shell}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.brand}>
          <div style={styles.brandMark} />
          <div>
            <div style={styles.brandName}>Avirage</div>
            <div style={styles.brandSub}>Cultural lens archive</div>
          </div>
        </div>

        <div style={styles.topActions}>
          <Link href="/" style={styles.linkButton}>
            Retake quiz
          </Link>
        </div>
      </div>

      {/* Page */}
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.kicker}>CULTURAL CODE</div>
          <h1 style={styles.h1}>{page.codeName}</h1>
          <div style={styles.metaRow}>
            {page.fullName ? <span style={styles.metaPill}>{page.fullName}</span> : null}
            {page.origin ? <span style={styles.metaPill}>{page.origin}</span> : null}
            <span style={styles.metaPill}>Slug: {page.slug}</span>
          </div>

          {page.tagline ? <p style={styles.tagline}>{page.tagline}</p> : null}
        </div>

        {/* Hero */}
        <section style={styles.heroSection}>
          <div style={styles.heroCard}>
            <img
              src={heroSrc}
              alt={`${page.codeName} hero`}
              style={styles.heroImg}
              onError={(e) => {
                // If hero isn't present yet, just hide the hero gracefully.
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div style={styles.heroOverlay} />
            <div style={styles.heroText}>
              <div style={styles.heroTitle}>What this lens points to</div>
              <div style={styles.heroBody}>
                {page.summary ||
                  "This page is a compact educational briefing: where the code comes from, what it tends to value, and what environments usually fit people who resonate with it."}
              </div>

              <div style={styles.heroCtas}>
                <a href="#meaning" style={styles.primaryButton}>
                  Start reading
                </a>
                <Link href="/" style={styles.secondaryButton}>
                  Back to results
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Traits */}
        {page.traits && page.traits.length > 0 ? (
          <section style={styles.section}>
            <h2 style={styles.h2}>Core signals</h2>
            <div style={styles.grid3}>
              {page.traits.map((t, idx) => (
                <div key={idx} style={styles.card}>
                  <div style={styles.cardLabel}>{t.label}</div>
                  <div style={styles.cardValue}>{t.value}</div>
                  {t.note ? <div style={styles.cardNote}>{t.note}</div> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Sections */}
        <section id="meaning" style={styles.section}>
          <h2 style={styles.h2}>Meaning & origin</h2>

          <div style={styles.stack}>
            {(page.sections && page.sections.length > 0
              ? page.sections
              : [
                  {
                    title: "What this code is (and isn’t)",
                    body:
                      "A code is a lens: a pattern of preferences in how you approach order, beauty, social energy, tradition, and meaning-making. It’s not a label that limits you—more like a default ‘operating system’ you can recognize and use intentionally.",
                  },
                  {
                    title: "How the cultural linkage works",
                    body:
                      "Your archetype is inspired by real cultural traditions (Level 1 origins) and how their values and practices shape daily life. We translate those recurring human patterns into a modern lens description—without claiming you ‘are’ that culture.",
                  },
                ]).map((s, idx) => (
              <div key={idx} style={styles.longCard}>
                <div style={styles.longCardTitle}>{s.title}</div>
                <p style={styles.longCardBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        {page.recommendations && page.recommendations.length > 0 ? (
          <section style={styles.section}>
            <h2 style={styles.h2}>Where you tend to thrive</h2>

            <div style={styles.grid2}>
              {page.recommendations.map((bucket, idx) => (
                <div key={idx} style={styles.longCard}>
                  <div style={styles.longCardTitle}>{bucket.title}</div>
                  <ul style={styles.ul}>
                    {bucket.items.map((item, i) => (
                      <li key={i} style={styles.li}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Gallery */}
        {hasAnyGallery ? (
          <section style={styles.section}>
            <h2 style={styles.h2}>Visual references</h2>
            <div style={styles.gallery}>
              {gallery.map((file, idx) => {
                const src = `/codepages/${page.slug}/${file}`;
                return (
                  <div key={idx} style={styles.galleryItem}>
                    <img
                      src={src}
                      alt={`${page.codeName} image ${idx + 1}`}
                      style={styles.galleryImg}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Footer actions */}
        <section style={{ ...styles.section, paddingBottom: 90 }}>
          <div style={styles.footerCard}>
            <div style={styles.footerTitle}>Next step</div>
            <div style={styles.footerBody}>
              If you want these pages to feel *trustworthy + professional*, the win is consistency: same structure across all
              20 codes, clean images, and careful wording about “lens” vs “identity.”
            </div>
            <div style={styles.footerButtons}>
              <Link href="/" style={styles.primaryButton}>
                Back to results
              </Link>
              <a href="#meaning" style={styles.secondaryButton}>
                Re-read definition
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(201,169,106,0.10), transparent 60%), radial-gradient(900px 500px at 85% 35%, rgba(120,160,255,0.10), transparent 55%), linear-gradient(180deg, #0b0f14 0%, #111823 100%)",
    color: "#e6e9ee",
  },
  topBar: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "22px 22px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  brandMark: {
    width: 12,
    height: 12,
    borderRadius: 999,
    background: "linear-gradient(135deg, #c9a96a, #7aa0ff)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  brandName: { fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12 },
  brandSub: { fontSize: 12, opacity: 0.65 },
  topActions: { display: "flex", gap: 10, alignItems: "center" },
  linkButton: {
    textDecoration: "none",
    color: "#c9a96a",
    border: "1px solid rgba(201,169,106,0.35)",
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    background: "rgba(0,0,0,0.15)",
  },
  container: { maxWidth: 1100, margin: "0 auto", padding: "10px 22px" },
  header: {
    padding: "18px 0 18px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    marginBottom: 18,
  },
  kicker: { fontSize: 11, letterSpacing: "0.25em", opacity: 0.7, fontWeight: 800 },
  h1: { margin: "10px 0 10px", fontSize: "3rem", lineHeight: 1.05, letterSpacing: "-0.02em" },
  metaRow: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 },
  metaPill: {
    fontSize: 12,
    padding: "8px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "rgba(230,233,238,0.85)",
  },
  tagline: { marginTop: 14, maxWidth: 820, color: "rgba(230,233,238,0.75)", lineHeight: 1.7, fontSize: 15 },

  heroSection: { marginTop: 18 },
  heroCard: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
    minHeight: 280,
  },
  heroImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.55,
    transform: "scale(1.02)",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(9,12,16,0.85) 0%, rgba(9,12,16,0.55) 45%, rgba(9,12,16,0.25) 100%)",
  },
  heroText: { position: "relative", zIndex: 1, padding: "26px 22px", maxWidth: 780 },
  heroTitle: { fontSize: 14, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85 },
  heroBody: { marginTop: 10, fontSize: 15, lineHeight: 1.75, color: "rgba(230,233,238,0.78)" },
  heroCtas: { marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" },

  primaryButton: {
    display: "inline-block",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#0b0f14",
    background: "linear-gradient(135deg, #c9a96a, #e9d7a4)",
    border: "1px solid rgba(255,255,255,0.18)",
  },
  secondaryButton: {
    display: "inline-block",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(230,233,238,0.88)",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  section: { marginTop: 28, paddingTop: 4 },
  h2: { fontSize: 18, margin: "0 0 14px", letterSpacing: "0.02em" },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
  card: {
    borderRadius: 16,
    padding: "14px 14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  cardLabel: { fontSize: 12, opacity: 0.7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" },
  cardValue: { marginTop: 8, fontSize: 18, fontWeight: 900 },
  cardNote: { marginTop: 8, fontSize: 13, lineHeight: 1.6, color: "rgba(230,233,238,0.72)" },

  stack: { display: "flex", flexDirection: "column", gap: 12 },
  longCard: {
    borderRadius: 18,
    padding: "18px 18px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  longCardTitle: { fontSize: 14, fontWeight: 900, letterSpacing: "0.02em" },
  longCardBody: { marginTop: 10, color: "rgba(230,233,238,0.75)", lineHeight: 1.8, fontSize: 14 },

  ul: { marginTop: 10, paddingLeft: 18 },
  li: { margin: "8px 0", color: "rgba(230,233,238,0.75)", lineHeight: 1.6, fontSize: 14 },

  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
  },
  galleryItem: {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.02)",
    height: 170,
  },
  galleryImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 },

  footerCard: {
    borderRadius: 20,
    padding: "20px 18px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  footerTitle: { fontSize: 14, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" },
  footerBody: { marginTop: 10, color: "rgba(230,233,238,0.75)", lineHeight: 1.75, fontSize: 14, maxWidth: 850 },
  footerButtons: { marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" },
};

