import React from 'react'

const About = () => {
  const historyTimeline = [
    {
      icon: '🚩',
      title: 'The Founding',
      year: 'Year 1',
    },
    {
      icon: '🏰',
      title: 'First Fortress Built',
      year: 'Year 1, Q2',
    },
    {
      icon: '🐉',
      title: 'First Dragon Defeated',
      year: 'Year 2',
    },
    {
      icon: '👥',
      title: 'Community Expansion',
      year: 'Year 3',
    },
  ]

  const goals = [
    {
      icon: '🎯',
      text: 'Conquer the Ender Dragon as a team each season.',
    },
    {
      icon: '🏗️',
      text: 'Build a massive, collaborative capital city.',
    },
    {
      icon: '📅',
      text: 'Host weekly community events and build-offs.',
    },
  ]

  const achievements = [
    {
      icon: '🏆',
      text: 'Server-First Wither Kill Trophy.',
    },
    {
      icon: '🏆',
      text: 'Winner of the Annual Build Competition.',
    },
    {
      icon: '🏆',
      text: 'Mapped the entire Overworld continent.',
    },
  ]

  return (
    <section className="py-12 bg-minecraft-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="relative mb-8 overflow-hidden border-4 border-black/50">
          <div 
            className="h-64 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/Castle Photos - Download Free High-Quality Pictures _ Freepik.jpeg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 minecraft-shadow">
              About lumina
            </h1>
            <p className="text-minecraft-gray text-xs sm:text-sm max-w-3xl">
              An introductory paragraph about the clan, its identity, and its core mission in the world of Minecraft.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Our History - Takes 2 columns */}
          <div className="lg:col-span-2 bg-minecraft-dark border-4 border-black/50 p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-minecraft-green mb-4 minecraft-shadow">
              Our History
            </h2>
            <p className="text-minecraft-gray text-xs sm:text-sm mb-6 leading-relaxed">
              A narrative detailing the clan's founding, key events, and evolution. From humble beginnings to our current state, this is the story of our journey together.
            </p>
            <div className="space-y-4">
              {historyTimeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 bg-black/20 p-3 border-l-4 border-minecraft-green">
                  <div className="text-2xl sm:text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    <p className="text-xs text-minecraft-gray">{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Goals and Achievements */}
          <div className="space-y-6">
            {/* Our Goals */}
            <div className="bg-minecraft-dark border-4 border-black/50 p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-minecraft-green mb-4 minecraft-shadow">
                Our Goals
              </h2>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-xl sm:text-2xl flex-shrink-0">{goal.icon}</div>
                    <p className="text-minecraft-gray text-xs sm:text-sm leading-relaxed">{goal.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-minecraft-dark border-4 border-black/50 p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-minecraft-green mb-4 minecraft-shadow">
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-xl sm:text-2xl flex-shrink-0">{achievement.icon}</div>
                    <p className="text-minecraft-gray text-xs sm:text-sm leading-relaxed">{achievement.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Join Our Adventure Section */}
        <div className="mt-6 bg-minecraft-dark border-4 border-black/50 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-minecraft-green mb-4 minecraft-shadow">
            Join Our Adventure
          </h2>
          <p className="text-minecraft-gray text-xs sm:text-sm mb-6 leading-relaxed">
            Ready to build, explore, and conquer with us? We're always looking for new adventurers to join our ranks. Click the button below to start your journey with the PixelCrafters!
          </p>
          <button className="px-6 py-3 bg-minecraft-green hover:bg-green-600 text-black text-xs sm:text-sm font-bold border-2 border-black/50 transition-all transform hover:scale-105">
            Join Our Clan!
          </button>
        </div>
      </div>
    </section>
  )
}

export default About
