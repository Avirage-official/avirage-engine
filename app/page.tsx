"use client";

import { useState, useEffect } from "react";

type Result = {
  primary: string;
  secondary: string;
  explanation: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function analyzeText() {
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data: Result = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  const theme = nightMode
    ? {
        bg: "#121212",
        card: "#1c1c1c",
        text: "#f1f1f1",
        subtext: "#a8a8a8",
        border: "#2a2a2a",
        button: "#f1f1f1",
        buttonText: "#121212",
      }
    : {
        bg: "#f4f1ec",
        card: "#faf8f4",
        text: "#1e1e1e",
        subtext: "#6f6f6f",
        border: "#e0dbd3",
        button: "#1e1e1e",
        buttonText: "#ffffff",
      };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: theme.bg,
        color: theme.text,
        padding: "80px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
        transition: "background-color 0.6s ease, color 0.6s ease",
      }}
    >
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease",
        }}
      >
        {/* MODE TOGGLE */}
        <div style={{ textAlign: "right", marginBottom: "24px" }}>
          <button
            onClick={() => setNightMode(!nightMode)}
            style={{
              fontSize: "13px",
              background: "none",
              border: "none",
              color: theme.subtext,
              cursor: "pointer",
            }}
          >
            {nightMode ? "Day mode" : "Evening mode"}
          </button>
        </div>

        {/* TITLE */}
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "46px",
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
        >
          Avirage
        </h1>

        <p
          style={{
            marginTop: "12px",
            fontSize: "18px",
            color: theme.subtext,
            maxWidth: "520px",
          }}
        >
          A cultural lens into how you live, create, and belong.
        </p>

        {/* MICRO COPY */}
        <p
          style={{
            marginTop: "28px",
            fontSize: "14px",
            color: theme.subtext,
            maxWidth: "420px",
          }}
        >
          This is not a test. It’s a moment of noticing.
        </p>

        {/* INVITATION */}
        <p
          style={{
            marginTop: "48px",
            fontStyle: "italic",
            color: theme.subtext,
            maxWidth: "520px",
          }}
        >
          There is no right or wrong answer.  
          Write as you would speak to yourself, unedited.
        </p>

        {/* INPUT CARD */}
        <div
          style={{
            marginTop: "32px",
            backgroundColor: theme.card,
            borderRadius: "18px",
            border: `1px solid ${theme.border}`,
            padding: "22px",
            transition: "background-color 0.6s ease",
          }}
        >
          <textarea
            rows={6}
            style={{
              width: "100%",
              fontSize: "16px",
              lineHeight: "1.7",
              border: "none",
              background: "transparent",
              color: theme.text,
              resize: "none",
              outline: "none",
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="I feel most myself when..."
          />

          <p
            style={{
              marginTop: "12px",
              fontSize: "13px",
              color: theme.subtext,
            }}
          >
            Take your time. There’s no rush here.
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={analyzeText}
          disabled={loading || !text}
          style={{
            marginTop: "28px",
            padding: "14px 30px",
            fontSize: "15px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: theme.button,
            color: theme.buttonText,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "Reflecting…" : "Reveal my cultural pattern"}
        </button>

        {/* RESULT */}
        {result && (
          <div
            style={{
              marginTop: "90px",
              paddingTop: "40px",
              borderTop: `1px solid ${theme.border}`,
              opacity: result ? 1 : 0,
              transform: result
                ? "translateY(0)"
                : "translateY(10px)",
              transition: "all 0.8s ease",
            }}
          >
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "30px",
              }}
            >
              {result.primary}
            </h2>

            <h3 style={{ color: theme.subtext, marginTop: "6px" }}>
              Secondary: {result.secondary}
            </h3>

            <p
              style={{
                marginTop: "24px",
                lineHeight: "1.8",
                maxWidth: "600px",
              }}
            >
              {result.explanation}
            </p>

            <p
              style={{
                marginTop: "32px",
                fontSize: "14px",
                color: theme.subtext,
                fontStyle: "italic",
              }}
            >
              You’re not becoming something new — you’re recognizing
              what’s already there.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
