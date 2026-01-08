"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";

/* ============================
   TYPES
============================ */

interface AnalysisResult {
  primary: { code_name: string; full_name: string; description: string; matchPercentage: number };
  secondary: { code_name: string; full_name: string; description: string; matchPercentage: number };
  tertiary: { code_name: string; full_name: string; description: string; matchPercentage: number };
  explanation: string;
  keyTraits: { trait: string; score: number; description: string }[];
  userName: string;
  astrologyData: { sunSign: string; element: string; modality: string };
}

/* ============================
   HELPERS
============================ */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}
function buildISODate(year: number, month: number, day: number) {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}
function safeSlugFromCodeName(codeName: unknown): string {
  if (typeof codeName !== "string") return "";
  const slug = codeName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return encodeURIComponent(slug);
}

/* ============================
   ANIMATED COMPONENTS
============================ */

function FloatingOrb({ delay = 0, size = 400 }: { delay?: number; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

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
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
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
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================
   MAIN COMPONENT
============================ */

export default function QuizPage() {
  const [step, setStep] = useState<"info" | "quiz" | "loading" | "result">("info");

  // Info fields
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [genderOther, setGenderOther] = useState("");
  const [city, setCity] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  // Birthdate
  const now = new Date();
  const currentYear = now.getFullYear();
  const minYear = 1940;
  const maxYear = currentYear;

  const [birthYear, setBirthYear] = useState<number>(1998);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);
  const [birthDateISO, setBirthDateISO] = useState<string>("");

  useEffect(() => {
    const dim = daysInMonth(birthYear, birthMonth);
    setBirthDay((d) => clamp(d, 1, dim));
  }, [birthYear, birthMonth]);

  const resolvedBirthDate = useMemo(() => {
    if (birthDateISO && /^\d{4}-\d{2}-\d{2}$/.test(birthDateISO)) return birthDateISO;
    return buildISODate(birthYear, birthMonth, birthDay);
  }, [birthDateISO, birthYear, birthMonth, birthDay]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Result
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = QUIZ_QUESTIONS.length;
  const progress = Math.round(((currentQuestionIndex + 1) / total) * 100);

  // Gradient mesh animation
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

  /* ============================
     ACTIONS
  ============================ */

  function validateInfo(): string | null {
    if (!name.trim()) return "Please enter your name.";
    if (!gender) return "Please select a gender.";
    if (gender === "other" && !genderOther.trim()) return "Please specify your gender.";
    if (!city.trim()) return "Please enter your city.";
    if (!ethnicity.trim()) return "Please enter your ethnicity/background.";

    if (!/^\d{4}-\d{2}-\d{2}$/.test(resolvedBirthDate)) return "Birthdate looks invalid.";
    const dt = new Date(resolvedBirthDate + "T00:00:00");
    if (Number.isNaN(dt.getTime())) return "Birthdate looks invalid.";

    return null;
  }

  function start() {
    const err = validateInfo();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep("quiz");
  }

  function goBack() {
    if (step !== "quiz") return;
    if (currentQuestionIndex === 0) {
      setStep("info");
      return;
    }
    setCurrentQuestionIndex((i) => Math.max(0, i - 1));
    setSelectedOption(null);
  }

  async function submit(finalAnswers: Record<string, number>) {
    setStep("loading");
    setError(null);

    try {
      const payload = {
        userName: name.trim(),
        gender: gender === "other" ? genderOther.trim() : gender,
        birthDate: resolvedBirthDate,
        city: city.trim(),
        ethnicity: ethnicity.trim(),
        answers: finalAnswers,
      };

      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Analyse failed");
      }

      const data = (await res.json()) as AnalysisResult;
      setResult(data);
      setStep("result");

      try {
        sessionStorage.setItem("ethos:lastResult", JSON.stringify(data));
      } catch {
        // ignore
      }
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
      setStep("quiz");
    }
  }

  function answer(optionIndex: number) {
    setSelectedOption(optionIndex);

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const next = { ...answers, [q.id]: optionIndex };
    setAnswers(next);

    window.setTimeout(() => {
      setSelectedOption(null);

      if (currentQuestionIndex < total - 1) {
        setCurrentQuestionIndex((i) => i + 1);
      } else {
        submit(next);
      }
    }, 200);
  }

  function resetAll() {
    setStep("info");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setError(null);
  }

  /* ============================
     RENDER
  ============================ */

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* Animated gradient mesh background */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ background: gradientMesh }}
      />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 -z-10 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} size={500} />
        <div className="absolute top-1/4 right-1/4">
          <FloatingOrb delay={5} size={400} />
        </div>
        <div className="absolute bottom-1/3 left-1/3">
          <FloatingOrb delay={10} size={450} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight hover:scale-105 transition-transform">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              ETHOS
            </span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="hidden sm:block text-sm font-semibold text-white/60">
              {step === "info" && "Identity Mapping"}
              {step === "quiz" && `Question ${currentQuestionIndex + 1}/${total}`}
              {step === "loading" && "Analyzing..."}
              {step === "result" && "Your Code"}
            </div>
          </motion.div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Error banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-6 rounded-3xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚠️</div>
                  <div>
                    <div className="text-sm font-bold text-red-300 mb-1">Error</div>
                    <div className="text-sm text-red-200/80">{error}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* INFO STEP */}
          <AnimatePresence mode="wait">
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TiltCard>
                  <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-10"
                    >
                      <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl mb-4">
                        <span className="text-xs font-bold text-white/80">STEP 1 OF 2</span>
                      </div>
                      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                        Let's map your vibe
                      </h1>
                      <p className="text-lg text-white/60">
                        We use this to triangulate patterns. No stereotypes.
                      </p>
                    </motion.div>

                    {/* Form Grid */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                      {/* Name */}
                      <label className="block">
                        <div className="text-xs font-black text-white/60 mb-2 tracking-wider uppercase">Name</div>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3.5 text-base text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                          placeholder="Your name"
                        />
                      </label>

                      {/* Gender */}
                      <label className="block">
                        <div className="text-xs font-black text-white/60 mb-2 tracking-wider uppercase">Gender</div>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value as any)}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3.5 text-base text-white outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                          }}
                        >
                          <option value="" className="bg-black">Select...</option>
                          <option value="male" className="bg-black">Male</option>
                          <option value="female" className="bg-black">Female</option>
                          <option value="other" className="bg-black">Other</option>
                        </select>
                      </label>

                      {gender === "other" && (
                        <motion.label
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="block sm:col-span-2"
                        >
                          <div className="text-xs font-black text-white/60 mb-2 tracking-wider uppercase">Specify</div>
                          <input
                            value={genderOther}
                            onChange={(e) => setGenderOther(e.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3.5 text-base text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                            placeholder="Your gender"
                          />
                        </motion.label>
                      )}

                      {/* City */}
                      <label className="block">
                        <div className="text-xs font-black text-white/60 mb-2 tracking-wider uppercase">City</div>
                        <input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3.5 text-base text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                          placeholder="Where you live"
                        />
                      </label>

                      {/* Birthdate */}
                      <label className="block">
                        <div className="text-xs font-black text-white/60 mb-2 tracking-wider uppercase">Birthdate</div>
                        <div className="grid grid-cols-3 gap-3">
                          {/* Year */}
                          <select
                            value={birthYear}
                            onChange={(e) => setBirthYear(+e.target.value)}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.5rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.25em 1.25em',
                            }}
                          >
                            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i).map((y) => (
                              <option key={y} value={y} className="bg-black">
                                {y}
                              </option>
                            ))}
                          </select>
                          
                          {/* Month */}
                          <select
                            value={birthMonth}
                            onChange={(e) => setBirthMonth(+e.target.value)}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.5rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.25em 1.25em',
                            }}
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                              <option key={m} value={m} className="bg-black">
                                {new Date(2000, m - 1).toLocaleString("default", { month: "short" })}
                              </option>
                            ))}
                          </select>
                          
                          {/* Day */}
                          <select
                            value={birthDay}
                            onChange={(e) => setBirthDay(+e.target.value)}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.5rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.25em 1.25em',
                            }}
                          >
                            {Array.from({ length: daysInMonth(birthYear, birthMonth) }, (_, i) => i + 1).map((d) => (
                              <option key={d} value={d} className="bg-black">
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      </label>

                      {/* Ethnicity */}
                      <label className="block sm:col-span-2">
                        <div className="text-xs font-black text-white/60 mb-2 tracking-wider uppercase">
                          Ethnicity / Background
                        </div>
                        <input
                          value={ethnicity}
                          onChange={(e) => setEthnicity(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3.5 text-base text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                          placeholder="Short answer"
                        />
                        <div className="mt-2 text-xs text-white/40">
                          We use this for heritage-lens display, not stereotyping.
                        </div>
                      </label>
                    </motion.div>

                    {/* Footer */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                      <div className="text-xs text-white/40 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-violet-500" />
                        <span>~2 minutes • 3 options per question • tap your instinct</span>
                      </div>
                      <button
                        onClick={start}
                        className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-sm shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all hover:scale-105 active:scale-95"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Begin Mapping
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </button>
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* QUIZ STEP */}
            {step === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TiltCard>
                  <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl">
                    {/* Progress header */}
                    <div className="flex items-center justify-between gap-6 mb-10">
                      <div className="flex items-center gap-3">
                        <div className="inline-block px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl">
                          <span className="text-xs font-bold text-white/80">
                            {currentQuestionIndex + 1} / {total}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-white/50">{progress}% Complete</span>
                      </div>

                      <button
                        onClick={goBack}
                        className="text-sm font-semibold text-white/60 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-10">
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden backdrop-blur-xl">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Question */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8 leading-tight">
                          {QUIZ_QUESTIONS[currentQuestionIndex]?.question}
                        </h2>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-4">
                          {QUIZ_QUESTIONS[currentQuestionIndex]?.options.map((opt, idx) => {
                            const active = selectedOption === idx;
                            return (
                              <motion.button
                                key={idx}
                                onClick={() => answer(idx)}
                                className={`
                                  group relative w-full rounded-3xl border p-6 text-left transition-all duration-200
                                  ${active 
                                    ? 'border-violet-500 bg-violet-500/10 scale-[0.98]' 
                                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                  }
                                `}
                                whileHover={{ scale: active ? 0.98 : 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600/0 via-purple-600/0 to-fuchsia-600/0 group-hover:from-violet-600/10 group-hover:via-purple-600/10 group-hover:to-fuchsia-600/10 transition-all duration-300" />
                                
                                <div className="relative flex items-start gap-4">
                                  {/* Emoji circle */}
                                  <div className={`
                                    flex-shrink-0 grid place-items-center w-14 h-14 rounded-2xl text-2xl transition-all duration-200
                                    ${active 
                                      ? 'bg-violet-500/20 scale-110' 
                                      : 'bg-white/5 group-hover:bg-white/10'
                                    }
                                  `}>
                                    {opt.emoji ?? "✨"}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                                      {opt.text}
                                    </div>
                                    <div className="text-xs text-white/40">
                                      Tap what resonates. No overthinking.
                                    </div>
                                  </div>

                                  {/* Check icon when selected */}
                                  {active && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500 grid place-items-center"
                                    >
                                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </motion.div>
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Footer hint */}
                    <div className="mt-8 text-center text-xs text-white/30 flex items-center justify-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                      <span>Your answers are saved automatically</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* LOADING STEP */}
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center min-h-[60vh]"
              >
                <div className="text-center">
                  {/* Animated spinner */}
                  <motion.div
                    className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-white/10 border-t-violet-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-black mb-4"
                  >
                    Triangulating your code
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-white/60 mb-8"
                  >
                    Analyzing patterns across multiple frameworks...
                  </motion.p>

                  {/* Loading steps */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex flex-col gap-2 text-sm text-white/40"
                  >
                    {["Processing responses", "Cross-referencing traits", "Mapping archetypes"].map((text, i) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-violet-500"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                        {text}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* RESULT STEP */}
            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {/* Hero result card */}
                <TiltCard>
                  <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-center"
                    >
                      <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl mb-6">
                        <span className="text-xs font-bold text-white/80">YOUR PRIMARY CODE</span>
                      </div>

                      <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-5xl sm:text-7xl font-black mb-4 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                      >
                        {result.primary.code_name}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl sm:text-2xl text-white/80 font-semibold mb-6"
                      >
                        {result.primary.full_name}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-base text-white/60 max-w-2xl mx-auto leading-relaxed"
                      >
                        {result.primary.description}
                      </motion.p>

                      {/* Match percentage */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl"
                      >
                        <div className="text-3xl font-black text-violet-400">
                          {result.primary.matchPercentage}%
                        </div>
                        <div className="text-sm text-white/60">match confidence</div>
                      </motion.div>
                    </motion.div>
                  </div>
                </TiltCard>

                {/* Secondary & Tertiary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                  {[
                    { label: "Secondary Code", data: result.secondary },
                    { label: "Tertiary Code", data: result.tertiary },
                  ].map((item, i) => (
                    <TiltCard key={item.label}>
                      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-8">
                        <div className="text-xs font-bold text-white/50 mb-4">{item.label}</div>
                        <h3 className="text-3xl font-black mb-2 text-white">{item.data.code_name}</h3>
                        <p className="text-sm text-white/60 font-semibold mb-4">{item.data.full_name}</p>
                        <p className="text-sm text-white/50 leading-relaxed">{item.data.description}</p>
                        
                        <div className="mt-6 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.data.matchPercentage}%` }}
                              transition={{ delay: 0.8 + i * 0.2, duration: 1, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            />
                          </div>
                          <span className="text-xs font-bold text-white/60">{item.data.matchPercentage}%</span>
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </motion.div>

                {/* Astrology & Key Traits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
                >
                  {/* Astrology */}
                  <TiltCard>
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-8">
                      <div className="text-xs font-bold text-white/50 mb-4">ASTROLOGY LAYER</div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">☀️</div>
                          <div>
                            <div className="text-xs text-white/40">Sun Sign</div>
                            <div className="text-sm font-bold text-white">{result.astrologyData?.sunSign}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">🔥</div>
                          <div>
                            <div className="text-xs text-white/40">Element</div>
                            <div className="text-sm font-bold text-white">{result.astrologyData?.element}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">⚡</div>
                          <div>
                            <div className="text-xs text-white/40">Modality</div>
                            <div className="text-sm font-bold text-white">{result.astrologyData?.modality}</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 text-xs text-white/30">Secondary influence only</div>
                    </div>
                  </TiltCard>

                  {/* Key Traits */}
                  <TiltCard className="lg:col-span-2">
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-8">
                      <div className="text-xs font-bold text-white/50 mb-6">KEY TRAITS</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(result.keyTraits || []).slice(0, 4).map((t, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + idx * 0.1 }}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-sm font-black text-white">{t.trait}</div>
                              <div className="text-xs font-bold text-violet-400">{t.score}/10</div>
                            </div>
                            <div className="text-xs text-white/50 leading-relaxed">{t.description}</div>
                            
                            <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(t.score / 10) * 100}%` }}
                                transition={{ delay: 1.2 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>

                {/* Explanation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <TiltCard>
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-8 mb-8">
                      <div className="text-xs font-bold text-white/50 mb-4">DETAILED ANALYSIS</div>
                      <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
                        {result.explanation}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  {[
                    { label: `View ${result.primary.code_name}`, slug: result.primary.code_name },
                    { label: `View ${result.secondary.code_name}`, slug: result.secondary.code_name },
                    { label: `View ${result.tertiary.code_name}`, slug: result.tertiary.code_name },
                  ].map((btn) => {
                    const slug = safeSlugFromCodeName(btn.slug);
                    const href = slug ? `/codepages/${slug}` : "/codes";
                    return (
                      <Link
                        key={btn.label}
                        href={href}
                        className="px-6 py-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl text-white font-semibold text-sm hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
                      >
                        {btn.label}
                      </Link>
                    );
                  })}

                  <button
                    onClick={resetAll}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-sm shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all hover:scale-105 active:scale-95"
                  >
                    Retake Assessment
                  </button>
                </motion.div>

                {/* Footer note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="mt-12 text-center"
                >
                  <p className="text-xs text-white/30">
                    Your results are saved in this session • Built for clarity, not labels
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
