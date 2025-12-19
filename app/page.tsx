"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";

/* ============================
   THEME
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
};

const CEREMONIAL_FONT = "'Cinzel', serif";
const BODY_FONT = "'Inter', system-ui, sans-serif";

const PANEL_STYLE = {
  background: THEME.panel,
  borderRadius: "18px",
  border: `1px solid ${THEME.border}`,
  backdropFilter: "blur(14px)",
};

/* ============================
   TYPES (UNCHANGED)
============================ */

interface AnalysisResult {
  primary: any;
  secondary: any;
  tertiary: any;
  explanation: string;
  keyTraits: any[];
  userName: string;
  astrologyData: any;
}

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
  const [error, setError] = useState<string | null>(null);

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

  /* ============================
     RENDER
  ============================ */

  return (
    <main
      style={{
        minHeight: "100vh",
        fontFamily: BODY_FONT,
        background: THEME.bg.info,
      }}
    >
      <div style={{ maxWidth: 760, margin: "auto", padding: "80px 24px" }}>
        {step === "info" && (
          <div style={{ ...PANEL_STYLE, padding: "64px 56px" }}>
            <h1
              style={{
                fontFamily: CEREMONIAL_FONT,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                textAlign: "center",
                fontSize: "3rem",
                color: THEME.textPrimary,
              }}
            >
              Avirage
            </h1>

            <p
              style={{
                textAlign: "center",
                color: THEME.textSecondary,
                marginTop: 12,
              }}
            >
              Enter the cultural archive
            </p>

            <div style={{ marginTop: 48, display: "grid", gap: 22 }}>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>

              {gender === "other" && (
                <input
                  placeholder="Specify gender"
                  value={genderOther}
                  onChange={(e) => setGenderOther(e.target.value)}
                  style={inputStyle}
                />
              )}

              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Ethnicity"
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                style={inputStyle}
              />

              {error && <div style={{ color: "#ff6b6b" }}>{error}</div>}

              <button
                onClick={startQuiz}
                style={{
                  marginTop: 24,
                  padding: "16px",
                  background: "transparent",
                  border: `1px solid ${THEME.accent}`,
                  color: THEME.accent,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Enter the Archive
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* ============================
   SHARED INPUT STYLE
============================ */

const inputStyle: React.CSSProperties = {
  padding: "14px",
  background: "transparent",
  border: `1px solid rgba(255,255,255,0.12)`,
  borderRadius: "10px",
  color: "#e6e9ee",
};
