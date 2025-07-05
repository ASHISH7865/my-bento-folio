import { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'category', 'difficulty'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The main title of the blog post',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title (auto-generated)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Brief summary of the blog post (max 300 characters)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'The main content of the blog post',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Main image for the blog post',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Technology', value: 'technology' },
        { label: 'Development', value: 'development' },
        { label: 'Design', value: 'design' },
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Thoughts', value: 'thoughts' },
        { label: 'Projects', value: 'projects' },
        { label: 'Code Review', value: 'code-review' },
        { label: 'Best Practices', value: 'best-practices' },
        { label: 'DevOps', value: 'devops' },
        { label: 'AI/ML', value: 'ai-ml' },
        { label: 'Web Development', value: 'web-development' },
        { label: 'Mobile Development', value: 'mobile-development' },
        { label: 'Data Science', value: 'data-science' },
        { label: 'Career', value: 'career' },
      ],
      admin: {
        description: 'Category of the blog post',
      },
    },
    {
      name: 'subcategory',
      type: 'text',
      admin: {
        description: 'Optional subcategory for more specific classification',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
      admin: {
        description: 'Difficulty level of the content',
      },
    },
    {
      name: 'primaryLanguage',
      type: 'select',
      options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'C++', value: 'cpp' },
        { label: 'C#', value: 'csharp' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'PHP', value: 'php' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'Swift', value: 'swift' },
        { label: 'Kotlin', value: 'kotlin' },
        { label: 'Dart', value: 'dart' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'SQL', value: 'sql' },
        { label: 'Shell/Bash', value: 'bash' },
        { label: 'PowerShell', value: 'powershell' },
        { label: 'Docker', value: 'docker' },
        { label: 'YAML', value: 'yaml' },
        { label: 'JSON', value: 'json' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Primary programming language if applicable',
      },
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'technology',
          type: 'text',
        },
      ],
      admin: {
        description: 'Technologies, frameworks, or tools discussed',
      },
    },
    {
      name: 'series',
      type: 'group',
      fields: [
        {
          name: 'isPartOfSeries',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Is this post part of a series?',
          },
        },
        {
          name: 'seriesName',
          type: 'text',
          admin: {
            description: 'Name of the series',
            condition: (data, siblingData) => siblingData?.isPartOfSeries,
          },
        },
        {
          name: 'seriesOrder',
          type: 'number',
          admin: {
            description: 'Order in the series (1, 2, 3, etc.)',
            condition: (data, siblingData) => siblingData?.isPartOfSeries,
          },
        },
        {
          name: 'seriesDescription',
          type: 'textarea',
          admin: {
            description: 'Brief description of the series',
            condition: (data, siblingData) => siblingData?.isPartOfSeries,
          },
        },
      ],
    },
    {
      name: 'tableOfContents',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'anchor',
          type: 'text',
          required: true,
          admin: {
            description: 'URL anchor (auto-generated from heading)',
          },
        },
        {
          name: 'level',
          type: 'select',
          options: [
            { label: 'H2', value: '2' },
            { label: 'H3', value: '3' },
            { label: 'H4', value: '4' },
          ],
          defaultValue: '2',
        },
      ],
      admin: {
        description: 'Table of contents (can be auto-generated)',
      },
    },
    {
      name: 'codeExamples',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'language',
          type: 'select',
          options: [
            { label: 'JavaScript', value: 'javascript' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'Python', value: 'python' },
            { label: 'Java', value: 'java' },
            { label: 'C++', value: 'cpp' },
            { label: 'C#', value: 'csharp' },
            { label: 'Go', value: 'go' },
            { label: 'Rust', value: 'rust' },
            { label: 'PHP', value: 'php' },
            { label: 'Ruby', value: 'ruby' },
            { label: 'HTML', value: 'html' },
            { label: 'CSS', value: 'css' },
            { label: 'SQL', value: 'sql' },
            { label: 'Shell', value: 'bash' },
            { label: 'Other', value: 'other' },
          ],
          required: true,
        },
        {
          name: 'code',
          type: 'code',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'runnable',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Can this code be run in a playground?',
          },
        },
      ],
      admin: {
        description: 'Standalone code examples for the post',
      },
    },
    {
      name: 'prerequisites',
      type: 'array',
      fields: [
        {
          name: 'prerequisite',
          type: 'text',
        },
      ],
      admin: {
        description: 'What readers should know before reading this post',
      },
    },
    {
      name: 'learningOutcomes',
      type: 'array',
      fields: [
        {
          name: 'outcome',
          type: 'text',
        },
      ],
      admin: {
        description: 'What readers will learn from this post',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: true,
      admin: {
        description: 'Related blog posts',
      },
    },
    {
      name: 'externalLinks',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
      admin: {
        description: 'Useful external links and resources',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        description: 'Tags for better categorization',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this post on the homepage',
      },
    },
    {
      name: 'allowComments',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Allow comments on this post',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        description: 'Publication status',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'When the post was/will be published',
        condition: (data) => data.status === 'published' || data.status === 'scheduled',
      },
    },
    {
      name: 'updatedAt',
      type: 'date',
      admin: {
        description: 'When the post was last updated',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        description: 'Estimated reading time in minutes (auto-calculated)',
      },
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Number of views (auto-updated)',
        readOnly: true,
      },
    },
    {
      name: 'likes',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Number of likes (auto-updated)',
        readOnly: true,
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
            description: 'SEO title (if different from main title)',
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
        {
          name: 'canonicalUrl',
          type: 'text',
          admin: {
            description: 'Canonical URL if content is published elsewhere first',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Custom Open Graph image (defaults to featured image)',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-calculate reading time based on content length
        if (data.content) {
          const wordCount = JSON.stringify(data.content).split(' ').length
          data.readingTime = Math.ceil(wordCount / 200) // Average reading speed
        }

        // Auto-generate table of contents anchors
        if (data.tableOfContents) {
          data.tableOfContents = data.tableOfContents.map((item: any) => ({
            ...item,
            anchor: item.heading
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          }))
        }

        // Set updated timestamp
        data.updatedAt = new Date().toISOString()

        return data
      },
    ],
  },
}
