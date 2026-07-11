import React from 'react'
import useInView from './useInView'

/**
 * Fade-up-on-scroll wrapper. Only animates `opacity` and `transform`
 * (GPU-accelerated) and respects prefers-reduced-motion automatically
 * via Tailwind's `motion-reduce:` variant.
 */
const Reveal = ({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) => {
  const [ref, isInView] = useInView({ threshold: 0.15 })

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: isInView ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
