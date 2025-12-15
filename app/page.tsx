"use client";

import { useState } from "react";

type Result = {
  primary: string;
  secondary: string;
  explanation: string;
};

export default function Home() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    } catch (error) {
      console.error("Analysis failed", error);
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f1ec",
        color: "#1e1e1e",
        padding: "80px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      }}
    >
      <section style={{ maxWidth: "720px", margin: "0 auto" }}>
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
            color: "#6f6f6f",
            maxWidth: "520px",
          }}
        >
          A cultural lens into how you live, create, and belong.
        </p>

        {/* INVITATION */}
        <p
          style={{
            marginTop: "48px",
            fontStyle: "italic",
            color: "#6f6f6f",
            maxWidth: "520px",
          }}
        >
          There is no right or wrong answer. Write as you would speak to
          yourself.
        </p>

        {/* INPUT */}
        <textarea
          rows={6}
          style={{
            width: "100%",
            marginTop: "32px",
            padding: "20px",
            fontSize: "16px",
            lineHeight: "1.6",
            borderRadius: "14px",
            border: "1px solid #e0dbd3",
            backgroundColor: "#faf8f4",
            resize: "none",
            outline: "none",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I feel most myself when..."
        />

        {/* BUTTON */}
        <button
          onClick={analyzeText}
          disabled={loading || !text}
          style={{
            marginTop: "24px",
            padding: "14px 28px",
            fontSize: "15px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
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
              marginTop: "80px",
              paddingTop: "40px",
              borderTop: "1px solid #ddd6cc",
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

            <h3 style={{ color: "#6f6f6f", marginTop: "6px" }}>
              Secondary: {result.secondary}
            </h3>

            <p style={{ marginTop: "24px", lineHeight: "1.7" }}>
              {result.explanation}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
