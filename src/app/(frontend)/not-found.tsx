import type { Metadata } from 'next'
import { CtaButton } from './components/ui/cta-button'

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[78vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-script text-3xl text-muted-foreground md:text-4xl">lost the thread</p>
      <h1 className="mt-3 font-display text-[clamp(3.5rem,16vw,11rem)] leading-none tracking-tight">
        404
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
        This page slipped off the workbench. Let’s get you back to something I’ve built.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <CtaButton href="/" variant="solid" icon="arrow-right">
          Back home
        </CtaButton>
        <CtaButton href="/projects" variant="text" icon="arrow-up">
          See the projects
        </CtaButton>
      </div>
    </main>
  )
}
