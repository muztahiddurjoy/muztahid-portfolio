import { getSite, getHome, getVentures, getArticles, getAchievements } from '@/lib/content'
import { Home } from './components/home/home'

export default async function HomePage() {
  const site = await getSite()
  const { home, stats } = await getHome()
  const ventures = await getVentures()
  const articles = await getArticles()
  const achievements = await getAchievements()

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
        ventures={ventures}
        articles={articles}
        achievements={achievements}
      />
    </>
  )
}
