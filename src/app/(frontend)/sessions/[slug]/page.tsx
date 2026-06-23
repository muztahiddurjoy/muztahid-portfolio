import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getSession, getSessions, getSite, getSessionPage, getSessionRaw } from '@/lib/content'
import { sessionFormatMeta } from '@/lib/portfolio-data'
import SessionDetail from '../../components/sessions/session-detail'
import { SessionLive } from '../../components/live/session-live'

export async function generateStaticParams() {
  const sessions = await getSessions()
  return sessions.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = await getSession(slug)
  if (!s) return { title: 'Session not found' }
  const title = `${s.title} — ${sessionFormatMeta[s.format].label}`
  return {
    title,
    description: s.summary,
    openGraph: { title, description: s.summary, type: 'website' },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const [sessionPage, site] = await Promise.all([getSessionPage(), getSite()])

  if (isEnabled) {
    const initialSession = (await getSessionRaw(slug)) ?? {}
    return <SessionLive initialSession={initialSession} labels={sessionPage} />
  }

  const sessions = await getSessions()
  const i = sessions.findIndex((x) => x.slug === slug)
  if (i === -1) notFound()
  const session = sessions[i]

  const courseMode =
    session.mode === 'online' ? 'Online' : session.mode === 'offline' ? 'Onsite' : 'Blended'

  const sessionLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: session.title,
    description: session.summary,
    provider: { '@type': 'Person', name: site.name, url: site.linkedin },
    ...(session.topics.length ? { keywords: session.topics.join(', ') } : {}),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode,
      ...(session.date ? { startDate: session.date } : {}),
      ...(session.mode === 'online'
        ? { location: { '@type': 'VirtualLocation', url: site.siteUrl } }
        : session.logistics.location
          ? { location: { '@type': 'Place', name: session.logistics.location } }
          : {}),
    },
    ...(/free/i.test(session.logistics.price)
      ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' } }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sessionLd) }}
      />
      <SessionDetail
        session={session}
        prev={i > 0 ? sessions[i - 1] : null}
        next={i < sessions.length - 1 ? sessions[i + 1] : null}
        labels={sessionPage}
        siteEmail={site.email}
      />
    </>
  )
}
