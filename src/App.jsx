import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MembersPage from './pages/MembersPage'
import EventsPage from './pages/EventsPage'
import ProjectsPage from './pages/ProjectsPage'
import JoinClanPage from './pages/JoinClanPage'
import GalleryPage from './pages/GalleryPage'
import MemberProfilePage from './pages/MemberProfilePage'
import ProjectShowcasePage from './pages/ProjectShowcasePage'
import ProjectShowcaseRegisterPage from './pages/ProjectShowcaseRegisterPage'
import RallyRegistrationPage from './pages/RallyRegistrationPage'
import DynamicCursor from './components/DynamicCursor'

function ScrollRestoration() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden" style={{ cursor: 'none' }}>
        <DynamicCursor />
        <ScrollRestoration />
        <Navbar scrolled={scrolled} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/member/:id" element={<MemberProfilePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/events/lumina-radiance-rally/register" element={<RallyRegistrationPage />} />
          <Route path="/events/project-showcase" element={<ProjectShowcasePage />} />
          <Route path="/events/project-showcase/register" element={<ProjectShowcaseRegisterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/rules" element={<GalleryPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
