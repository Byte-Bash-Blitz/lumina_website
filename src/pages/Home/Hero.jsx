import React, {
  useMemo,
  lazy,
  Suspense,
  useState,
  useEffect,
} from "react";

const LuminaMascot = lazy(() =>
  import("../../components/LuminaMascot/LuminaMascot")
);
import { Link } from 'react-router-dom'
import PixelButton from './PixelButton'
import HeroBackgroundSlideshow from './HeroBackgroundSlideshow'
import Reveal from './Reveal'
import { PixelIcon } from './MinecraftIcons'

// Add more scenes here for a richer rotation (Cherry Blossom Kingdom,
// Floating Islands, Crystal Cave, etc). Keep to WebP/compressed JPEGs.

const HERO_BACKGROUNDS = ['/bg5.webp' ] //'/bg4.jpeg', '/bg.jpeg','/bg6.webp', '/bg2.webp',

const EXPLORE_LINKS = [
  {
    icon: 'news',
    title: 'Latest Clan News',
    description: 'Catch up on the newest server updates and announcements.',
    href: '/events',
  },
  {
    icon: 'members',
    title: 'Meet Our Members',
    description: 'See the builders and adventurers behind Lumina.',
    href: '/members',
  },
  {
    icon: 'events',
    title: 'Upcoming Events',
    description: 'Join the next build-off. Details on the events page.',
    href: '/events',
  },
]

const EMBER_COUNT = 10

const Hero = () => {
  const [showMascot, setShowMascot] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowMascot(true);
  }, 50);

  return () => clearTimeout(timer);
}, []);
  // Computed once — no per-render randomness, so the layout never shifts.
  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        animationDelay: `${(i % 5) * 0.8}s`,
        animationDuration: `${5 + (i % 4)}s`,
        opacity: 0.25 + (i % 3) * 0.15,
      })),
    []
  )

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden flex flex-col justify-center">
      <HeroBackgroundSlideshow images={HERO_BACKGROUNDS} />

      {/* Ambient embers — 10 elements max, transform/opacity only */}
      <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        {embers.map((style, i) => (
          <span
            key={i}
            className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-mc-gold animate-mc-float motion-reduce:animate-none"
            style={style}
          />
        ))}
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Heading */}
        <Reveal className="text-center pb-4">
          <p className="text-mc-diamond text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 font-pixel">
            A Byte Bash Blitz Clan
          </p>
          <h1 className="font-pixel text-2xl sm:text-4xl lg:text-5xl text-white leading-relaxed minecraft-shadow">
            Welcome to Lumina
          </h1>
          <p className="mt-4 text-base sm:text-lg text-mc-gold minecraft-shadow">Where Builders Become Legends</p>
         <p
  className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-[#5B4A3C]"
  style={{
    textShadow: "2px 2px 0 rgba(255,255,255,0.2)",
  }}
>
  Join a clan of students turning curiosity into code — one project, one build, one milestone at a time.
</p>
        </Reveal>

        {/* Mascot centerpiece — pedestal, portal glow, idle float */}
        <Reveal delay={150} className="relative flex justify-center items-center my-10 sm:my-12">
          <div className="relative">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-mc-cyan/20 blur-2xl animate-mc-pulse-glow motion-reduce:animate-none"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-mc-cyan/40 animate-mc-spin-slow motion-reduce:animate-none"
              aria-hidden="true"
            />
            <div className="relative">
             <div className="w-[320px] h-[320px] flex items-center justify-center">
  {showMascot && (
    <Suspense fallback={null}>
      <LuminaMascot />
    </Suspense>
  )}
</div>
            </div>
            <div className="mx-auto mt-2 h-3 w-28 rounded-full bg-black/50 blur-sm" aria-hidden="true" />
          </div>
        </Reveal>

        {/* Primary CTAs */}
        <Reveal delay={300} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
          <PixelButton to="/Lore-Wall" variant="primary">
            🏆 Lore Wall
          </PixelButton>
          <PixelButton to="/members" variant="secondary">
            🤝 Meet The Clan
          </PixelButton>
        </Reveal>

        {/* Quick links (kept from the original hero, reskinned) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPLORE_LINKS.map((card, index) => (
            <Reveal key={card.title} delay={index * 120}>
              <Link
  to={card.href}
  className="group block h-full bg-[#1f2937]/78 backdrop-blur-[2px] border-4 border-white/20 p-5 transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-mc-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-emerald"
>
  <PixelIcon
    name={card.icon}
    size={36}
    className="text-white mb-4 drop-shadow-md group-hover:text-mc-emerald transition-colors duration-300"
  />

  <h3 className="text-xs font-bold text-white mb-2 minecraft-shadow uppercase tracking-wide">
    {card.title}
  </h3>

  <p
    className="text-gray-200 text-xs leading-relaxed"
    style={{
      textShadow: "1px 1px 2px rgba(0,0,0,.75)",
    }}
  >
    {card.description}
  </p>
</Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
