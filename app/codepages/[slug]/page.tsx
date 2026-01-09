// app/codepages/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CODE_PAGES, type CodeSlug, type CodePage } from "@/lib/codePages";
import { CODE_DISPLAY_MAP } from "@/lib/codeDisplayMap";
import CodePageClient from "./CodePageClient";

type Params = Promise<{ slug: string }>;

function normalizeSlug(input: string): string {
  return decodeURIComponent(input).trim().toLowerCase();
}

function isCodeSlug(value: string): value is CodeSlug {
  return value in CODE_PAGES;
}

function normalizeKey(input: string) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function buildEmblemCandidates(codeName: string, label?: string, icon?: string, slug?: string) {
  const keys = [
    icon ? normalizeKey(icon) : "",
    label ? normalizeKey(label) : "",
    codeName ? normalizeKey(codeName) : "",
    slug ? normalizeKey(slug) : "",
  ].filter(Boolean);

  const exts = ["jpg", "jpeg", "png", "webp"];
  const out: string[] = [];
  for (const k of keys) for (const ext of exts) out.push(`/emblems/${k}.${ext}`);
  return Array.from(new Set(out));
}

export function generateStaticParams(): Array<{ slug: CodeSlug }> {
  return (Object.keys(CODE_PAGES) as CodeSlug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  if (!isCodeSlug(slug)) return { title: "Code Page • Ethos" };

  const page = CODE_PAGES[slug];
  const display = CODE_DISPLAY_MAP[page.codeName as keyof typeof CODE_DISPLAY_MAP];

  return {
    title: `${display?.label ?? page.codeName} • Ethos`,
    description:
      display?.description ??
      page.snapshot ??
      `Explore this archetypal lens and what it means for your lifestyle.`,
  };
}

export default async function CodePageRoute({ params }: { params: Params }) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  if (!isCodeSlug(slug)) notFound();

  const page: CodePage = CODE_PAGES[slug];
  type CodeKey = keyof typeof CODE_DISPLAY_MAP;
  const display = CODE_DISPLAY_MAP[page.codeName as CodeKey];

  const emblemCandidates = buildEmblemCandidates(page.codeName, display?.label, (display as any)?.icon, slug);
  const emblemSrc = emblemCandidates[0] ?? ""; // server-safe: no onError

  const label = display?.label ?? page.codeName;
  const shortDesc =
    (display as any)?.description ??
    page.snapshot ??
    "Explore this archetypal lens and what it means for how you live, work, and move through the world.";

  const originPrimary = page?.origin?.level1 ? String(page.origin.level1) : "";
  const lineage = Array.isArray(page?.origin?.lineage) ? page.origin.lineage.slice(0, 6) : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A0F] text-white">
      {/* Ambient layers (server-safe, pure CSS) */}
      <div className="pointer-events-none absolute inset-0">
        {/* aurora blobs */}
        <div className="absolute -top-40 left-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(120,255,214,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute -top-52 right-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(180,120,255,0.16),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-[-28%] left-[20%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,190,120,0.10),transparent_60%)] blur-2xl" />

        {/* soft grid */}
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_20%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(900px_500px_at_50%_100%,rgba(0,0,0,0.70),transparent_55%)]" />

        {/* scanline */}
        <div className="absolute inset-0 opacity-[0.25] [background-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.05),transparent)] [background-size:100%_8px]" />
      </div>

      <div className="relative mx-auto w-[min(1180px,92vw)] py-10">
        {/* Sticky utility rail */}
        <div className="sticky top-3 z-30 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-3 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white/85 hover:bg-white/[0.07]"
              >
                <span className="text-white/70">←</span>
                Back to results
              </Link>

              <span className="hidden h-8 w-px bg-white/10 sm:block" />

              <span className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/70 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                Code Page
                <span className="text-white/40">•</span>
                Ethos Library
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              {/* Emblem + label */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-2 py-2">
                {emblemSrc ? (
                  <img
                    src={emblemSrc}
                    alt={`${label} emblem`}
                    className="h-7 w-7 rounded-full object-cover opacity-90"
                    draggable={false}
                  />
                ) : (
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-[10px] font-black text-white/70">
                    E
                  </span>
                )}
              </span>

              <span className="rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em]">
                {label}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-semibold text-white/60">
                {page.fullName}
              </span>
            </div>
          </div>
        </div>

        {/* Hero masthead */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.60)] backdrop-blur-xl sm:p-10">
          {/* inner accents */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(120,255,214,0.16),transparent_60%)] blur-2xl" />
            <div className="absolute -left-28 -bottom-28 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(180,120,255,0.14),transparent_60%)] blur-2xl" />
            <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.22),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.16),transparent_45%)]" />
          </div>

          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Translator • v1
                <span className="text-white/30">•</span>
                Archetypal lens
              </div>

              <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                {label}
                <span className="ml-3 text-white/40">—</span>{" "}
                <span className="text-white/85">{page.fullName}</span>
              </h1>

              <p className="mt-4 max-w-[68ch] text-pretty text-sm leading-7 text-white/70 sm:text-base">
                {shortDesc}
              </p>

              {/* origin chips */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {originPrimary ? (
                  <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-[12px] font-semibold text-white/70">
                    Origin: <span className="font-extrabold text-white/85">{originPrimary}</span>
                  </span>
                ) : null}

                {lineage.map((x, i) => (
                  <span
                    key={`${x}-${i}`}
                    className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[12px] font-semibold text-white/60"
                  >
                    {x}
                  </span>
                ))}
              </div>

              {/* subtle note */}
              <div className="mt-5 text-xs leading-6 text-white/45">
                This page is a <span className="font-semibold text-white/60">lens</span>, not an identity claim. Use it
                as a mirror for alignment.
              </div>
            </div>

            {/* right rail card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-black/30 p-5">
              <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle_at_30%_20%,rgba(120,255,214,0.18),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(180,120,255,0.16),transparent_45%)]" />
              <div className="relative">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                  Quick entry
                </div>

                <div className="mt-3 grid gap-2">
                  <a
                    href="#nexus"
                    className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
                  >
                    <span className="mr-2 text-white/40 group-hover:text-white/70">↳</span>
                    Nexus orbit
                    <span className="ml-2 text-xs text-white/35">(jump)</span>
                  </a>

                  <a
                    href="#lens"
                    className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
                  >
                    <span className="mr-2 text-white/40 group-hover:text-white/70">↳</span>
                    Lens
                  </a>

                  <a
                    href="#traits"
                    className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
                  >
                    <span className="mr-2 text-white/40 group-hover:text-white/70">↳</span>
                    Traits
                  </a>

                  <a
                    href="#thrive"
                    className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
                  >
                    <span className="mr-2 text-white/40 group-hover:text-white/70">↳</span>
                    Thrive
                  </a>

                  <a
                    href="#practical"
                    className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
                  >
                    <span className="mr-2 text-white/40 group-hover:text-white/70">↳</span>
                    Practical
                  </a>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4 text-xs leading-6 text-white/55">
                  Tip: Use the orbit to explore nodes, then open tabs for detail. This is designed for scanning first,
                  depth second.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client content (unchanged) */}
        <CodePageClient slug={slug} page={page} />

        {/* Footer */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm font-extrabold hover:bg-white/[0.08]"
          >
            Back to results
          </Link>

          <div className="mt-4 text-xs text-white/45">
            Ethos • Cultural Lens Library • <span className="text-white/60">Translator v1</span>
          </div>
        </div>
      </div>
    </main>
  );
}
