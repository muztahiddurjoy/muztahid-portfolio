import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getVenture, getVentures } from '@/lib/content'
import VentureDetail from '../../components/ventures/venture-detail'

export async function generateStaticParams() {
  const ventures = await getVentures()
  return ventures.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const v = await getVenture(slug)
  if (!v) return { title: 'Venture not found' }
  return {
    title: v.name,
    description: v.summary,
    openGraph: { title: v.name, description: v.summary, type: 'article' },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ventures = await getVentures()
  const i = ventures.findIndex((x) => x.slug === slug)
  if (i === -1) notFound()
  return (
    <VentureDetail
      venture={ventures[i]}
      prev={i > 0 ? ventures[i - 1] : null}
      next={i < ventures.length - 1 ? ventures[i + 1] : null}
    />
  )
}
