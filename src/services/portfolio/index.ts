import { sanityClient } from '@lib/config/sanity'

import { experience, profile, projects, skillGroups } from './data'
import { EXPERIENCE_QUERY, PROFILE_QUERY, PROJECTS_QUERY, SKILLS_QUERY } from './queries'
import type { ExperienceEntry, Profile, Project, SkillGroup } from './types'

export async function getProjects(): Promise<Project[]> {
  if (sanityClient) return sanityClient.fetch<Project[]>(PROJECTS_QUERY)
  return projects
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  if (sanityClient) return sanityClient.fetch<ExperienceEntry[]>(EXPERIENCE_QUERY)
  return experience
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  if (sanityClient) return sanityClient.fetch<SkillGroup[]>(SKILLS_QUERY)
  return skillGroups
}

export async function getProfile(): Promise<Profile> {
  if (sanityClient) return sanityClient.fetch<Profile>(PROFILE_QUERY)
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
