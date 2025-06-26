import { CollectionConfig } from 'payload'

export const About: CollectionConfig = {
  slug: 'about',
  admin: {
    useAsTitle: 'title',
    description: 'Manage content for the About Us page',
    defaultColumns: ['title', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'About Me',
      admin: {
        description: 'Main title for the About page',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Optional subtitle or tagline',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main hero image for the About page',
      },
    },
    {
      name: 'introduction',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main introduction/bio content',
      },
    },
    {
      name: 'sections',
      type: 'array',
      admin: {
        description: 'Additional content sections',
      },
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          admin: {
            description: 'Title for this section',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          admin: {
            description: 'Content for this section',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional image for this section',
          },
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Image Left', value: 'image-left' },
            { label: 'Image Right', value: 'image-right' },
            { label: 'Full Width', value: 'full-width' },
          ],
          admin: {
            description: 'Layout style for this section',
          },
        },
      ],
    },
    {
      name: 'skills',
      type: 'group',
      admin: {
        description: 'Skills and expertise information',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Skills & Expertise',
          admin: {
            description: 'Title for the skills section',
          },
        },
        {
          name: 'categories',
          type: 'array',
          fields: [
            {
              name: 'categoryName',
              type: 'text',
              required: true,
              admin: {
                description: 'Name of the skill category (e.g., Frontend, Backend)',
              },
            },
            {
              name: 'skills',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'proficiency',
                  type: 'select',
                  options: [
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Advanced', value: 'advanced' },
                    { label: 'Expert', value: 'expert' },
                  ],
                  defaultValue: 'intermediate',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'experience',
      type: 'group',
      admin: {
        description: 'Work experience and timeline',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Experience',
          admin: {
            description: 'Title for the experience section',
          },
        },
        {
          name: 'timeline',
          type: 'array',
          fields: [
            {
              name: 'position',
              type: 'text',
              required: true,
              admin: {
                description: 'Job title or position',
              },
            },
            {
              name: 'company',
              type: 'text',
              required: true,
              admin: {
                description: 'Company or organization name',
              },
            },
            {
              name: 'startDate',
              type: 'date',
              required: true,
              admin: {
                description: 'Start date of this position',
              },
            },
            {
              name: 'endDate',
              type: 'date',
              admin: {
                description: 'End date (leave empty if current position)',
              },
            },
            {
              name: 'current',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Check if this is your current position',
              },
            },
            {
              name: 'description',
              type: 'richText',
              admin: {
                description: 'Description of responsibilities and achievements',
              },
            },
            {
              name: 'technologies',
              type: 'array',
              fields: [
                {
                  name: 'tech',
                  type: 'text',
                },
              ],
              admin: {
                description: 'Technologies used in this role',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'achievements',
      type: 'array',
      admin: {
        description: 'Notable achievements, awards, or certifications',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Achievement title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Brief description of the achievement',
          },
        },
        {
          name: 'date',
          type: 'date',
          admin: {
            description: 'Date when you received this achievement',
          },
        },
        {
          name: 'organization',
          type: 'text',
          admin: {
            description: 'Organization that granted this achievement',
          },
        },
        {
          name: 'credentialUrl',
          type: 'text',
          admin: {
            description: 'URL to credential or certificate (optional)',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        description: 'Publication status',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'SEO title for the About page',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'SEO description (max 160 characters)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'SEO keywords (comma-separated)',
          },
        },
      ],
    },
  ],
}
