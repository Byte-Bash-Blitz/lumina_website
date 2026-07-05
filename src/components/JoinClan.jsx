import React, { useState } from 'react'

const JoinClan = () => {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    reason: '',
    agreeRules: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.agreeRules) {
      alert('Please agree to the Clan Rules before submitting.')
      return
    }
    console.log('Form submitted:', formData)
    alert('Application submitted successfully!')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <section className="min-h-screen py-20 bg-minecraft-darker flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-amber-800 border-4 border-amber-900 p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 minecraft-shadow">
              Join The Clan
            </h1>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Fill out the form below to apply.<br />
              We're excited to have you join our adventure!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Minecraft Username */}
            <div>
              <label htmlFor="username" className="block text-white text-sm font-bold mb-2">
                Minecraft Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Steve"
                required
                className="w-full px-4 py-3 bg-white text-black text-sm border-2 border-black/50 focus:outline-none focus:border-minecraft-green"
              />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-white text-sm font-bold mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="18"
                required
                min="1"
                max="120"
                className="w-full px-4 py-3 bg-white text-black text-sm border-2 border-black/50 focus:outline-none focus:border-minecraft-green"
              />
            </div>

            {/* Why do you want to join? */}
            <div>
              <label htmlFor="reason" className="block text-white text-sm font-bold mb-2">
                Why do you want to join?
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Tell us a little about yourself..."
                required
                rows="6"
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
              <label htmlFor="agreeRules" className="text-white text-sm">
                I have read and agree to the{' '}
                <a href="/rules" className="text-cyan-400 hover:text-cyan-300 underline">
                  Clan Rules
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-minecraft-green hover:bg-green-600 text-black text-sm font-bold border-4 border-black/50 transition-all transform hover:scale-105"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default JoinClan
