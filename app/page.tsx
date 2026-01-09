"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CODE_PAGES } from "@/lib/codePages";

/**
 * ETHOS LANDING PAGE (2025 REDESIGN - OPTIMIZED)
 * 
 * Performance optimizations:
 * - Throttled mouse tracking (50ms)
 * - Reduced blur intensity
 * - Removed noise texture
 * - Added will-change hints
 * - Optimized floating shapes
 */

// Icon mapping for featured codes
const CODE_ICONS: Record<string, string> = {
  shokunin: "🎯",
  khoisan: "🌍",
  yatevar: "⚡",
  namsea: "💧",
  alethir: "👁️",
  enzuka: "🛡️",
  kayori: "🎭",
  sahen: "🏜️",
};

// Gradient mapping for featured codes
const CODE_GRADIENTS: Record<string, string> = {
  shokunin: "from-blue-500 to-cyan-500",
  khoisan: "from-amber-500 to-orange-500",
  yatevar: "from-purple-500 to-pink-500",
  namsea: "from-teal-500 to-emerald-500",
  alethir: "from-indigo-500 to-blue-500",
  enzuka: "from-red-500 to-rose-500",
  kayori: "from-fuchsia-500 to-purple-500",
  sahen: "from-orange-500 to-red-500",
};

// Get 6 featured codes from actual data
const FEATURED_CODE_SLUGS = ["shokunin", "khoisan", "yatevar", "namsea", "alethir", "enzuka"];

const FEATURED_CODES = FEATURED_CODE_SLUGS.map(slug => {
  const slugLower = slug.toLowerCase();
  const codeKey = Object.keys(CODE_PAGES).find(k => k.toLowerCase() === slugLower);
  if (!codeKey) return null;
  
  const codeData = CODE_PAGES[codeKey];
  return {
    slug: slugLower,
    name: codeData.codeName,
    title: codeData.fullName,
    desc: codeData.lens.title,
    snapshot: codeData.snapshot,
    color: CODE_GRADIENTS[slugLower] || "from-gray-500 to-gray-600",
    icon: CODE_ICONS[slugLower] || "✨"
  };
}).filter((code): code is NonNullable<typeof code> => code !== null);

// Magnetic button component
function MagneticButton({ 
  children, 
  href, 
  variant = "primary" 
}: { 
  children: React.ReactNode; 
  href: string;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = variant === "primary"
    ? "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/50"
    : "border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10";

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`
        relative px-8 py-4 rounded-2xl font-bold text-sm
        transition-all duration-200 ease-out
        hover:scale-105 active:scale-95
        will-change-transform
        ${baseClasses}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 blur-xl opacity-50" />
      )}
    </Link>
  );
}

// 3D Tilt Card Component
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  const handleLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      {children}
    </div>
  );
}

// Floating shape component (OPTIMIZED)
function FloatingShape({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-xl opacity-30 will-change-transform"
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
        width: "600px",
        height: "600px",
      }}
    />
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax values
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const bentoY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const bentoOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // Gradient mesh animation (THROTTLED)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const gradientMesh = useMotionTemplate`
    radial-gradient(800px circle at ${smoothMouseX}px ${smoothMouseY}px, 
      rgba(168, 85, 247, 0.15), 
      transparent 40%
    ),
    radial-gradient(600px circle at ${smoothMouseX}px ${smoothMouseY}px, 
      rgba(236, 72, 153, 0.10), 
      transparent 40%
    )
  `;

  // Throttled mouse tracking
  const throttleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!throttleTimerRef.current) {
      throttleTimerRef.current = setTimeout(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        throttleTimerRef.current = null;
      }, 50); // Update every 50ms instead of every frame
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient mesh background */}
      <motion.div 
        className="fixed inset-0 -z-10 will-change-auto"
        style={{ background: gradientMesh }}
      />

      {/* Floating shapes (OPTIMIZED) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <FloatingShape delay={0} />
        <div className="absolute top-1/4 right-1/4">
          <FloatingShape delay={5} />
        </div>
        <div className="absolute bottom-1/3 left-1/3">
          <FloatingShape delay={10} />
        </div>
      </div>

      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              ETHOS
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/codes" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
              Codes
            </Link>
            <Link href="/about" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
              About
            </Link>
            <Link 
              href="/quiz"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Begin Session
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-32 will-change-transform"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm font-semibold text-white/90">20 Archetypal Identities • Ethos Mapping</span>
          </motion.div>

          {/* Main headline with staggered animation */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8"
          >
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block"
            >
              Discover Your
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
            >
              Identity Code
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            A mythic lens for how you see the world. Not a personality test—
            <span className="text-white font-semibold"> a mirror for your instincts.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton href="/quiz" variant="primary">
              Begin Discovery →
            </MagneticButton>
            <MagneticButton href="/codes" variant="secondary">
              Explore 20 Codes
            </MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-white/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-violet-500" />
              <span>~2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-fuchsia-500" />
              <span>20 archetypal codes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-pink-500" />
              <span>Mythic naming system</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/40 font-semibold tracking-wider uppercase">Scroll</span>
            <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* BENTO GRID - Featured Codes */}
      <motion.section 
        style={{ y: bentoY, opacity: bentoOpacity }}
        className="relative py-32 px-6 will-change-transform"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6"
            >
              <span className="text-sm font-bold text-white/90">20 ARCHETYPAL CODES</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl font-black tracking-tight mb-6"
            >
              Choose Your{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Archetype
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/60 max-w-2xl mx-auto"
            >
              Each code represents a distinct lens—grounded in behavioral patterns, expressed through mythic archetypes.
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_CODES.map((code, i) => (
              <motion.div
                key={code.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TiltCard>
                  <Link
                    href={`/codepages/${code.slug}`}
                    className="group block relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${code.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    {/* Icon */}
                    <div className="text-5xl mb-4">{code.icon}</div>

                    {/* Title */}
                    <h3 className="text-2xl font-black mb-2 group-hover:text-white/90 transition-colors">
                      {code.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm text-white/50 mb-4 font-semibold">{code.desc}</p>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {code.snapshot}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white/80 group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* View all button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link 
              href="/codes"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold hover:bg-white/10 hover:border-white/30 transition-all"
            >
              <span>View All 20 Codes</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* HOW IT WORKS - Scroll Story */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6"
            >
              <span className="text-sm font-bold text-white/90">THE PROCESS</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl font-black tracking-tight mb-6"
            >
              How It Works
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60"
            >
              A triangulation system that maps behavior into archetypes
            </motion.p>
          </div>

          {/* Steps */}
          <div className="space-y-32">
            {[
              {
                num: "01",
                title: "Answer by Instinct",
                desc: "Quick, three-choice prompts designed to bypass overthinking. Your first answer is usually the truth.",
                icon: "⚡"
              },
              {
                num: "02",
                title: "Pattern Detection",
                desc: "Our triangulation engine cross-references multiple frameworks—Big Five, MBTI, Enneagram, Astrology—to find behavioral convergence.",
                icon: "🔮"
              },
              {
                num: "03",
                title: "Archetype Reveal",
                desc: "You receive your top 3 identity codes with mythic names that feel personal, not clinical.",
                icon: "✨"
              }
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="inline-block px-4 py-2 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm mb-6">
                    <span className="text-sm font-black text-white/50">{step.num}</span>
                  </div>
                  <h3 className="text-4xl font-black mb-4">{step.title}</h3>
                  <p className="text-lg text-white/60 leading-relaxed">{step.desc}</p>
                </div>

                <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <TiltCard>
                    <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm flex items-center justify-center text-8xl">
                      {step.icon}
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-16 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm overflow-hidden"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 animate-pulse" />

            <div className="relative z-10">
              <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
                Ready to begin?
              </h2>

              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Discover your identity code in under 2 minutes. 
                <br className="hidden sm:block" />
                No login required to start.
              </p>

              <MagneticButton href="/quiz" variant="primary">
                Begin Your Discovery →
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link href="/" className="text-2xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                ETHOS
              </span>
            </Link>
            <p className="text-sm text-white/40 mt-2">Identity code mapping system</p>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/codes" className="text-sm text-white/60 hover:text-white transition-colors">
              Codes
            </Link>
            <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          © 2025 Ethos. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
