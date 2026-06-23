import { draftMode } from 'next/headers'
import {
  getSite,
  getHome,
  getHomeRaw,
  getProjects,
  getArticles,
  getAchievements,
  getCertificates,
} from '@/lib/content'
import { Home } from './components/home/home'
import { HomeLive } from './components/live/home-live'

export default async function HomePage() {
  const { isEnabled } = await draftMode()
  const site = await getSite()
  const projects = await getProjects()
  const articles = await getArticles()
  const achievements = await getAchievements()
  const certificates = await getCertificates()

  if (isEnabled) {
    const initialHome = await getHomeRaw()
    return (
      <HomeLive
        initialHome={initialHome}
        site={site}
        projects={projects}
        articles={articles}
        achievements={achievements}
        certificates={certificates}
      />
    )
  }

  const { home, stats } = await getHome()

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    description: site.metaDescription,
    address: { '@type': 'PostalAddress', addressLocality: site.location },
    email: site.email,
    sameAs: [site.github, site.linkedin],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Home
        siteConfig={site}
        home={home}
        stats={stats}
        projects={projects}
        articles={articles}
        achievements={achievements}
        certificates={certificates}
      />
    </>
  )
}
