import React from 'react'
import Reveal from './Reveal'
import { PixelIcon } from './MinecraftIcons'

const CLAN_VALUES = [
  {
    icon: 'compass',
    title: 'Learn. Build. Bash.',
    description: 'Every challenge is an opportunity to sharpen our skills and become stronger developers together.',
  },
  {
    icon: 'craftingTable',
    title: 'Projects Over Promises',
    description: 'We transform ideas into real-world applications through teamwork, creativity, and consistency.',
  },
  {
    icon: 'diamond',
    title: 'Innovation Without Limits',
    description: 'From beginner projects to advanced solutions, we constantly explore new technologies and possibilities.',
  },
  {
    icon: 'emerald',
    title: 'One Clan. One Journey.',
    description: 'Lumina grows together by sharing knowledge, mentoring each other, and celebrating every milestone.',
  },
]

const QuestBook = () => {
  return (
    <section className="py-20 bg-minecraft-darker" id="about" aria-labelledby="quest-book-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover banner */}
        <Reveal className="relative mb-12 overflow-hidden border-4 border-black/50">
          <div className="h-80 sm:h-64 bg-cover bg-center" style={{ backgroundImage: "url('/abg.webp')" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-6">
            <p className="text-mc-gold text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 font-pixel">
              Chapter One
            </p>
            <h1 id="quest-book-heading" className="font-pixel text-xl sm:text-3xl lg:text-4xl text-white mb-4 minecraft-shadow">
              The Story of Lumina
            </h1>
            <p className="text-minecraft-gray text-xs sm:text-sm max-w-3xl leading-relaxed">
              Welcome to Lumina Light, a dynamic clan within the Byte Bash Blitz tech community — driven by passion
              for technology, innovation, and collaborative learning.
            </p>
          </div>
        </Reveal>

        {/* Open book spread */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-black/40 border-4 border-black/50">
          {/* Left page — mission & vision */}
          <Reveal className="bg-[#e9dcc3] text-stone-900 p-6 sm:p-8 lg:border-r-2 lg:border-black/10">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-4">Our Vision</h2>
            <p className="text-xs sm:text-sm mb-5 leading-relaxed text-stone-800">
              At Lumina Light, our purpose is to grow through curiosity and creativity. We believe that{' '}
              <span className="text-emerald-700 font-bold">&ldquo;Knowledge through fun&rdquo;</span> — we learn
              because we enjoy it, not because we&apos;re forced to.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-800">
              Like true adventurers of the digital seas, we embrace the philosophy that{' '}
              <span className="text-amber-700 font-bold">
                &ldquo;Curiosity is the compass. Learning is the treasure.&rdquo;
              </span>{' '}
              Every challenge is an undiscovered island, every project a new voyage, and every teammate a trusted
              crewmate on this grand expedition.
            </p>
          </Reveal>

          {/* Right page — clan values */}
          <div className="bg-[#e9dcc3] text-stone-900 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-5">Clan Values</h2>
            <div className="space-y-4">
              {CLAN_VALUES.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 90}
                  className="flex items-start gap-3 bg-black/5 p-3 border-l-4 border-emerald-700"
                >
                  <PixelIcon name={item.icon} size={28} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-stone-700">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuestBook
