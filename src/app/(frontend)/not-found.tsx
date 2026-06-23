import type { Metadata } from 'next'
import { CtaButton } from './components/ui/cta-button'
import { getSite } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: true },
}

export default async function NotFound() {
  const site = await getSite()
  return (
    <main className="container-page flex min-h-[78vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-script text-3xl text-muted-foreground md:text-4xl">{site.notFound.eyebrow}</p>
      <h1 className="mt-3 font-display text-[clamp(3.5rem,16vw,11rem)] leading-none tracking-tight">
        {site.notFound.title}
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
        {site.notFound.body}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <CtaButton href="/" variant="solid" icon="arrow-right">
          {site.notFound.homeLabel}
        </CtaButton>
        <CtaButton href="/projects" variant="text" icon="arrow-up">
          {site.notFound.projectsLabel}
        </CtaButton>
      </div>
    </main>
  )
}
