import { getPayload } from 'payload'
import config from '@payload-config'

import {
  siteConfig as staticSite,
  home as staticHome,
  stats as staticStats,
  story as staticStory,
  contact as staticContact,
  projects as staticProjects,
  articles as staticArticles,
  achievements as staticAchievements,
  certificates as staticCertificates,
  type Project,
  type Article,
  type Achievement,
  type Certificate,
  type Block as ArticleBlock,
} from './portfolio-data'

/* ------------------------------------------------------------------ *
 * Data-access layer.
 *
 * Every getter reads from Payload's Local API and maps the document
 * back into the exact shape the UI already consumes. If Payload is
 * empty (not yet seeded) or unreachable (e.g. DB down during a build),
 * it transparently falls back to the hardcoded content — so the site
 * never renders blank. This is the safety net that keeps the build and
 * production resilient while content migrates into the CMS.
 * ------------------------------------------------------------------ */

const str = (v: unknown, fallback = ''): string => (typeof v === 'string' && v.length ? v : fallback)
const arr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

async function client() {
  return getPayload({ config })
}

/** Run a Payload read, falling back to static data on any error/empty result. */
async function safe<T>(fn: () => Promise<T | null | undefined>, fallback: T): Promise<T> {
  try {
    const result = await fn()
    return result == null ? fallback : result
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[content] Payload read failed, using static fallback:', (err as Error).message)
    }
    return fallback
  }
}

/* ----------------------------- site settings ----------------------------- */
export type SiteContent = typeof staticSite

export async function getSite(): Promise<SiteContent> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'site-settings', depth: 1 })) as unknown as Record<string, unknown>
    if (!g || !str(g.name)) return null
    return {
      name: str(g.name, staticSite.name),
      shortName: str(g.shortName, staticSite.shortName),
      role: str(g.role, staticSite.role),
      tagline: str(g.tagline, staticSite.tagline),
      location: str(g.location, staticSite.location),
      email: str(g.email, staticSite.email),
      github: str(g.github, staticSite.github),
      linkedin: str(g.linkedin, staticSite.linkedin),
      availability: str(g.availability, staticSite.availability),
      metaDescription: str(g.metaDescription, staticSite.metaDescription),
      nav: arr<{ label: string; href: string }>(g.nav).map((n) => ({ label: str(n.label), href: str(n.href) })),
    } satisfies SiteContent
  }, staticSite)
}

/* --------------------------------- home --------------------------------- */
export type HomeContent = { home: typeof staticHome; stats: typeof staticStats }

export async function getHome(): Promise<HomeContent> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'home', depth: 1 })) as unknown as Record<string, unknown>
    if (!g || !str(g.eyebrow)) return null
    const cta = (v: unknown) => {
      const o = (v ?? {}) as Record<string, unknown>
      return { label: str(o.label), href: str(o.href) }
    }
    return {
      home: {
        eyebrow: str(g.eyebrow, staticHome.eyebrow),
        headline: arr<{ line: string }>(g.headline).map((h) => str(h.line)),
        headlineAccent: str(g.headlineAccent, staticHome.headlineAccent),
        script: str(g.script, staticHome.script),
        lede: str(g.lede, staticHome.lede),
        primaryCta: cta(g.primaryCta),
        secondaryCta: cta(g.secondaryCta),
        marquee: arr<{ text: string }>(g.marquee).map((m) => str(m.text)),
        now: arr<{ label: string; value: string }>(g.now).map((n) => ({ label: str(n.label), value: str(n.value) })),
      },
      stats: arr<{ value: number; suffix?: string; label: string }>(g.stats).map((s) => ({
        value: typeof s.value === 'number' ? s.value : 0,
        suffix: str(s.suffix),
        label: str(s.label),
      })),
    }
  }, { home: staticHome, stats: staticStats })
}

/* --------------------------------- about -------------------------------- */
export type AboutContent = typeof staticStory

export async function getAbout(): Promise<AboutContent> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'about', depth: 1 })) as unknown as Record<string, unknown>
    if (!g || !str(g.title)) return null
    const portrait = (g.portrait ?? {}) as Record<string, unknown>
    const philosophy = (g.philosophy ?? {}) as Record<string, unknown>
    return {
      eyebrow: str(g.eyebrow, staticStory.eyebrow),
      title: str(g.title, staticStory.title),
      intro: str(g.intro, staticStory.intro),
      portrait: { label: str(portrait.label, staticStory.portrait.label), caption: str(portrait.caption, staticStory.portrait.caption) },
      narrative: arr<{ text: string }>(g.narrative).map((n) => str(n.text)),
      philosophy: { quote: str(philosophy.quote, staticStory.philosophy.quote), body: str(philosophy.body, staticStory.philosophy.body) },
      values: arr<{ title: string; body: string }>(g.values).map((v) => ({ title: str(v.title), body: str(v.body) })),
      journey: arr<{ year: string; title: string; detail: string }>(g.journey).map((j) => ({
        year: str(j.year),
        title: str(j.title),
        detail: str(j.detail),
      })),
      next: str(g.next, staticStory.next),
    }
  }, staticStory)
}

/* -------------------------------- contact ------------------------------- */
export type ContactContent = typeof staticContact

export async function getContact(): Promise<ContactContent> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'contact', depth: 1 })) as unknown as Record<string, unknown>
    if (!g || !str(g.title)) return null
    return {
      eyebrow: str(g.eyebrow, staticContact.eyebrow),
      title: str(g.title, staticContact.title),
      blurb: str(g.blurb, staticContact.blurb),
      channels: arr<{ label: string; value: string; href?: string }>(g.channels).map((c) => ({
        label: str(c.label),
        value: str(c.value),
        ...(str(c.href) ? { href: str(c.href) } : {}),
      })),
    }
  }, staticContact)
}

/* ------------------------------- projects ------------------------------- */
/** Pull a usable image URL out of a Payload upload field (depth ≥ 1). */
const mediaUrl = (v: unknown): string | undefined => {
  if (typeof v === 'string') return undefined // unpopulated relationship id
  const o = (v ?? {}) as Record<string, unknown>
  return str(o.url) || undefined
}

function mapProject(d: Record<string, unknown>): Project {
  const cover = (d.cover ?? {}) as Record<string, unknown>
  const image = mediaUrl(cover.image)
  return {
    slug: str(d.slug),
    name: str(d.name),
    tagline: str(d.tagline),
    role: str(d.role),
    type: str(d.type, 'product') as Project['type'],
    year: str(d.year),
    ...(str(d.date) ? { date: str(d.date) } : {}),
    status: str(d.status),
    featured: Boolean(d.featured),
    summary: str(d.summary),
    cover: { label: str(cover.label), caption: str(cover.caption), ...(image ? { image } : {}) },
    metrics: arr<{ label: string; value: string }>(d.metrics).map((m) => ({ label: str(m.label), value: str(m.value) })),
    stack: arr<string>(d.stack),
    vision: str(d.vision),
    problem: str(d.problem),
    build: arr<{ point: string }>(d.build).map((b) => str(b.point)),
    outcome: str(d.outcome),
    links: arr<{ label: string; url: string }>(d.links).map((l) => ({ label: str(l.label), url: str(l.url) })),
    gallery: arr<{ label: string; caption: string }>(d.gallery).map((gx) => ({ label: str(gx.label), caption: str(gx.caption) })),
  }
}

export async function getProjects(): Promise<Project[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'projects', limit: 100, depth: 1, sort: ['order', 'year'] })
    if (!docs.length) return null
    return docs.map((d) => mapProject(d as unknown as Record<string, unknown>))
  }, staticProjects)
}

export async function getProject(slug: string): Promise<Project | null> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
    if (docs[0]) return mapProject(docs[0] as unknown as Record<string, unknown>)
    return staticProjects.find((v) => v.slug === slug) ?? null
  }, staticProjects.find((v) => v.slug === slug) ?? null)
}

/* ------------------------------- articles ------------------------------- */
const monthYear = (iso: string): string => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function mapArticle(d: Record<string, unknown>): Article {
  const cover = (d.cover ?? {}) as Record<string, unknown>
  const date = str(d.date)
  const body: ArticleBlock[] = arr<Record<string, unknown>>(d.body)
    .map((b): ArticleBlock | null => {
      const text = str(b.text)
      switch (str(b.blockType)) {
        case 'heading':
          return { type: 'h', text }
        case 'quote':
          return { type: 'quote', text }
        case 'paragraph':
          return { type: 'p', text }
        default:
          return null
      }
    })
    .filter((b): b is ArticleBlock => b !== null)
  return {
    slug: str(d.slug),
    title: str(d.title),
    excerpt: str(d.excerpt),
    date,
    dateLabel: str(d.dateLabel) || monthYear(date),
    readTime: str(d.readTime),
    category: str(d.category, 'building') as Article['category'],
    tags: arr<string>(d.tags),
    featured: Boolean(d.featured),
    cover: { label: str(cover.label), caption: str(cover.caption) },
    body,
  }
}

export async function getArticles(): Promise<Article[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'articles', limit: 100, depth: 1, sort: '-date' })
    if (!docs.length) return null
    return docs.map((d) => mapArticle(d as unknown as Record<string, unknown>))
  }, staticArticles)
}

export async function getArticle(slug: string): Promise<Article | null> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'articles', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
    if (docs[0]) return mapArticle(docs[0] as unknown as Record<string, unknown>)
    return staticArticles.find((a) => a.slug === slug) ?? null
  }, staticArticles.find((a) => a.slug === slug) ?? null)
}

/* ----------------------------- achievements ----------------------------- */
export async function getAchievements(): Promise<Achievement[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'achievements', limit: 100, depth: 0, sort: '-date' })
    if (!docs.length) return null
    return docs.map((raw) => {
      const d = raw as unknown as Record<string, unknown>
      return {
        id: str(d.id),
        title: str(d.title),
        organization: str(d.organization),
        date: str(d.date),
        dateLabel: str(d.dateLabel),
        type: str(d.type, 'milestone') as Achievement['type'],
        description: str(d.description),
        featured: Boolean(d.featured),
        ...(str(d.link) ? { link: str(d.link) } : {}),
      }
    })
  }, staticAchievements)
}

/* ----------------------------- certificates ----------------------------- */
export async function getCertificates(): Promise<Certificate[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'certificates', limit: 100, depth: 0, sort: '-date' })
    if (!docs.length) return null
    return docs.map((raw) => {
      const d = raw as unknown as Record<string, unknown>
      return {
        id: str(d.key) || str(d.id),
        title: str(d.title),
        issuer: str(d.issuer),
        date: str(d.date),
        dateLabel: str(d.dateLabel),
        credentialId: str(d.credentialId),
        skills: arr<string>(d.skills),
      }
    })
  }, staticCertificates)
}
