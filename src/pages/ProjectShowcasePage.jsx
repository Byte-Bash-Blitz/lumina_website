import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, PROJECT_SHOWCASE_EVENT_ID } from '../lib/supabaseClient'

const ProjectShowcasePage = () => {
  const [eventDetails, setEventDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadEvent() {
      if (!supabase) {
        setError('Supabase environment values are missing. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('events')
        .select('name, description, date, type')
        .eq('id', PROJECT_SHOWCASE_EVENT_ID)
        .maybeSingle()

      if (!isMounted) return

      if (fetchError) {
        setError('Unable to load event information right now. Please refresh to try again.')
      } else if (!data) {
        setError('This event is not published yet.')
      } else {
        setEventDetails(data)
      }

      setLoading(false)
    }

    loadEvent()

    return () => {
      isMounted = false
    }
  }, [])

  const eventDate = eventDetails?.date ? new Date(eventDetails.date) : null
  const formattedDate = eventDate
    ? new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(eventDate)
    : 'TBA'
  const formattedTime = eventDate
    ? `${new Intl.DateTimeFormat('en', { timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(eventDate)} IST`
    : 'TBA'

  return (
    <main className="min-h-screen bg-[#06100d] text-[#ecfff6] px-6 py-16">
      <div className="max-w-4xl mx-auto bg-[#0b1f17]/80 border border-[#4dffb7]/30 rounded-3xl p-10 shadow-[0_24px_60px_rgba(77,255,183,0.15)]">
        <div className="flex flex-wrap gap-3 mb-6 text-[11px] tracking-[0.35em] uppercase">
          <span className="px-4 py-1 rounded-full border border-[#4dffb7]/40 bg-[#4dffb7]/10">Project Showcase</span>
          <span className="px-4 py-1 rounded-full border border-[#4dffb7]/40 bg-[#4dffb7]/10">{eventDetails?.type ?? 'Community'}</span>
          <span className="px-4 py-1 rounded-full border border-[#4dffb7]/40 bg-[#4dffb7]/10">{formattedDate}</span>
          <span className="px-4 py-1 rounded-full border border-[#4dffb7]/40 bg-[#4dffb7]/10">{formattedTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] uppercase text-white mb-6">
          {eventDetails?.name ?? 'Project Showcase'}
        </h1>

        <p className="text-sm text-[#c9f6dd] leading-relaxed mb-8">
          {loading
            ? 'Loading the clan intel for this showcase...'
            : error ?? eventDetails?.description ?? 'Event details coming soon.'}
        </p>

        <Link
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4dffb7] text-black font-bold tracking-[0.2em] uppercase shadow-[0_16px_40px_rgba(77,255,183,0.2)] transition-transform duration-150 hover:-translate-y-0.5"
          to="/events/project-showcase/register"
        >
          Register Now
        </Link>
      </div>
    </main>
  )
}

export default ProjectShowcasePage
