import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CODE_PAGES,
  getAllCodeSlugs,
  isCodeSlug,
  type CodeSlug,
  type CodePage,
} from "@/lib/codePages";

type PageProps = {
  params: { slug: string };
};

// If your project is ever set to static export later, this prevents 404s.
// It also helps Next prebuild the pages.
export function generateStaticParams() {
  return getAllCodeSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const raw = params.slug ?? "";
  const slug = decodeURIComponent(raw).toLowerCase();

  if (!isCodeSlug(slug)) {
    return {
      title: "Code Page • Avirage",
      description:
        "Explore your archetypal tradition match and what it means for your life lens.",
    };
  }

  const page = CODE_PAGES[slug];
  return {
    title: `${page.codeName} • Avirage`,
    description: page.snapshot,
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: 22 }}>
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.66)",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 16,
          padding: 18,
          backdropFilter: "blur(10px)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Img({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure style={{ margin: 0 }}>
      {/* Using <img> keeps it simple (no next/image config needed). */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.10)",
          display: "block",
        }}
        onError={(e) => {
          // Hide broken images gracefully
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      {caption ? (
        <figcaption
          style={{
            marginTop: 10,
            fontSize: 13,
            color: "rgba(255,255,255,0.66)",
            lineHeight: 1.6,
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items || items.length === 0) {
    return (
      <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>
        Nothing added yet.
      </div>
    );
  }

  return (
    <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.75 }}>
      {items.map((t, i) => (
        <li key={i} style={{ color: "rgba(255,255,255,0.78)", fontSize: 14 }}>
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function CodePageRoute({ params }: PageProps) {
  const raw = params.slug ?? "";
  const slug = decodeURIComponent(raw).toLowerCase();

  if (!isCodeSlug(slug)) notFound();

  const page: CodePage = CODE_PAGES[slug as CodeSlug];

  const bg =
    "radial-gradient(1200px 800px at 20% 0%, rgba(201,169,106,0.14), transparent 60%), linear-gradient(180deg, #0b0f14 0%, #121820 100%)";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: bg,
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "64px 20px",
        }}
      >
        {/* Top nav */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(255,255,255,0.14)",
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
            }}
          >
            ← Back to quiz
          </a>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              padding: "10px 14px",
              borderRadius: 12,
              color: "rgba(255,255,255,0.66)",
              fontSize: 13,
            }}
          >
            /codepages/{page.slug}
          </div>
        </div>

        {/* Header */}
        <header style={{ marginTop: 28 }}>
          <div
            style={{
              display: "inline-flex",
              gap: 10,
              alignItems: "center",
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(201,169,106,0.28)",
              background: "rgba(201,169,106,0.08)",
              color: "rgba(201,169,106,0.95)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Archetypal tradition match
          </div>

          <h1
            style={{
              marginTop: 14,
              fontSize: 46,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: 10,
            }}
          >
            {page.codeName}
          </h1>

          <div
            style={{
              color: "rgba(255,255,255,0.70)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 840,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.86)", fontWeight: 600 }}>
              Origin:
            </span>{" "}
            {page.fullName} •{" "}
            <span style={{ color: "rgba(255,255,255,0.86)", fontWeight: 600 }}>
              Level 1:
            </span>{" "}
            {page.origin.level1}
          </div>

          <div style={{ marginTop: 18 }}>
            {page.images?.cover ? (
              <Img
                src={page.images.cover.src}
                alt={page.images.cover.alt}
                caption={page.images.cover.caption}
              />
            ) : null}
          </div>
        </header>

        {/* Content */}
        <Section title="Overview">
          <p style={{ margin: 0, lineHeight: 1.75, color: "rgba(255,255,255,0.80)", fontSize: 15 }}>
            {page.snapshot}
          </p>
        </Section>

        <Section title="Origin lineage">
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.75 }}>
            {page.origin.lineage.map((x, i) => (
              <li key={i} style={{ color: "rgba(255,255,255,0.78)", fontSize: 14 }}>
                {x}
              </li>
            ))}
          </ul>
          {page.origin.notes ? (
            <p style={{ marginTop: 12, marginBottom: 0, color: "rgba(255,255,255,0.68)", fontSize: 14, lineHeight: 1.7 }}>
              {page.origin.notes}
            </p>
          ) : null}
        </Section>

        <Section title="Lens">
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            {page.lens.title}
          </div>
          <p style={{ marginTop: 0, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, fontSize: 14 }}>
            {page.lens.description}
          </p>
          <BulletList items={page.lens.inPlainEnglish} />
        </Section>

        <Section title="Traits">
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
            {page.traits.headline}
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {page.traits.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 6 }}>
                  {h.label}
                </div>
                <div style={{ color: "rgba(255,255,255,0.70)", fontSize: 14, lineHeight: 1.7 }}>
                  {h.meaning}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Lifestyle">
          <BulletList items={page.recommendations.lifestyle} />
        </Section>

        <Section title="Places">
          <BulletList items={page.recommendations.places} />
        </Section>

        <Section title="Music">
          <BulletList items={page.recommendations.music} />
        </Section>

        <Section title="Activities">
          <BulletList items={page.recommendations.activities} />
        </Section>

        <Section title="Strengths">
          <BulletList items={page.strengths} />
        </Section>

        <Section title="Watchouts">
          <BulletList items={page.watchouts} />
        </Section>

        <Section title="Try this week">
          <BulletList items={page.tryThisWeek} />
        </Section>

        {page.images?.gallery && page.images.gallery.length > 0 ? (
          <Section title="Gallery">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              {page.images.gallery.map((im, i) => (
                <Img key={i} src={im.src} alt={im.alt} caption={im.caption} />
              ))}
            </div>
          </Section>
        ) : null}

        {page.notes && page.notes.length > 0 ? (
          <Section title="Notes">
            <BulletList items={page.notes} />
          </Section>
        ) : null}

        <footer style={{ marginTop: 34, color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 1.6 }}>
          Avirage pages describe an archetypal lens (not identity or diagnosis). Recommendations are guidance, not fate.
        </footer>
      </div>
    </main>
  );
}
