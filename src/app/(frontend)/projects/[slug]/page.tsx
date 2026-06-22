import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, getProjects } from '@/lib/content'
import ProjectDetail from '../../components/projects/project-detail'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const v = await getProject(slug)
  if (!v) return { title: 'Project not found' }
  return {
    title: v.name,
    description: v.summary,
    openGraph: { title: v.name, description: v.summary, type: 'article' },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projects = await getProjects()
  const i = projects.findIndex((x) => x.slug === slug)
  if (i === -1) notFound()
  return (
    <ProjectDetail
      project={projects[i]}
      prev={i > 0 ? projects[i - 1] : null}
      next={i < projects.length - 1 ? projects[i + 1] : null}
    />
  )
}
