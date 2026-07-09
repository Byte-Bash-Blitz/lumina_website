import React from 'react'
import Reveal from './Reveal'
import { PixelIcon } from './MinecraftIcons'

// Real chronological milestones — update copy/dates as your clan's history grows.
const MILESTONES = [
  {
    icon: 'craftingTable',
    title: 'Clan Founded',
    text: 'Lumina Light forms inside Byte Bash Blitz with a handful of curious builders.',
  },
  {
    icon: 'compass',
    title: 'First Projects Shipped',
    text: 'Early members ship their first collaborative applications and tools.',
  },
  {
    icon: 'beacon',
    title: 'Community Grows',
    text: 'Weekly coding challenges and knowledge-sharing sessions become a clan tradition.',
  },
  {
    icon: 'diamond',
    title: 'Today',
    text: 'A thriving crew of builders, adventurers, and friends — still learning together.',
  },
]

const JourneyTimeline = () => {
  return (
    <section className="py-20 bg-minecraft-darker" aria-labelledby="journey-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <h2 id="journey-heading" className="font-pixel text-xl sm:text-2xl text-white minecraft-shadow">
            Our Journey
          </h2>
        </Reveal>

        <ol className="relative border-l-4 border-mc-emerald/40 ml-3 sm:ml-6 space-y-10">
          {MILESTONES.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 120} className="relative pl-8 sm:pl-10">
              <span className="absolute -left-[26px] sm:-left-[34px] top-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-mc-slate border-4 border-mc-emerald">
                <PixelIcon name={step.icon} size={22} className="text-mc-emerald" />
              </span>
              <h3 className="font-bold text-white text-sm sm:text-base mb-1 minecraft-shadow">{step.title}</h3>
              <p className="text-minecraft-gray text-xs sm:text-sm leading-relaxed max-w-xl">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default JourneyTimeline
