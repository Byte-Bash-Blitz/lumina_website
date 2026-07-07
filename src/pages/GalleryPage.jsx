import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

const galleryFolderImages = [
  '/Gallery/abinw.webp',
  '/Gallery/badge26.webp',
  '/Gallery/basher.webp',
  '/Gallery/bd26f.webp',
  '/Gallery/bestrookie.webp',
  '/Gallery/clan1.webp',
  '/Gallery/clanintro.webp',
  '/Gallery/dia.webp',
  '/Gallery/googlesa.webp',
  '/Gallery/guvisa.webp',
  '/Gallery/hamdhansb.webp',
  '/Gallery/jenishsb.webp',
  '/Gallery/prsh.webp',
  '/Gallery/wb.webp',
]

const filenameTitleOverrides = {
  abinw: 'Achievement Abin',
  badge26: 'Badge Day 26',
  basher: 'Basher Emblem',
  bd26f: 'Badge Day Oath',
  bestrookie: 'Best Rookie 26',
  clan1: 'Clan Intro I',
  clanintro: 'Rookie Clan Intro',
  dia: 'Data Refinery Contest',
  googlesa: 'Google Student Ambassador',
  guvisa: 'Guvi Student Ambassador',
  hamdhansb: 'Special Badge Hamdhan',
  'jenishsb,webp': 'Special Badge Jenish',
  prsh: 'Project Showcase',
  wb: 'Weekly Bash',
}

const accentOptions = [
  'from-purple-500/40 to-transparent',
  'from-cyan-400/40 to-transparent',
  'from-pink-500/40 to-transparent',
]

const toTitle = (path) => {
  const filename = path.split('/').pop() || ''
  const withoutExt = filename.includes('.') ? filename.replace(/\.[^.]+$/, '') : filename

  if (filenameTitleOverrides[withoutExt]) {
    return filenameTitleOverrides[withoutExt]
  }

  if (filenameTitleOverrides[filename]) {
    return filenameTitleOverrides[filename]
  }

  return withoutExt
    .replace(/[,_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const buildGalleryItems = () =>
  galleryFolderImages.map((image, index) => ({
    id: `${index}-${image}`,
    image,
    title: toTitle(image),
    accent: accentOptions[index % accentOptions.length],
  }))

const GalleryPage = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const galleryItems = useMemo(() => buildGalleryItems(), [])
  const activeItem = activeIndex === null ? null : galleryItems[activeIndex]

  useEffect(() => {
    if (activeIndex === null) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((previous) => (previous + 1) % galleryItems.length)
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((previous) => (previous - 1 + galleryItems.length) % galleryItems.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, galleryItems.length])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05020d] via-[#0a0515] to-[#05020d] text-white">
      {/* Header */}
      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-purple-300 mb-4">
            Lumina Moments
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.12em] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400">
            Gallery
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Explore our collection of memories and moments
          </p>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.05, y: -4 }}
              onClick={() => setActiveIndex(index)}
              className="group relative h-[240px] sm:h-[260px] rounded-xl overflow-hidden border border-purple-500/30 hover:border-cyan-400/50 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(136,100,255,0.3)]"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-[0.1em] text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-purple-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to expand
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm px-4 py-6 flex items-center justify-center"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden border border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative bg-black w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.img
                  key={activeItem.image}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Info Panel */}
              <div className="bg-gradient-to-b from-purple-950/50 to-black/80 p-6 sm:p-8 border-t border-purple-500/30">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-purple-400 uppercase tracking-[0.2em] mb-2">
                      Image {activeIndex + 1} of {galleryItems.length}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                      {activeItem.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white flex-shrink-0"
                    aria-label="Close"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Navigation */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm uppercase tracking-[0.1em] transition-colors"
                  >
                    <FaChevronLeft /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % galleryItems.length)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-sm uppercase tracking-[0.1em] transition-all font-semibold"
                  >
                    Next <FaChevronRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GalleryPage