// app/codepages/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CODE_PAGES } from "@/lib/codePages";

/**
 * IMPORTANT:
 * Your URL uses lowercase slugs like /codepages/enzuka
 * So your CODE_PAGES keys MUST be lowercase too:
 *   CODE_PAGES = { enzuka: {...}, shokunin: {...}, ... }
 */

type Params = { slug: string };

// Make sure Next can statically discover pages (optional, but helps).
export function generateStaticParams() {
  return Object.keys(CODE_PAGES).map((slug) => ({ slug }));
}

function isValidSlug(slug: string): slug is keyof typeof CODE_PAGES {
  return Object.prototype.hasOwnProperty.call(CODE_PAGES, slug);
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const slug = params.slug?.toLowerCase?.() ?? params.slug;

  if (!isValidSlug(slug)) {
    return {
      title: "Code Page • Avirage",
      description:
        "Explore your archetypal tradition match and what it means for your life lens.",
    };
  }

  const page: any = (CODE_PAGES as any)[slug];

  const title = `${page?.codeName ?? slug} • Avirage`;
  const description =
    page?.tagline ||
    page?.summary ||
    page?.description ||
    "Explore your archetypal tradition match and what it means for your life lens.";

  return { title, description };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 18,
        padding: 18,
      }}
    >
      <h2
        style={{
          fontSize: 16,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 10,
          color: "rgba(233,237,243,0.85)",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "rgba(233,237,243,0.70)", lineHeight: 1.6 }}>
        {children}
      </div>
    </section>
  );
}

function List({
  items,
  emptyLabel,
}: {
  items?: unknown;
  emptyLabel: string;
}) {
  const arr = Array.isArray(items) ? items : [];
  if (arr.length === 0) {
    return (
      <div style={{ color: "rgba(233,237,243,0.48)" }}>{emptyLabel}</div>
    );
  }

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {arr.map((x, i) => (
        <li key={i} style={{ marginBottom: 6 }}>
          {typeof x === "string" ? x : JSON.stringify(x)}
        </li>
      ))}
    </ul>
  );
}

function Paragraph({ text }: { text?: unknown }) {
  if (!text) return null;
  if (Array.isArray(text)) {
    // If you store paragraphs as string[]
    return (
      <div style={{ display: "grid", gap: 10 }}>
        {text.map((t, i) => (
          <p key={i} style={{ margin: 0 }}>
            {String(t)}
          </p>
        ))}
      </div>
    );
  }
  return <p style={{ margin: 0 }}>{String(text)}</p>;
}

function ImagesStrip({ slug, count }: { slug: string; count?: unknown }) {
  const n = typeof count === "number" ? count : 0;
  if (!n || n <= 0) return null;

  // Your convention: public/codepages/<slug>/<slug>-1.jpg ... etc
  // (We won't force extensions; we'll try jpg)
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ color: "rgba(233,237,243,0.55)", fontSize: 13 }}>
        Visuals
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 10,
        }}
      >
        {Array.from({ length: n }).map((_, idx) => {
          const i = idx + 1;
          const src = `/codepages/${slug}/${slug}-${i}.jpg`;
          return (
            <div
              key={src}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src={src}
                alt={`${slug} visual ${i}`}
                width={900}
                height={600}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CodePage({ params }: { params: Params }) {
  const slugRaw = params.slug;
  const slug = slugRaw?.toLowerCase?.() ?? slugRaw;

  if (!isValidSlug(slug)) return notFound();

  // IMPORTANT: treat as any so the renderer never fights your evolving schema
  const page: any = (CODE_PAGES as any)[slug];

  const codeName = page?.codeName ?? slug;
  const fullName = page?.fullName ?? "";
  const tagline = page?.tagline ?? page?.summary ?? page?.description ?? "";

  // Pull a few *common* fields if you have them, but never require them.
  const origin = page?.origin; // could be string OR object
  const traits = page?.coreTraits ?? page?.traits ?? page?.keyTraits;
  const environments = page?.goodEnvironments ?? page?.environments;
  const activities = page?.activities ?? page?.recommendedActivities;
  const places = page?.places ?? page?.destinations;
  const music = page?.music ?? page?.musicVibe;
  const imageCount = page?.imageCount ?? page?.images?.count ?? 0;

  // If you have sections[] (optional), we’ll render them too.
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #070A0E 0%, #0B1118 60%, #0A0F14 100%)",
        color: "#E9EDF3",
        padding: "28px 18px",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 16 }}>
        {/* Top nav */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            href="/"
            style={{
              color: "rgba(233,237,243,0.75)",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            ← Back to quiz
          </Link>

          <div style={{ fontSize: 13, color: "rgba(233,237,243,0.55)" }}>
            /codepages/{slug}
          </div>
        </div>

        {/* Hero */}
        <header
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 22,
            padding: 22,
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(233,237,243,0.55)",
            }}
          >
            Code Page
          </div>

          <h1 style={{ margin: "8px 0 0 0", fontSize: 34, lineHeight: 1.1 }}>
            {codeName}
          </h1>

          {fullName ? (
            <div style={{ marginTop: 8, color: "rgba(233,237,243,0.70)" }}>
              {fullName}
            </div>
          ) : null}

          {tagline ? (
            <p
              style={{
                marginTop: 12,
                marginBottom: 0,
                color: "rgba(233,237,243,0.68)",
                lineHeight: 1.6,
                maxWidth: 820,
              }}
            >
              {tagline}
            </p>
          ) : null}
        </header>

        {/* Images (optional) */}
        <Section title="Gallery">
          <ImagesStrip slug={slug} count={imageCount} />
          {!imageCount ? (
            <div style={{ color: "rgba(233,237,243,0.48)" }}>
              Add images by placing files here:{" "}
              <span style={{ color: "rgba(233,237,243,0.72)" }}>
                public/codepages/{slug}/{slug}-1.jpg
              </span>
              , {slug}-2.jpg, etc. Then set <code>imageCount</code> for that
              code in <code>lib/codePages.ts</code>.
            </div>
          ) : null}
        </Section>

        {/* Origin */}
        <Section title="Origin & lineage">
          {typeof origin === "string" ? (
            <Paragraph text={origin} />
          ) : origin ? (
            <div style={{ display: "grid", gap: 10 }}>
              {origin.level1 ? (
                <div>
                  <div style={{ color: "rgba(233,237,243,0.55)", fontSize: 13 }}>
                    Level 1 culture
                  </div>
                  <div>{String(origin.level1)}</div>
                </div>
              ) : null}

              {Array.isArray(origin.lineage) && origin.lineage.length ? (
                <div>
                  <div style={{ color: "rgba(233,237,243,0.55)", fontSize: 13 }}>
                    Lineage
                  </div>
                  <List items={origin.lineage} emptyLabel="No lineage yet." />
                </div>
              ) : null}

              {origin.notes ? (
                <div>
                  <div style={{ color: "rgba(233,237,243,0.55)", fontSize: 13 }}>
                    Notes
                  </div>
                  <Paragraph text={origin.notes} />
                </div>
              ) : null}
            </div>
          ) : (
            <div style={{ color: "rgba(233,237,243,0.48)" }}>
              No origin info yet.
            </div>
          )}
        </Section>

        {/* Traits */}
        <Section title="Core traits">
          <List items={traits} emptyLabel="No traits added yet." />
        </Section>

        {/* Lifestyle */}
        <Section title="Good environments">
          <List items={environments} emptyLabel="No environments added yet." />
        </Section>

        <Section title="Activities that fit">
          <List items={activities} emptyLabel="No activities added yet." />
        </Section>

        <Section title="Places & atmospheres">
          <List items={places} emptyLabel="No places added yet." />
        </Section>

        <Section title="Music & mood">
          {typeof music === "string" ? (
            <Paragraph text={music} />
          ) : (
            <List items={music} emptyLabel="No music notes added yet." />
          )}
        </Section>

        {/* Optional custom sections[] */}
        {sections.length > 0 ? (
          <div style={{ display: "grid", gap: 16 }}>
            {sections.map((s: any, i: number) => (
              <Section key={i} title={String(s?.title ?? `Section ${i + 1}`)}>
                {s?.body ? <Paragraph text={s.body} /> : null}
                {s?.bullets ? (
                  <div style={{ marginTop: 10 }}>
                    <List items={s.bullets} emptyLabel="" />
                  </div>
                ) : null}
              </Section>
            ))}
          </div>
        ) : null}

        {/* Debug block (safe, optional) */}
        <details
          style={{
            marginTop: 6,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.03)",
            padding: 14,
          }}
        >
          <summary style={{ cursor: "pointer", color: "rgba(233,237,243,0.70)" }}>
            Developer: view raw page object
          </summary>
          <pre
            style={{
              marginTop: 12,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color: "rgba(233,237,243,0.65)",
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            {JSON.stringify(page, null, 2)}
          </pre>
        </details>
      </div>
    </main>
  );
}
