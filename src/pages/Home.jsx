import React from 'react'
import Hero from '../components/Hero'
import FallingStraw from '../components/FallingStraw'
import CherryBlossoms from '../components/CherryBlossoms'

const Home = () => {
  const visionElements = [
  {
    icon: '💡',
    title: 'Learn. Build. Bash.',
    description:
      'Every challenge is an opportunity to sharpen our skills and become stronger developers together.',
  },
  {
    icon: '⚒️',
    title: 'Projects Over Promises',
    description:
      'We transform ideas into real-world applications through teamwork, creativity, and consistency.',
  },
  {
    icon: '🚀',
    title: 'Innovation Without Limits',
    description:
      'From beginner projects to advanced solutions, we constantly explore new technologies and possibilities.',
  },
  {
    icon: '🤝',
    title: 'One Clan. One Journey.',
    description:
      'Lumina grows together by sharing knowledge, mentoring each other, and celebrating every milestone.',
  },
];

const goals = [
  {
    icon: '💻',
    text: 'Master programming through real-world projects and collaborative learning.',
  },
  {
    icon: '⚡',
    text: 'Build innovative applications that strengthen technical and creative skills.',
  },
  {
    icon: '🎤',
    text: 'Develop confident communicators through presentations, teamwork, and community events.',
  },
];

const achievements = [
  {
    icon: '👊',
    text: 'Proud clan of the Byte-Bash-Blitz technical community.',
  },
  {
    icon: '🌟',
    text: 'Organized technical events, coding challenges, and knowledge-sharing sessions.',
  },
  {
    icon: '🏆',
    text: 'Empowering Rookies to grow into skilled Bashers through continuous learning.',
  },
];

  return (
    <div>
      <FallingStraw />
      <CherryBlossoms />
      <Hero />
      
      {/* About Section - Previously About Page Content */}
      <section className="py-20 bg-minecraft-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Hero Banner */}
          <div className="relative mb-12 overflow-hidden border-4 border-black/50">
            <div 
              className="h-80 sm:h-64 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('/abg.jpeg')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 minecraft-shadow">
                About lumina
              </h1>
              <p className="text-minecraft-gray text-xs sm:text-sm max-w-3xl leading-relaxed">
                Welcome to Lumina Light, a dynamic clan within the Byte Bash Blitz tech community. As a student-led organization, we are driven by passion and unwavering motivation towards technology, innovation, and collaborative learning. Our motto centers on fostering growth, sharing knowledge, and building the future through code, creativity, and community spirit.
              </p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Our History - Takes 2 columns */}
            <div className="lg:col-span-2 bg-minecraft-dark border-4 border-black/50 p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-minecraft-green mb-4 minecraft-shadow">
                Our Vision
              </h2>
              <p className="text-minecraft-gray text-xs sm:text-sm mb-6 leading-relaxed">
                At Lumina Light, our purpose is to grow through curiosity and creativity. We believe that <span className="text-minecraft-green font-bold">"Knowledge through fun"</span> — we learn because we enjoy it, not because we're forced to. We turn passion into mastery, and effort into excitement.
              </p>
              
              <p className="text-minecraft-gray text-xs sm:text-sm mb-6 leading-relaxed">
                Like true adventurers of the digital seas, we embrace the philosophy that <span className="text-amber-300 font-bold">"Curiosity is the compass. Learning is the treasure."</span> Every challenge is an undiscovered island, every project a new voyage, and every teammate a trusted crewmate on this grand expedition of innovation.
              </p>

              {/* Vision Elements */}
              <div className="space-y-4">
                {visionElements.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-black/20 p-3 border-l-4 border-minecraft-green">
                    <div className="text-2xl sm:text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm">{item.title}</h3>
                      <p className="text-xs text-minecraft-gray">{item.description}</p>
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

        </div>
      </section>
    </div>
  )
}

export default Home
