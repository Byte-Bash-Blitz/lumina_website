import React from 'react'
import { Link } from 'react-router-dom'

const EVENTS = [
  {
    title: 'Rookie Weekly Bash',
    date: 'Jan-31, 2026 · 9:30 AM - 3:30 PM IST',
    description:
      'Where rookies meet Bashers! Get introduced to all clans, explore their unique cultures, and choose your squad. Your clan journey starts here.',
    category: 'Community',
    status: 'Upcoming',
    image: '/eve_10.jpg',
    featured: true,
  },
  {
    title: 'Project Showcase',
    date: 'Jan-18, 2026 · 05:00 PM - 07:00 PM IST',
    description:
      'Builds were showcased, decks were presented, and clan tech took center stage. Check out the highlights and winning projects.',
    cta: 'View Recap',
    category: 'Community',
    status: 'Wrapped',
    image: '/eve_1.jpg',
  },
  {
    title: 'Weekly Bash',
    date: 'Every Saturday · 9:30 AM - 3:30 PM IST',
    description:
      'Clan DJs, meme reels, mini-games, and shout-outs. Drop in, boost morale, and recruit new allies.',
    cta: 'Join the Bash',
    category: 'Community',
    status: 'Live',
    image: '/eve_2.jpg',
  },
  {
    title: 'Community Gathering',
    date: 'Working days · 3:00 PM - 3:50 PM IST',
    description:
      'Meet the newest recruits, celebrate squad wins, and sync with partner crews across the network.',
    cta: 'Say Hello',
    category: 'Community',
    status: 'Upcoming',
    image: '/eve_3.jpg',
  },
  {
    title: 'Clan Strategy Gathering',
    date: 'Tuesdays · 12:30 PM IST',
    description: 'War-room intel, board review, and weeklong raid planning for internal squads only.',
    cta: 'RSVP for HQ',
    category: 'Inter-Clan',
    status: 'Upcoming',
    image: '/eve_4.jpg',
  },
  // {
  //   title: 'Project Showcase Night (internal)',
  //   date: 'Bi-weekly · 17:00 UTC',
  //   description: 'Closed-door walkthroughs of automation scripts, mod pipelines, and experimental tech.',
  //   cta: 'Book a Slot',
  //   category: 'Inter-Clan',
  //   status: 'Live',
  //   image: '/eve_5.jpg',
  // },
  {
    title: 'Co-op Gaming Lounge',
    date: 'Saturdays · 3:30 PM IST',
    description: 'Operators-only wrap party. Casual rotations and throwback tournaments now archived.',
    cta: 'Catch Highlights',
    category: 'Inter-Clan',
    status: 'Wrapped',
    image: '/eve_6.jpg',
  },
  {
    title: 'Creator Bootcamp',
    date: 'Next Month · 8:30 PM IST',
    description: 'Content ops intensive: streaming, editing, narrative building led by allied creators.',
    cta: 'Secure a Seat',
    category: 'Outside',
    status: 'Upcoming',
    image: '/eve_7.jpg',
  },
  {
    title: 'Ally Network Events',
    date: 'Rolling Invites',
    description: 'Cross-community quests, collab raids, and accelerator calls opened by partner orgs.',
    cta: 'View Invites',
    category: 'Outside',
    status: 'Live',
    image: '/eve_8.jpg',
  },
  {
    title: 'Build-a-thon Hack Weekend',
    date: 'Quarterly · 48h Sprint',
    description: 'Latest sprint archived. Mods, overlays, and tooling now live in the clan arsenal.',
    cta: 'See Recap',
    category: 'Outside',
    status: 'Wrapped',
    image: '/eve_9.jpg',
  },
]

const CATEGORY_ORDER = ['Community', 'Inter-Clan', 'Outside']
const STATUS_ORDER = ['Upcoming', 'Live', 'Wrapped']

const STATUS_META = {
  Upcoming: {
    label: 'Upcoming',
    tone: 'text-emerald-200',
    badge: 'bg-emerald-400/15 text-emerald-200 border border-emerald-400/40',
  },
  Live: {
    label: 'Live Now',
    tone: 'text-rose-200',
    badge: 'bg-rose-500/15 text-rose-200 border border-rose-400/40 animate-pulse',
  },
  Wrapped: {
    label: 'Wrapped Up',
    tone: 'text-slate-200',
    badge: 'bg-slate-500/15 text-slate-200 border border-slate-400/40',
  },
}

const sortEvents = (events) =>
  [...events].sort((a, b) => {
    const categoryDelta = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
    if (categoryDelta !== 0) return categoryDelta

    const statusDelta = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
    if (statusDelta !== 0) return statusDelta

    return a.title.localeCompare(b.title)
  })

const Events = () => {
  const sortedEvents = sortEvents(EVENTS)
  const featured = sortedEvents.find((event) => event.featured)
  const lineup = sortedEvents.filter((event) => !event.featured)

  return (
    <section className="min-h-screen bg-minecraft-darker py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-[0.18em] uppercase minecraft-shadow">
            Clan Events Dispatch
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-minecraft-gray uppercase tracking-[0.25em]">
            One scroll. All signal. Community broadcasts, inter-clan ops, and outside arena drops in one slate.
          </p>
        </header>

        {featured && (
          <article className="relative overflow-hidden rounded-3xl border border-[#7bffce]/60 bg-[#041410]/95 text-white shadow-[0_28px_80px_rgba(7,65,51,0.4)] mb-14">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-80 h-56 md:h-auto md:min-h-[260px] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center px-4 py-2 rounded-full border border-[#7bffce]/60 bg-[#7bffce]/20 text-[#7bffce] text-[10px] font-semibold tracking-[0.35em] uppercase">
                  Register Now!!
                </span>
              </div>

              <div className="flex-1 p-6 md:p-10 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#7bffce]">
                    <span>Community Broadcast</span>
                    <span className="text-white/60">·</span>
                    <span>{STATUS_META[featured.status]?.label ?? featured.status}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-[0.22em] uppercase text-white">
                    {featured.title}
                  </h2>
                  <p className="text-xs text-[#7debb9] uppercase tracking-[0.3em]">
                    {featured.date}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {featured.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase">
                  <span className="font-semibold tracking-[0.28em] text-emerald-200">
                    Status · {STATUS_META[featured.status]?.label ?? featured.status}
                  </span>
                  {featured.link ? (
                    <Link
                      to={featured.link}
                      className="px-6 py-3 rounded-full font-bold tracking-[0.35em] bg-[#7bffce] text-black border border-black/60 hover:bg-[#63fbc0] transition-all"
                    >
                      {featured.cta}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="px-6 py-3 rounded-full font-bold tracking-[0.35em] bg-[#7bffce] text-black border border-black/60"
                    >
                      {featured.cta}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {lineup.map((event) => {
            const statusInfo = STATUS_META[event.status] ?? STATUS_META.Upcoming

            return (
              <article
                key={`${event.title}-${event.status}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#06120f]/90 text-white shadow-[0_18px_45px_rgba(6,35,27,0.35)] transition-transform duration-150 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <span
                    className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.35em] ${statusInfo.badge}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <div className="flex-1 p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/50">
                      {event.category}
                    </span>
                    <h3 className="text-lg font-extrabold tracking-[0.2em] uppercase text-white">
                      {event.title}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
                      {event.date}
                    </p>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 text-[11px] uppercase">
                    <span className={`font-semibold tracking-[0.28em] ${statusInfo.tone}`}>
                      Status · {statusInfo.label}
                    </span>
                    {event.link ? (
                      <Link
                        to={event.link}
                        className="px-4 py-2 rounded-full font-bold tracking-[0.28em] bg-emerald-400 text-black border border-black/60 hover:bg-emerald-300 transition-all"
                      >
                        {event.cta}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-full font-bold tracking-[0.28em] bg-emerald-400 text-black border border-black/60"
                      >
                        {event.cta}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Events
