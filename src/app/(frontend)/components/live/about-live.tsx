'use client'

import AboutPage from '../pages/about-page'
import { mapAbout } from '@/lib/mappers'
import { useLiveDoc } from './use-live-doc'
import { PreviewProvider } from '../preview-context'

export function AboutLive({ initialAbout }: { initialAbout: Record<string, unknown> }) {
  const live = useLiveDoc(initialAbout)
  return (
    <PreviewProvider>
      <AboutPage story={mapAbout(live)} />
    </PreviewProvider>
  )
}
