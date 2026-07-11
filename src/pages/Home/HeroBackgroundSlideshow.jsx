import React, { memo, useEffect, useState } from 'react'

/**
 * Cross-fades between a handful of background images and applies a very
 * slow scale animation to the active slide. Only `opacity` and `transform`
 * are animated — no blur transitions, no filters.
 */
const HeroBackgroundSlideshow = ({ images, intervalMs = 12000 }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return undefined
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [images.length, intervalMs])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out motion-reduce:transition-none ${
            index === activeIndex ? 'opacity-100 animate-mc-zoom motion-reduce:animate-none' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-mc-stone/70 via-mc-stone/50 to-mc-stone/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-mc-stone via-transparent to-transparent" />
    </div>
  )
}

export default memo(HeroBackgroundSlideshow)
