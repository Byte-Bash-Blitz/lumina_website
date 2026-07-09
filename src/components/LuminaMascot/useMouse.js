import { useEffect, useRef } from "react";

/**
 * useMouse
 * Tracks the pointer position relative to a container element and exposes it
 * through a mutable ref (avoids re-renders on every mouse move, which is
 * important since this feeds a 60fps three.js render loop).
 *
 * Returned ref.current = { x, y } normalized to the range [-1, 1],
 * where (0, 0) is the center of the container.
 *
 * Also tracks whether the pointer is currently inside the container so
 * consumers can ease the mascot back to its resting rotation when the
 * cursor leaves.
 */
export function useMouse(containerRef) {
  const mouseRef = useRef({ x: 0, y: 0, inside: false });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const handlePointerMove = (event) => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      mouseRef.current.x = Math.min(1, Math.max(-1, px * 2 - 1));
      mouseRef.current.y = Math.min(1, Math.max(-1, py * 2 - 1));
      mouseRef.current.inside = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.inside = false;
    };

    // Track globally so the mascot keeps responding even if the pointer
    // is briefly over a child element, but reset "inside" on true leave.
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    node.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [containerRef]);

  return mouseRef;
}
