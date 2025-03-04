import { CollectionConfig } from 'payload'

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  admin: {
    useAsTitle: 'category',
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
