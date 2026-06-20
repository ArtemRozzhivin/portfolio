import { experience, profile, projects, skillGroups } from './data'
import type { ExperienceEntry, Profile, Project, SkillGroup } from './types'

export async function getProjects(): Promise<Project[]> {
  return projects
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  return experience
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  return skillGroups
}

export async function getProfile(): Promise<Profile> {
  return profile
}

export function getAllTechs(items: Project[]): string[] {
  const seen = new Set<string>()
  for (const item of items) {
    for (const tech of item.stack) seen.add(tech)
  }
  return [...seen]
}

export type * from './types'
