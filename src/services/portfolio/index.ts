import { sanityClient } from '@lib/config/sanity'

import { experience, profile, projects, skillGroups } from './data'
import { EXPERIENCE_QUERY, PROFILE_QUERY, PROJECTS_QUERY, SKILLS_QUERY } from './queries'
import type { ExperienceEntry, Profile, Project, SkillGroup } from './types'

async function fromSanity<T>(query: string): Promise<T | null> {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch<T>(query)
  } catch {
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  const result = await fromSanity<Project[]>(PROJECTS_QUERY)
  return result?.length ? result : projects
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  const result = await fromSanity<ExperienceEntry[]>(EXPERIENCE_QUERY)
  return result?.length ? result : experience
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const result = await fromSanity<SkillGroup[]>(SKILLS_QUERY)
  return result?.length ? result : skillGroups
}

export async function getProfile(): Promise<Profile> {
  const result = await fromSanity<Profile>(PROFILE_QUERY)
  return result?.name ? result : profile
}

export function getAllTechs(items: Project[]): string[] {
  const seen = new Set<string>()
  for (const item of items) {
    for (const tech of item.stack) seen.add(tech)
  }
  return [...seen]
}

export type * from './types'
