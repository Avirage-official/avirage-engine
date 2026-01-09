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
  const emblemSrc = emblemCandidates[0] ?? ""; // no onError in server

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-[min(1100px,92vw)] py-10">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/85 hover:bg-white/[0.06]"
          >
            ← Back to results
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {/* Small emblem (SERVER-safe: NO onError/onClick handlers) */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-2 py-2">
              {emblemSrc ? (
                <img
                  src={emblemSrc}
                  alt={`${display?.label ?? page.codeName} emblem`}
                  className="h-7 w-7 rounded-full object-cover opacity-90"
                  draggable={false}
                />
              ) : null}
            </span>

            <span className="rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em]">
              {display?.label ?? page.codeName}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-semibold text-white/60">
              {page.fullName}
            </span>
          </div>
        </div>

        {/* Client content */}
        <CodePageClient slug={slug} page={page} />

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm font-extrabold hover:bg-white/[0.08]"
          >
            Back to results
          </Link>
        </div>
      </div>
    </main>
  );
}
