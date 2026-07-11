import React from "react";
import { Link } from "react-router-dom";
import LuminaMascot from "./LuminaMascot/LuminaMascot";

const heroCards = [
  {
    icon: "⚡",
    title: "Latest Updates",
    description:
      "Stay informed with announcements, new clan activities, and community news.",
    link: "/events",
    color: "border-yellow-400",
  },
  {
    icon: "👥",
    title: "Meet the Bashers",
    description:
      "Explore every Lumina member, their roles, achievements, and journey.",
    link: "/members",
    color: "border-cyan-400",
  },
  {
    icon: "🏆",
    title: "Upcoming Events",
    description:
      "Coding competitions, presentations, technical workshops and much more.",
    link: "/events",
    color: "border-green-400",
  },
];

const stats = [
  {
    value: "50+",
    label: "Bashers",
  },
  {
    value: "15+",
    label: "Events",
  },
  {
    value: "100%",
    label: "Learning",
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpeg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-40 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-green-500/10 blur-[180px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-24 w-full">

        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/40 bg-black/40 mb-6">

              <span>🟩</span>

              <span className="text-green-300 text-sm font-semibold tracking-wider">

                BYTE • BASH • BLITZ

              </span>

            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">

              Welcome to

              <br />

              <span className="text-green-400">

                Lumina

              </span>

            </h1>

            <p className="mt-8 text-gray-300 text-lg leading-8 max-w-xl">

              A student-powered Minecraft-inspired technical clan where
              curiosity becomes innovation, teamwork becomes strength,
              and every Basher levels up through real projects,
              competitions and collaborative learning.

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/members"
                className="px-8 py-4 bg-green-600 hover:bg-green-500 transition rounded-lg font-bold shadow-lg hover:scale-105"
              >
                Meet Members
              </Link>

              <Link
                to="/events"
                className="px-8 py-4 border-2 border-white/20 hover:border-green-400 rounded-lg font-bold transition hover:bg-green-500/10"
              >
                Explore Events
              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mt-14">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 bg-black/40 rounded-xl p-5 text-center"
                >
                  <h2 className="text-3xl font-black text-green-400">

                    {item.value}

                  </h2>

                  <p className="text-sm text-gray-400 mt-2">

                    {item.label}

                  </p>

                </div>
              ))}
            </div>

          </div>
                    {/* RIGHT SIDE */}

          <div className="relative flex justify-center">

            {/* Glow Behind Mascot */}

            <div className="absolute w-[420px] h-[420px] rounded-full bg-green-500/20 blur-[120px] animate-pulse" />

            {/* Floating Particles */}

            <div className="absolute inset-0 pointer-events-none">

              <div className="absolute left-10 top-16 text-yellow-300 animate-bounce text-xl">
                ✨
              </div>

              <div
                className="absolute right-10 top-24 text-cyan-300 text-xl"
                style={{
                  animation: "bounce 3s infinite",
                }}
              >
                💎
              </div>

              <div
                className="absolute left-20 bottom-24 text-green-400"
                style={{
                  animation: "pulse 2s infinite",
                }}
              >
                🌿
              </div>

            </div>

            {/* Mascot */}

            <div className="relative z-20">

              <LuminaMascot />

            </div>

          </div>

        </div>

        {/* ========================= */}

        {/* FEATURE CARDS */}

        {/* ========================= */}

        <div className="grid md:grid-cols-3 gap-8 mt-24">

          {heroCards.map((card) => (

            <Link
              key={card.title}
              to={card.link}
              className={`group relative overflow-hidden bg-[#1a1a1a]/80 backdrop-blur-md rounded-xl border-2 ${card.color} transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(34,197,94,.35)]`}
            >

              {/* Pixel Decoration */}

              <div className="absolute right-0 top-0 w-20 h-20 bg-green-500/10 rotate-45 translate-x-10 -translate-y-10" />

              <div className="relative p-8">

                <div className="text-5xl mb-6 group-hover:scale-110 transition">

                  {card.icon}

                </div>

                <h3 className="text-2xl font-bold text-white mb-4">

                  {card.title}

                </h3>

                <p className="text-gray-400 leading-7">

                  {card.description}

                </p>

                <div className="mt-8 flex items-center text-green-400 font-semibold">

                  Explore

                  <span className="ml-2 group-hover:translate-x-2 transition">

                    →

                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* ========================= */}

        {/* LIVE SERVER PANEL */}

        {/* ========================= */}

        <div className="mt-20">

          <div className="rounded-2xl border border-green-500/30 bg-black/60 backdrop-blur-md p-8">

            <div className="flex flex-col md:flex-row justify-between gap-10">

              <div>

                <p className="text-green-400 font-bold tracking-widest">

                  LUMINA STATUS

                </p>

                <h2 className="text-4xl font-black text-white mt-3">

                  Byte Bash Blitz Community

                </h2>

                <p className="text-gray-400 mt-5 max-w-2xl leading-8">

                  Join a community where coding meets creativity.
                  Participate in technical events, presentations,
                  collaborative projects, hackathons and continuous
                  learning inspired by Minecraft adventures.

                </p>

              </div>

              <div className="grid grid-cols-2 gap-5 min-w-[280px]">

                <div className="bg-green-600 rounded-xl p-5">

                  <p className="text-sm">

                    STATUS

                  </p>

                  <h3 className="text-2xl font-black mt-2">

                    ONLINE

                  </h3>

                </div>

                <div className="bg-cyan-600 rounded-xl p-5">

                  <p className="text-sm">

                    COMMUNITY

                  </p>

                  <h3 className="text-2xl font-black mt-2">

                    ACTIVE

                  </h3>

                </div>

                <div className="bg-yellow-500 rounded-xl p-5">

                  <p className="text-sm">

                    EVENTS

                  </p>

                  <h3 className="text-2xl font-black mt-2">

                    LIVE

                  </h3>

                </div>

                <div className="bg-purple-600 rounded-xl p-5">

                  <p className="text-sm">

                    PROJECTS

                  </p>

                  <h3 className="text-2xl font-black mt-2">

                    BUILDING

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>
                {/* ===================================== */}
        {/* Scroll Down */}
        {/* ===================================== */}

        <div className="flex flex-col items-center mt-20">

          <span className="text-gray-400 text-sm tracking-[0.35em] uppercase">

            Begin Your Adventure

          </span>

          <div className="mt-5 animate-bounce">

            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* Bottom Fade */}
      {/* ===================================== */}

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      {/* ===================================== */}
      {/* Pixel Decorations */}
      {/* ===================================== */}

      <div className="absolute top-24 left-12 w-4 h-4 bg-green-500 opacity-40 animate-pulse" />
      <div className="absolute top-48 right-16 w-3 h-3 bg-yellow-400 opacity-50 animate-pulse" />
      <div className="absolute bottom-44 left-24 w-5 h-5 bg-cyan-400 opacity-30 animate-pulse" />
      <div className="absolute bottom-60 right-24 w-3 h-3 bg-green-300 opacity-40 animate-pulse" />

    </section>
  );
};

export default Hero;