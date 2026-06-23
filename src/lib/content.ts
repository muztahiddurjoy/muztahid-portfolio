import { getPayload } from 'payload'
import config from '@payload-config'

import {
  siteConfig as staticSite,
  home as staticHome,
  stats as staticStats,
  story as staticStory,
  contact as staticContact,
  projects as staticProjects,
  sessions as staticSessions,
  articles as staticArticles,
  achievements as staticAchievements,
  certificates as staticCertificates,
  projectsPage as staticProjectsPage,
  writingPage as staticWritingPage,
  achievementsPage as staticAchievementsPage,
  certificatesPage as staticCertificatesPage,
  projectPage as staticProjectPage,
  sessionsPage as staticSessionsPage,
  sessionPage as staticSessionPage,
  type SiteConfig,
  type HomeData,
  type Stat,
  type Story,
  type ContactData,
  type Project,
  type Session,
  type Article,
  type Achievement,
  type Certificate,
  type ProjectsPageData,
  type WritingPageData,
  type AchievementsPageData,
  type CertificatesPageData,
  type ProjectPageData,
  type SessionsPageData,
  type SessionPageData,
} from './portfolio-data'
import {
  mapSite,
  mapHome,
  mapStats,
  mapAbout,
  mapContact,
  mapProject,
  mapArticle,
  mapAchievement,
  mapCertificate,
  mapProjectsPage,
  mapWritingPage,
  mapAchievementsPage,
  mapCertificatesPage,
  mapProjectPage,
  mapSession,
  mapSessionsPage,
  mapSessionPage,
} from './mappers'

/* ------------------------------------------------------------------ *
 * Server-only data-access layer.
 *
 * Every getter reads Payload's Local API and runs the raw document
 * through the shared, isomorphic mappers in `mappers.ts` (the same
 * transforms the live-preview wrappers use in the browser). If Payload
 * is empty or unreachable (e.g. DB down during a build), `safe()` falls
 * back to the hardcoded content — so the site never renders blank.
 *
 * The `*Raw` readers return the unmapped document; they seed the
 * live-preview iframe before `useLivePreview` takes over client-side.
 * ------------------------------------------------------------------ */

type Rec = Record<string, unknown>

async function client() {
  return getPayload({ config })
}

/** Run a Payload read, falling back to static data on any error. */
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
export type SiteContent = SiteConfig

export async function getSite(): Promise<SiteContent> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'site-settings', depth: 1 })) as unknown as Rec
    return mapSite(g)
  }, staticSite)
}

export async function getSiteRaw(): Promise<Rec> {
  return safe(async () => {
    const payload = await client()
    return (await payload.findGlobal({ slug: 'site-settings', depth: 1 })) as unknown as Rec
  }, {} as Rec)
}

/* --------------------------------- home --------------------------------- */
export type HomeContent = { home: HomeData; stats: Stat[] }

export async function getHome(): Promise<HomeContent> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'home', depth: 1 })) as unknown as Rec
    return { home: mapHome(g), stats: mapStats(g) }
  }, { home: staticHome, stats: staticStats })
}

export async function getHomeRaw(): Promise<Rec> {
  return safe(async () => {
    const payload = await client()
    return (await payload.findGlobal({ slug: 'home', depth: 1 })) as unknown as Rec
  }, {} as Rec)
}

/* --------------------------------- about -------------------------------- */
export type AboutContent = Story

export async function getAbout(): Promise<AboutContent> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'about', depth: 1 })) as unknown as Rec
    return mapAbout(g)
  }, staticStory)
}

export async function getAboutRaw(): Promise<Rec> {
  return safe(async () => {
    const payload = await client()
    return (await payload.findGlobal({ slug: 'about', depth: 1 })) as unknown as Rec
  }, {} as Rec)
}

/* -------------------------------- contact ------------------------------- */
export type ContactContent = ContactData

export async function getContact(): Promise<ContactContent> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'contact', depth: 0 })) as unknown as Rec
    return mapContact(g)
  }, staticContact)
}

export async function getContactRaw(): Promise<Rec> {
  return safe(async () => {
    const payload = await client()
    return (await payload.findGlobal({ slug: 'contact', depth: 0 })) as unknown as Rec
  }, {} as Rec)
}

/* ------------------------------- projects ------------------------------- */
export async function getProjects(): Promise<Project[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'projects', limit: 100, depth: 1, sort: ['order', 'year'] })
    if (!docs.length) return null
    return docs.map((d) => mapProject(d as unknown as Rec))
  }, staticProjects)
}

export async function getProject(slug: string): Promise<Project | null> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
    if (docs[0]) return mapProject(docs[0] as unknown as Rec)
    return staticProjects.find((v) => v.slug === slug) ?? null
  }, staticProjects.find((v) => v.slug === slug) ?? null)
}

export async function getProjectRaw(slug: string): Promise<Rec | null> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      draft: true,
    })
    return (docs[0] as unknown as Rec) ?? null
  }, null)
}

/* ------------------------------- sessions ------------------------------- */
export async function getSessions(): Promise<Session[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'sessions', limit: 100, depth: 1, sort: ['order', '-date'] })
    if (!docs.length) return null
    return docs.map((d) => mapSession(d as unknown as Rec))
  }, staticSessions)
}

export async function getSession(slug: string): Promise<Session | null> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'sessions', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
    if (docs[0]) return mapSession(docs[0] as unknown as Rec)
    return staticSessions.find((s) => s.slug === slug) ?? null
  }, staticSessions.find((s) => s.slug === slug) ?? null)
}

export async function getSessionRaw(slug: string): Promise<Rec | null> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'sessions',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      draft: true,
    })
    return (docs[0] as unknown as Rec) ?? null
  }, null)
}

/* ------------------------------- articles ------------------------------- */
export async function getArticles(): Promise<Article[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'articles', limit: 100, depth: 1, sort: '-date' })
    if (!docs.length) return null
    return docs.map((d) => mapArticle(d as unknown as Rec))
  }, staticArticles)
}

export async function getArticle(slug: string): Promise<Article | null> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'articles', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
    if (docs[0]) return mapArticle(docs[0] as unknown as Rec)
    return staticArticles.find((a) => a.slug === slug) ?? null
  }, staticArticles.find((a) => a.slug === slug) ?? null)
}

export async function getArticleRaw(slug: string): Promise<Rec | null> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      draft: true,
    })
    return (docs[0] as unknown as Rec) ?? null
  }, null)
}

/* ----------------------------- achievements ----------------------------- */
export async function getAchievements(): Promise<Achievement[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'achievements', limit: 100, depth: 0, sort: '-date' })
    if (!docs.length) return null
    return docs.map((raw) => mapAchievement(raw as unknown as Rec))
  }, staticAchievements)
}

/* ----------------------------- certificates ----------------------------- */
export async function getCertificates(): Promise<Certificate[]> {
  return safe(async () => {
    const payload = await client()
    const { docs } = await payload.find({ collection: 'certificates', limit: 100, depth: 0, sort: '-date' })
    if (!docs.length) return null
    return docs.map((raw) => mapCertificate(raw as unknown as Rec))
  }, staticCertificates)
}

/* ----------------------- list / detail page chrome ---------------------- */
export async function getProjectsPage(): Promise<ProjectsPageData> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'projects-page', depth: 0 })) as unknown as Rec
    return mapProjectsPage(g)
  }, staticProjectsPage)
}

export async function getWritingPage(): Promise<WritingPageData> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'writing-page', depth: 0 })) as unknown as Rec
    return mapWritingPage(g)
  }, staticWritingPage)
}

export async function getAchievementsPage(): Promise<AchievementsPageData> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'achievements-page', depth: 0 })) as unknown as Rec
    return mapAchievementsPage(g)
  }, staticAchievementsPage)
}

export async function getCertificatesPage(): Promise<CertificatesPageData> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'certificates-page', depth: 0 })) as unknown as Rec
    return mapCertificatesPage(g)
  }, staticCertificatesPage)
}

export async function getProjectPage(): Promise<ProjectPageData> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'project-page', depth: 0 })) as unknown as Rec
    return mapProjectPage(g)
  }, staticProjectPage)
}

export async function getSessionsPage(): Promise<SessionsPageData> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'sessions-page', depth: 0 })) as unknown as Rec
    return mapSessionsPage(g)
  }, staticSessionsPage)
}

export async function getSessionPage(): Promise<SessionPageData> {
  return safe(async () => {
    const payload = await client()
    const g = (await payload.findGlobal({ slug: 'session-page', depth: 0 })) as unknown as Rec
    return mapSessionPage(g)
  }, staticSessionPage)
}
