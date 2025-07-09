import { CollectionConfig } from 'payload'

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['category', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Order in which this category should appear (1 for first, etc.)',
      },
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
}
