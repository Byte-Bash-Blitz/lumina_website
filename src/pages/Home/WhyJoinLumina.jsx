import React from 'react'
import Reveal from './Reveal'
import { PixelIcon } from './MinecraftIcons'

const GOALS = [
  { icon: 'book', text: 'Master programming through real-world projects and collaborative learning.' },
  { icon: 'diamond', text: 'Build innovative applications that strengthen technical and creative skills.' },
  { icon: 'compass', text: 'Develop confident communicators through presentations, teamwork, and community events.' },
]

const ACHIEVEMENTS = [
  { icon: 'sword', text: 'Proud clan of the Byte-Bash-Blitz technical community.' },
  { icon: 'beacon', text: 'Organized technical events, coding challenges, and knowledge-sharing sessions.' },
  { icon: 'lantern', text: 'Empowering Rookies to grow into skilled Bashers through continuous learning.' },
]

const WhyJoinLumina = () => {
  return (
    <section className="py-20 bg-mc-stone" aria-labelledby="why-join-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <h2 id="why-join-heading" className="font-pixel text-xl sm:text-2xl text-white minecraft-shadow">
            Why Join Lumina
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-minecraft-gray">Two chests worth opening.</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal className="bg-mc-slate border-4 border-black/50 p-6">
            <h3 className="text-lg sm:text-xl font-bold text-mc-emerald mb-4 minecraft-shadow">Our Goals</h3>
            <div className="space-y-4">
              {GOALS.map((goal) => (
                <div key={goal.text} className="flex items-start gap-3">
                  <PixelIcon name={goal.icon} size={28} className="text-mc-emerald flex-shrink-0" />
                  <p className="text-minecraft-gray text-xs sm:text-sm leading-relaxed">{goal.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="bg-mc-slate border-4 border-black/50 p-6">
            <h3 className="text-lg sm:text-xl font-bold text-mc-gold mb-4 minecraft-shadow">Achievements</h3>
            <div className="space-y-4">
              {ACHIEVEMENTS.map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <PixelIcon name={item.icon} size={28} className="text-mc-gold flex-shrink-0" />
                  <p className="text-minecraft-gray text-xs sm:text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default WhyJoinLumina
