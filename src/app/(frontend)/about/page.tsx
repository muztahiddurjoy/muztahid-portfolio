import type { Metadata } from 'next'
import { getAbout } from '@/lib/content'
import AboutPage from '../components/pages/about-page'

export const metadata: Metadata = {
  title: 'Story',
  description: 'The story of a full-stack engineer and relentless builder who ships products, systems, and autonomous robots.',
}

export default async function Page() {
  const story = await getAbout()
  return <AboutPage story={story} />
}
