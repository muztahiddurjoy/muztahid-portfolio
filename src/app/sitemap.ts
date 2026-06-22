import type { MetadataRoute } from 'next'
import { getArticles, getProjects } from '@/lib/content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://muztahid.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()])

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/projects',
    '/writing',
    '/achievements',
    '/certificates',
    '/contact',
  ].map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date(), changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((v) => ({
    url: `${SITE_URL}/projects/${v.slug}`,
    lastModified: v.date ? new Date(v.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/writing/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...articleRoutes]
}
