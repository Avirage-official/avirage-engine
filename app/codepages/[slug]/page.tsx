// app/codepages/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CODE_PAGES, type CodeSlug } from "@/lib/codePages";

type Params = { slug: string };

function normalizeSlug(input: string): string {
  // Handle URL encoding + casing
  return decodeURIComponent(input).trim().toLowerCase();
}

function isCodeSlug(value: string): value is CodeSlug {
  return value in CODE_PAGES;
}

// (Optional) helps Next prebuild / recognize these routes
export function generateStaticParams(): Array<{ slug: CodeSlug }> {
  return (Object.keys(CODE_PAGES) as CodeSlug[]).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const slug = normalizeSlug(params.slug);
  if (!isCodeSlug(slug)) return { title: "Code Page • Avirage" };

  const page = CODE_PAGES[slug];
  return {
    title: `${page.codeName} • Avirage`,
    description:
      page.snapshot ||
      `Explore the ${page.codeName} archetypal tradition lens and what it means for your lifestyle.`,
  };
}

export default function CodePage({ params }: { params: Params }) {
  const slug = normalizeSlug(params.slug);

  if (!isCodeSlug(slug)) {
    notFound();
  }

  const page = CODE_PAGES[slug];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "64px 20px",
        background: "linear-gradient(180deg, #0b0f14 0%, #121820 100%)",
        color: "#e6e9ee",
        fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ opacity: 0.7, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Avirage Code Page
          </div>
          <h1 style={{ fontSize: 46, margin: "10px 0 6px", lineHeight: 1.08 }}>
            {page.codeName}
          </h1>
          <div style={{ opacity: 0.85, fontSize: 15 }}>
            {page.fullName}
          </div>
        </div>

        {/* Cover image (optional) */}
        {page.images?.cover?.src ? (
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              marginBottom: 26,
            }}
          >
            <img
              src={page.images.cover.src}
              alt={page.images.cover.alt}
              style={{ width: "100%", height: "auto", display: "block" }}
              onError={(e) => {
                // Hide if missing
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            {page.images.cover.caption ? (
              <div style={{ padding: "10px 14px", fontSize: 13, opacity: 0.75 }}>
                {page.images.cover.caption}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Snapshot */}
        <section style={card}>
          <div style={sectionKicker}>Snapshot</div>
          <p style={p}>{page.snapshot}</p>
        </section>

        {/* Origin */}
        <section style={card}>
          <div style={sectionKicker}>Origin (Level 1 → 4)</div>
          <div style={{ fontSize: 15, marginBottom: 10, opacity: 0.9 }}>
            <strong>Level 1:</strong> {page.origin.level1}
          </div>
          <ul style={ul}>
            {page.origin.lineage.map((x: string, i: number) => (
              <li key={i} style={li}>
                {x}
              </li>
            ))}
          </ul>
          {page.origin.notes ? <p style={{ ...p, opacity: 0.8 }}>{page.origin.notes}</p> : null}
        </section>

        {/* Lens */}
        <section style={card}>
          <div style={sectionKicker}>Lens</div>
          <h2 style={h2}>{page.lens.title}</h2>
          <p style={p}>{page.lens.description}</p>
          <ul style={ul}>
            {page.lens.inPlainEnglish.map((x: string, i: number) => ...) => (
              <li key={i} style={li}>
                {x}
              </li>
            ))}
          </ul>
        </section>

        {/* Traits */}
        <section style={card}>
          <div style={sectionKicker}>Traits</div>
          <h2 style={h2}>{page.traits.headline}</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {page.traits.highlights.map((t, i) => (
              <div key={i} style={miniCard}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{t.label}</div>
                <div style={{ opacity: 0.85, lineHeight: 1.6 }}>{t.meaning}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Lifestyle / Places / Music / Activities */}
        <section style={card}>
          <div style={sectionKicker}>Lifestyle fit</div>
          <Grid4
            items={[
              { title: "Lifestyle", list: page.recommendations.lifestyle },
              { title: "Places", list: page.recommendations.places },
              { title: "Music", list: page.recommendations.music },
              { title: "Activities", list: page.recommendations.activities },
            ]}
          />
        </section>

        {/* Strengths / Watchouts / Try this week */}
        <section style={card}>
          <div style={sectionKicker}>Practical guidance</div>
          <Grid3
            items={[
              { title: "Strengths", list: page.strengths },
              { title: "Watchouts", list: page.watchouts },
              { title: "Try this week", list: page.tryThisWeek },
            ]}
          />
        </section>

        {/* Gallery (optional) */}
        {page.images?.gallery && page.images.gallery.length > 0 ? (
          <section style={card}>
            <div style={sectionKicker}>Gallery</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {page.images.gallery.map((img, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {img.caption ? (
                    <div style={{ padding: "10px 12px", fontSize: 13, opacity: 0.75 }}>
                      {img.caption}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Notes (optional) */}
        {page.notes && page.notes.length > 0 ? (
          <section style={card}>
            <div style={sectionKicker}>Notes</div>
            <ul style={ul}>
              {page.notes.map((x: string, i: number) => ...) => (
                <li key={i} style={li}>
                  {x}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}

/* ==============
   Small UI helpers
============== */

function Grid4({
  items,
}: {
  items: Array<{ title: string; list: string[] }>;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
      {items.map((b, idx) => (
        <div key={idx} style={miniCard}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>{b.title}</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, opacity: 0.9 }}>
            {b.list.map((x: string, i: number) => ...) => (
              <li key={i}>{x}</li>
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
  items: Array<{ title: string; list: string[] }>;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
      {items.map((b, idx) => (
        <div key={idx} style={miniCard}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>{b.title}</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, opacity: 0.9 }}>
            {b.list.map((x: string, i: number) => ...) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ==============
   Styles
============== */

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 18,
  padding: 22,
  marginBottom: 16,
  backdropFilter: "blur(14px)",
};

const miniCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 16,
  padding: 16,
};

const sectionKicker: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  opacity: 0.7,
  marginBottom: 10,
};

const h2: React.CSSProperties = {
  fontSize: 22,
  margin: "0 0 8px",
};

const p: React.CSSProperties = {
  margin: 0,
  lineHeight: 1.85,
  fontSize: 15,
  opacity: 0.9,
};

const ul: React.CSSProperties = {
  margin: "10px 0 0",
  paddingLeft: 18,
  lineHeight: 1.8,
  opacity: 0.9,
};

const li: React.CSSProperties = {
  marginBottom: 6,
};
