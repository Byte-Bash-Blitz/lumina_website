import React, { useState } from 'react'

const JoinClan = () => {
  const [formData, setFormData] = useState({
    username: '',
    level: '',
    email: '',
    quest: '',
    message: '',
    agreeRules: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.agreeRules) {
      alert('Please visit the Gallery before joining the Guild.')
      return
    }

    console.log('Application Submitted:', formData)
    alert('🎉 Your Guild application has been sent successfully!')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <section className="min-h-screen py-20 bg-minecraft-darker flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-800 border-4 border-amber-900 p-8 sm:p-12">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 minecraft-shadow">
              🏰 Meet the Builders
            </h1>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Ready to begin your adventure?<br />
              Complete your Guild application below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Player Name */}
            <div>
              <label
                htmlFor="username"
                className="block text-white text-sm font-bold mb-2"
              >
                🎮 Player Name
              </label>

              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your Gamer Tag..."
                required
                className="w-full px-4 py-3 bg-white text-black text-sm border-2 border-black/50 focus:outline-none focus:border-minecraft-green"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label
                htmlFor="level"
                className="block text-white text-sm font-bold mb-2"
              >
                ⭐ Experience Level
              </label>

              <input
                type="number"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                placeholder="Enter your level..."
                min="1"
                max="100"
                required
                className="w-full px-4 py-3 bg-white text-black text-sm border-2 border-black/50 focus:outline-none focus:border-minecraft-green"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-bold mb-2"
              >
                🦉 Owl Mail
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Where should we send our owl?"
                required
                className="w-full px-4 py-3 bg-white text-black text-sm border-2 border-black/50 focus:outline-none focus:border-minecraft-green"
              />
            </div>

            {/* Quest Request */}
            <div>
              <label
                htmlFor="quest"
                className="block text-white text-sm font-bold mb-2"
              >
                📜 Quest Request
              </label>

              <textarea
                id="quest"
                name="quest"
                value={formData.quest}
                onChange={handleChange}
                placeholder="Describe your quest..."
                rows="4"
                required
                className="w-full px-4 py-3 bg-white text-black text-sm border-2 border-black/50 focus:outline-none focus:border-minecraft-green resize-none"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-white text-sm font-bold mb-2"
              >
                💬 Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your adventure..."
                rows="5"
                required
                className="w-full px-4 py-3 bg-white text-black text-sm border-2 border-black/50 focus:outline-none focus:border-minecraft-green resize-none"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeRules"
                name="agreeRules"
                checked={formData.agreeRules}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 accent-minecraft-green"
              />

              <label
                htmlFor="agreeRules"
                className="text-white text-sm"
              >
                I have explored the{' '}
                <a
                  href="/gallery"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Gallery
                </a>{' '}
                and the Guild.
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-minecraft-green hover:bg-green-600 text-black text-sm font-bold border-4 border-black/50 transition-all transform hover:scale-105"
              >
                ⚔️ Begin Your Adventure
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

export default JoinClan