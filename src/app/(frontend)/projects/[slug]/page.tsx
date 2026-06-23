import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getProject, getProjects, getSite, getProjectPage, getProjectRaw } from '@/lib/content'
import ProjectDetail from '../../components/projects/project-detail'
import { ProjectLive } from '../../components/live/project-live'

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
  const { isEnabled } = await draftMode()
  const projectPage = await getProjectPage()

  if (isEnabled) {
    const initialProject = (await getProjectRaw(slug)) ?? {}
    return <ProjectLive initialProject={initialProject} labels={projectPage} />
  }

  const [projects, site] = await Promise.all([getProjects(), getSite()])
  const i = projects.findIndex((x) => x.slug === slug)
  if (i === -1) notFound()
  const project = projects[i]

  const projectLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.summary,
    ...(project.date ? { dateCreated: project.date } : {}),
    keywords: project.stack.join(', '),
    author: { '@type': 'Person', name: site.name, url: site.linkedin },
    ...(project.links[0]?.url ? { url: project.links[0].url } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }}
      />
      <ProjectDetail
        project={project}
        prev={i > 0 ? projects[i - 1] : null}
        next={i < projects.length - 1 ? projects[i + 1] : null}
        labels={projectPage}
      />
    </>
  )
}
