import React from 'react'
import Reveal from './Reveal'
import PixelButton from './PixelButton'

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-mc-slate" aria-labelledby="cta-heading">
      <div
        className="absolute inset-0 bg-gradient-to-br from-mc-emerald/10 via-transparent to-mc-diamond/10"
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 id="cta-heading" className="font-pixel text-xl sm:text-3xl text-white mb-4 minecraft-shadow">
            Ready To Start Your Journey?
          </h2>
          <p className="text-minecraft-gray text-xs sm:text-sm mb-8 max-w-xl mx-auto leading-relaxed">
            Grab your pickaxe. Lumina is always looking for curious builders ready to learn, ship, and grow
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PixelButton to="/join" variant="primary">
              📜 Quest Request
            </PixelButton>
            <PixelButton to="/members" variant="secondary">
              🤝 Meet The Clan
            </PixelButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CallToAction
