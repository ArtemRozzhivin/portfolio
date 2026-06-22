import { defineField, defineType } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'role', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'meta', title: 'Type · Location', type: 'string' }),
    defineField({ name: 'period', type: 'string' }),
    defineField({ name: 'note', type: 'string' }),
    defineField({ name: 'current', title: 'Current role', type: 'boolean', initialValue: false }),
    defineField({ name: 'bullets', type: 'array', of: [{ type: 'text', rows: 2 }] }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'company' } }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
