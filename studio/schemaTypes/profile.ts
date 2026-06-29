import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'roleLead', title: 'Role', type: 'string' }),
    defineField({ name: 'roleAccent', title: 'Role highlight', type: 'string' }),
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'availability', type: 'string' }),
    defineField({ name: 'intro', type: 'text', rows: 3 }),
    defineField({ name: 'bio', type: 'array', of: [{ type: 'text', rows: 3 }] }),
    defineField({
      name: 'facts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'value', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'prefix', type: 'string' },
            { name: 'label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'avatar', type: 'image', options: { hotspot: true } }),
  ],
})
