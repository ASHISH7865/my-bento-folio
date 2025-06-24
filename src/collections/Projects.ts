import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'featured', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Project title or name',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief project description for cards and previews',
      },
    },
    {
      name: 'detailedDescription',
      type: 'richText',
      admin: {
        description: 'Detailed project description for the project page',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Web Application', value: 'web-app' },
        { label: 'Mobile App', value: 'mobile-app' },
        { label: 'Desktop Application', value: 'desktop-app' },
        { label: 'API/Backend', value: 'api' },
        { label: 'Library/Package', value: 'library' },
        { label: 'Website', value: 'website' },
        { label: 'Game', value: 'game' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'completed',
      options: [
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this project prominently in the showcase',
      },
    },
    {
      name: 'thumbnailImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main project thumbnail for grid cards',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Project Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Optional caption for the image',
          },
        },
      ],
      admin: {
        description: 'Gallery images for carousel and project detail page',
      },
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologies Used',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name or URL for the technology',
          },
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Frontend', value: 'frontend' },
            { label: 'Backend', value: 'backend' },
            { label: 'Database', value: 'database' },
            { label: 'DevOps', value: 'devops' },
            { label: 'Mobile', value: 'mobile' },
            { label: 'Design', value: 'design' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    {
      name: 'links',
      type: 'group',
      label: 'Project Links',
      fields: [
        {
          name: 'live',
          type: 'text',
          label: 'Live Demo URL',
          admin: {
            description: 'Link to the live project/demo',
          },
        },
        {
          name: 'github',
          type: 'text',
          label: 'GitHub Repository',
          admin: {
            description: 'Link to the GitHub repository',
          },
        },
        {
          name: 'documentation',
          type: 'text',
          label: 'Documentation URL',
          admin: {
            description: 'Link to project documentation',
          },
        },
        {
          name: 'download',
          type: 'text',
          label: 'Download URL',
          admin: {
            description: 'Direct download link if applicable',
          },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name for the feature',
          },
        },
      ],
    },
    {
      name: 'challenges',
      type: 'array',
      label: 'Challenges & Solutions',
      fields: [
        {
          name: 'challenge',
          type: 'text',
          required: true,
        },
        {
          name: 'solution',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'metrics',
      type: 'group',
      label: 'Project Metrics',
      fields: [
        {
          name: 'duration',
          type: 'text',
          label: 'Development Duration',
          admin: {
            description: 'e.g., "3 months", "2 weeks"',
          },
        },
        {
          name: 'teamSize',
          type: 'number',
          label: 'Team Size',
        },
        {
          name: 'linesOfCode',
          type: 'number',
          label: 'Lines of Code (approximate)',
        },
        {
          name: 'users',
          type: 'text',
          label: 'User Base',
          admin: {
            description: 'e.g., "1000+ users", "Internal tool"',
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Override the title for SEO',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Meta description for search engines',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords',
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        description: 'Project completion/publication date',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug if not provided
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-')
        }
        return data
      },
    ],
  },
}
