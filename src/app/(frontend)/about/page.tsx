import type { Metadata } from 'next'
import { getAbout } from '@/lib/content'
import AboutPage from '../components/pages/about-page'

export const metadata: Metadata = {
  title: 'Story',
  description: 'The story of a founder who builds companies and the technology that makes them inevitable.',
}

export default async function Page() {
  const story = await getAbout()
  return <AboutPage story={story} />
}
