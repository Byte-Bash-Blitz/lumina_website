import React, { useEffect, useRef, useState } from 'react'
import useInView from './useInView'

/**
 * Counts up to `target` once the element enters the viewport. Uses a single
 * requestAnimationFrame loop (cancelled on unmount) instead of setInterval —
 * no timers left running in the background.
 */
const AnimatedCounter = ({ target, duration = 1500, suffix = '' }) => {
  const [value, setValue] = useState(0)
  const [ref, isInView] = useInView({ threshold: 0.4 })
  const frameRef = useRef(null)

  useEffect(() => {
    if (!isInView) return undefined

    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
