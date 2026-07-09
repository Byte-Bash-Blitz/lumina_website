import { useEffect, useState } from "react";

/**
 * useVisibility
 * Returns true while the document tab is visible, false when hidden.
 * Used to pause the three.js render loop (and its animation work) when the
 * tab is backgrounded, saving CPU/GPU and battery.
 */
export function useVisibility() {
  const [isVisible, setIsVisible] = useState(
    typeof document !== "undefined" ? document.visibilityState === "visible" : true
  );

  useEffect(() => {
    const handleChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleChange);
    return () => document.removeEventListener("visibilitychange", handleChange);
  }, []);

  return isVisible;
}
