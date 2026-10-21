import { defineField, defineType } from 'sanity'

export const skillGroup = defineType({
  name: 'skillGroup',
  title: 'Skill group',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'icon',
      type: 'string',
      options: {
        list: [
          'languages',
          'frameworks',
          'state',
          'styling',
          'tools',
          'integrations',
          'performance',
        ],
      },
    }),
    defineField({ name: 'skills', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'wide', title: 'Span two columns', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
