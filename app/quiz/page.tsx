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

  // 🔑 SINGLE SOURCE OF TRUTH
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

    // ✅ ALWAYS write synchronously
    answersRef.current[q.id] = idx;
    setSelected(idx);

    setTimeout(() => {
      setSelected(null);

      if (currentQuestionIndex < total - 1) {
        setCurrentQuestionIndex((i) => i + 1);
      } else {
        submit(answersRef.current);
      }
    }, 150);
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

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Analyse failed");
      }

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
      {/* UI unchanged – omitted here for brevity */}
      {/* Your existing JSX below this point stays exactly the same */}
      {/* No visual changes required */}
    </main>
  );
}
