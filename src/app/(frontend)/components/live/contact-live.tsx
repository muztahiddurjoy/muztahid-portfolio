'use client'

import ContactPage from '../pages/contact-page'
import { mapContact } from '@/lib/mappers'
import { useLiveDoc } from './use-live-doc'
import { PreviewProvider } from '../preview-context'
import type { SiteConfig } from '@/lib/portfolio-data'

export function ContactLive({
  initialContact,
  site,
}: {
  initialContact: Record<string, unknown>
  site: SiteConfig
}) {
  const live = useLiveDoc(initialContact)
  return (
    <PreviewProvider>
      <ContactPage contact={mapContact(live)} siteConfig={site} />
    </PreviewProvider>
  )
}
