"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";

/* ============================
   TYPES (matches your API response)
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
   HELPERS (simple + safe)
============================ */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate(); // month: 1-12
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
   COMPONENT
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

  const stepTitle = useMemo(() => {
    if (step === "info") return "Let's map your vibe";
    if (step === "quiz") return "Quick calibration";
    if (step === "loading") return "Triangulating your code";
    return "Your result";
  }, [step]);

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
    }, 160);
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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-900 hover:text-slate-700 transition">
            ETHOS
          </Link>
          <div className="text-xs text-slate-500">{stepTitle}</div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4">
            <div className="text-sm font-semibold text-red-900">{error}</div>
          </div>
        )}

        {/* Card container */}
        <div className="rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* INFO */}
          {step === "info" && (
            <div className="p-6 sm:p-8">
              <div className="text-2xl font-black tracking-tight text-slate-900">
                Tell us a bit about yourself
              </div>
              <div className="mt-2 text-sm text-slate-600">
                We use this to triangulate patterns. No stereotypes.
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name */}
                <label className="block">
                  <div className="text-xs font-extrabold text-slate-600">Name</div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                    placeholder="Your name"
                  />
                </label>

                {/* Gender */}
                <label className="block">
                  <div className="text-xs font-extrabold text-slate-600">Gender</div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                {gender === "other" && (
                  <label className="block sm:col-span-2">
                    <div className="text-xs font-extrabold text-slate-600">Specify</div>
                    <input
                      value={genderOther}
                      onChange={(e) => setGenderOther(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                      placeholder="Your gender"
                    />
                  </label>
                )}

                {/* City */}
                <label className="block">
                  <div className="text-xs font-extrabold text-slate-600">City</div>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                    placeholder="Where you live"
                  />
                </label>

                {/* Birthdate */}
                <label className="block">
                  <div className="text-xs font-extrabold text-slate-600">Birthdate</div>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(+e.target.value)}
                      className="rounded-2xl border border-slate-900/10 bg-white/80 px-3 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                    >
                      {Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i).map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(+e.target.value)}
                      className="rounded-2xl border border-slate-900/10 bg-white/80 px-3 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          {new Date(2000, m - 1).toLocaleString("default", { month: "short" })}
                        </option>
                      ))}
                    </select>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(+e.target.value)}
                      className="rounded-2xl border border-slate-900/10 bg-white/80 px-3 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                    >
                      {Array.from({ length: daysInMonth(birthYear, birthMonth) }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                {/* Ethnicity */}
                <label className="block sm:col-span-2">
                  <div className="text-xs font-extrabold text-slate-600">Ethnicity / Background</div>
                  <input
                    value={ethnicity}
                    onChange={(e) => setEthnicity(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                    placeholder="Short answer"
                  />
                  <div className="mt-1 text-[11px] text-slate-500">
                    We use this for heritage-lens display, not stereotyping.
                  </div>
                </label>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-slate-500">~2 minutes • 3 options per question • tap your instinct.</div>
                <button
                  onClick={start}
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold text-white bg-sky-500 hover:bg-sky-600 transition shadow-[0_14px_34px_rgba(14,165,233,0.25)]"
                >
                  Start
                </button>
              </div>
            </div>
          )}

          {/* QUIZ */}
          {step === "quiz" && (
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-semibold text-slate-600">
                  Question {currentQuestionIndex + 1} / {total}
                </div>

                <div className="w-44 sm:w-64">
                  <div className="h-2 rounded-full bg-slate-900/10">
                    <div className="h-2 rounded-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                {QUIZ_QUESTIONS[currentQuestionIndex]?.question}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                {QUIZ_QUESTIONS[currentQuestionIndex]?.options.map((opt, idx) => {
                  const active = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => answer(idx)}
                      className={[
                        "w-full rounded-3xl border px-5 py-4 text-left transition",
                        "bg-white/80 border-slate-900/10 hover:bg-white",
                        active ? "ring-4 ring-sky-200 scale-[0.998]" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-slate-900/5 text-lg">
                          {opt.emoji ?? "✨"}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{opt.text}</div>
                          <div className="mt-1 text-xs text-slate-500">Tap what's closest. No overthinking.</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={goBack}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-900/5 transition"
                >
                  ← Back
                </button>
                <div className="text-xs text-slate-500">Saved as you go.</div>
              </div>
            </div>
          )}

          {/* LOADING */}
          {step === "loading" && (
            <div className="p-8 sm:p-10">
              <div className="text-sm font-extrabold text-slate-900">Working…</div>
              <div className="mt-2 text-sm text-slate-600">Triangulating patterns across frameworks.</div>

              <div className="mt-6 h-2 rounded-full bg-slate-900/10 overflow-hidden">
                <div className="h-2 w-2/3 rounded-full bg-sky-500 animate-pulse" />
              </div>

              <div className="mt-4 text-xs text-slate-500">
                If this hangs, it's usually the API route or missing env vars.
              </div>
            </div>
          )}

          {/* RESULT */}
          {step === "result" && result && (
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-xs font-extrabold text-slate-600">Your primary code</div>
                  <div className="mt-2 text-3xl font-black tracking-tight text-slate-900">{result.primary.code_name}</div>
                  <div className="mt-1 text-sm text-slate-600">{result.primary.full_name}</div>
                  <div className="mt-3 text-sm text-slate-700 max-w-2xl">{result.primary.description}</div>
                </div>

                <div className="rounded-3xl border border-slate-900/10 bg-white/80 px-5 py-4">
                  <div className="text-xs font-bold text-slate-600">Astrology layer</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">
                    {result.astrologyData?.sunSign} • {result.astrologyData?.element} • {result.astrologyData?.modality}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">Secondary influence only.</div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Secondary */}
                <div className="rounded-3xl border border-slate-900/10 bg-white/80 p-5">
                  <div className="text-xs font-extrabold text-slate-600">Secondary</div>
                  <div className="mt-2 text-lg font-black text-slate-900">{result.secondary.code_name}</div>
                  <div className="mt-1 text-xs text-slate-600">{result.secondary.full_name}</div>
                  <div className="mt-3 text-sm text-slate-700">{result.secondary.description}</div>
                </div>

                {/* Tertiary */}
                <div className="rounded-3xl border border-slate-900/10 bg-white/80 p-5">
                  <div className="text-xs font-extrabold text-slate-600">Tertiary</div>
                  <div className="mt-2 text-lg font-black text-slate-900">{result.tertiary.code_name}</div>
                  <div className="mt-1 text-xs text-slate-600">{result.tertiary.full_name}</div>
                  <div className="mt-3 text-sm text-slate-700">{result.tertiary.description}</div>
                </div>

                {/* Key traits */}
                <div className="rounded-3xl border border-slate-900/10 bg-white/80 p-5">
                  <div className="text-xs font-extrabold text-slate-600">Key traits</div>
                  <div className="mt-3 space-y-2">
                    {(result.keyTraits || []).slice(0, 4).map((t, idx) => (
                      <div key={idx} className="rounded-2xl bg-slate-900/5 px-3 py-2">
                        <div className="text-xs font-extrabold text-slate-900">
                          {t.trait} <span className="text-slate-500">({t.score})</span>
                        </div>
                        <div className="text-xs text-slate-600">{t.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-900/10 bg-white/80 p-6">
                <div className="text-xs font-extrabold text-slate-600">Explanation</div>
                <div className="mt-2 text-sm text-slate-700 whitespace-pre-line">{result.explanation}</div>
              </div>

              {/* Links */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Primary page", code: result.primary.code_name },
                    { label: "Secondary page", code: result.secondary.code_name },
                    { label: "Tertiary page", code: result.tertiary.code_name },
                  ].map((x) => {
                    const slug = safeSlugFromCodeName(x.code);
                    const href = slug ? `/codepages/${slug}` : "/codes";
                    return (
                      <Link
                        key={x.label}
                        href={href}
                        className="rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-white transition"
                      >
                        {x.label}
                      </Link>
                    );
                  })}
                </div>

                <button
                  onClick={resetAll}
                  className="rounded-2xl px-5 py-3 text-sm font-extrabold text-slate-900 bg-slate-900/5 hover:bg-slate-900/10 transition"
                >
                  Retake
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer micro */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Built for clarity • not labels • you can retake anytime
        </div>
      </div>
    </main>
  );
}
