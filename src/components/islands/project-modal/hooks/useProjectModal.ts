import { useCallback, useState } from 'react'

import type { Project } from '@services/portfolio'

export function useProjectModal() {
  const [project, setProject] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)

  const show = useCallback((next: Project) => {
    setProject(next)
    setOpen(true)
  }, [])

  return { project, open, show, onOpenChange: setOpen }
}
