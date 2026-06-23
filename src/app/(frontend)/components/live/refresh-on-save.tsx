'use client'

import { RefreshRouteOnSave as PayloadRefresh } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/** Mounted (in draft mode) so any page refreshes when the previewed doc is saved.
 *  This is the on-save fallback for surfaces that aren't wrapped in an
 *  as-you-type live wrapper (list pages, chrome globals, collection lists). */
export function RefreshRouteOnSave() {
  const router = useRouter()
  return (
    <PayloadRefresh refresh={() => router.refresh()} serverURL={process.env.NEXT_PUBLIC_SITE_URL || ''} />
  )
}
