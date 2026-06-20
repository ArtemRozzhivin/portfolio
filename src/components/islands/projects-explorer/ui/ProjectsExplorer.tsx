import { useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Search } from 'lucide-react'

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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          data-magnetic
          data-card
          className="glass text-ink inline-flex items-center gap-[9px] rounded-full px-5 py-3 text-[14px] font-semibold"
        >
          All projects
          <ArrowRight className="size-[15px]" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-[80] animate-[fadeUp_0.35s_ease] overflow-y-auto bg-[var(--page-base)] bg-[image:var(--page-bg)]">
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-[12%] -right-[6%] h-[44vw] max-h-[640px] w-[44vw] max-w-[640px] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_68%)] blur-sm"></div>
          </div>

          <nav className="sticky top-[18px] z-10 mx-auto mt-[18px] w-[min(1100px,calc(100%-28px))]">
            <div
              data-card
              className="border-card-border bg-nav-bg flex items-center justify-between rounded-full border py-2.5 pr-3 pl-3.5 shadow-[var(--card-shadow)] backdrop-blur-[var(--blur)]"
            >
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="text-ink inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[13px] font-semibold"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>
              </Dialog.Close>
              <span className="text-dim pr-2 font-mono text-[13px] font-semibold">
                All projects
              </span>
            </div>
          </nav>

          <div className="relative z-[1] mx-auto max-w-[1100px] px-6 pt-9 pb-[70px]">
            <div className="mb-[30px]">
              <Dialog.Title asChild>
                <h1 className="font-display text-ink mb-2.5 text-[clamp(40px,6vw,68px)] font-extrabold tracking-[-0.03em]">
                  My Projects
                </h1>
              </Dialog.Title>
              <Dialog.Description asChild>
                <p className="text-dim text-[17px]">
                  A collection of projects I've built, contributed to, and brought to life.
                </p>
              </Dialog.Description>
            </div>

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
                        <h3 className="font-display text-ink text-[22px] font-bold">
                          {project.name}
                        </h3>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
