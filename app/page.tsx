"use client";

import { isCodeSlug, type CodeSlug } from "@/lib/codePages";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  panelStrong: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.14)",
  softBorder: "rgba(255,255,255,0.08)",
  textPrimary: "#e6e9ee",
  textSecondary: "#9aa3ad",
  textMuted: "rgba(154,163,173,0.75)",
  accent: "#c9a96a",
  danger: "#ff6b6b",
};

const DISPLAY_FONT = "'Cinzel', serif";
const BODY_FONT = "'Inter', system-ui, sans-serif";

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
   COLORS + EMBLEMS
============================ */

// Keep whatever you already use here (no need to be perfect for every code)
const CODE_COLORS: Record<string, string> = {
  Enzuka: "linear-gradient(135deg, #CD853F 0%, #8B0000 100%)",
  Siyuane: "linear-gradient(135deg, #00A86B 0%, #FFFFF0 100%)",
  Namsea: "linear-gradient(135deg, #4682B4 0%, #F5F5DC 100%)",
  Karayni: "linear-gradient(135deg, #228B22 0%, #FFD700 100%)",
  Siljoa: "linear-gradient(135deg, #708090 0%, #48D1CC 100%)",
  Yatevar: "linear-gradient(135deg, #B22222 0%, #000000 100%)",
  Wohaka: "linear-gradient(135deg, #87CEEB 0%, #F5F5F5 100%)",
  Jaejin: "linear-gradient(135deg, #778899 0%, #DC143C 100%)",
  Tjukari: "linear-gradient(135deg, #A0522D 0%, #36454F 100%)",
  Kinmora: "linear-gradient(135deg, #FFD700 0%, #191970 100%)",
  Skenari: "linear-gradient(135deg, #228B22 0%, #C0C0C0 100%)",
  Ashkara: "linear-gradient(135deg, #FF8C00 0%, #FFFFFF 100%)",
  Alethir: "linear-gradient(135deg, #4169E1 0%, #87CEEB 100%)",
  Kayori: "linear-gradient(135deg, #DAA520 0%, #000080 100%)",
  Sahen: "linear-gradient(135deg, #F5DEB3 0%, #8B7355 100%)",
  Khoruun: "linear-gradient(135deg, #CD7F32 0%, #808080 100%)",
  Lhumir: "linear-gradient(135deg, #F5F5F5 0%, #87CEEB 100%)",
  Renara: "linear-gradient(135deg, #7CFC00 0%, #FFD700 100%)",
  Khoisan: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
  Shokunin: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
};

const CODE_EMBLEM_COUNTS: Record<string, number> = {
  Alethir: 5,
  Ashkara: 4,
  Enzuka: 3,
  Jaejin: 3,
  Karayni: 5,
  Kayori: 4,
  Khoisan: 4,
  Khoruun: 4,
  Kinmora: 3,
  Lhumir: 4,
  Namsea: 4,
  Renara: 4,
  Sahen: 3,
  Shokunin: 5,
  Siljoa: 4,
  Siyuane: 4,
  Skenari: 3,
  Tjukari: 4,
  Wohaka: 3,
  Yatevar: 3,
};

// Accent-safe string cleaning for paths / slugs
function stripAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// This controls the ROUTE: /codepages/<slug>
// Example: "Shokunin" -> "shokunin"
// This controls the ROUTE: /codepages/<slug>
function toCodeSlug(codeName: string | null | undefined): CodeSlug | null {
  if (!codeName) return null;
  const normalized = stripAccents(codeName).toLowerCase().trim();
  return isCodeSlug(normalized) ? (normalized as CodeSlug) : null;
}

function clampEmblemPick(codeName: string, pick: number): number {
  const key = stripAccents(codeName);
  const max = CODE_EMBLEM_COUNTS[key] ?? 2;
  return Math.min(Math.max(1, pick), max);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedEmblems, setSelectedEmblems] = useState<{ primary: number; secondary: number; tertiary: number }>({
    primary: 1,
    secondary: 1,
    tertiary: 1,
  });

  const progress = Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  const stepTitle = useMemo(() => {
    if (step === "info") return "Enter the Archive";
    if (step === "quiz") return "Lens Calibration";
    if (step === "loading") return "Triangulating";
    return "Your Results";
  }, [step]);

  // (Optional) keep last result in session so you can restore later if needed
  useEffect(() => {
    try {
      if (result) sessionStorage.setItem("avirage:lastResult", JSON.stringify(result));
    } catch {
      // ignore
    }
  }, [result]);

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
      const newAnswers = { ...quizAnswers, [currentQuestion.id]: optionIndex };
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
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

  async function submitQuiz(finalAnswers: Record<string, number>) {
    setStep("loading");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthDate, quizAnswers: finalAnswers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data: AnalysisResult = await response.json();

      setTimeout(() => {
        setResult(data);

        // Random emblem pick (1 or 2), clamped if a code has different count
        const p = clampEmblemPick(data.primary?.code_name || "Namsea", Math.floor(Math.random() * 2) + 1);
        const s = clampEmblemPick(data.secondary?.code_name || "Namsea", Math.floor(Math.random() * 2) + 1);
        const t = clampEmblemPick(data.tertiary?.code_name || "Namsea", Math.floor(Math.random() * 2) + 1);

        setSelectedEmblems({ primary: p, secondary: s, tertiary: t });

        setStep("result");
        setLoading(false);
      }, 1200);
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
        transition: "background 0.8s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 10%, rgba(201,169,106,0.10) 0%, transparent 45%), radial-gradient(circle at 80% 30%, rgba(80,160,255,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          opacity: 0.25,
          pointerEvents: "none",
          maskImage: "radial-gradient(circle at 50% 30%, black 0%, transparent 60%)",
        }}
      />

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "64px 20px", position: "relative", zIndex: 1 }}>
        {/* Top header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
          <div>
            <div
              style={{
                fontFamily: DISPLAY_FONT,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontSize: 18,
                color: THEME.textPrimary,
              }}
            >
              Avirage
            </div>
            <div style={{ color: THEME.textMuted, fontSize: 12, marginTop: 6 }}>{stepTitle}</div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <SoftPill>Private</SoftPill>
            <SoftPill>Evidence-style</SoftPill>
            <SoftPill>Explainable</SoftPill>
          </div>
        </div>

        {/* INFO STEP */}
        {step === "info" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 16 }}>
            <div style={{ ...glassCard, padding: 24 }}>
              <div style={{ color: THEME.textPrimary, fontSize: 28, fontWeight: 950, marginBottom: 8, letterSpacing: "-0.02em" }}>
                Enter the archive.
              </div>
              <div style={{ color: THEME.textSecondary, fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>
                This is a structured lens match: frameworks → patterns → archetypal traditions. Not a label — a map.
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />

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
                  <input placeholder="Specify gender" value={genderOther} onChange={(e) => setGenderOther(e.target.value)} style={inputStyle} />
                )}

                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={inputStyle} />
                <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
                <input placeholder="Ethnicity" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} style={inputStyle} />

                {error && <div style={{ color: THEME.danger, fontSize: 13 }}>{error}</div>}

                <button onClick={startQuiz} style={primaryBtn}>
                  Enter the Archive
                </button>

                <div style={{ color: THEME.textMuted, fontSize: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <span>⏱️ ~10 minutes</span>
                  <span>🔒 private</span>
                  <span>📌 consistent scoring</span>
                </div>
              </div>
            </div>

            {/* Right: credibility */}
            <div style={{ ...glassCard, padding: 20 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: THEME.textMuted, marginBottom: 10 }}>
                What you’ll receive
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                <div style={bulletRow}>
                  <span style={bulletIcon}>①</span>
                  <div>
                    <div style={bulletTitle}>Primary / Secondary / Tertiary Code</div>
                    <div style={bulletDesc}>A ranked lens match (not a permanent identity).</div>
                  </div>
                </div>

                <div style={bulletRow}>
                  <span style={bulletIcon}>②</span>
                  <div>
                    <div style={bulletTitle}>Why it matched</div>
                    <div style={bulletDesc}>A short explanation tied to detected patterns.</div>
                  </div>
                </div>

                <div style={bulletRow}>
                  <span style={bulletIcon}>③</span>
                  <div>
                    <div style={bulletTitle}>Defining traits</div>
                    <div style={bulletDesc}>A readable summary you can act on (places, habits, activities later).</div>
                  </div>
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "8px 0" }} />

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <SoftPill>Clean UI</SoftPill>
                  <SoftPill>Explainable output</SoftPill>
                  <SoftPill>Built for teams later</SoftPill>
                </div>

                <div style={{ marginTop: 8, padding: 14, borderRadius: 16, border: `1px solid ${THEME.softBorder}`, background: THEME.panelStrong }}>
                  <div style={{ color: THEME.textPrimary, fontWeight: 800, marginBottom: 6 }}>Trust note</div>
                  <div style={{ color: THEME.textSecondary, fontSize: 13, lineHeight: 1.6 }}>
                    This is a lens match using multiple frameworks combined. It’s designed to be consistent + interpretable, not mystical.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QUIZ STEP */}
        {step === "quiz" && !loading && (
          <div style={{ ...glassCard, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ color: THEME.textSecondary, fontSize: 13 }}>
                Question <span style={{ color: THEME.textPrimary, fontWeight: 900 }}>{currentQuestionIndex + 1}</span> of{" "}
                <span style={{ color: THEME.textPrimary, fontWeight: 900 }}>{QUIZ_QUESTIONS.length}</span>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: THEME.textMuted, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  calibration
                </span>
                <span style={{ color: THEME.accent, fontWeight: 900 }}>{progress}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: THEME.accent, transition: "width 0.45s ease" }} />
            </div>

            {/* Question */}
            <div style={{ color: THEME.textPrimary, fontSize: 18, fontWeight: 800, lineHeight: 1.55, marginBottom: 14 }}>
              {QUIZ_QUESTIONS[currentQuestionIndex].question}
            </div>

            {/* Options */}
            <div style={{ display: "grid", gap: 10 }}>
              {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, index) => {
                const isSelected = selectedOption === index;

                return (
                  <button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    disabled={selectedOption !== null}
                    style={{
                      padding: "14px 14px",
                      borderRadius: 14,
                      textAlign: "left",
                      cursor: selectedOption !== null ? "not-allowed" : "pointer",
                      background: isSelected ? "rgba(201,169,106,0.10)" : "rgba(255,255,255,0.02)",
                      border: isSelected ? `1px solid rgba(201,169,106,0.45)` : `1px solid ${THEME.softBorder}`,
                      color: isSelected ? THEME.textPrimary : THEME.textSecondary,
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      transition: "transform 0.12s ease, border-color 0.18s ease, background 0.18s ease",
                      fontWeight: 650,
                    }}
                    onMouseEnter={(e) => {
                      if (selectedOption !== null) return;
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.borderColor = THEME.border;
                    }}
                    onMouseLeave={(e) => {
                      if (selectedOption !== null) return;
                      e.currentTarget.style.transform = "translateY(0px)";
                      e.currentTarget.style.borderColor = THEME.softBorder;
                    }}
                  >
                    <span style={{ width: 28, textAlign: "center", fontSize: 20 }}>{option.emoji}</span>
                    <span style={{ flex: 1 }}>{option.text}</span>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: isSelected ? THEME.accent : "rgba(255,255,255,0.18)",
                      }}
                    />
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 16 }}>
              <button
                onClick={previousQuestion}
                disabled={selectedOption !== null || currentQuestionIndex === 0}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1px solid ${THEME.softBorder}`,
                  background: "rgba(255,255,255,0.02)",
                  color: THEME.textSecondary,
                  cursor: selectedOption !== null || currentQuestionIndex === 0 ? "not-allowed" : "pointer",
                  fontWeight: 800,
                }}
              >
                ← Back
              </button>

              <div style={{ color: THEME.textMuted, fontSize: 12, display: "flex", alignItems: "center" }}>
                Tip: answer how you <span style={{ color: THEME.textSecondary, marginLeft: 4 }}>usually</span> are.
              </div>
            </div>

            {error && <div style={{ marginTop: 14, color: THEME.danger, fontSize: 13 }}>{error}</div>}
          </div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div style={{ ...glassCard, padding: 26, textAlign: "center" }}>
            <div style={{ fontSize: 54, marginBottom: 14, animation: "float 3s ease-in-out infinite" }}>✦</div>
            <div
              style={{
                fontFamily: DISPLAY_FONT,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: THEME.textPrimary,
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Triangulating Your Lens
            </div>
            <div style={{ color: THEME.textSecondary, fontSize: 13, lineHeight: 1.7 }}>
              Mapping frameworks → patterns → archetypal traditions…
              <br />
              Producing a clean, explainable result.
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <div style={{ display: "grid", gap: 16 }}>
            {/* Header */}
            <div style={{ ...glassCard, padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
              <div>
                <div style={{ color: THEME.textPrimary, fontWeight: 950, fontSize: 16 }}>{result.userName}</div>
                <div style={{ color: THEME.textMuted, fontSize: 12 }}>
                  {result.astrologyData.sunSign} • {result.astrologyData.element} • {result.astrologyData.modality}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <SoftPill>Primary + 2 matches</SoftPill>
                <SoftPill>Explainable</SoftPill>
              </div>
            </div>

            {/* Primary card */}
            <div
              style={{
                borderRadius: 22,
                padding: 22,
                border: `1px solid rgba(255,255,255,0.10)`,
                boxShadow: "0 20px 70px rgba(0,0,0,0.45)",
                background: CODE_COLORS[stripAccents(result.primary.code_name)] || "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10) 0%, transparent 55%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 18, position: "relative", zIndex: 1 }}>
                {/* Emblem */}
                <div style={{ display: "grid", placeItems: "center" }}>
                  <img
                    src={`/emblems/${stripAccents(result.primary.code_name)} ${selectedEmblems.primary}.jpg`}
                    alt={`${result.primary.code_name} emblem`}
                    style={{
                      width: 160,
                      height: 160,
                      objectFit: "contain",
                      filter: "drop-shadow(0 12px 34px rgba(0,0,0,0.45))",
                      animation: "float 3s ease-in-out infinite",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div>
                  <div style={{ fontSize: 12, opacity: 0.92, letterSpacing: "0.22em", fontWeight: 900, color: "#fff" }}>
                    YOUR PRIMARY CODE
                  </div>
                  <div style={{ fontFamily: DISPLAY_FONT, fontSize: 44, fontWeight: 900, color: "#fff", marginTop: 8 }}>
                    {result.primary.code_name}
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.92)", fontWeight: 650, marginTop: 8 }}>
                    {result.primary.full_name} • {result.primary.matchPercentage}% resonance
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.88)", fontSize: 14, lineHeight: 1.75, marginTop: 12, maxWidth: 680 }}>
                    {result.primary.description}
                  </div>

                  {/* NEW: Buttons to read code pages */}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                    <CodeLinkButton codeName={result.primary.code_name} label="Read Primary" />
                    <CodeLinkButton codeName={result.secondary.code_name} label="Read Secondary" />
                    <CodeLinkButton codeName={result.tertiary.code_name} label="Read Tertiary" />
                  </div>

                  <div style={{ color: "rgba(255,255,255,0.70)", fontSize: 12, marginTop: 10 }}>
                    These open your code pages at <span style={{ opacity: 0.9 }}>/codepages/&lt;slug&gt;</span>.
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary + Tertiary */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <MiniCodeCard
                title="Secondary"
                codeName={result.secondary.code_name}
                fullName={result.secondary.full_name}
                match={result.secondary.matchPercentage}
                emblemPick={selectedEmblems.secondary}
              />
              <MiniCodeCard
                title="Tertiary"
                codeName={result.tertiary.code_name}
                fullName={result.tertiary.full_name}
                match={result.tertiary.matchPercentage}
                emblemPick={selectedEmblems.tertiary}
              />
            </div>

            {/* Explanation */}
            <div style={{ ...glassCard, padding: 18 }}>
              <div style={{ color: THEME.textPrimary, fontWeight: 950, marginBottom: 8 }}>Why you matched</div>
              <div style={{ color: THEME.textSecondary, fontSize: 14, lineHeight: 1.8 }}>{result.explanation}</div>
            </div>

            {/* Traits */}
            <div style={{ ...glassCard, padding: 18 }}>
              <div style={{ color: THEME.textPrimary, fontWeight: 950, marginBottom: 10 }}>Defining traits</div>
              <div style={{ display: "grid", gap: 10 }}>
                {result.keyTraits.map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 14,
                      padding: 14,
                      borderRadius: 16,
                      border: `1px solid ${THEME.softBorder}`,
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div>
                      <div style={{ color: THEME.textPrimary, fontWeight: 850 }}>{t.trait}</div>
                      <div style={{ color: THEME.textSecondary, fontSize: 13, marginTop: 4 }}>{t.description}</div>
                    </div>
                    <div style={{ textAlign: "right", minWidth: 78 }}>
                      <div style={{ fontSize: 12, color: THEME.textMuted }}>Score</div>
                      <div style={{ fontSize: 18, fontWeight: 950, color: t.score >= 50 ? THEME.accent : "#6b95c9" }}>{t.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restart */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={restart} style={secondaryBtn}>
                Discover another code
              </button>
            </div>
          </div>
        )}
      </div>

      {/* NOTE: plain <style> (NOT styled-jsx) to avoid nested styled-jsx build errors */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </main>
  );
}

/* ============================
   SUBCOMPONENTS
============================ */

function SoftPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "8px 10px",
        borderRadius: 999,
        border: `1px solid rgba(255,255,255,0.10)`,
        background: "rgba(255,255,255,0.03)",
        color: "rgba(230,233,238,0.80)",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

function CodeLinkButton({ codeName, label }: { codeName: string; label: string }) {
  const slug = toCodeSlug(codeName);

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.20)",
    background: "rgba(0,0,0,0.18)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 850,
    fontSize: 13,
  };

  if (!slug) {
    return (
      <button style={{ ...baseStyle, cursor: "not-allowed", opacity: 0.6 }} disabled aria-disabled="true" title="Unavailable">
        {label}
        <span style={{ opacity: 0.9 }}>→</span>
      </button>
    );
  }

  return (
    <Link href={`/codepages/${slug}`} style={baseStyle}>
      {label}
      <span style={{ opacity: 0.9 }}>→</span>
    </Link>
  );
}

function MiniCodeCard({
  title,
  codeName,
  fullName,
  match,
  emblemPick,
}: {
  title: string;
  codeName: string;
  fullName: string;
  match: number;
  emblemPick: number;
}) {
  return (
    <div style={{ ...glassCard, padding: 16, display: "grid", gridTemplateColumns: "66px 1fr", gap: 12, alignItems: "center" }}>
      <img
        src={`/emblems/${stripAccents(codeName)} ${emblemPick}.jpg`}
        alt={`${codeName} emblem`}
        style={{ width: 56, height: 56, objectFit: "contain", filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.35))" }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <div>
        <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: THEME.textMuted, fontWeight: 900 }}>
          {title}
        </div>
        <div style={{ color: THEME.textPrimary, fontWeight: 950, fontSize: 18, marginTop: 4 }}>{codeName}</div>
        <div style={{ color: THEME.textSecondary, fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{fullName}</div>
        <div style={{ color: THEME.accent, fontWeight: 950, marginTop: 8, fontSize: 13 }}>{match}% match</div>
      </div>
    </div>
  );
}

/* ============================
   STYLES
============================ */

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: `1px solid ${THEME.softBorder}`,
  borderRadius: 18,
  boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
};

const inputStyle: React.CSSProperties = {
  padding: "12px 12px",
  background: "rgba(0,0,0,0.10)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  color: THEME.textPrimary,
  fontSize: 14,
  fontFamily: BODY_FONT,
  outline: "none",
};

const primaryBtn: React.CSSProperties = {
  marginTop: 6,
  padding: "14px 14px",
  borderRadius: 14,
  border: `1px solid rgba(201,169,106,0.45)`,
  background: "rgba(201,169,106,0.10)",
  color: THEME.textPrimary,
  fontWeight: 900,
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const secondaryBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  border: `1px solid rgba(201,169,106,0.35)`,
  background: "transparent",
  color: THEME.accent,
  fontWeight: 900,
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const bulletRow: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  padding: 12,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: "rgba(255,255,255,0.02)",
};

const bulletIcon: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 10,
  border: `1px solid rgba(201,169,106,0.30)`,
  background: "rgba(201,169,106,0.10)",
  color: THEME.accent,
  fontWeight: 950,
  display: "grid",
  placeItems: "center",
  flex: "0 0 auto",
};

const bulletTitle: React.CSSProperties = {
  color: THEME.textPrimary,
  fontWeight: 950,
  fontSize: 13,
  marginBottom: 2,
};

const bulletDesc: React.CSSProperties = {
  color: THEME.textSecondary,
  fontSize: 12,
  lineHeight: 1.6,
};
