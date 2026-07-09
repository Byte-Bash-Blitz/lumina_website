import React from "react";

/**
 * ErrorFallback.jsx
 * A cute, lightweight CSS-drawn placeholder shown when the mascot GLB is
 * missing or fails to load. Never throws, never blocks the page.
 */
export default function ErrorFallback() {
  return (
    <div className="lumina-fallback" role="img" aria-label="Lumina mascot placeholder">
      <div className="lumina-fallback-blob">
        <div className="lumina-fallback-ear left" />
        <div className="lumina-fallback-ear right" />
        <div className="lumina-fallback-body" />
        <div className="lumina-fallback-eye left" />
        <div className="lumina-fallback-eye right" />
        <span className="lumina-fallback-label">Lumina is on her way…</span>
      </div>
    </div>
  );
}