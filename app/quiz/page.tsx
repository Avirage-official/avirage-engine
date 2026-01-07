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
  // We intentionally avoid codePages.ts type guards here.
  // This keeps quiz page stable and avoids TS “never” issues.
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

  // Birthdate (fast)
  const now = new Date();
  const currentYear = now.getFullYear();
  const minYear = 1940;
  const maxYear = currentYear;

  const [birthYear, setBirthYear] = useState<number>(1998);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);
  const [birthDateISO, setBirthDateISO] = useState<string>(""); // optional typed input YYYY-MM-DD

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
    if (step === "info") return "Let’s map your vibe";
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
    // keep it snappy + deterministic
    setSelectedOption(optionIndex);

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const next = { ...answers, [q.id]: optionIndex }; // ✅ 0/1/2 (important)
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
    setSelectedOption(null);
    setResult(null);
    setError(null);
  }

  /* ============================
     UI
  ============================ */

  return (
    <main className="min-h-screen">
      {/* Bright coastal background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(14,165,233,0.30),transparent_60%),radial-gradient(1000px_600px_at_85%_18%,rgba(251,113,133,0.22),transparent_55%),radial-gradient(1100px_700px_at_50%_92%,rgba(253,230,138,0.36),transparent_58%),linear-gradient(180deg,#ffffff_0%,#e0f2fe_26%,#fff7ed_68%,#ffffff_100%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Top Bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-900/10 bg-white/70 shadow-sm backdrop-blur">
              <span className="text-lg">🌊</span>
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-slate-900">Ethos</div>
              <div className="text-xs text-slate-600">Cultural code mapping</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-900/5"
            >
              Home
            </Link>
            <Link
              href="/codes"
              className="rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-900/5"
            >
              Codes
            </Link>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{stepTitle}</div>
          <div className="mt-1 text-sm text-slate-600">
            Fast, casual, high-signal. No therapy talk — just how you move.
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-500/20 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Shared card wrapper */}
        <div className="rounded-3xl border border-slate-900/10 bg-white/70 shadow-[0_20px_80px_rgba(2,6,23,0.10)] backdrop-blur-xl">
          {/* INFO */}
          {step === "info" && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Basics */}
                <div>
                  <div className="text-sm font-extrabold text-slate-900">Basics</div>
                  <div className="mt-3 space-y-3">
                    <label className="block">
                      <div className="text-xs font-semibold text-slate-700">Name</div>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                        placeholder="Your name"
                      />
                    </label>

                    <label className="block">
                      <div className="text-xs font-semibold text-slate-700">Gender</div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {[
                          { v: "male", t: "Male" },
                          { v: "female", t: "Female" },
                          { v: "other", t: "Other" },
                        ].map((x) => (
                          <button
                            key={x.v}
                            onClick={() => setGender(x.v as any)}
                            className={[
                              "rounded-2xl px-4 py-2 text-sm font-semibold border transition",
                              gender === x.v
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white/80 text-slate-800 border-slate-900/10 hover:bg-white",
                            ].join(" ")}
                          >
                            {x.t}
                          </button>
                        ))}
                      </div>
                      {gender === "other" && (
                        <input
                          value={genderOther}
                          onChange={(e) => setGenderOther(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                          placeholder="Type it here"
                        />
                      )}
                    </label>
                  </div>
                </div>

                {/* Context */}
                <div>
                  <div className="text-sm font-extrabold text-slate-900">Context</div>
                  <div className="mt-3 space-y-3">
                    <label className="block">
                      <div className="text-xs font-semibold text-slate-700">Birthdate (fast)</div>

                      {/* Year/Month/Day selectors */}
                      <div className="mt-1 grid grid-cols-3 gap-2">
                        <input
                          type="number"
                          min={minYear}
                          max={maxYear}
                          value={birthYear}
                          onChange={(e) =>
                            setBirthYear(clamp(Number(e.target.value || 0), minYear, maxYear))
                          }
                          className="w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                          placeholder="Year"
                        />
                        <select
                          value={birthMonth}
                          onChange={(e) => setBirthMonth(Number(e.target.value))}
                          className="w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                        >
                          {Array.from({ length: 12 }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <select
                          value={birthDay}
                          onChange={(e) => setBirthDay(Number(e.target.value))}
                          className="w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                        >
                          {Array.from({ length: daysInMonth(birthYear, birthMonth) }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Optional direct input */}
                      <div className="mt-2">
                        <div className="text-[11px] font-semibold text-slate-600">
                          Optional: type directly (YYYY-MM-DD)
                        </div>
                        <input
                          value={birthDateISO}
                          onChange={(e) => setBirthDateISO(e.target.value)}
                          className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                          placeholder={buildISODate(birthYear, birthMonth, birthDay)}
                        />
                        <div className="mt-1 text-[11px] text-slate-500">
                          Using: <span className="font-semibold">{resolvedBirthDate}</span>
                        </div>
                      </div>
                    </label>

                    <label className="block">
                      <div className="text-xs font-semibold text-slate-700">City</div>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-sky-200"
                        placeholder="Where you live"
                      />
                    </label>

                    <label className="block">
                      <div className="text-xs font-semibold text-slate-700">Ethnicity / background</div>
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
                </div>
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
                          <div className="mt-1 text-xs text-slate-500">Tap what’s closest. No overthinking.</div>
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
                If this hangs, it’s usually the API route or missing env vars.
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
