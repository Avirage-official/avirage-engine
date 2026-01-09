"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { CodePage } from "@/lib/codePages";
import { CODE_DISPLAY_MAP } from "@/lib/codeDisplayMap";

type NodeKey = "lens" | "traits" | "thrive" | "practical";

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

function spotifySearchUrl(query: string) {
  const q = String(query || "").trim();
  if (!q) return "";
  return `https://open.spotify.com/search/${encodeURIComponent(q)}`;
}

function EmblemImage({
  candidates,
  alt,
  className = "",
}: {
  candidates: string[];
  alt: string;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const src = candidates[idx] ?? "";
  if (!src) return null;

  return (
    <button
      type="button"
      onClick={() => setIdx((i) => (i + 1 < candidates.length ? i + 1 : i))}
      className="relative block"
      title="Click to try next emblem"
    >
      <img src={src} alt={alt} draggable={false} loading="lazy" className={className} />
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
    </button>
  );
}

export default function CodePageClient({ slug, page }: { slug: string; page: CodePage }) {
  // ========= Cursor glow (smooth) =========
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 140, damping: 24, mass: 0.7 });
  const glowX = useTransform(sx, (v) => `${v}px`);
  const glowY = useTransform(sy, (v) => `${v}px`);

  const rafRef = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });

  const [active, setActive] = useState<NodeKey>("lens");
  const [hovered, setHovered] = useState<NodeKey | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    last.current.x = e.clientX - r.left;
    last.current.y = e.clientY - r.top;

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      mx.set(last.current.x);
      my.set(last.current.y);
      rafRef.current = null;
    });
  };

  // ========= Display + emblem =========
  type CodeKey = keyof typeof CODE_DISPLAY_MAP;
  const display = CODE_DISPLAY_MAP[page.codeName as CodeKey];

  const emblemCandidates = useMemo(
    () => buildEmblemCandidates(page.codeName, display?.label, (display as any)?.icon, slug),
    [page.codeName, display?.label, (display as any)?.icon, slug]
  );

  // ========= Content model =========
  const model = useMemo(() => {
    const lens = {
      title: page.lens.title,
      desc: page.lens.description,
      bullets: page.lens.inPlainEnglish,
    };

    const traits = {
      headline: page.traits.headline,
      cards: page.traits.highlights.map((t) => ({ label: t.label, meaning: t.meaning })),
    };

    const thrive = {
      quads: [
        { title: "Lifestyle", items: page.recommendations.lifestyle },
        { title: "Places", items: page.recommendations.places },
        { title: "Music genres", items: page.recommendations.music },
        { title: "Activities", items: page.recommendations.activities },
      ],
    };

    const practical = {
      tri: [
        { title: "Strengths", items: page.strengths },
        { title: "Watchouts", items: page.watchouts },
        { title: "This week", items: page.tryThisWeek },
      ],
    };

    return { lens, traits, thrive, practical };
  }, [page]);

  const activeKey = hovered ?? active;

  // ========= Nexus hinting =========
  const nexusRef = useRef<HTMLDivElement | null>(null);
  const [hint, setHint] = useState<NodeKey | null>(null);

  const onNexusMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = nexusRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const pts: Record<NodeKey, { x: number; y: number }> = {
      lens: { x: r.width * 0.20, y: r.height * 0.24 },
      traits: { x: r.width * 0.80, y: r.height * 0.24 },
      thrive: { x: r.width * 0.20, y: r.height * 0.78 },
      practical: { x: r.width * 0.80, y: r.height * 0.78 },
    };

    let best: NodeKey = "lens";
    let bestD = Infinity;
    (Object.keys(pts) as NodeKey[]).forEach((k) => {
      const dx = x - pts[k].x;
      const dy = y - pts[k].y;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = k;
      }
    });

    const threshold = r.width * r.width * 0.06;
    setHint(bestD < threshold ? best : null);
  };

  const clearHint = () => setHint(null);

  // ========= Anchor support (for server “Quick entry”) =========
  useEffect(() => {
    // if someone lands on #traits etc, open it automatically
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (hash === "lens" || hash === "traits" || hash === "thrive" || hash === "practical") {
      setActive(hash as NodeKey);
    }
  }, []);

  return (
    <div
      onPointerMove={onMove}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-6"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />

        <motion.div
          className="absolute -inset-24 opacity-35 blur-2xl"
          animate={{ rotate: 360, scale: [1, 1.06, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "radial-gradient(700px 420px at 25% 25%, rgba(120,255,214,0.16), transparent 60%), radial-gradient(760px 460px at 80% 72%, rgba(180,120,255,0.14), transparent 60%), radial-gradient(640px 420px at 55% 18%, rgba(255,190,120,0.10), transparent 60%)",
          }}
        />

        {/* cursor glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(220px 220px at var(--gx) var(--gy), rgba(255,255,255,0.10), transparent 62%)",
            ["--gx" as any]: glowX,
            ["--gy" as any]: glowY,
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_20%,transparent_40%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-[260px]">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-white/60">
              Ethos Archetype • {slug}
            </div>

            <div className="mt-2 text-4xl font-black tracking-[-0.02em] sm:text-5xl">
              {display?.label ?? page.codeName}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                {page.fullName}
              </span>
              {display?.essence ? (
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[11px] font-semibold text-white/60">
                  {display.essence}
                </span>
              ) : null}
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80">
              {display?.description ?? page.snapshot}
            </p>
          </div>

          <div className="flex w-full max-w-md items-start gap-3 sm:w-auto">
            <div className="shrink-0 rounded-2xl border border-white/12 bg-black/30 p-2">
              <div className="relative grid place-items-center">
                <EmblemImage
                  candidates={emblemCandidates}
                  alt={`${display?.label ?? page.codeName} emblem`}
                  className="h-16 w-16 rounded-xl object-cover opacity-90"
                />
              </div>
              <div className="mt-2 text-center text-[10px] font-semibold text-white/45">
                emblem • click to cycle
              </div>
            </div>

            <div className="flex-1 rounded-2xl border border-white/12 bg-black/30 p-4">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/60">
                Origin signal
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-3">
                <div className="text-sm text-white/70">Level 1</div>
                <div className="text-sm font-extrabold">{page.origin.level1}</div>
              </div>
              <div className="mt-3 space-y-2">
                {page.origin.lineage.slice(0, 4).map((x, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-5 text-white/75"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </motion.section>

      {/* Main grid */}
      <div className="relative mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT: Nexus */}
        <div id="nexus" className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">Nexus</div>
              <div className="mt-1 text-lg font-extrabold">Explore by orbit</div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Chip active={activeKey === "lens"} onClick={() => setActive("lens")}>Lens</Chip>
              <Chip active={activeKey === "traits"} onClick={() => setActive("traits")}>Traits</Chip>
              <Chip active={activeKey === "thrive"} onClick={() => setActive("thrive")}>Thrive</Chip>
              <Chip active={activeKey === "practical"} onClick={() => setActive("practical")}>Practical</Chip>
            </div>
          </div>

          <div className="mt-4">
            <div
              ref={nexusRef}
              onPointerMove={onNexusMove}
              onPointerLeave={clearHint}
              className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-black/25"
            >
              {/* Geometry */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl border border-white/12" />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                  animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Core */}
              <motion.button
                type="button"
                onClick={() => setActive("lens")}
                onMouseEnter={() => setHovered("lens")}
                onMouseLeave={() => setHovered(null)}
                className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/55">Core</div>
                <div className="text-sm font-black">{page.lens.title}</div>
              </motion.button>

              {/* Nodes */}
              <Node
                label="Lens"
                sub="How you see"
                pos="tl"
                isActive={(hint ?? activeKey) === "lens"}
                onClick={() => setActive("lens")}
                onEnter={() => setHovered("lens")}
                onLeave={() => setHovered(null)}
              />
              <Node
                label="Traits"
                sub="How you show"
                pos="tr"
                isActive={(hint ?? activeKey) === "traits"}
                onClick={() => setActive("traits")}
                onEnter={() => setHovered("traits")}
                onLeave={() => setHovered(null)}
              />
              <Node
                label="Thrive"
                sub="Where you win"
                pos="bl"
                isActive={(hint ?? activeKey) === "thrive"}
                onClick={() => setActive("thrive")}
                onEnter={() => setHovered("thrive")}
                onLeave={() => setHovered(null)}
              />
              <Node
                label="Practical"
                sub="What to do"
                pos="br"
                isActive={(hint ?? activeKey) === "practical"}
                onClick={() => setActive("practical")}
                onEnter={() => setHovered("practical")}
                onLeave={() => setHovered(null)}
              />

              {/* Hint */}
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[11px] font-extrabold text-white/65">
                  Move to a node • click to open
                </div>
                <div className="text-[11px] text-white/45">{hint ? `Near: ${hint.toUpperCase()}` : " "}</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
              <Chip active={activeKey === "lens"} onClick={() => setActive("lens")}>Lens</Chip>
              <Chip active={activeKey === "traits"} onClick={() => setActive("traits")}>Traits</Chip>
              <Chip active={activeKey === "thrive"} onClick={() => setActive("thrive")}>Thrive</Chip>
              <Chip active={activeKey === "practical"} onClick={() => setActive("practical")}>Practical</Chip>
            </div>
          </div>
        </div>

        {/* RIGHT: Panel */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          {/* anchor targets always exist */}
          <div className="sr-only" id="lens" />
          <div className="sr-only" id="traits" />
          <div className="sr-only" id="thrive" />
          <div className="sr-only" id="practical" />

          <Panel active={activeKey} model={model} page={page} />
        </div>
      </div>

      {page.notes?.length ? (
        <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">Notes</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-white/80">
            {page.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={[
        "rounded-full border px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] transition",
        active
          ? "border-white/22 bg-white/[0.10] text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          : "border-white/12 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]",
      ].join(" ")}
    >
      {children}
    </motion.button>
  );
}

function Node({
  label,
  sub,
  pos,
  isActive,
  onClick,
  onEnter,
  onLeave,
}: {
  label: string;
  sub: string;
  pos: "tl" | "tr" | "bl" | "br";
  isActive: boolean;
  onClick: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const base = "absolute rounded-2xl border text-left transition will-change-transform";
  const spot =
    pos === "tl"
      ? "left-[10%] top-[12%]"
      : pos === "tr"
      ? "right-[10%] top-[12%]"
      : pos === "bl"
      ? "left-[10%] bottom-[12%]"
      : "right-[10%] bottom-[12%]";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={[
        base,
        spot,
        "w-[38%] max-w-[220px] p-3",
        isActive
          ? "border-white/24 bg-white/[0.10] shadow-[0_18px_70px_rgba(0,0,0,0.55)]"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
      ].join(" ")}
      animate={{ scale: isActive ? 1.03 : 1 }}
      transition={{ duration: 0.18 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-[11px] font-extrabold uppercase tracking-[0.20em] text-white/70">{label}</div>
      <div className="mt-1 text-sm font-black text-white/90">{sub}</div>
      <div className="mt-1 text-xs leading-5 text-white/65">Open → deeper, code-specific detail</div>
    </motion.button>
  );
}

function Panel({
  active,
  model,
  page,
}: {
  active: NodeKey;
  model: any;
  page: CodePage;
}) {
  const week = Array.isArray(page.tryThisWeek) ? page.tryThisWeek : [];

  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
            {active === "lens" ? "Lens" : active === "traits" ? "Traits" : active === "thrive" ? "Thrive" : "Practical"}
          </div>
          <div className="mt-1 text-xl font-black">
            {active === "lens"
              ? model.lens.title
              : active === "traits"
              ? model.traits.headline
              : active === "thrive"
              ? "Where you thrive"
              : "Real-world alignment"}
          </div>
        </div>

        <div className="rounded-full border border-white/12 bg-black/25 px-3 py-2 text-[11px] font-extrabold text-white/70">
          Translator • v1
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {active === "lens" ? (
          <>
            <p className="text-sm leading-7 text-white/80">{model.lens.desc}</p>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55">
                In plain English
              </div>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-white/80">
                {model.lens.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {page.snapshot ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55">
                  Core snapshot
                </div>
                <div className="mt-2 text-sm leading-7 text-white/80">{page.snapshot}</div>
              </div>
            ) : null}
          </>
        ) : null}

        {active === "traits" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {model.traits.cards.map((c: any, i: number) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <div className="text-sm font-extrabold">{c.label}</div>
                <div className="mt-1 text-sm leading-6 text-white/75">{c.meaning}</div>
              </div>
            ))}
          </div>
        ) : null}

        {active === "thrive" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {model.thrive.quads.map((q: any, i: number) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <div className="text-sm font-extrabold">{q.title}</div>

                {q.title.toLowerCase().includes("music") ? (
                  <>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {q.items.map((genre: string, j: number) => {
                        const href = spotifySearchUrl(genre);
                        return (
                          <a
                            key={j}
                            href={href || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-[12px] font-semibold text-white/75 hover:bg-white/[0.06]"
                            title="Open in Spotify search"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
                            {genre}
                            <span className="text-white/35">↗</span>
                          </a>
                        );
                      })}
                    </div>
                    <div className="mt-3 text-xs leading-6 text-white/45">
                      Tip: open a genre, then explore “Artists” + “Playlists” for your vibe.
                    </div>
                  </>
                ) : (
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-white/75">
                    {q.items.map((x: string, j: number) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null}

        {active === "practical" ? (
          <>
            <div className="grid gap-3 md:grid-cols-3">
              {model.practical.tri.map((t: any, i: number) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                  <div className="text-sm font-extrabold">{t.title}</div>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-white/75">
                    {t.items.map((x: string, j: number) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Better “this week” (not generic, uses all items) */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55">
                  Weekly alignment sequence
                </div>
                <div className="rounded-full border border-white/12 bg-black/25 px-3 py-2 text-[11px] font-extrabold text-white/70">
                  3-step
                </div>
              </div>

              {week.length ? (
                <div className="mt-3 grid gap-2">
                  {week.slice(0, 5).map((x, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-3 py-3"
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.04] text-xs font-black text-white/80">
                        {i + 1}
                      </div>
                      <div className="text-sm leading-7 text-white/80">{x}</div>
                    </div>
                  ))}
                  <div className="text-xs leading-6 text-white/45">
                    Do the smallest version first. Your code responds to consistency, not intensity.
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-sm leading-7 text-white/70">
                  Pick one small action and ship it. (Add code-specific steps in <code className="text-white/85">codePages.ts</code>.)
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
