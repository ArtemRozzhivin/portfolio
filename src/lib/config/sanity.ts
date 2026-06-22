import { createClient } from '@sanity/client'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2024-01-01'

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

export const isSanityConfigured = sanityClient !== null
