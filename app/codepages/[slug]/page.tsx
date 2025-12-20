import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CODE_PAGES, isCodeSlug, type CodeSlug } from "@/lib/codePages";

type Params = { slug?: string; Slug?: string };

export function generateStaticParams() {
  return (Object.keys(CODE_PAGES) as CodeSlug[]).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const raw = params.slug ?? params.Slug;

  if (!raw || !isCodeSlug(raw)) {
    return {
      title: "Code Page • Avirage",
      description: "Archetypal code page",
    };
  }

  const page = CODE_PAGES[raw];
  return {
    title: `${page.codeName} • Avirage`,
    description:
      (page.origin?.notes && String(page.origin.notes)) ||
      "Explore your archetypal tradition match and what it means for your life lens.",
  };
}

export default function CodePage({ params }: { params: Params }) {
  const raw = params.slug ?? params.Slug; // supports [slug] and [Slug]
  if (!raw || !isCodeSlug(raw)) notFound();

  const slug = raw as CodeSlug;
  const page = CODE_PAGES[slug];

  const wrap: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(201,169,106,0.14), transparent 60%), linear-gradient(180deg, #070a0e 0%, #0b1119 100%)",
    color: "#e6e9ee",
    padding: "48px 18px",
  };

  const container: React.CSSProperties = {
    maxWidth: 980,
    margin: "0 auto",
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 18,
    padding: 28,
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
  };

  const headerRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 18,
  };

  const badge: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(201,169,106,0.35)",
    background: "rgba(201,169,106,0.10)",
    color: "#c9a96a",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
  };

  const title: React.CSSProperties = {
    fontSize: "2.2rem",
    lineHeight: 1.15,
    margin: "6px 0 8px",
    letterSpacing: "0.02em",
    fontWeight: 800,
  };

  const subtitle: React.CSSProperties = {
    color: "rgba(230,233,238,0.72)",
    margin: 0,
    fontSize: 14,
    lineHeight: 1.7,
    maxWidth: 760,
  };

  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 18,
    marginTop: 18,
  };

  const sectionTitle: React.CSSProperties = {
    margin: "0 0 10px",
    fontSize: 14,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(230,233,238,0.72)",
    fontWeight: 800,
  };

  const list: React.CSSProperties = {
    margin: 0,
    paddingLeft: 18,
    color: "rgba(230,233,238,0.86)",
    lineHeight: 1.8,
    fontSize: 14,
  };

  const liMuted: React.CSSProperties = {
    color: "rgba(230,233,238,0.55)",
    fontStyle: "italic",
  };

  const hr: React.CSSProperties = {
    border: "none",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    margin: "20px 0",
  };

  const heroImgWrap: React.CSSProperties = {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.02)",
    minHeight: 220,
    display: "grid",
    placeItems: "center",
  };

  // Your convention: public/codepages/<slug>/hero.jpg
  const heroSrc = `/codepages/${slug}/hero.jpg`;

  return (
    <main style={wrap}>
      <div style={container}>
        <div style={{ marginBottom: 16 }}>
          <a
            href="/"
            style={{
              color: "rgba(230,233,238,0.75)",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            ← Back to results
          </a>
        </div>

        <div style={card}>
          <div style={headerRow}>
            <div style={badge}>Avirage Code Page</div>
            <div style={{ color: "rgba(230,233,238,0.55)", fontSize: 13 }}>
              Slug:{" "}
              <span style={{ color: "rgba(230,233,238,0.9)" }}>{slug}</span>
            </div>
          </div>

          <h1 style={title}>{page.codeName}</h1>

          <p style={subtitle}>
            <span style={{ color: "#c9a96a", fontWeight: 700 }}>
              {page.origin?.level1 || "Origin"}
            </span>
            {" • "}
            {page.origin?.lineage?.length
              ? page.origin.lineage.join(" → ")
              : "Lineage coming soon"}
          </p>

          <div style={grid}>
            <div>
              <div style={sectionTitle}>Core traits</div>
              <ul style={list}>
                {(page.coreTraits || []).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
                {(!page.coreTraits || page.coreTraits.length === 0) && (
                  <li style={liMuted}>No traits added yet.</li>
                )}
              </ul>

              <hr style={hr} />

              <div style={sectionTitle}>Lifestyle signals</div>
              <ul style={list}>
                {(page.goodEnvironments || []).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
                {(!page.goodEnvironments || page.goodEnvironments.length === 0) && (
                  <li style={liMuted}>No environments added yet.</li>
                )}
              </ul>

              <hr style={hr} />

              <div style={sectionTitle}>Activities that fit</div>
              <ul style={list}>
                {(page.activities || []).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
                {(!page.activities || page.activities.length === 0) && (
                  <li style={liMuted}>No activities added yet.</li>
                )}
              </ul>
            </div>

            <div>
              <div style={sectionTitle}>Visual</div>
              <div style={heroImgWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroSrc}
                  alt={`${page.codeName} hero`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div style="padding:22px;text-align:center;color:rgba(230,233,238,0.65);font-size:13px;line-height:1.6">
                        Add an image at<br/>
                        <span style="color:rgba(201,169,106,0.95);font-weight:700">${heroSrc}</span>
                      </div>`;
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {page.origin?.notes && (
            <>
              <hr style={hr} />
              <div style={sectionTitle}>Notes</div>
              <p style={{ ...subtitle, marginTop: 8 }}>{page.origin.notes}</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
