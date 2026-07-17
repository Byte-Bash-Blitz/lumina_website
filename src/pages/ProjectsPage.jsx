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
    name: 'Lumina Quiz',
    owner: 'Lumina Clan',
    category: 'Education · Utility',
    status: 'Live',
    stack: 'HTML · CSS · JavaScript',
    description:
      'Lumina Quiz is an interactive programming quiz platform built for practicing multiple coding languages. It allows users to test their technical skills, tackle language-specific question sets, and sharpen their programming fundamentals through a clean and responsive web environment.',
    link: 'https://lumina-den.github.io/Lumina-Quiz/',
  },
    {
    name: 'Image Classifier',
    owner: 'Vishal',
    category: 'Artificial Intelligence · Utility',
    status: 'Live',
    stack: 'TensorFlow · Keras',
    description:
      'A convolutional neural network (CNN) machine learning model built to process visual inputs and classify human facial expressions or images based on targeted behavioral states.',
    link: 'https://github.com/Vishal-46/CNN',
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
  {
    name: 'DataAnalyzer',
    owner: 'Vishal',
    category: 'Utility · Analytics',
    status: 'Live',
    stack: 'Streamlit · scikit-learn · Python',
    description:
      'An intelligent, interactive web app that analyzes datasets in CSV, Excel, or JSON format. It leverages a robust data engineering and machine learning foundation to deliver clean, actionable insights instantly.',
    link: 'https://github.com/Vishal-46/Dataset-analyser',
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
    name: 'SR Bot',
    owner: 'Moun Sando Falin A',
    category: 'Utility · Automation',
    status: 'Live',
    stack: 'Django · RAG',
    description:
      'An intelligent automated chatbot utilizing Retrieval-Augmented Generation (RAG) architecture and a Django backend to deliver highly precise, context-aware responses tailored to specific document datasets.',
    link: '',
  },
  {
    name: 'Scopio',
    owner: 'Moun Sando Falin A',
    category: 'EdTech · Platform',
    status: 'Live',
    stack: 'Django · React · Azure',
    description:
      'A comprehensive E-learning platform startup designed to bridge the gap between students and modern digital course delivery with modular web structures and cloud hosting.',
    link: 'https://scopio.in',
  },
  {
    name: 'Infance Tony Portfolio',
    owner: 'Infance Tony E',
    category: 'Personal Portfolio',
    status: 'Live',
    stack: 'Web Stack',
    description:
      'A professional personal landing page mapping individual full-stack capabilities, system setups, and custom developer projects with an optimized layout.',
    link: 'https://infance.tech',
  },
  {
    name: 'Hamdhan Data Verse',
    owner: 'Hamdhan hussain',
    category: 'Data Engineering · Repository',
    status: 'Live',
    stack: 'GitHub',
    description:
      'A centralized public collection of data engineering workflows, technical reference documents, and database scripts assembled to optimize ETL operations.',
    link: 'https://github.com/hamdhan-17/hamdhans-data-verse',
  },
  {
    name: 'weather ETL',
    owner: 'Hamdhan hussain',
    category: 'Data Engineering · Utility',
    status: 'Live',
    stack: 'Python · Pandas · PostgreSQL · psycopg2',
    description:
      'A dedicated data pipeline that extracts raw meteorological data in JSON format, executes programmatic cleaning and schema transformations using Pandas, and safely loads the refined records into a PostgreSQL database.',
    link: '',
  },
  {
    name: 'VTS GLOBAL',
    owner: 'Abin I',
    category: 'Logistics · Corporate',
    status: 'Live',
    stack: 'TypeScript · CSS · JavaScript · HTML',
    description:
      'A high-performance, fully responsive corporate logistics web application designed for VTS Global to effectively showcase specialized supply chain services, comprehensive shipment details, and core client portals.',
    link: 'https://vtsglobal.com.sg/',
  },
  {
    name: 'SEN TECH',
    owner: 'Abin I',
    category: 'Corporate Website',
    status: 'Live',
    stack: 'HTML · CSS · JavaScript',
    description:
      'A modern corporate landing page built with fluid layout components, emphasizing optimized load speeds and upgraded navigation structures for a cleaner customer experience.',
    link: 'https://sentechgroup.com.sg/',
  },
  {
    name: 'Expenses tracker',
    owner: 'Nithisha P. N',
    category: 'Utility · Finance',
    status: 'Live',
    stack: 'Python · MySQL',
    description:
      'A secure personal finance management program built to catalog operational cash flow. It empowers users to record daily income streams, monitor granular expenditure habits, and retain long-term relational control over their personal budgeting.',
    link: 'https://lovable.dev/projects/b892721e-ffec-4195-85d4-3878067cd541',
  },
  {
    name: 'Edventra',
    owner: 'SV Aparna Suresh',
    category: 'EdTech · Utility',
    status: 'Live',
    stack: 'HTML · CSS · JavaScript · Python',
    description:
      'An educational application providing dynamic digital learning support. Built with a highly accessible user-friendly layout, it focuses on simplifying study tracking and remote asset management.',
    link: '',
  },
  {
    name: 'Medimind',
    owner: 'SV Aparna Suresh',
    category: 'Healthcare · Information',
    status: 'Live',
    stack: 'HTML · CSS · JavaScript',
    description:
      'A foundational healthcare-focused web hub tailored to dispense verified, baseline medical information and basic preventative guidelines to everyday users seeking reliable self-care clarity.',
    link: '',
  },
  {
    name: 'Aptitude Practice Platform',
    owner: 'Akshaya Libin Sibcy.L',
    category: 'EdTech · Assessment',
    status: 'Live',
    stack: 'HTML · CSS',
    description:
      'A robust test preparation interface featuring comprehensive modules for quantitative aptitude, analytical reasoning, and verbal mechanics. Includes dynamic metric trackers and integrated timers to build testing confidence.',
    link: 'https://akshayaportfolio-eight.vercel.app/',
  },
  {
    name: 'Data Visualization App',
    owner: 'Linciya S',
    category: 'Utility · Analytics',
    status: 'Live',
    stack: 'Streamlit · Pandas · Plotly Express · scikit-learn',
    description:
      'A comprehensive data parsing dashboard using Streamlit to present metrics via Plotly, Seaborn, and Matplotlib. Employs core machine learning models like Naive Bayes and Random Forest, alongside custom PDF report engines.',
    link: '',
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
    name: 'Tharun Krishna Portfolio',
    owner: 'Tharun Krishna K R',
    category: 'Personal Portfolio',
    status: 'Live',
    stack: 'TypeScript',
    description:
      'A self-made, interactive professional portfolio designed for a Cybersecurity student to showcase core security competencies, technical skills, and completed academic projects.',
    link: 'https://tharunkrishna.vercel.app/',
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