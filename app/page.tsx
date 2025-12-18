"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";

interface AnalysisResult {
  primary: {
    name: string;
    culture: string;
    essence: string;
    matchPercentage: number;
  };
  secondary: {
    name: string;
    culture: string;
    essence: string;
    matchPercentage: number;
  };
  tertiary: {
    name: string;
    culture: string;
    essence: string;
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

export default function Home() {
  // Step control
  const [step, setStep] = useState<"info" | "quiz" | "result">("info");
  
  // Basic info
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  
  // Result
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle basic info submission
  function startQuiz() {
    if (!name.trim() || !birthDate) {
      setError("Please enter your name and birth date");
      return;
    }
    setError(null);
    setStep("quiz");
  }

  // Handle quiz answer
  function answerQuestion(optionIndex: number) {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    
    // Save answer
    setQuizAnswers({
      ...quizAnswers,
      [currentQuestion.id]: optionIndex,
    });

    // Move to next question or submit
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete - submit
      submitQuiz({
        ...quizAnswers,
        [currentQuestion.id]: optionIndex,
      });
    }
  }

  // Go back to previous question
  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  // Submit quiz
  async function submitQuiz(finalAnswers: Record<string, number>) {
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
      setResult(data);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Restart quiz
  function restart() {
    setStep("info");
    setName("");
    setBirthDate("");
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setResult(null);
    setError(null);
  }

  const progress = Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <main style={{ padding: "20px", maxWidth: "700px", margin: "auto", fontFamily: "system-ui", minHeight: "100vh" }}>
      {/* STEP 1: BASIC INFO */}
      {step === "info" && (
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Avirage</h1>
          <p style={{ color: "#666", marginBottom: "40px" }}>
            Discover your Cultural Code through personality + astrology
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                }}
              />
              <p style={{ fontSize: "14px", color: "#888", marginTop: "5px" }}>
                We'll use this to calculate your astrological profile
              </p>
            </div>

            {error && (
              <div style={{ padding: "12px", backgroundColor: "#fee", color: "#c00", borderRadius: "6px" }}>
                {error}
              </div>
            )}

            <button
              onClick={startQuiz}
              style={{
                padding: "16px",
                fontSize: "18px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Start Quiz →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: QUIZ */}
      {step === "quiz" && !loading && (
        <div>
          {/* Progress bar */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", color: "#666" }}>
                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>{progress}%</span>
            </div>
            <div style={{ height: "8px", backgroundColor: "#eee", borderRadius: "4px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#000",
                  width: `${progress}%`,
                  transition: "width 0.3s",
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "30px", lineHeight: "1.3" }}>
              {QUIZ_QUESTIONS[currentQuestionIndex].question}
            </h2>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answerQuestion(index)}
                  style={{
                    padding: "20px",
                    fontSize: "16px",
                    backgroundColor: "#f9f9f9",
                    border: "2px solid #ddd",
                    borderRadius: "12px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                    e.currentTarget.style.borderColor = "#999";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9f9f9";
                    e.currentTarget.style.borderColor = "#ddd";
                  }}
                >
                  <span style={{ fontSize: "24px", marginRight: "12px" }}>{option.emoji}</span>
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          {/* Back button */}
          {currentQuestionIndex > 0 && (
            <button
              onClick={previousQuestion}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#fff",
                color: "#666",
                border: "2px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>✨</div>
          <h2>Analyzing your Cultural Code...</h2>
          <p style={{ color: "#666" }}>Mapping your traits across 20 cultural patterns</p>
        </div>
      )}

      {/* STEP 3: RESULT */}
      {step === "result" && result && (
        <div>
          {/* Header */}
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <p style={{ color: "#888", marginBottom: "5px" }}>Hello, {result.userName}</p>
            <p style={{ fontSize: "14px", color: "#aaa" }}>
              {result.astrologyData.sunSign} Sun · {result.astrologyData.element} · {result.astrologyData.modality}
            </p>
          </div>

          {/* Primary Code */}
          <div
            style={{
              padding: "40px",
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "16px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "14px", opacity: 0.7, marginBottom: "10px" }}>
              YOUR CULTURAL CODE
            </div>
            <h1 style={{ fontSize: "3.5rem", margin: "15px 0" }}>{result.primary.name}</h1>
            <div style={{ fontSize: "18px", opacity: 0.8, marginBottom: "20px" }}>
              {result.primary.culture} · {result.primary.matchPercentage}% match
            </div>
            <p style={{ fontSize: "16px", lineHeight: "1.6", opacity: 0.9 }}>
              {result.primary.essence}
            </p>
          </div>

          {/* Secondary & Tertiary */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "30px" }}>
            <div style={{ padding: "25px", backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>SECONDARY</div>
              <h3 style={{ fontSize: "1.8rem", margin: "5px 0" }}>{result.secondary.name}</h3>
              <div style={{ fontSize: "14px", color: "#666" }}>
                {result.secondary.culture} · {result.secondary.matchPercentage}%
              </div>
            </div>

            <div style={{ padding: "25px", backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>TERTIARY</div>
              <h3 style={{ fontSize: "1.8rem", margin: "5px 0" }}>{result.tertiary.name}</h3>
              <div style={{ fontSize: "14px", color: "#666" }}>
                {result.tertiary.culture} · {result.tertiary.matchPercentage}%
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div
            style={{
              padding: "25px",
              backgroundColor: "#f0f0f0",
              borderRadius: "12px",
              marginBottom: "30px",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", marginBottom: "12px" }}>Why You Match</h3>
            <p style={{ lineHeight: "1.6", color: "#333" }}>{result.explanation}</p>
          </div>

          {/* Key Traits */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Your Defining Traits</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {result.keyTraits.map((trait, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "500", marginBottom: "4px" }}>{trait.trait}</div>
                    <div style={{ fontSize: "14px", color: "#666" }}>{trait.description}</div>
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: trait.score > 50 ? "#4CAF50" : "#2196F3",
                    }}
                  >
                    {trait.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restart button */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={restart}
              style={{
                padding: "12px 32px",
                fontSize: "16px",
                backgroundColor: "#fff",
                color: "#000",
                border: "2px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      )}

      {error && step === "quiz" && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#fee",
            borderRadius: "8px",
            color: "#c00",
          }}
        >
          {error}
        </div>
      )}
    </main>
  );
}
