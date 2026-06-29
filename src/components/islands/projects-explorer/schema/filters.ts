import type { Project } from '@services/portfolio'

export function filterProjects(projects: Project[], search: string, techs: string[]): Project[] {
  const query = search.trim().toLowerCase()

  return projects.filter((project) => {
    const matchesSearch =
      !query ||
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)

    const matchesTechs = techs.length === 0 || techs.every((tech) => project.stack.includes(tech))

    return matchesSearch && matchesTechs
  })
}
