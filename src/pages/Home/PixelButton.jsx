import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-mc-emerald text-mc-stone border-mc-emerald/80 hover:shadow-[0_0_18px_rgba(69,201,122,0.55)]',
  secondary: 'bg-transparent text-mc-gold border-mc-gold/70 hover:shadow-[0_0_18px_rgba(255,203,69,0.4)]',
}

/**
 * Click ripple + hover lift are the only "extra" interactions here, and both
 * animate transform/opacity only. Ripple elements clean themselves up on a
 * timeout so there's no unbounded state growth.
 */
const PixelButton = ({ to, href, onClick, children, variant = 'primary', className = '', type = 'button' }) => {
  const [ripples, setRipples] = useState([])

  const handleClick = useCallback(
    (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const id = Date.now()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setRipples((prev) => [...prev, { id, x, y }])
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
      }, 600)
      onClick?.(event)
    },
    [onClick]
  )

  const classes = `relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider border-4 transition-transform duration-300 ease-out hover:-translate-y-1 active:translate-y-0 active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mc-cyan ${VARIANTS[variant]} ${className}`

  const rippleNodes = ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="pointer-events-none absolute rounded-full bg-white/40 animate-mc-ripple motion-reduce:hidden"
      style={{ left: ripple.x, top: ripple.y, width: 8, height: 8, transform: 'translate(-50%, -50%)' }}
    />
  ))

  if (to) {
    return (
      <Link to={to} onClick={handleClick} className={classes}>
        {children}
        {rippleNodes}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} onClick={handleClick} className={classes}>
        {children}
        {rippleNodes}
      </a>
    )
  }

  return (
    <button type={type} onClick={handleClick} className={classes}>
      {children}
      {rippleNodes}
    </button>
  )
}

export default PixelButton
