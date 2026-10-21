import * as Dialog from '@radix-ui/react-dialog'
import { ExternalLink, Github, X } from 'lucide-react'

import type { Project } from '@services/portfolio'

import { getSlides } from '../schema/slides'
import { ProjectGallery } from './ProjectGallery'

interface ProjectModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (_open: boolean) => void
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-80 bg-black/55 backdrop-blur-sm" />
        <Dialog.Content className="glass-solid data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-81 flex max-h-[calc(100dvh-24px)] w-[min(1080px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-(--card-radius-lg) outline-none">
          <div tabIndex={-1} className="overflow-y-auto overscroll-contain outline-none">
            <ProjectGallery key={project.id} images={getSlides(project)} name={project.name} />

            <div className="px-6 pt-5 pb-7 sm:px-8">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <Dialog.Title className="font-display text-ink text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.01em]">
                  {project.name}
                </Dialog.Title>
                <div className="flex gap-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener"
                      className="bg-tag-bg text-ink border-tag-border hover:text-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors"
                    >
                      <Github className="size-4" />
                      GitHub
                    </a>
                  )}
                  {project.links.preview && (
                    <a
                      href={project.links.preview}
                      target="_blank"
                      rel="noopener"
                      className="bg-accent text-accent-contrast inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold"
                    >
                      <ExternalLink className="size-4" />
                      Live demo
                    </a>
                  )}
                </div>
              </div>

              <Dialog.Description className="text-dim mb-5 max-w-[75ch] text-[15.5px] leading-[1.65]">
                {project.description}
              </Dialog.Description>

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
          </div>

          <Dialog.Close
            aria-label="Close"
            className="glass text-ink absolute top-3 right-3 z-10 grid size-10 cursor-pointer place-items-center rounded-full"
          >
            <X className="size-[18px]" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
