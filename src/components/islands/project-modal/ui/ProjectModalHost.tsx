import { useEffect } from 'react'

import type { Project } from '@services/portfolio'

import { useProjectModal } from '../hooks/useProjectModal'
import { ProjectModal } from './ProjectModal'

interface ProjectModalHostProps {
  projects: Project[]
}

export function ProjectModalHost({ projects }: ProjectModalHostProps) {
  const { project, open, show, onOpenChange } = useProjectModal()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-project-open]')
      const match = trigger && projects.find((item) => item.id === trigger.dataset.projectOpen)
      if (match) show(match)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [projects, show])

  return <ProjectModal project={project} open={open} onOpenChange={onOpenChange} />
}
