import React from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

// Swap in real build/event screenshots (WebP, compressed). Reusing the two
// existing background images here so the section works out of the box.
const GALLERY_ITEMS = [
  { src: '/Gallery/badge26.webp', alt: 'Badge Day 2026' },
  { src: '/Gallery/clanintro.webp', alt: 'Rookies Clan intro' },
  { src: '/Gallery/DailyGathering1.webp', alt: 'Daily Gathering ' },
]

const GalleryPreview = () => {
  return (
    <section className="py-20 bg-mc-stone" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 id="gallery-heading" className="font-pixel text-xl sm:text-2xl text-white minecraft-shadow">
              Inside The World
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-minecraft-gray">A peek at what the clan has built.</p>
          </div>
          {/* Point this at your real gallery route, or remove if you don't have one yet. */}
          <Link
            to="/gallery"
            className="text-xs sm:text-sm font-bold text-mc-diamond hover:text-mc-cyan transition-colors duration-300 uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-diamond"
          >
            View Full Gallery →
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <Reveal
              key={item.src}
              delay={index * 100}
              className="group relative overflow-hidden border-4 border-black/50 aspect-video"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GalleryPreview
