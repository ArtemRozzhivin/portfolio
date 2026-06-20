export interface ProjectLinks {
  github: string
  preview: string
}

export interface Project {
  id: string
  name: string
  description: string
  image: string
  stack: string[]
  links: ProjectLinks
}

export type SkillIcon = 'languages' | 'frameworks' | 'state' | 'styling' | 'tools'

export interface SkillGroup {
  title: string
  icon: SkillIcon
  skills: string[]
  wide?: boolean
}

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  meta: string
  period: string
  note: string
  current: boolean
  bullets: string[]
}

export interface Fact {
  label: string
  value: string
}

export interface HeroBadge {
  prefix: string
  label: string
}

export interface Profile {
  name: string
  roleLead: string
  roleAccent: string
  eyebrow: string
  availability: string
  intro: string
  bio: string[]
  facts: Fact[]
  badges: HeroBadge[]
  avatar: string
}
