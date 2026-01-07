"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";
import { CODE_DISPLAY_MAP } from "@/lib/codeDisplayMap";

/* ============================
   TYPES (matches API)
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

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const pad2 = (n: number) => String(n).padStart(2, "0");
const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
const buildISODate = (y: number, m: number, d: number) => `${y}-${pad2(m)}-${pad2(d)}`;

/* ============================
   MOTION
============================ */

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: "easeOut" },
};

/* ============================
   COMPONENT
============================ */

export default function QuizPage() {
  const [step, setStep] = useState<"info" | "quiz" | "loading" | "result">("info");

  // Info
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [genderOther, setGenderOther] = useState("");
  const [city, setCity] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  // Birth
  const now = new Date();
  const currentYear = now.getFullYear();
  const [birthYear, setBirthYear] = useState(1998);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);

  useEffect(() => {
    setBirthDay((d) => clamp(d, 1, daysInMonth(birthYear, birthMonth)));
  }, [birthYear, birthMonth]);

  const birthDate = useMemo(
    () => buildISODate(birthYear, birthMonth, birthDay),
    [birthYear, birthMonth, birthDay]
  );

  // Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);

  // Result
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = QUIZ_QUESTIONS.length;
  const progress = Math.round(((currentQuestionIndex + 1) / total) * 100);

  /* ============================
     ACTIONS
  ============================ */

  function start() {
    if (!name || !gender || !city || !ethnicity) {
      setError("Please complete all fields.");
      return;
    }
    setError(null);
    setStep("quiz");
  }

  function answer(idx: number) {
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const next = { ...answers, [q.id]: idx };

    setSelected(idx);
    setAnswers(next);

    setTimeout(() => {
      setSelected(null);
      if (currentQuestionIndex < total - 1) {
        setCurrentQuestionIndex((i) => i + 1);
      } else {
        submit(next);
      }
    }, 220);
  }

  async function submit(payloadAnswers: Record<string, number>) {
    setStep("loading");
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: name,
          gender: gender === "other" ? genderOther : gender,
          birthDate,
          city,
          ethnicity,
          answers: payloadAnswers,
        }),
      });

      if (!res.ok) throw new Error("Analyse failed");

      const data = (await res.json()) as AnalysisResult;
      setResult(data);
      setStep("result");
    } catch {
      setError("Something went wrong.");
      setStep("quiz");
    }
  }

  /* ============================
     DISPLAY MAP (SAFE FALLBACK)
  ============================ */

  const primaryDisplay =
    result && CODE_DISPLAY_MAP[result.primary.code_name]
      ? CODE_DISPLAY_MAP[result.primary.code_name]
      : null;

  const secondaryDisplay =
    result && CODE_DISPLAY_MAP[result.secondary.code_name]
      ? CODE_DISPLAY_MAP[result.secondary.code_name]
      : null;

  const tertiaryDisplay =
    result && CODE_DISPLAY_MAP[result.tertiary.code_name]
      ? CODE_DISPLAY_MAP[result.tertiary.code_name]
      : null;

  /* ============================
     UI
  ============================ */

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(900px_600px_at_80%_20%,rgba(244,114,182,0.25),transparent_55%),linear-gradient(180deg,#ffffff,#f8fafc)]" />

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="text-xs tracking-widest text-slate-500">ETHOS</div>
            <div className="text-lg font-black text-slate-900">Cultural Code Mapping</div>
          </div>
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            Exit
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {/* INFO */}
          {step === "info" && (
            <motion.section key="info" {...fadeUp} className="rounded-3xl bg-white/85 p-8">
              <div className="text-2xl font-black mb-2">Let’s calibrate</div>
              <p className="text-sm text-slate-600 mb-8">
                Not a personality test. Just instinct.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <input className="rounded-2xl border px-4 py-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="rounded-2xl border px-4 py-3" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <input className="rounded-2xl border px-4 py-3" placeholder="Ethnicity / background" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} />

                <select className="rounded-2xl border px-4 py-3" value={gender} onChange={(e) => setGender(e.target.value as any)}>
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {gender === "other" && (
                <input className="mt-3 rounded-2xl border px-4 py-3 w-full" placeholder="Specify gender" value={genderOther} onChange={(e) => setGenderOther(e.target.value)} />
              )}

              <div className="mt-6 grid grid-cols-3 gap-2">
                <input type="number" className="rounded-2xl border px-3 py-2" value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} />
                <input type="number" className="rounded-2xl border px-3 py-2" value={birthMonth} onChange={(e) => setBirthMonth(Number(e.target.value))} />
                <input type="number" className="rounded-2xl border px-3 py-2" value={birthDay} onChange={(e) => setBirthDay(Number(e.target.value))} />
              </div>

              {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}

              <button onClick={start} className="mt-8 w-full rounded-2xl bg-sky-500 py-3 font-bold text-white hover:bg-sky-600">
                Begin
              </button>
            </motion.section>
          )}

          {/* QUIZ */}
          {step === "quiz" && (
            <motion.section key="quiz" {...fadeUp} className="rounded-3xl bg-white/90 p-8">
              <div className="flex justify-between mb-6 text-xs font-semibold text-slate-500">
                <span>Question {currentQuestionIndex + 1} / {total}</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-200 mb-8">
                <div className="h-2 rounded-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
              </div>

              <div className="text-2xl font-black mb-6">
                {QUIZ_QUESTIONS[currentQuestionIndex].question}
              </div>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    className={`w-full rounded-3xl border px-6 py-4 text-left transition ${
                      selected === i ? "border-sky-400 bg-sky-50" : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-semibold">{opt.text}</div>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {/* LOADING */}
          {step === "loading" && (
            <motion.section key="loading" {...fadeUp} className="rounded-3xl bg-white/85 p-12 text-center">
              <div className="text-lg font-black mb-2">Mapping patterns…</div>
              <div className="text-sm text-slate-600">Aligning layers</div>
              <div className="mt-6 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div className="h-2 w-1/2 bg-sky-500 animate-pulse" />
              </div>
            </motion.section>
          )}

          {/* RESULT */}
          {step === "result" && result && (
            <motion.section key="result" {...fadeUp} className="rounded-3xl bg-white/95 p-10">
              <div className="text-xs text-slate-500 mb-2">Your primary archetype</div>
              <div className="text-3xl font-black mb-1">
                {primaryDisplay?.label ?? result.primary.code_name}
              </div>
              <div className="text-sm font-semibold text-slate-500 mb-4">
                {primaryDisplay?.essence}
              </div>
              <p className="text-slate-700 mb-6">
                {primaryDisplay?.description ?? result.primary.description}
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mt-6">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs font-bold text-slate-500">Secondary</div>
                  <div className="font-semibold">{secondaryDisplay?.label}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs font-bold text-slate-500">Tertiary</div>
                  <div className="font-semibold">{tertiaryDisplay?.label}</div>
                </div>
              </div>

              <button onClick={() => location.reload()} className="mt-8 rounded-2xl border px-5 py-3 font-semibold">
                Retake
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
