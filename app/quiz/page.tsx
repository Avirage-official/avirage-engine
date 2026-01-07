"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Premium Landing Page (Ethos)
 * File: /app/page.tsx
 * Notes:
 * - No glass effects.
 * - Strong interactive hero + scroll choreography.
 * - CTAs: /quiz and /codes
 */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function usePointerGlow() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const inView = useMotionValue(0);

  const smx = useSpring(mx, { stiffness: 220, damping: 28 });
  const smy = useSpring(my, { stiffness: 220, damping: 28 });
  const alpha = useSpring(inView, { stiffness: 180, damping: 24 });

  const glow = useMotionTemplate`radial-gradient(650px 450px at ${smx}px ${smy}px, rgba(56,189,248,${alpha}), rgba(255,255,255,0) 55%)`;
  const glow2 = useMotionTemplate`radial-gradient(520px 420px at ${smx}px ${smy}px, rgba(244,114,182,${alpha}), rgba(255,255,255,0) 62%)`;

  return { mx, my, inView, glow, glow2 };
}

function EthosMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 rounded-2xl bg-slate-950">
        <div className="absolute inset-[2px] rounded-[14px] bg-white" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-4 w-4 rotate-45 rounded-[5px] bg-slate-950" />
        </div>
      </div>
      <div>
        <div className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">ETHOS</div>
        <div className="text-sm font-black tracking-tight text-slate-900">Cultural Code Mapping</div>
      </div>
    </div>
  );
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "sky" | "rose" | "amber" | "slate";
}) {
  const cls =
    tone === "sky"
      ? "border-sky-200 bg-sky-50 text-sky-700"
      : tone === "rose"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : tone === "amber"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : tone === "slate"
      ? "border-slate-200 bg-slate-50 text-slate-700"
      : "border-slate-200 bg-white text-slate-700";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide",
        cls,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">{eyebrow}</div>
      <div className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">{title}</div>
      <div className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">{subtitle}</div>
    </div>
  );
}

function GradientRail() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 rounded-3xl border border-slate-200 bg-white" />
      <div className="absolute inset-0 rounded-3xl [background:radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.18),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.16),transparent_44%),radial-gradient(circle_at_55%_90%,rgba(253,230,138,0.18),transparent_48%)]" />
      <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.35]" />
    </div>
  );
}

function SignalCard({
  k,
  title,
  desc,
  tag,
}: {
  k: string;
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <motion.div
      layout
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_48px_rgba(2,6,23,0.06)]"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-black tracking-tight text-slate-950">{title}</div>
          <div className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</div>
        </div>
        <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-700">
          {k}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-slate-500">{tag}</span>
        <div className="h-8 w-8 rounded-2xl border border-slate-200 bg-white grid place-items-center text-slate-900 group-hover:bg-slate-50">
          <span className="text-sm">↗</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const reduced = usePrefersReducedMotion();

  // Scroll choreography
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });

  const heroShift = useTransform(scrollYProgress, [0, 0.25], [0, -40]);
  const heroFade = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const orbScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);

  // Pointer-reactive glow (no glass)
  const { mx, my, inView, glow, glow2 } = usePointerGlow();

  const [activeMode, setActiveMode] = useState<"calm" | "bold" | "deep">("calm");

  const signals = useMemo(() => {
    if (activeMode === "bold") {
      return [
        {
          k: "01",
          title: "Move fast, stay precise",
          desc: "You can be high-energy without being chaotic. We map your natural cadence.",
          tag: "Momentum",
        },
        {
          k: "02",
          title: "Social presence, not performance",
          desc: "How you show up when you’re not trying to impress anyone.",
          tag: "Signal",
        },
        {
          k: "03",
          title: "Risk appetite & recovery",
          desc: "What you leap into — and what you need to reset after.",
          tag: "Edge",
        },
      ];
    }
    if (activeMode === "deep") {
      return [
        {
          k: "01",
          title: "Depth without heaviness",
          desc: "Some people feel everything — and still move forward cleanly.",
          tag: "Inner world",
        },
        {
          k: "02",
          title: "Your pattern under pressure",
          desc: "We don’t judge. We identify the curve you naturally follow.",
          tag: "Resilience",
        },
        {
          k: "03",
          title: "The environment you need",
          desc: "Places and rhythms that unlock you — not drain you.",
          tag: "Alignment",
        },
      ];
    }
    return [
      {
        k: "01",
        title: "Calm isn’t slow",
        desc: "It’s signal clarity. The way you choose, commit, and refine.",
        tag: "Clarity",
      },
      {
        k: "02",
        title: "Instinct is data",
        desc: "Your first answer is usually the truth. We keep it lightweight and sharp.",
        tag: "Calibration",
      },
      {
        k: "03",
        title: "Identity without labels",
        desc: "Not therapy talk. Not stereotypes. Just how you move through life.",
        tag: "Modern mapping",
      },
    ];
  }, [activeMode]);

  return (
    <main ref={rootRef} className="min-h-screen bg-white text-slate-950">
      {/* Background system */}
      <div className="fixed inset-0 -z-10">
        {/* base */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.28]" />
        {/* soft orbs */}
        <motion.div
          style={{ scale: orbScale }}
          className="absolute -top-40 left-1/2 h-[620px] w-[920px] -translate-x-1/2 rounded-full blur-3xl opacity-80
                     [background:radial-gradient(circle_at_35%_35%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_70%_30%,rgba(244,114,182,0.18),transparent_58%),radial-gradient(circle_at_55%_75%,rgba(253,230,138,0.20),transparent_60%)]"
        />
      </div>

      {/* Top Nav */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <EthosMark />

          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/codes"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Codes
            </Link>
            <Link
              href="/quiz"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white hover:bg-slate-900"
            >
              Start calibration
            </Link>
          </div>

          <div className="sm:hidden">
            <Link
              href="/quiz"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white hover:bg-slate-900"
            >
              Start
            </Link>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section
        onPointerMove={(e) => {
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
        onPointerEnter={() => inView.set(0.22)}
        onPointerLeave={() => inView.set(0)}
        className="relative"
      >
        <div className="mx-auto max-w-6xl px-5 pt-12 sm:pt-16 pb-10">
          <motion.div style={{ y: heroShift, opacity: heroFade }} className="relative">
            {/* pointer glow layers */}
            {!reduced && (
              <>
                <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: glow }} />
                <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: glow2 }} />
              </>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left copy */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="sky">Mythic archetypes</Pill>
                  <Pill tone="slate">No stereotypes</Pill>
                  <Pill tone="amber">Fast calibration</Pill>
                </div>

                <h1 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.02]">
                  A mirror for how you move.
                  <span className="block text-slate-500">Not a personality test.</span>
                </h1>

                <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  Ethos maps your behavioral pattern into a symbolic archetype — designed to feel global, modern,
                  and emotionally sticky. Fast answers. High signal. No cringe labels.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/quiz"
                    className="h-12 rounded-2xl bg-slate-950 px-6 text-sm font-extrabold text-white grid place-items-center hover:bg-slate-900"
                  >
                    Start calibration
                  </Link>
                  <Link
                    href="/codes"
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-extrabold text-slate-950 grid place-items-center hover:bg-slate-50"
                  >
                    Explore codes
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                    ~2 minutes
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                    instinct-based
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                    mythic naming layer
                  </span>
                </div>
              </div>

              {/* Right interactive panel */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_22px_70px_rgba(2,6,23,0.10)] overflow-hidden">
                  <div className="p-5 border-b border-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">
                          LIVE SIGNAL PANEL
                        </div>
                        <div className="mt-1 text-sm font-black text-slate-950">Choose a mode</div>
                      </div>
                      <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1">
                        {(["calm", "bold", "deep"] as const).map((m) => (
                          <button
                            key={m}
                            onClick={() => setActiveMode(m)}
                            className={[
                              "px-3 py-2 text-xs font-extrabold rounded-xl transition",
                              activeMode === m ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-100",
                            ].join(" ")}
                          >
                            {m.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={activeMode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="grid grid-cols-1 gap-3"
                      >
                        {signals.map((s) => (
                          <SignalCard key={s.k} {...s} />
                        ))}
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-semibold text-slate-600">What you get</div>
                      <div className="mt-2 text-sm font-black text-slate-950">
                        Primary + Secondary + Tertiary archetype
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Plus a short explanation of why your pattern landed there.
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href="/quiz"
                        className="flex-1 h-11 rounded-2xl bg-slate-950 text-white text-sm font-extrabold grid place-items-center hover:bg-slate-900"
                      >
                        Calibrate now
                      </Link>
                      <Link
                        href="/codes"
                        className="flex-1 h-11 rounded-2xl border border-slate-200 bg-white text-slate-950 text-sm font-extrabold grid place-items-center hover:bg-slate-50"
                      >
                        Browse
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-slate-500">
                  Designed to be global-safe: symbolic archetypes, not cultural ownership.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle
          eyebrow="HOW IT WORKS"
          title="A system — not a vibe quiz."
          subtitle="Ethos reads your answers as behavioral signals and maps them into an archetype. The naming layer is mythic to stay brandable and culturally safe."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_48px_rgba(2,6,23,0.06)]">
            <div className="text-sm font-black text-slate-950">The calibration loop</div>
            <div className="mt-2 text-sm text-slate-600 leading-relaxed">
              Three-choice prompts reduce overthinking. We prioritize instinct, then triangulate into a stable archetype
              profile. You get clarity and direction — without personality-test cringe.
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { n: "01", t: "Answer by instinct", d: "Fast taps, minimal noise." },
                { n: "02", t: "Pattern triangulation", d: "Signals combine into a map." },
                { n: "03", t: "Archetype reveal", d: "A name you can actually own." },
              ].map((x) => (
                <div key={x.n} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-[11px] font-extrabold tracking-[0.18em] text-slate-500">{x.n}</div>
                  <div className="mt-2 text-sm font-black text-slate-950">{x.t}</div>
                  <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-semibold text-slate-600">Ethos promise</div>
              <div className="mt-2 text-sm font-black text-slate-950">
                Identity without stereotypes — clarity without labels.
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Your code is a lens — not a box. You can retake anytime.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl overflow-hidden">
            <GradientRail />
            <div className="relative p-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_48px_rgba(2,6,23,0.06)]">
                <div className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">PREVIEW</div>
                <div className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  Mythic archetype names
                </div>
                <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Instead of culture-as-identity, we use symbolic entities. You keep depth without appropriation risk.
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { a: "Kitsune", b: "Precision • mastery • quiet excellence" },
                    { a: "Leviathan", b: "Depth • intensity • inner gravity" },
                    { a: "Phoenix", b: "Reinvention • momentum • transformation" },
                  ].map((x) => (
                    <div key={x.a} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-sm font-black text-slate-950">{x.a}</div>
                      <div className="mt-1 text-sm text-slate-600">{x.b}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    href="/quiz"
                    className="flex-1 h-11 rounded-2xl bg-slate-950 text-white text-sm font-extrabold grid place-items-center hover:bg-slate-900"
                  >
                    Try it
                  </Link>
                  <Link
                    href="/codes"
                    className="flex-1 h-11 rounded-2xl border border-slate-200 bg-white text-slate-950 text-sm font-extrabold grid place-items-center hover:bg-slate-50"
                  >
                    All codes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: EXPERIENCE */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionTitle
          eyebrow="EXPERIENCE"
          title="Designed like a future product."
          subtitle="Not a blog. Not a template. Ethos feels like a system you can step into — clean, confident, and addictive."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div
            className="md:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_48px_rgba(2,6,23,0.06)]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="text-sm font-black text-slate-950">Hook loop</div>
            <div className="mt-2 text-sm text-slate-600 leading-relaxed">
              The experience is intentionally tactile: quick prompts → reveal → deeper exploration. Users don’t bounce
              because it feels like momentum, not homework.
            </div>

            <div className="mt-6 space-y-3">
              {[
                { t: "Fast inputs", d: "Instinct-based flow to keep signal clean." },
                { t: "A reveal worth sharing", d: "Names that feel like identity, not labels." },
                { t: "Depth on demand", d: "Click into code pages when curiosity hits." },
              ].map((x) => (
                <div key={x.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-black text-slate-950">{x.t}</div>
                  <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_48px_rgba(2,6,23,0.06)]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-black text-slate-950">Micro-interactions</div>
                <div className="mt-1 text-sm text-slate-600">
                  Smooth, responsive, and “designed” — without gimmicks.
                </div>
              </div>
              <Pill tone="slate">Premium UI system</Pill>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { k: "A", t: "Cursor-reactive hero", d: "Subtle energy tracking your movement." },
                { k: "B", t: "Scroll choreography", d: "Sections reveal with intent, not spam animations." },
                { k: "C", t: "Signal panel", d: "Interactive modes to preview depth." },
                { k: "D", t: "Clean contrast", d: "Modern white space with sharp hierarchy." },
              ].map((x) => (
                <div key={x.k} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-black text-slate-950">{x.t}</div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-1 text-[11px] font-extrabold text-slate-700">
                      {x.k}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/quiz"
                className="h-12 flex-1 rounded-2xl bg-slate-950 px-6 text-sm font-extrabold text-white grid place-items-center hover:bg-slate-900"
              >
                Start calibration
              </Link>
              <Link
                href="/codes"
                className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-extrabold text-slate-950 grid place-items-center hover:bg-slate-50"
              >
                Explore codes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <EthosMark />
          <div className="text-xs text-slate-500 max-w-xl">
            Built for clarity — not labels. Ethos is a mapping system designed to feel modern, global, and emotionally
            true.
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/quiz"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white hover:bg-slate-900"
            >
              Start
            </Link>
            <Link
              href="/codes"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-950 hover:bg-slate-50"
            >
              Codes
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
