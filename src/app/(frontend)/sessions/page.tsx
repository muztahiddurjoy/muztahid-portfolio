import type { Metadata } from 'next'
import { getSessions, getSessionsPage } from '@/lib/content'
import SessionsPage from '../components/pages/sessions-page'

export async function generateMetadata(): Promise<Metadata> {
  const chrome = await getSessionsPage()
  return {
    title: chrome.metaTitle,
    description: chrome.metaDescription,
  }
}

export default async function Page() {
  const [sessions, chrome] = await Promise.all([getSessions(), getSessionsPage()])
  return <SessionsPage sessions={sessions} chrome={chrome} />
}
