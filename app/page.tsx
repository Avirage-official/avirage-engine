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

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data: Result = await response.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h1>Avirage – Cultural Personality Mapper</h1>

      <p>
        Describe how you like to live, create, or feel comfortable.
      </p>

      <textarea
        rows={6}
        style={{ width: "100%", padding: "10px" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="I enjoy slow mornings, making things carefully, cozy spaces..."
      />

      <br />
      <br />

      <button onClick={analyzeText} disabled={loading || !text}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Primary Code: {result.primary}</h2>
          <h3>Secondary Code: {result.secondary}</h3>
          <p>{result.explanation}</p>
        </div>
      )}
    </main>
  );
}
