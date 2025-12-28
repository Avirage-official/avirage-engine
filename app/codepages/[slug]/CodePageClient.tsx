"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { CodePage } from "@/lib/codePages";
import React, { useMemo, useRef } from "react";

export default function CodePageClient({
  slug,
  page,
}: {
  slug: string;
  page: CodePage;
}) {
  // Cursor-reactive “holo” glow (smooth + lightweight)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // A bit softer than before to avoid “laggy chase”
  const sx = useSpring(mx, { stiffness: 140, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 140, damping: 24, mass: 0.7 });

  const glowX = useTransform(sx, (v) => `${v}px`);
  const glowY = useTransform(sy, (v) => `${v}px`);

  // rAF throttle (prevents updating on every pointer event)
  const rafRef = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // mouse only (touch/pen can be noisy + feels weird)
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

  const sections = useMemo(() => {
    return [
      {
        kicker: "Lens",
        title: page.lens.title,
        body: page.lens.description,
        bullets: page.lens.inPlainEnglish,
      },
      {
        kicker: "Traits",
        title: page.traits.headline,
        cards: page.traits.highlights.map((t) => ({
          title: t.label,
          body: t.meaning,
        })),
      },
      {
        kicker: "Recommendations",
        title: "Where you thrive",
        quad: [
          { title: "Lifestyle", items: page.recommendations.lifestyle },
          { title: "Places", items: page.recommendations.places },
          { title: "Music", items: page.recommendations.music },
          { title: "Activities", items: page.recommendations.activities },
        ],
      },
      {
        kicker: "Practical",
        title: "Actionable focus",
        tri: [
          { title: "Strengths", items: page.strengths },
          { title: "Watchouts", items: page.watchouts },
          { title: "Try this week", items: page.tryThisWeek },
        ],
      },
    ] as const;
  }, [page]);

  return (
    <div
      onPointerMove={onMove}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl"
    >
      {/* Animated background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft grid */}
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

        {/* animated nebula (slightly lighter than blur-3xl) */}
        <motion.div
          className="absolute -inset-24 opacity-40 blur-2xl"
          animate={{ rotate: 360, scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "radial-gradient(700px 400px at 20% 30%, rgba(99,102,241,0.22), transparent 60%), radial-gradient(700px 400px at 80% 70%, rgba(236,72,153,0.18), transparent 60%), radial-gradient(600px 360px at 55% 20%, rgba(34,211,238,0.16), transparent 60%)",
          }}
        />

        {/* cursor glow (smaller radius = less GPU work) */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(220px 220px at var(--gx) var(--gy), rgba(255,255,255,0.10), transparent 60%)",
            ["--gx" as any]: glowX,
            ["--gy" as any]: glowY,
          }}
        />

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_20%,transparent_40%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-white/60">
              Code Page • {slug}
            </div>
            <div className="mt-2 text-4xl font-black tracking-[-0.02em] sm:text-5xl">
              {page.codeName}
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80">
              {page.snapshot}
            </p>
          </div>

          {/* “Data capsule” */}
          <div className="w-full max-w-md rounded-2xl border border-white/12 bg-black/30 p-4 sm:w-auto">
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
            {page.origin.notes ? (
              <div className="mt-3 text-xs leading-6 text-white/60">
                {page.origin.notes}
              </div>
            ) : null}
          </div>
        </div>

        {/* a “signal line” divider */}
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </motion.section>

      {/* CONTENT */}
      <div className="relative mt-6 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left: story blocks */}
        <div className="space-y-4">
          {sections.map((s, idx) => (
            <motion.div
              key={s.kicker}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: idx * 0.03, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                {s.kicker}
              </div>
              <div className="mt-2 text-lg font-extrabold">{s.title}</div>

              {"body" in s ? (
                <p className="mt-2 text-sm leading-7 text-white/80">{s.body}</p>
              ) : null}

              {"bullets" in s ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-white/80">
                  {s.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}

              {"cards" in s ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {s.cards.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-black/25 p-3"
                    >
                      <div className="text-sm font-extrabold">{c.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/75">
                        {c.body}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {"quad" in s ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {s.quad.map((q, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-black/25 p-3"
                    >
                      <div className="text-sm font-extrabold">{q.title}</div>
                      <ul className="mt-2 space-y-2 text-sm leading-6 text-white/75">
                        {q.items.map((x, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}

              {"tri" in s ? (
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {s.tri.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-black/25 p-3"
                    >
                      <div className="text-sm font-extrabold">{t.title}</div>
                      <ul className="mt-2 space-y-2 text-sm leading-6 text-white/75">
                        {t.items.map((x, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ))}

          {page.notes?.length ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                Notes
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-white/80">
                {page.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>

        {/* Right: “translator” panel */}
        <motion.aside
          initial={{ opacity: 0, x: 14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                Translator
              </div>
              <div className="mt-1 text-lg font-extrabold">Signal summary</div>
            </div>
            <div className="rounded-full border border-white/12 bg-black/30 px-3 py-1 text-[11px] font-extrabold text-white/70">
              v1
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <Signal label="Core lens" value={page.lens.title} hint="Your primary world-filter" />
            <Signal
              label="Trait headline"
              value={page.traits.headline}
              hint="How it tends to show up"
            />
            <Signal
              label="Best mode"
              value="Clarity → Rhythm → Execution"
              hint="A simple operating loop"
            />
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55">
              One move (this week)
            </div>
            <div className="mt-2 text-sm leading-6 text-white/80">
              {page.tryThisWeek?.[0] ?? "Pick one small action and ship it."}
            </div>
          </div>

          <div className="mt-4 text-xs leading-6 text-white/55">
            Clean mode: images removed. Your content becomes the visual.
          </div>
        </motion.aside>
      </div>
    </div>
  );
}

function Signal({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/55">
          {label}
        </div>
        <div className="text-[11px] text-white/45">{hint}</div>
      </div>
      <div className="mt-2 text-sm font-extrabold text-white/85">{value}</div>
    </div>
  );
}
