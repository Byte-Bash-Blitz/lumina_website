import { useEffect, useRef } from "react";

/**
 * useFloat
 * Lightweight requestAnimationFrame driver that exposes elapsed time and
 * delta time through a mutable ref, without triggering React re-renders.
 * AnimationController consumes this style of clock internally, but this
 * hook is provided so any part of the mascot UI (outside the three.js
 * render loop) can also sync to the same heartbeat, e.g. for CSS-driven
 * float effects on DOM overlays.
 *
 * @param {(time: { elapsed: number, delta: number }) => void} [onFrame]
 * @param {boolean} [active=true] whether the loop should run
 */
export function useFloat(onFrame, active = true) {
  const stateRef = useRef({ elapsed: 0, delta: 0 });
  const rafRef = useRef(null);
  const lastRef = useRef(null);
  const callbackRef = useRef(onFrame);

  callbackRef.current = onFrame;

  useEffect(() => {
    if (!active) return undefined;

    const tick = (now) => {
      const nowSeconds = now / 1000;
      if (lastRef.current === null) lastRef.current = nowSeconds;

      const delta = Math.min(0.1, nowSeconds - lastRef.current);
      lastRef.current = nowSeconds;

      stateRef.current.delta = delta;
      stateRef.current.elapsed += delta;

      if (callbackRef.current) {
        callbackRef.current({ ...stateRef.current });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [active]);

  return stateRef;
}

/**
 * Pure helper (no React) for a smooth idle float offset.
 * Shared by AnimationController so the math stays consistent everywhere.
 */
export function floatOffset(elapsed, amplitude = 0.08, speed = 1.1) {
  return Math.sin(elapsed * speed) * amplitude;
}

/**
 * Pure helper for the gentle breathing scale pulse (1.00 -> 1.015 -> 1.00).
 */
export function breathingScale(elapsed, speed = 0.85) {
  const t = (Math.sin(elapsed * speed) + 1) / 2; // 0..1
  return 1 + t * 0.015;
}
