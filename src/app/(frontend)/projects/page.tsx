import type { Metadata } from 'next'
import { getProjects, getProjectsPage } from '@/lib/content'
import ProjectsPage from '../components/pages/projects-page'

export async function generateMetadata(): Promise<Metadata> {
  const chrome = await getProjectsPage()
  return {
    title: chrome.metaTitle,
    description: chrome.metaDescription,
  }
}

export default async function Page() {
  const [projects, chrome] = await Promise.all([getProjects(), getProjectsPage()])
  return <ProjectsPage projects={projects} chrome={chrome} />
}
