import type { Metadata } from 'next'
import { getAchievements } from '@/lib/content'
import AchievementsPage from '../components/pages/achievements-page'

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Awards, competitions, leadership, and milestones — a builder’s proof of showing up.',
}

export default async function Page() {
  const achievements = await getAchievements()
  return <AchievementsPage achievements={achievements} />
}
