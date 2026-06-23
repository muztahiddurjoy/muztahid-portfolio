'use client'

import SessionDetail from '../sessions/session-detail'
import { mapSession } from '@/lib/mappers'
import { useLiveDoc } from './use-live-doc'
import { PreviewProvider } from '../preview-context'
import { siteConfig, type SessionPageData } from '@/lib/portfolio-data'

export function SessionLive({
  initialSession,
  labels,
}: {
  initialSession: Record<string, unknown>
  labels: SessionPageData
}) {
  const live = useLiveDoc(initialSession)
  return (
    <PreviewProvider>
      <SessionDetail
        session={mapSession(live)}
        prev={null}
        next={null}
        labels={labels}
        siteEmail={siteConfig.email}
      />
    </PreviewProvider>
  )
}
