'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

const SERVER_URL = process.env.NEXT_PUBLIC_SITE_URL || ''

/** Subscribe to live-preview form state for the doc currently open in the admin.
 *  Returns the raw (Payload-shaped) document, updated as-you-type. Feed it
 *  through the matching `mapX` to get UI props. */
export function useLiveDoc<T extends Record<string, unknown>>(initialData: T): T {
  const { data } = useLivePreview<T>({ initialData, serverURL: SERVER_URL, depth: 1 })
  return data
}
