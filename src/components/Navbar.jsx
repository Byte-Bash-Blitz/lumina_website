import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
  { name: 'HOME', href: '/' },
  { name: 'MEMBERS', href: '/members' },
  { name: 'EVENTS', href: '/events' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'GALLERY', href: '/gallery' },

  // External Link
  {
    name: '🎮 QUIZ',
    href: 'https://lumina.staticdomains.app/',
    external: true,
  },
]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-black/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.webp" alt="MINECRAFT" className="h-8 w-auto pixelated" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
{navItems.map((link) => (
  link.external ? (
    <a
      key={link.name}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-minecraft-green transition-colors duration-200 text-xs font-bold"
    >
      {link.name}
    </a>
  ) : link.href.startsWith('#') ? (
    <a
      key={link.name}
      href={link.href}
      className="text-white hover:text-minecraft-green transition-colors duration-200 text-xs font-bold"
    >
      {link.name}
    </a>
  ) : (
    <Link
      key={link.name}
      to={link.href}
      className="text-white hover:text-minecraft-green transition-colors duration-200 text-xs font-bold"
    >
      {link.name}
    </Link>
  )
))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-white hover:text-minecraft-green hover:bg-white/5 transition-all text-xs font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-4 py-3 text-white hover:text-minecraft-green hover:bg-white/5 transition-all text-xs font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}

          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
