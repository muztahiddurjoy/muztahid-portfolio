'use client'

import { Home } from '../home/home'
import { mapHome, mapStats } from '@/lib/mappers'
import { useLiveDoc } from './use-live-doc'
import { PreviewProvider } from '../preview-context'
import type { SiteConfig, Project, Article, Achievement, Certificate } from '@/lib/portfolio-data'

type Rec = Record<string, unknown>

/** As-you-type live wrapper for the Home global. Site chrome + collection lists
 *  stay at their SSR snapshot; the home global re-maps on every keystroke. */
export function HomeLive({
  initialHome,
  site,
  projects,
  articles,
  achievements,
  certificates,
}: {
  initialHome: Rec
  site: SiteConfig
  projects: Project[]
  articles: Article[]
  achievements: Achievement[]
  certificates: Certificate[]
}) {
  const live = useLiveDoc(initialHome)
  return (
    <PreviewProvider>
      <Home
        siteConfig={site}
        home={mapHome(live)}
        stats={mapStats(live)}
        projects={projects}
        articles={articles}
        achievements={achievements}
        certificates={certificates}
      />
    </PreviewProvider>
  )
}
