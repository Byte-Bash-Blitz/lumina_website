import React from "react";

/**
 * Loader.jsx
 * A blocky, Minecraft-inspired pixel loading animation. Shown while the
 * GLTFLoader is fetching/parsing the mascot GLB.
 *
 * @param {{ progress?: number }} props progress in the range 0..1
 */
export default function Loader({ progress = 0 }) {
  const pixelCount = 25;
  const litCount = Math.round(progress * pixelCount);

  return (
    <div className="lumina-loader" role="status" aria-live="polite">
      <div className="lumina-loader-grid">
        {Array.from({ length: pixelCount }).map((_, i) => (
          <div
            key={i}
            className={`lumina-loader-pixel${i % 3 === 0 ? " gold" : ""}`}
            style={{
              opacity: i < litCount ? 1 : undefined,
              animationDelay: `${(i % 5) * 0.08}s`,
            }}
          />
        ))}
      </div>
      <div className="lumina-loader-bar-track">
        <div
          className="lumina-loader-bar-fill"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <span className="lumina-loader-label">Summoning Lumina…</span>
    </div>
  );
}