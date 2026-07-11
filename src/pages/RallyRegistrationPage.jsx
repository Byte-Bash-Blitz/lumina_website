import React, { useState } from 'react'

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzzQ-A7bAgjriiRCKV7g-W03DS275iboHTUtb0zOY-y5BueKt0muhuEao6nIrGriS1f/exec'

const RallyRegistrationPage = () => {
  const [name, setName] = useState('')
  const [clan, setClan] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name,
          clan,
          event: 'Lumina Radiance Rally',
        }),
      })

      setMessage('Successfully Joined! Your rally entry has been sent.')
      setName('')
      setClan('')
    } catch (submissionError) {
      setError('Unable to submit right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-minecraft-darker relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(123,255,206,0.12),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(85,85,255,0.12),_transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-3xl border-4 border-[#7bffce]/60 bg-[#0b1f17]/95 shadow-[0_24px_60px_rgba(77,255,183,0.18)] p-6 sm:p-10 text-white">
          <div className="text-center mb-8">
            <p className="inline-flex items-center px-4 py-2 mb-5 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#7bffce] border border-[#7bffce]/30 bg-[#7bffce]/10 rounded-full">
              Lumina Radiance Rally
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold minecraft-shadow tracking-[0.16em] uppercase mb-4">
              Join The Rally
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-minecraft-gray leading-relaxed max-w-xl mx-auto">
              Enter your name and clan to reserve your spot.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#c8ffe7] mb-3">
              Name
              </label>
              <input
                className="w-full rounded-2xl border-2 border-[#3b82f6] bg-[#111827] px-4 py-4 text-sm sm:text-base text-white outline-none transition-all placeholder:text-white/35 focus:border-[#7bffce] focus:shadow-[0_0_0_4px_rgba(123,255,206,0.12)]"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#c8ffe7] mb-3">
                Clan Name
              </label>
              <input
                className="w-full rounded-2xl border-2 border-[#3b82f6] bg-[#111827] px-4 py-4 text-sm sm:text-base text-white outline-none transition-all placeholder:text-white/35 focus:border-[#7bffce] focus:shadow-[0_0_0_4px_rgba(123,255,206,0.12)]"
                placeholder="Enter your clan name"
                value={clan}
                onChange={(event) => setClan(event.target.value)}
                required
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-xs sm:text-sm text-red-100">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs sm:text-sm text-emerald-100">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl border-2 border-black/50 bg-[#2563eb] px-5 py-4 text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-[#60a5fa] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Sending...' : '⚡ Join Rally'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RallyRegistrationPage