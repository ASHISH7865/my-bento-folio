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
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'github',
          type: 'text',
          label: 'GitHub URL',
          admin: {
            description: 'Your GitHub profile URL (e.g., https://github.com/username)',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            description: 'Your LinkedIn profile URL (e.g., https://linkedin.com/in/username)',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter URL',
          admin: {
            description: 'Your Twitter profile URL (e.g., https://twitter.com/username)',
          },
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website URL',
          admin: {
            description: 'Your personal website URL',
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Contact Email',
          admin: {
            description: 'Email address for contact inquiries',
          },
        },
      ],
    },
  ],
}
