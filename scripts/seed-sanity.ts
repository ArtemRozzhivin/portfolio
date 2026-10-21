import { createClient } from '@sanity/client'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { experience, profile, projects, skillGroups } from '../src/services/portfolio/data'

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
  throw new Error('Set PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN before running.')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const PUBLIC_DIR = resolve(process.cwd(), 'public')

async function uploadImage(publicPath: string) {
  const buffer = await readFile(resolve(PUBLIC_DIR, publicPath.replace(/^\//, '')))
  const asset = await client.assets.upload('image', buffer, {
    filename: publicPath.split('/').pop(),
  })
  return { _type: 'image', asset: { _ref: asset._id } }
}

async function run() {
  const avatar = await uploadImage(profile.avatar)
  await client.createOrReplace({
    _id: 'profile',
    _type: 'profile',
    name: profile.name,
    roleLead: profile.roleLead,
    roleAccent: profile.roleAccent,
    eyebrow: profile.eyebrow,
    availability: profile.availability,
    cvUrl: profile.cvUrl,
    intro: profile.intro,
    bio: profile.bio,
    facts: profile.facts.map((fact, i) => ({ _key: `fact-${i}`, ...fact })),
    badges: profile.badges.map((badge, i) => ({ _key: `badge-${i}`, ...badge })),
    avatar,
  })
  console.log('✓ profile')

  for (const [i, project] of projects.entries()) {
    const image = await uploadImage(project.image)
    const gallery = []
    for (const [j, shot] of (project.gallery ?? []).entries()) {
      gallery.push({ _key: `shot-${j}`, ...(await uploadImage(shot.src)) })
    }
    await client.createOrReplace({
      _id: `project-${project.id}`,
      _type: 'project',
      name: project.name,
      slug: { _type: 'slug', current: project.id },
      description: project.description,
      image,
      gallery,
      stack: project.stack,
      githubUrl: project.links.github,
      previewUrl: project.links.preview,
      order: i,
    })
    console.log(`✓ project: ${project.name}`)
  }

  for (const [i, entry] of experience.entries()) {
    await client.createOrReplace({
      _id: `experience-${entry.id}`,
      _type: 'experience',
      role: entry.role,
      company: entry.company,
      meta: entry.meta,
      period: entry.period,
      note: entry.note,
      current: entry.current,
      bullets: entry.bullets,
      slug: { _type: 'slug', current: entry.id },
      order: i,
    })
    console.log(`✓ experience: ${entry.company}`)
  }

  for (const [i, group] of skillGroups.entries()) {
    await client.createOrReplace({
      _id: `skill-${group.icon}`,
      _type: 'skillGroup',
      title: group.title,
      icon: group.icon,
      skills: group.skills,
      wide: group.wide ?? false,
      order: i,
    })
    console.log(`✓ skillGroup: ${group.title}`)
  }

  console.log('Seed complete.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
