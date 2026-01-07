"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";
import { CODE_DISPLAY_MAP } from "@/lib/codeDisplayMap";

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

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const pad2 = (n: number) => String(n).padStart(2, "0");
const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
const buildISODate = (y: number, m: number, d: number) => `${y}-${pad2(m)}-${pad2(d)}`;

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.26, ease: "easeOut" },
};

function ChevronDown() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-xs font-semibold tracking-wide text-slate-700">{children}</div>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return <div className="mt-1 text-[11px] text-slate-500">{children}</div>;
}

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
  const minYear = 1940;
  const maxYear = currentYear;

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

  const stepTitle = useMemo(() => {
    if (step === "info") return "Calibrate your archetype";
    if (step === "quiz") return "Answer by instinct";
    if (step === "loading") return "Mapping your pattern";
    return "Your archetype";
  }, [step]);

  function validateInfo(): string | null {
    if (!name.trim()) return "Enter your name.";
    if (!gender) return "Select a gender.";
    if (gender === "other" && !genderOther.trim()) return "Please specify.";
    if (!city.trim()) return "Enter your city.";
    if (!ethnicity.trim()) return "Enter your background.";
    const dt = new Date(birthDate + "T00:00:00");
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
    setSelected(null);
  }

  function answer(idx: number) {
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const next = { ...answers, [q.id]: idx }; // keep 0/1/2
    setSelected(idx);
    setAnswers(next);

    window.setTimeout(() => {
      setSelected(null);
      if (currentQuestionIndex < total - 1) setCurrentQuestionIndex((i) => i + 1);
      else submit(next);
    }, 180);
  }

  async function submit(payloadAnswers: Record<string, number>) {
    setStep("loading");
    setError(null);

    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  name: name.trim(),
  birthDate,
  quizAnswers: payloadAnswers,

  // optional extras (won’t break anything)
  gender: gender === "other" ? genderOther.trim() : gender,
  city: city.trim(),
  ethnicity: ethnicity.trim(),
}),

      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Analyse failed");
      }

      const data = (await res.json()) as AnalysisResult;
      setResult(data);
      setStep("result");
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
      setStep("quiz");
    }
  }

  function resetAll() {
    setStep("info");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelected(null);
    setResult(null);
    setError(null);
  }

  // type-safe indexing for display map
  type CodeKey = keyof typeof CODE_DISPLAY_MAP;
  const primaryKey = result?.primary.code_name as CodeKey | undefined;
  const secondaryKey = result?.secondary.code_name as CodeKey | undefined;
  const tertiaryKey = result?.tertiary.code_name as CodeKey | undefined;

  const primaryDisplay = primaryKey ? CODE_DISPLAY_MAP[primaryKey] : null;
  const secondaryDisplay = secondaryKey ? CODE_DISPLAY_MAP[secondaryKey] : null;
  const tertiaryDisplay = tertiaryKey ? CODE_DISPLAY_MAP[tertiaryKey] : null;

  return (
    <main className="min-h-screen bg-white">
      {/* modern minimal background (no glass) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-100 via-fuchsia-100 to-amber-100 blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.22),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.20),transparent_42%),radial-gradient(circle_at_55%_90%,rgba(253,230,138,0.22),transparent_48%)]" />
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12">
        {/* header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">ETHOS</div>
            <div className="text-2xl font-black tracking-tight text-slate-900">Cultural Code Mapping</div>
            <div className="mt-1 text-sm text-slate-600">{stepTitle}</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Exit
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* body shell */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(2,6,23,0.08)]">
          <AnimatePresence mode="wait">
            {/* INFO */}
            {step === "info" && (
              <motion.section key="info" {...fade} className="p-6 sm:p-10">
                <div className="max-w-2xl">
                  <div className="text-3xl font-black tracking-tight text-slate-900">Let’s calibrate</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Not a personality test. Just signal.
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Name</FieldLabel>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <FieldLabel>City</FieldLabel>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Where you live"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <FieldLabel>Background</FieldLabel>
                    <input
                      value={ethnicity}
                      onChange={(e) => setEthnicity(e.target.value)}
                      placeholder="Short answer"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
                    />
                    <Hint>Used for heritage-lens display, not stereotyping.</Hint>
                  </div>

                  <div>
                    <FieldLabel>Gender</FieldLabel>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-900 outline-none focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <ChevronDown />
                      </div>
                    </div>

                    {gender === "other" && (
                      <input
                        value={genderOther}
                        onChange={(e) => setGenderOther(e.target.value)}
                        placeholder="Type here"
                        className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
                      />
                    )}
                  </div>
                </div>

                {/* DOB */}
                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-slate-700">Birthdate</div>
                      <div className="text-[11px] text-slate-500">Fast pick. Used for the astrology layer only.</div>
                    </div>
                    <div className="mt-3 text-[11px] font-semibold text-slate-600 sm:mt-0">
                      Using: <span className="text-slate-900">{birthDate}</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="relative">
                      <select
                        value={birthYear}
                        onChange={(e) => setBirthYear(clamp(Number(e.target.value), minYear, maxYear))}
                        className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-900 outline-none focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
                      >
                        {Array.from({ length: maxYear - minYear + 1 }).map((_, i) => {
                          const y = maxYear - i;
                          return (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          );
                        })}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <ChevronDown />
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(clamp(Number(e.target.value), 1, 12))}
                        className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-900 outline-none focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
                      >
                        {Array.from({ length: 12 }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <ChevronDown />
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        value={birthDay}
                        onChange={(e) => setBirthDay(clamp(Number(e.target.value), 1, daysInMonth(birthYear, birthMonth)))}
                        className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-900 outline-none focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
                      >
                        {Array.from({ length: daysInMonth(birthYear, birthMonth) }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-500">~2 minutes • 3 choices each • go with instinct.</div>
                  <button
                    onClick={start}
                    className="h-12 rounded-2xl bg-slate-900 px-6 text-sm font-extrabold text-white shadow-sm hover:bg-slate-800"
                  >
                    Begin
                  </button>
                </div>
              </motion.section>
            )}

            {/* QUIZ */}
            {step === "quiz" && (
              <motion.section key="quiz" {...fade} className="p-6 sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-semibold text-slate-600">
                    Question <span className="text-slate-900">{currentQuestionIndex + 1}</span> / {total}
                  </div>

                  <div className="w-44 sm:w-72">
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-slate-900 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  {QUIZ_QUESTIONS[currentQuestionIndex]?.question}
                </div>
                <div className="mt-2 text-sm text-slate-600">Pick the closest. Don’t optimize.</div>

                <div className="mt-7 grid grid-cols-1 gap-3">
                  {QUIZ_QUESTIONS[currentQuestionIndex]?.options.map((opt, idx) => {
                    const active = selected === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => answer(idx)}
                        className={[
                          "group w-full rounded-3xl border px-5 py-5 text-left transition",
                          "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                          active ? "border-slate-900 bg-slate-50" : "",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-4">
                          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-lg text-slate-900">
                            {opt.emoji ?? "✦"}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900">{opt.text}</div>
                            <div className="mt-1 text-[11px] text-slate-500">Tap once. Move forward.</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={goBack}
                    className="h-11 rounded-2xl px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    ← Back
                  </button>
                  <div className="text-xs text-slate-500">Saved as you go.</div>
                </div>
              </motion.section>
            )}

            {/* LOADING */}
            {step === "loading" && (
              <motion.section key="loading" {...fade} className="p-10 sm:p-12">
                <div className="text-sm font-semibold tracking-wide text-slate-600">WORKING</div>
                <div className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                  Mapping your pattern
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  Triangulating signals across your answers + astrology layer.
                </div>

                <div className="mt-7 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-2 w-2/3 rounded-full bg-slate-900 animate-pulse" />
                </div>

                <div className="mt-3 text-xs text-slate-500">
                  If this hangs, it’s usually the API route or env vars.
                </div>
              </motion.section>
            )}

            {/* RESULT */}
            {step === "result" && result && (
              <motion.section key="result" {...fade} className="p-6 sm:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-wide text-slate-600">PRIMARY ARCHETYPE</div>
                    <div className="mt-2 text-4xl font-black tracking-tight text-slate-900">
                      {primaryDisplay?.label ?? result.primary.code_name}
                    </div>
                    {primaryDisplay?.essence && (
                      <div className="mt-2 text-sm font-semibold text-slate-600">
                        {primaryDisplay.essence}
                      </div>
                    )}
                    <div className="mt-4 text-sm text-slate-700 max-w-2xl">
                      {primaryDisplay?.description ?? result.primary.description}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-xs font-semibold tracking-wide text-slate-600">ASTROLOGY LAYER</div>
                    <div className="mt-2 text-sm font-extrabold text-slate-900">
                      {result.astrologyData?.sunSign} • {result.astrologyData?.element} •{" "}
                      {result.astrologyData?.modality}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500">Secondary influence only.</div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-xs font-semibold text-slate-600">SECONDARY</div>
                    <div className="mt-2 text-lg font-black text-slate-900">
                      {secondaryDisplay?.label ?? result.secondary.code_name}
                    </div>
                    {secondaryDisplay?.essence && (
                      <div className="mt-1 text-xs font-semibold text-slate-600">
                        {secondaryDisplay.essence}
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-xs font-semibold text-slate-600">TERTIARY</div>
                    <div className="mt-2 text-lg font-black text-slate-900">
                      {tertiaryDisplay?.label ?? result.tertiary.code_name}
                    </div>
                    {tertiaryDisplay?.essence && (
                      <div className="mt-1 text-xs font-semibold text-slate-600">
                        {tertiaryDisplay.essence}
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-xs font-semibold text-slate-600">KEY TRAITS</div>
                    <div className="mt-3 space-y-2">
                      {(result.keyTraits || []).slice(0, 4).map((t, idx) => (
                        <div key={idx} className="rounded-xl bg-slate-50 px-3 py-2">
                          <div className="text-xs font-extrabold text-slate-900">
                            {t.trait} <span className="text-slate-500">({t.score})</span>
                          </div>
                          <div className="text-[11px] text-slate-600">{t.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="text-xs font-semibold tracking-wide text-slate-600">EXPLANATION</div>
                  <div className="mt-3 text-sm text-slate-700 whitespace-pre-line">
                    {result.explanation}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={resetAll}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
                  >
                    Retake
                  </button>

                  <Link
                    href="/"
                    className="h-12 rounded-2xl bg-slate-900 px-6 text-sm font-extrabold text-white grid place-items-center hover:bg-slate-800"
                  >
                    Back to home
                  </Link>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Built for clarity — not labels.
        </div>
      </div>
    </main>
  );
}
