import { siteConfig } from '@/lib/portfolio-data'
import { Hero } from './components/hero/hero'
import { StatsBand } from './components/sections/stats-band'
import ProjectsMatrix from './components/sections/projects-matrix'
import SkillsEcosystem from './components/sections/skills-ecosystem'
import AwardsTimeline from './components/sections/awards-timeline'
import AboutContact from './components/sections/about-contact'
import { HashScroll } from './components/ui/hash-scroll'

// Person JSON-LD (NFR-7)
const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  address: { '@type': 'PostalAddress', addressLocality: siteConfig.location },
  email: siteConfig.email,
  sameAs: [siteConfig.github, siteConfig.linkedin],
}

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <HashScroll />
      <Hero />
      <StatsBand />
      <ProjectsMatrix />
      <SkillsEcosystem />
      <AwardsTimeline />
      <AboutContact />
    </main>
  )
}
