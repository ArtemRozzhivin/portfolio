import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Artem Rozzhyvin — Portfolio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '6a8sbeyl',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
