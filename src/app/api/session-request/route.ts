import { getPayload } from 'payload'
import config from '@payload-config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MODES = new Set(['online', 'offline', 'either'])

/**
 * Public session-booking endpoint. Validates, rejects honeypot spam, and stores
 * the request in the `session-requests` collection alongside which session it
 * came from. Wire an email transport in payload.config to also get notified.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const goal = String(body.goal ?? '').trim()
  const honeypot = String(body.company ?? '').trim()
  const rawMode = String(body.preferredMode ?? '').trim()
  const preferredMode = MODES.has(rawMode) ? (rawMode as 'online' | 'offline' | 'either') : undefined
  const preferredDate = String(body.preferredDate ?? '').trim().slice(0, 120)
  const sessionSlug = String(body.sessionSlug ?? '').trim().slice(0, 200)
  const sessionTitle = String(body.sessionTitle ?? '').trim().slice(0, 300)

  // Honeypot: a real person never fills "company". Pretend success, store nothing.
  if (honeypot) return Response.json({ ok: true })

  if (!name || !email || !goal || !EMAIL_RE.test(email) || goal.length > 5000) {
    return Response.json({ ok: false, error: 'Invalid submission' }, { status: 422 })
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'session-requests',
      data: {
        name,
        email,
        goal,
        ...(preferredMode ? { preferredMode } : {}),
        ...(preferredDate ? { preferredDate } : {}),
        sessionSlug,
        sessionTitle,
        meta: { submittedFrom: request.headers.get('referer') || '' },
      },
    })
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[session-request] failed to store request', err)
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
