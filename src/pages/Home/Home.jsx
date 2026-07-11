import React, { Suspense, lazy } from 'react'

import Hero from './Hero'
import FallingStraw from '../../components/FallingStraw'
import CherryBlossoms from '../../components/CherryBlossoms'
import UpcomingEventPopup from "./UpcomingEventPopup";

// Lazy loaded sections
const QuickStats = lazy(() => import('./QuickStats'))
const QuestBook = lazy(() => import('./QuestBook'))
const WhyJoinLumina = lazy(() => import('./WhyJoinLumina'))
const GalleryPreview = lazy(() => import('./GalleryPreview'))
const JourneyTimeline = lazy(() => import('./JourneyTimeline'))
const CallToAction = lazy(() => import('./CallToAction'))

const SectionFallback = () => (
  <div className="py-20 flex justify-center" aria-hidden="true">
    <div className="w-10 h-10 border-4 border-mc-emerald/40 border-t-mc-emerald rounded-full animate-mc-spin-slow" />
  </div>
)

const Home = () => {
  return (
    <div>
      <Hero />
      <FallingStraw />
      <CherryBlossoms />

      <UpcomingEventPopup />

      <Suspense fallback={<SectionFallback />}>
        <QuickStats />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <QuestBook />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WhyJoinLumina />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <GalleryPreview />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CallToAction />
      </Suspense>
    </div>
  )
}

export default Home