import type { Metadata } from 'next'
import { getAchievements, getAchievementsPage } from '@/lib/content'
import AchievementsPage from '../components/pages/achievements-page'

export async function generateMetadata(): Promise<Metadata> {
  const chrome = await getAchievementsPage()
  return {
    title: chrome.metaTitle,
    description: chrome.metaDescription,
  }
}

export default async function Page() {
  const [achievements, chrome] = await Promise.all([getAchievements(), getAchievementsPage()])
  return <AchievementsPage achievements={achievements} chrome={chrome} />
}
