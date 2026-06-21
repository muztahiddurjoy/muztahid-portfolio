import { getPayload } from 'payload'
import config from '@payload-config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Public contact endpoint. Validates, rejects honeypot spam, and stores the
 * message in the `contact-submissions` collection. Wire an email transport in
 * payload.config (e.g. Resend/SMTP) to also get notified on each submission.
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
  const message = String(body.message ?? '').trim()
  const honeypot = String(body.company ?? '').trim()

  // Honeypot: a real person never fills "company". Pretend success, store nothing.
  if (honeypot) return Response.json({ ok: true })

  if (!name || !email || !message || !EMAIL_RE.test(email) || message.length > 5000) {
    return Response.json({ ok: false, error: 'Invalid submission' }, { status: 422 })
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        message,
        meta: { submittedFrom: request.headers.get('referer') || '' },
      },
    })
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact] failed to store submission', err)
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
