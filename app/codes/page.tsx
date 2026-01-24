"use client";

import Link from "next/link";
import { useState } from "react";
import { CODE_PAGES, CODE_SLUGS, type CodeSlug } from "@/lib/codePages";
import { SignedIn } from '@clerk/nextjs';
import { motion } from "framer-motion";

/* ============================
   THEME
============================ */

const THEME = {
  bg: "linear-gradient(180deg, #0a0d12 0%, #111720 100%)",
  panel: "rgba(255,255,255,0.04)",
  panelStrong: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.14)",
  softBorder: "rgba(255,255,255,0.08)",
  textPrimary: "#e6e9ee",
  textSecondary: "#9aa3ad",
  textMuted: "rgba(154,163,173,0.75)",
  accent: "#c9a96a",
  accentGlow: "rgba(201,169,106,0.15)",
};

const DISPLAY_FONT = "'Cinzel', serif";
const BODY_FONT = "'Inter', system-ui, sans-serif";

/* ============================
   DATA - UPDATED FOR MYTHICAL GROUPING
============================ */

// Archetype categories for filtering
const ARCHETYPES: Record<string, CodeSlug[]> = {
  "All Archetypes": CODE_SLUGS as unknown as CodeSlug[],
  "Warriors & Protectors": ["khoisan", "enzuka", "ashkara", "kinmora"],
  "Creators & Visionaries": ["kayori", "shokunin", "jaejin", "alethir"],
  "Seekers & Scholars": ["sahen", "lhumir", "yatevar", "siyuane"],
  "Guardians & Builders": ["Tahiri", "tjukari", "skenari"],
  "Wanderers & Adapters": ["namsea", "khoruun", "karayni", "wohaka", "siljoa"],
};

const ESSENCE_TYPES: Record<string, CodeSlug[]> = {
  "All": CODE_SLUGS as unknown as CodeSlug[],
  "Solitary": ["khoisan", "sahen", "lhumir", "tjukari", "skenari"],
  "Communal": ["kayori", "enzuka", "Tahiri", "karayni", "wohaka"],
  "Adaptive": ["namsea", "khoruun", "siyuane", "yatevar", "siljoa"],
  "Mastery": ["shokunin", "jaejin", "alethir", "kinmora", "ashkara"],
};

/* ============================
   COMPONENT
============================ */

export default function CodesLibraryPage() {
  const [archetypeFilter, setArchetypeFilter] = useState<string>("All Archetypes");
  const [essenceFilter, setEssenceFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get filtered codes
  const filteredCodes = CODE_SLUGS.filter((slug) => {
    const archetypeMatch = ARCHETYPES[archetypeFilter]?.includes(slug);
    const essenceMatch = ESSENCE_TYPES[essenceFilter]?.includes(slug);
    const searchMatch = 
      searchQuery === "" ||
      CODE_PAGES[slug].fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      CODE_PAGES[slug].snapshot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      CODE_PAGES[slug].lens.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return archetypeMatch && essenceMatch && searchMatch;
  });

  return (
    <main className="min-h-screen font-[family-name:var(--font-inter)] text-white" 
          style={{ background: THEME.bg }}>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b"
           style={{ 
             background: "rgba(10,13,18,0.92)",
             borderColor: THEME.softBorder 
           }}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" 
                className="text-2xl font-black tracking-tight font-[family-name:var(--font-cinzel)]"
                style={{ color: THEME.accent }}>
            Avirage
          </Link>

          <div className="flex gap-8 items-center">
            <Link href="/about" 
                  className="text-sm font-semibold tracking-wide transition-colors hover:text-white"
                  style={{ color: THEME.textSecondary }}>
              About
            </Link>
            <Link href="/codes" 
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: THEME.accent }}>
              Mythical Codex
            </Link>
            <Link href="/faq" 
                  className="text-sm font-semibold tracking-wide transition-colors hover:text-white"
                  style={{ color: THEME.textSecondary }}>
              FAQ
            </Link>
            <SignedIn>           
              <Link href="/dashboard" 
                    className="text-sm font-semibold tracking-wide transition-colors hover:text-white"
                    style={{ color: THEME.textSecondary }}>
                Dashboard
              </Link>
            </SignedIn>
            <Link href="/quiz" 
                  className="px-5 py-2 rounded-xl text-sm font-bold tracking-wider border transition-all hover:scale-105"
                  style={{ 
                    background: THEME.panel,
                    borderColor: THEME.softBorder,
                    color: THEME.textPrimary 
                  }}>
              Take Quiz
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section className="relative pt-24 pb-20 px-6 text-center border-b overflow-hidden"
               style={{ borderColor: THEME.softBorder }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] opacity-20"
               style={{ background: THEME.accent }} />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10"
               style={{ background: "#6a95c9" }} />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full border backdrop-blur-sm mb-6"
            style={{ 
              borderColor: THEME.softBorder,
              background: "rgba(255,255,255,0.03)" 
            }}>
            <span className="text-xs font-black tracking-[0.2em] uppercase"
                  style={{ color: THEME.accent }}>
              Explore
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl font-black tracking-tight mb-6 font-[family-name:var(--font-cinzel)]"
            style={{ 
              background: `linear-gradient(135deg, ${THEME.textPrimary} 0%, ${THEME.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            Mythical Codex
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: THEME.textSecondary }}>
            Twenty archetypal traditions — each a distinct lens through which to perceive, 
            decide, and navigate existence. Not cultural identities, but behavioral patterns 
            that transcend geography.
          </motion.p>
        </div>
      </section>

      {/* Filters & Search - Enhanced */}
      <section className="py-12 px-6 border-b"
               style={{ borderColor: THEME.softBorder }}>
        <div className="max-w-[1400px] mx-auto">
          {/* Search Bar - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-30 pointer-events-none"
                   style={{ background: THEME.accentGlow }} />
              <input
                type="text"
                placeholder="Search by archetype, description, or lens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full px-6 py-4 text-base rounded-2xl border backdrop-blur-sm outline-none transition-all focus:border-opacity-100 font-medium"
                style={{ 
                  background: "rgba(255,255,255,0.04)",
                  borderColor: THEME.softBorder,
                  color: THEME.textPrimary 
                }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                🔍
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8">
            
            {/* Archetype Filter */}
            <div>
              <div className="text-xs font-black tracking-[0.15em] uppercase mb-4"
                   style={{ color: THEME.textMuted }}>
                Archetype Category
              </div>
              <div className="flex gap-3 flex-wrap">
                {Object.keys(ARCHETYPES).map((archetype) => (
                  <button
                    key={archetype}
                    onClick={() => setArchetypeFilter(archetype)}
                    className="px-5 py-2.5 text-sm font-bold rounded-xl border transition-all hover:scale-105"
                    style={archetypeFilter === archetype ? {
                      borderColor: THEME.accent,
                      background: THEME.accentGlow,
                      color: THEME.accent,
                      boxShadow: `0 0 20px ${THEME.accentGlow}`
                    } : {
                      borderColor: THEME.softBorder,
                      background: "transparent",
                      color: THEME.textSecondary
                    }}>
                    {archetype}
                  </button>
                ))}
              </div>
            </div>

            {/* Essence Filter */}
            <div>
              <div className="text-xs font-black tracking-[0.15em] uppercase mb-4"
                   style={{ color: THEME.textMuted }}>
                Core Essence
              </div>
              <div className="flex gap-3 flex-wrap">
                {Object.keys(ESSENCE_TYPES).map((essence) => (
                  <button
                    key={essence}
                    onClick={() => setEssenceFilter(essence)}
                    className="px-5 py-2.5 text-sm font-bold rounded-xl border transition-all hover:scale-105"
                    style={essenceFilter === essence ? {
                      borderColor: THEME.accent,
                      background: THEME.accentGlow,
                      color: THEME.accent,
                      boxShadow: `0 0 20px ${THEME.accentGlow}`
                    } : {
                      borderColor: THEME.softBorder,
                      background: "transparent",
                      color: THEME.textSecondary
                    }}>
                    {essence}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm font-semibold pt-2"
                 style={{ color: THEME.textMuted }}>
              Showing <span style={{ color: THEME.accent }}>{filteredCodes.length}</span> of {CODE_SLUGS.length} archetypes
            </div>
          </motion.div>
        </div>
      </section>

      {/* Codes Grid - Enhanced */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {filteredCodes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24">
              <div className="text-6xl mb-6">🔮</div>
              <div className="text-2xl font-black mb-3"
                   style={{ color: THEME.textPrimary }}>
                No archetypes found
              </div>
              <p className="text-base"
                 style={{ color: THEME.textMuted }}>
                Try adjusting your filters or search query
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCodes.map((slug, index) => (
                <ArchetypeCard key={slug} slug={slug} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto relative">
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 pointer-events-none"
               style={{ background: THEME.accent }} />
          
          <div className="relative p-16 rounded-3xl border text-center"
               style={{ 
                 background: "rgba(255,255,255,0.02)",
                 borderColor: THEME.border 
               }}>
            <h2 className="text-4xl sm:text-5xl font-black mb-5 font-[family-name:var(--font-cinzel)]"
                style={{ color: THEME.textPrimary }}>
              Discover Your Archetype
            </h2>
            <p className="text-lg mb-10 leading-relaxed"
               style={{ color: THEME.textSecondary }}>
              Take the 10-minute assessment to reveal which mythical lens 
              you naturally embody.
            </p>
            <Link href="/quiz" 
                  className="inline-block px-10 py-4 rounded-2xl border font-black text-base tracking-[0.08em] uppercase transition-all hover:scale-105"
                  style={{ 
                    borderColor: "rgba(201,169,106,0.45)",
                    background: "rgba(201,169,106,0.12)",
                    color: THEME.textPrimary,
                    boxShadow: `0 0 30px ${THEME.accentGlow}`
                  }}>
              Begin Assessment
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-16"
              style={{ 
                borderColor: THEME.softBorder,
                background: "rgba(0,0,0,0.2)" 
              }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
            <div>
              <div className="text-2xl font-black mb-3 font-[family-name:var(--font-cinzel)]"
                   style={{ color: THEME.accent }}>
                Avirage
              </div>
              <p className="text-sm"
                 style={{ color: THEME.textMuted }}>
                Cultural lens identification system
              </p>
            </div>

            <div className="flex gap-20 justify-end">
              <div className="flex flex-col gap-3">
                <div className="text-xs font-black tracking-[0.1em] uppercase mb-1"
                     style={{ color: THEME.textPrimary }}>
                  Learn
                </div>
                <Link href="/about" 
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: THEME.textSecondary }}>
                  About
                </Link>
                <Link href="/codes" 
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: THEME.textSecondary }}>
                  Mythical Codex
                </Link>
                <Link href="/faq" 
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: THEME.textSecondary }}>
                  FAQ
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-xs font-black tracking-[0.1em] uppercase mb-1"
                     style={{ color: THEME.textPrimary }}>
                  Start
                </div>
                <Link href="/quiz" 
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: THEME.textSecondary }}>
                  Take Assessment
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t text-center"
               style={{ borderColor: THEME.softBorder }}>
            <p className="text-sm"
               style={{ color: THEME.textMuted }}>
              © 2025 Avirage. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ============================
   ARCHETYPE CARD - COMPLETELY REDESIGNED
============================ */

function ArchetypeCard({ slug, index }: { slug: CodeSlug; index: number }) {
  const code = CODE_PAGES[slug];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}>
      
      <Link
        href={`/codepages/${slug}`}
        className="block relative group">
        
        {/* Glow on hover */}
        <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none"
             style={{ background: THEME.accentGlow }} />
        
        {/* Card */}
        <div className="relative p-7 rounded-2xl border backdrop-blur-sm transition-all duration-300"
             style={{
               background: isHovered ? THEME.panelStrong : THEME.panel,
               borderColor: isHovered ? THEME.border : THEME.softBorder,
             }}>
          
          {/* Header */}
          <div className="mb-5">
            {/* Mythical Name - PRIMARY */}
            <h3 className="text-2xl font-black mb-2 font-[family-name:var(--font-cinzel)] tracking-tight"
                style={{ color: THEME.accent }}>
              {code.fullName}
            </h3>
            
            {/* Cultural Reference - SUBTLE */}
            <div className="text-xs font-bold tracking-wide mb-1"
                 style={{ color: THEME.textMuted }}>
              {code.codeName.toUpperCase()}
            </div>
            
            {/* Archetype Type */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase"
                 style={{ 
                   background: "rgba(255,255,255,0.05)",
                   color: THEME.textMuted 
                 }}>
              <span className="w-1.5 h-1.5 rounded-full"
                    style={{ background: THEME.accent }} />
              {code.origin.level1}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 min-h-[80px]"
             style={{ color: THEME.textSecondary }}>
            {code.snapshot}
          </p>

          {/* Lens Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border"
                 style={{ 
                   borderColor: THEME.softBorder,
                   background: "rgba(255,255,255,0.02)" 
                 }}>
              <span className="text-sm">👁</span>
              <span className="text-xs font-bold tracking-wide"
                    style={{ color: THEME.textMuted }}>
                {code.lens.title}
              </span>
            </div>

            {/* Arrow indicator */}
            <div className="text-xl transition-transform duration-300 group-hover:translate-x-1"
                 style={{ 
                   color: THEME.accent,
                   opacity: isHovered ? 1 : 0.4 
                 }}>
              →
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}