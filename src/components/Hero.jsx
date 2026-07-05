import React from 'react'
import WalterWhite from './WalterWhite'

const Hero = () => {
  const PixelIcon = ({ type }) => {
    const icons = {
      news: (
        <svg className="w-12 h-12 mx-auto text-minecraft-gray" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      members: (
        <svg className="w-12 h-12 mx-auto text-minecraft-gray" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      events: (
        <svg className="w-12 h-12 mx-auto text-minecraft-gray" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
        </svg>
      )
    }
    return icons[type]
  }

  const cards = [
    {
      iconType: 'news',
      title: 'Latest Clan News',
      description: 'A snippet of the most recent announcement about our latest server updates.',
    },
    {
      iconType: 'members',
      title: 'Meet Our Members',
      description: 'Check out our community page and see the amazing people in our clan.',
    },
    {
      iconType: 'events',
      title: 'Upcoming Events',
      description: 'Join us for the next build-off! Details on our events page.',
    },
  ]

  return (
    <section className="relative min-h-screen pt-20 pb-16 overflow-hidden flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: "url('/bg.jpeg')",
        }}
      />
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-minecraft-darker/70" />
      
      {/* Hero Content Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Welcome Text Section */}
        <div className="text-center pb-4">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white minecraft-shadow leading-tight">
              Welcome to LUMINA!
            </h1>
            <p className="text-lg sm:text-xl text-white minecraft-shadow">
              Builders, Adventurers, and Friends
            </p>
          </div>
        </div>

        {/* Main Content Section - Character and Cards */}
        <div className="space-y-8">
          {/* Walter White Animation - Center */}
          <div className="flex justify-center">
            <WalterWhite />
          </div>

          {/* Info Cards - Below Character in Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-minecraft-dark border-4 border-black/50 p-4 relative z-10"
              >
                {/* Icon - Pixel art style */}
                <div className="mb-4">
                  <PixelIcon type={card.iconType} />
                </div>
                
                {/* Title */}
                <h3 className="text-xs font-bold text-white mb-2 minecraft-shadow">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="text-minecraft-gray text-xs leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
