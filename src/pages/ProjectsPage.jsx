import React from 'react'
import { Link } from 'react-router-dom'



const projects = [
  {
    name: 'Lumina Spinner',
  owner: 'Lumina Clan',
  category: 'Entertainment · Utility',
  status: 'Live',
  stack: 'React · Vercel',
  description:
    'Lumina Spinner is a fun and interactive random selection tool built for the Lumina Clan community. It allows users to spin a customizable wheel to randomly choose members, teams, tasks, or events with smooth animations and an engaging interface. Designed with React and deployed on Vercel, it offers a fast, responsive, and enjoyable experience for community activities and decision-making.',
    link: 'https://lumina-bash-spinner.vercel.app/',
  },
  {
    name: 'Vishal Portfolio',
  owner: 'Vishal',
  category: 'Personal Portfolio',
  status: 'Live',
  stack: 'React · Vercel',
  description:
    'Vishal Portfolio is a personal showcase of my work and skills as a developer. It features a modern design, smooth animations, and an engaging interface to highlight my projects and experience.',
    link: 'https://personal-portfolio-vishal.vercel.app/',
  },

  {
    name: 'Windows-7-Portfolio-Naveen',
    owner: 'Naveen',
    category: 'Personal Portfolio',
    status: 'Live',
    stack: 'HTML · CSS · JavaScript',
    description:
      'A Windows 7-style interactive portfolio website with desktop apps, start menu navigation, and portfolio sections rendered as in-window pages.',
    link: 'http://nrnnaveen.github.io/Windows-7-Portfolio-Naveen/',
  },
  {
    name: 'Aparna Mindscape',
    owner: 'Aparna',
    category: 'UI/UX + Web',
    status: 'Live',
    stack: 'Lovable · Interface Design',
    description:
      'A polished experience focused on visual storytelling, layout clarity, and immersive digital presentation.',
    link: 'https://aparna-mindscape.lovable.app/',
  },
  {
    name: 'SQL Mobile Playground',
    owner: 'Naveen',
    category: 'Learn / Practice SQL',
    status: 'Live',
    stack: 'Python · SQL · Web',
    description:
      'A cutting-edge SQL learning platform built for the modern developer. Practice complex queries, optimize your database skills, and become a SQL expert right from your mobile device.',
    link: 'https://sql-practice-mobile-playground.vercel.app/',
  },
  

  
]

const statusStyles = {
  Live: 'bg-emerald-400/15 text-emerald-200 border border-emerald-400/35',
  Open: 'bg-[#7bffce]/15 text-[#7bffce] border border-[#7bffce]/35',
}

const ProjectsPage = () => {
  return (
    <section className="min-h-screen bg-minecraft-darker relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(123,255,206,0.12),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(85,255,85,0.08),_transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-14">
          <p className="inline-flex items-center px-4 py-2 mb-5 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#7bffce] border border-[#7bffce]/30 bg-[#7bffce]/10 rounded-full">
            Lumina Project Vault
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 minecraft-shadow tracking-[0.18em] uppercase">
            Projects
          </h1>
          <p className="max-w-3xl mx-auto text-xs sm:text-sm text-minecraft-gray uppercase tracking-[0.22em] leading-relaxed">
            A block-built archive of clan creations And builds.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => {
            const statusClass = statusStyles[project.status] ?? statusStyles.Open
            const cardContent = (
              <>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-lg font-extrabold tracking-[0.18em] uppercase text-white leading-tight">
                      {project.name}
                    </h3>
                  </div>
                  <span className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.3em] ${statusClass}`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-xs text-white/78 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="space-y-3 mt-auto">
                  <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-white/60">
                    <span>Owner</span>
                    <span className="text-white">{project.owner}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-white/60">
                    <span>Stack</span>
                    <span className="text-white text-right">{project.stack}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 text-[10px] uppercase tracking-[0.28em] text-[#d9fff0] border border-white/10">
                    {project.internal ? 'Internal Route' : '⛏️ Open the Portal'}
                  </span>
                </div>
              </>
            )

            return project.internal ? (
              <Link
                key={project.name}
                to={project.link}
                className="group flex flex-col rounded-2xl border border-white/12 bg-[#06120f]/90 p-6 text-white shadow-[0_18px_45px_rgba(6,35,27,0.35)] transition-transform duration-150 hover:-translate-y-1 hover:border-[#7bffce]/45"
              >
                {cardContent}
              </Link>
            ) : (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-2xl border border-white/12 bg-[#06120f]/90 p-6 text-white shadow-[0_18px_45px_rgba(6,35,27,0.35)] transition-transform duration-150 hover:-translate-y-1 hover:border-[#7bffce]/45"
              >
                {cardContent}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProjectsPage