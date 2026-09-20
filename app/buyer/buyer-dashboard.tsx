"use client";

import { useState } from "react";

export default function BuyerDashboard({
  licenseId,
}: {
  licenseId: string;
}) {
  const [assistantName, setAssistantName] = useState("NEON");
  const [personality, setPersonality] = useState("Friendly & Helpful");
  const [voice, setVoice] = useState("Female");
  const [theme, setTheme] = useState("Neon Blue/Cyan");
  const [language, setLanguage] = useState("Hinglish");
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");

  async function generatePrompt() {
    setMessage("Generating...");

    const response = await fetch("/api/buyer/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assistantName,
        personality,
        voice,
        theme,
        language,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Unable to generate prompt.");
      return;
    }

    setPrompt(data.prompt);
    setMessage("Personalized Master Prompt ready.");
  }

  async function copyPrompt() {
    if (!prompt) return;

    await navigator.clipboard.writeText(prompt);
    setMessage("Copied to clipboard.");
  }

  return (
    <main className="min-h-screen bg-[#02070b] px-5 py-8 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs tracking-[0.3em] text-cyan-400">
          NEON LABS
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Buyer Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Active license: {licenseId}
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-cyan-400/15 bg-white/[0.03] p-6">
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">
              Assistant Name
            </span>
            <input
              value={assistantName}
              onChange={(e) => setAssistantName(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3"
            />
          </label>

          {[
            [
              "Personality",
              personality,
              setPersonality,
              [
                "Friendly & Helpful",
                "Professional & Calm",
                "Witty & Playful",
                "Minimal & Direct",
              ],
            ],
            [
              "Voice Preference",
              voice,
              setVoice,
              ["Female", "Male", "No preference"],
            ],
            [
              "Theme",
              theme,
              setTheme,
              [
                "Neon Blue/Cyan",
                "Purple/Blue",
                "Red/Black",
                "Green/Black",
                "Minimal Dark",
              ],
            ],
            [
              "Conversation Language",
              language,
              setLanguage,
              ["Hinglish", "Hindi", "English"],
            ],
          ].map(([label, value, setter, options]) => (
            <label className="grid gap-2" key={String(label)}>
              <span className="text-sm text-slate-300">
                {String(label)}
              </span>

              <select
                value={String(value)}
                onChange={(e) =>
                  (setter as (v: string) => void)(e.target.value)
                }
                className="rounded-xl border border-white/10 bg-[#071016] px-4 py-3"
              >
                {(options as string[]).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}

          <button
            onClick={generatePrompt}
            className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-black"
          >
            Generate Personalized Master Prompt
          </button>

          {prompt && (
            <>
              <textarea
                value={prompt}
                readOnly
                className="min-h-80 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200"
              />

              <button
                onClick={copyPrompt}
                className="rounded-xl border border-cyan-400/30 px-5 py-3 font-semibold text-cyan-300"
              >
                Copy Personalized Master Prompt
              </button>
            </>
          )}

          {message && (
            <p className="text-sm text-cyan-300">{message}</p>
          )}
        </div>
      </div>
    </main>
  );
}
