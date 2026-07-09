import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight scroll-visibility hook. No dependency on animation libraries —
 * just a single IntersectionObserver per element, disconnected once fired
 * (when `once` is true) to avoid unnecessary rerenders.
 */
export function useInView({ threshold = 0.2, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    // Fallback for environments without IntersectionObserver support
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isInView]
}

export default useInView
