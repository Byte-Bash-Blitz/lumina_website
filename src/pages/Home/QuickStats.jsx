import React from 'react'
import Reveal from './Reveal'
import AnimatedCounter from './AnimatedCounter'
import { PixelIcon } from './MinecraftIcons'

// Update these to your real numbers.
const STATS = [
  { icon: 'emerald', label: 'Members', value: 16, accent: 'text-mc-emerald', border: 'hover:border-mc-emerald' },
  { icon: 'craftingTable', label: ' Crafting Bench', value: 20, suffix: '+', accent: 'text-mc-gold', border: 'hover:border-mc-gold' },
  { icon: 'compass', label: 'Realm Events', value: 15, suffix: '+', accent: 'text-mc-diamond', border: 'hover:border-mc-diamond' },
  { icon: 'beacon', label: ' Legendary Feats', value: 30, suffix: '+', accent: 'text-mc-cherry', border: 'hover:border-mc-cherry' },
]

const QuickStats = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-mc-stone" aria-label="Lumina by the numbers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div
                className={`h-full bg-mc-slate border-4 border-black/50 p-5 sm:p-6 text-center transition-colors duration-300 ${stat.border}`}
              >
                <PixelIcon name={stat.icon} size={36} className={`mx-auto mb-3 ${stat.accent}`} />
                <div className={`text-2xl sm:text-3xl font-pixel ${stat.accent}`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-minecraft-gray">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickStats
