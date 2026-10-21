import type { Project, ProjectImage } from '@services/portfolio'

export function getSlides(project: Project): ProjectImage[] {
  return project.gallery?.length ? project.gallery : [{ src: project.image, lqip: project.lqip }]
}
