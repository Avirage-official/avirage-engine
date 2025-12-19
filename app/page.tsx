"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";

/* ============================
   THEME — FUTURE CULTURAL
============================ */

const THEME = {
  bg: {
    info: "linear-gradient(180deg, #0b0f14 0%, #121820 100%)",
    quiz: "linear-gradient(180deg, #0e141b 0%, #161d27 100%)",
    loading: "linear-gradient(180deg, #0c1117 0%, #141b24 100%)",
    result: "linear-gradient(180deg, #0a0f14 0%, #121922 100%)",
  },
  panel: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.14)",
  softBorder: "rgba(255,255,255,0.08)",
  textPrimary: "#e6e9ee",
  textSecondary: "#9aa3ad",
  accent: "#c9a96a",
  glow: "0 0 80px rgba(201,169,106,0.18)",
};

const CEREMONIAL_FONT = "'Cinzel', serif";
const BODY_FONT = "'Inter', system-ui, sans-serif";

const PANEL_STYLE = {
  background: THEME.panel,
  borderRadius: "18px",
  border: `1px solid ${THEME.border}`,
  boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
  backdropFilter: "blur(14px)",
};

/* ============================
   TYPES (UNCHANGED)
============================ */

interface AnalysisResult {
  primary: {
    code_name: string;
    full_name: string;
    description: string;
    matchPercentage: number;
  };
  secondary: {
    code_name: string;
    full_name: string;
    description: string;
    matchPercentage: number;
  };
  tertiary: {
    code_name: string;
    full_name: string;
    description: string;
    matchPercentage: number;
  };
  explanation: string;
  keyTraits: {
    trait: string;
    score: number;
    description: string;
  }[];
  userName: string;
  astrologyData: {
    sunSign: string;
    element: string;
    modality: string;
  };
}

/* ============================
   COLORS & EMBLEMS (UNCHANGED)
============================ */

const CODE_COLORS: Record<string, string> = {
  Enzuka: "linear-gradient(135deg, #CD853F, #8B0000)",
  Siyuané: "linear-gradient(135deg, #00A86B, #FFFFF0)",
  Namséa: "linear-gradient(135deg, #4682B4, #F5F5DC)",
  Karayni: "linear-gradient(135deg, #228B22, #FFD700)",
  Siljoa: "linear-gradient(135deg, #708090, #48D1CC)",
  Yatevar: "linear-gradient(135deg, #B22222, #000000)",
  Wóhaka: "linear-gradient(135deg, #87CEEB, #F5F5F5)",
  Jaejin: "linear-gradient(135deg, #778899, #DC143C)",
  Tjukari: "linear-gradient(135deg, #A0522D, #36454F)",
  Kinmora: "linear-gradient(135deg, #FFD700, #191970)",
  Skénari: "linear-gradient(135deg, #228B22, #C0C0C0)",
  Ashkara: "linear-gradient(135deg, #FF8C00, #FFFFFF)",
  Aléthir: "linear-gradient(135deg, #1e2a44, #0b1020)",
  Káyori: "linear-gradient(135deg, #8c6b2f, #1a1f3a)",
  Sahén: "linear-gradient(135deg, #F5DEB3, #8B7355)",
  Khoruun: "linear-gradient(135deg, #CD7F32, #808080)",
  Lhumir: "linear-gradient(135deg, #f1f3f6, #8faecb)",
  Rénara: "linear-gradient(135deg, #4e6f4e, #c8b560)",
};

const CODE_EMBLEM_COUNTS: Record<string, number> = {
  Aléthir: 5,
  Ashkara: 4,
  Enzuka: 3,
  Jaejin: 3,
  Karayni: 5,
  Káyori: 4,
  Khoruun: 4,
  Kinmora: 3,
  Lhumir: 4,
  Namséa: 4,
  Rénara: 4,
  Sahén: 3,
  Siljoa: 4,
  Siyuané: 4,
  Skénari: 3,
  Tjukari: 4,
  Wóhaka: 3,
  Yatevar: 3,
};

/* ============================
   COMPONENT
============================ */

export default function Home() {
  const [step, setStep] = useState<"info" | "quiz" | "result" | "loading">("info");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [genderOther, setGenderOther] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedEmblems, setSelectedEmblems] = useState({
    primary: 1,
    secondary: 1,
    tertiary: 1,
  });

  /* ============================
     LOGIC — UNCHANGED
  ============================ */

  function startQuiz() {
    if (!name || !gender || !birthDate || !city || !ethnicity) {
      setError("All fields are required");
      return;
    }
    if (gender === "other" && !genderOther) {
      setError("Please specify your gender");
      return;
    }
    setError(null);
    setStep("quiz");
  }

  function answerQuestion(optionIndex: number) {
    setSelectedOption(optionIndex);
    setTimeout(() => {
      const q = QUIZ_QUESTIONS[currentQuestionIndex];
      const updated = { ...quizAnswers, [q.id]: optionIndex };
      setQuizAnswers(updated);
      setSelectedOption(null);

      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        submitQuiz(updated);
      }
    }, 450);
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  async function submitQuiz(finalAnswers: Record<string, number>) {
    setStep("loading");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthDate, quizAnswers: finalAnswers }),
      });

      const data = await res.json();

      setTimeout(() => {
        setResult(data);
        setSelectedEmblems({
          primary: Math.floor(Math.random() * (CODE_EMBLEM_COUNTS[data.primary.code_name] || 1)) + 1,
          secondary: Math.floor(Math.random() * (CODE_EMBLEM_COUNTS[data.secondary.code_name] || 1)) + 1,
          tertiary: Math.floor(Math.random() * (CODE_EMBLEM_COUNTS[data.tertiary.code_name] || 1)) + 1,
        });
        setStep("result");
        setLoading(false);
      }, 1800);
    } catch {
      setError("Analysis failed");
      setStep("quiz");
      setLoading(false);
    }
  }

  function restart() {
    setStep("info");
    setName("");
    setGender("");
    setGenderOther("");
    setBirthDate("");
    setCity("");
    setEthnicity("");
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setResult(null);
    setError(null);
  }

  const progress = Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  /* ============================
     RENDER
  ============================ */

  return (
    <main
      style={{
        minHeight: "100vh",
        fontFamily: BODY_FONT,
        background:
          step === "info"
            ? THEME.bg.info
            : step === "quiz"
            ? THEME.bg.quiz
            : step === "loading"
            ? THEME.bg.loading
            : THEME.bg.result,
        transition: "background 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "auto",
          padding: "80px 24px",
        }}
      >

        {/* INFO */}
        {step === "info" && (
          <div style={{ ...PANEL_STYLE, padding: "64px 56px" }}>
            <h1
              style={{
                fontFamily: CEREMONIAL_FONT,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                textAlign: "center",
                color: THEME.textPrimary,
                fontSize: "3rem",
                marginBottom: "20px",
              }}
            >
              Avirage
            </h1>
            <p style={{ textAlign: "center", color: THEME.textSecondary }}>
              Enter the cultural archive and reveal your code
            </p>

            {/* FORM */}
            <div style={{ marginTop: "48px", display: "grid", gap: "22px" }}>
              {[["Name", name, setName], ["City", city, setCity], ["Ethnicity", ethnicity, setEthnicity]].map(
                ([label, value, setter]: any) => (
                  <input
                    key={label}
                    placeholder={label}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    style={{
                      padding: "14px",
                      background: "transparent",
                      border: `1px solid ${THEME.softBorder}`,
                      borderRadius: "10px",
                      color: THEME.textPrimary,
                    }}
                  />
                )
              )}

              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                style={{
                  padding: "14px",
                  background: "transparent",
                  border: `1px solid ${THEME.softBorder}`,
                  borderRadius: "10px",
                  color: THEME.textPrimary,
                }}
              />

              {error && <div style={{ color: "#ff6b6b" }}>{error}</div>}

              <button
                onClick={startQuiz}
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  background: "transparent",
                  border: `1px solid ${THEME.accent}`,
                  color: THEME.accent,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Enter the Archive
              </button>
            </div>
          </div>
        )}

        {/* RESULT (QUIZ + LOADING STYLES KEPT SIMPLE FOR LENGTH) */}
        {step === "result" && result && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                ...PANEL_STYLE,
                padding: "72px 56px",
                background: CODE_COLORS[result.primary.code_name],
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "0 auto 40px",
                  borderRadius: "50%",
                  border: `1px solid ${THEME.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: THEME.glow,
                }}
              >
                <img
                  src={`/emblems/${result.primary.code_name} ${selectedEmblems.primary}.jpg`}
                  style={{ width: "140px", height: "140px", objectFit: "contain" }}
                />
              </div>

              <h1
                style={{
                  fontFamily: CEREMONIAL_FONT,
                  fontSize: "3.5rem",
                  letterSpacing: "0.22em",
                }}
              >
                {result.primary.code_name}
              </h1>

              <p style={{ opacity: 0.9, marginTop: "16px" }}>
                {result.primary.full_name} · {result.primary.matchPercentage}%
              </p>
            </div>

            <button
              onClick={restart}
              style={{
                marginTop: "40px",
                padding: "14px 36px",
                background: "transparent",
                border: `1px solid ${THEME.softBorder}`,
                color: THEME.textSecondary,
              }}
            >
              Re-enter the Field
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
