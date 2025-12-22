// app/codepages/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { CODE_PAGES, type CodeSlug, type CodePage, type CodePageImage } from "@/lib/codePages";

type Params = Promise<{ slug: string }>; // Changed this line

function normalizeSlug(input: string): string {
  return decodeURIComponent(input).trim().toLowerCase();
}

function isCodeSlug(value: string): value is CodeSlug {
  return value in CODE_PAGES;
}

// Helps Next prebuild / recognize these routes
export function generateStaticParams(): Array<{ slug: CodeSlug }> {
  return (Object.keys(CODE_PAGES) as CodeSlug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug: rawSlug } = await params; // Added await
  const slug = normalizeSlug(rawSlug);
  
  if (!isCodeSlug(slug)) return { title: "Code Page • Avirage" };

  const page = CODE_PAGES[slug];
  return {
    title: `${page.codeName} • Avirage`,
    description:
      page.snapshot ||
      `Explore the ${page.codeName} archetypal tradition lens and what it means for your lifestyle.`,
  };
}

export default async function CodePageRoute({ params }: { params: Params }) {
  const { slug: rawSlug } = await params; // Added await
  const slug = normalizeSlug(rawSlug);

  if (!isCodeSlug(slug)) notFound();

  const page: CodePage = CODE_PAGES[slug];

  return (
    <main style={wrap}>
      <div style={container}>
        {/* Top bar */}
        <div style={topBar}>
          <Link href="/" style={linkGhost}>
            ← Back to results
          </Link>

          <div style={pillRow}>
            <span style={pill}>{page.codeName}</span>
            <span style={pillMuted}>{page.fullName}</span>
          </div>
        </div>

        {/* Hero */}
        <section style={heroCard}>
          <div style={heroKicker}>Code Page</div>
          <h1 style={h1}>{page.codeName}</h1>
          <p style={heroP}>{page.snapshot}</p>

          {/* Optional cover image from codePages.ts (recommended) */}
          {page.images?.cover?.src ? <CoverImage img={page.images.cover} /> : null}

          {/* Optional “manual” fallback image (keeps your naming convention) */}
          {!page.images?.cover?.src ? (
            <div style={{ marginTop: 16 }}>
              <img
                src={`/codepages/${slug}/hero.jpg`}
                alt={`${page.codeName} visual`}
                style={heroImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ) : null}
        </section>

        {/* Content grid */}
        <div style={grid}>
          {/* Left column */}
          <section style={card}>
            {/* Lens */}
            <div style={sectionKicker}>Lens</div>
            <h2 style={h2}>{page.lens.title}</h2>
            <p style={p}>{page.lens.description}</p>
            <ul style={ul}>
              {page.lens.inPlainEnglish.map((x: string, i: number) => (
                <li key={i} style={li}>
                  {x}
                </li>
              ))}
            </ul>

            {/* Traits */}
            <div style={divider} />
            <div style={sectionKicker}>Traits</div>
            <h2 style={h2}>{page.traits.headline}</h2>

            <div style={{ display: "grid", gap: 12 }}>
              {page.traits.highlights.map((t: { label: string; meaning: string }, i: number) => (
                <div key={i} style={miniCard}>
                  <div style={miniTitle}>{t.label}</div>
                  <div style={miniText}>{t.meaning}</div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div style={divider} />
            <div style={sectionKicker}>Recommendations</div>

            <Grid4
              items={[
                { title: "Lifestyle", list: page.recommendations.lifestyle },
                { title: "Places", list: page.recommendations.places },
                { title: "Music", list: page.recommendations.music },
                { title: "Activities", list: page.recommendations.activities },
              ]}
            />

            {/* Strengths / Watchouts / Try this week */}
            <div style={divider} />
            <Grid3
              items={[
                { title: "Strengths", list: page.strengths },
                { title: "Watchouts", list: page.watchouts },
                { title: "Try this week", list: page.tryThisWeek },
              ]}
            />

            {/* Notes (optional) */}
            {page.notes?.length ? (
              <>
                <div style={divider} />
                <div style={sectionKicker}>Notes</div>
                <ul style={ul}>
                  {page.notes.map((x: string, i: number) => (
                    <li key={i} style={li}>
                      {x}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          {/* Right column */}
          <aside style={card}>
            <div style={sectionKicker}>Origin (Level 1 → 4)</div>

            <div style={kvRow}>
              <div style={kvKey}>Level 1</div>
              <div style={kvVal}>{page.origin.level1}</div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ ...kvKey, marginBottom: 6 }}>Lineage</div>
              <ul style={{ ...ul, marginTop: 0 }}>
                {page.origin.lineage.map((x: string, i: number) => (
                  <li key={i} style={li}>
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            {page.origin.notes ? <p style={pSmall}>{page.origin.notes}</p> : null}

            {/* Gallery images (optional) */}
            {page.images?.gallery?.length ? (
              <>
                <div style={divider} />
                <div style={sectionKicker}>Gallery</div>
                <div style={{ display: "grid", gap: 12 }}>
                  {page.images.gallery.map((img: CodePageImage, i: number) => (
                    <figure key={i} style={{ margin: 0 }}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={sideImg}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {img.caption ? <figcaption style={caption}>{img.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div style={divider} />
                <div style={sectionKicker}>Images (optional)</div>
                <p style={pSmall}>
                  Your convention is supported:
                  <br />
                  <code style={code}>public/codepages/{slug}/hero.jpg</code>
                  <br />
                  <code style={code}>public/codepages/{slug}/a.jpg</code> <span style={{ opacity: 0.65 }}>and</span>{" "}
                  <code style={code}>b.jpg</code>
                </p>

                <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                  <img
                    src={`/codepages/${slug}/a.jpg`}
                    alt=""
                    style={sideImg}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <img
                    src={`/codepages/${slug}/b.jpg`}
                    alt=""
                    style={sideImg}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </>
            )}
          </aside>
        </div>

        <div style={{ marginTop: 18, textAlign: "center" }}>
          <Link href="/" style={linkBtn}>
            Back to results
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ============================
   Small components
============================ */

function CoverImage({ img }: { img: CodePageImage }) {
  return (
    <div style={coverWrap}>
      <img
        src={img.src}
        alt={img.alt}
        style={coverImg}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      {img.caption ? <div style={captionBar}>{img.caption}</div> : null}
    </div>
  );
}

function Grid4({
  items,
}: {
  items: Array<{
    title: string;
    list: string[];
  }>;
}) {
  return (
    <div style={grid4}>
      {items.map((b, i) => (
        <div key={i} style={miniCard}>
          <div style={miniTitle}>{b.title}</div>
          <ul style={{ ...ul, marginTop: 10 }}>
            {b.list.map((x: string, j: number) => (
              <li key={j} style={li}>
                {x}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Grid3({
  items,
}: {
  items: Array<{
    title: string;
    list: string[];
  }>;
}) {
  return (
    <div style={grid3}>
      {items.map((b, i) => (
        <div key={i} style={miniCard}>
          <div style={miniTitle}>{b.title}</div>
          <ul style={{ ...ul, marginTop: 10 }}>
            {b.list.map((x: string, j: number) => (
              <li key={j} style={li}>
                {x}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ============================
   STYLES
============================ */

const wrap: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #070a0f 0%, #0c1118 60%, #070a0f 100%)",
  color: "white",
};

const container: CSSProperties = {
  width: "min(1100px, 92vw)",
  margin: "0 auto",
  padding: "56px 0",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui",
};

const topBar: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  marginBottom: 18,
};

const pillRow: CSSProperties = { display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" };

const pill: CSSProperties = {
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
};

const pillMuted: CSSProperties = {
  ...pill,
  opacity: 0.85,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "none",
};

const linkGhost: CSSProperties = {
  color: "rgba(255,255,255,0.85)",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
};

const linkBtn: CSSProperties = {
  display: "inline-block",
  color: "white",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  fontWeight: 850,
};

const card: CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 18,
  padding: 18,
  boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
  backdropFilter: "blur(14px)",
};

const heroCard: CSSProperties = { ...card, padding: 22 };

const heroKicker: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.68)",
  fontWeight: 800,
};

const h1: CSSProperties = {
  fontSize: 44,
  fontWeight: 950,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
  margin: "10px 0 8px",
};

const heroP: CSSProperties = { color: "rgba(255,255,255,0.78)", lineHeight: 1.7, fontSize: 15, maxWidth: 860 };

const coverWrap: CSSProperties = {
  marginTop: 16,
  borderRadius: 18,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
};

const coverImg: CSSProperties = { width: "100%", height: "auto", display: "block" };

const captionBar: CSSProperties = { padding: "10px 14px", fontSize: 13, opacity: 0.75 };

const heroImg: CSSProperties = { width: "100%", height: 320, objectFit: "cover", display: "block", borderRadius: 18 };

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.25fr 0.75fr",
  gap: 18,
  marginTop: 18,
};

const sectionKicker: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  opacity: 0.7,
  fontWeight: 850,
  marginBottom: 10,
};

const h2: CSSProperties = { fontSize: 18, fontWeight: 950, margin: "0 0 8px" };

const p: CSSProperties = { margin: 0, opacity: 0.9, lineHeight: 1.75, fontSize: 15 };

const pSmall: CSSProperties = { marginTop: 12, opacity: 0.75, lineHeight: 1.7, fontSize: 13 };

const ul: CSSProperties = { margin: "10px 0 0", paddingLeft: 18 };

const li: CSSProperties = { marginBottom: 8, opacity: 0.92, lineHeight: 1.6 };

const divider: CSSProperties = { height: 1, background: "rgba(255,255,255,0.08)", margin: "18px 0" };

const miniCard: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 14,
  padding: 14,
};

const miniTitle: CSSProperties = { fontWeight: 900, marginBottom: 4 };

const miniText: CSSProperties = { opacity: 0.86, lineHeight: 1.6, fontSize: 14 };

const grid4: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 };

const grid3: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 };

const kvRow: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" };

const kvKey: CSSProperties = { opacity: 0.7, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" };

const kvVal: CSSProperties = { fontWeight: 850 };

const sideImg: CSSProperties = {
  width: "100%",
  height: 220,
  objectFit: "cover",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  display: "block",
};

const caption: CSSProperties = { marginTop: 6, fontSize: 12, opacity: 0.75 };

const code: CSSProperties = {
  padding: "2px 8px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
};
