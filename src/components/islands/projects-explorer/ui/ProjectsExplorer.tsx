import { useMemo, useState } from 'react'
import { ExternalLink, Github, Images, Search } from 'lucide-react'

import type { Project } from '@services/portfolio'
import { imageUrl } from '@lib/utils/image'
import { ProjectModal, useProjectModal } from '@components/islands/project-modal'

import { filterProjects } from '../schema/filters'
import { TechFilter } from './TechFilter'

interface ProjectsExplorerProps {
  projects: Project[]
  allTechs: string[]
}

export function ProjectsExplorer({ projects, allTechs }: ProjectsExplorerProps) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const modal = useProjectModal()

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
              className="glass group relative flex flex-col overflow-hidden rounded-(--card-radius-lg)"
            >
              <button
                type="button"
                onClick={() => modal.show(project)}
                aria-label={`Open ${project.name} details`}
                className="focus-visible:outline-accent absolute inset-0 z-1 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-2"
              />
              <div
                className="relative aspect-video shrink-0 overflow-hidden bg-cover bg-center"
                style={project.lqip ? { backgroundImage: `url('${project.lqip}')` } : undefined}
              >
                <img
                  src={imageUrl(project.image, { w: 1100 })}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
                {(project.gallery?.length ?? 0) > 1 && (
                  <span className="glass text-ink pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11.5px] font-semibold">
                    <Images className="size-3.5" />
                    {project.gallery?.length}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col px-6 py-[22px]">
                <div className="mb-2.5 flex items-center justify-between gap-2.5">
                  <h3 className="font-display text-ink group-hover:text-accent text-[22px] font-bold transition-colors">
                    {project.name}
                  </h3>
                  <div className="relative z-2 flex shrink-0 gap-[7px]">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${project.name} GitHub repository`}
                        className="bg-tag-bg text-ink border-tag-border grid size-[34px] place-items-center rounded-[9px] border"
                      >
                        <Github className="size-4" />
                      </a>
                    )}
                    {project.links.preview && (
                      <a
                        href={project.links.preview}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${project.name} live demo`}
                        className="bg-accent text-accent-contrast grid size-[34px] place-items-center rounded-[9px]"
                      >
                        <ExternalLink className="size-[15px]" />
                      </a>
                    )}
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

      <ProjectModal project={modal.project} open={modal.open} onOpenChange={modal.onOpenChange} />
    </div>
  )
}
