/**
 * Seed ONLY the Sessions section — safely and idempotently.
 *
 *   npm run seed:sessions
 *
 * Unlike the full `npm run seed` (which resets every content collection),
 * this is **non-destructive**:
 *   - upserts the sessions-page + session-page chrome globals,
 *   - creates the starter sessions ONLY if the collection is empty (never
 *     clobbers sessions you've authored in the admin),
 *   - appends "Sessions" to the site nav only if it isn't already there.
 *
 * Safe to run against a populated production database to light up the new
 * section without touching projects, articles, or your edits.
 */
import 'dotenv/config'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'
import { sessions, sessionsPage, sessionPage, type Session } from '../lib/portfolio-data'

/* ---- shared builders (also consumed by the full seed) ---- */

export const sessionsPageData = { ...sessionsPage }

// `errors` is a reserved Mongoose pathname; the CMS field is `errorMessages`.
const { errors: bookingErrors, ...bookingRest } = sessionPage.booking
export const sessionPageData = {
  detail: { ...sessionPage.detail },
  booking: { ...bookingRest, errorMessages: { ...bookingErrors } },
  pager: { ...sessionPage.pager },
}

/** Build the Payload create payload for one session (cover image is a static
 *  default resolved by the mapper, so only label/caption are persisted). */
export const sessionCreateData = (s: Session, order = 0) => ({
  title: s.title,
  slug: s.slug,
  tagline: s.tagline,
  mode: s.mode,
  format: s.format,
  level: s.level,
  ...(s.date ? { date: s.date } : {}),
  featured: s.featured,
  availability: s.availability,
  summary: s.summary,
  cover: { label: s.cover.label, caption: s.cover.caption },
  logistics: {
    duration: s.logistics.duration,
    price: s.logistics.price,
    capacity: s.logistics.capacity,
    location: s.logistics.location,
    languages: s.logistics.languages,
    deliveryNote: s.logistics.deliveryNote,
  },
  topics: s.topics,
  audience: s.audience,
  highlights: s.highlights.map((point) => ({ point })),
  agenda: s.agenda.map((a) => ({ title: a.title, detail: a.detail })),
  prerequisites: s.prerequisites.map((item) => ({ item })),
  faqs: s.faqs.map((f) => ({ question: f.question, answer: f.answer })),
  testimonials: s.testimonials.map((t) => ({ quote: t.quote, author: t.author, role: t.role })),
  booking: {
    type: s.booking.type,
    url: s.booking.url,
    email: s.booking.email,
    note: s.booking.note,
  },
  links: s.links.map((l) => ({ label: l.label, url: l.url })),
  order,
  _status: 'published' as const,
})

/** Ensure "Sessions" is in the site nav (idempotent, non-destructive). */
async function ensureNav(payload: Payload) {
  const site = (await payload.findGlobal({ slug: 'site-settings', depth: 0 })) as { nav?: unknown }
  const nav = Array.isArray(site?.nav)
    ? (site.nav as { label?: string; href?: string }[]).map((n) => ({ label: String(n.label ?? ''), href: String(n.href ?? '') }))
    : []
  if (nav.some((n) => n.href === '/sessions')) return false
  const item = { label: 'Sessions', href: '/sessions' }
  const after = nav.findIndex((n) => n.href === '/projects')
  if (after >= 0) nav.splice(after + 1, 0, item)
  else nav.push(item)
  await payload.updateGlobal({ slug: 'site-settings', data: { nav } })
  return true
}

/** The reusable routine. `resetFirst` wipes + recreates (used by the full seed);
 *  otherwise sessions are only created when the collection is empty. */
export async function seedSessions(
  payload: Payload,
  { resetFirst = false, appendNav = true }: { resetFirst?: boolean; appendNav?: boolean } = {},
) {
  await payload.updateGlobal({ slug: 'sessions-page', data: sessionsPageData })
  await payload.updateGlobal({ slug: 'session-page', data: sessionPageData })

  if (resetFirst) {
    const existing = await payload.find({ collection: 'sessions', limit: 1000, depth: 0 })
    for (const doc of existing.docs) await payload.delete({ collection: 'sessions', id: doc.id })
  }

  const { totalDocs } = await payload.find({ collection: 'sessions', limit: 1, depth: 0 })
  let created = 0
  if (resetFirst || totalDocs === 0) {
    for (let i = 0; i < sessions.length; i++) {
      await payload.create({ collection: 'sessions', data: sessionCreateData(sessions[i], i) })
      created++
    }
  }

  const navChanged = appendNav ? await ensureNav(payload) : false
  return { created, skipped: created === 0, navChanged }
}

/* ---- standalone entry: `npm run seed:sessions` ---- */
const run = async () => {
  const payload = await getPayload({ config })
  payload.logger.info('🌱 Seeding the Sessions section (non-destructive)…')
  const { created, skipped, navChanged } = await seedSessions(payload, { resetFirst: false, appendNav: true })
  payload.logger.info(
    `✅ Sessions seed complete — ${
      skipped ? 'sessions already present (left untouched)' : `${created} sessions created`
    }; chrome globals upserted; nav ${navChanged ? 'updated' : 'already had Sessions'}.`,
  )
  process.exit(0)
}

// Only auto-run when invoked directly (not when imported by the full seed).
if (process.argv[1] && process.argv[1].includes('seed-sessions')) {
  run().catch((err) => {
    console.error('❌ Sessions seed failed:', err)
    process.exit(1)
  })
}
