import type { Metadata } from 'next'
import AchievementsPage from '../components/pages/achievements-page'

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Awards, competitions, leadership, and milestones — a founder’s proof of showing up.',
}

export default function Page() {
  return <AchievementsPage />
}
