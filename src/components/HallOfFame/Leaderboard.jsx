// src/components/HallOfFame/Leaderboard.jsx
import React, { useEffect, useState } from "react";
import LeaderboardCard from "./LeaderboardCard";
import { AlertTriangle } from "lucide-react";

/**
 * ---- Live data fetchers ----
 * Every fetcher returns a Number, or throws — the caller catches per-member
 * so one failed API call never breaks the whole leaderboard.
 */

// GitHub: compute the current contribution streak from the public
// jogruber contributions API (no auth / no rate-limit key required).
async function fetchGithubStreak(username) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
  );
  if (!res.ok) throw new Error("GitHub API error");
  const data = await res.json();
  const days = data?.contributions;
  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("No contribution data");
  }

  // Walk backwards from the most recent day, counting consecutive
  // days with at least one contribution.
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const count = days[i]?.count ?? 0;
    if (count > 0) {
      streak++;
    } else if (i === days.length - 1) {
      // Today might not have contributions yet — skip it, don't break yet.
      continue;
    } else {
      break;
    }
  }
  return streak;
}

// LeetCode: Total problems solved (via your Vercel API)
async function fetchLeetcodeSolved(username) {
  console.log("Fetching:", username);

  const res = await fetch(
    `https://leetcode-api-jade.vercel.app/api/leetcode?username=${encodeURIComponent(username)}`
  );

  const data = await res.json();

  console.log(data);

  return data.totalSolved ?? 0;
}
// Chess.com: Rapid rating via the official public Chess.com API.
async function fetchChessRapidRating(username) {
  const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
  if (!res.ok) throw new Error("Chess.com API error");
  const data = await res.json();
  const rating = data?.chess_rapid?.last?.rating;
  if (typeof rating !== "number") throw new Error("No rapid rating found");
  return rating;
}

const TAB_CONFIG = {
  github: {
    label: "STREAK",
    usernameKey: "github",
    getValue: (member) => fetchGithubStreak(member.github),
  },
  leetcode: {
  label: "PROBLEMS",
  usernameKey: "leetcode",
  getValue: (member) => fetchLeetcodeSolved(member.leetcode),
},

  chess: {
    label: "RATING",
    usernameKey: "chess",
    getValue: (member) => fetchChessRapidRating(member.chess),
  },
  books: {
    label: "BOOKS",
    usernameKey: "github", // books has no separate handle, show github handle as identity
    getValue: (member) => Promise.resolve(member.books ?? 0),
  },
  duolingo: {
    label: "DAY STREAK",
    usernameKey: "duolingo",
    getValue: (member) => Promise.resolve(member.duolingoStreak ?? 0),
  },
};

export default function Leaderboard({ activeTab, members }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fatalError, setFatalError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const config = TAB_CONFIG[activeTab];

    if (!config) {
      setFatalError("Unknown tab.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setFatalError(null);

    // Placeholder rows so the UI can render immediately in a loading state.
    setRows(
      members.map((member) => ({
        member,
        value: null,
        error: false,
      }))
    );

    async function loadAll() {
      const results = await Promise.allSettled(
        members.map((member) => config.getValue(member))
      );

      if (cancelled) return;

      const nextRows = members.map((member, i) => {
        const result = results[i];
        if (result.status === "fulfilled") {
          return { member, value: result.value, error: false };
        }
        return { member, value: null, error: true };
      });

      // Highest value first. Failed fetches (null) sink to the bottom.
      nextRows.sort((a, b) => {
        if (a.value === null && b.value === null) return 0;
        if (a.value === null) return 1;
        if (b.value === null) return -1;
        return b.value - a.value;
      });

      setRows(nextRows);
      setLoading(false);
    }

    loadAll().catch((err) => {
      if (!cancelled) {
        setFatalError(err?.message || "Failed to load leaderboard.");
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [activeTab, members]);

  const config = TAB_CONFIG[activeTab];

  if (fatalError) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-slate-400 font-mono">
        <AlertTriangle className="w-8 h-8 text-yellow-500" />
        <p>{fatalError}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-3.5 w-full max-w-3xl mx-auto">
      {rows.map((row, index) => (
        <LeaderboardCard
          key={row.member.id}
          rank={index + 1}
          member={row.member}
          username={row.member[config.usernameKey]}
          value={row.value}
          label={config.label}
          loading={loading && row.value === null && !row.error}
          error={row.error}
        />
      ))}
    </div>
  );
}
