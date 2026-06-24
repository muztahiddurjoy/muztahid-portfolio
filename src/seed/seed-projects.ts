/**
 * Project seeding — shared by the full seed (`seed.ts`) and the focused
 * `npm run seed:projects` runner (`seed-projects-run.ts`).
 *
 * Projects come from the curated GitHub import (`lib/github-projects.ts`, re-
 * exported as `projects`). Each project's GitHub Open Graph card is stored as
 * an external `cover.url` (no upload needed); the curated array order is pinned
 * via `order` so featured work sits at the top of the list.
 */
import type { Payload } from 'payload'
import { projects, type Project } from '../lib/portfolio-data'

/** Shape a curated Project into the Projects-collection create payload. */
export function projectCreateData(v: Project, index: number) {
  return {
    name: v.name,
    slug: v.slug,
    tagline: v.tagline,
    role: v.role,
    type: v.type,
    ...(v.organization ? { organization: v.organization } : {}),
    year: v.year,
    ...(v.date ? { date: v.date } : {}),
    status: v.status,
    featured: v.featured,
    order: index,
    summary: v.summary,
    cover: {
      label: v.cover.label,
      caption: v.cover.caption,
      ...(v.cover.url ? { url: v.cover.url } : {}),
    },
    stack: v.stack,
    metrics: v.metrics.map((m) => ({ label: m.label, value: m.value, ...(m.proof ? { proof: true } : {}) })),
    vision: v.vision,
    problem: v.problem,
    build: v.build.map((point) => ({ point })),
    outcome: v.outcome,
    links: v.links.map((l) => ({ label: l.label, url: l.url })),
    gallery: v.gallery.map((g) => ({ label: g.label, caption: g.caption, ...(g.url ? { url: g.url } : {}) })),
    _status: 'published' as const,
  }
}

/** Wipe the projects collection and re-create it from the curated data.
 *  Idempotent: re-running always converges to the same set. Returns the count. */
export async function seedProjects(payload: Payload): Promise<number> {
  const existing = await payload.find({ collection: 'projects', limit: 1000, depth: 0 })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'projects', id: doc.id })
  }
  for (let i = 0; i < projects.length; i++) {
    await payload.create({ collection: 'projects', data: projectCreateData(projects[i], i) })
  }
  return projects.length
}
