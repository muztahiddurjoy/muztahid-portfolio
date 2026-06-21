import { siteConfig } from '@/lib/portfolio-data'
import { Home } from './components/home/home'

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.metaDescription,
  address: { '@type': 'PostalAddress', addressLocality: siteConfig.location },
  email: siteConfig.email,
  sameAs: [siteConfig.github, siteConfig.linkedin],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Home />
    </>
  )
}
