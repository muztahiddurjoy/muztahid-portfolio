import type { Metadata } from 'next'
import { getProjects } from '@/lib/content'
import ProjectsPage from '../components/pages/projects-page'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Products, systems, and robots I’ve built — full-stack engineering shipped end to end.',
}

export default async function Page() {
  const projects = await getProjects()
  return <ProjectsPage projects={projects} />
}
