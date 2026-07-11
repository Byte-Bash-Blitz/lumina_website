// src/components/HallOfFame/Tabs.jsx
import React from "react";

/**
 * Top tab navigation for the Hall of Fame page.
 * `tabs` shape: [{ id, label, emoji }]
 */
export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:justify-center px-2 pb-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={[
                "relative px-4 sm:px-5 py-2.5 sm:py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wide",
                "rounded-md border-2 transition-all duration-200 ease-out",
                "flex items-center gap-2 whitespace-nowrap",
                isActive
                  ? "bg-blue-700 border-blue-300 text-yellow-300 shadow-[3px_3px_0_0_#0f172a] translate-y-[-2px]"
                  : "bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-400",
              ].join(" ")}
            >
              <span className="text-base">{tab.emoji}</span>
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-8 bg-yellow-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
