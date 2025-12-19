"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";

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

// Emblem-based color palettes (from your color specifications)
const CODE_COLORS: Record<string, string> = {
  // Fusion Codes
  Enzuka: "linear-gradient(135deg, #CD853F 0%, #8B0000 100%)", // Deep ochre + iron red
  Siyuané: "linear-gradient(135deg, #00A86B 0%, #FFFFF0 100%)", // Jade green + warm ivory
  Namséa: "linear-gradient(135deg, #4682B4 0%, #F5F5DC 100%)", // River blue + soft pearl
  Karayni: "linear-gradient(135deg, #228B22 0%, #FFD700 100%)", // Earth green + sun gold
  Siljoa: "linear-gradient(135deg, #708090 0%, #48D1CC 100%)", // Ice gray + aurora teal
  Yatevar: "linear-gradient(135deg, #B22222 0%, #000000 100%)", // Volcanic red + obsidian black
  Wóhaka: "linear-gradient(135deg, #87CEEB 0%, #F5F5F5 100%)", // Sky blue + bone white
  
  // Standalone Codes
  Jaejin: "linear-gradient(135deg, #778899 0%, #DC143C 100%)", // Steel gray + ember red
  Tjukari: "linear-gradient(135deg, #A0522D 0%, #36454F 100%)", // Red earth + charcoal
  Kinmora: "linear-gradient(135deg, #FFD700 0%, #191970 100%)", // Solar gold + deep indigo
  Skénari: "linear-gradient(135deg, #228B22 0%, #C0C0C0 100%)", // Forest green + dawn silver
  Ashkara: "linear-gradient(135deg, #FF8C00 0%, #FFFFFF 100%)", // Sacred fire orange + white
  Aléthir: "linear-gradient(135deg, #4169E1 0%, #87CEEB 100%)", // Royal blue + light blue
  Káyori: "linear-gradient(135deg, #DAA520 0%, #000080 100%)", // Burnished gold + indigo-black
  Sahén: "linear-gradient(135deg, #F5DEB3 0%, #8B7355 100%)", // Sand beige + dusk brown
  Khoruun: "linear-gradient(135deg, #CD7F32 0%, #808080 100%)", // Steppe bronze + wind gray
  Lhumir: "linear-gradient(135deg, #F5F5F5 0%, #87CEEB 100%)", // Mist white + soft sky blue
  Rénara: "linear-gradient(135deg, #7CFC00 0%, #FFD700 100%)", // Muted jade + pale gold
  
  // Placeholder for any missing codes
  Khoisan: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
  Shokunin: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
};

// Emblem counts (how many variations each code has)
const CODE_EMBLEM_COUNTS: Record<string, number> = {
  "Aléthir": 5,
  "Ashkara": 4,
  "Enzuka": 3,
  "Jaejin": 3,
  "Karayni": 5,
  "Káyori": 4,
  "Khoisan": 4,
  "Khoruun": 4,
  "Kinmora": 3,
  "Lhumir": 4,
  "Namséa": 4,
  "Rénara": 4,
  "Sahén": 3,
  "Shokunin": 5,
  "Siljoa": 4,
  "Siyuané": 4,
  "Skénari": 3,
  "Tjukari": 4,
  "Wóhaka": 3,
  "Yatevar": 3,
};

export default function Home() {
  // Step control
  const [step, setStep] = useState<"info" | "quiz" | "result" | "loading">("info");
  
  // Basic info
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [genderOther, setGenderOther] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Result
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Emblem selection (randomized on result)
  const [selectedEmblems, setSelectedEmblems] = useState<{
    primary: number;
    secondary: number;
    tertiary: number;
  }>({ primary: 1, secondary: 1, tertiary: 1 });

  // Handle basic info submission
  function startQuiz() {
    if (!name.trim() || !gender || !birthDate || !city.trim() || !ethnicity.trim()) {
      setError("Please fill in all fields");
      return;
    }
    
    if (gender === "other" && !genderOther.trim()) {
      setError("Please specify your gender");
      return;
    }
    
    setError(null);
    setStep("quiz");
  }

  // Handle quiz answer with animation
  function answerQuestion(optionIndex: number) {
    setSelectedOption(optionIndex);
    
    // Wait for animation before proceeding
    setTimeout(() => {
      const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
      
      // Save answer
      const newAnswers = {
        ...quizAnswers,
        [currentQuestion.id]: optionIndex,
      };
      setQuizAnswers(newAnswers);
      setSelectedOption(null);

      // Move to next question or submit
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz complete - submit
        submitQuiz(newAnswers);
      }
    }, 400);
  }

  // Go back to previous question
  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  // Submit quiz
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
      
      // Dramatic pause before reveal
      setTimeout(() => {
        setResult(data);
        
        // Randomly select emblems for each code
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

  // Restart quiz
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

  return (
    <main style={{
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: step === "info" 
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : step === "quiz"
        ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        : step === "loading"
        ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        : "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      transition: "background 0.8s ease",
    }}>
      <div style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "40px 20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        
        {/* STEP 1: BASIC INFO */}
        {step === "info" && (
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "50px 40px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            animation: "fadeInUp 0.6s ease",
          }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1 style={{
                fontSize: "3rem",
                marginBottom: "15px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "800",
              }}>
                Avirage
              </h1>
              <p style={{ color: "#666", fontSize: "18px", lineHeight: "1.6" }}>
                Discover your Cultural Code — a personality archetype<br />rooted in global wisdom traditions
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Name */}
              <div>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "#333" }}>
                  What's your name? <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    transition: "all 0.3s",
                    outline: "none",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
              </div>

              {/* Gender */}
              <div>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "#333" }}>
                  Gender <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    if (e.target.value !== "other") setGenderOther("");
                  }}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    transition: "all 0.3s",
                    outline: "none",
                    backgroundColor: "#fff",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#667eea"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e0e0e0"}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
                
                {gender === "other" && (
                  <input
                    type="text"
                    value={genderOther}
                    onChange={(e) => setGenderOther(e.target.value)}
                    placeholder="Please specify"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "16px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "12px",
                      marginTop: "12px",
                      outline: "none",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                  />
                )}
              </div>

              {/* Birth Date */}
              <div>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "#333" }}>
                  Birth Date <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    transition: "all 0.3s",
                    outline: "none",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
                <p style={{ fontSize: "13px", color: "#999", marginTop: "6px" }}>
                  ✨ Used to calculate your astrological influences
                </p>
              </div>

              {/* City */}
              <div>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "#333" }}>
                  City <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Brisbane"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    transition: "all 0.3s",
                    outline: "none",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
              </div>

              {/* Ethnicity */}
              <div>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "#333" }}>
                  Ethnicity <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="text"
                  value={ethnicity}
                  onChange={(e) => setEthnicity(e.target.value)}
                  placeholder="e.g. Chinese, African American, Mixed"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    transition: "all 0.3s",
                    outline: "none",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
              </div>

              {error && (
                <div style={{
                  padding: "14px",
                  backgroundColor: "#fee",
                  color: "#c00",
                  borderRadius: "12px",
                  border: "1px solid #fcc",
                }}>
                  {error}
                </div>
              )}

              <button
                onClick={startQuiz}
                style={{
                  padding: "18px",
                  fontSize: "18px",
                  fontWeight: "600",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  marginTop: "10px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Begin Your Journey →
              </button>
            </div>

            <p style={{
              textAlign: "center",
              color: "#999",
              fontSize: "13px",
              marginTop: "30px",
            }}>
              ⏱️ Takes about 10 minutes • 🔒 Your data is private
            </p>
          </div>
        )}

        {/* STEP 2: QUIZ */}
        {step === "quiz" && !loading && (
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.5s ease",
          }}>
            {/* Progress bar */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "14px", color: "#666", fontWeight: "500" }}>
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {progress}%
                </span>
              </div>
              <div style={{
                height: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
              }}>
                <div style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
                  width: `${progress}%`,
                  transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: "10px",
                }} />
              </div>
            </div>

            {/* Motivational text */}
            {currentQuestionIndex === 9 && (
              <div style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#fff3e0",
                borderRadius: "12px",
                marginBottom: "30px",
                border: "2px solid #ffe0b2",
              }}>
                <span style={{ fontSize: "20px", marginRight: "8px" }}>🌟</span>
                <span style={{ color: "#e65100", fontWeight: "600" }}>
                  Halfway there! Your code is taking shape...
                </span>
              </div>
            )}

            {/* Question */}
            <div style={{ marginBottom: "35px" }}>
              <h2 style={{
                fontSize: "1.8rem",
                marginBottom: "35px",
                lineHeight: "1.4",
                color: "#2c3e50",
                fontWeight: "700",
              }}>
                {QUIZ_QUESTIONS[currentQuestionIndex].question}
              </h2>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    disabled={selectedOption !== null}
                    style={{
                      padding: "22px 24px",
                      fontSize: "16px",
                      backgroundColor: selectedOption === index ? "#f093fb" : "#fff",
                      color: selectedOption === index ? "#fff" : "#333",
                      border: selectedOption === index ? "2px solid #f093fb" : "2px solid #e0e0e0",
                      borderRadius: "16px",
                      cursor: selectedOption !== null ? "not-allowed" : "pointer",
                      textAlign: "left",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: selectedOption === index ? "scale(0.98)" : "scale(1)",
                      fontWeight: "500",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedOption === null) {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.borderColor = "#f093fb";
                        e.currentTarget.style.transform = "translateX(8px)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(240, 147, 251, 0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedOption === null) {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.borderColor = "#e0e0e0";
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    <span style={{ fontSize: "28px", marginRight: "14px" }}>{option.emoji}</span>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Back button */}
            {currentQuestionIndex > 0 && (
              <button
                onClick={previousQuestion}
                disabled={selectedOption !== null}
                style={{
                  padding: "12px 28px",
                  fontSize: "15px",
                  backgroundColor: "transparent",
                  color: "#666",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  cursor: selectedOption !== null ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (selectedOption === null) {
                    e.currentTarget.style.borderColor = "#999";
                    e.currentTarget.style.color = "#333";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOption === null) {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.color = "#666";
                  }
                }}
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {/* LOADING STATE */}
        {step === "loading" && (
          <div style={{
            textAlign: "center",
            padding: "80px 40px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            animation: "pulse 2s ease infinite",
          }}>
            <div style={{
              fontSize: "64px",
              marginBottom: "30px",
              animation: "float 3s ease-in-out infinite",
            }}>
              ✨
            </div>
            <h2 style={{
              fontSize: "2rem",
              marginBottom: "15px",
              color: "#2c3e50",
              fontWeight: "700",
            }}>
              Discovering Your Cultural Code
            </h2>
            <p style={{ color: "#7f8c8d", fontSize: "16px", lineHeight: "1.6" }}>
              Mapping your traits across 20 cultural archetypes...<br />
              Analyzing patterns from global wisdom traditions...
            </p>
          </div>
        )}

        {/* STEP 3: RESULT */}
        {step === "result" && result && (
          <div style={{ animation: "fadeInUp 0.8s ease" }}>
            {/* Header */}
            <div style={{
              marginBottom: "30px",
              textAlign: "center",
              color: "#fff",
            }}>
              <p style={{ fontSize: "18px", marginBottom: "8px", opacity: 0.9 }}>
                Welcome, {result.userName}
              </p>
              <p style={{ fontSize: "14px", opacity: 0.8 }}>
                {result.astrologyData.sunSign} Sun • {result.astrologyData.element} • {result.astrologyData.modality}
              </p>
            </div>

            {/* Primary Code - HERO */}
            <div style={{
              padding: "60px 40px",
              background: CODE_COLORS[result.primary.code_name] || "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
              color: "#fff",
              borderRadius: "24px",
              marginBottom: "20px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
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
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              
              {/* Emblem Display */}
              <div style={{ marginBottom: "20px" }}>
                <img
                  src={`/emblems/${result.primary.code_name} ${selectedEmblems.primary}.jpg`}
                  alt={`${result.primary.code_name} emblem`}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "contain",
                    margin: "0 auto",
                    display: "block",
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
                    animation: "float 3s ease-in-out infinite",
                  }}
                  onError={(e) => {
                    // Hide image if it fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              
              <div style={{
                fontSize: "14px",
                opacity: 0.9,
                marginBottom: "15px",
                letterSpacing: "2px",
                fontWeight: "600",
              }}>
                YOUR CULTURAL CODE
              </div>
              <h1 style={{
                fontSize: "4rem",
                margin: "20px 0",
                fontWeight: "900",
                textShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}>
                {result.primary.code_name}
              </h1>
              <div style={{
                fontSize: "20px",
                opacity: 0.95,
                marginBottom: "25px",
                fontWeight: "500",
              }}>
                {result.primary.full_name} • {result.primary.matchPercentage}% resonance
              </div>
              <p style={{
                fontSize: "17px",
                lineHeight: "1.7",
                opacity: 0.95,
                maxWidth: "500px",
                margin: "0 auto",
              }}>
                {result.primary.description}
              </p>
            </div>

            {/* Secondary & Tertiary */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "30px",
            }}>
              <div style={{
                padding: "30px 25px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                borderLeft: `5px solid transparent`,
                borderImage: CODE_COLORS[result.secondary.code_name] || "#95a5a6",
                borderImageSlice: 1,
              }}>
                {/* Small emblem */}
                <img
                  src={`/emblems/${result.secondary.code_name} ${selectedEmblems.secondary}.jpg`}
                  alt={`${result.secondary.code_name} emblem`}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    marginBottom: "15px",
                    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                
                <div style={{
                  fontSize: "11px",
                  color: "#999",
                  marginBottom: "10px",
                  letterSpacing: "1.5px",
                  fontWeight: "600",
                }}>
                  SECONDARY
                </div>
                <h3 style={{
                  fontSize: "1.6rem",
                  margin: "8px 0 6px 0",
                  color: "#2c3e50",
                  fontWeight: "700",
                }}>
                  {result.secondary.code_name}
                </h3>
                <div style={{ fontSize: "14px", color: "#7f8c8d", fontWeight: "500" }}>
                  {result.secondary.full_name}
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "#2c3e50",
                  marginTop: "8px",
                  fontWeight: "700",
                }}>
                  {result.secondary.matchPercentage}% match
                </div>
              </div>

              <div style={{
                padding: "30px 25px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                borderLeft: `5px solid transparent`,
                borderImage: CODE_COLORS[result.tertiary.code_name] || "#95a5a6",
                borderImageSlice: 1,
              }}>
                {/* Small emblem */}
                <img
                  src={`/emblems/${result.tertiary.code_name} ${selectedEmblems.tertiary}.jpg`}
                  alt={`${result.tertiary.code_name} emblem`}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    marginBottom: "15px",
                    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                
                <div style={{
                  fontSize: "11px",
                  color: "#999",
                  marginBottom: "10px",
                  letterSpacing: "1.5px",
                  fontWeight: "600",
                }}>
                  TERTIARY
                </div>
                <h3 style={{
                  fontSize: "1.6rem",
                  margin: "8px 0 6px 0",
                  color: "#2c3e50",
                  fontWeight: "700",
                }}>
                  {result.tertiary.code_name}
                </h3>
                <div style={{ fontSize: "14px", color: "#7f8c8d", fontWeight: "500" }}>
                  {result.tertiary.full_name}
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "#2c3e50",
                  marginTop: "8px",
                  fontWeight: "700",
                }}>
                  {result.tertiary.matchPercentage}% match
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div style={{
              padding: "35px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}>
              <h3 style={{
                fontSize: "1.3rem",
                marginBottom: "18px",
                color: "#2c3e50",
                fontWeight: "700",
              }}>
                Why You Resonate
              </h3>
              <p style={{
                lineHeight: "1.8",
                color: "#34495e",
                fontSize: "16px",
              }}>
                {result.explanation}
              </p>
            </div>

            {/* Key Traits */}
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "35px",
              marginBottom: "40px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}>
              <h3 style={{
                fontSize: "1.3rem",
                marginBottom: "25px",
                color: "#2c3e50",
                fontWeight: "700",
              }}>
                Your Defining Traits
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {result.keyTraits.map((trait, index) => (
                  <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "14px",
                    border: "2px solid #e9ecef",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
                  >
                    <div>
                      <div style={{
                        fontWeight: "600",
                        marginBottom: "5px",
                        color: "#2c3e50",
                        fontSize: "16px",
                      }}>
                        {trait.trait}
                      </div>
                      <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
                        {trait.description}
                      </div>
                    </div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      color: trait.score > 50 ? "#27ae60" : "#3498db",
                      minWidth: "60px",
                      textAlign: "right",
                    }}>
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
                  padding: "16px 40px",
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "#2c3e50",
                  border: "2px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Discover Another Code
              </button>
            </div>
          </div>
        )}

        {error && step === "quiz" && (
          <div style={{
            marginTop: "20px",
            padding: "18px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
            color: "#e74c3c",
            border: "2px solid #ffcdd2",
            fontWeight: "500",
          }}>
            {error}
          </div>
        )}
      </div>

      {/* Global Animations */}
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
