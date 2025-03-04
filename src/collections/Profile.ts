import { CollectionConfig } from 'payload'

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'username',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'specialties',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
    {
      name: 'bio',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
        {
          name: 'timezone',
          type: 'text',
        },
      ],
    },
    {
      name: 'availability',
      type: 'group',
      fields: [
        {
          name: 'status',
          type: 'checkbox',
        },
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
  ],
}
