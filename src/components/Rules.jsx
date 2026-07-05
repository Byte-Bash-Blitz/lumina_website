import React from 'react'

const Rules = () => {
  const coreCommitments = [
    {
      icon: '📅',
      text: 'Must attend all weekly bash meetings.',
    },
    {
      icon: '👥',
      text: 'Must attend clan gatherings.',
    },
    {
      icon: '📊',
      text: 'Provide daily progress updates.',
    },
    {
      icon: '🔔',
      text: 'Respond to clan notifications promptly.',
    },
  ]

  const codeOfConduct = [
    {
      icon: '🛡️',
      text: 'Respectful communication towards all members is mandatory.',
    },
    {
      icon: '🛡️',
      text: 'No griefing, cheating, or exploiting bugs.',
    },
    {
      icon: '💎',
      text: 'Always prioritize teamwork and collaboration in group projects.',
    },
  ]

  const inGameEtiquette = [
    {
      icon: '🏗️',
      text: 'Respect shared resources and bases. Always replace what you take.',
    },
    {
      icon: '⚔️',
      text: 'Player vs. Player (PvP) is only allowed in designated arenas or by mutual consent.',
    },
  ]

  return (
    <section className="min-h-screen py-20 bg-minecraft-darker flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rulebook Container */}
        <div className="bg-gray-700 border-4 border-amber-700 p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 minecraft-shadow">
              Clan Rulebook
            </h1>
            <p className="text-minecraft-gray text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto">
              Welcome, Crafter! These rules are essential for maintaining a fun, fair, and collaborative community for all members. Please read them carefully.
            </p>
          </div>

          {/* Core Commitments */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-minecraft-green mb-4 pb-2 border-b-2 border-minecraft-green/50">
              Core Commitments
            </h2>
            <div className="space-y-4">
              {coreCommitments.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <p className="text-white text-sm leading-relaxed pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code of Conduct */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-minecraft-green mb-4 pb-2 border-b-2 border-minecraft-green/50">
              Code of Conduct
            </h2>
            <div className="space-y-4">
              {codeOfConduct.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <p className="text-white text-sm leading-relaxed pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* In-Game Etiquette */}
          <div>
            <h2 className="text-2xl font-bold text-minecraft-green mb-4 pb-2 border-b-2 border-minecraft-green/50">
              In-Game Etiquette
            </h2>
            <div className="space-y-4">
              {inGameEtiquette.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <p className="text-white text-sm leading-relaxed pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Rules
