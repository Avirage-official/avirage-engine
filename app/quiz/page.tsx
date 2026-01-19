"use client";

import Link from "next/link";
import { useState, CSSProperties } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS } from "@/lib/quizQuestions";

/* ============================
   TYPES
============================ */

interface AnalysisResult {
  userName: string;
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
  keyTraits: string[];
  astrologyData: {
    sunSign: string;
    element: string;
    modality: string;
  };
}

/* ============================
   MAIN COMPONENT
============================ */

export default function QuizPage() {
  // Form state
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [genderOther, setGenderOther] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState(""); // NEW: Optional birth time
  const [city, setCity] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [mbtiInput, setMbtiInput] = useState(""); // NEW: Optional MBTI

  // Quiz state
  const [step, setStep] = useState<"info" | "quiz" | "loading" | "result">("info");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gradientX = useTransform(mouseX, [0, window.innerWidth], [0, 100]);
  const gradientY = useTransform(mouseY, [0, window.innerHeight], [0, 100]);
  const gradientMesh = useTransform(
    [gradientX, gradientY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
       radial-gradient(circle at ${100 - (x as number)}% ${100 - (y as number)}%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
       linear-gradient(180deg, #000000 0%, #0a0a0a 100%)`
  );

  const total = QUIZ_QUESTIONS.length;
  const progress = step === "quiz" ? ((currentQuestionIndex + 1) / total) * 100 : 0;
  const resolvedBirthDate = birthDate || "";

  /* ============================
     HANDLERS
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
    console.log("=== QUIZ SUBMISSION STARTING ===");
    console.log("Total answers:", Object.keys(finalAnswers).length);

    setStep("loading");
    setError(null);

    try {
      const payload = {
        userName: name.trim(),
        gender: gender === "other" ? genderOther.trim() : gender,
        birthDate: resolvedBirthDate,
        birthTime: birthTime.trim() || undefined, // NEW: Optional
        city: city.trim(),
        ethnicity: ethnicity.trim(),
        answers: finalAnswers,
        mbti: mbtiInput.trim() || undefined, // NEW: Optional
      };

      console.log("Sending to API...");

      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("API Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(errorText || `Server error: ${res.status}`);
        }

        throw new Error(errorData.error || "Analysis failed");
      }

      const data = (await res.json()) as AnalysisResult;
      console.log("=== SUCCESS ===");
      console.log("Primary code:", data.primary?.code_name);

      setResult(data);
      setStep("result");

      try {
        sessionStorage.setItem("ethos:lastResult", JSON.stringify(data));
      } catch {
        console.warn("Could not save to sessionStorage");
      }
    } catch (e: any) {
      console.error("=== FAILED ===");
      console.error("Error:", e);
      setError(e?.message || "Something went wrong. Please try again.");
      setStep("quiz");
    }
  }

  function answer(optionIndex: number) {
    if (selectedOption !== null) {
      console.warn("Double-click prevented");
      return;
    }

    setSelectedOption(optionIndex);

    if (!QUIZ_QUESTIONS[currentQuestionIndex]) {
      console.error("Invalid question index:", currentQuestionIndex);
      setError("Something went wrong. Please refresh and try again.");
      return;
    }

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const next = { ...answers, [q.id]: optionIndex };
    setAnswers(next);

    const isLastQuestion = currentQuestionIndex >= total - 1;

    console.log(`Question ${currentQuestionIndex + 1}/${total} answered`, {
      questionId: q.id,
      isLastQuestion,
      totalAnswers: Object.keys(next).length,
    });

    window.setTimeout(() => {
      setSelectedOption(null);

      if (isLastQuestion) {
        console.log("🎯 Last question - submitting!");
        submit(next);
      } else {
        setCurrentQuestionIndex((i) => i + 1);
      }
    }, 200);
  }

  function resetAll() {
    setStep("info");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setError(null);
  }

  /* ============================
     RENDER
  ============================ */

  return (
    <div
      className="min-h-screen bg-black text-white overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* Animated gradient mesh background */}
      <motion.div className="fixed inset-0 -z-10" style={{ background: gradientMesh }} />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 -z-10 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} size={500} />
        <div className="absolute top-1/4 right-1/4">
          <FloatingOrb delay={5} size={400} />
        </div>
        <div className="absolute bottom-1/3 left-1/3">
          <FloatingOrb delay={10} size={450} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              ETHOS
            </span>
          </Link>

          {step === "quiz" && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-white/60">
                Question {currentQuestionIndex + 1} of {total}
              </div>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Error display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6"
              >
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl p-4">
                  <div className="text-sm font-bold text-red-300 mb-1">Error</div>
                  <div className="text-sm text-red-200/80">{error}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* INFO STEP */}
          <AnimatePresence mode="wait">
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TiltCard>
                  <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-10"
                    >
                      <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl mb-4">
                        <span className="text-xs font-bold text-white/80">STEP 1 OF 2</span>
                      </div>
                      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                        Let's map your code
                      </h1>
                      <p className="text-lg text-white/60">We use this to triangulate your behavioral patterns.</p>
                    </motion.div>

                    {/* Form */}
                    <div className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your first name"
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2">Gender</label>
                        <div className="grid grid-cols-3 gap-3">
                          {(["male", "female", "other"] as const).map((g) => (
                            <button
                              key={g}
                              onClick={() => setGender(g)}
                              className={`px-4 py-3 rounded-xl border transition ${
                                gender === g
                                  ? "border-violet-500 bg-violet-500/20 text-white"
                                  : "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
                              }`}
                            >
                              {g.charAt(0).toUpperCase() + g.slice(1)}
                            </button>
                          ))}
                        </div>
                        {gender === "other" && (
                          <input
                            type="text"
                            value={genderOther}
                            onChange={(e) => setGenderOther(e.target.value)}
                            placeholder="Please specify"
                            className="w-full mt-3 px-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                          />
                        )}
                      </div>

                      {/* Birthday */}
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2">Birthday</label>
                        <input
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                        />
                      </div>

                      {/* Birth Time (NEW - Optional) */}
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2">
                          Birth Time <span className="text-xs text-white/40">(optional — for more accurate astrology)</span>
                        </label>
                        <input
                          type="time"
                          value={birthTime}
                          onChange={(e) => setBirthTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Where do you live?"
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                        />
                      </div>

                      {/* Ethnicity */}
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2">Cultural Background</label>
                        <input
                          type="text"
                          value={ethnicity}
                          onChange={(e) => setEthnicity(e.target.value)}
                          placeholder="e.g., Chinese-American, Nigerian, Mixed"
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                        />
                      </div>

                      {/* MBTI (NEW - Optional) */}
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2">
                          MBTI Type{" "}
                          <span className="text-xs text-white/40">
                            (optional — e.g., INTJ, ENFP. Don't know?{" "}
                            <a
                              href="https://www.16personalities.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-400 hover:text-violet-300 underline"
                            >
                              Take this free test
                            </a>
                            )
                          </span>
                        </label>
                        <input
                          type="text"
                          value={mbtiInput}
                          onChange={(e) => setMbtiInput(e.target.value.toUpperCase())}
                          placeholder="e.g., INTJ"
                          maxLength={4}
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition uppercase"
                        />
                      </div>

                      {/* Start button */}
                      <button
                        onClick={start}
                        className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-lg shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-all active:scale-[0.99]"
                      >
                        Begin Questions →
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QUIZ STEP */}
          <AnimatePresence mode="wait">
            {step === "quiz" && QUIZ_QUESTIONS[currentQuestionIndex] && (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard>
                  <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl">
                    {/* Question */}
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 leading-relaxed">
                      {QUIZ_QUESTIONS[currentQuestionIndex].question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-4 mb-8">
                      {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => answer(idx)}
                          disabled={selectedOption !== null}
                          whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                          whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
                          className={`w-full p-6 rounded-2xl border text-left transition-all ${
                            selectedOption === idx
                              ? "border-violet-500 bg-violet-500/20 scale-[1.02]"
                              : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {opt.emoji && <span className="text-3xl">{opt.emoji}</span>}
                            <span className="text-lg font-medium">{opt.text}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Back button */}
                    {currentQuestionIndex > 0 && (
                      <button
                        onClick={goBack}
                        disabled={selectedOption !== null}
                        className="text-white/60 hover:text-white transition text-sm font-medium"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOADING STEP */}
          <AnimatePresence mode="wait">
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-6 border-4 border-violet-500/30 border-t-violet-500 rounded-full"
                  />
                  <h2 className="text-2xl font-bold mb-2">Analyzing patterns...</h2>
                  <p className="text-white/60">Cross-referencing frameworks</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RESULT STEP */}
          <AnimatePresence mode="wait">
            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl sm:text-5xl font-black mb-4">
                    Your Code: <span className="text-violet-400">{result.primary.full_name}</span>
                  </h1>
                  <p className="text-lg text-white/60 mb-8">{result.explanation}</p>

                  <div className="flex justify-center gap-4">
                    <Link
                      href={`/codes/${result.primary.code_name}`}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold shadow-lg hover:shadow-xl transition"
                    >
                      Explore Your Code
                    </Link>
                    <button
                      onClick={resetAll}
                      className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 transition"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============================
   HELPER COMPONENTS
============================ */

function TiltCard({ children }: { children: React.ReactNode }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setRotateX((y - 0.5) * 10);
        setRotateY((x - 0.5) * -10);
      }}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
      }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s",
      }}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({ delay, size }: { delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
      }}
      animate={{
        x: [0, 100, 0, -100, 0],
        y: [0, -100, 0, 100, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}