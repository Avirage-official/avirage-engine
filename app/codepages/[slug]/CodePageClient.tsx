"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { CodePage } from "@/lib/codePages";
import { CODE_DISPLAY_MAP } from "@/lib/codeDisplayMap";

type NodeKey = "lens" | "traits" | "thrive" | "practical";

export default function CodePageClient({
  slug,
  page,
}: {
  slug: string;
  page: CodePage;
}) {
  /* ============================
     CURSOR GLOW (PERF SAFE)
  ============================ */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 140, damping: 24, mass: 0.7 });
  const glowX = useTransform(sx, (v) => `${v}px`);
  const glowY = useTransform(sy, (v) => `${v}px`);

  const rafRef = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });

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

  /* ============================
     DISPLAY + EMBLEM (SINGLE SOURCE)
  ============================ */
  type CodeKey = keyof typeof CODE_DISPLAY_MAP;
  const display = CODE_DISPLAY_MAP[page.codeName as CodeKey];

  const emblemSrc = display?.emblem
    ? `/emblems/${display.emblem}`
    : null;

  /* ============================
     CONTENT MODEL
  ============================ */
  const model = useMemo(() => {
    return {
      lens: {
        title: page.lens.title,
        desc: page.lens.description,
        bullets: page.lens.inPlainEnglish,
      },
      traits: {
        headline: page.traits.headline,
        cards: page.traits.highlights,
      },
      thrive: {
        blocks: [
          { title: "Lifestyle", items: page.recommendations.lifestyle },
          { title: "Places", items: page.recommendations.places },
          { title: "Music", items: page.recommendations.music },
          { title: "Activities", items: page.recommendations.activities },
        ],
      },
      practical: {
        blocks: [
          { title: "Strengths", items: page.strengths },
          { title: "Watchouts", items: page.watchouts },
          { title: "Try this week", items: page.tryThisWeek },
        ],
      },
    };
  }, [page]);

  const [active, setActive] = useState<NodeKey>("lens");

  /* ============================
     RENDER
  ============================ */
  return (
    <div
      onPointerMove={onMove}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl"
    >
      {/* Background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(240px at var(--gx) var(--gy), rgba(255,255,255,0.12), transparent 60%)",
          ["--gx" as any]: glowX,
          ["--gy" as any]: glowY,
        }}
      />

      {/* HEADER */}
      <section className="relative mb-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-white/60">
              Ethos Archetype • {slug}
            </div>

            <h1 className="mt-2 text-4xl sm:text-5xl font-black">
              {display?.label ?? page.codeName}
            </h1>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                {page.fullName}
              </span>
              {display?.essence && (
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[11px] font-semibold text-white/60">
                  {display.essence}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-7 text-white/80">
              {display?.description ?? page.snapshot}
            </p>
          </div>

          {/* EMBLEM */}
          {emblemSrc && (
            <div className="shrink-0 rounded-2xl border border-white/12 bg-black/30 p-3">
              <img
                src={emblemSrc}
                alt={`${display?.label ?? page.codeName} emblem`}
                className="h-20 w-20 rounded-xl object-cover opacity-90"
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </section>

      {/* NAV */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["lens", "traits", "thrive", "practical"] as NodeKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={[
              "rounded-full border px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] transition",
              active === k
                ? "border-white/22 bg-white/[0.08] text-white"
                : "border-white/12 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]",
            ].join(" ")}
          >
            {k}
          </button>
        ))}
      </div>

      {/* PANEL */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      >
        {active === "lens" && (
          <>
            <p className="text-sm leading-7 text-white/80">{model.lens.desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {model.lens.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                  {b}
                </li>
              ))}
            </ul>
          </>
        )}

        {active === "traits" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {model.traits.cards.map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="text-sm font-extrabold">{c.label}</div>
                <p className="mt-1 text-sm text-white/75">{c.meaning}</p>
              </div>
            ))}
          </div>
        )}

        {active === "thrive" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {model.thrive.blocks.map((b, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="text-sm font-extrabold">{b.title}</div>
                <ul className="mt-2 space-y-2 text-sm text-white/75">
                  {b.items.map((x, j) => (
                    <li key={j}>• {x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {active === "practical" && (
          <div className="grid gap-4 md:grid-cols-3">
            {model.practical.blocks.map((b, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="text-sm font-extrabold">{b.title}</div>
                <ul className="mt-2 space-y-2 text-sm text-white/75">
                  {b.items.map((x, j) => (
                    <li key={j}>• {x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
