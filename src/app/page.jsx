"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [tone, setTone] = useState("Motivational");
  const [loading, setLoading] = useState(false);

  const generateQuote = async () => {
    setLoading(true);
    setQuote("");

    const res = await fetch("/api/generateQuote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tone }),
    });

    const data = await res.json();
    setQuote(data.quote);
    setLoading(false);
  };

  return (
    <main className="container">
      <h1>AI Quote Generator</h1>

      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option>Motivational</option>
        <option>Funny</option>
        <option>Inspirational</option>
        <option>Dark</option>
        <option>Fantasy</option>
      </select>

      <button onClick={generateQuote} disabled={loading}>
        {loading ? "Generating..." : "Generate Quote"}
      </button>

      <textarea
        placeholder="Your quote will appear here..."
        value={quote}
        readOnly
      />
    </main>
  );
}
