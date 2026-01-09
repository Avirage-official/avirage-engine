"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

/**
 * About Page — Ethos
 * - Matches your newer “premium / smooth / interactive” vibe (like quiz + landing)
 * - No algorithm touch
 * - Keeps content, upgrades presentation + flow
 * - Uses Tailwind + Framer Motion (no inline CSS)
 */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function normalizedSlug(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function GlowField() {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.9 });

  const glow = useMotionTemplate`
    radial-gradient(700px circle at ${sx}px ${sy}px,
      rgba(168, 85, 247, 0.18),
      transparent 42%
    ),
    radial-gradient(580px circle at ${sx}px ${sy}px,
      rgba(236, 72, 153, 0.12),
      transparent 45%
    ),
    radial-gradient(620px circle at 20% 20%,
      rgba(34, 211, 238, 0.10),
      transparent 60%
    )
  `;

  return (
    <div
      className="fixed inset-0 -z-10"
      onMouseMove={(e) => {
        if (reduced) return;
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <motion.div className="absolute inset-0" style={{ background: glow }} />
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(1200px_720px_at_50%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_720px_at_50%_10%,transparent_45%,rgba(0,0,0,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:56px_56px]" />
    </div>
  );
}

function TopNav({ active }: { active: "about" | "codes" | "faq" }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1200px,92vw)] items-center justify-between py-4">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              ETHOS
            </span>
          </span>
          <span className="hidden sm:block rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">
            Method
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink href="/about" isActive={active === "about"}>
            About
          </NavLink>
          <NavLink href="/codes" isActive={active === "codes"}>
            Code Library
          </NavLink>
          <NavLink href="/faq" isActive={active === "faq"}>
            FAQ
          </NavLink>

          <SignedIn>
            <NavLink href="/dashboard" isActive={false}>
              Dashboard
            </NavLink>
          </SignedIn>

          <div className="hidden sm:block">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-2xl border border-white/14 bg-white/[0.05] px-4 py-2 text-sm font-extrabold text-white/85 hover:bg-white/[0.08]">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="rounded-2xl border border-white/14 bg-white/[0.05] px-3 py-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>

          <Link
            href="/quiz"
            className="rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-all active:scale-[0.99]"
          >
            Begin Mapping
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "rounded-xl px-3 py-2 text-sm font-semibold transition",
        isActive ? "text-white" : "text-white/65 hover:text-white",
      ].join(" ")}
    >
      <span className="relative">
        {children}
        {isActive ? (
          <span className="absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400" />
        ) : null}
      </span>
    </Link>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2">
      <span className="h-2 w-2 rounded-full bg-violet-400" />
      <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/75">{children}</span>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[1.75rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent" />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-black/30 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">
      {children}
    </span>
  );
}

function FrameworkCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="text-sm font-extrabold text-white">
        <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
          {name}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/70">{description}</p>
    </div>
  );
}

function PatternCategory({ title, patterns }: { title: string; patterns: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">{title}</div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-white/70">
        {patterns.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UseCaseCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
      <div className="text-base font-extrabold text-white">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/70">{description}</p>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="shrink-0">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/10 text-lg font-black text-violet-200">
            {n}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-lg font-black text-white">{title}</div>
            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="mt-4 text-sm leading-7 text-white/70">{children}</div>
        </div>
      </div>
    </Card>
  );
}

function MiniCallout({
  icon,
  title,
  children,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  tone: "warn" | "ok";
}) {
  const styles =
    tone === "warn"
      ? "border-red-400/25 bg-red-500/10"
      : "border-emerald-400/25 bg-emerald-500/10";

  const titleColor = tone === "warn" ? "text-red-200" : "text-emerald-200";

  return (
    <div className={`mt-5 flex gap-4 rounded-2xl border p-4 ${styles}`}>
      <div className="text-xl">{icon}</div>
      <div className="min-w-0">
        <div className={`text-sm font-extrabold ${titleColor}`}>{title}</div>
        <div className="mt-1 text-sm leading-6 text-white/75">{children}</div>
      </div>
    </div>
  );
}

function Toc({
  items,
  onJump,
  activeId,
}: {
  items: { id: string; label: string }[];
  onJump: (id: string) => void;
  activeId: string;
}) {
  return (
    <div className="sticky top-[92px] hidden h-fit lg:block">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
          On this page
        </div>

        <div className="mt-3 flex flex-col gap-1.5">
          {items.map((it) => {
            const active = it.id === activeId;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onJump(it.id)}
                className={[
                  "rounded-xl px-3 py-2 text-left text-sm font-semibold transition",
                  active
                    ? "border border-white/18 bg-white/[0.06] text-white"
                    : "text-white/65 hover:bg-white/[0.04] hover:text-white",
                ].join(" ")}
              >
                {it.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55">
            Shortcut
          </div>
          <Link
            href="/quiz"
            className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-purple-500/35 hover:shadow-purple-500/60"
          >
            Begin Mapping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const sections = useMemo(
    () => [
      { id: "what", label: "What Ethos is" },
      { id: "lens", label: "From Personality → Lens" },
      { id: "how", label: "How it works" },
      { id: "defensible", label: "Defensible framing" },
      { id: "why", label: "Why this works" },
      { id: "use", label: "Use cases" },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0].id);

  // observe sections for TOC highlight
  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, threshold: [0.15, 0.25, 0.4], rootMargin: "-20% 0px -65% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <GlowField />
      <TopNav active="about" />

      {/* Hero */}
      <section className="mx-auto w-[min(1200px,92vw)] pt-12 sm:pt-16">
        <Card className="relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute -inset-24 opacity-40 blur-2xl"
              animate={{ rotate: 360, scale: [1, 1.04, 1] }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "radial-gradient(700px 420px at 25% 25%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(760px 460px at 80% 72%, rgba(236,72,153,0.14), transparent 60%), radial-gradient(640px 420px at 55% 18%, rgba(34,211,238,0.12), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_20%,transparent_40%,rgba(0,0,0,0.70)_100%)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionKicker>Methodology</SectionKicker>

              <div className="flex flex-wrap items-center gap-2">
                <Pill>Not a diagnosis</Pill>
                <Pill>Not stereotypes</Pill>
                <Pill>Lens mapping</Pill>
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
              What{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Ethos
              </span>{" "}
              actually is
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
              A structured interpretive system for identifying archetypal cultural traditions through cross-framework
              behavioral pattern analysis.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-all"
              >
                Begin Mapping
              </Link>

              <Link
                href="/codes"
                className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/[0.05] px-6 py-4 text-sm font-extrabold text-white/85 hover:bg-white/[0.08]"
              >
                Browse Code Library
              </Link>
            </div>
          </motion.div>
        </Card>
      </section>

      {/* Body */}
      <section className="mx-auto w-[min(1200px,92vw)] pb-20 pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <Toc items={sections} onJump={jump} activeId={activeId} />

          <div className="min-w-0">
            {/* What */}
            <div id="what" className="scroll-mt-28">
              <Card className="p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                      Core concept
                    </div>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">Not a personality test</h2>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white/70">
                    A lens-mapping system
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/70">
                  Ethos doesn&apos;t classify you into personality types or diagnose traits. Instead, it identifies which
                  archetypal tradition you most strongly align with — the framework through which you naturally perceive,
                  decide, relate, and move through the world.
                </p>

                <p className="mt-4 text-sm leading-7 text-white/70">
                  These archetypal traditions are expressed as <span className="font-extrabold text-white/85">Cultural Codes</span> — each grounded in:
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Historically real cultures (Level-1 origins)",
                    "Recurring behavioral patterns",
                    "Shared value systems",
                    "Ways of living, working, socializing, creating meaning",
                  ].map((x) => (
                    <div
                      key={x}
                      className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm font-semibold text-white/75"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-xl border border-white/12 bg-white/[0.04]">
                          <span className="text-sm">✦</span>
                        </div>
                        <div className="min-w-0 leading-6">{x}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Divider />

            {/* Lens */}
            <div id="lens" className="scroll-mt-28">
              <Card className="p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                      Philosophy
                    </div>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">From “personality” to “lens”</h2>
                  </div>
                  <Pill>Interpretive frameworks</Pill>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55">
                      Traditional models ask
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-white/75">
                      {["What traits do you have?", "What category do you belong to?"].map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-violet-200/90">
                      Ethos asks
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-white/80">
                      {["What worldview do you naturally operate from?", "Which cultural logic feels intuitive to you?"].map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-200/70" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-white/70">
                  People don’t just have traits — they live inside <span className="font-extrabold text-white/85">interpretive frameworks</span>. Ethos maps those frameworks.
                </p>
              </Card>
            </div>

            <Divider />

            {/* How */}
            <div id="how" className="scroll-mt-28">
              <div className="mb-5">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                  The system
                </div>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">How the system works</h2>
              </div>

              <div className="space-y-5">
                <Step n={1} title="Input frameworks (foundational signals)">
                  <p>
                    Ethos integrates four established interpretive frameworks — not as truth-claims, but as pattern
                    generators.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <FrameworkCard
                      name="Big Five"
                      description="Behavioral tendencies — statistically grounded distributions for stability, energy, openness, regulation."
                    />
                    <FrameworkCard
                      name="MBTI"
                      description="Cognitive preference axes — IE/SN/TF/JP treated as directional signals, not type identity."
                    />
                    <FrameworkCard
                      name="Enneagram"
                      description="Motivational gravity — detects why behaviors occur, focusing on coping styles and desire patterns."
                    />
                    <FrameworkCard
                      name="Astrology"
                      description="Symbolic archetypal layer — element/modality provides mythic language, used non-deterministically."
                    />
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/70">
                    <span className="font-extrabold text-white/85">Key:</span> each framework contributes partial, imperfect signals. No single framework dominates.
                  </div>
                </Step>

                <Step n={2} title="Pattern abstraction layer (the innovation)">
                  <p>
                    Instead of mapping frameworks directly to codes, Ethos introduces a{" "}
                    <span className="font-extrabold text-white/85">Pattern Abstraction Layer</span> — the innovation that
                    removes framework-specific bias and creates a shared behavioral language.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <PatternCategory
                      title="Cognitive"
                      patterns={["Abstract thinking", "Sensory appreciation", "Pattern recognition", "Detail orientation", "Present-moment focus"]}
                    />
                    <PatternCategory
                      title="Creation"
                      patterns={["Craftsmanship drive", "Structure preference", "Improvisation comfort", "Pace preference", "Output orientation"]}
                    />
                    <PatternCategory
                      title="Emotional"
                      patterns={["Emotional stability", "Expressiveness", "Environmental sensitivity", "Introspection depth", "Optimism baseline"]}
                    />
                    <PatternCategory
                      title="Social"
                      patterns={["Social energy", "Group size preference", "Conflict navigation", "Influence drive", "Collaborative preference"]}
                    />
                    <PatternCategory
                      title="Values"
                      patterns={["Tradition orientation", "Novelty seeking", "Stability seeking", "Meaning orientation"]}
                    />
                    <PatternCategory title="Environment" patterns={["Nature connection"]} />
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/70">
                    Each pattern requires <span className="font-extrabold text-white/85">agreement across frameworks</span> and carries a confidence score (0.5–1.0). This creates cross-framework convergences, not raw traits.
                  </div>
                </Step>

                <Step n={3} title="Cultural code matching">
                  <p>Each of the 20 Cultural Codes defines:</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Core patterns (non-negotiable, weighted ×1.0)",
                      "Supporting patterns (add nuance, weighted ×0.5)",
                      "Incompatible patterns (penalized at −0.3 weight)",
                      "Minimum coherence threshold (prevents random matches)",
                    ].map((x) => (
                      <div key={x} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm font-semibold text-white/75">
                        {x}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">
                    This prevents “everyone fits everything” and ensures only behaviorally coherent matches appear.
                  </p>
                </Step>

                <Step n={4} title="Result interpretation">
                  <p>
                    You receive your top 3 Cultural Code matches (Primary, Secondary, Tertiary) with confidence scores
                    (High ≥75%, Moderate 60–74%, Low &lt;60%).
                  </p>

                  <MiniCallout icon="⚠️" title="What your result does NOT mean" tone="warn">
                    <ul className="mt-2 space-y-1">
                      {["You are from that culture", "You behave like a stereotype", "You are fixed or permanent"].map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </MiniCallout>

                  <MiniCallout icon="✓" title="What your result means" tone="ok">
                    “Given how you currently think, regulate, relate, and orient meaning — this archetypal tradition fits
                    you best.” It’s your <span className="font-extrabold text-white/85">current lens alignment</span>, not
                    your identity.
                  </MiniCallout>
                </Step>
              </div>
            </div>

            <Divider />

            {/* Defensible */}
            <div id="defensible" className="scroll-mt-28">
              <Card className="p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                      Positioning
                    </div>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">Why this is defensible</h2>
                  </div>
                  <Pill>Structured interpretive system</Pill>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/70">Ethos is:</p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-emerald-300/20 bg-black/20 text-lg">
                        ✓
                      </div>
                      <div className="text-sm font-extrabold text-emerald-200">Inspired by</div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm leading-6 text-white/80">
                      {["Psychology (Big Five, MBTI, Enneagram)", "Anthropology (cultural patterns)", "Cultural studies (archetypal theory)"].map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-200/70" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-red-300/20 bg-black/20 text-lg">
                        ✗
                      </div>
                      <div className="text-sm font-extrabold text-red-200">Not claiming</div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm leading-6 text-white/80">
                      {["Clinical diagnosis", "Predictive certainty", "Biological determinism"].map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/70">
                  Ethos operates as a <span className="font-extrabold text-white/85">structured interpretive system</span>, not a medical or psychological instrument. It’s culturally informed self-knowledge, not fate.
                </p>
              </Card>
            </div>

            <Divider />

            {/* Why */}
            <div id="why" className="scroll-mt-28">
              <Card className="p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                      Foundation
                    </div>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">Why this works</h2>
                  </div>
                  <Pill>Meaning → outcomes</Pill>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    ["Humans organize meaning culturally.", "We don’t operate in isolation — we inherit and align with cultural logics."],
                    ["Cultures encode repeatable behavioral logics.", "Cultural traditions aren’t random — they represent coherent ways of being."],
                    ["Individuals unconsciously align with certain logics.", "You gravitate toward frameworks that feel “right” to you."],
                    ["Those alignments affect outcomes.", "Your lens impacts work satisfaction, social belonging, lifestyle harmony, and creative output."],
                    ["Ethos makes that implicit alignment explicit.", "That’s the entire point."],
                  ].map(([a, b]) => (
                    <div key={a} className="rounded-3xl border border-white/10 bg-black/25 p-6">
                      <div className="text-sm font-extrabold text-white">{a}</div>
                      <p className="mt-2 text-sm leading-7 text-white/70">{b}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Divider />

            {/* Use */}
            <div id="use" className="scroll-mt-28">
              <Card className="p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                      Use cases
                    </div>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">What Ethos is for</h2>
                  </div>
                  <Pill>Applied clarity</Pill>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <UseCaseCard title="Self-understanding" description="Discover the lens through which you naturally operate." />
                  <UseCaseCard title="Lifestyle alignment" description="Find environments, activities, and rhythms that fit your lens." />
                  <UseCaseCard title="Community matching" description="Connect with others who share your cultural logic." />
                  <UseCaseCard title="Creative direction" description="Understand your aesthetic and creative instincts." />
                  <UseCaseCard title="Team dynamics" description="Map team members’ lenses for better collaboration." />
                  <UseCaseCard title="Career fit" description="Identify work cultures that align with your worldview." />
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-extrabold text-white">Ready to discover your lens?</div>
                      <div className="mt-1 text-sm text-white/70">2 minutes. 3 options per question. Instinct-first.</div>
                    </div>
                    <Link
                      href="/quiz"
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-purple-500/35 hover:shadow-purple-500/60"
                    >
                      Begin Mapping
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* Footer */}
            <div className="mt-10">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-sm text-white/60">
                  <span className="font-extrabold text-white/80">ETHOS</span> • Cultural lens identification system
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Link href="/about" className="text-white/60 hover:text-white">
                    About
                  </Link>
                  <Link href="/codes" className="text-white/60 hover:text-white">
                    Code Library
                  </Link>
                  <Link href="/faq" className="text-white/60 hover:text-white">
                    FAQ
                  </Link>
                </div>
              </div>
              <div className="mt-6 text-center text-xs text-white/35">© 2025 Ethos. All rights reserved.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
