import { useMemo, useState } from 'react'
import { ExternalLink, Github, Search } from 'lucide-react'

import type { Project } from '@services/portfolio'

import { filterProjects } from '../schema/filters'
import { TechFilter } from './TechFilter'

interface ProjectsExplorerProps {
  projects: Project[]
  allTechs: string[]
}

export function ProjectsExplorer({ projects, allTechs }: ProjectsExplorerProps) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(
    () => filterProjects(projects, search, selected),
    [projects, search, selected],
  )

  const toggleTech = (tech: string) =>
    setSelected((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center gap-3.5">
        <div
          data-card
          className="bg-field-bg border-field-border flex min-w-[240px] flex-1 items-center gap-2.5 rounded-[14px] border px-4"
        >
          <Search className="text-faint size-[17px]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="text-ink placeholder:text-faint flex-1 bg-transparent py-3.5 text-[15px] outline-none"
          />
        </div>
        <TechFilter
          techs={allTechs}
          selected={selected}
          onToggle={toggleTech}
          onClear={() => setSelected([])}
        />
      </div>

      {filtered.length > 0 ? (
        <div data-projpage-grid className="grid grid-cols-2 gap-[18px]">
          {filtered.map((project) => (
            <article
              key={project.id}
              data-card
              className="glass flex flex-col overflow-hidden rounded-(--card-radius-lg)"
            >
              <div className="h-[200px] shrink-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col px-6 py-[22px]">
                <div className="mb-2.5 flex items-center justify-between gap-2.5">
                  <h3 className="font-display text-ink text-[22px] font-bold">{project.name}</h3>
                  <div className="flex shrink-0 gap-[7px]">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${project.name} GitHub repository`}
                      className="bg-tag-bg text-ink border-tag-border grid size-[34px] place-items-center rounded-[9px] border"
                    >
                      <Github className="size-4" />
                    </a>
                    <a
                      href={project.links.preview}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${project.name} live demo`}
                      className="bg-accent text-accent-contrast grid size-[34px] place-items-center rounded-[9px]"
                    >
                      <ExternalLink className="size-[15px]" />
                    </a>
                  </div>
                </div>
                <p className="text-dim mb-4 flex-1 text-[14.5px] leading-[1.58]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-[7px]">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-tag-bg text-tag-text border-tag-border rounded-full border px-[11px] py-[5px] font-mono text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-faint py-[60px] text-center font-mono text-[14px]">
          No projects match your filters.
        </div>
      )}
    </div>
  )
}
