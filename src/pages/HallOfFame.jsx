// src/pages/HallOfFame.jsx
import React, { useState } from "react";
import { Trophy } from "lucide-react";
import Tabs from "../components/HallOfFame/Tabs";
import Leaderboard from "../components/HallOfFame/Leaderboard";
import { members } from "../data/members";

const TABS = [
  { id: "github", label: "GitHub", emoji: "🔥" },
  { id: "leetcode", label: "LeetCode", emoji: "🧩" },
  { id: "chess", label: "Chess.com", emoji: "♟" },
  { id: "books", label: "Books", emoji: "📚" },
  { id: "duolingo", label: "Duolingo", emoji: "🦉" },
];

export default function HallOfFame() {
  const [activeTab, setActiveTab] = useState("github");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* subtle pixel-grid background texture */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
            <h1 className="font-mono text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 drop-shadow-[3px_3px_0_rgba(15,23,42,0.8)]">
              Hall of Fame
            </h1>
          </div>
          <p className="font-mono text-xs sm:text-sm text-blue-400 uppercase tracking-widest">
            Lumina Community Leaderboard
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 sm:mb-10">
          <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Leaderboard */}
        <Leaderboard activeTab={activeTab} members={members} />

        <p className="text-center font-mono text-[10px] sm:text-xs text-slate-600 mt-10">
          Live stats refresh whenever you switch tabs. Some public APIs may be
          rate-limited or occasionally unavailable — affected rows show{" "}
          <span className="text-slate-500">N/A</span> instead of breaking the page.
        </p>
      </div>
    </div>
  );
}
