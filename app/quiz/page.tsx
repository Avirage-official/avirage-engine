"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
  transition: { duration: 0.25, ease: "easeOut" },
};

export default function QuizPage() {
  const [step, setStep] = useState<"info" | "quiz" | "loading" | "result">("info");

  /* ----------------------------
     INFO
  ---------------------------- */
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [genderOther, setGenderOther] = useState("");
  const [city, setCity] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  /* ----------------------------
     BIRTHDATE
  ---------------------------- */
  const now = new Date();
  const maxYear = now.getFullYear();
  const minYear = 1940;

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

  /* ----------------------------
     QUIZ STATE (FIXED)
  ---------------------------- */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  // ✅ deterministic answer store
  const answersRef = useRef<Record<string, number>>({});

  /* ----------------------------
     RESULT
  ---------------------------- */
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = QUIZ_QUESTIONS.length;
  const progress = Math.round(((currentQuestionIndex + 1) / total) * 100);

  /* ============================
     FLOW
  ============================ */

  function start() {
    setError(null);
    setStep("quiz");
  }

  function goBack() {
    if (currentQuestionIndex === 0) {
      setStep("info");
      return;
    }
    setCurrentQuestionIndex((i) => i - 1);
    setSelected(null);
  }

  function answer(idx: number) {
    const q = QUIZ_QUESTIONS[currentQuestionIndex];

    answersRef.current[q.id] = idx;
    setSelected(idx);

    setTimeout(() => {
      setSelected(null);
      if (currentQuestionIndex < total - 1) {
        setCurrentQuestionIndex((i) => i + 1);
      } else {
        submit(answersRef.current);
      }
    }, 160);
  }

  async function submit(finalAnswers: Record<string, number>) {
    setStep("loading");
    setError(null);

    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          birthDate,
          quizAnswers: finalAnswers,
          gender: gender === "other" ? genderOther.trim() : gender,
          city: city.trim(),
          ethnicity: ethnicity.trim(),
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = (await res.json()) as AnalysisResult;
      setResult(data);
      setStep("result");
    } catch (e: any) {
      setError(e.message || "Something went wrong");
      setStep("quiz");
    }
  }

  function resetAll() {
    answersRef.current = {};
    setCurrentQuestionIndex(0);
    setSelected(null);
    setResult(null);
    setError(null);
    setStep("info");
  }

  /* ============================
     RENDER
  ============================ */

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold tracking-widest text-slate-500">ETHOS</div>
            <div className="text-2xl font-black text-slate-900">Cultural Code Mapping</div>
          </div>
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            Exit
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white shadow">
          <AnimatePresence mode="wait">
            {step === "info" && (
              <motion.section key="info" {...fade} className="p-8">
                <div className="text-3xl font-black text-slate-900">Let’s calibrate</div>
                <div className="mt-2 text-sm text-slate-600">
                  Fast. Intuitive. No overthinking.
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="h-12 rounded-xl border border-slate-200 px-4 text-sm"
                  />
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="h-12 rounded-xl border border-slate-200 px-4 text-sm"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={start}
                    className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white"
                  >
                    Begin
                  </button>
                </div>
              </motion.section>
            )}

            {step === "quiz" && (
              <motion.section key="quiz" {...fade} className="p-8">
                <div className="mb-4 text-sm text-slate-500">
                  Question {currentQuestionIndex + 1} / {total}
                </div>

                <div className="text-2xl font-black text-slate-900">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </div>

                <div className="mt-6 space-y-3">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => answer(idx)}
                      className="w-full rounded-xl border border-slate-200 px-5 py-4 text-left hover:bg-slate-50"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex justify-between">
                  <button onClick={goBack} className="text-sm text-slate-500">
                    Back
                  </button>
                </div>
              </motion.section>
            )}

            {step === "loading" && (
              <motion.section key="loading" {...fade} className="p-10 text-center">
                <div className="text-sm font-semibold text-slate-500">Analysing…</div>
              </motion.section>
            )}

            {step === "result" && result && (
              <motion.section key="result" {...fade} className="p-10">
                <div className="text-3xl font-black text-slate-900">
                  {CODE_DISPLAY_MAP[result.primary.code_name]?.label ??
                    result.primary.code_name}
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  {result.primary.description}
                </div>

                <div className="mt-6">
                  <button
                    onClick={resetAll}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold"
                  >
                    Retake
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
