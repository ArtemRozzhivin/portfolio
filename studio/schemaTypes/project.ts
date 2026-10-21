import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Cover', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
    }),
    defineField({ name: 'stack', title: 'Tech stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'previewUrl', title: 'Live demo URL', type: 'url' }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
