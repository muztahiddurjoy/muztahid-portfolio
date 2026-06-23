'use client'

import ProjectDetail from '../projects/project-detail'
import { mapProject } from '@/lib/mappers'
import { useLiveDoc } from './use-live-doc'
import { PreviewProvider } from '../preview-context'
import type { ProjectPageData } from '@/lib/portfolio-data'

export function ProjectLive({
  initialProject,
  labels,
}: {
  initialProject: Record<string, unknown>
  labels: ProjectPageData
}) {
  const live = useLiveDoc(initialProject)
  return (
    <PreviewProvider>
      <ProjectDetail project={mapProject(live)} prev={null} next={null} labels={labels} />
    </PreviewProvider>
  )
}
