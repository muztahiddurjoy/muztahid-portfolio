import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getAbout, getAboutRaw } from '@/lib/content'
import AboutPage from '../components/pages/about-page'
import { AboutLive } from '../components/live/about-live'

export async function generateMetadata(): Promise<Metadata> {
  const story = await getAbout()
  return {
    title: story.metaTitle,
    description: story.metaDescription,
  }
}

export default async function Page() {
  const { isEnabled } = await draftMode()
  if (isEnabled) {
    const initialAbout = await getAboutRaw()
    return <AboutLive initialAbout={initialAbout} />
  }
  const story = await getAbout()
  return <AboutPage story={story} />
}
