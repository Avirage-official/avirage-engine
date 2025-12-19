"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";

/* ============================
   THEME (Premium / Trust)
============================ */

const THEME = {
  bg: {
    info: "linear-gradient(180deg, #070A0E 0%, #0B1118 60%, #0A0F14 100%)",
    quiz: "linear-gradient(180deg, #070A0E 0%, #0C121B 55%, #0A0F14 100%)",
    loading: "linear-gradient(180deg, #070A0E 0%, #0B121A 60%, #0A0F14 100%)",
    result: "linear-gradient(180deg, #070A0E 0%, #0B1118 60%, #0A0F14 100%)",
  },
  panel: "rgba(255,255,255,0.04)",
  panelStrong: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.12)",
  softBorder: "rgba(255,255,255,0.08)",
  textPrimary: "#E9EDF3",
  textSecondary: "rgba(233, 237, 243, 0.64)",
  textMuted: "rgba(233, 237, 243, 0.48)",
  accent: "#C9A96A",
  accentSoft: "rgba(201,169,106,0.16)",
  danger: "#FF6B6B",
};

const DISPLAY_FONT = "var(--font-cinzel), ui-serif, Georgia, serif";
const BODY_FONT = "var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

const PANEL_STYLE: React.CSSProperties = {
  background: THEME.panel,
  borderRadius: 20,
  border: `1px solid ${THEME.border}`,
  backdropFilter: "blur(14px)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
};

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
   CODE VISUALS (No accents required)
   - Still supports accented inputs via normalization.
============================ */

const CODE_GRADIENTS: Record<string, string> = {
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

// Helper: remove accents + normalize keys
function normalizeKey(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getCodeGradient(codeName: string): string {
  const raw = CODE_GRADIENTS[codeName];
  if (raw) return raw;
  const normalized = CODE_GRADIENTS[normalizeKey(codeName)];
  if (normalized) return normalized;
  return "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)";
}

function clampEmblemPick(codeName: string, requested: number) {
  const max = CODE_EMBLEM_COUNTS[codeName] ?? CODE_EMBLEM_COUNTS[normalizeKey(codeName)] ?? 2;
  return Math.min(Math.max(1, requested), max);
}

/* ============================
   COMPONENTS (small, local)
============================ */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: THEME.textMuted }}>
      {children}
    </div>
  );
}

function SoftPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 999,
        border: `1px solid ${THEME.softBorder}`,
        background: "rgba(255,255,255,0.03)",
        color: THEME.textSecondary,
        fontSize: 12,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  const { loading, disabled, children, style, ...rest } = props;

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      style={{
        width: "100%",
        padding: "14px 16px",
        borderRadius: 12,
        border: `1px solid ${THEME.accent}`,
        background: `linear-gradient(180deg, rgba(201,169,106,0.22) 0%, rgba(201,169,106,0.06) 100%)`,
        color: THEME.textPrimary,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "transform 0.12s ease, box-shadow 0.2s ease, background 0.2s ease",
        boxShadow: "0 18px 40px rgba(201,169,106,0.10)",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 22px 55px rgba(201,169,106,0.16)";
          e.currentTarget.style.background = `linear-gradient(180deg, rgba(201,169,106,0.28) 0%, rgba(201,169,106,0.08) 100%)`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(201,169,106,0.10)";
        e.currentTarget.style.background = `linear-gradient(180deg, rgba(201,169,106,0.22) 0%, rgba(201,169,106,0.06) 100%)`;
      }}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}

/* ============================
   MAIN
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

  /* ============================
     HANDLERS (unchanged behavior)
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

      const data = await response.json();

      setTimeout(() => {
        setResult(data);

        // Same behavior: random emblem selection (still only 1 or 2), but safe-clamped per code
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
      {/* Background texture + grid */}
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
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, black 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "44px 20px 80px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top bar (brand + trust cues) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            padding: "10px 6px",
            opacity: step === "result" ? 0.9 : 1,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                border: `1px solid ${THEME.softBorder}`,
                background: "rgba(255,255,255,0.03)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              }}
            >
              <span style={{ color: THEME.accent, fontWeight: 800, fontFamily: DISPLAY_FONT }}>A</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <div style={{ fontFamily: DISPLAY_FONT, letterSpacing: "0.22em", textTransform: "uppercase", color: THEME.textPrimary }}>
                Avirage
              </div>
              <div style={{ fontSize: 12, color: THEME.textMuted }}>Archetypal lens matching</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <SoftPill>🔒 Private</SoftPill>
            <SoftPill>⏱️ ~10 min</SoftPill>
            <SoftPill>🧭 Not diagnosis</SoftPill>
          </div>
        </div>

        {/* Main card */}
        <div style={{ ...PANEL_STYLE, padding: 26 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: THEME.textMuted,
                  marginBottom: 6,
                }}
              >
                {stepTitle}
              </div>
              <div
                style={{
                  fontFamily: DISPLAY_FONT,
                  color: THEME.textPrimary,
                  fontSize: 34,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {step === "result" ? "Archive Match" : "Avirage"}
              </div>
            </div>

            {/* Quiz progress badge */}
            {step === "quiz" && (
              <div
                style={{
                  border: `1px solid ${THEME.softBorder}`,
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 16,
                  padding: "10px 12px",
                  minWidth: 160,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", color: THEME.textSecondary, fontSize: 12 }}>
                  <span>Progress</span>
                  <span style={{ color: THEME.accent, fontWeight: 800 }}>{progress}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden", marginTop: 8 }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: THEME.accent, transition: "width 0.4s ease" }} />
                </div>
              </div>
            )}
          </div>

          {/* INFO STEP */}
          {step === "info" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: 18,
              }}
            >
              {/* Left: form */}
              <div style={{ ...glassCard, padding: 20 }}>
                <div style={{ color: THEME.textSecondary, fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>
                  This is a <strong>lens</strong>, not a label: a structured match between your behavioral signals and a set of archetypal traditions.
                  You’ll get <strong>primary / secondary / tertiary</strong> matches with a short explanation.
                </div>

                <div style={{ display: "grid", gap: 14 }}>
                  <div style={{ display: "grid", gap: 8 }}>
                    <FieldLabel>Full name</FieldLabel>
                    <input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={inputStyle}
                      autoComplete="name"
                    />
                  </div>

                  <div style={{ display: "grid", gap: 8 }}>
                    <FieldLabel>Gender</FieldLabel>
                    <select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        if (e.target.value !== "other") setGenderOther("");
                      }}
                      style={inputStyle}
                    >
                      <option value="">Select</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {gender === "other" && (
                    <div style={{ display: "grid", gap: 8 }}>
                      <FieldLabel>Specify gender</FieldLabel>
                      <input placeholder="Type here" value={genderOther} onChange={(e) => setGenderOther(e.target.value)} style={inputStyle} />
                    </div>
                  )}

                  <div style={{ display: "grid", gap: 8 }}>
                    <FieldLabel>Birth date</FieldLabel>
                    <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={inputStyle} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div style={{ display: "grid", gap: 8 }}>
                      <FieldLabel>City</FieldLabel>
                      <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} autoComplete="address-level2" />
                    </div>
                    <div style={{ display: "grid", gap: 8 }}>
                      <FieldLabel>Ethnicity</FieldLabel>
                      <input placeholder="Ethnicity" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  {error && (
                    <div
                      style={{
                        color: THEME.danger,
                        fontSize: 13,
                        border: `1px solid rgba(255,107,107,0.28)`,
                        background: "rgba(255,107,107,0.06)",
                        padding: 10,
                        borderRadius: 12,
                      }}
                      role="alert"
                      aria-live="polite"
                    >
                      {error}
                    </div>
                  )}

                  <PrimaryButton onClick={startQuiz}>Enter the Archive</PrimaryButton>

                  <div style={{ color: THEME.textMuted, fontSize: 12, lineHeight: 1.6 }}>
                    We store the minimum needed to generate your match. This experience is informational and not medical, legal, or employment advice.
                  </div>
                </div>
              </div>

              {/* Right: credibility / what you get */}
              <div style={{ ...glassCard, padding: 20 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: THEME.textMuted, marginBottom: 10 }}>
                  What you’ll receive
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  <div style={bulletRow}>
                    <span style={bulletIcon}>①</span>
                    <div>
                      <div style={bulletTitle}>Primary / Secondary / Tertiary Code</div>
                      <div style={bulletDesc}>A ranked lens match (not a permanent label).</div>
                    </div>
                  </div>

                  <div style={bulletRow}>
                    <span style={bulletIcon}>②</span>
                    <div>
                      <div style={bulletTitle}>Why it matched</div>
                      <div style={bulletDesc}>A short explanation tied to your pattern signals.</div>
                    </div>
                  </div>

                  <div style={bulletRow}>
                    <span style={bulletIcon}>③</span>
                    <div>
                      <div style={bulletTitle}>Defining traits</div>
                      <div style={bulletDesc}>A clean, readable summary you can act on.</div>
                    </div>
                  </div>

                  <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "8px 0" }} />

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <SoftPill>Evidence-style output</SoftPill>
                    <SoftPill>Consistent scoring</SoftPill>
                    <SoftPill>Easy to explain</SoftPill>
                  </div>

                  <div style={{ marginTop: 8, padding: 14, borderRadius: 16, border: `1px solid ${THEME.softBorder}`, background: THEME.panelStrong }}>
                    <div style={{ color: THEME.textPrimary, fontWeight: 700, marginBottom: 6 }}>Built for teams (later)</div>
                    <div style={{ color: THEME.textSecondary, fontSize: 13, lineHeight: 1.6 }}>
                      This foundation can power team fit, role mapping, and customer resonance — using the same archetypal “code language.”
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: stack columns */}
              <style jsx>{`
                @media (max-width: 860px) {
                  div[style*="grid-template-columns: 1.1fr 0.9fr"] {
                    grid-template-columns: 1fr !important;
                  }
                }
              `}</style>
            </div>
          )}

          {/* QUIZ STEP */}
          {step === "quiz" && !loading && (
            <div style={{ ...glassCard, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
                <div style={{ color: THEME.textSecondary, fontSize: 13 }}>
                  Question <span style={{ color: THEME.textPrimary, fontWeight: 800 }}>{currentQuestionIndex + 1}</span> of{" "}
                  <span style={{ color: THEME.textPrimary, fontWeight: 800 }}>{QUIZ_QUESTIONS.length}</span>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ color: THEME.textMuted, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Lens calibration</span>
                  <span style={{ color: THEME.accent, fontWeight: 900 }}>{progress}%</span>
                </div>
              </div>

              {currentQuestionIndex === 9 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "12px 14px",
                    background: THEME.accentSoft,
                    borderRadius: 14,
                    marginBottom: 16,
                    border: `1px solid rgba(201,169,106,0.24)`,
                    color: THEME.textPrimary,
                    fontSize: 13,
                  }}
                >
                  ✨ You’re building a consistent signal. Keep going.
                </div>
              )}

              <h2 style={{ fontSize: 22, marginBottom: 16, lineHeight: 1.5, color: THEME.textPrimary, fontWeight: 800 }}>
                {QUIZ_QUESTIONS[currentQuestionIndex].question}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  return (
                    <button
                      key={index}
                      onClick={() => answerQuestion(index)}
                      disabled={selectedOption !== null}
                      style={{
                        padding: "16px 16px",
                        fontSize: 14,
                        background: isSelected ? "rgba(201, 169, 106, 0.14)" : "rgba(255,255,255,0.02)",
                        color: THEME.textPrimary,
                        border: isSelected ? `1px solid rgba(201,169,106,0.55)` : `1px solid ${THEME.softBorder}`,
                        borderRadius: 14,
                        cursor: selectedOption !== null ? "not-allowed" : "pointer",
                        textAlign: "left",
                        transition: "transform 0.12s ease, border-color 0.2s ease, background 0.2s ease",
                        fontWeight: 650,
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedOption === null) e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0px)";
                      }}
                    >
                      <span style={{ fontSize: 22, width: 28, textAlign: "center" }}>{option.emoji}</span>
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

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
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
                    fontWeight: 700,
                  }}
                >
                  ← Back
                </button>

                <div style={{ color: THEME.textMuted, fontSize: 12, display: "flex", alignItems: "center" }}>
                  Tip: answer how you <em>usually</em> are, not the “ideal” version.
                </div>
              </div>

              {error && (
                <div style={{ marginTop: 14, color: THEME.danger, fontSize: 13 }} role="alert" aria-live="polite">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* LOADING */}
          {step === "loading" && (
            <div
              style={{
                ...glassCard,
                padding: 26,
                textAlign: "center",
                animation: "pulse 2s ease infinite",
              }}
            >
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
              <div style={{ ...glassCard, padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div>
                  <div style={{ color: THEME.textPrimary, fontWeight: 900, fontSize: 16 }}>{result.userName}</div>
                  <div style={{ color: THEME.textMuted, fontSize: 12 }}>
                    {result.astrologyData.sunSign} • {result.astrologyData.element} • {result.astrologyData.modality}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <SoftPill>Primary + 2 matches</SoftPill>
                  <SoftPill>Explainable</SoftPill>
                </div>
              </div>

              {/* Primary Code */}
              <div
                style={{
                  padding: "34px 22px",
                  background: getCodeGradient(result.primary.code_name),
                  borderRadius: 22,
                  textAlign: "left",
                  boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
                  position: "relative",
                  overflow: "hidden",
                  animation: "scaleIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.12) 0%, transparent 45%), radial-gradient(circle at 90% 70%, rgba(0,0,0,0.25) 0%, transparent 55%)",
                    pointerEvents: "none",
                  }}
                />

                <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "160px 1fr", gap: 18, alignItems: "center" }}>
                  {/* Emblem */}
                  <div style={{ display: "grid", placeItems: "center" }}>
                    <div
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 20,
                        background: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.16)",
                        display: "grid",
                        placeItems: "center",
                        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                        position: "relative",
                      }}
                    >
                      <img
                        src={`/emblems/${normalizeKey(result.primary.code_name)} ${selectedEmblems.primary}.jpg`}
                        alt={`${result.primary.code_name} emblem`}
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: "contain",
                          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.35))",
                          animation: "float 3s ease-in-out infinite",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          opacity: 0.12,
                          fontFamily: DISPLAY_FONT,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#fff",
                          fontSize: 36,
                          userSelect: "none",
                        }}
                      >
                        {result.primary.code_name.slice(0, 1)}
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.9, letterSpacing: "0.22em", fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>
                      Your Primary Lens
                    </div>

                    <div
                      style={{
                        fontFamily: DISPLAY_FONT,
                        fontSize: 40,
                        margin: "10px 0 6px",
                        fontWeight: 900,
                        letterSpacing: "0.05em",
                        color: "#fff",
                        lineHeight: 1.1,
                      }}
                    >
                      {result.primary.code_name}
                    </div>

                    <div style={{ fontSize: 14, opacity: 0.95, fontWeight: 700, color: "#fff" }}>
                      {result.primary.full_name} • {result.primary.matchPercentage}% resonance
                    </div>

                    <div style={{ height: 10 }} />

                    <div style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.92, maxWidth: 560, color: "#fff" }}>{result.primary.description}</div>
                  </div>
                </div>

                <style jsx>{`
                  @media (max-width: 700px) {
                    div[style*="grid-template-columns: 160px 1fr"] {
                      grid-template-columns: 1fr !important;
                    }
                  }
                `}</style>
              </div>

              {/* Secondary & Tertiary */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <MiniCodeCard
                  label="Secondary"
                  codeName={result.secondary.code_name}
                  fullName={result.secondary.full_name}
                  match={result.secondary.matchPercentage}
                  emblemPick={selectedEmblems.secondary}
                />
                <MiniCodeCard
                  label="Tertiary"
                  codeName={result.tertiary.code_name}
                  fullName={result.tertiary.full_name}
                  match={result.tertiary.matchPercentage}
                  emblemPick={selectedEmblems.tertiary}
                />
              </div>

              {/* Explanation */}
              <div style={{ ...glassCard, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                  <div style={{ color: THEME.textPrimary, fontWeight: 900, fontSize: 16 }}>Why you resonate</div>
                  <div style={{ color: THEME.textMuted, fontSize: 12 }}>Explainable output</div>
                </div>
                <div style={{ lineHeight: 1.8, color: THEME.textSecondary, fontSize: 14 }}>{result.explanation}</div>
              </div>

              {/* Key Traits */}
              <div style={{ ...glassCard, padding: 20 }}>
                <div style={{ color: THEME.textPrimary, fontWeight: 900, fontSize: 16, marginBottom: 12 }}>Defining traits</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {result.keyTraits.map((trait, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 14,
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: 14,
                        border: `1px solid ${THEME.softBorder}`,
                        gap: 12,
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, marginBottom: 3, color: THEME.textPrimary, fontSize: 14 }}>{trait.trait}</div>
                        <div style={{ fontSize: 12, color: THEME.textSecondary, lineHeight: 1.4 }}>{trait.description}</div>
                      </div>
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 950,
                          color: trait.score >= 55 ? THEME.accent : "rgba(120,170,255,0.85)",
                          minWidth: 52,
                          textAlign: "right",
                          flex: "0 0 auto",
                        }}
                      >
                        {trait.score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restart */}
              <div style={{ display: "grid", gap: 10 }}>
                <PrimaryButton onClick={restart}>Discover Another Code</PrimaryButton>
                <div style={{ color: THEME.textMuted, fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
                  Your result is a lens match (a stable “lean”), not a daily mood. You can still explore — this just gives you a clearer starting point.
                </div>
              </div>

              <style jsx>{`
                @media (max-width: 860px) {
                  div[style*="grid-template-columns: 1fr 1fr"] {
                    grid-template-columns: 1fr !important;
                  }
                }
              `}</style>
            </div>
          )}
        </div>

        {/* Bottom small note */}
        <div style={{ textAlign: "center", color: THEME.textMuted, fontSize: 12 }}>
          © {new Date().getFullYear()} Avirage • Built to be explainable, not mystical.
        </div>
      </div>

      {/* Animations + focus styling */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.82;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </main>
  );
}

/* ============================
   MINI CARD
============================ */

function MiniCodeCard(props: { label: string; codeName: string; fullName: string; match: number; emblemPick: number }) {
  const { label, codeName, fullName, match, emblemPick } = props;

  return (
    <div style={{ ...glassCard, padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          border: `1px solid ${THEME.softBorder}`,
          background: "rgba(255,255,255,0.03)",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          flex: "0 0 auto",
        }}
      >
        <img
          src={`/emblems/${normalizeKey(codeName)} ${emblemPick}.jpg`}
          alt={`${codeName} emblem`}
          style={{ width: 44, height: 44, objectFit: "contain", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.2))" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: THEME.textMuted, letterSpacing: "0.14em", fontWeight: 800, textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 18, fontWeight: 950, color: THEME.textPrimary }}>{codeName}</div>
        <div style={{ fontSize: 12, color: THEME.textSecondary, lineHeight: 1.4 }}>{fullName}</div>
      </div>

      <div style={{ textAlign: "right", minWidth: 78 }}>
        <div style={{ fontSize: 12, color: THEME.textMuted }}>Match</div>
        <div style={{ fontSize: 18, fontWeight: 950, color: THEME.accent }}>{match}%</div>
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
  fontWeight: 900,
  display: "grid",
  placeItems: "center",
  flex: "0 0 auto",
};

const bulletTitle: React.CSSProperties = {
  color: THEME.textPrimary,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 2,
};

const bulletDesc: React.CSSProperties = {
  color: THEME.textSecondary,
  fontSize: 12,
  lineHeight: 1.6,
};
