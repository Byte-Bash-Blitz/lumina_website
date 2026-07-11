// src/components/HallOfFame/LeaderboardCard.jsx
import React from "react";
import { Loader2 } from "lucide-react";

const RANK_STYLES = {
  1: "text-yellow-300 border-yellow-400 shadow-[4px_4px_0_0_#78350f]",
  2: "text-slate-200 border-slate-300 shadow-[4px_4px_0_0_#334155]",
  3: "text-amber-500 border-amber-600 shadow-[4px_4px_0_0_#78350f]",
};

/**
 * Single leaderboard row.
 * value: number | null (null while loading, undefined-safe fallback rendered as "N/A")
 * error: boolean - true if the live fetch failed for this member
 */
export default function LeaderboardCard({
  rank,
  member,
  username,
  value,
  label,
  loading,
  error,
}) {
  const rankStyle = RANK_STYLES[rank] || "text-blue-300 border-blue-700";

  return (
    <div
      className={[
        "flex items-center gap-3 sm:gap-4 bg-slate-900/80 border-2 border-blue-950",
        "rounded-md px-3 sm:px-5 py-3 sm:py-4 transition-transform duration-150",
        "hover:translate-x-1 hover:border-blue-700",
      ].join(" ")}
    >
      {/* Rank */}
      <div
        className={[
          "flex items-center justify-center shrink-0",
          "w-9 h-9 sm:w-11 sm:h-11 rounded-md border-2 bg-slate-950 font-mono font-bold text-sm sm:text-lg",
          rankStyle,
        ].join(" ")}
      >
        {rank}
      </div>

      {/* Avatar */}
      <img
        src={member.avatar}
        alt={member.name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md border-2 border-blue-800 object-cover shrink-0 bg-slate-800"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            member.name
          )}&background=1e3a8a&color=fff&bold=true`;
        }}
      />

      {/* Name + username */}
      <div className="flex-1 min-w-0">
        <p className="font-mono font-bold text-white text-sm sm:text-base truncate">
          {member.name}
        </p>
        <p className="font-mono text-[11px] sm:text-xs text-blue-400 truncate">
          @{username}
        </p>
      </div>

      {/* Score */}
      <div className="flex flex-col items-end shrink-0 min-w-[64px] sm:min-w-[84px]">
        {loading ? (
          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 animate-spin" />
        ) : (
          <span
            className={[
              "font-mono font-extrabold text-lg sm:text-2xl leading-none",
              error ? "text-slate-500" : "text-yellow-300",
            ].join(" ")}
          >
            {error || value === null || value === undefined ? "N/A" : value}
          </span>
        )}
        <span className="font-mono text-[9px] sm:text-[10px] text-blue-500 uppercase tracking-widest mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}
