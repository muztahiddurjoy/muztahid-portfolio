import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, siteConfig } from '@/lib/portfolio-data'
import CaseStudy from '../../components/case-study/case-study'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Project not found' }
  const title = `${project.title} — ${siteConfig.name}`
  const description = project.summary
  return {
    title,
    description,
    openGraph: { title, description, type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  const project = projects[index]
  const prev = index > 0 ? projects[index - 1] : null
  const next = index < projects.length - 1 ? projects[index + 1] : null

  return <CaseStudy project={project} prev={prev} next={next} />
}
