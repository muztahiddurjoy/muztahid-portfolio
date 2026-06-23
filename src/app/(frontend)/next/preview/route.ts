import { draftMode, headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

// Draft-mode entry point used by Payload Live Preview. The admin loads this URL
// inside the preview iframe; it verifies the preview secret AND that the caller
// is an authenticated Payload user, enables Next draft mode, then redirects to
// the real frontend path (which then renders its live wrapper).
export const dynamic = 'force-dynamic'

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const secret = searchParams.get('secret')

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 403 })
  }
  if (!path || !path.startsWith('/')) {
    return new Response('Invalid preview path', { status: 400 })
  }

  // Only logged-in admins may enter preview (the admin session cookie travels
  // with the same-origin iframe request).
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await nextHeaders() })
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
