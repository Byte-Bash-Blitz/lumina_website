import React, { useEffect, useMemo, useState } from 'react'
import { supabase, PROJECT_SHOWCASE_EVENT_ID } from '../lib/supabaseClient'

const initialFormState = {
  name: '',
  reg_no: '',
  department: '',
  year: '',
  section: '',
  clan: '',
  email: '',
  project_title: '',
  description: '',
  category: '',
}

const clans = ['Aura7f', 'Belmonts', 'Lumina', 'Shadastria Adepti']
const departments = ['CSE', 'AI & DS']
const sections = ['A', 'B']

const ProjectShowcaseRegisterPage = () => {
  const [formValues, setFormValues] = useState(initialFormState)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState('idle')
  const [schedule, setSchedule] = useState([])
  const [loadingSchedule, setLoadingSchedule] = useState(true)
  const [formDisabled, setFormDisabled] = useState(false)

  const slotMessages = useMemo(
    () => [
      'Slots lock in the moment you submit. If all 20 are gone, registration will throw an error.',
      'Check the schedule table below right after submitting — your slot should appear instantly.',
      'Need a swap after assignment? Ping the clan council so they can release an occupied slot.',
      'Keep your details accurate. Each registration reserves one unique showcase slot automatically.',
    ],
    []
  )

  const slotNote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * slotMessages.length)
    return slotMessages[randomIndex]
  }, [slotMessages])

  useEffect(() => {
    let isMounted = true

    if (!supabase) {
      setStatusMessage('Supabase environment values are missing. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      setStatusType('error')
      setFormDisabled(true)
      setLoadingSchedule(false)
      return
    }

    async function loadSchedule() {
      const { data, error } = await supabase
        .from('registrations')
        .select('slot, name, clan, project_title, reg_no, event_id')
        .in('event_id', [PROJECT_SHOWCASE_EVENT_ID, 'project_showcase_community_2025_day2'])
        .order('slot', { ascending: true })

      if (!isMounted) return

      if (error) {
        setStatusMessage('Unable to fetch schedule right now. Please retry in a bit.')
        setStatusType('error')
      } else {
        setSchedule(data ?? [])
      }
      setLoadingSchedule(false)
    }

    loadSchedule()

    const channel = supabase?.channel?.('project-showcase-registrations')
    if (channel) {
      channel
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'registrations' },
          () => {
            loadSchedule()
          }
        )
        .subscribe()
    }

    return () => {
      isMounted = false
      channel?.unsubscribe()
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!supabase) {
      setStatusMessage('Supabase client is not configured.')
      setStatusType('error')
      return
    }

    setStatusMessage('Submitting registration...')
    setStatusType('pending')

    const payload = {
      ...formValues,
      event_id: PROJECT_SHOWCASE_EVENT_ID,
    }

    const { data, error } = await supabase
      .from('registrations')
      .insert(payload)
      .select('id, slot')
      .single()

    if (error) {
      console.error('[Supabase] Registration insert failed', error)
      if (error.code === 'P0001') {
        setStatusMessage('All showcase slots are currently full. Contact the clan council to join the waitlist.')
      } else if (error.code === '23505') {
        setStatusMessage('You already registered with this number. Reach out if you need to update details.')
      } else {
        setStatusMessage('Registration failed. If this persists, contact the clan council.')
      }
      setStatusType('error')
      return
    }

    const assignedSlot = data?.slot ?? 'Pending'
    const slotConfirmed = assignedSlot && assignedSlot !== 'Pending'

    const confirmationMessage = slotConfirmed
      ? `Registered successfully. Your slot is ${assignedSlot}. Save this slot number for reference.`
      : 'Registered successfully. Slot assignment is processing — refresh in a few seconds.'

    setStatusMessage(confirmationMessage)
    setStatusType('success')
    setFormValues(initialFormState)
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#050c0a] text-[#ecfff6] px-3 sm:px-6 lg:px-8 pt-32 pb-16">
      <div className="max-w-5xl mx-auto grid gap-12 w-full">
        <section className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.1em] sm:tracking-[0.25em] uppercase text-white">
            Project Showcase Registration
          </h1>
          <p className="text-sm leading-relaxed text-[#7debb9] bg-[#133125] border border-[#4dffb7]/30 rounded-2xl px-5 py-4">
            {slotNote}
          </p>
        </section>

        <section className="w-full">
          <form
            className="w-full max-w-3xl mx-auto bg-[#091915]/85 border border-[#4dffb7]/35 rounded-2xl sm:rounded-3xl px-3 py-5 sm:px-8 sm:py-8 grid gap-6"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
                Full Name
                <input
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="name"
                  type="text"
                  required
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="Steve"
                />
              </label>
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
                Registration No.
                <input
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="reg_no"
                  type="text"
                  required
                  value={formValues.reg_no}
                  onChange={handleChange}
                  placeholder="23RUAI063"
                />
              </label>
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
                Email
                <input
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="email"
                  type="email"
                  required
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
                Department
                <select
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="department"
                  required
                  value={formValues.department}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
                Year
                <select
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="year"
                  required
                  value={formValues.year}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select year
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
                Section
                <select
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="section"
                  required
                  value={formValues.section}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select section
                  </option>
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
                Clan
                <select
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="clan"
                  required
                  value={formValues.clan}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select clan
                  </option>
                  {clans.map((clan) => (
                    <option key={clan} value={clan}>
                      {clan}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em] md:col-span-2">
                Project Title
                <input
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="project_title"
                  type="text"
                  required
                  value={formValues.project_title}
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em] md:col-span-2">
                Category
                <input
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm"
                  name="category"
                  type="text"
                  required
                  value={formValues.category}
                  onChange={handleChange}
                  placeholder="AI / Automation"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 uppercase text-[11px] tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
              Project Description
              <textarea
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#05110e] border border-[#4dffb7]/20 text-sm min-h-[120px] sm:min-h-[140px]"
                name="description"
                required
                value={formValues.description}
                onChange={handleChange}
                placeholder="Summarize the problem, tech stack, and what the showcase promises."
              />
            </label>

            {statusMessage && (
              <p
                className={`text-[11px] tracking-[0.1em] uppercase sm:text-xs sm:tracking-[0.15em] ${
                  statusType === 'error'
                    ? 'text-[#ff8f8f]'
                    : statusType === 'success'
                    ? 'text-[#4dffb7]'
                    : 'text-[#c9f6dd]'
                }`}
              >
                {statusMessage}
              </p>
            )}

            <div className="flex justify-end">
              <button
                className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-[#4dffb7] text-black font-bold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.25em] uppercase"
                type="submit"
                disabled={formDisabled || statusType === 'pending'}
              >
                {statusType === 'pending' ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </section>

        <section className="w-full">
          <div className="w-full max-w-4xl mx-auto bg-[#091915]/85 border border-[#4dffb7]/35 rounded-2xl sm:rounded-3xl px-3 py-5 sm:px-8 sm:py-8 space-y-8">
            {/* Day 1 Schedule */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-white mb-4 sm:mb-6">
                Day 1 Schedule
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-[#4dffb7]/25">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#133125] text-[#4dffb7] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Slot</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Name</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Clan</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Project Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingSchedule ? (
                      <tr>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-center text-[#c9f6dd] text-xs sm:text-sm" colSpan={4}>
                          Loading schedule...
                        </td>
                      </tr>
                    ) : schedule.filter((e) => e.event_id === PROJECT_SHOWCASE_EVENT_ID).length === 0 ? (
                      <tr>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-center text-[#c9f6dd] text-xs sm:text-sm" colSpan={4}>
                          Day 1 slots will appear here once assigned.
                        </td>
                      </tr>
                    ) : (
                      schedule
                        .filter((e) => e.event_id === PROJECT_SHOWCASE_EVENT_ID)
                        .slice()
                        .sort((a, b) => (a.slot ?? '').localeCompare(b.slot ?? ''))
                        .map((entry) => (
                          <tr key={`day1-${entry.reg_no ?? entry.name}-${entry.slot ?? 'pending'}`} className="odd:bg-[#0b1f17]/60">
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-[#7debb9] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-xs sm:text-sm">
                              {entry.slot ?? 'Pending'}
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{entry.name}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-[#c9f6dd] text-xs sm:text-sm">{entry.clan ?? '—'}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-[#c9f6dd] text-xs sm:text-sm">{entry.project_title}</td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Day 2 Schedule */}
            {schedule.filter((e) => e.event_id === 'project_showcase_community_2025_day2').length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-white mb-4 sm:mb-6">
                  Day 2 Schedule (Overflow)
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-[#4dffb7]/25">
                  <table className="min-w-full text-sm">
                    <thead className="bg-[#133125] text-[#4dffb7] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                      <tr>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Slot</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Name</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Clan</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Project Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule
                        .filter((e) => e.event_id === 'project_showcase_community_2025_day2')
                        .slice()
                        .sort((a, b) => (a.slot ?? '').localeCompare(b.slot ?? ''))
                        .map((entry) => (
                          <tr key={`day2-${entry.reg_no ?? entry.name}-${entry.slot ?? 'pending'}`} className="odd:bg-[#0b1f17]/60">
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-[#7debb9] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-xs sm:text-sm">
                              {entry.slot ?? 'Pending'}
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{entry.name}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-[#c9f6dd] text-xs sm:text-sm">{entry.clan ?? '—'}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-[#c9f6dd] text-xs sm:text-sm">{entry.project_title}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProjectShowcaseRegisterPage
