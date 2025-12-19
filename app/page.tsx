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
   TYPES & COLORS
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

// Emblem-based color palettes
const CODE_COLORS: Record<string, string> = {
  Enzuka: "linear-gradient(135deg, #CD853F 0%, #8B0000 100%)",
  Siyuané: "linear-gradient(135deg, #00A86B 0%, #FFFFF0 100%)",
  Namséa: "linear-gradient(135deg, #4682B4 0%, #F5F5DC 100%)",
  Karayni: "linear-gradient(135deg, #228B22 0%, #FFD700 100%)",
  Siljoa: "linear-gradient(135deg, #708090 0%, #48D1CC 100%)",
  Yatevar: "linear-gradient(135deg, #B22222 0%, #000000 100%)",
  Wóhaka: "linear-gradient(135deg, #87CEEB 0%, #F5F5F5 100%)",
  Jaejin: "linear-gradient(135deg, #778899 0%, #DC143C 100%)",
  Tjukari: "linear-gradient(135deg, #A0522D 0%, #36454F 100%)",
  Kinmora: "linear-gradient(135deg, #FFD700 0%, #191970 100%)",
  Skénari: "linear-gradient(135deg, #228B22 0%, #C0C0C0 100%)",
  Ashkara: "linear-gradient(135deg, #FF8C00 0%, #FFFFFF 100%)",
  Aléthir: "linear-gradient(135deg, #4169E1 0%, #87CEEB 100%)",
  Káyori: "linear-gradient(135deg, #DAA520 0%, #000080 100%)",
  Sahén: "linear-gradient(135deg, #F5DEB3 0%, #8B7355 100%)",
  Khoruun: "linear-gradient(135deg, #CD7F32 0%, #808080 100%)",
  Lhumir: "linear-gradient(135deg, #F5F5F5 0%, #87CEEB 100%)",
  Rénara: "linear-gradient(135deg, #7CFC00 0%, #FFD700 100%)",
  Khoisan: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
  Shokunin: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
};

const CODE_EMBLEM_COUNTS: Record<string, number> = {
  "Aléthir": 2,
  "Ashkara": 2,
  "Enzuka": 2,
  "Jaejin": 3,
  "Karayni": 2,
  "Káyori": 2,
  "Khoisan": 2,
  "Khoruun": 2,
  "Kinmora": 2,
  "Lhumir": 2,
  "Namséa": 2,
  "Rénara": 2,
  "Sahén": 2,
  "Shokunin": 2,
  "Siljoa": 2,
  "Siyuané": 2,
  "Skénari": 2,
  "Tjukari": 2,
  "Wóhaka": 2,
  "Yatevar": 2,
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

  const [selectedEmblems, setSelectedEmblems] = useState<{
    primary: number;
    secondary: number;
    tertiary: number;
  }>({ primary: 1, secondary: 1, tertiary: 1 });

  /* ============================
     HANDLERS
  ============================ */

  function startQuiz() {
    if (!name.trim() || !gender || !birthDate || !city.trim() || !ethnicity.trim()) {
      setError("All fields are required");
      return;
    }
    if (gender === "other" && !genderOther.trim()) {
      setError("Please specify your gender");
      return;
    }
    setError(null);
    setStep("quiz");
  }

  function answerQuestion(optionIndex: number) {
    setSelectedOption(optionIndex);

    setTimeout(() => {
      const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
      const newAnswers = {
        ...quizAnswers,
        [currentQuestion.id]: optionIndex,
      };
      setQuizAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        submitQuiz(newAnswers);
      }
    }, 400);
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
      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          birthDate,
          quizAnswers: finalAnswers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data = await response.json();

      setTimeout(() => {
        setResult(data);

        setSelectedEmblems({
          primary: Math.floor(Math.random() * (CODE_EMBLEM_COUNTS[data.primary.code_name] || 1)) + 1,
          secondary: Math.floor(Math.random() * (CODE_EMBLEM_COUNTS[data.secondary.code_name] || 1)) + 1,
          tertiary: Math.floor(Math.random() * (CODE_EMBLEM_COUNTS[data.tertiary.code_name] || 1)) + 1,
        });

        setStep("result");
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
        background: step === "info" 
          ? THEME.bg.info
          : step === "quiz"
          ? THEME.bg.quiz
          : step === "loading"
          ? THEME.bg.loading
          : THEME.bg.result,
        transition: "background 0.8s ease",
      }}
    >
      <div style={{ maxWidth: 760, margin: "auto", padding: "80px 24px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
        {/* INFO STEP */}
        {step === "info" && (
          <div style={{ ...PANEL_STYLE, padding: "64px 56px", animation: "fadeInUp 0.6s ease" }}>
            <h1
              style={{
                fontFamily: CEREMONIAL_FONT,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                textAlign: "center",
                fontSize: "3rem",
                color: THEME.textPrimary,
                marginBottom: "8px",
              }}
            >
              Avirage
            </h1>

            <p
              style={{
                textAlign: "center",
                color: THEME.textSecondary,
                fontSize: "15px",
                marginBottom: "48px",
              }}
            >
              Enter the cultural archive
            </p>

            <div style={{ display: "grid", gap: 22 }}>
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />

              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  if (e.target.value !== "other") setGenderOther("");
                }}
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

              {error && <div style={{ color: "#ff6b6b", fontSize: "14px" }}>{error}</div>}

              <button
                onClick={startQuiz}
                style={{
                  marginTop: 24,
                  padding: "16px",
                  background: "transparent",
                  border: `1px solid ${THEME.accent}`,
                  borderRadius: "10px",
                  color: THEME.accent,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: BODY_FONT,
                  fontSize: "13px",
                  fontWeight: "600",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = THEME.accent;
                  e.currentTarget.style.color = "#0b0f14";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = THEME.accent;
                }}
              >
                Enter the Archive
              </button>
            </div>

            <p style={{ textAlign: "center", color: THEME.textSecondary, fontSize: "12px", marginTop: "32px", opacity: 0.6 }}>
              ⏱️ 10 minutes • 🔒 Private
            </p>
          </div>
        )}

        {/* QUIZ STEP */}
        {step === "quiz" && !loading && (
          <div style={{ ...PANEL_STYLE, padding: "48px 40px", animation: "fadeIn 0.5s ease" }}>
            {/* Progress */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: THEME.textSecondary, letterSpacing: "0.05em" }}>
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span style={{ fontSize: "15px", fontWeight: "700", color: THEME.accent }}>
                  {progress}%
                </span>
              </div>
              <div style={{ height: "3px", backgroundColor: THEME.softBorder, borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: THEME.accent, width: `${progress}%`, transition: "width 0.5s ease" }} />
              </div>
            </div>

            {/* Motivational */}
            {currentQuestionIndex === 9 && (
              <div style={{ textAlign: "center", padding: "16px", background: "rgba(201, 169, 106, 0.08)", borderRadius: "12px", marginBottom: "30px", border: `1px solid rgba(201, 169, 106, 0.2)` }}>
                <span style={{ fontSize: "18px", marginRight: "8px" }}>✨</span>
                <span style={{ color: THEME.accent, fontWeight: "600", fontSize: "14px" }}>
                  Halfway there. Your code is taking shape...
                </span>
              </div>
            )}

            {/* Question */}
            <h2 style={{ fontSize: "1.6rem", marginBottom: "32px", lineHeight: "1.5", color: THEME.textPrimary, fontWeight: "600" }}>
              {QUIZ_QUESTIONS[currentQuestionIndex].question}
            </h2>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answerQuestion(index)}
                  disabled={selectedOption !== null}
                  style={{
                    padding: "18px 20px",
                    fontSize: "15px",
                    background: selectedOption === index ? "rgba(201, 169, 106, 0.15)" : "transparent",
                    color: selectedOption === index ? THEME.accent : THEME.textPrimary,
                    border: selectedOption === index ? `1px solid ${THEME.accent}` : `1px solid ${THEME.softBorder}`,
                    borderRadius: "12px",
                    cursor: selectedOption !== null ? "not-allowed" : "pointer",
                    textAlign: "left",
                    transition: "all 0.3s",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedOption === null) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = THEME.border;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedOption === null) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = THEME.softBorder;
                    }
                  }}
                >
                  <span style={{ fontSize: "24px", marginRight: "12px" }}>{option.emoji}</span>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>

            {/* Back */}
            {currentQuestionIndex > 0 && (
              <button
                onClick={previousQuestion}
                disabled={selectedOption !== null}
                style={{
                  marginTop: "24px",
                  padding: "10px 24px",
                  fontSize: "13px",
                  background: "transparent",
                  color: THEME.textSecondary,
                  border: `1px solid ${THEME.softBorder}`,
                  borderRadius: "8px",
                  cursor: selectedOption !== null ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (selectedOption === null) {
                    e.currentTarget.style.borderColor = THEME.border;
                    e.currentTarget.style.color = THEME.textPrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOption === null) {
                    e.currentTarget.style.borderColor = THEME.softBorder;
                    e.currentTarget.style.color = THEME.textSecondary;
                  }
                }}
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div style={{ textAlign: "center", padding: "80px 40px", ...PANEL_STYLE, animation: "pulse 2s ease infinite" }}>
            <div style={{ fontSize: "56px", marginBottom: "24px", animation: "float 3s ease-in-out infinite" }}>
              ✨
            </div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "12px", color: THEME.textPrimary, fontFamily: CEREMONIAL_FONT, letterSpacing: "0.15em" }}>
              Discovering Your Code
            </h2>
            <p style={{ color: THEME.textSecondary, fontSize: "14px", lineHeight: "1.6" }}>
              Mapping traits across 20 archetypes...<br />
              Analyzing patterns from global traditions...
            </p>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <div style={{ animation: "fadeInUp 0.8s ease" }}>
            {/* Header */}
            <div style={{ marginBottom: "30px", textAlign: "center" }}>
              <p style={{ fontSize: "16px", marginBottom: "6px", color: THEME.textSecondary }}>
                {result.userName}
              </p>
              <p style={{ fontSize: "13px", color: THEME.textSecondary, opacity: 0.7 }}>
                {result.astrologyData.sunSign} • {result.astrologyData.element} • {result.astrologyData.modality}
              </p>
            </div>

            {/* Primary Code */}
            <div style={{
              padding: "60px 40px",
              background: CODE_COLORS[result.primary.code_name] || "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
              borderRadius: "20px",
              marginBottom: "20px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden",
              animation: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
              <div style={{
                position: "absolute",
                top: "-50%",
                right: "-50%",
                width: "200%",
                height: "200%",
                background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* Emblem */}
              <div style={{ marginBottom: "20px", position: "relative", zIndex: 1 }}>
                <img
                  src={`/emblems/${result.primary.code_name} ${selectedEmblems.primary}.jpg`}
                  alt={`${result.primary.code_name} emblem`}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "contain",
                    margin: "0 auto",
                    display: "block",
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4))",
                    animation: "float 3s ease-in-out infinite",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "12px", letterSpacing: "0.2em", fontWeight: "600", position: "relative", zIndex: 1, color: "#fff" }}>
                YOUR CULTURAL CODE
              </div>
              <h1 style={{
                fontFamily: CEREMONIAL_FONT,
                fontSize: "3.5rem",
                margin: "16px 0",
                fontWeight: "700",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                letterSpacing: "0.05em",
                position: "relative",
                zIndex: 1,
                color: "#fff",
              }}>
                {result.primary.code_name}
              </h1>
              <div style={{ fontSize: "17px", opacity: 0.95, marginBottom: "20px", fontWeight: "500", position: "relative", zIndex: 1, color: "#fff" }}>
                {result.primary.full_name} • {result.primary.matchPercentage}% resonance
              </div>
              <p style={{ fontSize: "15px", lineHeight: "1.7", opacity: 0.9, maxWidth: "500px", margin: "0 auto", position: "relative", zIndex: 1, color: "#fff" }}>
                {result.primary.description}
              </p>
            </div>

            {/* Secondary & Tertiary */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
              <div style={{ ...PANEL_STYLE, padding: "28px 24px" }}>
                <img
                  src={`/emblems/${result.secondary.code_name} ${selectedEmblems.secondary}.jpg`}
                  alt={`${result.secondary.code_name} emblem`}
                  style={{ width: "50px", height: "50px", objectFit: "contain", marginBottom: "12px", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.2))" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div style={{ fontSize: "10px", color: THEME.textSecondary, marginBottom: "8px", letterSpacing: "0.15em", fontWeight: "600" }}>
                  SECONDARY
                </div>
                <h3 style={{ fontSize: "1.4rem", margin: "6px 0", color: THEME.textPrimary, fontWeight: "700" }}>
                  {result.secondary.code_name}
                </h3>
                <div style={{ fontSize: "13px", color: THEME.textSecondary, fontWeight: "500" }}>
                  {result.secondary.full_name}
                </div>
                <div style={{ fontSize: "12px", color: THEME.accent, marginTop: "8px", fontWeight: "700" }}>
                  {result.secondary.matchPercentage}% match
                </div>
              </div>

              <div style={{ ...PANEL_STYLE, padding: "28px 24px" }}>
                <img
                  src={`/emblems/${result.tertiary.code_name} ${selectedEmblems.tertiary}.jpg`}
                  alt={`${result.tertiary.code_name} emblem`}
                  style={{ width: "50px", height: "50px", objectFit: "contain", marginBottom: "12px", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.2))" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div style={{ fontSize: "10px", color: THEME.textSecondary, marginBottom: "8px", letterSpacing: "0.15em", fontWeight: "600" }}>
                  TERTIARY
                </div>
                <h3 style={{ fontSize: "1.4rem", margin: "6px 0", color: THEME.textPrimary, fontWeight: "700" }}>
                  {result.tertiary.code_name}
                </h3>
                <div style={{ fontSize: "13px", color: THEME.textSecondary, fontWeight: "500" }}>
                  {result.tertiary.full_name}
                </div>
                <div style={{ fontSize: "12px", color: THEME.accent, marginTop: "8px", fontWeight: "700" }}>
                  {result.tertiary.matchPercentage}% match
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div style={{ ...PANEL_STYLE, padding: "32px", marginBottom: "30px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "16px", color: THEME.textPrimary, fontWeight: "700", letterSpacing: "0.02em" }}>
                Why You Resonate
              </h3>
              <p style={{ lineHeight: "1.8", color: THEME.textSecondary, fontSize: "15px" }}>
                {result.explanation}
              </p>
            </div>

            {/* Key Traits */}
            <div style={{ ...PANEL_STYLE, padding: "32px", marginBottom: "40px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: THEME.textPrimary, fontWeight: "700", letterSpacing: "0.02em" }}>
                Defining Traits
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {result.keyTraits.map((trait, index) => (
                  <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "12px",
                    border: `1px solid ${THEME.softBorder}`,
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(4px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
                  >
                    <div>
                      <div style={{ fontWeight: "600", marginBottom: "4px", color: THEME.textPrimary, fontSize: "15px" }}>
                        {trait.trait}
                      </div>
                      <div style={{ fontSize: "13px", color: THEME.textSecondary }}>
                        {trait.description}
                      </div>
                    </div>
                    <div style={{ fontSize: "26px", fontWeight: "800", color: trait.score > 50 ? THEME.accent : "#6b95c9", minWidth: "50px", textAlign: "right" }}>
                      {trait.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restart */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={restart}
                style={{
                  padding: "14px 36px",
                  fontSize: "13px",
                  fontWeight: "600",
                  background: "transparent",
                  color: THEME.accent,
                  border: `1px solid ${THEME.accent}`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = THEME.accent;
                  e.currentTarget.style.color = "#0b0f14";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = THEME.accent;
                }}
              >
                Discover Another Code
              </button>
            </div>
          </div>
        )}

        {error && step === "quiz" && (
          <div style={{ marginTop: "20px", padding: "16px", ...PANEL_STYLE, color: "#ff6b6b", border: `1px solid rgba(255, 107, 107, 0.3)`, fontWeight: "500", fontSize: "14px" }}>
            {error}
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </main>
  );
}

/* ============================
   INPUT STYLE
============================ */

const inputStyle: React.CSSProperties = {
  padding: "14px 16px",
  background: "transparent",
  border: `1px solid rgba(255,255,255,0.12)`,
  borderRadius: "10px",
  color: "#e6e9ee",
  fontSize: "14px",
  fontFamily: "'Inter', system-ui, sans-serif",
  outline: "none",
  transition: "border-color 0.3s",
};
